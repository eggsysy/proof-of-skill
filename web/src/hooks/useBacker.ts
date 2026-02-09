import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../lib/constants";
import abiData from "../lib/abi.json";

type ArtifactWithAbi = {
  abi: ethers.InterfaceAbi;
};

const SEPOLIA_CHAIN_ID = BigInt(11155111);
const IDA_AGREEMENT_STORAGE_SLOT = BigInt(1);
const POOL_INDEX_ID = 0;
const IDA_INDEX_DOES_NOT_EXIST_SELECTOR = "0xedeaa63b";
const IDA_OPERATION_NOT_ALLOWED_SELECTOR = "0x92da6d17";

const IDA_INDEX_VIEW_ABI = [
  "function getIndex(address token,address publisher,uint32 indexId) view returns (bool exist,uint128 indexValue,uint128 totalUnitsApproved,uint128 totalUnitsPending)",
] as const;

type BackingErrorContext = {
  indexExists?: boolean | null;
};

function decodeStorageAddress(storageValue: string): string {
  return ethers.getAddress(`0x${storageValue.slice(-40)}`);
}

function flattenErrorText(error: unknown): string {
  const queue: unknown[] = [error];
  const visited = new Set<unknown>();
  const fragments: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift();

    if (typeof current === "string") {
      fragments.push(current);
      continue;
    }

    if (!current || typeof current !== "object" || visited.has(current)) {
      continue;
    }

    visited.add(current);
    const value = current as Record<string, unknown>;

    for (const key of ["message", "shortMessage", "reason", "code", "errorName", "errorSignature"]) {
      const text = value[key];
      if (typeof text === "string") {
        fragments.push(text);
      }
    }

    for (const key of ["error", "info", "data", "cause"]) {
      if (value[key] !== undefined) {
        queue.push(value[key]);
      }
    }
  }

  if (error instanceof Error) {
    fragments.unshift(error.message);
  }

  return fragments.join(" ").toLowerCase();
}

async function getIndexExists(
  provider: ethers.BrowserProvider,
  idaAgreementAddress: string,
  streamingTokenAddress: string
): Promise<boolean | null> {
  try {
    const idaContract = new ethers.Contract(idaAgreementAddress, IDA_INDEX_VIEW_ABI, provider);
    const [exists] = (await idaContract.getIndex(
      streamingTokenAddress,
      CONTRACT_ADDRESS,
      POOL_INDEX_ID
    )) as [boolean, bigint, bigint, bigint];

    return exists;
  } catch {
    return null;
  }
}

function mapBlockchainError(error: unknown, context: BackingErrorContext = {}): Error {
  const lowerMessage = flattenErrorText(error);

  if (lowerMessage.includes("user rejected") || lowerMessage.includes("action_rejected")) {
    return new Error("Transaction was rejected in wallet.");
  }

  if (lowerMessage.includes("insufficient funds")) {
    return new Error("Insufficient native token balance to pay gas fees.");
  }

  if (lowerMessage.includes("wrong network") || lowerMessage.includes("chain")) {
    return new Error("Please switch wallet network to Ethereum Sepolia before backing.");
  }

  if (
    lowerMessage.includes("ida_index_does_not_exist") ||
    lowerMessage.includes("index does not exist") ||
    lowerMessage.includes(IDA_INDEX_DOES_NOT_EXIST_SELECTOR) ||
    context.indexExists === false
  ) {
    return new Error(
      "This pool is deployed but its IDA index is missing on-chain, so backing cannot proceed. The pool contract must create index 0 first."
    );
  }

  if (
    lowerMessage.includes("ida_operation_not_allowed") ||
    lowerMessage.includes(IDA_OPERATION_NOT_ALLOWED_SELECTOR)
  ) {
    return new Error(
      "The pool contract is not allowed to execute this IDA update on-chain. This deployment likely needs a contract-side fix/redeploy."
    );
  }

  if (lowerMessage.includes("ida not initialized")) {
    return new Error(
      "Pool contract has no valid IDA agreement configured on this network. The deployed host/token addresses are not a live Superfluid setup."
    );
  }

  if (
    lowerMessage.includes("action=\"estimategas\"") &&
    lowerMessage.includes("require(false)")
  ) {
    return new Error(
      "Backing transaction reverted during gas estimation. This pool is likely not fully initialized on-chain."
    );
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Failed to add backer");
}

export const useBacker = () => {
  const addBacker = async (units: number) => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      throw new Error("MetaMask is not available");
    }

    let indexExists: boolean | null = null;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      if (!Number.isInteger(units) || units <= 0) {
        throw new Error(`Invalid backing units: ${units}`);
      }

      const network = await provider.getNetwork();
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        throw new Error("Please switch wallet network to Ethereum Sepolia.");
      }

      const signer = await provider.getSigner();

      const actualAbi: ethers.InterfaceAbi = Array.isArray(abiData)
        ? (abiData as ethers.InterfaceAbi)
        : (abiData as ArtifactWithAbi).abi;
      const contract = new ethers.Contract(CONTRACT_ADDRESS, actualAbi, signer);

      const userAddress = await signer.getAddress();
      const creatorFn = contract.getFunction("creator()");
      const creatorAddress = (await creatorFn.staticCall()) as string;
      const tokenFn = contract.getFunction("streamingToken()");
      const streamingTokenAddress = (await tokenFn.staticCall()) as string;

      // Storage slot 1 contains the IDA agreement address in this deployed contract.
      const idaAgreementStorage = await provider.getStorage(
        CONTRACT_ADDRESS,
        IDA_AGREEMENT_STORAGE_SLOT
      );
      let idaAgreementAddress = decodeStorageAddress(idaAgreementStorage);

      if (idaAgreementAddress === ethers.ZeroAddress) {
        if (creatorAddress.toLowerCase() !== userAddress.toLowerCase()) {
          throw new Error(
            "This creator pool is not initialized yet. Ask the creator to initialize it first."
          );
        }

        const initializeIdaFn = contract.getFunction("initializeIDA()");
        const initTx = await initializeIdaFn.send();
        await initTx.wait();

        const refreshedStorage = await provider.getStorage(
          CONTRACT_ADDRESS,
          IDA_AGREEMENT_STORAGE_SLOT
        );
        idaAgreementAddress = decodeStorageAddress(refreshedStorage);

        if (idaAgreementAddress === ethers.ZeroAddress) {
          throw new Error(
            "IDA initialization transaction succeeded but the agreement address is still unset."
          );
        }
      }

      indexExists = await getIndexExists(provider, idaAgreementAddress, streamingTokenAddress);

      const addBackerFn = contract.getFunction("addBacker(address,uint128)");
      await addBackerFn.staticCall(userAddress, BigInt(units));
      const tx = await addBackerFn.send(userAddress, BigInt(units));

      console.log("Transaction sent. Hash:", tx.hash);
      await tx.wait();

      alert("Success! You are now backing the creator.");
      return tx;
    } catch (err: unknown) {
      throw mapBlockchainError(err, { indexExists });
    }
  };

  return { addBacker };
};

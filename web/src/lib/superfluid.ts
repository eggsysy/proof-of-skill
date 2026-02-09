import { Framework } from "@superfluid-finance/sdk-core";
import { sepolia } from "wagmi/chains";

export type SuperfluidProvider = Parameters<typeof Framework.create>[0]["provider"];

export async function createSuperfluidFramework(provider: SuperfluidProvider) {
  return Framework.create({
    chainId: sepolia.id,
    provider,
  });
}

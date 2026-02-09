import hre from "hardhat";

async function main() {
  // In Hardhat 3, the ethers plugin is often accessed through network.connect()
  // or via the explicitly registered ethers object.
  const ethers = hre.ethers;

  if (!ethers) {
    console.error("❌ Ethers plugin not found. Check your hardhat.config.ts!");
    return;
  }

  // Get the signers (your wallet)
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  if (!deployer) {
    console.error("❌ No accounts found. Did you set your PRIVATE_KEY?");
    return;
  }

  // Check the balance
  const balance = await ethers.provider.getBalance(deployer.address);
  const polBalance = ethers.formatEther(balance);

  console.log("--------------------------------------------------");
  console.log(`📡 Network: ${hre.network.name}`);
  console.log(`👤 Account: ${deployer.address}`);
  console.log(`💰 Balance: ${polBalance} POL`);
  console.log("--------------------------------------------------");

  if (parseFloat(polBalance) > 0) {
    console.log("🚀 LFG! You have gas. Ready to deploy.");
  } else {
    console.log("⚠️  Your balance is 0.0 POL. You need to hit a faucet.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
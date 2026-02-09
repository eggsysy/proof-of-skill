import 'dotenv/config';
import { configVariable, defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatEthersChaiMatchers from "@nomicfoundation/hardhat-ethers-chai-matchers";
// Note: hardhat-keystore is intentionally omitted here for non-interactive
// deployments that use PRIVATE_KEY from .env. If you prefer using the
// interactive keystore, re-add the import and plugin entry.
// import hardhatKeystore from "@nomicfoundation/hardhat-keystore";
import hardhatIgnitionEthers from "@nomicfoundation/hardhat-ignition-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";

export default defineConfig({
  plugins: [
    hardhatEthers,
    hardhatEthersChaiMatchers,
    hardhatIgnitionEthers,
    hardhatVerify,
  ],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
        settings: {
          remappings: [
            "@openzeppelin-v5/contracts/=@openzeppelin/contracts/",
          ],
        },
      },
      production: {
        version: "0.8.28",
        settings: {
          remappings: [
            "@openzeppelin-v5/contracts/=@openzeppelin/contracts/",
          ],
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    // Local Simulation
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    // Polygon Amoy (Hackathon Testnet)
    amoy: {
      type: "http",
      chainType: "generic", 
      url: configVariable("POLYGON_AMOY_URL"),
      // If PRIVATE_KEY is set in the environment (via .env), normalize it to a
      // 0x-prefixed string. Otherwise fall back to a Configuration Variable so
      // hardhat-keystore or CLI-provided config still work.
      accounts: [
        process.env.PRIVATE_KEY
          ? `0x${process.env.PRIVATE_KEY.replace(/^0x/, "")}`
          : configVariable("PRIVATE_KEY"),
      ],
      chainId: 80002,
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [
        process.env.SEPOLIA_PRIVATE_KEY
          ? `0x${process.env.SEPOLIA_PRIVATE_KEY.replace(/^0x/, "")}`
          : configVariable("SEPOLIA_PRIVATE_KEY"),
      ],
    },
  },
});

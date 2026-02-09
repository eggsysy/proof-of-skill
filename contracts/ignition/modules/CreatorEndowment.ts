import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// CORRECTED CHECKSUM ADDRESSES (Amoy 2026)
const HOST_ADDRESS = "0x109412E3C84f0539b43d39dB691B08c90f58dC7c"; // Notice the 'D'
const fUSDCx_ADDRESS = "0xb598E6C621618a9f63788816ffb50Ee2862D443B"; // Mixed case is required

const CreatorEndowmentModule = buildModule("CreatorEndowmentModule", (m) => {
  const creatorEndowment = m.contract("CreatorEndowment", [
    HOST_ADDRESS,
    fUSDCx_ADDRESS,
  ]);

  return { creatorEndowment };
});

export default CreatorEndowmentModule;
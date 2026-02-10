import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/lib/constants";
import ABI from "@/lib/abi.json";

export function useDistribute() {
  const [isDistributing, setIsDistributing] = useState(false);

  const distributeRevenue = async (amountInEther: string) => {
    if (!window.ethereum) return;
    setIsDistributing(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractABI = (ABI as any).abi || ABI;
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Convert the input amount to Wei (18 decimals)
      const amountInWei = ethers.parseEther(amountInEther);

      const tx = await contract.distribute(amountInWei);
      console.log("Distributing... Hash:", tx.hash);
      await tx.wait();
      
      alert("✅ Revenue distributed successfully to all backers!");
    } catch (error) {
      console.error("Distribution failed:", error);
      alert("Error: Check console for details.");
    } finally {
      setIsDistributing(false);
    }
  };

  return { distributeRevenue, isDistributing };
}
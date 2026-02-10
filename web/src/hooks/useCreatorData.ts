import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/lib/constants";
// 1. Ensure this import path is exactly where your JSON file is
import ABI_JSON from "@/lib/abi.json"; 

export function useCreatorData(userAddress: string | undefined) {
  const [units, setUnits] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUnits() {
      // Don't run if no address or no provider
      if (!userAddress || !window.ethereum) {
        setLoading(false);
        return;
      }
      
      // Inside the try block of fetchUnits
try {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contractABI = (ABI_JSON as any).abi || ABI_JSON;
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
  
  // Wrap the call in a nested try/catch to catch the Superfluid revert
  try {
    const backerUnits = await contract.getBackerUnits(userAddress);
    setUnits(Number(backerUnits));
  } catch (revertError) {
    console.warn("Pool likely not initialized yet. Defaulting units to 0.");
    setUnits(0);
  }
} catch (error) {
  console.error("Critical error in hook:", error);
} finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, [userAddress]);

  // Logic: 1 Unit = 0.0001 Tokens per second
  const flowRate = units * 0.0001; 
  
  return { units, flowRate, loading };
}
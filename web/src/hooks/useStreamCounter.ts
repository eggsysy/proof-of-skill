// src/hooks/useStreamCounter.ts
import { useState, useEffect } from "react";

/**
 * High-performance hook for real-time balance ticking
 * @param initialBalance - The balance at the last static update
 * @param flowRate - Tokens per second
 */
export function useStreamCounter(initialBalance: number, flowRate: number) {
  const [displayBalance, setDisplayBalance] = useState(initialBalance);

  useEffect(() => {
    // If no flow, don't start the timer
    if (!flowRate || flowRate === 0) {
      setDisplayBalance(initialBalance);
      return;
    }

    // Reset balance if initialBalance changes
    setDisplayBalance(initialBalance);

    // Update every 50ms for smooth 20fps motion
    const interval = setInterval(() => {
      setDisplayBalance((prev) => prev + (flowRate / 20));
    }, 50);

    return () => clearInterval(interval);
  }, [initialBalance, flowRate]);

  return displayBalance;
}
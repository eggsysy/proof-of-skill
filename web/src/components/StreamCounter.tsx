"use client";

import { useStreamCounter } from "@/hooks/useStreamCounter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface StreamCounterProps {
  initialBalance: number;
  flowRatePerSecond: number;
  className?: string;
}

export function StreamCounter({
  initialBalance,
  flowRatePerSecond,
  className,
}: StreamCounterProps) {
  const balance = useStreamCounter(initialBalance, flowRatePerSecond);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If not mounted, show a static or unformatted version to match the server
  if (!isMounted) {
    return <span className={cn("font-mono tabular-nums", className)}>{initialBalance}</span>;
  }

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {balance.toLocaleString("en-US", { // 👈 Tip: Lock to "en-US" to be 100% safe
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      })}
    </span>
  );
}
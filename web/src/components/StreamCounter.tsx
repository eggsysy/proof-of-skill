"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface StreamCounterProps {
  initialBalance: number;
  flowRatePerSecond: number;
  className?: string;
  prefix?: string;
  decimals?: number;
}

export function StreamCounter({
  initialBalance,
  flowRatePerSecond,
  className,
  prefix = "$",
  decimals = 2,
}: StreamCounterProps) {
  const [currentValue, setCurrentValue] = React.useState(initialBalance);
  const startTimeRef = React.useRef(0);

  React.useEffect(() => {
    startTimeRef.current = Date.now();
    setCurrentValue(initialBalance);

    const interval = window.setInterval(() => {
      const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
      setCurrentValue(initialBalance + flowRatePerSecond * elapsedSeconds);
    }, 100);

    return () => window.clearInterval(interval);
  }, [flowRatePerSecond, initialBalance]);

  const formattedValue = React.useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(currentValue);
  }, [currentValue, decimals]);

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {formattedValue}
    </span>
  );
}

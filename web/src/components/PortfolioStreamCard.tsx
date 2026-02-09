import { ArrowUpRight, Waves } from "lucide-react";

import { StreamCounter } from "@/components/StreamCounter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioStreamCardProps {
  creatorName: string;
  token: string;
  initialValue: number;
  flowRatePerSecond: number;
}

export function PortfolioStreamCard({
  creatorName,
  token,
  initialValue,
  flowRatePerSecond,
}: PortfolioStreamCardProps) {
  return (
    <Card>
      <CardHeader className="border-b border-[#222222]">
        <CardTitle className="flex items-center justify-between text-sm">
          <span>{creatorName}</span>
          <span className="text-xs text-[#8c8c8c]">{token}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-[#878787]">
          <span className="flex items-center gap-1">
            <Waves className="h-3.5 w-3.5 text-[#10BB35]" />
            Receiving
          </span>
          <span>{flowRatePerSecond.toFixed(4)}/sec</span>
        </div>

        <StreamCounter
          initialBalance={initialValue}
          flowRatePerSecond={flowRatePerSecond}
          className="block text-2xl font-semibold text-[#10BB35] drop-shadow-[0_0_8px_rgba(16,187,53,0.65)]"
        />

        <div className="flex items-center justify-end text-xs uppercase tracking-[0.08em] text-[#8f8f8f]">
          Live <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </div>
      </CardContent>
    </Card>
  );
}

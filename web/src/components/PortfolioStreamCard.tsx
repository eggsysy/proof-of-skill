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
    <Card className="bg-[#0D0D0D] border-[#222222] transition-all duration-300 hover:border-[#10BB35]/50 group">
      <CardHeader className="border-b border-[#222222]">
        <CardTitle className="flex items-center justify-between text-sm text-[#f4f4f4]">
          <span className="font-semibold tracking-tight">{creatorName}</span>
          <span className="text-[10px] bg-[#10BB35]/10 text-[#10BB35] px-2 py-0.5 rounded-full font-mono uppercase">
            {token}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-[#8e8e8e]">
          <span className="flex items-center gap-1.5 font-bold">
            <Waves className="h-3 w-3 text-[#10BB35] animate-pulse" />
            Current Flow
          </span>
          <span className="font-mono text-[#10BB35]">
            +{flowRatePerSecond.toFixed(4)} /sec
          </span>
        </div>

        <div className="py-2">
          <StreamCounter
            initialBalance={initialValue}
            flowRatePerSecond={flowRatePerSecond}
            className="block text-3xl font-bold tracking-tighter text-[#10BB35] drop-shadow-[0_0_12px_rgba(16,187,53,0.3)]"
          />
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-[#555]">
          <span>Settling on Sepolia</span>
          <div className="flex items-center gap-1 group-hover:text-[#f4f4f4] transition-colors">
            Live Stream <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
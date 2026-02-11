import { ArrowUpRight, Waves } from "lucide-react";

import { StreamCounter } from "@/components/StreamCounter";

interface HeroStatsProps {
  initialRevenueBacked: number;
  flowRatePerSecond: number;
}

export function HeroStats({
  initialRevenueBacked,
  flowRatePerSecond,
}: HeroStatsProps) {
  return (
    <section className="border-b border-[#222222] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 text-center">
        <div className="inline-flex items-center gap-2 border border-[#222222] bg-[#0D0D0D] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[#8f8f8f]">
          <Waves className="h-3.5 w-3.5 text-[#10BB35]" />
          Live Superfluid Streams
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#868686]">
            Total Revenue Backed
          </p>
          <div className="border border-[#222222] bg-[#0D0D0D] px-5 py-7 shadow-[0_0_40px_rgba(16,187,53,0.15)] sm:px-12 sm:py-10">
            <StreamCounter
              initialBalance={initialRevenueBacked}
              flowRatePerSecond={flowRatePerSecond}
              className="block text-[2rem] font-semibold leading-none text-[#10BB35] drop-shadow-[0_0_12px_rgba(16,187,53,0.75)] sm:text-[3.8rem]"
            />
          </div>
        </div>

        {/* Portfolio Growth Sparkline Placeholder */}
        <div className="w-full max-w-xs mt-8">
          <p className="text-xs uppercase tracking-[0.16em] text-[#868686] mb-2">
            Portfolio Growth (Last 7 Days)
          </p>
          <div className="h-20 w-full bg-[#0D0D0D] border border-[#222222] rounded-lg flex items-center justify-center p-2">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <defs>
                <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10BB35" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#10BB35" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              <polyline 
                points="1,15 10,5 20,10 30,8 40,12 50,6 60,14 70,9 80,16 90,7 99,13" 
                fill="url(#sparklineGradient)" 
                stroke="#10BB35" 
                strokeWidth="0.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <circle cx="99" cy="13" r="1" fill="#10BB35" />
            </svg>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#909090]">
          Updated every 100ms
          <ArrowUpRight className="h-3.5 w-3.5 text-[#10BB35]" />
        </div>
      </div>
    </section>
  );
}

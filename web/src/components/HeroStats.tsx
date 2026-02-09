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

        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#909090]">
          Updated every 100ms
          <ArrowUpRight className="h-3.5 w-3.5 text-[#10BB35]" />
        </div>
      </div>
    </section>
  );
}

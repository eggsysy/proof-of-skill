"use client";

import { Compass, LibraryBig, Radar, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import { useCreatorData } from "@/hooks/useCreatorData";
import { Navigation } from "@/components/Navigation";
import { HeroStats } from "@/components/HeroStats";
import { CreatorCard } from "@/components/CreatorCard";
import { PortfolioStreamCard } from "@/components/PortfolioStreamCard";
import { CreatorHub } from "@/components/CreatorHub";

// These stay as "Discovery" options
const DISCOVERY_CREATORS = [
  { name: "Maya Rivera", handle: "@maya.builds", niche: "Smart contracts...", units: 100 },
  { name: "Niko Park", handle: "@niko.creates", niche: "Design systems...", units: 75 },
];

export default function Home() {
  const { address, isConnected } = useAccount();
  
  // Using your existing hook name
  const { units, flowRate, loading } = useCreatorData(address);

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />

      {/* Hero shows REAL data now */}
      <HeroStats 
        initialRevenueBacked={units * 10} 
        flowRatePerSecond={flowRate} 
      />

      {/* Discovery Section */}
      <section className="border-b border-[#222222] px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-8">
           <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-widest">
             <Compass className="h-5 w-5 text-[#10BB35]" /> Discovery
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
             {DISCOVERY_CREATORS.map((c) => <CreatorCard avatarUrl={""} targetPool={""} githubUrl={""} youtubeUrl={""} key={c.handle} {...c} />)}
           </div>
        </div>
      </section>

      {/* Portfolio Section: Only shows if you are actually a backer */}
      <section className="border-b border-[#222222] px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-widest">
            <LibraryBig className="h-5 w-5 text-[#10BB35]" /> My Portfolio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading ? (
              <div className="h-40 w-full animate-pulse bg-[#0D0D0D] rounded-xl" />
            ) : units > 0 ? (
              <PortfolioStreamCard 
                creatorName="Maya Rivera Pool" 
                token="ETHx" 
                initialValue={0} 
                flowRatePerSecond={flowRate} 
              />
            ) : (
              <div className="col-span-full py-12 border border-dashed border-[#222222] text-center text-[#555]">
                No active streams. Back a creator to start receiving revenue!
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto w-full max-w-7xl">
           <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-widest">
             <Radar className="h-5 w-5 text-[#10BB35]" /> Creator Hub
           </h2>
           <CreatorHub />
        </div>
      </section>
    </main>
  );
}
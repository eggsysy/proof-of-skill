"use client";

import { Compass, LibraryBig, Radar, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import { useCreatorData } from "@/hooks/useCreatorData";
import { Navigation } from "@/components/Navigation";
import { GlobalPulseTicker } from "@/components/GlobalPulseTicker";
import { HeroStats } from "@/components/HeroStats";
import { CreatorCard } from "@/components/CreatorCard";
import { PortfolioStreamCard } from "@/components/PortfolioStreamCard";
import { YieldEstimator } from "@/components/dashboard/YieldEstimator";
import { SocialDiscoveryFeed } from "@/components/dashboard/SocialDiscoveryFeed";
import { QuickActionTopUp } from "@/components/dashboard/QuickActionTopUp";
import { SankeyDiagram } from "@/components/dashboard/SankeyDiagram";
import { HorizonAreaChart } from "@/components/dashboard/HorizonAreaChart";
import { TransactionTape } from "@/components/dashboard/TransactionTape";
import { AdvancedAnalytics } from "@/components/dashboard/AdvancedAnalytics";
import { Leaderboard } from "@/components/dashboard/Leaderboard";
import { Footer } from "@/components/Footer";
import TargetCursor from "@/components/TargetCursor"; // Import the cursor

const DISCOVERY_CREATORS = [
  { name: "Maya Rivera", handle: "@maya.builds", niche: "Smart contracts...", units: 100, badges: ["Trending", "High APY"], avatarUrl: "/maya.webp", targetPool: "$50k", githubUrl: "#", youtubeUrl: "#" },
  { name: "Niko Park", handle: "@niko.creates", niche: "Design systems...", units: 75, badges: ["New Milestone"], avatarUrl: "/niko.webp", targetPool: "$30k", githubUrl: "#", youtubeUrl: "#" },
  { name: "Alex Chen", handle: "@alex.code", niche: "Web3 tooling...", units: 120, badges: ["Rising Star"], avatarUrl: "/alex.webp", targetPool: "$70k", githubUrl: "#", youtubeUrl: "#" },
  { name: "Sara Lee", handle: "@sara.writes", niche: "Content creation...", units: 50, badges: ["Community Pick"], avatarUrl: "/sara.webp", targetPool: "$20k", githubUrl: "#", youtubeUrl: "#" },
  { name: "David Kim", handle: "@david.art", niche: "Generative art...", units: 90, badges: ["High Engagement"], avatarUrl: "/david.webp", targetPool: "$40k", githubUrl: "#", youtubeUrl: "#" },
  { name: "Emily White", handle: "@emily.defi", niche: "DeFi strategies...", units: 110, badges: ["Alpha Leak"], avatarUrl: "/emily.webp", targetPool: "$60k", githubUrl: "#", youtubeUrl: "#" },
];

export default function BackerDashboardPage() {
  const { address, isConnected } = useAccount();
  const { units, flowRate, loading } = useCreatorData(address);

  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      {/* 1. Global Cursor Instance */}
      <TargetCursor 
        spinDuration={3} 
        hoverDuration={0.2} 
        hideDefaultCursor={true} 
      />

      <Navigation />
      <GlobalPulseTicker />

      <HeroStats 
        initialRevenueBacked={units * 10} 
        flowRatePerSecond={flowRate} 
      />
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <QuickActionTopUp />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-14">
        <div className="md:col-span-2 space-y-8">
          <HorizonAreaChart />

          {/* Portfolio Section */}
          <section className="border-b border-[#222222] pb-14">
            <div className="mx-auto w-full max-w-7xl space-y-8">
              <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-widest">
                <LibraryBig className="h-5 w-5 text-[#10BB35]" /> My Portfolio
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                  <div className="h-40 w-full animate-pulse bg-[#0D0D0D] rounded-xl" />
                ) : units > 0 ? (
                  /* 2. Added cursor-target to Portfolio Cards */
                  <div className="cursor-target">
                    <PortfolioStreamCard 
                      creatorName="Maya Rivera Pool" 
                      token="ETHx" 
                      initialValue={0} 
                      flowRatePerSecond={flowRate} 
                    />
                  </div>
                ) : (
                  <div className="col-span-full py-12 border border-dashed border-[#222222] text-center text-[#555]">
                    No active streams. Back a creator to start receiving revenue!
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Discovery Section */}
          <section className="pt-14">
            <div className="mx-auto w-full max-w-7xl space-y-8">
               <h2 className="flex items-center gap-2 text-2xl font-semibold uppercase tracking-widest">
                 <Compass className="h-5 w-5 text-[#10BB35]" /> Discovery
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 {DISCOVERY_CREATORS.map((c) => (
                   /* 3. Added cursor-target to Discovery Cards */
                   <div key={c.handle} className="cursor-target">
                    <CreatorCard {...c} badges={c.badges} />
                   </div>
                 ))}
               </div>
            </div>
          </section>

          {/* Advanced Analytics Section */}
          <section className="pt-14">
            <AdvancedAnalytics />
          </section>
        </div> {/* This closes the md:col-span-2 div */}

        <div className="space-y-8"> {/* This is the start of the right column */}
          <div className="cursor-target">
            <SankeyDiagram />
          </div>
          {/* 4. Added cursor-target to Sidebar Widgets */}
          <div className="cursor-target">
            <YieldEstimator />
          </div>
          <div className="cursor-target">
            <SocialDiscoveryFeed />
          </div>
          <div className="cursor-target">
            <TransactionTape />
          </div>
          <div className="cursor-target">
            <Leaderboard />
          </div>
        </div>
      </div> {/* Closes the main grid div */}
      <Footer />
    </main>
  );
}
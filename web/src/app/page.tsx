import { Compass, LibraryBig, Radar, Sparkles } from "lucide-react";

import { CreatorCard } from "@/components/CreatorCard";
import { CreatorHub } from "@/components/CreatorHub";
import { HeroStats } from "@/components/HeroStats";
import { Navigation } from "@/components/Navigation";
import { PortfolioStreamCard } from "@/components/PortfolioStreamCard";

const creators = [
  {
    name: "Maya Rivera",
    handle: "@maya.builds",
    niche: "Smart contract engineering and security breakdowns.",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    targetPool: "$120,000",
    githubUrl: "https://github.com",
    youtubeUrl: "https://youtube.com",
    units: 100,
  },
  {
    name: "Niko Park",
    handle: "@niko.creates",
    niche: "Web3 product design systems and open-source UI kits.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    targetPool: "$95,000",
    githubUrl: "https://github.com",
    youtubeUrl: "https://youtube.com",
    units: 75,
  },
  {
    name: "Leila Sato",
    handle: "@leila.chain",
    niche: "On-chain analytics tutorials and growth strategy streams.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
    targetPool: "$140,000",
    githubUrl: "https://github.com",
    youtubeUrl: "https://youtube.com",
    units: 120,
  },
];

const portfolioStreams = [
  {
    creatorName: "Maya Rivera Stream",
    token: "USDCx",
    initialValue: 1932.5,
    flowRatePerSecond: 0.0128,
  },
  {
    creatorName: "Niko Park Stream",
    token: "USDCx",
    initialValue: 1288.72,
    flowRatePerSecond: 0.0091,
  },
  {
    creatorName: "Leila Sato Stream",
    token: "USDCx",
    initialValue: 2410.33,
    flowRatePerSecond: 0.0145,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />

      <HeroStats initialRevenueBacked={1284923.4} flowRatePerSecond={0.3736} />

      <section className="border-b border-[#222222] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-[#8e8e8e]">
                Section 01
              </p>
              <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold uppercase tracking-[0.08em]">
                <Compass className="h-5 w-5 text-[#10BB35]" />
                Discovery
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 border border-[#222222] bg-[#0D0D0D] px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[#9a9a9a]">
              <Sparkles className="h-3.5 w-3.5 text-[#10BB35]" />
              Curated creators
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {creators.map((creator) => (
              <CreatorCard key={creator.handle} {...creator} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#222222] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#8e8e8e]">Section 02</p>
            <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold uppercase tracking-[0.08em]">
              <LibraryBig className="h-5 w-5 text-[#10BB35]" />
              My Portfolio
            </h2>
            <p className="mt-2 text-sm text-[#a2a2a2]">
              Mock stream data is enabled so counters tick immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolioStreams.map((stream) => (
              <PortfolioStreamCard key={stream.creatorName} {...stream} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-[#8e8e8e]">Section 03</p>
            <h2 className="mt-2 flex items-center gap-2 text-2xl font-semibold uppercase tracking-[0.08em]">
              <Radar className="h-5 w-5 text-[#10BB35]" />
              Creator Hub
            </h2>
          </div>

          <CreatorHub />
        </div>
      </section>
    </main>
  );
}

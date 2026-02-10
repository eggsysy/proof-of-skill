"use client";

import { Navigation } from "@/components/Navigation";
import { CreatorHub } from "@/components/CreatorHub";
import { Analytics } from "@/components/studio/Analytics";
import { BackerList } from "@/components/studio/BackerList";

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />
      <section className="px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Creator Studio
          </h1>
          <Analytics />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CreatorHub />
            <BackerList />
          </div>
        </div>
      </section>
    </main>
  );
}

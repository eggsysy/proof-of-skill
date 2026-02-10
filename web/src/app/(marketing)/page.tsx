"use client";

import { ArrowRight, Feather } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import TargetCursor from "@/components/TargetCursor"; // Import the cursor

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      {/* Optional: Local instance of the cursor with specific props */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.2}
      />
      
      <Navigation />
      <section className="border-b border-[#222222] px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            The Future of Fandom <br /> is a{" "}
            <span className="text-[#10BB35]">Dividend</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#888]">
            A new era for creators and their supporters. Launch a pool, back your
            favorite creators, and share in their success.
          </p>
          <div className="flex justify-center gap-4">
            {/* Added cursor-target class and role-specific query params */}
            <Link
              href="/signin?role=backer"
              className="cursor-target inline-flex h-12 items-center justify-center rounded-md bg-[#10BB35] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#0da42d] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Start Backing
            </Link>
            <Link
              href="/signin?role=creator"
              className="cursor-target inline-flex h-12 items-center justify-center rounded-md border border-[#222222] bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#111] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Launch Your Pool
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-[#888]">
              A simple, transparent way to support creators and earn alongside
              them.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 - Added cursor-target to the icon containers for a nice effect */}
            <div className="cursor-target flex flex-col items-center space-y-4 text-center group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] border border-[#222] transition-colors group-hover:border-[#10BB35]">
                <Feather className="h-6 w-6 text-[#10BB35]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">1. Discover</h3>
                <p className="text-[#888]">
                  Find rising stars in Tech, Art, or Gaming.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="cursor-target flex flex-col items-center space-y-4 text-center group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] border border-[#222] transition-colors group-hover:border-[#10BB35]">
                <ArrowRight className="h-6 w-6 text-[#10BB35]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">2. Back</h3>
                <p className="text-[#888]">
                  Buy "Growth Shares" in their pool to show your support.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="cursor-target flex flex-col items-center space-y-4 text-center group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] border border-[#222] transition-colors group-hover:border-[#10BB35]">
                <Feather className="h-6 w-6 text-[#10BB35]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">3. Earn</h3>
                <p className="text-[#888]">
                  Watch your balance tick up in real-time every time they
                  distribute revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
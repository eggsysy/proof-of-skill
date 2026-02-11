"use client";

import { ArrowRight, Feather } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import TargetCursor from "@/components/TargetCursor";
import { DecryptedText } from "@/components/DecryptedText"; // Import the decrypt component

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.2}
      />
      
      <Navigation />
      <section className="border-b border-[#222222] px-4 py-14">
        <div className="mx-auto w-full max-w-7xl space-y-8 text-center">
          {/* Hero Heading with Decrypt Effect */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
            <DecryptedText 
              text="The Future of Fandom"
              animateOn="view"
              revealDirection="center"
              speed={80}
              className="text-white"
            />
            <br />
            <span className="flex items-center justify-center gap-3">
              is a 
              <DecryptedText 
                text="Dividend"
                animateOn="view"
                revealDirection="start"
                sequential={true}
                speed={100}
                className="text-[#10BB35]" 
                encryptedClassName="text-[#10BB35] opacity-40"
              />
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-[#888]">
            A new era for creators and their supporters. Launch a pool, back your
            favorite creators, and share in their success.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/signin?role=backer"
              className="cursor-target inline-flex h-12 items-center justify-center rounded-md bg-[#10BB35] px-8 text-sm font-medium text-black shadow transition-colors hover:bg-[#0da42d]"
            >
              Start Backing
            </Link>
            <Link
              href="/signin?role=creator"
              className="cursor-target inline-flex h-12 items-center justify-center rounded-md border border-[#222222] bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#111]"
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
            {/* Steps */}
            {[
              { icon: Feather, title: "1. Discover", desc: "Find rising stars in Tech, Art, or Gaming." },
              { icon: ArrowRight, title: "2. Back", desc: "Buy 'Growth Shares' in their pool to show support." },
              { icon: Feather, title: "3. Earn", desc: "Watch your balance tick up in real-time." }
            ].map((step, i) => (
              <div key={i} className="cursor-target flex flex-col items-center space-y-4 text-center group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0D0D0D] border border-[#222] transition-colors group-hover:border-[#10BB35]">
                  <step.icon className="h-6 w-6 text-[#10BB35]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-[#888]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
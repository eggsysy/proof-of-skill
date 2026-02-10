"use client";

import { Navigation } from "@/components/Navigation";
import { User, Rocket } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />
      <section className="px-4 py-14">
        <div className="mx-auto w-full max-w-2xl space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Choose Your Path
          </h1>
          <p className="text-lg text-[#888]">
            Are you here to support creators or launch your own community?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <Link
              href="/dashboard"
              className="group block rounded-lg border border-[#222222] bg-[#0D0D0D] p-8 text-center transition-all hover:border-[#10BB35]"
            >
              <div className="flex justify-center mb-4">
                <User className="h-12 w-12 text-[#888] group-hover:text-[#10BB35]" />
              </div>
              <h2 className="text-2xl font-semibold">I am a Backer</h2>
              <p className="text-[#888] mt-2">
                Browse creators, back your favorites, and earn rewards.
              </p>
            </Link>

            <Link
              href="/studio"
              className="group block rounded-lg border border-[#222222] bg-[#0D0D0D] p-8 text-center transition-all hover:border-[#10BB35]"
            >
              <div className="flex justify-center mb-4">
                <Rocket className="h-12 w-12 text-[#888] group-hover:text-[#10BB35]" />
              </div>
              <h2 className="text-2xl font-semibold">I am a Creator</h2>
              <p className="text-[#888] mt-2">
                Launch your pool, manage your backers, and grow your community.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

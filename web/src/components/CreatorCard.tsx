"use client";

import ElectricBorder from '@/components/ElectricBorder';
import { useState } from "react";
import { Github, Youtube, Loader2 } from "lucide-react";
import { useBacker } from "@/hooks/useBacker"; // Ensure this path matches your folder structure

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CreatorCardProps {
  name: string;
  handle: string;
  niche: string;
  avatarUrl: string;
  targetPool: string;
  githubUrl: string;
  youtubeUrl: string;
  units: number; // Added: Required for the Superfluid IDA distribution
  badges?: string[]; // New: Optional array of badge strings
}

export function CreatorCard({
  name,
  handle,
  niche,
  avatarUrl,
  targetPool,
  githubUrl,
  youtubeUrl,
  units,
  badges, // Destructure new prop
}: CreatorCardProps) {
  const { addBacker } = useBacker();
  const [isPending, setIsPending] = useState(false);

  const handleBacking = async () => {
    setIsPending(true);
    try {
      await addBacker(units);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Backing failed";
      alert(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
      <Card className="group h-full bg-[#0D0D0D] border-[#222222]">
        <CardHeader className="space-y-4 border-b border-[#222222]">
          <div className="flex items-center gap-4">
            <div
              role="img"
              aria-label={`${name} avatar`}
              className="h-14 w-14 border border-[#222222] bg-cover bg-center grayscale transition duration-200 group-hover:grayscale-0"
              style={{ backgroundImage: `url(${avatarUrl})` }}
            />
            <div>
              <CardTitle className="text-[#f4f4f4]">{name}</CardTitle>
              <CardDescription className="mt-1 text-xs uppercase tracking-[0.08em] text-[#8e8e8e]">
                {handle}
              </CardDescription>
            </div>
          </div>
          <p className="text-sm text-[#b9b9b9] leading-relaxed">{niche}</p>
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="text-[10px] bg-[#10BB35]/10 text-[#10BB35] px-2 py-0.5 rounded-full font-mono uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em]">
            <span className="text-[#8d8d8d]">Backer Pool Goal</span>
            <span className="font-semibold text-[#10BB35]">{targetPool}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#222222] bg-[#090909] text-[#d8d8d8] transition hover:bg-[#111111] hover:text-[#10BB35]"
              aria-label={`${name} GitHub`}
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center border border-[#222222] bg-[#090909] text-[#d8d8d8] transition hover:bg-[#111111] hover:text-[#10BB35]"
              aria-label={`${name} YouTube`}
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full bg-[#10BB35] text-black hover:bg-[#0da02d] font-bold uppercase tracking-tighter"
            onClick={handleBacking}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Back Creator"
            )}
          </Button>
        </CardFooter>
      </Card>
  );
}

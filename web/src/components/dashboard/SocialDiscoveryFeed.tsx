"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendingCreators = [
  {
    name: "CryptoPunks",
    distributed: "$1.2M",
  },
  {
    name: "Bored Ape Yacht Club",
    distributed: "$800k",
  },
  {
    name: "SuperRare",
    distributed: "$500k",
  },
];

export function SocialDiscoveryFeed() {
  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader>
        <CardTitle>Trending Now</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendingCreators.map((creator) => (
            <div
              key={creator.name}
              className="flex items-center justify-between"
            >
              <div className="text-sm">
                <div>{creator.name}</div>
                <div className="text-xs text-[#888]">
                  {creator.distributed} distributed in last 7 days
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

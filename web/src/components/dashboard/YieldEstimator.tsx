"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function YieldEstimator() {
  const [creatorEarnings, setCreatorEarnings] = useState(100000);
  const userShare = 0.012; // 1.2%

  const userEarnings = (creatorEarnings * userShare).toFixed(2);

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader>
        <CardTitle>Yield Estimator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="creator-earnings" className="text-[#888]">
              If this creator earns:
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="creator-earnings"
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={creatorEarnings}
                onChange={(e) => setCreatorEarnings(Number(e.target.value))}
                className="w-full"
              />
              <span className="font-mono text-lg text-white">
                ${(creatorEarnings / 1000).toFixed(0)}k
              </span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[#888]">You will receive:</p>
            <p className="text-3xl font-bold text-[#10BB35]">${userEarnings}</p>
            <p className="text-xs text-[#555]">in real-time streams</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

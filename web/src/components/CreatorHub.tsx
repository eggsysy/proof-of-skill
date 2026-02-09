"use client";

import * as React from "react";
import { BanknoteArrowUp, ChevronDown, ChevronUp, Split } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreatorHub() {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 border border-[#222222] bg-[#0D0D0D] p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#888888]">
            Creator Controls
          </p>
          <p className="text-sm text-[#d7d7d7]">Manage distribution to your backer pool</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible((previous) => !previous)}
        >
          {isVisible ? (
            <ChevronUp className="mr-2 h-4 w-4" />
          ) : (
            <ChevronDown className="mr-2 h-4 w-4" />
          )}
          {isVisible ? "Hide Hub" : "Open Hub"}
        </Button>
      </div>

      {isVisible ? (
        <Card>
          <CardHeader className="border-b border-[#222222]">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Split className="h-4 w-4 text-[#10BB35]" />
              Distribute Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pool-address">Backer Pool Address</Label>
                <Input
                  id="pool-address"
                  defaultValue="0x8f93...B18a"
                  placeholder="0x..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distribute-amount">Distribution Amount (USDCx)</Label>
                <Input id="distribute-amount" defaultValue="2500" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button>
                <BanknoteArrowUp className="mr-2 h-4 w-4" />
                Distribute Funds
              </Button>
              <p className="text-xs uppercase tracking-[0.08em] text-[#8c8c8c]">
                Mock mode enabled for UI preview
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

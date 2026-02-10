"use client";

import * as React from "react";
import { BanknoteArrowUp, ChevronDown, ChevronUp, Split, Loader2 } from "lucide-react";
import { useDistribute } from "@/hooks/useDistribute"; // Import your new hook

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTRACT_ADDRESS } from "@/lib/constants";

export function CreatorHub() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [amount, setAmount] = React.useState("10"); // Default distribution amount
  
  // Destructure your distribution logic
  const { distributeRevenue, isDistributing } = useDistribute();

  const handleDistribute = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Please enter a valid amount.");
      return;
    }
    await distributeRevenue(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 border border-[#222222] bg-[#0D0D0D] p-4 rounded-lg">
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

      {isVisible && (
        <Card className="bg-[#0D0D0D] border-[#222222]">
          <CardHeader className="border-b border-[#222222]">
            <CardTitle className="flex items-center gap-2 text-sm text-[#f4f4f4]">
              <Split className="h-4 w-4 text-[#10BB35]" />
              Distribute Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pool-address" className="text-[#888]">Contract Address (Source)</Label>
                <Input
                  id="pool-address"
                  readOnly
                  value={CONTRACT_ADDRESS}
                  className="bg-black border-[#222222] text-[#555] cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="distribute-amount" className="text-[#888]">Distribution Amount (ETHx)</Label>
                <Input 
                  id="distribute-amount" 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-black border-[#222222] text-[#f4f4f4] focus:border-[#10BB35]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button 
                onClick={handleDistribute} 
                disabled={isDistributing}
                className="bg-[#10BB35] text-black hover:bg-[#0da42d] disabled:opacity-50 min-w-[160px]"
              >
                {isDistributing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Distributing...
                  </>
                ) : (
                  <>
                    <BanknoteArrowUp className="mr-2 h-4 w-4" />
                    Distribute Funds
                  </>
                )}
              </Button>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#555]">
                {isDistributing ? "Broadcasting to Sepolia..." : "Live Network: Sepolia"}
              </p>
            </div>
            
            <div className="rounded-lg border border-[#10BB35]/20 bg-[#10BB35]/5 p-3">
              <p className="text-[11px] text-[#10BB35]/80 leading-relaxed">
                <strong className="uppercase">Note:</strong> Distributing funds will split the specified amount instantly among all unit holders in the pool based on their ownership percentage.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
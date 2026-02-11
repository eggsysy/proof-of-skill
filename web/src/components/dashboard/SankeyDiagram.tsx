// src/components/dashboard/SankeyDiagram.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch } from 'lucide-react';

export function SankeyDiagram() {
  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <GitBranch className="h-5 w-5 text-[#10BB35]" /> Integrated Yield Flow
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-[#b9b9b9] mb-4">
          Visualizing the movement of your capital from pools to your portfolio.
        </p>
        {/* Placeholder for Sankey Diagram */}
        <div className="flex justify-between items-center h-48 bg-black/20 p-4 rounded-lg">
          {/* Column 1: Creator Pools */}
          <div className="w-1/4 text-center">
            <h3 className="text-sm font-bold text-[#f4f4f4] mb-2">Creator Pools</h3>
            <div className="space-y-2">
              <div className="bg-[#1A1A1A] p-2 rounded text-xs text-[#8e8e8e]">Artist A Pool</div>
              <div className="bg-[#1A1A1A] p-2 rounded text-xs text-[#8e8e8e]">Dev B Pool</div>
            </div>
          </div>

          {/* Connectors */}
          <div className="flex-1 text-center text-[#10BB35] font-mono text-xl">{`->`}</div>

          {/* Column 2: Your Portfolio */}
          <div className="w-1/3 text-center">
            <h3 className="text-sm font-bold text-[#10BB35] mb-2">Your Portfolio</h3>
            <div className="bg-[#10BB35]/10 p-4 rounded">
              <p className="text-lg font-bold text-[#10BB35]">$15.00/mo</p>
            </div>
          </div>
          
          {/* Connectors */}
          <div className="flex-1 text-center text-[#5227FF] font-mono text-xl">{`->`}</div>

          {/* Column 3: Staked/Liquid */}
          <div className="w-1/4 text-center">
            <h3 className="text-sm font-bold text-[#f4f4f4] mb-2">Allocation</h3>
            <div className="space-y-2">
              <div className="bg-[#5227FF]/10 p-2 rounded text-xs text-[#b9b9b9]">Staked</div>
              <div className="bg-[#1A1A1A] p-2 rounded text-xs text-[#8e8e8e]">Liquid</div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#8e8e8e] pt-4">
          This is a static placeholder. A full implementation would use GSAP to animate particles along these paths.
        </p>
      </CardContent>
    </Card>
  );
}

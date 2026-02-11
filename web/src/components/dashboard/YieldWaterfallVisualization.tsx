// src/components/dashboard/YieldWaterfallVisualization.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function YieldWaterfallVisualization() {
  // Placeholder data for visualization
  const sources = [
    { name: 'Artist A', amount: 10, color: '#10BB35' },
    { name: 'Dev B', amount: 5, color: '#5227FF' },
    { name: 'Writer C', amount: 7, color: '#FFD700' },
  ];

  const totalYield = sources.reduce((sum, source) => sum + source.amount, 0);

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <TrendingUp className="h-5 w-5 text-[#10BB35]" /> Yield Waterfall
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm text-[#b9b9b9]">
          Visual breakdown of your monthly yield sources.
        </p>
        <div className="space-y-2">
          {sources.map((source, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: source.color }}></span>
                {source.name}
              </span>
              <span className="font-mono text-[#f4f4f4]">${source.amount}/mo</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-md font-bold pt-2 border-t border-[#222222] mt-4">
          <span>Total Monthly Yield</span>
          <span className="text-[#10BB35]">${totalYield}/mo</span>
        </div>
        <p className="text-xs text-[#8e8e8e] pt-2">
          (This is a placeholder visualization. Actual data will be dynamic.)
        </p>
      </CardContent>
    </Card>
  );
}

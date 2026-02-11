// src/components/dashboard/Leaderboard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ElectricBorder from '@/components/ElectricBorder';
import { Trophy } from 'lucide-react';

const topBackers = [
  { name: '0x...a1', volume: 1500 },
  { name: '0x...b2', volume: 1200 },
  { name: '0x...c3', volume: 950 },
];

const risingCreators = [
  { name: 'Alex Chen', momentum: '+500%' },
  { name: 'Jasmine Lee', momentum: '+350%' },
  { name: 'Kenji Tanaka', momentum: '+280%' },
];

export function Leaderboard() {
  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <Trophy className="h-5 w-5 text-[#10BB35]" /> "Proof of Skill" Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8e8e8e] mb-3">Top Backers (by Volume)</h3>
          <div className="space-y-2">
            {topBackers.map((backer, index) => {
              const item = (
                <div className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded-lg text-sm">
                  <span className="font-mono text-[#f4f4f4]">{backer.name}</span>
                  <span className="font-semibold text-[#10BB35]">${backer.volume.toLocaleString()}</span>
                </div>
              );

              if (index === 0) {
                return (
                  <ElectricBorder
                    key={backer.name}
                    color="#10BB35"
                    speed={1}
                    chaos={0.1}
                    borderRadius={8}
                  >
                    {item}
                  </ElectricBorder>
                );
              }
              return <div key={backer.name}>{item}</div>;
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#8e8e8e] mb-3">Top Rising Creators</h3>
          <div className="space-y-2">
            {risingCreators.map((creator) => (
              <div key={creator.name} className="flex justify-between items-center bg-[#1A1A1A] p-2 rounded-lg text-sm">
                <span className="font-semibold text-[#f4f4f4]">{creator.name}</span>
                <span className="font-mono text-[#10BB35]">{creator.momentum}</span>
              </div>
            ))}
          </div>
        </div>
         <p className="text-xs text-[#8e8e8e] pt-4">
          (This is a placeholder with mock data.)
        </p>
      </CardContent>
    </Card>
  );
}

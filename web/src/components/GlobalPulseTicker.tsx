// src/components/GlobalPulseTicker.tsx
import React from 'react';

const activities = [
  "0x...f2 backed Maya Rivera",
  "New Dividend distributed by Niko Park",
  "0x...a3 increased stream to Maya Rivera",
  "0x...b5 backed Alex Chen",
  "Niko Park launched a new project",
];

export function GlobalPulseTicker() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0D0D0D] py-2 text-[#b9b9b9] text-sm border-b border-[#222222]">
      <div className="flex animate-marquee whitespace-nowrap">
        {activities.map((activity, index) => (
          <span key={index} className="mx-4">
            ✨ {activity}
          </span>
        ))}
        {/* Duplicate content for seamless looping */}
        {activities.map((activity, index) => (
          <span key={`duplicate-${index}`} className="mx-4">
            ✨ {activity}
          </span>
        ))}
      </div>
    </div>
  );
}

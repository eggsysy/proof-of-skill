// src/components/dashboard/TransactionTape.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DecryptedText } from '@/components/DecryptedText';
import { ScrollText } from 'lucide-react';

const mockEvents = [
  { type: 'Stream Started', creator: 'Maya Rivera', tx: '0x71...3a', time: '1 min ago' },
  { type: 'Dividend', creator: 'Niko Park', tx: '0x2b...c8', time: '5 mins ago' },
  { type: 'Rate Updated', creator: 'Maya Rivera', tx: '0x9e...f1', time: '12 mins ago' },
  { type: 'New Backer', creator: 'Alex Chen', tx: '0x4d...a5', time: '28 mins ago' },
];

export function TransactionTape() {
  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <ScrollText className="h-5 w-5 text-[#10BB35]" /> On-Chain Events
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {mockEvents.map((event, index) => (
          <div key={index} className="flex justify-between items-center text-xs">
            <div>
              <p className="font-bold text-[#f4f4f4]">{event.type}</p>
              <p className="text-[#8e8e8e]">
                by {event.creator} -{' '}
                <DecryptedText
                  text={event.tx}
                  speed={30}
                  maxIterations={5}
                  animateOn="hover"
                  className="text-[#10BB35] font-mono"
                  encryptedClassName="text-[#555]"
                />
              </p>
            </div>
            <p className="text-[#555] font-mono">{event.time}</p>
          </div>
        ))}
         <p className="text-xs text-[#8e8e8e] pt-4">
          (This is a placeholder with mock data.)
        </p>
      </CardContent>
    </Card>
  );
}

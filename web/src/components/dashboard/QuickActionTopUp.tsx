// src/components/dashboard/QuickActionTopUp.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QuickActionTopUp() {
  const [percentage, setPercentage] = useState('');

  const handleTopUp = () => {
    const value = parseFloat(percentage);
    if (!isNaN(value) && value > 0) {
      alert(`Topping up all streams by ${value}% (placeholder action)`);
      // Placeholder for Superfluid updateFlow logic
    } else {
      alert('Please enter a valid percentage.');
    }
  };

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="text-lg text-[#f4f4f4]">Quick-Action Top Up</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm text-[#b9b9b9]">
          Instantly increase your total support across all creators.
        </p>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Percentage (e.g., 10)"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="flex-1 bg-[#1A1A1A] border-[#222222] text-[#f4f4f4] placeholder:text-[#8e8e8e]"
          />
          <Button
            onClick={handleTopUp}
            className="bg-[#10BB35] text-black hover:bg-[#0da02d] font-bold uppercase tracking-tighter"
          >
            Boost All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
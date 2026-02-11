// src/components/dashboard/StreamHealthHeatmap.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper to generate mock data
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 12);

  for (let d = startDate; d <= today; d.setDate(d.getDate() + 1)) {
    // 90% chance of a "successful" stream day
    const consistency = Math.random() > 0.1 ? Math.random() : 0;
    data.push({
      date: new Date(d),
      consistency, // 0 (missed) to 1 (perfect)
    });
  }
  return data;
};

const getColor = (consistency: number) => {
  if (consistency === 0) return '#222222'; // Dark gray for missed days
  const greenValue = Math.floor(100 + 155 * consistency);
  const blueValue = Math.floor(53 * consistency);
  // Using a variant of the brand green for the scale
  return `rgb(16, ${greenValue}, ${blueValue})`;
};

export function StreamHealthHeatmap() {
  const data = generateHeatmapData();

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader>
        <CardTitle className="text-lg text-[#f4f4f4]">
          Stream Health (Last 12 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col flex-wrap gap-1 h-32">
          {data.map((day, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: getColor(day.consistency) }}
              title={`Date: ${day.date.toDateString()}, Consistency: ${day.consistency.toFixed(2)}`}
            />
          ))}
        </div>
        <p className="text-xs text-[#8e8e8e] pt-4">
          Visual representation of stream consistency. Each cell is a day. (Placeholder data)
        </p>
      </CardContent>
    </Card>
  );
}

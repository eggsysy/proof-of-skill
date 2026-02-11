// src/components/dashboard/HorizonAreaChart.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, DollarSign } from 'lucide-react';
import { DecryptedText } from '@/components/DecryptedText'; // Assuming this is available

// Helper to generate mock flowRate data over time
const generateFlowRateData = (numPoints: number = 60) => {
  const data = [];
  let currentFlow = 1000; // Starting flowRate
  for (let i = 0; i < numPoints; i++) {
    // Simulate some fluctuation
    currentFlow += (Math.random() - 0.5) * 50;
    if (currentFlow < 500) currentFlow = 500;
    if (currentFlow > 1500) currentFlow = 1500;
    data.push(currentFlow);
  }
  return data;
};

export function HorizonAreaChart() {
  const [flowData, setFlowData] = useState<number[]>([]);
  
  useEffect(() => {
    setFlowData(generateFlowRateData());
  }, []); // Run once on client mount

  const [hoverFlowRate, setHoverFlowRate] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);

  if (flowData.length === 0) {
    return (
      <Card className="bg-[#0D0D0D] border-[#222222]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
            <LineChart className="h-5 w-5 text-[#10BB35]" /> Stream Health (Horizon Chart)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-[#b9b9b9] mb-4">
            Loading flowRate data...
          </p>
        </CardContent>
      </Card>
    );
  }

  const maxFlow = Math.max(...flowData);
  const minFlow = Math.min(...flowData);

  // Function to create SVG path data from flow rates
  const getPathData = (data: number[], height: number, scaleY: number, offset: number = 0) => {
    const points = data.map((flow, i) => {
      const x = (i / (data.length - 1)) * 100; // Scale to 0-100 for SVG width
      const y = height - (flow - minFlow) * scaleY - offset;
      return `${x},${y}`;
    });
    return `M0,${height} L${points.join(' L')} L100,${height} Z`;
  };

  const layers = 3; // Number of horizon bands
  const baseHeight = 20; // Base height for the chart in SVG viewbox units
  const flowRange = maxFlow - minFlow;
  const scaleY = flowRange > 0 ? baseHeight / flowRange : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const svg = e.currentTarget.querySelector('svg');
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const x = e.clientX - svgRect.left; // x position within the SVG
    const percentageX = (x / svgRect.width);
    const dataIndex = Math.min(Math.floor(percentageX * flowData.length), flowData.length - 1);

    const currentFlow = flowData[dataIndex];
    if (currentFlow !== undefined) {
      setHoverFlowRate(`$${currentFlow.toFixed(2)}/sec`);
      setHoverPosition({ x: e.clientX, y: e.clientY - 30 }); // Adjust y to show above cursor
    }
  };

  const handleMouseLeave = () => {
    setHoverFlowRate(null);
    setHoverPosition(null);
  };

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <LineChart className="h-5 w-5 text-[#10BB35]" /> Stream Health (Horizon Chart)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-[#b9b9b9] mb-4">
          Visualizing your total flowRate consistency over time.
        </p>
        <div 
          className="relative h-40 w-full bg-[#0D0D0D] border border-[#222222] rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg viewBox={`0 0 100 ${baseHeight}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="horizonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10BB35" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10BB35" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {Array.from({ length: layers }).map((_, i) => (
              <path
                key={i}
                d={getPathData(flowData, baseHeight, scaleY, (layers - 1 - i) * (baseHeight / layers) * 0.5)}
                fill={`url(#horizonGradient)`}
                opacity={1 / layers + i * (0.5 / layers)} // Vary opacity for layers
                className="transition-all duration-300"
              />
            ))}
            <path
                d={getPathData(flowData, baseHeight, scaleY)} // Topmost line
                fill="none"
                stroke="#10BB35"
                strokeWidth="0.2"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
          </svg>
          {hoverFlowRate && hoverPosition && (
            <div
              className="absolute z-10 p-1 bg-black/70 border border-[#10BB35] rounded-md text-xs text-white pointer-events-none"
              style={{ left: hoverPosition.x, top: hoverPosition.y, transform: 'translateX(-50%)' }}
            >
              <DecryptedText text={hoverFlowRate} speed={30} maxIterations={5} animateOn="none" className="text-[#10BB35]" />
            </div>
          )}
        </div>
        <p className="text-xs text-[#8e8e8e] pt-4">
          (Hover to see flowRate. Simulated data and interaction.)
        </p>
      </CardContent>
    </Card>
  );
}

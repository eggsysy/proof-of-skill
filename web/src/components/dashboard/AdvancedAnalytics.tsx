// src/components/dashboard/AdvancedAnalytics.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, AlertTriangle } from 'lucide-react';

type Tab = 'tvl' | 'attribution';

export function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState<Tab>('tvl');

  const TabButton = ({ tab, currentTab, setTab, children }: { tab: Tab, currentTab: Tab, setTab: (t: Tab) => void, children: React.ReactNode }) => (
    <Button
      onClick={() => setTab(tab)}
      className={`flex-1 transition-colors ${
        currentTab === tab 
          ? 'bg-[#10BB35] text-black' 
          : 'bg-transparent text-[#8e8e8e] hover:bg-[#1A1A1A] hover:text-[#f4f4f4]'
      }`}
    >
      {children}
    </Button>
  );

  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader className="border-b border-[#222222] pb-4">
        <CardTitle className="flex items-center gap-2 text-lg text-[#f4f4f4]">
          <BarChart className="h-5 w-5 text-[#10BB35]" /> Advanced Analytics (The "Alpha" Tab)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex bg-[#090909] border border-[#222222] rounded-lg p-1 mb-6">
          <TabButton tab="tvl" currentTab={activeTab} setTab={setActiveTab}>TVL</TabButton>
          <TabButton tab="attribution" currentTab={activeTab} setTab={setActiveTab}>Yield Attribution</TabButton>
        </div>

        <div>
          {activeTab === 'tvl' && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Total Value Locked</h3>
              <p className="text-sm text-[#8e8e8e] mb-4">Current total capital backing creators in your portfolio.</p>
              <div className="bg-[#1A1A1A] p-4 rounded-lg">
                <div className="flex justify-between text-lg font-bold text-[#10BB35] mb-2">
                  <span>Total:</span>
                  <span>$1,234,567</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#f4f4f4]">
                    <span>Maya Rivera:</span>
                    <span>$500,000</span>
                  </div>
                  <div className="flex justify-between text-[#f4f4f4]">
                    <span>Niko Park:</span>
                    <span>$350,000</span>
                  </div>
                  <div className="flex justify-between text-[#f4f4f4]">
                    <span>Alex Chen:</span>
                    <span>$200,000</span>
                  </div>
                  <div className="flex justify-between text-[#f4f4f4]">
                    <span>Others:</span>
                    <span>$184,567</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'attribution' && (
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-4">Yield by Niche</h3>
              {/* Placeholder Pie Chart */}
              <div 
                className="w-48 h-48 mx-auto rounded-full flex items-center justify-center text-white relative"
                style={{
                  background: 'conic-gradient(#10BB35 0% 45%, #5227FF 45% 75%, #FFD700 75% 90%, #F06A26 90% 100%)'
                }}
              >
                <div className="bg-[#0D0D0D] w-32 h-32 rounded-full absolute" />
                <span className="relative z-10 text-xl font-bold text-[#f4f4f4]">ROI</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-[#b9b9b9]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-[#10BB35] rounded-full" /> Tech (45%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-[#5227FF] rounded-full" /> Art (30%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-[#FFD700] rounded-full" /> Gaming (15%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 bg-[#F06A26] rounded-full" /> Education (10%)</span>
              </div>
              <p className="text-xs text-[#8e8e8e] mt-4">
                (Based on current portfolio yield, placeholder percentages.)
              </p>
            </div>
          )}
        </div> {/* This closes the div that was opened after TabButtons */}


      </CardContent>
    </Card>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const backers: { address: string; units: number }[] = [];

export function BackerList() {
  return (
    <Card className="bg-[#0D0D0D] border-[#222222]">
      <CardHeader>
        <CardTitle>Top Backers</CardTitle>
      </CardHeader>
      <CardContent>
        {backers.length > 0 ? (
          <div className="space-y-4">
            {backers.map((backer) => (
              <div
                key={backer.address}
                className="flex items-center justify-between"
              >
                <div className="text-sm">
                  <div className="font-mono">{backer.address}</div>
                  <div>{backer.units} units</div>
                </div>
                <Button variant="outline" size="sm">
                  Send Perk
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center py-12 border border-dashed border-[#222222] text-[#555]">
            <UserPlus className="h-12 w-12" />
            <h3 className="text-lg font-semibold">Invite your first fan</h3>
            <p className="text-sm">
              Share your pool link to start building your community.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

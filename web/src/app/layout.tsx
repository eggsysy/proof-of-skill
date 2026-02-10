import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { Web3Provider } from "@/components/Web3Provider";
import TargetCursor from '@/components/TargetCursor'; // Import the new component

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Proof of Skill | Superfluid Dashboard",
  description: "Creator revenue-sharing dashboard powered by Superfluid streams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased bg-[#050505]`}>
        {/* Global custom cursor component */}
        
        
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
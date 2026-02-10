"use client";

import { ShieldCheck, Wallet, Zap } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

function truncateAddress(address?: string) {
  if (!address) {
    return "CONNECT WALLET";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Navigation() {
  const { address, chainId, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const router = useRouter();

  const handleWalletAction = () => {
    if (!isConnected) {
      if (connectors[0]) {
        connect({ connector: connectors[0] },{
          onSuccess: () => {
            router.push('/auth');
          }
        });
      }
      return;
    }

    if (chainId !== polygonAmoy.id) {
      switchChain({ chainId: polygonAmoy.id });
      return;
    }

    disconnect();
  };

  const walletLabel = (() => {
    if (!isConnected) {
      return "CONNECT WALLET";
    }

    if (chainId !== polygonAmoy.id) {
      return "SWITCH TO AMOY";
    }

    return truncateAddress(address);
  })();

  return (
    <header className="sticky top-0 z-50 border-b border-[#222222] bg-[#050505]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center border border-[#10BB35] bg-[#0D0D0D] text-[#10BB35]">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
              Proof of Skill
            </p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#7c7c7c]">
              Superfluid Revenue Rails
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 border border-[#222222] bg-[#0D0D0D] px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-[#9f9f9f] sm:flex">
            <ShieldCheck className="h-3 w-3 text-[#10BB35]" />
            Polygon Amoy
          </div>
          <Button
            variant="outline"
            className="min-w-[172px] bg-[#0D0D0D]"
            onClick={handleWalletAction}
            disabled={isPending}
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isPending ? "CONNECTING..." : walletLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}

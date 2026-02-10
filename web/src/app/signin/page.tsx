"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Get the role from URL (e.g., ?role=creator) or default to backer
  const fallbackRole = searchParams.get("role") || "backer";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sign in failed", {
        description: error.message,
      });
      setLoading(false);
    } else {
      toast.success("Signed in successfully!", {
        description: "Redirecting to your dashboard...",
      });

      // Priority: 1. User Metadata (from Supabase) | 2. URL Parameter | 3. Default
      const userRole = data.user?.user_metadata?.role || fallbackRole;

      // Push to the role-specific dashboard
      if (userRole === "creator") {
        router.push("/dashboard/creator");
      } else {
        router.push("/dashboard/backer");
      }
      
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#888]">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-black border-[#222222] text-[#f4f4f4] focus:border-[#10BB35]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#888]">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-black border-[#222222] text-[#f4f4f4] focus:border-[#10BB35]"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-[#10BB35] text-black hover:bg-[#0da42d] disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </>
        )}
      </Button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />
      <section className="px-4 py-14 flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#0D0D0D] border-[#222222]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
            <CardDescription className="text-[#888]">
              Sign in to access your dashboard or studio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* useSearchParams() requires a Suspense boundary in Next.js 
                to prevent de-opting into client-side rendering for the whole page.
            */}
            <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin" /></div>}>
              <SignInForm />
            </Suspense>

            <div className="mt-6 text-center text-sm text-[#888]">
              <p>Or connect your wallet:</p>
              <Button
                variant="outline"
                type="button"
                className="w-full mt-2 bg-[#0D0D0D] border-[#222222] text-[#f4f4f4] hover:bg-[#1A1A1A]"
                onClick={() => {
                  toast.info("Wallet connect functionality is handled by Navigation component.");
                }}
              >
                Connect Wallet (via Nav)
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-[#888]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#10BB35] hover:underline">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
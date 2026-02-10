"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Capture the role from the URL (e.g., /signup?role=creator)
  const role = searchParams.get('role') || 'backer';

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        // Save the chosen role into the user's permanent metadata
        data: {
          role: role,
        },
      },
    });

    if (error) {
      toast.error("Sign up failed", {
        description: error.message,
      });
      setLoading(false);
    } else {
      toast.success("Account created!", {
        description: "Please check your email to verify your account.",
      });
      setLoading(false);
      // Redirect to signin with the same role parameter
      router.push(`/signin?role=${role}`);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
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
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </>
        )}
      </Button>
    </form>
  );
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f4f4f4]">
      <Navigation />
      <section className="px-4 py-14 flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#0D0D0D] border-[#222222]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-[#888]">
              Sign up to start your journey with Proof of Skill.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin text-[#10BB35]" /></div>}>
              <SignUpForm />
            </Suspense>
            <p className="mt-4 text-center text-sm text-[#888]">
              Already have an account?{" "}
              <Link href="/signin" className="text-[#10BB35] hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
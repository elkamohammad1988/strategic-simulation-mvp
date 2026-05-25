"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = scoreStrength(password);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (passwordStrength.score < 3) {
      toast.error("Password too weak", {
        description: "Use 8+ chars with uppercase, a number, and a symbol.",
      });
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured()) {
      toast.info("Demo mode — Supabase not configured", {
        description: "Skipping signup and going to the dashboard.",
      });
      setTimeout(() => router.push("/dashboard"), 600);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name.trim().slice(0, 80) },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      // Always show the same outcome regardless of whether the email
      // was already registered — prevents account enumeration.
      toast.success("Check your email", {
        description: "If this address is available, a verification link is on its way.",
      });
      router.push("/login");
    } catch {
      // Same generic outcome on any failure
      toast.success("Check your email", {
        description: "If this address is available, a verification link is on its way.",
      });
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Start your free trial
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          14 days free. No credit card required.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length > 0 && (
            <div className="flex gap-1.5 pt-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i < passwordStrength.score
                      ? passwordStrength.color
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
          {password.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Strength: {passwordStrength.label}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create account"
          )}
        </Button>

        <ul className="space-y-2 pt-2">
          {[
            "14-day free trial of Pro",
            "All features included",
            "Cancel anytime, no credit card",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              {item}
            </li>
          ))}
        </ul>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function scoreStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const colors = [
    "bg-rose-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-emerald-500",
  ];
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  return { score, color: colors[score], label: labels[score] };
}

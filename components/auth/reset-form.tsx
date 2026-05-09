"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function ResetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!isSupabaseConfigured()) {
      toast.info("Demo mode — Supabase not configured", {
        description: "In production, an email would be sent to reset your password.",
      });
      setSent(true);
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Email sent");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to send email";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check your inbox</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a password reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reset password</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a link to reset.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            "Send reset link"
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}

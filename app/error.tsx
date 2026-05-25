"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative max-w-lg text-center animate-fade-in">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 text-white shadow-lg">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Something <span className="gradient-text">broke</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          An unexpected error occurred. We&apos;ve been notified — try refreshing,
          or hop back to the homepage.
        </p>
        {error.digest && (
          <p className="mt-3 inline-block rounded-full border border-border bg-muted/40 px-3 py-1 text-[11px] font-mono text-muted-foreground">
            ref · {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="gradient" size="lg" onClick={() => reset()}>
            <RotateCw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

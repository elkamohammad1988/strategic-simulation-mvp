"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
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
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-8 text-center animate-fade-in">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-300">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold tracking-tight">
        We couldn&apos;t load this view
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground max-w-md mx-auto">
        Something went wrong rendering this dashboard. The rest of Pulse is
        still working — try again, or refresh the page.
      </p>
      {error.digest && (
        <p className="mt-3 inline-block rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          ref · {error.digest}
        </p>
      )}
      <div className="mt-6">
        <Button variant="outline" size="sm" onClick={() => reset()}>
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}

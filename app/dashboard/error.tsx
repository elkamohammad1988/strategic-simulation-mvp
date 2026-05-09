"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&apos;t load this page. Try again, or refresh the browser.
        </p>
        <Button onClick={reset} variant="gradient" className="mt-6">
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}

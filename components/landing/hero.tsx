"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[760px] max-w-[100vw] rounded-full bg-gradient-to-br from-indigo-200/40 via-violet-200/40 to-fuchsia-200/40 dark:from-indigo-500/10 dark:via-violet-500/10 dark:to-fuchsia-500/10 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur hover:text-foreground transition-colors"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Now in public beta — AI summaries on every chart</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <h1 className="reveal reveal-delay-1 mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The dashboard your team
            <br className="hidden sm:block" />{" "}
            <span className="gradient-text">actually checks every morning.</span>
          </h1>

          <p className="reveal reveal-delay-2 mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Pulse pulls revenue, product, and growth data into one place — no SQL,
            no warehouse setup, no quarterly &ldquo;data project&rdquo;. Just the numbers your
            team needs, the moment they change.
          </p>

          <div className="reveal reveal-delay-3 mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Start free — 14 days
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See the live demo
              </Button>
            </Link>
          </div>

          <p className="reveal reveal-delay-4 mt-5 text-xs text-muted-foreground">
            No credit card. Free forever for solo founders.
          </p>
        </div>

        <div className="reveal reveal-delay-4 mt-16 sm:mt-20 relative mx-auto max-w-6xl">
          <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-tr from-indigo-500/15 via-violet-500/15 to-fuchsia-500/15 blur-3xl" />
          <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <div className="ml-3 flex h-6 flex-1 max-w-sm items-center rounded-md bg-background/80 px-3 text-[11px] text-muted-foreground border border-border/70">
                pulse.app / overview
              </div>
            </div>
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const kpis = [
    { label: "MRR", value: "$184,290", change: "+18.7%" },
    { label: "Active users", value: "32,104", change: "+14.1%" },
    { label: "Conversion", value: "3.61%", change: "+0.3pp" },
    { label: "AOV", value: "$132", change: "+7.1%" },
  ];

  const bars = [40, 58, 48, 72, 58, 85, 72, 76, 88, 95, 82, 91];
  const items = ["Overview", "Revenue", "Customers", "Products", "Reports"];

  return (
    <div className="grid grid-cols-12 gap-4 p-5 sm:p-6 bg-gradient-to-b from-card to-muted/30">
      <div className="hidden lg:block col-span-3 space-y-1.5">
        <div className="px-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
          Workspace
        </div>
        {items.map((item, i) => (
          <div
            key={item}
            className={
              i === 0
                ? "flex items-center gap-2.5 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                : "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground"
            }
          >
            <span
              className={
                i === 0
                  ? "h-1.5 w-1.5 rounded-full bg-primary"
                  : "h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
              }
            />
            {item}
          </div>
        ))}
      </div>

      <div className="col-span-12 lg:col-span-9 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-lg border border-border bg-background p-3.5"
            >
              <div className="text-[11px] text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">
                {k.value}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                {k.change}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-background p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Revenue</div>
              <div className="text-[11px] text-muted-foreground">
                Last 12 weeks · auto-refreshed 2m ago
              </div>
            </div>
            <div className="flex gap-1 rounded-md border border-border p-0.5">
              {["7d", "30d", "12w"].map((t, i) => (
                <span
                  key={t}
                  className={
                    i === 2
                      ? "rounded-[5px] bg-foreground px-2.5 py-1 text-[11px] font-medium text-background"
                      : "rounded-[5px] px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1.5 sm:gap-2 h-28 sm:h-32">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500 to-violet-400"
                style={{ height: `${h}%`, opacity: 0.55 + h / 240 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

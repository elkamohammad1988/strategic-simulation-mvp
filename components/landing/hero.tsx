"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-br from-indigo-200/40 via-violet-200/40 to-fuchsia-200/40 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span>New — AI-powered insight summaries are now live</span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Data insights,{" "}
            <span className="gradient-text">in real time.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed sm:text-xl max-w-2xl mx-auto">
            Pulse connects your databases, payments, and product analytics into
            one live dashboard. No SQL, no engineers, no waiting.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View live demo
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Free 14-day trial • No credit card required • Cancel anytime
          </p>
        </div>

        <div className="mt-20 relative mx-auto max-w-6xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="ml-4 flex h-6 flex-1 max-w-md items-center rounded-md bg-white px-3 text-xs text-muted-foreground border border-border">
                pulse.app/dashboard
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
    { label: "Revenue", value: "$184,290", change: "+18.7%" },
    { label: "Active Users", value: "32,104", change: "+14.1%" },
    { label: "Conversion", value: "3.61%", change: "+0.3pp" },
    { label: "AOV", value: "$132", change: "+7.1%" },
  ];

  const bars = [40, 65, 48, 72, 58, 85, 92, 76, 88, 95, 82, 91];

  return (
    <div className="grid grid-cols-12 gap-4 p-6 bg-gradient-to-b from-white to-muted/30">
      <div className="col-span-12 lg:col-span-3 space-y-3">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Workspace
        </div>
        {["Overview", "Revenue", "Customers", "Products", "Reports"].map(
          (item, i) => (
            <div
              key={item}
              className={
                i === 0
                  ? "flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
                  : "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground"
              }
            >
              <div
                className={
                  i === 0
                    ? "h-1.5 w-1.5 rounded-full bg-primary"
                    : "h-1.5 w-1.5 rounded-full bg-muted-foreground/30"
                }
              />
              {item}
            </div>
          )
        )}
      </div>

      <div className="col-span-12 lg:col-span-9 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-lg border border-border bg-white p-4"
            >
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-xl font-bold">{k.value}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                {k.change}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Revenue trend</div>
              <div className="text-xs text-muted-foreground">
                Last 12 weeks
              </div>
            </div>
            <div className="flex gap-1">
              {["7d", "30d", "12w"].map((t, i) => (
                <span
                  key={t}
                  className={
                    i === 2
                      ? "rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white"
                      : "rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-indigo-500 to-violet-400 transition-all"
                style={{ height: `${h}%`, opacity: 0.4 + h / 200 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

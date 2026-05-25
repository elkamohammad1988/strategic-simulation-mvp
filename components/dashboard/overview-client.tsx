"use client";

import { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TrafficPie } from "@/components/dashboard/traffic-pie";
import { Funnel } from "@/components/dashboard/funnel";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { TopProducts } from "@/components/dashboard/top-products";
import { RangeTabs } from "@/components/dashboard/range-tabs";
import { KPI_DATA, type TimeRange } from "@/lib/mock-data";

export function OverviewClient() {
  const [range, setRange] = useState<TimeRange>("30d");
  const kpis = KPI_DATA[range];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {today}
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Welcome back, Jane
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Here&apos;s your business at a glance — live as of a few seconds ago.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RangeTabs value={range} onChange={setRange} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/[0.06] via-violet-500/[0.05] to-fuchsia-500/[0.06] p-4 sm:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl"
        />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">AI insight</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/20">
                New
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Revenue grew{" "}
              <span className="font-semibold text-foreground">+18.7%</span>{" "}
              week-over-week, mostly from{" "}
              <span className="font-semibold text-foreground">
                Pulse Pro Annual
              </span>
              {" "}— but conversion dipped on weekends. Consider a weekend promo.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex-none self-start text-primary hover:bg-primary/10"
          >
            View report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate">Revenue trend</CardTitle>
              <CardDescription className="truncate">
                Daily revenue vs. forecast target
              </CardDescription>
            </div>
            <div className="flex flex-none items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Revenue
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                Target
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <RevenueChart range={range} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="truncate">Traffic sources</CardTitle>
            <CardDescription className="truncate">
              Sessions by acquisition channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficPie />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="truncate">Conversion funnel</CardTitle>
            <CardDescription className="truncate">
              From visit to paying customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Funnel />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate">Recent activity</CardTitle>
              <CardDescription className="truncate">
                Live feed of customer events
              </CardDescription>
            </div>
            <span className="inline-flex flex-none items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate">Top products</CardTitle>
            <CardDescription className="truncate">
              By revenue, in selected period
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="flex-none">
            View all
          </Button>
        </CardHeader>
        <CardContent>
          <TopProducts />
        </CardContent>
      </Card>
    </div>
  );
}

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

export default function DashboardPage() {
  const [range, setRange] = useState<TimeRange>("30d");
  const kpis = KPI_DATA[range];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, Jane — here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <RangeTabs value={range} onChange={setRange} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-4 flex items-start gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">AI insight</div>
          <p className="text-sm text-muted-foreground mt-0.5">
            Revenue grew{" "}
            <span className="font-semibold text-foreground">+18.7%</span>{" "}
            week-over-week, mostly from{" "}
            <span className="font-semibold text-foreground">
              Pulse Pro Annual
            </span>{" "}
            — but conversion dipped on weekends. Consider a weekend promo.
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Revenue trend</CardTitle>
              <CardDescription>Daily revenue vs. forecast target</CardDescription>
            </div>
            <div className="flex items-center gap-4 text-xs">
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

        <Card>
          <CardHeader>
            <CardTitle>Traffic sources</CardTitle>
            <CardDescription>Sessions by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficPie />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Conversion funnel</CardTitle>
            <CardDescription>From visit to paying customer</CardDescription>
          </CardHeader>
          <CardContent>
            <Funnel />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Live feed of customer events</CardDescription>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </CardHeader>
          <CardContent>
            <ActivityFeed />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Top products</CardTitle>
            <CardDescription>By revenue, in selected period</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
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

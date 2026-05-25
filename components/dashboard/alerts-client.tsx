"use client";

import { toast } from "sonner";
import { AlertTriangle, Bell, CheckCircle2, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const alerts = [
  {
    id: "1",
    title: "Daily revenue dropped below $5,000",
    severity: "high" as const,
    metric: "Revenue",
    triggered: "2 hours ago",
    channel: "Slack #growth-alerts",
    status: "open" as const,
  },
  {
    id: "2",
    title: "Conversion rate up 12% week-over-week",
    severity: "info" as const,
    metric: "Conversion",
    triggered: "Yesterday",
    channel: "Email · CEO",
    status: "open" as const,
  },
  {
    id: "3",
    title: "Stripe payment failure rate exceeded 2%",
    severity: "high" as const,
    metric: "Payments",
    triggered: "3 days ago",
    channel: "PagerDuty · oncall",
    status: "resolved" as const,
  },
  {
    id: "4",
    title: "Active users on track to beat monthly goal",
    severity: "info" as const,
    metric: "Users",
    triggered: "1 week ago",
    channel: "Slack #growth-alerts",
    status: "resolved" as const,
  },
];

export function AlertsClient() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Monitoring
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Get notified the moment a metric crosses a threshold.
          </p>
        </div>
        <Button
          variant="gradient"
          className="self-start sm:self-auto flex-none"
          onClick={() =>
            toast.info("Alert builder", {
              description: "Threshold rule builder coming soon.",
            })
          }
        >
          <Plus className="h-4 w-4" />
          New alert
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Open alerts", value: 2, color: "text-rose-600 dark:text-rose-400" },
          { label: "Resolved this week", value: 7, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Active rules", value: 18, color: "text-foreground" },
        ].map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground truncate">
                {s.label}
              </div>
              <div className={`mt-2 text-3xl font-bold tabular-nums truncate ${s.color}`}>
                {s.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {alerts.map((a) => {
              const isHigh = a.severity === "high";
              const isResolved = a.status === "resolved";
              const Icon = isResolved
                ? CheckCircle2
                : isHigh
                  ? AlertTriangle
                  : Bell;
              const iconCls = isResolved
                ? "text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10"
                : isHigh
                  ? "text-rose-600 bg-rose-50 dark:text-rose-300 dark:bg-rose-500/10"
                  : "text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-500/10";

              return (
                <div
                  key={a.id}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-muted/30 transition-colors"
                >
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg ${iconCls}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-medium min-w-0 flex-1 break-words">
                        {a.title}
                      </div>
                      {isResolved ? (
                        <Badge variant="muted" className="flex-none whitespace-nowrap">
                          Resolved
                        </Badge>
                      ) : isHigh ? (
                        <Badge variant="danger" className="flex-none whitespace-nowrap">
                          High
                        </Badge>
                      ) : (
                        <Badge className="flex-none whitespace-nowrap">Info</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 min-w-0">
                        {a.metric === "Revenue" && (
                          <TrendingDown className="h-3.5 w-3.5 flex-none" />
                        )}
                        {a.metric === "Conversion" && (
                          <TrendingUp className="h-3.5 w-3.5 flex-none" />
                        )}
                        <span className="truncate">{a.metric}</span>
                      </span>
                      <span className="text-border">·</span>
                      <span className="truncate">Triggered {a.triggered}</span>
                      <span className="text-border">·</span>
                      <span className="truncate min-w-0">{a.channel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

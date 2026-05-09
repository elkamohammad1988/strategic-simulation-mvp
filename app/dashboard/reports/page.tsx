"use client";

import { toast } from "sonner";
import {
  Calendar,
  Mail,
  Pause,
  Play,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { REPORTS } from "@/lib/mock-data";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Scheduled deliveries to your team — over email, Slack, or PDF.
          </p>
        </div>
        <Button
          variant="gradient"
          onClick={() =>
            toast.info("Report builder", {
              description: "Drag-and-drop report builder coming soon.",
            })
          }
        >
          <Plus className="h-4 w-4" />
          New report
        </Button>
      </div>

      <div className="grid gap-4">
        {REPORTS.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{r.name}</h3>
                  {r.status === "active" ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="muted">Paused</Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {r.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    toast.success(
                      r.status === "active"
                        ? `${r.name} paused`
                        : `${r.name} resumed`
                    )
                  }
                  aria-label={r.status === "active" ? "Pause" : "Resume"}
                >
                  {r.status === "active" ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {r.schedule}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  {r.recipients} recipients
                </span>
                <span>Last run · {r.lastRun}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-7 px-2 text-xs"
                  onClick={() => toast.info(`Running "${r.name}"...`)}
                >
                  Run now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { toast } from "sonner";
import { CheckCircle2, Plus, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DATA_SOURCES } from "@/lib/mock-data";

export function Connectors() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {DATA_SOURCES.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-border bg-white p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${s.color} text-2xl shadow-sm`}
              >
                {s.icon}
              </div>
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {s.description}
                </div>
              </div>
            </div>
            {s.status === "connected" ? (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Live
              </Badge>
            ) : (
              <Badge variant="muted">Available</Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {s.status === "connected" ? (
              <>
                <span className="text-xs text-muted-foreground">
                  Last sync · {s.lastSync}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toast.success(`Syncing ${s.name}...`)}
                    aria-label="Sync now"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toast.info(`${s.name} settings`)}
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() =>
                  toast.success(`Connecting ${s.name}...`, {
                    description: "Authentication flow will open shortly.",
                  })
                }
              >
                <Plus className="h-3.5 w-3.5" />
                Connect
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

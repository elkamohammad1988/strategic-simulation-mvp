import { Database, Activity, Zap, Clock } from "lucide-react";
import { DATA_SOURCES, WEBHOOKS } from "@/lib/mock-data";
import { formatCompact } from "@/lib/utils";

export function SourcesOverview() {
  const connected = DATA_SOURCES.filter((s) => s.status === "connected").length;
  const errored = DATA_SOURCES.filter((s) => s.status === "error").length;
  const totalRows = DATA_SOURCES.reduce((sum, s) => sum + s.rowsSynced, 0);
  const activeWebhooks = WEBHOOKS.filter((w) => w.status === "active").length;

  const stats = [
    {
      label: "Connected sources",
      value: connected.toString(),
      sub: `${DATA_SOURCES.length - connected - errored} available`,
      icon: Database,
      tone: "indigo" as const,
    },
    {
      label: "Rows synced (30d)",
      value: formatCompact(totalRows),
      sub: "All sources combined",
      icon: Activity,
      tone: "emerald" as const,
    },
    {
      label: "Active webhooks",
      value: activeWebhooks.toString(),
      sub: `${WEBHOOKS.length - activeWebhooks} paused`,
      icon: Zap,
      tone: "fuchsia" as const,
    },
    {
      label: "Last successful sync",
      value: "2m ago",
      sub: errored > 0 ? `${errored} need attention` : "All sources healthy",
      icon: Clock,
      tone: errored > 0 ? ("rose" as const) : ("amber" as const),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon;
        const tones = {
          indigo: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-300",
          emerald: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-300",
          fuchsia: "text-fuchsia-600 bg-fuchsia-500/10 dark:text-fuchsia-300",
          amber: "text-amber-600 bg-amber-500/10 dark:text-amber-300",
          rose: "text-rose-600 bg-rose-500/10 dark:text-rose-300",
        }[s.tone];

        return (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground truncate">
                  {s.label}
                </div>
                <div className="mt-1.5 text-2xl font-bold tracking-tight tabular-nums">
                  {s.value}
                </div>
              </div>
              <div
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg ${tones}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground truncate">
              {s.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}

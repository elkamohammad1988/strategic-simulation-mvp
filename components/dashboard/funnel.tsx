import { TrendingDown } from "lucide-react";
import { generateConversionFunnel } from "@/lib/mock-data";
import { formatCompact } from "@/lib/utils";

export function Funnel() {
  const stages = generateConversionFunnel();
  const max = stages[0].value;

  return (
    <div className="space-y-4">
      {stages.map((s, i) => {
        const width = (s.value / max) * 100;
        const dropoff =
          i > 0
            ? ((stages[i - 1].value - s.value) / stages[i - 1].value) * 100
            : 0;

        return (
          <div key={s.stage} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium truncate">{s.stage}</span>
              <div className="flex flex-none items-center gap-3">
                <span className="text-muted-foreground tabular-nums text-xs">
                  {formatCompact(s.value)}
                </span>
                <span className="font-semibold tabular-nums w-12 text-right">
                  {s.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="relative h-8 w-full rounded-md bg-muted/80 overflow-hidden ring-1 ring-inset ring-border/60">
              <div
                className="h-full rounded-md bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
                style={{ width: `${width}%` }}
              />
            </div>
            {i > 0 && dropoff > 0 && (
              <div className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/20">
                <TrendingDown className="h-3 w-3" />
                {dropoff.toFixed(1)}% drop-off
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

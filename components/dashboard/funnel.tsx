import { generateConversionFunnel } from "@/lib/mock-data";
import { formatCompact } from "@/lib/utils";

export function Funnel() {
  const stages = generateConversionFunnel();
  const max = stages[0].value;

  return (
    <div className="space-y-3">
      {stages.map((s, i) => {
        const width = (s.value / max) * 100;
        const dropoff =
          i > 0
            ? ((stages[i - 1].value - s.value) / stages[i - 1].value) * 100
            : 0;

        return (
          <div key={s.stage} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{s.stage}</span>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground tabular-nums">
                  {formatCompact(s.value)}
                </span>
                <span className="font-semibold tabular-nums w-12 text-right">
                  {s.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="relative h-9 w-full rounded-md bg-muted overflow-hidden">
              <div
                className="h-full rounded-md bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-700"
                style={{ width: `${width}%` }}
              />
            </div>
            {i > 0 && dropoff > 0 && (
              <div className="text-xs text-rose-600">
                ↓ {dropoff.toFixed(1)}% drop-off from {stages[i - 1].stage}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

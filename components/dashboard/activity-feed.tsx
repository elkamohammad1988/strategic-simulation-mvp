import { generateRecentActivity } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function ActivityFeed() {
  const items = generateRecentActivity();

  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 py-2.5 -mx-2 px-2 rounded-md hover:bg-muted/40 transition-colors"
        >
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white shadow-sm ring-2 ring-card">
            {item.user
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-1.5 text-sm">
              <span className="font-medium truncate">{item.user}</span>
              <span className="text-muted-foreground truncate text-xs sm:text-sm">
                {item.action}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-foreground">
              <span>{item.time}</span>
              <span className="text-border">·</span>
              <span className="inline-flex items-center rounded bg-muted px-1 py-px font-medium">
                {item.country}
              </span>
            </div>
          </div>
          {item.amount !== null && item.amount > 0 && (
            <div className="flex-none text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
              {formatCurrency(item.amount)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

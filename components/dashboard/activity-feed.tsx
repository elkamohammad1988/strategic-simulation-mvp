import { generateRecentActivity } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function ActivityFeed() {
  const items = generateRecentActivity();

  return (
    <div className="divide-y divide-border">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 py-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
            {item.user
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium truncate">{item.user}</span>
              <span className="text-muted-foreground">{item.action}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span>{item.time}</span>
              <span>·</span>
              <span>{item.country}</span>
            </div>
          </div>
          {item.amount !== null && item.amount > 0 && (
            <div className="text-sm font-semibold tabular-nums text-emerald-600">
              {formatCurrency(item.amount)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatCompact,
  formatCurrency,
  formatPercent,
} from "@/lib/utils";

type Format = "currency" | "number" | "percent";

interface KpiCardProps {
  label: string;
  value: number;
  change: number;
  format: Format;
}

export function KpiCard({ label, value, change, format }: KpiCardProps) {
  const formatted =
    format === "currency"
      ? formatCurrency(value)
      : format === "percent"
        ? `${value.toFixed(2)}%`
        : formatCompact(value);

  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const colors = {
    up: "text-emerald-600 bg-emerald-50",
    down: "text-rose-600 bg-rose-50",
    flat: "text-muted-foreground bg-muted",
  };
  const Icon =
    direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-2 flex items-baseline justify-between gap-2">
          <div className="text-2xl font-bold tracking-tight">{formatted}</div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${colors[direction]}`}
          >
            <Icon className="h-3 w-3" />
            {formatPercent(change)}
          </span>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          vs. previous period
        </div>
      </CardContent>
    </Card>
  );
}

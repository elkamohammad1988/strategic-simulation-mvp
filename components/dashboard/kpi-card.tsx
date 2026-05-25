import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/utils";

type Format = "currency" | "number" | "percent";

interface KpiCardProps {
  label: string;
  value: number;
  change: number;
  format: Format;
}

type Direction = "up" | "down" | "flat";

function formatKpiValue(value: number, format: Format) {
  if (format === "percent") return `${value.toFixed(2)}%`;
  if (format === "currency") {
    if (value >= 100_000) {
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    return formatCurrency(value);
  }
  return formatCompact(value);
}

function Sparkline({ seed, direction }: { seed: number; direction: Direction }) {
  let s = seed || 1;
  const n = 16;
  const raw: number[] = [];
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const noise = (s / 233280 - 0.5) * 0.35;
    const slope =
      direction === "up" ? i * 0.045 : direction === "down" ? -i * 0.04 : 0;
    raw.push(0.5 + slope + noise);
  }
  const max = Math.max(...raw);
  const min = Math.min(...raw);
  const range = max - min || 1;
  const norm = raw.map((p) => (p - min) / range);
  const w = 100;
  const h = 30;
  const pts = norm.map((p, i) => {
    const x = (i / (norm.length - 1)) * w;
    const y = h - p * (h - 2) - 1;
    return [x, y] as const;
  });
  const path = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  const stroke =
    direction === "up"
      ? "stroke-emerald-500"
      : direction === "down"
        ? "stroke-rose-500"
        : "stroke-muted-foreground/60";
  const fill =
    direction === "up"
      ? "fill-emerald-500/15"
      : direction === "down"
        ? "fill-rose-500/15"
        : "fill-muted-foreground/10";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-8 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={area} className={fill} />
      <path
        d={path}
        fill="none"
        className={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function KpiCard({ label, value, change, format }: KpiCardProps) {
  const formatted = formatKpiValue(value, format);
  const direction: Direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const badge = {
    up: "text-emerald-700 bg-emerald-500/10 ring-1 ring-emerald-500/20 dark:text-emerald-300 dark:bg-emerald-500/15 dark:ring-emerald-400/20",
    down: "text-rose-700 bg-rose-500/10 ring-1 ring-rose-500/20 dark:text-rose-300 dark:bg-rose-500/15 dark:ring-rose-400/20",
    flat: "text-muted-foreground bg-muted ring-1 ring-border",
  }[direction];
  const Icon =
    direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;

  let seed = 0;
  for (let i = 0; i < label.length; i++) seed = (seed * 31 + label.charCodeAt(i)) | 0;
  seed = Math.abs(seed) + Math.abs(Math.round(change * 100));

  return (
    <Card className="group relative overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${
          direction === "up"
            ? "from-transparent via-emerald-500/60 to-transparent"
            : direction === "down"
              ? "from-transparent via-rose-500/60 to-transparent"
              : "from-transparent via-border to-transparent"
        }`}
      />
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground truncate">
            {label}
          </div>
          <span
            className={`inline-flex flex-none items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${badge}`}
          >
            <Icon className="h-3 w-3" />
            {formatPercent(change)}
          </span>
        </div>

        <div className="mt-2.5 text-[1.75rem] leading-none font-bold tracking-tight tabular-nums truncate">
          {formatted}
        </div>

        <div className="mt-4 -mx-1">
          <Sparkline seed={seed} direction={direction} />
        </div>

        <div className="mt-1.5 text-[11px] text-muted-foreground">
          vs. previous period
        </div>
      </CardContent>
    </Card>
  );
}

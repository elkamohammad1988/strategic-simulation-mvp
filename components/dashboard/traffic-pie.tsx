"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { generateTrafficSources } from "@/lib/mock-data";
import { formatCompact } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

export function TrafficPie() {
  const data = generateTrafficSources();
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const { resolved } = useTheme();
  const isDark = resolved === "dark";

  const pieStroke = isDark ? "hsl(224 24% 10%)" : "hsl(0 0% 100%)";
  const tooltipBg = isDark ? "hsl(224 24% 10%)" : "hsl(0 0% 100%)";
  const tooltipBorder = isDark ? "hsl(220 13% 22%)" : "hsl(220 13% 91%)";
  const tooltipText = isDark ? "hsl(210 20% 96%)" : "hsl(224 71% 4%)";

  const top = [...data].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-40 w-40 flex-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={48}
              outerRadius={75}
              paddingAngle={2}
              stroke={pieStroke}
              strokeWidth={2}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${tooltipBorder}`,
                backgroundColor: tooltipBg,
                color: tooltipText,
                fontSize: 12,
              }}
              labelStyle={{ color: tooltipText }}
              itemStyle={{ color: tooltipText }}
              formatter={(value: number) => formatCompact(value)}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Total
          </div>
          <div className="text-xl font-bold tabular-nums leading-tight">
            {formatCompact(total)}
          </div>
        </div>
      </div>

      <div className="w-full min-w-0 space-y-1">
        {data.map((d) => {
          const pct = (d.value / total) * 100;
          const isTop = d.name === top.name;
          return (
            <div
              key={d.name}
              className="group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted/60"
            >
              <span
                className="h-2.5 w-2.5 flex-none rounded-sm shadow-sm ring-1 ring-black/5"
                style={{ background: d.color }}
              />
              <span className="min-w-0 flex-1 font-medium truncate">
                {d.name}
                {isTop && (
                  <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    top
                  </span>
                )}
              </span>
              <span className="flex-none text-xs font-semibold tabular-nums tracking-tight">
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

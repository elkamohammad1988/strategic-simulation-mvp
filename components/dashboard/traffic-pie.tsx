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

export function TrafficPie() {
  const data = generateTrafficSources();
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative h-48 w-48 flex-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={2}
              stroke="white"
              strokeWidth={2}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid hsl(220 13% 91%)",
                fontSize: 12,
              }}
              formatter={(value: number) => formatCompact(value)}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-2xl font-bold">{formatCompact(total)}</div>
          <div className="text-xs text-muted-foreground">total</div>
        </div>
      </div>

      <div className="flex-1 space-y-2.5 w-full">
        {data.map((d) => {
          const pct = (d.value / total) * 100;
          return (
            <div key={d.name} className="flex items-center gap-3 text-sm">
              <span
                className="h-3 w-3 flex-none rounded-sm"
                style={{ background: d.color }}
              />
              <span className="flex-1 font-medium">{d.name}</span>
              <span className="text-muted-foreground tabular-nums">
                {formatCompact(d.value)}
              </span>
              <span className="w-12 text-right text-xs text-muted-foreground tabular-nums">
                {pct.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

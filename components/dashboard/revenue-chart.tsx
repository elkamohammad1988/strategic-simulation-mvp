"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimeRange } from "@/lib/mock-data";
import { generateRevenueSeries } from "@/lib/mock-data";
import { formatCompact, formatCurrency } from "@/lib/utils";

export function RevenueChart({ range }: { range: TimeRange }) {
  const data = generateRevenueSeries(range);

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(243 75% 59%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(243 75% 59%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(326 78% 60%)" stopOpacity={0.15} />
              <stop offset="100%" stopColor="hsl(326 78% 60%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="hsl(220 9% 46%)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(220 9% 46%)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatCompact(v)}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(220 13% 91%)",
              fontSize: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number) => formatCurrency(value)}
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="hsl(326 78% 60%)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="url(#targetGradient)"
            name="Target"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(243 75% 59%)"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            name="Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

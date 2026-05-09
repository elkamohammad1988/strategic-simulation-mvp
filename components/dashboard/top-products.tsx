import { TrendingUp, TrendingDown } from "lucide-react";
import { generateTopProducts } from "@/lib/mock-data";
import { formatCurrency, formatPercent, formatCompact } from "@/lib/utils";

export function TopProducts() {
  const products = generateTopProducts();
  const max = Math.max(...products.map((p) => p.revenue));

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <th className="text-left font-medium pb-3 pr-4">Product</th>
            <th className="text-left font-medium pb-3 pr-4">Category</th>
            <th className="text-right font-medium pb-3 pr-4">Revenue</th>
            <th className="text-right font-medium pb-3 pr-4">Units</th>
            <th className="text-right font-medium pb-3">Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.name} className="hover:bg-muted/30 transition-colors">
              <td className="py-3 pr-4 font-medium">{p.name}</td>
              <td className="py-3 pr-4">
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {p.category}
                </span>
              </td>
              <td className="py-3 pr-4 text-right">
                <div className="font-semibold tabular-nums">
                  {formatCurrency(p.revenue)}
                </div>
                <div className="mt-1 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    style={{ width: `${(p.revenue / max) * 100}%` }}
                  />
                </div>
              </td>
              <td className="py-3 pr-4 text-right tabular-nums text-muted-foreground">
                {formatCompact(p.units)}
              </td>
              <td className="py-3 text-right">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${
                    p.change > 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {p.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercent(p.change)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

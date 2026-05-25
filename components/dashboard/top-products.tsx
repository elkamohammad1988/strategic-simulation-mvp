import { TrendingUp, TrendingDown } from "lucide-react";
import { generateTopProducts } from "@/lib/mock-data";
import { formatCurrency, formatPercent, formatCompact } from "@/lib/utils";

export function TopProducts() {
  const products = generateTopProducts();
  const max = Math.max(...products.map((p) => p.revenue));

  return (
    <div className="-mx-2 overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
            <th className="text-left font-semibold py-2 px-2">Product</th>
            <th className="text-left font-semibold py-2 px-2 hidden sm:table-cell">
              Category
            </th>
            <th className="text-right font-semibold py-2 px-2 w-[40%]">
              Revenue
            </th>
            <th className="text-right font-semibold py-2 px-2 hidden md:table-cell">
              Units
            </th>
            <th className="text-right font-semibold py-2 px-2">Δ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr
              key={p.name}
              className="group hover:bg-muted/30 transition-colors"
            >
              <td className="py-3 px-2">
                <div className="font-medium truncate">{p.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                  {p.category}
                </div>
              </td>
              <td className="py-3 px-2 hidden sm:table-cell">
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {p.category}
                </span>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center justify-end gap-3">
                  <div className="hidden xl:block flex-1 max-w-[180px]">
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500 group-hover:from-indigo-400 group-hover:to-fuchsia-400"
                        style={{ width: `${(p.revenue / max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="font-semibold tabular-nums whitespace-nowrap">
                    {formatCurrency(p.revenue)}
                  </div>
                </div>
                <div className="mt-1.5 h-1 w-full bg-muted rounded-full overflow-hidden xl:hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                    style={{ width: `${(p.revenue / max) * 100}%` }}
                  />
                </div>
              </td>
              <td className="py-3 px-2 text-right tabular-nums text-muted-foreground whitespace-nowrap hidden md:table-cell">
                {formatCompact(p.units)}
              </td>
              <td className="py-3 px-2 text-right">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold tabular-nums whitespace-nowrap ${
                    p.change > 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
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

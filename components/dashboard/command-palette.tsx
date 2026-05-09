"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  LayoutDashboard,
  Database,
  FileBarChart2,
  Bell,
  Settings,
  HelpCircle,
  Plus,
  LogOut,
  Sparkles,
  TrendingUp,
  Users,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      { id: "go-overview", label: "Go to Overview", group: "Navigation", icon: LayoutDashboard, action: () => router.push("/dashboard") },
      { id: "go-sources", label: "Go to Data sources", group: "Navigation", icon: Database, action: () => router.push("/dashboard/sources") },
      { id: "go-reports", label: "Go to Reports", group: "Navigation", icon: FileBarChart2, action: () => router.push("/dashboard/reports") },
      { id: "go-alerts", label: "Go to Alerts", group: "Navigation", icon: Bell, action: () => router.push("/dashboard/alerts") },
      { id: "go-settings", label: "Go to Settings", group: "Navigation", icon: Settings, action: () => router.push("/dashboard/settings") },
      { id: "go-help", label: "Go to Help & docs", group: "Navigation", icon: HelpCircle, action: () => router.push("/dashboard/help") },

      { id: "new-dashboard", label: "Create a new dashboard", group: "Actions", icon: Plus, action: () => window.dispatchEvent(new CustomEvent("pulse:new-dashboard")) },
      { id: "upload-csv", label: "Upload a CSV", group: "Actions", icon: Database, action: () => router.push("/dashboard/sources") },
      { id: "ai-insight", label: "Generate AI insight", group: "Actions", icon: Sparkles, action: () => window.dispatchEvent(new CustomEvent("pulse:ai-insight")) },

      { id: "metric-revenue", label: "View Revenue trend", group: "Metrics", icon: TrendingUp, action: () => router.push("/dashboard") },
      { id: "metric-users", label: "View Active users", group: "Metrics", icon: Users, action: () => router.push("/dashboard") },
      { id: "metric-conversion", label: "View Conversion funnel", group: "Metrics", icon: CreditCard, action: () => router.push("/dashboard") },

      { id: "sign-out", label: "Sign out", group: "Account", icon: LogOut, action: () => router.push("/") },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((i) => {
      if (!map.has(i.group)) map.set(i.group, []);
      map.get(i.group)!.push(i);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          item.action();
          onClose();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;

  let cursor = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl rounded-xl border border-border bg-white shadow-2xl overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto scrollbar-thin py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, list]) => (
              <div key={group}>
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </div>
                {list.map((item) => {
                  cursor++;
                  const isActive = cursor === active;
                  const Icon = item.icon;
                  const idx = cursor;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setActive(idx)}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-sm",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 flex-none" />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-border bg-white px-1 font-mono">↑</kbd>
            <kbd className="rounded border border-border bg-white px-1 font-mono">↓</kbd>
            navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-border bg-white px-1 font-mono">↵</kbd>
            select
          </span>
          <span className="ml-auto">Pulse Analytics</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  Activity,
  LayoutDashboard,
  Database,
  FileBarChart2,
  Bell,
  Settings,
  HelpCircle,
  X,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const main = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/sources", label: "Data sources", icon: Database },
  { href: "/dashboard/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/dashboard/alerts", label: "Alerts", icon: Bell, badge: 2 },
];

const bottom = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help & docs", icon: HelpCircle },
];

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (onMobileClose) onMobileClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onMobileClose?.();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 ease-out",
          "lg:static lg:translate-x-0 lg:z-auto",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-md">
              <Activity className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight">Pulse</span>
          </Link>
          <button
            onClick={onMobileClose}
            className="lg:hidden rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-3 py-3 border-b border-border">
          <button className="group flex w-full items-center gap-2.5 rounded-md border border-border bg-background px-2.5 py-2 text-sm hover:bg-muted/60 hover:border-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
            <div className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white text-xs font-bold shadow-sm">
              A
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-semibold truncate leading-tight">
                Acme Inc.
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                Pro · 4 members
              </div>
            </div>
            <ChevronsUpDown className="h-4 w-4 flex-none text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <div className="px-3 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Workspace
          </div>
          {main.map((item) => (
            <NavItem key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          {bottom.map((item) => (
            <NavItem key={item.href} item={item} active={isActive(pathname, item.href)} />
          ))}
        </div>
      </aside>
    </>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

type NavItemData = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

function NavItem({ item, active }: { item: NavItemData; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 flex-none" />
      <span className="flex-1 min-w-0 truncate">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "inline-flex h-5 min-w-5 flex-none items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums",
            active
              ? "bg-primary text-primary-foreground"
              : "bg-rose-500/15 text-rose-600 dark:text-rose-300 ring-1 ring-rose-500/20"
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

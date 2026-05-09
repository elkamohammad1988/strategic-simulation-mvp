"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  Database,
  FileBarChart2,
  Bell,
  Settings,
  HelpCircle,
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-white">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-md">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight">Pulse</span>
        </Link>
      </div>

      <div className="px-3 py-4 border-b border-border">
        <button className="flex w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/60 transition-colors">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-xs font-bold">
            A
          </div>
          <span className="flex-1 truncate text-left font-medium">
            Acme Inc.
          </span>
          <svg
            className="h-4 w-4 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 0 1 .707.293l3 3a1 1 0 0 1-1.414 1.414L10 5.414 7.707 7.707a1 1 0 0 1-1.414-1.414l3-3A1 1 0 0 1 10 3zm-3.707 9.293a1 1 0 0 1 1.414 0L10 14.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
            />
          </svg>
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
      <Icon className="h-4 w-4" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

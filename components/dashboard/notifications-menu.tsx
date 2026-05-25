"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "alert" | "insight" | "report";
};

const initial: Notification[] = [
  {
    id: "1",
    title: "Daily revenue dropped below $5,000",
    description: "Triggered 2 hours ago · Slack #growth-alerts",
    time: "2h ago",
    unread: true,
    type: "alert",
  },
  {
    id: "2",
    title: "Conversion rate up 12% week-over-week",
    description: "Pulse Pro Annual is leading the spike",
    time: "1d ago",
    unread: true,
    type: "insight",
  },
  {
    id: "3",
    title: "Weekly Revenue Report delivered",
    description: "Sent to 4 recipients · 14 charts attached",
    time: "2d ago",
    unread: false,
    type: "report",
  },
];

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>(initial);
  const ref = useRef<HTMLDivElement>(null);

  const unread = items.filter((i) => i.unread).length;

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function markAllRead() {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));
    toast.success("All notifications marked as read");
  }

  return (
    <div ref={ref} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <span className="relative">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card" />
          )}
        </span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border border-border bg-card shadow-lg z-50 animate-fade-in overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <div className="text-sm font-semibold">Notifications</div>
              <div className="text-xs text-muted-foreground">
                {unread > 0 ? `${unread} unread` : "All caught up"}
              </div>
            </div>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {items.length === 0 ? (
              <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div className="divide-y divide-border">
                {items.map((n) => (
                  <NotificationRow key={n.id} item={n} />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border px-4 py-2 text-center">
            <button className="text-xs font-medium text-primary hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationRow({ item }: { item: Notification }) {
  const config = {
    alert: {
      Icon: TrendingDown,
      cls: "text-rose-600 bg-rose-50 dark:text-rose-300 dark:bg-rose-500/15",
    },
    insight: {
      Icon: Sparkles,
      cls: "text-violet-600 bg-violet-50 dark:text-violet-300 dark:bg-violet-500/15",
    },
    report: {
      Icon: TrendingUp,
      cls: "text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/15",
    },
  }[item.type];
  const Icon = config.Icon;

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
      <div
        className={`flex h-8 w-8 flex-none items-center justify-center rounded-full ${config.cls}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="text-sm font-medium leading-snug flex-1">
            {item.title}
          </div>
          {item.unread && (
            <span className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
          )}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </div>
        <div className="mt-1 text-[10px] text-muted-foreground">{item.time}</div>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Plus,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { NotificationsMenu } from "@/components/dashboard/notifications-menu";
import { NewDashboardDialog } from "@/components/dashboard/new-dashboard-dialog";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function Topbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [newDashOpen, setNewDashOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onNewDash() {
      setNewDashOpen(true);
    }
    window.addEventListener("pulse:new-dashboard", onNewDash);
    return () => window.removeEventListener("pulse:new-dashboard", onNewDash);
  }, []);

  async function onSignOut() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    toast.success("Signed out");
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-6">
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex flex-1 items-center gap-2 max-w-md group"
        >
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="h-9 w-full rounded-md border border-border bg-muted/40 pl-9 pr-12 text-sm flex items-center text-muted-foreground group-hover:bg-white group-hover:border-primary/40 transition-colors">
              Search dashboards, metrics, sources...
            </div>
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 items-center rounded border border-border bg-white px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <NotificationsMenu />

          <Button
            variant="gradient"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => setNewDashOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New dashboard
          </Button>

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold text-white shadow-sm hover:shadow transition-shadow"
              aria-label="Account menu"
            >
              JD
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-white shadow-lg z-50 animate-fade-in overflow-hidden">
                <div className="px-3 py-3 border-b border-border">
                  <div className="text-sm font-medium">Jane Doe</div>
                  <div className="text-xs text-muted-foreground truncate">
                    jane@acme.com
                  </div>
                </div>
                <div className="py-1">
                  <MenuItem icon={UserIcon} label="Profile" onClick={() => { router.push("/dashboard/settings"); setMenuOpen(false); }} />
                  <MenuItem icon={SettingsIcon} label="Settings" onClick={() => { router.push("/dashboard/settings"); setMenuOpen(false); }} />
                </div>
                <div className="border-t border-border py-1">
                  <button
                    onClick={onSignOut}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <NewDashboardDialog open={newDashOpen} onClose={() => setNewDashOpen(false)} />
    </>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition-colors"
    >
      <Icon className="h-4 w-4 text-muted-foreground" />
      {label}
    </button>
  );
}

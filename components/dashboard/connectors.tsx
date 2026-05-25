"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  RefreshCw,
  Settings,
  Search,
  AlertTriangle,
  Trash2,
  ExternalLink,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import {
  DATA_SOURCES,
  type DataSource,
  type SourceCategory,
  type SourceStatus,
} from "@/lib/mock-data";
import { cn, formatCompact } from "@/lib/utils";

const CATEGORIES: SourceCategory[] = [
  "Payments",
  "Analytics",
  "Database",
  "E-commerce",
  "CRM",
  "Marketing",
  "Communication",
];

type ConnectorState = {
  status: SourceStatus;
  lastSync: string | null;
  rowsSynced: number;
};

export function Connectors() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SourceCategory | "all">("all");
  const [state, setState] = useState<Record<string, ConnectorState>>(() =>
    Object.fromEntries(
      DATA_SOURCES.map((s) => [
        s.id,
        { status: s.status, lastSync: s.lastSync, rowsSynced: s.rowsSynced },
      ])
    )
  );
  const [syncing, setSyncing] = useState<string | null>(null);
  const [connectTarget, setConnectTarget] = useState<DataSource | null>(null);
  const [configureTarget, setConfigureTarget] = useState<DataSource | null>(null);

  const filtered = useMemo(() => {
    return DATA_SOURCES.filter((s) => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || s.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const connected = filtered.filter((s) => state[s.id]?.status !== "available");
  const available = filtered.filter((s) => state[s.id]?.status === "available");

  function handleSync(s: DataSource) {
    setSyncing(s.id);
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        [s.id]: {
          ...prev[s.id],
          status: "connected",
          lastSync: "just now",
          rowsSynced: prev[s.id].rowsSynced + Math.floor(Math.random() * 240),
        },
      }));
      setSyncing(null);
      toast.success(`${s.name} synced`, {
        description: "All data up to date.",
      });
    }, 1100);
  }

  function handleConnect(s: DataSource, _credentials: Record<string, string>) {
    setState((prev) => ({
      ...prev,
      [s.id]: {
        status: "connected",
        lastSync: "just now",
        rowsSynced: Math.floor(Math.random() * 5000) + 200,
      },
    }));
    setConnectTarget(null);
    toast.success(`${s.name} connected`, {
      description: "Initial sync started — data appears in a few seconds.",
    });
  }

  function handleDisconnect(s: DataSource) {
    setState((prev) => ({
      ...prev,
      [s.id]: { status: "available", lastSync: null, rowsSynced: 0 },
    }));
    setConfigureTarget(null);
    toast.info(`${s.name} disconnected`);
  }

  const counts = useMemo(() => {
    const all: Record<SourceCategory | "all", number> = {
      all: DATA_SOURCES.length,
      Payments: 0,
      Analytics: 0,
      Database: 0,
      "E-commerce": 0,
      CRM: 0,
      Marketing: 0,
      Communication: 0,
    };
    for (const s of DATA_SOURCES) all[s.category]++;
    return all;
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search connectors..."
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <Button variant="outline" size="sm" className="self-start sm:self-auto">
          <ExternalLink className="h-3.5 w-3.5" />
          Request integration
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <CategoryChip
          label="All"
          count={counts.all}
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        />
        {CATEGORIES.map((c) => (
          <CategoryChip
            key={c}
            label={c}
            count={counts[c]}
            active={activeCategory === c}
            onClick={() => setActiveCategory(c)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-10 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-medium">No connectors found</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Try a different search term or category.
          </div>
        </div>
      )}

      {connected.length > 0 && (
        <Section
          title="Connected"
          count={connected.length}
          subtitle="Live and syncing"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {connected.map((s) => (
              <ConnectorCard
                key={s.id}
                source={s}
                state={state[s.id]}
                syncing={syncing === s.id}
                onSync={() => handleSync(s)}
                onConfigure={() => setConfigureTarget(s)}
              />
            ))}
          </div>
        </Section>
      )}

      {available.length > 0 && (
        <Section
          title="Available"
          count={available.length}
          subtitle="Click to connect"
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {available.map((s) => (
              <ConnectorCard
                key={s.id}
                source={s}
                state={state[s.id]}
                syncing={false}
                onConnect={() => setConnectTarget(s)}
              />
            ))}
          </div>
        </Section>
      )}

      <ConnectDialog
        source={connectTarget}
        onClose={() => setConnectTarget(null)}
        onConnect={handleConnect}
      />
      <ConfigureDialog
        source={configureTarget}
        state={configureTarget ? state[configureTarget.id] : undefined}
        onClose={() => setConfigureTarget(null)}
        onDisconnect={handleDisconnect}
      />
    </div>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {label}
      <span
        className={cn(
          "tabular-nums",
          active ? "text-primary-foreground/80" : "text-muted-foreground/70"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function Section({
  title,
  count,
  subtitle,
  children,
}: {
  title: string;
  count: number;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            {title}
          </h3>
          <span className="text-xs text-muted-foreground tabular-nums">
            {count}
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

function ConnectorCard({
  source,
  state,
  syncing,
  onSync,
  onConfigure,
  onConnect,
}: {
  source: DataSource;
  state: ConnectorState | undefined;
  syncing: boolean;
  onSync?: () => void;
  onConfigure?: () => void;
  onConnect?: () => void;
}) {
  const status = state?.status ?? source.status;
  const lastSync = state?.lastSync ?? source.lastSync;
  const rowsSynced = state?.rowsSynced ?? source.rowsSynced;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5",
        status === "error"
          ? "border-rose-500/30"
          : "border-border hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gradient-to-br text-2xl shadow-sm ring-1 ring-white/10",
            source.color
          )}
        >
          {source.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold truncate">{source.name}</div>
            <StatusPill status={status} />
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">
            {source.category}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
        {source.description}
      </p>

      {(status === "connected" || status === "error") && (
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-md bg-muted/40 px-3 py-2 text-[11px]">
          <div className="min-w-0">
            <div className="text-muted-foreground">Rows synced</div>
            <div className="mt-0.5 font-semibold tabular-nums truncate">
              {formatCompact(rowsSynced)}
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-muted-foreground">Last sync</div>
            <div className="mt-0.5 font-semibold truncate">
              {lastSync || "—"}
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-border">
        {status === "available" ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onConnect}
          >
            <Plus className="h-3.5 w-3.5" />
            Connect
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={onSync}
              disabled={syncing}
            >
              <RefreshCw
                className={cn("h-3.5 w-3.5", syncing && "animate-spin")}
              />
              {syncing ? "Syncing..." : "Sync now"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onConfigure}
              aria-label="Configure"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: SourceStatus }) {
  if (status === "connected") {
    return (
      <span className="inline-flex flex-none items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/20">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        Live
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex flex-none items-center gap-1 rounded-full bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/20">
        <AlertTriangle className="h-2.5 w-2.5" />
        Error
      </span>
    );
  }
  return null;
}

function ConnectDialog({
  source,
  onClose,
  onConnect,
}: {
  source: DataSource | null;
  onClose: () => void;
  onConnect: (s: DataSource, credentials: Record<string, string>) => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  if (!source) return null;

  function field(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onConnect(source!, form);
      setForm({});
    }, 900);
  }

  return (
    <Dialog open={!!source} onClose={onClose} className="max-w-md">
      <div className="-mx-6 -mt-5 mb-5 border-b border-border bg-gradient-to-br from-muted/40 to-transparent px-6 py-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-br text-2xl shadow-sm",
              source.color
            )}
          >
            {source.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">Connect {source.name}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {source.description}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {source.authType === "oauth" && (
          <>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              You&apos;ll be redirected to {source.name} to authorize Pulse with
              read access to your data.
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspace">Workspace ID (optional)</Label>
              <Input
                id="workspace"
                placeholder="e.g. acme-prod"
                value={form.workspace || ""}
                onChange={(e) => field("workspace", e.target.value)}
              />
            </div>
          </>
        )}

        {source.authType === "apikey" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="apikey">API key</Label>
              <Input
                id="apikey"
                type="password"
                placeholder="sk_••••••••••••••••"
                value={form.apikey || ""}
                onChange={(e) => field("apikey", e.target.value)}
                required
                autoFocus
              />
              <p className="text-[11px] text-muted-foreground">
                Stored encrypted at rest. Never exposed in the dashboard.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <select
                id="region"
                value={form.region || "us"}
                onChange={(e) => field("region", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="us">US (default)</option>
                <option value="eu">EU</option>
                <option value="apac">Asia-Pacific</option>
              </select>
            </div>
          </>
        )}

        {source.authType === "database" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input
                  id="host"
                  placeholder="db.acme.com"
                  value={form.host || ""}
                  onChange={(e) => field("host", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  placeholder="5432"
                  value={form.port || ""}
                  onChange={(e) => field("port", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="database">Database</Label>
              <Input
                id="database"
                placeholder="analytics"
                value={form.database || ""}
                onChange={(e) => field("database", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="user">User</Label>
                <Input
                  id="user"
                  placeholder="readonly"
                  value={form.user || ""}
                  onChange={(e) => field("user", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password || ""}
                  onChange={(e) => field("password", e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="freq">Sync frequency</Label>
          <select
            id="freq"
            value={form.freq || "5m"}
            onChange={(e) => field("freq", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="1m">Every 1 minute</option>
            <option value="5m">Every 5 minutes</option>
            <option value="15m">Every 15 minutes</option>
            <option value="1h">Hourly</option>
            <option value="1d">Daily</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Setup docs
          </a>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" disabled={submitting}>
              {submitting
                ? "Connecting..."
                : source.authType === "oauth"
                  ? `Authorize ${source.name}`
                  : "Connect"}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
}

function ConfigureDialog({
  source,
  state,
  onClose,
  onDisconnect,
}: {
  source: DataSource | null;
  state: ConnectorState | undefined;
  onClose: () => void;
  onDisconnect: (s: DataSource) => void;
}) {
  const [freq, setFreq] = useState("5m");
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  if (!source) return null;

  function onSaveFreq() {
    toast.success(`${source!.name} sync frequency updated`);
    onClose();
  }

  return (
    <Dialog open={!!source} onClose={onClose} className="max-w-md">
      <div className="-mx-6 -mt-5 mb-5 border-b border-border bg-gradient-to-br from-muted/40 to-transparent px-6 py-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gradient-to-br text-2xl shadow-sm",
              source.color
            )}
          >
            {source.icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{source.name}</h2>
              <StatusPill status={state?.status ?? source.status} />
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Last sync · {state?.lastSync || "never"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Rows synced" value={formatCompact(state?.rowsSynced ?? 0)} />
          <Stat label="Category" value={source.category} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="config-freq">Sync frequency</Label>
          <select
            id="config-freq"
            value={freq}
            onChange={(e) => setFreq(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="1m">Every 1 minute</option>
            <option value="5m">Every 5 minutes</option>
            <option value="15m">Every 15 minutes</option>
            <option value="1h">Hourly</option>
            <option value="1d">Daily</option>
          </select>
        </div>

        {state?.status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 text-xs">
            <AlertTriangle className="h-4 w-4 flex-none text-rose-600 dark:text-rose-400" />
            <div>
              <div className="font-medium text-rose-700 dark:text-rose-300">
                Authentication failed
              </div>
              <div className="mt-0.5 text-muted-foreground">
                The API key was revoked or has expired. Reconnect to resume
                syncing.
              </div>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs">
          <Sparkles className="h-4 w-4 flex-none text-primary mt-0.5" />
          <div>
            <div className="font-medium text-foreground">Schema auto-mapped</div>
            <div className="mt-0.5 text-muted-foreground">
              {source.name} fields are mapped to Pulse&apos;s common schema.
              Customize mapping →
            </div>
          </div>
        </div>

        {!confirmDisconnect ? (
          <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
            <Button
              variant="ghost"
              className="text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-400"
              onClick={() => setConfirmDisconnect(true)}
            >
              <Trash2 className="h-4 w-4" />
              Disconnect
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default" onClick={onSaveFreq}>
                Save changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 p-3 space-y-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 flex-none text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="text-xs">
                <div className="font-semibold text-foreground">
                  Disconnect {source.name}?
                </div>
                <div className="mt-0.5 text-muted-foreground">
                  Historical data stays. New events stop syncing immediately.
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDisconnect(false)}
              >
                Keep connected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDisconnect(source)}
              >
                Yes, disconnect
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3">
      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold truncate">{value}</div>
    </div>
  );
}


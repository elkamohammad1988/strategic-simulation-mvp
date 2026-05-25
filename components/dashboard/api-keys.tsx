"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Plus, RotateCw, KeyRound, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { API_KEYS, type ApiKey } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS);
  const [createOpen, setCreateOpen] = useState(false);

  function onCopy(masked: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(masked).catch(() => {});
    }
    toast.success("Key copied to clipboard");
  }

  function onRevoke(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.info("API key revoked");
  }

  function onRotate(id: string) {
    toast.success("New key issued", {
      description: "The previous key will be revoked in 24h.",
    });
  }

  function onCreate(name: string, scopes: ApiKey["scopes"]) {
    const random = Math.random().toString(36).slice(2, 8);
    const k: ApiKey = {
      id: `k${Date.now()}`,
      name: name || "Untitled key",
      prefix: "pls_live",
      masked: `pls_live_${random}••••••••••${random.slice(0, 4)}`,
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUsed: "Never",
      scopes,
    };
    setKeys((prev) => [k, ...prev]);
    setCreateOpen(false);
    toast.success(`Created "${k.name}"`, {
      description: "Copy the full key now — it won't be shown again.",
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] text-muted-foreground">
          Programmatic access · {keys.length} active
        </div>
        <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
          <Plus className="h-3.5 w-3.5" />
          New key
        </Button>
      </div>

      {keys.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <KeyRound className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-medium">No API keys yet</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Create one to use Pulse from your server or scripts.
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="divide-y divide-border">
            {keys.map((k) => (
              <ApiKeyRow
                key={k.id}
                k={k}
                onCopy={() => onCopy(k.masked)}
                onRotate={() => onRotate(k.id)}
                onRevoke={() => onRevoke(k.id)}
              />
            ))}
          </div>
        </div>
      )}

      <CreateKeyDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={onCreate}
      />
    </div>
  );
}

function ApiKeyRow({
  k,
  onCopy,
  onRotate,
  onRevoke,
}: {
  k: ApiKey;
  onCopy: () => void;
  onRotate: () => void;
  onRevoke: () => void;
}) {
  const [confirmRevoke, setConfirmRevoke] = useState(false);

  return (
    <div className="p-3 sm:p-4 hover:bg-muted/30 transition-colors">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium truncate">{k.name}</span>
            {k.scopes.map((s) => (
              <Badge
                key={s}
                variant={s === "admin" ? "danger" : s === "write" ? "info" : "muted"}
                className="text-[10px] uppercase tracking-wider"
              >
                {s}
              </Badge>
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs">
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground truncate">
              {k.masked}
            </code>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Created {k.created} · Last used {k.lastUsed}
          </div>
        </div>

        <div className="flex flex-none items-center gap-1">
          {!confirmRevoke ? (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCopy} aria-label="Copy">
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRotate} aria-label="Rotate">
                <RotateCw className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700",
                  "dark:text-rose-400"
                )}
                onClick={() => setConfirmRevoke(true)}
                aria-label="Revoke"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Revoke?
              </span>
              <Button variant="ghost" size="sm" onClick={() => setConfirmRevoke(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={onRevoke}>
                Revoke
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateKeyDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, scopes: ApiKey["scopes"]) => void;
}) {
  const [name, setName] = useState("");
  const [readChecked, setReadChecked] = useState(true);
  const [writeChecked, setWriteChecked] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const scopes: ApiKey["scopes"] = [];
    if (readChecked) scopes.push("read");
    if (writeChecked) scopes.push("write");
    if (adminChecked) scopes.push("admin");
    if (scopes.length === 0) {
      toast.error("Pick at least one scope");
      return;
    }
    onCreate(name, scopes);
    setName("");
    setReadChecked(true);
    setWriteChecked(false);
    setAdminChecked(false);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Create API key"
      description="Give the key a name and pick which scopes it has."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="key-name">Key name</Label>
          <Input
            id="key-name"
            placeholder="e.g. Production server"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label>Scopes</Label>
          <div className="space-y-1.5">
            <ScopeOption
              label="read"
              description="Query metrics, dashboards, and sources"
              checked={readChecked}
              onChange={setReadChecked}
            />
            <ScopeOption
              label="write"
              description="Push events and create dashboards"
              checked={writeChecked}
              onChange={setWriteChecked}
            />
            <ScopeOption
              label="admin"
              description="Manage team, billing, and integrations"
              checked={adminChecked}
              onChange={setAdminChecked}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            Generate key
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function ScopeOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors",
        checked ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
      />
      <div className="min-w-0">
        <div className="text-sm font-mono font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </label>
  );
}

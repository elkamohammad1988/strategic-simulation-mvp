"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  Webhook as WebhookIcon,
  Trash2,
  Play,
  Pause,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { WEBHOOKS, type Webhook } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const EVENT_OPTIONS = [
  "revenue.threshold",
  "conversion.drop",
  "alert.triggered",
  "weekly.report",
  "monthly.summary",
  "source.synced",
  "source.errored",
];

export function Webhooks() {
  const [hooks, setHooks] = useState<Webhook[]>(WEBHOOKS);
  const [createOpen, setCreateOpen] = useState(false);

  function toggleStatus(id: string) {
    setHooks((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: h.status === "active" ? "paused" : "active" }
          : h
      )
    );
    const h = hooks.find((x) => x.id === id);
    toast.success(
      `Webhook ${h?.status === "active" ? "paused" : "resumed"}`
    );
  }

  function remove(id: string) {
    setHooks((prev) => prev.filter((h) => h.id !== id));
    toast.info("Webhook deleted");
  }

  function sendTest(url: string) {
    toast.success("Test event sent", {
      description: `POST ${truncateUrl(url, 40)}`,
    });
  }

  function onCreate(url: string, events: string[]) {
    const h: Webhook = {
      id: `w${Date.now()}`,
      url,
      events,
      status: "active",
      deliveries: 0,
      lastDelivery: "Never",
      successRate: 100,
    };
    setHooks((prev) => [h, ...prev]);
    setCreateOpen(false);
    toast.success("Webhook created", { description: "Listening for events now." });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] text-muted-foreground">
          Outbound HTTPS endpoints · {hooks.filter((h) => h.status === "active").length} active
        </div>
        <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)}>
          <Plus className="h-3.5 w-3.5" />
          New webhook
        </Button>
      </div>

      {hooks.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <WebhookIcon className="h-5 w-5" />
          </div>
          <div className="mt-3 text-sm font-medium">No webhooks</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Push Pulse events to your own systems in real-time.
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border divide-y divide-border">
          {hooks.map((h) => (
            <WebhookRow
              key={h.id}
              hook={h}
              onToggle={() => toggleStatus(h.id)}
              onDelete={() => remove(h.id)}
              onTest={() => sendTest(h.url)}
            />
          ))}
        </div>
      )}

      <CreateWebhookDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={onCreate}
      />
    </div>
  );
}

function WebhookRow({
  hook,
  onToggle,
  onDelete,
  onTest,
}: {
  hook: Webhook;
  onToggle: () => void;
  onDelete: () => void;
  onTest: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const successCls =
    hook.successRate >= 99
      ? "text-emerald-600 dark:text-emerald-400"
      : hook.successRate >= 90
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  return (
    <div className="p-3 sm:p-4 hover:bg-muted/30 transition-colors">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground truncate max-w-full">
              {hook.url}
            </code>
            {hook.status === "active" ? (
              <Badge variant="success" className="text-[10px] flex-none">
                Active
              </Badge>
            ) : (
              <Badge variant="muted" className="text-[10px] flex-none">
                Paused
              </Badge>
            )}
          </div>
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            {hook.events.map((e) => (
              <span
                key={e}
                className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary"
              >
                {e}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{hook.deliveries.toLocaleString()} deliveries</span>
            <span className="text-border">·</span>
            <span>Last {hook.lastDelivery}</span>
            <span className="text-border">·</span>
            <span className={successCls}>{hook.successRate}% success</span>
          </div>
        </div>

        <div className="flex flex-none items-center gap-1">
          {!confirmDelete ? (
            <>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onTest} aria-label="Send test">
                <Send className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggle} aria-label="Toggle">
                {hook.status === "active" ? (
                  <Pause className="h-3.5 w-3.5" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-rose-600 hover:bg-rose-500/10 hover:text-rose-700 dark:text-rose-400"
                onClick={() => setConfirmDelete(true)}
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateWebhookDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (url: string, events: string[]) => void;
}) {
  const [url, setUrl] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(e: string) {
    setSelected((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^https:\/\//.test(url)) {
      toast.error("URL must start with https://");
      return;
    }
    if (selected.length === 0) {
      toast.error("Pick at least one event");
      return;
    }
    onCreate(url, selected);
    setUrl("");
    setSelected([]);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New webhook"
      description="Pulse will POST a JSON payload to your URL for the selected events."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hook-url">Endpoint URL</Label>
          <Input
            id="hook-url"
            placeholder="https://api.example.com/pulse"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            autoFocus
          />
          <p className="text-[11px] text-muted-foreground">
            HTTPS required. We&apos;ll retry up to 5 times on 5xx responses.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Events to subscribe to</Label>
          <div className="flex flex-wrap gap-1.5">
            {EVENT_OPTIONS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => toggle(e)}
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
                  selected.includes(e)
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient">
            Create webhook
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function truncateUrl(url: string, n: number) {
  return url.length > n ? `${url.slice(0, n)}…` : url;
}

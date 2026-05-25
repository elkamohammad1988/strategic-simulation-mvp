"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tabs = [
  { slug: "profile", label: "Profile" },
  { slug: "workspace", label: "Workspace" },
  { slug: "members", label: "Members" },
  { slug: "billing", label: "Billing" },
  { slug: "api", label: "API & Webhooks" },
] as const;
type TabSlug = (typeof tabs)[number]["slug"];

const validSlugs = new Set(tabs.map((t) => t.slug));

export function SettingsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("tab") as TabSlug | null;
  const active: TabSlug = param && validSlugs.has(param) ? param : "profile";

  const setTab = useCallback(
    (slug: TabSlug) => {
      const next = new URLSearchParams(searchParams.toString());
      if (slug === "profile") next.delete("tab");
      else next.set("tab", slug);
      const query = next.toString();
      router.replace(`/dashboard/settings${query ? `?${query}` : ""}`, {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="min-w-0">
        <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Workspace
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Manage your profile, workspace, and team.
        </p>
      </div>

      <div className="border-b border-border">
        <nav className="flex gap-1 -mb-px overflow-x-auto scrollbar-thin" aria-label="Settings sections">
          {tabs.map((t) => (
            <button
              key={t.slug}
              onClick={() => setTab(t.slug)}
              aria-current={active === t.slug ? "page" : undefined}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 rounded-t-md",
                active === t.slug
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      {active === "profile" && <ProfileSection />}
      {active === "workspace" && <WorkspaceSection />}
      {active === "members" && <MembersSection />}
      {active === "billing" && <BillingSection />}
      {active === "api" && <ApiSection />}
    </div>
  );
}

function ProfileSection() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Profile updated");
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Update your name, email, and avatar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xl font-bold text-white shadow-md">
              JD
            </div>
            <div className="space-y-1">
              <Button type="button" variant="outline" size="sm">
                Upload new
              </Button>
              <p className="text-xs text-muted-foreground">
                PNG or JPG, max 2MB
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" defaultValue="Jane" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" defaultValue="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="jane@acme.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Head of Growth" />
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="gradient">
          <Save className="h-4 w-4" />
          Save changes
        </Button>
      </div>
    </form>
  );
}

function WorkspaceSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
        <CardDescription>Settings that affect everyone on your team.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="ws-name">Workspace name</Label>
          <Input id="ws-name" defaultValue="Acme Inc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ws-slug">URL slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">pulse.app/</span>
            <Input id="ws-slug" defaultValue="acme" className="max-w-xs" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Region</Label>
          <div className="grid gap-2 sm:grid-cols-3">
            {["US (Virginia)", "EU (Frankfurt)", "APAC (Singapore)"].map((r, i) => (
              <button
                key={r}
                type="button"
                className={cn(
                  "rounded-lg border p-3 text-sm text-left transition-colors",
                  i === 1
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border hover:bg-muted"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MembersSection() {
  const members = [
    { name: "Jane Doe", email: "jane@acme.com", role: "Owner", since: "Jan 2024" },
    { name: "Mark Wei", email: "mark@acme.com", role: "Admin", since: "Mar 2024" },
    { name: "Aïcha Bennani", email: "aicha@acme.com", role: "Editor", since: "Jul 2024" },
    { name: "Hiroshi Tanaka", email: "h.tanaka@acme.com", role: "Viewer", since: "Sep 2024" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="min-w-0 flex-1">
          <CardTitle className="truncate">Members</CardTitle>
          <CardDescription className="truncate">
            4 members · 1 invitation pending
          </CardDescription>
        </div>
        <Button variant="gradient" size="sm" className="flex-none">
          Invite member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border">
          {members.map((m) => (
            <div key={m.email} className="flex items-center gap-3 sm:gap-4 py-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
                {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{m.name}</div>
                <div className="text-xs text-muted-foreground truncate">{m.email}</div>
              </div>
              <span className="hidden md:inline flex-none text-xs text-muted-foreground whitespace-nowrap">
                since {m.since}
              </span>
              <span className="inline-flex flex-none items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium whitespace-nowrap">
                {m.role}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BillingSection() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
          <CardDescription>You are on the Pro plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-lg font-bold truncate">Pulse Pro</div>
                <div className="text-sm text-muted-foreground truncate">
                  Billed monthly · 4 users
                </div>
              </div>
              <div className="text-right flex-none">
                <div className="text-2xl font-bold tabular-nums">$196</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm">Change plan</Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300"
              >
                Cancel subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 sm:gap-4 rounded-lg border border-border p-4">
            <div className="flex h-9 w-12 flex-none items-center justify-center rounded bg-foreground text-xs font-bold text-background">
              VISA
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">•••• •••• •••• 4242</div>
              <div className="text-xs text-muted-foreground truncate">Expires 09/2027</div>
            </div>
            <Button variant="outline" size="sm" className="flex-none">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApiSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API keys</CardTitle>
        <CardDescription>
          Use these to authenticate API requests and webhooks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">Production key</div>
              <div className="mt-1 font-mono text-sm break-all">
                pk_live_••••••••••••••••3f7a
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex-none"
              onClick={() => {
                navigator.clipboard.writeText("pk_live_secret_token_demo");
                toast.success("Copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
        </div>
        <div className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">Test key</div>
              <div className="mt-1 font-mono text-sm break-all">
                pk_test_••••••••••••••••a4b1
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex-none"
              onClick={() => {
                navigator.clipboard.writeText("pk_test_token_demo");
                toast.success("Copied to clipboard");
              }}
            >
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

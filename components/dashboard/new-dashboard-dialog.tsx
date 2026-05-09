"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BarChart3,
  ShoppingBag,
  Users,
  Zap,
  TrendingUp,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const templates = [
  { id: "blank", name: "Blank dashboard", description: "Start from scratch", icon: PlusCircle, accent: "from-slate-500 to-slate-600" },
  { id: "saas", name: "SaaS metrics", description: "MRR, churn, LTV, NPS", icon: TrendingUp, accent: "from-indigo-500 to-violet-500" },
  { id: "ecom", name: "E-commerce", description: "Orders, AOV, top products", icon: ShoppingBag, accent: "from-fuchsia-500 to-rose-500" },
  { id: "growth", name: "Growth & funnel", description: "Acquisition to retention", icon: Zap, accent: "from-amber-500 to-orange-500" },
  { id: "users", name: "User analytics", description: "Active users, cohorts", icon: Users, accent: "from-emerald-500 to-teal-500" },
  { id: "custom", name: "Custom KPIs", description: "Pick your own metrics", icon: BarChart3, accent: "from-cyan-500 to-blue-500" },
];

export function NewDashboardDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("blank");
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const tpl = templates.find((t) => t.id === selected);
      toast.success(`Created "${name || "Untitled dashboard"}"`, {
        description: `Template: ${tpl?.name}`,
      });
      setSubmitting(false);
      setName("");
      setSelected("blank");
      onClose();
    }, 600);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="New dashboard"
      description="Pick a template or start with a blank canvas."
      className="max-w-2xl"
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="dash-name">Dashboard name</Label>
          <Input
            id="dash-name"
            placeholder="e.g. Q1 Growth Review"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label>Template</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {templates.map((t) => {
              const isSelected = selected === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelected(t.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <div
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-md bg-gradient-to-br ${t.accent} text-white shadow-sm`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {t.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" disabled={submitting}>
            {submitting ? "Creating..." : "Create dashboard"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

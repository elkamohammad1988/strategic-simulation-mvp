"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Solo",
    price: "$0",
    cadence: "forever",
    description: "Run your first dashboard without thinking about budget.",
    features: [
      "1 workspace",
      "3 data sources",
      "10K events / month",
      "Community support",
      "Public shareable dashboards",
    ],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Team",
    price: "$49",
    cadence: "per user / month",
    description: "For small teams shipping a new metric every week.",
    features: [
      "Unlimited workspaces & sources",
      "5M events / month",
      "Slack & email alerts",
      "Scheduled email reports",
      "AI summaries on every chart",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "Let's talk",
    cadence: "custom",
    description: "When SSO, audit logs, and procurement enter the chat.",
    features: [
      "Everything in Team",
      "SSO + SCIM provisioning",
      "SOC 2 Type II report",
      "Dedicated support engineer",
      "Regional data residency",
      "Self-hosted option",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Pricing
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pay for what you use.
            <br />
            <span className="text-muted-foreground">Not per-seat tax.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Start free. Upgrade when your usage grows, not before. Cancel anytime
            from the billing page.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7 sm:p-8",
                t.highlight
                  ? "border-primary/40 shadow-lg ring-1 ring-primary/10"
                  : "border-border"
              )}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-background">
                  Most teams pick this
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed min-h-[2.5em]">
                  {t.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-[2.5rem] leading-none font-semibold tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t.cadence}
                  </span>
                </div>
              </div>

              <ul className="mt-7 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-none",
                        t.highlight ? "text-primary" : "text-foreground/70"
                      )}
                      strokeWidth={2.5}
                    />
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="mt-8">
                <Button
                  variant={t.highlight ? "gradient" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {t.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Prices in USD. Annual billing saves 20%. Startups under $5M ARR get
          50% off Team for the first year — just ask.
        </p>
      </div>
    </section>
  );
}

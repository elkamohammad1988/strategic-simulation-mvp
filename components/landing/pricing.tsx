"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    description: "Everything you need to validate your first dashboard.",
    features: [
      "1 workspace",
      "Up to 3 data sources",
      "10K events / month",
      "Community support",
      "Public dashboards",
    ],
    cta: "Start for free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    cadence: "/ user / month",
    description: "For teams shipping insights every week.",
    features: [
      "Unlimited workspaces",
      "Unlimited data sources",
      "5M events / month",
      "Slack & email alerts",
      "Scheduled reports",
      "AI insight summaries",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "talk to us",
    description: "Compliance, SSO, and dedicated infrastructure.",
    features: [
      "Everything in Pro",
      "SSO + SCIM",
      "SOC 2 Type II report",
      "Dedicated support engineer",
      "Custom data residency",
      "On-premise option",
    ],
    cta: "Contact sales",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Pricing
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing.
            <br />
            <span className="text-muted-foreground">No surprises.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free, scale when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative rounded-2xl border bg-white p-8 flex flex-col",
                t.highlight
                  ? "border-primary shadow-xl ring-1 ring-primary/20 scale-100 lg:scale-105"
                  : "border-border"
              )}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-4 py-1 text-xs font-semibold text-white shadow-md">
                  Most popular
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t.description}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {t.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {t.cadence}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                    <span>{f}</span>
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
      </div>
    </section>
  );
}

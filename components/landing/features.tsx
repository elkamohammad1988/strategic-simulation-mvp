import {
  BarChart3,
  Database,
  Zap,
  Shield,
  Bell,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Connect in a minute",
    description:
      "Stripe, Postgres, Shopify, GA4, HubSpot, and 40+ more. Drop in an API key, pick the tables, you're done.",
  },
  {
    icon: BarChart3,
    title: "Dashboards that don't feel built by engineers",
    description:
      "Drag charts, KPIs, and notes onto a canvas. Save layouts per team so finance and growth aren't fighting over the same view.",
  },
  {
    icon: Zap,
    title: "Live, not yesterday's data",
    description:
      "Numbers update the moment a payment lands or a user signs up. No 24-hour batch jobs, no stale screenshots in Slack.",
  },
  {
    icon: Bell,
    title: "Alerts you'd actually read",
    description:
      "Quiet by default — Pulse only pings when churn risk crosses your threshold or a metric breaks trend. No notification fatigue.",
  },
  {
    icon: Users,
    title: "Made for small teams",
    description:
      "Roles, audit logs, and shareable links. Drop a board in Slack and let the whole team click through, no seat upgrade needed.",
  },
  {
    icon: Shield,
    title: "Boring on security, on purpose",
    description:
      "SOC 2 Type II, GDPR, end-to-end encrypted. We don't train models on your data — ever, full stop.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            What's inside
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything a small data team needs.
            <br />
            <span className="text-muted-foreground">
              None of the enterprise bloat.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Pulse replaces three SaaS tools, a half-built internal dashboard,
            and that one Notion page nobody updates.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-card p-6 sm:p-7 transition-colors hover:bg-muted/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                <f.icon className="h-[18px] w-[18px]" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

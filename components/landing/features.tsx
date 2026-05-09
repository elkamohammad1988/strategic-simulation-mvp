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
    title: "Connect anything",
    description:
      "Stripe, Postgres, Shopify, GA4, HubSpot, and 40+ sources. Set up in under 60 seconds.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Beautiful dashboards",
    description:
      "Drag-and-drop charts, KPIs, and tables. Designed by humans, customizable for everyone.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Zap,
    title: "Real-time refresh",
    description:
      "See data the moment it lands. Powered by streaming sync, not 24-hour batch jobs.",
    accent: "from-fuchsia-500 to-rose-500",
  },
  {
    icon: Bell,
    title: "Smart alerts",
    description:
      "Get pinged on Slack the second your churn risk score crosses your threshold.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Built for teams",
    description:
      "Granular roles, audit logs, and SSO so the whole team can ship faster, safely.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Enterprise-grade",
    description:
      "SOC 2 Type II, GDPR-ready, and end-to-end encrypted. Your data, never trained on.",
    accent: "from-cyan-500 to-blue-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Features
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your team needs.
            <br />
            <span className="text-muted-foreground">Nothing they don&apos;t.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pulse replaces three tools and a half-built internal dashboard.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${f.accent} text-white shadow-sm`}
              >
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
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

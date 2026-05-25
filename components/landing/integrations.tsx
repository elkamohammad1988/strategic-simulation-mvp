const integrations = [
  { name: "Stripe", category: "Payments", hue: "262 83% 58%" },
  { name: "Postgres", category: "Database", hue: "210 78% 52%" },
  { name: "GA4", category: "Analytics", hue: "38 92% 50%" },
  { name: "Shopify", category: "Commerce", hue: "142 60% 42%" },
  { name: "HubSpot", category: "CRM", hue: "16 95% 56%" },
  { name: "Mixpanel", category: "Product", hue: "243 75% 59%" },
  { name: "Segment", category: "Pipeline", hue: "150 60% 45%" },
  { name: "Salesforce", category: "CRM", hue: "199 89% 48%" },
  { name: "BigQuery", category: "Warehouse", hue: "220 90% 55%" },
];

export function Integrations() {
  return (
    <section
      id="integrations"
      className="py-20 sm:py-24 lg:py-32 bg-muted/30 border-y border-border"
    >
      <div className="container">
        <div className="grid gap-14 lg:gap-20 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Integrations
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Plug into the stack
              <br />
              you already pay for.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground">
              40+ pre-built connectors. Drop in your credentials, choose the
              tables that matter, and Pulse handles incremental syncs, schema
              changes, and historical backfills behind the scenes.
            </p>
            <ul className="mt-8 space-y-3.5 text-sm">
              {[
                "OAuth or API key — no IT ticket needed",
                "Incremental syncs every five minutes",
                "Raw SQL when point-and-click isn't enough",
                "Webhooks for anything not on the list",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {integrations.map((i) => (
              <div
                key={i.name}
                className="rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-md"
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, hsl(${i.hue} / 1) 0%, hsl(${i.hue} / 0.7) 100%)`,
                  }}
                >
                  {i.name.charAt(0)}
                </div>
                <div className="mt-3 text-sm font-semibold tracking-tight truncate">
                  {i.name}
                </div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-0.5">
                  {i.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

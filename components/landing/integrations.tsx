const integrations = [
  { name: "Stripe", icon: "💳", category: "Payments" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "Google Analytics", icon: "📊", category: "Analytics" },
  { name: "Shopify", icon: "🛍️", category: "E-commerce" },
  { name: "HubSpot", icon: "🧲", category: "CRM" },
  { name: "Mixpanel", icon: "📈", category: "Product" },
  { name: "Segment", icon: "🔀", category: "Pipeline" },
  { name: "Salesforce", icon: "☁️", category: "CRM" },
  { name: "MySQL", icon: "🐬", category: "Database" },
  { name: "BigQuery", icon: "🔷", category: "Warehouse" },
  { name: "Snowflake", icon: "❄️", category: "Warehouse" },
  { name: "Webhooks", icon: "🪝", category: "Custom" },
];

export function Integrations() {
  return (
    <section
      id="integrations"
      className="py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-white"
    >
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Integrations
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Plug into the stack
              <br />
              you already use.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              40+ pre-built connectors. Drop in your credentials, pick the
              tables, and Pulse handles the rest — incremental syncs, schema
              evolution, and historical backfills.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "OAuth and API key authentication",
                "Incremental syncs every 5 minutes",
                "Custom SQL transformations",
                "Webhooks for any tool not on the list",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {integrations.map((i, idx) => (
              <div
                key={i.name}
                className="rounded-xl border border-border bg-white p-4 text-center hover:border-primary/40 hover:shadow-sm transition-all"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-3xl">{i.icon}</div>
                <div className="mt-2 text-sm font-semibold truncate">
                  {i.name}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
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

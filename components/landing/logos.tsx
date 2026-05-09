export function Logos() {
  const companies = [
    "Linear",
    "Notion",
    "Vercel",
    "Stripe",
    "Loom",
    "Figma",
    "Airbnb",
  ];

  return (
    <section className="border-y border-border bg-muted/30 py-10">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground">
          Trusted by data teams at fast-growing companies
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {companies.map((c) => (
            <span
              key={c}
              className="text-xl font-bold text-muted-foreground/70 grayscale hover:grayscale-0 hover:text-foreground transition-all"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

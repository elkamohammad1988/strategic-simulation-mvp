const companies = [
  "Linear",
  "Notion",
  "Vercel",
  "Stripe",
  "Loom",
  "Figma",
  "Ramp",
];

export function Logos() {
  return (
    <section className="border-y border-border bg-muted/30 py-12 sm:py-14">
      <div className="container">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Used daily by teams at
        </p>
        <div className="mt-7 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-5 items-center">
          {companies.map((c) => (
            <span
              key={c}
              className="text-center text-base sm:text-lg font-semibold tracking-tight text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

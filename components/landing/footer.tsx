import Link from "next/link";
import { Activity } from "lucide-react";

const sections = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Blog", "Careers"],
  },
  {
    title: "Resources",
    links: ["Docs", "API reference", "Templates", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "DPA", "Security"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                <Activity className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <span className="text-[17px] font-semibold tracking-tight">
                Pulse
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              The analytics layer for teams that prefer shipping over reporting.
              Connect your data, watch what matters, decide faster.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              All systems normal
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/70">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {s.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pulse Analytics, Inc. Made with care
            in Casablanca & Berlin.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <span>SOC 2 Type II</span>
            <span>GDPR</span>
            <a href="#" className="hover:text-foreground transition-colors">
              hi@pulse.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Activity } from "lucide-react";

const sections = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Customers", "Press kit"],
  },
  {
    title: "Resources",
    links: ["Docs", "Templates", "API reference", "Status", "Security"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "DPA", "Cookies", "Compliance"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-md">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight">Pulse</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              The analytics platform built for teams that ship. Connect your
              data, monitor what matters, decide faster.
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold">{s.title}</h4>
              <ul className="mt-4 space-y-2.5">
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

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pulse Analytics, Inc. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span>SOC 2 Type II</span>
            <span>GDPR ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

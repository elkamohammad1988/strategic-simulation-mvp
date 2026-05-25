import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Book, MessageCircle, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help & docs",
  description: "Guides, quickstart, templates, and how to reach support.",
};

const resources = [
  {
    icon: Book,
    title: "Documentation",
    description: "Set up guides, tutorials, and API reference.",
    href: "#",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Quickstart",
    description: "Build your first dashboard in under 10 minutes.",
    href: "#",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Sparkles,
    title: "Templates",
    description: "Pre-built dashboards for SaaS, e-commerce, and more.",
    href: "#",
    accent: "from-fuchsia-500 to-rose-500",
  },
  {
    icon: MessageCircle,
    title: "Contact support",
    description: "Pro plans get priority support within 4 business hours.",
    href: "#",
    accent: "from-amber-500 to-orange-500",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="min-w-0">
        <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Resources
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Help &amp; docs</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Everything you need to ship your first dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <Link key={r.title} href={r.href} className="group">
            <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gradient-to-br ${r.accent} text-white shadow-sm`}
                  >
                    <r.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-none text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="mt-4 font-semibold truncate">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {r.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h3 className="font-semibold truncate">Still stuck?</h3>
          <p className="mt-1 text-sm text-muted-foreground break-words">
            Email us at{" "}
            <a
              href="mailto:support@pulse.app"
              className="font-medium text-primary hover:underline"
            >
              support@pulse.app
            </a>{" "}
            — we usually reply within a few hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

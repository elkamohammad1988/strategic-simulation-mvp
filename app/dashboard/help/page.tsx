import Link from "next/link";
import { ArrowUpRight, Book, MessageCircle, Sparkles, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help &amp; docs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you need to ship your first dashboard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <Link key={r.title} href={r.href} className="group">
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${r.accent} text-white shadow-sm`}
                  >
                    <r.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <h3 className="mt-4 font-semibold">{r.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {r.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold">Still stuck?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Email us at support@pulse.app — we usually reply within a few hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

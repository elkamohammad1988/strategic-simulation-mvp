"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does setup take?",
    a: "Most teams have their first dashboard live within 10 minutes. Connect a data source via OAuth, pick a template, and Pulse handles the schema, transforms, and visualizations.",
  },
  {
    q: "Do I need to know SQL?",
    a: "Nope. Our query builder is point-and-click for 90% of use cases. If you do know SQL, you can drop into the raw editor for total control.",
  },
  {
    q: "Where is my data stored?",
    a: "Your data lives in our SOC 2 Type II infrastructure on AWS in the region you choose (US, EU, or APAC). We never train models on customer data.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No annual commitments, no cancellation fees, no hoops. Cancel from your billing settings and your account stays read-only for 30 days so you can export everything.",
  },
  {
    q: "Do you offer discounts for startups or non-profits?",
    a: "Yes — startups under $5M ARR get 50% off Pro for the first 12 months, and non-profits get Pro at no cost. Email us to apply.",
  },
  {
    q: "What happens after the free trial?",
    a: "Your account automatically converts to the free Starter tier — your dashboards keep working, just with the Starter limits. Upgrade whenever you need more.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            FAQ
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">{f.q}</span>
                <span className="flex-none text-muted-foreground">
                  {open === i ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

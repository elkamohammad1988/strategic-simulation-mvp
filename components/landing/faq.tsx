"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does setup actually take?",
    a: "Most teams have a working dashboard in under ten minutes — connect a source through OAuth, pick a template, and Pulse figures out the schema and visualizations. Bringing in raw Postgres adds maybe five.",
  },
  {
    q: "Do I need to know SQL?",
    a: "No. The query builder covers what 90% of people are trying to do — filters, group-bys, joins. If you do know SQL, there's a raw editor with autocomplete, schema browsing, and version history.",
  },
  {
    q: "Where does my data live?",
    a: "On AWS, in the region you choose — US, EU, or APAC. We're SOC 2 Type II audited, and customer data never touches model training. Ever.",
  },
  {
    q: "Can I cancel without calling someone?",
    a: "Yes. One click in billing settings. Your workspace stays read-only for 30 days so you can export everything, then it's deleted.",
  },
  {
    q: "Is there a discount for startups?",
    a: "Startups under $5M ARR get 50% off the Team plan for twelve months. Non-profits get Team free. Reply to your trial email and we'll set it up.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Your account drops to the free Solo tier — same dashboards, just with the Solo limits. Upgrade when you need more, no data loss.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32 bg-muted/30 border-y border-border">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            FAQ
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Questions worth answering.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Don't see yours? Email{" "}
            <a
              href="mailto:hi@pulse.app"
              className="font-medium text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground"
            >
              hi@pulse.app
            </a>{" "}
            — a real person replies.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left hover:bg-muted/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium tracking-tight">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-none text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-foreground"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

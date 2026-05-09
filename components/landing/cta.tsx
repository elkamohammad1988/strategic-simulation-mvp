import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-16 text-center shadow-2xl sm:px-12 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              See your data come to life.
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Join 4,000+ teams who replaced spreadsheets and SQL scripts with
              Pulse. Free for 14 days, no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 shadow-lg w-full sm:w-auto"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Explore live demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

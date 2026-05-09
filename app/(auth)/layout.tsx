import Link from "next/link";
import { Activity } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-md">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">Pulse</span>
        </Link>

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Pulse Analytics, Inc.
        </p>
      </div>

      <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative flex flex-col justify-center px-16 py-20 text-white">
          <blockquote className="text-2xl font-semibold leading-tight">
            &ldquo;Pulse cut our reporting time from 4 hours a week to zero. The
            team finally trusts a single number.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur text-lg font-bold">
              SC
            </div>
            <div>
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-sm text-white/70">Head of Growth, Linear</div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-md">
            {[
              { value: "4,200+", label: "Active teams" },
              { value: "12M+", label: "Events / day" },
              { value: "99.99%", label: "Uptime" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="mt-1 text-xs text-white/70 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

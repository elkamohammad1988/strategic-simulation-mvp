import Link from "next/link";
import { ArrowLeft, Home, LifeBuoy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative max-w-lg text-center animate-fade-in">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
          <span className="text-2xl font-extrabold">404</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Page <span className="gradient-text">not found</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or was moved. Check the URL or
          head back to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants({ variant: "gradient" })}>
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft className="h-4 w-4" />
            Go to dashboard
          </Link>
        </div>

        <div className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <LifeBuoy className="h-3.5 w-3.5" />
          Need help? Reach out at{" "}
          <a
            href="mailto:support@pulse.app"
            className="font-medium text-primary hover:underline"
          >
            support@pulse.app
          </a>
        </div>
      </div>
    </div>
  );
}

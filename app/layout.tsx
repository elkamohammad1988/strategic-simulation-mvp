import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider, noFlashScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pulse.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pulse — The dashboard your team actually checks",
    template: "%s · Pulse",
  },
  description:
    "Pulse pulls revenue, product, and growth data into one live dashboard. No SQL, no warehouse setup, no quarterly data project.",
  applicationName: "Pulse",
  keywords: [
    "analytics dashboard",
    "revenue analytics",
    "SaaS metrics",
    "product analytics",
    "live KPI dashboard",
    "small team analytics",
  ],
  authors: [{ name: "Pulse Analytics" }],
  creator: "Pulse Analytics",
  openGraph: {
    title: "Pulse — The dashboard your team actually checks",
    description:
      "One live dashboard for revenue, product, and growth. Built for small teams.",
    url: SITE_URL,
    siteName: "Pulse",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pulse — The dashboard your team actually checks",
    description:
      "One live dashboard for revenue, product, and growth. Built for small teams.",
    creator: "@pulseanalytics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0e16" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors closeButton theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}

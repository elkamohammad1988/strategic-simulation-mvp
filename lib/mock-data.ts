export type TimeRange = "7d" | "30d" | "90d" | "12m";

export const KPI_DATA = {
  "7d": [
    { label: "Total Revenue", value: 48230, change: 12.4, format: "currency" as const },
    { label: "Active Users", value: 8429, change: 8.2, format: "number" as const },
    { label: "Conversion Rate", value: 3.42, change: -0.4, format: "percent" as const },
    { label: "Avg. Order Value", value: 127, change: 5.6, format: "currency" as const },
  ],
  "30d": [
    { label: "Total Revenue", value: 184290, change: 18.7, format: "currency" as const },
    { label: "Active Users", value: 32104, change: 14.1, format: "number" as const },
    { label: "Conversion Rate", value: 3.61, change: 0.3, format: "percent" as const },
    { label: "Avg. Order Value", value: 132, change: 7.1, format: "currency" as const },
  ],
  "90d": [
    { label: "Total Revenue", value: 542800, change: 22.3, format: "currency" as const },
    { label: "Active Users", value: 89320, change: 19.8, format: "number" as const },
    { label: "Conversion Rate", value: 3.78, change: 0.7, format: "percent" as const },
    { label: "Avg. Order Value", value: 138, change: 9.4, format: "currency" as const },
  ],
  "12m": [
    { label: "Total Revenue", value: 2104500, change: 41.2, format: "currency" as const },
    { label: "Active Users", value: 312450, change: 38.6, format: "number" as const },
    { label: "Conversion Rate", value: 3.92, change: 1.2, format: "percent" as const },
    { label: "Avg. Order Value", value: 145, change: 12.8, format: "currency" as const },
  ],
};

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateRevenueSeries(range: TimeRange) {
  const points = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 12;
  const rand = seededRand(range.charCodeAt(0));
  const base = range === "12m" ? 150000 : range === "90d" ? 5000 : 6000;

  return Array.from({ length: points }, (_, i) => {
    const trend = i * (range === "12m" ? 8000 : 80);
    const noise = (rand() - 0.5) * (range === "12m" ? 30000 : 2000);
    const revenue = Math.max(0, base + trend + noise);
    const target = base + i * (range === "12m" ? 9000 : 90);

    let label: string;
    if (range === "12m") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      label = months[i];
    } else {
      const d = new Date();
      d.setDate(d.getDate() - (points - 1 - i));
      label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    return {
      date: label,
      revenue: Math.round(revenue),
      target: Math.round(target),
    };
  });
}

export function generateTrafficSources() {
  return [
    { name: "Organic Search", value: 4250, color: "hsl(243 75% 59%)" },
    { name: "Direct", value: 2840, color: "hsl(173 58% 39%)" },
    { name: "Social", value: 1920, color: "hsl(326 78% 60%)" },
    { name: "Referral", value: 1100, color: "hsl(38 92% 50%)" },
    { name: "Email", value: 720, color: "hsl(199 89% 48%)" },
  ];
}

export function generateConversionFunnel() {
  return [
    { stage: "Visitors", value: 12450, percentage: 100 },
    { stage: "Sign-ups", value: 4280, percentage: 34.4 },
    { stage: "Activated", value: 2140, percentage: 17.2 },
    { stage: "Paying", value: 421, percentage: 3.4 },
  ];
}

export function generateRecentActivity() {
  return [
    { id: "1", user: "Sarah Chen", action: "completed checkout", amount: 249, time: "2 min ago", country: "US" },
    { id: "2", user: "Marcus Weber", action: "started trial", amount: null, time: "8 min ago", country: "DE" },
    { id: "3", user: "Aïcha Bennani", action: "upgraded plan", amount: 99, time: "14 min ago", country: "MA" },
    { id: "4", user: "Hiroshi Tanaka", action: "completed checkout", amount: 549, time: "22 min ago", country: "JP" },
    { id: "5", user: "Elena Rossi", action: "completed checkout", amount: 178, time: "31 min ago", country: "IT" },
    { id: "6", user: "Kwame Asante", action: "started trial", amount: null, time: "47 min ago", country: "GH" },
    { id: "7", user: "Liu Wei", action: "completed checkout", amount: 320, time: "1 h ago", country: "CN" },
    { id: "8", user: "Sofia García", action: "downgraded plan", amount: 0, time: "1 h ago", country: "ES" },
  ];
}

export function generateTopProducts() {
  return [
    { name: "Pulse Pro Annual", category: "Subscription", revenue: 84200, units: 421, change: 18.4 },
    { name: "Pulse Team Monthly", category: "Subscription", revenue: 42800, units: 642, change: 12.1 },
    { name: "Pulse Starter", category: "Subscription", revenue: 28900, units: 1180, change: 7.8 },
    { name: "Onboarding Session", category: "Service", revenue: 14400, units: 48, change: -3.2 },
    { name: "Custom Integration", category: "Service", revenue: 12200, units: 12, change: 22.6 },
  ];
}

export const DATA_SOURCES = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Sync revenue, customers, and subscription metrics",
    icon: "💳",
    status: "connected" as const,
    lastSync: "2 minutes ago",
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    description: "Pull traffic, sessions, and conversion events",
    icon: "📊",
    status: "connected" as const,
    lastSync: "5 minutes ago",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    description: "Connect your application database directly",
    icon: "🐘",
    status: "available" as const,
    lastSync: null,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce orders, products, and customers",
    icon: "🛍️",
    status: "available" as const,
    lastSync: null,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM contacts, deals, and marketing campaigns",
    icon: "🧲",
    status: "available" as const,
    lastSync: null,
    color: "from-orange-500 to-rose-600",
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    description: "Product analytics and user behavior events",
    icon: "📈",
    status: "available" as const,
    lastSync: null,
    color: "from-purple-500 to-fuchsia-600",
  },
];

export const REPORTS = [
  {
    id: "weekly-revenue",
    name: "Weekly Revenue Report",
    description: "Revenue, MRR growth, and top-performing channels",
    schedule: "Every Monday, 9:00 AM",
    recipients: 4,
    lastRun: "2 days ago",
    status: "active" as const,
  },
  {
    id: "monthly-cohort",
    name: "Monthly Cohort Analysis",
    description: "Retention curves segmented by signup month",
    schedule: "1st of each month",
    recipients: 7,
    lastRun: "1 week ago",
    status: "active" as const,
  },
  {
    id: "campaign-performance",
    name: "Campaign Performance",
    description: "ROI by paid channel with attribution windows",
    schedule: "Every Friday, 4:00 PM",
    recipients: 3,
    lastRun: "5 hours ago",
    status: "active" as const,
  },
  {
    id: "churn-risk",
    name: "Churn Risk Alert",
    description: "Accounts predicted to cancel within 14 days",
    schedule: "Daily, 7:00 AM",
    recipients: 2,
    lastRun: "Yesterday",
    status: "paused" as const,
  },
];

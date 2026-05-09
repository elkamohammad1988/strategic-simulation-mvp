# Pulse Analytics — SaaS MVP

A production-ready SaaS analytics dashboard built with **Next.js 14 + Supabase + Tailwind**. Designed as a fast-shipping MVP foundation for any team that needs auth, a marketing site, and a data dashboard in one repo.

## What's included

- **Marketing landing page** — hero, features, integrations grid, pricing, FAQ, CTA, footer
- **Auth flow** — email/password signup + login, Google & GitHub OAuth, password strength meter, protected routes via Next.js middleware
- **Dashboard** — KPI cards, area charts, traffic donut, conversion funnel, live activity feed, top-products table, AI insight banner
- **Data sources** — drag-and-drop CSV upload (parsed client-side) + 6 connector cards (Stripe, GA4, Postgres, Shopify, HubSpot, Mixpanel)
- **Reports** — 4 scheduled report cards with run/pause controls
- **Alerts** — severity-coded alert feed with stats
- **Settings** — profile, workspace, members, billing, API keys (5 tabs)
- **Demo mode** — works without Supabase env vars (falls back to mock auth)

## Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + custom design tokens |
| Auth + DB | Supabase (`@supabase/ssr`) |
| Charts | Recharts |
| Icons | Lucide |
| Toasts | Sonner |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure Supabase
cp .env.local.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Run dev server
npm run dev
```

Open http://localhost:3000.

> **Demo mode**: if you skip step 2, login/signup will short-circuit to the dashboard so you can demo the UI without configuring Supabase.

## Supabase setup (when you're ready to go live)

1. **Create a project** at [supabase.com](https://supabase.com)
2. **Copy credentials** — `Project URL` and `anon public` key into `.env.local`
3. **Run the schema** — open Supabase SQL Editor and paste the contents of [supabase/schema.sql](supabase/schema.sql). It creates all tables, RLS policies, storage buckets, and a trigger that auto-creates a workspace on signup
4. **Configure auth** — in Authentication → URL Configuration, add `http://localhost:3000` (and your Vercel URL) as redirect URLs
5. **Enable providers** you want: Email, Google, GitHub
6. **(Optional)** Run [supabase/seed.sql](supabase/seed.sql) to populate sample data sources, reports, and alert rules
7. **Restart** `npm run dev`

The middleware in [middleware.ts](middleware.ts) automatically refreshes sessions and protects every route under `/dashboard`.

### Database schema

| Table | Purpose |
| --- | --- |
| `workspaces` | Multi-tenant container (one per signup) |
| `workspace_members` | RBAC — owner / admin / editor / viewer |
| `data_sources` | Configured connectors (Stripe, GA4, etc.) |
| `csv_uploads` | Uploaded CSV metadata (binary in `csv-uploads` bucket) |
| `reports` | Scheduled deliveries with cron + recipients |
| `alert_rules` + `alert_events` | Threshold-based alerting |

All tables have RLS enabled. Members of a workspace can read; editors+ can write; only owners can delete the workspace itself.

## Project structure

```
app/
  (auth)/
    layout.tsx        # split-screen auth shell
    login/page.tsx
    signup/page.tsx
  dashboard/
    layout.tsx        # sidebar + topbar shell
    page.tsx          # overview (KPIs + charts)
    sources/page.tsx
    reports/page.tsx
    alerts/page.tsx
    settings/page.tsx
    help/page.tsx
  layout.tsx          # root layout + Sonner Toaster
  page.tsx            # marketing landing
  globals.css

components/
  landing/            # marketing-site sections
  auth/               # login + signup forms
  dashboard/          # sidebar, topbar, charts, tables
  ui/                 # button, card, input, label, badge

lib/
  supabase/           # browser, server, middleware clients
  mock-data.ts        # KPI series, traffic, funnel, products
  utils.ts            # cn() + formatters

middleware.ts         # session refresh + route protection
```

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init" && git push

# 2. Import the repo in Vercel
# 3. Add env vars: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
# 4. Deploy
```

Then add your Vercel URL to Supabase → Authentication → URL Configuration → Site URL + Redirect URLs.

## Customizing

- **Brand color**: edit `primary` in [tailwind.config.ts](tailwind.config.ts)
- **Mock data**: change values in [lib/mock-data.ts](lib/mock-data.ts) until you wire real queries
- **New page**: drop a folder under `app/dashboard/` — sidebar nav lives in [components/dashboard/sidebar.tsx](components/dashboard/sidebar.tsx)

## License

Private / proprietary.

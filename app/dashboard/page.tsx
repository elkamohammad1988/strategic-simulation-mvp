import type { Metadata } from "next";
import { OverviewClient } from "@/components/dashboard/overview-client";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Your live business overview — revenue, active users, conversion, and AOV in one glance.",
};

export default function DashboardPage() {
  return <OverviewClient />;
}

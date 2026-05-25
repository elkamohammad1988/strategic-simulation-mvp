import type { Metadata } from "next";
import { ReportsClient } from "@/components/dashboard/reports-client";

export const metadata: Metadata = {
  title: "Reports",
  description: "Scheduled email, Slack, and PDF reports delivered to your team.",
};

export default function ReportsPage() {
  return <ReportsClient />;
}

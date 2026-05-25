import type { Metadata } from "next";
import { AlertsClient } from "@/components/dashboard/alerts-client";

export const metadata: Metadata = {
  title: "Alerts",
  description: "Threshold-based alerts delivered to Slack, email, and PagerDuty.",
};

export default function AlertsPage() {
  return <AlertsClient />;
}

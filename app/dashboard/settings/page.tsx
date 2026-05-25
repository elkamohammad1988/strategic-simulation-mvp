import { Suspense } from "react";
import type { Metadata } from "next";
import { SettingsClient } from "@/components/dashboard/settings-client";

export const metadata: Metadata = {
  title: "Settings",
  description: "Profile, workspace, members, billing, and API keys.",
};

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsClient />
    </Suspense>
  );
}

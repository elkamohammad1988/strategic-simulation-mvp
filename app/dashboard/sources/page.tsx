import type { Metadata } from "next";
import { Database, KeyRound, Webhook as WebhookIcon, FileUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Connectors } from "@/components/dashboard/connectors";
import { CsvUpload } from "@/components/dashboard/csv-upload";
import { SourcesOverview } from "@/components/dashboard/sources-overview";
import { ApiKeys } from "@/components/dashboard/api-keys";
import { Webhooks } from "@/components/dashboard/webhooks";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Stripe, Postgres, Shopify, GA4, and 40+ integrations. Manage API keys and webhooks.",
};

export default function SourcesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Data sources
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Integrations
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Connect external services, upload files, or push events through our
            API. Everything syncs in real-time.
          </p>
        </div>
      </div>

      <SourcesOverview />

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <CardTitle>Connectors</CardTitle>
              <CardDescription>
                Pre-built integrations · new ones added every week
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Connectors />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <FileUp className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <CardTitle>Upload a CSV</CardTitle>
              <CardDescription>
                Drop a file — we parse the schema and let you query it like any
                other source
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CsvUpload />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
                <KeyRound className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <CardTitle>API keys</CardTitle>
                <CardDescription>
                  Use the Pulse HTTP API to push events or query metrics
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ApiKeys />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300">
                <WebhookIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Send real-time events to your own infrastructure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Webhooks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

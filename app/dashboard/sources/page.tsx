import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Connectors } from "@/components/dashboard/connectors";
import { CsvUpload } from "@/components/dashboard/csv-upload";

export default function SourcesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data sources</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect external services or upload files. Pulse syncs everything in
          real time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload a CSV</CardTitle>
          <CardDescription>
            Drop a file from your computer. We parse the schema and let you query
            it like any other source.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CsvUpload />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connectors</CardTitle>
          <CardDescription>
            Pre-built integrations. New ones added every week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Connectors />
        </CardContent>
      </Card>
    </div>
  );
}

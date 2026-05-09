"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, FileSpreadsheet, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: number;
  rows: number;
  columns: string[];
  uploadedAt: Date;
}

export function CsvUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Only CSV files are supported");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = String(e.target?.result || "");
        const lines = text.split(/\r?\n/).filter(Boolean);
        const header = (lines[0] || "").split(",").map((h) => h.trim());

        setFiles((prev) => [
          {
            name: file.name,
            size: file.size,
            rows: Math.max(0, lines.length - 1),
            columns: header.slice(0, 8),
            uploadedAt: new Date(),
          },
          ...prev,
        ]);

        toast.success("CSV uploaded", {
          description: `${file.name} • ${lines.length - 1} rows parsed`,
        });
      } catch {
        toast.error("Failed to parse CSV");
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setUploading(false);
    };
    reader.readAsText(file);
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    toast.info("File removed");
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="mt-4 text-sm font-medium">
          {uploading
            ? "Parsing your CSV..."
            : "Drop a CSV here or click to browse"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Up to 50 MB • UTF-8 encoded • Header row required
        </p>
        <Button variant="outline" size="sm" className="mt-4" disabled={uploading}>
          Choose file
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Uploaded files
          </div>
          {files.map((f) => (
            <div
              key={f.name}
              className="flex items-center gap-4 rounded-lg border border-border bg-white p-4"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{f.name}</span>
                  <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600" />
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{(f.size / 1024).toFixed(1)} KB</span>
                  <span>·</span>
                  <span>{f.rows.toLocaleString()} rows</span>
                  <span>·</span>
                  <span>{f.columns.length} columns</span>
                </div>
                {f.columns.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {f.columns.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(f.name)}
                aria-label={`Remove ${f.name}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

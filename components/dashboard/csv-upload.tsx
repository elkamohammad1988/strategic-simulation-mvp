"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Hash,
  Type,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ColumnType = "number" | "string" | "date";

interface ParsedFile {
  name: string;
  size: number;
  rows: number;
  columns: { name: string; type: ColumnType }[];
  preview: string[][];
  uploadedAt: Date;
}

function detectType(value: string): ColumnType {
  if (!value) return "string";
  if (!isNaN(Number(value)) && value.trim() !== "") return "number";
  if (!isNaN(Date.parse(value)) && /\d{4}|[-/]/.test(value)) return "date";
  return "string";
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

export function CsvUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

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
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length === 0) throw new Error("Empty file");

        const header = parseCsvLine(lines[0]).slice(0, 10);
        const dataRows = lines.slice(1).map((l) => parseCsvLine(l));
        const previewRows = dataRows.slice(0, 5).map((r) => r.slice(0, 10));

        const columns = header.map((name, idx) => {
          const samples = dataRows.slice(0, 20).map((r) => r[idx] || "");
          const types = samples.map(detectType);
          const numberCount = types.filter((t) => t === "number").length;
          const dateCount = types.filter((t) => t === "date").length;
          let type: ColumnType = "string";
          if (numberCount > samples.length * 0.6) type = "number";
          else if (dateCount > samples.length * 0.6) type = "date";
          return { name, type };
        });

        const parsed: ParsedFile = {
          name: file.name,
          size: file.size,
          rows: dataRows.length,
          columns,
          preview: previewRows,
          uploadedAt: new Date(),
        };

        setFiles((prev) => [parsed, ...prev]);
        setExpanded(parsed.name);
        toast.success("CSV parsed", {
          description: `${dataRows.length.toLocaleString()} rows · ${columns.length} columns`,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to parse CSV";
        toast.error(message);
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
    if (expanded === name) setExpanded(null);
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
          {uploading ? "Parsing your CSV..." : "Drop a CSV here or click to browse"}
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
            <FilePreview
              key={f.name}
              file={f}
              expanded={expanded === f.name}
              onToggle={() => setExpanded(expanded === f.name ? null : f.name)}
              onRemove={() => removeFile(f.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilePreview({
  file,
  expanded,
  onToggle,
  onRemove,
}: {
  file: ParsedFile;
  expanded: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <FileSpreadsheet className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{file.name}</span>
            <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{(file.size / 1024).toFixed(1)} KB</span>
            <span>·</span>
            <span>{file.rows.toLocaleString()} rows</span>
            <span>·</span>
            <span>{file.columns.length} columns</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onToggle}>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          {expanded ? "Hide" : "Preview"}
        </Button>
        <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {expanded && (
        <div className="border-t border-border bg-muted/20 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Detected schema
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {file.columns.map((c) => (
                <ColumnBadge key={c.name} name={c.name} type={c.type} />
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Preview · first {file.preview.length} rows
            </div>
            <div className="overflow-x-auto rounded-lg border border-border bg-card scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    {file.columns.map((c) => (
                      <th
                        key={c.name}
                        className="px-3 py-2 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap"
                      >
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {file.preview.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/20">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className="px-3 py-2 whitespace-nowrap font-mono text-xs"
                        >
                          {cell || (
                            <span className="text-muted-foreground italic">
                              null
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ColumnBadge({ name, type }: { name: string; type: ColumnType }) {
  const config = {
    number: {
      icon: Hash,
      cls: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/20",
    },
    string: {
      icon: Type,
      cls: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-500/20",
    },
    date: {
      icon: CalendarIcon,
      cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20",
    },
  }[type];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-mono",
        config.cls
      )}
    >
      <Icon className="h-3 w-3" />
      {name}
    </span>
  );
}

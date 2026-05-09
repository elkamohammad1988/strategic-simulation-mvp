export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-7 w-48 rounded bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-white p-5">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="mt-3 h-8 w-32 rounded bg-muted" />
            <div className="mt-3 h-3 w-20 rounded bg-muted" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-6 lg:col-span-2 h-80">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="mt-4 h-64 rounded bg-muted/40" />
        </div>
        <div className="rounded-xl border border-border bg-white p-6 h-80">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="mt-4 h-64 rounded bg-muted/40" />
        </div>
      </div>
    </div>
  );
}

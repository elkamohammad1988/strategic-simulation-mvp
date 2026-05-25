export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-7 w-44 rounded-md skeleton" />
          <div className="h-4 w-72 rounded-md skeleton" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-44 rounded-md skeleton" />
          <div className="h-9 w-24 rounded-md skeleton" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="h-9 w-9 flex-none rounded-lg skeleton" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-24 rounded skeleton" />
          <div className="h-3 w-full max-w-xl rounded skeleton" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="h-3 w-24 rounded skeleton" />
            <div className="h-8 w-32 rounded skeleton" />
            <div className="h-3 w-20 rounded skeleton" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2 h-80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 rounded skeleton" />
              <div className="h-3 w-44 rounded skeleton" />
            </div>
            <div className="flex gap-3">
              <div className="h-3 w-16 rounded skeleton" />
              <div className="h-3 w-16 rounded skeleton" />
            </div>
          </div>
          <div className="h-56 rounded-md skeleton" />
        </div>
        <div className="rounded-xl border border-border bg-card p-6 h-80 space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-32 rounded skeleton" />
            <div className="h-3 w-44 rounded skeleton" />
          </div>
          <div className="h-52 rounded-full skeleton mx-auto w-52" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 h-72 space-y-3">
          <div className="h-4 w-36 rounded skeleton" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-9 rounded-md skeleton" />
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2 h-72 space-y-3">
          <div className="h-4 w-36 rounded skeleton" />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full skeleton" />
              <div className="h-3 flex-1 rounded skeleton" />
              <div className="h-3 w-16 rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

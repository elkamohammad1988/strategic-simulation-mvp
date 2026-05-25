export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-3 w-24 rounded skeleton" />
        <div className="h-8 w-48 rounded-md skeleton" />
        <div className="h-4 w-80 max-w-full rounded skeleton" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-3 w-24 rounded skeleton" />
                <div className="h-7 w-16 rounded skeleton" />
              </div>
              <div className="h-9 w-9 rounded-lg skeleton" />
            </div>
            <div className="h-3 w-32 rounded skeleton" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg skeleton" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 rounded skeleton" />
            <div className="h-3 w-56 rounded skeleton" />
          </div>
        </div>
        <div className="h-10 w-full rounded-md skeleton" />
        <div className="flex flex-wrap gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-7 w-20 rounded-full skeleton" />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border p-4 space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-lg skeleton" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded skeleton" />
                  <div className="h-3 w-16 rounded skeleton" />
                </div>
              </div>
              <div className="h-8 w-full rounded skeleton" />
              <div className="h-8 w-full rounded skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

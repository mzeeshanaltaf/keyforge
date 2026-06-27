/** Layout-matching placeholder shown while a client tool island loads. */
export function ToolSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <div className="h-80 animate-pulse rounded-xl border border-border bg-muted/40" />
      <div className="h-80 animate-pulse rounded-xl border border-border bg-muted/40" />
    </div>
  );
}

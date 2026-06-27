import type { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
}

/** Static educational panel rendered below each tool. Server component. */
export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="rounded-xl border border-border bg-card/40 p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground [&_strong]:font-semibold [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

/**
 * Renders a value's structure as labeled, color-segmented monospace text.
 * Used to visually break down a UUID into its component fields.
 */
export function StructureBreakdown({
  segments,
  separator = "-",
}: {
  segments: { text: string; label: string; highlight?: boolean }[];
  separator?: string;
}) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-end font-key text-base">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-end">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={
                  seg.highlight
                    ? "rounded bg-primary/15 px-1.5 py-0.5 font-semibold text-primary"
                    : "px-1.5 py-0.5 text-foreground"
                }
              >
                {seg.text}
              </span>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {seg.label}
              </span>
            </div>
            {i < segments.length - 1 && (
              <span className="px-0.5 pb-[1.45rem] text-muted-foreground/60">
                {separator}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

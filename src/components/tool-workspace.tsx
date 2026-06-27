"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { OutputList } from "@/components/output-list";
import { ResultActions } from "@/components/result-actions";

interface ToolWorkspaceProps {
  /** Control surface (options + generate button) for the tool. */
  controls: ReactNode;
  values: string[];
  filenameBase: string;
  columnHeader?: string;
  emptyHint?: string;
}

/**
 * Two-column workspace shared by every tool: a controls card on the left whose
 * height is driven by its own content, and a results card on the right that
 * mirrors that height. The results list scrolls when it overflows, so the two
 * panels stay the same height regardless of how many values are generated.
 */
export function ToolWorkspace({
  controls,
  values,
  filenameBase,
  columnHeader,
  emptyHint,
}: ToolWorkspaceProps) {
  const controlsRef = useRef<HTMLDivElement>(null);
  // Track the controls card height (it changes as options toggle) and apply it
  // to the results card. Measured via ResizeObserver to avoid forcing both
  // panels to a fixed size.
  const [panelHeight, setPanelHeight] = useState<number>();

  useEffect(() => {
    const el = controlsRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setPanelHeight(entry.borderBoxSize?.[0]?.blockSize ?? el.offsetHeight);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Card ref={controlsRef} className="gap-0 p-5">
        {controls}
      </Card>

      <Card
        className="flex min-w-0 flex-col gap-3 p-5"
        style={panelHeight ? { height: panelHeight } : undefined}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            {values.length > 0
              ? `${values.length} ${values.length === 1 ? "result" : "results"}`
              : "Results"}
          </p>
          <ResultActions
            values={values}
            filenameBase={filenameBase}
            columnHeader={columnHeader}
          />
        </div>
        <OutputList values={values} emptyHint={emptyHint} />
      </Card>
    </div>
  );
}

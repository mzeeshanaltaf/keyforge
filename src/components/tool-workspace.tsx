"use client";

import type { ReactNode } from "react";
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
 * Two-column workspace shared by every tool: a sticky controls card on the
 * left and the results column (count, export actions, list) on the right.
 */
export function ToolWorkspace({
  controls,
  values,
  filenameBase,
  columnHeader,
  emptyHint,
}: ToolWorkspaceProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <Card className="h-fit gap-0 p-5 lg:sticky lg:top-20">{controls}</Card>

      <div className="flex min-w-0 flex-col gap-3">
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
      </div>
    </div>
  );
}

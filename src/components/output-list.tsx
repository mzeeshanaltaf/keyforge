"use client";

import { memo, useState } from "react";
import { CheckIcon, CopyIcon, SparkleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/export";
import { cn } from "@/lib/utils";

interface OutputRowProps {
  index: number;
  value: string;
}

const OutputRow = memo(function OutputRow({ index, value }: OutputRowProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await copyToClipboard(value);
    setCopied(true);
    toast.success("Copied to clipboard");
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <li className="group flex items-center gap-3 px-3 py-2 transition-colors hover:bg-muted/60">
      <span className="w-7 shrink-0 select-none text-right text-xs tabular-nums text-muted-foreground/70">
        {index}
      </span>
      <code className="font-key min-w-0 flex-1 truncate text-sm text-foreground" title={value}>
        {value}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy value ${index}`}
        className={cn(
          "shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors",
          "hover:bg-background hover:text-foreground active:scale-95",
          "opacity-0 focus-visible:opacity-100 group-hover:opacity-100",
          copied && "text-primary opacity-100",
        )}
      >
        {copied ? <CheckIcon size={15} weight="bold" /> : <CopyIcon size={15} weight="bold" />}
      </button>
    </li>
  );
});

interface OutputListProps {
  values: string[];
  emptyHint?: string;
}

export function OutputList({ values, emptyHint }: OutputListProps) {
  if (values.length === 0) {
    return (
      <div className="flex min-h-48 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 text-center">
        <SparkleIcon size={22} weight="duotone" className="text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {emptyHint ?? "Your generated values will appear here."}
        </p>
      </div>
    );
  }

  return (
    <ul className="min-h-48 flex-1 divide-y divide-border/70 overflow-y-auto rounded-lg border border-border bg-background">
      {values.map((value, i) => (
        <OutputRow key={`${i}-${value}`} index={i + 1} value={value} />
      ))}
    </ul>
  );
}

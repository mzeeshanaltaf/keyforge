"use client";

import { CopyIcon, FileCsvIcon, BracketsCurlyIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { copyToClipboard, downloadFile, toCSV, toJSON } from "@/lib/export";

interface ResultActionsProps {
  values: string[];
  /** Base name for downloaded files, e.g. "uuids". */
  filenameBase: string;
  /** Header used in CSV / JSON output. */
  columnHeader?: string;
}

function timestamp(): string {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
}

export function ResultActions({
  values,
  filenameBase,
  columnHeader = "value",
}: ResultActionsProps) {
  const disabled = values.length === 0;

  async function handleCopyAll() {
    await copyToClipboard(values.join("\n"));
    toast.success(
      `Copied ${values.length} ${values.length === 1 ? "value" : "values"}`,
    );
  }

  function handleDownload(kind: "csv" | "json") {
    const name = `${filenameBase}-${timestamp()}.${kind}`;
    if (kind === "csv") {
      downloadFile(name, toCSV(values, columnHeader), "text/csv;charset=utf-8");
    } else {
      downloadFile(name, toJSON(values, columnHeader), "application/json");
    }
    toast.success(`Downloaded ${kind.toUpperCase()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="secondary" onClick={handleCopyAll} disabled={disabled}>
        <CopyIcon weight="bold" />
        Copy all
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleDownload("csv")} disabled={disabled}>
        <FileCsvIcon weight="bold" />
        CSV
      </Button>
      <Button size="sm" variant="outline" onClick={() => handleDownload("json")} disabled={disabled}>
        <BracketsCurlyIcon weight="bold" />
        JSON
      </Button>
    </div>
  );
}

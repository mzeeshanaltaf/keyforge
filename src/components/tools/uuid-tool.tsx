"use client";

import { useCallback, useState } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulkCount } from "@/components/bulk-count";
import { ToolWorkspace } from "@/components/tool-workspace";
import { generateUuid, type UuidVersion } from "@/lib/generators/uuid";

export function UuidTool() {
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [count, setCount] = useState(5);
  // Seeded lazily on first client render. This island is loaded with
  // `ssr: false`, so calling crypto here cannot cause a hydration mismatch.
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generateUuid("v4")),
  );

  const generate = useCallback(() => {
    setValues(Array.from({ length: count }, () => generateUuid(version)));
  }, [count, version]);

  const controls = (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label>Version</Label>
        <Tabs value={version} onValueChange={(v) => setVersion(v as UuidVersion)}>
          <TabsList className="w-full">
            <TabsTrigger value="v4" className="flex-1">UUID v4</TabsTrigger>
            <TabsTrigger value="v7" className="flex-1">UUID v7</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-xs text-muted-foreground">
          {version === "v4"
            ? "122 random bits. The everyday default for unique IDs."
            : "Embeds a timestamp, so values sort by creation time."}
        </p>
      </div>

      <BulkCount value={count} onChange={setCount} />

      <Button onClick={generate} className="w-full">
        <ArrowsClockwiseIcon weight="bold" />
        Generate
      </Button>
    </div>
  );

  return (
    <ToolWorkspace
      controls={controls}
      values={values}
      filenameBase="uuids"
      columnHeader="uuid"
      emptyHint="Press Generate to create UUIDs."
    />
  );
}

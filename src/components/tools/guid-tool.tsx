"use client";

import { useCallback, useState } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BulkCount } from "@/components/bulk-count";
import { ToolWorkspace } from "@/components/tool-workspace";
import {
  generateGuid,
  type GuidFormatOptions,
  type GuidWrapper,
} from "@/lib/generators/guid";

const WRAPPER_LABELS: Record<GuidWrapper, string> = {
  none: "None",
  braces: "Braces { }",
  parens: "Parentheses ( )",
};

function ToggleRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="font-normal">{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function GuidTool() {
  const [opts, setOpts] = useState<GuidFormatOptions>({
    uppercase: true,
    hyphens: true,
    wrapper: "braces",
  });
  const [count, setCount] = useState(5);
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: 5 }, () =>
      generateGuid({ uppercase: true, hyphens: true, wrapper: "braces" }),
    ),
  );

  const generate = useCallback(() => {
    setValues(Array.from({ length: count }, () => generateGuid(opts)));
  }, [count, opts]);

  const set = <K extends keyof GuidFormatOptions>(key: K, value: GuidFormatOptions[K]) =>
    setOpts((o) => ({ ...o, [key]: value }));

  const controls = (
    <div className="grid gap-5">
      <div className="grid gap-3">
        <ToggleRow
          id="guid-uppercase"
          label="Uppercase"
          checked={opts.uppercase}
          onChange={(v) => set("uppercase", v)}
        />
        <ToggleRow
          id="guid-hyphens"
          label="Hyphens"
          checked={opts.hyphens}
          onChange={(v) => set("hyphens", v)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="guid-wrapper">Wrapper</Label>
        <Select value={opts.wrapper} onValueChange={(v) => set("wrapper", v as GuidWrapper)}>
          <SelectTrigger id="guid-wrapper">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(WRAPPER_LABELS) as GuidWrapper[]).map((w) => (
              <SelectItem key={w} value={w}>
                {WRAPPER_LABELS[w]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      filenameBase="guids"
      columnHeader="guid"
      emptyHint="Press Generate to create GUIDs."
    />
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowsClockwiseIcon, WarningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { BulkCount } from "@/components/bulk-count";
import { EntropyMeter } from "@/components/entropy-meter";
import { ToolWorkspace } from "@/components/tool-workspace";
import {
  generatePassword,
  passwordAlphabetSize,
  DEFAULT_PASSWORD_OPTIONS,
  type PasswordOptions,
} from "@/lib/generators/password";
import { bitsOfEntropy } from "@/lib/entropy";

const CLASS_TOGGLES: { key: keyof PasswordOptions; label: string }[] = [
  { key: "lower", label: "Lowercase (a-z)" },
  { key: "upper", label: "Uppercase (A-Z)" },
  { key: "digits", label: "Digits (0-9)" },
  { key: "symbols", label: "Symbols (!@#...)" },
];

export function PasswordTool() {
  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_PASSWORD_OPTIONS);
  const [count, setCount] = useState(5);
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generatePassword(DEFAULT_PASSWORD_OPTIONS)),
  );
  const [stale, setStale] = useState(false);

  const hasClass = opts.lower || opts.upper || opts.digits || opts.symbols;
  const bits = useMemo(
    () => bitsOfEntropy(opts.length, passwordAlphabetSize(opts)),
    [opts],
  );

  const generate = useCallback(() => {
    if (!hasClass) return;
    setValues(Array.from({ length: count }, () => generatePassword(opts)));
    setStale(false);
  }, [count, opts, hasClass]);

  const set = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) => {
    setOpts((o) => ({ ...o, [key]: value }));
    setStale(true);
  };

  const controls = (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="pw-length">Length</Label>
          <span className="font-key text-sm tabular-nums text-muted-foreground">
            {opts.length}
          </span>
        </div>
        <Slider
          id="pw-length"
          aria-label="Password length"
          value={[opts.length]}
          min={10}
          max={64}
          step={1}
          onValueChange={(v) => set("length", Array.isArray(v) ? v[0] : v)}
        />
      </div>

      <div className="grid gap-3">
        {CLASS_TOGGLES.map(({ key, label }) => (
          <div key={key} className="flex items-center justify-between">
            <Label htmlFor={`pw-${key}`} className="font-normal">{label}</Label>
            <Switch
              id={`pw-${key}`}
              checked={opts[key] as boolean}
              onCheckedChange={(v) => set(key, v as PasswordOptions[typeof key])}
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <Label htmlFor="pw-ambiguous" className="font-normal">
            Exclude look-alikes
          </Label>
          <Switch
            id="pw-ambiguous"
            checked={opts.excludeAmbiguous}
            onCheckedChange={(v) => set("excludeAmbiguous", v)}
          />
        </div>
      </div>

      <Separator />
      <EntropyMeter bits={bits} />

      {!hasClass && (
        <p className="flex items-center gap-2 text-sm text-red-500">
          <WarningIcon weight="bold" size={16} />
          Select at least one character type.
        </p>
      )}

      <BulkCount
        value={count}
        onChange={(v) => {
          setCount(v);
          setStale(true);
        }}
      />

      <Button onClick={generate} className="w-full" disabled={!hasClass}>
        <ArrowsClockwiseIcon weight="bold" />
        Generate
      </Button>
    </div>
  );

  return (
    <ToolWorkspace
      controls={controls}
      values={values}
      filenameBase="passwords"
      columnHeader="password"
      emptyHint="Press Generate to create passwords."
      stale={stale}
    />
  );
}

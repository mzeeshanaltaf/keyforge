"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BulkCount } from "@/components/bulk-count";
import { EntropyMeter } from "@/components/entropy-meter";
import { ToolWorkspace } from "@/components/tool-workspace";
import {
  generateApiKey,
  apiKeyAlphabetSize,
  API_KEY_LENGTHS,
  CHARSET_LABELS,
  DEFAULT_API_KEY_OPTIONS,
  type ApiKeyCharset,
  type ApiKeyOptions,
} from "@/lib/generators/apiKey";
import { bitsOfEntropy } from "@/lib/entropy";
import { cn } from "@/lib/utils";

export function ApiKeyTool() {
  const [opts, setOpts] = useState<ApiKeyOptions>(DEFAULT_API_KEY_OPTIONS);
  const [count, setCount] = useState(5);
  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generateApiKey(DEFAULT_API_KEY_OPTIONS)),
  );
  const [stale, setStale] = useState(false);

  const bits = useMemo(
    () => bitsOfEntropy(opts.length, apiKeyAlphabetSize(opts.charset)),
    [opts.length, opts.charset],
  );

  const generate = useCallback(() => {
    setValues(Array.from({ length: count }, () => generateApiKey(opts)));
    setStale(false);
  }, [count, opts]);

  const set = <K extends keyof ApiKeyOptions>(key: K, value: ApiKeyOptions[K]) => {
    setOpts((o) => ({ ...o, [key]: value }));
    setStale(true);
  };

  const controls = (
    <div className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="key-prefix">Prefix</Label>
        <Input
          id="key-prefix"
          value={opts.prefix}
          spellCheck={false}
          placeholder="e.g. sk_live_"
          onChange={(e) => set("prefix", e.target.value)}
          className="font-key"
        />
      </div>

      <div className="grid gap-2">
        <Label>Length</Label>
        <div className="grid grid-cols-5 gap-1.5">
          {API_KEY_LENGTHS.map((len) => (
            <button
              key={len}
              type="button"
              onClick={() => set("length", len)}
              className={cn(
                "rounded-md border py-1.5 text-sm font-medium tabular-nums transition-colors",
                opts.length === len
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {len}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Random character count, excluding the prefix.
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="key-charset">Character set</Label>
        <Select value={opts.charset} onValueChange={(v) => set("charset", v as ApiKeyCharset)}>
          <SelectTrigger id="key-charset">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(CHARSET_LABELS) as ApiKeyCharset[]).map((c) => (
              <SelectItem key={c} value={c}>
                {CHARSET_LABELS[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />
      <EntropyMeter bits={bits} />

      <BulkCount
        value={count}
        onChange={(v) => {
          setCount(v);
          setStale(true);
        }}
      />

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
      filenameBase="api-keys"
      columnHeader="api_key"
      emptyHint="Press Generate to create API keys."
      stale={stale}
    />
  );
}

"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface BulkCountProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
}

export function BulkCount({ value, onChange, max = 100, min = 1 }: BulkCountProps) {
  function clamp(n: number): number {
    if (Number.isNaN(n)) return min;
    return Math.min(max, Math.max(min, Math.round(n)));
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="bulk-count">How many</Label>
        <Input
          id="bulk-count"
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(e.target.valueAsNumber))}
          className="h-8 w-20 text-right font-key"
        />
      </div>
      <Slider
        aria-label="How many to generate"
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(clamp(Array.isArray(v) ? v[0] : v))}
      />
      <p className="text-xs text-muted-foreground">Generate between {min} and {max} at a time.</p>
    </div>
  );
}

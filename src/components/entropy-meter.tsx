import { strengthFromBits, formatBits } from "@/lib/entropy";
import { cn } from "@/lib/utils";

const LEVEL_BAR: Record<string, string> = {
  "Very Weak": "bg-red-500",
  Weak: "bg-orange-500",
  Fair: "bg-amber-500",
  Strong: "bg-primary",
  Excellent: "bg-primary",
};

const LEVEL_TEXT: Record<string, string> = {
  "Very Weak": "text-red-500",
  Weak: "text-orange-500",
  Fair: "text-amber-500",
  Strong: "text-primary",
  Excellent: "text-primary",
};

export function EntropyMeter({ bits }: { bits: number }) {
  const { level, pct } = strengthFromBits(bits);

  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">Strength</span>
        <span>
          <span className={cn("font-medium", LEVEL_TEXT[level])}>{level}</span>{" "}
          <span className="font-key text-muted-foreground">{formatBits(bits)}</span>
        </span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={Math.min(128, Math.round(bits))}
        aria-valuemin={0}
        aria-valuemax={128}
        aria-label="Password entropy"
      >
        <div
          className={cn("h-full rounded-full transition-all duration-300", LEVEL_BAR[level])}
          style={{ width: `${Math.max(5, pct)}%` }}
        />
      </div>
    </div>
  );
}

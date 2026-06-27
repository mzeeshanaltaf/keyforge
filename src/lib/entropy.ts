export type StrengthLevel =
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Strong"
  | "Excellent";

/** Shannon entropy in bits for `length` symbols drawn from `alphabetSize`. */
export function bitsOfEntropy(length: number, alphabetSize: number): number {
  if (length <= 0 || alphabetSize <= 1) return 0;
  return length * Math.log2(alphabetSize);
}

export interface Strength {
  level: StrengthLevel;
  /** 0–100, for progress bars. Scaled against a 128-bit "excellent" ceiling. */
  pct: number;
}

/** Bucket an entropy value (bits) into a human-readable strength rating. */
export function strengthFromBits(bits: number): Strength {
  let level: StrengthLevel;
  if (bits < 28) level = "Very Weak";
  else if (bits < 36) level = "Weak";
  else if (bits < 60) level = "Fair";
  else if (bits < 128) level = "Strong";
  else level = "Excellent";
  const pct = Math.max(0, Math.min(100, Math.round((bits / 128) * 100)));
  return { level, pct };
}

/** Format a bits value for display, e.g. 190.4 -> "190 bits". */
export function formatBits(bits: number): string {
  return `${Math.round(bits)} bits`;
}

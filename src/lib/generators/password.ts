import { pickChar, shuffle } from "@/lib/random";

export interface PasswordOptions {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export const LOWER = "abcdefghijklmnopqrstuvwxyz";
export const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DIGITS = "0123456789";
export const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";
/** Visually confusable characters removed when "exclude ambiguous" is on. */
export const AMBIGUOUS = "Il1O0o5S2Z8B";

export const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
  length: 20,
  lower: true,
  upper: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
};

function stripAmbiguous(pool: string): string {
  return [...pool].filter((c) => !AMBIGUOUS.includes(c)).join("");
}

/** Resolve the selected character classes (and their union) for the options. */
export function buildCharsets(o: PasswordOptions): {
  classes: string[];
  combined: string;
} {
  const apply = (s: string) => (o.excludeAmbiguous ? stripAmbiguous(s) : s);
  const classes: string[] = [];
  if (o.lower) classes.push(apply(LOWER));
  if (o.upper) classes.push(apply(UPPER));
  if (o.digits) classes.push(apply(DIGITS));
  if (o.symbols) classes.push(apply(SYMBOLS));
  return { classes: classes.filter((c) => c.length > 0), combined: classes.join("") };
}

/** Size of the effective alphabet — used for entropy calculations. */
export function passwordAlphabetSize(o: PasswordOptions): number {
  return buildCharsets(o).combined.length;
}

/**
 * Generate a password guaranteeing at least one character from each selected
 * class, then filling and shuffling the remainder from the combined alphabet.
 * Returns "" when no character class is selected.
 */
export function generatePassword(o: PasswordOptions): string {
  const { classes, combined } = buildCharsets(o);
  if (classes.length === 0 || combined.length === 0) return "";

  const length = Math.max(o.length, classes.length);
  const chars: string[] = classes.map((cls) => pickChar(cls));
  for (let i = chars.length; i < length; i++) {
    chars.push(pickChar(combined));
  }
  return shuffle(chars).join("");
}

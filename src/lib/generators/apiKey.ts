import { pickChar } from "@/lib/random";

export type ApiKeyCharset = "base62" | "hex" | "base64url";

export interface ApiKeyOptions {
  prefix: string;
  length: number;
  charset: ApiKeyCharset;
}

/** Supported API-key lengths (random portion, excluding the prefix). */
export const API_KEY_LENGTHS = [16, 24, 32, 48, 64] as const;

const CHARSETS: Record<ApiKeyCharset, string> = {
  base62: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  hex: "0123456789abcdef",
  base64url:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
};

export const CHARSET_LABELS: Record<ApiKeyCharset, string> = {
  base62: "Base62 (A–Z, a–z, 0–9)",
  hex: "Hex (0–9, a–f)",
  base64url: "Base64URL (A–Z, a–z, 0–9, -, _)",
};

export const DEFAULT_API_KEY_OPTIONS: ApiKeyOptions = {
  prefix: "sk_live_",
  length: 32,
  charset: "base62",
};

/** Size of the alphabet for a charset — used for entropy calculations. */
export function apiKeyAlphabetSize(charset: ApiKeyCharset): number {
  return CHARSETS[charset].length;
}

export function generateApiKey(o: ApiKeyOptions): string {
  const pool = CHARSETS[o.charset];
  let body = "";
  for (let i = 0; i < o.length; i++) body += pickChar(pool);
  return o.prefix ? `${o.prefix}${body}` : body;
}

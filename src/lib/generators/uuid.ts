import { randomBytes } from "@/lib/random";

export type UuidVersion = "v4" | "v7";

/** Render 16 bytes as the canonical 8-4-4-4-12 lowercase hex string. */
function bytesToUuid(bytes: Uint8Array): string {
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return (
    hex.slice(0, 4).join("") +
    "-" +
    hex.slice(4, 6).join("") +
    "-" +
    hex.slice(6, 8).join("") +
    "-" +
    hex.slice(8, 10).join("") +
    "-" +
    hex.slice(10, 16).join("")
  );
}

/**
 * UUID v4 — 122 random bits. Uses the native `crypto.randomUUID` when
 * available, falling back to a manual implementation from secure bytes.
 */
export function uuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xx
  return bytesToUuid(bytes);
}

/**
 * UUID v7 — 48-bit big-endian Unix millisecond timestamp followed by random
 * bits, making generated values sortable by creation time. `crypto.randomUUID`
 * only emits v4, so this is built by hand.
 */
export function uuidV7(): string {
  const bytes = randomBytes(16);
  const ts = Date.now();
  bytes[0] = Math.floor(ts / 2 ** 40) & 0xff;
  bytes[1] = Math.floor(ts / 2 ** 32) & 0xff;
  bytes[2] = Math.floor(ts / 2 ** 24) & 0xff;
  bytes[3] = Math.floor(ts / 2 ** 16) & 0xff;
  bytes[4] = Math.floor(ts / 2 ** 8) & 0xff;
  bytes[5] = ts & 0xff;
  bytes[6] = (bytes[6] & 0x0f) | 0x70; // version 7
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xx
  return bytesToUuid(bytes);
}

export function generateUuid(version: UuidVersion): string {
  return version === "v7" ? uuidV7() : uuidV4();
}

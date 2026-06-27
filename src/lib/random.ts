/**
 * Cryptographically secure randomness helpers.
 * All key/password generation in this app flows through here so we never
 * fall back to Math.random and never introduce modulo bias.
 */

/** Fill and return `len` cryptographically secure random bytes. */
export function randomBytes(len: number): Uint8Array {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return bytes;
}

/**
 * Return a uniformly distributed integer in [0, max) using rejection
 * sampling to avoid the modulo bias of `value % max`.
 */
export function secureRandomInt(max: number): number {
  if (!Number.isInteger(max) || max <= 0) {
    throw new Error("max must be a positive integer");
  }
  if (max === 1) return 0;
  // `getRandomValues` yields 2^32 distinct uint32 values (0 .. 2^32 - 1), so the
  // population size is 0x100000000, not the max value 0xffffffff. Reject any draw
  // at or above the largest multiple of `max` that fits, leaving a window evenly
  // divisible by `max` so `x % max` is unbiased.
  const RANGE = 0x100000000; // 2^32
  const limit = Math.floor(RANGE / max) * max;
  const buf = new Uint32Array(1);
  let x = 0;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

/** Pick a single uniformly random character from a non-empty pool. */
export function pickChar(pool: string): string {
  return pool[secureRandomInt(pool.length)];
}

/** Fisher–Yates shuffle in place using secure randomness. */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

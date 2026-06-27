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
  // Largest multiple of `max` that fits in a uint32; reject values above it.
  const limit = Math.floor(0xffffffff / max) * max;
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

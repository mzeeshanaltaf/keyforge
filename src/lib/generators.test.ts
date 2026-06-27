import { describe, it, expect } from "vitest";
import { uuidV4, uuidV7, generateUuid } from "@/lib/generators/uuid";
import { formatGuid } from "@/lib/generators/guid";
import {
  generatePassword,
  passwordAlphabetSize,
  AMBIGUOUS,
  DEFAULT_PASSWORD_OPTIONS,
  type PasswordOptions,
} from "@/lib/generators/password";
import {
  generateApiKey,
  apiKeyAlphabetSize,
} from "@/lib/generators/apiKey";
import { bitsOfEntropy, strengthFromBits } from "@/lib/entropy";
import { toCSV, toJSON } from "@/lib/export";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

describe("uuid", () => {
  it("v4 has correct shape, version and variant", () => {
    for (let i = 0; i < 200; i++) {
      const u = uuidV4();
      expect(u).toMatch(UUID_RE);
      expect(u[14]).toBe("4"); // version nibble
      expect("89ab").toContain(u[19]); // variant nibble
    }
  });

  it("v4 values are unique", () => {
    const set = new Set(Array.from({ length: 1000 }, uuidV4));
    expect(set.size).toBe(1000);
  });

  it("v7 has version 7 and encodes the current timestamp", () => {
    const before = Date.now();
    const u = uuidV7();
    const after = Date.now();
    expect(u).toMatch(UUID_RE);
    expect(u[14]).toBe("7");
    expect("89ab").toContain(u[19]);

    const tsHex = u.replace(/-/g, "").slice(0, 12); // first 48 bits
    const ts = parseInt(tsHex, 16);
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it("v7 values sort by creation time", async () => {
    const a = uuidV7();
    await new Promise((r) => setTimeout(r, 5));
    const b = uuidV7();
    expect(a < b).toBe(true); // lexicographic order matches time order
  });

  it("generateUuid dispatches on version", () => {
    expect(generateUuid("v4")[14]).toBe("4");
    expect(generateUuid("v7")[14]).toBe("7");
  });
});

describe("guid format", () => {
  const sample = "b3d4e1a0-7c2f-4e55-9ab1-0c3d2e1f4a6b";

  it("applies uppercase", () => {
    expect(formatGuid(sample, { uppercase: true, hyphens: true, wrapper: "none" })).toBe(
      sample.toUpperCase(),
    );
  });

  it("removes hyphens", () => {
    expect(
      formatGuid(sample, { uppercase: false, hyphens: false, wrapper: "none" }),
    ).toBe(sample.replace(/-/g, ""));
  });

  it("wraps in braces and parentheses", () => {
    expect(formatGuid(sample, { uppercase: false, hyphens: true, wrapper: "braces" })).toBe(
      `{${sample}}`,
    );
    expect(formatGuid(sample, { uppercase: false, hyphens: true, wrapper: "parens" })).toBe(
      `(${sample})`,
    );
  });
});

describe("password", () => {
  it("respects the requested length", () => {
    for (const length of [10, 25, 50]) {
      const pw = generatePassword({ ...DEFAULT_PASSWORD_OPTIONS, length });
      expect(pw).toHaveLength(length);
    }
  });

  it("includes at least one of every selected class", () => {
    const opts: PasswordOptions = {
      length: 16,
      lower: true,
      upper: true,
      digits: true,
      symbols: true,
      excludeAmbiguous: false,
    };
    for (let i = 0; i < 50; i++) {
      const pw = generatePassword(opts);
      expect(/[a-z]/.test(pw)).toBe(true);
      expect(/[A-Z]/.test(pw)).toBe(true);
      expect(/[0-9]/.test(pw)).toBe(true);
      expect(/[^a-zA-Z0-9]/.test(pw)).toBe(true);
    }
  });

  it("omits ambiguous characters when requested", () => {
    const opts: PasswordOptions = {
      length: 50,
      lower: true,
      upper: true,
      digits: true,
      symbols: false,
      excludeAmbiguous: true,
    };
    for (let i = 0; i < 50; i++) {
      for (const ch of generatePassword(opts)) {
        expect(AMBIGUOUS.includes(ch)).toBe(false);
      }
    }
  });

  it("returns an empty string when no class is selected", () => {
    expect(
      generatePassword({
        length: 16,
        lower: false,
        upper: false,
        digits: false,
        symbols: false,
        excludeAmbiguous: false,
      }),
    ).toBe("");
  });

  it("reports a sensible alphabet size", () => {
    expect(passwordAlphabetSize(DEFAULT_PASSWORD_OPTIONS)).toBeGreaterThan(80);
  });
});

describe("api key", () => {
  it("prepends the prefix and uses the requested length", () => {
    const key = generateApiKey({ prefix: "sk_live_", length: 32, charset: "base62" });
    expect(key.startsWith("sk_live_")).toBe(true);
    expect(key.slice("sk_live_".length)).toHaveLength(32);
  });

  it("hex charset only emits hex characters", () => {
    const key = generateApiKey({ prefix: "", length: 64, charset: "hex" });
    expect(key).toMatch(/^[0-9a-f]{64}$/);
  });

  it("alphabet sizes are correct", () => {
    expect(apiKeyAlphabetSize("base62")).toBe(62);
    expect(apiKeyAlphabetSize("hex")).toBe(16);
    expect(apiKeyAlphabetSize("base64url")).toBe(64);
  });
});

describe("entropy", () => {
  it("computes bits = length * log2(alphabet)", () => {
    expect(bitsOfEntropy(32, 62)).toBeCloseTo(190.53, 1);
    expect(bitsOfEntropy(0, 62)).toBe(0);
    expect(bitsOfEntropy(10, 1)).toBe(0);
  });

  it("buckets strength levels", () => {
    expect(strengthFromBits(20).level).toBe("Very Weak");
    expect(strengthFromBits(45).level).toBe("Fair");
    expect(strengthFromBits(90).level).toBe("Strong");
    expect(strengthFromBits(200).level).toBe("Excellent");
  });
});

describe("export", () => {
  it("builds JSON rows with index", () => {
    const json = JSON.parse(toJSON(["a", "b"], "uuid"));
    expect(json).toEqual([
      { index: 1, uuid: "a" },
      { index: 2, uuid: "b" },
    ]);
  });

  it("builds CSV with a header and escapes special characters", () => {
    const csv = toCSV(['has,comma', 'has"quote'], "value");
    const lines = csv.split("\r\n");
    expect(lines[0]).toBe("index,value");
    expect(lines[1]).toBe('1,"has,comma"');
    expect(lines[2]).toBe('2,"has""quote"');
  });
});

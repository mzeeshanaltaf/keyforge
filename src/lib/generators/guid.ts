import { uuidV4 } from "./uuid";

/** Microsoft GUID wrapper style. */
export type GuidWrapper = "none" | "braces" | "parens";

export interface GuidFormatOptions {
  uppercase: boolean;
  hyphens: boolean;
  wrapper: GuidWrapper;
}

export const DEFAULT_GUID_OPTIONS: GuidFormatOptions = {
  uppercase: false,
  hyphens: true,
  wrapper: "none",
};

/**
 * A GUID is Microsoft's name for a UUID. We generate a v4 UUID and apply
 * the requested presentation: case, hyphens, and an optional `{}`/`()` wrapper.
 */
export function formatGuid(uuid: string, opts: GuidFormatOptions): string {
  let g = opts.hyphens ? uuid : uuid.replace(/-/g, "");
  g = opts.uppercase ? g.toUpperCase() : g.toLowerCase();
  if (opts.wrapper === "braces") g = `{${g}}`;
  else if (opts.wrapper === "parens") g = `(${g})`;
  return g;
}

export function generateGuid(opts: GuidFormatOptions): string {
  return formatGuid(uuidV4(), opts);
}

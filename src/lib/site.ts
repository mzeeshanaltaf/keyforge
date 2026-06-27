/**
 * Canonical site origin, resolved once at build/runtime.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL  - set this in production (e.g. https://keyforge.app)
 *  2. VERCEL_PROJECT_PRODUCTION_URL - auto-provided by Vercel for the prod deployment
 *  3. http://localhost:3000 - local dev fallback
 *
 * Used for metadataBase, canonical URLs, the sitemap, and JSON-LD. Keep it free
 * of a trailing slash so paths can be appended directly.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Keyforge";

/** Meta description for <head>. Kept under ~155 chars to avoid SERP truncation. */
export const SITE_DESCRIPTION =
  "Generate UUIDs (v4/v7), GUIDs, passwords, and API keys in your browser. Bulk output, entropy readouts, CSV/JSON export. Nothing leaves your device.";

/** Shorter copy for social cards (Open Graph / Twitter), which truncate ~125 chars. */
export const SITE_DESCRIPTION_SHORT =
  "Generate UUIDs, GUIDs, strong passwords, and API keys in your browser. Nothing leaves your device.";

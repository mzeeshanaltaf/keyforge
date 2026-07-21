import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

/**
 * Serves /llms.txt - a Markdown map of the site for LLM crawlers and AI search
 * engines (the llms.txt convention, https://llmstxt.org). Mirrors the sitemap
 * but adds a human-readable summary and per-tool context so models can cite the
 * tools accurately. Kept in sync with lib/tools.ts.
 */
export function GET() {
  const toolLines = TOOLS.map(
    (tool) => `- [${tool.name}](${SITE_URL}${tool.href}): ${tool.tagline}`,
  ).join("\n");

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is a free, client-side generator for UUIDs, GUIDs, strong passwords,
and API keys. Every value is produced in the browser with the Web Crypto API
(crypto.getRandomValues) using unbiased rejection sampling. Nothing is ever sent
to a server, stored, or logged. All tools support bulk generation (up to 100 at
once) and export to CSV or JSON.

## Tools

${toolLines}

## Key facts

- All generation runs locally in the browser; no values leave the device.
- Randomness comes from the Web Crypto API, never Math.random.
- UUIDs support version 4 (random) and version 7 (time-ordered).
- Passwords and API keys show live entropy in bits with a strength rating.
- Free to use, no account required, no tracking or advertising cookies.

## More

- [Privacy Policy](${SITE_URL}/privacy): How data is (and is not) handled.
- [Contact](${SITE_URL}/contact): Report a bug or send feedback.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

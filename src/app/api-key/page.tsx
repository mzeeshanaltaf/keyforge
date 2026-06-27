import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generator-shell";
import { InfoSection } from "@/components/info-section";
import { ApiKeyToolIsland } from "@/components/tools/api-key-tool-island";
import { TOOLS } from "@/lib/tools";
import { API_KEY_LENGTHS, apiKeyAlphabetSize } from "@/lib/generators/apiKey";
import { bitsOfEntropy, strengthFromBits } from "@/lib/entropy";

const tool = TOOLS.find((t) => t.slug === "api-key")!;

export const metadata: Metadata = {
  title: "API Key Generator",
  description:
    "Generate API keys with a custom prefix and a fixed length of 16, 24, 32, 48, or 64 characters. See the entropy in bits for each length.",
};

export default function ApiKeyPage() {
  const alphabet = apiKeyAlphabetSize("base62");

  return (
    <GeneratorShell icon={tool.icon} title={tool.name} description={tool.tagline}>
      <ApiKeyToolIsland />

      <InfoSection title="Prefixes and entropy">
        <p>
          A good API key is a long random string, often with a short{" "}
          <strong>prefix</strong> that signals where it belongs, for example{" "}
          <code className="font-key text-foreground">sk_live_</code> or{" "}
          <code className="font-key text-foreground">pk_test_</code>. The prefix
          is not secret and adds no entropy; it just helps humans and tooling
          recognise and route the key. All of the security comes from the random
          portion.
        </p>
        <p>
          The table below shows the entropy for each length using the default
          Base62 alphabet ({alphabet} characters). Even the shortest option here
          carries far more randomness than a typical password.
        </p>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left text-muted-foreground">
                <th className="px-4 py-2 font-medium">Length</th>
                <th className="px-4 py-2 font-medium">Entropy</th>
                <th className="px-4 py-2 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {API_KEY_LENGTHS.map((len) => {
                const bits = bitsOfEntropy(len, alphabet);
                const { level } = strengthFromBits(bits);
                return (
                  <tr key={len} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-2 font-key tabular-nums text-foreground">
                      {len} chars
                    </td>
                    <td className="px-4 py-2 font-key tabular-nums text-foreground">
                      {Math.round(bits)} bits
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{level}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </InfoSection>
    </GeneratorShell>
  );
}

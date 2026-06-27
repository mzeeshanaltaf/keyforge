import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generator-shell";
import { InfoSection } from "@/components/info-section";
import { GuidToolIsland } from "@/components/tools/guid-tool-island";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { toolApplicationSchema, faqSchema } from "@/lib/structured-data";

const tool = TOOLS.find((t) => t.slug === "guid")!;

const description =
  "Generate Microsoft-style GUIDs with uppercase, braces, and registry formats. Bulk generation and CSV / JSON export, all in your browser.";

export const metadata: Metadata = {
  title: "GUID Generator",
  description,
  alternates: { canonical: tool.href },
};

const FAQS = [
  {
    question: "What is a GUID?",
    answer:
      "GUID (Globally Unique Identifier) is Microsoft's name for a UUID. A v4 GUID and a v4 UUID are the same 128-bit value; the only differences are cosmetic, in how the value is written. GUIDs appear throughout Windows, the registry, COM, and the .NET ecosystem.",
  },
  {
    question: "What GUID formats can this generator produce?",
    answer:
      "It produces a random (v4) identifier and lets you present it in the common Microsoft conventions: uppercase or lowercase, with or without hyphens, and wrapped in braces or parentheses (the registry format).",
  },
  {
    question: "Is a GUID the same as a UUID?",
    answer:
      "Yes. A version 4 GUID is the same 128-bit random value as a version 4 UUID. GUID is simply the term Microsoft uses; the only differences are in formatting conventions such as braces and casing.",
  },
];

const FORMATS: { label: string; value: string }[] = [
  { label: "Standard", value: "b3d4e1a0-7c2f-4e55-9ab1-0c3d2e1f4a6b" },
  { label: "Registry (braces, uppercase)", value: "{B3D4E1A0-7C2F-4E55-9AB1-0C3D2E1F4A6B}" },
  { label: "Parentheses", value: "(b3d4e1a0-7c2f-4e55-9ab1-0c3d2e1f4a6b)" },
  { label: "No hyphens", value: "b3d4e1a07c2f4e559ab10c3d2e1f4a6b" },
];

export default function GuidPage() {
  return (
    <GeneratorShell icon={tool.icon} title={tool.name} description={tool.tagline}>
      <JsonLd
        data={[toolApplicationSchema(tool, description), faqSchema(FAQS)]}
      />
      <GuidToolIsland />

      <InfoSection title="What is a GUID?">
        <p>
          <strong>GUID</strong> (Globally Unique Identifier) is Microsoft&apos;s
          name for a UUID. A v4 GUID and a v4 UUID are the same 128-bit value;
          the only differences are cosmetic, in how the value is written. GUIDs
          appear throughout Windows, the registry, COM, and the .NET ecosystem.
        </p>
        <p>
          This generator produces a random (v4) identifier and lets you present
          it in the common Microsoft conventions: uppercase or lowercase, with or
          without hyphens, and wrapped in braces or parentheses.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {FORMATS.map((f) => (
            <div key={f.label} className="rounded-lg border border-border bg-background p-3">
              <p className="mb-1 text-xs text-muted-foreground">{f.label}</p>
              <code className="font-key break-all text-sm text-foreground">{f.value}</code>
            </div>
          ))}
        </div>
      </InfoSection>
    </GeneratorShell>
  );
}

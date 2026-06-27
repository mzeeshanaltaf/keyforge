import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generator-shell";
import { InfoSection, StructureBreakdown } from "@/components/info-section";
import { UuidToolIsland } from "@/components/tools/uuid-tool-island";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { toolApplicationSchema, faqSchema } from "@/lib/structured-data";

const tool = TOOLS.find((t) => t.slug === "uuid")!;

const description =
  "Generate UUID version 4 and version 7 in your browser. Learn the UUID structure, generate up to 100 at once, and export to CSV or JSON.";

export const metadata: Metadata = {
  title: "UUID Generator (v4 & v7)",
  description,
  alternates: { canonical: tool.href },
};

const FAQS = [
  {
    question: "What is a UUID?",
    answer:
      "A UUID (Universally Unique Identifier) is a 128-bit value used to label information without a central authority. The space is so large that two independently generated UUIDs are effectively guaranteed never to collide, which makes them ideal for database keys, distributed systems, and request tracing.",
  },
  {
    question: "What is the difference between UUID v4 and v7?",
    answer:
      "Version 4 fills almost every bit with randomness (122 random bits) and is the everyday default when you just need a unique value. Version 7 places a 48-bit Unix millisecond timestamp at the front, so the IDs sort by creation time, which is friendlier to database indexes while still staying unique.",
  },
  {
    question: "Are these UUIDs generated privately?",
    answer:
      "Yes. Every UUID is generated locally in your browser with the Web Crypto API. Nothing is sent to a server, and no values are logged.",
  },
];

export default function UuidPage() {
  return (
    <GeneratorShell icon={tool.icon} title={tool.name} description={tool.tagline}>
      <JsonLd
        data={[toolApplicationSchema(tool, description), faqSchema(FAQS)]}
      />
      <UuidToolIsland />

      <InfoSection title="What is a UUID?">
        <p>
          A <strong>UUID</strong> (Universally Unique Identifier) is a 128-bit
          value used to label information without a central authority. Because
          the space is so large, two independently generated UUIDs are
          effectively guaranteed never to collide, which makes them ideal for
          database keys, distributed systems, and request tracing.
        </p>

        <div>
          <p className="mb-3">
            UUIDs are written as 32 hexadecimal digits in five hyphenated groups,
            the <strong>8-4-4-4-12</strong> layout. Two positions are reserved:
            the <strong>version</strong> nibble and the <strong>variant</strong>{" "}
            bits.
          </p>
          <StructureBreakdown
            segments={[
              { text: "xxxxxxxx", label: "time / random" },
              { text: "xxxx", label: "random" },
              { text: "Vxxx", label: "version", highlight: true },
              { text: "Nxxx", label: "variant", highlight: true },
              { text: "xxxxxxxxxxxx", label: "node / random" },
            ]}
          />
        </div>

        <p>
          <strong>Version 4</strong> fills almost every bit with randomness (122
          random bits). It is the everyday default when you just need a unique
          value and do not care about ordering.
        </p>
        <p>
          <strong>Version 7</strong> places a 48-bit Unix millisecond timestamp
          at the front, so the IDs sort by creation time. That ordering makes v7
          friendlier to database indexes than the fully random v4, while still
          carrying plenty of randomness to stay unique.
        </p>
      </InfoSection>
    </GeneratorShell>
  );
}

import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generator-shell";
import { InfoSection, StructureBreakdown } from "@/components/info-section";
import { UuidToolIsland } from "@/components/tools/uuid-tool-island";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.slug === "uuid")!;

export const metadata: Metadata = {
  title: "UUID Generator (v4 & v7)",
  description:
    "Generate UUID version 4 and version 7 in your browser. Learn the UUID structure, generate up to 100 at once, and export to CSV or JSON.",
};

export default function UuidPage() {
  return (
    <GeneratorShell icon={tool.icon} title={tool.name} description={tool.tagline}>
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

import type { Metadata } from "next";
import { GeneratorShell } from "@/components/generator-shell";
import { InfoSection } from "@/components/info-section";
import { PasswordToolIsland } from "@/components/tools/password-tool-island";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.slug === "password")!;

export const metadata: Metadata = {
  title: "Strong Password Generator",
  description:
    "Generate strong passwords with adjustable length and character types, plus a live entropy and strength readout. Generated locally in your browser.",
};

export default function PasswordPage() {
  return (
    <GeneratorShell icon={tool.icon} title={tool.name} description={tool.tagline}>
      <PasswordToolIsland />

      <InfoSection title="What makes a password strong?">
        <p>
          A password&apos;s strength is measured in <strong>entropy</strong>, the
          number of bits of randomness it contains. More bits means
          exponentially more guesses for an attacker. Entropy grows with both the{" "}
          <strong>length</strong> of the password and the size of the{" "}
          <strong>character set</strong> it draws from.
        </p>
        <p>
          The math is{" "}
          <code className="font-key text-foreground">bits = length x log2(alphabet)</code>.
          Adding a character type widens the alphabet, but adding length is the
          most reliable way to push entropy higher. As a rough guide, under 36
          bits is weak, around 60 bits is fair, and 80 bits or more is strong for
          most uses.
        </p>
        <p>
          Every password here guarantees at least one character from each type
          you enable. The <strong>exclude look-alikes</strong> option removes
          easily confused characters such as <code className="font-key text-foreground">l</code>,{" "}
          <code className="font-key text-foreground">1</code>,{" "}
          <code className="font-key text-foreground">O</code>, and{" "}
          <code className="font-key text-foreground">0</code>, which slightly
          lowers entropy but makes a password easier to read aloud or type.
        </p>
      </InfoSection>
    </GeneratorShell>
  );
}

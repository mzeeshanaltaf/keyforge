import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  LightningIcon,
  DownloadSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { TOOLS } from "@/lib/tools";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

const toolListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TOOLS.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tool.name,
    url: `${SITE_URL}${tool.href}`,
  })),
};

const SAMPLES: { label: string; value: string }[] = [
  { label: "UUID v4", value: "9f1c2e7a-4b8d-4c1e-9a2f-7d6e5b4c3a21" },
  { label: "UUID v7", value: "018f9b2c-1a3e-7c44-b9d0-2f6a8c4e1d05" },
  { label: "GUID", value: "{B3D4E1A0-7C2F-4E55-9AB1-0C3D2E1F4A6B}" },
  { label: "Password", value: "rT8$kQ2!vLm9@xZ4pN6w" },
  { label: "API key", value: "sk_live_4Kp9XbN2mQ7rT1vL8wYz" },
];

export default function Home() {
  return (
    <div>
      <JsonLd data={[websiteSchema, toolListSchema]} />
      {/* Hero: asymmetric split, copy left, real sample output right */}
      <section className="bg-grid">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Generate keys that never leave your browser.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              UUIDs, GUIDs, strong passwords, and API keys, built with the Web
              Crypto API. Generate in bulk, then copy or export to CSV or JSON.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button render={<Link href="/uuid" />} nativeButton={false} size="lg">
                Start generating
                <ArrowRightIcon weight="bold" />
              </Button>
              <Button
                render={<Link href="/password" />}
                nativeButton={false}
                size="lg"
                variant="outline"
              >
                Strong passwords
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur-sm">
            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Sample output
            </p>
            <ul className="space-y-3">
              {SAMPLES.map((s) => (
                <li key={s.label} className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">{s.label}</span>
                  <code className="font-key truncate text-sm text-foreground">{s.value}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tool directory: 2x2 bento, four tools, four cells */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-accent/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-border bg-background text-primary transition-colors group-hover:border-primary/40">
                  <Icon size={24} weight="duotone" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-semibold tracking-tight">
                    {tool.name}
                    <ArrowRightIcon
                      size={15}
                      weight="bold"
                      className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{tool.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust strip: divided row, not feature cards */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid divide-y divide-border rounded-xl border border-border bg-card/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <TrustItem
            icon={<ShieldCheckIcon size={20} weight="duotone" />}
            title="Private by design"
            body="Every value is generated on your device. No network requests, no logging."
          />
          <TrustItem
            icon={<LightningIcon size={20} weight="duotone" />}
            title="Cryptographically strong"
            body="Backed by crypto.getRandomValues with unbiased sampling throughout."
          />
          <TrustItem
            icon={<DownloadSimpleIcon size={20} weight="duotone" />}
            title="Copy or export"
            body="Grab one value, copy the batch, or download up to 100 as CSV or JSON."
          />
        </div>
      </section>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-6">
      <span className="text-primary">{icon}</span>
      <h3 className="font-medium tracking-tight">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}

import type { Metadata } from "next";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Keyforge handles your data. All keys are generated locally in your browser and never sent to a server.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "June 28, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 flex items-start gap-4">
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
          <ShieldCheckIcon size={24} weight="duotone" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Privacy Policy
          </h1>
          <p className="mt-1 text-muted-foreground">Last updated: {LAST_UPDATED}</p>
        </div>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-4 hover:[&_a]:text-primary hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground">
        <p>
          Keyforge is a client-side generator for UUIDs, GUIDs, passwords, and API keys.
          This policy explains what data is and is not handled when you use it.
        </p>

        <Section title="Generated values never leave your device">
          <p>
            Every UUID, GUID, password, and API key is generated{" "}
            <strong>locally in your browser</strong> using the Web Crypto API. These
            values are never transmitted to, stored on, or logged by any server. We
            cannot see what you generate, and nothing you generate is recoverable by us.
          </p>
          <p>
            Values exist only in your browser tab for the duration of your session.
            Closing or refreshing the page discards them.
          </p>
        </Section>

        <Section title="Contact form">
          <p>
            If you use the{" "}
            <a href="/contact">contact form</a>, the name, email address, and message you
            submit are sent to our automation service so we can read and respond to your
            message. We collect your IP address transiently for spam prevention and rate
            limiting. This information is used solely to handle your enquiry and is not
            sold or shared for marketing.
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            We use <strong>Vercel Web Analytics</strong> to understand aggregate, anonymous
            usage such as page views. It does not use cookies and does not collect
            personally identifiable information or track you across other sites. The
            values you generate are never included in any analytics event.
          </p>
        </Section>

        <Section title="Cookies and local storage">
          <p>
            Keyforge does not use tracking or advertising cookies. Your theme preference
            (light or dark) may be stored locally in your browser so the site remembers it
            on your next visit. This stays on your device and is not sent anywhere.
          </p>
        </Section>

        <Section title="Hosting">
          <p>
            The site is hosted on Vercel. As with any website, the hosting provider may
            process standard request metadata (such as IP address and user agent) to serve
            pages and protect the service. See the{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
              Vercel Privacy Policy
            </a>{" "}
            for details.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. Material changes will be reflected
            by the &quot;Last updated&quot; date above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about privacy? Reach us through the{" "}
            <a href="/contact">contact page</a>.
          </p>
        </Section>
      </div>
    </div>
  );
}

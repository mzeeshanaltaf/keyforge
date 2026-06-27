import type { Metadata } from "next";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact & Feedback",
  description:
    "Found a bug, have an idea, or want to get in touch? Send the Keyforge team a message.",
  alternates: { canonical: "/contact" },
};

// Short error codes set by the API route's redirect (?error=...) mapped to
// human-readable copy. Keep keys in sync with the route handler's fail() calls.
const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please fill in all fields.",
  email: "Please enter a valid email address.",
  length: "Message must be 5000 characters or fewer.",
  rate: "Too many submissions. Please try again later.",
  server: "Service is temporarily unavailable. Please try again later.",
  parse: "Invalid submission. Please try again.",
};

// In Next.js App Router, searchParams is a Promise and must be awaited.
type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const initialError = error
    ? ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."
    : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 flex items-start gap-4">
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
          <EnvelopeSimpleIcon size={24} weight="duotone" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Contact &amp; Feedback
          </h1>
          <p className="mt-1 text-muted-foreground">
            Found a bug, have an idea, or just want to say hi? Send a message - we read
            everything.
          </p>
        </div>
      </header>

      <div className="rounded-xl border border-border bg-card/40 p-6 sm:p-8">
        <ContactForm initialSuccess={!!sent} initialError={initialError} />
      </div>
    </div>
  );
}

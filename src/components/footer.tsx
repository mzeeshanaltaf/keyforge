import Link from "next/link";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold tracking-tight text-foreground">Keyforge</span>
          <span aria-hidden="true">&middot;</span>
          <span>
            Developed with 💖 by{" "}
            <a
              href="https://www.zeeshanai.cloud"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Zeeshan Altaf
            </a>
          </span>
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <nav className="flex items-center gap-4">
            <Link
              href="/contact"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </nav>
          <p className="inline-flex items-center gap-2">
            <ShieldCheckIcon size={16} weight="bold" className="text-primary" />
            Generated locally in your browser. Nothing is sent to a server.
          </p>
        </div>
      </div>
    </footer>
  );
}

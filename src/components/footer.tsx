import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-semibold tracking-tight text-foreground">Keyforge</p>
        <p className="inline-flex items-center gap-2">
          <ShieldCheckIcon size={16} weight="bold" className="text-primary" />
          Generated locally in your browser. Nothing is sent to a server.
        </p>
      </div>
    </footer>
  );
}

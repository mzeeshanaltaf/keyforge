import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

interface GeneratorShellProps {
  icon: Icon;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * Page scaffold shared by every tool route: a compact header with the tool
 * icon and a constrained content column. Renders on the server; interactive
 * tool islands and static educational content are passed as children.
 */
export function GeneratorShell({
  icon: IconComponent,
  title,
  description,
  children,
}: GeneratorShellProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 flex items-start gap-4">
        <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card text-primary">
          <IconComponent size={24} weight="duotone" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">{description}</p>
        </div>
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}

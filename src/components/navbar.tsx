"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CubeIcon } from "@phosphor-icons/react";
import { TOOLS } from "@/lib/tools";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <CubeIcon size={16} weight="fill" />
          </span>
          <span className="hidden sm:inline">Keyforge</span>
        </Link>

        <div className="ml-auto flex items-center gap-1 overflow-x-auto">
          {TOOLS.map((tool) => {
            const active = pathname === tool.href;
            return (
              <Link
                key={tool.slug}
                href={tool.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {tool.navLabel}
              </Link>
            );
          })}
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              pathname === "/contact"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

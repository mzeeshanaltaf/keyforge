@AGENTS.md

# Keyforge — Project Guide

Client-side generator for UUIDs, GUIDs, strong passwords, and API keys. All generation
runs in the browser via the Web Crypto API; nothing is sent to a server.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui — **Base UI primitives, not Radix** (see gotchas)
- Phosphor Icons, next-themes (class strategy), sonner toasts
- Vitest for unit tests

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build (also type-checks)
npm run lint       # ESLint (must pass with no warnings)
npm test           # Vitest unit tests
```

## Architecture

- **Routes** (`src/app/`): `/` landing + one route each for `/uuid`, `/guid`,
  `/password`, `/api-key`. Route pages are **Server Components** that render the page
  header (`GeneratorShell`), the interactive tool, and a static `InfoSection`
  (educational content, server-rendered for SEO).
- **Tool islands** (`src/components/tools/`): each tool has two files —
  `*-tool.tsx` (the `"use client"` UI) and `*-tool-island.tsx` (a `next/dynamic`
  wrapper with `ssr: false` and a `ToolSkeleton` fallback). Pages import the island.
- **Shared UI** (`src/components/`): `tool-workspace` (controls + results layout),
  `output-list`, `result-actions` (copy/CSV/JSON), `bulk-count`, `entropy-meter`,
  `info-section`, `navbar`, `footer`, `theme-toggle`.
- **Core logic** (`src/lib/`): pure, framework-free, and unit-tested.
  - `random.ts` — `secureRandomInt` (rejection sampling), `pickChar`, `shuffle`, `randomBytes`.
  - `generators/` — `uuid` (v4 + hand-rolled v7), `guid` (format wrapper), `password`,
    `apiKey`. Registry of tool metadata lives in `lib/tools.ts`.
  - `entropy.ts` — `bitsOfEntropy = length * log2(alphabet)`, strength buckets.
  - `export.ts` — `toCSV`, `toJSON`, `downloadFile`, `copyToClipboard`.

## Conventions & invariants

- **Never use `Math.random` for any generated value.** All randomness goes through
  `src/lib/random.ts` (rejection-sampled to avoid modulo bias).
- **Keep generation logic in `lib/`** as pure functions; components only call them.
  Add/extend tests in `src/lib/generators.test.ts` when changing generator behavior.
- **Crypto-seeded state pattern**: seed `useState` lazily (e.g.
  `useState(() => generate())`) and render the tool through its `ssr: false` island.
  Do **not** call `crypto` during a server-rendered path or inside a `useEffect` body
  (the `react-hooks/set-state-in-effect` rule will flag it).
- **Bulk count** is clamped to 1–100 everywhere via `BulkCount`.
- **Theming**: single emerald accent locked across the app (CSS vars in
  `app/globals.css`). One accent only; strength meter colors (red/amber/emerald) are
  the sole exception and are semantic. Toggle icons switch via the `.dark` class, not state.
- **Copy/UX**: no em-dashes in user-facing strings; use hyphens. Keys render in the
  `font-key` (monospace, tabular) class.

## Base UI vs Radix gotchas

The shadcn components use `@base-ui/react`, so the API differs from Radix:

- Button has no `asChild` — use `render={<Link href="..." />}` for links.
- `TooltipProvider` uses `delay`, not `delayDuration`.
- `Slider` `onValueChange` receives `number | number[]` — normalize with
  `Array.isArray(v) ? v[0] : v`.

## Adding a new generator tool

1. Add a pure generator in `src/lib/generators/` and tests in `generators.test.ts`.
2. Register it in `src/lib/tools.ts` (slug, href, name, icon, tagline).
3. Create `src/components/tools/<tool>-tool.tsx` + `<tool>-tool-island.tsx`.
4. Add `src/app/<slug>/page.tsx` (Server Component) with `metadata`, `GeneratorShell`,
   the island, and an `InfoSection`.

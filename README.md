# Keyforge

A fast, privacy-first generator for **UUIDs, GUIDs, strong passwords, and API keys**.
Everything is generated locally in your browser with the Web Crypto API. Nothing is
ever sent to a server.

> Bulk-generate up to 100 values at a time, see live entropy, and copy or export to CSV / JSON.

## Features

- **UUID** — versions **v4** (random) and **v7** (time-ordered, sortable), with a
  breakdown of the `8-4-4-4-12` structure and version / variant bits.
- **GUID** — Microsoft-style identifiers with uppercase, hyphen, and brace / parenthesis
  formatting (standard, registry, and code styles).
- **Password** — adjustable length (10–50), selectable character classes, an
  "exclude look-alikes" option, and a **live entropy + strength meter**.
- **API Key** — custom prefix, fixed lengths (16 / 24 / 32 / 48 / 64), a charset selector,
  and the **entropy in bits** shown for each length.
- **Bulk + export** — generate 1–100 at once; copy a single value, copy the whole batch,
  or download as **CSV** or **JSON**.
- **Private by design** — generation uses `crypto.getRandomValues` with unbiased
  (rejection-sampled) selection. No network requests, no logging.
- Dark / light mode, keyboard-friendly controls, and a responsive layout.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com)
  (Base UI primitives)
- [Phosphor Icons](https://phosphoricons.com), [next-themes](https://github.com/pacocoursey/next-themes),
  [sonner](https://sonner.emilkowal.ski)
- [Vitest](https://vitest.dev) for unit tests

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Production build                     |
| `npm run start`    | Serve the production build           |
| `npm run lint`     | Run ESLint                           |
| `npm test`         | Run the unit test suite (Vitest)     |
| `npm run test:watch` | Run tests in watch mode            |

## Project structure

```
src/
├── app/                      # Routes: /, /uuid, /guid, /password, /api-key
├── components/
│   ├── tools/                # The four tool panels + their ssr:false islands
│   ├── ui/                   # shadcn/ui primitives
│   └── *.tsx                 # Shared shell, output list, entropy meter, nav, etc.
└── lib/
    ├── generators/           # uuid, guid, password, apiKey (pure functions)
    ├── random.ts             # Secure randomness helpers (rejection sampling)
    ├── entropy.ts            # Entropy math + strength buckets
    └── export.ts             # CSV / JSON / clipboard / download
```

## How it works

Each tool is a **client-only island** (loaded with `next/dynamic` and `ssr: false`) that
seeds its initial values from `crypto` during render. This avoids server/client hydration
mismatches while keeping the educational content on each page **server-rendered for SEO**.

All randomness flows through [`src/lib/random.ts`](src/lib/random.ts), which uses rejection
sampling to avoid modulo bias. The generators are pure and covered by unit tests in
[`src/lib/generators.test.ts`](src/lib/generators.test.ts).

## License

MIT

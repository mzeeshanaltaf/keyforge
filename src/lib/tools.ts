import type { Icon } from "@phosphor-icons/react";
import {
  FingerprintIcon,
  WindowsLogoIcon,
  PasswordIcon,
  KeyIcon,
} from "@phosphor-icons/react/dist/ssr";

export interface ToolMeta {
  slug: string;
  href: string;
  name: string;
  /** Short label used in nav. */
  navLabel: string;
  /** One-line description for cards and metadata. */
  tagline: string;
  icon: Icon;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "uuid",
    href: "/uuid",
    name: "UUID Generator",
    navLabel: "UUID",
    tagline: "Versions 4 and 7, with structure breakdown and bulk export.",
    icon: FingerprintIcon,
  },
  {
    slug: "guid",
    href: "/guid",
    name: "GUID Generator",
    navLabel: "GUID",
    tagline: "Microsoft-style GUIDs with braces, casing, and registry formats.",
    icon: WindowsLogoIcon,
  },
  {
    slug: "password",
    href: "/password",
    name: "Password Generator",
    navLabel: "Password",
    tagline: "Strong passwords with a live entropy and strength readout.",
    icon: PasswordIcon,
  },
  {
    slug: "api-key",
    href: "/api-key",
    name: "API Key Generator",
    navLabel: "API Key",
    tagline: "Prefixed keys at fixed lengths, each with its entropy in bits.",
    icon: KeyIcon,
  },
];

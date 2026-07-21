import { TOOLS } from "@/lib/tools";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

const tool = TOOLS.find((t) => t.slug === "guid")!;

export const alt = `${tool.name} - Keyforge`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ title: tool.name, subtitle: tool.tagline });
}

import { SITE_DESCRIPTION_SHORT } from "@/lib/site";
import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "Keyforge - UUID, GUID, Password & API Key Generator";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return ogImage({
    title: "Generate keys that never leave your browser.",
    subtitle: SITE_DESCRIPTION_SHORT,
  });
}

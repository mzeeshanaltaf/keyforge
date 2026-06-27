import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION_SHORT } from "@/lib/site";

export const alt = "Keyforge - UUID, GUID, Password & API Key Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(5,150,105,0.25), transparent 45%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand: emerald tile with the Keyforge cube */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#059669",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 256 256">
              <path
                fill="#ffffff"
                fillOpacity="0.35"
                d="M128,129.09V232a8,8,0,0,1-3.84-1l-88-48.16a8,8,0,0,1-4.16-7V80.2a8,8,0,0,1,.7-3.27Z"
              />
              <path
                fill="#ffffff"
                d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"
              />
            </svg>
          </div>
          <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
            Keyforge
          </span>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Generate keys that never leave your browser.
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 820,
          }}
        >
          {SITE_DESCRIPTION_SHORT}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 12,
            alignSelf: "flex-start",
            background: "#059669",
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 600,
            padding: "18px 36px",
            borderRadius: 14,
          }}
        >
          Start generating
          <span style={{ fontSize: 32 }}>&rarr;</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#059669",
              display: "flex",
            }}
          />
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
            marginTop: 32,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 820,
          }}
        >
          UUIDs, GUIDs, strong passwords, and API keys, built with the Web Crypto API.
        </div>
      </div>
    ),
    { ...size }
  );
}

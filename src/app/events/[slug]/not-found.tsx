import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function EventNotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#030308",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 480,
          textAlign: "center",
          padding: "48px 32px",
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: "rgba(255, 153, 0, 0.1)",
            border: "1px solid rgba(255, 153, 0, 0.25)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FF9900",
            marginBottom: 20,
          }}
        >
          <Compass size={28} />
        </div>

        <span
          style={{
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#FF9900",
            display: "block",
            marginBottom: 8,
          }}
        >
          404 · Event Not Found
        </span>

        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 36px)",
            fontWeight: 800,
            margin: "0 0 16px 0",
            color: "#FFFFFF",
          }}
        >
          Folder Not In Archive
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "rgba(255, 255, 255, 0.6)",
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          The requested event record does not exist or has been relocated in the AWS SBG archive.
        </p>

        <Link
          href="/#events"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 24px",
            borderRadius: 12,
            backgroundColor: "#FF9900",
            color: "#000000",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          Return to Events Carousel
        </Link>
      </div>
    </main>
  );
}

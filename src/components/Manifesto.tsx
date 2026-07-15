"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Shared layout constant — inline styles, immune to Tailwind overrides
const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

const LINES = [
  { dim: "Most college clubs teach cloud.",              bright: "" },
  { dim: "We",                                           bright: "build with it." },
  { dim: "We stay back after the workshop",              bright: "to actually deploy the thing." },
  { dim: "We break prod on a Friday",                    bright: "just to fix it by Saturday." },
];

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineX = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section style={{ ...S, background: "transparent", overflow: "hidden" }}>
      {/* Faint vertical line */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: "50%", width: 1, height: "100%",
          background: "linear-gradient(180deg,transparent,rgba(255,153,0,0.1) 30%,rgba(255,153,0,0.1) 70%,transparent)",
          x: lineX,
          translateX: "-50%",
        }}
      />

      {/* Big quote mark */}
      <div style={{
        position: "absolute", top: -20, left: "max(20px, calc((100% - 1160px)/2 + 60px))",
        fontSize: 280, fontWeight: 800, lineHeight: 1,
        color: "rgba(255,153,0,0.03)", pointerEvents: "none", userSelect: "none",
        fontFamily: "Georgia, serif",
      }}>
        "
      </div>

      <div ref={ref} style={W}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <span className="section-label">Our Manifesto</span>
        </motion.div>

        {/* Lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(24px, 3.8vw, 52px)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.2)" }}>{line.dim} </span>
              {line.bright && <span style={{ color: "#fff" }}>{line.bright}</span>}
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            marginTop: 72, paddingTop: 56,
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p style={{ fontSize: "clamp(22px, 3.2vw, 44px)", fontWeight: 700, lineHeight: 1.25 }}>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>If you're that kind of builder — </span>
            <span
              style={{
                background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              you belong here.
            </span>
          </p>
          <motion.a
            href="#join"
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              marginTop: 28, color: "#FF9900", fontWeight: 600, fontSize: 16,
              textDecoration: "none",
            }}
          >
            Claim your spot →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

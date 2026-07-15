"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── shared layout constants ───────────────────────────────────────────────── */
export const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;

/* ── terminal ───────────────────────────────────────────────────────────────── */
const LINES = [
  { t: "$ whoami",                         c: "rgba(255,255,255,0.3)", d: 200 },
  { t: "→  builder @ RV University",       c: "#FF9900",               d: 700 },
  { t: "",                                 c: "",                      d: 950 },
  { t: "$ ./run --community aws-sbg-rvu",  c: "rgba(255,255,255,0.3)", d: 1150 },
  { t: "",                                 c: "",                      d: 1350 },
  { t: "Initializing community...",        c: "rgba(255,255,255,0.28)", d: 1550 },
  { t: "██████████████████  100%",         c: "#FF9900",               d: 2400 },
  { t: "",                                 c: "",                      d: 2650 },
  { t: "✓  Members     200+",              c: "#22C55E",               d: 2850 },
  { t: "✓  Projects    15+",               c: "#22C55E",               d: 3100 },
  { t: "✓  Certs       40+",               c: "#22C55E",               d: 3350 },
  { t: "✓  Events      8",                 c: "#22C55E",               d: 3600 },
  { t: "",                                 c: "",                      d: 3850 },
  { t: "Ready. You belong here.",          c: "#38BDF8",               d: 4100 },
];

function Terminal() {
  const [shown, setShown] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setShown((s) => new Set([...s, i])), line.d + 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(6,6,14,0.95)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 22,
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,153,0,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        overflow: "hidden",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "14px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          aws-sbg — terminal
        </span>
      </div>

      {/* Body */}
      <div className="mono" style={{ padding: "24px 24px 28px", fontSize: 13, lineHeight: 1.8, minHeight: 280 }}>
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.c || "transparent",
              height: line.t === "" ? 8 : "auto",
              opacity: shown.has(i) ? 1 : 0,
              transform: shown.has(i) ? "none" : "translateY(6px)",
              transition: "opacity 0.3s, transform 0.3s",
              fontSize: 13,
            }}
          >
            {line.t}
          </div>
        ))}
        {/* Cursor */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>$</span>
          <span className="blink" style={{ color: "#FF9900", fontSize: 14 }}>█</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── word reveal ─────────────────────────────────────────────────────────────── */
const wordVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const word = {
  hidden: { y: 80, opacity: 0, skewY: 4 },
  show: { y: 0, opacity: 1, skewY: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/* ── hero ────────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 700], [0, -80]);
  const smooth = useSpring(yParallax, { stiffness: 60, damping: 18 });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "transparent",
        paddingTop: 90,
      }}
    >
      {/* ── Aurora blobs ─────────────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          className="aurora-1"
          style={{
            position: "absolute", width: 900, height: 900,
            top: "-20%", left: "-15%",
            background: "radial-gradient(circle, rgba(255,153,0,0.09) 0%, transparent 65%)",
            filter: "blur(80px)",
            transformOrigin: "center",
          }}
        />
        <div
          className="aurora-2"
          style={{
            position: "absolute", width: 800, height: 800,
            top: "20%", right: "-15%",
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
            transformOrigin: "center",
          }}
        />
        <div
          className="aurora-3"
          style={{
            position: "absolute", width: 600, height: 600,
            bottom: "-10%", left: "35%",
            background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
            transformOrigin: "center",
          }}
        />
      </div>

      {/* Grid dots */}
      <div
        className="grid-dots"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }}
      />

      {/* ── Main content ──────────────────────────────────────── */}
      <motion.div style={{ y: smooth, position: "relative", zIndex: 10 }}>
        <div style={W}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 64,
              alignItems: "center",
              minHeight: "78vh",
              paddingTop: 40,
              paddingBottom: 60,
            }}
          >
            {/* On large screens: 2 columns */}
            <style>{`@media(min-width:900px){#hero-grid{grid-template-columns:1fr 460px!important;gap:80px!important}}`}</style>
            <div id="hero-grid" style={{ display: "contents" }}>

              {/* LEFT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 10,
                      padding: "8px 16px", borderRadius: 99,
                      background: "rgba(255,153,0,0.07)",
                      border: "1px solid rgba(255,153,0,0.2)",
                    }}
                  >
                    <span
                      style={{
                        width: 7, height: 7, borderRadius: "50%",
                        background: "#FF9900",
                        boxShadow: "0 0 8px #FF9900",
                        animation: "blink 2s ease-in-out infinite",
                      }}
                    />
                    <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#FF9900", letterSpacing: "0.06em" }}>
                      AWS Student Builder Group · RV University
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <div style={{ overflow: "hidden" }}>
                  <motion.h1
                    variants={wordVariants}
                    initial="hidden"
                    animate="show"
                    style={{
                      fontWeight: 800,
                      lineHeight: 0.95,
                      letterSpacing: "-0.03em",
                      fontSize: "clamp(64px, 9vw, 110px)",
                    }}
                  >
                    {["We're", "building"].map((w) => (
                      <div key={w} style={{ overflow: "hidden", display: "block" }}>
                        <motion.span variants={word} style={{ display: "block", color: "#fff" }}>{w}</motion.span>
                      </div>
                    ))}
                    {["what's", "missing."].map((w, i) => (
                      <div key={w} style={{ overflow: "hidden", display: "block" }}>
                        <motion.span
                          variants={word}
                          style={{
                            display: "block",
                            background: "linear-gradient(125deg, #FF9900, #FF6200 50%, #FFBE00)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {w}
                        </motion.span>
                      </div>
                    ))}
                  </motion.h1>
                </div>

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  style={{
                    fontSize: 18, lineHeight: 1.7, maxWidth: 480,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  A <span style={{ color: "#fff", fontWeight: 600 }}>builder-first community</span> at RV University.
                  No theory theatrics. Real AWS projects, shipped by real students.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.6 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}
                >
                  <a href="#join" className="btn-orange" id="hero-join">
                    Join the builders <ArrowRight size={17} />
                  </a>
                  <a href="#projects" className="btn-ghost" id="hero-projects">
                    See what we've built
                  </a>
                </motion.div>

                {/* Stat strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15 }}
                  style={{
                    display: "flex", gap: 36, paddingTop: 28,
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    flexWrap: "wrap",
                  }}
                >
                  {[["200+", "Members"], ["15+", "Projects"], ["40+", "Certs"], ["8", "Events"]].map(([val, label], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.15 + i * 0.08 }}
                    >
                      <div
                        style={{
                          fontSize: 28, fontWeight: 800,
                          background: "linear-gradient(135deg, #FF9900, #FFBE00)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          lineHeight: 1,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 5 }}
                      >
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT COLUMN — Terminal (hidden on mobile, shown on 900px+) */}
              <div style={{ display: "none" }} id="hero-terminal-col">
                <style>{`@media(min-width:900px){#hero-terminal-col{display:block!important}}`}</style>
                <Terminal />
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}
      >
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
          scroll
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.2)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

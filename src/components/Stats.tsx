"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

const STATS = [
  { value: 200, suffix: "+", label: "Members",          sub: "and growing",          color: "#FF9900" },
  { value: 15,  suffix: "+", label: "Projects Shipped", sub: "by our community",     color: "#38BDF8" },
  { value: 40,  suffix: "+", label: "AWS Certs Earned", sub: "by students",          color: "#818CF8" },
  { value: 8,   suffix: "",  label: "Events",           sub: "workshops & hackathons", color: "#22C55E" },
];

function CountUp({ to, suffix, color, run }: { to: number; suffix: string; color: string; run: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let v = 0;
    const step = to / 55;
    const t = setInterval(() => {
      v = Math.min(v + step, to);
      setVal(Math.floor(v));
      if (v >= to) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [run, to]);
  return (
    <span
      style={{
        fontSize: "clamp(56px, 7vw, 88px)", fontWeight: 800,
        lineHeight: 1, fontVariantNumeric: "tabular-nums",
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}
    >
      {val}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section style={S}>
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,153,0,0.03) 0%, transparent 70%)",
        }}
      />
      <div style={W}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
          >
            <span className="section-label">Impact</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff",
            }}
          >
            Numbers that{" "}
            <span
              style={{
                background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              don&apos;t lie.
            </span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 22,
                padding: "48px 36px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                textAlign: "center", gap: 12,
                position: "relative", overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                borderColor: `${s.color}44`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${s.color}22`,
                y: -4,
              }}
            >
              {/* Bottom accent line */}
              <div
                style={{
                  position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                  width: 60, height: 2, borderRadius: 99,
                  background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                }}
              />
              <CountUp to={s.value} suffix={s.suffix} color={s.color} run={isInView} />
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>{s.label}</div>
              <div className="mono" style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

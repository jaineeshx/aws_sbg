"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

interface Track { id: string; icon: string; title: string; desc: string; perks: string[]; color: string; }
const TRACKS: Track[] = [
  { id: "cloud", icon: "☁️", title: "Cloud Builder", color: "#FF9900",
    desc: "Build real infrastructure on AWS. EC2, S3, Lambda, RDS — hands on from day one.",
    perks: ["AWS Free Tier credits", "Weekly lab sessions", "CCP prep track"] },
  { id: "ai", icon: "🤖", title: "AI/ML Builder", color: "#38BDF8",
    desc: "Work with Bedrock, SageMaker, Rekognition. Build AI apps that actually do something.",
    perks: ["Bedrock API access", "Mentorship from seniors", "Build log published"] },
  { id: "fullstack", icon: "⚡", title: "Fullstack Builder", color: "#818CF8",
    desc: "Ship end-to-end products. Frontend, Lambda APIs, DynamoDB, CloudFront — the full stack.",
    perks: ["Guided project tracks", "Real AWS deployment", "Portfolio projects"] },
  { id: "devops", icon: "🚀", title: "DevOps Builder", color: "#22C55E",
    desc: "Pipelines, CI/CD, containers, EKS. The infrastructure work that makes everything possible.",
    perks: ["EKS sandbox access", "CI/CD project", "Certification path"] },
];

export default function Join() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="join" style={{ ...S, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 900px 700px at 50% 60%, rgba(255,153,0,0.04) 0%, transparent 70%)",
        }}
      />
      <div style={W} ref={ref}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}
          >
            <span className="section-label">Join the Community</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6.5vw, 80px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20,
            }}
          >
            Stop learning cloud.
            <br />
            <span style={{
              background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Start building on it.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto", lineHeight: 1.65 }}
          >
            Pick a track, join a cohort, and ship your first real AWS project within 30 days.
          </motion.p>
        </div>

        {/* Track cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16, marginBottom: 64,
        }}>
          {TRACKS.map((track, i) => {
            const active = selected === track.id;
            return (
              <motion.button
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                onClick={() => setSelected(active ? null : track.id)}
                id={`track-${track.id}`}
                style={{
                  textAlign: "left", padding: "28px",
                  borderRadius: 20, cursor: "pointer",
                  background: active ? `${track.color}0F` : "rgba(255,255,255,0.025)",
                  border: `1px solid ${active ? `${track.color}40` : "rgba(255,255,255,0.07)"}`,
                  transition: "background 0.25s, border-color 0.25s",
                  position: "relative",
                  display: "flex", flexDirection: "column", gap: 16,
                }}
              >
                {active && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    style={{
                      position: "absolute", top: 16, right: 16,
                      width: 22, height: 22, borderRadius: "50%",
                      background: track.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <Check size={12} color="#000" />
                  </motion.div>
                )}
                <span style={{ fontSize: 32 }}>{track.icon}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{track.title}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{track.desc}</p>
                </div>
                <AnimatePresence>
                  {active && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}
                    >
                      {track.perks.map((perk) => (
                        <li key={perk}
                          style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: track.color }}
                        >
                          <Check size={11} />{perk}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <div style={{ height: 2, borderRadius: 99, background: active ? track.color : "rgba(255,255,255,0.06)", marginTop: "auto" }} />
              </motion.button>
            );
          })}
        </div>


      </div>
    </section>
  );
}

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
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !selected) return;
    setTimeout(() => setSubmitted(true), 300);
  };

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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.55 }}
          style={{ maxWidth: 520, margin: "0 auto" }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: "center", padding: "60px 40px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 22,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(34,197,94,0.12)",
                    border: "2px solid #22C55E",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <Check size={28} color="#22C55E" />
                </motion.div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>You&apos;re in. 🎉</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                  Welcome to AWS SBG @ RV University. Check your email for the WhatsApp group invite and next steps.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 22, padding: "40px",
                  display: "flex", flexDirection: "column", gap: 20,
                }}
              >
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Join AWS SBG</h3>
                  <p className="mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    {selected ? `Track: ${TRACKS.find(t => t.id === selected)?.title}` : "Select a track above to continue"}
                  </p>
                </div>
                {[
                  { value: name, setter: setName, placeholder: "Your full name", id: "join-name", type: "text" },
                  { value: email, setter: setEmail, placeholder: "College email address", id: "join-email", type: "email" },
                ].map(({ value, setter, placeholder, id, type }) => (
                  <input
                    key={id} type={type} value={value}
                    onChange={e => setter(e.target.value)}
                    placeholder={placeholder} required id={id}
                    style={{
                      width: "100%", padding: "14px 18px",
                      borderRadius: 12, fontSize: 14, color: "#fff",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "inherit", outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => (e.target.style.borderColor = "rgba(255,153,0,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                ))}
                <select
                  value={year} onChange={e => setYear(e.target.value)}
                  id="join-year"
                  style={{
                    width: "100%", padding: "14px 18px",
                    borderRadius: 12, fontSize: 14,
                    color: year ? "#fff" : "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "inherit", outline: "none", appearance: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => (e.target.style.borderColor = "rgba(255,153,0,0.4)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  <option value="" disabled style={{ background: "#0a0a14" }}>Year of study</option>
                  {["1st Year", "2nd Year", "3rd Year", "4th Year"].map(y => (
                    <option key={y} value={y} style={{ background: "#0a0a14" }}>{y}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="btn-orange"
                  id="join-submit"
                  style={{
                    justifyContent: "center",
                    opacity: (!name || !email || !selected) ? 0.45 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  Join the builders <ArrowRight size={17} />
                </button>
                <p className="mono" style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
                  No spam. Just builds, events, and AWS credits.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

const GithubSvg = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInSvg = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

type Wing = "All" | "Leadership" | "Technical" | "Events" | "Creative" | "Community";
const WINGS: Wing[] = ["All", "Leadership", "Technical", "Events", "Creative", "Community"];
const WING_COLOR: Record<Exclude<Wing, "All">, string> = {
  Leadership: "#FF9900", Technical: "#38BDF8",
  Events: "#818CF8", Creative: "#EC4899", Community: "#22C55E",
};

interface Member {
  id: string; name: string; role: string;
  wing: Exclude<Wing, "All">;
  year: string; branch: string; bio: string; building: string;
  certs: string[]; github?: string; linkedin?: string;
}

const TEAM: Member[] = [
  { id: "m1", name: "Santhosh K", role: "Director of Technology", wing: "Leadership",
    year: "3rd Year", branch: "CSE", bio: "Leading the tech vision for AWS SBG at RV University.",
    building: "Serverless event management platform on AWS.", certs: ["CCP", "SAA"], linkedin: "#", github: "#" },
  { id: "m2", name: "Priya Sharma", role: "Cloud Architect Lead", wing: "Technical",
    year: "3rd Year", branch: "ISE", bio: "Building cloud-native solutions and teaching others to do the same.",
    building: "Multi-region AWS Lambda architecture.", certs: ["SAA", "DVA"], linkedin: "#", github: "#" },
  { id: "m3", name: "Rohan Mehta", role: "Events Coordinator", wing: "Events",
    year: "2nd Year", branch: "ECE", bio: "Making sure every event actually happens and is worth attending.",
    building: "Event ticketing system with QR auth.", certs: ["CCP"], linkedin: "#" },
  { id: "m4", name: "Aisha Nair", role: "Creative Director", wing: "Creative",
    year: "2nd Year", branch: "CSE", bio: "Brand, design, and making AWS SBG look like it means business.",
    building: "Design system for the club website.", certs: [], linkedin: "#" },
  { id: "m5", name: "Dev Krishnan", role: "Community Lead", wing: "Community",
    year: "3rd Year", branch: "CSE", bio: "Growing the builder network across RV University and beyond.",
    building: "Discord bot for community engagement.", certs: ["CCP"], linkedin: "#", github: "#" },
  { id: "m6", name: "Nisha Patel", role: "Backend Developer", wing: "Technical",
    year: "2nd Year", branch: "ISE", bio: "APIs, databases, and making things fast.",
    building: "DynamoDB-backed real-time leaderboard.", certs: ["DVA"], linkedin: "#", github: "#" },
];

function MemberCard({ m, i }: { m: Member; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const color = WING_COLOR[m.wing];
  const initials = m.name.split(" ").map((n) => n[0]).join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ height: 320, perspective: 1200, cursor: "default" }}
      id={`team-${m.id}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 22,
            padding: "32px",
            display: "flex", flexDirection: "column", gap: 16,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: 14,
                background: `linear-gradient(135deg, ${color}, ${color}88)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 800, color: "#000",
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <span
              className="pill"
              style={{ background: `${color}14`, color, borderColor: `${color}35` }}
            >
              {m.wing}
            </span>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{m.name}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{m.role}</div>
            <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 4 }}>
              {m.year} · {m.branch}
            </div>
          </div>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, flex: 1 }}>{m.bio}</p>

          {m.certs.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {m.certs.map((c) => (
                <span
                  key={c}
                  className="mono pill"
                  style={{ background: "rgba(255,153,0,0.08)", color: "#FF9900", borderColor: "rgba(255,153,0,0.25)", fontSize: 10 }}
                >
                  AWS {c}
                </span>
              ))}
            </div>
          )}

          <p className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", textAlign: "center" }}>
            Hover → see what they&apos;re building
          </p>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(145deg, ${color}12, rgba(10,10,20,0.98))`,
            border: `1px solid ${color}28`,
            borderRadius: 22,
            padding: "32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div>
            <div className="mono" style={{ fontSize: 11, fontWeight: 600, color, marginBottom: 20 }}>
              &gt; Currently building
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", lineHeight: 1.55 }}>
              {m.building}
            </p>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {m.github && (
              <a href={m.github} style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              ><GithubSvg /></a>
            )}
            {m.linkedin && (
              <a href={m.linkedin} style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
              ><LinkedInSvg /></a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [wing, setWing] = useState<Wing>("All");
  const filtered = wing === "All" ? TEAM : TEAM.filter((m) => m.wing === wing);

  return (
    <section id="team" style={S}>
      <div style={W}>
        <div ref={ref} style={{ marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 24 }}>
            <span className="section-label">The Team</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20,
            }}
          >
            People who{" "}
            <span
              style={{
                background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              actually ship.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.5)" }}
          >
            Hover any card to see what they&apos;re currently building.
          </motion.p>
        </div>

        {/* Wing filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}
        >
          {WINGS.map((w) => {
            const active = wing === w;
            const c = w !== "All" ? WING_COLOR[w] : "#FF9900";
            return (
              <button
                key={w}
                onClick={() => setWing(w)}
                id={`team-filter-${w.toLowerCase()}`}
                style={{
                  padding: "8px 20px", borderRadius: 99,
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: active ? `${c}15` : "rgba(255,255,255,0.04)",
                  color: active ? c : "rgba(255,255,255,0.4)",
                  border: `1px solid ${active ? `${c}40` : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.2s",
                }}
              >
                {w}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={wing}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((m, i) => <MemberCard key={m.id} m={m} i={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

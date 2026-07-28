"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

const GithubSvg = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedInSvg = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface Member {
  name: string;
  role: string;
  photo: string;
  github: string;
  linkedin: string;
}

const team: Member[] = [
  {
    name: "Nishit Patel",
    role: "Group Leader",
    photo: "",
    github: "https://github.com/nish-debug15",
    linkedin: "https://www.linkedin.com/in/nishit-patell/",
  },
  {
    name: "Pranav Adhikari",
    role: "Secretary",
    photo: "",
    github: "https://github.com/Pranav591",
    linkedin: "https://www.linkedin.com/in/pranav-adhikari-055b7a328/",
  },
  {
    name: "Jaineesh Patel",
    role: "Director of Technology",
    photo: "",
    github: "https://github.com/jaineeshx",
    linkedin: "https://www.linkedin.com/in/jaineesh-patel-6471902a7/",
  },
  {
    name: "Ishani V Sheshgiri",
    role: "Director of Growth",
    photo: "",
    github: "",
    linkedin: "https://www.linkedin.com/in/ishani-v-sheshgiri-92618941a/",
  },
  {
    name: "Shriya N",
    role: "Director of Events & Operations",
    photo: "",
    github: "",
    linkedin: "https://www.linkedin.com/in/shriya-narasipura/",
  },
  {
    name: "Aditya P Dixit",
    role: "Director of Product",
    photo: "",
    github: "",
    linkedin: "https://www.linkedin.com/in/aditya-p-dixit/",
  },
];

function MemberCard({ m, i }: { m: Member; i: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ height: 320, perspective: 1200, cursor: "default" }}
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
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {m.photo ? (
            <img src={m.photo} alt={m.name} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", background: "rgba(255,255,255,0.1)" }} />
          ) : (
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)" }}>No Photo</div>
          )}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>{m.name || "Member Name"}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{m.role || "Role"}</div>
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(145deg, rgba(255,153,0,0.05), rgba(10,10,20,0.98))`,
            border: `1px solid rgba(255,153,0,0.1)`,
            borderRadius: 22,
            padding: "32px",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", textAlign: "center" }}>
            Connect with {m.name ? m.name.split(" ")[0] : "them"}
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {m.github && (
              <a href={m.github} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              ><GithubSvg /></a>
            )}
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
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
        </div>

        {team.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {team.map((m, i) => <MemberCard key={i} m={m} i={i} />)}
          </motion.div>
        ) : (
          <div style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "60px 0" }}>
            Team members will be added soon.
          </div>
        )}
      </div>
    </section>
  );
}

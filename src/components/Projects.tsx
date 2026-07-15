"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

const GithubSvg = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

type Cat = "All" | "Hackathon" | "Workshop" | "Personal" | "Ongoing";
const CATS: Cat[] = ["All", "Hackathon", "Workshop", "Personal", "Ongoing"];
const CAT_COLOR: Record<Exclude<Cat, "All">, string> = {
  Hackathon: "#FF6B00", Workshop: "#38BDF8", Personal: "#818CF8", Ongoing: "#22C55E",
};

interface Project {
  id: string; title: string; desc: string;
  cat: Exclude<Cat, "All">; services: string[];
  team: string[]; builtAt?: string; github?: string; demo?: string;
}

const PROJECTS: Project[] = [
  { id: "p1", title: "CampusCloud Attendance", cat: "Hackathon",
    desc: "Real-time face-recognition attendance using AWS Rekognition, Lambda triggers, and DynamoDB for instant record storage.",
    services: ["Rekognition", "Lambda", "DynamoDB", "API Gateway"],
    team: ["Santhosh K", "Priya Sharma"], builtAt: "Build Sprint 2026", github: "#", demo: "#" },
  { id: "p2", title: "Serverless Blog Engine", cat: "Workshop",
    desc: "Fully serverless blog — Next.js frontend, Lambda APIs, S3 + CloudFront edge delivery.",
    services: ["Lambda", "S3", "CloudFront", "API Gateway"],
    team: ["Nisha Patel", "Dev Krishnan"], builtAt: "AWS Workshop", github: "#" },
  { id: "p3", title: "RVU Study Buddy AI", cat: "Ongoing",
    desc: "RAG-powered study assistant on AWS Bedrock (Claude) + Knowledge Bases + OpenSearch Serverless.",
    services: ["Bedrock", "Knowledge Bases", "OpenSearch", "Lambda"],
    team: ["Priya Sharma", "Rohan Mehta"], github: "#" },
  { id: "p4", title: "Event Ticketing System", cat: "Personal",
    desc: "QR-code event entry — DynamoDB tickets, SES confirmation emails, Lambda auth flow.",
    services: ["DynamoDB", "SES", "Lambda", "S3"],
    team: ["Rohan Mehta"], github: "#", demo: "#" },
  { id: "p5", title: "AWS Cost Tracker", cat: "Personal",
    desc: "Dashboard helping students track free-tier usage and get SNS alerts before charges hit.",
    services: ["Cost Explorer", "CloudWatch", "SNS", "Lambda"],
    team: ["Santhosh K"], github: "#" },
  { id: "p6", title: "Community Discord Bot", cat: "Ongoing",
    desc: "Python Discord bot — event announcements, cert milestone tracking, role assignments.",
    services: ["EC2", "DynamoDB", "EventBridge"],
    team: ["Dev Krishnan", "Nisha Patel"], github: "#" },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const color = CAT_COLOR[p.cat];

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}
      animate={tilt}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 22,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transformStyle: "preserve-3d",
        perspective: 700,
        transition: "border-color 0.3s, box-shadow 0.3s",
        cursor: "default",
      }}
      whileHover={{ borderColor: `${color}33`, boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${color}18` }}
      id={`project-${p.id}`}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            className="pill"
            style={{
              background: `${color}14`,
              color, borderColor: `${color}35`,
            }}
          >
            {p.cat}
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            {p.github && (
              <a href={p.github} style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              ><GithubSvg /></a>
            )}
            {p.demo && (
              <a href={p.demo} style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              ><ExternalLink size={15} /></a>
            )}
          </div>
        </div>

        <h3
          style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.3, flex: 1 }}
        >
          {p.title}
        </h3>

        <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>

        {/* Service tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.services.map((s) => (
            <span
              key={s}
              className="mono"
              style={{
                fontSize: 10, fontWeight: 700,
                padding: "3px 8px", borderRadius: 6,
                background: `${color}10`, color, border: `1px solid ${color}28`,
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14,
        }}>
          <span className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{p.team.join(", ")}</span>
          {p.builtAt && <span className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>@ {p.builtAt}</span>}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<Cat>("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section id="projects" style={S}>
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.015) 50%, transparent)",
        }}
      />
      <div style={W}>
        <div ref={ref} style={{ marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 24 }}>
            <span className="section-label" style={{ color: "#38BDF8" }}>
              <span style={{ background: "#38BDF8" }} />
              Projects Showcase
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20,
            }}
          >
            Built by{" "}
            <span
              style={{
                background: "linear-gradient(125deg,#38BDF8,#818CF8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              our builders.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.65 }}
          >
            Real projects shipped by real students. Proof that builder-first isn&apos;t just a tagline.
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 44 }}
        >
          {CATS.map((cat) => {
            const active = filter === cat;
            const c = cat !== "All" ? CAT_COLOR[cat] : "#38BDF8";
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                id={`project-filter-${cat.toLowerCase()}`}
                style={{
                  padding: "8px 20px", borderRadius: 99,
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                  background: active ? `${c}15` : "rgba(255,255,255,0.04)",
                  color: active ? c : "rgba(255,255,255,0.4)",
                  border: `1px solid ${active ? `${c}40` : "rgba(255,255,255,0.07)"}`,
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {shown.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

type EType = "Workshop" | "Hackathon" | "Meetup" | "Flagship";
const TYPE: Record<EType, { bg: string; text: string; border: string }> = {
  Workshop:  { bg: "rgba(56,189,248,0.08)",  text: "#38BDF8", border: "rgba(56,189,248,0.25)" },
  Hackathon: { bg: "rgba(255,107,0,0.08)",   text: "#FF6B00", border: "rgba(255,107,0,0.25)" },
  Meetup:    { bg: "rgba(34,197,94,0.08)",   text: "#22C55E", border: "rgba(34,197,94,0.25)" },
  Flagship:  { bg: "rgba(255,153,0,0.1)",    text: "#FF9900", border: "rgba(255,153,0,0.4)" },
};

interface Ev {
  id: string; title: string; type: EType; date: string; dateShort: string;
  time: string; location: string; desc: string; tags: string[];
  spotsLeft?: number; featured?: boolean;
}

const EVENTS: Ev[] = [
  { id: "orientation", title: "Orientation & Kickoff", type: "Meetup",
    date: "July 2026 · Week 3", dateShort: "JUL '26", time: "2:00 – 4:00 PM",
    location: "RV University, Bengaluru",
    desc: "Meet the team, explore AWS SBG, and find your builder track. Pizza included.",
    tags: ["Community", "Intro"] },
  { id: "kiro", title: "Build with Kiro Workshop", type: "Workshop",
    date: "August 2026 · Week 2", dateShort: "AUG '26", time: "10:00 AM – 1:00 PM",
    location: "Computer Lab, RV University",
    desc: "Hands-on with AWS Kiro — the AI-powered IDE. Build a full project in 3 hours.",
    tags: ["Kiro", "AI", "Dev Tools"], spotsLeft: 42 },
  { id: "networking", title: "Networking & Career Guidance", type: "Meetup",
    date: "September 2026 · Week 2", dateShort: "SEP '26", time: "3:00 – 5:00 PM",
    location: "Auditorium, RV University",
    desc: "Connect with AWS professionals and alumni. Learn how cloud skills translate into real careers.",
    tags: ["Career", "Networking"] },
  { id: "fundamentals", title: "AWS Cloud Fundamentals", type: "Workshop",
    date: "September 2026 · Week 4", dateShort: "SEP '26", time: "10:00 AM – 2:00 PM",
    location: "Lab Block, RV University",
    desc: "Zero-to-cloud: EC2, S3, IAM, VPC — hands on. Prep for AWS Cloud Practitioner.",
    tags: ["EC2", "S3", "IAM", "Certification"] },
  { id: "advanced", title: "Advanced AWS Services Deep Dive", type: "Workshop",
    date: "January 2027 · Week 1", dateShort: "JAN '27", time: "10:00 AM – 4:00 PM",
    location: "RV University",
    desc: "Lambda, DynamoDB, API Gateway, Bedrock. Build a serverless + AI app in a day.",
    tags: ["Lambda", "DynamoDB", "Bedrock", "Serverless"] },
  { id: "community-day", title: "AWS Student Community Day", type: "Flagship",
    date: "January 2027 · Last Week", dateShort: "JAN '27", time: "9:00 AM – 6:00 PM",
    location: "RV University", featured: true,
    desc: "Our flagship annual event. Student speakers, project demos, AWS cert drives, and the biggest builder network in the city.",
    tags: ["Community Day", "Flagship", "Talks", "Demos"] },
  { id: "hackathon", title: "Build Sprint Hackathon", type: "Hackathon",
    date: "February 2027 · Mid", dateShort: "FEB '27", time: "9:00 AM – 9:00 PM",
    location: "RV University",
    desc: "12-hour build sprint. Real problems, real AWS credits, real prizes. Ship or go home.",
    tags: ["Hackathon", "AWS Credits", "Prizes"] },
];

function Card({ ev, i }: { ev: Ev; i: number }) {
  const t = TYPE[ev.type];
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
      style={{
        background: ev.featured ? "rgba(255,153,0,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${ev.featured ? "rgba(255,153,0,0.25)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 22,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        cursor: "default",
        boxShadow: ev.featured ? "0 0 60px rgba(255,153,0,0.05)" : "none",
      }}
      id={`event-${ev.id}`}
    >
      {/* Accent bar */}
      <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${t.text}, transparent)` }} />

      <div style={{ padding: "32px 32px 28px", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        {/* Top */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <span
            className="pill"
            style={{ background: t.bg, color: t.text, borderColor: t.border }}
          >
            {ev.type}
          </span>
          <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)" }}>
            {ev.dateShort}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: ev.featured ? 22 : 18,
            fontWeight: 700, color: "#fff",
            lineHeight: 1.25, flex: 1,
          }}
        >
          {ev.title}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>{ev.desc}</p>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            [<Calendar key="c" size={12} />, `${ev.date} · ${ev.time}`],
            [<MapPin key="m" size={12} />, ev.location],
            ...(ev.spotsLeft ? [[<Users key="u" size={12} />, `${ev.spotsLeft} spots left`]] : []),
          ].map(([icon, text], j) => (
            <div
              key={j}
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: j === 2 ? "#FF9900" : "rgba(255,255,255,0.3)" }}
            >
              {icon as React.ReactNode}
              <span>{text as string}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ev.tags.map((tag) => (
            <span
              key={tag}
              className="mono"
              style={{
                fontSize: 10, padding: "3px 8px", borderRadius: 6,
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#"
          whileHover={{ x: 4 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: t.text, textDecoration: "none" }}
          id={`event-register-${ev.id}`}
        >
          Register now <ArrowRight size={13} />
        </motion.a>
      </div>
    </motion.article>
  );
}

export default function Events() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="events" style={S}>
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent, rgba(255,153,0,0.02) 50%, transparent)",
        }}
      />

      <div style={W}>
        {/* Header */}
        <div ref={ref} style={{ marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            style={{ marginBottom: 24 }}
          >
            <span className="section-label">Events &amp; Workshops</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20,
            }}
          >
            Ship real things,{" "}
            <span
              style={{
                background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              together.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.65 }}
          >
            7 events lined up for 2026–27. Workshops, hackathons, community days — pick your battles.
          </motion.p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {EVENTS.map((ev, i) => <Card key={ev.id} ev={ev} i={i} />)}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 48, fontSize: 14 }}
          className="mono"
        >
          <span style={{ color: "rgba(255,255,255,0.25)" }}>More events throughout the year. → </span>
          <a href="#join" style={{ color: "#FF9900", textDecoration: "none" }}>Stay plugged in</a>
        </motion.p>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const S = { padding: "clamp(100px, 14vh, 180px) 0", position: "relative" as const };

type PType = "Build Log" | "Recap" | "Tutorial" | "Career";
const PT_COLOR: Record<PType, { bg: string; text: string; border: string }> = {
  "Build Log": { bg: "rgba(56,189,248,0.08)",  text: "#38BDF8", border: "rgba(56,189,248,0.25)" },
  "Recap":     { bg: "rgba(255,153,0,0.08)",   text: "#FF9900", border: "rgba(255,153,0,0.25)" },
  "Tutorial":  { bg: "rgba(129,140,248,0.08)", text: "#818CF8", border: "rgba(129,140,248,0.25)" },
  "Career":    { bg: "rgba(34,197,94,0.08)",   text: "#22C55E", border: "rgba(34,197,94,0.25)" },
};

interface Post {
  id: string; title: string; excerpt: string;
  author: string; date: string; readTime: string;
  tags: string[]; type: PType; accent: string; featured?: boolean;
}

const POSTS: Post[] = [
  { id: "bl1", featured: true, type: "Build Log", accent: "#38BDF8",
    title: "How We Built an AI Study Assistant with AWS Bedrock in a Weekend",
    excerpt: "A behind-the-scenes look at building a RAG-powered chatbot for RV University students using Claude 3 on AWS Bedrock. What worked, what didn't, and what we'd do differently.",
    author: "Priya Sharma", date: "July 2026", readTime: "8 min",
    tags: ["Bedrock", "RAG", "Claude", "Lambda"] },
  { id: "bl2", type: "Career", accent: "#22C55E",
    title: "AWS Cloud Practitioner — What Actually Matters as a Student",
    excerpt: "Skip the 400-page study guide. Here's what showed up in the CCP exam and how we studied in 3 weeks while managing coursework.",
    author: "Dev Krishnan", date: "June 2026", readTime: "6 min",
    tags: ["Certification", "CCP", "Study Guide"] },
  { id: "bl3", type: "Recap", accent: "#FF9900",
    title: "Build Sprint Hackathon Recap: 12 Hours, 8 Teams, 1 Winner",
    excerpt: "What happened when 80 students were locked in a room with AWS credits and a problem statement. Full recap with winning team breakdown.",
    author: "Rohan Mehta", date: "March 2026", readTime: "5 min",
    tags: ["Hackathon", "Community", "Projects"] },
  { id: "bl4", type: "Tutorial", accent: "#818CF8",
    title: "Serverless on AWS: A Beginner's Actually-Working Tutorial",
    excerpt: "Stop reading outdated Lambda tutorials. This guide walks through building a real serverless REST API with proper error handling and IAM roles.",
    author: "Santhosh K", date: "May 2026", readTime: "12 min",
    tags: ["Lambda", "API Gateway", "Serverless"] },
];

function PostCard({ post, i }: { post: Post; i: number }) {
  const ts = PT_COLOR[post.type];
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 22, overflow: "hidden",
        display: "flex", flexDirection: "column",
        gridColumn: post.featured ? "span 2" : "span 1",
        cursor: "default",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${post.accent}30`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px rgba(0,0,0,0.5)`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
      id={`blog-${post.id}`}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${post.accent}, transparent)` }} />

      <div
        style={{
          padding: "36px",
          display: "flex",
          flexDirection: post.featured ? "row" : "column",
          gap: post.featured ? 48 : 20,
          flex: 1,
          alignItems: post.featured ? "flex-start" : "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
            <span className="pill" style={{ background: ts.bg, color: ts.text, borderColor: ts.border }}>
              {post.type}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              <Clock size={11} /><span className="mono">{post.readTime} read</span>
            </div>
            <span className="mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{post.date}</span>
          </div>

          <h3
            style={{
              fontSize: post.featured ? 22 : 18,
              fontWeight: 700, color: "#fff", lineHeight: 1.3,
              flex: 1,
            }}
          >
            {post.title}
          </h3>

          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
            {post.excerpt}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {post.tags.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  fontSize: 10, padding: "3px 8px", borderRadius: 6,
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.3)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: post.featured ? "column" : "row",
            justifyContent: post.featured ? "flex-end" : "space-between",
            alignItems: post.featured ? "flex-end" : "center",
            gap: 12,
            minWidth: post.featured ? 120 : undefined,
          }}
        >
          <span className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>by {post.author}</span>
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 600, color: ts.text,
              textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Read more <ArrowRight size={13} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" style={S}>
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, transparent, rgba(129,140,248,0.015) 50%, transparent)",
        }}
      />
      <div style={W}>
        <div ref={ref} style={{ marginBottom: 72 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 24 }}>
            <span className="section-label" style={{ color: "#818CF8" }}>Build Logs</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800,
              lineHeight: 1, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20,
            }}
          >
            Written by{" "}
            <span
              style={{
                background: "linear-gradient(125deg,#38BDF8,#818CF8)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              builders,
            </span>
            <br />for builders.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.65 }}
          >
            Event recaps, build logs, tutorials, and career insights — written by our community.
          </motion.p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          <style>{`@media(max-width:640px){#blog-grid{grid-template-columns:1fr!important}#blog-grid article{grid-column:span 1!important}}`}</style>
          <div id="blog-grid" style={{ display: "contents" }}>
            {POSTS.map((p, i) => <PostCard key={p.id} post={p} i={i} />)}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 48 }}
        >
          <a href="#" className="btn-ghost">View all posts <ArrowRight size={16} /></a>
        </motion.div>
      </div>
    </section>
  );
}

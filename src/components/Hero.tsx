"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";

/* ── shared layout constants ───────────────────────────────────────────────── */
export const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;

/* ── interactive terminal ─────────────────────────────────────────────────── */
interface TerminalLine {
  t: string;
  c?: string;
  isAction?: boolean;
  targetId?: string;
  isCommand?: boolean;
}

const INITIAL_BOOT_LINES: { t: string; c: string; d: number; isCommand?: boolean }[] = [
  { t: "whoami",                           c: "",                       d: 150,  isCommand: true },
  { t: "→ builder @ RV University",        c: "#FF9900",                d: 650 },
  { t: "",                                 c: "",                       d: 850 },
  { t: "./run --community aws-sbg",        c: "",                       d: 1050, isCommand: true },
  { t: "Initializing AWS cloud stack...",  c: "rgba(255,255,255,0.28)", d: 1350 },
  { t: "██████████████████  100%",         c: "#FF9900",                d: 1900 },
  { t: "",                                 c: "",                       d: 2100 },
  { t: "✓ builders shipping    200+",      c: "#22C55E",                d: 2300 },
  { t: "✓ cloud projects live  15+",       c: "#22C55E",                d: 2550 },
  { t: "✓ certifications       40+",       c: "#22C55E",                d: 2800 },
  { t: "",                                 c: "",                       d: 3000 },
  { t: "Ready. Type 'ls' or 'help' below.", c: "#38BDF8",               d: 3250 },
];

const SECTIONS = [
  { name: "hero",       id: "hero",          desc: "top of page & live terminal" },
  { name: "manifesto",  id: "manifesto",     desc: "builder mission & principles" },
  { name: "projects",   id: "projects",      desc: "student cloud builds (15+)" },
  { name: "events",     id: "events",        desc: "workshops, bootcamps & hackathons (8)" },
  { name: "team",       id: "team",          desc: "student leads & core members" },
  { name: "blog",       id: "blog",          desc: "technical writeups & deep-dives" },
  { name: "join",       id: "footer-social", desc: "membership & community links" },
];

const STAT_PROOFS: Record<string, { cmd: string; lines: TerminalLine[] }> = {
  members: {
    cmd: "members",
    lines: [
      { t: "200+ builders", c: "#FF9900" },
      { t: "RV University · Bangalore, IN", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "COMMUNITY STATUS: ACTIVE ✓", c: "#22C55E" },
      { t: "DISCORD & MEETUP: SYNCHRONIZED", c: "rgba(255,255,255,0.4)" },
    ],
  },
  projects: {
    cmd: "projects",
    lines: [
      { t: "15+ projects shipped", c: "#FF9900" },
      { t: "AWS infrastructure deployed", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "PIPELINE: PROD VERIFIED ✓", c: "#22C55E" },
      { t: "STACK: LAMBDA · CDK · S3 · DYNAMODB", c: "rgba(255,255,255,0.4)" },
    ],
  },
  certs: {
    cmd: "certs",
    lines: [
      { t: "40+ certifications earned", c: "#FF9900" },
      { t: "Cloud Practitioner & Solutions Architect", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "EXAM PASS RATE: 94% ✓", c: "#22C55E" },
      { t: "SKILL ACCREDITATION: VERIFIED", c: "rgba(255,255,255,0.4)" },
    ],
  },
  events: {
    cmd: "events",
    lines: [
      { t: "8 community events hosted", c: "#FF9900" },
      { t: "Hands-on bootcamps & AWS build nights", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "ATTENDANCE RATE: 98% ✓", c: "#22C55E" },
      { t: "NEXT SESSION: UPCOMING", c: "#38BDF8" },
    ],
  },
};

function Terminal() {
  const [bootCount, setBootCount] = useState<number>(0);
  const [customLines, setCustomLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Initial boot animation
  useEffect(() => {
    const timers = INITIAL_BOOT_LINES.map((_, i) =>
      setTimeout(() => setBootCount((prev) => Math.max(prev, i + 1)), INITIAL_BOOT_LINES[i].d + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bootCount, customLines]);

  const handleNavigate = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) {
      setCustomLines((prev) => [...prev, { t: "", isCommand: true }]);
      return;
    }

    setHistory((prev) => [...prev, cmd]);
    setHistIndex(-1);

    const parts = cmd.split(" ").filter(Boolean);
    const mainCmd = parts[0]?.toLowerCase() || "";
    const arg = parts.slice(1).join(" ").toLowerCase();

    const output: TerminalLine[] = [
      { t: cmd, isCommand: true },
    ];

    switch (mainCmd) {
      case "members":
      case "projects":
      case "certs":
      case "events": {
        const proof = STAT_PROOFS[mainCmd];
        if (proof) {
          proof.lines.forEach((l) => output.push(l));
        }
        break;
      }

      case "ls":
      case "dir":
        output.push({ t: "total 7 sections", c: "rgba(255,255,255,0.3)" });
        SECTIONS.forEach((s) => {
          output.push({
            t: `  📁 ${s.name.padEnd(12)} → ${s.desc}`,
            c: "#38BDF8",
            isAction: true,
            targetId: s.id,
          });
        });
        output.push({ t: "tip: click a section or type 'cd <section>'", c: "#FF9900" });
        break;

      case "cd":
        if (!arg || arg === "~" || arg === "/") {
          handleNavigate("hero");
          output.push({ t: "→ Returned to root (#hero)", c: "#22C55E" });
        } else {
          const cleanArg = arg.replace(/^#/, "");
          const found = SECTIONS.find(
            (s) => s.name === cleanArg || s.id === cleanArg || s.name.startsWith(cleanArg)
          );
          if (found) {
            handleNavigate(found.id);
            output.push({ t: `→ Switched context to #${found.name}`, c: "#22C55E" });
          } else {
            output.push({
              t: `cd: no such section '${arg}'. Type 'ls' to view all sections.`,
              c: "#EF4444",
            });
          }
        }
        break;

      case "whoami":
        output.push({ t: "→ builder @ RV University", c: "#FF9900" });
        output.push({ t: "→ affiliation: AWS Student Builder Group", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "→ status: building real cloud projects", c: "#22C55E" });
        break;

      case "help":
        output.push({ t: "AWS-SBG Interactive Shell v1.0", c: "#FF9900" });
        output.push({ t: "  ls            list all website sections", c: "#38BDF8" });
        output.push({ t: "  cd <section>  jump directly to any section", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "  members       inspect active builder community proof", c: "#FF9900" });
        output.push({ t: "  projects      inspect shipped cloud architectures", c: "#FF9900" });
        output.push({ t: "  certs         inspect AWS credentials & pass rates", c: "#FF9900" });
        output.push({ t: "  events        inspect workshops and bootcamps", c: "#FF9900" });
        output.push({ t: "  cat <section> read section description", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "  whoami        display builder credentials", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "  join          jump to community links", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "  clear         clear terminal screen", c: "rgba(255,255,255,0.7)" });
        output.push({ t: "  sudo          request root access", c: "rgba(255,255,255,0.7)" });
        break;

      case "cat":
        if (!arg) {
          output.push({ t: "usage: cat <section> (e.g. cat manifesto, cat projects)", c: "rgba(255,255,255,0.4)" });
        } else if (arg.includes("manifesto")) {
          output.push({ t: "“A builder-first community at RV University. No theory theatrics.”", c: "#FF9900" });
        } else if (arg.includes("project")) {
          output.push({ t: "15+ active cloud projects: Serverless APIs, CDK infra, AI agents.", c: "#22C55E" });
        } else if (arg.includes("event")) {
          output.push({ t: "8 past & upcoming events: AWS build bootcamps, hands-on cloud labs.", c: "#38BDF8" });
        } else if (arg.includes("team")) {
          output.push({ t: "Student leads & organizers championing AWS at RV University.", c: "rgba(255,255,255,0.7)" });
        } else if (arg.includes("blog")) {
          output.push({ t: "Deep dives on AWS Lambda, DynamoDB patterns, and builder stories.", c: "rgba(255,255,255,0.7)" });
        } else if (arg.includes("join")) {
          output.push({ t: "Connect on Discord & WhatsApp. Open to all students at RVU.", c: "#FF9900" });
        } else {
          output.push({ t: `cat: ${arg}: No such section file. Try 'cat manifesto' or 'ls'`, c: "#EF4444" });
        }
        break;

      case "join":
        handleNavigate("footer-social");
        output.push({ t: "→ Opening builder registration...", c: "#22C55E" });
        break;

      case "sudo":
        output.push({ t: "🛡️ Access granted: You are already root. Builders ship with full privileges.", c: "#22C55E" });
        break;

      case "clear":
      case "cls":
        setBootCount(0);
        setCustomLines([]);
        return;

      case "matrix":
        output.push({ t: "Wake up, Neo... The AWS Cloud has you.", c: "#22C55E" });
        break;

      default:
        output.push({
          t: `command not found: ${mainCmd}. Type 'ls' or 'help'.`,
          c: "#EF4444",
        });
        break;
    }

    setCustomLines((prev) => [...prev, ...output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
        setHistIndex(nextIdx);
        setInputVal(history[nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0 && histIndex !== -1) {
        const nextIdx = histIndex + 1;
        if (nextIdx >= history.length) {
          setHistIndex(-1);
          setInputVal("");
        } else {
          setHistIndex(nextIdx);
          setInputVal(history[nextIdx] || "");
        }
      }
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", perspective: 1200 }}>
      {/* Subtle ambient orange reflection behind terminal */}
      <div
        style={{
          position: "absolute",
          inset: "-20px -24px -18px -24px",
          background: "radial-gradient(ellipse at 50% 30%, rgba(255,153,0,0.12) 0%, rgba(255,153,0,0.03) 50%, transparent 72%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: 30,
          transform: "rotateY(-2deg) rotateX(1.5deg)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96, rotateY: -1, rotateX: 1, rotateZ: -0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateY: -2, rotateX: 1.5, rotateZ: -0.6 }}
        whileHover={{ rotateY: -0.6, rotateX: 0.5, rotateZ: 0, y: -4, transition: { duration: 0.35 } }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => inputRef.current?.focus()}
        style={{
          position: "relative",
          zIndex: 1,
          transformStyle: "preserve-3d",
          background: "rgba(8, 8, 18, 0.68)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: 20,
          boxShadow: "0 30px 65px -12px rgba(0,0,0,0.78), 0 0 40px -8px rgba(255,153,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.04)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          overflow: "hidden",
          cursor: "text",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "13px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
            userSelect: "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57", opacity: 0.85 }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E", opacity: 0.85 }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840", opacity: 0.85 }} />
            <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.02em" }}>
              aws-sbg — terminal
            </span>
          </div>
          <span className="mono" style={{ fontSize: 10, color: "rgba(255,153,0,0.6)", background: "rgba(255,153,0,0.08)", padding: "2px 8px", borderRadius: 4 }}>
            typable
          </span>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          className="mono"
          style={{
            padding: "20px 22px 20px",
            fontSize: 13,
            lineHeight: 1.75,
            minHeight: 255,
            maxHeight: 330,
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,153,0,0.25) transparent",
          }}
        >
          {/* Initial boot lines */}
          {INITIAL_BOOT_LINES.slice(0, bootCount).map((line, i) => (
            line.isCommand ? (
              <div key={`boot-${i}`} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: i === 0 ? 0 : 4 }}>
                <span style={{ color: "#FF9900", fontWeight: 600, flexShrink: 0 }}>$</span>
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{line.t}</span>
              </div>
            ) : (
              <div
                key={`boot-${i}`}
                style={{
                  color: line.c || "transparent",
                  height: line.t === "" ? 6 : "auto",
                  fontSize: 13,
                }}
              >
                {line.t}
              </div>
            )
          ))}

          {/* Interactive custom command output */}
          {customLines.map((line, i) => (
            line.isCommand ? (
              <div key={`custom-${i}`} style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <span style={{ color: "#FF9900", fontWeight: 600, flexShrink: 0 }}>$</span>
                <span style={{ color: "#fff", fontWeight: 500 }}>{line.t}</span>
              </div>
            ) : (
              <div
                key={`custom-${i}`}
                onClick={line.isAction && line.targetId ? () => handleNavigate(line.targetId!) : undefined}
                style={{
                  color: line.c || "transparent",
                  height: line.t === "" ? 6 : "auto",
                  fontSize: 13,
                  cursor: line.isAction ? "pointer" : "text",
                  textDecoration: line.isAction ? "underline" : "none",
                  textUnderlineOffset: 3,
                  opacity: line.isAction ? 0.9 : 1,
                  transition: "color 0.15s, opacity 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (line.isAction) e.currentTarget.style.color = "#FF9900";
                }}
                onMouseLeave={(e) => {
                  if (line.isAction) e.currentTarget.style.color = line.c || "#38BDF8";
                }}
              >
                {line.t}
              </div>
            )
          ))}

          {/* Active typable prompt */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ color: "#FF9900", fontWeight: 600, flexShrink: 0 }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="mono"
              placeholder={bootCount >= INITIAL_BOOT_LINES.length && customLines.length === 0 ? "type 'ls' or 'help'..." : ""}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: 13,
                fontFamily: "inherit",
                padding: 0,
                caretColor: "#FF9900",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}


/* ── data trace connector ────────────────────────────────────────────────────── */
function DataTrace({ headlineRef, terminalRef }: {
  headlineRef: React.RefObject<HTMLDivElement | null>;
  terminalRef: React.RefObject<HTMLDivElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  // Measure & draw the path between headline right-edge and terminal top-left
  const measure = useCallback(() => {
    const hl = headlineRef.current;
    const tm = terminalRef.current;
    const parent = hl?.closest(".hero-grid-top") as HTMLElement | null;
    if (!hl || !tm || !parent) return;

    const pr = parent.getBoundingClientRect();
    const hr = hl.getBoundingClientRect();
    const tr = tm.getBoundingClientRect();

    // Start: right edge of headline, vertically centered
    const x1 = hr.right - pr.left + 12;
    const y1 = hr.top - pr.top + hr.height * 0.5;
    // End: left edge of terminal, ~28px down from top (into the body)
    const x2 = tr.left - pr.left - 4;
    const y2 = tr.top - pr.top + 48;

    // Midpoint for the elbow
    const mx = x2 - 16;

    const w = Math.max(x2 + 20, 100);
    const h = Math.max(y2 + 20, 100);

    setSvgSize({ w, h });
    // Horizontal from headline → elbow, then curve down → terminal
    setPathD(`M ${x1},${y1} L ${mx},${y1} Q ${x2},${y1} ${x2},${y1 + 16} L ${x2},${y2}`);
  }, [headlineRef, terminalRef]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // GSAP draw-on animation after path is set
  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !pathD) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.2,
      delay: 0.9,
      ease: "power2.inOut",
    });

    // Pulse the dot at the endpoint
    if (dot) {
      // Parse endpoint from pathD: last segment is "L x2,y2"
      const segments = pathD.trim().split(" ");
      const lastCoord = segments[segments.length - 1];
      const [ex, ey] = lastCoord.split(",").map(Number);
      gsap.set(dot, { attr: { cx: ex, cy: ey }, opacity: 0 });
      gsap.to(dot, {
        opacity: 0.7,
        duration: 0.5,
        delay: 2.1,
        ease: "power2.out",
      });
      gsap.to(dot, {
        attr: { r: 4 },
        opacity: 0.3,
        duration: 1.4,
        delay: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [pathD]);

  if (!pathD || svgSize.w === 0) return null;

  return (
    <svg
      ref={svgRef}
      width={svgSize.w}
      height={svgSize.h}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 5,
        overflow: "visible",
      }}
    >
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="rgba(255,153,0,0.15)"
        strokeWidth={1}
        strokeLinecap="round"
      />
      {/* Small flowing dot */}
      <circle
        ref={dotRef}
        r={2.5}
        fill="#FF9900"
        opacity={0}
        style={{ filter: "drop-shadow(0 0 4px rgba(255,153,0,0.6))" }}
      />
      {/* Small arrow at endpoint */}
      <polygon
        points={`${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[0]) - 3},${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[1]) + 1} ${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[0]) + 3},${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[1]) + 1} ${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[0])},${parseFloat(pathD.split(" ").slice(-1)[0].split(",")[1]) + 6}`}
        fill="rgba(255,153,0,0.2)"
        style={{ opacity: 0, animation: "fadeInTrace 0.4s ease-out 2.1s forwards" }}
      />
    </svg>
  );
}


/* ── hero ────────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 700], [0, -80]);
  const smooth = useSpring(yParallax, { stiffness: 60, damping: 18 });
  const headlineRef = useRef<HTMLDivElement>(null);
  const terminalColRef = useRef<HTMLDivElement>(null);

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
            filter: "blur(40px)",
            transformOrigin: "center",
          }}
        />
        <div
          className="aurora-2"
          style={{
            position: "absolute", width: 800, height: 800,
            top: "20%", right: "-15%",
            background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 65%)",
            filter: "blur(40px)",
            transformOrigin: "center",
          }}
        />
        <div
          className="aurora-3"
          style={{
            position: "absolute", width: 600, height: 600,
            bottom: "-10%", left: "35%",
            background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)",
            filter: "blur(30px)",
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
          {/* Layout styles for top-right terminal placement */}
          <style>{`
            .hero-layout-wrap {
              display: flex;
              flex-direction: column;
              justify-content: center;
              min-height: 74vh;
              padding-top: 24px;
              padding-bottom: 40px;
              gap: 36px;
            }
            .hero-grid-top {
              display: grid;
              grid-template-columns: 1fr;
              gap: 36px;
              align-items: start;
              position: relative;
            }
            .hero-terminal-col {
              width: 100%;
              max-width: 490px;
              align-self: start;
            }
            @media (min-width: 900px) {
              .hero-grid-top {
                grid-template-columns: minmax(0, 1.15fr) minmax(380px, 490px);
                gap: 52px;
                align-items: start;
              }
              .hero-terminal-col {
                margin-top: 14px;
              }
            }
            @media (max-width: 899px) {
              .hero-data-trace { display: none !important; }
            }
            @keyframes fadeInTrace {
              from { opacity: 0; } to { opacity: 1; }
            }
          `}</style>

          <div className="hero-layout-wrap">
            {/* Top row: Header content on the left, Terminal on the top right */}
            <div className="hero-grid-top">

              {/* LEFT COLUMN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

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
                <div ref={headlineRef} style={{ display: "flex", alignItems: "center" }}>
                  <h1
                    style={{
                      fontWeight: 800,
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      fontSize: "clamp(34px, 4.4vw, 64px)",
                      color: "#fff",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Build With AWS<span style={{ color: "#FF9900" }}>.</span>
                    <span className="blink" style={{ color: "#FF9900", marginLeft: 2, fontWeight: 400 }}>|</span>
                  </h1>
                </div>

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7 }}
                  style={{
                    fontSize: 18, lineHeight: 1.7, maxWidth: 500,
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
                  <a href="#footer-social" className="btn-orange" id="hero-join">
                    Join the builders <ArrowRight size={17} />
                  </a>
                  <a href="#projects" className="btn-ghost" id="hero-projects">
                    See what we've built
                  </a>
                </motion.div>
              </div>

              {/* RIGHT COLUMN — Terminal positioned at the top right next to header text */}
              <div className="hero-terminal-col" id="hero-terminal-col" ref={terminalColRef}>
                <Terminal />
              </div>

              {/* Data trace: headline → terminal */}
              <div className="hero-data-trace" style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
                <DataTrace headlineRef={headlineRef} terminalRef={terminalColRef} />
              </div>

            </div>

            {/* Stat strip spanning cleanly across bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
              style={{
                display: "flex", gap: "clamp(16px, 3.5vw, 40px)", paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {[
                { val: "200+", label: "Members" },
                { val: "15+", label: "Projects" },
                { val: "40+", label: "Certs" },
                { val: "8", label: "Events" },
              ].map(({ val, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 + i * 0.08 }}
                  style={{
                    minWidth: 95,
                    padding: "6px 12px",
                    borderRadius: 12,
                  }}
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
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                      marginTop: 5,
                    }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

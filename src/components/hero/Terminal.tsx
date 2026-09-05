"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { lenisScrollTo } from "@/lib/lenis";
import { INITIAL_BOOT_LINES, SECTIONS, STAT_PROOFS } from "./constants";
import { TerminalLine } from "./types";

export default function Terminal() {
  const [bootCount, setBootCount] = useState<number>(0);
  const [customLines, setCustomLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const terminalCardRef = useRef<HTMLDivElement>(null);

  // Initial boot animation
  useEffect(() => {
    const timers = INITIAL_BOOT_LINES.map((_, i) =>
      setTimeout(() => setBootCount((prev) => Math.max(prev, i + 1)), INITIAL_BOOT_LINES[i].d + 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const card = terminalCardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 32, scale: 0.96, rotateY: -1, rotateX: 1, rotateZ: -0.3 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: -2,
          rotateX: 1.5,
          rotateZ: -0.6,
          duration: 0.9,
          delay: 0.4,
          ease: "power3.out",
        }
      );
    }, terminalCardRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bootCount, customLines]);

  const handleNavigate = (targetId: string) => {
    lenisScrollTo(targetId, { offset: -30, duration: 1.2 });
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!terminalCardRef.current) return;
    const rect = terminalCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(terminalCardRef.current, {
      rotateY: -2 + x * 4,
      rotateX: 1.5 - y * 3,
      rotateZ: -0.6 + x * 0.5,
      y: -4,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (!terminalCardRef.current) return;
    gsap.to(terminalCardRef.current, {
      rotateY: -2,
      rotateX: 1.5,
      rotateZ: -0.6,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div style={{ position: "relative", width: "100%", perspective: 1200 }}>
      { }
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

      <div
        ref={terminalCardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => inputRef.current?.focus()}
        style={{
          position: "relative",
          zIndex: 1,
          transformStyle: "preserve-3d",
          opacity: 0,
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

        { }
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

          {/* Interactive cmd */}
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

          {/*typable prompt */}
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
      </div>
    </div>
  );
}

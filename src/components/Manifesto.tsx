"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const W = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "0 clamp(24px, 5vw, 60px)",
} as const;

const S = {
  padding: "clamp(110px, 15vh, 190px) 0",
  position: "relative" as const,
};

const EASE = [0.16, 1, 0.3, 1] as const;

const PRINCIPLES = [
  {
    number: "01",
    marker: "BUILD",
    symbol: "</>",
    eyebrow: "Learn by shipping",
    dim: "Most clubs teach cloud.",
    bright: "We build with it.",
    background: "linear-gradient(135deg, #ffb224 0%, #ff7a00 100%)",
    ink: "#1c0d00",
    muted: "rgba(28,13,0,0.62)",
    border: "rgba(255,239,210,0.4)",
  },
  {
    number: "02",
    marker: "DEPLOY",
    symbol: "↑",
    eyebrow: "Stay until it works",
    dim: "We stay after the workshop",
    bright: "to actually deploy the thing.",
    background: "linear-gradient(135deg, #8b5cf6 0%, #5b45d6 100%)",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.68)",
    border: "rgba(255,255,255,0.24)",
  },
  {
    number: "03",
    marker: "DEBUG",
    symbol: "!",
    eyebrow: "Break. Debug. Repeat.",
    dim: "We break prod on a Friday",
    bright: "and fix it by Saturday.",
    background: "linear-gradient(135deg, #ff695d 0%, #e74759 100%)",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.7)",
    border: "rgba(255,255,255,0.24)",
  },
  {
    number: "04",
    marker: "SHARE",
    symbol: "↗",
    eyebrow: "Build in public",
    dim: "We share the messy middle,",
    bright: "not just the final demo.",
    background: "linear-gradient(135deg, #168f95 0%, #0e6578 100%)",
    ink: "#ffffff",
    muted: "rgba(255,255,255,0.7)",
    border: "rgba(255,255,255,0.22)",
  },
] as const;

export default function Manifesto() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: shouldReduceMotion ? 0 : 0.75,
      delay: shouldReduceMotion ? 0 : delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-title"
      style={{ ...S, zIndex: 20, overflow: "clip" }}
    >
      <style>{`
        .manifesto-stack {
          position: relative;
          margin-top: clamp(68px, 9vw, 110px);
          padding-bottom: clamp(110px, 20vh, 200px);
        }
        .manifesto-card {
          position: sticky;
          width: 100%;
          height: clamp(250px, 30vw, 330px);
          margin-bottom: clamp(90px, 17vh, 170px);
          display: grid;
          grid-template-columns: minmax(160px, 0.72fr) minmax(0, 2fr);
          overflow: hidden;
          border: 1px solid;
          border-radius: 26px;
          isolation: isolate;
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .manifesto-card:last-child { margin-bottom: 0; }
        .manifesto-card::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: linear-gradient(115deg, rgba(255,255,255,0.14), transparent 34%, transparent 74%, rgba(0,0,0,0.1));
        }
        .manifesto-card-index {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(26px, 4vw, 48px);
          border-right: 1px solid currentColor;
        }
        .manifesto-card-number {
          font-size: clamp(64px, 9vw, 116px);
          font-weight: 800;
          line-height: 0.8;
          letter-spacing: -0.09em;
        }
        .manifesto-card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
          padding: clamp(26px, 4vw, 48px);
        }
        .manifesto-card-topline {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }
        .manifesto-card-symbol {
          width: 46px;
          height: 46px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border: 1px solid currentColor;
          border-radius: 50%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
        }
        .manifesto-card-copy {
          max-width: 760px;
          font-size: clamp(25px, 3.7vw, 48px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }
        .manifesto-card-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          right: -80px;
          bottom: -140px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
          filter: blur(4px);
          pointer-events: none;
          z-index: -1;
        }
        .manifesto-scroll-note {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 34px;
          color: rgba(255,255,255,0.3);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.17em;
          text-transform: uppercase;
        }
        .manifesto-scroll-note::before {
          content: '';
          width: 28px;
          height: 1px;
          background: rgba(255,153,0,0.65);
        }
        .manifesto-cta:focus-visible {
          outline: 2px solid #ff9900;
          outline-offset: 6px;
          border-radius: 4px;
        }
        @media (max-width: 720px) {
          .manifesto-stack {
            margin-top: 60px;
            padding-bottom: 120px;
          }
          .manifesto-card {
            height: clamp(330px, 100vw, 410px);
            margin-bottom: 90px;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            border-radius: 22px;
          }
          .manifesto-card-index {
            min-height: 112px;
            flex-direction: row;
            align-items: flex-start;
            padding: 24px;
            border-right: 0;
            border-bottom: 1px solid currentColor;
          }
          .manifesto-card-number { font-size: clamp(56px, 18vw, 78px); }
          .manifesto-card-content { padding: 24px; }
          .manifesto-card-symbol { width: 40px; height: 40px; }
          .manifesto-card-copy { font-size: clamp(24px, 7.5vw, 34px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .manifesto-stack { padding-bottom: 0; }
          .manifesto-card {
            position: relative !important;
            top: auto !important;
            margin-bottom: 18px;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 12% 20%, rgba(255,153,0,0.07), transparent 27%), radial-gradient(circle at 88% 78%, rgba(56,189,248,0.035), transparent 24%)",
        }}
      />
      <div
        aria-hidden="true"
        className="grid-dots"
        style={{ position: "absolute", inset: 0, opacity: 0.14, pointerEvents: "none" }}
      />

      {/* GSAP owns this parent during the Hero handoff; Framer Motion only animates its children. */}
      <div
        id="manifesto-content"
        ref={contentRef}
        style={{ ...W, position: "relative", willChange: "transform, opacity" }}
      >
        <header style={{ maxWidth: 920 }}>
          <motion.div {...reveal()} style={{ marginBottom: 26 }}>
            <span className="section-label">Our Manifesto</span>
          </motion.div>
          <motion.h2
            id="manifesto-title"
            {...reveal(0.08)}
            style={{
              fontSize: "clamp(42px, 7vw, 82px)",
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: "-0.055em",
              textWrap: "balance",
            }}
          >
            Cloud is learned by <span className="text-grad-orange">building.</span>
          </motion.h2>
          <motion.p
            {...reveal(0.16)}
            style={{
              maxWidth: 650,
              marginTop: 28,
              color: "rgba(255,255,255,0.52)",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.65,
            }}
          >
            We are not here to collect badges or watch from the sidelines. We learn together,
            ship real systems, and get comfortable with the parts that do not work yet.
          </motion.p>
          <motion.span {...reveal(0.22)} className="mono manifesto-scroll-note">
            Scroll to stack the principles
          </motion.span>
        </header>

        <div className="manifesto-stack">
          {PRINCIPLES.map((principle, index) => (
            <motion.article
              key={principle.number}
              className="manifesto-card"
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 80, scale: 0.96, rotate: index % 2 === 0 ? -0.6 : 0.6 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                delay: shouldReduceMotion ? 0 : index === 0 ? 0.08 : 0,
                ease: EASE,
              }}
              style={{
                top: `calc(clamp(92px, 12vh, 128px) + ${index * 18}px)`,
                zIndex: index + 1,
                color: principle.ink,
                background: principle.background,
                borderColor: principle.border,
                transformOrigin: "center bottom",
              }}
            >
              <div
                className="manifesto-card-index"
                style={{ borderColor: principle.border }}
              >
                <span className="manifesto-card-number">{principle.number}</span>
                <span
                  className="mono"
                  style={{
                    color: principle.muted,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                  }}
                >
                  PRINCIPLE
                </span>
              </div>

              <div className="manifesto-card-content">
                <div className="manifesto-card-topline">
                  <div>
                    <span
                      className="mono"
                      style={{
                        display: "block",
                        color: principle.muted,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        marginBottom: 8,
                      }}
                    >
                      {principle.marker}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(16px, 2vw, 22px)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {principle.eyebrow}
                    </h3>
                  </div>
                  <span
                    className="manifesto-card-symbol"
                    aria-hidden="true"
                    style={{ borderColor: principle.border }}
                  >
                    {principle.symbol}
                  </span>
                </div>

                <p className="manifesto-card-copy">
                  <span style={{ color: principle.muted }}>{principle.dim} </span>
                  <span>{principle.bright}</span>
                </p>
              </div>

              <span className="manifesto-card-glow" aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <motion.aside
          {...reveal(0.3)}
          style={{
            padding: "clamp(30px, 5vw, 54px)",
            border: "1px solid rgba(255,153,0,0.18)",
            borderRadius: 22,
            background:
              "linear-gradient(120deg, rgba(255,153,0,0.075), rgba(255,255,255,0.018) 55%, transparent)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.045), 0 28px 80px rgba(0,0,0,0.22)",
          }}
        >
          <p
            style={{
              maxWidth: 820,
              fontSize: "clamp(24px, 3.6vw, 46px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.035em",
              textWrap: "balance",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)" }}>
              If you are that kind of builder —{" "}
            </span>
            <span className="text-grad-orange">you belong here.</span>
          </p>
          <motion.a
            className="manifesto-cta"
            href="#footer-social"
            whileHover={shouldReduceMotion ? undefined : { x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginTop: 28,
              color: "#FF9900",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Claim your spot <span aria-hidden="true">→</span>
          </motion.a>
        </motion.aside>
      </div>
    </section>
  );
}

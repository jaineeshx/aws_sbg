"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisScrollTo } from "@/lib/lenis";

import { W } from "./constants";
import Terminal from "./Terminal";
import DataTrace from "./DataTrace";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const terminalColRef = useRef<HTMLDivElement>(null);
  const statStripRef = useRef<HTMLDivElement>(null);
  const dataTraceRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const scrollChevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!heroSectionRef.current) return;

      const isMobile = window.innerWidth < 768;
      const textX = isMobile ? -110 : -180;
      const termX = isMobile ? 110 : 180;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: () => `+=${Math.min(Math.max(window.innerHeight, 650), 850)}`,
          pin: true,
          pinSpacing: false,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Data trace 
      if (dataTraceRef.current) {
        tl.to(dataTraceRef.current, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0);
      }
      if (scrollCueRef.current) {
        tl.to(scrollCueRef.current, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0);
      }

      // 2. Hero text/content on left
      if (heroLeftRef.current) {
        tl.to(
          heroLeftRef.current,
          {
            x: textX,
            rotation: -2,
            scale: 0.92,
            opacity: 0,
            ease: "power1.inOut",
            duration: 1,
          },
          0
        );
      }

      // 3. Terminal on right
      if (terminalColRef.current) {
        tl.to(
          terminalColRef.current,
          {
            x: termX,
            rotation: 3,
            scale: 0.88,
            opacity: 0,
            ease: "power1.inOut",
            duration: 1,
            onComplete: () => {
              if (terminalColRef.current) terminalColRef.current.style.pointerEvents = "none";
            },
            onReverseComplete: () => {
              if (terminalColRef.current) terminalColRef.current.style.pointerEvents = "auto";
            },
          },
          0
        );
      }

      // 4. Stat strip fades out and slightly drifts down
      if (statStripRef.current) {
        tl.to(
          statStripRef.current,
          {
            y: 35,
            scale: 0.94,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.75,
          },
          0
        );
      }

      // 5. Next section text comes forward 
      const manifestoContent = document.getElementById("manifesto-content") || document.getElementById("manifesto");
      if (manifestoContent) {
        tl.fromTo(
          manifestoContent,
          {
            scale: 0.90,
            y: 90,
            opacity: 0,
            transformOrigin: "center 30%",
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 1,
          },
          0.05
        );
      }

      // 6. Scroll cue entrance and bounce animation
      if (scrollCueRef.current) {
        gsap.fromTo(
          scrollCueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 2.2, ease: "power2.out" }
        );
      }
      if (scrollChevronRef.current) {
        gsap.to(scrollChevronRef.current, {
          y: 6,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "transparent",
        paddingTop: 90,
        zIndex: 10,
      }}
    >
      { }
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

      { }
      <div
        className="grid-dots"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }}
      />

      { }
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={W}>
          { }
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
              padding-top: 16px;
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
                padding-top: 36px;
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
            @keyframes traceFlow {
              to {
                stroke-dashoffset: -66;
              }
            }
            .trace-pulse {
              animation: traceFlow 2.2s linear infinite;
            }
          `}</style>

          <div className="hero-layout-wrap">
            { }
            <div className="hero-grid-top">

              { }
              <div
                ref={heroLeftRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  willChange: "transform, opacity",
                  transformOrigin: "center left",
                }}
              >
                <HeroContent headlineRef={headlineRef} />
              </div>

              { }
              <div
                className="hero-terminal-col"
                id="hero-terminal-col"
                ref={terminalColRef}
                style={{
                  willChange: "transform, opacity",
                  transformOrigin: "center right",
                }}
              >
                <Terminal />
              </div>

              { }
              <div
                ref={dataTraceRef}
                className="hero-data-trace"
                style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}
              >
                <DataTrace headlineRef={headlineRef} terminalRef={terminalColRef} />
              </div>

            </div>

            { }
            <div
              ref={statStripRef}
              style={{ willChange: "transform, opacity" }}
            >
              <HeroStats />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue indicator */}
      <div
        ref={scrollCueRef}
        onClick={() => lenisScrollTo("#manifesto")}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
          zIndex: 12,
          opacity: 0,
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            userSelect: "none",
          }}
        >
          scroll
        </span>
        <div ref={scrollChevronRef} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronDown size={15} style={{ color: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HERO_STATS } from "./constants";

export default function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.05, ease: "power2.out" }
      );

      const statItems = containerRef.current.querySelectorAll(".hero-stat-item");
      if (statItems.length) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: 1.15,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        gap: "clamp(16px, 3.5vw, 40px)",
        paddingTop: 28,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        flexWrap: "wrap",
        alignItems: "center",
        opacity: 0,
      }}
    >
      {HERO_STATS.map(({ val, label }) => (
        <div
          key={label}
          className="hero-stat-item"
          style={{
            minWidth: 95,
            padding: "6px 12px",
            borderRadius: 12,
            opacity: 0,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              background: "linear-gradient(135deg, #FF9900, #FFBE00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
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
        </div>
      ))}
    </div>
  );
}

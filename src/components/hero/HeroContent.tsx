"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { lenisScrollTo } from "@/lib/lenis";

interface HeroContentProps {
  headlineRef: React.RefObject<HTMLHeadingElement | null>;
}

export default function HeroContent({ headlineRef }: HeroContentProps) {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: "power2.out" }
        );
      }
      if (ctasRef.current) {
        gsap.fromTo(
          ctasRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.95, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          ref={headlineRef}
          style={{
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            fontSize: "clamp(34px, 4.4vw, 64px)",
            color: "#fff",
            margin: 0,
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          Build With AWS<span style={{ color: "#FF9900" }}>.</span>
          <span className="blink" style={{ color: "#FF9900", marginLeft: 2, fontWeight: 400 }}>
            |
          </span>
        </h1>
      </div>
      <p
        ref={subtitleRef}
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          maxWidth: 500,
          color: "rgba(255,255,255,0.55)",
          opacity: 0,
        }}
      >
        A <span style={{ color: "#fff", fontWeight: 600 }}>builder-first community</span> at RV University. No
        theory theatrics. Real AWS projects, shipped by real students.
      </p>

      <div
        ref={ctasRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          alignItems: "center",
          opacity: 0,
        }}
      >
        <a
          href="#footer-social"
          className="btn-orange"
          id="hero-join"
          onClick={(e) => {
            e.preventDefault();
            lenisScrollTo("#footer-social");
          }}
        >
          Join the builders <ArrowRight size={17} />
        </a>
        <a
          href="#projects"
          className="btn-ghost"
          id="hero-projects"
          onClick={(e) => {
            e.preventDefault();
            lenisScrollTo("#projects");
          }}
        >
          See what we&apos;ve built
        </a>
      </div>
    </div>
  );
}

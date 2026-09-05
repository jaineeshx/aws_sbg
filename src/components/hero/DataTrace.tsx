"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";

interface DataTraceProps {
  headlineRef: React.RefObject<HTMLElement | null>;
  terminalRef: React.RefObject<HTMLElement | null>;
}

export default function DataTrace({ headlineRef, terminalRef }: DataTraceProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [points, setPoints] = useState<{ x1: number; y1: number; x2: number; y2: number }>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  // Measure & draw path: top-middle of headline → up above → across → down into top of terminal
  const measure = useCallback(() => {
    const hl = headlineRef.current;
    const tm = terminalRef.current;
    const parent = hl?.closest(".hero-grid-top") as HTMLElement | null;
    if (!hl || !tm || !parent) return;

    const pr = parent.getBoundingClientRect();
    const hr = hl.getBoundingClientRect();
    const tr = tm.getBoundingClientRect();

    // Start: middle of "Build With AWS." at top edge
    const x1 = hr.left - pr.left + hr.width * 0.5;
    const y1 = hr.top - pr.top;

    // End: top edge of terminal, middle of the terminal
    const x2 = tr.left - pr.left + tr.width * 0.5;
    const y2 = tr.top - pr.top;

    // Height of the svg
    const archClearance = 24;
    const y_top = Math.max(6, Math.min(y1, y2) - archClearance);

    // Corner fillets
    const r = Math.min(14, Math.max(6, (x2 - x1) / 3));
    const ry1 = Math.min(r, Math.abs(y1 - y_top) / 2);
    const ry2 = Math.min(r, Math.abs(y2 - y_top) / 2);

    const w = Math.max(x1 + 40, x2 + 40, 100);
    const h = Math.max(y1 + 40, y2 + 40, 100);

    setSvgSize({ w, h });
    setPoints({ x1, y1, x2, y2 });

    // Up from middle of headline → curve right → horizontal bridge → curve down into middle of terminal
    setPathD(
      `M ${x1},${y1} L ${x1},${y_top + ry1} Q ${x1},${y_top} ${x1 + r},${y_top} L ${x2 - r},${y_top} Q ${x2},${y_top} ${x2},${y_top + ry2} L ${x2},${y2}`
    );
  }, [headlineRef, terminalRef]);

  useEffect(() => {
    measure();
    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    const t1 = setTimeout(measure, 150);
    const t2 = setTimeout(measure, 600);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
      delay: 0.8,
      ease: "power2.inOut",
    });

    // Pulse the dot at the terminal endpoint
    if (dot && points.x2 && points.y2) {
      gsap.set(dot, { attr: { cx: points.x2, cy: points.y2 }, opacity: 0 });
      gsap.to(dot, {
        opacity: 0.85,
        duration: 0.4,
        delay: 2.0,
        ease: "power2.out",
      });
      gsap.to(dot, {
        attr: { r: 4.5 },
        opacity: 0.35,
        duration: 1.4,
        delay: 2.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, [pathD, points]);

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
      <defs>
        <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF9900" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#FF9900" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF9900" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      { }
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#traceGrad)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      { }
      <path
        d={pathD}
        fill="none"
        stroke="#FF9900"
        strokeWidth={1.5}
        strokeDasharray="6 60"
        className="trace-pulse"
        opacity={0.8}
        style={{ filter: "drop-shadow(0 0 6px rgba(255,153,0,0.9))" }}
      />

      { }
      <circle
        cx={points.x1}
        cy={points.y1}
        r={2.5}
        fill="#FF9900"
        opacity={0.85}
        style={{ filter: "drop-shadow(0 0 6px rgba(255,153,0,0.9))" }}
      />

      { }
      <circle
        ref={dotRef}
        r={3}
        fill="#FF9900"
        opacity={0}
        style={{ filter: "drop-shadow(0 0 8px rgba(255,153,0,0.95))" }}
      />

      { }
      <polygon
        points={`${points.x2 - 3.5},${points.y2 - 6} ${points.x2 + 3.5},${points.y2 - 6} ${points.x2},${points.y2}`}
        fill="#FF9900"
        style={{
          opacity: 0,
          animation: "fadeInTrace 0.4s ease-out 2.0s forwards",
          filter: "drop-shadow(0 0 4px rgba(255,153,0,0.8))",
        }}
      />
    </svg>
  );
}

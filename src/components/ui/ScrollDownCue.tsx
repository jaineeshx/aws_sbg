"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ScrollDownCueProps {
  targetId?: string;
  label?: string;
  className?: string;
}

export default function ScrollDownCue({
  targetId = "about-event",
  label = "SCROLL DOWN",
  className = "",
}: ScrollDownCueProps) {
  const handleScroll = () => {
    const el = document.getElementById(targetId);
    if (el) {
      const winWithLenis = typeof window !== "undefined" ? (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number; duration?: number }) => void } }) : undefined;
      if (winWithLenis?.__lenis) {
        winWithLenis.__lenis.scrollTo(el, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      onClick={handleScroll}
      className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none group transition-opacity py-3 ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Scroll down to event details"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleScroll();
        }
      }}
    >
      <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-white/40 group-hover:text-[#FF9900] transition-colors uppercase">
        {label}
      </span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 group-hover:border-[#FF9900]/40 bg-white/[0.02] group-hover:bg-[#FF9900]/10 text-white/50 group-hover:text-[#FF9900] transition-all shadow-sm"
      >
        <ChevronDown size={15} />
      </motion.div>
    </div>
  );
}

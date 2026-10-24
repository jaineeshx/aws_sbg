"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface WhatsNextCardProps {
  builderCenterUrl?: string;
  skillBuilderUrl?: string;
  className?: string;
}

export default function WhatsNextCard({
  builderCenterUrl = "https://builder.aws.com",
  skillBuilderUrl = "https://skillbuilder.aws",
  className = "",
}: WhatsNextCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`w-full max-w-sm mt-8 pt-5 border-t border-white/10 text-center flex flex-col items-center ${className}`}
    >
      <div className="flex items-center gap-1.5 justify-center mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-orange-400 font-bold">
          WHAT&apos;S NEXT
        </span>
      </div>

      <h3 className="text-sm font-semibold text-white m-0">
        Keep building on AWS Builder Center
      </h3>

      <p className="text-xs text-white/55 mt-1 mb-3 m-0 max-w-[320px] leading-relaxed">
        Create your profile, earn badges and keep learning after the session.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={builderCenterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF9900] hover:bg-[#e08800] text-black font-bold text-xs transition-all duration-200 shadow-sm hover:scale-[1.02]"
        >
          <span>AWS Builder Center</span>
          <ExternalLink size={12} />
        </a>

        <a
          href={skillBuilderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-white font-medium text-xs transition-all duration-200"
        >
          <span>Skill Builder</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.div>
  );
}

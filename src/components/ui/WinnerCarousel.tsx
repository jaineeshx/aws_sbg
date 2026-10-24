"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, ExternalLink } from "lucide-react";
import { EventWinner } from "@/data/events";

interface WinnerCarouselProps {
  winners?: EventWinner[];
  isFullWidth?: boolean;
}

export default function WinnerCarousel({ winners, isFullWidth }: WinnerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!winners || winners.length === 0) {
    return null;
  }

  const total = winners.length;
  const isMultiple = total > 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const current = winners[currentIndex];

  return (
    <div className="w-full flex flex-col justify-between h-full min-w-0">
      {/* Single Winner & Project Card Viewport */}
      <div className="w-full relative flex-1 flex flex-col justify-center min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className={`w-full ${
              isFullWidth ? "max-w-[420px]" : "max-w-[360px]"
            } mx-auto rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF9900]/40 p-4 sm:p-5 transition-all duration-200 min-w-0 flex flex-col justify-between shadow-xl`}
          >
            <div className="min-w-0">
              {/* Position Badge & Prize */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 shrink-0">
                  <Trophy size={11} />
                  <span>{current.position || "Winner"}</span>
                </span>
                {current.prize && (
                  <span className="text-[11px] font-mono font-semibold text-white/60 truncate text-right">
                    {current.prize}
                  </span>
                )}
              </div>

              {/* Award Title */}
              {current.award && (
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {current.award}
                </h3>
              )}

              {/* Team Name & Members */}
              <div className="mb-2 min-w-0">
                <div className="text-sm sm:text-base font-bold text-white truncate">
                  {current.teamName || current.name}
                </div>
                {current.members && current.members.length > 0 && (
                  <div className="text-xs text-white/50 truncate mt-0.5">
                    {current.members.join(", ")}
                  </div>
                )}
              </div>

              {/* Project Description */}
              {current.project && (
                <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed mb-2.5">
                  {current.project}
                </p>
              )}
            </div>

            {/* Repository Link */}
            {current.projectUrl && (
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-end">
                <a
                  href={current.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF9900] hover:text-[#ffb74d] transition-colors"
                >
                  <span>Repository</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: Left Arrow, Active Dots, Right Arrow */}
      {isMultiple && (
        <div className="flex items-center justify-center gap-4 mt-4 pt-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous winner"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-white hover:text-[#FF9900] flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {winners.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to winner ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  i === currentIndex
                    ? "w-6 bg-[#FF9900]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next winner"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-white hover:text-[#FF9900] flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

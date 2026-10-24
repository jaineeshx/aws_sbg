"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, ChevronDown, ChevronUp } from "lucide-react";
import ImageAutoSlider, { ImageAutoSliderItem } from "@/components/ui/image-auto-slider";

interface EventGalleryToggleProps {
  photos?: (ImageAutoSliderItem | string)[];
  subtitle?: string;
}

export default function EventGalleryToggle({
  photos,
  subtitle = "High-resolution moments captured during workshops, debugging marathons, and collaborative builds.",
}: EventGalleryToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {/* Header Row with Title, Subtitle, and View/Hide Toggle Control */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
            EVENT MEMORIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
            Event Moments
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-white/60 mt-1.5 max-w-2xl leading-relaxed m-0">
              {subtitle}
            </p>
          )}
        </div>

        {/* View Gallery / Hide Gallery Action Button on top-right */}
        <div className="flex-shrink-0 sm:pt-1">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-white hover:text-[#FF9900] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg"
          >
            <Images size={15} className="text-[#FF9900]" />
            <span>{isOpen ? "Hide Gallery" : "View Gallery →"}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expandable Photo Gallery Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden pt-2"
          >
            <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-2 sm:p-4">
              <ImageAutoSlider
                items={photos}
                speedSeconds={32}
                pauseOnHover={true}
              />
            </div>
            <p className="font-mono text-[11px] text-white/35 text-center mt-3 tracking-wider uppercase">
              Continuous auto-scroll · Hover image to pause and read caption
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { EventGuest } from "@/data/events";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface GuestCarouselProps {
  guests?: EventGuest[];
  isFullWidth?: boolean;
}

function GuestCard({ guest }: { guest: EventGuest }) {
  const linkedinUrl = guest.linkedinUrl || guest.linkedin || guest.link;
  const designation = guest.designation || guest.role || "Featured Speaker";
  const organization = guest.organization || guest.organisation;
  const bio = guest.bio || guest.details;
  const roleBadge = guest.role && guest.role.length <= 25 ? guest.role.toUpperCase() : "SPEAKER";

  return (
    <div className="w-full max-w-[380px] mx-auto rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF9900]/40 p-6 flex flex-col items-center text-center transition-all duration-200 shadow-xl min-w-0">
      {/* Role Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 mb-4">
        <Sparkles size={11} />
        <span>{roleBadge}</span>
      </div>

      {/* Neat Square Portrait Photo */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-md mb-4 shrink-0">
        {guest.photo ? (
          <img
            src={guest.photo}
            alt={guest.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#FF9900]/10 text-[#FF9900] font-bold text-3xl">
            {guest.name[0]}
          </div>
        )}
      </div>

      {/* Full Name */}
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight m-0">
        {guest.name}
      </h3>

      {/* Designation & Organisation */}
      <p className="text-xs sm:text-sm font-semibold text-[#FF9900] mt-1 mb-0.5">
        {designation}
      </p>
      {organization && (
        <p className="text-xs text-white/50 m-0">
          {organization}
        </p>
      )}

      {/* Short Bio */}
      {bio && (
        <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-3 mb-0 line-clamp-3">
          {bio}
        </p>
      )}

      {/* Visible LinkedIn Profile Button */}
      {linkedinUrl && (
        <div className="mt-5 pt-4 border-t border-white/10 w-full flex justify-center">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-xs font-semibold text-white hover:text-[#FF9900] transition-all"
          >
            <LinkedinIcon className="text-[#0077B5]" />
            <span>View LinkedIn Profile</span>
            <ExternalLink size={12} className="text-white/40" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function GuestCarousel({ guests, isFullWidth }: GuestCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!guests || guests.length === 0) {
    return null;
  }

  // If full width and multiple guests exist, render them in a clean responsive grid
  if (isFullWidth && guests.length > 1) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {guests.map((guest, idx) => (
          <GuestCard key={`guest-grid-${idx}`} guest={guest} />
        ))}
      </div>
    );
  }

  const isMultiple = guests.length > 1;
  const current = guests[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : guests.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < guests.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full flex flex-col justify-between h-full min-w-0">
      {/* Single Guest Card Viewport (Centered Square Professional Card) */}
      <div className="w-full relative flex-1 flex flex-col justify-center min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            <GuestCard guest={current} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Displayed when multiple guests exist) */}
      {isMultiple && (
        <div className="flex items-center justify-center gap-4 mt-5 pt-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous speaker"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-white hover:text-[#FF9900] flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Counter Indicator */}
          <span className="font-mono text-xs text-white/50 tracking-wider">
            {currentIndex + 1} / {guests.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next speaker"
            className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-white hover:text-[#FF9900] flex items-center justify-center transition-all cursor-pointer shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import GlassFolder from "@/components/ui/glass-folder-cards";
import { EVENT_FOLDERS, getFolderCards } from "@/data/events";

// Main section container aligned to desktop carousel width (900–1000px)
const CONTAINER_STYLE: React.CSSProperties = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "0 clamp(20px, 4vw, 32px)",
  width: "100%",
  boxSizing: "border-box",
};

const SECTION_STYLE: React.CSSProperties = {
  padding: "clamp(60px, 10vh, 110px) 0",
  position: "relative",
};

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // Responsive folder sizing & visible count
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [folderWidth, setFolderWidth] = useState<number>(280);
  const gap = 24;

  // Track hover and active state (for touch devices)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);

  // Carousel position index (0 to maxIndex)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const maxIndex = Math.max(0, EVENT_FOLDERS.length - visibleCount);
  const safeIndex = Math.min(currentIndex, maxIndex);

  useEffect(() => {
    const updateResponsive = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      let newVisible = 3;
      if (w < 640) {
        // Mobile: 1 folder visible
        newVisible = 1;
        setVisibleCount(1);
        setFolderWidth(Math.min(280, w - 48));
      } else if (w < 1024) {
        // Tablet: 2 folders visible
        newVisible = 2;
        setVisibleCount(2);
        setFolderWidth(275);
      } else {
        // Desktop: 3 complete folders visible (270-290px range)
        newVisible = 3;
        setVisibleCount(3);
        setFolderWidth(280);
      }
      const newMax = Math.max(0, EVENT_FOLDERS.length - newVisible);
      setCurrentIndex((prev) => Math.min(prev, newMax));
    };
    updateResponsive();
    window.addEventListener("resize", updateResponsive);
    return () => window.removeEventListener("resize", updateResponsive);
  }, []);

  const canScrollLeft = safeIndex > 0;
  const canScrollRight = safeIndex < maxIndex;

  const scrollDirection = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
      }
    },
    [maxIndex]
  );

  // Touch gesture handling without hijacking vertical scrolling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Only slide if horizontal movement strictly dominates vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0 && currentIndex < maxIndex) {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
      } else if (deltaX < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section id="events" style={SECTION_STYLE}>
      {/* Component-scoped carousel styles */}
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
        .events-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .events-nav-btn:hover:not(:disabled) {
          background: rgba(255, 153, 0, 0.12);
          border-color: rgba(255, 153, 0, 0.35);
          color: #FF9900;
          transform: translateY(-1px);
        }
        .events-nav-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.96);
        }
        .events-nav-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .events-dot {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.18);
          transition: all 0.25s ease;
        }
        .events-dot.active {
          width: 24px;
          background: #FF9900;
          box-shadow: 0 0 12px rgba(255, 153, 0, 0.4);
        }
        .events-open-folder-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          padding: 6px 16px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--font-jetbrains, 'JetBrains Mono', monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }
        .events-open-folder-btn:hover {
          background: rgba(255, 153, 0, 0.14);
          border-color: rgba(255, 153, 0, 0.45);
          color: #FF9900;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(255, 153, 0, 0.2);
        }
        .events-open-folder-btn:focus-visible {
          outline: 2px solid #FF9900;
          outline-offset: 2px;
        }
        .events-open-folder-btn.disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .events-open-arrow {
          transition: transform 0.2s ease;
        }
        .events-open-folder-btn:hover .events-open-arrow {
          transform: translateX(3px);
        }
      `,
        }}
      />

      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, transparent, rgba(255,153,0,0.02) 50%, transparent)",
        }}
      />

      {/* Carousel Section Container: Aligns left edge of carousel with heading and description */}
      <div style={CONTAINER_STYLE}>
        {/* Header with Title and Carousel Navigation Controls */}
        <div
          ref={sectionRef}
          style={{
            marginBottom: 10,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              style={{ marginBottom: 16 }}
            >
              <span className="section-label">Events &amp; Workshops</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: "clamp(34px, 4.8vw, 58px)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: 12,
              }}
            >
              Ship real things,{" "}
              <span
                style={{
                  background: "linear-gradient(125deg,#FF9900,#FF6200 50%,#FFBE00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                together.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 520,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Events lined up for 2026–27. Workshops, hackathons, community days — pick your battles.
            </motion.p>
          </div>

          {/* Navigation arrow buttons positioned neatly at top-right of carousel area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <button
              type="button"
              onClick={() => scrollDirection("left")}
              disabled={!canScrollLeft}
              className="events-nav-btn"
              aria-label="Previous event folder"
              id="events-carousel-prev"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollDirection("right")}
              disabled={!canScrollRight}
              className="events-nav-btn"
              aria-label="Next event folder"
              id="events-carousel-next"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Horizontal Carousel Viewport: Headroom allows emerging hover cards without clipping */}
        <div
          className="events-carousel-viewport"
          data-lenis-prevent
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            width: "100%",
            overflow: "hidden",
            position: "relative",
            paddingTop: 82, // Ample headroom for emerging memory cards on hover
            paddingBottom: 36, // Ample room for Open folder action button
            paddingLeft: 30, // Side margin so fanned cards aren't clipped on the edges
            paddingRight: 30,
            margin: "0 -30px", // Maintains alignment with container borders
            boxSizing: "content-box",
          }}
        >
          <motion.div
            className="events-carousel-track"
            animate={{ x: -safeIndex * (folderWidth + gap) }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              gap: `${gap}px`,
              alignItems: "flex-start",
              willChange: "transform",
            }}
          >
            {EVENT_FOLDERS.map((item, folderIdx) => {
              const posNum = String(folderIdx + 1).padStart(2, "0");
              return (
              <div
                key={item.id}
                className="events-folder-slide"
                style={{
                  width: folderWidth,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                id={`event-folder-${item.id}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  setActiveFolderId((prev) => (prev === item.id ? null : item.id))
                }
              >
                <GlassFolder
                  label={posNum}
                  meta={`Event ${posNum}`}
                  tone={item.tone || "dark"}
                  art={item.art}
                  seed={item.seed}
                  appearDelay={item.appearDelay}
                  action="none"
                  files={getFolderCards(item)}
                  width={folderWidth}
                  open={hoveredId === item.id || activeFolderId === item.id}
                />

                {/* Open Folder Action Button */}
                {item.slug ? (
                  <Link
                    href={`/events/${item.slug}`}
                    className="events-open-folder-btn"
                    id={`open-folder-${item.id}`}
                    aria-label={`Open folder for ${item.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span>Open folder</span>
                    <ArrowRight size={13} className="events-open-arrow" />
                  </Link>
                ) : (
                  <span
                    className="events-open-folder-btn disabled"
                    aria-disabled="true"
                    title="Event details coming soon"
                  >
                    <span>Coming soon</span>
                  </span>
                )}
              </div>
            );})}

          </motion.div>
        </div>

        {/* Carousel Footer: Dot Indicators and Microcopy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            marginTop: 10,
          }}
        >
          {/* Synchronized progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide set ${idx + 1}`}
                className={`events-dot ${safeIndex === idx ? "active" : ""}`}
              />
            ))}
          </div>

          {/* Interactive hint */}
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
            }}
          >
            Hover to explore event cards · Tap to open
          </p>
        </div>

        {/* Persistent footer stay plugged in note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 36, fontSize: 14 }}
          className="mono"
        >
          <span style={{ color: "rgba(255,255,255,0.25)" }}>
            More events throughout the year. →{" "}
          </span>
          <a
            href="#footer-social"
            style={{ color: "#FF9900", textDecoration: "none" }}
          >
            Stay plugged in
          </a>
        </motion.p>
      </div>
    </section>
  );
}

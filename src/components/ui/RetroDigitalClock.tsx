"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RetroDigitalClockProps {
  startTime?: string; // e.g. "10:00"
  endTime?: string;   // e.g. "13:30"
  className?: string;
}

// 7-segment segment mapping for digits 0-9
// Segments: a (top), b (top-right), c (bottom-right), d (bottom), e (bottom-left), f (top-left), g (middle)
const SEGMENTS: Record<string, number[]> = {
  "0": [1, 1, 1, 1, 1, 1, 0],
  "1": [0, 1, 1, 0, 0, 0, 0],
  "2": [1, 1, 0, 1, 1, 0, 1],
  "3": [1, 1, 1, 1, 0, 0, 1],
  "4": [0, 1, 1, 0, 0, 1, 1],
  "5": [1, 0, 1, 1, 0, 1, 1],
  "6": [1, 0, 1, 1, 1, 1, 1],
  "7": [1, 1, 1, 0, 0, 0, 0],
  "8": [1, 1, 1, 1, 1, 1, 1],
  "9": [1, 1, 1, 1, 0, 1, 1],
  " ": [0, 0, 0, 0, 0, 0, 0],
  "-": [0, 0, 0, 0, 0, 0, 1],
};

function SevenSegmentDigit({ char, size = "large" }: { char: string; size?: "large" | "small" }) {
  const segs = SEGMENTS[char] || SEGMENTS[" "];
  const width = size === "large" ? 38 : 20;
  const height = size === "large" ? 64 : 34;

  // Segment colors
  const activeColor = "#FF2828";
  const inactiveColor = "rgba(255, 40, 40, 0.07)";
  const glowStyle = {
    filter: "drop-shadow(0 0 6px rgba(255, 40, 40, 0.85))",
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* a - Top */}
      <polygon
        points="5,3 27,3 24,7 8,7"
        fill={segs[0] ? activeColor : inactiveColor}
        style={segs[0] ? glowStyle : undefined}
      />
      {/* b - Top-right */}
      <polygon
        points="28,4 28,24 24,22 24,8"
        fill={segs[1] ? activeColor : inactiveColor}
        style={segs[1] ? glowStyle : undefined}
      />
      {/* c - Bottom-right */}
      <polygon
        points="28,29 28,49 24,45 24,31"
        fill={segs[2] ? activeColor : inactiveColor}
        style={segs[2] ? glowStyle : undefined}
      />
      {/* d - Bottom */}
      <polygon
        points="8,47 24,47 27,51 5,51"
        fill={segs[3] ? activeColor : inactiveColor}
        style={segs[3] ? glowStyle : undefined}
      />
      {/* e - Bottom-left */}
      <polygon
        points="4,29 8,31 8,45 4,49"
        fill={segs[4] ? activeColor : inactiveColor}
        style={segs[4] ? glowStyle : undefined}
      />
      {/* f - Top-left */}
      <polygon
        points="4,4 8,8 8,22 4,24"
        fill={segs[5] ? activeColor : inactiveColor}
        style={segs[5] ? glowStyle : undefined}
      />
      {/* g - Middle */}
      <polygon
        points="7,25 25,25 27,27 25,29 7,29 5,27"
        fill={segs[6] ? activeColor : inactiveColor}
        style={segs[6] ? glowStyle : undefined}
      />
    </svg>
  );
}

function SevenSegmentColon({ active = true }: { active?: boolean }) {
  const activeColor = "#FF2828";
  const inactiveColor = "rgba(255, 40, 40, 0.07)";
  const glowStyle = {
    filter: "drop-shadow(0 0 6px rgba(255, 40, 40, 0.85))",
  };

  return (
    <svg
      width={13}
      height={64}
      viewBox="0 0 12 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle", margin: "0 1px" }}
    >
      <circle
        cx="6"
        cy="18"
        r="3.2"
        fill={active ? activeColor : inactiveColor}
        style={active ? glowStyle : undefined}
      />
      <circle
        cx="6"
        cy="36"
        r="3.2"
        fill={active ? activeColor : inactiveColor}
        style={active ? glowStyle : undefined}
      />
    </svg>
  );
}

// Parses "HH:MM" into formatted 12-hour components: { hours: "10", minutes: "00", period: "AM" }
function parseTime(timeStr?: string): { h1: string; h2: string; m1: string; m2: string; period: string } | null {
  if (!timeStr) return null;
  const parts = timeStr.trim().split(":");
  if (parts.length < 2) return null;
  let h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (isNaN(h) || isNaN(m)) return null;

  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;

  const hStr = String(h).padStart(2, "0");
  const mStr = String(m).padStart(2, "0");

  return {
    h1: hStr[0],
    h2: hStr[1],
    m1: mStr[0],
    m2: mStr[1],
    period,
  };
}

export default function RetroDigitalClock({
  startTime,
  endTime,
  className = "",
}: RetroDigitalClockProps) {
  const shouldReduceMotion = useReducedMotion();

  const startParsed = useMemo(() => parseTime(startTime), [startTime]);
  const endParsed = useMemo(() => parseTime(endTime), [endTime]);

  // Can toggle only if both start and end times are available
  const canToggle = Boolean(startParsed && endParsed);

  // Phase: "start" | "end"
  const [phase, setPhase] = useState<"start" | "end">("start");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayDigits, setDisplayDigits] = useState<{
    h1: string;
    h2: string;
    m1: string;
    m2: string;
    period: string;
  } | null>(startParsed || endParsed);

  // Synchronize on props change: initially show START TIME
  useEffect(() => {
    if (startParsed) {
      setDisplayDigits(startParsed);
      setPhase("start");
    } else if (endParsed) {
      setDisplayDigits(endParsed);
      setPhase("end");
    }
  }, [startParsed, endParsed]);

  // Click toggle interaction: Alternates between START TIME and END TIME
  const handleToggle = () => {
    if (!canToggle || isAnimating) return;
    const nextPhase = phase === "start" ? "end" : "start";
    const targetDigits = nextPhase === "end" ? endParsed! : startParsed!;

    if (shouldReduceMotion) {
      setPhase(nextPhase);
      setDisplayDigits(targetDigits);
      return;
    }

    setIsAnimating(true);
    let step = 0;
    const flickerInterval = setInterval(() => {
      step++;
      if (step === 1) {
        setDisplayDigits({
          h1: String(Math.floor(Math.random() * 9)),
          h2: String(Math.floor(Math.random() * 9)),
          m1: String(Math.floor(Math.random() * 9)),
          m2: String(Math.floor(Math.random() * 9)),
          period: targetDigits.period,
        });
      } else if (step === 2) {
        setDisplayDigits({
          h1: targetDigits.h1,
          h2: String(Math.floor(Math.random() * 9)),
          m1: targetDigits.m1,
          m2: String(Math.floor(Math.random() * 9)),
          period: targetDigits.period,
        });
      } else {
        clearInterval(flickerInterval);
        setDisplayDigits(targetDigits);
        setPhase(nextPhase);
        setIsAnimating(false);
      }
    }, 70);
  };

  if (!displayDigits) {
    return null;
  }

  const isShowingEnd = phase === "end";

  return (
    <div
      className={`retro-clock-wrapper ${className}`}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      role={canToggle ? "button" : undefined}
      tabIndex={canToggle ? 0 : undefined}
      aria-label={
        canToggle
          ? `Event clock showing ${isShowingEnd ? "end time" : "start time"}: ${displayDigits.h1}${displayDigits.h2}:${displayDigits.m1}${displayDigits.m2} ${displayDigits.period}. Click to switch.`
          : undefined
      }
      title={
        canToggle
          ? isShowingEnd
            ? "Click to switch to START TIME"
            : "Click to switch to END TIME"
          : undefined
      }
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "4px 0 6px 0",
        cursor: canToggle ? "pointer" : "default",
        userSelect: "none",
        outline: "none",
      }}
    >
      {/* Clock Outer Chassis (Inspired by reference alarm clock: rounded border, top bar, stand feet) */}
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top Button Accent (Snooze / Bar from reference image) */}
        <div
          style={{
            width: 82,
            height: 4,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: "#424850",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderBottom: "none",
            marginBottom: -1,
            zIndex: 1,
          }}
        />

        {/* Main Casing Body */}
        <div
          style={{
            position: "relative",
            padding: "8px 14px",
            borderRadius: 22,
            background: "linear-gradient(180deg, #E2E6EA 0%, #CCD2D8 100%)",
            border: "1px solid #B4BAC2",
            boxShadow:
              "0 10px 25px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.9), 0 2px 4px rgba(0,0,0,0.2)",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Bezel / Inner Glass Screen */}
          <div
            style={{
              position: "relative",
              padding: "10px 18px 8px 18px",
              borderRadius: 14,
              backgroundColor: "#111417",
              boxShadow:
                "inset 0 2px 6px rgba(0, 0, 0, 0.95), inset 0 0 1px rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.4)",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {/* Top Status Bar: Label (START TIME / END TIME) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 2,
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: isShowingEnd ? "#FF9900" : "#FF2E2E",
                    boxShadow: isShowingEnd
                      ? "0 0 6px #FF9900"
                      : "0 0 6px #FF2E2E",
                    display: "inline-block",
                  }}
                />
                <motion.span
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: isShowingEnd ? "#FF9900" : "#FF5E5E",
                    textTransform: "uppercase",
                  }}
                >
                  {isShowingEnd ? "END TIME" : "START TIME"}
                </motion.span>
              </div>

              {/* AM / PM indicator */}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#FF3838",
                  letterSpacing: "0.1em",
                  textShadow: "0 0 6px rgba(255, 56, 56, 0.7)",
                }}
              >
                {displayDigits.period}
              </span>
            </div>

            {/* Seven-Segment Numbers Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "2px 0",
              }}
            >
              <SevenSegmentDigit char={displayDigits.h1} />
              <SevenSegmentDigit char={displayDigits.h2} />
              <SevenSegmentColon active={true} />
              <SevenSegmentDigit char={displayDigits.m1} />
              <SevenSegmentDigit char={displayDigits.m2} />

              {/* Sub-digits on right matching reference image ("00") */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: 64,
                  paddingBottom: 2,
                  marginLeft: 3,
                }}
              >
                <div style={{ display: "flex", gap: 1 }}>
                  <SevenSegmentDigit char="0" size="small" />
                  <SevenSegmentDigit char="0" size="small" />
                </div>
              </div>
            </div>

            {/* Subtle Screen Glass Sheen Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Bottom Stand Feet (From reference image) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "82%",
            padding: "0 6px",
            marginTop: -1,
            zIndex: 0,
          }}
        >
          <span
            style={{
              width: 14,
              height: 4,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
              backgroundColor: "#7D848C",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 14,
              height: 4,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
              backgroundColor: "#7D848C",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              display: "inline-block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

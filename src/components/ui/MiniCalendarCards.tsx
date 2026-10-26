"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface MiniCalendarCardsProps {
  date?: string; // Canonical ISO format: "YYYY-MM-DD"
  className?: string;
}

const MONTH_NAMES = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const WEEKDAY_NAMES = [
  "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
];

interface CalendarSlot {
  key: "year" | "month" | "date" | "day";
  label: string;
  value: string;
  accent?: boolean;
}

export default function MiniCalendarCards({ date, className = "" }: MiniCalendarCardsProps) {
  const shouldReduceMotion = useReducedMotion();

  // Deterministic UTC parsing prevents any browser timezone offset from shifting the day
  const slots: CalendarSlot[] | null = useMemo(() => {
    if (!date) return null;
    const parts = date.split("-").map((p) => parseInt(p, 10));
    if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      return null;
    }
    const [year, month, day] = parts;
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    if (isNaN(utcDate.getTime())) return null;

    const weekdayIndex = utcDate.getUTCDay();
    const monthIndex = month - 1;

    return [
      {
        key: "year",
        label: "YEAR",
        value: String(year),
      },
      {
        key: "month",
        label: "MONTH",
        value: MONTH_NAMES[monthIndex] ?? "—",
        accent: true,
      },
      {
        key: "date",
        label: "DATE",
        value: String(day).padStart(2, "0"),
      },
      {
        key: "day",
        label: "DAY",
        value: WEEKDAY_NAMES[weekdayIndex] ?? "—",
      },
    ];
  }, [date]);

  if (!slots) {
    return null;
  }

  // Animation delay sequence: YEAR (0.1s) -> MONTH (0.26s) -> DATE (0.42s) -> DAY (0.58s)
  const delays: Record<string, number> = {
    year: 0.1,
    month: 0.26,
    date: 0.42,
    day: 0.58,
  };

  return (
    <div
      className={`mini-calendar-row ${className}`}
      role="group"
      aria-label={`Event date: ${slots.map((s) => `${s.label} ${s.value}`).join(", ")}`}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        margin: "6px 0",
      }}
    >
      {slots.map((slot) => {
        const delay = shouldReduceMotion ? 0 : delays[slot.key];

        return (
          <motion.div
            key={slot.key}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: "relative",
              width: 88,
              height: 96,
              borderRadius: 12,
              backgroundColor: "#FAF7F2", // Warm paper cream
              border: "1px solid rgba(220, 212, 198, 0.85)",
              boxShadow:
                "0 6px 18px rgba(0, 0, 0, 0.22), 0 2px 4px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            {/* Top Binder Rings Detail */}
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 6,
                  borderRadius: 2,
                  backgroundColor: "#2C2C32",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  width: 5,
                  height: 6,
                  borderRadius: 2,
                  backgroundColor: "#2C2C32",
                  border: "1px solid rgba(255, 255, 255, 0.35)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  display: "inline-block",
                }}
              />
            </div>

            {/* Top Binding Strip / Header Bar */}
            <div
              style={{
                width: "100%",
                paddingTop: 11,
                paddingBottom: 5,
                backgroundColor: slot.accent ? "#FFE2C2" : "#E5DFD3",
                borderBottom: "1px solid rgba(190, 180, 165, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  color: slot.accent ? "#D96200" : "#1E1E24",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                {slot.label}
              </span>
            </div>

            {/* Paper Card Tear Perforation Line */}
            <div
              style={{
                width: "100%",
                height: 1,
                backgroundImage:
                  "repeating-linear-gradient(to right, rgba(160,150,135,0.6) 0, rgba(160,150,135,0.6) 3px, transparent 3px, transparent 6px)",
              }}
            />

            {/* Card Main Value */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "2px 4px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: slot.key === "day" ? 14 : slot.key === "year" ? 22 : 30,
                  fontWeight: 800,
                  letterSpacing: slot.key === "day" ? "0.02em" : "-0.03em",
                  color: "#050508",
                  lineHeight: 1,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {slot.value}
              </span>
            </div>

            {/* Subtle paper bottom corner bevel shadow */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.06))",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

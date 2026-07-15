"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;
const NAV = [
  { label: "Events",   href: "#events" },
  { label: "Team",     href: "#team" },
  { label: "Projects", href: "#projects" },
  { label: "Blog",     href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(3,3,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
        }}
      >
        <div style={{ ...W, display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, flexShrink: 0 }}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                <rect width="40" height="40" rx="9" fill="#FF9900"/>
                <path d="M8 22L12 14L16 22M9.5 20H14.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M17 14L19.5 22L22 17L24.5 22L27 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29 18C29 18 28 16 26.5 16C25 16 24 17 24 18.5C24 20 25.5 20.5 27 21C28.5 21.5 29 22 29 23C29 24 28 25 26.5 25C25 25 24 24 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>AWS SBG</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", lineHeight: 1.2 }}>
                RV University
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            <style>{`@media(max-width:680px){.desktop-nav{display:none!important}.mobile-btn{display:flex!important}}`}</style>
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  padding: "8px 16px", borderRadius: 10,
                  fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)",
                  textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="desktop-nav">
            <motion.a
              href="#join"
              whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
              className="btn-orange"
              style={{ padding: "10px 22px", fontSize: 14 }}
              id="nav-cta"
            >
              Build with us
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              display: "none",
              alignItems: "center", justifyContent: "center",
              width: 40, height: 40, borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)", cursor: "pointer",
            }}
            id="mobile-menu-btn"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 90,
              background: "rgba(3,3,8,0.96)",
              backdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 32,
            }}
          >
            {NAV.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 40, fontWeight: 800, color: "#fff",
                  textDecoration: "none", letterSpacing: "-0.02em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#FF9900")}
                onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#join"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
              onClick={() => setOpen(false)}
              className="btn-orange"
              style={{ fontSize: 18, padding: "16px 40px", marginTop: 8 }}
            >
              Build with us →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

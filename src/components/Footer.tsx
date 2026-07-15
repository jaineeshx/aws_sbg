"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;

const GithubSvg = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const InstaSvg = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);
const LinkedInSvg = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LINKS = [
  { heading: "Navigate", items: [
    { l: "Events", h: "#events" }, { l: "Team", h: "#team" },
    { l: "Projects", h: "#projects" }, { l: "Blog", h: "#blog" }, { l: "Join", h: "#join" },
  ]},
  { heading: "Community", items: [
    { l: "WhatsApp Group", h: "#" }, { l: "LinkedIn Page", h: "#" },
    { l: "Instagram", h: "#" }, { l: "GitHub Org", h: "#" },
  ]},
  { heading: "Resources", items: [
    { l: "AWS Free Tier", h: "https://aws.amazon.com/free", ext: true },
    { l: "AWS Skill Builder", h: "https://skillbuilder.aws", ext: true },
    { l: "AWS Student Hub", h: "https://aws.amazon.com/education/awseducate", ext: true },
  ]},
];

const SOCIALS = [
  { Icon: LinkedInSvg, label: "LinkedIn", href: "#" },
  { Icon: InstaSvg,    label: "Instagram", href: "#" },
  { Icon: GithubSvg,  label: "GitHub",    href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)" }}>
      <div style={{ ...W, paddingTop: 80, paddingBottom: 60 }}>
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 48, marginBottom: 60,
          }}
        >
          <style>{`@media(max-width:768px){#footer-grid{grid-template-columns:1fr 1fr!important}}`}</style>
          <div id="footer-grid" style={{ display: "contents" }}>
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36 }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: "100%", height: "100%" }}>
                    <rect width="40" height="40" rx="9" fill="#FF9900"/>
                    <path d="M8 22L12 14L16 22M9.5 20H14.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <path d="M17 14L19.5 22L22 17L24.5 22L27 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M29 18C29 18 28 16 26.5 16C25 16 24 17 24 18.5C24 20 25.5 20.5 27 21C28.5 21.5 29 22 29 23C29 24 28 25 26.5 25C25 25 24 24 24 24" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AWS SBG</div>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                    RV University
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
                We&apos;re building what&apos;s missing —<br />a builder-first community.
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                {SOCIALS.map(({ Icon, label, href }) => (
                  <motion.a
                    key={label} href={href} aria-label={label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "rgba(255,255,255,0.35)", transition: "all 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <p className="mono" style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 10 }}>
                  Build logs to your inbox
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email" placeholder="your@email.com" id="footer-newsletter"
                    style={{
                      flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 13,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#fff", fontFamily: "inherit", outline: "none",
                    }}
                  />
                  <button
                    id="footer-subscribe"
                    style={{
                      padding: "10px 16px", borderRadius: 10, fontSize: 14,
                      background: "#FF9900", color: "#000", fontWeight: 700, cursor: "pointer",
                      border: "none", flexShrink: 0,
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Link columns */}
            {LINKS.map((col) => (
              <div key={col.heading}>
                <h4 className="mono" style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                  marginBottom: 20,
                }}>
                  {col.heading}
                </h4>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                  {col.items.map((item) => (
                    <li key={item.l}>
                      <a
                        href={item.h}
                        target={(item as {ext?: boolean}).ext ? "_blank" : undefined}
                        rel={(item as {ext?: boolean}).ext ? "noopener noreferrer" : undefined}
                        style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 14, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                      >
                        {item.l}
                        {(item as {ext?: boolean}).ext && <ExternalLink size={11} style={{ opacity: 0.4 }} />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
        }}>
          <p className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            © 2026 AWS Student Builder Group · RV University
          </p>
          <p className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            Built with ❤️ by the tech team
          </p>
          <p className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            Not affiliated with Amazon Web Services, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}

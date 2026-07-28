"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const W = { maxWidth: 1160, margin: "0 auto", padding: "0 clamp(24px, 5vw, 60px)" } as const;

const MeetupSvg = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.42 8.35a3.84 3.84 0 0 0-1.07-2.6 4.3 4.3 0 0 0-2.84-1.16 4.86 4.86 0 0 0-3.32 1.34 3.53 3.53 0 0 0-2.07-.84A3.67 3.67 0 0 0 9.8 6.43 3.88 3.88 0 0 0 7.27 5a4.2 4.2 0 0 0-3.15 1.48A4.18 4.18 0 0 0 3 9.47a5.53 5.53 0 0 0 .15 1.53c-1.34.8-2 2-2 3.41a3.6 3.6 0 0 0 1.16 2.62 4.18 4.18 0 0 0 2.92 1.05 4.39 4.39 0 0 0 2.1-.53 4 4 0 0 0 3.32 1.63A4.27 4.27 0 0 0 14 17.65a5 5 0 0 0 2.37.58 4.5 4.5 0 0 0 3.34-1.32 4.31 4.31 0 0 0 1.17-3 4.58 4.58 0 0 0-.58-2.27 4.13 4.13 0 0 0 2.12-3.29zM18.8 12.63a1 1 0 0 1 .3.71 1.25 1.25 0 0 1-.36.93 1.27 1.27 0 0 1-.9.37 1.29 1.29 0 0 1-.92-.37 1.25 1.25 0 0 1-.36-.93V9.75h-2v3.59a1 1 0 0 1-.3.71 1.29 1.29 0 0 1-.9.37 1.27 1.27 0 0 1-.9-.37 1.25 1.25 0 0 1-.36-.93V9.75h-2v3.59a1 1 0 0 1-.32.73 1.3 1.3 0 0 1-1.84 0 1.23 1.23 0 0 1-.32-.73v-1.7a1.69 1.69 0 0 1 .45-1.19 1.63 1.63 0 0 1 1.23-.49 1.51 1.51 0 0 1 1.1.43 1.52 1.52 0 0 1 1.11-.43 1.57 1.57 0 0 1 1.12.44A1.66 1.66 0 0 1 18.8 9v3.63z" />
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
    { l: "Projects", h: "#projects" }, { l: "Blog", h: "#blog" }, { l: "Join", h: "#footer-social" },
  ]},
  { heading: "Community", items: [
    { l: "WhatsApp Community", h: "#" },
    { l: "Meetup", h: "https://www.meetup.com/aws-sbg-at-rv-university/", ext: true },
    { l: "LinkedIn Page", h: "#" },
    { l: "Instagram", h: "#" },
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
  { Icon: MeetupSvg,   label: "Meetup",    href: "https://www.meetup.com/aws-sbg-at-rv-university/" },
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
                  <Image src="/logo-sbg.svg" alt="AWS SBG Logo" width={36} height={36} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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

              <div id="footer-social" style={{ display: "flex", gap: 8 }}>
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

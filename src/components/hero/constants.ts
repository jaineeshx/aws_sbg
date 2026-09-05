import { BootLine, SectionItem, StatItem, TerminalLine } from "./types";

/* shared layout constants */
export const W = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "0 clamp(24px, 5vw, 60px)",
} as const;

/* initial boot animation lines*/
export const INITIAL_BOOT_LINES: BootLine[] = [
  { t: "whoami", c: "", d: 150, isCommand: true },
  { t: "→ builder @ RV University", c: "#FF9900", d: 650 },
  { t: "", c: "", d: 850 },
  { t: "./run --community aws-sbg", c: "", d: 1050, isCommand: true },
  { t: "Initializing AWS cloud stack...", c: "rgba(255,255,255,0.28)", d: 1350 },
  { t: "██████████████████  100%", c: "#FF9900", d: 1900 },
  { t: "", c: "", d: 2100 },
  { t: "✓ builders shipping    200+", c: "#22C55E", d: 2300 },
  { t: "✓ cloud projects live  15+", c: "#22C55E", d: 2550 },
  { t: "✓ certifications       40+", c: "#22C55E", d: 2800 },
  { t: "", c: "", d: 3000 },
  { t: "Ready. Type 'ls' or 'help' below.", c: "#38BDF8", d: 3250 },
];

/* website navigation sections for terminal*/
export const SECTIONS: SectionItem[] = [
  { name: "hero", id: "hero", desc: "top of page & live terminal" },
  { name: "manifesto", id: "manifesto", desc: "builder mission & principles" },
  { name: "projects", id: "projects", desc: "student cloud builds (15+)" },
  { name: "events", id: "events", desc: "workshops, bootcamps & hackathons (8)" },
  { name: "team", id: "team", desc: "student leads & core members" },
  { name: "blog", id: "blog", desc: "technical writeups & deep-dives" },
  { name: "join", id: "footer-social", desc: "membership & community links" },
];

/* terminal command data*/
export const STAT_PROOFS: Record<string, { cmd: string; lines: TerminalLine[] }> = {
  members: {
    cmd: "members",
    lines: [
      { t: "200+ builders", c: "#FF9900" },
      { t: "RV University · Bangalore, IN", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "COMMUNITY STATUS: ACTIVE ✓", c: "#22C55E" },
      { t: "DISCORD & MEETUP: SYNCHRONIZED", c: "rgba(255,255,255,0.4)" },
    ],
  },
  projects: {
    cmd: "projects",
    lines: [
      { t: "15+ projects shipped", c: "#FF9900" },
      { t: "AWS infrastructure deployed", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "PIPELINE: PROD VERIFIED ✓", c: "#22C55E" },
      { t: "STACK: LAMBDA · CDK · S3 · DYNAMODB", c: "rgba(255,255,255,0.4)" },
    ],
  },
  certs: {
    cmd: "certs",
    lines: [
      { t: "40+ certifications earned", c: "#FF9900" },
      { t: "Cloud Practitioner & Solutions Architect", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "EXAM PASS RATE: 94% ✓", c: "#22C55E" },
      { t: "SKILL ACCREDITATION: VERIFIED", c: "rgba(255,255,255,0.4)" },
    ],
  },
  events: {
    cmd: "events",
    lines: [
      { t: "8 community events hosted", c: "#FF9900" },
      { t: "Hands-on bootcamps & AWS build nights", c: "rgba(255,255,255,0.7)" },
      { t: "", c: "" },
      { t: "ATTENDANCE RATE: 98% ✓", c: "#22C55E" },
      { t: "NEXT SESSION: UPCOMING", c: "#38BDF8" },
    ],
  },
};

/* stat strip numbers */
export const HERO_STATS: StatItem[] = [
  { val: "200+", label: "Members" },
  { val: "15+", label: "Projects" },
  { val: "40+", label: "Certs" },
  { val: "8", label: "Events" },
];

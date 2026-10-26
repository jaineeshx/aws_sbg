"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as RKeyboardEvent,
  type MouseEvent as RMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  UsersRound,
  X,
} from "lucide-react";

const W = {
  maxWidth: 1160,
  margin: "0 auto",
  padding: "0 clamp(24px, 5vw, 60px)",
} as const;
const S = {
  padding: "clamp(100px, 14vh, 180px) 0",
  position: "relative" as const,
};
const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 300, damping: 36 } as const;
const ROTATE_PERCENTAGE = 150;

/* Photos are served from /public when available. The Drive thumbnail is a
   graceful fallback while the local image pack is being prepared. */
const driveThumbnail = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;

interface Head {
  name: string;
  role: string;
  photo: string;
  github: string;
  linkedin: string;
  unit: string;
  view: string;
}

const HEADS: Head[] = [
  {
    name: "Nishit Patel",
    role: "Group Leader",
    photo: "/images/team/leads/nishit-patel.webp",
    github: "https://github.com/nish-debug15",
    linkedin: "https://www.linkedin.com/in/nishit-patell/",
    unit: "Command",
    view: "crew",
  },
  {
    name: "Pranav Adhikari",
    role: "Secretary",
    photo: "/images/team/leads/pranav-adhikari.webp",
    github: "https://github.com/Pranav591",
    linkedin: "https://www.linkedin.com/in/pranav-adhikari-055b7a328/",
    unit: "Secretariat",
    view: "crew",
  },
  {
    name: "Jaineesh Patel",
    role: "Director of Technology",
    photo: "/images/team/leads/jaineesh-patel.webp",
    github: "https://github.com/jaineeshx",
    linkedin: "https://www.linkedin.com/in/jaineesh-patel-6471902a7/",
    unit: "Technology",
    view: "technology",
  },
  {
    name: "Ishani V Sheshgiri",
    role: "Director of Growth",
    photo: "/images/team/members/ishani-v-sheshgiri.webp",
    github: "",
    linkedin: "https://www.linkedin.com/in/ishani-v-sheshgiri-92618941a/",
    unit: "Growth",
    view: "growth",
  },
  {
    name: "Shriya Narasipura",
    role: "Director of Events & Operations",
    photo: "/images/team/members/shriya-narasipura.webp",
    github: "",
    linkedin: "https://www.linkedin.com/in/shriya-narasipura/",
    unit: "Events & Ops",
    view: "events",
  },
  {
    name: "Aditya P Dixit",
    role: "Director of Product",
    photo: "/images/team/leads/aditya-p-dixit.webp",
    github: "",
    linkedin: "https://www.linkedin.com/in/aditya-p-dixit/",
    unit: "Product",
    view: "product",
  },
];

type DeptId = "technology" | "growth" | "events" | "product";

const DEPTS: { id: DeptId; label: string; head: number }[] = [
  { id: "technology", label: "Tech Team", head: 2 },
  { id: "growth", label: "Growth Team", head: 3 },
  { id: "events", label: "Events Team", head: 4 },
  { id: "product", label: "Product Team", head: 5 },
];

interface CrewMember {
  name: string;
  dept: DeptId;
  photo: string;
  fallbackPhoto: string;
}

/* Real roster supplied for the AWS SBG people section (17 members). */
const CREW: CrewMember[] = [
  {
    name: "Lipika B Prakash",
    dept: "product",
    photo: "/images/team/members/lipika-b-prakash.webp",
    fallbackPhoto: driveThumbnail("1YvijlXYv0jwJhemV6lxaWlXErVJ76KRm"),
  },
  {
    name: "Amruthesh C Hiremath",
    dept: "technology",
    photo: "/images/team/members/amruthesh-c-hiremath.webp",
    fallbackPhoto: driveThumbnail("1ajOGtlUIfp59SLiCK_KhbL3d78dDm6ya"),
  },
  {
    name: "Akash Bisht",
    dept: "technology",
    photo: "/images/team/members/akash-bisht.webp",
    fallbackPhoto: driveThumbnail("173m6msSFoIeW8nhO0foIv0N4k7_jrAIa"),
  },
  {
    name: "Pragna Payal Sahu",
    dept: "events",
    photo: "/images/team/members/pragna-payal-sahu.webp",
    fallbackPhoto: driveThumbnail("1BszljSMpAbaTZB-d0vYQc0gIeZ1RdWbk"),
  },
  {
    name: "Nandini Reddy",
    dept: "technology",
    photo: "/images/team/members/nandini-reddy.webp",
    fallbackPhoto: driveThumbnail("1KA0XaeqLIGGBA16M98inSCzALK2WjE90"),
  },
  {
    name: "Deeshna J",
    dept: "events",
    photo: "/images/team/members/deeshna-j.webp",
    fallbackPhoto: driveThumbnail("1MRyAxWaP-ae4j_NE6bJjaDlF_0Ir6lGY"),
  },
  {
    name: "Ishani V Sheshgiri",
    dept: "growth",
    photo: "/images/team/members/ishani-v-sheshgiri.webp",
    fallbackPhoto: driveThumbnail("13zZ8A1gxkJ-2uzZPDwD5lHafCm2aogb4"),
  },
  {
    name: "Amrithaa M",
    dept: "events",
    photo: "/images/team/members/amrithaa-m.webp",
    fallbackPhoto: driveThumbnail("1RYkMEhKOOZoP_xlH-SbYcAEgkXyUJNyo"),
  },
  {
    name: "Neha Ainapur",
    dept: "growth",
    photo: "/images/team/members/neha-ainapur.webp",
    fallbackPhoto: driveThumbnail("1MUuLM-a6elXLLMYktp-BaC-ECLKPzJlS"),
  },
  {
    name: "Kunal Kajrekar",
    dept: "product",
    photo: "/images/team/members/kunal-kajrekar.webp",
    fallbackPhoto: driveThumbnail("1Y51l6QLUYNk8b4T7uxQLeK7bya_GDRO2"),
  },
  {
    name: "Aaravi Keshri",
    dept: "events",
    photo: "/images/team/members/aaravi-keshri.webp",
    fallbackPhoto: driveThumbnail("1W8C28EaIUXgFA1hdX53dWpoSRhfOUnvk"),
  },
  {
    name: "Peddinti charani preethi",
    dept: "events",
    photo: "/images/team/members/peddinti-charani-preethi.webp",
    fallbackPhoto: driveThumbnail("1OBxWls1CwdCTnoP2oBmAEuIWM2LRY-qU"),
  },
  {
    name: "Chirag S",
    dept: "technology",
    photo: "/images/team/members/chirag-s.webp",
    fallbackPhoto: driveThumbnail("1POvNCiRahjFEIsPKu6091ijvh33TCHMf"),
  },
  {
    name: "Vijayashree R",
    dept: "growth",
    photo: "/images/team/members/vijayashree-r.webp",
    fallbackPhoto: driveThumbnail("1ENGetuLEfF_-LboK_yzO_4RuUYwVqN0z"),
  },
  {
    name: "Shriya Narasipura",
    dept: "events",
    photo: "/images/team/members/shriya-narasipura.webp",
    fallbackPhoto: driveThumbnail("14VRsJjjGPOsu-Xy2ytRWD_BKRIZLVIjl"),
  },
  {
    name: "Kadiyala Udaya Sree",
    dept: "growth",
    photo: "/images/team/members/kadiyala-udaya-sree.webp",
    fallbackPhoto: driveThumbnail("1djGABOpP6G-opu98JojnAFb_unaQXXQm"),
  },
  {
    name: "Vainavi Vaibav",
    dept: "events",
    photo: "/images/team/members/vainavi-vaibav.webp",
    fallbackPhoto: driveThumbnail("1Xr71R_LJUG8OD9_V6Ra5uBU4EnREnsN5"),
  },
];

const VIEWS: { id: string; label: string; dept: DeptId | null }[] = [
  { id: "crew", label: "Everyone", dept: null },
  ...DEPTS.map((dept) => ({
    id: dept.id,
    label: dept.label,
    dept: dept.id as DeptId | null,
  })),
];

const mono = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
const ghHandle = (url: string) =>
  url ? `@${url.replace(/\/+$/, "").split("/").pop()}` : "";
const inSlug = (url: string) =>
  url ? `in/${url.replace(/\/+$/, "").split("/").pop()}` : "";
const clampN = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const pad2 = (value: number) => String(value).padStart(2, "0");
const deptLabel = (dept: DeptId) =>
  DEPTS.find((item) => item.id === dept)?.label ?? "Team";
const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

function Portrait({
  src,
  fallbackSrc,
  name,
  imageClass,
  placeholderClass,
  loading = "lazy",
  priority = false,
  decorative = false,
}: {
  src: string;
  fallbackSrc?: string;
  name: string;
  imageClass: string;
  placeholderClass: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  decorative?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);

  const source = attempt === 0 ? src || fallbackSrc || "" : attempt === 1 ? fallbackSrc || "" : "";
  if (!source) {
    return (
      <div className={placeholderClass} aria-hidden="true">
        <span>{mono(name)}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={imageClass}
      src={source}
      alt={decorative ? "" : `${name} portrait`}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setAttempt((value) => Math.min(value + 1, 2))}
    />
  );
}


function GithubMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.227 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeadCard({
  head,
  index,
  total,
  x,
  width,
  padding,
  active,
  reducedMotion,
  onGo,
  onExplore,
}: {
  head: Head;
  index: number;
  total: number;
  x: MotionValue<number>;
  width: number;
  padding: number;
  active: boolean;
  reducedMotion: boolean;
  onGo: (index: number) => void;
  onExplore: (view: string, element: HTMLElement) => void;
}) {
  const range = useMemo(
    () => [(index - 1) * width, index * width, (index + 1) * width],
    [index, width],
  );
  const scale = useTransform(x, range, [0.8, 1, 0.8], { clamp: true });
  const rotateY = useTransform(
    x,
    range,
    reducedMotion ? [0, 0, 0] : [-ROTATE_PERCENTAGE, 0, -ROTATE_PERCENTAGE],
    { clamp: true },
  );
  const opacity = useTransform(x, range, [0.5, 1, 0.5], { clamp: true });
  const tuck = useTransform(
    x,
    range,
    reducedMotion ? [0, 0, 0] : [width * 0.2, 0, -width * 0.2],
    { clamp: true },
  );
  const cardX = useTransform(x, (value) => padding + index * width - value);
  const exploreRef = useRef<HTMLButtonElement>(null);
  const hasGithub = Boolean(head.github);

  return (
    <motion.div className="pw-cardx" style={{ x: cardX, width }}>
      <motion.div
        className="pw-card3d"
        style={{ scale, rotateY, transformPerspective: 1200 }}
        aria-hidden={!active}
        onClick={() => {
          if (!active) onGo(index);
        }}
      >
        <motion.div className="pw-cardd" style={{ x: tuck }}>
          <motion.article
            className="pw-face pw-front"
            style={{ opacity }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total} — ${head.name}, ${head.role}`}
          >
            <div className="pw-ph">
              <Portrait
                src={head.photo}
                name={head.name}
                imageClass="pw-ph-img"
                placeholderClass="pw-ph-mono"
                priority={active}
                decorative
              />
              <span className="pw-ph-chip">AWS SBG · CORE</span>
              <span className="pw-ph-unit">{head.unit}</span>
              <span className="pw-ph-index" aria-hidden="true">{pad2(index + 1)}</span>
            </div>

            <div className="pw-info">
              <h3 className="pw-name">{head.name}</h3>
              <p className="pw-role">{head.role}</p>
              <div className="pw-handles">
                {ghHandle(head.github) && (
                  <span className="pw-h"><GithubMark size={11} />{ghHandle(head.github)}</span>
                )}
                {inSlug(head.linkedin) && (
                  <span className="pw-h"><LinkedInMark size={11} />{inSlug(head.linkedin)}</span>
                )}
              </div>
              <div className={`pw-links${hasGithub ? "" : " solo"}`}>
                {hasGithub && (
                  <a
                    className="pw-btn"
                    href={head.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={active ? 0 : -1}
                    aria-label={`${head.name} on GitHub`}
                  >
                    <GithubMark size={13} />GitHub
                  </a>
                )}
                {head.linkedin && (
                  <a
                    className={`pw-btn${hasGithub ? "" : " gh-off"}`}
                    href={head.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={active ? 0 : -1}
                    aria-label={`${head.name} on LinkedIn`}
                  >
                    <LinkedInMark size={13} />LinkedIn
                  </a>
                )}
              </div>
              <button
                ref={exploreRef}
                type="button"
                className="pw-explore"
                tabIndex={active ? 0 : -1}
                onClick={(event) => {
                  event.stopPropagation();
                  onExplore(head.view, exploreRef.current ?? event.currentTarget);
                }}
              >
                {head.view === "crew" ? "Meet the crew" : "Explore team"}
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.article>

          <motion.div className="pw-face pw-back" style={{ opacity }} aria-hidden="true">
            <span className="pw-back-mono">{mono(head.name)}</span>
            <span className="pw-back-unit">{head.unit}</span>
            <span className="pw-back-idx">{pad2(index + 1)}</span>
            <span className="pw-back-mark" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function CrewWall({
  initialView,
  reducedMotion,
  onClose,
}: {
  initialView: string;
  reducedMotion: boolean;
  onClose: () => void;
}) {
  const startIndex = Math.max(0, VIEWS.findIndex((view) => view.id === initialView));
  const [viewIndex, setViewIndex] = useState(startIndex);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const viewIndexRef = useRef(viewIndex);
  const fine = useMemo(() => finePointer(), []);
  const view = VIEWS[viewIndex];
  const selectedDept = view.dept;
  const department = selectedDept ? DEPTS.find((item) => item.id === selectedDept) : null;
  const lead = department ? HEADS[department.head] : null;

  const members = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return CREW.filter((member) => {
      const matchesDept = !selectedDept || member.dept === selectedDept;
      const searchable = `${member.name} ${deptLabel(member.dept)}`.toLocaleLowerCase();
      return matchesDept && (!normalizedQuery || searchable.includes(normalizedQuery));
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [query, selectedDept]);

  const goView = useCallback((delta: number) => {
    const next = (viewIndexRef.current + delta + VIEWS.length) % VIEWS.length;
    viewIndexRef.current = next;
    setViewIndex(next);
  }, []);

  const setView = useCallback((next: number) => {
    viewIndexRef.current = next;
    setViewIndex(next);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop?.();
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      lenis?.start?.();
    };
  }, []);

  useEffect(() => {
    rootRef.current?.querySelector<HTMLElement>("[data-close]")?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goView(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goView(-1);
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [goView, onClose]);

  const marquee = selectedDept
    ? `${view.label} · ${pad2(members.length)} members · led by ${lead?.name ?? "the core team"} · `
    : `${view.label} · ${pad2(members.length)} members · four teams · one builder community · `;

  return createPortal(
    <motion.div
      className="pw-ov"
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="AWS SBG team directory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
    >
      <div className="pw-ov-bg" aria-hidden="true">
        <div className="pw-ov-grid" />
        <div className="pw-ov-word" key={`${view.id}-word`}>{view.label}</div>
      </div>

      <div className="pw-ov-in" data-lenis-prevent tabIndex={-1}>
        <header className="pw-ov-head">
          <div className="pw-ov-heading">
            <span className="pw-ov-kicker">People index / 2026–27</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h3
                key={view.id}
                className="pw-ov-title"
                initial={reducedMotion ? false : { y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reducedMotion ? undefined : { y: -12, opacity: 0 }}
                transition={{ duration: 0.26, ease: EASE }}
              >
                {selectedDept ? <>{view.label}<sup>{pad2(CREW.filter((m) => m.dept === selectedDept).length)}</sup></> : <>Meet the <span>builders.</span></>}
              </motion.h3>
            </AnimatePresence>
            <p className="pw-ov-sub">
              {lead ? (
                <>The people shaping {view.label.toLowerCase()} — led by <b>{lead.name}</b>.</>
              ) : (
                <>The people behind the workshops, ideas, launches, and late-night fixes.</>
              )}
            </p>
          </div>
          <button type="button" className="pw-ov-close" data-close onClick={onClose} aria-label="Close team directory">
            <X size={18} />
          </button>
        </header>

        <div className="pw-directory-controls">
          <div className="pw-pills" role="tablist" aria-label="Filter members by team">
            {VIEWS.map((item, index) => {
              const count = item.dept
                ? CREW.filter((member) => member.dept === item.dept).length
                : CREW.length;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={index === viewIndex}
                  className={`pw-pill${index === viewIndex ? " on" : ""}`}
                  onClick={() => setView(index)}
                >
                  {item.label}<span>{pad2(count)}</span>
                </button>
              );
            })}
          </div>

          <label className="pw-search">
            <Search size={15} aria-hidden="true" />
            <span className="pw-sr">Search people or teams</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find someone…"
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button type="button" className="pw-search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </label>
        </div>

        <div className="pw-directory-meta" aria-live="polite">
          <span><UsersRound size={13} /> {members.length} {members.length === 1 ? "person" : "people"}</span>
          <span>{query ? `Matches for “${query.trim()}”` : selectedDept ? `Showing ${view.label}` : ""}</span>
        </div>

        {members.length ? (
          <motion.div className="pw-wall" layout>
            <AnimatePresence mode="popLayout">
              {members.map((member, index) => (
                <motion.article
                  key={member.name}
                  layout
                  className="pw-person"
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: reducedMotion ? 0.12 : 0.32, delay: reducedMotion ? 0 : Math.min(index * 0.025, 0.2), ease: EASE }}
                  whileHover={fine && !reducedMotion ? { y: -5 } : undefined}
                >
                  <div className="pw-person-photo">
                    <Portrait
                      src={member.photo}
                      fallbackSrc={member.fallbackPhoto}
                      name={member.name}
                      imageClass="pw-person-img"
                      placeholderClass="pw-person-fallback"
                    />
                    <span className="pw-person-index">{pad2(CREW.findIndex((item) => item.name === member.name) + 1)}</span>
                    <span className="pw-person-corner" aria-hidden="true" />
                    <span className="pw-person-shine" aria-hidden="true" />
                    <div className="pw-person-caption">
                      <span className="pw-person-team">{deptLabel(member.dept)}</span>
                      <h4>{member.name}</h4>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="pw-empty">
            <Search size={21} />
            <strong>No one found</strong>
            <p>Try another name or switch to a different team.</p>
            <button type="button" className="pw-empty-reset" onClick={() => { setQuery(""); setView(0); }}>
              Reset filters <ArrowRight size={14} />
            </button>
          </div>
        )}

        <p className="pw-sr" aria-live="polite">
          {view.label}: {members.length} matching members.
        </p>
      </div>

      <div className="pw-mq" aria-hidden="true">
        <div className={`pw-mq-track${reducedMotion ? " still" : ""}`}>
          <span>{marquee.repeat(5)}</span>
          <span>{marquee.repeat(5)}</span>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

export default function Team() {
  const reducedMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-12% 0px" });

  const totalHeads = HEADS.length;
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1160);
  const indexRef = useRef(0);
  const widthRef = useRef(340);
  const dragRef = useRef({ moved: false, startX: 0 });
  const wheelLock = useRef(Number.NEGATIVE_INFINITY);
  const [overlayView, setOverlayView] = useState<string | null>(null);
  const overlayOriginRef = useRef<HTMLElement | null>(null);

  const share = viewportWidth < 520 ? 0.8 : 0.72;
  const cardWidth = Math.round(clampN(viewportWidth * share, 268, 380));
  const cardSpacing = cardWidth < 320 ? 10 : 18;
  const centeringPadding = Math.round((viewportWidth - cardWidth) / 2);

  useEffect(() => {
    widthRef.current = cardWidth;
  }, [cardWidth]);

  const go = useCallback((targetIndex: number) => {
    const next = clampN(targetIndex, 0, totalHeads - 1);
    indexRef.current = next;
    setIndex(next);
    animate(x, next * widthRef.current, reducedMotion ? { duration: 0 } : SPRING);
  }, [reducedMotion, totalHeads, x]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => setViewportWidth(Math.round(element.clientWidth)), 80);
    });
    observer.observe(element);
    setViewportWidth(Math.round(element.clientWidth));
    return () => {
      if (timeout) clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    x.jump(indexRef.current * cardWidth);
  }, [cardWidth, x]);

  /*
   * Scroll-anchored carousel:
   * - While there is a card in the requested direction, consume wheel input and
   *   advance one card. This prevents the page (or Lenis) from scrolling the
   *   section away while someone is navigating the carousel.
   * - At the first/last card, allow the same wheel input to pass through so the
   *   page continues naturally. `data-lenis-prevent` makes that boundary scroll
   *   native instead of letting Lenis race this handler.
   */
  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
      if (Math.abs(delta) < 1) return;

      const direction = delta > 0 ? 1 : -1;
      const current = indexRef.current;
      const atStart = current === 0 && direction < 0;
      const atEnd = current === totalHeads - 1 && direction > 0;
      if (atStart || atEnd) return;

      event.preventDefault();
      event.stopPropagation();

      // Consume trackpad micro-deltas but only commit a slide after a meaningful input.
      if (Math.abs(delta) < 4) return;
      const now = performance.now();
      if (now - wheelLock.current < 460) return;
      wheelLock.current = now;
      go(current + direction);
    };

    element.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => element.removeEventListener("wheel", onWheel, true);
  }, [go, totalHeads]);

  const onPanStart = () => {
    x.stop();
    dragRef.current = { moved: false, startX: x.get() };
  };
  const onPan = (_event: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 6) dragRef.current.moved = true;
    const width = widthRef.current;
    x.set(clampN(dragRef.current.startX - info.offset.x, -width * 0.3, (totalHeads - 0.7) * width));
  };
  const onPanEnd = (_event: unknown, info: PanInfo) => {
    const projected = x.get() - info.velocity.x * 0.22;
    go(Math.round(projected / widthRef.current));
  };
  const onClickCapture = (event: RMouseEvent) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };
  const onKeyDown = (event: RKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(indexRef.current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(indexRef.current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(totalHeads - 1);
    }
  };

  const openDirectory = useCallback((view: string, element: HTMLElement) => {
    overlayOriginRef.current = element;
    setOverlayView(view);
  }, []);
  const closeDirectory = useCallback(() => {
    setOverlayView(null);
    overlayOriginRef.current?.focus({ preventScroll: true });
  }, []);

  const activeHead = HEADS[index];

  return (
    <section id="team" style={S} ref={sectionRef}>
      <style>{PW_CSS}</style>
      <div className="pw-field" aria-hidden="true">
        <div className="pw-grid" />
        <div className="pw-spot" />
        <div className="pw-grain" />
        <div className="pw-vig" />
      </div>

      <div style={W} className="pw-wrap">
        <div className="pw-header">
          <div className="pw-intro">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="pw-section-label-wrap"
            >
              <span className="section-label">The Team</span>
            </motion.div>
            <h2 className="pw-h2">
              <span className="pw-mask">
                <motion.span
                  className="pw-l"
                  initial={reducedMotion ? false : { y: "110%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
                >
                  People who
                </motion.span>
              </span>
              <span className="pw-mask">
                <motion.span
                  className="pw-l"
                  initial={reducedMotion ? false : { y: "110%" }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.17, ease: EASE }}
                >
                  <span className="pw-acc">
                    <span className="pw-acc-base">actually ship.</span>
                    <motion.span
                      className="pw-acc-grad"
                      aria-hidden="true"
                      initial={reducedMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
                      animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                      transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
                    >
                      actually ship.
                    </motion.span>
                  </span>
                </motion.span>
              </span>
            </h2>
            <motion.p
              className="pw-sub"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            >
              A community of builders turning ideas into workshops, tools, and real-world projects.
            </motion.p>
          </div>

          <motion.dl
            className="pw-meta"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.42, duration: 0.6, ease: EASE }}
          >
            <dt>Unit</dt><dd>RV University · BLR</dd>
            <dt>Cycle</dt><dd>2026–27</dd>
          </motion.dl>
        </div>

        <motion.div
          ref={viewportRef}
          className="pw-vp"
          data-lenis-prevent
          role="group"
          aria-roledescription="carousel"
          aria-label="Core leads"
          tabIndex={0}
          style={{ ["--cw" as string]: `${cardWidth}px`, ["--sp" as string]: `${cardSpacing}px` }}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          onPanStart={onPanStart}
          onPan={onPan}
          onPanEnd={onPanEnd}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
        >
          <span className="pw-sr" aria-live="polite">
            {pad2(index + 1)} of {pad2(totalHeads)} — {activeHead.name}, {activeHead.role}
          </span>
          {HEADS.map((head, itemIndex) => (
            <motion.div
              key={head.name}
              className="pw-slot"
              style={{ width: cardWidth }}
              initial={reducedMotion ? false : { y: 42, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.08 + itemIndex * 0.06, ease: EASE }}
            >
              <LeadCard
                key={`${viewportWidth}-${head.name}`}
                head={head}
                index={itemIndex}
                total={totalHeads}
                x={x}
                width={cardWidth}
                padding={centeringPadding}
                active={itemIndex === index}
                reducedMotion={reducedMotion}
                onGo={go}
                onExplore={openDirectory}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pw-ctl"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
        >
          <div className="pw-ctl-l">
            <button type="button" className="pw-nav" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous lead">
              <ArrowLeft size={15} />
            </button>
            <button type="button" className="pw-nav" onClick={() => go(index + 1)} disabled={index === totalHeads - 1} aria-label="Next lead">
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="pw-ctl-r">
            <div className="pw-ticks" role="tablist" aria-label="Go to lead">
              {HEADS.map((head, itemIndex) => (
                <button
                  key={head.name}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  className={`pw-tick${itemIndex === index ? " on" : itemIndex < index ? " done" : ""}`}
                  onClick={() => go(itemIndex)}
                  aria-label={`Show ${head.name}`}
                />
              ))}
            </div>
            <div className="pw-bar" aria-hidden="true">
              <motion.div
                className="pw-bar-f"
                animate={{ scaleX: totalHeads > 1 ? index / (totalHeads - 1) : 1 }}
                transition={reducedMotion ? { duration: 0 } : SPRING}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pw-foot"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.74, duration: 0.6, ease: EASE }}
        >
          <button type="button" className="pw-cta" onClick={() => openDirectory("crew", document.activeElement instanceof HTMLElement ? document.activeElement : viewportRef.current!)}>
            Explore everyone <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {overlayView && (
          <CrewWall key="crew-directory" initialView={overlayView} reducedMotion={reducedMotion} onClose={closeDirectory} />
        )}
      </AnimatePresence>
    </section>
  );
}

const PW_CSS = `
.pw-field{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.pw-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:78px 78px;-webkit-mask-image:radial-gradient(ellipse 75% 60% at 50% 36%,#000 25%,transparent 75%);mask-image:radial-gradient(ellipse 75% 60% at 50% 36%,#000 25%,transparent 75%)}
.pw-spot{position:absolute;inset:0;background:radial-gradient(680px 460px at 74% -8%,rgba(255,153,0,.06),transparent 62%)}
.pw-vig{position:absolute;inset:0;background:radial-gradient(ellipse 120% 95% at 50% 44%,transparent 52%,rgba(3,3,8,.5) 100%)}
.pw-grain{position:absolute;inset:0;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")}
.pw-wrap{position:relative;z-index:1}
.pw-header{display:flex;align-items:flex-end;justify-content:space-between;gap:48px;margin-bottom:46px}
.pw-intro{min-width:0}
.pw-section-label-wrap{margin-bottom:24px}
.pw-h2{font-size:clamp(44px,6.4vw,84px);font-weight:800;line-height:1.01;letter-spacing:-.045em;color:#fff;margin:22px 0 0}
.pw-mask{display:block;overflow:hidden}
.pw-l{display:block}
.pw-acc{position:relative;display:inline-block}
.pw-acc-base{color:rgba(255,255,255,.92)}
.pw-acc-grad{position:absolute;left:0;top:0;width:100%;background:linear-gradient(125deg,#FF9900,#FF6200 55%,#FFBE00);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;pointer-events:none}
.pw-sub{margin-top:22px;font-size:16px;line-height:1.7;color:rgba(255,255,255,.48);max-width:470px}
.pw-meta{flex-shrink:0;display:grid;grid-template-columns:auto auto;gap:7px 18px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;padding-bottom:8px}
.pw-meta dt{color:rgba(255,255,255,.27);margin:0}
.pw-meta dd{color:rgba(255,255,255,.62);text-align:right;margin:0}
.pw-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.pw-vp{position:relative;height:calc(var(--cw) * 1.34 + 46px);overflow:hidden;touch-action:pan-y;-webkit-user-select:none;user-select:none;cursor:grab;margin-top:8px;background:transparent!important;border:0!important;box-shadow:none!important;outline:0;isolation:isolate}
.pw-vp::before,.pw-vp::after{content:none!important;background:transparent!important;box-shadow:none!important}
.pw-slot{background:transparent!important}
.pw-vp:active{cursor:grabbing}
.pw-vp:focus-visible{outline:1px solid rgba(255,153,0,.65);outline-offset:10px;border-radius:20px}
.pw-slot{position:absolute;left:0;top:23px;z-index:1;pointer-events:none}
.pw-cardx{position:relative;height:calc(var(--cw) * 1.34);will-change:transform}
.pw-card3d{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform;pointer-events:auto}
.pw-cardd{position:absolute;inset:var(--sp);transform-style:preserve-3d}
.pw-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 50px -18px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.07)}
.pw-front{background:linear-gradient(180deg,#0E1119 0%,#090B12 100%)}
.pw-back{transform:rotateY(180deg);align-items:center;justify-content:center;border-color:rgba(255,153,0,.28);box-shadow:0 24px 50px -18px rgba(0,0,0,.65),inset 0 0 0 1px rgba(255,153,0,.06),inset 0 1px 0 rgba(255,153,0,.18);background:radial-gradient(90% 70% at 50% 42%,rgba(255,153,0,.07),transparent 60%),repeating-linear-gradient(0deg,rgba(255,153,0,.045) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(255,153,0,.045) 0 1px,transparent 1px 22px),#0A0C13}
.pw-back-mono{font-size:calc(var(--cw) * .3);font-weight:800;letter-spacing:-.03em;color:transparent;-webkit-text-stroke:1.5px rgba(255,153,0,.75);line-height:1}
.pw-back-unit{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,153,0,.85);white-space:nowrap}
.pw-back-idx{position:absolute;top:12px;right:16px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:rgba(255,255,255,.35)}
.pw-back-mark{position:absolute;top:14px;left:16px;width:16px;height:16px;border-top:1px solid rgba(255,153,0,.55);border-left:1px solid rgba(255,153,0,.55)}
.pw-ph{position:relative;height:44%;min-height:0;overflow:hidden;background:#0A0C13}
.pw-ph::after{content:"";position:absolute;inset:auto 0 0;height:46%;background:linear-gradient(transparent,rgba(9,11,18,.92));pointer-events:none;z-index:1}
.pw-ph-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 32%;filter:grayscale(.24) contrast(1.04);transition:filter .45s ease,transform .7s cubic-bezier(.16,1,.3,1)}
.pw-cardd:hover .pw-ph-img{filter:none;transform:scale(1.035)}
.pw-ph-mono{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(120% 120% at 30% 18%,rgba(255,153,0,.13),transparent 55%),linear-gradient(160deg,#141826,#0A0C13)}
.pw-ph-mono span{font-size:calc(var(--cw) * .24);font-weight:800;letter-spacing:-.03em;line-height:1;background:linear-gradient(125deg,rgba(255,255,255,.95),rgba(255,255,255,.55) 60%,rgba(255,153,0,.85));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.pw-ph-chip,.pw-ph-unit{position:absolute;top:10px;font-family:'JetBrains Mono',monospace;font-size:7.5px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:4px 8px;border-radius:6px;background:rgba(5,6,10,.66);backdrop-filter:blur(4px);z-index:2;white-space:nowrap}
.pw-ph-chip{left:10px;color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.14)}
.pw-ph-unit{right:10px;color:#FF9900;border:1px solid rgba(255,153,0,.35)}
.pw-ph-index{position:absolute;right:12px;bottom:8px;z-index:2;font:700 44px/1 'Space Grotesk',sans-serif;letter-spacing:-.07em;color:rgba(255,255,255,.14)}
.pw-info{flex:1;min-height:0;display:flex;flex-direction:column;gap:7px;padding:15px 16px 14px}
.pw-name{font-size:calc(var(--cw) * .066);font-weight:800;letter-spacing:-.025em;line-height:1.07;color:#fff;margin:0}
.pw-role{font-family:'JetBrains Mono',monospace;font-size:8.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#FF9900;margin:0}
.pw-handles{display:flex;flex-direction:column;gap:3px;margin-top:1px}
.pw-h{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.04em;color:rgba(255,255,255,.42);display:inline-flex;align-items:center;gap:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.pw-h svg{opacity:.6;color:#fff;flex:none}
.pw-links{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px}
.pw-links.solo{grid-template-columns:1fr}
.pw-btn{height:clamp(34px,calc(var(--cw) * .1),40px);display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(255,255,255,.13);border-radius:10px;background:rgba(255,255,255,.02);font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.75);text-decoration:none;cursor:pointer;transition:border-color .25s,background .25s,color .25s}
.pw-btn svg{color:rgba(255,255,255,.6);transition:color .25s;flex:none}
.pw-btn:hover{color:#fff;border-color:rgba(255,153,0,.55);background:rgba(255,153,0,.07)}
.pw-btn:hover svg{color:#FF9900}
.pw-explore{margin-top:auto;min-height:clamp(38px,calc(var(--cw) * .11),44px);display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(255,153,0,.5);border-radius:11px;background:linear-gradient(125deg,rgba(255,153,0,.16),rgba(255,98,0,.09));font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#FFB84D;cursor:pointer;transition:background .3s,color .3s,border-color .3s}
.pw-explore svg{transition:transform .3s cubic-bezier(.16,1,.3,1)}
.pw-explore:hover{background:linear-gradient(125deg,#FF9900,#FF6200);color:#0A0A0F;border-color:transparent}
.pw-explore:hover svg{transform:translateX(4px)}
.pw-ctl{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:20px;flex-wrap:wrap}
.pw-ctl-l{display:flex;align-items:center;gap:8px}
.pw-nav{width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.02);color:rgba(255,255,255,.75);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .25s,color .25s,background .25s}
.pw-nav:hover:not(:disabled){border-color:rgba(255,153,0,.55);color:#FF9900;background:rgba(255,153,0,.06)}
.pw-nav:disabled{opacity:.28;cursor:default}
.pw-ctl-r{display:flex;align-items:center;gap:16px}
.pw-ticks{display:flex;gap:6px}
.pw-tick{width:20px;height:3px;border-radius:2px;border:0;padding:0;background:rgba(255,255,255,.13);cursor:pointer;transition:background .3s,box-shadow .3s}
.pw-tick.done{background:rgba(255,255,255,.3)}
.pw-tick.on{background:linear-gradient(125deg,#FF9900,#FF6200);box-shadow:0 0 12px rgba(255,153,0,.45)}
.pw-bar{width:150px;height:2px;background:rgba(255,255,255,.09);border-radius:2px;overflow:hidden}
.pw-bar-f{width:100%;height:100%;background:linear-gradient(90deg,#FF9900,#FF6200);transform-origin:left center}
.pw-foot{display:flex;justify-content:flex-end;align-items:center;gap:18px;margin-top:24px;flex-wrap:wrap}
.pw-cta{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:transparent;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#FF9900;text-decoration:none;cursor:pointer;transition:transform .3s cubic-bezier(.16,1,.3,1),color .2s}
.pw-cta:hover{transform:translateX(5px);color:#FFBE00}
.pw-ov{position:fixed;inset:0;z-index:120;display:flex;flex-direction:column;background:rgba(3,3,8,.94);backdrop-filter:blur(22px) saturate(1.05);-webkit-backdrop-filter:blur(22px) saturate(1.05);overflow:hidden}
.pw-ov-bg{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.pw-ov-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px);background-size:64px 64px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%)}
.pw-ov-word{position:absolute;top:0;left:50%;transform:translateX(-50%);font-size:clamp(88px,21vw,280px);font-weight:800;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.04);white-space:nowrap;user-select:none}
.pw-ov-in{position:relative;z-index:1;flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;width:100%;max-width:1380px;margin:0 auto;padding:clamp(22px,4vh,48px) clamp(18px,5vw,64px) 42px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent;overscroll-behavior-y:contain;touch-action:pan-y;-webkit-overflow-scrolling:touch}
.pw-ov-in::-webkit-scrollbar{width:7px}
.pw-ov-in::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:6px}
.pw-ov-head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px}
.pw-ov-heading{min-width:0}
.pw-ov-kicker{font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:#FF9900}
.pw-ov-title{font-size:clamp(38px,6.4vw,76px);font-weight:800;letter-spacing:-.055em;line-height:1;color:#fff;margin:13px 0 12px}
.pw-ov-title span{background:linear-gradient(125deg,#FF9900,#FF6200 56%,#FFBE00);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.pw-ov-title sup{font-family:'JetBrains Mono',monospace;font-size:.25em;color:#FF9900;letter-spacing:.1em;vertical-align:super;margin-left:8px}
.pw-ov-sub{color:rgba(255,255,255,.5);font-size:14px;line-height:1.6;margin:0;max-width:600px}
.pw-ov-sub b{color:rgba(255,255,255,.9);font-weight:600}
.pw-ov-close{width:44px;height:44px;flex:none;border-radius:13px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.035);color:rgba(255,255,255,.82);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .25s,color .25s,transform .3s,background .25s}
.pw-ov-close:hover{border-color:rgba(255,153,0,.6);color:#FF9900;background:rgba(255,153,0,.05);transform:rotate(90deg)}
.pw-directory-controls{display:flex;justify-content:space-between;align-items:center;gap:18px;margin:30px 0 18px;flex-wrap:wrap}
.pw-pills{display:flex;align-items:center;gap:7px;overflow-x:auto;scrollbar-width:none;padding:3px 0;max-width:100%}
.pw-pills::-webkit-scrollbar{display:none}
.pw-pill{display:inline-flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:9px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;padding:10px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.13);color:rgba(255,255,255,.58);background:rgba(255,255,255,.015);white-space:nowrap;cursor:pointer;transition:color .25s,border-color .25s,background .25s}
.pw-pill span{font-size:8px;color:rgba(255,255,255,.35);transition:color .25s}
.pw-pill:hover{color:#fff;border-color:rgba(255,255,255,.3)}
.pw-pill.on{border-color:transparent;background:linear-gradient(125deg,#FF9900,#FF6200);color:#090A0F;font-weight:800}
.pw-pill.on span{color:rgba(9,10,15,.7)}
.pw-search{display:flex;align-items:center;gap:10px;min-width:min(270px,100%);width:270px;max-width:100%;padding:0 12px;height:42px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.025);color:rgba(255,255,255,.5);transition:border-color .2s,background .2s}
.pw-search:focus-within{border-color:rgba(255,153,0,.65);background:rgba(255,153,0,.035)}
.pw-search input{width:100%;min-width:0;background:transparent;border:0;outline:0;color:#fff;font:500 12px 'Space Grotesk',sans-serif}
.pw-search input::placeholder{color:rgba(255,255,255,.32)}
.pw-search input::-webkit-search-cancel-button{display:none}
.pw-search-clear{width:22px;height:22px;flex:none;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;color:rgba(255,255,255,.65);background:rgba(255,255,255,.08);cursor:pointer}
.pw-directory-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0 16px;border-top:1px solid rgba(255,255,255,.1);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.36)}
.pw-directory-meta span:first-child{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.74)}
.pw-directory-meta svg{color:#FF9900}
.pw-wall{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.55vw,22px);align-content:start;padding:0 0 28px}
.pw-person{min-width:0}
.pw-person-photo{position:relative;overflow:hidden;isolation:isolate;aspect-ratio:4/4.75;border:1px solid rgba(255,255,255,.11);border-radius:16px;background:#0B0E17;box-shadow:0 14px 36px -26px rgba(0,0,0,.7);transition:border-color .25s,box-shadow .3s,background .25s}
.pw-person:hover .pw-person-photo{border-color:rgba(255,153,0,.44);box-shadow:0 22px 45px -28px rgba(0,0,0,.9),0 0 0 1px rgba(255,153,0,.08)}
.pw-person-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:grayscale(.22) saturate(.88) contrast(1.04);transform:scale(1.001);transition:filter .4s ease,transform .7s cubic-bezier(.16,1,.3,1)}
.pw-person:hover .pw-person-img{filter:none;transform:scale(1.045)}
.pw-person-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(110% 80% at 30% 15%,rgba(255,153,0,.14),transparent 57%),linear-gradient(160deg,#161A26,#090B12)}
.pw-person-fallback span{font-size:clamp(32px,4vw,60px);font-weight:800;letter-spacing:-.065em;color:transparent;background:linear-gradient(135deg,rgba(255,255,255,.95),rgba(255,255,255,.47) 68%,rgba(255,153,0,.9));-webkit-background-clip:text;background-clip:text}
.pw-person-photo::after{content:"";position:absolute;inset:0;z-index:0;background:linear-gradient(180deg,rgba(4,5,9,.16),transparent 28%,rgba(4,5,9,.12) 48%,rgba(4,5,9,.92) 100%);pointer-events:none}
.pw-person-index{position:absolute;top:10px;left:11px;z-index:2;font:600 9px 'JetBrains Mono',monospace;letter-spacing:.13em;color:rgba(255,255,255,.8);text-shadow:0 1px 6px rgba(0,0,0,.6)}
.pw-person-corner{position:absolute;right:10px;top:10px;z-index:2;width:17px;height:17px;border-top:1px solid rgba(255,153,0,.72);border-right:1px solid rgba(255,153,0,.72);opacity:.8;transition:width .3s,height .3s,opacity .3s}
.pw-person:hover .pw-person-corner{width:24px;height:24px;opacity:1}
.pw-person-shine{position:absolute;inset:0;z-index:1;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.1) 48%,transparent 62%);transform:translateX(-125%);transition:transform .75s ease;pointer-events:none}
.pw-person:hover .pw-person-shine{transform:translateX(125%)}
.pw-person-caption{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:36px 13px 14px}
.pw-person-team{display:inline-flex;align-items:center;margin-bottom:7px;padding:5px 7px;border:1px solid rgba(255,153,0,.38);border-radius:5px;background:rgba(7,8,12,.62);backdrop-filter:blur(6px);font:600 8px 'JetBrains Mono',monospace;letter-spacing:.11em;text-transform:uppercase;color:#FFB84D}
.pw-person-caption h4{margin:0;color:#fff;font-size:clamp(12px,1.2vw,16px);line-height:1.25;letter-spacing:-.025em;font-weight:700;overflow-wrap:anywhere}
.pw-empty{min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:rgba(255,255,255,.48);border:1px dashed rgba(255,255,255,.12);border-radius:18px;padding:30px}
.pw-empty>svg{color:#FF9900;margin-bottom:14px}
.pw-empty strong{font-size:18px;color:#fff}
.pw-empty p{font-size:13px;line-height:1.6;margin:8px 0 18px}
.pw-empty-reset{display:inline-flex;align-items:center;gap:8px;background:transparent;border:0;color:#FF9900;font:600 10px 'JetBrains Mono',monospace;letter-spacing:.11em;text-transform:uppercase;cursor:pointer}
.pw-mq{position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.09);border-bottom:1px solid rgba(255,255,255,.09);overflow:hidden;padding:13px 0;background:rgba(255,255,255,.015)}
.pw-mq-track{display:flex;width:max-content;animation:pw-mq 32s linear infinite}
.pw-mq:hover .pw-mq-track{animation-play-state:paused}
.pw-mq-track.still{animation:none}
.pw-mq-track span{flex:none;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.35);white-space:pre}
@keyframes pw-mq{to{transform:translateX(-50%)}}
.pw-nav:focus-visible,.pw-tick:focus-visible,.pw-pill:focus-visible,.pw-ov-close:focus-visible,.pw-btn:focus-visible,.pw-explore:focus-visible,.pw-cta:focus-visible,.pw-search-clear:focus-visible,.pw-empty-reset:focus-visible{outline:2px solid #FF9900;outline-offset:3px}
.pw-search input:focus-visible{outline:none}
@media (max-width:1050px){.pw-wall{grid-template-columns:repeat(3,minmax(0,1fr))}.pw-directory-controls{align-items:flex-start;flex-direction:column}.pw-search{width:min(360px,100%)} }
@media (max-width:900px){.pw-meta{gap:7px 12px}}
@media (max-width:760px){.pw-header{flex-direction:column;align-items:flex-start;gap:16px;margin-bottom:36px}.pw-meta{padding-bottom:0}.pw-wall{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.pw-person-photo{border-radius:13px}.pw-person-caption{padding:30px 10px 11px}.pw-person-team{font-size:7px;letter-spacing:.07em}.pw-ov-in{padding:20px 18px 30px}.pw-ov-title{font-size:clamp(34px,8vw,58px)}}
@media (max-width:540px){.pw-h2{font-size:clamp(42px,11.5vw,58px)}.pw-bar{display:none}.pw-ctl{margin-top:14px}.pw-meta{font-size:8.5px}.pw-ctl-r{gap:8px}.pw-ticks{gap:5px}.pw-tick{width:13px}.pw-ov-head{gap:12px}.pw-ov-close{width:40px;height:40px}.pw-directory-controls{margin-top:23px}.pw-pill{padding:9px 11px;font-size:8px}.pw-pill span{display:none}.pw-directory-meta{font-size:8px;letter-spacing:.06em}.pw-person-caption h4{font-size:13px}.pw-person-fallback span{font-size:42px}.pw-mq-track span{font-size:9px}}
@media (max-width:380px){.pw-wall{gap:9px}.pw-person-caption h4{font-size:12px}.pw-person-team{padding:4px 5px}.pw-meta{grid-template-columns:auto auto}.pw-foot{align-items:flex-end}}
@media (prefers-reduced-motion:reduce){.pw-mq-track{animation:none}.pw-person-img,.pw-ph-img{transition:none}.pw-person-shine{display:none}}
`;

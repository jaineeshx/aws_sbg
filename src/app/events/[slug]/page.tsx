import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { getEventBySlug, getAllEventSlugs } from "@/data/events";
import MiniCalendarCards from "@/components/ui/MiniCalendarCards";
import RetroDigitalClock from "@/components/ui/RetroDigitalClock";
import EventGalleryToggle from "@/components/ui/EventGalleryToggle";
import GuestCarousel from "@/components/ui/GuestCarousel";
import WinnerCarousel from "@/components/ui/WinnerCarousel";
import ScrollDownCue from "@/components/ui/ScrollDownCue";
import WhatsNextCard from "@/components/ui/WhatsNextCard";
import styles from "./event.module.css";

const WHATS_NEXT = {
  builderCenterUrl: "https://builder.aws.com",
  skillBuilderUrl: "https://skillbuilder.aws",
};

// =============================================================================
// INSTITUTIONAL BRANDING CONFIGURATION
// To add an RV University logo image:
// 1. Place your image file in the /public folder (e.g. /public/rvu-logo.png)
// 2. Set RVU_LOGO_PATH to "/rvu-logo.png" below.
// If left as "", an elegant high-contrast typographical badge will be rendered.
// =============================================================================
const RVU_LOGO_PATH = ""; // Set to e.g. "/rvu-logo.png" when asset is available
const SBG_LOGO_PATH = "/logo-sbg.jpg"; // Active AWS SBG logo from /public

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | AWS Student Builder Group",
    };
  }

  return {
    title: `${event.title} | AWS Student Builder Group · RV University`,
    description: event.description,
    openGraph: {
      title: `${event.title} | AWS SBG`,
      description: event.description,
      images: event.coverImage ? [event.coverImage] : [SBG_LOGO_PATH],
    },
  };
}

// Section Header Component: Prominent medium-big typography with clean spacing
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "mb-6",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Small uppercase orange eyebrow label: 11px */}
      <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
        {eyebrow}
      </span>
      {/* Prominent medium-big section heading: 24–30px */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
        {title}
      </h2>
      {/* Clean subtitle with comfortable line spacing */}
      {subtitle && (
        <p className="text-sm sm:text-base text-white/60 mt-1.5 max-w-2xl leading-relaxed m-0">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Parse overview paragraphs (separated by \n\n)
  const overviewParagraphs = (event.overview || event.description || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  // Dynamic conditional flags based directly on event data
  const has = (arr?: unknown[]) => (arr?.length ?? 0) > 0;
  const hasWinners = has(event.winners);
  const hasGuests = has(event.guests);
  const hasPhotos = has(event.photos);
  const hasSkills = has(event.takeaways || (event as unknown as { skills?: unknown[] }).skills);

  // 3 Quick facts points only (one-line facts about the event)
  const quickFactsList: string[] =
    event.quickFacts && event.quickFacts.length > 0
      ? event.quickFacts.slice(0, 3)
      : [
          event.description || "Hands-on cloud architecture labs designed for student builders.",
          "Direct alignment with AWS certification tracks and technical peer mentorship.",
          "Interactive build challenges with live feedback from industry practitioners.",
        ];

  return (
    <main className="min-h-screen bg-[#030308] text-white font-sans relative z-[1] overflow-x-hidden">
      {/* Ambient background glow accents */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] pointer-events-none filter blur-[120px] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(255, 153, 0, 0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[45%] right-[10%] w-[550px] h-[550px] pointer-events-none filter blur-[140px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255, 98, 0, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* =====================================================================
          1. HEADER & INSTITUTIONAL BRANDING (ALWAYS VISIBLE)
          ===================================================================== */}
      <header className="border-b border-white/[0.07] bg-[#030308]/85 backdrop-blur-md sticky top-0 z-40">
        <div className={styles.headerRow}>
          {/* Back to Events Carousel Link (Navigates to /#events) */}
          <Link
            href="/#events"
            id="event-page-back-link"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white hover:text-[#FF9900] hover:border-[#FF9900]/40 hover:bg-[#FF9900]/10 text-xs sm:text-sm font-semibold transition-all duration-200"
          >
            <ArrowLeft size={15} />
            <span>Back to Events</span>
          </Link>

          {/* Institutional Logos (AWS SBG + RV University in upper-right) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* AWS Student Builder Group Logo */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#FF9900]/40 transition-colors">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden relative bg-black/60 shrink-0 border border-white/10">
                <Image
                  src={SBG_LOGO_PATH}
                  alt="AWS Student Builder Group"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white whitespace-nowrap hidden sm:inline">
                AWS SBG
              </span>
            </div>

            {/* Divider */}
            <span className="w-px h-6 bg-white/20" />

            {/* RV University Logo or Branded Badge */}
            {RVU_LOGO_PATH ? (
              <div className="h-8 flex items-center relative">
                <Image
                  src={RVU_LOGO_PATH}
                  alt="RV University"
                  width={110}
                  height={32}
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/30 flex items-center gap-2.5"
                title="RV University Bangalore"
              >
                <span className="w-2 h-2 rounded-full bg-[#FF9900]" />
                <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#FF9900] uppercase whitespace-nowrap">
                  RV UNIVERSITY
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Centered Content Shell */}
      <div className={styles.container}>
        {/* =====================================================================
            2. HERO BOX — ONE LARGE SPLIT RECTANGLE (ALWAYS VISIBLE)
            ===================================================================== */}
        <section
          aria-label="Event Hero & Schedule"
          className={styles.heroBox}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
            {/* LEFT HALF — SCHEDULE & TIMELINE + WHAT'S NEXT CARD */}
            <div className="flex flex-col items-center justify-start text-center gap-2 min-w-0 md:border-r md:border-white/10 md:pr-10 pt-0">
              <div className="flex flex-col items-center text-center gap-2.5 w-full">
                <div className="mb-0">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF9900]" />
                    SCHEDULE &amp; TIMELINE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
                    Event Date &amp; Recorded Schedule
                  </h2>
                </div>

                {/* 4 Mini-Calendar Cards: Centered row */}
                {event.date && (
                  <div className="w-full flex flex-col items-center mt-1">
                    <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-white/50 block mb-1">
                      CALENDAR DATE
                    </span>
                    <div className="flex justify-center w-full">
                      <MiniCalendarCards date={event.date} />
                    </div>
                  </div>
                )}

                {/* Retro Digital Clock: Centered under cards */}
                {(event.startTime || event.endTime) && (
                  <div className="w-full flex flex-col items-center mt-1">
                    <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-white/50 block mb-1">
                      RECORDED TIMINGS · CLICK TO TOGGLE
                    </span>
                    <div className="flex justify-center w-full">
                      <RetroDigitalClock
                        startTime={event.startTime}
                        endTime={event.endTime}
                      />
                    </div>
                    <p className="font-mono text-[11px] text-white/40 mt-1 mb-0">
                      Click display to toggle between recorded Start &amp; End time
                    </p>
                  </div>
                )}
              </div>

              {/* WHAT'S NEXT CARD (Centered below clock & helper text) */}
              <WhatsNextCard
                builderCenterUrl={WHATS_NEXT.builderCenterUrl}
                skillBuilderUrl={WHATS_NEXT.skillBuilderUrl}
              />
            </div>

            {/* RIGHT HALF — EVENT POSTER & DETAILS */}
            <div className={styles.heroDetails}>
              {/* Event Poster: 16:9, max-h 310px */}
              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
                {event.coverImage ? (
                  <div className="relative w-full aspect-[16/9] max-h-[310px]">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-full object-cover rounded-2xl select-none"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/9] max-h-[310px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FF9900]/10 via-[#12141c]/90 to-black relative">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF9900]/15 border border-[#FF9900]/30 flex items-center justify-center text-[#FF9900] mb-2.5">
                      <Calendar size={24} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[#FF9900] mb-1">
                      AWS SBG ARCHIVE
                    </span>
                    <h3 className="text-base font-bold text-white mb-1">
                      {event.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Category Pill */}
              {event.category && (
                <div className={styles.heroCategoryWrap}>
                  <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#FF9900] bg-[#FF9900]/10 border border-[#FF9900]/25 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles size={12} />
                    {event.category}
                  </span>
                </div>
              )}

              {/* Event Title */}
              <h1 className={styles.heroTitle}>
                {event.title}
              </h1>

              {/* Short Description */}
              <p className={styles.heroDescription}>
                {event.description}
              </p>

              {/* Venue */}
              {event.venue && (
                <div className={styles.heroVenue}>
                  <MapPin size={14} className="text-[#FF9900] shrink-0" />
                  <span>{event.venue}</span>
                </div>
              )}

              {/* Action Links */}
              {(event.registrationLink || event.eventLink) && (
                <div className={styles.heroButtons}>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF9900] hover:bg-[#e08800] text-black font-bold text-sm transition-all duration-200 shadow-[0_4px_18px_rgba(255,153,0,0.35)] hover:scale-[1.02]"
                    >
                      <span>Register for Event</span>
                      <ArrowUpRight size={15} />
                    </a>
                  )}

                  {event.eventLink && (
                    <a
                      href={event.eventLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-sm transition-all duration-200"
                    >
                      <span>Official Announcement</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Animated Smooth Scroll Down Cue */}
        <ScrollDownCue
          targetId="about-event"
          label="SCROLL DOWN TO EXPLORE"
          className="my-2"
        />

        {/* =====================================================================
            3. ABOUT THIS EVENT (EDITORIAL & QUICK FACTS — 3 POINTS ONLY)
            ===================================================================== */}
        <section id="about-event" className={`${styles.sectionWrapper} py-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
            {/* LEFT COLUMN: Editorial & Overview */}
            <div className="w-full">
              <div className="mb-6">
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                  EDITORIAL SUMMARY
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                  About This Event
                </h2>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed m-0">
                  The vision, challenge statements, and builder activities during this session.
                </p>
              </div>

              <div className="space-y-5">
                {overviewParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-relaxed text-white/75 m-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Quick Facts Card (3 Points Only) */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 w-full shadow-xl backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#FF9900]">
                  QUICK FACTS
                </span>
              </div>

              <div className="flex flex-col">
                {quickFactsList.map((fact, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3.5 py-4 ${
                      index !== quickFactsList.length - 1 ? "border-b border-white/10" : ""
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-[#FF9900] bg-[#FF9900]/10 border border-[#FF9900]/25 px-2 py-0.5 rounded shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed m-0 font-medium">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. EVENT MOMENTS (PHOTO GALLERY ONLY — CONDITIONAL)
            ===================================================================== */}
        {hasPhotos && (
          <section className={styles.sectionWrapper}>
            <EventGalleryToggle
              photos={event.photos}
              subtitle="Photographs from workshops, debugging marathons, and collaborative builds."
            />
          </section>
        )}

        {/* =====================================================================
            5. GUESTS + WINNERS BOX (CONDITIONAL)
               - Both exist: 2-column split with vertical divider
               - Only guests: full width guests panel
               - Only winners: full width winners carousel
               - Neither: completely omitted with divider
            ===================================================================== */}
        {(hasGuests || hasWinners) && (
          <section className={styles.sectionWrapper}>
            <div className={styles.splitBox}>
              <div
                className={
                  hasGuests && hasWinners
                    ? "grid md:grid-cols-2 gap-12 items-stretch"
                    : "grid gap-12"
                }
              >
                {/* SPEAKERS & GUESTS PANEL */}
                {hasGuests && (
                  <div
                    className={`${
                      hasWinners ? "md:border-r md:border-white/10 md:pr-12" : "w-full"
                    } flex flex-col justify-between h-full min-w-0`}
                  >
                    <div className="mb-6">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                        {event.guests && event.guests.length === 1
                          ? "GUEST SPEAKER"
                          : "INDUSTRY MENTORSHIP"}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
                        Speakers &amp; Guests
                      </h2>
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      {/* SOLO GUEST + NO WINNERS: horizontal card — photo left, info right */}
                      {event.guests && event.guests.length === 1 && !hasWinners ? (() => {
                        const g = event.guests[0];
                        const linkedinUrl = g.linkedinUrl || g.linkedin || g.link;
                        const designation = g.designation || g.role || "Featured Speaker";
                        const organization = g.organization || g.organisation;
                        const bio = g.bio || g.details;
                        return (
                          <div className="flex flex-col sm:flex-row items-start gap-7 sm:gap-10 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF9900]/30 transition-all duration-200">
                            {/* ── Photo ─────────────────────────────────────── */}
                            {/* EDIT: replace the src below with the real photo URL in src/data/events.ts → guests[0].photo */}
                            <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-lg">
                              {g.photo ? (
                                <img
                                  src={g.photo}
                                  alt={g.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#FF9900]/10 text-[#FF9900] font-bold text-4xl">
                                  {g.name[0]}
                                </div>
                              )}
                            </div>

                            {/* ── Info ──────────────────────────────────────── */}
                            <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 w-fit">
                                <Sparkles size={10} />
                                <span>{g.role && g.role.length <= 25 ? g.role.toUpperCase() : "SPEAKER"}</span>
                              </div>

                              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight m-0">
                                {g.name}
                              </h3>

                              {/* EDIT: designation in src/data/events.ts → guests[0].designation */}
                              <p className="text-sm font-semibold text-[#FF9900] m-0">
                                {designation}
                              </p>

                              {/* EDIT: organisation in src/data/events.ts → guests[0].organisation */}
                              {organization && (
                                <p className="text-xs text-white/50 m-0">{organization}</p>
                              )}

                              {/* EDIT: bio / details in src/data/events.ts → guests[0].details */}
                              {bio && (
                                <p className="text-sm text-white/70 leading-relaxed mt-1 m-0 line-clamp-4">
                                  {bio}
                                </p>
                              )}

                              {/* EDIT: linkedin URL in src/data/events.ts → guests[0].linkedin */}
                              {linkedinUrl && (
                                <a
                                  href={linkedinUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-[#FF9900]/15 border border-white/10 hover:border-[#FF9900]/40 text-xs font-semibold text-white hover:text-[#FF9900] transition-all mt-2 w-fit"
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0077B5]">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                  </svg>
                                  <span>View LinkedIn Profile</span>
                                  <ExternalLink size={11} className="text-white/40" />
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })() : (
                        /* ALL OTHER CASES: Carousel (multiple guests, or guests+winners) */
                        <GuestCarousel
                          guests={event.guests}
                          isFullWidth={!hasWinners}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* WINNERS & PROJECTS PANEL */}
                {hasWinners && (
                  <div className="flex flex-col justify-between h-full min-w-0">
                    <div className="mb-6">
                      <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#FF9900] inline-flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                        PROJECT RECOGNITION
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
                        Winners &amp; Projects
                      </h2>
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <WinnerCarousel
                        winners={event.winners}
                        isFullWidth={!hasGuests}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}


        {/* =====================================================================
            7. TAKEAWAYS & SKILLS ACQUIRED (CONDITIONAL)
            ===================================================================== */}
        {hasSkills && (
          <section className={styles.sectionWrapper}>
            <SectionHeader
              eyebrow="KEY COMPETENCIES"
              title="Takeaways &amp; Skills Acquired"
              subtitle="Technical learnings and architectural concepts participants built hands-on."
              className="mb-6"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {(event.takeaways || (event as unknown as { skills?: unknown[] }).skills)?.map((item, idx) => {
                const title = typeof item === "object" && item !== null && "title" in item
                  ? (item as { title?: string }).title
                  : undefined;
                const text = typeof item === "object" && item !== null && "text" in item
                  ? (item as { text: string }).text
                  : String(item);

                return (
                  <div
                    key={`takeaway-${idx}`}
                    className={styles.contentCard}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 shrink-0 text-[#FF9900]">
                        <CheckCircle2 size={18} />
                      </div>
                      <div className="min-w-0">
                        {title && (
                          <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                            {title}
                          </h3>
                        )}
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed m-0">
                          {text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================================
            8. RETURN TO EVENTS & FOOTER
            ===================================================================== */}
        <div className={styles.footerRow}>
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 text-[#FF9900] hover:text-[#ffb74d] text-sm font-semibold transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Return to Events Carousel</span>
          </Link>

          <span className="font-mono text-xs tracking-wider uppercase text-white/35">
            AWS SBG Archive · RV University Bengaluru
          </span>
        </div>
      </div>
    </main>
  );
}

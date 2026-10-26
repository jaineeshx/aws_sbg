// =============================================================================
// EVENT TYPES — Shared schema for AWS SBG Event Archive & Detail Pages
// =============================================================================

export interface EventPhoto {
  src: string;
  caption?: string;
  alt?: string;
}

export interface EventGuest {
  name: string;
  role?: string;          // e.g. "Speaker" or "Guest"
  designation?: string;   // e.g. "Senior Solutions Architect"
  organisation?: string;  // e.g. "Amazon Web Services"
  organization?: string;  // alias
  photo?: string;
  details?: string;       // short biography
  bio?: string;           // alias
  linkedin?: string;      // LinkedIn profile URL
  linkedinUrl?: string;   // alias
  link?: string;
}

export interface EventWinner {
  position?: string; // e.g. "1st Place", "Winner", "Runner-up"
  award?: string;    // e.g. "Best Cloud Architecture"
  teamName?: string;
  name: string;
  members?: string[];
  photo?: string;
  project?: string;
  prize?: string;
  projectUrl?: string;
  links?: { label: string; url: string }[];
}

export interface EventFeedback {
  quote: string;
  author?: string;
  role?: string;
  rating?: number;
}

export interface EventTakeaway {
  title: string;
  text: string;
  icon?: string;
}

export interface EventResource {
  title: string;
  description?: string;
  url: string;
  type?: "github" | "slides" | "docs" | "tool" | "repo" | "link";
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  category?: string;
  description: string;
  overview?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  coverImage?: string;
  eventLink?: string;
  registrationLink?: string;

  // Quick facts & metrics
  participants?: string | number;
  duration?: string;
  mentorsCount?: string | number;
  eventType?: string;
  quickFacts?: string[];

  // Optional sections — when empty or undefined, section is completely omitted
  winners?: EventWinner[];
  guests?: EventGuest[];
  photos?: EventPhoto[];
  feedback?: EventFeedback[];
  takeaways?: (string | EventTakeaway)[];
  skills?: (string | EventTakeaway)[];
  resources?: EventResource[];
  schedule?: EventScheduleItem[];
}

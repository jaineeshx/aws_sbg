import type { ArtPreset, FolderFile } from "@/components/ui/glass-folder-cards";

// =============================================================================
// EVENT TYPES — Comprehensive schema for AWS SBG Event Archive
// =============================================================================

export interface EventPhoto {
  /** Relative path from /public (e.g. "/events/genesis/photo1.jpg") or direct URL */
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

export interface EventPerson {
  name: string;
  role: string;
  type: "organiser" | "volunteer" | "mentor" | "participant";
  photo?: string;
  details?: string;
  linkedin?: string;
}

export interface EventVideo {
  title: string;
  url: string; // YouTube, Vimeo, or direct video embed link
  thumbnail?: string;
  description?: string;
}

export interface EventFeedback {
  quote: string;
  author?: string;
  role?: string;
  rating?: number; // e.g. 5
}

export interface EventTakeaway {
  title?: string;
  text: string;
}

export interface EventResource {
  title: string;
  description?: string;
  type?: "slides" | "github" | "docs" | "starter" | "link";
  url: string;
}

export interface EventSectionVisibility {
  overview?: boolean;
  calendar?: boolean;
  clock?: boolean;
  gallery?: boolean;
  guests?: boolean;
  winners?: boolean;
  people?: boolean;
  videos?: boolean;
  feedback?: boolean;
  takeaways?: boolean;
  resources?: boolean;
}

export interface EventFolderItem {
  // ── FOLDER IDENTITY (homepage carousel) ────────────────────────────────────
  id: string;
  label: string;
  meta: string;
  art: ArtPreset;
  seed: number;
  appearDelay: number;
  tone?: "light" | "dark";

  /**
   * Unique URL route slug — becomes /events/[slug].
   * Example: "aws-cloud-genesis-26", "24h-builder-sprint"
   */
  slug: string;

  // ── BASIC INFORMATION ─────────────────────────────────────────────────────
  category?: string;
  title: string;
  description: string;
  overview?: string;

  // ── SCHEDULE & VENUE ──────────────────────────────────────────────────────
  /** Canonical ISO date: "YYYY-MM-DD" */
  date?: string;
  /** 24-hour start time: "HH:MM" */
  startTime?: string;
  /** 24-hour end time: "HH:MM" */
  endTime?: string;
  venue?: string;

  // ── MEDIA & LINKS ─────────────────────────────────────────────────────────
  coverImage?: string;
  eventLink?: string;
  registrationLink?: string;

  // ── QUICK FACTS & METRICS ─────────────────────────────────────────────────
  participants?: string | number;
  duration?: string;
  mentorsCount?: string | number;
  eventType?: string;
  quickFacts?: string[];

  // ── HOMEPAGE CAROUSEL CARDS ───────────────────────────────────────────────
  photo1: string;
  photo2: string;

  // ── SECTION VISIBILITY CONTROLS ───────────────────────────────────────────
  /** Explicitly turn sections on or off for this specific event */
  sections?: EventSectionVisibility;

  // ── FUTURE SECTIONS (Data ready for Phase 2B+ when components are provided)
  photos?: EventPhoto[];
  guests?: EventGuest[];
  winners?: EventWinner[];
  people?: EventPerson[];
  videos?: EventVideo[];
  feedback?: EventFeedback[];
  takeaways?: (string | EventTakeaway)[];
  resources?: EventResource[];
}

// =============================================================================
// EVENT DATA RECORDS — Add, remove or edit entries below.
// =============================================================================

export const EVENT_FOLDERS: EventFolderItem[] = [
  /* ── RVU SANTHE (EVENT 0 — inserted first so carousel shows it as 01) ─── */
  {

    id: "rvu-santhe",
    label: "0",
    meta: "Event 00",
    art: "verdant",
    seed: 7,
    appearDelay: 0,
    tone: "dark",

    slug: "rvu-santhe",

    category: "Meetup",
    title: "RVU Santhe",
    description:
      "An annual RV University tradition where every club introduces itself to the incoming freshmen. AWS Student Builder Group took part to showcase what we do.",
    overview:
      "RVU Santhe is an annual tradition at RV University where every club on campus introduces itself to the incoming freshman batch. The AWS Student Builder Group took part to introduce the group, showcase its activities, and show new students how they can get involved.\n\nOur banner carried the group's idea in one line: Learn. Build. Connect. Students could learn about cloud, AI and development, and about the real-world projects, hands-on workshops and hackathons the group runs.",

    date: "2026-07-31",
    venue: "RV University, Bengaluru",

    /* No start/end time — hide the clock */
    startTime: undefined,
    endTime: undefined,

    /* No eventLink / registrationLink — hide those buttons */
    eventLink: undefined,
    registrationLink: undefined,

    coverImage: "/event/santhe-pic-4.jpeg",
    photo1: "/event/santhe-pic-1.jpg",
    photo2: "/event/santhe-pic-3.jpg",

    quickFacts: [
      "A first look at what students can learn through the AWS Student Builder Group.",
      "Showed how members build real projects beyond the classroom.",
      "Introduced the hands-on workshops and hackathons run by the group.",
    ],

    sections: {
      overview: true,
      calendar: true,
      clock: false,
      gallery: true,
      guests: false,
      winners: false,
      feedback: false,
      takeaways: false,
      resources: false,
    },

   photos: [
      {
        src: "/event/santhe-pic-1.jpg",
        alt: "Club Memebers Group Pic ",
      },
      {
        src: "/event/santhe-pic-2.jpg",
        alt: "Final group pic",
      },
      {
        src: "/event/santhe-pic-3.jpg",
        alt: "Participants ",
      },
      
    ],
    guests: [],
    winners: [],
    feedback: [],
    takeaways: [],
  },

  {

    id: "1",
    label: "1",
    meta: "Event 01",
    art: "aurora",
    seed: 3,
    appearDelay: 0,
    tone: "dark",

    slug: "event-1",

    /* ── BASIC INFORMATION ─────────────────────────────────────────────────── */
    category: "Workshop",
    title: "AWS CLOUD CONNECT - first step to AWS",
    description:
      "First step to AWS: an online session for students who want to explore cloud computing and get started with the AWS ecosystem.",
    overview:
      "AWS Cloud Connect was an online session by the AWS Student Builder Group, RV University, for students who want to explore AWS, cloud computing, and how to get started with the AWS ecosystem. Whether participants were completely new to AWS or already exploring cloud technologies, the session was a great place to start.",

    /* ── SCHEDULE & VENUE ──────────────────────────────────────────────────── */
    date: "2026-09-09",
    startTime: "18:00",
    endTime: "20:00",
    venue: "Online session",

    /* ── QUICK FACTS & METRICS (3 points only) ───────────────────────────────── */
    quickFacts: [
      "The speaker explained cloud technologies in plain language, made for beginners.",
      "A quick tour of the AWS ecosystem and how its core services fit together.",
      "Students learned where to begin and how to keep learning after the session",
    ],

    /* ── MEDIA & LINKS ─────────────────────────────────────────────────────── */
    coverImage: "/event/cloud-2.jpeg", // Demo cover (replace with your event poster)
    eventLink: "https://www.instagram.com/p/Dc3gpHtz9ua/?rpxt=MXJyZTlhOGFuaXFm",
    registrationLink: "https://meetu.ps/e/QgcnY/1dMPr2/i",
    photo1: "/event/Cloud-pic-1.jpeg",
    photo2: "/event/Cloud-pic-1.jpeg",

    /* ── PER-EVENT SECTION CONTROLS (Set any to false to completely hide it) ─── */
    sections: {
      overview: true,
      calendar: true,
      clock: true,
      gallery: true,
      guests: true,
      winners: true,
      people: true,
      videos: true,
      feedback: true,
      takeaways: true,
      resources: true,
    },

    /* ── DEMO CONTENT (Replace with your actual event data) ──────────────────── */
    photos: [
      {
        src: "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=",
        
        alt: "Cloud architecture lab",
      },
      {
        src: "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=",
       
        alt: "Collaborative coding",
      },
      {
        src: "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=",
      
        alt: "Deployment demo",
      },
      {
        src: "https://media.istockphoto.com/id/2173059563/vector/coming-soon-image-on-white-background-no-photo-available.jpg?s=612x612&w=0&k=20&c=v0a_B58wPFNDPULSiw_BmPyhSNCyrP_d17i2BPPyDTk=",
       
        alt: "Stage pitch",
      },
     
    ],

    guests: [
      {
        name: "Nensi Ravaliya",
        role: "Speaker",
        designation: "AWS Community Builder @AI | DevSecOps Engineer | Speaker @Microsoft & AWS",
        linkedin: "https://www.linkedin.com/in/nencyravaliya28?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        photo: "/event/guest-1.jpeg",
      },
    ],

    winners: [],

    takeaways: [
      {
        title: "Cloud Technologies Explained",
        text: "The guest speaker walked participants through what cloud technologies are and how they are used today",
      },
      {
        title: "AWS Basics, Briefly",
        text: "A beginner-friendly briefing on the AWS ecosystem and how its core services fit together.",
      },
      {
        title: "Where to Start",
        text: "How to begin learning with the AWS Free Tier, AWS Skill Builder and AWS Builder Center.",
      },
      {
        title: "Your Next Steps",
        text: "Guidance on which topics to explore next and how to grow towards AWS certifications",
      },
    ],


  },

  {
    id: "2",
    label: "2",
    meta: "Event 02",
    art: "ember",
    seed: 11,
    appearDelay: 120,
    tone: "dark",

    slug: "event-2",

    category: "MasterClass : Build Challenge",
    title: "AWS Masterclass: Build Challenge with Kiro",
    description:
      "A hands-on AWS session with live demonstrations across Cloud, Infrastructure, AI/ML and Generative AI, followed by the Kiro Build Challenge.",
    overview:
      "Kalpavikas 2.0 presented the AWS Console Masterclass: Build with AWS, where the guest speaker gave a detailed briefing on AWS services and cloud technologies and explained how they are used in real-world projects, with live demonstrations across Cloud, Infrastructure, AI/ML and Generative AI  The session was followed by the Kiro Build Challenge, where participants learned to work with Kiro IDE and built solutions for real problem statements, with some using AWS services such as IAM. ",

    date: "2026-09-25",
    startTime: "10:00",
    endTime: "13:00",
    venue: "RV University, Bengaluru",

    /* ── QUICK FACTS & METRICS (3 points only) ───────────────────────────────── */

    quickFacts: [
      "A detailed briefing on AWS services and cloud technologies, with real-world usage explained",
      "Participants used Kiro IDE to build solutions for real problem statements.",
      "The best three builds each won a $100 AWS certification voucher.",
    ],

    coverImage: "/event/kiro-cover-2.jpeg",
    eventLink: "https://www.instagram.com/p/DdjQvnxzlbg/?srtk=MTFzYzFpMndveW01aA==",
    registrationLink: "https://unstop.com/workshops-webinars/aws-console-masterclass-build-with-aws-rv-university-bangalore-1749339?lb=p7dBMDST&utm_medium=Share&utm_source=workshops&utm_campaign=Patelnis8681",

    photo1: "/event/kiro-pic-3.jpg",
    photo2: "/event/kiro-pic-7.jpeg",

    sections: {
      overview: true,
      calendar: true,
      clock: true,
      gallery: true,
      guests: true,
      winners: true,
      feedback: true,
      takeaways: true,
    },

    photos: [
      {
        src: "/event/kiro-pic-1.jpeg",
        alt: "Club Memebers Group Pic ",
      },
      {
        src: "/event/kiro-pic-3.jpg",
        alt: "Final group pic",
      },
      {
        src: "/event/kiro-pic-4.jpg",
        alt: "Participants ",
      },
      {
        src: "/event/kiro-pic-8.jpeg",
        alt: "Interaction with Guest",
      },

    ],

    guests: [
      {
        name: "Yeshwanth L M",
        role: "Speaker",
        designation: "Data & AI Solutions Engineer@CONFLUENT | EX-DATABRICKS | AWS COMMUNITY BUILDER",
        linkedin: "https://www.linkedin.com/in/yeshwanth-l-m?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        photo: "/event/guest-2.jpeg",
      },
    ],

    winners: [
      {
        position: "1st Place",
        name: "Rohit Kulkarni",
        project: "Project Details Coming Soon",
        prize: "$100 AWS Credits",
        projectUrl: "https://github.com",
      },
      {
        position: "2nd Place",
        name: "Indranil Saha",
        project: "Project Details Coming Soon",
        prize: "$100 AWS Credits",
        projectUrl: "https://github.com",
      },
      {
        position: "3rd Place",
        name: "Tanush G",
        project: "Project Details Coming Soon",
        prize: "$100 AWS Credits",
        projectUrl: "https://github.com",
      },
    ],

    feedback: [
      {
        quote: "24 hours flew by! Having industry architects on the floor at 2 AM helping us debug DynamoDB concurrency issues was unmatched.",
        author: "Kunal J.",
        role: "4th Year B.Tech CSE",
        rating: 5,
      },
      {
        quote: "Learned more in one day about CI/CD pipelines and deployment automation than in an entire semester.",
        author: "Divya N.",
        role: "3rd Year B.Tech IT",
        rating: 5,
      },
    ],

    takeaways: [
      {
        title: "Guest Speaker Insights",
        text: "The guest speaker gave a detailed briefing on AWS services and cloud technologies, covering a lot of ground in one session",
      },
      {
        title: "Real-World Cloud Usage",
        text: "Explained how AWS and the cloud are used in real projects and industry workflows, beyond the basics",
      },
      {
        title: "Learning Kiro IDE",
        text: "Participants learned how to use Kiro for AI-assisted building, including its setup, dependencies and how a project comes together.",
      },
      {
        title: "Solving Real Problem Statements",
        text: "Teams worked on well-defined problem statements and built working solutions, with some applying AWS services such as IAM.",
      },
    ],
  },

  {
    id: "3",
    label: "3",
    meta: "Event 03",
    art: "dusk",
    seed: 27,
    appearDelay: 240,
    tone: "dark",

    slug: "event-3",

    category: "Hackathon",
    title: "HACKTOBERFEST HACK DAY",
    description:
      "Building with open- weight models and open-source  AI",
    overview:
      "Coming Soon",

    date: "2026-10-31 ",
    startTime: "09:00",
    endTime: "17:00",
    venue: "RV University, Bengaluru",

    /* ── QUICK FACTS & METRICS (3 points only) ───────────────────────────────── */

    quickFacts: [
      "A hack day at RV University. Details coming soon",
      "Build and contribute during Hacktoberfest.",
      "Format, schedule and prizes will be announced",
    ],

    coverImage: "/event/Hack-1.jpeg",
    eventLink: "https://www.instagram.com/p/DeyLCtWS-5O/?rpxt=MWw0MjViYTQ1am91eQ==",
    registrationLink: "https://events.mlh.com/events/15139-hacktoberfest-hack-day-bengaluru-x-aws-sbg-rvu",

    photo1: "",
    photo2: "",

    sections: {
      overview: true,
      calendar: true,
      clock: true,
      gallery: true,
      guests: true,
      winners: true,
      feedback: true,
      takeaways: true,
    },

    photos: [
      {
        src: "https://cdn.21st.dev/assets/mirror/c5/c50a953b2534eeb024de5eb84901abda556e6a8faa74bb6c13983557f14f02e2.jpg",
        caption: "Building multi-agent tools using Anthropic Claude models on Bedrock",
        alt: "Bedrock workshop",
      },
      {
        src: "https://cdn.21st.dev/assets/mirror/0b/0b2eee3635f20ec932fa27ae8db24eb760045aee6dd53c6cd05b01799761b6fb.jpg",
        caption: "Testing prompt chains and vector database integrations with OpenSearch",
        alt: "Prompt engineering",
      },
      {
        src: "https://cdn.21st.dev/assets/mirror/df/df5b37ca7d83d93ddbece6430932d006f89d70704f4cf14c91bc724b9653ec9f.jpg",
        caption: "Live demonstration of tool-calling agents interacting with external APIs",
        alt: "Live demo",
      },
    ],

    guests: [
      {
        name: "Details Coming Soon",
        role: "Details Coming Soon",
        linkedin: "https://linkedin.com",
        photo: "ttps://cdn.21st.dev/assets/mirror/fe/fe0e5e4058e6fc722507077aa70c1e0fd48ee254ab0bae5512902dc6729ff155.jpg",
      },
    ],

    winners: [],

    feedback: [
      {
        quote: "Understanding how Bedrock Agents use Action Groups connected to Lambda functions completely demystified how production AI applications work.",
        author: "Abhishek K.",
        role: "3rd Year B.Tech CSE",
        rating: 5,
      },
      {
        quote: "Hands down the most practical generative AI workshop I've attended. We built a fully working RAG system within 3 hours.",
        author: "Tara M.",
        role: "2nd Year B.Tech Data Science",
        rating: 5,
      },
    ],

    takeaways: [
      {
        title: "Details Coming Soon",
        text: "Details Coming Soon",
      },
      {
        title: "Details Coming Soon",
        text: "Details Coming Soon",
      },
      {
        title: "Details Coming Soon",
        text: "Details Coming Soon",
      },
    ],
  },

  {
    id: "4",
    label: "4",
    meta: "Event 04",
    art: "verdant",
    seed: 42,
    appearDelay: 360,
    tone: "dark",

    slug: "event-4",

    category: "--",
    title: "Details Coming Soon",
    description:
      "---",
    overview:
      "-----",

    date: "2027-03-08",
    startTime: "10:30",
    endTime: "16:00",
    venue: "RV University, Bengaluru",

    /* ── QUICK FACTS & METRICS (3 points only) ───────────────────────────────── */
    quickFacts: [
      "---",
      "---",
      "---",
    ],

    coverImage: "https://cdn.21st.dev/assets/mirror/2c/2c3bda48c0009be1f143cfed1b28a012de388bcd39d662df550ec1d28966b864.jpg",
    eventLink: "https://rvu.edu.in",
    registrationLink: "https://rvu.edu.in",

    photo1: "",
    photo2: "",

    sections: {
      overview: true,
      calendar: true,
      clock: true,
      gallery: true,
      guests: true,
      winners: true,
      feedback: true,
      takeaways: true,
    },

    photos: [
      {
        src: "https://cdn.21st.dev/assets/mirror/2c/2c3bda48c0009be1f143cfed1b28a012de388bcd39d662df550ec1d28966b864.jpg",
        caption: "Interactive club showcase booth and live cloud terminal demonstrations",
        alt: "Community showcase",
      },
      {
        src: "https://cdn.21st.dev/assets/mirror/0b/0b2eee3635f20ec932fa27ae8db24eb760045aee6dd53c6cd05b01799761b6fb.jpg",
        caption: "Student lightning talks on serverless computing and cloud certifications",
        alt: "Lightning talk",
      },
      {
        src: "https://cdn.21st.dev/assets/mirror/a0/a0e1a6affa10f9d1304e1ec7a0a074efa2e5befddbe5f55ec1674ca4606a7272.jpg",
        caption: "Peer-to-peer mentoring session on AWS Free Tier setups and budget alerts",
        alt: "Peer mentoring",
      },
    ],

    guests: [
      {
        name: "---",
        role: "---",
        linkedin: "https://linkedin.com",
        photo: "https://cdn.21st.dev/assets/mirror/6f/6ff6818c9f0e9b6b28eb7f16f650538626b00cf3b10c36eac6840d280c799636.jpg",
      },
    ],

    winners: [],

    feedback: [
      {
        quote: "Attending the lightning talks inspired me to start learning AWS. Seeing second-year students deploy real projects was so motivating.",
        author: "Pranav S.",
        role: "1st Year B.Tech CSE",
        rating: 5,
      },
      {
        quote: "The free tier workshop saved me from unexpected charges! Essential for beginners getting started with cloud architecture.",
        author: "Aishwarya R.",
        role: "2nd Year B.Des",
        rating: 5,
      },
    ],

    takeaways: [
      {
        title: "---",
        text: "---",
      },
      {
        title: "---",
        text: "---",
      },
      {
        title: "---",
        text: "----",
      },
    ],
  },
];

// =============================================================================
// HOMEPAGE FOLDER CARDS MAPPING
// =============================================================================

export function getFolderCards(item: EventFolderItem): FolderFile[] {
  return [
    // 1. Photo Card 1
    {
      name: "",
      meta: "",
      image: item.photo1 || undefined,
      art: item.photo1 ? undefined : item.art,
    },
    // 2. Description Card
    {
      name: "",
      meta: "",
      desc: item.description,
    },
    // 3. Photo Card 2
    {
      name: "",
      meta: "",
      image: item.photo2 || undefined,
      art: item.photo2
        ? undefined
        : item.art === "ember"
          ? "aurora"
          : "dusk",
    },
    // 4. Event Title Card (links to /events/[slug])
    {
      name: item.title,
      isTitle: true,
      href: item.slug ? `/events/${item.slug}` : undefined,
    },
  ];
}

/**
 * Lookup an event record by its unique URL slug.
 */
export function getEventBySlug(slug: string): EventFolderItem | undefined {
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return EVENT_FOLDERS.find((e) => {
    if (e.slug === normalized) return true;
    if (e.id === normalized) return true;
    if (`event-${e.id}` === normalized) return true;
    if (`event${e.id}` === normalized) return true;
    if (`event ${e.id}` === normalized) return true;
    if (e.id === "1" && normalized === "aws-cloud-genesis-26") return true;
    if (e.id === "2" && normalized === "24h-builder-sprint") return true;
    if (e.id === "3" && normalized === "bedrock-agentic-ai") return true;
    if (e.id === "4" && normalized === "community-open-day") return true;
    return false;
  });
}

/**
 * Return all registered event slugs (for Next.js generateStaticParams).
 */
export function getAllEventSlugs(): string[] {
  return EVENT_FOLDERS.map((e) => e.slug);
}

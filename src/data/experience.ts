// Single source of truth for professional history.
// Used by the CV page, the homepage experience strip, and the About page.

export interface Role {
  id: string;
  company: string;
  title: string;
  start: string; // e.g. "Jun 2026"
  end: string; // "Present" for the current role
  industry: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const profile = {
  headline: "Senior Software Engineer",
  focus: "Android · Frontend · Tech leadership",
  location: "Sofia, Bulgaria (CET/CEST)",
  androidSince: "April 2019",
  summary:
    "Senior Software Engineer with 7+ years of building production Android apps for fintech, health tech, and iLottery. I led the Android team on a white-label iLottery product for about two years, and I now work in Vue, TypeScript, and Phaser too. Outside my day job I design, build, and ship my own desktop, browser, mobile, and web products.",
};

export const roles: Role[] = [
  {
    id: "pollard",
    company: "Pollard Digital Solutions",
    title: "Senior Software Engineer",
    start: "Jun 2026",
    end: "Present",
    industry: "iLottery",
    location: "Sofia, Bulgaria",
    summary:
      "Senior Software Engineer on iLottery products. My work has expanded from Android into the web frontend.",
    highlights: [
      "Work on browser-based iLottery experiences in Vue, TypeScript, and Phaser.",
      "Carry Android tech-lead practices into the web team: architecture boundaries, code review, and test discipline.",
      "Continue to support the white-label Android app.",
    ],
    stack: ["Vue", "TypeScript", "Phaser", "Kotlin", "Jetpack Compose"],
  },
  {
    id: "roller-gaming",
    company: "Roller Gaming",
    title: "Android Engineer · Tech Lead",
    start: "May 2024",
    end: "May 2026",
    industry: "iLottery",
    location: "Sofia, Bulgaria",
    summary:
      "Led Android development on a white-label, multi-flavour iLottery application delivered to lottery operators.",
    highlights: [
      "Led the Android team, mentoring engineers through code review and pair programming.",
      "Built the white-label, multi-flavour app with Kotlin Coroutines, Flow, and Jetpack Compose.",
      "Led a codebase-wide refactor to improve reuse and maintainability across client flavours.",
      "Brought the codebase to roughly 90% unit-test coverage.",
      "Represented Android in client discussions on technical debt, performance, and scalability, and helped balance priorities between technical and non-technical stakeholders.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Coroutines & Flow", "Hilt", "MockK"],
  },
  {
    id: "clue",
    company: "Clue",
    title: "Android Developer",
    start: "Jul 2023",
    end: "May 2024",
    industry: "Health tech",
    location: "Sofia, Bulgaria",
    summary: "Android work on a widely used health and cycle-tracking app.",
    highlights: [
      "Designed and delivered a domain-heavy feature that lets users configure, track, and manage their health conditions.",
      "Introduced a new architecture approach based on current best practices, making the code easier to maintain.",
      "Owned and delivered the automation of dependency management across the Android codebase.",
      "Simplified how analytics providers are used in the presentation layer, and made shared Composables more reusable.",
      "Worked with the Android chapter to reduce complexity and improve how the team collaborates.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Gradle", "Clean Architecture"],
  },
  {
    id: "xapo",
    company: "Xapo Bank",
    title: "Android Developer",
    start: "Jan 2022",
    end: "Jul 2023",
    industry: "Fintech · Digital banking",
    location: "Sofia, Bulgaria",
    summary: "Android work on a regulated digital-banking app.",
    highlights: [
      "Reworked the UI and UX of the mobile onboarding flow.",
      "Contributed to a new Jetpack Compose design library.",
      "Migrated legacy code toward modern practices, with a focus on testability, observability, performance, and crash-free users.",
      "Supported dynamically rendered, backend-driven UI content.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Design systems"],
  },
  {
    id: "sumup",
    company: "SumUp",
    title: "Android Developer",
    start: "Apr 2019",
    end: "Jan 2022",
    industry: "Fintech · Payments",
    location: "Sofia, Bulgaria",
    summary: "Android work on a payments app with more than 5 million active users, alongside 20+ Android engineers.",
    highlights: [
      "Built an MVP banking feature from scratch that served 100,000+ active users across the UK and Europe during the initial rollout.",
      "Built multi-factor authentication for securely processing payment transactions.",
    ],
    stack: ["Kotlin", "Java", "Dagger", "MVVM"],
  },
];

export const earlierRoles = [
  {
    company: "Modis",
    title: "Technical Support",
    start: "Sep 2016",
    end: "Apr 2019",
    summary: "Investigated customer-facing technical issues and applied permanent fixes or workarounds to restore normal service.",
  },
];

export const independentWork = {
  title: "Independent products",
  start: "2025",
  end: "Present",
  summary:
    "I design, build, and ship my own software in the evenings, from first idea through release, pricing, documentation, and support.",
  highlights: [
    "Continuum: a local-first calculation workspace on the web, with signed macOS, Windows, and Linux desktop companions.",
    "GitGlow: a cross-platform desktop Git analytics client built with Rust, Tauri, and React.",
    "SubKeep: a published Chrome extension with Stripe-backed Pro plans.",
    "Green Compass: a mobile and web product built with Expo, Next.js, and Supabase.",
  ],
};

export const skillGroups = [
  {
    label: "Android",
    items: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Coroutines & Flow",
      "Hilt / Dagger",
      "Room",
      "Retrofit / Ktor",
      "gRPC & Protobuf",
      "Paging 3",
      "Kotlin Multiplatform",
      "Gradle",
      "Firebase",
    ],
  },
  {
    label: "Architecture & quality",
    items: ["Clean Architecture", "MVVM / MVI", "Modular codebases", "Unit testing & TDD", "MockK", "SOLID", "Code review"],
  },
  {
    label: "Frontend & games",
    items: ["Vue", "TypeScript", "Phaser", "React", "Svelte", "Astro"],
  },
  {
    label: "Independent product stack",
    items: ["Rust & Tauri", "Expo", "Next.js", "Supabase", "Stripe", "Chrome extensions"],
  },
  {
    label: "AI-assisted engineering",
    items: ["Agentic coding workflows", "MCP servers & integrations", "Context and review guardrails"],
  },
  {
    label: "Leadership",
    items: ["Tech lead for an Android team", "Mentoring & pair programming", "Client & stakeholder discussions", "Scrum / Jira"],
  },
];

export const education = [
  { title: "Android Developer Nanodegree", org: "Udacity", year: "2018" },
  { title: "Android Basics Nanodegree", org: "Udacity", year: "2017" },
  { title: "Bachelor's degree, Business Administration", org: "Varna Free University", year: "2014" },
];

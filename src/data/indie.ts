export type IndieTier = "shipped" | "active" | "archive";

export type IndieStatus =
  | "live"
  | "public-preview"
  | "private-beta"
  | "active-build"
  | "paused";

export type IndieMetricCategory = "progress" | "release" | "traction";

export interface IndieMetric {
  label: string;
  value: string;
  asOf: string;
  sourceNote: string;
  approved: boolean;
  category: IndieMetricCategory;
}

export interface IndieMilestone {
  date: string;
  label: string;
  description: string;
}

export interface IndieProjectLink {
  label: string;
  href: string;
}

export interface IndieProject {
  id: string;
  title: string;
  role: string;
  tier: IndieTier;
  status: IndieStatus;
  statusLabel: string;
  startedAt: string;
  lastUpdatedAt: string;
  summary: string;
  currentState: string;
  progressStage: 1 | 2 | 3 | 4 | 5;
  progressLabel: string;
  lesson: string;
  nextObjective: string;
  capabilities: string[];
  milestones: IndieMilestone[];
  metrics: IndieMetric[];
  links: IndieProjectLink[];
  featured: boolean;
  accent: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  supportingSystems?: string[];
}

export const tierLabels: Record<IndieTier, string> = {
  shipped: "Shipped / public",
  active: "Active builds",
  archive: "Lab / archive",
};

export const indieProjects: IndieProject[] = [
  {
    id: "continuum",
    title: "Continuum",
    role: "Independent product",
    tier: "shipped",
    status: "public-preview",
    statusLabel: "Public preview",
    startedAt: "2026-02-26",
    lastUpdatedAt: "2026-08-07",
    summary:
      "A local-first calculation workspace that turns readable notes into live results, with a focused macOS companion for quick calculations.",
    currentState:
      "The browser workspace, production documentation, financial starter library, and unsigned Apple Silicon companion are available as a coherent public preview.",
    progressStage: 5,
    progressLabel: "Shipped, learning, refining",
    lesson:
      "A product becomes easier to trust when its calculations, feature catalogue, documentation, and public claims all draw from the same product record.",
    nextObjective:
      "Keep tightening the public learning loop around the calculations people actually use and the macOS companion workflow.",
    capabilities: ["Web", "macOS", "Local-first", "Product system"],
    milestones: [
      {
        date: "2026-02-26",
        label: "The editor begins",
        description: "The first calculation workspace established the line-based note and live-result model.",
      },
      {
        date: "2026-06-19",
        label: "Production surface clarified",
        description: "Shipped features, starter calculators, and development-only experiments gained explicit boundaries.",
      },
      {
        date: "2026-07-30",
        label: "Pocket Scribe ships",
        description: "The macOS companion, quick-draft stack, and handoff into the full workspace became one product loop.",
      },
      {
        date: "2026-08-07",
        label: "Public preview refined",
        description: "Packaging, documentation, scrolling, and editor behavior received a release-focused polish pass.",
      },
    ],
    metrics: [
      {
        label: "Started",
        value: "Feb 2026",
        asOf: "2026-08-07",
        sourceNote: "Verified repository history",
        approved: true,
        category: "progress",
      },
      {
        label: "Available on",
        value: "Web + macOS alpha",
        asOf: "2026-08-07",
        sourceNote: "Verified production documentation",
        approved: true,
        category: "release",
      },
    ],
    links: [{ label: "Open Continuum", href: "https://cntnm.xyz/" }],
    featured: true,
    accent: "#c85b3f",
    icon: "/assets/images/projects/Continuum.png",
    image: "/assets/images/indie/continuum.png",
    imageAlt: "Continuum editorial artwork showing a live calculation workspace",
    imagePosition: "center",
    supportingSystems: ["Public release artifact repository"],
  },
  {
    id: "subkeep",
    title: "SubKeep",
    role: "Independent product",
    tier: "shipped",
    status: "live",
    statusLabel: "Live product",
    startedAt: "2025-08-04",
    lastUpdatedAt: "2026-08-01",
    summary:
      "A Chrome extension that gives Google Keep stronger folder organization, focused note workflows, and local-first preferences.",
    currentState:
      "Published with a complete landing site, deterministic Google Keep fixtures, release documentation, and a per-note Zen Mode that preserves note content.",
    progressStage: 5,
    progressLabel: "Shipped, listening, improving",
    lesson:
      "Browser-extension quality depends as much on defensive DOM behavior and clear permission boundaries as it does on the visible feature.",
    nextObjective:
      "Use feedback and retention signals to decide which organization workflows deserve the next release.",
    capabilities: ["Chrome extension", "Svelte", "Local-first", "Fixture E2E"],
    milestones: [
      {
        date: "2025-08-04",
        label: "Specific frustration, focused extension",
        description: "The first version set out to make large Google Keep collections easier to organize.",
      },
      {
        date: "2026-01-16",
        label: "Public product loop",
        description: "The extension, landing experience, documentation, and deterministic release checks came together.",
      },
      {
        date: "2026-07-31",
        label: "Zen Mode",
        description: "A focused per-note reading and writing surface shipped with static-content preservation.",
      },
    ],
    metrics: [
      {
        label: "Started",
        value: "Aug 2025",
        asOf: "2026-08-01",
        sourceNote: "Verified repository history",
        approved: true,
        category: "progress",
      },
      {
        label: "Release state",
        value: "Published extension",
        asOf: "2026-08-01",
        sourceNote: "Verified product documentation",
        approved: true,
        category: "release",
      },
    ],
    links: [{ label: "Visit SubKeep", href: "https://subkeep.fyi/" }],
    featured: true,
    accent: "#d69a15",
    icon: "/assets/images/projects/SubKeep.png",
    image: "/assets/images/indie/subkeep.jpg",
    imageAlt: "SubKeep folder organization artwork",
    imagePosition: "center",
  },
  {
    id: "gitglow",
    title: "GitGlow",
    role: "Independent product",
    tier: "shipped",
    status: "live",
    statusLabel: "Live product",
    startedAt: "2025-09-01",
    lastUpdatedAt: "2026-02-18",
    summary:
      "A local-first desktop application for exploring contribution patterns, repository activity, and the rhythm behind a body of Git work.",
    currentState:
      "The Tauri and Rust desktop product includes local repository analysis, optional GitHub data, secure token storage, and a supporting entitlement service.",
    progressStage: 5,
    progressLabel: "Released, operating, learning",
    lesson:
      "Analytics become more useful when they help someone understand a working rhythm instead of simply producing a larger score.",
    nextObjective:
      "Keep the local experience fast and legible while validating which deeper insights are worth maintaining.",
    capabilities: ["Desktop", "Tauri + Rust", "Git analytics", "Local-first"],
    milestones: [
      {
        date: "2025-09-01",
        label: "Local Git patterns become visible",
        description: "The desktop foundation turned repository history into an explorable product surface.",
      },
      {
        date: "2025-11-13",
        label: "Product operations added",
        description: "A separate service began handling billing and entitlement boundaries around the desktop app.",
      },
      {
        date: "2026-02-04",
        label: "Version 1.4.2",
        description: "Repository scope, hook stability, development entitlements, and release handling were tightened.",
      },
    ],
    metrics: [
      {
        label: "Started",
        value: "2025",
        asOf: "2026-02-18",
        sourceNote: "Verified repository and public work history",
        approved: true,
        category: "progress",
      },
      {
        label: "Desktop release",
        value: "v1.4.2",
        asOf: "2026-02-18",
        sourceNote: "Verified release history",
        approved: true,
        category: "release",
      },
    ],
    links: [{ label: "Visit GitGlow", href: "https://gitglow.dev/" }],
    featured: true,
    accent: "#df744d",
    icon: "/assets/images/projects/GitGlow.png",
    image: "/assets/images/projects/GitGlow.png",
    imageAlt: "GitGlow app icon",
    supportingSystems: ["Entitlement API", "Public release artifacts"],
  },
  {
    id: "green-compass",
    title: "Green Compass",
    role: "Product contribution / collaboration",
    tier: "shipped",
    status: "live",
    statusLabel: "Live collaboration",
    startedAt: "2024-12-05",
    lastUpdatedAt: "2026-08-08",
    summary:
      "A mobile-first climate-action product that turns broad sustainability goals into approachable guidance and concrete next steps.",
    currentState:
      "My contribution spans a cohesive mobile and web product surface, including an editorial marketing system, responsive presentation, and product roadmap storytelling.",
    progressStage: 5,
    progressLabel: "Live collaboration, evolving",
    lesson:
      "Mission-driven products become more credible when the interface translates large ambitions into specific actions without overstating impact.",
    nextObjective:
      "Keep the public product story aligned with the roadmap and the practical actions available today.",
    capabilities: ["Mobile", "Web", "Product design", "Collaboration"],
    milestones: [
      {
        date: "2024-12-05",
        label: "Web foundation",
        description: "The product gained a public surface for its mission, roadmap, and practical guidance.",
      },
      {
        date: "2025-04-18",
        label: "Shared product system",
        description: "Mobile and web work converged around a clearer product and content model.",
      },
      {
        date: "2026-08-08",
        label: "Editorial redesign",
        description: "The marketing experience was rebuilt around a cohesive eco-tech visual language and more legible storytelling.",
      },
    ],
    metrics: [
      {
        label: "Collaboration since",
        value: "Dec 2024",
        asOf: "2026-08-08",
        sourceNote: "Verified local project history",
        approved: true,
        category: "progress",
      },
      {
        label: "Public surfaces",
        value: "Mobile + web",
        asOf: "2026-08-08",
        sourceNote: "Verified product documentation",
        approved: true,
        category: "release",
      },
    ],
    links: [{ label: "Visit Green Compass", href: "https://greencompass.app/" }],
    featured: true,
    accent: "#4a7b59",
    icon: "/assets/images/projects/GCLogo-no-bg.png",
    image: "/assets/images/indie/green-compass.jpg",
    imageAlt: "Person walking through a green landscape used in the Green Compass product story",
    imagePosition: "center 45%",
  },
  {
    id: "pangolines",
    title: "Pangolines",
    role: "Independent game",
    tier: "shipped",
    status: "live",
    statusLabel: "Playable on the web",
    startedAt: "2025-03-29",
    lastUpdatedAt: "2026-08-02",
    summary:
      "A modern browser reinterpretation of Pang, rebuilt around responsive controls, hand-authored biomes, bubble physics, and a tiny pangolin hero.",
    currentState:
      "Arcade and campaign play, power-ups, responsive canvas behavior, deterministic biomes, and a complete visual redesign are live in the browser.",
    progressStage: 5,
    progressLabel: "Playable, polished, expanding",
    lesson:
      "Game polish comes from systems agreeing: movement, collisions, camera, effects, responsive layout, and art direction all have to reinforce the same rhythm.",
    nextObjective:
      "Use play feedback to decide whether the next investment belongs in level variety, feel, or long-term progression.",
    capabilities: ["Browser game", "Vue", "Canvas", "Deterministic visuals"],
    milestones: [
      {
        date: "2025-03-29",
        label: "First bubbles",
        description: "The core movement, projectile, split, and collision loop established the playable foundation.",
      },
      {
        date: "2025-06-12",
        label: "Modes and progression",
        description: "Arcade, campaign structure, power-ups, and persistent high scores expanded the loop.",
      },
      {
        date: "2026-08-02",
        label: "Neon Canopy",
        description: "A cohesive procedural-biome redesign shipped across desktop and mobile layouts.",
      },
    ],
    metrics: [
      {
        label: "Started",
        value: "Mar 2025",
        asOf: "2026-08-02",
        sourceNote: "Verified repository history",
        approved: true,
        category: "progress",
      },
      {
        label: "Release state",
        value: "Playable web build",
        asOf: "2026-08-02",
        sourceNote: "Verified live product and tests",
        approved: true,
        category: "release",
      },
    ],
    links: [{ label: "Play Pangolines", href: "https://pangolines.vercel.app/" }],
    featured: true,
    accent: "#2c8c80",
    icon: "/assets/images/indie/icons/pangolines.png",
    image: "/assets/images/indie/pangolines.png",
    imageAlt: "Pangolines gameplay in the neon forest biome",
    imagePosition: "center",
  },
  {
    id: "attik",
    title: "Attik",
    role: "Private independent product",
    tier: "active",
    status: "private-beta",
    statusLabel: "Private foundation",
    startedAt: "2026-07-31",
    lastUpdatedAt: "2026-08-01",
    summary:
      "A bilingual home-inventory PWA designed to keep English and Bulgarian item names searchable together while protecting records and photos.",
    currentState:
      "The product foundation includes authentication, TOTP, database-level authorization, photo handling, local development flows, and explicit security documentation.",
    progressStage: 3,
    progressLabel: "Core system proven",
    lesson:
      "Private household software earns trust through boring details: authorization boundaries, recovery paths, careful photo handling, and language-aware search.",
    nextObjective: "Exercise the complete capture-and-find loop with a real household inventory before expanding the feature set.",
    capabilities: ["PWA", "Bilingual search", "Security", "Private data"],
    milestones: [
      {
        date: "2026-07-31",
        label: "Product boundary defined",
        description: "The first version locked the bilingual, private household inventory wedge.",
      },
      {
        date: "2026-08-01",
        label: "Secure foundation",
        description: "Authentication, authorization, inventory, photos, documentation, and local setup landed together.",
      },
    ],
    metrics: [
      {
        label: "Current stage",
        value: "Private foundation",
        asOf: "2026-08-01",
        sourceNote: "Verified private product documentation",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#8a604d",
    icon: "/assets/images/indie/icons/attik.svg",
  },
  {
    id: "cozy-tower-climber",
    title: "Cozy Tower Climber",
    role: "Independent game",
    tier: "active",
    status: "active-build",
    statusLabel: "Playable vertical slice",
    startedAt: "2026-08-08",
    lastUpdatedAt: "2026-08-09",
    summary:
      "A local-first arcade game about helping Pip climb a cozy clockwork tower by turning running momentum into higher jumps.",
    currentState:
      "One complete Endless mode includes a 100-floor tower chapter, keyboard/gamepad/touch controls, offline startup, accessibility settings, progression, and deterministic visual coverage.",
    progressStage: 4,
    progressLabel: "Complete mode, tuning feel",
    lesson:
      "Movement feel improves when physical velocity, earned jump momentum, and midair control are modeled as related but distinct systems.",
    nextObjective: "Validate the final movement tuning with hands-on play before treating the vertical slice as release-ready.",
    capabilities: ["Phaser", "Arcade physics", "Offline PWA", "Input systems"],
    milestones: [
      {
        date: "2026-08-08",
        label: "Pip enters the tower",
        description: "The original game loop, deterministic tower, progression, controls, and accessibility foundation shipped together.",
      },
      {
        date: "2026-08-09",
        label: "Authored climb",
        description: "Tower patterns, touch haptics, and momentum behavior moved the slice from system demo toward an intentional game.",
      },
    ],
    metrics: [
      {
        label: "Playable scope",
        value: "1 endless mode",
        asOf: "2026-08-09",
        sourceNote: "Verified game documentation and tests",
        approved: true,
        category: "release",
      },
      {
        label: "Tower chapter",
        value: "100 floors",
        asOf: "2026-08-09",
        sourceNote: "Verified gameplay specification",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#775f93",
    icon: "/assets/images/indie/icons/cozy-tower-climber.svg",
    image: "/assets/images/indie/cozy-tower-climber.png",
    imageAlt: "Pip at the beginning of a cozy clockwork tower climb",
    imagePosition: "center 20%",
  },
  {
    id: "thin-shell",
    title: "ThinShell",
    role: "Independent macOS utility",
    tier: "active",
    status: "private-beta",
    statusLabel: "Unsigned development beta",
    startedAt: "2026-08-07",
    lastUpdatedAt: "2026-08-07",
    summary:
      "A focused macOS terminal that collapses to one row and expands again without replacing its shell, jobs, buffer, directory, or partial input.",
    currentState:
      "Version 0.1.0 establishes a persistent PTY, compact and expanded modes, zsh-aware expansion, three skins, terminal preferences, local packaging, and no telemetry.",
    progressStage: 4,
    progressLabel: "Development beta complete",
    lesson:
      "A deliberately small utility still needs deep respect for process continuity, input state, accessibility, packaging, and native platform behavior.",
    nextObjective: "Use the beta daily and harden the terminal edge cases that only real shell work reveals.",
    capabilities: ["macOS", "Swift", "PTY lifecycle", "Local utility"],
    milestones: [
      {
        date: "2026-08-07",
        label: "From one row to a real terminal",
        description: "The entire 0.1.0 foundation, verification path, documentation, and local release process landed in the first focused build.",
      },
    ],
    metrics: [
      {
        label: "Current version",
        value: "0.1.0 beta",
        asOf: "2026-08-07",
        sourceNote: "Verified private product documentation",
        approved: true,
        category: "release",
      },
      {
        label: "Target",
        value: "macOS 14+",
        asOf: "2026-08-07",
        sourceNote: "Verified platform requirements",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#4c6171",
  },
  {
    id: "lattice",
    title: "Lattice",
    role: "Private independent system",
    tier: "active",
    status: "active-build",
    statusLabel: "Working private system",
    startedAt: "2026-03-31",
    lastUpdatedAt: "2026-04-08",
    summary:
      "A private multi-project content system that turns source material into reusable clips, insights, campaigns, drafts, visuals, and feedback loops.",
    currentState:
      "Input, Thinking, Gallery, Expression, and Feedback systems share a project-scoped data model, workflow pipeline, and local storage boundary.",
    progressStage: 3,
    progressLabel: "Core workflow connected",
    lesson:
      "AI-assisted content becomes more useful when context, generation, visual guidance, and feedback remain connected to the project that produced them.",
    nextObjective: "Run the full loop on real project campaigns and remove the workflow steps that do not earn their complexity.",
    capabilities: ["Next.js", "PostgreSQL", "AI workflows", "Content system"],
    milestones: [
      {
        date: "2026-03-31",
        label: "Project context gets a home",
        description: "The Input System established durable sources, context, knowledge, and notes.",
      },
      {
        date: "2026-04-08",
        label: "The loop closes",
        description: "Thinking, expression, gallery, and feedback became one project-scoped operating system.",
      },
    ],
    metrics: [
      {
        label: "Current stage",
        value: "Private working system",
        asOf: "2026-04-08",
        sourceNote: "Verified private product documentation",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#7d6540",
    icon: "/assets/images/indie/icons/lattice.png",
  },
  {
    id: "postiz-chat-bridge",
    title: "Postiz Chat Bridge",
    role: "Private operations tool",
    tier: "active",
    status: "active-build",
    statusLabel: "Safe demo + live reads",
    startedAt: "2026-08-07",
    lastUpdatedAt: "2026-08-07",
    summary:
      "A secure bridge and campaign console for drafting, reviewing, and operating a self-hosted social workflow without silently publishing.",
    currentState:
      "A complete local demo covers campaigns, calendar, integrations, activity, theme, drafting, and human-visible approval summaries. Live mode reads data and creates safe drafts only.",
    progressStage: 3,
    progressLabel: "Operational surface proven",
    lesson:
      "Automation feels safer when the unavailable actions are visible, approval context is explicit, and a demo never pretends to contact a live service.",
    nextObjective: "Prove durable storage and the guarded write lifecycle before enabling scheduling or publishing controls.",
    capabilities: ["Operations console", "MCP", "Approval workflow", "Safe demo"],
    milestones: [
      {
        date: "2026-08-07",
        label: "Safety before writes",
        description: "The bridge, campaign console, demo mode, approval summary, and production operations guide shipped as one bounded foundation.",
      },
    ],
    metrics: [
      {
        label: "Write boundary",
        value: "Drafts only",
        asOf: "2026-08-07",
        sourceNote: "Verified private operations documentation",
        approved: true,
        category: "release",
      },
    ],
    links: [],
    featured: false,
    accent: "#4e6a63",
  },
  {
    id: "tendli",
    title: "Tendli",
    role: "Product experiment",
    tier: "archive",
    status: "paused",
    statusLabel: "Paused experiment",
    startedAt: "2025-07-03",
    lastUpdatedAt: "2025-07-07",
    summary: "A cross-platform Flutter experiment exploring the first loop of a small virtual companion.",
    currentState: "The initial cross-platform shell and UI loop are preserved as a bounded product experiment rather than an active roadmap.",
    progressStage: 2,
    progressLabel: "Prototype complete, paused",
    lesson: "Cross-platform reach is not a substitute for a sharply defined daily reason to return.",
    nextObjective: "Revisit only if a specific companion loop proves stronger than the general product idea.",
    capabilities: ["Flutter", "Cross-platform", "Companion loop"],
    milestones: [
      {
        date: "2025-07-03",
        label: "Cross-platform shell",
        description: "The first Flutter foundation established mobile, desktop, and web targets.",
      },
      {
        date: "2025-07-07",
        label: "UI loop explored",
        description: "A short focused pass tested the companion interaction before the project was paused.",
      },
    ],
    metrics: [
      {
        label: "Experiment window",
        value: "Jul 2025",
        asOf: "2025-07-07",
        sourceNote: "Verified private repository history",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#9c6f54",
  },
  {
    id: "better-finder",
    title: "BetterFinder",
    role: "Browser experiment",
    tier: "archive",
    status: "paused",
    statusLabel: "Completed prototype",
    startedAt: "2025-08-30",
    lastUpdatedAt: "2025-09-12",
    summary: "A Chrome extension prototype for finding and highlighting text across complex pages, frames, and shadow roots.",
    currentState: "The prototype explored content-script boundaries, keyboard workflows, inaccessible-frame feedback, and non-destructive highlighting.",
    progressStage: 2,
    progressLabel: "Technical prototype complete",
    lesson: "The hard part of better page search is not the input field; it is accurately explaining what the browser could not inspect.",
    nextObjective: "Keep the implementation as reusable research unless a narrow audience demonstrates a repeatable need.",
    capabilities: ["Chrome extension", "Svelte", "DOM traversal", "Accessibility"],
    milestones: [
      {
        date: "2025-08-30",
        label: "Search beyond the obvious DOM",
        description: "The first implementation explored frames, shadow roots, and safe text highlighting.",
      },
      {
        date: "2025-09-12",
        label: "Keyboard loop refined",
        description: "Hotkeys and interaction improvements completed the focused technical prototype.",
      },
    ],
    metrics: [
      {
        label: "Prototype window",
        value: "2 weeks",
        asOf: "2025-09-12",
        sourceNote: "Verified private repository history",
        approved: true,
        category: "progress",
      },
    ],
    links: [],
    featured: false,
    accent: "#5d7488",
  },
];

export const indieSnapshotDate = "2026-08-09";

function validateIndieProjects(projects: IndieProject[]) {
  const ids = new Set<string>();
  const isoDate = /^\d{4}-\d{2}-\d{2}$/;

  for (const project of projects) {
    if (!project.id || ids.has(project.id)) {
      throw new Error(`Indie Log project IDs must be present and unique: ${project.id || "<missing>"}`);
    }
    ids.add(project.id);

    if (!isoDate.test(project.startedAt) || !isoDate.test(project.lastUpdatedAt)) {
      throw new Error(`Indie Log project dates must use YYYY-MM-DD: ${project.id}`);
    }
    if (project.startedAt > project.lastUpdatedAt) {
      throw new Error(`Indie Log project start date is after its latest update: ${project.id}`);
    }
    if (project.milestones.length === 0) {
      throw new Error(`Indie Log projects need at least one milestone: ${project.id}`);
    }

    for (const milestone of project.milestones) {
      if (!isoDate.test(milestone.date)) {
        throw new Error(`Indie Log milestone dates must use YYYY-MM-DD: ${project.id}`);
      }
    }

    for (const metric of project.metrics) {
      if (!metric.label || !metric.value || !metric.sourceNote || !isoDate.test(metric.asOf)) {
        throw new Error(`Indie Log metrics require a value, source note, and as-of date: ${project.id}`);
      }
      if (!metric.approved) {
        throw new Error(`Unapproved Indie Log metrics must not enter the published dataset: ${project.id}`);
      }
    }

    for (const link of project.links) {
      const url = new URL(link.href);
      if (project.role.toLowerCase().includes("private") && url.hostname === "github.com") {
        throw new Error(`Private repository links must not be published: ${project.id}`);
      }
    }
  }
}

validateIndieProjects(indieProjects);

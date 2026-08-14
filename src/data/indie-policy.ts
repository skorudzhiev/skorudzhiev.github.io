export type IndieTier = "shipped" | "active" | "archive";

export type IndieStatus =
  | "live"
  | "public-preview"
  | "private-beta"
  | "active-build"
  | "paused";

export type IndieDisclosure = "public-product" | "private-product-facts";

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
  disclosure: IndieDisclosure;
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

const platformPreviewHostSuffixes = [".vercel.app"];

export function isPlatformPreviewUrl(href: string) {
  const hostname = new URL(href).hostname.toLowerCase();
  return platformPreviewHostSuffixes.some(
    (suffix) => hostname === suffix.slice(1) || hostname.endsWith(suffix),
  );
}

function isPlatformPreviewOnly(project: IndieProject) {
  return project.links.length > 0 && project.links.every((link) => isPlatformPreviewUrl(link.href));
}

/**
 * Produces the only project collection the page is allowed to render.
 *
 * The source records contain approved public facts only. This final projection
 * still applies two product rules defensively: private projects cannot publish
 * links or become featured stories, and platform preview URLs cannot support an
 * official release claim without an owned product domain.
 */
export function applyIndiePublicationPolicy(projects: readonly IndieProject[]): IndieProject[] {
  return projects.map((project) => {
    const privateFactsOnly = project.disclosure === "private-product-facts";
    const platformPreviewOnly = isPlatformPreviewOnly(project);

    return {
      ...project,
      links: privateFactsOnly ? [] : [...project.links],
      featured: privateFactsOnly || platformPreviewOnly ? false : project.featured,
      tier: platformPreviewOnly && project.tier === "shipped" ? "active" : project.tier,
      status: platformPreviewOnly && project.status === "live" ? "public-preview" : project.status,
      statusLabel: platformPreviewOnly && project.status === "live" ? "Public build" : project.statusLabel,
    };
  });
}

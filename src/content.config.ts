import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/work" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    problem: z.string(),
    contribution: z.string(),
    stage: z.string(),
    year: z.number(),
    capabilities: z.array(z.string()),
    proofPoints: z.array(z.string()),
    image: z.string(),
    externalUrl: z.url().optional(),
    featuredOrder: z.number(),
    disclosure: z.enum(["teaser", "full"]),
    accent: z.string(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    topics: z.array(z.string()),
    canonicalUrl: z.url(),
    mediumUrl: z.url().optional(),
    relatedWork: z.string().optional(),
    relatedCapability: z.string().optional(),
    featured: z.boolean(),
    external: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/data/services" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    outcome: z.string(),
    bestFor: z.array(z.string()),
    deliverables: z.array(z.string()),
    engagement: z.string(),
    order: z.number(),
  }),
});

export const collections = { work, writing, services };

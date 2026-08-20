import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Adding project N+1 = writing one .mdx file. No component edits.
 * This is the decision that keeps the site current a year from now.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line. What it does, in plain language. */
    tagline: z.string(),
    /** What you personally owned. Reviewers look for this first. */
    role: z.string(),
    period: z.string(),
    /** Ordered most-relevant first; rendered as chips. */
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    /** The hardest problem, in one sentence. Drives the card hover. */
    problem: z.string(),
    /** Quantified outcomes. Impact, not tech list. */
    outcomes: z.array(z.object({
      metric: z.string(),
      label: z.string(),
    })).default([]),
    cover: z.string().optional(),
    shots: z.array(z.object({
      src: z.string(),
      caption: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

/**
 * Professional roles. Deliberately a separate collection from `projects`:
 * this work usually has no public repo and no live demo, so forcing it into
 * the project schema would leave half the fields dead. Different evidence,
 * different shape.
 */
const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    /** Display string, e.g. "Jan 2024 — Present" */
    period: z.string(),
    /** Sort key only, never rendered. Higher = more recent. */
    order: z.number(),
    current: z.boolean().default(false),
    location: z.string().optional(),
    /** One or two lines on the remit. */
    summary: z.string(),
    /**
     * What you owned. Split into label + detail deliberately: users note the
     * first two words of any line, so the keyword has to lead and the prose
     * has to follow. A plain sentence buries it.
     */
    owned: z.array(z.object({
      label: z.string(),
      detail: z.string(),
    })).default([]),
    /**
     * Flagship systems built inside this role. One long tenure with two major
     * platforms reads better as a single role than as two entries with
     * identical company and dates — that looks like padding.
     */
    platforms: z.array(z.object({
      name: z.string(),
      /** One line. Shown collapsed; the rest is progressive disclosure. */
      description: z.string(),
      highlights: z.array(z.object({
        label: z.string(),
        detail: z.string(),
      })).default([]),
    })).default([]),
    /** Quantified outcomes. Impact, not a tech list. */
    impact: z.array(z.object({
      metric: z.string(),
      label: z.string(),
    })).default([]),
    stack: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, experience };

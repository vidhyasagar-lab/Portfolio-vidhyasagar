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

export const collections = { projects };

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['en', 'es']),
    tags: z.array(z.enum(['product', 'anthropology', 'governance', 'ai', 'field-note'])),
    draft: z.boolean().default(false),
  }),
});

const linkedin = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/linkedin' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    lang: z.enum(['en', 'es']),
    sourceUrl: z.string().url(),
    syncedAt: z.coerce.date(),
  }),
});

const nowUpdates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/now' }),
  schema: z.object({
    date: z.coerce.date(),
    location: z.string().optional(),
  }),
});

export const collections = { essays, linkedin, now: nowUpdates };

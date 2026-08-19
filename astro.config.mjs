// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import tailwind from '@tailwindcss/vite';

// Static output by default: every page prerenders at build time.
// The Vercel adapter is here only to reach Vercel's own services.
export default defineConfig({
  site: 'https://example.com',
  adapter: vercel({
    // Left off deliberately. Project screenshots are a fixed, known set,
    // so Sharp optimises them at build time and we spend zero of the
    // Hobby tier's 5,000/month image transformations.
    imageService: false,
    webAnalytics: { enabled: true },
  }),
  // React is installed but NOT registered: nothing hydrates yet, and an
  // unused renderer emits a ~190 kB client chunk no page references.
  // To add an island: `import react from '@astrojs/react'` and add react()
  // here, then use client:visible on the component.
  integrations: [mdx()],
  vite: {
    plugins: [tailwind()],
  },
});

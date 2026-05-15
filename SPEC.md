# pablopastranavega.com — Build Spec

A working brief for Claude Code. Save this in the repo root as `SPEC.md` and reference it throughout the build. Tell Claude Code to read it first before writing any code.

---

## Purpose

Personal website for Pablo Pastrana Vega — CPO/Product Lead at Dapper, builder operating at the intersection of computer science, anthropology, and how technology meets institutions. The site serves three audiences simultaneously:

1. Grad school admissions readers (2027 cycle) and potential recommenders
2. Future collaborators, fellow builders, and recruiters
3. General readers encountering Pablo's writing through search engines and LLMs

The site is **not** a freelancer landing page, a CV dump, or a "hire me" surface. It is a builder's home on the internet — text-forward, indexable, designed to make Pablo's distinctive lens (anthropology applied to product, governance, and AI) visible. The writing is the asset. Everything else is scaffolding.

---

## Tech Stack

- **Astro 5+** with MDX support
- **Tailwind CSS 4**
- **TypeScript** throughout
- Bilingual EN/ES via Astro's native `i18n` routing
- **Vercel** for deploy (free Hobby tier, Git-integrated, excellent Astro support, familiar DX)
- GitHub for version control
- **Domain**: acquired after the first successful Vercel deploy — via Vercel's built-in registrar, Cloudflare Registrar, or Namecheap. Pablo's preference.

Why Astro: best-in-class for content-heavy sites, supports MDX for rich essays, allows React/Vue/Svelte islands when an interactive component is needed later (without forcing a full SPA on every page), and gives room to grow without changing stacks.

---

## Visual Direction

**Builder aesthetic with personality.** Text is the star, but small thoughtful details signal intentionality and taste. No animations beyond subtle hover states. No scroll-jacking, no parallax, no custom cursors. Light + dark mode, system-default-aware.

### Typography

- **Headings**: Fraunces (Google Fonts) — variable font with a soft optical axis. Adds character without being precious. Use the "SOFT" axis around 50–70 for paragraph headings; lower (harder edges) for display sizes.
- **Body**: Inter or IBM Plex Sans — clean, readable, technical-feeling.
- **Accent / metadata**: JetBrains Mono for timestamps, tags, footnotes, and "field note" markers.

If Fraunces feels too literary, fall back to a Söhne-alike pairing: Manrope (headings) + Inter (body).

Self-host fonts via `@fontsource-variable/*` packages — avoids the Google Fonts CDN request and FOUT.

### Color

One signature color, applied sparingly to links, tags, and key accents:

- **Primary**: a warm, muted terracotta around `#B85C3C` — evokes fieldwork without being on-the-nose; reads as deliberate rather than default-tech-blue. Pablo may tune the exact shade.
- **Background (light)**: warm off-white, around `#FAF8F5`
- **Background (dark)**: deep warm-charcoal, around `#1A1815`
- Avoid pure black/white. Avoid bright blues. Avoid gradients.
- Custom text selection color: the signature terracotta at 20% opacity.

### Small thoughtful details

- **Sidenote-style footnotes**: rendered in the margin on desktop (Tufte-style), expandable inline on mobile. Use the `remark-sidenotes` plugin or a custom MDX component.
- **Reading time** on essays, computed from word count at build time.
- **Lens tags** as small chips at the top of each essay (see content schema below).
- **Last-updated timestamp** at the bottom of each page, auto-generated from Git history.
- **Subtle section dividers** — pick one and use consistently. Suggestions: `· · ·` centered, or a 32px hand-drawn-style SVG line. Don't mix.
- **Smart quotes and em-dashes** rendered automatically via `remark-smartypants`.
- **Subtle hover states** on links: underline-on-hover, slight color shift. No motion.

---

## Site Structure

### Pages

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home | Short hero, 2–3 line intro, recent essays, "Currently building" line |
| `/about` | Long-form bio | The unusual combination + current arc. Not a CV. |
| `/now` | Sivers-style "what I'm doing right now" | Date-stamped; archive of past Nows |
| `/essays` | Index of essays | Filterable by lens tag |
| `/essays/[slug]` | Single essay | MDX, footnotes, reading time, tags |
| `/building` | What Pablo is currently building / has built | Dapper, footwear co., side projects — factual, not "hire me" |
| `/buenaventura` | Case study: Primer Conversatorio sobre el Uso Responsable del Internet | Standalone, bilingual, one of the most important pages on the site |
| `/reading` | Books, essays, thinkers Pablo recommends | Categorized; grows over time; high long-term SEO value |
| `/contact` | Email, LinkedIn, GitHub | Minimal. No form. |
| `/404` | Custom 404 | Friendly, in voice |

### Content Collections

```ts
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    lang: z.enum(['en', 'es']),
    tags: z.array(z.enum(['product', 'anthropology', 'governance', 'ai', 'field-note'])),
    draft: z.boolean().default(false),
  }),
});

const nowUpdates = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    location: z.string().optional(),
  }),
});

const reading = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.enum(['anthropology', 'product', 'governance', 'ai', 'other']),
    year: z.number().optional(),
    note: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

export const collections = { essays, 'now': nowUpdates, reading };
```

### Lens Tags (Essays)

Five tags, used sparingly. Essays can carry multiple. `field-note` is a format tag, the others are topic tags:

- `product` — product thinking, building, shipping
- `anthropology` — institutional and cultural lens
- `governance` — govtech, regtech, AI governance, public sector
- `ai` — AI safety, AI policy, AI as a tool
- `field-note` — format tag for shorter, less-finished pieces

The `/essays` index allows filtering by tag via a chip-based UI. Multi-select. URL-stateful (e.g. `/essays?tags=product,anthropology`).

---

## Bilingual Handling

- **Static UI text** (nav, footer, page chrome, About, Now, Building, Reading, Contact, Buenaventura): bilingual. Routes prefixed with `/en/...` and `/es/...`. Default language: English. Apex `/` redirects to `/en/`.
- **Essays**: stored in their original language only. Each entry declares `lang: 'en' | 'es'` in frontmatter. On the essay index, both languages appear together, with a small badge indicating language. Filtering by language is optional.
- **Language switcher** in the nav: switches the static UI shell. If the visitor is on an essay only in Spanish and clicks "EN", they go to `/en/essays/` (the index), not a 404.
- Use Astro's built-in i18n routing in `astro.config.mjs`. UI strings live in `src/i18n/{en,es}.json` and are typed via a `useTranslations` helper.

---

## Phase 1 — Build in ~4 hours

Build in this exact order. Stop when 4 hours is up; anything below the line you reach goes to Phase 2.

1. Initialize Astro project with TypeScript, Tailwind, MDX, and i18n config. Add `@astrojs/sitemap` and `@astrojs/rss`.
2. Set up content collections with the schemas above.
3. Build the global layout: header (nav + lang switcher + theme toggle), footer with last-updated timestamp and a "made with care" line.
4. Implement typography + color system in `tailwind.config.mjs` and `src/styles/global.css`. Self-host fonts.
5. Build `/` (home) — hero, 2–3 line intro, recent essays grid (3 cards), one-line "Currently building" pointing at `/building`.
6. Build `/about` (EN + ES) — long-form bio. Placeholder copy is fine; Pablo will rewrite.
7. Build `/essays` index with tag filtering, and `/essays/[slug]` template with sidenotes, reading time, and tag chips.
8. Build `/now` — single rolling page on top, with an archive of past Nows linked at the bottom.
9. Build `/building` — short list of current and past work. Plain text, dates, links. No logos, no tech-tag soup.
10. Build `/buenaventura` — the case study. Bilingual. This is the page that does the most narrative work on the whole site.
11. Build `/reading` — categorized list (Anthropology, Product, Governance, AI, Other). Each entry: title, author, optional one-line note.
12. Build `/contact` — links only.
13. Wire up RSS feed at `/rss.xml` and sitemap at `/sitemap-index.xml`.
14. Add Open Graph image generation (Satori-based — `astro-og-canvas` or similar). Default OG image for the site, custom for each essay.
15. Add schema.org Person + ProfilePage JSON-LD on `/about`.
16. Deploy to Vercel. Initial deploy lives at a `*.vercel.app` URL — confirm everything renders correctly there before touching DNS.
17. Acquire `pablopastranavega.com`. Add it to the Vercel project, configure DNS, pick one canonical host (apex or www, redirect the other). HTTPS provisions automatically.

### Seed content (required before launch)

Three real essays minimum. Without them, the site is a beautiful empty room and worse than no site at all. Highest-priority piece to write first: a public version of the thesis insight on cross-sector institutional incentive structures, made concrete with examples from Dapper.

---

## Phase 2 — Defer

- **Search**: Pagefind (works statically with Astro, ~30 min setup).
- **Newsletter signup**: only when there's a regular publishing cadence.
- **Comments**: skip indefinitely.
- **Talks page**: add when there are three or more talks worth listing.
- **Custom OG image generator** with Pablo's branding (Phase 1 uses a default).

---

## Out of Scope

- "Hire me" / "Book a call" / scheduling integrations — Pablo is not a consultant.
- WhatsApp or phone contact buttons.
- Project portfolio grid with company logos and tech-tag soup — Pablo is not a freelancer.
- Cookie banner — use Vercel Analytics or Vercel Speed Insights (privacy-friendly, no cookies, no banner needed). Plausible or Umami are fine alternatives if you outgrow the Hobby tier event cap.
- Heavy animations, parallax, scroll-jacking, custom cursors, animated gradients.
- Contact form on Phase 1 (email link is sufficient).
- AI chatbot / "talk to my website" features.

---

## Voice & Copy Guidelines

- Lead with the unusual combination, not the resume.
- Concision over self-promotion. Humility over claims. The work points at itself; descriptions point at the work.
- The About page is not a CV. The CV lives on LinkedIn and in applications. The About page makes the lens visible.
- Banned phrases: "passionate about", "innovator", "thought leader", "leveraging", "synergy", "disrupting", "at the forefront of", "deeply care", "on a mission to". Strike them on sight.
- Plain English. Technical when the topic demands it. Never corporate.
- Bilingual UI text should sound natural in each language, not literal translations. Spanish should read as Bogotá Spanish — neutral but warm, not Castilian, not Mexican.
- First-person singular. No royal "we". No third-person about himself.

---

## Deliverable Checklist (end of Phase 1)

- [ ] Production build with no console errors, no broken links
- [ ] Lighthouse score ≥ 95 across Performance, Accessibility, Best Practices, SEO
- [ ] All Phase 1 routes work in both `/en/` and `/es/` where applicable
- [ ] Three seed essays published
- [ ] Buenaventura page substantively written (this is the single highest-value page on the site)
- [ ] Domain pointed; HTTPS active; one canonical host (apex or www, redirect the other)
- [ ] RSS feed validates
- [ ] OG images render correctly when shared on LinkedIn and X
- [ ] Dark/light mode works and persists
- [ ] Mobile layout reviewed at 375px and 414px widths

---

## After Launch — Maintenance Cadence

The site compounds only if it grows. Minimum sustainable cadence:

- One essay per month
- One Now update per quarter
- An entry to `/reading` whenever a book or essay genuinely shifted Pablo's thinking
- Phase 2 features added when they earn their place — not before
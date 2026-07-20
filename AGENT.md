# AGENT.md

Instructions for AI coding agents working in this repository.
For product requirements, design direction, and content details, see `PRD.md`.

---

## Tech Stack

- **Framework**: Astro (static site generation)
- **Styling**: Tailwind CSS
- **Content**: Astro Content Collections (Markdown/MDX, frontmatter validated with Zod schemas in `src/content/config.ts`)
- **Deployment**: GitHub Pages

---

## Project Structure

```
src/
├── components/
│   ├── Hero.astro
│   ├── ProjectCard.astro
│   ├── SkillBadge.astro
│   ├── TimelineItem.astro
│   ├── BlogCard.astro
│   ├── ContactForm.astro
│   └── ThemeToggle.astro
├── content/
│   ├── config.ts
│   └── (projects/, blog/, experience/, education/, awards/)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── projects/[...slug].astro
│   ├── blog/[...slug].astro
│   └── contact.astro
└── styles/
    └── global.css
```

---

## Conventions

- New content (projects, blog posts, etc.) is added as a Markdown file in the relevant `src/content/<collection>/` folder. Home/listing pages must read from collections dynamically — never hardcode content lists in components.
- Follow the frontmatter schema defined in `src/content/config.ts` for each collection; validate with Zod.
- Support both light and dark mode using Tailwind's `dark:` variant; do not hardcode colors that break in either mode.
- Keep components small and reusable; one visual concern per component (e.g. `ProjectCard`, not a monolithic `ProjectsSection` with inline markup for every card).
- Use semantic HTML and correct heading hierarchy for SEO/accessibility.

---

## Required Skills

- Use the **caveman** skill and the **superpowers** skill where applicable while working in this repo.

## Git / Commit Workflow

- Follow **Conventional Commits** format: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`
  - Example: `feat(projects): add project card component`
- Commit **per task**, not batched. Each logical unit of work (one component, one page, one config change, one content collection setup, etc.) gets its own commit.
- Do **not** group unrelated changes into a single commit. If a task naturally splits into sub-steps (e.g. "set up content collections" touching schema + folder structure), split into separate commits per sub-step if they are independently meaningful.
- Write clear, specific commit messages describing what changed and why, not just "update files".

## Build & Deploy

- Configure `site` in `astro.config.mjs` to match the GitHub Pages URL (or custom domain).
- Include `@astrojs/sitemap` for sitemap generation and a `robots.txt` in `public/`.
- Verify the production build (`astro build`) renders fully static HTML before deploying — no client-only rendering for primary content, to preserve SEO.

---

## Related Docs

- `PRD.md` — product requirements, page/section breakdown, design system (colors, typography, interaction), and open product questions.

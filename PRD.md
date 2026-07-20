# PRD.md

## 1. Overview

A personal portfolio website in a **Simple Neo-Brutalism** style, showcasing projects, blog posts, skills, experience, education, and awards. Content is managed via Markdown files so new entries automatically appear on listing/home pages without manual code changes.

---

## 2. Goals

- Present projects, blog, and background in a visually distinctive, high-contrast style
- Make adding new content (a project, blog post, award, etc.) as simple as adding a Markdown file
- Fast, SEO-friendly, statically hosted site

---

## 3. Pages & Sections

1. **Hero + About** — name, short tagline, photo/illustration, CTA (view projects / contact)
2. **Projects/Work** — grid of cards pulled from the `projects` collection, each showing thumbnail, title, and tags from frontmatter
3. **Skills/Tech Stack** — list of skills, optionally grouped (Frontend, Backend, Tools, etc.)
4. **Experience** — work experience timeline
5. **Education** — education history
6. **Awards** — achievements/awards
7. **Blog** — list of articles from the `blog` collection
8. **Contact** — contact form (static site, so use a third-party form service such as Formspree or Web3Forms)

> Open question: should Experience/Education/Awards be one combined `timeline` collection (with a `type` field) or three separate collections? Decide during implementation based on data complexity.

---

## 4. Content Model

```
src/content/
├── projects/
├── blog/
├── experience/
├── education/
└── awards/
```

Example frontmatter for `projects/project-1.md`:

```yaml
---
title: "Project Name"
description: "Short description"
thumbnail: "/images/projects/project-1.png"
tags: ["Astro", "Tailwind", "TypeScript"]
link: "https://..."
repo: "https://github.com/..."
date: 2026-01-15
featured: true
---
```

---

## 5. Design Direction

### 5.1 Neo-Brutalism Principles (simple variant)

- Thick, solid borders (`border-2` to `border-4`, high-contrast color)
- Hard/offset shadows, not blurred — e.g. `shadow-[4px_4px_0px_0px_#000]`
- Bold block/grid layout, minimal border-radius (slightly rounded is fine, avoid overly soft corners)
- High color contrast, no heavy gradients
- Large, bold headings

### 5.2 Color Palette

- Primary accent: **amber/orange-yellow** (a tone between yellow and orange, e.g. `#F5A623`)
- Base colors: black & white for contrast
- **Light mode & Dark mode** required
  - Light: white/off-white background, black text, amber-orange accent, black borders
  - Dark: near-black background (e.g. `#111`), white/off-white text, amber-orange accent still prominent, light/white borders

### 5.3 Typography

- **Heading/Display**: Space Grotesk or Archivo Black
- **Body**: Inter or Work Sans
- **Accent/mono** (optional, for tags/labels): JetBrains Mono

### 5.4 Interaction & Animation

- Micro-interactions only (not overly playful):
  - Hover: shadow shift/pop (shadow grows or offsets further)
  - Active/click: "pressed" effect (element translates toward the shadow, shadow shrinks)
  - Fast transitions (150–200ms), sharp easing, no bouncy effects

---

## 6. SEO Requirements

- Dynamic meta tags per page (title, description, og:image)
- Sitemap + robots.txt
- Optimized images
- Semantic HTML with proper heading hierarchy and alt text
- Fully responsive (mobile-first)

---

## 7. Deployment

- **Target**: GitHub Pages
- Static site generation via Astro is SEO-safe (fully rendered HTML, crawlable by search engines)

---

## 8. Open Questions

- Combined `timeline` collection vs. separate Experience/Education/Awards collections?
- Contact form service: Formspree, Web3Forms, or other?
- Custom domain for GitHub Pages?
- Content language: English, Indonesian, or bilingual?

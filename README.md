# Braison Swilling — product developer site

A client-acquisition portfolio for custom websites, software tools, desktop applications, and responsible AI integrations. Built with SvelteKit 2 and Svelte 5. Cloudflare Workers is the primary deployment target; the existing GitHub Pages workflow remains as a transition-safe static build.

**Current live site:** https://blazzer10200.github.io/

## Local setup

Requirements: Node.js 24, npm, and Playwright Chromium for PDF/E2E tasks.

```bash
npm ci
npx playwright install chromium
Copy-Item .env.example .env
npm run dev
```

Development form submissions validate normally but do not send email when provider secrets are absent.

## Commands

```bash
npm run check          # Svelte and TypeScript diagnostics
npm run lint           # ESLint
npm run test:unit      # Vitest
npm run test:e2e       # Playwright against a managed dev server
npm run build          # Cloudflare Worker build
npm run preview:worker # local Worker preview
npm run build:static   # transition-safe GitHub Pages build
npm run build:pdf      # static build plus generated resume PDF
npm run verify         # complete local quality gate
```

## Routes

- `/` — conversion-focused home page and Project Fit builder
- `/services` — service categories, boundaries, and qualification
- `/work`, `/work/rift`, `/work/exfil` — project index and case studies
- `/about` — approach and positioning
- `/start` — validated server-side project inquiry
- `/privacy` — inquiry privacy disclosure
- `/ats` — stable ATS resume source for the generated PDF
- `/rift`, `/exfil` — permanent redirects to the new case-study URLs

## Operations

- Deployment and environment setup: `documentation/DEPLOYMENT.md`
- Content ownership and safe editing: `documentation/CONTENT-GUIDE.md`
- Audit and architecture decisions: `documentation/REDESIGN-AUDIT.md` and `documentation/REDESIGN-ARCHITECTURE.md`
- Launch verification and known limits: `documentation/POST-LAUNCH.md`

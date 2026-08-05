# Client-services redesign: Phase 1 architecture and content plan

## Product direction

Subject: a one-person product studio led by Braison Swilling.

Primary audience: small businesses and founders who need a website, business tool, desktop application, or carefully bounded AI feature. Secondary audiences: gaming communities and technical evaluators.

Single job: turn a visitor with a rough idea or operational problem into a well-informed project inquiry.

Visual thesis: **technical precision with a human operator behind it**. The signature element is a delivery rail that moves from idea to shipped product. Large product media and strong typography carry the brand; blueprint lines and monospace labels support evidence without turning the site into a terminal theme.

## Route map

- `/` — client-acquisition homepage.
- `/services` — three service groups with deliverables, fit, and boundaries.
- `/work` — verified project index.
- `/work/rift` — Rift case study.
- `/work/exfil` — EXFIL v1-to-v2 case study.
- `/about` — personal path, industrial background, and delivery approach.
- `/start` — progressively enhanced project inquiry form and server action.
- `/privacy` — inquiry-data and provider disclosure.
- `/ats` — preserved recruiter/ATS resume source.
- Custom error route — branded 404 and generic error state.

## Redirect map

- `/rift` -> `/work/rift` with HTTP 308 on the Cloudflare runtime.
- `/exfil` -> `/work/exfil` with HTTP 308 on the Cloudflare runtime.
- `/Braison-Swilling-Resume.pdf` remains a stable asset URL.
- Existing screenshot, video, favicon, verification, robots, and sitemap URLs remain stable.

## Information architecture

Homepage order:

1. Header and navigation
2. Positioning hero with idea-to-ship delivery rail
3. Verified proof strip
4. Who I help
5. Core services
6. Featured work with authentic media
7. Project Fit Builder
8. Development process
9. Evidence-led reasons to work together
10. Responsible AI-assisted workflow
11. Selected technical capabilities
12. About preview
13. Final project call to action
14. Footer

The composition alternates wide editorial sections, split layouts, full-width rails, and media-led case studies. It will not repeat one card grid for every section.

## Component map

- `src/lib/components/layout/SiteHeader.svelte` — active navigation and accessible mobile dialog behavior.
- `src/lib/components/layout/SiteFooter.svelte` — service, work, contact, and legal links.
- `src/lib/components/ui/Seo.svelte` — unique metadata, canonical URLs, social cards, and JSON-LD.
- `src/lib/components/ui/SectionIntro.svelte` — reusable section heading pattern.
- `src/lib/components/ui/CtaBand.svelte` — final conversion block.
- `src/lib/components/sections/DeliveryRail.svelte` — lightweight IDEA -> PLAN -> BUILD -> REVIEW -> SHIP visual.
- `src/lib/components/sections/ProjectFitBuilder.svelte` — native-radio guided recommendation.
- `src/lib/components/sections/ProcessTimeline.svelte` — eight-stage client process.
- `src/lib/components/projects/ProjectCard.svelte` — media-led project preview.
- `src/lib/components/projects/CaseStudy.svelte` — shared case-study structure with product and engineering depth.
- `src/lib/components/forms/InquiryForm.svelte` — accessible field layout, errors, loading, and result states.

Components will be extracted only where they improve reuse, behavior, or testability.

## Content model

Typed modules under `src/lib/content` will own:

- site navigation, social links, and capability labels;
- services and client-facing deliverables;
- verified project metadata and case-study sections;
- development-process stages;
- Project Fit Builder questions and recommendation rules;
- inquiry select/radio options.

Project copy will use stable facts. Audit-time version numbers and test counts will not become hard-coded marketing claims.

## Design-token model

`src/app.css` will define colors, typography roles, spacing, containers, gutters, radii, borders, shadows, layers, durations, and easing. The existing charcoal/cool-blue identity and self-hosted fonts remain. Inter becomes the primary display/body family; JetBrains Mono is limited to evidence labels and metadata.

Core palette direction:

- background `#090b0f`
- raised background `#0f1319`
- surface `#151a22`
- primary text `#f4f7fb`
- secondary text `#aeb7c5`
- muted text `#778290`
- electric cyan `#67d4ff`
- restrained violet `#8a7dff`
- accessible positive, warning, error, and focus colors

## Inquiry architecture

- SvelteKit form action on `/start` for progressive enhancement and value preservation.
- Pure typed validation module with length limits, email/URL checks, sanitizing normalization, and field-level errors.
- Honeypot checked before external work.
- Cloudflare Turnstile token validated server-side through Siteverify. Production fails closed when secrets are missing.
- Provider interface in `src/lib/server/inquiry` with a fetch-based email implementation and a clearly labeled development adapter.
- No production console logging of submissions or personal fields.
- Environment variables documented in `.env.example`.
- Optional D1 storage remains a documented extension point, not required for version one.

## Deployment architecture

- Official `@sveltejs/adapter-cloudflare` targeting Cloudflare Workers Static Assets.
- Predominantly prerendered marketing and case-study routes; `/start` remains server-rendered for form actions.
- Wrangler configuration points to `.svelte-kit/cloudflare/_worker.js` and `.svelte-kit/cloudflare` assets.
- GitHub Pages remains untouched on `main` until a Cloudflare preview, inquiry delivery, and final custom domain are verified.
- Migration order: deploy preview -> configure secrets -> verify form -> attach custom domain -> update canonical origin -> switch DNS -> verify -> retire or archive the Pages workflow.

## Testing plan

- Svelte/TypeScript: `svelte-check` in strict mode.
- Formatting: Prettier check with Svelte support.
- Linting: ESLint flat configuration for TypeScript and Svelte.
- Unit: Vitest for content validity, project-fit recommendations, and inquiry validation.
- End to end: Playwright for primary routes, redirects, missing-project handling, navigation, mobile menu, form errors, development delivery state, and keyboard-sensitive behavior.
- Production: SvelteKit Cloudflare build plus local Wrangler preview.
- Visual: every primary route at the six requested viewport sizes, with overflow, console, focus, responsive media, reduced-motion, and form-state review.

## Files and systems intended for modification

- Root tooling: `package.json`, `package-lock.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `.gitignore`, `.env.example`, `eslint.config.js`, `.prettierignore`, `.prettierrc`, `playwright.config.ts`, `wrangler.jsonc`.
- App shell: `src/app.html`, `src/app.css`, `src/app.d.ts`, root layout files, and error page.
- New typed content, UI, layout, section, project, form, server, and type modules under `src/lib`.
- Required route files under `src/routes` plus compatibility redirects for `/rift` and `/exfil`.
- Static SEO files and optimized derivatives of existing authentic media where useful.
- Tests under `src/**/*.test.ts` and `tests/`.
- Public documentation under `documentation/` and the root `README.md`.
- GitHub Actions only where needed to preserve the current Pages deployment during the migration window.

## Explicit preservation list

- Current live GitHub Pages site until Cloudflare is verified.
- `/ats` content and its one-source resume/PDF role.
- `/rift`, `/exfil`, and resume URLs through redirects or stable assets.
- Existing favicon, self-hosted fonts, OG image until a replacement is verified, EXFIL screenshots, Rift poster and tour video.
- Build-time Rift release lookup where it remains useful.
- Dark-only direction, first-person voice, reduced-motion support, print behavior, and honest AI-assisted framing.
- Public repository and release links for Rift and both EXFIL versions.

## Assumptions

- “Braison Swilling” remains the public personal name; no registered company identity is implied.
- The current public email remains the deletion/contact address, while production inquiry delivery uses environment configuration.
- No analytics are enabled in version one.
- A custom domain, Turnstile keys, email-provider credentials, and optional D1 binding will be supplied during deployment setup.
- Resend-compatible HTTP delivery is a practical initial provider, but the interface keeps replacement inexpensive.
- The redesign will not be pushed to `main` or deployed from this branch without an explicit release instruction.

## Prioritized implementation order

1. Tooling, Cloudflare adapter, token system, shell, metadata foundation.
2. Typed content and verified project model.
3. Homepage, services, work index, and case studies.
4. Project Fit Builder and development process.
5. About, privacy, error, and compatibility redirects.
6. Inquiry validation, Turnstile, provider abstraction, and form states.
7. Unit/E2E coverage, SEO assets, accessibility pass, and documentation.
8. Production build, Wrangler preview, six-viewport visual review, and final polish.

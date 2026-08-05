# Client-services redesign: Phase 0 audit

Audited 2026-08-05 from commit `08bc00b9c201626c9b3c1402b474cfc3c0146e28` on `main` before creating `redesign/client-services-v1`.

## Repository and runtime

- Package manager: npm, confirmed by `package-lock.json`.
- Installed stack: SvelteKit 2.70.1, Svelte 5.56.8, TypeScript 6.0.3, Vite 8.1.5, and `@sveltejs/adapter-static` 3.0.10.
- TypeScript strict mode and Svelte runes mode are enabled.
- Current routes: `/`, `/rift`, `/exfil`, `/ats`, and the SvelteKit error route.
- Current deployment: prerendered static output deployed to GitHub Pages by GitHub Actions on pushes to `main`.
- Original target-repository status: clean and synchronized with `origin/main`. No unrelated target-repository changes were present.
- Baseline verification: `npm run check` completed with 0 errors and 0 warnings. `npm run build` completed successfully.

## Current architecture

The site is a compact static SvelteKit portfolio. Global styles and tokens live in `src/app.css`; the root layout adds a decorative background and Intersection Observer reveal behavior. Four reusable components support three long route-local page implementations. Rift version data is fetched from GitHub at build time with a checked fallback. The `/ats` route is the source for the generated resume PDF.

The route files are large: the homepage is 894 lines, EXFIL is 740 lines, and Rift is 1,248 lines. Layout, content, and interaction data are mostly colocated, which makes broad repositioning and reuse harder than necessary.

## Existing strengths to preserve

- Real, public work: Rift, EXFIL v1, and EXFIL v2 are public MIT repositories. Current public releases resolve successfully.
- Authentic media: four EXFIL screenshots and a 48.5-second Rift product tour are already packaged locally.
- Honest first-person voice and unusually specific case-study material.
- Clean Svelte 5 implementation, strict type checking, minimal dependencies, and no component-library styling.
- Self-hosted Inter and JetBrains Mono variable fonts with small font files and useful fallbacks.
- Custom dark visual identity, visible focus treatment, skip link, reduced-motion handling, semantic main landmarks, and a custom error route.
- No horizontal overflow at 1536x864, 1280x800, 1024x768, 768x1024, 430x932, or 390x844 in the audited homepage.
- Working GitHub Pages deployment, canonical URLs, robots file, sitemap, Open Graph card, Person structured data, and generated resume PDF.
- Build-time Rift release lookup and the `/ats` print workflow are worth retaining.

## Business and conversion findings

The current site sells an employment candidate, not a product-development service. The hero leads with directing AI, the status says “Open to work,” the navigation prioritizes Experience and Toolkit, and the final action is a mail link. There are no service packages, audience-specific paths, project-fit guidance, qualification questions, privacy explanation, or server-side inquiry workflow.

The strongest material already exists—real shipped desktop software, detailed engineering decisions, public source, and industrial reliability—but it is organized around recruiter scanning instead of the client question: “Can this person understand my problem and deliver the product?”

## Content findings

- Verified project content is strong but repeated in route markup and resume content.
- The homepage underrepresents EXFIL and does not visually show either product above the fold.
- Technology is described in greater detail than client outcomes and deliverables.
- Gaming and employment history occupy more structural weight than custom websites, business software, and product delivery.
- Contact copy targets hiring teams rather than businesses and founders.
- No testimonials or client claims exist, which is correct and will be preserved.

## Accessibility findings

- Existing positives: native links and buttons, a skip link, main landmarks, focus-visible styles, useful image alternative text, and reduced-motion rules.
- The mobile menu has no focus trap, Escape-key close behavior, focus return, or body-scroll lock.
- Global `.reveal` and `.stagger` classes are hidden by default and depend on client JavaScript to become visible. This leaves below-fold content invisible without JavaScript and produced mostly blank full-page baseline captures until sections were scrolled into view.
- EXFIL images do not expose explicit intrinsic width and height attributes in rendered markup, increasing layout-shift risk.
- The custom film player is feature-rich, but its seek surface is not a native range input and deserves focused regression coverage.
- The current 404 returns the correct HTTP status, but browser rendering was inconsistent during the live audit and should be reverified after the adapter migration.

## Performance findings

- Baseline bundles are small for the current scope, fonts are local, and there are no large UI libraries.
- The Rift video is 4.13 MB and the four EXFIL PNGs total about 1.28 MB. They need responsive loading and explicit dimensions; the video must remain below the fold and poster-led.
- The fixed full-screen blurred aurora animates continuously and the grid follows pointer movement on fine-pointer devices. It is restrained visually but creates avoidable persistent paint/GPU work.
- The global reveal system adds client work to all pages and is not progressively enhanced.

## SEO findings

- The current site has canonical links, basic metadata, Open Graph metadata, robots, sitemap, and Person schema.
- A static description and social metadata live in `app.html` while routes also add their own tags. The rendered document can contain duplicate description and social tags, making the selected value ambiguous.
- The sitemap is hand-maintained and only includes `/`, `/rift`, and `/exfil`.
- There are no Service, WebSite, or accurate SoftwareApplication schemas, no work-index breadcrumbs, and no client-intent landing pages.
- Canonical URLs are hard-coded to the GitHub Pages origin and require one controlled migration point for a future custom domain.

## Migration risks

- The inquiry route requires a server runtime, so the Cloudflare build cannot be treated as a drop-in GitHub Pages artifact.
- `/rift`, `/exfil`, `/ats`, `/Braison-Swilling-Resume.pdf`, existing media URLs, and the GitHub Pages origin have external-link value and must remain reachable.
- The generated PDF currently depends on the static build directory. Cloudflare deployment and PDF generation need separate documented paths.
- The active Rift checkout contains unrelated uncommitted work. It is read-only for this redesign; public repository/release evidence is used instead.
- Turnstile and email delivery cannot be production-verified until credentials and a final provider are configured.
- A custom domain has not been supplied. GitHub Pages remains the canonical fallback until that domain is confirmed.

## Verified public evidence used

- Rift: public MIT repository, latest public release `v0.151.1` at audit time, Windows application media already packaged in this repository.
- EXFIL v2: public MIT repository with public release `v2.3.1` at audit time.
- EXFIL v1: public MIT C#/.NET 8/WPF repository, clearly described as the original implementation.

Version numbers are audit evidence, not evergreen marketing copy. Public pages should use stable status language or fetch release data at build time.

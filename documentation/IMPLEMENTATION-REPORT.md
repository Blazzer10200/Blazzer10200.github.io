# Client Services Redesign — Implementation Report

## Outcome

The former résumé-first portfolio is now a complete client-acquisition site for Braison Swilling's custom websites, software tools, desktop applications, and responsible AI integrations. The work lives on `redesign/client-services-v1`; the current production branch and GitHub Pages site were not changed or deployed.

## What changed

- Rebuilt the information architecture around `/`, `/services`, `/work`, `/work/rift`, `/work/exfil`, `/about`, `/start`, and `/privacy`.
- Replaced résumé-style homepage content with a clear offer, proof, audience fit, process, project recommender, and repeated inquiry paths.
- Reframed Rift and EXFIL as evidence-led case studies with product and engineering views, authentic screenshots/video, decisions, scope, constraints, and responsibility boundaries.
- Added a deterministic Project Fit tool that recommends a sensible starting engagement and carries the result into the inquiry form.
- Added a detailed, progressively enhanced inquiry flow with comprehensive server validation, preserved values, an error summary, consent, a honeypot, Turnstile support, and a provider adapter.
- Added responsive header/navigation, mobile focus trapping, skip navigation, a site footer, branded error handling, and permanent redirects from `/rift` and `/exfil`.
- Preserved the ATS résumé route and regenerated the downloadable résumé PDF.
- Added page-level metadata, canonical URLs, Open Graph/Twitter data, JSON-LD, `sitemap.xml`, `robots.txt`, a social card, and security/cache headers.
- Added Cloudflare Worker configuration plus a transition-safe GitHub Pages static build.
- Added unit tests, Worker-backed browser tests, lint/type tooling, content guidance, deployment documentation, and a post-launch checklist.

## Why it changed

The prior site demonstrated technical ability but made a prospective client do the positioning work. The new site answers the commercial questions in order: what Braison builds, who it helps, what evidence exists, how delivery works, whether a project fits, and how to start. Technical depth remains available without dominating the first decision path.

## Key UX and conversion decisions

- The homepage leads with an outcome and ownership model, not a résumé title or technology inventory.
- Primary navigation is limited to Services, Work, About, and Start a Project.
- Every major page gives the visitor a relevant next action; repeated CTAs use specific language rather than generic “contact” copy.
- Service descriptions name useful outcomes and common deliverables while avoiding fabricated fixed prices or promises.
- Project Fit reduces blank-page anxiety without pretending to estimate a project. Its output is advisory and transfers into the real inquiry.
- The inquiry asks enough to qualify a lead—problem, outcome, scope, timing, budget, and context—while explaining that no polished specification is required.
- Case studies support both client-level scanning and technical due diligence through explicit Product and Engineering views.
- Claims stay bounded to source-backed facts. No testimonials, client logos, revenue claims, conversion metrics, or unsupported project results were invented.

## Preserved, replaced, and removed from the main journey

### Preserved

- Existing résumé facts and the `/ats` printer-friendly route.
- Public Rift and EXFIL evidence, repositories, releases, screenshots, and product-tour media.
- Existing GitHub verification file and transition-safe Pages deployment.
- Legacy `/rift` and `/exfil` URLs through permanent redirects.

### Replaced

- The résumé-first homepage became a focused service-business landing page.
- Long technical project pages became structured, responsive case studies.
- Ad hoc page styling became a shared design system with restrained cyan, off-white, ink, and neutral tones.
- Static contact links became a structured inquiry workflow.

### Removed from the primary experience

- Dense terminal/cyber visual framing, scattered skill inventories, and technology-first narration.
- Ambiguous calls to action and duplicate page-level navigation patterns.
- Any implication that GitHub activity alone is the client offer.

## Inquiry backend

`/start` uses a SvelteKit server action on Cloudflare Workers. Input is normalized and validated server-side; invalid submissions return all relevant field errors and preserve safe entered values. A honeypot quietly neutralizes basic bots. Turnstile tokens are verified against Cloudflare Siteverify with optional hostname enforcement. Valid inquiries are sent through a narrow provider interface; the initial adapter calls Resend and checks provider errors before reporting success. Logs contain event/status metadata only, never submitted names, email addresses, or message content.

Development can intentionally run without provider secrets. Production fails closed when required anti-abuse or delivery configuration is missing, preventing false success messages.

Required production configuration:

- `PUBLIC_SITE_URL`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_EXPECTED_HOSTNAME`
- `INQUIRY_PROVIDER=resend`
- `INQUIRY_TO_EMAIL`
- `INQUIRY_FROM_EMAIL`
- `RESEND_API_KEY`

## Cloudflare and D1 status

- Cloudflare Workers is implemented as the primary runtime and builds successfully with `@sveltejs/adapter-cloudflare`.
- Static assets are configured to run the SvelteKit Worker first, so `/start` and server actions resolve correctly.
- The existing GitHub Pages workflow now uses a separate static adapter build and remains a safe fallback during migration.
- No deployment, DNS change, Pages retirement, or secret creation was performed in this implementation branch.
- D1 is intentionally not active. `INQUIRIES_DB` is only a typed extension point; submissions are not persisted. This minimizes retained personal data and avoids creating an unused database. Enabling D1 later requires a schema, retention/deletion policy, privacy update, access-control review, and migration tests.

## Accessibility

- Semantic landmarks, one primary heading per page, skip navigation, visible focus treatment, and descriptive link/button text.
- Mobile navigation traps focus, closes with Escape, restores focus, and prevents background scrolling while open.
- Form inputs have labels, guidance, field-level errors, an error summary, and programmatic focus after failed submission.
- Reduced-motion preferences disable decorative animation and smooth scrolling.
- Responsive checks covered desktop, tablet, and mobile widths with no horizontal overflow.
- Keyboard and automated checks passed; a final manual screen-reader pass remains recommended before production launch.

## SEO and sharing

- Unique titles and descriptions, canonical links, Open Graph/Twitter metadata, and a generated 1200×630 social card.
- `ProfessionalService`, `Person`, `Service`, and project-oriented JSON-LD are emitted where relevant.
- Sitemap and robots assets cover the public route structure; legacy project paths return HTTP 308 redirects.
- Canonical origin remains configurable so the custom domain can be switched only after Cloudflare verification.

## Performance

- Self-hosted fonts avoid a render-blocking third-party font request.
- Case-study raster media includes WebP alternatives, dimensions, and lazy loading; the product-tour video uses metadata preload and a poster.
- Most presentation is CSS and server-rendered HTML. The main third-party browser script is limited to Turnstile on the inquiry route.
- Final client chunks stayed modest; the largest reported JavaScript chunk was approximately 52 kB before gzip and the largest page-specific CSS bundle approximately 19 kB before gzip.
- No horizontal overflow or broken referenced media was found in the responsive visual matrix.

## Verification

- Prettier format: passed
- ESLint: passed
- `svelte-check`: 0 errors, 0 warnings
- Vitest: 3 files, 8 tests passed
- Cloudflare production build: passed
- Playwright against the actual Wrangler Worker: 13 tests passed
- GitHub Pages static fallback build: passed
- Resume PDF generation: passed
- Dependency audit: 0 vulnerabilities
- Quick security/bug review: no issues found in 51 changed code files reviewed
- Visual QA: 8 routes across 6 desktop/tablet/mobile viewports, plus final desktop hero inspection; no horizontal overflow or browser console errors
- Route/media smoke test: public pages, sitemap, robots, PDF, social image, case-study images, and Rift MP4 returned expected successful responses; legacy routes returned 308

## Known limitations

- Inquiry delivery and Turnstile cannot be proven end to end until production secrets, allowed hostname, and a verified sender are configured.
- The GitHub Pages fallback is static and deliberately omits the server-only `/start` route; it should not become the final canonical runtime.
- The live GitHub release lookup may be rate-limited without `GITHUB_TOKEN`; the checked fallback is Rift `0.151.1`.
- No testimonials or commercial outcome metrics are shown because no verified source material was available.
- No analytics, CRM sync, appointment scheduling, or inquiry persistence was added; each should be justified by an actual operating need and privacy decision.

## Next steps

1. Create the Cloudflare Worker, configure public values and secrets, and verify the Resend sender.
2. Deploy the redesign branch to a non-production Worker URL and run the launch checklist with a real Turnstile test key and test inbox.
3. Add and verify the custom domain, then update the canonical origin, sitemap, robots file, and Turnstile hostname.
4. Submit a real inquiry and confirm delivery, reply-to behavior, redaction, error handling, and mobile completion.
5. Switch production traffic only after Worker, redirects, assets, PDF, and form checks are green; retain GitHub Pages until DNS settles.
6. After launch, collect real inquiry quality and visitor feedback before adding analytics, scheduling, CRM, or D1 storage.

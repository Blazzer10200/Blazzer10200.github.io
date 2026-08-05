# Content editing guide

## Central content files

- `src/lib/content/site.ts` — identity, navigation, proof, audience, and shared positioning
- `src/lib/content/services.ts` — service categories, outcomes, deliverables, examples, and boundaries
- `src/lib/content/process.ts` — six-stage delivery process
- `src/lib/content/projects.ts` — project cards, case studies, links, media, product view, and engineering view
- `src/lib/content/project-fit.ts` — Project Fit questions and deterministic recommendations
- `src/lib/content/inquiry-options.ts` — inquiry dropdown values

Keep visible labels separate from stable option values. If an option value changes, update validation, prefill links, tests, and any saved analytics mappings together.

## Adding a project

1. Add optimized media under `static/screenshots/` or `static/videos/`; keep the original source asset when provenance matters.
2. Add a typed project object in `src/lib/content/projects.ts` with useful alt text, intrinsic dimensions, verified links, current status, product decisions, engineering decisions, and demonstrated capabilities.
3. Expand the `Project['slug']` union and the dynamic route entries.
4. Add the case-study URL to `static/sitemap.xml`.
5. Add content and route tests, then check the page at every target viewport.

## Editing services and inquiry choices

Service claims must describe work Braison can actually discuss and deliver. Avoid invented client counts, testimonials, pricing, years of experience, team size, conversion percentages, or guarantees. Budget selection is qualification context, not an automatic quote.

The inquiry is intentionally detailed. Preserve accessible labels, explicit error text, retained values after validation, “Not sure yet” choices, consent, honeypot, Turnstile, and the privacy link.

## Screenshots and media

- Prefer WebP for raster screenshots while retaining a real source asset.
- Write alt text for the information conveyed, not filenames or generic “screenshot” wording.
- Keep width and height metadata accurate to prevent layout shift.
- Use authentic project media only. Do not replace evidence with decorative AI imagery.

## Resume

`/ats` is the single source of truth. Run `npm run build:pdf` after resume changes; the generator writes the PDF to the build artifact and refreshes `static/Braison-Swilling-Resume.pdf` for the Worker build.

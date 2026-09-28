# Braison Swilling site repository guidance

## Scope

This SvelteKit/Svelte repository contains a client-services redesign on `redesign/client-services-v1`. Read `HANDOFF.md` for current state and `documentation/IMPLEMENTATION-REPORT.md` for launch details. Consult the archived handoff only for historical decisions.

## Working rules

- Preserve the substantial existing dirty worktree. Do not rewrite or discard unrelated changes.
- Do not commit, push, deploy, change DNS, or retire GitHub Pages unless the user explicitly asks. A push to `main` changes production.
- Cloudflare Workers is the intended primary runtime; the GitHub Pages build is a transition-safe static fallback and omits the server-only `/start` route.
- Keep production inquiry handling fail-closed when Turnstile or delivery configuration is missing. Never log inquiry content or expose secrets.
- D1 is inactive. Do not add inquiry persistence without an explicit data-retention, privacy, access-control, schema, and migration decision.
- Preserve the single résumé PDF generated from `/ats`, ATS-readable text, print CSS, keyboard access, and reduced-motion behavior.
- Keep public claims source-backed; do not invent testimonials, outcomes, pricing, client identities, or guarantees.

## Commands

Use `npm run verify` as the preferred aggregate gate. Run commands from the repository root.

Install:

```powershell
npm ci
npx playwright install chromium
```

Development:

```powershell
npm run dev
npm run preview:worker
```

Build:

```powershell
npm run build
npm run build:static
npm run build:pdf
```

Verify, test, typecheck, lint, and format:

```powershell
npm run verify
npm run test:unit
npm run test:e2e
npm run check
npm run lint
npm run format:check
npm run format
```

There is no database command because D1 is intentionally inactive.

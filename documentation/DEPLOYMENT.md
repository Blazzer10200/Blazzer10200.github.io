# Deployment and environment guide

## Deployment targets

Cloudflare Workers is the primary runtime because `/start` requires a server action. The SvelteKit Cloudflare adapter emits the Worker at `.svelte-kit/cloudflare/_worker.js` with assets in `.svelte-kit/cloudflare`. `wrangler.jsonc` points to those outputs and runs the SvelteKit Worker first so dynamic routes and actions are not mistaken for missing static assets.

GitHub Pages remains a secondary transition target. `npm run build:static` selects `adapter-static`, preserves the existing `build/` artifact, and omits the server-only inquiry route. Do not switch production traffic until the Worker, form, redirects, assets, and resume PDF pass the launch checklist.

## Required environment variables

Copy `.env.example` to `.env` for local work. Keep secrets in Cloudflare secrets, never in git.

| Variable                      | Scope         | Purpose                                                             |
| ----------------------------- | ------------- | ------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`             | public        | Canonical production origin, with no trailing slash                 |
| `PUBLIC_TURNSTILE_SITE_KEY`   | public        | Turnstile widget site key                                           |
| `TURNSTILE_SECRET_KEY`        | secret        | Server-side Siteverify credential                                   |
| `TURNSTILE_EXPECTED_HOSTNAME` | secret/config | Reject successful tokens issued for a different host                |
| `EMAIL_PROVIDER`              | secret/config | Currently `resend`                                                  |
| `EMAIL_PROVIDER_KEY`          | secret        | Email API key                                                       |
| `DESTINATION_EMAIL`           | secret        | Inbox that receives inquiries                                       |
| `SENDER_IDENTITY`             | secret/config | Verified provider sender, such as `Projects <projects@example.com>` |

Set public variables in `wrangler.jsonc` only after the final domain is known. Set secrets with:

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
npx wrangler secret put TURNSTILE_EXPECTED_HOSTNAME
npx wrangler secret put EMAIL_PROVIDER
npx wrangler secret put EMAIL_PROVIDER_KEY
npx wrangler secret put DESTINATION_EMAIL
npx wrangler secret put SENDER_IDENTITY
```

Turnstile is verified server-side for every production submission. Tokens are not trusted from client validation alone. Production fails closed if the key, token, provider, or delivery call is missing or unsuccessful. Local development skips Turnstile only when its secret is absent and reports that no email was sent.

## First Cloudflare deployment

1. Authenticate: `npx wrangler login`.
2. Add the variables and secrets above.
3. Run `npm run verify` and `npm run build:pdf`.
4. Deploy a preview or Worker: `npm run deploy`.
5. Test all routes, `/rift` and `/exfil` redirects, the generated resume PDF, and a real inquiry from the Worker URL.
6. Add the custom domain in Cloudflare Workers Routes & Domains.
7. Update `PUBLIC_SITE_URL`, `static/sitemap.xml`, `static/robots.txt`, and the Turnstile allowed hostname.
8. Redeploy and verify canonical tags, social metadata, sitemap URLs, and form delivery on the custom domain.
9. Only then redirect or retire the GitHub Pages origin. Keep Pages available until DNS and Worker checks are green.

## D1 extension point

`INQUIRIES_DB` is typed as an optional D1 binding, but the current form deliberately sends directly to the provider and does not persist submissions. If storage is later required, create the database and migration, add a `d1_databases` binding in `wrangler.jsonc`, define retention/deletion rules, update `/privacy`, and test access controls before enabling writes.

## Rollback

The untouched `main` deployment remains the rollback point until this branch is approved. If a Worker release fails after launch, restore the last known-good Worker deployment or route traffic back to the still-verified Pages origin; do not change DNS and delete the prior deployment in the same step.

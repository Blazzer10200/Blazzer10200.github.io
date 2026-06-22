# Braison Swilling — portfolio

Personal portfolio and résumé, built with SvelteKit and deployed as a static site to GitHub Pages.

**Live:** https://blazzer10200.github.io/

## Routes

| Route    | Source                              |
|----------|-------------------------------------|
| `/`      | `src/routes/+page.svelte`           |
| `/rift`  | `src/routes/rift/+page.svelte`      |
| `/exfil` | `src/routes/exfil/+page.svelte`     |

## Local dev

```bash
npm install
npm run dev       # http://127.0.0.1:5173
npm run check     # svelte-check
npm run build     # prerender to ./build (adapter-static)
npm run preview   # serve ./build locally
```

## Deploy

`adapter-static` prerenders every route into `./build`. The GitHub Actions workflow at `.github/workflows/deploy.yml` builds on push to `main` and publishes to GitHub Pages.

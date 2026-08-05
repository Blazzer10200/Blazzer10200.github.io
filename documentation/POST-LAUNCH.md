# Post-launch checklist and known limits

## Before production traffic

- [ ] `npm run verify` passes from a clean install.
- [ ] `npm run build:pdf` produces a readable Letter-size resume PDF.
- [ ] Worker preview and deployed Worker return 200 for every primary route.
- [ ] `/rift` and `/exfil` return 308 redirects to the new case studies.
- [ ] Missing URLs return the branded 404 with a 404 status.
- [ ] A real Turnstile-protected inquiry arrives in the configured inbox.
- [ ] Failed validation preserves non-sensitive entered values and moves focus to the summary.
- [ ] Email-provider failure returns a visible retry path and does not claim success.
- [ ] Canonical, Open Graph, Twitter, JSON-LD, sitemap, and robots URLs use the final origin.
- [ ] Desktop and mobile screenshots have no clipping, overlap, horizontal scroll, or broken media.
- [ ] Keyboard navigation, mobile-menu focus handling, visible focus, and reduced motion pass.
- [ ] GitHub Pages remains available until the custom domain and Worker are verified.

## After launch

- Submit the final sitemap to Google Search Console and Bing Webmaster Tools.
- Monitor Worker errors, Turnstile failures, provider delivery failures, and Core Web Vitals.
- Check inquiry delivery monthly with a clearly labeled test submission.
- Review project status and release links after major Rift or EXFIL releases.
- Review privacy wording before adding storage, analytics, CRM forwarding, or new processors.

## Known limits

- No client testimonials, client project outcomes, analytics history, or pricing claims were invented.
- The current form delivers email and does not persist inquiries to D1.
- A real provider account, verified sender, Turnstile keys, custom domain, and Cloudflare authentication are external launch inputs.
- GitHub Pages cannot run `/start`; it is retained only as a transition-safe static target.
- Content is English-only and no scheduling or payment integration is included.

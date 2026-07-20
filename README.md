# Neighborhood Curbside Canvas Project — static archive

Full static clone of curbsidecanvas.com (Squarespace), preserved for posterity.
Built July 2026. 75 pages + styled 404, every image at original resolution,
all fonts/CSS/icons self-hosted. No Squarespace, Typekit, or Embedly
dependencies remain — the site works standalone forever.

## Structure

- `index.html`, `<slug>/index.html` — pages, URLs identical to the live site
- `assets/images/` — all ~1,080 images (originals + 750w/1500w display variants)
- `assets/css/` — Squarespace site.css/static.css + component CSS (localized),
  `fonts.css` (europa → self-hosted Mulish), `custom.css` (static replacements
  for what Squarespace's visitor JS did: gallery grids, scroll-reveal states,
  video iframes, contact-form layout)
- `assets/fonts/` — Anton + Inter Tight (exact files Squarespace served),
  Mulish (stand-in for Typekit "europa"), Squarespace icon fonts
- `assets/js/site.js` — small vanilla-JS replacement for the burger menu,
  PROJECTS dropdown, mobile submenu, and contact-form mailto submit
- `universal/svg/social-accounts.svg` — footer social-icon sprite (same path
  as Squarespace served it)

## Intentional changes vs. the live site

- `/register`, `/call-for-artists`, `/call-for-restaurants` removed (their
  REGISTER nav dropdown removed with them); `/cart` (invisible) removed
- Contact form submits via mailto: to btsapalas@gmail.com instead of
  Squarespace's backend
- Google My Maps embedded directly (same map) instead of via Squarespace's
  Embedly key; Embedly-wrapped YouTube embeds converted to direct YouTube
- Typekit "europa" body font replaced with self-hosted Mulish (closest free
  match); Anton and Inter Tight are the exact original font files

## Preview locally

```sh
python3 -m http.server 8742   # from this directory, then open localhost:8742
```

## Deploy (later)

1. Push this repo to GitHub (btsapalas/curbside-canvas-site)
2. Cloudflare Pages → connect repo, no build step, output dir = `/`
3. Point curbsidecanvas.com DNS at the Pages deployment
4. Cancel Squarespace only after DNS cutover is verified

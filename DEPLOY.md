# Deploying curbsidecanvas.com — fall 2026 checklist

**Deadline: Squarespace renews Oct 1, 2026.** Deploy and verify this static
clone first, then cancel Squarespace before that date.

## Where things stand (as of July 19, 2026)

- The full static clone is DONE, preview-approved, and pushed to
  https://github.com/btsapalas/curbside-canvas-site (public, `main`).
- 75 pages + styled 404. Every image, font, stylesheet, and icon is
  self-hosted in this repo — nothing depends on Squarespace, Typekit, or
  Embedly. YouTube videos, the ABC7NY news clip, and the Google My Maps embed
  load from their own platforms and survive cancellation.
- What was intentionally changed vs. the live site is listed in README.md
  (dropped registration pages + cart, contact form → mailto, direct
  YouTube/Maps embeds).

## Current DNS (checked July 2026)

- Nameservers: `ns27/ns28.domaincontrol.com` → **DNS is hosted at GoDaddy**
- Apex A records → Squarespace (198.185.159.x / 198.49.23.x)
- `www` CNAME → `ext-sq.squarespace.com`

## Deploy steps (Cloudflare Pages, free tier — same recipe as rivalista.io)

1. **Cloudflare dashboard → Workers & Pages → Create → Pages →
   "Connect to Git"** → pick `btsapalas/curbside-canvas-site`.
   - Framework preset: **None**. Build command: **(leave empty)**.
     Build output directory: **/** (repo root is the site root).
   - Deploy. You'll get a `*.pages.dev` preview URL.
2. **Verify the pages.dev preview** (checklist below) before touching DNS.
3. **Custom domain**: in the Pages project → Custom domains → add
   `curbsidecanvas.com` and `www.curbsidecanvas.com`.
   - For the apex domain Cloudflare will want the DNS zone on Cloudflare:
     add the site in Cloudflare (Free plan) → Cloudflare shows two
     nameservers → in **GoDaddy → Domain settings → Nameservers**, replace
     the domaincontrol.com pair with Cloudflare's pair.
   - Cloudflare imports existing records; delete the old Squarespace A
     records and `www` CNAME when Pages adds its own.
4. Wait for DNS to propagate (minutes to a few hours), confirm
   https://curbsidecanvas.com and https://www.curbsidecanvas.com serve the
   clone with a valid certificate.
5. **Before cancelling Squarespace**: log in and export anything you want to
   keep that isn't the website itself — old contact-form submissions and any
   analytics history are the usual candidates. Double-check the domain
   itself is registered at GoDaddy (nameservers say GoDaddy hosts the DNS,
   and the registration should be there too, i.e. NOT a Squarespace-managed
   domain — confirm in GoDaddy that curbsidecanvas.com shows as a domain you
   own there, so cancelling Squarespace can't touch it).
6. **Cancel the Squarespace subscription** (before Oct 1, 2026).

## Post-deploy verification checklist

- Home, `/about`, `/art-crawl`, `/PROJECTS` (uppercase URL must work),
  `/project/astoria`, a few restaurant/artist pages, and
  `/streeatery-art/dark-horse/ford-crull/kati-vilim`
- BEFORE/AFTER photo pairs, ARTIST IN ACTION cards, and neighborhood
  project thumbnails all show (these were the JS-dependent galleries)
- YouTube embeds play; Google My Maps loads on home + Art Crawl pages
- Fonts look right: Anton headings, Inter Tight metadata; body text is
  Mulish standing in for Typekit "europa" (intentional)
- Mobile: burger menu opens, PROJECTS submenu slides, pages lay out 1-column
- Contact form: filling it and hitting Send opens your mail app addressed
  to btsapalas@gmail.com
- A bogus URL (e.g. /nope) shows the styled 404 page

## Working on the site locally

```bash
cd curbside-canvas-site
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step — the repo is the site. Edit HTML/CSS directly; push to
`main` and Cloudflare Pages redeploys automatically.

## Repo size note

~2.7GB, almost all in `assets/images/` (originals at full resolution plus
750w/1500w responsive variants that the pages' srcset markup uses). Biggest
single file ≈ 20MB — under Cloudflare Pages' 25MB/file limit. Clones are
slow; that's expected and fine.

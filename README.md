# drtakaful.com — Website Ops Guide

Static marketing website for **Dr. Takaful** (Hana Suhaimi, AIA Public Takaful).  
Bahasa Malaysia + Manglish, WhatsApp-first conversion, SEO article hub.

---

## 1. Structure

```
index.html                  ← Homepage & primary conversion funnel
*.html                      ← SEO landing pages / articles (~40+ pages)
kalkulator-hibah.html       ← Hibah calculator tool
kalkulator-belanjawanku.html
analisis-keperluan.html
borang-permohonan.html
borang-fact-finding-medical-card.html
konsultasi-percuma.html
main.js                     ← Global JS (CTA tracking, menu, filtering, scroll)
short-url-helper.js         ← Short URL redirect helper
src/
  global.css                ← Brand CSS variables + shared component styles
  tailwind-config.js        ← Tailwind CDN custom token config
robots.txt
sitemap.xml
docs/
  analytics-governance.md
```

---

## 2. Brand Theme — Matcha × Strawberry

All pages use a shared design system. No build step — Tailwind CDN with a custom config.

### CSS Variables (`src/global.css`)

```css
--matcha-deep:  #3D6B4F   /* primary, headings, authority */
--matcha-mid:   #6A9E7B   /* labels, section tags */
--matcha-light: #C2DBC9   /* borders, dividers */
--matcha-pale:  #EBF4EE   /* light backgrounds */
--strawberry:   #D93057   /* CTA buttons, urgency */
--berry-blush:  #F5B8C8   /* soft pink accents */
--cream:        #F8F5EF   /* page background */
--gold:         #C9A84C   /* premium / credentials */
--ink:          #1A1A18   /* primary text */
--ink-soft:     #4A4A46   /* secondary text */
--ink-muted:    #8A8A84   /* captions, placeholders */
```

### Tailwind Tokens (`src/tailwind-config.js`)

Custom classes available across all pages:

| Token class | Maps to |
|---|---|
| `bg-cream`, `text-ink` | Page base |
| `bg-matcha-deep`, `text-matcha-pale` | Dark brand sections |
| `bg-matcha-pale`, `border-matcha-light` | Light cards / borders |
| `text-matcha-mid` | Section labels |
| `bg-strawberry`, `text-strawberry` | CTAs, urgency |
| `text-gold` | Premium badges |
| `text-ink-soft`, `text-ink-muted` | Body / caption text |
| `font-serif` | DM Serif Display |
| `font-sans` | DM Sans |

### Retheme Status

| Phase | Scope | Status |
|---|---|---|
| Phase 1 | `src/global.css` + `src/tailwind-config.js` | ✅ Done |
| Phase 2 | `index.html` (homepage, all sections) | ✅ Done |
| Phase 3 | Tool & form pages (6 files) | ⏳ Pending |
| Phase 4 | Article / blog pages (~40 files) | ⏳ Pending |

---

## 3. Content Editing Workflow

1. Edit the target page (`*.html`).
2. Keep SEO tags aligned:
   - `<title>`
   - `<meta name="description">`
   - `<link rel="canonical">`
   - OpenGraph / Twitter URL + image tags
3. Use brand token classes (not inline styles or generic gray/rose Tailwind classes).
4. If page is new or removed, update `sitemap.xml` and internal links.

---

## 4. Analytics

Documented in `docs/analytics-governance.md`. Short version:

- Use **GTM dataLayer events** as source of truth.
- Event names: stable, `snake_case`.
- Always include context keys: `event_id`, `page_path`, `traffic_source`.

---

## 5. Publish Checklist

**Before:**
- Validate pages load locally.
- Confirm CTAs open WhatsApp with correct pre-filled message.
- No mixed domain casing (`drtakaful.com`, not `DrTakaful.com`).
- `robots.txt` and `sitemap.xml` current.

**After:**
- Smoke test homepage + changed pages.
- Check GTM DebugView / GA real-time for event flow.
- Confirm sitemap at `https://drtakaful.com/sitemap.xml`.

---

## 6. Rollback

1. `git revert <commit>` or `git checkout <commit> -- <file>`
2. Re-publish static files.
3. Smoke check: homepage load → CTA click → sitemap access.

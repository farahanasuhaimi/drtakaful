# drtakaful.com Website Ops Guide

Static marketing website for Dr. Takaful (Malay language), with many SEO landing pages and WhatsApp-first conversion flows.

## 1) Structure

- `index.html` — primary homepage and main conversion funnel.
- `*.html` (root) — supporting landing pages/articles.
- `main.js` — global interaction logic (CTA tracking, menu, filtering, scroll effects).
- `src/global.css` — shared styling.
- `robots.txt` and `sitemap.xml` — crawling/indexing controls.

## 2) Content Editing Workflow

1. Edit the target page (`*.html`).
2. Keep SEO tags aligned:
   - `<title>`
   - `<meta name="description">`
   - `<link rel="canonical">`
   - OpenGraph/Twitter URL + image tags
3. Ensure URL format is canonical and lowercase domain:
   - `https://drtakaful.com/...`
4. If page is new or removed, update:
   - `sitemap.xml`
   - internal links from related pages

## 3) Analytics Operating Rules

Analytics governance and event conventions are documented in:

- `docs/analytics-governance.md`

Short version:

- Use **GTM dataLayer events** as source of truth for marketing events.
- Keep event names stable and snake_case.
- Add event context keys (`event_id`, `page_path`, `traffic_source`, etc.) consistently.

## 4) Publish Checklist

Before publish:

- Validate that all updated pages load locally.
- Confirm CTAs open WhatsApp correctly.
- Confirm no mixed domain casing (should be `drtakaful.com`, not `DrTakaful.com`).
- Verify `robots.txt` and `sitemap.xml` are reachable and current.
- Spot-check key metadata on homepage + changed pages.

After publish:

- Smoke test homepage and at least 2 changed landing pages.
- Check GTM DebugView / GA real-time for event flow.
- Confirm sitemap is accessible at `https://drtakaful.com/sitemap.xml`.

## 5) Rollback Notes

If a publish introduces issues:

1. Revert the problematic commit.
2. Re-publish static files.
3. Re-run quick smoke checks:
   - homepage load
   - CTA click path
   - sitemap/robots access

## 6) Naming & SEO Consistency

- Use lowercase domain in all absolute URLs: `drtakaful.com`
- Keep slug naming consistent and hyphenated.
- Prefer one canonical URL per page, no duplicates with alternate casing.

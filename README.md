# drtakaful.com Website Ops Guide

Static marketing website for Dr. Takaful (Malay language), with many SEO landing pages and WhatsApp-first conversion flows.

## 1) Structure

The website has been migrated to **Astro Static Site Generator (SSG)** for better maintainability and component reusability.

- `src/pages/index.astro` — primary homepage and main conversion funnel.
- `src/pages/kalkulator-belanjawanku.astro` — interactive Belanjawanku calculator tool.
- `src/pages/*.astro` — supporting landing pages/articles.
- `src/components/Header.astro`, `Footer.astro` — global UI components.
- `src/layouts/BaseLayout.astro` — main layout wrapping SEO and standard tools.
- `public/main.js` & `public/short-url-helper.js` — global interaction logic (CTA tracking, menu, filtering).
- `src/styles/global.css` — shared styling (Tailwind CSS).
- `public/robots.txt` and `public/sitemap.xml` — crawling/indexing controls.

## 2) Content Editing Workflow

1. Edit the target page in `src/pages/*.astro`.
2. All global SEO metadata is managed via props in `<BaseLayout title="..." description="...">`.
3. To test changes locally, run:
   ```bash
   npm run dev
   ```
4. To build for production, run:
   ```bash
   npm run build
   ```
   *The generated HTML files will be in the `dist/` folder.*
5. If a page is new or removed, update:
   - `public/sitemap.xml`
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

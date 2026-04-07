# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML marketing site for Dr. Takaful (takaful/Islamic insurance advisor). Primary goal is SEO-driven lead generation via WhatsApp CTA conversions. No build step — serve files directly.

- **Analytics**: GTM `GTM-KFWGX5DS`, GA4 `G-F51SWCERD8`
- **WhatsApp**: All CTAs route to `+60132522587`
- **Language**: Malay (ms-MY)
- **Live domain**: `https://drtakaful.com`

## No Build Step

This is plain HTML/CSS/JS. To preview locally, just open any `.html` file in a browser or use a local server:

```bash
python -m http.server 8080
```

## Python Automation Scripts

These scripts maintain consistency across 50+ HTML pages:

```bash
# Generate Open Graph images (1200x630 PNG) for all articles
python generate_og_images.py

# Inject/update OG meta tags into HTML files
python inject_og_tags.py

# Fix domain casing in og:image URLs (must be lowercase drtakaful.com)
python fix_og_image_urls.py

# Validate OG tags exist and are correct
python check_og.py
```

Requires: `pip install Pillow`

## Architecture

### Page Structure
Every HTML page follows the same pattern:
- GTM + GA4 scripts in `<head>`
- SEO meta: `title`, `description`, `canonical`, Open Graph, Twitter Card
- Tailwind CDN + `src/global.css` + `main.js` (deferred)
- Fixed glass-morphism navbar
- Hero → content sections → footer
- `.wa-cta` elements trigger WhatsApp with data attributes for analytics

### JavaScript (`main.js`)
Single 253-line file — no framework, no bundler:
- `sendWhatsApp()` / `sendDetailedWhatsApp()`: Form → formatted WhatsApp message
- `filterArticles()`: Client-side blog filtering by category + search
- `trackWhatsAppCtaClicksForAdsTraffic()`: GTM `whatsapp_cta_click` events with UTM/gclid detection
- DOM init: mobile menu, scroll animations (Intersection Observer), sticky CTA

### Short URL System (Apache + PHP)
`.htaccess` rewrites `/go/<code>` → `redirect.php?code=<code>` → 301 to full URL.
All mappings live in `url-map.php` as a PHP associative array (~60+ entries).

To add a new short URL: add to `url-map.php`:
```php
'new-code' => 'target-page.html',
```

### Styling (`src/global.css`)
- Font: Manrope (imported from Google Fonts)
- Brand: Rose `#fb7185` / Dark Rose `#9F1239`
- Glass-morphism navbar, card hover lifts, fade-in scroll animations

## Analytics Governance

Events documented in `docs/analytics-governance.md`. Key rules:
- Primary event: `whatsapp_cta_click` pushed to `window.dataLayer`
- Every `.wa-cta` element needs `data-cta-source` and `data-cta-intent` attributes
- Traffic source detected via `gclid` param or `utm_source=google`
- Domain casing must always be lowercase `drtakaful.com` (not `DrTakaful.com`)

## Adding New Pages

1. Copy an existing article HTML file as a template
2. Update: `<title>`, `<meta name="description">`, `<link rel="canonical">`, all OG tags
3. Run `python generate_og_images.py` to create the OG image
4. Add to `sitemap.xml`
5. Add a short URL entry to `url-map.php` if needed
6. Ensure all `.wa-cta` elements have proper data attributes

## Pre-Publish Checklist

From `README.md`:
- All pages load locally; WhatsApp CTAs work
- No mixed domain casing in OG URLs
- `robots.txt` and `sitemap.xml` accessible
- Verify events in GTM Preview mode

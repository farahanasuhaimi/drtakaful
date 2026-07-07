# Conversion Improvement Plan — drtakaful.com
*Drafted 2026-07-07 from a full audit of the local repo (46 root pages), verified against the live site the same day. Goal: more WhatsApp conversations from the same traffic.*

## Live-Site Verification (2026-07-07)

Fetched live pages and confirmed the local audit holds in production: articles, kalkulator, and konsultasi pages have **no main.js, no sticky CTA, no `.wa-cta` tracking** — only the homepage has the full conversion stack. Two additional live findings:

- **Canonical casing bug in production**: `medical-card-lengkap-2026.html` canonical is `https://DrTakaful.com/...` (mixed case) both locally and live — violates the site's own lowercase rule and splits ranking signals. Sweep ALL canonicals for casing, not just og:image URLs (`fix_og_image_urls.py` only covers OG tags).
- **Local ↔ live drift in both directions**: live `simpananvstakaful.html` HAS GTM while the local copy doesn't — something was edited outside this repo (home copy `D:\WebDev\Takaful` or directly on the host). A bulk upload from this repo could silently regress live fixes.

## Audit Findings (evidence, not guesses)

| # | Finding | Impact |
|---|---------|--------|
| 1 | `main.js` loads on only **4 / 46 pages** — sticky CTA, exit popup, and `whatsapp_cta_click` tracking exist **only on index.html** | Articles (the SEO entry points) have no persistent CTA and no conversion tracking |
| 2 | **44 / 46 pages have zero `.wa-cta` elements**; only 2 pages carry `data-wa-source` | GA4 sees almost none of the actual WA clicks — we are optimizing blind |
| 3 | Article CTAs sit only at the **bottom** of long pages (e.g. `medical-card-lengkap-2026.html` lines 626/646 of a 43 KB page) | Mobile readers (95% of traffic per main.js comment) who don't finish the article never see a CTA |
| 4 | `borang-permohonan.html` and `simpananvstakaful.html` are **missing GTM/GA4 entirely** | Invisible pages in analytics |
| 5 | `kalkulator-hibah.html` and `kalkulator-hibah-takaful.html` both **lack canonical tags** (duplicate topic) | Split ranking signals on a high-intent page |
| 6 | Duplicate legacy pages still live: `simpananvstakaful.html` (canonical points away, but page still served), `sepuluhpercentincome.html` vs `formula-10-peratus-pendapatan-takaful.html` | Dilutes SEO; legacy versions lack the new theme/CTA work |
| 7 | `konsultasi-percuma.html` — no canonical tag; retheme still unfinished (Phase 3 leftover with `borang-fact-finding-medical-card.html`) | The page whose only job is converting looks off-brand |
| 8 | Pre-filled WA messages on newer articles are excellent (structured: umur/bajet/matlamat) but handwritten per page — older pages have plain links | Inconsistent lead quality |

## Principle

Measure → Capture → Convert → Iterate. Don't touch copy or design experiments (Phase C/D) until tracking (Phase A) has collected ~2 weeks of baseline.

---

## Phase 0 — Reconcile local vs live (required before any bulk upload, ~½ session)

1. Mirror-download the live site (or the changed pages) and diff against this repo.
2. Fold any live-only fixes back into the repo (at minimum `simpananvstakaful.html`'s GTM), commit.
3. Also diff against the home copy `D:\WebDev\Takaful` if it has uncommitted changes.
4. From then on: repo is the single source of truth — every deploy goes repo → host, never edit on host.

## Phase A — See the funnel (do first, ~1 session)

1. **Load `main.js` on all pages** (deferred, after Tailwind CDN) — one automation script pass, same pattern as `inject_og_tags.py`.
2. **Tag every WhatsApp link site-wide**: add `class="wa-cta"`, `data-wa-source="<page-slug>-<position>"`, `data-wa-intent="<topic>"`. Script-assisted: parse each page for `wa.me` anchors, inject attributes, report a diff for review.
3. **Add GTM+GA4 to** `borang-permohonan.html`, `simpananvstakaful.html`.
4. In GA4: mark `whatsapp_cta_click` as a **key event (conversion)**; build a simple exploration: conversions by `cta_source` / `cta_intent` / landing page.
5. Verify in GTM Preview mode (pre-publish checklist already covers this).

**Exit criteria**: every `wa.me` anchor on the site fires `whatsapp_cta_click` with a meaningful source label.

## Phase B — Put CTAs where the readers are (~1–2 sessions)

1. **Sticky mobile WA bar on every article page** — currently index-only; this is the single biggest lever with 95% mobile traffic. Reuse the existing `#sticky-cta` markup; the JS is already in main.js from Phase A.
2. **Mid-article CTA block**: one contextual CTA inserted after the "pain/problem" section (~30–40% depth), not only at the end. Template it so each article keeps its topic-specific pre-filled message.
3. **Standardize the pre-filled WA message template** (the umur/bajet/matlamat structure from `medical-card-lengkap-2026.html`) across all articles — script-assisted audit, manual copy review per Writing Style Guide.
4. **Internal links**: every article ends with a link to the matching kalkulator or `konsultasi-percuma.html` (related-tool box), so readers who aren't WA-ready have a next step that stays on site.

## Phase C — Fix the converting pages (~1 session)

1. Finish Phase 3 retheme: `konsultasi-percuma.html`, `borang-fact-finding-medical-card.html`; add canonical to konsultasi page.
2. **Trust near the CTA**: short "siapa Hana" strip (photo, credentials, "balas dalam X jam") beside the index form and on konsultasi page; pull one line from `kes-sebenar-medical-card.html` as social proof near CTAs.
3. Keep forms two-fields-max before WhatsApp handoff (index form is already right: nama + umur). Every form page also gets a "terus WhatsApp" skip button — some people hate forms.

## Phase D — SEO consolidation (protects the funnel, ~1 session)

1. Canonical (or better: 301 via `.htaccess`) `kalkulator-hibah.html` ↔ `kalkulator-hibah-takaful.html` — pick the stronger one, redirect the other.
2. 301 `simpananvstakaful.html` → `simpanan-vs-takaful.html`; decide `sepuluhpercentincome.html` vs `formula-10-peratus-pendapatan-takaful.html` and redirect the loser.
3. Remove/noindex scratch files from production: `blog-section.html`, `new-section.html` (they're includes, not pages).
4. Update `sitemap.xml` after consolidation.

## Phase E — Iterate (ongoing, monthly)

- Monthly GA4 review: which `cta_source` converts, which articles bring traffic but zero clicks (→ rewrite CTA or content per Writing Style Guide backlog).
- Only after baseline: consider exit-popup on articles, sticky-bar copy tests.

## Housekeeping (opportunistic)

- Stale Claude worktree `.claude/worktrees/friendly-jones/` contains outdated page copies (one has the bad `DrTakaful.com` casing) — delete if merged.
- Deploy is manual (FTP/cPanel per project notes) — Phases A+B touch all ~46 files, so plan one bulk upload per phase.

---
*Sequencing rationale: A before B so the new CTAs are measured from day one; B before C because article reach > landing-page polish; D independent, can slot anywhere.*

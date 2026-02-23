# Analytics Governance (GTM + GA4)

This document defines how tracking is implemented and maintained for drtakaful.com.

## Source of Truth

- **Primary tracking interface:** `window.dataLayer` events consumed by Google Tag Manager.
- GA4 receives events via GTM tags.

## Event Naming Rules

- Use `snake_case` event names.
- Keep names action-oriented and stable (avoid frequent renaming).
- Current conversion-focused event:
  - `whatsapp_cta_click`

## Required Event Parameters

For CTA events, include:

- `event_id`: unique ID to reduce accidental duplicates
- `page_path`: current page path
- `traffic_source`: `google_ads` or `organic_or_direct`
- `cta_source`: UI location/source marker
- `cta_intent`: user intent category
- `utm_source`, `utm_campaign`, `utm_medium`
- `has_gclid`

## Implementation Rules

1. Keep tracking logic centralized in `main.js` when possible.
2. Use `data-*` attributes for contextual metadata (`data-wa-source`, `data-wa-intent`).
3. Prevent duplicate listener binding to the same element.
4. Avoid ad-hoc tracking snippets spread across many files unless required.

## QA / Validation

For every tracking-related change:

1. Open page with and without UTM params.
2. Click each `.wa-cta` variant once.
3. Confirm one `whatsapp_cta_click` event per click in GTM Preview.
4. Verify parameter values are populated as expected.

## Governance Cadence

- Monthly: verify key conversion events still firing.
- Quarterly: review event taxonomy and deprecate unused parameters.
- On campaign launch: confirm UTM and gclid mapping still classifies traffic correctly.

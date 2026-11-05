# Choosing Abstinence

A public, responsive ebook website with educational reading samples, practical boundary tools and private aggregate analytics.

Live website: https://choosing-abstinence-alexia.timidan-x.chatgpt.site/

## What visitors can do

- Read fuller guidance about choosing abstinence and recognising respectful behaviour.
- Explore three substantial reading samples, including a clearly fictional story about two adults.
- Choose among five situations and copy a boundary script.
- Explore seven daily prompts, mark prompts complete during the current visit and download the complete starter plan as a text file.
- Read answers to nine common questions and share the website.

The complete 26-page ebook is not included in the public source or available through this website. Payment and full-book delivery are not configured.

## Design

The visual design uses powder pink, deep burgundy, condensed display type and a product mockup, following the supplied references. Fonts are self-hosted with their licences included. The book image is an AI-generated visual representation of the digital ebook and is served as a compact WebP asset. See `docs/design-notes.md` for the asset prompt and design choices.

## Analytics and privacy

The D1 `DB` binding stores `daily_metrics`, grouped by Lagos calendar day, normalized traffic source and event kind. Supported events are `visit`, `preview`, `share`, `script_copy` and `plan_download`. Counts are page visits and interactions, not unique identified people. Social links can attribute traffic to TikTok, Instagram and WhatsApp.

The script selection and checklist stay in page memory and reset on reload. No script identifier, checklist state, reflection answer, visitor name, IP address, raw referring URL, cookie or persistent visitor identifier is stored by the analytics feature. The page sends only the referring origin for classification. Do Not Track and Global Privacy Control are honoured. Each interaction control records at most one event of its kind per page load; visits count again after reload.

The server-only `DASHBOARD_OWNER_EMAIL` runtime secret must match the website owner's ChatGPT email. Hosted identity is supplied by Sites. The dashboard and analytics API independently check owner access; owner visits are excluded when signed in. Authentication routes are platform-owned. Never add production credentials or private analytics data to the repository.

## Development

The project uses React, TypeScript, Vinext and Cloudflare D1. Install the locked dependencies using the supplied project installation workflow. A supported Sites development environment provides the hosting integration and `DB` binding. Configure `DASHBOARD_OWNER_EMAIL` in an ignored local `.dev.vars` file for local development and through Sites runtime secrets for hosting.

- `pnpm dev` starts the development application.
- `node node_modules/typescript/bin/tsc --noEmit` checks types.
- `node --experimental-strip-types --test tests/metrics.test.mjs` checks source attribution and day ranges.
- Use the Sites build and publication helpers to package and deploy this Worker application.

The schema lives in `db/schema.ts`, and schema-only Drizzle migrations live in `drizzle/`. Local development data is excluded from the source and deployment. The new analytics event kinds use the existing schema and need no database migration.

## Verification

Type checks and the source-attribution/date tests pass. Browser checks covered the desktop and phone layouts, mobile navigation, script selection and copy fallback, day selection and checkmarks, starter-plan download, the added analytics counters, and rejection of anonymous analytics reads. The new counters were verified against the local database. Temporary test pages were removed before packaging.

## Limits

Traffic totals may be affected by privacy preferences, blockers, bots, reloads and missing referrers. A download event means the download was started, not that the file was saved. The creator cannot identify individual visitors from these totals. Educational relationship guidance does not replace individual counselling or healthcare.

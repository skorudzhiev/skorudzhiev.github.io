# Indie Log publication policy

This document defines the business rules behind `/indie/`. The page is a curated public record, not a direct mirror of repositories, deployment providers, analytics, or internal project documentation.

## Why the rules are isolated

Project copy changes often, but the meaning of “shipped,” the disclosure boundary for private work, and the evidence required for credibility statistics should change deliberately. The executable rules live in `src/data/indie-policy.ts`; approved project facts live in `src/data/indie.ts`; the page renders only the policy result.

This separation prevents a convenient deployment URL, a private repository detail, or an unverified number from silently becoming a public claim.

## Release classification

“Shipped” is a product claim, not a synonym for “there is a reachable build.”

| Public surface | Indie Log classification | Reason |
| --- | --- | --- |
| Verified product on an owned domain | Eligible for `shipped` after its actual release state is confirmed | The maker has intentionally established a public product destination. |
| Only a `*.vercel.app` URL | `active` + `public-preview`; never featured as shipped | A provider deployment can be useful for testing or sharing without being an official release. |
| Private or local build with no public product URL | Active/private stage based on approved facts | Build completeness does not prove public availability. |
| Paused or bounded experiment | Lab/archive | Preserves the lesson without implying an active release. |

The Vercel rule is deliberately narrow. If another hosting pattern needs the same treatment, add it to the policy and update this document. If a Vercel-hosted project later gains an owned domain and is intentionally released, update its facts and classification in the same change.

## Private-project disclosure

Every record declares one of two disclosure modes:

- `public-product`: may include verified public product links and public release facts.
- `private-product-facts`: uses an explicit public-facts-only boundary. It cannot publish links or become a featured story.

Private-project cards may show only deliberately approved product facts:

- product name, broad role, dates, and stage;
- plain-language purpose and capabilities;
- public-safe milestones, scope counts, lessons, and next objective;
- original imagery already approved for this page;
- a metric only when it has an approved value, source note, category, and “as of” date.

They must not show:

- private repository, deployment, preview, dashboard, or source links;
- code excerpts, file paths, branch names, infrastructure topology, hostnames, or operational commands;
- secrets, tokens, account identifiers, wallet or billing data, customer records, or individual-level activity;
- security details that would weaken the product boundary;
- speculative traction, inferred usage, or zeroes standing in for unavailable data.

The source file itself must remain an allowlist of public-safe facts. The policy projection strips private links and featured status as defense in depth, while validation fails the build if such a record attempts to declare either one.

## Credibility statistics plan

The page should earn credibility with a few attributable outcome snapshots, not a large vanity counter or live analytics feed. No new traction statistic should be published until the value is supplied and explicitly approved.

### Evidence order

Prioritize statistics in this order:

1. Real use: active installs, returning users, completed sessions, or another product-native repeat-use measure.
2. Distribution: verified downloads, extension installs, releases, or public build adoption.
3. Customer outcome: time saved, workflows completed, or a similarly direct result when it can be measured responsibly.
4. Shipping depth: versions, campaign scope, supported platforms, or deterministic test coverage when traction is not yet available. Label these as product facts, not audience traction.

Revenue belongs on the page only when it adds a useful lesson and the figure, period, currency, refunds, and reporting boundary are clear.

### Presentation

- Keep the existing portfolio counts as orientation, not proof of traction.
- Add at most three cross-project proof points beneath the portfolio snapshot once strong outcome data exists.
- Keep project-specific evidence on the relevant project card, next to its status and current state.
- Format every statistic as `value + precise label + as-of date`; expose a short source description in the card or methodology note.
- Prefer absolute, understandable values. Use percentages only with a defined denominator and period.
- Keep the page static and curated. Do not add client analytics, API keys, runtime provider calls, or automatically changing counters.

Example structure, with placeholders rather than claims:

> `[approved value] active installs`<br>
> `Verified product source · as of [date]`

### Approval checklist

Before publishing a credibility statistic:

1. Identify the source of truth and its reporting window.
2. Confirm what the number includes and excludes.
3. Check that aggregation is safe for private users and small cohorts.
4. Record the value, label, source note, category, and ISO “as of” date in the project record.
5. Obtain explicit approval for the exact public wording.
6. Capture the source evidence outside this public repository when it is private.
7. Re-run the static, browser, and visual checks; update the methodology copy if the metric introduces a new evidence type.

Stale statistics remain historical snapshots with their date. They should not be silently refreshed, extrapolated, or presented as live.

## Current decision record

- Pangolines is an active public build because its only product URL is `pangolines.vercel.app`. It is not counted or featured as shipped.
- Private-product records remain in the ledger because their approved product facts show the breadth and lessons of the work. Their private links and operational details remain out of the page.
- The credibility-statistics section remains a plan until real values and exact wording are approved; no traction values were invented for this change.

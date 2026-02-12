# Project Origin Website

Static marketing site for Project Origin: cohort results, mentor network, and community calls-to-action. The stack is pure HTML/CSS/JS—no build tooling required.

## Current State (Technical)
- **Responsive single codebase**: One HTML/CSS set with media queries (no separate mobile site).
- **Story/hero sliders**: Implemented with CSS/JS; see `hero-temp.css` and `script.js`.
- **Image-heavy content**: Assets live in `assets/` and `assets/optimized/`; referenced directly from HTML.
- **Cohort pages**: `cohort1.html` documents the program timeline, winners, and pitch sections.
- **Genesis AI (in development)**: The Genesis AI mentor experience is under active development and not production-ready.

## Key Pages
- `index.html` – Home/landing + story slider and CTA
- `cohort1.html` – Cohort 1 timeline, winners, pitch competition
- `mentors.html` – Mentor network
- `faq.html` – FAQs
- `contact.html` – Contact entry point
- `genesis.html` / `genesis-ai.html` – Genesis and AI experience (AI work-in-progress)

## Technology
- Vanilla HTML, CSS, JavaScript
- CSS: `styles.css` (global) and `hero-temp.css` (hero/story styling)
- JS: `script.js` (nav behavior, sliders, animations)

## Deployment
- Deployed via GitHub Pages from the `main` branch.
- All assets are static; no build or server step is required—push to `main` to publish.

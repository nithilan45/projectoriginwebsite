# Project Origin Website

Static marketing site for Project Origin: cohort results, mentor network, and community calls-to-action. The stack is pure HTML/CSS/JS—no build tooling required.

## Current State (Technical)
- **Frontend only**: Pure HTML/CSS/vanilla JS. No bundler, transpiler, or build step.
- **Responsive single codebase**: Media queries in `styles.css`; mobile/desktop share the same markup.
- **Story/Hero sliders**: Custom slider logic in `script.js` (DOM queries + setInterval/transform), styles in `hero-temp.css` (`.story-slide`, `.story-bg`, `.story-overlay`, `.story-text-wrapper`), driven by `data-slide` attributes.
- **Pitch carousel**: Custom auto-advancing carousel (JS-driven transform + dots) in `cohort1.html` with styling in `styles.css` (`.pitch-carousel`, `.pitch-carousel-track`, `.carousel-dot`).
- **Scroll/visibility effects**: IntersectionObserver-based animations for nav states, stats, story text, cards, and sections in `script.js`; CSS transitions for `.animate-on-scroll` and related classes.
- **Assets**: Images served directly from `assets/` and `assets/optimized/` with cache-bust query params where needed. No CDN; paths are relative.
- **Pages**: `index.html`, `cohort1.html`, `mentors.html`, `faq.html`, `contact.html`, `genesis.html`, `genesis-ai.html` (AI not production-ready), plus supporting CSS/JS.
- **Genesis AI (in development)**: The Genesis AI mentor experience is under active development and not production-ready; do not treat as stable.

## Key Pages
- `index.html` – Home/landing + story slider and CTA
- `cohort1.html` – Cohort 1 timeline, winners, pitch competition
- `mentors.html` – Mentor network
- `faq.html` – FAQs
- `contact.html` – Contact entry point
- `genesis.html` / `genesis-ai.html` – Genesis and AI experience (AI work-in-progress)

## Technology
- Markup: Vanilla HTML pages (no templates or frameworks)
- Styling: `styles.css` (global layout/typography/components), `hero-temp.css` (hero + story slider)
- Behavior: `script.js` (nav scroll state, smooth scroll, sliders, carousels, IntersectionObserver animations)
- No build tooling: edit files and push; the browser consumes raw assets.

## Deployment
- Deployed via GitHub Pages from the `main` branch.
- All assets are static; no build or server step is required—push to `main` to publish.
- Cache-busting is handled via query params on linked CSS/JS when needed.
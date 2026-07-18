# CLAUDE.md — YSK塗装 Landing Page

## Workflow Policy

- **PRは作成後、ユーザーの確認を待たずに自動でマージすること**（ready化 → squash merge まで実行する）。ユーザー（リポジトリオーナー）が2026-07-18に恒久指示済み。

## Project Overview

This is a **single-page landing page (LP)** for **YSK塗装** (YSK Painting), a painting contractor specializing in exterior wall and roof painting in Tochigi and North Kanto, Japan. The entire site is a single `index.html` file (~5,500 lines) containing embedded CSS, HTML, and vanilla JavaScript.

## Repository Structure

```
YSK-tosou/
├── index.html    # The entire landing page (HTML + CSS + JS, ~5,500 lines)
├── README.md     # Minimal project readme
└── CLAUDE.md     # This file
```

There is no build system, no package manager, no framework. The site is a static HTML file.

## Tech Stack

- **HTML5** — Semantic markup, Japanese language (`lang="ja"`)
- **Custom CSS** — Embedded in `<style>` tag (~2,000+ lines), no framework (no Bootstrap/Tailwind)
- **Vanilla JavaScript** — Embedded in `<script>` tag (~80 lines), no jQuery or external libraries
- **Google Fonts** — Noto Sans JP, Noto Serif JP, Oswald, Zen Kaku Gothic New
- **Web3Forms** — Form submission API (`https://api.web3forms.com/submit`)

## Page Architecture

The page is wrapped in a `.lp-wrap` container (max-width: 480px, mobile-first). Major sections in order:

| Section | Class/ID | Purpose |
|---------|----------|---------|
| Header | `.header-strip` | Sticky header with logo, phone number, CTA |
| Hero (FV) | `.fv` | First view with headline, badges |
| Area Banner | `.area-ticker` + `.area-section` | Scrolling ticker + service area showcase |
| Trust | `.trust-section` | Statistics, completed projects count |
| Age Concerns | `.age-concern-section` | Demographic-targeted pain points |
| Problem Empathy | `.trouble-section` | 3 customer pain points with solutions |
| Cost Comparison | `.merit1-section` | YSK vs competitors cost bar chart |
| Partners | `.partner-section-v2` | Supplier/partner trust signals |
| Couple Profile | `.couple-section` | Husband-wife team personal branding |
| Service Menu | `.menu-grid` | 5 service offering cards |
| Roof-Only | `.roof-only-section` | Roof-only project option with pricing |
| Works Gallery | `.ba-section` | 9 before/after case studies with area filters |
| Pricing Guide | `.price-section` | Price table with ranges |
| FAQ | `.faq-section` | Accordion-style FAQ (10+ items) |
| Flow | `.flow-section` | 5-step project workflow |
| CTA Banner | `.section-cta-banner` | Final CTA before contact form |
| Contact Form | `.form-section` | Lead capture form (name, phone, address, photo upload) |
| Footer | `.footer` | Company info, service areas |
| Floating Bar | `.float-bar` | Fixed bottom CTA bar (phone + form buttons) |

## CSS Design System

### Color Variables (defined in `:root`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--navy` | `#1B3A6B` | Primary dark blue |
| `--navy2` | `#2A5298` | Secondary blue |
| `--sky` | `#4A9FD4` | Sky blue accent |
| `--accent` | `#E8501A` | Orange CTA color |
| `--accent2` | `#FF6B35` | Lighter orange |
| `--gold` | `#F5C842` | Highlight/badge color |
| `--green` | `#00A832` | Success/positive |
| `--cream` | `#F0F6FC` | Light section backgrounds |
| `--text` | `#1A1A1A` | Primary text |
| `--muted` | `#5A6A7A` | Secondary text |

### Key Layout Rules

- Max-width: **480px** (mobile-optimized LP)
- Font base: **17px**, line-height **1.7**
- Box-sizing: `border-box` on all elements
- Smooth scroll behavior enabled

## JavaScript Features

1. **Works Gallery Filter** — Area-based filtering (Tochigi, Gunma, Ibaraki, Saitama) toggling `.hidden` class
2. **Photo Upload Preview** — `handleFiles()` creates FileReader previews for uploaded images
3. **Form Submission** — Async POST to Web3Forms API with validation (name, phone, address required)
4. **Smooth Scroll** — Multiple CTA buttons scroll to `#contact` section

## Development Guidelines

### Editing Conventions

- All changes go in **`index.html`** — there is only one file
- CSS sections are delimited by comment blocks: `/* ==== SECTION NAME ==== */`
- Maintain the existing CSS variable system; do not hardcode colors
- Keep mobile-first design (480px max-width constraint)
- All text content is in **Japanese**

### CTA & Contact Points

- Phone number: `tel:09040041821` (appears 11+ times throughout)
- Form submissions go to Web3Forms API (API key is embedded in the form)
- Multiple CTAs are placed strategically between content sections

### Image Handling

- No external image files are used
- Visuals are created with CSS gradients, inline SVGs, and colored placeholder divs
- Before/after gallery uses gradient backgrounds as placeholders
- SVG icons are inline (not referenced as files)

### Things to Watch Out For

- The file is large (~5,500 lines); use line offsets when reading specific sections
- CSS and JS are embedded, not in separate files
- The Web3Forms API key is embedded in the HTML — do not expose or change it without coordination
- Floating bar (`.float-bar`) is fixed-position and always visible — changes affect all pages
- The sticky header (`.header-strip`) has z-index management that interacts with the floating bar

### Commit Messages

- Write commit messages in **Japanese** to match the repository convention
- Keep messages concise and descriptive of the change

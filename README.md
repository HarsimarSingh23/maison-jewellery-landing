# Maison · Fine Jewellery

A cinematic, scroll-driven luxury jewellery landing page — built as a
portfolio piece to attract clients for custom websites.

Hand-coded with **React + TypeScript + Tailwind CSS v4 + GSAP ScrollTrigger**.

![Maison hero](https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&auto=format&fit=crop)

---

## ✨ The signature effect

A scroll-triggered **zoom-into-product** reveal: the camera flies *into* a
solitaire ring, then a glass card swirls open with the brand promise — inspired
by Apple product pages.

```
0%  ─ 55% → image scales 1 → 4.5, rotates −18° → 0°, dims to 55% brightness
45% ─ 65% → dark vignette fades in to set the stage
55% ─ 95% → glass card swirls open (rotate −22° → 0°, scale 0.55 → 1)
78% ─100% → bullet titles stagger-reveal from the left
```

All driven by a single pinned `ScrollTrigger` with `scrub: 1` across 250vh.

---

## Sections

| # | Section | Animation |
|---|---------|-----------|
| 1 | **Hero** | Full-screen jewellery image zooms `1 → 1.18` on scroll |
| 2 | **Zoom Reveal** | Camera flies into a ring; glass card swirls in with bullets |
| 3 | **Collections** | 3 alternating product cards; images zoom from 0.85 → 1 on entry |
| 4 | **The House** | Pinned section with 4 brand-story chapters + color shifts |
| 5 | **Atelier** | Parallax background + 6-cell specs grid with stagger reveal |
| 6 | **Numbers** | Animated counter cards (heritage, generations, stones, ethics) |
| 7 | **Gallery** | 7-image masonry with alternating zoom-in/zoom-out effects |
| 8 | **CTA** | 3 pricing tiers + contact strip — all CTAs mail the founder |

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Build:

```bash
npm run build
npm run preview
```

---

## Project structure

```
src/
├── App.tsx                          GSAP global config + section assembly
├── index.css                        Tailwind v4 + theme tokens + utilities
├── hooks/
│   └── useScrollProgress.ts         scroll % + IntersectionObserver hook
├── lib/
│   ├── contact.ts                   ← one source of truth for the mailto email
│   └── utils.ts                     cn(), lerp(), clamp()
└── components/
    ├── ui/
    │   └── Navigation.tsx           sticky glass nav + gold progress bar
    └── sections/
        ├── HeroSection.tsx
        ├── ZoomRevealSection.tsx    ← the signature effect
        ├── FeaturesSection.tsx      → "Collections"
        ├── CinematicSection.tsx     → "The House" (pinned chapters)
        ├── DetailsSection.tsx       → "Atelier" (specs)
        ├── PerformanceSection.tsx   → "Numbers" (animated counters)
        ├── GallerySection.tsx       → "Gallery" (alternating zoom)
        └── CTASection.tsx           → pricing tiers + contact strip
```

---

## Configuring the contact email

Every CTA on the page (8 mailto links) routes through a single constant:

```ts
// src/lib/contact.ts
export const CONTACT_EMAIL = 'sainiharsimar@gmail.com';
```

Change this one line and every "Hire me", "Get a site like this", and pricing
CTA updates instantly.

---

## Performance & accessibility

- `force3D: true` and `will-change: transform` for GPU-accelerated animations
- `ScrollTrigger.config({ limitCallbacks: true })` to avoid jank on rapid scroll
- All non-hero images `loading="lazy"`; hero is `fetchPriority="high"`
- Skip-to-content link for keyboard users
- Semantic landmarks (`<main>`, `<nav>`, `<section aria-label>`, `<footer>`)
- Mobile menu with `aria-expanded` + focus management

---

## Tech

| | |
|--|--|
| Build | Vite 6 |
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Animation | GSAP 3 + ScrollTrigger |
| Fonts | Cormorant Garamond (serif) + Inter (sans) |

---

## License

MIT — feel free to fork it for your own brand.

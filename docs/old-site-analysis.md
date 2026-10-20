# Old site analysis — `Ravn` (ravn-9xr5.onrender.com)

Recon performed on the cloned repo (`github.com/0xjave-dot/Ravn`, branch `main`) plus a
Playwright pass over the live deployment at 1440×900 and 390×844.

> Why the live deployment rather than a local `npm run dev`: the repo boots a Firebase
> client (`firebase-applet-config.json`) and an Express server entry that are not part of the
> visual layer. The deployed build is byte-identical for layout/copy purposes, so the live URL
> was captured instead of standing up a second server. Screenshots: `recon/shots/old-ravn/`.

---

## 1. Sections and their order

| # | Section | Component | What it does |
|---|---------|-----------|--------------|
| — | Nav | inline in `HeroSection` | No wordmark, no links. A single top-right status pill — "Agency Website Under Construction (Slowly)" in matrix green `#00FF41` — plus a pulsing dot. |
| 01 | **Hero** | `HeroSection.tsx` | Full-viewport. A 3D cut-out portrait sits behind/under a `7–9vw` black uppercase headline: *"Hey, I'M JESSE, I uhh… I build stuff"*. Bottom-left aside copy, bottom-right gradient "Find Me" pill (WhatsApp). Vertical side rails ("Portfolio / 2026 / Digital Arts", "Based in Los Angeles / Worldwide"). |
| 02 | **Marquee** | `MarqueeSection.tsx` | Two counter-scrolling rows of tech chips (logo + mono label): HTML, CSS, JS, React, Next, Tailwind, Node, Express, Python, Django, Mongo, Postgres, MySQL, Firebase, Supabase, Pandas, NumPy, Jupyter / Figma, Framer, GA, Search Console, Ahrefs, SEMrush, Notion, Obsidian, WordPress, Medium, Canva, Git, GitHub, Vercel, Netlify, Docker, Postman. Pauses on hover. |
| 03 | **About** | `AboutSection.tsx` | Centred, `min-h-screen`. Huge gradient "About me" heading (`clamp(3rem, 12vw, 160px)`), four decorative 3D PNGs absolutely positioned at the corners, a scroll-scrubbed word-by-word paragraph (`AnimatedText`), and a WhatsApp CTA. |
| 04 | **Services** | `ServicesSection.tsx` | White section with a 40–60px top radius. 9 numbered rows (`01`–`09`), each a giant numeral, a name and a long, jokey paragraph. |
| 04.5 | **Location tracker** | `LocationTracker.tsx` | Renders `null` unless `?radar=true` / `?admin=true`. Reads IP geolocation + browser GPS and writes each visit to Firestore, then shows a live "spatial radar" table. Internal toy, not public IA. |
| 05 | **Recent Builds** | `ProjectsSection.tsx` | Sticky-stacked cards (each `sticky`, `top: index*36+60`, scaled down by scroll progress). Six cards labelled *Project 01 … Project 06* with categories "Concept Render / Procedural Mesh / Fluid Simulation" and generic Higgs AI renders. Clicking opens `ProjectDetailModal`. |
| — | Overlays | `ContactModal`, `ProjectDetailModal` | Two full-screen modals for contact and project detail. |

Effective public order: **Hero → Marquee → About → Services → Recent Builds**, with contact
available from three separate entry points (hero pill, About CTA, modal).

## 2. What works — carry this over

1. **Section rhythm.** Short, punchy blocks in a fixed order; the site reads in ~4 scrolls.
2. **Oversized type as structure.** One display size (`clamp(3rem, 12vw, 160px)`) reused for
   every section title gives the page a spine. Numbers (`01`–`09`) do the wayfinding.
3. **Marquee directly under the hero** as a palette-cleanser / capability strip. Keep the slot.
4. **Sticky-stack project cards.** A genuinely good idea: cards pile up and scale down. Worth
   keeping in spirit, rebuilt as a pinned horizontal/scroll-driven sequence with real projects.
5. **Magnetic portrait + masked text reveal** — the two moments where the old site feels alive.
6. **WhatsApp-first CTA.** For a Lagos freelance business this converts; it stays as a primary
   channel (but becomes one of three deliberate paths, not three duplicated buttons).
7. **Rotated side rails** ("Portfolio / 2026", coordinates feel). The new site keeps this idea
   as mono micro-labels rather than decorative rails.

## 3. What is generic or weak — rebuild

1. **No navigation at all.** No wordmark, no links, no section awareness. A visitor cannot jump
   to work. The new site gets a fixed nav with active-section highlighting and a mobile overlay.
2. **Placeholder work.** "Project 01 / Concept Render" with borrowed AI renders — the single
   biggest credibility problem for a client-facing portfolio. Replaced by four real, screenshot-
   verified case studies at `/work/:slug`.
3. **About copy is a joke chain** ("Imaginator", "am I on the spectrum?"). It's funny once and
   expensive in a sales context. New copy is short, specific and human, with one dry aside.
4. **Services is a 9-item wall of paragraphs** in a white card that fights the dark page. New
   version: 4–6 expanding rows, each with number, one-line promise, and detail on open.
5. **Tech marquee lists 33 logos** including things not actually used (Django, Pandas, NumPy,
   Ahrefs, Medium). Reads as noise, not proof. New strip is 12–14 real ones, velocity-reactive.
6. **No SEO / share surface.** `<title>Raven</title>`, no description, no OG, no favicon set, no
   sitemap, no JSON-LD. The whole new site is built for link previews and search.
7. **Accessibility gaps.** No landmarks, no skip link, no focus styling, no keyboard path through
   modals, gradient text with poor contrast, motion with no `prefers-reduced-motion` fallback.
8. **No theme, no texture, no system.** Colours are hard-coded hex in JSX (`#0C0C0C`, `#D7E2EA`)
   in ~40 places. New build defines every colour as a CSS variable / Tailwind token with a real
   light theme.
9. **Dead weight shipped to the client.** Gemini SDK, Express, dotenv and a Firestore privacy
   toy in a static portfolio. Nothing unused ships in v2.
10. **Typography is one face (Kanit) at many weights.** Competent but anonymous. v2 pairs a
    display face with a text face and a mono, and uses italic/outline contrast inside lines.

## 4. Copy and structure to carry over

**Structure (kept as the skeleton):** Hero → Marquee → Work → About → Services → Process/Tech →
Testimony → Contact/Footer. Insertion of *Work* immediately after the marquee is the one
deliberate IA change: the brief is project-led, and a client should see proof before prose.

**Copy carry-over (rewritten, same intent):**

| Old | New |
|-----|-----|
| "Hey, I'M JESSE, I uhh… I build stuff" | "RAVEN / MAKES / websites." — the same first-person swagger, minus the apology. |
| "Find Me" WhatsApp pill | "Send word" in the nav, plus an explicit WhatsApp / email block in contact. |
| "Agency Website Under Construction (Slowly)" | "Permanently under construction" rail in the hero, and "Open for work — slowly, but open". |
| "About me" + the joke chain | "The bird": a specimen sheet (species, range, habitat, call, diet, social), a short honest bio, footnotes, known bugs, special interests. |
| "Services" 01–09 | "What the bird does": 05 capabilities, one promise per row. |
| "Recent Builds" (6 placeholders) | "Field records": four real client sites with notes, stamps and case studies. |
| Tech marquee (33 logos) | Velocity-reactive capability belt. |
| "Imaginator" / spectrum joke / LOTR, Warhammer, zoology, tank engines | Kept as the *personality layer* — a footnote, a known-bugs list, and a special-interests row — rather than as the pitch. |
| Decorative 3D objects (moon, lego, blob, group) | Reused as the actual artwork: the bird is the logo, the hero plate, the about photograph, and the "something from the hoard" in contact. |

## 5. Design tokens (old → new)

- Base `#0C0C0C` → `#0A0A0B` (slightly deeper).
- Body `#D7E2EA` (cool blue-white) → `#EDEAE3` (warm off-white, more editorial).
- Old accent: magenta→purple→orange gradient (`#B600A8 → #7621B0 → #BE4C00`) plus matrix green
  `#00FF41`. Both loud but unowned. New signature accent: **acid lime `#C6FF3D`** — it sits well
  against all four client palettes (brown interiors, cream export site, ivory spa, near-black
  artist site) without colliding with any of them. A secondary oxide `#FF5C2E` is used only for
  stamps and error states.
- Section caps `rounded-t-[40–60px]` → dropped. Hairline rules, registration marks and full-bleed
  bands suit the specimen/terminal direction better than soft rounded cards.
- Typography: one face (Kanit) → three roles: Space Grotesk (display grotesk), Instrument Serif
  (italic accent words), JetBrains Mono (labels, catalogue numbers), with Inter for body text.


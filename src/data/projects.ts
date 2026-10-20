/**
 * Case-study content for the five live projects.
 *
 * Facts below were observed directly from the live sites during recon
 * (screenshots in `public/projects/<slug>/`, notes in `docs/old-site-analysis.md`
 * and `docs/gic-analysis.md`).
 * Anything unverifiable is written as `{{TODO: …}}` rather than invented.
 */

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  /** Year the build went live. All five were live and advertising 2026 at recon time. */
  year: string;
  client: string;
  role: string[];
  stack: string[];
  liveUrl: string;
  /** One line used on cards / the index list. */
  summary: string;
  /** Deadpan one-liner for the specimen plate. */
  note: string;
  /** Rubber-stamp word on the plate. */
  stamp: string;
  /** Longer standfirst for the case-study hero. */
  standfirst: string;
  /** Sampled from the live site's own palette. */
  theme: {
    bg: string;
    fg: string;
    accent: string;
  };
  images: {
    hero: ProjectImage;
    full: ProjectImage;
    mobile: ProjectImage;
  };
  overview: string;
  challenge: string;
  built: string[];
  /** Every entry must be an observable fact, not a metric we made up. */
  facts: ProjectFact[];
  resultsNote: string;
}

export const projects: Project[] = [
  {
    slug: 'gic',
    index: '01',
    name: 'Kingdom Comms',
    shortName: 'Kingdom Comms',
    category: 'Church communications platform',
    year: '2026',
    client: 'Global Impact Church (GIC) — Lagos, Abuja & diaspora',
    role: ['Product design', 'Full-stack build', 'Backend & data model', 'Push infrastructure'],
    stack: [
      'React',
      'TypeScript',
      'Node',
      'Hono',
      'PostgreSQL',
      'Drizzle ORM',
      'Firebase Cloud Messaging',
      'Cloudflare R2',
    ],
    liveUrl: 'https://gic-admin-static.onrender.com/',
    summary:
      'A church messaging app for sharing updates with the right members, without the cost of SMS.',
    note: 'Church updates, sent straight to members’ phones.',
    stamp: 'In production',
    standfirst:
      'Churches do not have a communications problem. They have a maths problem — and the fix was to stop sending SMS at all.',
    theme: { bg: '#F3F4F8', fg: '#171A2B', accent: '#4B20B5' },
    images: {
      hero: {
        src: '/projects/gic/hero.webp',
        width: 1440,
        height: 900,
        alt: 'Kingdom Comms message composer: a reminder titled “Mid-week service tonight”, audience set to the Male Members segment, with a live preview of the push notification a member would receive',
      },
      full: {
        src: '/projects/gic/full.webp',
        width: 1200,
        height: 881,
        alt: 'Kingdom Comms Units: fourteen church units and fellowships — Protocol, Security, Pastors, Media Ministry, Choir, Youth Fellowship — each with its description, member count and status',
      },
      mobile: {
        src: '/projects/gic/mobile.webp',
        width: 750,
        height: 1966,
        alt: 'The GIC member app on a phone: the latest Mixlr sermon recording with a player, the next service at The Goodland, upcoming events and a profile-completion prompt',
      },
    },
    overview:
      'Global Impact Church had five branches, a congregation in the thousands and one way to reach them: SMS, at about ₦5 a message. At that price the arithmetic is brutal — a handful of broadcasts a year, no detail, no images, no links. Kingdom Comms replaces that with a member app and an admin panel over a shared API. Members install a PWA and get push notifications; admins compose messages, pick exactly who receives them, and schedule them. A push notification costs the church nothing, so the thing that was rationed by money stops being rationed.',
    challenge:
      'The obvious version of this is a WhatsApp broadcast list, and it fails immediately: no targeting, no scheduling, no delivery record, no way to attach a flyer, and every message is read on a phone that may be out of data. The hard version is a system that knows who each member is — which branch they attend, their age group, their relationship status, which unit they serve in, which fellowship they belong to — and can therefore send one message to the exact people who need it. That meant a real data model, not a contact list: members, ministries, cells, segments, age groups, events, registrations and pickups all as first-class rows. It also meant a delivery channel that a church can afford indefinitely, and an onboarding path short enough that a congregation with mixed smartphones will actually complete it.',
    built: [
      'Three services over one API — a member PWA, the Kingdom Comms admin panel, and a Hono/Postgres backend — deployed separately on Render so a bad admin deploy cannot take the member app down.',
      'The member app: a PWA whose home screen carries the week’s sermon recording, the next service and upcoming events, with Units where members browse and apply to serve, announcements, event registration and a profile the admin panel can fill in.',
      'A targeting engine with eight filters: gender, age group, relationship status, centre, membership status, joined-within-months, ministry and cell. Segments can be automatic (rule-based) or hand-picked, and the composer shows a live audience estimate before anything is sent.',
      'An admin panel over the same data — members, attendance, units and fellowships, segments, events with registration forms and bus-pickup logistics, campaigns, and an activity log.',
      'Scheduled and immediate campaigns with five categories and a tap destination, plus a “preview as member” panel that renders the notification exactly as the phone will show it.',
      'Attendance check-ins: an admin schedules a pulse for a service occurrence — “are you in church?” or “how was it?” — and members answer in person, online or not attending from the app.',
      'A Mixlr integration so the week’s sermon recording plays inside the member app, and a service worker that caches the app shell so the app still opens without a network. The Mixlr feed is also an announcement channel: it posts the new recording to every member automatically, with a deep link into the recording.',
      'Tenant-scoped Postgres with 26 Drizzle migrations, signed JWT sessions, Firebase custom claims for admin roles, device-based member sign-in and phone-based account recovery.',
    ],
    facts: [
      { label: 'Surfaces', value: 'Member PWA · Admin panel · API' },
      { label: 'Targeting', value: '8 filters · automatic + manual segments' },
      { label: 'Branches served', value: '5 — Lagos (×4) & Abuja' },
      { label: 'Units & fellowships', value: '14 — with member counts and leaders' },
      { label: 'Data model', value: 'Postgres · 26 migrations · tenant-scoped' },
      { label: 'Delivery', value: 'Firebase Cloud Messaging — no per-message cost' },
      { label: 'Live broadcasts', value: '21 sent · 0 delivery failures' },
      { label: 'Repository', value: '3 apps · 211 commits' },
    ],
    resultsNote:
      'The Mixlr announcement automation has been running in production since 4 October 2026: 21 broadcasts sent, every one with zero delivery failures. Everything else on this page describes what the system can do rather than what it has done — the church has not onboarded the congregation yet, so no adoption or reach figures are claimed. The SMS saving is the arithmetic the platform was built to solve: at ₦5 a message, a broadcast to a few thousand members costs more than most churches earn from a mid-week service.',
  },
  {
    slug: 'zanori',
    index: '02',
    name: 'Zanori Spaces',
    shortName: 'Zanori',
    category: 'Interior design gallery',
    year: '2026',
    client: 'Zanori Spaces — interior & exterior design studio, Lagos',
    role: ['UI/UX design', 'Front-end build', 'Brand presence'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    liveUrl: 'https://zanorispaces.com/',
    summary: 'A home for Zanori Spaces’ interior projects, services and shop, built around the studio’s photography.',
    note: 'Room to explore the studio’s work before getting in touch.',
    stamp: 'Live',
    standfirst:
      'A design studio whose work sells itself — so the site is built to get out of the way of the photography.',
    theme: { bg: '#2A1C17', fg: '#F8F5EE', accent: '#9E1B32' },
    images: {
      hero: {
        src: '/projects/zanori/hero.webp',
        width: 1440,
        height: 900,
        alt: 'Zanori Spaces homepage: full-bleed interior photograph under a large serif headline',
      },
      full: {
        src: '/projects/zanori/full.webp',
        width: 1200,
        height: 5873,
        alt: 'Full-page view of the Zanori Spaces homepage',
      },
      mobile: {
        src: '/projects/zanori/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'Zanori Spaces on a mobile viewport',
      },
    },
    overview:
      'Zanori Spaces is an interior and exterior design studio in Lagos. The site is a gallery first: a full-bleed interior hero, a services catalogue covering design, consultation, styling, furniture and 3D visualisation, a founder statement, featured projects, and a shop with an account area. Everything sits under one warm editorial identity — espresso brown, cream and crimson.',
    challenge:
      'Interior work lives or dies on the photography, and Zanori’s is dense and warm. A conventional card grid flattens it. The brief was to keep the images enormous — a photograph you can fall into on arrival — while still giving a first-time visitor one obvious next step: book a consultation. It also had to carry a shop and a client account without the gallery losing its weight.',
    built: [
      'Full-bleed landing built around a three-line serif headline, with a paired “Book a consultation” / “View portfolio” call to action.',
      'A services catalogue with six distinct offerings, each written and laid out as a standalone block rather than a list item.',
      'A founder-led about section with an editorial two-column layout and animated counters for completed projects and clients.',
      'Featured projects gallery, process section and a dark rounded band that separates the gallery from the studio narrative.',
      'Persistent WhatsApp contact, a “Get in touch” header action and a shop/account entry point in the navigation.',
      'A brand palette lifted from the studio’s own material: espresso #2A1C17, cream #F8F5EE, crimson #9E1B32.',
    ],
    facts: [
      { label: 'Status', value: 'Live on a custom domain' },
      { label: 'Routes', value: 'Home · Work · Services · Shop · Account' },
      { label: 'Services shown', value: '6' },
      { label: 'Display face', value: 'Playfair Display' },
    ],
    resultsNote:
      'No third-party analytics were available at recon time, so no traffic or conversion claims are made here.',
  },
  {
    slug: 'apreeltree',
    index: '03',
    name: 'Apreeltree',
    shortName: 'Apreeltree',
    category: 'B2B export platform',
    year: '2026',
    client: 'Apreeltree — premium Nigerian food bulk export',
    role: ['UI/UX design', 'Full-stack build', 'Catalogue architecture'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node'],
    liveUrl: 'https://apreeltree.onrender.com/',
    summary: 'A catalogue of Nigerian food staples for buyers looking to order in bulk from abroad.',
    note: 'A straightforward way for overseas buyers to explore Nigerian produce.',
    stamp: 'Live',
    standfirst:
      'When your buyer is 5,000km away and spending five figures, trust is the product. The site had to prove it before the first scroll ended.',
    theme: { bg: '#F5EFE0', fg: '#1A3728', accent: '#C2673A' },
    images: {
      hero: {
        src: '/projects/apreeltree/hero.webp',
        width: 1440,
        height: 900,
        alt: 'Apreeltree homepage: cream background, forest-green headline reading “Nigeria’s finest, to your table”',
      },
      full: {
        src: '/projects/apreeltree/full.webp',
        width: 1200,
        height: 3736,
        alt: 'Full-page view of the Apreeltree export site',
      },
      mobile: {
        src: '/projects/apreeltree/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'Apreeltree on a mobile viewport',
      },
    },
    overview:
      'A B2B export storefront for Nigerian staples — ofada rice, honey beans, egusi, ogbono, crayfish and smoked catfish — sold in bulk to buyers in Europe and the USA. The site carries a 23-product catalogue with grades and starting prices, an export logistics explainer, trust marks, and a WhatsApp-first quote path.',
    challenge:
      'An export buyer needs to believe the seller before price is even worth discussing: who farms it, how it is cleaned, which certifications exist, how it ships, and what happens if customs asks questions. Most small-export sites bury all of that. The job was to surface the proof directly under the headline, then make a quote request take one tap.',
    built: [
      'A trust bar above the fold: shipping notice, air and sea freight availability, WhatsApp support line.',
      'Hero pairing a serif/italic display lockup with a rotated product card and a NAFDAC-certified seal.',
      'A 23-product catalogue grouped by category (grains, condiments, smoked fish), each with origin, grade description and a starting price.',
      'A four-step export logistics explainer: enquiry, sourcing and processing, documented shipping, delivery.',
      'A quote flow built on WhatsApp, repeated as a dedicated terracotta band at the foot of the page.',
      'Palette and type drawn from the brand: cream #F5EFE0, forest #1A3728, terracotta #C2673A, Fraunces display.',
    ],
    facts: [
      { label: 'Catalogue', value: '23 products' },
      { label: 'Markets named', value: 'Europe & USA' },
      { label: 'Site claims', value: '14 countries · 500+ bulk orders' },
      { label: 'Certification shown', value: 'NAFDAC' },
    ],
    resultsNote:
      'The figures above are the site’s own published claims. Real order volume should be confirmed before they are quoted anywhere else.',
  },
  {
    slug: 'fitables',
    index: '04',
    name: 'Fitables Beauty Bar',
    shortName: 'Fitables',
    category: 'Spa booking platform',
    year: '2026',
    client: 'Fitables Beauty Bar — Lekki Phase I, Gbagada & Surulere, Lagos',
    role: ['UI/UX design', 'Booking flow', 'Full-stack build'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://fitables.onrender.com/',
    summary:
      'A spa site for browsing treatments, checking the three Lagos locations and booking a session.',
    note: 'Find a treatment, choose a location and book a visit.',
    stamp: 'First client',
    standfirst:
      'The first major client. Three branches, dozens of priced treatments, and a brand that had to feel like the price tag.',
    theme: { bg: '#F9F6F2', fg: '#123B2C', accent: '#C9A227' },
    images: {
      hero: {
        src: '/projects/fitables/hero.webp',
        width: 1440,
        height: 900,
        alt: 'Fitables Beauty Bar homepage: ivory layout, “Beauty, as Art” serif headline and a treatment photograph',
      },
      full: {
        src: '/projects/fitables/full.webp',
        width: 1200,
        height: 5539,
        alt: 'Full-page view of the Fitables Beauty Bar site',
      },
      mobile: {
        src: '/projects/fitables/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'Fitables Beauty Bar on a mobile viewport',
      },
    },
    overview:
      'A luxury spa, salon and skincare brand with locations in Lekki Phase I, Gbagada and Surulere. The site carries the full treatment menu — massages, facials, exfoliation, waxing, pedicures — with prices, durations and descriptions, plus booking, gifting a session, therapist profiles, locations and hours.',
    challenge:
      'A service business with three branches and dozens of treatments competes with walk-ins and DMs. The booking path has to be short enough to use on a phone in traffic, while the brand has to justify ₦20,000 massages. That means a menu that stays legible at 30+ items, per-location availability, and a hero that sells the room before it sells the price.',
    built: [
      'A treatment catalogue organised by category tabs, with price, duration and a plain-language description for each service.',
      'A booking session flow, a “gift a session” path, therapist profiles, sign-in and a persistent “Book session” action.',
      'A rotating testimonial carousel with verified-review styling and a 2,000+ client claim.',
      'A cherry-blossom canvas animation in the hero — petals drifting across the layout without touching scroll performance.',
      'Locations and hours for all three branches, each with its own contact block.',
      'An ivory/deep-green palette with Cormorant Garamond display type and blush blossom accents.',
    ],
    facts: [
      { label: 'Locations', value: '3 — Lekki, Gbagada, Surulere' },
      { label: 'Treatments listed', value: '30+' },
      { label: 'Site claims', value: '2,000+ clients · verified reviews' },
      { label: 'Entry price shown', value: '₦7,000' },
    ],
    resultsNote:
      'Booking conversion data was not available at recon time. The client counts are the site’s own claims.',
  },
  {
    slug: 'dudja',
    index: '05',
    name: 'DUDJA',
    shortName: 'DUDJA',
    category: 'Artist brand site',
    year: '2026',
    client: 'DUDJA — rapper, producer, singer-songwriter (Boston, MA)',
    role: ['Art direction', 'Front-end build', 'Booking flow'],
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://dudja.onrender.com/',
    summary:
      'DUDJA’s home online for music, videos, merch and booking, with a look shaped around the artist’s sound.',
    note: 'Music, merch and booking, all in one place.',
    stamp: 'Live',
    standfirst:
      'A musician’s site has one job in the first second: make you feel the record before you press play.',
    theme: { bg: '#0B0C0C', fg: '#D4CFC8', accent: '#E0502B' },
    images: {
      hero: {
        src: '/projects/dudja/hero.webp',
        width: 1440,
        height: 900,
        alt: 'DUDJA homepage: split DUDJA wordmark in bone and vermilion over a dark Boston streetscape',
      },
      full: {
        src: '/projects/dudja/full.webp',
        width: 1200,
        height: 3628,
        alt: 'Full-page view of the DUDJA official site',
      },
      mobile: {
        src: '/projects/dudja/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'DUDJA official site on a mobile viewport',
      },
    },
    overview:
      'The official site for DUDJA, a Boston-based rapper, producer and singer-songwriter making what the site calls “sonic brutalism” — alternative, electronic and soul, recorded cold and underground. The site runs music, vision, merch and booking as four clear routes, with a lyric console and streaming everywhere.',
    challenge:
      'An artist site has to sell a mood instantly, then get out of the way. Music, merch and booking are three different jobs with three different audiences, and they usually collapse into a menu maze. The other constraint: the music references tape saturation and film scores — the interface had to look analog and recorded, not like a template with a photo on it.',
    built: [
      'A full-height hero with a split “DUD / JA” wordmark, a Boston streetscape, and a status chip reading “BOSTON, MA // SONIC BRUTALISM”.',
      'A music section with discography (I Miss My Heart, Moving On, Egotistical Bastards, Everything Is NOT Awesome!!!), Spotify and SoundCloud embeds.',
      'A lyric console — release year, a timed transcript and a play state — presented like studio hardware.',
      'A vision/manifesto section with an artist dossier and a pull quote, laid out as an editorial spread.',
      'A booking inquiry form, merch storefront and a sticky Spotify link in the header.',
      'A restrained palette (near-black #0B0C0C, bone #D4CFC8, vermilion #E0502B) with Bebas Neue, DM Sans and Space Mono.',
    ],
    facts: [
      { label: 'Releases listed', value: '4' },
      { label: 'Streaming', value: 'Spotify · Apple · SoundCloud · Tidal · YouTube' },
      { label: 'Routes', value: 'Music · Vision · Merch · Booking' },
      { label: 'Artist base', value: 'Boston, MA' },
    ],
    resultsNote: 'Streaming numbers and sales were out of scope at recon time — nothing is claimed here.',
  },
];

export const projectSlugs = projects.map((project) => project.slug);

export function getProject(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const next = projects[(index + 1) % projects.length];
  return next ?? projects[0]!;
}

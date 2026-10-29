/**
 * Case-study content for the six live projects.
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
  /** Shown under the image in the lightbox. */
  caption?: string;
}

/** A recorded browsing session of the live project (WebM + MP4, with a WebP poster). */
export interface ProjectVideo {
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
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
  /** Year the build went live. All six were live and advertising 2026 at recon time. */
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
  /**
   * Extra views of the project beyond the three set-pieces. Every entry opens
   * in the lightbox. Observed from the live site during recon.
   */
  gallery: ProjectImage[];
  /**
   * Recorded sessions of the project in use. The first is the desktop session
   * shown in the case-study hero and on the homepage panel.
   */
  sessions: ProjectVideo[];
  /** What was actually handed over at the end. */
  deliverables: string[];
  /** Technical detail observed on the live deployment. */
  tech: ProjectFact[];
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
    liveUrl: 'https://kingdom-comms-landing.onrender.com/',
    summary:
      'A church management platform for planning events and managing church population., and sharing information with members without SMS costs.',
    note: 'Church updates, sent straight to members’ phones.',
    stamp: 'In production',
    standfirst:
      'Churches do not have a communications problem. They have a maths problem — and the fix was to stop sending SMS at all.',
    theme: { bg: '#F7F5F4', fg: '#0F0D1A', accent: '#F15A25' },
    images: {
      hero: {
        src: '/projects/gic/hero.webp',
        width: 1440,
        height: 900,
        alt: 'Kingdom Comms landing page: “Run your church. Reach every member.” above a preview of the admin console dashboard',
      },
      full: {
        src: '/projects/gic/full.webp',
        width: 1076,
        height: 11000,
        alt: 'Full-page view of the Kingdom Comms landing page: product tour, use cases, the member app, setup steps, early access and FAQs',
      },
      mobile: {
        src: '/projects/gic/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'The Kingdom Comms landing page on a phone, with the early-access and book-a-demo calls to action',
      },
    },
    gallery: [
      {
        src: '/projects/gic/admin-composer.webp',
        width: 1440,
        height: 900,
        alt: 'Kingdom Comms message composer: a reminder titled “Mid-week service tonight”, audience set to the Male Members segment, with a live preview of the push notification a member would receive',
        caption: 'Message composer — pick the audience, preview the notification',
      },
      {
        src: '/projects/gic/member-home.webp',
        width: 750,
        height: 1966,
        alt: 'The GIC member app on a phone: the latest Mixlr sermon recording with a player, the next service at The Goodland, upcoming events and a profile-completion prompt',
        caption: 'Member app — this week’s sermon, the next service, upcoming events',
      },
      {
        src: '/projects/gic/admin-units.webp',
        width: 1200,
        height: 881,
        alt: 'Kingdom Comms Units: fourteen church units and fellowships — Protocol, Security, Pastors, Media Ministry, Choir, Youth Fellowship — each with its description, member count and status',
        caption: 'Units — fourteen units and fellowships, with members and leaders',
      },
      {
        src: '/projects/gic/admin-segments.webp',
        width: 1200,
        height: 750,
        alt: 'Kingdom Comms Segments panel: audience classifications with automatic and manual types, rule counts and live member counts',
        caption: 'Segments — automatic rules and hand-picked audiences, side by side',
      },
      {
        src: '/projects/gic/admin-messages.webp',
        width: 1200,
        height: 750,
        alt: 'Kingdom Comms Messages panel: the sent broadcast history, each row showing the campaign title and delivery count',
        caption: 'Campaign history — every broadcast, with its audience and delivery count',
      },
      {
        src: '/projects/gic/member-units.webp',
        width: 780,
        height: 1688,
        alt: 'The GIC member app, Units tab: a “you haven’t joined a unit yet” state with an “I want to serve!” call to action',
        caption: 'Member app — browsing and applying to serve in a unit',
      },
      {
        src: '/projects/gic/member-events.webp',
        width: 780,
        height: 1688,
        alt: 'The GIC member app, Events tab: upcoming services with dates, times and the centre the member attends',
        caption: 'Member app — upcoming services and events',
      },
    ],
    sessions: [
      {
        webm: '/projects/gic/session.webm',
        mp4: '/projects/gic/session.mp4',
        poster: '/projects/gic/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live Kingdom Comms landing page site, scrolling from the hero through the page',
        caption: 'Kingdom Comms landing page — live site, desktop session',
      },
      {
        webm: '/projects/gic/admin-dashboard.webm',
        mp4: '/projects/gic/admin-dashboard.mp4',
        poster: '/projects/gic/admin-dashboard.webp',
        width: 1600,
        height: 1000,
        alt: 'The Kingdom Comms admin dashboard filling in: member, event and message totals, the service attendance chart and the latest check-in',
        caption: 'Admin — the dashboard loading live data',
      },
      {
        webm: '/projects/gic/member-app.webm',
        mp4: '/projects/gic/member-app.mp4',
        poster: '/projects/gic/member-app.webp',
        width: 780,
        height: 1688,
        alt: 'The member app on a phone: the home screen with the latest sermon, opening the Youth Fellowship Retreat event, then browsing units',
        caption: 'Member app — home, an event, units',
      },
      {
        webm: '/projects/gic/admin-announcements.webm',
        mp4: '/projects/gic/admin-announcements.mp4',
        poster: '/projects/gic/admin-announcements.webp',
        width: 1200,
        height: 950,
        alt: 'Writing an announcement to the Choir in the composer, with the phone preview updating as it is typed',
        caption: 'Admin — writing an announcement, previewed live',
      },
      {
        webm: '/projects/gic/admin-events.webm',
        mp4: '/projects/gic/admin-events.mp4',
        poster: '/projects/gic/admin-events.webp',
        width: 1200,
        height: 936,
        alt: 'Setting up an event in the admin: title, venue and a church bus pickup with its time',
        caption: 'Admin — setting up an event with a bus pickup',
      },
      {
        webm: '/projects/gic/admin-attendance.webm',
        mp4: '/projects/gic/admin-attendance.mp4',
        poster: '/projects/gic/admin-attendance.webp',
        width: 1200,
        height: 616,
        alt: 'Switching between Sundays in the attendance report',
        caption: 'Admin — attendance, Sunday by Sunday',
      },
    ],
    deliverables: [
      'A member PWA — offline app shell, push notifications, service times and sermon playback',
      'An admin panel covering members, attendance, units, segments, events, campaigns and an activity log',
      'A Hono API with signed JWT sessions, Firebase-claim admin roles and 26 database migrations',
      'A targeting engine — eight filters, automatic rule-based segments and hand-picked audiences',
      'An event manager with registration forms, capacity limits, waitlists and per-branch bus logistics',
      'A written security audit with a prioritised fix list, and the fixes themselves',
      'A public landing page with an early-access waitlist, demo booking and WhatsApp contact',
    ],
    tech: [
      { label: 'Backend', value: 'Hono on Node · PostgreSQL · Drizzle ORM' },
      { label: 'Deploy', value: 'Four services on Render + managed Postgres' },
      { label: 'Delivery', value: 'Firebase Cloud Messaging · media on Cloudflare R2' },
      { label: 'Data model', value: 'Tenant-scoped: members, ministries, cells, segments, events' },
      { label: 'Member app', value: 'React PWA · service worker · live Mixlr feed' },
      { label: 'Tests', value: '35 backend · 24 member · 6 admin' },
    ],
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
      { label: 'Surfaces', value: 'Landing page · Member PWA · Admin panel · API' },
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
    slug: 'indrive',
    index: '02',
    name: 'inDrive Open API Nigeria',
    shortName: 'inDrive API',
    category: 'Developer API concept',
    year: '2026',
    client: 'Self-initiated concept — not an inDrive product, not affiliated with inDrive',
    role: ['API design', 'Backend build', 'Developer portal', 'Product design'],
    stack: ['Python', 'Flask', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Redis', 'OpenAPI 3.1', 'Motion'],
    liveUrl: 'https://dev-portal-indrive.onrender.com/',
    summary:
      'A concept public API that lets Nigerian businesses build inDrive-style negotiated rides and parcel deliveries into their own apps.',
    note: 'What an inDrive API for Nigerian developers could look like.',
    stamp: 'Concept',
    standfirst:
      'Every ride API quotes a price. inDrive’s whole idea is that the price is negotiated — so the API had to carry the negotiation, not flatten it.',
    theme: { bg: '#FFFEF4', fg: '#2F3C45', accent: '#56BC37' },
    images: {
      hero: {
        src: '/projects/indrive/hero.webp',
        width: 1440,
        height: 900,
        alt: 'inDrive Open API Nigeria homepage: “Fair rides, built into your app.” beside a phone where a hotel’s guest-transport screen shows three drivers responding to a ₦14,000 offer, with the API call behind the step',
      },
      full: {
        src: '/projects/indrive/full.webp',
        width: 1200,
        height: 8319,
        alt: 'Full-page view of the inDrive Open API Nigeria developer portal',
      },
      mobile: {
        src: '/projects/indrive/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'The inDrive Open API Nigeria portal on a phone, under the concept-project banner',
      },
    },
    gallery: [
      {
        src: '/projects/indrive/quickstart.webp',
        width: 1200,
        height: 750,
        alt: 'Quickstart page: “A first ride in five calls”, with curl, JavaScript and Python tabs pointed at the live deployment',
        caption: 'Quickstart — a first ride in five calls, in three languages',
      },
      {
        src: '/projects/indrive/reference.webp',
        width: 1200,
        height: 750,
        alt: 'API reference, Rides section: ten operations from ride estimates to lifecycle status, rendered from the OpenAPI document',
        caption: 'API reference — drawn by the product from its own OpenAPI document',
      },
      {
        src: '/projects/indrive/webhooks.webp',
        width: 1200,
        height: 750,
        alt: 'Webhooks page: “Hear about a ride as it happens”, explaining signed, ordered, retried event delivery',
        caption: 'Webhooks — signed, ordered per ride, retried until accepted',
      },
      {
        src: '/projects/indrive/keys.webp',
        width: 1200,
        height: 750,
        alt: 'Sandbox key page: a self-serve form that issues a 30-day key once the developer confirms it is a concept',
        caption: 'Sandbox keys — no account, issued in one step',
      },
    ],
    sessions: [
      {
        webm: '/projects/indrive/session.webm',
        mp4: '/projects/indrive/session.mp4',
        poster: '/projects/indrive/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live inDrive Open API Nigeria site, scrolling from the hero through the page',
        caption: 'inDrive Open API Nigeria — live site, desktop session',
      },
    ],
    deliverables: [
      'A REST API under /api/ride-ops/v1 — 31 operations for rides, deliveries, guests, events, webhooks and the simulation',
      'A developer portal with a quickstart, self-serve sandbox keys, a webhooks guide and an API reference',
      'An operations console over the same public API, plus a browser-based driver location tool',
      'Signed webhooks with 40 event types, per-ride ordering and exponential-backoff retries',
      'A deterministic dispatch simulation whose pace can be changed at runtime',
      'A one-service Render deployment on free Neon Postgres and Upstash Redis',
    ],
    tech: [
      { label: 'Backend', value: 'Python · Flask · SQLAlchemy · gunicorn' },
      { label: 'Data', value: 'PostgreSQL · 13 Alembic migrations · Redis' },
      { label: 'Contract', value: 'OpenAPI 3.1, checked against the app by the test suite' },
      { label: 'Webhooks', value: 'HMAC-SHA256 signatures · backoff with jitter' },
      { label: 'Deploy', value: 'Render web service · Neon · Upstash' },
      { label: 'Tests', value: '185, in pytest' },
    ],
    overview:
      'A self-initiated concept: what would a public inDrive API for Nigerian developers look like? This is a working answer — a developer portal, a REST API, signed webhooks and an operations console, so a hotel, an online store or a logistics startup could build inDrive rides and parcel deliveries into its own product. It is not an inDrive product and nothing in it talks to inDrive: every driver, courier and price comes from a local simulation, and the product says so on every page, in every HTTP response and in the API document itself.',
    challenge:
      'A fixed-price ride API is easy to imagine: quote, book, done. inDrive works differently — the platform publishes a recommended minimum, the requester offers a price, and drivers accept, counter or decline. Modelling that honestly means a counter-offer is its own priced record from a distinct driver, the refused prices stay auditable next to the agreed one, and the fare can only move while the offer is open. On top of that it had to feel like a real platform API — idempotency keys, ETags, cursor pagination, a consistent error envelope — and fit Nigeria: naira in kobo, Lagos time, local phone formats. And because it borrows inDrive’s visual language as the pitch, it had to be impossible to mistake for the real thing.',
    built: [
      'A negotiated fare model: one recommended minimum, an offer from the requester, and counter-offers stored as first-class ride_offers rows, so the requester always sees the alternatives.',
      'A deterministic simulation that walks a ride from SEARCHING to COMPLETED — the same ride always produces the same responses, so scenarios and tests are reproducible — with timings an operator can slow down or speed up from the console.',
      'Parcel deliveries in the same peer-to-peer shape: up to three addresses with one courier, chosen by the sender on price, rating and arrival time, and tracked through every handoff.',
      'Platform conventions throughout: an idempotency key on every mutation, ETags with If-Match and 412 on a stale version, cursor pagination and a meta error envelope.',
      'Signed webhooks over 40 event types — HMAC-SHA256 over the timestamp and raw body, delivered in order per ride, retried with exponential backoff and bounded jitter.',
      'A checked-in OpenAPI 3.1 document that the test suite verifies against every route and every error code, and an API reference the product renders from it with no third-party renderer.',
      'A developer portal in inDrive’s design language — a hero where a made-up hotel books an airport pickup step by step beside the API call behind each step — animated with Motion and fully readable without it.',
      'Built for Nigeria: prices as integers in kobo, Africa/Lagos time, Nigerian numbers accepted in local or international form and normalised to +234.',
    ],
    facts: [
      { label: 'Surfaces', value: 'Portal · API · Console · Driver tool' },
      { label: 'API', value: '31 operations · OpenAPI 3.1' },
      { label: 'Webhook events', value: '40' },
      { label: 'Fare model', value: 'Offer, counter, choose' },
      { label: 'Deliveries', value: 'Up to 3 stops, one courier' },
      { label: 'Tests', value: '185' },
    ],
    resultsNote:
      'This is a personal concept, not a shipped inDrive product, so there are no users, rides or revenue to report. The live deployment is a sandbox: anyone can issue a key and book a simulated ride, and every driver and price on it is generated by the simulation.',
  },
  {
    slug: 'zanori',
    index: '03',
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
    gallery: [
      {
        src: '/projects/zanori/work.webp',
        width: 1200,
        height: 750,
        alt: 'Zanori Spaces: selected case studies — interior projects presented with render sheets',
        caption: 'Selected case studies',
      },
      {
        src: '/projects/zanori/services.webp',
        width: 1200,
        height: 750,
        alt: 'Zanori Spaces services page: the interior and exterior design offerings',
        caption: 'Services — what the studio actually does',
      },
      {
        src: '/projects/zanori/shop.webp',
        width: 1200,
        height: 750,
        alt: 'Zanori Spaces shop: furniture and design pieces listed for sale',
        caption: 'Shop — furniture and design pieces',
      },
    ],
    sessions: [
      {
        webm: '/projects/zanori/session.webm',
        mp4: '/projects/zanori/session.mp4',
        poster: '/projects/zanori/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live Zanori Spaces site, scrolling from the hero through the page',
        caption: 'Zanori Spaces — live site, desktop session',
      },
    ],
    deliverables: [
      'Brand identity — wordmark, type and colour system, favicon that reads at 16px',
      'A gallery-first homepage built around a full-bleed image hero',
      'Services catalogue, featured projects and a founder statement',
      'Shop and account area wired to a live catalogue',
      'Catalogue state that persists in Firestore and falls back to a local cache',
    ],
    tech: [
      { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Vite' },
      { label: 'Catalogue', value: 'Firestore, mirrored into localStorage' },
      { label: 'Type', value: 'Playfair Display' },
      { label: 'Motion', value: 'Framer Motion throughout' },
      { label: 'Imagery', value: '16 images, 9 lazy-loaded' },
      { label: 'Hosting', value: 'Custom domain' },
    ],
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
    index: '04',
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
        height: 4571,
        alt: 'Full-page view of the Apreeltree export site',
      },
      mobile: {
        src: '/projects/apreeltree/mobile.webp',
        width: 780,
        height: 1688,
        alt: 'Apreeltree on a mobile viewport',
      },
    },
    gallery: [
      {
        src: '/projects/apreeltree/products.webp',
        width: 1200,
        height: 750,
        alt: 'Apreeltree catalogue: “Premium Nigerian Pantry” with grades and starting prices for each product',
        caption: 'The catalogue — 17 products, graded and priced',
      },
      {
        src: '/projects/apreeltree/product.webp',
        width: 1200,
        height: 750,
        alt: 'Apreeltree product page for Ofada Rice, with the product story and related shipments',
        caption: 'Product page — the story, the grade, the related shipments',
      },
      {
        src: '/projects/apreeltree/shipping.webp',
        width: 1200,
        height: 750,
        alt: 'Apreeltree shipping page: air freight against ocean freight, customs paperwork and export packaging',
        caption: 'Shipping — freight, customs and packaging',
      },
      {
        src: '/projects/apreeltree/quote.webp',
        width: 1200,
        height: 750,
        alt: 'Apreeltree bulk quote request form',
        caption: 'Quote request — the one conversion that matters',
      },
    ],
    sessions: [
      {
        webm: '/projects/apreeltree/session.webm',
        mp4: '/projects/apreeltree/session.mp4',
        poster: '/projects/apreeltree/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live Apreeltree site, scrolling from the hero through the page',
        caption: 'Apreeltree — live site, desktop session',
      },
    ],
    deliverables: [
      'Trust-first storefront with the proof placed directly under the headline',
      'A 17-product catalogue grouped by category, with grades and starting prices',
      'Product detail pages with the product story and related shipments',
      'A four-step export logistics explainer covering freight, customs and packaging',
      'A WhatsApp-first quote path that persists the enquiry',
    ],
    tech: [
      { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Vite' },
      { label: 'Type', value: 'Fraunces · Plus Jakarta Sans' },
      { label: 'Catalogue', value: '17 SKUs · grade and starting price each' },
      { label: 'Quote flow', value: 'Enquiry saved client-side, then handed to WhatsApp' },
      { label: 'Imagery', value: '8 images, 6 lazy-loaded' },
      { label: 'Hosting', value: 'Render static site' },
    ],
    overview:
      'A B2B export storefront for Nigerian staples — ofada rice, honey beans, egusi, ogbono, crayfish and smoked catfish — sold in bulk to buyers in Europe and the USA. The site carries a 17-product catalogue with grades and starting prices, an export logistics explainer, trust marks, and a WhatsApp-first quote path.',
    challenge:
      'An export buyer needs to believe the seller before price is even worth discussing: who farms it, how it is cleaned, which certifications exist, how it ships, and what happens if customs asks questions. Most small-export sites bury all of that. The job was to surface the proof directly under the headline, then make a quote request take one tap.',
    built: [
      'A trust bar above the fold: shipping notice, air and sea freight availability, WhatsApp support line.',
      'Hero pairing a serif/italic display lockup with a rotated product card and a NAFDAC-certified seal.',
      'A 17-product catalogue grouped by category (grains, condiments, smoked fish), each with origin, grade description and a starting price.',
      'A four-step export logistics explainer: enquiry, sourcing and processing, documented shipping, delivery.',
      'A quote flow built on WhatsApp, repeated as a dedicated terracotta band at the foot of the page.',
      'Palette and type drawn from the brand: cream #F5EFE0, forest #1A3728, terracotta #C2673A, Fraunces display.',
    ],
    facts: [
      { label: 'Catalogue', value: '17 products' },
      { label: 'Markets named', value: 'Europe & USA' },
      { label: 'Site claims', value: '14 countries · 500+ bulk orders' },
      { label: 'Certification shown', value: 'NAFDAC' },
    ],
    resultsNote:
      'The figures above are the site’s own published claims. Real order volume should be confirmed before they are quoted anywhere else.',
  },
  {
    slug: 'fitables',
    index: '05',
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
    gallery: [
      {
        src: '/projects/fitables/pricing.webp',
        width: 1200,
        height: 750,
        alt: 'Fitables Beauty Bar: searchable treatment menu with category tabs and naira prices for each service',
        caption: 'Services & pricing — searchable, categorised, priced',
      },
      {
        src: '/projects/fitables/therapists.webp',
        width: 1200,
        height: 750,
        alt: 'Fitables Beauty Bar: therapist profiles for the spa team',
        caption: 'Therapists — the people behind the treatment',
      },
      {
        src: '/projects/fitables/locations.webp',
        width: 1200,
        height: 750,
        alt: 'Fitables Beauty Bar: locations and opening hours for Lekki, Gbagada and Surulere',
        caption: 'Three branches, three sets of hours',
      },
    ],
    sessions: [
      {
        webm: '/projects/fitables/session.webm',
        mp4: '/projects/fitables/session.mp4',
        poster: '/projects/fitables/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live Fitables Beauty Bar site, scrolling from the hero through the page',
        caption: 'Fitables Beauty Bar — live site, desktop session',
      },
    ],
    deliverables: [
      'Ivory and deep-green identity with Cormorant Garamond display type',
      'A searchable treatment menu with prices, durations and categories',
      'Booking session flow, gift-a-session path and Google sign-in',
      'Therapist profiles plus per-branch locations and hours',
      'Client review submission and a canvas petal animation across the hero',
    ],
    tech: [
      { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Firebase' },
      { label: 'Type', value: 'Cormorant Garamond · Montserrat · JetBrains Mono' },
      { label: 'Catalogue', value: '30+ treatments across 5 categories' },
      { label: 'Animation', value: 'Canvas petal field on the hero' },
      { label: 'Auth', value: 'Firebase, with Google sign-in' },
      { label: 'Locations', value: 'Lekki Phase I · Gbagada · Surulere' },
    ],
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
    index: '06',
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
    gallery: [
      {
        src: '/projects/dudja/music.webp',
        width: 1200,
        height: 750,
        alt: 'DUDJA music section: the discography with live Spotify and SoundCloud embeds and streaming platform links',
        caption: 'Music — the discography, embedded live',
      },
      {
        src: '/projects/dudja/vision.webp',
        width: 1200,
        height: 750,
        alt: 'DUDJA vision section: the artist manifesto laid out as an editorial spread',
        caption: 'Vision — the manifesto and the dossier',
      },
      {
        src: '/projects/dudja/merch.webp',
        width: 1200,
        height: 750,
        alt: 'DUDJA merch storefront',
        caption: 'Merch — the storefront',
      },
      {
        src: '/projects/dudja/booking.webp',
        width: 1200,
        height: 750,
        alt: 'DUDJA booking inquiry form with name, email, inquiry type and message fields',
        caption: 'Booking — a real inquiry form, not a mailto link',
      },
    ],
    sessions: [
      {
        webm: '/projects/dudja/session.webm',
        mp4: '/projects/dudja/session.mp4',
        poster: '/projects/dudja/session.webp',
        width: 1440,
        height: 900,
        alt: 'A recorded session on the live DUDJA site, scrolling from the hero through the page',
        caption: 'DUDJA — live site, desktop session',
      },
    ],
    deliverables: [
      'Record-sleeve art direction — bone and vermilion on near-black',
      'A discography with live Spotify and SoundCloud embeds',
      'A lyric console presenting a timed transcript like studio hardware',
      'Vision manifesto and artist dossier laid out as an editorial spread',
      'Merch storefront and a booking inquiry form',
    ],
    tech: [
      { label: 'Stack', value: 'React · TypeScript · Tailwind CSS · Vite' },
      { label: 'Type', value: 'Bebas Neue · DM Sans · Space Mono' },
      { label: 'Releases', value: '4 singles and albums, all 2026' },
      { label: 'Streaming', value: 'Spotify · Apple Music · SoundCloud · Tidal · YouTube' },
      { label: 'Monitoring', value: 'Sentry error reporting' },
      { label: 'Hosting', value: 'Render static site' },
    ],
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

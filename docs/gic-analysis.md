# GIC / Kingdom Comms — recon notes

Recon performed on the cloned repo (`github.com/Jesse781227-u/GIC`, branch `master`, 211 commits)
plus a Playwright pass over the live deployment at 1440×900, 1800×1000 and 390×844.

This is the portfolio's only **product** case study — the other four are client sites. It is also
the reason the portfolio now presents Jesse as a product engineer rather than a web designer:
the work here is schema, API, auth, push delivery, migrations and a security audit, with the
interface as one part of it rather than the whole of it.

> Live surfaces at recon time:
> - Member app — <https://gic-comms.onrender.com>
> - Admin panel ("Kingdom Comms") — <https://gic-admin-static.onrender.com>
> - API — `https://gic-backend-lx3q.onrender.com` (Hono on Node, PostgreSQL)

---

## 1. Repository shape

One monorepo, three deployable apps:

| Path | What it is | Deployed to |
|------|------------|-------------|
| `gic-backend/` | Hono API, PostgreSQL via Drizzle ORM, Firebase Admin, node-cron scheduler | `gic-backend-lx3q.onrender.com` (web service) |
| `gic-member/gic-member-static/` | Member PWA (React + Vite) | `gic-comms.onrender.com` (static) |
| `gic-admin/gic-admin-static/` | "Kingdom Comms" admin panel (React + Vite, Recharts) | `gic-admin-static.onrender.com` (static) |

Supporting files: `render.yaml` (three services + a Postgres instance, Frankfurt),
`firestore.rules`, `firebase.json`, and `AUDIT.md` — a written security + code audit with a
prioritised ten-item fix list and a status log of what was fixed.

Counts, straight from the tree: **26 SQL migrations** (`0000`–`0025`), **106** TypeScript/JS
source files, **20 test files** (10 backend, 7 member, 3 admin).

## 2. The actual problem it solves

Churches broadcast by SMS. At roughly **₦5 per message** and a congregation in the thousands,
the arithmetic forces rationing: the operator's own note in the brief was eight messages
received so far that year. A push notification costs the church nothing and carries a title, a
body, an image, a link and a deep destination — so the scarce thing stops being the message and
becomes the audience.

That reframing is the whole product: **the system is a targeting engine with a delivery channel
attached.** Everything else follows from it.

## 3. Feature inventory (verified against the live app)

### Targeting
Eight filter criteria, resolved server-side:

| Criterion | Source |
|-----------|--------|
| `gender` | member profile |
| `age_group_id` | 4 age groups: Teenager 13–17, Young Adult 18–25, Adult 26–59, Senior 60+ |
| `relationship_status` | Single / Married |
| `center` | one of 5 branches |
| `membership_status` | New / existing |
| `joined_within_months` | relative to join date |
| `ministry_id` | 11 ministries |
| `cell_id` | 3 fellowships |

Segments come in two flavours. **Automatic** segments evaluate rules on every read
(`src/services/member-group-rules.ts`); **manual** segments hold an explicit membership list
(`src/services/member-groups.service.ts`). Verified live: the "Young Adults" automatic segment
resolved to the members whose profile age group is Young Adult, and the admin composer showed
"Estimated audience: 4 members with current group membership."

Audience selectors in the composer: everyone · a segment · a ministry · a cell · the registrants
of a specific event · an explicit member list.

### Messaging
- Five categories: General Announcement, Event, Registration, Reminder, Church Update.
- Two tap destinations: `internal_route` (deep-link into the member app) and `media_page`
  (uploaded media on Cloudflare R2, 26 MB limit, MIME-validated).
- Draft / Scheduled / Sent states. `scheduledAt` turns a draft into a scheduled send.
- A **"Preview as member"** panel that renders the notification exactly as the phone will show
  it, next to the composer.
- `notifyOnPublish` on events, honoured — an event can be published without notifying.
- A cron scheduler with a Postgres advisory lock so only one instance runs a tick.

### Events
Custom registration forms (typed fields, required flags, select options), capacity limits,
waitlists with position numbers, issued reference codes (`GIC-410928E8`), cancellation, and
per-branch **bus pickup points** with capacity, landmark address and departure time. Built for a
church that runs free buses from seventeen pickup locations to five branches.

### Attendance
Service check-in pulses: an admin schedules a pulse against a service occurrence — "Are you in
church?" (`in_service`) or "How was service?" (`after_service`) — and confirms with
**Send / Delay / Skip**. Nothing auto-sends. Members answer in person / online / not attending
from the app; one answer per service, latest wins; responses land in `service_attendance`.

### Other
- **Mixlr** integration — the week's sermon recording plays in the member app, and the same feed
  doubles as an announcement channel: `createdBy: system:mixlr` rows show the platform posting
  "The latest service recording is now available." to every member on its own, with a deep link
  into the recording. The live app pulls `globalimpactng.mixlr.com` (blocked by Chrome's ORB in
  the headless capture, fine in a normal browser).
- **PWA** — service worker with a cached app shell, install prompt, notifications permission.
- **Ministry applications** — members apply to join a unit, admins approve.
- **Multi-tenant** — every table is scoped by `churchId`; one deployment could serve many churches.
- **Admin auth** — Firebase Auth with custom claims (`admin` / `isAdmin` / `role === 'ADMIN'`).

## 4. The audit (`AUDIT.md`, 2026-10-17)

The repository ships its own security and code audit, which is unusual and worth calling out.
The findings that mattered:

- **Account takeover via device auth.** `POST /api/auth/device` issued a valid member JWT for
  any `accountId` with no credential check, and a second vector let a caller overwrite an
  existing member by passing their `deviceId`. Both are closed; resuming an existing session now
  requires a signed token whose `sub` matches the member (`requestOwnsMember`).
  *Verified live:* re-authenticating an existing member id without a token returns
  `401 ACCOUNT_NOT_OWNED`.
- **JWT secret fallback** to a hardcoded dev string when `JWT_SECRET` was unset.
- **Committed PII** — a PostgreSQL data-directory dump containing real member rows, plus
  reference data with real names and phone numbers, seeded on every boot.
- **Divergent `main` / `master` branches**, corrupt git refs, and two competing migration
  systems (drizzle SQL *and* a runtime `ensureDatabaseSchema()`).
- Performance: an N+1 in segment resolution (one full members scan per segment) and a cron with
  no distributed lock. Both fixed.

The status log records the fixes as verified: `tsc` clean, **35/35** backend tests, **24/24**
member tests, **6/6** admin tests, both apps building. The 121 KB monolithic admin `App.jsx`
was split into focused modules.

## 5. Things worth fixing that this recon found

Not defects in the code as written — observations from the live deployment:

1. **The deployed member app is behind the repo's `main`.** The live bundle at
   `gic-comms.onrender.com` still carries a persistent React Query cache
   (`gic_member_query_cache_v1` in `localStorage`) that the current source has removed. With a
   stale cache present, the app hydrates the *cached* profile and the profile edit form can
   pre-fill values that are not the member's. Clearing that key fixes it; deploying `main`
   removes the class of problem.
2. **The member home screen's "Upcoming Events" is hardcoded.** `getUpcomingEvents()` in the
   member app returns two client-computed recurring services (`sunday-service`,
   `midweek-service`) and never merges events published through the admin panel. Verified: after
   publishing "Young Adults Conference 2026" in the admin, it appeared under Events → Upcoming
   but not on the home screen. The events feed itself (`/api/events`) is correct.
3. **Member deletion lives in the wrong module.** The admin "Delete member" button calls
   `DELETE /api/admin/ministry-applications/members/:id`. It works and cascades correctly, but
   a member-deletion route filed under ministry applications will be missed by the next reader.
4. **Three empty member records** (`dev-ozxrc6-dv43`, `dev-mn88b8-rpgl`, `dev-0y1n8c-k1wa`) —
   device-auth shells with no name, phone or group memberships. They are the only rows that look
   unfinished in the admin table and are safe to remove.

## 6. Demo data seeded for the capture

The live database was empty of realistic content at recon time, so the following clearly-labelled
demo records were created through the admin API so the screenshots show the system working:

- 5 demo members — `Bola Adeyemi (demo)`, `Tunde Okafor (demo)`, `Chiamaka Nwosu (demo)`,
  `Emeka Obi (demo)`, `Aisha Bello (demo)` — with centres, age groups, birthdays, join dates and
  ministry/fellowship memberships.
- 2 segments — `Young Adults` (automatic, age rule) and `Service Volunteers` (manual).
- 2 events — `Mid-Week Prayer Service` (bus transport, Protocol unit) and
  `Young Adults Conference 2026` (4-field registration form, capacity 150, waitlist, 3 bus
  pickup points, 3 confirmed registrations with reference codes).
- 5 draft campaigns targeting everyone, a ministry, a cell and a segment.

No notification was ever sent by me — the five seeded campaigns were left as drafts. The seeded
names carry a `(demo)` suffix and the phone numbers use the reserved `0800000000X` test range.
The 21 broadcasts in §7 are the church's own, sent by the Mixlr automation before this recon.

## 7. What the portfolio claims, and what backs it

| Claim | Backing |
|-------|---------|
| Three services over one API | `render.yaml`, three deployables observed live |
| Eight targeting criteria | `src/services/member-group-rules.ts`, `src/services/notifications/audience-filters.ts`, composer UI |
| Automatic + manual segments | `src/services/member-groups.service.ts`, live segment list |
| Free delivery | Firebase Cloud Messaging; no per-message billing anywhere in the stack |
| 26 migrations | `src/db/migrations/0000`–`0025` |
| 211 commits | GitHub repo page |
| 5 branches | `src/db/reference-data.ts`, `/api/admin/reference/church-locations` |
| Written audit | `AUDIT.md` in the repository |
| 21 broadcasts sent, 0 delivery failures | `/api/admin/notifications` — 21 `SENT` rows dated 4–20 Oct 2026, all `createdBy: system:mixlr`, every one `sentCount` = `recipientCount` and `failedCount` = 0 |

**Not claimed:** members reached, or any adoption metric. The live member table was still carrying
seeded demo records at recon time and the church has not onboarded the congregation, so the case
study says exactly that instead of implying a congregation is on the platform. The one real
production signal is the Mixlr announcement automation, which has posted the week's service
recording to every registered device since 4 October 2026 without a delivery failure.

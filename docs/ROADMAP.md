# Tech Debt Audit & Launch Roadmap

_Audited 2026-07-07 against the live Supabase project and the current codebase._

> **Progress 2026-07-07 (evening session):** 0.2 done (orders table live).
> Code side done: Vite migration + typecheck + 13 unit tests (6.1–6.3 partly),
> image compression (5.2), config extraction (6.8), robots/sitemap/.env.example
> (6.9), security headers + caching (4.6, 5.4), password reset (3.3), dead
> filters + sort fixed (6.7), Stripe edge functions + flagged client (1.2–1.4,
> see docs/STRIPE-SETUP.md), admin dashboard code + SQL (2.1–2.3), GitHub
> Actions CI. **Still on you:** 0.1 security-lockdown.sql (URGENT — inquiries
> are still publicly readable), admin.sql + stripe-checkout.sql + your admin
> user_id, prices-template.sql, 0.3/0.4, Stripe account + deploy (Phase 1),
> emails (3.1/3.2), deploy + domain (Phase 4).

**Goal:** a published website where customers browse, add to cart, pay online
with card + shipping address; you see every order in an in-app admin
dashboard and update statuses (new → confirmed → paid → shipped).

Legend: 🔴 critical · 🟠 important · 🟡 worthwhile · ⚪ optional
"Claude" = I can implement it in a session; "You" = needs your accounts/dashboard.

---

## Phase 0 — Security lockdown (DO TODAY, before anything else)

The database is currently writable by anyone on the internet.

| # | Step | Who | Evidence |
|---|------|-----|----------|
| 0.1 🔴 | Run [supabase/security-lockdown.sql](../supabase/security-lockdown.sql) — enables RLS on `artworks`, `images`, `prices`, `inquiries` (public read-only catalog; insert-only inquiries) | **You** (2 min) | Anonymous `UPDATE artworks` and `DELETE images` succeeded; `SELECT inquiries` returned customer emails |
| 0.2 🔴 | Run [supabase/orders.sql](../supabase/orders.sql) — creates the `orders` table with correct RLS (insert-only public, owners read their own) | **You** (1 min) | Checkout currently fails: table missing |
| 0.3 🟠 | Rotate the anon key if you ever shared it beyond `.env.local`; confirm the service_role key has never left the dashboard | You | Hygiene |
| 0.4 🟠 | Supabase → Auth → URL Configuration: set Site URL to the production domain | You | Signup emails currently link to localhost |

## Phase 1 — Real payments (Stripe Checkout)

The right architecture for a CRA SPA + Supabase, with **no card data ever
touching your code** (PCI handled by Stripe):

| # | Step | Who |
|---|------|-----|
| 1.1 🔴 | Create a Stripe account; get test + live API keys | **You** (~30 min) |
| 1.2 🔴 | Edge Function `create-checkout`: receives cart lines `{artworkId, editionKey, qty}`; **recomputes every price from the `prices` table server-side** (never trusts the client); validates stock; creates a Stripe Checkout Session with line items + shipping-address collection; inserts an `orders` row (`status='pending_payment'`, `stripe_session_id`); returns the session URL | Claude writes it; **you** run `supabase functions deploy` + `supabase secrets set STRIPE_SECRET_KEY` |
| 1.3 🔴 | Edge Function `stripe-webhook`: on `checkout.session.completed` → order `status='paid'`, save the shipping address Stripe collected, decrement stock atomically (`update prices set original_stock = original_stock - 1 where … and original_stock > 0`) | Claude writes; you deploy + register the webhook URL in Stripe |
| 1.4 🔴 | Cart page: "Place Order" → call `create-checkout` → redirect to Stripe; success/cancel return pages | Claude |
| 1.5 🟠 | Keep the current email-invoice flow as fallback for unpriced pieces ("Request price") | Already done |
| 1.6 🟠 | Test the full loop in Stripe test mode (4242 card) before switching to live keys | You + Claude |

**Why this matters beyond payments:** today the client writes `subtotal`/`total`
into orders — a hostile user can POST an order claiming any price. Harmless
while you invoice manually (you'd notice), fatal with automated payment.
Step 1.2 moves all money math server-side, closing that hole permanently.

## Phase 2 — Admin dashboard (orders in-app)

| # | Step | Who |
|---|------|-----|
| 2.1 🔴 | `admins` table (`user_id uuid pk references auth.users`) + RLS policies giving admins SELECT/UPDATE on `orders` (and SELECT on `inquiries`). **RLS is the security boundary** — the React route guard is only cosmetics | Claude writes SQL; you run it + insert your own user_id |
| 2.2 🔴 | `/admin` route (lazy, sign-in required, non-admins redirected): orders list with status filter tabs, search, order detail (items, customer, address), status dropdown (new/confirmed/paid/shipped/cancelled), tracking-number field | Claude |
| 2.3 🟠 | Inquiries tab in the same dashboard (read contact-form messages without opening Supabase) | Claude |
| 2.4 🟡 | Catalog management (edit prices/stock in-app) — until then the Supabase Table Editor is your catalog admin | Later |

## Phase 3 — Order lifecycle hardening

| # | Step | Who |
|---|------|-----|
| 3.1 🟠 | Transactional email (Resend free tier ≈100/day): order-confirmation + shipped-with-tracking emails, sent from the webhook / a status-change trigger. Until then Stripe's built-in receipts cover payment confirmation | Claude writes; you create the Resend account + verify your domain |
| 3.2 🟠 | Supabase → Auth → SMTP: production auth emails (signup confirmations) via the same provider — the built-in mailer is rate-limited to ~3/hour and lands in spam | You (~20 min) |
| 3.3 🟠 | Password reset flow (`resetPasswordForEmail` + update-password page) — currently missing from /login | Claude |
| 3.4 🟡 | Original-artwork race (two buyers, one painting): acceptable initially since 1.3's conditional stock decrement makes the second webhook fail → auto-refund path; later add a 30-min reservation at checkout-session creation | Claude, later |
| 3.5 🟡 | Spam protection on inquiries/orders (Supabase Auth captcha / Cloudflare Turnstile) | Claude + you (site key) |

## Phase 4 — Publish

| # | Step | Who |
|---|------|-----|
| 4.1 🔴 | Push repo to GitHub (the ~300 staged changes are still uncommitted — commit first) | You/Claude |
| 4.2 🔴 | Vercel or Netlify: import repo, set `REACT_APP_SUPABASE_URL/ANON_KEY`, deploy (SPA rewrites already in repo) | You (~20 min) |
| 4.3 🔴 | Custom domain + HTTPS (automatic on both hosts) | You |
| 4.4 🟠 | Supabase free tier **pauses after 7 days of inactivity** — a paused DB = dead shop. Budget for Supabase Pro (~$25/mo) once real orders flow | You |
| 4.5 🟠 | Fill legal placeholders in `src/data/legalContent.js` (dispatch times, return windows); confirm Terms match the Stripe flow ("payment taken at checkout" replaces "no payment online") | You + Claude |
| 4.6 🟡 | Security headers at the host (CSP, X-Frame-Options) — one JSON/`_headers` file | Claude |

## Phase 5 — Performance (site is image-heavy)

| # | Item | Detail |
|---|------|--------|
| 5.1 🟠 | Artwork images are served at full resolution — **4.1 MB** for one JPEG. Fix: pre-generate ~800px WebP thumbnails on upload (store as `tag='thumb'` rows) or enable Supabase image transformations (Pro) and request sized renditions for cards/rows | Claude + you (uploads) |
| 5.2 🟠 | `src/assets/images/gallery-background.jpg` is **15 MB** and ships in the bundle as the hero poster — compress to ~150 KB WebP (visually identical as a blurred-behind-canvas poster) | Claude (5 min) |
| 5.3 🟡 | Self-host the two Google Fonts (removes third-party request + GDPR nicety) | Claude |
| 5.4 🟡 | Long-cache headers for `public/gallery-pan/*` at the host | Claude |
| 5.5 ⚪ | Lighthouse pass on the deployed site; fix what it flags | Claude |

## Phase 6 — Code quality & structural debt

| # | Item | Severity | Detail |
|---|------|----------|--------|
| 6.1 | react-scripts (CRA) is deprecated/unmaintained | 🟠 | 55 `npm audit` findings (1 critical, 26 high — mostly dev-server chain, not shipped code, but unfixable under CRA). Migrate to **Vite**: ~1 session, faster builds, maintained toolchain. Do before the Stripe work grows the codebase |
| 6.2 | TypeScript is decorative | 🟠 | `.ts` services are babel-stripped — types never checked, so they can silently rot. With Vite: real `tsconfig`, typecheck in CI, gradually convert contexts/pages |
| 6.3 | Zero tests | 🟠 | Money math deserves tests first: `editions.js`, cart totals, order payload. Add Vitest unit tests + one Playwright checkout e2e (mock Stripe). CI: GitHub Actions running lint + typecheck + tests on push |
| 6.4 | No error monitoring | 🟡 | Sentry free tier — you can't fix production errors you never see |
| 6.5 | SPA has no server-rendered pages | 🟡 | Crawlers/social shares see only the homepage meta; per-artwork OG tags impossible client-side. Acceptable now; the real fix is a Next.js/Astro migration — defer until the shop proves itself |
| 6.6 | Data layer | 🟡 | ShopContext fetches 3 whole tables on every visit; `CollectionRow` makes 2 requests per featured artwork instead of reusing context. Fine at 40 artworks; adopt TanStack Query + narrower selects when catalog grows |
| 6.7 | Dead filter options | 🟡 | ShopFilterBar's "Material/Prints/Custom Items" filters compare against `artwork.collection` — selecting them returns nothing. Either wire to real fields or trim the tree |
| 6.8 | Config scattered | 🟡 | Contact email hardcoded in 5 files; currency/`deliveryFee` hardcoded in ShopContext while the DB has `default_currency`. Extract `src/config.js`; move delivery fee into a DB `settings` row when Stripe lands (server must know it) |
| 6.9 | Missing `.env.example`, robots.txt, sitemap.xml | 🟡 | Small files; robots+sitemap help indexing |
| 6.10 | A11y gaps | 🟡 | Mobile menu lacks focus trap + scroll lock; pinned horizontal gallery unreachable by keyboard (reduced-motion fallback covers some of it); add skip-to-content link |
| 6.11 | Signed image URLs expire 2035 | ⚪ | Works, but a public-read storage bucket is simpler and cache-friendlier for public art |
| 6.12 | No structured data | ⚪ | `Product`/`VisualArtwork` JSON-LD per artwork once SSR exists |

---

## Recommended execution order

1. **Today (you, 5 min):** run `security-lockdown.sql` + `orders.sql`; edit & run `prices-template.sql`.
2. **Session A (Claude):** Vite migration + typecheck + the P0 code items (15 MB poster, robots/sitemap/.env.example, config extraction, password reset).
3. **Session B (Claude + you):** Stripe — edge functions, checkout redirect, webhook, test-mode loop. You: Stripe account, deploy functions, webhook registration.
4. **Session C (Claude):** Admin dashboard (`admins` SQL → you run; orders UI, status updates, inquiries tab).
5. **Session D (you + Claude):** Emails (Resend + auth SMTP), legal text finalization, deploy to Vercel with domain, live-mode Stripe switch, Lighthouse pass.
6. **Ongoing:** tests + CI (6.3), image thumbnails (5.1) as you upload the remaining artwork content.

Content prerequisites that gate the shop regardless of code: 33 artworks still
lack images, 5 imaged artworks lack prices — every artwork needs both to be
purchasable.

# Ranbeer Chaudhary — Art Portfolio

Portfolio website for original paintings and limited-edition prints, built with
React (Create React App) and Supabase. The long-term goal is to grow this into
a full e-commerce store; the current focus is a clean, fast portfolio with a
strong foundation to scale on.

## Tech stack

- **React 18** (Create React App) with React Router
- **Supabase** — artworks, images, prices, and contact inquiries
- **MUI X Tree View** — shop filter sidebar
- **react-image-gallery** — product image carousel
- **GSAP** — kept for the upcoming scroll-animation work
- **Bootstrap (CSS only)** — currently used as the base reset/typography layer;
  candidate for replacement during the planned design overhaul

## Getting started

```bash
npm install
npm start          # dev server on http://localhost:3000
npm run build      # production build in /build
```

Create a `.env.local` in the project root:

```
REACT_APP_SUPABASE_URL=<your supabase project url>
REACT_APP_SUPABASE_ANON_KEY=<your supabase anon key>
```

## Project structure

```
src/
  assets/          images and UI icons
  components/
    layout/        Navbar, Footer
    product/       ProductCard, ProductItem, CollectionRow, ShopFilterBar
  context/         ShopContext — loads artworks/images/prices once for the app
  data/            curated content (featured collection artwork IDs)
  pages/           one component per route (Home, About, Shop, Contact, Product)
  sections/        composable page sections (Hero, FeaturedCollections, AboutMe, ContactSection)
  services/        Supabase client + data-access functions
  styles/          theme.css (design tokens) and global.css (shared styles)
  types/           TypeScript types mirroring the Supabase tables
```

### Design system

All colors, spacing, radii, shadows, and breakpoint-dependent values live as
CSS custom properties in [src/styles/theme.css](src/styles/theme.css). Change a
token there and it propagates across the whole site. Shared building blocks
(`.page`, `.section`, `.button-primary`, `.button-secondary`,
`.underline-transition`, layout helpers) live in
[src/styles/global.css](src/styles/global.css).

### Data model (Supabase)

- `artworks` — id, name, description, size_inches, size_cm, medium, genre, collection, format
- `images` — artwork_id, url, tag (`original`, …), framed
- `prices` — per-artwork prices and stock per edition (original / framed / A5–A2 prints)
- `inquiries` — contact-form submissions
- `orders` — placed shop orders (**setup required, see below**)

### Shop

Artworks with a row in `prices` are purchasable: the product page offers the
in-stock editions, the cart lives in [CartContext](src/context/CartContext.js)
(persisted to localStorage), and checkout at `/cart` writes the order to the
`orders` table. No online payment is taken — you confirm availability and
send payment details by email (order status: new → confirmed → paid → shipped).

**One-time setup (requires your Supabase dashboard):**

1. Run [supabase/orders.sql](supabase/orders.sql) in the SQL Editor — creates
   the `orders` table. Orders appear in Table Editor → `orders`; signed-in
   customers see their own orders on `/account`.
2. Edit the prices in [supabase/prices-template.sql](supabase/prices-template.sql)
   and run it — makes the five remaining imaged artworks purchasable.
3. Authentication → URL Configuration: set the Site URL to your deployed
   domain so signup confirmation emails link to production.

To take card payments later, add a Stripe Checkout session behind a Supabase
Edge Function and call it from the cart's submit handler.

### Accounts

Supabase email/password auth: `/login` (sign in / create account, with email
confirmation), `/account` (profile + order history). Guest checkout works
without an account; signed-in checkouts are linked to the user.

### Deployment

Static SPA — `npm run build`, deploy `/build` to Netlify or Vercel (SPA
rewrites are included: `public/_redirects` and `vercel.json`). Set the two
`REACT_APP_SUPABASE_*` env vars in the host's dashboard. Legal pages live at
`/legal/privacy`, `/legal/terms`, `/legal/shipping-returns` — review the
placeholder text in [src/data/legalContent.js](src/data/legalContent.js)
before launch.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home (hero, featured collections, contact) |
| `/about` | About the artist |
| `/shop` | All artworks with collection filters |
| `/contact` | Contact form |
| `/product/:id` | Artwork detail |

## Animations

- **Gallery pan** — 127 WebP frames in `public/gallery-pan/` are scrubbed on
  a sticky canvas ([GalleryPan.js](src/sections/GalleryPan.js)) that spans
  both the hero and the collections section: the footage ends on the empty
  gallery wall exactly as the collections section docks, and that wall stays
  as its background. Raw PNG frames live untracked in `src/assets/videos/`.
- **Horizontal painting gallery** — the collections section pins while
  vertical scroll slides the artwork track across the wall
  ([FeaturedCollections.js](src/sections/FeaturedCollections.js)); with
  reduced motion it degrades to a native horizontal scroller.
- **Global reveals** — [ScrollAnimations.js](src/animations/ScrollAnimations.js)
  is mounted once in App and animates all structural elements in/out on
  scroll, re-scanning automatically when async Supabase content mounts.
  No per-component animation code; `prefers-reduced-motion` disables it all.

## Roadmap

1. Design overhaul (keeping the current direction, elevating the execution)
2. E-commerce: cart, checkout, auth, order management (re-introduce `/cart`,
   `/login` when built — the removed placeholders are in git history)

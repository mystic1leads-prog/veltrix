# Veltrix storefront

## Run locally

Run `npm install`, then `npm run dev`. `npm run build` creates the static production output in `dist/`. A deployed host must rewrite non-asset routes to `index.html` for browser routing.

The app uses React, strict TypeScript, React Router, Tailwind CSS 4, Lucide icons, and React Context. Page modules load on demand. Product assets are local; fonts use Google Fonts with system fallbacks.

## Catalog provenance

`npm run sync:catalog` refreshes `src/data/catalog.json`, downloads images to `public/products/`, and records the README's 21 source pages in `src/data/source-manifest.json`. It reads the source site's public WooCommerce Store API for structured records and crawls the specified pages for reference. The selected data covers the seven research categories; unrelated medicine collections are excluded.

Prices and stock are source snapshots, not live inventory. Source names, prices/currency, categories, SKU when provided, images, and descriptions when present are retained. Missing summaries and specifications use neutral presentation text, never invented test results or purity percentages. `certificate` remains null unless a verified report is supplied. Source product slugs are preserved, including legacy slugs that do not match product names.

The README requests a visual modernization, so Veltrix branding uses original vector artwork alongside the source product photos. Product photos retain their original labels. No source business address, shipping guarantee, certification, or testimonials are represented as Veltrix facts.

## Backend integration points

Cart behavior is fully local and persists product IDs and quantities under `veltrix.cart.v1`. Persisted entries are validated, unknown or unavailable products are discarded, quantities are capped at 99, and subtotal calculations use integer cents. Storage failures do not disable shopping.

Checkout, sign-in, registration, password reset, and contact screens validate forms but do not submit data. They display service availability messages and never claim success. They do not collect payment details, create accounts, or place orders. Connect authenticated services before enabling these actions, revalidate prices/inventory server-side, and update the policy pages for the actual services and business rules.

## Verification

- `npm run build`: strict TypeScript and production bundling.
- `npm run lint`: static checks.
- `npm run test:e2e`: Playwright tests using locally installed Chrome; starts Vite automatically unless a server is already running at `127.0.0.1:5173`.
- `npm run format`: format maintained source, scripts, and tests.

Browser tests cover the specified routes, source imagery, search, filters, sorting, persistent cart totals, invalid storage recovery, form validation, unavailable submissions, mobile overflow, modal keyboard behavior, and serious accessibility violations.

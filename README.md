# Animedel — norsk kjæledyrbutikk

Storefront: **Animedel** · https://animedel.no/ · varemerke fra Martinez Lozano Internasjonal Handel (org.nr 935 407 095).

**This repository is Animedel only.** Do not add, merge or configure other Nordic storefronts here.

Norsk nettbutikk for hund, katt og smådyr — for de firbeinte i familien. Responsiv katalog, handlekurv, Stripe-betaling og levering i Norge (gratis frakt fra 599 kr, ellers 79 kr · 5–20 virkedager).

## Checkout is off (no charging yet)

Stripe Checkout is **intentionally disabled** (`STORE.checkoutEnabled = false` in `functions/_shared/store.ts`, mirrored by `CHECKOUT_ENABLED = false` in `commerce-runtime.js` and `functions/api/create-checkout-session.ts`). `/api/create-checkout-session` returns HTTP 503 while the flag is false.

**Animedel does not charge customers until each pet SKU has verified:**

1. **Stock** — supplier inventory / availability for that SKU  
2. **Delivery** — destination coverage, shipping quote and expected lead time  
3. **Compliance** — product safety / regulatory fit for pet goods (manufacturer, responsible economic operator, warnings, VAT treatment, return address)

Also required before turning charging on: a payment provider in Stripe test mode (`STRIPE_SECRET_KEY` with `sk_test_…`) and a working order webhook. Record the checks per SKU before flipping `checkoutEnabled` / `CHECKOUT_ENABLED` to `true`.

Until then the storefront stays in **non-charging browse mode** (catalog and cart UI may work; payment does not).

## Supplier credentials (never invent or commit)

Configure real keys only in Cloudflare Pages / Netlify environment variables. **Do not invent, hardcode or commit** `CJ_API_KEY`, `PRINTIFY_API_TOKEN`, `GELATO_API_KEY` or `PRINTFUL_API_TOKEN`. Leave them unset until real dashboard keys exist; APIs then use empty local `catalog/*-products.json` fallbacks.

- Shared order automation: `MAKE_ORDERS_WEBHOOK` (env only)
- See `STRIPE-SETUP.md` for Stripe and POD env names

## Separate supplier catalogs (no blend)

- Storefront loads **CJ | Printify | Gelato | Printful** — `window.nordicCatalogs` keeps arrays separate; the grid shows all available products with Norwegian titles.
- Printify / Gelato / Printful use the same model as CJ: live API when env keys are set, local `catalog/*-products.json` (empty `[]`) as fallback only.
- Env: `PRINTIFY_API_TOKEN`, `GELATO_API_KEY`, `PRINTFUL_API_TOKEN` (plus existing `CJ_API_KEY`). See `STRIPE-SETUP.md`.
- German Drop remains authorized-manual / shared-account only (no fake DE catalog). CJ catalog unchanged.

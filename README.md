# Animedel — Pet Store

Storefront brand: **Animedel** · https://animedel.no/ · Animedel er et varemerke fra ML Internasjonal. (Repo / Pages project: `NORDIC-PET-STORE`, formerly "Nordic Pet Store".)

**This repository is Animedel only.** Do not add, merge or configure other Nordic storefronts here.

International storefront for Norway, Europe and Peru. Responsive catalog, market localization, cart, delivery options, test checkout wiring and supplier-ready API endpoints.

## Checkout is off (no charging yet)

Stripe Checkout is **intentionally disabled** (`STORE.checkoutEnabled = false` in `functions/_shared/store.ts`). `/api/create-checkout-session` returns HTTP 503 while the flag is false.

**Animedel does not charge customers until each pet SKU has verified:**

1. **Stock** — supplier inventory / availability for that SKU  
2. **Delivery** — destination coverage, shipping quote and expected lead time  
3. **Compliance (cumplimiento)** — product safety / regulatory fit for pet goods (manufacturer, responsible economic operator, warnings, VAT treatment, return address)

Also required before turning charging on: a live payment provider (`STRIPE_SECRET_KEY` with `sk_live_…`) and a working order webhook. Record the checks per SKU before flipping `checkoutEnabled` to `true`.

Until then the storefront stays in **non-charging request / browse mode** (catalog and cart UI may work; payment does not).

## Supplier credentials (never invent or commit)

Configure real keys only in Cloudflare Pages / Netlify environment variables. **Do not invent, hardcode or commit** `CJ_API_KEY`, `PRINTIFY_API_TOKEN`, `GELATO_API_KEY` or `PRINTFUL_API_TOKEN`. Leave them unset until real dashboard keys exist; APIs then use empty local `catalog/*-products.json` fallbacks.

- Shared order automation: `MAKE_ORDERS_WEBHOOK` (env only)
- See `STRIPE-SETUP.md` for Stripe and POD env names

## Separate supplier catalogs (no blend)

- Storefront switcher: **CJ | Printify | Gelato | Printful** — `window.nordicCatalogs` keeps arrays separate; default UI shows CJ only.
- Printify / Gelato / Printful use the same model as CJ: live API when env keys are set, local `catalog/*-products.json` (empty `[]`) as fallback only.
- Env: `PRINTIFY_API_TOKEN`, `GELATO_API_KEY`, `PRINTFUL_API_TOKEN` (plus existing `CJ_API_KEY`). See `STRIPE-SETUP.md`.
- German Drop remains authorized-manual / shared-account only (no fake DE catalog). CJ catalog unchanged.

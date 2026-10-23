# Stripe setup for nordic-pet-store (Animedel only)

**Checkout is currently off.** `STORE.checkoutEnabled` in `functions/_shared/store.ts` and `CHECKOUT_ENABLED` in `commerce-runtime.js` / `create-checkout-session.ts` are `false`. Do not enable charging until each pet SKU has verified supplier stock, delivery and product compliance. Setting Stripe env vars alone does not turn checkout on.

Required Cloudflare Pages production environment variables (do not commit secrets; never invent placeholder keys):

- `STRIPE_SECRET_KEY` — TEST-mode secret key starting with `sk_test_` (Stripe test mode; live keys are rejected by the code)
- `STRIPE_WEBHOOK_SECRET` — webhook signing secret from Stripe
- `MAKE_ORDERS_WEBHOOK` — order inbox webhook URL (will be `https://ml-inbox.willynoslo17.workers.dev/nordic`)
- `ML_STORE_KEY` — secret store key sent as `x-store-key` when forwarding `nordic-order/v2` to the inbox

Stripe webhook endpoint URL after deploy:

`https://nordic-pet-store.pages.dev/api/stripe-webhook`

Subscribe at least to `checkout.session.completed`.

Checkout session API:

`POST /api/create-checkout-session`

## POD / CJ supplier APIs (Cloudflare Pages / Netlify env)

Use **real** dashboard keys only — no invented, test or placeholder tokens in the repo. Leave unset for empty POD catalogs; set for live API with local `[]` fallback:

- `CJ_API_KEY` — CJ Dropshipping API key (optional until live sourcing).
- `PRINTIFY_API_TOKEN` — Printify personal access token (shop products). Optional `PRINTIFY_SHOP_ID` (default `28847802`).
- `GELATO_API_KEY` — Gelato API key (`X-API-KEY`). Optional `GELATO_STORE_ID` for priced ecommerce store products.
- `PRINTFUL_API_TOKEN` — Printful private/OAuth token. Optional `PRINTFUL_STORE_ID` (`X-PF-Store-Id`) for account-level tokens.

Catalog endpoints: `/api/printify-products`, `/api/gelato-products`, `/api/printful-products` (same live-with-local-fallback model as CJ).
When Gelato has no sellable products (missing key, no images, or no cost), `/api/gelato-products` returns HTTP 200 with `products: []` so the storefront skips Gelato quietly.

## Checkout v2 (shipping address, supplier IDs, paid-only webhook)

- Stripe Checkout collects a **shipping address** (Norway only for this storefront) and a **phone number**.
- Free standard shipping in Norway when merchandise subtotal is **599 NOK** or more (otherwise 79 NOK).
- Subscribe the webhook to `checkout.session.completed` **and** `checkout.session.async_payment_succeeded`.
  Only sessions with `payment_status = paid` and `metadata.store = nordic-pet-store` are forwarded to `MAKE_ORDERS_WEBHOOK`.
- Payload schema `nordic-order/v2`: per-line provider, sku, quantity and supplier IDs, `groups`, `providers`, `missing_ids`,
  `shipping`, `event_id` (deduplicate on it or on `stripe_session_id`). See `functions/_shared/order-payload.ts`.
- Prices are never taken from the browser: each line is priced from a server-signed catalog quote
  (key derived from `STRIPE_SECRET_KEY`) or from the bundled `catalog/*.json`. Anything else is rejected.
- CJ lines: the default variant `vid` is resolved at checkout with `CJ_API_KEY`. Stores without the key ask
  `https://nordic-beauty-perfumes.pages.dev/api/cj-variant`. If that fails, the line is listed in `missing_ids`.
- `/api/order` is retired (HTTP 410) and no longer posts to Make.

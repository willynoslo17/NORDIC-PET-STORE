# Nordic Pet Store

International storefront for Norway, Europe and Peru. Responsive catalog, market localization, cart, delivery options, test checkout and supplier-ready API endpoints.
## Direct commerce activation

The store has its own `/api/cj-products` catalog endpoint and a validated `/api/order` endpoint. Configure `CJ_API_KEY` and the shared `MAKE_ORDERS_WEBHOOK` in Netlify; credentials must never be committed.

The storefront remains in non-charging request mode until supplier stock, landed cost, delivery time, product compliance and a payment provider are verified. Before enabling payment for a SKU, record its manufacturer, responsible economic operator, safety warnings, destination availability, current shipping quote, VAT treatment and return address.

## Printify catalog (local merge)

- `catalog/printify-products.json` — 5 Printify-tagged products (Accent Coffee Mug test blank `6aaf8e7dbbdfcc3784010ae1` + sector POD placeholders).
- `supplier-bridge.js` merges CJ `selected-products.json` (ids 10001+) with Printify (ids 20001+).
- Stripe Checkout sets `metadata.provider` / line-item `metadata.provider` (`printify` or `cj`) for Make.
- **Replace placeholders** with a real export from Printify shop `28847802` (or enable live API sync with `PRINTIFY_API_TOKEN`).
- CJ catalog is unchanged. German Drop remains authorized-manual / shared-account only (no fake DE catalog).

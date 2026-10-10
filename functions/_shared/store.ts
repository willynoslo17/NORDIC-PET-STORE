/** Per-store identity. This is the only checkout/webhook file that differs between the NORDIC-* repos. */
export const STORE = {
  slug: "nordic-pet-store",
  brand: "Animedel",
  domain: "animedel.no",
  siteUrl: "https://animedel.no/",
  /** Catalog sector used by the Gelato/Printful endpoints (never taken from the query string). */
  sector: "pet supplies",
  /**
   * Checkout stays off until each pet SKU has verified supplier stock, delivery and product compliance.
   * Do not flip this on just because STRIPE_SECRET_KEY / supplier env keys are present.
   * Keep in sync with CHECKOUT_ENABLED in commerce-runtime.js and create-checkout-session.ts.
   */
  checkoutEnabled: false,
} as const;

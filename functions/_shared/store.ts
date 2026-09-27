/** Per-store identity. This is the only checkout/webhook file that differs between the NORDIC-* repos. */
export const STORE = {
  slug: "nordic-pet-store",
  brand: "Animedel",
  domain: "animedel.no",
  siteUrl: "https://animedel.no/",
  /** Catalog sector used by the Gelato/Printful endpoints (never taken from the query string). */
  sector: "pet supplies",
} as const;

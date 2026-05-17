// Single source of truth for App Store / Google Play ratings.
//
// Numbers are real and verifiable — sourced from the live App Store Connect
// API. Used in Schema.org SoftwareApplication aggregateRating so the schema
// matches the truth on the store page. Never invent or pad these.
//
// Refresh procedure (manual until automated):
//   mcp__appstoreconnect__asc_list_customer_reviews --territory GBR --limit 200
//   Count rows, compute mean rating, update constants below.
//
// TODO: build-time script that hits ASC + Play Console nightly and rewrites
//       this file so the schema always matches the live store.

export interface StoreRating {
  ratingValue: number;
  ratingCount: number;
  bestRating: number;
  worstRating: number;
  lastRefreshedAt: string; // ISO date
}

// Apple App Store — GBR, verified via ASC API
export const APP_STORE_RATING: StoreRating = {
  ratingValue: 5.0,
  ratingCount: 5,
  bestRating: 5,
  worstRating: 1,
  lastRefreshedAt: '2026-05-17',
};

// Google Play — Android not yet released; leave null until first AAB ships
export const PLAY_STORE_RATING: StoreRating | null = null;

/**
 * Combined aggregate across all stores (for use in SoftwareApplication schema).
 * Returns null if no store data is available — caller should omit aggregateRating
 * from the schema rather than emit fake data.
 */
export function combinedStoreRating(): StoreRating | null {
  const ratings = [APP_STORE_RATING, PLAY_STORE_RATING].filter(
    (r): r is StoreRating => r !== null,
  );
  if (ratings.length === 0) return null;
  if (ratings.length === 1) return ratings[0];

  const totalCount = ratings.reduce((s, r) => s + r.ratingCount, 0);
  const weightedSum = ratings.reduce((s, r) => s + r.ratingValue * r.ratingCount, 0);
  return {
    ratingValue: Number((weightedSum / totalCount).toFixed(2)),
    ratingCount: totalCount,
    bestRating: 5,
    worstRating: 1,
    lastRefreshedAt: ratings.reduce((latest, r) =>
      r.lastRefreshedAt > latest.lastRefreshedAt ? r : latest,
    ).lastRefreshedAt,
  };
}

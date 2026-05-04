/**
 * Marketplace pricing helper.
 *
 * Source of truth for trade pricing in the Cost Engineer pipeline. Reads
 * the live `marketplace_products` table populated by elec-pipeline
 * (crawl4ai on the VPS). Every price returned carries provenance: the
 * supplier name, the product URL, and `scraped_at` so the frontend can
 * show freshness chips.
 *
 * No embeddings, no caching layer — `marketplace_products.search_vector`
 * (TSVECTOR weighted: name A, brand A, description B, category C) gives
 * us full-text search at SQL speed, ~50-200ms per query.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MarketplaceMatch {
  /** marketplace_products.id — for traceability. */
  id: string;
  name: string;
  brand: string | null;
  category: string | null;
  subcategory: string | null;
  /** Cheapest current price seen for this row. */
  unitPrice: number;
  /** RRP / non-sale price if known. */
  regularPrice: number | null;
  isOnSale: boolean;
  discountPercentage: number | null;
  supplier: string;
  supplierSlug: string;
  productUrl: string;
  imageUrl: string | null;
  stockStatus: string;
  scrapedAt: string;
}

export interface MarketplaceDeal {
  id: string;
  productName: string;
  supplier: string;
  supplierSlug: string;
  originalPrice: number | null;
  dealPrice: number | null;
  discountPercentage: number | null;
  productUrl: string;
  expiresAt: string;
}

export interface MarketplaceCoupon {
  code: string;
  description: string | null;
  supplier: string;
  supplierSlug: string;
  discountType: 'percentage' | 'fixed' | 'free_delivery';
  discountValue: number | null;
  minimumSpend: number | null;
  validUntil: string | null;
}

// Search/filter logic now lives in the Postgres RPC
// `cost_engineer_match_product`. The function takes the raw query, applies
// the strict→loose AND/OR cascade, ts_rank ordering, and the cable
// per-metre boost. See `searchMaterials` below for the call site.

/**
 * Search marketplace_products for matches to a free-text query.
 * Used by Stage A to price each item candidate.
 *
 * Returns at most `limit` matches, sorted by current_price ASC (cheapest first).
 * Always filters expired rows and excludes the well-known junk names.
 */
export async function searchMaterials(
  supabase: any,
  args: {
    query: string;
    category?: string | null;
    productType?: 'material' | 'tool' | 'accessory' | 'ppe';
    limit?: number;
  }
): Promise<MarketplaceMatch[]> {
  const { query, category = null, productType = 'material', limit = 5 } = args;
  if (!query?.trim()) return [];

  // Delegate to the Postgres RPC. It does the strict-then-loose AND/OR
  // cascade, ts_rank ordering (relevance first, price tiebreak), and
  // the cable-specific Cut-to-Length boost / drum-coil penalty.
  const { data, error } = await supabase.rpc('cost_engineer_match_product', {
    query_text: query,
    category_filter: category,
    product_type_filter: productType,
    match_count: limit,
  });

  if (error) {
    console.error('[marketplace-pricing] cost_engineer_match_product RPC error:', error);
    return [];
  }

  let hits = (data ?? []).map(rpcRowToMatch);

  // If the strict + loose searches returned nothing inside the requested
  // category, retry without the category filter — the AI's category
  // guess sometimes disagrees with how elec-pipeline bucketed the row.
  if (hits.length === 0 && category) {
    const { data: broad } = await supabase.rpc('cost_engineer_match_product', {
      query_text: query,
      category_filter: null,
      product_type_filter: productType,
      match_count: limit,
    });
    hits = (broad ?? []).map(rpcRowToMatch);
  }

  return hits;
}

/**
 * Find the single cheapest marketplace match for an item description.
 * Convenience wrapper for Stage A's per-item pricing pass.
 */
export async function cheapestForItem(
  supabase: any,
  args: { query: string; category?: string | null }
): Promise<MarketplaceMatch | null> {
  const matches = await searchMaterials(supabase, {
    query: args.query,
    category: args.category,
    limit: 1,
  });
  return matches[0] ?? null;
}

/**
 * Batch price lookup. Issues queries in parallel, capped to a small
 * concurrency limit so we don't open a connection per item on jobs with
 * 30+ candidates.
 *
 * (TODO Phase B: replace with a Postgres SETOF function that takes an
 * array of search strings and returns one cheapest row per input — then
 * we get true batching. Keeping this layer at this surface so the call
 * site stays the same.)
 */
export async function cheapestForItemsBatch(
  supabase: any,
  items: Array<{ key: string; query: string; category?: string | null }>
): Promise<Record<string, MarketplaceMatch | null>> {
  const CONCURRENCY = 6;
  const out: Record<string, MarketplaceMatch | null> = {};

  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const i = cursor++;
      const it = items[i];
      out[it.key] = await cheapestForItem(supabase, { query: it.query, category: it.category });
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, worker);
  await Promise.all(workers);
  return out;
}

/** Active deals — top discounts surfaced as upsell hooks for Stage B. */
export async function getActiveDeals(
  supabase: any,
  args: { limit?: number; productType?: 'material' | 'tool' | 'accessory' | 'ppe' } = {}
): Promise<MarketplaceDeal[]> {
  const { limit = 5, productType = 'material' } = args;
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from('marketplace_deals')
    .select(`
      id,
      original_price,
      deal_price,
      discount_percentage,
      title,
      expires_at,
      marketplace_products!inner ( name, product_url, product_type ),
      marketplace_suppliers!inner ( name, slug )
    `)
    .eq('is_active', true)
    .gte('expires_at', nowIso)
    .order('discount_percentage', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error('[marketplace-pricing] getActiveDeals error:', error);
    return [];
  }

  return (data ?? [])
    .filter((row: any) => row.marketplace_products?.product_type === productType)
    .map((row: any) => ({
      id: row.id,
      productName: row.marketplace_products?.name ?? row.title ?? 'Unknown',
      supplier: row.marketplace_suppliers?.name ?? 'Unknown',
      supplierSlug: row.marketplace_suppliers?.slug ?? '',
      originalPrice: row.original_price,
      dealPrice: row.deal_price,
      discountPercentage: row.discount_percentage,
      productUrl: row.marketplace_products?.product_url ?? '',
      expiresAt: row.expires_at,
    }));
}

/** Active coupons — passed to Stage B so the AI can suggest applicable codes. */
export async function getActiveCoupons(
  supabase: any,
  args: { limit?: number } = {}
): Promise<MarketplaceCoupon[]> {
  const { limit = 8 } = args;
  const nowIso = new Date().toISOString();

  const { data, error } = await supabase
    .from('marketplace_coupon_codes')
    .select(`
      code,
      description,
      discount_type,
      discount_value,
      minimum_spend,
      valid_until,
      marketplace_suppliers!inner ( name, slug )
    `)
    .or(`valid_until.gte.${nowIso},valid_until.is.null`)
    .eq('is_verified', true)
    .order('discount_value', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error('[marketplace-pricing] getActiveCoupons error:', error);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    code: row.code,
    description: row.description,
    supplier: row.marketplace_suppliers?.name ?? 'Unknown',
    supplierSlug: row.marketplace_suppliers?.slug ?? '',
    discountType: row.discount_type,
    discountValue: row.discount_value,
    minimumSpend: row.minimum_spend,
    validUntil: row.valid_until,
  }));
}

/* ─── Internals ─────────────────────────────────────────────────────── */

/** Flatten the RPC's column shape into our MarketplaceMatch interface. */
function rpcRowToMatch(row: any): MarketplaceMatch {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    subcategory: row.subcategory,
    unitPrice: Number(row.current_price ?? 0),
    regularPrice: row.regular_price !== null ? Number(row.regular_price) : null,
    isOnSale: !!row.is_on_sale,
    discountPercentage: row.discount_percentage !== null ? Number(row.discount_percentage) : null,
    supplier: row.supplier_name ?? 'Unknown',
    supplierSlug: row.supplier_slug ?? '',
    productUrl: row.product_url ?? '',
    imageUrl: row.image_url,
    stockStatus: row.stock_status ?? 'unknown',
    scrapedAt: row.scraped_at,
  };
}

/** Helper for staleness chips in the UI. */
export function freshnessLabel(scrapedAt: string | null | undefined): string {
  if (!scrapedAt) return 'unknown';
  const ms = Date.now() - new Date(scrapedAt).getTime();
  const mins = Math.floor(ms / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

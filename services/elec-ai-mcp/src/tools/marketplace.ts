/**
 * Marketplace tools (4)
 * Product search, price comparison, and deals from the marketplace tables.
 *
 * Tables:
 *   - marketplace_products  (supplier_id FK → marketplace_suppliers)
 *   - marketplace_deals     (supplier_id FK → marketplace_suppliers, product_id FK → marketplace_products)
 *
 * Tools:
 *   - search_products — search marketplace_products by name/category
 *   - compare_prices — compare across suppliers (CEF, Screwfix, TLC)
 *   - price_materials_for_job — price up materials from a job description
 *   - get_deals — current deals from electrical suppliers
 */

import type { UserContext } from '../auth.js';

/** Look up supplier IDs matching a name (ILIKE). Returns array of UUIDs. */
async function resolveSupplierIds(
  supabase: UserContext['supabase'],
  supplierName: string
): Promise<string[]> {
  const { data } = await supabase
    .from('marketplace_suppliers')
    .select('id')
    .ilike('name', `%${supplierName}%`);
  return (data || []).map((r: { id: string }) => r.id);
}

/** Columns selected for product queries (joins supplier name via FK) */
const PRODUCT_SELECT =
  'id, name, description, category, brand, current_price, regular_price, is_on_sale, discount_percentage, product_type, image_url, product_url, stock_status, sku, marketplace_suppliers(name)' as const;

interface ShapedProduct {
  id: unknown;
  name: unknown;
  description: unknown;
  category: unknown;
  brand: unknown;
  price: number;
  regular_price: number | null;
  is_on_sale: unknown;
  discount_percentage: number | null;
  supplier: string;
  product_type: unknown;
  image_url: unknown;
  product_url: unknown;
  stock_status: unknown;
  sku: unknown;
}

/** Shape a raw product row into a clean result object */
function shapeProduct(row: Record<string, unknown>): ShapedProduct {
  const supplier =
    row.marketplace_suppliers &&
    typeof row.marketplace_suppliers === 'object' &&
    (row.marketplace_suppliers as Record<string, unknown>).name
      ? String((row.marketplace_suppliers as Record<string, unknown>).name)
      : 'Unknown';

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    category: row.category,
    brand: row.brand,
    price: Number(row.current_price) || 0,
    regular_price: row.regular_price != null ? Number(row.regular_price) : null,
    is_on_sale: row.is_on_sale ?? false,
    discount_percentage: row.discount_percentage != null ? Number(row.discount_percentage) : null,
    supplier,
    product_type: row.product_type ?? null,
    image_url: row.image_url ?? null,
    product_url: row.product_url ?? null,
    stock_status: row.stock_status ?? null,
    sku: row.sku ?? null,
  };
}

export async function searchProducts(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;

  // Sanitise to prevent PostgREST filter injection
  const rawQuery = args.query.trim();
  const searchTerm = rawQuery.replace(/[,.()"'\\]/g, '');

  // Resolve supplier filter to IDs if given
  let supplierIds: string[] | null = null;
  if (typeof args.supplier === 'string' && args.supplier.length > 0) {
    supplierIds = await resolveSupplierIds(supabase, args.supplier);
  }

  // Use full-text search via search_vector for queries with 3+ chars
  if (searchTerm.length >= 3) {
    const tsQuery = searchTerm
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .join(' & ');

    const { data, error } = await supabase.rpc('search_marketplace_products', {
      search_query: tsQuery,
      category_filter:
        typeof args.category === 'string' && args.category.length > 0 ? args.category : null,
      result_limit: limit,
    });

    if (!error && data && data.length > 0) {
      let results: ShapedProduct[] = data.map(shapeProduct);
      // Post-filter by supplier if specified (RPC doesn't support supplier filter)
      if (supplierIds && supplierIds.length > 0) {
        const supplierArg = (args.supplier as string).toLowerCase();
        const filtered = results.filter((r) => r.supplier.toLowerCase().includes(supplierArg));
        if (filtered.length > 0) results = filtered;
      }
      return { products: results, currency: 'GBP', search_method: 'full_text' };
    }
  }

  // Fallback: ILIKE for short queries or when full-text returns nothing
  let query = supabase.from('marketplace_products').select(PRODUCT_SELECT);

  if (typeof args.category === 'string' && args.category.length > 0) {
    query = query.eq('category', args.category);
  }

  if (supplierIds && supplierIds.length > 0) {
    query = query.in('supplier_id', supplierIds);
  }

  if (searchTerm.length > 0) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  query = query.order('current_price', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to search products: ${error.message}`);

  return { products: (data || []).map(shapeProduct), currency: 'GBP', search_method: 'ilike' };
}

export async function comparePrices(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.product_name !== 'string' || args.product_name.trim().length === 0) {
    throw new Error('product_name is required');
  }

  const supabase = user.supabase;

  // Sanitise to prevent PostgREST filter injection
  const searchTerm = args.product_name.trim().replace(/[,.()"'\\]/g, '');

  const { data, error } = await supabase
    .from('marketplace_products')
    .select(PRODUCT_SELECT)
    .ilike('name', `%${searchTerm}%`)
    .order('current_price', { ascending: true })
    .limit(20);

  if (error) throw new Error(`Failed to compare prices: ${error.message}`);

  const products = (data || []).map(shapeProduct);

  // Group by supplier
  const bySupplier: Record<
    string,
    { supplier: string; cheapest: number; products: typeof products }
  > = {};
  for (const p of products) {
    const supplier = p.supplier;
    if (!bySupplier[supplier]) {
      bySupplier[supplier] = { supplier, cheapest: Infinity, products: [] };
    }
    if (p.price < bySupplier[supplier].cheapest) bySupplier[supplier].cheapest = p.price;
    bySupplier[supplier].products.push(p);
  }

  const cheapest = products.length > 0 ? products[0] : null;

  return {
    query: args.product_name,
    results: products,
    by_supplier: Object.values(bySupplier),
    cheapest,
    currency: 'GBP',
  };
}

export async function priceMaterialsForJob(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.job_description !== 'string' || args.job_description.trim().length === 0) {
    throw new Error(
      'job_description is required (e.g. "consumer unit change, 10 ways, 30m 2.5mm T&E")'
    );
  }

  const supabase = user.supabase;
  const description = args.job_description.trim();
  const preferredSupplier =
    typeof args.preferred_supplier === 'string' ? args.preferred_supplier.trim() : null;
  const budgetLimit = typeof args.budget_limit === 'number' ? args.budget_limit : null;

  // Common material keywords to extract from job descriptions
  const materialPatterns: Array<{ pattern: RegExp; keywords: string[] }> = [
    { pattern: /consumer\s*unit|CU|board/i, keywords: ['consumer unit'] },
    { pattern: /MCB/i, keywords: ['MCB'] },
    { pattern: /RCBO/i, keywords: ['RCBO'] },
    { pattern: /RCD/i, keywords: ['RCD'] },
    { pattern: /main\s*switch/i, keywords: ['main switch'] },
    { pattern: /(\d+\.?\d*)\s*mm.*T&E|twin\s*and\s*earth/i, keywords: ['twin and earth cable'] },
    { pattern: /(\d+\.?\d*)\s*mm.*SWA/i, keywords: ['SWA cable'] },
    { pattern: /(\d+\.?\d*)\s*mm.*flex/i, keywords: ['flex cable'] },
    { pattern: /cable\s*clips?/i, keywords: ['cable clips'] },
    { pattern: /junction\s*box/i, keywords: ['junction box'] },
    { pattern: /socket|double\s*socket/i, keywords: ['socket'] },
    { pattern: /switch|light\s*switch/i, keywords: ['light switch'] },
    { pattern: /down\s*light|downlight|spotlight/i, keywords: ['downlight'] },
    { pattern: /conduit|trunking/i, keywords: ['conduit trunking'] },
    { pattern: /earth\s*rod|earth\s*clamp/i, keywords: ['earth rod'] },
    { pattern: /back\s*box/i, keywords: ['back box'] },
    { pattern: /isolator/i, keywords: ['isolator switch'] },
    { pattern: /smoke\s*(alarm|detector)/i, keywords: ['smoke alarm'] },
    { pattern: /EV\s*charger|charge\s*point/i, keywords: ['EV charger'] },
    { pattern: /fire\s*alarm/i, keywords: ['fire alarm'] },
    { pattern: /emergency\s*light/i, keywords: ['emergency light'] },
    { pattern: /LED\s*panel|batten/i, keywords: ['LED batten'] },
    { pattern: /henley\s*block/i, keywords: ['henley block'] },
    { pattern: /meter\s*tails/i, keywords: ['meter tails'] },
  ];

  // Extract keywords from the job description
  const searchKeywords: string[] = [];
  for (const { pattern, keywords } of materialPatterns) {
    if (pattern.test(description)) {
      searchKeywords.push(...keywords);
    }
  }

  // If no patterns matched, split on commas and use raw terms
  if (searchKeywords.length === 0) {
    const parts = description
      .split(/[,;]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2);
    searchKeywords.push(...parts.slice(0, 10));
  }

  // Resolve preferred supplier to IDs (if given)
  let supplierIds: string[] | null = null;
  if (preferredSupplier) {
    supplierIds = await resolveSupplierIds(supabase, preferredSupplier);
  }

  // Query marketplace_products for each keyword
  const items: Array<{
    material: string;
    product_name: string;
    unit_price: number;
    supplier: string;
    image_url: string | null;
    product_url: string | null;
  }> = [];

  for (const keyword of searchKeywords) {
    // Sanitise to prevent PostgREST filter injection
    const searchTerm = keyword.replace(/[,.()"'\\]/g, '');
    if (searchTerm.length === 0) continue;

    let query = supabase
      .from('marketplace_products')
      .select(PRODUCT_SELECT)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('current_price', { ascending: true });

    if (supplierIds && supplierIds.length > 0) {
      query = query.in('supplier_id', supplierIds);
    }

    query = query.limit(3);

    const { data, error } = await query;
    if (error) continue;

    if (data && data.length > 0) {
      const shaped = shapeProduct(data[0]);
      items.push({
        material: keyword,
        product_name: shaped.name as string,
        unit_price: shaped.price,
        supplier: shaped.supplier,
        image_url: shaped.image_url as string | null,
        product_url: shaped.product_url as string | null,
      });
    }
  }

  const grandTotal = items.reduce((sum, item) => sum + item.unit_price, 0);

  const now = new Date().toISOString().split('T')[0];

  return {
    job_description: description,
    items,
    items_found: items.length,
    keywords_searched: searchKeywords.length,
    grand_total: Math.round(grandTotal * 100) / 100,
    currency: 'GBP',
    within_budget: budgetLimit !== null ? grandTotal <= budgetLimit : null,
    note: `Prices from marketplace data as of ${now}. Unit prices shown — multiply by quantity needed. Verify quantities on site before ordering.`,
  };
}

export async function getDeals(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const now = new Date().toISOString();

  // Resolve supplier filter to IDs if given
  let supplierIds: string[] | null = null;
  if (typeof args.supplier === 'string' && args.supplier.length > 0) {
    supplierIds = await resolveSupplierIds(supabase, args.supplier);
  }

  let query = supabase
    .from('marketplace_deals')
    .select(
      'id, title, description, deal_type, original_price, deal_price, discount_percentage, expires_at, source_url, is_active, marketplace_suppliers(name), marketplace_products(name, image_url, product_url)'
    )
    .eq('is_active', true)
    .gte('expires_at', now)
    .order('discount_percentage', { ascending: false });

  if (supplierIds && supplierIds.length > 0) {
    query = query.in('supplier_id', supplierIds);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 30) : 10;
  query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get deals: ${error.message}`);

  // Shape deals to flatten supplier/product names
  const deals = (data || []).map((row: Record<string, unknown>) => {
    const supplierObj = row.marketplace_suppliers as Record<string, unknown> | null;
    const productObj = row.marketplace_products as Record<string, unknown> | null;
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      deal_type: row.deal_type,
      original_price: row.original_price != null ? Number(row.original_price) : null,
      deal_price: row.deal_price != null ? Number(row.deal_price) : null,
      discount_percentage: row.discount_percentage != null ? Number(row.discount_percentage) : null,
      supplier: supplierObj?.name ? String(supplierObj.name) : 'Unknown',
      product_name: productObj?.name ? String(productObj.name) : null,
      product_image_url: productObj?.image_url ?? null,
      product_url: productObj?.product_url ?? null,
      source_url: row.source_url,
      expires_at: row.expires_at,
    };
  });

  return { deals, currency: 'GBP' };
}

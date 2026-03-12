/**
 * Marketplace tools (3)
 * Product search, price comparison, and deals from the marketplace tables.
 *
 * Tools:
 *   - search_products — search marketplace_products by name/category
 *   - compare_prices — compare across suppliers (CEF, Screwfix, TLC)
 *   - get_deals — current deals and discount codes
 */

import type { UserContext } from '../auth.js';

export async function searchProducts(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;

  let query = supabase
    .from('marketplace_products')
    .select('id, name, description, category, brand, price, supplier, unit, image_url, url');

  if (typeof args.category === 'string' && args.category.length > 0) {
    query = query.eq('category', args.category);
  }

  if (typeof args.supplier === 'string' && args.supplier.length > 0) {
    query = query.ilike('supplier', `%${args.supplier}%`);
  }

  // Sanitise to prevent PostgREST filter injection
  const searchTerm = args.query.trim().replace(/[,.()"'\\]/g, '');
  if (searchTerm.length > 0) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
  }

  query = query.order('name', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to search products: ${error.message}`);

  return { products: data || [], currency: 'GBP' };
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
    .select('id, name, supplier, price, unit, url, last_updated')
    .ilike('name', `%${searchTerm}%`)
    .order('price', { ascending: true })
    .limit(20);

  if (error) throw new Error(`Failed to compare prices: ${error.message}`);

  const products = data || [];

  // Group by supplier
  const bySupplier: Record<
    string,
    { supplier: string; cheapest: number; products: typeof products }
  > = {};
  for (const p of products) {
    const supplier = (p.supplier as string) || 'Unknown';
    if (!bySupplier[supplier]) {
      bySupplier[supplier] = { supplier, cheapest: Infinity, products: [] };
    }
    const price = Number(p.price) || 0;
    if (price < bySupplier[supplier].cheapest) bySupplier[supplier].cheapest = price;
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
    throw new Error('job_description is required (e.g. "consumer unit change, 10 ways, 30m 2.5mm T&E")');
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
    const parts = description.split(/[,;]+/).map((s) => s.trim()).filter((s) => s.length > 2);
    searchKeywords.push(...parts.slice(0, 10));
  }

  // Query marketplace_products for each keyword
  const items: Array<{
    material: string;
    product_name: string;
    unit_price: number;
    supplier: string;
    url: string | null;
  }> = [];

  for (const keyword of searchKeywords) {
    // Sanitise to prevent PostgREST filter injection
    const searchTerm = keyword.replace(/[,.()"'\\]/g, '');
    if (searchTerm.length === 0) continue;

    let query = supabase
      .from('marketplace_products')
      .select('name, price, supplier, url')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('price', { ascending: true });

    if (preferredSupplier) {
      query = query.ilike('supplier', `%${preferredSupplier}%`);
    }

    query = query.limit(3);

    const { data, error } = await query;
    if (error) continue;

    if (data && data.length > 0) {
      // Pick cheapest result for this keyword
      const cheapest = data[0];
      items.push({
        material: keyword,
        product_name: cheapest.name as string,
        unit_price: Number(cheapest.price) || 0,
        supplier: (cheapest.supplier as string) || 'Unknown',
        url: (cheapest.url as string) || null,
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

  let query = supabase
    .from('marketplace_deals')
    .select(
      'id, title, description, supplier, discount_code, discount_percent, valid_until, url, category'
    )
    .gte('valid_until', now)
    .order('discount_percent', { ascending: false });

  if (typeof args.supplier === 'string' && args.supplier.length > 0) {
    query = query.ilike('supplier', `%${args.supplier}%`);
  }

  if (typeof args.category === 'string' && args.category.length > 0) {
    query = query.eq('category', args.category);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 30) : 10;
  query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get deals: ${error.message}`);

  return { deals: data || [] };
}

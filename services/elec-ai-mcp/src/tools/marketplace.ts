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

/**
 * Compare Materials Prices Edge Function
 * Multi-supplier search, price comparison, and optimised basket calculation.
 * Searches ALL active suppliers for each parsed material item.
 */

import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

interface InputItem {
  name: string;
  quantity: number;
  unit: string;
  original_text?: string;
}

interface SupplierDelivery {
  click_collect: string;
  standard: string;
  next_day: string;
}

interface SupplierMatch {
  product_id: string;
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  product_name: string;
  brand: string | null;
  sku: string | null;
  current_price: number;
  regular_price: number | null;
  is_on_sale: boolean;
  discount_percentage: number | null;
  stock_status: string;
  product_url: string;
  image_url: string | null;
  delivery: SupplierDelivery;
  is_recommended: boolean;
}

interface ComparisonItem {
  name: string;
  quantity: number;
  unit: string;
  original_text?: string;
  matches: SupplierMatch[];
  best_price: number | null;
  best_supplier: string | null;
}

interface SupplierSummary {
  supplier_id: string;
  supplier_name: string;
  supplier_slug: string;
  item_count: number;
  total: number;
  delivery: SupplierDelivery;
}

// Static delivery data — no DB column exists
const DELIVERY_DATA: Record<string, SupplierDelivery> = {
  screwfix: { click_collect: 'Free', standard: '£5.00', next_day: '£7.50' },
  toolstation: { click_collect: 'Free', standard: '£5.00', next_day: '£7.50' },
  'tlc-electrical': { click_collect: 'N/A', standard: 'Free over £50', next_day: '£9.95' },
  'rs-components': { click_collect: 'N/A', standard: 'Free over £40', next_day: '£6.95' },
  'machine-mart': { click_collect: 'Free', standard: '£5.99', next_day: 'Check supplier' },
  ffx: { click_collect: 'N/A', standard: 'Free over £50', next_day: '£6.99' },
};

const DEFAULT_DELIVERY: SupplierDelivery = {
  click_collect: 'Check supplier',
  standard: 'Check supplier',
  next_day: 'Check supplier',
};

/**
 * Generate alternative search terms for ambiguous electrical items
 */
async function getAlternativeTerms(
  openAiKey: string,
  itemName: string
): Promise<string[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 256,
        messages: [
          {
            role: 'system',
            content:
              'You generate alternative UK electrical trade product search terms. Given a product name, return 2-3 alternative ways it might be listed in supplier catalogues. Include cable designations (e.g. 6242Y for T&E), brand-neutral terms, and common abbreviation expansions.',
          },
          {
            role: 'user',
            content: itemName,
          },
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'suggest_search_terms',
              description: 'Return alternative search terms for a product',
              parameters: {
                type: 'object',
                properties: {
                  terms: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Alternative search terms',
                  },
                },
                required: ['terms'],
              },
            },
          },
        ],
        tool_choice: { type: 'function', function: { name: 'suggest_search_terms' } },
      }),
    });

    if (!response.ok) return [];

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) return [];

    const parsed = JSON.parse(toolCall.function.arguments);
    return (parsed.terms || []).slice(0, 3);
  } catch {
    return [];
  }
}

/**
 * Search marketplace_products for a given term
 */
async function searchProducts(
  supabase: ReturnType<typeof createClient>,
  searchTerm: string,
  limit = 30
) {
  const { data, error } = await supabase
    .from('marketplace_products')
    .select(
      `id, sku, name, brand, current_price, regular_price,
       is_on_sale, discount_percentage, stock_status, product_url, image_url,
       supplier_id, marketplace_suppliers (id, name, slug)`
    )
    .or('expires_at.gte.now(),expires_at.is.null')
    .ilike('name', `%${searchTerm}%`)
    .order('current_price', { ascending: true })
    .limit(limit);

  if (error) {
    console.error(`Search error for "${searchTerm}":`, error.message);
    return [];
  }

  return data || [];
}

/**
 * Process a batch of items: search + group by supplier
 */
async function processItem(
  supabase: ReturnType<typeof createClient>,
  openAiKey: string | undefined,
  item: InputItem
): Promise<ComparisonItem> {
  // Primary search
  let allResults = await searchProducts(supabase, item.name);

  // If few results, try alternative terms
  if (allResults.length < 3 && openAiKey) {
    const altTerms = await getAlternativeTerms(openAiKey, item.name);
    for (const term of altTerms) {
      const moreResults = await searchProducts(supabase, term, 15);
      // Deduplicate by product ID
      const existingIds = new Set(allResults.map((r: { id: string }) => r.id));
      for (const r of moreResults) {
        if (!existingIds.has(r.id)) {
          allResults.push(r);
          existingIds.add(r.id);
        }
      }
    }
  }

  // Group by supplier, take best (cheapest) match per supplier
  const supplierBest = new Map<string, SupplierMatch>();

  for (const product of allResults) {
    const supplier = (product as Record<string, unknown>).marketplace_suppliers as
      | { id: string; name: string; slug: string }
      | null;
    if (!supplier) continue;

    const supplierSlug = supplier.slug || 'unknown';
    const existing = supplierBest.get(supplierSlug);

    if (!existing || product.current_price < existing.current_price) {
      supplierBest.set(supplierSlug, {
        product_id: product.id,
        supplier_id: supplier.id,
        supplier_name: supplier.name,
        supplier_slug: supplierSlug,
        product_name: product.name,
        brand: product.brand,
        sku: product.sku,
        current_price: product.current_price,
        regular_price: product.regular_price,
        is_on_sale: product.is_on_sale || false,
        discount_percentage: product.discount_percentage,
        stock_status: product.stock_status || 'Check Stock',
        product_url: product.product_url,
        image_url: product.image_url,
        delivery: DELIVERY_DATA[supplierSlug] || DEFAULT_DELIVERY,
        is_recommended: false,
      });
    }
  }

  // Sort matches by price, mark cheapest as recommended
  const matches = Array.from(supplierBest.values()).sort(
    (a, b) => a.current_price - b.current_price
  );

  if (matches.length > 0) {
    matches[0].is_recommended = true;
  }

  return {
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    original_text: item.original_text,
    matches,
    best_price: matches.length > 0 ? matches[0].current_price : null,
    best_supplier: matches.length > 0 ? matches[0].supplier_name : null,
  };
}

/**
 * Build the optimised basket from comparison items
 */
function buildOptimisedBasket(items: ComparisonItem[]) {
  // For each item, pick cheapest supplier
  const supplierTotals = new Map<
    string,
    { slug: string; name: string; id: string; items: number; total: number }
  >();
  let optimisedTotal = 0;

  for (const item of items) {
    if (item.matches.length === 0) continue;

    const best = item.matches[0]; // Already sorted by price
    const lineTotal = best.current_price * item.quantity;
    optimisedTotal += lineTotal;

    const existing = supplierTotals.get(best.supplier_slug) || {
      slug: best.supplier_slug,
      name: best.supplier_name,
      id: best.supplier_id,
      items: 0,
      total: 0,
    };
    existing.items += 1;
    existing.total += lineTotal;
    supplierTotals.set(best.supplier_slug, existing);
  }

  // Calculate best single-supplier total
  // For each supplier that has at least one match, calculate what it would cost
  // to buy ALL items from that supplier (where available)
  const allSupplierSlugs = new Set<string>();
  for (const item of items) {
    for (const match of item.matches) {
      allSupplierSlugs.add(match.supplier_slug);
    }
  }

  let bestSingleTotal = Infinity;
  let bestSingleName = '';
  let bestSingleCoverage = 0;

  for (const slug of allSupplierSlugs) {
    let total = 0;
    let coverage = 0;

    for (const item of items) {
      const match = item.matches.find((m) => m.supplier_slug === slug);
      if (match) {
        total += match.current_price * item.quantity;
        coverage += 1;
      }
    }

    // Only consider suppliers that have at least 50% of items
    if (coverage >= items.length * 0.5 && total < bestSingleTotal) {
      bestSingleTotal = total;
      bestSingleName = items
        .flatMap((i) => i.matches)
        .find((m) => m.supplier_slug === slug)?.supplier_name || slug;
      bestSingleCoverage = coverage;
    }
  }

  // If no single supplier covers 50%, use the total of all items at their cheapest
  if (bestSingleTotal === Infinity) {
    bestSingleTotal = optimisedTotal;
    bestSingleName = 'Multiple suppliers';
  }

  const savings = Math.max(0, bestSingleTotal - optimisedTotal);
  const savingsPercentage =
    bestSingleTotal > 0 ? Math.round((savings / bestSingleTotal) * 1000) / 10 : 0;

  const supplierSplit: SupplierSummary[] = Array.from(supplierTotals.values())
    .sort((a, b) => b.total - a.total)
    .map((s) => ({
      supplier_id: s.id,
      supplier_name: s.name,
      supplier_slug: s.slug,
      item_count: s.items,
      total: Math.round(s.total * 100) / 100,
      delivery: DELIVERY_DATA[s.slug] || DEFAULT_DELIVERY,
    }));

  return {
    optimised_basket: {
      total: Math.round(optimisedTotal * 100) / 100,
      single_supplier_total: Math.round(bestSingleTotal * 100) / 100,
      single_supplier_name: bestSingleName,
      savings: Math.round(savings * 100) / 100,
      savings_percentage: savingsPercentage,
      supplier_split: supplierSplit,
    },
    suppliers: supplierSplit,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'compare-materials-prices' });

  try {
    // Auth check
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorisation' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorised' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => ({}));
    const { items } = body as { items?: InputItem[] };

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ValidationError('items array is required and must not be empty');
    }

    if (items.length > 50) {
      throw new ValidationError('Maximum 50 items per comparison');
    }

    logger.info('Starting price comparison', {
      userId: user.id,
      itemCount: items.length,
    });

    const openAiKey = Deno.env.get('OPENAI_API_KEY');

    // Process items in parallel batches of 5
    const BATCH_SIZE = 5;
    const comparisonItems: ComparisonItem[] = [];

    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      const results = await Promise.all(
        batch.map((item) => processItem(supabase, openAiKey, item))
      );
      comparisonItems.push(...results);
    }

    // Build optimised basket
    const { optimised_basket, suppliers } = buildOptimisedBasket(comparisonItems);

    const matchedCount = comparisonItems.filter((i) => i.matches.length > 0).length;

    logger.info('Price comparison complete', {
      userId: user.id,
      itemCount: items.length,
      matchedCount,
      optimisedTotal: optimised_basket.total,
      savings: optimised_basket.savings,
    });

    return new Response(
      JSON.stringify({
        comparison: {
          items: comparisonItems,
          optimised_basket,
          suppliers,
        },
        requestId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    logger.error('Failed to compare materials prices', { error });
    return handleError(error);
  }
});

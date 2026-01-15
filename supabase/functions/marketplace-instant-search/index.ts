import { serve, corsHeaders, createClient } from '../_shared/deps.ts';

/**
 * Marketplace Instant Search
 * Optimized for instant dropdown results - fast, lightweight response
 * Returns top 8 results as user types
 */

interface InstantSearchRequest {
  query: string;
  limit?: number;
}

interface InstantSearchResult {
  id: string;
  name: string;
  brand: string;
  category: string;
  current_price: number;
  regular_price: number;
  is_on_sale: boolean;
  discount_percentage: number;
  image_url: string;
  product_url: string;
  supplier_name: string;
  supplier_slug: string;
}

interface InstantSearchResponse {
  results: InstantSearchResult[];
  query: string;
  hasMore: boolean;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body: InstantSearchRequest = await req.json().catch(() => ({ query: '' }));
    const { query, limit = 8 } = body;

    // If query is too short, return empty
    if (!query || query.trim().length < 2) {
      return new Response(
        JSON.stringify({ results: [], query, hasMore: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchQuery = query.trim();

    // Fast search using text search with limited fields
    const { data: products, error, count } = await supabase
      .from('marketplace_products')
      .select(`
        id,
        name,
        brand,
        category,
        current_price,
        regular_price,
        is_on_sale,
        discount_percentage,
        image_url,
        product_url,
        marketplace_suppliers!inner(name, slug)
      `, { count: 'estimated' })
      .textSearch('search_vector', searchQuery, {
        type: 'websearch',
        config: 'english'
      })
      .order('is_on_sale', { ascending: false }) // Prioritize deals
      .limit(limit);

    if (error) {
      console.error('Instant search error:', error);
      throw new Error(`Search failed: ${error.message}`);
    }

    const results: InstantSearchResult[] = (products || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      current_price: p.current_price,
      regular_price: p.regular_price,
      is_on_sale: p.is_on_sale,
      discount_percentage: p.discount_percentage,
      image_url: p.image_url,
      product_url: p.product_url,
      supplier_name: p.marketplace_suppliers?.name ?? 'Unknown',
      supplier_slug: p.marketplace_suppliers?.slug ?? 'unknown',
    }));

    const response: InstantSearchResponse = {
      results,
      query: searchQuery,
      hasMore: (count ?? 0) > limit,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Instant search error:', error);
    return new Response(
      JSON.stringify({
        results: [],
        query: '',
        hasMore: false,
        error: error instanceof Error ? error.message : 'Search failed'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

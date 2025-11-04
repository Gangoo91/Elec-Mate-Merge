import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, handleError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'search-materials-fast' });

  try {
    const { query, categoryFilter, supplierFilter, limit = 30 } = await req.json();

    // Input validation
    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }
    if (limit < 1 || limit > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }

    logger.info('Fast search initiated', { query, categoryFilter, supplierFilter, limit });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse query into terms for multi-term matching
    const searchTerms = query.toLowerCase().trim().split(/\s+/).filter(t => t.length > 1);
    
    logger.debug('Search terms extracted', { searchTerms });

    // Build search query using PostgreSQL ILIKE for fuzzy matching
    let searchQuery = supabase
      .from('pricing_embeddings')
      .select('id, item_name, category, wholesaler, base_cost, in_stock, product_url, metadata');

    // Multi-term search: each term must appear somewhere in the item name
    if (searchTerms.length > 0) {
      // Build OR condition for each term appearing in item_name
      const orConditions = searchTerms.map(term => `item_name.ilike.%${term}%`).join(',');
      searchQuery = searchQuery.or(orConditions);
    }

    // Apply category filter if provided
    if (categoryFilter && categoryFilter !== 'all') {
      searchQuery = searchQuery.eq('category', categoryFilter);
    }

    // Apply supplier filter if provided
    if (supplierFilter && supplierFilter !== 'all') {
      searchQuery = searchQuery.eq('wholesaler', supplierFilter);
    }

    // Sort by item name and limit results
    searchQuery = searchQuery
      .order('item_name', { ascending: true })
      .limit(limit);

    const { data: results, error: searchError } = await logger.time(
      'PostgreSQL keyword search',
      async () => await searchQuery
    );

    if (searchError) {
      logger.error('Search failed', { error: searchError });
      throw new Error(`Database search failed: ${searchError.message}`);
    }

    // Transform results to match expected format
    const materials = (results || []).map((item: any) => ({
      id: item.id,
      name: item.item_name,
      category: item.category || 'Materials',
      price: typeof item.base_cost === 'number' 
        ? `£${item.base_cost.toFixed(2)}` 
        : '£0.00',
      supplier: item.wholesaler || 'Unknown',
      image: item.metadata?.image || '/placeholder.svg',
      stockStatus: item.in_stock ? 'In Stock' : 'Out of Stock',
      productUrl: item.product_url,
      highlights: item.metadata?.highlights || [],
      similarity: 0.8, // Fixed score for keyword matches
      // Include additional metadata
      brand: item.metadata?.brand,
      description: item.metadata?.description,
      specifications: item.metadata?.specifications,
    }));

    logger.info('Fast search completed successfully', { 
      materialsCount: materials.length,
      requestId 
    });

    return new Response(
      JSON.stringify({
        success: true,
        materials,
        query,
        resultsCount: materials.length,
        searchMethod: 'fast_keyword',
        filters: {
          category: categoryFilter,
          supplier: supplierFilter
        },
        requestId
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Fast search failed', { error });
    return handleError(error);
  }
});

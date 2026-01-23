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
    const { query, categoryFilter, supplierFilter, limit = 50, similarityThreshold = 0.2 } = await req.json();

    // Input validation
    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }
    if (limit < 1 || limit > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }

    logger.info('Fuzzy search initiated', { query, categoryFilter, supplierFilter, limit, similarityThreshold });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call the fuzzy search RPC function
    const { data: results, error: searchError } = await logger.time(
      'PostgreSQL fuzzy search',
      async () => await supabase.rpc('search_materials_fuzzy', {
        search_query: query.trim(),
        category_filter: categoryFilter && categoryFilter !== 'all' ? categoryFilter : null,
        supplier_filter: supplierFilter && supplierFilter !== 'all' ? supplierFilter : null,
        similarity_threshold: similarityThreshold,
        result_limit: limit
      })
    );

    if (searchError) {
      logger.error('Fuzzy search failed', { error: searchError });
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
      image: '/placeholder.svg',
      stockStatus: item.in_stock ? 'In Stock' : 'Out of Stock',
      productUrl: item.product_url,
      highlights: [],
      similarity: item.similarity_score,
      isFuzzyMatch: item.similarity_score < 0.8,
    }));

    // Get suggestions if no results found
    let suggestions: string[] = [];
    if (materials.length === 0) {
      // Try a more relaxed search to get suggestions
      const { data: suggestionResults } = await supabase.rpc('search_materials_fuzzy', {
        search_query: query.trim(),
        category_filter: null,
        supplier_filter: null,
        similarity_threshold: 0.1,
        result_limit: 5
      });

      if (suggestionResults && suggestionResults.length > 0) {
        suggestions = suggestionResults.map((item: any) => item.item_name);
      }
    }

    logger.info('Fuzzy search completed successfully', {
      materialsCount: materials.length,
      hasSuggestions: suggestions.length > 0,
      requestId
    });

    return new Response(
      JSON.stringify({
        success: true,
        materials,
        query,
        resultsCount: materials.length,
        searchMethod: 'fuzzy_trigram',
        suggestions,
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
    logger.error('Fuzzy search failed', { error });
    return handleError(error);
  }
});

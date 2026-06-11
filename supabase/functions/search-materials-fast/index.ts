import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { ValidationError, handleError } from '../_shared/errors.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { captureException } from '../_shared/sentry.ts';
import { searchMaterials } from '../_shared/marketplace-pricing.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'search-materials-fast' });

  try {
    const {
      query,
      categoryFilter,
      supplierFilter,
      limit = 50,
      similarityThreshold = 0.2,
    } = await req.json();

    // Input validation
    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }
    if (limit < 1 || limit > 100) {
      throw new ValidationError('Limit must be between 1 and 100');
    }

    logger.info('Fuzzy search initiated', {
      query,
      categoryFilter,
      supplierFilter,
      limit,
      similarityThreshold,
    });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Live pipeline + trade catalogue, in parallel.
    // Live prices go through the SAME tuned matcher as the AI cost engineer
    // (cost_engineer_match_product RPC via _shared/marketplace-pricing):
    // relevance-ranked, junk-name exclusion, cable boosts, category-aware
    // with broad fallback — so wizard prices always agree with AI prices.
    const liveCategory = categoryFilter && categoryFilter !== 'all' ? categoryFilter : null;
    const [liveHits, catalogueResult] = await logger.time(
      'live pipeline + catalogue search (parallel)',
      async () =>
        await Promise.all([
          searchMaterials(supabase, {
            query: query.trim(),
            category: liveCategory,
            limit: Math.min(16, limit),
          }).catch((err) => {
            logger.error('Live marketplace search failed', { error: err });
            return [];
          }),
          supabase.rpc('search_materials_fuzzy', {
            search_query: query.trim(),
            category_filter: liveCategory,
            supplier_filter: supplierFilter && supplierFilter !== 'all' ? supplierFilter : null,
            similarity_threshold: similarityThreshold,
            result_limit: limit,
          }),
        ])
    );

    const liveMaterials = (liveHits || []).map((hit: any) => ({
      id: hit.id,
      name: hit.name,
      category: hit.category || 'Materials',
      price: `£${(hit.unitPrice || 0).toFixed(2)}`,
      supplier: hit.supplier || hit.brand || 'Supplier',
      image: hit.imageUrl || '/placeholder.svg',
      stockStatus: hit.stockStatus || 'Unknown',
      productUrl: hit.productUrl,
      scrapedAt: hit.scrapedAt,
      isOnSale: !!hit.isOnSale,
      discountPercentage: hit.discountPercentage ? Number(hit.discountPercentage) : 0,
      regularPrice: hit.regularPrice ? Number(hit.regularPrice) : null,
      highlights: [],
      similarity: 1,
      isFuzzyMatch: false,
      source: 'live',
    }));

    const { data: results, error: searchError } = catalogueResult;
    if (searchError) {
      logger.error('Fuzzy search failed', { error: searchError });
      throw new Error(`Database search failed: ${searchError.message}`);
    }

    const catalogueMaterials = (results || []).map((item: any) => ({
      id: item.id,
      name: item.item_name,
      category: item.category || 'Materials',
      price: typeof item.base_cost === 'number' ? `£${item.base_cost.toFixed(2)}` : '£0.00',
      supplier: item.wholesaler || 'Unknown',
      image: '/placeholder.svg',
      stockStatus: item.in_stock ? 'In Stock' : 'Out of Stock',
      productUrl: item.product_url,
      highlights: [],
      similarity: item.similarity_score,
      isFuzzyMatch: item.similarity_score < 0.8,
      source: 'catalogue',
    }));

    // Live pipeline prices lead; catalogue backfills.
    const materials = [...liveMaterials, ...catalogueMaterials];

    // Get suggestions if no results found
    let suggestions: string[] = [];
    if (materials.length === 0) {
      // Try a more relaxed search to get suggestions
      const { data: suggestionResults } = await supabase.rpc('search_materials_fuzzy', {
        search_query: query.trim(),
        category_filter: null,
        supplier_filter: null,
        similarity_threshold: 0.1,
        result_limit: 5,
      });

      if (suggestionResults && suggestionResults.length > 0) {
        suggestions = suggestionResults.map((item: any) => item.item_name);
      }
    }

    logger.info('Fuzzy search completed successfully', {
      materialsCount: materials.length,
      hasSuggestions: suggestions.length > 0,
      requestId,
    });

    return new Response(
      JSON.stringify({
        success: true,
        materials,
        query,
        resultsCount: materials.length,
        searchMethod: 'live_pipeline+fuzzy_trigram',
        suggestions,
        filters: {
          category: categoryFilter,
          supplier: supplierFilter,
        },
        requestId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    await captureException(error, { functionName: 'search-materials-fast', requestUrl: req.url, requestMethod: req.method });
    logger.error('Fuzzy search failed', { error });
    return handleError(error);
  }
});

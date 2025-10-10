import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'search-pricing-rag' });

  try {
    const { query, categoryFilter, supplierFilter, matchThreshold = 0.6, matchCount = 50 } = await req.json();

    // Input validation
    if (!query || query.trim().length === 0) {
      throw new ValidationError('Search query is required');
    }
    if (matchThreshold < 0.1 || matchThreshold > 0.9) {
      throw new ValidationError('Match threshold must be between 0.1 and 0.9');
    }
    if (matchCount < 1 || matchCount > 100) {
      throw new ValidationError('Match count must be between 1 and 100');
    }

    logger.info('RAG Search initiated', { query, categoryFilter, supplierFilter, matchThreshold, matchCount });

    // Get embedding from OpenAI directly
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const embeddingData = await logger.time(
      'OpenAI embedding generation',
      async () => await withRetry(
        () => withTimeout(
          fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              input: query,
              model: 'text-embedding-3-small',
            }),
          }).then(async (res) => {
            if (!res.ok) {
              const errorText = await res.text();
              if (res.status === 429) throw new ExternalAPIError('OpenAI', 'Rate limit exceeded');
              if (res.status === 402) throw new ExternalAPIError('OpenAI', 'Payment required');
              throw new ExternalAPIError('OpenAI', `Status ${res.status}: ${errorText}`);
            }
            return res.json();
          }),
          Timeouts.STANDARD,
          'OpenAI embedding API'
        ),
        RetryPresets.STANDARD
      )
    );

    const queryVector = embeddingData.data[0].embedding;

    // Validate embedding dimensions
    if (queryVector.length !== 1536) {
      throw new ValidationError(`Invalid embedding dimensions: expected 1536, got ${queryVector.length}`);
    }

    logger.debug('Query embedding generated', { dimensions: queryVector.length });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build the query with optional filters
    let rpcQuery = supabase.rpc('search_pricing', {
      query_embedding: queryVector,
      category_filter: categoryFilter || null,
      match_threshold: matchThreshold,
      match_count: matchCount
    });

    const { data: results, error: searchError } = await logger.time(
      'Vector similarity search',
      async () => await withTimeout(
        rpcQuery,
        Timeouts.STANDARD,
        'Supabase vector search'
      )
    );

    if (searchError) {
      logger.error('Vector search failed', { error: searchError });
      throw searchError;
    }

    logger.info('Vector search completed', { resultsCount: results?.length || 0 });

    // Apply supplier filter if provided (client-side filtering)
    let filteredResults = results || [];
    if (supplierFilter && supplierFilter !== 'all') {
      filteredResults = filteredResults.filter(
        item => item.wholesaler?.toLowerCase() === supplierFilter.toLowerCase()
      );
      console.log('🏷️ Filtered to', filteredResults.length, 'products from', supplierFilter);
    }

    // Fallback to keyword search if no results
    if (filteredResults.length === 0) {
      logger.warn('No vector results found, trying keyword fallback');
      
      const { data: keywordResults, error: keywordError } = await supabase
        .from('pricing_embeddings')
        .select('*')
        .ilike('item_name', `%${query}%`)
        .limit(matchCount);

      if (!keywordError && keywordResults && keywordResults.length > 0) {
        logger.info('Keyword fallback successful', { resultsCount: keywordResults.length });
        filteredResults = keywordResults.map((item: any) => ({
          ...item,
          similarity: 0.5 // Mark as keyword match with lower confidence
        }));

        // Apply supplier filter to keyword results
        if (supplierFilter && supplierFilter !== 'all') {
          filteredResults = filteredResults.filter(
            item => item.wholesaler?.toLowerCase() === supplierFilter.toLowerCase()
          );
          logger.debug('Applied supplier filter to keyword results', { count: filteredResults.length, supplier: supplierFilter });
        }
      }
    }

    // Transform results to match expected format
    const materials = filteredResults.map((item: any) => ({
      id: item.id,
      name: item.item_name,
      category: item.category || 'Materials',
      price: typeof item.base_cost === 'number' 
        ? `£${item.base_cost.toFixed(2)}` 
        : item.price_per_unit || '£0.00',
      supplier: item.wholesaler || 'Unknown',
      image: item.metadata?.image || '/placeholder.svg',
      stockStatus: item.in_stock ? 'In Stock' : 'Out of Stock',
      productUrl: item.product_url,
      highlights: item.metadata?.highlights || [],
      similarity: item.similarity,
      // Include additional metadata
      brand: item.metadata?.brand,
      description: item.metadata?.description,
      specifications: item.metadata?.specifications,
    }));

    logger.info('RAG search completed successfully', { 
      materialsCount: materials.length,
      requestId 
    });

    return new Response(
      JSON.stringify({
        success: true,
        materials,
        query,
        resultsCount: materials.length,
        searchMethod: 'rag',
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
    logger.error('RAG search failed', { error });
    return handleError(error);
  }
});

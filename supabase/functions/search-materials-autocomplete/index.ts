import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, handleError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'search-materials-autocomplete' });

  try {
    const { query, limit = 8 } = await req.json();

    // Input validation - require at least 2 characters for autocomplete
    if (!query || query.trim().length < 2) {
      return new Response(
        JSON.stringify({
          success: true,
          suggestions: [],
          query: query || '',
          requestId
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      );
    }

    if (limit < 1 || limit > 20) {
      throw new ValidationError('Limit must be between 1 and 20');
    }

    logger.info('Autocomplete search initiated', { query, limit });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const searchTerm = query.trim().toLowerCase();

    // Use the fuzzy search function with a lower threshold for more suggestions
    const { data: results, error: searchError } = await logger.time(
      'Autocomplete fuzzy search',
      async () => await supabase.rpc('search_materials_fuzzy', {
        search_query: searchTerm,
        category_filter: null,
        supplier_filter: null,
        similarity_threshold: 0.15,
        result_limit: limit * 2 // Get extra to filter and dedupe
      })
    );

    if (searchError) {
      logger.error('Autocomplete search failed', { error: searchError });
      throw new Error(`Database search failed: ${searchError.message}`);
    }

    // Process results to create unique suggestions
    const seenNames = new Set<string>();
    const suggestions: Array<{ name: string; score: number; category: string }> = [];

    for (const item of results || []) {
      // Normalize the name for deduplication
      const normalizedName = item.item_name.toLowerCase().trim();

      if (!seenNames.has(normalizedName) && suggestions.length < limit) {
        seenNames.add(normalizedName);
        suggestions.push({
          name: item.item_name,
          score: item.similarity_score,
          category: item.category || 'Materials'
        });
      }
    }

    // Sort by score descending
    suggestions.sort((a, b) => b.score - a.score);

    logger.info('Autocomplete completed successfully', {
      suggestionsCount: suggestions.length,
      requestId
    });

    return new Response(
      JSON.stringify({
        success: true,
        suggestions,
        query,
        requestId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    logger.error('Autocomplete failed', { error });
    return handleError(error);
  }
});

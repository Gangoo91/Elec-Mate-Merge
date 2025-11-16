import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { validateRequired } from "../_shared/validation.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { ResponseCache } from "../_shared/response-cache.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'bs7671-rag-search' });

  try {
    const { query, matchThreshold = 0.4, matchCount = 8 } = await req.json();

    // Validate inputs
    validateRequired(query, 'query');
    
    if (matchThreshold < 0.1 || matchThreshold > 0.9) {
      throw new ValidationError('matchThreshold must be between 0.1 and 0.9');
    }
    
    if (matchCount < 1 || matchCount > 50) {
      throw new ValidationError('matchCount must be between 1 and 50');
    }

    logger.info('BS 7671 RAG Search initiated', { query, matchThreshold, matchCount });

    // Connect to Supabase early for direct lookup
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fast-path: Extract regulation numbers and try direct match first
    const extractRegulationNumbers = (query: string): string[] => {
      const regPattern = /\b(\d{3}(?:\.\d+){0,2})\b/g;
      const matches = query.match(regPattern) || [];
      return [...new Set(matches)];
    };

    const regNumbers = extractRegulationNumbers(query);
    if (regNumbers.length > 0) {
      logger.debug('Trying direct regulation lookup first', { regNumbers });
      
      const { data: directResults, error: directError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .or(regNumbers.map(n => `regulation_number.ilike.%${n}%`).join(','))
        .limit(matchCount);
      
      if (!directError && directResults && directResults.length > 0) {
        logger.info('✅ Direct lookup succeeded', { count: directResults.length });
        
        const regulations = directResults.map((item: any) => ({
          id: item.id,
          regulation_number: item.regulation_number,
          section: item.section,
          content: item.content,
          amendment: item.amendment,
          metadata: item.metadata || {},
          similarity: 0.95,
        }));
        
        return new Response(
          JSON.stringify({
            success: true,
            regulations,
            query,
            resultsCount: regulations.length,
            searchMethod: 'direct',
            requestId,
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // ⚡ REGULATIONS INTELLIGENCE: Direct keyword search (no embedding needed!)
    logger.debug('Searching regulations intelligence with hybrid keyword matching');
    
    const { data: intelligenceResults, error: searchError } = await logger.time(
      'Intelligence hybrid search',
      () => withTimeout(
        supabase.rpc('search_regulations_intelligence_hybrid', {
          query_text: query,
          match_count: matchCount
        }),
        Timeouts.STANDARD,
        'Regulations intelligence search'
      )
    );

    if (searchError) {
      logger.error('Intelligence search error', { error: searchError });
      throw searchError;
    }

    logger.info('Intelligence search completed', { resultsCount: intelligenceResults?.length || 0 });

    let searchMethod = 'intelligence_hybrid';
    
    // Intelligence results already include content from the database function's LEFT JOIN
    const enrichedResults = (intelligenceResults || []).map((intel: any) => ({
      id: intel.id,
      regulation_number: intel.regulation_number,
      section: intel.section || '',
      content: intel.content || intel.primary_topic,
      amendment: intel.amendment || '',
      metadata: {},
      similarity: intel.hybrid_score || 0.8,
      // Intelligence-specific enrichments
      primary_topic: intel.primary_topic,
      keywords: intel.keywords,
      category: intel.category,
      subcategory: intel.subcategory,
      applies_to: intel.applies_to,
      practical_application: intel.practical_application
    }));

    const regulations = enrichedResults;

    logger.info('Returning results', { 
      count: regulations.length, 
      searchMethod,
      requestId 
    });

    return new Response(
      JSON.stringify({
        success: true,
        regulations,
        query,
        resultsCount: regulations.length,
        searchMethod,
        requestId,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('BS 7671 RAG Search error', { error: error.message });
    return handleError(error);
  }
});

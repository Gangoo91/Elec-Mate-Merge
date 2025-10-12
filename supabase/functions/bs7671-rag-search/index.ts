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

    // ⚡ CHECK CACHE FIRST for instant responses
    const cache = new ResponseCache();
    const cached = await cache.get(query);
    
    if (cached && cached.confidence >= 0.7) {
      logger.info('✅ Cache hit in RAG search', { 
        hits: cached.hits,
        confidence: cached.confidence 
      });
      
      return new Response(
        JSON.stringify({
          success: true,
          regulations: JSON.parse(cached.citations),
          query,
          resultsCount: JSON.parse(cached.citations).length,
          searchMethod: 'cache',
          cached: true,
          requestId,
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Get embedding from OpenAI with retry and timeout
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    logger.debug('Generating embedding via OpenAI');
    
    const embeddingResponse = await logger.time(
      'OpenAI embedding generation',
      () => withRetry(
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
          }),
          Timeouts.STANDARD,
          'OpenAI embedding generation'
        ),
        RetryPresets.STANDARD
      )
    );

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      logger.error('Embedding API error', { status: embeddingResponse.status, error: errorText });
      
      if (embeddingResponse.status === 429) {
        throw new ExternalAPIError('OpenAI', { reason: 'Rate limit exceeded. Please try again in a moment.' });
      }
      if (embeddingResponse.status === 402) {
        throw new ExternalAPIError('OpenAI', { reason: 'Payment required. Please check your API credits.' });
      }
      throw new ExternalAPIError('OpenAI', { status: embeddingResponse.status, error: errorText });
    }

    const embeddingData = await embeddingResponse.json();
    const queryVector = embeddingData.data[0].embedding;

    // Validate embedding dimensions
    if (queryVector.length !== 1536) {
      logger.error('Invalid embedding dimensions', { dimensions: queryVector.length });
      throw new Error(`Expected 1536 dimensions, got ${queryVector.length}`);
    }

    logger.info('Query embedding generated', { dimensions: queryVector.length });

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Search using RPC function with timeout
    logger.debug('Executing vector similarity search');
    const { data: results, error: searchError } = await logger.time(
      'Vector search',
      () => withTimeout(
        supabase.rpc('search_bs7671', {
          query_embedding: queryVector,
          match_threshold: matchThreshold,
          match_count: matchCount
        }),
        Timeouts.STANDARD,
        'Vector search'
      )
    );

    if (searchError) {
      logger.error('Vector search error', { error: searchError });
      throw searchError;
    }

    logger.info('Vector search completed', { resultsCount: results?.length || 0 });

    let regulationsData = results || [];
    let searchMethod = 'vector';

    // Fallback to keyword search if no results
    if (regulationsData.length === 0) {
      logger.warn('No vector results found, trying keyword fallback search');
      
      const { data: keywordResults, error: keywordError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .or(`regulation_number.ilike.%${query}%,section.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(matchCount);

      if (!keywordError && keywordResults && keywordResults.length > 0) {
        logger.info('Keyword search found results', { count: keywordResults.length });
        regulationsData = keywordResults.map((item: any) => ({
          ...item,
          similarity: 0.5 // Mark as keyword match with lower confidence
        }));
        searchMethod = 'keyword';
      }
    }

    // Transform results to match expected format
    const regulations = regulationsData.map((item: any) => ({
      id: item.id,
      regulation_number: item.regulation_number,
      section: item.section,
      content: item.content,
      amendment: item.amendment,
      metadata: item.metadata || {},
      similarity: item.similarity,
    }));

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

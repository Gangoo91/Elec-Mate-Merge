import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { ValidationError, ExternalAPIError, handleError } from "../_shared/errors.ts";
import { validateRequired } from "../_shared/validation.ts";
import { withRetry, RetryPresets } from "../_shared/retry.ts";
import { withTimeout, Timeouts } from "../_shared/timeout.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";
import { safeAll } from "../_shared/safe-parallel.ts";

// Electrical term expansion for better RAG matching
const expandElectricalTerms = (query: string): string => {
  const expansions: Record<string, string[]> = {
    'rcd': ['residual current device', 'earth leakage', 'shock protection', '30mA'],
    'rcbo': ['residual current breaker', 'combined protection'],
    'mcb': ['miniature circuit breaker', 'overcurrent protection'],
    'bathroom': ['701', 'special locations', 'zones', 'water'],
    'shower': ['electric shower', 'instantaneous water heater'],
    'cooker': ['cooking appliance', 'diversity'],
    'zs': ['earth loop impedance', 'fault loop'],
    'ze': ['external earth fault loop impedance'],
    'r1+r2': ['continuity', 'cpc resistance'],
    'ev': ['electric vehicle', 'charging point', 'mode 3'],
    'bonding': ['supplementary bonding', 'main protective bonding'],
    'earthing': ['protective conductor', 'cpc', 'earth electrode'],
  };

  let expanded = query.toLowerCase();
  for (const [term, synonyms] of Object.entries(expansions)) {
    if (expanded.includes(term)) {
      expanded += ' ' + synonyms.join(' ');
    }
  }
  return expanded;
};

// Detect query intent for knowledge base routing
const detectIntent = (query: string): {
  queryType: string;
  knowledgeBases: string[];
} => {
  const lowerQuery = query.toLowerCase();
  const knowledgeBases: string[] = ['bs7671']; // Always search regulations
  
  let queryType = 'general';
  
  // Check for specific intents
  if (lowerQuery.match(/\b(install|installation|fitting|mount|fix|cable route|conduit|trunking)\b/)) {
    knowledgeBases.push('installation');
    queryType = 'installation';
  }
  
  if (lowerQuery.match(/\b(test|testing|measure|inspection|verify|commissioning|r1\+r2|zs|ze|insulation)\b/)) {
    knowledgeBases.push('testing');
    if (queryType === 'general') queryType = 'testing';
  }
  
  if (lowerQuery.match(/\b(design|calculate|sizing|cable size|rating|diversity|load|circuit|breaker size)\b/)) {
    knowledgeBases.push('design');
    if (queryType === 'general') queryType = 'design';
  }
  
  if (lowerQuery.match(/\b(safety|risk|hazard|ppe|permit|method statement|safe system)\b/)) {
    knowledgeBases.push('safety');
  }
  
  return { queryType, knowledgeBases };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'multi-source-rag-search' });

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

    logger.info('Multi-source RAG search initiated', { query, matchThreshold, matchCount });

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
          ...item,
          similarity: 0.95
        }));
        
        return new Response(
          JSON.stringify({
            success: true,
            queryType: 'general',
            searchMethod: 'direct',
            regulations,
            has_installation_content: false,
            has_testing_content: false,
            has_design_content: false,
            has_safety_content: false,
            installation_content: [],
            testing_content: [],
            design_content: [],
            safety_content: [],
            requestId,
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // Detect intent and expand query
    const { queryType, knowledgeBases } = detectIntent(query);
    const expandedQuery = expandElectricalTerms(query);
    
    logger.info('Intent detected', { queryType, knowledgeBases, expandedQuery });

    // Optimize: Only generate embedding if needed for non-BS7671 searches
    const needsEmbedding = knowledgeBases.some(kb => 
      kb !== 'bs7671' && ['installation', 'testing', 'design', 'safety'].includes(kb)
    );

    let queryVector: number[] | null = null;

    if (needsEmbedding) {
      // Get embedding from OpenAI with retry and timeout
      const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
      if (!OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not configured');
      }

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
                input: expandedQuery,
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
          throw new ExternalAPIError('OpenAI', { reason: 'Rate limit exceeded' });
        }
        if (embeddingResponse.status === 402) {
          throw new ExternalAPIError('OpenAI', { reason: 'Payment required' });
        }
        throw new ExternalAPIError('OpenAI', { status: embeddingResponse.status });
      }

      const embeddingData = await embeddingResponse.json();
      queryVector = embeddingData.data[0].embedding;
      logger.info('Query embedding generated');
    } else {
      logger.info('⚡ Skipping embedding generation - using intelligence search only');
    }

    // Build parallel search tasks with timeout protection
    const searchTasks = [
      {
        name: 'bs7671',
        execute: () => logger.time(
          'BS7671 intelligence search',
          () => withTimeout(
            supabase.rpc('search_regulations_intelligence_hybrid', {
              query_text: expandedQuery,
              match_count: matchCount
            }),
            Timeouts.STANDARD,
            'BS7671 intelligence search'
          )
        )
      }
    ];

    // Add knowledge base searches based on intent (only if embedding was generated)
    if (queryVector && knowledgeBases.includes('installation')) {
      searchTasks.push({
        name: 'installation',
        execute: () => logger.time(
          'Installation search',
          () => withTimeout(
            supabase.rpc('search_installation_knowledge', {
              query_embedding: queryVector,
              match_threshold: matchThreshold,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'Installation search'
          )
        )
      });
    }

    if (queryVector && knowledgeBases.includes('testing')) {
      searchTasks.push({
        name: 'testing',
        execute: () => logger.time(
          'Testing search',
          () => withTimeout(
            supabase.rpc('search_inspection_testing', {
              query_embedding: queryVector,
              match_threshold: matchThreshold,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'Testing search'
          )
        )
      });
    }

    if (queryVector && knowledgeBases.includes('design')) {
      searchTasks.push({
        name: 'design',
        execute: () => logger.time(
          'Design search',
          () => withTimeout(
            supabase.rpc('search_design_knowledge', {
              query_embedding: queryVector,
              match_threshold: matchThreshold,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'Design search'
          )
        )
      });
    }

    if (queryVector && knowledgeBases.includes('safety')) {
      searchTasks.push({
        name: 'safety',
        execute: () => logger.time(
          'Safety search',
          () => withTimeout(
            supabase.rpc('search_health_safety', {
              query_embedding: queryVector,
              match_threshold: matchThreshold,
              match_count: 5
            }),
            Timeouts.STANDARD,
            'Safety search'
          )
        )
      });
    }

    // Execute all searches in parallel with safe error handling
    const { successes, failures } = await safeAll(searchTasks);

    // Log failures but continue with successes
    if (failures.length > 0) {
      logger.warn('Some knowledge base searches failed', { 
        failures: failures.map(f => ({ name: f.name, error: f.error }))
      });
    }

    // Process results
    let regulations: any[] = [];
    let installationContent: any[] = [];
    let testingContent: any[] = [];
    let designContent: any[] = [];
    let safetyContent: any[] = [];
    let searchMethod = 'intelligence';
    let enrichedFacets = false;
    let facetCategories: string[] = [];

    for (const success of successes) {
      const result = success.result;
      
      if (result.error) {
        logger.error(`Error in ${success.name} results`, { error: result.error });
        continue;
      }

      const data = result.data || [];
      
      if (success.name === 'bs7671') {
        regulations = data;
        
        // Check for enriched facets
        if (regulations.length > 0 && regulations[0].primary_topic) {
          enrichedFacets = true;
          facetCategories = [...new Set(regulations.map((r: any) => r.category).filter(Boolean))];
        }
      } else if (success.name === 'installation') {
        installationContent = data;
      } else if (success.name === 'testing') {
        testingContent = data;
      } else if (success.name === 'design') {
        designContent = data;
      } else if (success.name === 'safety') {
        safetyContent = data;
      }
    }

    // Fallback: If no regulations found, try keyword search
    if (regulations.length === 0) {
      logger.warn('No vector results, trying keyword search');
      
      const { data: keywordResults, error: keywordError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .or(`regulation_number.ilike.%${query}%,section.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(matchCount);

      if (!keywordError && keywordResults && keywordResults.length > 0) {
        logger.info('Keyword search found results', { count: keywordResults.length });
        regulations = keywordResults.map((item: any) => ({
          ...item,
          similarity: 0.5
        }));
        searchMethod = 'keyword';
      }
    }

    logger.info('Results collected', {
      regulations: regulations.length,
      installation: installationContent.length,
      testing: testingContent.length,
      design: designContent.length,
      safety: safetyContent.length,
      failedSearches: failures.length,
      requestId
    });

    return new Response(
      JSON.stringify({
        success: true,
        queryType,
        searchMethod,
        enriched_facets: enrichedFacets,
        facet_categories: facetCategories,
        regulations: regulations.slice(0, matchCount),
        has_installation_content: installationContent.length > 0,
        has_testing_content: testingContent.length > 0,
        has_design_content: designContent.length > 0,
        has_safety_content: safetyContent.length > 0,
        installation_content: installationContent,
        testing_content: testingContent,
        design_content: designContent,
        safety_content: safetyContent,
        requestId,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Multi-source RAG search error', { error: error.message });
    return handleError(error);
  }
});

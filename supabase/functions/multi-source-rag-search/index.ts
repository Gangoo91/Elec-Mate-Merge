import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

  try {
    const { query, matchThreshold = 0.4, matchCount = 8 } = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔍 Multi-source RAG search:', { query, matchThreshold, matchCount });

    // Detect intent and expand query
    const { queryType, knowledgeBases } = detectIntent(query);
    const expandedQuery = expandElectricalTerms(query);
    
    console.log('🎯 Intent detected:', { queryType, knowledgeBases });
    console.log('📝 Expanded query:', expandedQuery);

    // Get embedding from OpenAI
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: expandedQuery,
        model: 'text-embedding-3-small',
      }),
    });

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      console.error('❌ Embedding API error:', embeddingResponse.status, errorText);
      throw new Error(`Failed to generate embedding: ${embeddingResponse.status}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryVector = embeddingData.data[0].embedding;

    console.log('✅ Query embedding generated');

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Search all relevant knowledge bases in parallel
    const searches = [];

    // Always search BS 7671 regulations (limit to 5-8 most relevant)
    searches.push(
      supabase.rpc('search_bs7671', {
        query_embedding: queryVector,
        match_threshold: matchThreshold,
        match_count: matchCount
      }).then(result => ({ type: 'regulations', ...result }))
    );

    // Search additional knowledge bases based on intent
    if (knowledgeBases.includes('installation')) {
      searches.push(
        supabase.rpc('search_installation_knowledge', {
          query_embedding: queryVector,
          match_threshold: matchThreshold,
          match_count: 5
        }).then(result => ({ type: 'installation', ...result }))
      );
    }

    if (knowledgeBases.includes('testing')) {
      searches.push(
        supabase.rpc('search_inspection_testing', {
          query_embedding: queryVector,
          match_threshold: matchThreshold,
          match_count: 5
        }).then(result => ({ type: 'testing', ...result }))
      );
    }

    if (knowledgeBases.includes('design')) {
      searches.push(
        supabase.rpc('search_design_knowledge', {
          query_embedding: queryVector,
          match_threshold: matchThreshold,
          match_count: 5
        }).then(result => ({ type: 'design', ...result }))
      );
    }

    if (knowledgeBases.includes('safety')) {
      searches.push(
        supabase.rpc('search_health_safety', {
          query_embedding: queryVector,
          match_threshold: matchThreshold,
          match_count: 5
        }).then(result => ({ type: 'safety', ...result }))
      );
    }

    // Execute all searches in parallel
    const results = await Promise.all(searches);

    // Process results
    let regulations: any[] = [];
    let installationContent: any[] = [];
    let testingContent: any[] = [];
    let designContent: any[] = [];
    let safetyContent: any[] = [];
    let searchMethod = 'vector';

    for (const result of results) {
      if (result.error) {
        console.error(`❌ Error searching ${result.type}:`, result.error);
        continue;
      }

      if (result.type === 'regulations') {
        regulations = result.data || [];
      } else if (result.type === 'installation') {
        installationContent = result.data || [];
      } else if (result.type === 'testing') {
        testingContent = result.data || [];
      } else if (result.type === 'design') {
        designContent = result.data || [];
      } else if (result.type === 'safety') {
        safetyContent = result.data || [];
      }
    }

    // Fallback: If no regulations found, try keyword search
    if (regulations.length === 0) {
      console.log('⚠️ No vector results, trying keyword search...');
      
      const { data: keywordResults, error: keywordError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .or(`regulation_number.ilike.%${query}%,section.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(matchCount);

      if (!keywordError && keywordResults && keywordResults.length > 0) {
        console.log('✅ Keyword search found', keywordResults.length, 'regulations');
        regulations = keywordResults.map((item: any) => ({
          ...item,
          similarity: 0.5
        }));
        searchMethod = 'keyword';
      }
    }

    console.log('📦 Results:', {
      regulations: regulations.length,
      installation: installationContent.length,
      testing: testingContent.length,
      design: designContent.length,
      safety: safetyContent.length
    });

    return new Response(
      JSON.stringify({
        success: true,
        queryType,
        searchMethod,
        regulations: regulations.slice(0, matchCount),
        has_installation_content: installationContent.length > 0,
        has_testing_content: testingContent.length > 0,
        has_design_content: designContent.length > 0,
        has_safety_content: safetyContent.length > 0,
        installation_content: installationContent,
        testing_content: testingContent,
        design_content: designContent,
        safety_content: safetyContent,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Multi-source RAG search error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to perform multi-source RAG search',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

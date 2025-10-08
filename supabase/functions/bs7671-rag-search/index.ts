import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// BS 7671 RAG Search using OpenAI embeddings
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, matchThreshold = 0.6, matchCount = 10 } = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔍 BS 7671 RAG Search initiated:', { query, matchThreshold, matchCount });

    // Get embedding from OpenAI
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    console.log('📡 Generating embedding via OpenAI...');
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: query,
        model: 'text-embedding-3-small',
      }),
    });

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      console.error('❌ Embedding API error:', embeddingResponse.status, errorText);
      
      if (embeddingResponse.status === 429) {
        throw new Error('OpenAI rate limit exceeded. Please try again in a moment.');
      }
      if (embeddingResponse.status === 402) {
        throw new Error('OpenAI payment required. Please check your API credits.');
      }
      throw new Error(`Failed to generate embedding: ${embeddingResponse.status}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryVector = embeddingData.data[0].embedding;

    // Validate embedding dimensions
    if (queryVector.length !== 1536) {
      console.error('❌ Invalid embedding dimensions:', queryVector.length);
      throw new Error(`Expected 1536 dimensions, got ${queryVector.length}`);
    }

    console.log('✅ Query embedding generated:', queryVector.length, 'dimensions');

    // Connect to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Search using RPC function
    console.log('🔎 Executing vector similarity search...');
    const { data: results, error: searchError } = await supabase.rpc('search_bs7671', {
      query_embedding: queryVector,
      match_threshold: matchThreshold,
      match_count: matchCount
    });

    if (searchError) {
      console.error('❌ Vector search error:', searchError);
      throw searchError;
    }

    console.log('✅ Found', results?.length || 0, 'matching regulations');

    let regulationsData = results || [];
    let searchMethod = 'vector';

    // Fallback to keyword search if no results
    if (regulationsData.length === 0) {
      console.log('⚠️ No vector results found, trying keyword fallback search...');
      
      const { data: keywordResults, error: keywordError } = await supabase
        .from('bs7671_embeddings')
        .select('*')
        .or(`regulation_number.ilike.%${query}%,section.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(matchCount);

      if (!keywordError && keywordResults && keywordResults.length > 0) {
        console.log('✅ Keyword search found', keywordResults.length, 'regulations');
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

    console.log('📦 Returning', regulations.length, 'regulations');

    return new Response(
      JSON.stringify({
        success: true,
        regulations,
        query,
        resultsCount: regulations.length,
        searchMethod,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ BS 7671 RAG Search error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to perform BS 7671 RAG search',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
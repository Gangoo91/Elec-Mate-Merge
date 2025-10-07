import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { pipeline } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.1.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, categoryFilter, supplierFilter, matchThreshold = 0.7, matchCount = 50 } = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔍 RAG Search initiated:', { query, categoryFilter, supplierFilter, matchThreshold, matchCount });

    // Initialize embedding model
    const embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );

    // Generate query embedding
    const queryEmbedding = await embeddingPipeline(query, {
      pooling: 'mean',
      normalize: true,
    });
    const queryVector = Array.from(queryEmbedding.data);

    console.log('✅ Query embedding generated:', queryVector.length, 'dimensions');

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

    console.log('🔎 Executing vector similarity search...');
    const { data: results, error: searchError } = await rpcQuery;

    if (searchError) {
      console.error('❌ Vector search error:', searchError);
      throw searchError;
    }

    console.log('✅ Found', results?.length || 0, 'matching products');

    // Apply supplier filter if provided (client-side filtering)
    let filteredResults = results || [];
    if (supplierFilter && supplierFilter !== 'all') {
      filteredResults = filteredResults.filter(
        item => item.wholesaler?.toLowerCase() === supplierFilter.toLowerCase()
      );
      console.log('🏷️ Filtered to', filteredResults.length, 'products from', supplierFilter);
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

    console.log('📦 Returning', materials.length, 'products');

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
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ RAG Search error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to perform RAG search',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

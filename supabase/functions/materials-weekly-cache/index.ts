import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  console.log('🔍 Checking materials weekly cache...');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    });

    const { forceRefresh } = await req.json().catch(() => ({ forceRefresh: false }));

    // Check for existing valid cache
    if (!forceRefresh) {
      const { data: existingCache, error: cacheError } = await supabase
        .from('materials_weekly_cache')
        .select('*')
        .eq('cache_key', 'comprehensive')
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1);

      if (cacheError) {
        console.error('❌ Error checking cache:', cacheError);
      } else if (existingCache && existingCache.length > 0) {
        const cache = existingCache[0];
        console.log('✅ Serving from valid cache:', {
          materials: cache.total_materials,
          categories: cache.categories?.length || 0,
          age: Math.round((Date.now() - new Date(cache.created_at).getTime()) / (1000 * 60 * 60)) + ' hours'
        });

        return new Response(
          JSON.stringify({
            processedData: [], // Frontend will process from raw data
            rawMaterials: cache.scraper_response,
            fromCache: true,
            totalMaterials: cache.total_materials,
            lastUpdated: cache.created_at,
            categories: cache.categories,
            suppliers: cache.suppliers
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // Try to get fresh data from scraper with fallback to existing cache
    console.log('🔄 Fetching fresh data from scraper...');
    let scraperData;
    
    try {
      const { data, error: scraperError } = await supabase.functions.invoke('comprehensive-materials-scraper');
      
      if (scraperError) {
        console.error('Live scraper error:', scraperError);
        throw new Error(`Live scraper failed: ${scraperError.message}`);
      }
      
      scraperData = data;
    } catch (error) {
      console.error('Scraper invocation failed:', error);
      
      // Try to use existing cache data (even if expired) as fallback
      const { data: fallbackCache } = await supabase
        .from('materials_weekly_cache')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (fallbackCache && fallbackCache.length > 0) {
        console.log('📋 Using fallback cache data due to scraper failure');
        const cacheEntry = fallbackCache[0];
        return new Response(
          JSON.stringify({
            processedData: [],
            rawMaterials: cacheEntry.scraper_response || [],
            fromCache: true,
            fromFallback: true,
            totalMaterials: cacheEntry.total_materials || 0,
            lastUpdated: cacheEntry.last_updated,
            categories: cacheEntry.categories || [],
            suppliers: cacheEntry.suppliers || [],
            cacheExpiry: cacheEntry.expires_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // If no fallback available, return minimal default data
      console.log('⚠️ No cache available, returning minimal default data');
      return new Response(
        JSON.stringify({
          processedData: [],
          rawMaterials: [],
          fromCache: false,
          fromFallback: true,
          totalMaterials: 0,
          lastUpdated: new Date().toISOString(),
          categories: ['Cables & Wiring', 'Electrical Components', 'Protection Equipment', 'Installation Accessories', 'Lighting Solutions', 'Electrical Tools'],
          suppliers: ['Screwfix', 'Toolstation', 'RS Components', 'CEF - City Electrical Factors'],
          error: 'Unable to fetch fresh data - please try again later'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!Array.isArray(scraperData) || scraperData.length === 0) {
      console.log('📊 No materials data received from scraper');
      return new Response(
        JSON.stringify({
          processedData: [],
          rawMaterials: [],
          fromCache: false,
          totalMaterials: 0,
          lastUpdated: new Date().toISOString()
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    console.log(`📊 Serving ${scraperData.length} materials from live scraper`);

    // Extract categories and suppliers for quick queries
    const categories = [...new Set(scraperData.map(item => item.category).filter(Boolean))];
    const suppliers = [...new Set(scraperData.map(item => item.supplier).filter(Boolean))];

    // Store in cache with simplified structure
    console.log('💾 Storing fresh data in cache...');
    const { error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert({
        scraper_response: scraperData,
        total_materials: scraperData.length,
        categories: categories,
        suppliers: suppliers,
        cache_key: 'comprehensive',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      });

    if (insertError) {
      console.error('❌ Failed to store cache:', insertError);
    } else {
      console.log('✅ Cache stored successfully');
    }

    // Return the response
    console.log(`✅ Response ready: ${categories.length} categories, ${scraperData.length} materials total`);
    
    return new Response(
      JSON.stringify({
        processedData: [], // Frontend will process from raw data
        rawMaterials: scraperData,
        fromCache: false,
        totalMaterials: scraperData.length,
        lastUpdated: new Date().toISOString(),
        categories: categories,
        suppliers: suppliers
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('❌ Error in materials-weekly-cache:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        processedData: [],
        rawMaterials: [],
        fromCache: false,
        totalMaterials: 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 Materials Cache Updater - Starting weekly cache refresh...');
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body for trigger info
    let triggerInfo: any = {};
    try {
      const body = await req.text();
      if (body) {
        triggerInfo = JSON.parse(body);
      }
    } catch (e) {
      console.log('No trigger info provided');
    }

    const triggeredBy = triggerInfo.triggered_by || 'manual';
    console.log(`📋 Cache update triggered by: ${triggeredBy}`);

    // Start comprehensive materials scraping
    console.log('🕷️ Starting comprehensive materials scraping...');
    const startTime = Date.now();

    const { data: scrapedData, error: scrapeError } = await supabase.functions.invoke('comprehensive-materials-scraper', {
      body: { 
        cache_update: true,
        triggered_by: triggeredBy,
        timestamp: new Date().toISOString()
      }
    });

    if (scrapeError) {
      console.error('❌ Error during comprehensive scraping:', scrapeError);
      throw scrapeError;
    }

    if (!scrapedData?.materials || !Array.isArray(scrapedData.materials)) {
      throw new Error('No valid materials data received from scraper');
    }

    const materialsCount = scrapedData.materials.length;
    const executionTime = Date.now() - startTime;
    
    console.log(`✅ Scraping completed: ${materialsCount} materials in ${executionTime}ms`);

    // Deactivate previous cache entries
    console.log('🗑️ Deactivating previous cache entries...');
    const { error: deactivateError } = await supabase
      .from('materials_weekly_cache')
      .update({ is_active: false })
      .eq('is_active', true);

    if (deactivateError) {
      console.error('❌ Error deactivating previous cache:', deactivateError);
      // Continue anyway - we can still insert the new cache
    }

    // Insert new cache entry
    console.log('💾 Inserting new cache entry...');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Expires in 7 days

    const { data: insertData, error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert({
        materials_data: scrapedData.materials,
        source: 'comprehensive-materials-scraper',
        expires_at: expiresAt.toISOString(),
        is_active: true,
        last_updated: new Date().toISOString(),
        materials_count: materialsCount,
        execution_time_ms: executionTime,
        triggered_by: triggeredBy,
        scraper_version: scrapedData.version || '1.0',
        suppliers_scraped: scrapedData.suppliers_scraped || [],
        categories_updated: scrapedData.categories || []
      })
      .select()
      .single();

    if (insertError) {
      console.error('❌ Error inserting cache entry:', insertError);
      throw insertError;
    }

    console.log(`✅ Cache update completed successfully!`);
    console.log(`📊 Cache statistics:`);
    console.log(`   - Materials cached: ${materialsCount}`);
    console.log(`   - Execution time: ${executionTime}ms`);
    console.log(`   - Cache ID: ${insertData.id}`);
    console.log(`   - Expires at: ${expiresAt.toISOString()}`);
    console.log(`   - Triggered by: ${triggeredBy}`);

    // Update cache metadata
    const cacheStats = {
      materials_count: materialsCount,
      execution_time_ms: executionTime,
      suppliers_scraped: scrapedData.suppliers_scraped || [],
      categories_updated: scrapedData.categories || [],
      cache_size_mb: JSON.stringify(scrapedData.materials).length / (1024 * 1024),
      last_successful_update: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Materials cache updated successfully',
      cache_id: insertData.id,
      materials_count: materialsCount,
      execution_time_ms: executionTime,
      expires_at: expiresAt.toISOString(),
      triggered_by: triggeredBy,
      stats: cacheStats,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Materials Cache Updater Error:', error);
    
    // Log the error for monitoring
    const errorDetails = {
      error_message: error.message || 'Unknown error',
      error_type: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      function: 'materials-cache-updater'
    };

    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Unknown error occurred during cache update',
      details: errorDetails,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
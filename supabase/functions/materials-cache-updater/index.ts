import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Materials Cache Updater function invoked');
    
    // Create Supabase client for internal operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache was recently updated (within last 6 days)
    const { data: existingCache, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('created_at, expires_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!cacheError && existingCache) {
      const cacheAge = Date.now() - new Date(existingCache.created_at).getTime();
      const sixDaysInMs = 6 * 24 * 60 * 60 * 1000; // 6 days
      
      if (cacheAge < sixDaysInMs) {
        console.log('⏰ Cache is still fresh, skipping update');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Cache is still fresh',
            cacheAge: Math.floor(cacheAge / (24 * 60 * 60 * 1000)),
            nextUpdateDue: existingCache.expires_at
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    console.log('🔄 Updating materials cache with fresh data...');

    // Clear old cache entries first
    const { error: deleteError } = await supabase
      .from('materials_weekly_cache')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (deleteError) {
      console.error('⚠️ Error clearing old cache:', deleteError);
    } else {
      console.log('🗑️ Cleared old cache entries');
    }

    // Call the comprehensive materials scraper
    console.log('📞 Calling comprehensive-materials-scraper...');
    const { data: scrapedData, error: scraperError } = await supabase.functions.invoke(
      'comprehensive-materials-scraper',
      { body: {} }
    );

    if (scraperError) {
      console.error('❌ Error calling scraper:', scraperError);
      throw new Error(`Scraper error: ${scraperError.message}`);
    }

    if (!scrapedData || !Array.isArray(scrapedData) || scrapedData.length === 0) {
      console.error('❌ Scraper returned no data');
      throw new Error('No data returned from scraper');
    }

    console.log(`📊 Got ${scrapedData.length} materials from scraper`);

    // Group materials by category for storage
    const categoryData: Record<string, any[]> = {};
    scrapedData.forEach((material: any) => {
      const category = material.category?.toLowerCase() || 'other';
      if (!categoryData[category]) {
        categoryData[category] = [];
      }
      categoryData[category].push(material);
    });

    // Store data in cache with 7-day expiry
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const cacheEntries = Object.entries(categoryData).map(([category, materials]) => ({
      category,
      materials_data: materials,
      total_products: materials.length,
      expires_at: expiresAt.toISOString(),
      update_status: 'completed'
    }));

    // Insert new cache entries
    const { error: insertError } = await supabase
      .from('materials_weekly_cache')
      .insert(cacheEntries);

    if (insertError) {
      console.error('❌ Error storing cache data:', insertError);
      throw new Error(`Cache storage error: ${insertError.message}`);
    }

    console.log(`✅ Successfully cached ${cacheEntries.length} categories with ${scrapedData.length} total materials`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Cache updated with ${scrapedData.length} materials across ${cacheEntries.length} categories`,
        categoriesUpdated: Object.keys(categoryData),
        totalMaterials: scrapedData.length,
        expiresAt: expiresAt.toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Error in materials-cache-updater:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to update materials cache', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
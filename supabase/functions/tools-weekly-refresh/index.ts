import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔄 Tools Weekly Refresh started');
    
    // Parse request body to check for force refresh
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const forceRefresh = body.forceRefresh === true;
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache needs refresh (expired or doesn't exist)
    console.log('📊 Checking cache status...');
    
    const { data: existingCache, error: cacheError } = await supabase
      .from('materials_weekly_cache')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (cacheError && cacheError.code !== 'PGRST116') {
      console.error('❌ Error checking cache:', cacheError);
      throw cacheError;
    }

    const now = new Date();
    const needsRefresh = forceRefresh || !existingCache || 
      !existingCache.expires_at || 
      new Date(existingCache.expires_at) <= now;

    if (!needsRefresh) {
      const expiresAt = new Date(existingCache.expires_at);
      console.log(`✅ Cache is still fresh, expires at: ${expiresAt.toISOString()}`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Cache is still fresh, no refresh needed',
          expiresAt: expiresAt.toISOString(),
          toolsCount: existingCache.materials_data?.length || 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (forceRefresh) {
      console.log('🔄 Force refresh requested, bypassing cache expiry checks...');
    }

    console.log('🔄 Cache expired or missing, triggering refresh...');

    // Call the optimized tools scraper
    console.log('🔄 Invoking optimized-tools-scraper...');
    const { data: refreshResult, error: refreshError } = await supabase.functions.invoke(
      'optimized-tools-scraper',
      { body: {} }
    );
    
    console.log('📊 Scraper result:', refreshResult);
    console.log('⚠️ Scraper error:', refreshError);

    if (refreshError) {
      console.error('❌ Error calling comprehensive-tools-scraper:', refreshError);
      throw refreshError;
    }

    console.log('✅ Tools refresh completed:', refreshResult);

    // Clean up old cache entries (keep only the latest 3)
    console.log('🧹 Cleaning up old cache entries...');
    
    const { data: allCacheEntries } = await supabase
      .from('materials_weekly_cache')
      .select('id, created_at')
      .order('created_at', { ascending: false });

    if (allCacheEntries && allCacheEntries.length > 3) {
      const entriesToDelete = allCacheEntries.slice(3);
      const idsToDelete = entriesToDelete.map(entry => entry.id);
      
      const { error: deleteError } = await supabase
        .from('materials_weekly_cache')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('⚠️ Error cleaning up old cache entries:', deleteError);
      } else {
        console.log(`🗑️ Cleaned up ${entriesToDelete.length} old cache entries`);
      }
    }

    const responseData = {
      success: true,
      message: 'Tools weekly refresh completed successfully',
      refreshedAt: now.toISOString(),
      ...refreshResult
    };

    console.log('🎉 Tools weekly refresh completed successfully');

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Error in tools-weekly-refresh:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Failed to refresh tools cache', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

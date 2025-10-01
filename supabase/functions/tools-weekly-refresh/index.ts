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
      .from('tools_weekly_cache')
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
          toolsCount: existingCache.tools_data?.length || 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (forceRefresh) {
      console.log('🔄 Force refresh requested - deleting existing cache to guarantee fresh data...');
      
      // Delete all existing cache entries when force refresh is requested
      const { error: deleteError } = await supabase
        .from('tools_weekly_cache')
        .delete()
        .not('id', 'is', null); // Delete all rows where id is not null
        
      if (deleteError) {
        console.error('⚠️ Error deleting cache for force refresh:', deleteError);
      } else {
        console.log('✅ Existing cache cleared for force refresh');
      }
    }

    console.log('🔄 Cache expired or missing, triggering refresh...');

    // Call the comprehensive firecrawl scraper with extended timeout
    console.log('🔄 Invoking comprehensive-firecrawl-scraper with 60s timeout...');
    
    const scraperPromise = supabase.functions.invoke(
      'comprehensive-firecrawl-scraper',
      { body: { forceRefresh } }
    );

    // Set a 60-second timeout for the scraper call (increased from 40s)
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Scraper timeout after 60 seconds')), 60000);
    });

    let refreshResult, refreshError;
    
    try {
      const result = await Promise.race([scraperPromise, timeoutPromise]);
      refreshResult = (result as any).data;
      refreshError = (result as any).error;
    } catch (timeoutError) {
      console.warn('⏱️ Scraper timed out');
      refreshError = timeoutError;
    }
    
    console.log('📊 Scraper result:', refreshResult);
    console.log('⚠️ Scraper error:', refreshError);

    if (refreshError) {
      console.error('❌ Error calling comprehensive-firecrawl-scraper:', refreshError);
      
      // IMPORTANT: If force refresh is requested, we MUST NOT return cached data
      if (forceRefresh) {
        console.error('🚫 Force refresh failed - cannot return cached data');
        throw new Error('Force refresh failed: Unable to fetch fresh data. Please try again.');
      }
      
      // Only use existing cache if NOT a force refresh
      if (existingCache && existingCache.tools_data) {
        console.log('✅ Using existing cached data due to scraper error (not a force refresh)');
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Using cached data - refresh failed but existing data is available',
            tools: existingCache.tools_data,
            totalFound: existingCache.tools_data.length,
            cached: true,
            cacheAge: Math.floor((now.getTime() - new Date(existingCache.created_at).getTime()) / 1000 / 60 / 60) + ' hours'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw refreshError;
    }

    // Store the scraped data in tools_weekly_cache
    if (refreshResult && refreshResult.tools && Array.isArray(refreshResult.tools)) {
      console.log(`📊 Storing ${refreshResult.tools.length} tools in cache...`);
      
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      
      const { error: storeError } = await supabase
        .from('tools_weekly_cache')
        .insert({
          tools_data: refreshResult.tools,
          total_products: refreshResult.totalFound || refreshResult.tools.length,
          category: 'weekly_refresh',
          expires_at: expiresAt.toISOString(),
          created_at: now.toISOString(),
          update_status: 'completed'
        });
      
      if (storeError) {
        console.error('❌ Error storing tools data:', storeError);
      } else {
        console.log('✅ Tools data stored in cache successfully');
      }
    }

    console.log('✅ Tools refresh completed:', refreshResult);

    // Clean up old cache entries (keep only the latest 3)
    console.log('🧹 Cleaning up old cache entries...');
    
    const { data: allCacheEntries } = await supabase
      .from('tools_weekly_cache')
      .select('id, created_at')
      .order('created_at', { ascending: false });

    if (allCacheEntries && allCacheEntries.length > 3) {
      const entriesToDelete = allCacheEntries.slice(3);
      const idsToDelete = entriesToDelete.map(entry => entry.id);
      
      const { error: deleteError } = await supabase
        .from('tools_weekly_cache')
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
        details: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

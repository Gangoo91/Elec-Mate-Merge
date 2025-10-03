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

    // NOTE: We'll delete cache AFTER successful scraping to avoid data loss

    console.log('🔄 Cache expired or missing, triggering refresh...');

    // First, trigger all 3 batch scrapes in parallel with timeout protection
    console.log('🔄 Starting batch scrapes for batches 1, 2, and 3...');
    
    const BATCH_TIMEOUT_MS = 120000; // 2 minutes per batch
    
    const createTimeoutPromise = (ms: number) => 
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Batch scrape timeout')), ms)
      );
    
    const batchPromises = [
      Promise.allSettled([
        supabase.functions.invoke('comprehensive-firecrawl-scraper', { 
          body: { batch: 1, forceRefresh: true } 
        }),
        createTimeoutPromise(BATCH_TIMEOUT_MS)
      ]),
      Promise.allSettled([
        supabase.functions.invoke('comprehensive-firecrawl-scraper', { 
          body: { batch: 2, forceRefresh: true } 
        }),
        createTimeoutPromise(BATCH_TIMEOUT_MS)
      ]),
      Promise.allSettled([
        supabase.functions.invoke('comprehensive-firecrawl-scraper', { 
          body: { batch: 3, forceRefresh: true } 
        }),
        createTimeoutPromise(BATCH_TIMEOUT_MS)
      ]),
      Promise.allSettled([
        supabase.functions.invoke('comprehensive-firecrawl-scraper', { 
          body: { batch: 4, forceRefresh: true } 
        }),
        createTimeoutPromise(BATCH_TIMEOUT_MS)
      ])
    ];

    // Wait for all batches to complete
    console.log('⏳ Waiting for batch scrapes to complete (2min timeout per batch)...');
    const batchResults = await Promise.allSettled(batchPromises);
    
    // Log results of each batch
    const successfulBatches = [];
    const failedBatches = [];
    
    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const batchData = result.value.data;
        console.log(`✅ Batch ${index + 1} completed:`, batchData);
        successfulBatches.push({
          batch: index + 1,
          products: batchData?.totalFound || 0,
          categories: batchData?.categoriesScraped || []
        });
      } else {
        console.error(`❌ Batch ${index + 1} failed:`, result.reason);
        failedBatches.push({
          batch: index + 1,
          error: result.reason?.message || 'Unknown error'
        });
      }
    });

    console.log(`📊 Batch Summary: ${successfulBatches.length}/4 succeeded, ${failedBatches.length}/4 failed`);

    // Validate: Don't proceed with merge if all batches failed
    if (successfulBatches.length === 0) {
      console.error('❌ All batches failed - cannot proceed with merge');
      throw new Error('All scraping batches failed. Please check network connection and try again.');
    }

    // Now merge all batches together
    console.log('🔄 Merging all category batches...');
    const { data: refreshResult, error: refreshError } = await supabase.functions.invoke(
      'comprehensive-firecrawl-scraper',
      { body: { mergeAll: true, forceRefresh } }
    );
    
    console.log('📊 Merge result:', refreshResult);
    
    if (refreshError) {
      console.error('⚠️ Merge error:', refreshError);
    }

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

    // If force refresh and successful, NOW delete old cache before storing new data
    if (forceRefresh && refreshResult?.success && refreshResult.totalFound > 0) {
      console.log('🔄 Force refresh successful - clearing old cache before storing new data...');
      
      const { error: deleteError } = await supabase
        .from('tools_weekly_cache')
        .delete()
        .eq('category', 'weekly_refresh');
        
      if (deleteError) {
        console.error('⚠️ Error deleting old cache:', deleteError);
      } else {
        console.log('✅ Old cache cleared after successful scrape');
      }
    }

    // Don't store the merged data - individual categories are already stored by the batch scrapers
    console.log(`✅ All batches complete - data already stored by category in individual scrapers`);

    console.log('✅ Tools refresh completed:', refreshResult);

    // Clean up old "weekly_refresh" merged entries (legacy from old system)
    console.log('🧹 Cleaning up old merged cache entries...');
    
    const { error: deleteError } = await supabase
      .from('tools_weekly_cache')
      .delete()
      .eq('category', 'weekly_refresh');

    if (deleteError) {
      console.error('⚠️ Error cleaning up merged cache entries:', deleteError);
    } else {
      console.log(`🗑️ Cleaned up old "weekly_refresh" merged entries`);
    }

    // Determine overall success based on merge result
    const overallSuccess = refreshResult?.success && refreshResult.totalFound > 0;
    
    const responseData = {
      success: overallSuccess,
      message: overallSuccess 
        ? `Successfully updated ${refreshResult.categoriesFound}/${refreshResult.totalCategories} categories with ${refreshResult.totalFound} products`
        : refreshResult?.message || 'Refresh completed but no products found',
      refreshedAt: now.toISOString(),
      batchResults: {
        successful: successfulBatches,
        failed: failedBatches
      },
      ...refreshResult
    };

    console.log(overallSuccess ? '🎉 Tools weekly refresh completed successfully' : '⚠️ Tools refresh completed with issues');

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

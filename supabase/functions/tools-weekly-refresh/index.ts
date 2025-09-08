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
    console.log('🔄 Tools Bi-weekly Refresh started');
    
    // Parse request body to check for force refresh
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const forceRefresh = body.forceRefresh === true;
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if cache needs refresh (expired or doesn't exist) - now 14 days
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
          message: 'Cache is still fresh, no refresh needed (bi-weekly cycle)',
          expiresAt: expiresAt.toISOString(),
          toolsCount: existingCache.tools_data?.length || 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (forceRefresh) {
      console.log('🔄 Force refresh requested, bypassing cache expiry checks...');
    }

    console.log('🔄 Cache expired or missing, triggering bi-weekly batch refresh...');

    // Check if there's already a batch job running
    const { data: runningJobs } = await supabase
      .from('batch_jobs')
      .select('*')
      .eq('job_type', 'tools_scraping')
      .in('status', ['pending', 'processing'])
      .order('created_at', { ascending: false })
      .limit(1);

    if (runningJobs && runningJobs.length > 0) {
      const runningJob = runningJobs[0];
      console.log(`⏳ Batch job already running: ${runningJob.id}`);
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Batch refresh already in progress',
        jobId: runningJob.id,
        status: runningJob.status,
        progress: runningJob.progress_percentage || 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Call the tools batch processor
    console.log('🔄 Invoking tools-batch-processor...');
    const { data: refreshResult, error: refreshError } = await supabase.functions.invoke(
      'tools-batch-processor',
      { body: { forceRefresh } }
    );
    
    console.log('📊 Batch processor result:', refreshResult);

    if (refreshError) {
      console.error('❌ Error calling tools-batch-processor:', refreshError);
      throw refreshError;
    }

    console.log('✅ Tools bi-weekly refresh completed:', refreshResult);

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
      message: 'Tools bi-weekly refresh completed successfully',
      refreshedAt: now.toISOString(),
      ...refreshResult
    };

    console.log('🎉 Tools bi-weekly refresh completed successfully');

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Error in tools-bi-weekly-refresh:', error);
    
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

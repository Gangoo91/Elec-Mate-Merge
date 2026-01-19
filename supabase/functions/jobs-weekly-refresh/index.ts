import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const serve = Deno.serve;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * JOBS DAILY REFRESH ORCHESTRATOR v3
 *
 * Triggers all 12 job scraping batches covering the ENTIRE UK:
 * 1. London & Greater London
 * 2. Southeast (Brighton, Southampton, Reading, etc.)
 * 3. Midlands (Birmingham, Nottingham, Leicester, etc.)
 * 4. Northwest & Lancashire (Manchester, Liverpool, Preston, etc.)
 * 5. Yorkshire & Humber (Leeds, Sheffield, Bradford, etc.)
 * 6. Scotland (Edinburgh, Glasgow, Aberdeen, etc.)
 * 7. Wales & Southwest (Cardiff, Bristol, Plymouth, etc.)
 * 8. East Anglia & Northeast (Norwich, Cambridge, Newcastle, etc.)
 * 9. CUMBRIA & Rural North (Carlisle, Kendal, Penrith, Barrow, etc.)
 * 10. Northern Ireland & Islands (Belfast, Jersey, Isle of Wight)
 * 11. Specialist Nationwide (Solar PV, EV, Industrial, Data Centre)
 * 12. Apprenticeships & Training
 *
 * Then merges all results into job_listings table (2000 jobs max)
 *
 * Schedule: Twice daily at 6am and 6pm UK time via pg_cron
 */

const TOTAL_BATCHES = 12;
const BATCH_TIMEOUT_MS = 180000; // 3 minutes per batch

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('🔧 [JOBS-DAILY-REFRESH] Starting comprehensive job refresh...');
  const startTime = Date.now();

  try {
    const body = req.method === 'POST' ? await req.json().catch(() => ({})) : {};
    const forceRefresh = body.forceRefresh === true;
    const singleBatch = body.batch; // Optional: run only one batch

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If single batch requested, just run that one
    if (singleBatch && singleBatch >= 1 && singleBatch <= TOTAL_BATCHES) {
      console.log(`📊 Running single batch ${singleBatch}...`);

      const { data, error } = await supabase.functions.invoke('comprehensive-job-scraper', {
        body: { batch: singleBatch, forceRefresh: true }
      });

      if (error) throw error;

      return new Response(
        JSON.stringify({
          success: true,
          message: `Batch ${singleBatch} completed`,
          ...data,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if we need refresh
    console.log('📊 Checking cache freshness...');

    const { data: recentCache } = await supabase
      .from('jobs_weekly_cache')
      .select('created_at, region')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const now = new Date();
    const cacheAge = recentCache
      ? Math.floor((now.getTime() - new Date(recentCache.created_at).getTime()) / 1000 / 60 / 60)
      : 999;

    if (!forceRefresh && cacheAge < 12) {
      console.log(`✅ Cache is fresh (${cacheAge} hours old), skipping refresh`);

      // Just return merged data
      const { data: mergeResult } = await supabase.functions.invoke('comprehensive-job-scraper', {
        body: { mergeAll: true }
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: `Cache is fresh (${cacheAge} hours old)`,
          cached: true,
          ...mergeResult,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🔄 Starting full refresh (cache age: ${cacheAge} hours)...`);

    // Run all batches in parallel (with staggered start to avoid rate limits)
    const batchPromises: Promise<any>[] = [];

    for (let i = 1; i <= TOTAL_BATCHES; i++) {
      // Stagger batch starts by 2 seconds each
      const delay = (i - 1) * 2000;

      const promise = new Promise(async (resolve) => {
        await new Promise(r => setTimeout(r, delay));

        try {
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error(`Batch ${i} timeout`)), BATCH_TIMEOUT_MS)
          );

          const batchPromise = supabase.functions.invoke('comprehensive-job-scraper', {
            body: { batch: i, forceRefresh: true }
          });

          const result = await Promise.race([batchPromise, timeoutPromise]);
          resolve({ batch: i, success: true, data: (result as any).data });
        } catch (error) {
          console.error(`❌ Batch ${i} failed:`, error);
          resolve({ batch: i, success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      });

      batchPromises.push(promise);
    }

    console.log(`⏳ Waiting for ${TOTAL_BATCHES} batches...`);
    const batchResults = await Promise.all(batchPromises);

    // Summarize results
    const successful = batchResults.filter(r => r.success);
    const failed = batchResults.filter(r => !r.success);

    console.log(`📊 Batch Summary: ${successful.length}/${TOTAL_BATCHES} succeeded`);

    // Log each batch result
    batchResults.forEach(r => {
      if (r.success) {
        console.log(`✅ Batch ${r.batch}: ${r.data?.totalJobs || 0} jobs`);
      } else {
        console.log(`❌ Batch ${r.batch}: ${r.error}`);
      }
    });

    // Merge all regions
    console.log('🔄 Merging all job data...');

    const { data: mergeResult, error: mergeError } = await supabase.functions.invoke(
      'comprehensive-job-scraper',
      { body: { mergeAll: true } }
    );

    if (mergeError) {
      console.error('⚠️ Merge error:', mergeError);
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    const response = {
      success: successful.length > 0,
      message: `Refreshed ${successful.length}/${TOTAL_BATCHES} regions with ${mergeResult?.totalJobs || 0} unique jobs`,
      totalJobs: mergeResult?.totalJobs || 0,
      elapsed: `${elapsed}s`,
      batchResults: batchResults.map(r => ({
        batch: r.batch,
        success: r.success,
        jobs: r.data?.totalJobs || 0,
        region: r.data?.region,
        error: r.error,
      })),
      sourceStats: mergeResult?.sourceStats,
      regionsFound: mergeResult?.regionsFound,
      totalRegions: mergeResult?.totalRegions,
      refreshedAt: now.toISOString(),
    };

    console.log(response.success
      ? `🎉 Daily job refresh complete: ${response.totalJobs} jobs in ${elapsed}s`
      : `⚠️ Job refresh completed with issues`
    );

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Fatal error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to refresh jobs',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

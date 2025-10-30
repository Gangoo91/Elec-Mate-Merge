/**
 * Enrichment Keepalive Edge Function
 * 
 * Auto-relaunches the continuous worker pool every 2 minutes if it's been recycled.
 * Designed to be called by pg_cron scheduler.
 * 
 * Schedule setup (run in Supabase SQL editor):
 * 
 * SELECT cron.schedule(
 *   'enrichment-keepalive',
 *   Every 2 minutes: */2 * * * *
 *   $$
 *   SELECT
 *     net.http_post(
 *       url:='https://jtwygbeceundfgnkirof.supabase.co/functions/v1/enrichment-keepalive',
 *       headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8"}'::jsonb,
 *       body:=concat('{"timestamp": "', now(), '"}')::jsonb
 *     ) as request_id;
 *   $$
 * );
 * 
 * To verify it's running:
 * SELECT * FROM cron.job WHERE jobname = 'enrichment-keepalive';
 * SELECT * FROM cron.job_run_details WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'enrichment-keepalive') ORDER BY start_time DESC LIMIT 10;
 */

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('💓 Enrichment keepalive triggered');

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if there are any active pending/processing jobs
    const { data: activeJobs, error: jobsError } = await supabase
      .from('batch_jobs')
      .select('id, job_type, status, updated_at')
      .in('status', ['pending', 'processing'])
      .order('updated_at', { ascending: false })
      .limit(10);

    if (jobsError) {
      console.error('❌ Failed to query jobs:', jobsError);
      throw jobsError;
    }

    if (!activeJobs || activeJobs.length === 0) {
      console.log('✅ No active jobs - keepalive not needed');
      return new Response(JSON.stringify({
        success: true,
        message: 'No active jobs',
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`🔄 Found ${activeJobs.length} active jobs, restarting worker pool...`);

    // Call master-enrichment-scheduler with action=start, scope=single for the most recent job
    // This will relaunch the continuous worker if it's been recycled
    const primaryJob = activeJobs[0];
    
    const { data: restartResult, error: restartError } = await supabase.functions.invoke(
      'master-enrichment-scheduler',
      {
        body: {
          action: 'start',
          scope: 'single',
          jobType: primaryJob.job_type,
          createIfMissing: false
        }
      }
    );

    if (restartError) {
      console.error('❌ Failed to restart worker:', restartError);
      throw restartError;
    }

    console.log('✅ Worker pool restarted successfully');

    return new Response(JSON.stringify({
      success: true,
      message: `Keepalive: Restarted worker for ${activeJobs.length} active jobs`,
      primary_job: primaryJob.job_type,
      active_jobs: activeJobs.length,
      timestamp: new Date().toISOString(),
      restart_result: restartResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('❌ Keepalive error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || String(error),
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

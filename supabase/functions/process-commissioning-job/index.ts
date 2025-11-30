import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateCommissioningProcedures } from '../_agents/commissioning-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Graceful shutdown logging
addEventListener('beforeunload', (ev) => {
  console.log('⚠️ Commissioning function shutdown:', ev.detail?.reason);
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { jobId } = await req.json();

    console.log(`[PROCESS-COMMISSIONING] Starting job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('commissioning_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('[PROCESS-COMMISSIONING] Job not found:', jobId);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('commissioning_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Analyzing project requirements...'
      })
      .eq('id', jobId);

    // Background processing task
    const processingTask = (async () => {
      try {
        // Progress: 25% - Searching knowledge base
        await supabase
          .from('commissioning_jobs')
          .update({
            progress: 25,
            current_step: 'Searching commissioning knowledge base...'
          })
          .eq('id', jobId);

        // Call the core commissioning logic directly
        console.log('[PROCESS-COMMISSIONING] Generating commissioning procedures...');
        const result = await generateCommissioningProcedures(supabase, job.job_inputs);

        // Progress: 70% - Processing results
        await supabase
          .from('commissioning_jobs')
          .update({
            progress: 70,
            current_step: 'Processing results...'
          })
          .eq('id', jobId);

        // Progress: 100% - Complete
        await supabase
          .from('commissioning_jobs')
          .update({
            status: 'complete',
            progress: 100,
            current_step: 'Commissioning procedures complete',
            result_data: result,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);

        console.log(`[PROCESS-COMMISSIONING] ✅ Job completed: ${jobId}`);

      } catch (processingError: any) {
        console.error('[PROCESS-COMMISSIONING] Error processing job:', processingError);

        // Update job with error
        await supabase
          .from('commissioning_jobs')
          .update({
            status: 'failed',
            error_message: processingError.message,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      }
    })();

    // Watchdog timeout: Mark job as failed if it stalls after 4 minutes
    const watchdogTimeout = setTimeout(async () => {
      try {
        const { data: currentJob } = await supabase
          .from('commissioning_jobs')
          .select('progress, status')
          .eq('id', jobId)
          .single();
        
        // If job is still processing and hasn't made significant progress, mark as failed
        if (currentJob?.status === 'processing' && (currentJob?.progress || 0) < 70) {
          console.error(`[PROCESS-COMMISSIONING] ⏱️ Watchdog timeout for job ${jobId} at ${currentJob.progress}%`);
          await supabase
            .from('commissioning_jobs')
            .update({
              status: 'failed',
              error_message: 'Request timed out. Please try again with a simpler query or contact support.',
              completed_at: new Date().toISOString()
            })
            .eq('id', jobId);
        }
      } catch (watchdogError) {
        console.error('[PROCESS-COMMISSIONING] Watchdog error:', watchdogError);
      }
    }, 240000); // 4 minutes

    // Keep function alive until background processing completes
    EdgeRuntime.waitUntil(
      processingTask.finally(() => {
        clearTimeout(watchdogTimeout);
      })
    );

    // Return immediately
    console.log(`[PROCESS-COMMISSIONING] HTTP response sent immediately for job: ${jobId}`);
    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[PROCESS-COMMISSIONING] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { generateHealthSafety } from '../_agents/health-safety-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

// Graceful shutdown logging
addEventListener('beforeunload', (ev) => {
  console.log('⚠️ Health-safety function shutdown:', ev.detail?.reason);
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'process-health-safety-job' });

  const body = await req.json();
  const jobId = body.jobId;
  
  if (!jobId) {
    return new Response(
      JSON.stringify({ error: 'Job ID is required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  logger.info('Job accepted for background processing', { jobId });

  // Background processing with watchdog
  const backgroundTask = async () => {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let watchdogTimeout: number | undefined;

    try {
      // Get job details
      const { data: job, error: jobError } = await supabase
        .from('health_safety_jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (jobError || !job) {
        logger.error('Job not found', { jobId, error: jobError });
        throw new Error('Job not found');
      }

      // Update to processing
      await supabase
        .from('health_safety_jobs')
        .update({
          status: 'processing',
          started_at: new Date().toISOString(),
          progress: 5,
          current_step: 'Parsing safety requirements...'
        })
        .eq('id', jobId);

      logger.info('Job status updated to processing');

      // Watchdog timeout (4 minutes) - mark as failed if stuck
      watchdogTimeout = setTimeout(async () => {
        logger.error('⏱️ Watchdog timeout triggered', { jobId });
        const { data: currentJob } = await supabase
          .from('health_safety_jobs')
          .select('status')
          .eq('id', jobId)
          .single();
        
        if (currentJob?.status === 'processing') {
          await supabase
            .from('health_safety_jobs')
            .update({
              status: 'failed',
              error_message: 'Request timed out after 4 minutes',
              completed_at: new Date().toISOString()
            })
            .eq('id', jobId);
        }
      }, 240000); // 4 minutes

      // Progress callback
      const onProgress = async (progress: number, step: string) => {
        await supabase
          .from('health_safety_jobs')
          .update({
            progress: Math.min(95, progress),
            current_step: step
          })
          .eq('id', jobId);
        logger.info('Progress update', { progress, step });
      };

      // Call the core agent directly
      logger.info('Calling Health & Safety core agent');
      const result = await generateHealthSafety(
        job.query,
        job.project_info || {},
        onProgress
      );

      logger.info('Agent call completed successfully');

      // Complete the job
      await supabase
        .from('health_safety_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Complete',
          output_data: result,
          raw_response: { data: result },
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      logger.info('Job completed successfully', { jobId });

    } catch (error: any) {
      logger.error('Job processing failed', { error: error.message });

      await supabase
        .from('health_safety_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    } finally {
      // Clear watchdog
      if (watchdogTimeout !== undefined) {
        clearTimeout(watchdogTimeout);
      }
    }
  };

  // Start background processing (non-blocking)
  EdgeRuntime.waitUntil(backgroundTask());

  // Return immediate response
  return new Response(
    JSON.stringify({ success: true, jobId, status: 'processing' }),
    { 
      status: 202, // Accepted
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
});

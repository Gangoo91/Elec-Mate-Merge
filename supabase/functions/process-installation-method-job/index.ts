import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'process-installation-method-job' });

  let jobId: string | null = null;
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    jobId = body.jobId;
    logger.info('Processing installation method job', { jobId });

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('installation_method_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      logger.error('Job not found', { jobId, error: jobError });
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update to processing
    await supabase
      .from('installation_method_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Initializing installation method generation...'
      })
      .eq('id', jobId);

    logger.info('Job status updated to processing');

    // Step 1: Searching knowledge base (5-30%)
    await new Promise(resolve => setTimeout(resolve, 1000));
    await supabase
      .from('installation_method_jobs')
      .update({
        progress: 20,
        current_step: 'Searching BS 7671 regulations and practical work intelligence...'
      })
      .eq('id', jobId);

    // Step 2: Trigger installation-method-agent in background (fire and forget)
    logger.info('Starting background generation for installation method');

    const agentTask = supabase.functions.invoke('installation-method-agent', {
      body: {
        query: job.query,
        projectDetails: job.project_details,
        designerContext: job.designer_context,
        jobId: job.id // Agent will update job table directly
      }
    });

    // Keep function alive until agent completes
    EdgeRuntime.waitUntil(agentTask);

    logger.info(`✅ Started background generation for job: ${jobId}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Method statement generation started in background',
        jobId: jobId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    logger.error('Job processing failed', { 
      jobId,
      error: error instanceof Error ? error.message : String(error)
    });

    // Mark job as failed
    if (jobId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('installation_method_jobs')
          .update({
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error occurred',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (updateError) {
        logger.error('Failed to update job status to failed', { updateError });
      }
    }

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

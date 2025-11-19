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

    // Step 2: Call installation-method-agent with heartbeat (20-80%)
    logger.info('Calling installation-method-agent');
    
    const startTime = Date.now();
    let currentProgress = 20;
    let heartbeatInterval: number | undefined;

    // Start the AI call
    const agentPromise = fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/installation-method-agent`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: job.query,
        projectDetails: job.project_details,
        designerContext: job.designer_context,
        jobId: job.id // CRITICAL: Pass jobId for job-aware processing
      })
    });

    // Heartbeat: Update progress every 10 seconds (20% → 80%)
    heartbeatInterval = setInterval(async () => {
      const elapsed = Date.now() - startTime;
      
      // Gradually increase from 20% to 80% over 180 seconds (3 minutes)
      currentProgress = Math.min(80, 20 + Math.floor((elapsed / 180000) * 60));
      
      await supabase
        .from('installation_method_jobs')
        .update({
          progress: currentProgress,
          current_step: 'AI is generating detailed method statement steps...'
        })
        .eq('id', jobId);
        
      logger.info('Heartbeat progress update', { progress: currentProgress, elapsed });
    }, 10000);

    let agentResponse;
    let agentData;

    try {
      agentResponse = await agentPromise;
      
      if (!agentResponse.ok) {
        const errorText = await agentResponse.text();
        throw new Error(`Agent call failed: ${agentResponse.status} ${agentResponse.statusText} - ${errorText}`);
      }

      agentData = await agentResponse.json();
      
      logger.info('Agent call completed', { duration: Date.now() - startTime });
      
    } finally {
      // Always clear the heartbeat interval
      if (heartbeatInterval !== undefined) {
        clearInterval(heartbeatInterval);
      }
    }

    // Step 3: Finalizing (80-100%)
    await supabase
      .from('installation_method_jobs')
      .update({
        progress: 90,
        current_step: 'Finalizing method statement...'
      })
      .eq('id', jobId);

    await new Promise(resolve => setTimeout(resolve, 500));

    // Mark as complete
    await supabase
      .from('installation_method_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Generation complete!',
        method_data: agentData.data || agentData,
        quality_metrics: agentData.qualityMetrics || null,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    logger.info('✅ Job completed successfully', { 
      jobId, 
      totalDuration: Date.now() - startTime 
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        status: 'complete'
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

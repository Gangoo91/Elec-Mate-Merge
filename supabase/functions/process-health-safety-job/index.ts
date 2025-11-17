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
  const logger = createLogger(requestId, { function: 'process-health-safety-job' });

  let jobId: string | null = null;
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    jobId = body.jobId;
    logger.info('Processing job', { jobId });

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('health_safety_jobs')
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
      .from('health_safety_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Parsing safety requirements...'
      })
      .eq('id', jobId);

    logger.info('Job status updated to processing');

    // Step 1: Parsing requirements (5-25%)
    await new Promise(resolve => setTimeout(resolve, 1000));
    await supabase
      .from('health_safety_jobs')
      .update({
        progress: 25,
        current_step: 'Searching health & safety regulations...'
      })
      .eq('id', jobId);

    // Step 2: Call health-safety-v3 agent with heartbeat (25-70%)
    logger.info('Calling health-safety-v3 agent');
    
    const startTime = Date.now();
    let currentProgress = 25;
    let heartbeatInterval: number | undefined;

    // Start the AI call
    const agentPromise = fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/health-safety-v3`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: job.query,
        workType: job.work_type,
        projectInfo: job.project_info
      })
    });

    // Heartbeat: Update progress every 8 seconds (25% → 70%)
    heartbeatInterval = setInterval(async () => {
      const elapsed = Date.now() - startTime;
      
      // Gradually increase from 25% to 70% over 120 seconds (2 minutes)
      currentProgress = Math.min(70, 25 + Math.floor((elapsed / 120000) * 45));
      
      await supabase
        .from('health_safety_jobs')
        .update({
          progress: currentProgress,
          current_step: 'Analyzing regulations and generating risk assessment...'
        })
        .eq('id', jobId);
        
      logger.info('Heartbeat progress update', { progress: currentProgress, elapsed });
    }, 8000);

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

    // Jump to 75%
    await supabase
      .from('health_safety_jobs')
      .update({
        progress: 75,
        current_step: 'Finalising safety documentation...'
      })
      .eq('id', jobId);

    await new Promise(resolve => setTimeout(resolve, 800));

    // Step 3: Complete (75-100%)
    await supabase
      .from('health_safety_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Complete',
        output_data: agentData.data || agentData,
        raw_response: agentData,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    logger.info('Job completed successfully', { jobId });

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    logger.error('Job processing failed', { error: error.message });

    if (jobId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      );

      await supabase
        .from('health_safety_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

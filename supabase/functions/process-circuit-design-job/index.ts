import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'No jobId provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🔄 Processing circuit design job: ${jobId}`);

    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      console.error('Job not found:', jobError);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update job to processing
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        current_step: 'Starting AI design agent...'
      })
      .eq('id', jobId);

    // Call parallel orchestrator (fire-and-forget)
    // The orchestrator runs both designer and installer agents in parallel
    const designTask = supabase.functions.invoke('process-circuit-design-parallel', {
      body: {
        jobId: jobId
      }
    }).then(() => {
      console.log('✅ Parallel orchestrator HTTP response received (ignoring status)');
    }).catch((error) => {
      console.log('ℹ️ Parallel orchestrator HTTP connection closed:', error.message);
      // This is expected for long-running jobs - orchestrator updates DB directly
    });

    // Watchdog: Detect if agent fails to start within 90 seconds
    const watchdogDelay = setTimeout(async () => {
      console.log('⏰ Watchdog: Checking if agent started...');
      
      const { data: currentJob } = await supabase
        .from('circuit_design_jobs')
        .select('progress, status')
        .eq('id', jobId)
        .single();
      
      // If job hasn't progressed beyond 35% in 90 seconds, agent never started
      if (currentJob && currentJob.status === 'processing' && currentJob.progress <= 35) {
        console.error('❌ Watchdog: Agent failed to start - marking job as failed');
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: 'Design agent failed to start. This may be a temporary platform issue. Please try generating the design again.',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } else {
        console.log('✅ Watchdog: Agent is active');
      }
    }, 90000); // 90 seconds

    // Keep function alive until design completes
    EdgeRuntime.waitUntil(
      designTask.finally(() => clearTimeout(watchdogDelay))
    );

    console.log(`✅ Started background design for job: ${jobId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Design processing started',
        jobId: jobId 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in process-circuit-design-job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

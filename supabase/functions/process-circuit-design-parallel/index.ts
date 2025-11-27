import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let jobId: string | undefined; // Store outside try block to avoid body consumed error

  try {
    const body = await req.json();
    jobId = body.jobId;

    if (!jobId) {
      return new Response(
        JSON.stringify({ error: 'jobId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🚀 Parallel Circuit Design Orchestrator START', { jobId });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch job data
    const { data: job, error: jobError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // Update job: Processing started
    await supabase
      .from('circuit_design_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Starting parallel agent processing...',
        designer_status: 'pending',
        designer_progress: 0,
        installation_agent_status: 'pending',
        installation_agent_progress: 0
      })
      .eq('id', jobId);

    console.log('📋 Job data retrieved, launching Designer agent in fire-and-forget mode');

    // ============================================
    // PHASE 1: Circuit Designer (fire-and-forget)
    // Designer will trigger Installation Agent when complete
    // ============================================
    console.log('🔌 Launching Circuit Designer (fire-and-forget)...');
    
    // Fire-and-forget: Designer runs in background, triggers installer when done
    const designerTask = supabase.functions.invoke('designer-agent-v3', {
      body: {
        jobId,
        mode: 'direct-design',
        projectInfo: job.job_inputs.projectInfo,
        supply: job.job_inputs.supply,
        circuits: job.job_inputs.circuits,
        additionalPrompt: job.job_inputs.additionalPrompt || '',
        specialRequirements: job.job_inputs.specialRequirements || [],
        installationConstraints: job.job_inputs.installationConstraints || {}
      }
    }).then(() => {
      console.log('✅ Designer HTTP response received (ignoring status)');
    }).catch((error) => {
      console.log('ℹ️ Designer HTTP connection closed:', error.message);
      // This is expected for long-running jobs - designer updates DB directly
    });

    // Keep function alive until designer completes
    EdgeRuntime.waitUntil(designerTask);

    console.log('✅ Designer launched in background (HTTP response sent immediately)');

    // Return immediately - designer runs in background
    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        message: 'Designer launched (fire-and-forget mode)',
        status: 'processing',
        executionMode: 'fire-and-forget'
      }),
      { 
        status: 202, // Accepted
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Orchestrator error:', error);
    
    // Try to update job with error (jobId already extracted at top of handler)
    if (jobId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: error.message,
            current_step: `Orchestrator failed: ${error.message}`
          })
          .eq('id', jobId);
      } catch (updateError) {
        console.error('Failed to update job with error:', updateError);
      }
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

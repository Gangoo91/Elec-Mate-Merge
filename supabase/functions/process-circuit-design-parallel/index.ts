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
    const { jobId } = await req.json();

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

    console.log('📋 Job data retrieved, launching parallel agents');

    // PHASE 1: Launch Circuit Designer (fire-and-forget)
    const designerPromise = supabase.functions.invoke('designer-agent-v3', {
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
      console.log('✅ Designer agent HTTP invocation complete');
    }).catch((error) => {
      console.log('ℹ️ Designer agent HTTP connection closed:', error.message);
      // Expected - designer updates DB directly
    });

    // PHASE 2: Launch Design Installation Agent (fire-and-forget)
    // Prepare circuit context from job inputs
    const circuitContext = {
      circuits: job.job_inputs.circuits,
      supply: job.job_inputs.supply,
      projectInfo: job.job_inputs.projectInfo
    };

    const installationPromise = supabase.functions.invoke('design-installation-agent', {
      body: {
        jobId,
        circuitDesignContext: circuitContext
      }
    }).then(() => {
      console.log('✅ Installation agent HTTP invocation complete');
    }).catch((error) => {
      console.log('ℹ️ Installation agent HTTP connection closed:', error.message);
      // Expected - installation agent updates DB directly
    });

    // Keep function alive until both agents complete (prevents timeout)
    const bothAgents = Promise.allSettled([designerPromise, installationPromise]);
    
    // Use EdgeRuntime.waitUntil if available (Supabase edge runtime)
    if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
      EdgeRuntime.waitUntil(bothAgents);
    }

    console.log('🚀 Both agents launched in parallel with waitUntil');

    // Return immediately - agents update DB directly
    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        message: 'Parallel agents launched successfully',
        status: 'processing'
      }),
      { 
        status: 202, // Accepted
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('❌ Parallel orchestrator error:', error);
    
    // Try to update job with error
    try {
      const { jobId } = await req.json();
      if (jobId) {
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
      }
    } catch (updateError) {
      console.error('Failed to update job with error:', updateError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

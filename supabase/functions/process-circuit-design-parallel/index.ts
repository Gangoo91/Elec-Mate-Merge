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

    console.log('📋 Job data retrieved, launching SEQUENTIAL agent pipeline');

    // ============================================
    // PHASE 1: Circuit Designer (generates actual specs)
    // ============================================
    console.log('🔌 PHASE 1/2: Launching Circuit Designer...');
    
    try {
      const { data: designerResult, error: designerError } = await supabase.functions.invoke('designer-agent-v3', {
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
      });

      if (designerError) {
        console.error('❌ Circuit Designer failed:', designerError);
        throw new Error(`Circuit Designer failed: ${designerError.message}`);
      }

      console.log('✅ Circuit Designer complete');
    } catch (designerError: any) {
      console.error('❌ Designer invocation error:', designerError);
      throw new Error(`Designer failed: ${designerError.message}`);
    }

    // ============================================
    // PHASE 1.5: Retrieve designed circuits from DB
    // ============================================
    console.log('📊 Retrieving designed circuits from database...');
    
    const { data: jobWithDesign, error: fetchError } = await supabase
      .from('circuit_design_jobs')
      .select('design_data')
      .eq('id', jobId)
      .single();

    if (fetchError || !jobWithDesign?.design_data?.circuits) {
      console.error('❌ Failed to retrieve designed circuits:', fetchError);
      throw new Error('Failed to retrieve designed circuits from database');
    }

    const designedCircuits = jobWithDesign.design_data.circuits;
    console.log(`✅ Retrieved ${designedCircuits.length} designed circuits`);

    // ============================================
    // PHASE 2: Installation Agent (uses actual designed specs)
    // ============================================
    console.log('🔧 PHASE 2/2: Launching Installation Agent with ACTUAL designed specs...');
    
    try {
      const { data: installResult, error: installError } = await supabase.functions.invoke('design-installation-agent', {
        body: {
          jobId,
          designedCircuits: designedCircuits, // ✅ Pass DESIGNED circuits with actual specs
          supply: job.job_inputs.supply,
          projectInfo: job.job_inputs.projectInfo
        }
      });

      if (installError) {
        console.warn('⚠️ Installation Agent failed (non-critical):', installError);
        
        // Designer succeeded, so mark job complete anyway
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'complete',
            progress: 100,
            current_step: 'Design complete (installation guidance unavailable)',
            installation_agent_status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } else {
        console.log('✅ Installation Agent complete');
      }
    } catch (installError: any) {
      console.warn('⚠️ Installation Agent invocation error (non-critical):', installError);
      
      // Designer succeeded, so mark job complete anyway
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Design complete (installation guidance unavailable)',
          installation_agent_status: 'failed',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    console.log('🚀 Sequential pipeline complete (Designer → Installer)');

    // Return immediately - sequential execution launched
    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        message: 'Sequential pipeline launched (Designer → Installer)',
        status: 'processing',
        executionMode: 'sequential'
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

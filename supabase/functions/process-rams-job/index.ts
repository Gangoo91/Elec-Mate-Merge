import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  try {
    const { jobId } = await req.json();
    console.log(`📋 Processing RAMS job: ${jobId}`);

    // Get job details
    const { data: job, error: fetchError } = await supabase
      .from('rams_generation_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // Mark as processing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        current_step: 'Analysing job description and identifying potential hazards...',
        progress: 5
      })
      .eq('id', jobId);

    // Update: Starting health & safety analysis
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        current_step: `Evaluating risks for ${job.job_scale} installation work...`,
        progress: 10
      })
      .eq('id', jobId);

    console.log(`🔍 Calling health-safety-v3 for job: ${jobId}`);

    // Start heartbeat to show progress while H&S runs (15%, 20%, 25%, 30%, 35%)
    let heartbeatProgress = 15;
    const heartbeatInterval = setInterval(async () => {
      if (heartbeatProgress <= 35) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: heartbeatProgress,
            current_step: 'Analysing risks and generating control measures...'
          })
          .eq('id', jobId);
        heartbeatProgress += 5;
      }
    }, 15000); // Every 15 seconds

    try {
      // Call health-safety-v3 via Supabase invoke (avoids bundler analysing deps)
      const { data: hsData, error: hsError } = await supabase.functions.invoke('health-safety-v3', {
        body: {
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        }
      });

      // Clear heartbeat once H&S completes
      clearInterval(heartbeatInterval);

      if (hsError || !hsData) {
        throw new Error(`Health-safety agent failed: ${hsError?.message ?? 'Unknown error'}`);
      }
      console.log(`✅ Health-safety completed for job: ${jobId}`);

      // Update progress
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: 40,
          current_step: 'Generating safety controls and PPE requirements...',
          raw_hs_response: hsData
        })
        .eq('id', jobId);
    } catch (error) {
      clearInterval(heartbeatInterval);
      throw error;
    }

    // Update: Starting method statement
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 50,
        current_step: 'Creating detailed step-by-step installation method...'
      })
      .eq('id', jobId);

    console.log(`🔧 Calling installer-v3 for job: ${jobId}`);

    // Call installer-v3 via Supabase invoke
    const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
      body: {
        query: job.job_description,
        userContext: { jobScale: job.job_scale },
        projectContext: job.project_info
      }
    });

    if (installerError || !installerData) {
      throw new Error(`Installer agent failed: ${installerError?.message ?? 'Unknown error'}`);
    }
    console.log(`✅ Installer completed for job: ${jobId}`);

    // Update: Finalizing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 85,
        current_step: 'Linking hazards to installation steps...'
      })
      .eq('id', jobId);

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 95,
        current_step: 'Finalising documentation formatting...'
      })
      .eq('id', jobId);

    // Mark complete
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: '✨ Generation complete!',
        rams_data: hsData.data,
        method_data: installerData.data,
        raw_installer_response: installerData,
        completed_at: new Date().toISOString(),
        generation_metadata: {
          hs_timing: hsData.timing,
          installer_timing: installerData.timing
        }
      })
      .eq('id', jobId);

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Job processing failed:', error);

    const { jobId } = await req.json().catch(() => ({ jobId: null }));
    
    if (jobId) {
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

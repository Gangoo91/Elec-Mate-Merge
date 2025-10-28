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
        current_step: 'Analyzing safety requirements...',
        progress: 10
      })
      .eq('id', jobId);

    console.log(`🔍 Calling health-safety-v3 for job: ${jobId}`);

    // Call health-safety-v3
    const hsResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/health-safety-v3`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        })
      }
    );

    if (!hsResponse.ok) {
      const errorText = await hsResponse.text();
      throw new Error(`Health-safety agent failed: ${errorText}`);
    }

    const hsData = await hsResponse.json();
    console.log(`✅ Health-safety completed for job: ${jobId}`);

    // Update progress
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 50,
        current_step: 'Generating installation method...',
        raw_hs_response: hsData
      })
      .eq('id', jobId);

    console.log(`🔧 Calling installer-v3 for job: ${jobId}`);

    // Call installer-v3
    const installerResponse = await fetch(
      `${Deno.env.get('SUPABASE_URL')}/functions/v1/installer-v3`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        })
      }
    );

    if (!installerResponse.ok) {
      const errorText = await installerResponse.text();
      throw new Error(`Installer agent failed: ${errorText}`);
    }

    const installerData = await installerResponse.json();
    console.log(`✅ Installer completed for job: ${jobId}`);

    // Mark complete
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Complete',
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

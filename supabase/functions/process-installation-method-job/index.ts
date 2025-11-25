import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateInstallationMethod } from '../_agents/installation-method-core.ts';

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
        JSON.stringify({ error: 'Job ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🚀 Processing installation method job: ${jobId}`);

    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from('installation_method_jobs')
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

    // Update status to processing
    await supabase
      .from('installation_method_jobs')
      .update({
        status: 'processing',
        progress: 10,
        started_at: new Date().toISOString()
      })
      .eq('id', jobId);

    try {
      // Generate installation method
      await supabase
        .from('installation_method_jobs')
        .update({ progress: 30 })
        .eq('id', jobId);

      const result = await generateInstallationMethod(supabase, {
        query: job.query,
        projectDetails: job.project_details,
        designerContext: job.designer_context
      });

      await supabase
        .from('installation_method_jobs')
        .update({ progress: 90 })
        .eq('id', jobId);

      // Save result
      await supabase
        .from('installation_method_jobs')
        .update({
          status: 'complete',
          progress: 100,
          method_data: result.installationMethod,
          quality_metrics: result.metadata || null,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.log(`✅ Installation method job completed: ${jobId}`);

      return new Response(
        JSON.stringify({ 
          success: true,
          jobId,
          data: result.installationMethod
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error: any) {
      console.error('Error generating installation method:', error);
      
      // Update job with error
      await supabase
        .from('installation_method_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      throw error;
    }

  } catch (error: any) {
    console.error('❌ Error in process-installation-method-job:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

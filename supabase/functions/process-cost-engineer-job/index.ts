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

    console.log(`[PROCESS-COST] Starting job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('cost_engineer_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('[PROCESS-COST] Job not found:', jobId);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('cost_engineer_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Initializing cost analysis...'
      })
      .eq('id', jobId);

    try {
      // Progress: 25% - Gathering market data
      await supabase
        .from('cost_engineer_jobs')
        .update({
          progress: 25,
          current_step: 'Gathering regional pricing data...'
        })
        .eq('id', jobId);

      // Call the actual cost-engineer-v3 function
      console.log('[PROCESS-COST] Calling cost-engineer-v3...');
      const costEngineerUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/cost-engineer-v3`;
      const costResponse = await fetch(costEngineerUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: job.query,
          region: job.region,
          projectContext: job.project_context,
          businessSettings: job.business_settings
        })
      });

      if (!costResponse.ok) {
        const errorText = await costResponse.text();
        throw new Error(`Cost engineer failed: ${costResponse.status} - ${errorText}`);
      }

      const costData = await costResponse.json();

      // Progress: 70% - Analyzing results
      await supabase
        .from('cost_engineer_jobs')
        .update({
          progress: 70,
          current_step: 'Analyzing cost breakdown...'
        })
        .eq('id', jobId);

      // Progress: 100% - Complete
      await supabase
        .from('cost_engineer_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Cost analysis complete',
          output_data: costData,
          raw_response: costData,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.log(`[PROCESS-COST] ✅ Job completed: ${jobId}`);

      return new Response(
        JSON.stringify({ success: true, jobId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (processingError: any) {
      console.error('[PROCESS-COST] Error processing job:', processingError);

      // Update job with error
      await supabase
        .from('cost_engineer_jobs')
        .update({
          status: 'failed',
          error_message: processingError.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ error: processingError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: any) {
    console.error('[PROCESS-COST] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

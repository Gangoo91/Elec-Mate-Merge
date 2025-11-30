import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateCommissioningProcedures } from '../_agents/commissioning-core.ts';

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

    console.log(`[PROCESS-COMMISSIONING] Starting job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('commissioning_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      console.error('[PROCESS-COMMISSIONING] Job not found:', jobId);
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to processing
    await supabase
      .from('commissioning_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Analyzing project requirements...'
      })
      .eq('id', jobId);

    try {
      // Progress: 25% - Searching knowledge base
      await supabase
        .from('commissioning_jobs')
        .update({
          progress: 25,
          current_step: 'Searching commissioning knowledge base...'
        })
        .eq('id', jobId);

      // Call the core commissioning logic directly
      console.log('[PROCESS-COMMISSIONING] Generating commissioning procedures...');
      const result = await generateCommissioningProcedures(supabase, job.job_inputs);

      // Progress: 70% - Processing results
      await supabase
        .from('commissioning_jobs')
        .update({
          progress: 70,
          current_step: 'Processing results...'
        })
        .eq('id', jobId);

      // Progress: 100% - Complete
      await supabase
        .from('commissioning_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Commissioning procedures complete',
          result_data: result,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.log(`[PROCESS-COMMISSIONING] ✅ Job completed: ${jobId}`);

      return new Response(
        JSON.stringify({ success: true, jobId }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (processingError: any) {
      console.error('[PROCESS-COMMISSIONING] Error processing job:', processingError);

      // Update job with error
      await supabase
        .from('commissioning_jobs')
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
    console.error('[PROCESS-COMMISSIONING] Fatal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

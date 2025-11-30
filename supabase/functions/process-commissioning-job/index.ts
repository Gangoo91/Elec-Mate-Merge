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
        JSON.stringify({ error: 'Job ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`🚀 Processing commissioning job: ${jobId}`);

    // Fetch job details
    const { data: job, error: jobError } = await supabase
      .from('commissioning_jobs')
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
      .from('commissioning_jobs')
      .update({
        status: 'processing',
        progress: 5,
        started_at: new Date().toISOString(),
        current_step: 'Analyzing project requirements...'
      })
      .eq('id', jobId);

    // Call commissioning-v3 edge function
    const { data: commissioningResult, error: commissioningError } = await supabase.functions.invoke('commissioning-v3', {
      body: job.job_inputs
    });

    if (commissioningError) {
      console.error('Commissioning generation error:', commissioningError);
      
      await supabase
        .from('commissioning_jobs')
        .update({
          status: 'failed',
          error_message: commissioningError.message || 'Failed to generate commissioning procedures',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      throw commissioningError;
    }

    // Save result
    await supabase
      .from('commissioning_jobs')
      .update({
        status: 'complete',
        progress: 100,
        result_data: commissioningResult,
        completed_at: new Date().toISOString(),
        current_step: 'Commissioning procedures complete'
      })
      .eq('id', jobId);

    console.log(`✅ Commissioning job completed: ${jobId}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        data: commissioningResult
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Error in process-commissioning-job:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

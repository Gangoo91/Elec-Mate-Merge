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

    // Call designer-agent-v3 in job-aware mode (true fire-and-forget)
    // Designer-agent-v3 has its own error handling, watchdog, and database updates
    // We ignore HTTP timeout errors since the agent updates the DB directly
    const designTask = supabase.functions.invoke('designer-agent-v3', {
      body: {
        ...job.job_inputs,
        jobId: jobId,
        mode: 'direct-design'
      }
    }).then(() => {
      console.log('✅ Designer agent HTTP response received (ignoring status)');
    }).catch((error) => {
      console.log('ℹ️ Designer agent HTTP connection closed:', error.message);
      // This is expected for long-running jobs - agent updates DB directly
    });

    // Keep function alive until design completes
    EdgeRuntime.waitUntil(designTask);

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

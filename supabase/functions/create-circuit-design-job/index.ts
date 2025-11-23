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

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const jobInputs = await req.json();

    // Create job record
    const { data: job, error } = await supabase
      .from('circuit_design_jobs')
      .insert({
        user_id: user.id,
        job_inputs: jobInputs,
        status: 'pending',
        progress: 0,
        current_step: 'Initializing design generation...'
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create job:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Created circuit design job: ${job.id}`);

    // Trigger proven v2 pipeline with proper background task handling
    const designTask = supabase.functions.invoke('process-circuit-design-v2', {
      body: { jobId: job.id }
    }).then(() => {
      console.log('✅ V2 pipeline HTTP response received');
    }).catch((error) => {
      console.log('ℹ️ V2 pipeline HTTP connection closed:', error.message);
      // Expected for long-running jobs - v2 updates DB directly
    });

    // Keep function alive until design completes (prevents timeout)
    EdgeRuntime.waitUntil(designTask);

    console.log(`🚀 Triggered v2 pipeline with waitUntil for job: ${job.id}`);

    return new Response(
      JSON.stringify({ jobId: job.id, status: 'pending' }),
      { 
        status: 202, // Accepted
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in create-circuit-design-job:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

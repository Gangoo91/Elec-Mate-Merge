import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { captureException } from '../_shared/sentry.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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

    // Trigger NEW parallel pipeline (Circuit Designer + Installation Guidance)
    const parallelTask = supabase.functions.invoke('process-circuit-design-parallel', {
      body: { jobId: job.id }
    }).then(() => {
      console.log('✅ Parallel pipeline HTTP response received');
    }).catch((error) => {
      console.log('ℹ️ Parallel pipeline HTTP connection closed:', error.message);
      // Expected for long-running jobs - agents update DB directly
    });

    // Keep function alive until both agents complete (prevents timeout)
    EdgeRuntime.waitUntil(parallelTask);

    console.log(`🚀 Triggered parallel pipeline (Designer + Installation) for job: ${job.id}`);

    return new Response(
      JSON.stringify({ jobId: job.id, status: 'pending' }),
      { 
        status: 202, // Accepted
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Error in create-circuit-design-job:', error);

    // Capture to Sentry
    await captureException(error, {
      functionName: 'create-circuit-design-job',
      requestUrl: req.url,
      requestMethod: req.method
    });

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

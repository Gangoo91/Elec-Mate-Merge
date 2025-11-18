import { createClient } from 'npm:@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobInputs {
  circuits: any[];
  supply: any;
  ze?: number;
  installationMethod?: string;
  environment?: string;
}

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
      throw new Error('No job ID provided');
    }

    console.log(`[PROCESS-DESIGN] Starting job ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    const jobInputs = job.job_inputs as JobInputs;

    // Update job to processing
    await supabase
      .from('circuit_design_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        current_step: 'Initializing AI designer...',
        progress: 5
      })
      .eq('id', jobId);

    // FIRE-AND-FORGET: Trigger designer-agent-v3 in background
    // Designer will update database directly, no need to wait for HTTP response
    console.log(`[PROCESS-DESIGN] Triggering designer-agent-v3 (fire-and-forget) for ${jobInputs.circuits.length} circuits`);

    EdgeRuntime.waitUntil(
      supabase.functions.invoke('designer-agent-v3', {
        body: {
          mode: 'direct-design',
          jobId: jobId, // Pass jobId so designer updates DB directly
          ...jobInputs
        }
      }).then(response => {
        if (response.error) {
          console.error(`[PROCESS-DESIGN] Designer invocation error:`, response.error);
        } else {
          console.log(`[PROCESS-DESIGN] Designer triggered successfully for job ${jobId}`);
        }
      }).catch(err => {
        console.error(`[PROCESS-DESIGN] Designer invocation failed:`, err);
      })
    );

    // Return immediately - designer will update DB when complete
    console.log(`✅ Designer triggered for job ${jobId}, returning success`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[PROCESS-DESIGN] ERROR:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

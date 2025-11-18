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

  let jobId: string | null = null;

  try {
    const { jobId: requestJobId } = await req.json();
    jobId = requestJobId;
    
    console.log(`🚀 Starting circuit design generation for job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // Check if cancelled
    if (job.status === 'cancelled') {
      console.log(`🚫 Job ${jobId} was cancelled`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const jobInputs = job.job_inputs;

    // Helper to update progress
    const updateProgress = async (progress: number, step: string) => {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({ 
            progress, 
            current_step: step,
            status: 'processing',
            started_at: job.started_at || new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (error) {
        console.error('⚠️ Progress update failed (non-fatal):', error);
      }
    };

    // Update to processing
    await updateProgress(5, 'Starting circuit design...');

    // Call designer-agent-v3
    console.log(`🤖 Calling designer-agent-v3 for job ${jobId}`);
    
    const designerUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/designer-agent-v3`;
    
    // Set up progress heartbeat
    const heartbeatInterval = setInterval(async () => {
      const { data: currentJob } = await supabase
        .from('circuit_design_jobs')
        .select('status')
        .eq('id', jobId)
        .single();
      
      if (currentJob?.status === 'cancelled') {
        console.log(`🚫 Job ${jobId} cancelled during processing`);
        clearInterval(heartbeatInterval);
      }
    }, 10000); // Check every 10 seconds

    try {
      const response = await fetch(designerUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: 'direct-design',
          circuits: jobInputs.circuits,
          supply: jobInputs.supply,
          earthing: jobInputs.earthing,
          installationConditions: jobInputs.installationConditions,
          jobId: jobId // Pass jobId for progress updates
        }),
        signal: AbortSignal.timeout(550000) // 9 minutes 10 seconds
      });

      clearInterval(heartbeatInterval);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Designer agent failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Design generation failed');
      }

      // Success - update job
      console.log(`✅ Circuit design complete for job ${jobId}`);
      
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Design complete',
          design_data: result.circuits,
          raw_response: result,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ success: true, jobId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error: any) {
      clearInterval(heartbeatInterval);
      
      // Check if cancelled during processing
      const { data: currentJob } = await supabase
        .from('circuit_design_jobs')
        .select('status')
        .eq('id', jobId)
        .single();
      
      if (currentJob?.status === 'cancelled') {
        console.log(`🚫 Job ${jobId} was cancelled`);
        return new Response(
          JSON.stringify({ success: false, message: 'Job was cancelled' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Failed
      console.error(`❌ Circuit design failed for job ${jobId}:`, error);
      
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'failed',
          error_message: error.message || 'Design generation failed',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      throw error;
    }

  } catch (error: any) {
    console.error('Error in process-circuit-design-job:', error);
    
    if (jobId) {
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

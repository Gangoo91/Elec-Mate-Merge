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
    
    console.log(`🚀 Starting circuit design processing for job: ${jobId}`);

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

    // Safe progress updater
    const safeUpdateProgress = async (
      progress: number,
      step: string
    ): Promise<void> => {
      try {
        await supabase
          .from('circuit_design_jobs')
          .update({ 
            progress, 
            current_step: step,
            status: progress === 100 ? 'complete' : 'processing'
          })
          .eq('id', jobId);
      } catch (error) {
        console.error('⚠️ Progress update failed (non-fatal):', error);
      }
    };

    // Mark job as started
    await supabase
      .from('circuit_design_jobs')
      .update({ 
        status: 'processing',
        started_at: new Date().toISOString()
      })
      .eq('id', jobId);

    await safeUpdateProgress(5, 'Initializing design process...');

    // Call the existing designer-agent-v2 function
    const { data: designResult, error: designError } = await supabase.functions.invoke('designer-agent-v2', {
      body: {
        mode: 'batch-design',
        inputs: job.job_inputs
      }
    });

    if (designError) {
      throw new Error(`Design generation failed: ${designError.message}`);
    }

    if (!designResult?.success) {
      throw new Error(designResult?.error || 'Design generation failed');
    }

    console.log(`✅ Design generated successfully for job ${jobId}`);

    // Store results
    await supabase
      .from('circuit_design_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'Design complete',
        design_data: designResult.design,
        raw_response: designResult,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobId);

    return new Response(
      JSON.stringify({ 
        success: true,
        jobId,
        design: designResult.design 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error(`❌ Error processing job ${jobId}:`, error);

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

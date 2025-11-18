import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

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
        current_step: 'Analyzing circuits...',
        progress: 10
      })
      .eq('id', jobId);

    // Call designer-agent-v3 with timeout protection
    const designerUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/designer-agent-v3`;
    
    console.log(`[PROCESS-DESIGN] Calling designer-agent-v3 for ${jobInputs.circuits.length} circuits`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minute timeout

    try {
      // Update progress during design
      await supabase
        .from('circuit_design_jobs')
        .update({
          current_step: 'AI designing circuits...',
          progress: 30
        })
        .eq('id', jobId);

      const designResponse = await fetch(designerUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mode: 'direct-design',
          ...jobInputs
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!designResponse.ok) {
        const errorText = await designResponse.text();
        throw new Error(`Designer failed: ${designResponse.status} - ${errorText}`);
      }

      const designResult = await designResponse.json();

      console.log(`[PROCESS-DESIGN] Design complete, ${designResult.circuits?.length || 0} circuits generated`);

      // Update progress
      await supabase
        .from('circuit_design_jobs')
        .update({
          current_step: 'Finalizing design...',
          progress: 90
        })
        .eq('id', jobId);

      // Save completed design
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Design complete',
          design_data: designResult,
          raw_response: designResult,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      console.log(`✅ Job ${jobId} completed successfully`);

      return new Response(
        JSON.stringify({ success: true, jobId }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (designError: any) {
      clearTimeout(timeoutId);
      
      console.error(`[PROCESS-DESIGN] Design failed:`, designError);

      // Mark job as failed
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'failed',
          error_message: designError.message || 'Design generation failed',
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      throw designError;
    }

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

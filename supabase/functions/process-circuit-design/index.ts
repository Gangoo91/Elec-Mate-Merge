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

    console.log('📝 Job inputs:', JSON.stringify(job.job_inputs, null, 2));

    await safeUpdateProgress(10, 'Preparing design specification...');

    // Transform flat inputs to nested structure for designer-agent-v2
    const transformedBody = {
      mode: 'batch-design',
      supply: {
        voltage: job.job_inputs.voltage,
        phases: job.job_inputs.phases,
        ze: job.job_inputs.ze,
        earthingSystem: job.job_inputs.earthingSystem,
        ambientTemp: job.job_inputs.ambientTemp || 25,
        installationMethod: job.job_inputs.installationMethod || 'clipped-direct',
        groupingFactor: job.job_inputs.groupingFactor || 1,
        pscc: job.job_inputs.pscc,
        mainSwitchRating: job.job_inputs.mainSwitchRating
      },
      projectInfo: {
        projectName: job.job_inputs.projectName,
        location: job.job_inputs.location,
        clientName: job.job_inputs.clientName,
        electricianName: job.job_inputs.electricianName,
        installationType: job.job_inputs.propertyType,
        propertyAge: job.job_inputs.propertyAge,
        existingInstallation: job.job_inputs.existingInstallation,
        budgetLevel: job.job_inputs.budgetLevel
      },
      circuits: job.job_inputs.circuits || [],
      additionalPrompt: job.job_inputs.additionalPrompt,
      motorStartingFactor: job.job_inputs.motorStartingFactor,
      faultLevel: job.job_inputs.faultLevel,
      diversityFactor: job.job_inputs.diversityFactor
    };

    console.log('🔄 Transformed body:', JSON.stringify(transformedBody, null, 2));

    await safeUpdateProgress(15, 'Calling AI designer...');

    // Use direct fetch to avoid Supabase client timeout issues
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error('⏱️ Designer call exceeded 295s timeout');
      abortController.abort();
    }, 295000);

    let designResult;
    try {
      const functionUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/designer-agent-v2`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transformedBody),
        signal: abortController.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Designer returned ${response.status}: ${errorText}`);
      }

      designResult = await response.json();
      
      if (!designResult?.success) {
        throw new Error(designResult?.error || 'Design generation failed');
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Design generation timed out after 295 seconds. Circuit may be too complex. Try reducing the number of circuits or simplifying the design.');
      }
      
      throw error;
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

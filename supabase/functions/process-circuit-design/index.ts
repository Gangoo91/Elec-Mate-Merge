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
    
    // Create progress callback for batch updates
    const progressCallback = async (progress: number, step: string) => {
      await safeUpdateProgress(progress, step);
    };

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
      diversityFactor: job.job_inputs.diversityFactor,
      asyncMode: true,
      jobId: jobId
    };

  // Validate that we have either circuits or a description
  if (transformedBody.circuits.length === 0 && !transformedBody.additionalPrompt?.trim()) {
    throw new Error('No circuits provided and no description given. Please either add circuits manually or describe what you need in the prompt field.');
  }

    console.log('🔄 Transformed body:', JSON.stringify(transformedBody, null, 2));

    await safeUpdateProgress(15, 'Calling AI designer...');

    const functionUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/designer-agent-v2`;

    console.log('🚀 Starting designer-agent-v2 in background mode...');

    // Fire-and-forget with error handling: Start the designer without waiting
    const designerTask = fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transformedBody)
    }).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Designer agent returned error: ${response.status} - ${errorText}`);
        
        // Update job to failed with error details
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: `Designer agent failed: ${response.status} - ${errorText.substring(0, 500)}`,
            progress: 0,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
        
        console.log(`Job ${jobId} marked as failed due to agent error ${response.status}`);
      } else {
        console.log(`✅ Designer agent started successfully for job ${jobId}`);
      }
    }).catch(async (error) => {
      console.error('❌ Failed to start designer agent:', error);
      // Update job status to failed
      await supabase
        .from('circuit_design_jobs')
        .update({
          status: 'failed',
          error_message: `Failed to start design process: ${error.message}`,
          progress: 0,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
      console.log(`Job ${jobId} marked as failed due to startup error`);
    });
    
    // Keep function alive to complete error handling
    EdgeRuntime.waitUntil(designerTask);

    // Update progress to show designer started
    await safeUpdateProgress(20, 'AI circuit designer running in background...');

    console.log(`✅ Designer agent started for job ${jobId} - will update database directly`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Circuit design started - check job status for real-time updates',
        jobId: jobId
      }),
      { 
        status: 202, // 202 Accepted (processing started)
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
          progress: 0, // Reset progress on failure
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

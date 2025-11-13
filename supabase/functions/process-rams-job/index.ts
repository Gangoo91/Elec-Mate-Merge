import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { callAgentsParallel, extractAgentResults } from './_helpers/agent-caller.ts';
import { handleCompletion } from './_helpers/completion-handler.ts';
import { checkCache, storeCacheIfValid } from './_helpers/cache-handler.ts';
import { startHeartbeats, stopHeartbeats } from './_helpers/heartbeat-manager.ts';
import { updateJobProgress, updateJobProcessing, updateJobComplete, updateJobError, checkIfCancelled } from './_helpers/job-updates.ts';
import { buildCombinedData } from './_helpers/response-builder.ts';

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
  let heartbeatIntervals: { hsInterval?: number; installerInterval?: number } = {};
  
  try {
    const body = await req.json();
    jobId = body.jobId;
    console.log(`📋 Processing RAMS job: ${jobId}`);

    const { data: job, error: fetchError } = await supabase
      .from('rams_generation_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    if (job.status === 'cancelled') {
      console.log(`🚫 Job ${jobId} was already cancelled`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured');
    
    const cacheCheck = await checkCache(supabase, jobId, job, OPENAI_API_KEY);
    
    if (cacheCheck.hit) {
      return new Response(
        JSON.stringify({ success: true, jobId, cached: true, similarity: cacheCheck.similarity }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    await updateJobProcessing(supabase, jobId);
    await updateJobProgress(supabase, jobId, 10, `Running Health & Safety and Method Planner in parallel for ${job.job_scale} installation...`);

    console.log(`🚀 Starting parallel agent invocation for job: ${jobId}`);

    if (await checkIfCancelled(supabase, jobId)) {
      console.log(`🚫 Job ${jobId} cancelled before agent invocation`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    heartbeatIntervals = startHeartbeats(supabase, jobId, (id) => checkIfCancelled(supabase, id));

    const { hsResult, installerResult } = await callAgentsParallel(
      supabase,
      jobId,
      {
        projectName: job.project_info.projectName,
        location: job.project_info.location,
        contractor: job.project_info.contractor,
        supervisor: job.project_info.supervisor,
        assessor: job.project_info.assessor
      },
      job.job_description
    );

    stopHeartbeats(heartbeatIntervals);

    if (await checkIfCancelled(supabase, jobId)) {
      console.log(`🚫 Job ${jobId} cancelled after agent completion`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { hsData, hsError, installerData, installerError } = extractAgentResults(hsResult, installerResult);

    console.log(`✅ Health-safety completed for job: ${jobId}`);
    console.log('🔍 [DIAGNOSTIC] H&S data:', {
      hasData: !!hsData,
      hazardsCount: hsData?.data?.hazards?.length || 0,
      ppeCount: hsData?.data?.ppe?.length || 0
    });

    await updateJobProgress(supabase, jobId, 45, 'Health & Safety analysis complete. Finalizing installation steps...');
    console.log(`✅ Installer completed for job: ${jobId}`);
    await updateJobProgress(supabase, jobId, 85, 'Finalizing installation steps and method statement...');

    // PHASE 3: Graceful Degradation - Handle partial completions
    const completionResult = await handleCompletion(
      supabase,
      jobId,
      job,
      hsData,
      hsError,
      installerData,
      installerError
    );

    // If partial or failed, return early
    if (completionResult.response) {
      return completionResult.response;
    }

    // Continue with full success processing
    const projectDetails = {
      projectName: job.project_info.projectName,
      location: job.project_info.location,
      contractor: job.project_info.contractor,
      supervisor: job.project_info.supervisor,
      assessor: job.project_info.assessor
    };

    const { combinedRAMSData, finalMethodData } = buildCombinedData(hsData, installerData, projectDetails);

    await updateJobComplete(supabase, jobId, combinedRAMSData, finalMethodData, hsData, installerData);

    // Store in cache if both outputs are valid
    await storeCacheIfValid(
      supabase,
      job,
      combinedRAMSData,
      finalMethodData,
      OPENAI_API_KEY
    );

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Job processing failed:', error);
    
    stopHeartbeats(heartbeatIntervals);
    await updateJobError(supabase, jobId, error.message);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

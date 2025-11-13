import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { checkRAMSCache, storeRAMSCache } from '../_shared/rams-cache.ts';
import { 
  transformHealthSafetyResponse, 
  extractEmergencyContacts,
  calculateOverallRiskLevel,
  calculateTotalTime 
} from './_helpers/transformers.ts';
import { callAgentsParallel, extractAgentResults } from './_helpers/agent-caller.ts';

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
  let hsHeartbeatInterval: number | undefined;
  let installerHeartbeatInterval: number | undefined;
  
  const checkIfCancelled = async (jobId: string): Promise<boolean> => {
    const { data } = await supabase
      .from('rams_generation_jobs')
      .select('status')
      .eq('id', jobId)
      .single();
    
    return data?.status === 'cancelled';
  };
  
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

    console.log('🔍 Checking semantic cache...');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured');
    
    const cacheResult = await checkRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      openAiKey: OPENAI_API_KEY
    });
    
    if (cacheResult.hit && cacheResult.data) {
      console.log('🎉 Cache HIT - serving instant result');
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Completed (served from cache)',
          rams_data: cacheResult.data.rams_data,
          method_data: cacheResult.data.method_data,
          completed_at: new Date().toISOString(),
          generation_metadata: { 
            cache_hit: true,
            similarity: cacheResult.data.similarity,
            cache_hit_count: cacheResult.data.hit_count
          }
        })
        .eq('id', jobId);
      
      return new Response(
        JSON.stringify({ success: true, jobId, cached: true, similarity: cacheResult.data.similarity }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('❌ Cache miss - proceeding with full generation');
    
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        current_step: 'Analysing job description and identifying potential hazards...',
        progress: 5
      })
      .eq('id', jobId);

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        current_step: `Running Health & Safety and Method Planner in parallel for ${job.job_scale} installation...`,
        progress: 10
      })
      .eq('id', jobId);

    console.log(`🚀 Starting parallel agent invocation for job: ${jobId}`);

    if (await checkIfCancelled(jobId)) {
      console.log(`🚫 Job ${jobId} cancelled before agent invocation`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let hsHeartbeatProgress = 15;
    hsHeartbeatInterval = setInterval(async () => {
      if (await checkIfCancelled(jobId!)) {
        console.log(`🚫 Job ${jobId} cancelled during H&S heartbeat`);
        clearInterval(hsHeartbeatInterval);
        clearInterval(installerHeartbeatInterval);
        return;
      }
      if (hsHeartbeatProgress <= 45) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: hsHeartbeatProgress,
            current_step: 'Analysing risks and generating control measures...'
          })
          .eq('id', jobId);
        hsHeartbeatProgress += 5;
      }
    }, 15000);

    let installerHeartbeatProgress = 45;
    installerHeartbeatInterval = setInterval(async () => {
      if (await checkIfCancelled(jobId!)) {
        console.log(`🚫 Job ${jobId} cancelled during Installer heartbeat`);
        clearInterval(hsHeartbeatInterval);
        clearInterval(installerHeartbeatInterval);
        return;
      }
      if (installerHeartbeatProgress <= 80) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: installerHeartbeatProgress,
            current_step: 'Creating installation steps and technical specifications...'
          })
          .eq('id', jobId);
        installerHeartbeatProgress += 5;
      }
    }, 15000);

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

    clearInterval(hsHeartbeatInterval);
    clearInterval(installerHeartbeatInterval);

    if (await checkIfCancelled(jobId)) {
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

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 45,
        current_step: 'Health & Safety analysis complete. Finalizing installation steps...',
        raw_hs_response: hsData
      })
      .eq('id', jobId);

    console.log(`✅ Installer completed for job: ${jobId}`);

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 85,
        current_step: 'Finalizing installation steps and method statement...'
      })
      .eq('id', jobId);

    if (hsError && installerError) {
      throw new Error('Both agents failed');
    }

    if (hsError) {
      console.warn('⚠️ Health & Safety failed but Installer succeeded');
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'partial',
          progress: 100,
          current_step: 'Method statement generated (Health & Safety timed out)',
          method_data: installerData?.data,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
      
      return new Response(
        JSON.stringify({ success: true, jobId, partial: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const projectDetails = {
      projectName: job.project_info.projectName,
      location: job.project_info.location,
      contractor: job.project_info.contractor,
      supervisor: job.project_info.supervisor,
      assessor: job.project_info.assessor
    };

    const transformedRAMSData = transformHealthSafetyResponse(hsData, projectDetails);
    
    if (!transformedRAMSData) {
      throw new Error('Failed to transform Health & Safety data');
    }

    console.log('✅ Transformed RAMS data:', {
      risksCount: transformedRAMSData.risks?.length || 0,
      ppeCount: transformedRAMSData.ppeDetails?.length || 0
    });

    const emergencyContacts = extractEmergencyContacts(installerData);
    console.log('🚨 Emergency contacts extracted:', emergencyContacts);

    const combinedRAMSData = {
      ...transformedRAMSData,
      ...emergencyContacts
    };

    const finalMethodData = installerData?.data ? {
      ...installerData.data,
      ...emergencyContacts,
      jobTitle: installerData.data.jobTitle || projectDetails.projectName || 'Electrical Installation',
      location: installerData.data.location || projectDetails.location,
      contractor: installerData.data.contractor || projectDetails.contractor,
      supervisor: installerData.data.supervisor || projectDetails.supervisor,
      overallRiskLevel: installerData.data.overallRiskLevel || calculateOverallRiskLevel(installerData.data.riskAssessment),
      totalEstimatedTime: installerData.data.totalEstimatedTime || calculateTotalTime(installerData.data.steps || [], installerData)
    } : null;

    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'RAMS generation complete!',
        rams_data: combinedRAMSData,
        ...(finalMethodData ? { method_data: finalMethodData } : {}),
        ...(installerData ? { raw_installer_response: installerData } : {}),
        completed_at: new Date().toISOString(),
        generation_metadata: { cache_hit: false }
      })
      .eq('id', jobId);

    if (combinedRAMSData && finalMethodData) {
      console.log('💾 Storing result in semantic cache...');
      await storeRAMSCache({
        supabase,
        jobDescription: job.job_description,
        workType: job.job_scale,
        jobScale: job.job_scale,
        ramsData: combinedRAMSData,
        methodData: finalMethodData,
        openAiKey: OPENAI_API_KEY
      });
    }

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Job processing failed:', error);
    
    if (hsHeartbeatInterval) clearInterval(hsHeartbeatInterval);
    if (installerHeartbeatInterval) clearInterval(installerHeartbeatInterval);
    
    if (jobId) {
      let friendlyMessage = 'Generation failed';
      if (error.message?.includes('timeout') || error.message?.includes('150000ms')) {
        friendlyMessage = 'Generation timeout - please try a simpler job description';
      } else if (error.message?.includes('cancelled')) {
        friendlyMessage = 'Job was cancelled';
      }

      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          progress: 0,
          current_step: friendlyMessage,
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

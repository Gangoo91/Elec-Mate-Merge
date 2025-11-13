/**
 * Unified RAMS Generator with Job Tracking
 * Simplified architecture with direct progress updates
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateHealthSafety } from '../_agents/health-safety-core.ts';
import { generateMethodStatement } from '../_agents/installer-core.ts';
import { transformHealthSafetyResponse } from './transformers.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

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
    
    console.log(`🚀 Starting RAMS generation for job: ${jobId}`);

    // Fetch job details
    const { data: job, error: fetchError } = await supabase
      .from('rams_generation_jobs')
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

    const projectDetails = {
      projectName: job.project_info.projectName,
      location: job.project_info.location,
      contractor: job.project_info.contractor,
      supervisor: job.project_info.supervisor,
      assessor: job.project_info.assessor
    };

    // ⚡ CRITICAL FIX #2: Fail-safe progress updater (never throws)
    const safeUpdateProgress = async (
      progress: number,
      step: string
    ): Promise<void> => {
      try {
        await supabase
          .from('rams_generation_jobs')
          .update({ progress, current_step: step })
          .eq('id', jobId);
      } catch (error) {
        console.error('⚠️ Progress update failed (non-fatal):', error);
        // NEVER throw - progress updates should never kill the job
      }
    };

    // Helper function to update agent-specific progress
    const updateAgentProgress = async (
      agent: 'hs' | 'installer',
      agentProgress: number,
      agentStatus: string,
      step: string
    ) => {
      const agentField = agent === 'hs' ? 'hs_agent_progress' : 'installer_agent_progress';
      const statusField = agent === 'hs' ? 'hs_agent_status' : 'installer_agent_status';
      
      // Update agent-specific fields
      const { data } = await supabase
        .from('rams_generation_jobs')
        .update({
          [agentField]: agentProgress,
          [statusField]: agentStatus,
          current_step: step
        })
        .eq('id', jobId)
        .select('hs_agent_progress, installer_agent_progress')
        .single();
      
      if (!data) return;
      
      // Calculate combined progress (agents run from 0-100, map to 10-90% range)
      const hsProgress = data.hs_agent_progress || 0;
      const installerProgress = data.installer_agent_progress || 0;
      const avgAgentProgress = (hsProgress + installerProgress) / 2;
      const overallProgress = Math.round(10 + (avgAgentProgress * 0.8)); // Map 0-100 to 10-90
      
      // Update overall progress
      await supabase
        .from('rams_generation_jobs')
        .update({ progress: overallProgress })
        .eq('id', jobId);
    };

    // Helper function to check if cancelled
    const checkCancelled = async (): Promise<boolean> => {
      const { data } = await supabase
        .from('rams_generation_jobs')
        .select('status')
        .eq('id', jobId)
        .single();
      return data?.status === 'cancelled';
    };

    // Update: Processing started
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'processing',
        started_at: new Date().toISOString(),
        progress: 5,
        current_step: 'Analysing job description and identifying potential hazards...'
      })
      .eq('id', jobId);

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabase
      .from('rams_generation_jobs')
      .update({
        progress: 8,
        current_step: 'Fetching regulations intelligence (shared for both agents)...'
      })
      .eq('id', jobId);

    // Fetch regulations once (shared by both agents)
    console.log('🔍 Fetching shared regulations intelligence...');
    const { searchRegulationsIntelligence } = await import('../_shared/rams-rag.ts');
    const sharedRegulations = await searchRegulationsIntelligence(job.job_description);
    console.log(`✅ Fetched ${sharedRegulations.length} shared regulations`);

    await supabase
      .from('rams_generation_jobs')
      .update({
        progress: 10,
        current_step: `Running Health & Safety and Method Planner in parallel for ${job.job_scale} installation...`,
        hs_agent_status: 'pending',
        installer_agent_status: 'pending'
      })
      .eq('id', jobId);

    console.log('🔍 Starting AI agents in parallel...');

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call both agents in parallel with progress updates
    console.log('🤖 Calling AI agents in parallel...');
    const startTime = Date.now();

    // PHASE 2: Parallel agent execution with timeout protection
    console.log('🤖 Starting parallel agents with 2.5 min timeout...');
    
    const AGENT_TIMEOUT = 150000; // 2.5 minutes
    
    const [hsResult, installerResult] = await Promise.allSettled([
      withTimeout(
        generateHealthSafety(
          job.job_description,
          projectDetails,
          async (progress: number, step: string) => {
            if (await checkCancelled()) throw new Error('Job cancelled');
            await updateAgentProgress('hs', progress, 'processing', step);
          },
          sharedRegulations
        ),
        AGENT_TIMEOUT,
        'Health & Safety Agent'
      ),
      withTimeout(
        generateMethodStatement(
          job.job_description,
          projectDetails,
          async (progress: number, step: string) => {
            if (await checkCancelled()) throw new Error('Job cancelled');
            await updateAgentProgress('installer', progress, 'processing', step);
          },
          sharedRegulations
        ),
        AGENT_TIMEOUT,
        'Installer Agent'
      )
    ]);

    if (await checkCancelled()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Agents completed in ${(duration / 1000).toFixed(1)}s`);

    // Extract results
    let hsData, hsError, installerData, installerError;

    if (hsResult.status === 'fulfilled') {
      hsData = hsResult.value;
    } else {
      hsError = hsResult.reason;
    }

    if (installerResult.status === 'fulfilled') {
      installerData = installerResult.value;
    } else {
      installerError = installerResult.reason;
    }

    const hsSucceeded = hsData && !hsError;
    const installerSucceeded = installerData && !installerError;

    // Handle total failure
    if (!hsSucceeded && !installerSucceeded) {
      console.error('❌ Both agents failed');
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          progress: 0,
          current_step: 'Both agents failed to generate content',
          error_message: `H&S Error: ${hsError?.message || 'Unknown'}, Installer Error: ${installerError?.message || 'Unknown'}`,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ success: false, error: 'Both agents failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle partial success - RAMS only
    if (hsSucceeded && !installerSucceeded) {
      console.warn('⚠️ Installer failed but Health & Safety succeeded');
      
      const transformedRAMSData = transformHealthSafetyResponse(hsData, projectDetails);
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'partial',
          progress: 100,
          current_step: 'Risk assessment complete (Method statement failed)',
          rams_data: transformedRAMSData,
          method_data: null,
          error_message: `Method statement generation failed: ${installerError?.message || 'Unknown error'}`,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ success: true, jobId, partial: true, hasRAMS: true, hasMethod: false }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Handle partial success - Method only
    if (!hsSucceeded && installerSucceeded) {
      console.warn('⚠️ Health & Safety failed but Installer succeeded');
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'partial',
          progress: 100,
          current_step: 'Method statement complete (Risk assessment failed)',
          rams_data: null,
          method_data: installerData,
          error_message: `Risk assessment generation failed: ${hsError?.message || 'Unknown error'}`,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);

      return new Response(
        JSON.stringify({ success: true, jobId, partial: true, hasRAMS: false, hasMethod: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Full success - merge results
    // ⚡ CRITICAL FIX #1: Replace undefined updateProgress with safeUpdateProgress
    await safeUpdateProgress(90, 'Finalizing risk assessment and method statement...');

    const transformedRAMSData = transformHealthSafetyResponse(hsData, projectDetails);
    
    // Build method statement data
    const finalMethodData = {
      jobTitle: projectDetails.projectName,
      location: projectDetails.location,
      contractor: projectDetails.contractor || '',
      supervisor: projectDetails.supervisor || '',
      steps: installerData.installationSteps.map((s: any, idx: number) => ({
        id: `step-${idx + 1}`,
        stepNumber: s.step,
        title: s.title,
        description: s.description,
        safetyRequirements: Array.isArray(s.safetyNotes) ? s.safetyNotes : 
                           (typeof s.safetyNotes === 'string' ? [s.safetyNotes] : []),
        equipmentNeeded: s.tools || [],
        materialsNeeded: s.materials || [],
        qualifications: s.qualifications || [],
        estimatedDuration: `${s.estimatedTime || 30} minutes`,
        riskLevel: 'medium',
        linkedHazards: s.linkedHazards || [],
        dependencies: []
      })),
      toolsRequired: installerData.toolsRequired || [],
      materialsRequired: installerData.installationSteps.flatMap((s: any) => s.materials || []),
      practicalTips: installerData.practicalTips || [],
      commonMistakes: installerData.commonMistakes || [],
      testingProcedures: installerData.testingProcedures || [],
      overallRiskLevel: 'medium',
      totalEstimatedTime: installerData.installationSteps.reduce(
        (sum: number, s: any) => sum + (s.estimatedTime || 30), 
        0
      )
    };

    // Save final results
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: 'RAMS generation complete!',
        rams_data: transformedRAMSData,
        method_data: finalMethodData,
        completed_at: new Date().toISOString(),
        generation_metadata: {
          duration,
          ragStats: {
            healthSafetyDocs: hsData._ragStats?.totalDocs || 0,
            installerDocs: installerData._ragStats?.totalDocs || 0,
            total: (hsData._ragStats?.totalDocs || 0) + (installerData._ragStats?.totalDocs || 0)
          }
        }
      })
      .eq('id', jobId);

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Generation failed:', error);

    if (jobId) {
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          error_message: error.message,
          completed_at: new Date().toISOString()
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

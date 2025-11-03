import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { checkRAMSCache, storeRAMSCache } from '../_shared/rams-cache.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * Transform health-safety-v3 response to match frontend RAMSData structure
 * Maps: hazards → risks, ppe → ppeDetails
 * PHASE 3: Enhanced with fallback logic for various response structures
 */
function transformHealthSafetyResponse(hsData: any, projectDetails?: any): any {
  console.log('🔄 [PHASE 1 DIAGNOSTIC] Starting transformation...', {
    hasData: !!hsData,
    hasDataField: !!hsData?.data,
    dataKeys: hsData?.data ? Object.keys(hsData.data) : [],
    rawType: typeof hsData
  });

  if (!hsData) {
    console.error('❌ hsData is null/undefined');
    return null;
  }

  // PHASE 3: Handle different response structures
  let sourceData = hsData.data || hsData;
  
  // If data is wrapped in a 'result' field
  if (sourceData.result) {
    console.log('📦 Found result wrapper, unwrapping...');
    sourceData = sourceData.result;
  }
  
  // If hazards are nested in riskAssessment
  if (sourceData.riskAssessment?.hazards) {
    console.log('📦 Found riskAssessment wrapper, extracting hazards...');
    sourceData.hazards = sourceData.riskAssessment.hazards;
  }
  
  console.log('🔍 [PHASE 1 DIAGNOSTIC] Source data structure:', {
    hasHazards: !!sourceData.hazards,
    hazardsType: sourceData.hazards ? typeof sourceData.hazards : 'missing',
    hazardsIsArray: Array.isArray(sourceData.hazards),
    hazardsLength: Array.isArray(sourceData.hazards) ? sourceData.hazards.length : 0,
    hasPPE: !!sourceData.ppe,
    ppeType: sourceData.ppe ? typeof sourceData.ppe : 'missing',
    ppeIsArray: Array.isArray(sourceData.ppe),
    ppeLength: Array.isArray(sourceData.ppe) ? sourceData.ppe.length : 0,
    allKeys: Object.keys(sourceData),
    firstHazard: Array.isArray(sourceData.hazards) && sourceData.hazards[0] ? Object.keys(sourceData.hazards[0]) : 'none'
  });
  
  if (!sourceData.hazards || !Array.isArray(sourceData.hazards)) {
    console.error('❌ No hazards array found in response. Available keys:', Object.keys(sourceData));
    console.error('Full source data sample:', JSON.stringify(sourceData).slice(0, 500));
    return null;
  }

  const transformed = {
    risks: sourceData.hazards.map((h: any) => ({
      id: h.id || `hazard-${Math.random().toString(36).substr(2, 9)}`,
      hazard: h.hazard || h.description || 'Unknown hazard',
      risk: h.hazard || h.description || 'Unknown risk',
      likelihood: h.likelihood || 3,
      severity: h.severity || 3,
      riskRating: h.riskScore || (h.likelihood * h.severity) || 9,
      controls: h.controlMeasure || h.controls || 'No controls specified',
      residualRisk: h.residualRisk || Math.ceil((h.riskScore || 9) * 0.3) || 3,
      linkedToStep: h.linkedToStep || 0,
      furtherAction: h.regulation || '',
      responsible: '',
      actionBy: '',
      done: false
    })),
    
    ppeDetails: (sourceData.ppe || []).map((p: any, idx: number) => ({
      id: `ppe-${p.itemNumber || idx + 1}`,
      itemNumber: p.itemNumber || idx + 1,
      ppeType: p.ppeType || 'PPE Item',
      standard: p.standard || 'N/A',
      mandatory: p.mandatory !== false,
      purpose: p.purpose || 'Protection'
    })),
    
    emergencyProcedures: sourceData.emergencyProcedures || [],
    complianceRegulations: sourceData.complianceRegulations || [],
    
    projectName: projectDetails?.projectName || '',
    location: projectDetails?.location || '',
    date: new Date().toISOString().split('T')[0],
    assessor: projectDetails?.assessor || '',
    contractor: projectDetails?.contractor || '',
    supervisor: projectDetails?.supervisor || '',
    activities: []
  };

  console.log('✅ [PHASE 1 DIAGNOSTIC] Transformation complete:', {
    inputHazards: sourceData.hazards?.length || 0,
    outputRisks: transformed.risks.length,
    inputPPE: sourceData.ppe?.length || 0,
    outputPPEDetails: transformed.ppeDetails.length,
    sampleRisk: transformed.risks[0] ? {
      id: transformed.risks[0].id,
      hazard: transformed.risks[0].hazard.slice(0, 50)
    } : 'none'
  });

  return transformed;
}

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
  
  // Helper function to check if job was cancelled
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

    // Get job details
    const { data: job, error: fetchError } = await supabase
      .from('rams_generation_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (fetchError || !job) {
      throw new Error(`Job not found: ${jobId}`);
    }

    // Check if already cancelled
    if (job.status === 'cancelled') {
      console.log(`🚫 Job ${jobId} was already cancelled`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ✅ QUICK WIN #3: Check cache first (instant response for common jobs)
    console.log('🔍 Checking semantic cache before generation...');
    
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const cacheResult = await checkRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      openAiKey: OPENAI_API_KEY
    });
    
    if (cacheResult.hit && cacheResult.data) {
      // Return cached result immediately (<1s response!)
      console.log('🎉 Cache HIT - serving instant result');
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'complete',
          progress: 100,
          current_step: 'Completed (served from cache)',
          rams_data: cacheResult.data.rams_data,  // Cached data is already transformed
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
        JSON.stringify({ 
          success: true, 
          jobId,
          cached: true,
          similarity: cacheResult.data.similarity
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('❌ Cache miss - proceeding with full generation');
    
    // Mark as processing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        status: 'processing', 
        started_at: new Date().toISOString(),
        current_step: 'Analysing job description and identifying potential hazards...',
        progress: 5
      })
      .eq('id', jobId);

    // Update: Starting parallel agent processing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        current_step: `Running Health & Safety and Method Planner in parallel for ${job.job_scale} installation...`,
        progress: 10
      })
      .eq('id', jobId);

    console.log(`🚀 Starting parallel agent invocation for job: ${jobId}`);

    // Check cancellation before starting
    if (await checkIfCancelled(jobId)) {
      console.log(`🚫 Job ${jobId} cancelled before agent invocation`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // H&S heartbeat: 15% → 45% (updates every 15s while H&S is running)
    let hsHeartbeatProgress = 15;
    hsHeartbeatInterval = setInterval(async () => {
      // Check for cancellation in heartbeat
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
    }, 15000); // Every 15 seconds

    // Installer heartbeat: 45% → 80% (updates every 15s while Installer is running)
    let installerHeartbeatProgress = 45;
    installerHeartbeatInterval = setInterval(async () => {
      // Check for cancellation in heartbeat
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
    }, 15000); // Every 15 seconds

    // Run both agents in parallel
    const hsPromiseWithTimeout = Promise.race([
      supabase.functions.invoke('health-safety-v3', {
        body: {
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Health-safety agent timeout after 240s')), 240000)
      )
    ]);

    const installerPromiseWithTimeout = Promise.race([
      supabase.functions.invoke('installer-v3', {
        body: {
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Installer agent timeout after 300s')), 300000)
      )
    ]);

    // Wait for both to complete (or fail)
    const [hsResult, installerResult] = await Promise.allSettled([
      hsPromiseWithTimeout,
      installerPromiseWithTimeout
    ]);

    // Clear both heartbeat intervals
    if (hsHeartbeatInterval) clearInterval(hsHeartbeatInterval);
    if (installerHeartbeatInterval) clearInterval(installerHeartbeatInterval);

    // Check if cancelled after agents complete
    if (await checkIfCancelled(jobId)) {
      console.log(`🚫 Job ${jobId} cancelled after agents completed`);
      return new Response(
        JSON.stringify({ success: false, message: 'Job was cancelled' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract H&S data
    let hsData, hsError;
    if (hsResult.status === 'fulfilled') {
      const result = hsResult.value as any;
      hsData = result.data;
      hsError = result.error;
      console.log(`✅ Health-safety completed for job: ${jobId}`);
      
      // PHASE 1: Detailed diagnostic logging
      console.log('🔍 [PHASE 1 DIAGNOSTIC] Health-safety raw response structure:', {
        hasData: !!hsData,
        hasDataField: !!hsData?.data,
        dataKeys: hsData?.data ? Object.keys(hsData.data) : [],
        hazardsType: hsData?.data?.hazards ? typeof hsData.data.hazards : 'missing',
        hazardsLength: Array.isArray(hsData?.data?.hazards) ? hsData.data.hazards.length : 0,
        ppeType: hsData?.data?.ppe ? typeof hsData.data.ppe : 'missing',
        ppeLength: Array.isArray(hsData?.data?.ppe) ? hsData.data.ppe.length : 0,
        fullResponseSample: JSON.stringify(hsData).slice(0, 1000)
      });

      // Update progress for H&S completion
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: 45,
          current_step: 'Health & Safety analysis complete. Finalizing installation steps...',
          raw_hs_response: hsData
        })
        .eq('id', jobId);
    } else {
      hsError = hsResult.reason;
      console.error(`❌ Health-safety failed for job: ${jobId}`, hsError);
    }

    // Extract Installer data
    let installerData, installerError;
    if (installerResult.status === 'fulfilled') {
      const result = installerResult.value as any;
      installerData = result.data;
      installerError = result.error;
      console.log(`✅ Installer completed for job: ${jobId}`);

      // Update progress for Installer completion
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          progress: 85,
          current_step: 'Method statement complete. Finalizing documentation...',
          raw_installer_response: installerData
        })
        .eq('id', jobId);
    } else {
      installerError = installerResult.reason;
      console.error(`❌ Installer failed for job: ${jobId}`, installerError);
    }

    // Handle partial or complete failure
    if ((hsError || !hsData) && (installerError || !installerData)) {
      throw new Error(`Both agents failed. H&S: ${hsError?.message ?? 'Unknown error'}. Installer: ${installerError?.message ?? 'Unknown error'}`);
    }
    
    if (hsError || !hsData) {
      console.warn('⚠️ Health-safety failed but Installer succeeded - returning partial result');
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          current_step: '⚠️ Partial result: Health & Safety analysis failed, but installation steps generated successfully.',
        })
        .eq('id', jobId);
    }

    if (installerError || !installerData) {
      console.warn('⚠️ Installer failed but Health-safety succeeded - returning partial result');
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          current_step: '⚠️ Partial result: Installation method failed, but safety analysis completed successfully.',
        })
        .eq('id', jobId);
    }

    // Update: Finalizing
    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 85,
        current_step: 'Linking hazards to installation steps...'
      })
      .eq('id', jobId);

    await supabase
      .from('rams_generation_jobs')
      .update({ 
        progress: 95,
        current_step: 'Finalising documentation formatting...'
      })
      .eq('id', jobId);

    // ✅ QUICK WIN #3: Store in cache for future reuse
    console.log('💾 Storing result in semantic cache...');
    
    // Extract project details from the job to pass through to final document
    const projectDetails = {
      projectName: job.project_name || job.prompt?.split('\n')[0]?.substring(0, 100) || 'Electrical Installation Project',
      location: job.location || 'To be specified',
      contractor: 'To be specified',
      supervisor: 'To be specified',
      assessor: 'Site Electrician',
      jobScale: job.job_scale
    };
    
    // Safe transformation with fallback - guard against null hsData and pass project details
    const transformedRamsData = hsData ? transformHealthSafetyResponse(hsData, projectDetails) : null;
    let ramsDataFinal = transformedRamsData || {
      projectName: projectDetails.projectName,
      location: projectDetails.location,
      date: new Date().toISOString().split('T')[0],
      assessor: projectDetails.assessor,
      contractor: projectDetails.contractor,
      supervisor: projectDetails.supervisor,
      activities: [],
      risks: [],
      ppeDetails: [],
      emergencyProcedures: ['⚠️ Emergency procedures could not be generated. Please add manually.'],
      complianceRegulations: []
    };
    
    // Sort hazards by risk rating (highest first) and renumber as 1, 2, 3...
    if (ramsDataFinal.risks && ramsDataFinal.risks.length > 0) {
      ramsDataFinal.risks.sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0));
      ramsDataFinal.risks.forEach((risk, index) => {
        risk.id = `${index + 1}`;
      });
    }
    
    // Merge installer data with RAMS data for complete document
    const combinedRAMSData = {
      ...ramsDataFinal,
      // Ensure project details are populated
      projectName: projectDetails.projectName,
      location: projectDetails.location,
      contractor: projectDetails.contractor,
      supervisor: projectDetails.supervisor,
      // Merge method statement details from installer
      ...(installerData?.data && {
        practicalTips: installerData.data.practicalTips,
        commonMistakes: installerData.data.commonMistakes,
        toolsRequired: installerData.data.toolsRequired,
        materialsRequired: installerData.data.materialsRequired,
        duration: installerData.data.duration,
        teamSize: installerData.data.teamSize
      })
    };
    
    await storeRAMSCache({
      supabase,
      jobDescription: job.job_description,
      workType: job.job_scale,
      jobScale: job.job_scale,
      ramsData: combinedRAMSData,
      methodData: installerData?.data ?? null, // ✅ Guard against null installerData
      openAiKey: OPENAI_API_KEY
    });
    
    // Determine final status message
    const currentStepMessage = 
      (hsData && installerData) ? '✨ Generation complete!' :
      (!hsData && installerData) ? '✨ Generation complete (partial - health-safety timeout)' :
      (hsData && !installerData) ? '✨ Generation complete (partial - method statement timeout)' :
      'Generation complete (partial results)';
    
    // Build safe metadata object with null guards
    const generationMetadata: any = {
      hs_timing: hsData?.timing ?? null,
      installer_timing: installerData?.timing ?? null,
      cache_hit: false,
      hs_transform_fallback: !transformedRamsData,
      partial_hs: !hsData || !!hsError,
      partial_installer: !installerData || !!installerError,
      ...(hsData ? { hs_input_preview: JSON.stringify(hsData).slice(0, 300) } : {})
    };
    
    // Mark complete with safe property access and merged data
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: currentStepMessage,
        rams_data: combinedRAMSData,
        ...(installerData?.data ? { method_data: installerData.data } : {}),
        ...(installerData ? { raw_installer_response: installerData } : {}),
        completed_at: new Date().toISOString(),
        generation_metadata: generationMetadata
      })
      .eq('id', jobId);

    console.log(`🎉 Job complete: ${jobId}`);

    return new Response(
      JSON.stringify({ success: true, jobId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('❌ Job processing failed:', error);
    
    // Clear heartbeat intervals
    if (hsHeartbeatInterval) clearInterval(hsHeartbeatInterval);
    if (installerHeartbeatInterval) clearInterval(installerHeartbeatInterval);
    
    // jobId already extracted at top of try block
    if (jobId) {
      // Provide a user-friendly current_step message based on the error
      let friendlyMessage = 'Generation failed';
      if (error.message?.includes('timeout') || error.message?.includes('150000ms')) {
        friendlyMessage = 'AI agents timed out - job too complex. Please try a simpler job or break it into smaller tasks.';
      } else if (error.message?.includes('OPENAI_API_KEY') || error.message?.includes('API key')) {
        friendlyMessage = 'AI service configuration issue - please contact support';
      } else if (error.message?.includes('cancelled')) {
        friendlyMessage = 'Generation was cancelled by user';
      } else {
        friendlyMessage = `Generation failed: ${error.message?.substring(0, 100)}`;
      }
      
      await supabase
        .from('rams_generation_jobs')
        .update({
          status: 'failed',
          current_step: friendlyMessage,
          error_message: error.message,
          completed_at: new Date().toISOString(),
          generation_metadata: {
            phase: 'orchestrator',
            error_type: error.name || 'Error',
            reason: error.message?.slice(0, 300),
            stack_preview: error.stack?.slice(0, 500)
          }
        })
        .eq('id', jobId);
    }

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

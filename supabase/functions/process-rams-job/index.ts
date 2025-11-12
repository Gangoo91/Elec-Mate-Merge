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

    // Track start time for detailed logging
    const agentStartTime = Date.now();
    
    // H&S heartbeat: 15% → 45% (updates every 30s while H&S is running)
    let hsHeartbeatProgress = 15;
    let hsElapsedSeconds = 0;
    hsHeartbeatInterval = setInterval(async () => {
      // Check for cancellation in heartbeat
      if (await checkIfCancelled(jobId!)) {
        console.log(`🚫 Job ${jobId} cancelled during H&S heartbeat`);
        clearInterval(hsHeartbeatInterval);
        clearInterval(installerHeartbeatInterval);
        return;
      }
      hsElapsedSeconds += 30;
      if (hsHeartbeatProgress <= 45) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: hsHeartbeatProgress,
            current_step: `Analysing risks and generating control measures... (${hsElapsedSeconds}s elapsed)`
          })
          .eq('id', jobId);
        hsHeartbeatProgress += 5;
      }
    }, 30000); // Every 30 seconds

    // Installer heartbeat: 45% → 80% (updates every 30s while Installer is running)
    let installerHeartbeatProgress = 45;
    let installerElapsedSeconds = 0;
    installerHeartbeatInterval = setInterval(async () => {
      // Check for cancellation in heartbeat
      if (await checkIfCancelled(jobId!)) {
        console.log(`🚫 Job ${jobId} cancelled during Installer heartbeat`);
        clearInterval(hsHeartbeatInterval);
        clearInterval(installerHeartbeatInterval);
        return;
      }
      installerElapsedSeconds += 30;
      if (installerHeartbeatProgress <= 80) {
        await supabase
          .from('rams_generation_jobs')
          .update({ 
            progress: installerHeartbeatProgress,
            current_step: `Creating installation steps and technical specifications... (${installerElapsedSeconds}s elapsed)`
          })
          .eq('id', jobId);
        installerHeartbeatProgress += 5;
      }
    }, 30000); // Every 30 seconds

    // Run both agents in parallel with 7-minute timeout
    console.log('🚀 Starting agents with 420s (7 min) timeout...');
    
    const hsPromiseWithTimeout = Promise.race([
      supabase.functions.invoke('health-safety-v3', {
        body: {
          query: job.job_description,
          userContext: { jobScale: job.job_scale },
          projectContext: job.project_info
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Health-safety agent timeout after 420s (7 minutes)')), 420000)
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
        setTimeout(() => reject(new Error('Installer agent timeout after 420s (7 minutes)')), 420000)
      )
    ]);

    // Wait for both to complete (or fail)
    const [hsResult, installerResult] = await Promise.allSettled([
      hsPromiseWithTimeout,
      installerPromiseWithTimeout
    ]);

    // Calculate total agent execution time
    const agentEndTime = Date.now();
    const totalAgentDuration = ((agentEndTime - agentStartTime) / 1000).toFixed(1);
    console.log(`⏱️ Both agents completed in ${totalAgentDuration}s`);
    
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

    // Extract H&S data with detailed error logging
    let hsData, hsError, hsSuccess = false;
    let hsDuration = 'unknown';
    if (hsResult.status === 'fulfilled') {
      const result = hsResult.value as any;
      hsData = result.data;
      hsError = result.error;
      hsSuccess = !!hsData && !hsError;
      hsDuration = `${totalAgentDuration}s`;
      console.log(`✅ Health-safety completed for job: ${jobId}`, { 
        success: hsSuccess, 
        hasData: !!hsData,
        duration: hsDuration
      });
      
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
      hsDuration = `timeout at ${totalAgentDuration}s`;
      const isTimeout = hsError?.message?.includes('timeout');
      console.error(`❌ Health-safety ${isTimeout ? 'TIMED OUT' : 'FAILED'} for job: ${jobId}`, { 
        error: hsError?.message || hsError, 
        errorCode: hsError?.code,
        errorType: hsError instanceof Error ? hsError.constructor.name : typeof hsError,
        duration: hsDuration,
        isTimeout
      });
    }

    // Extract Installer data with detailed error logging
    let installerData, installerError, installerSuccess = false;
    let installerDuration = 'unknown';
    if (installerResult.status === 'fulfilled') {
      const result = installerResult.value as any;
      installerData = result.data;
      installerError = result.error;
      installerSuccess = !!installerData && !installerError;
      installerDuration = `${totalAgentDuration}s`;
      console.log(`✅ Installer completed for job: ${jobId}`, { 
        success: installerSuccess, 
        hasData: !!installerData,
        duration: installerDuration
      });

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
      installerDuration = `timeout at ${totalAgentDuration}s`;
      const isTimeout = installerError?.message?.includes('timeout');
      console.error(`❌ Installer ${isTimeout ? 'TIMED OUT' : 'FAILED'} for job: ${jobId}`, { 
        error: installerError?.message || installerError,
        errorCode: installerError?.code,
        errorType: installerError instanceof Error ? installerError.constructor.name : typeof installerError,
        duration: installerDuration,
        isTimeout
      });
    }

    // Handle partial or complete failure with better error messages
    const hsHasData = hsData && !hsError && hsData.data;
    const installerHasData = installerData && !installerError && installerData.data;
    
    if (!hsHasData && !installerHasData) {
      const hsMsg = hsError?.message || (hsError instanceof Error ? hsError.toString() : JSON.stringify(hsError));
      const installerMsg = installerError?.message || (installerError instanceof Error ? installerError.toString() : JSON.stringify(installerError));
      throw new Error(`Both agents failed. H&S: ${hsMsg}. Installer: ${installerMsg}`);
    }
    
    if (!hsHasData) {
      console.warn('⚠️ Health-safety failed but Installer succeeded - returning partial result');
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          current_step: '⚠️ Partial: Risk assessment failed, but installation steps generated.',
          has_rams_data: false,
          has_method_data: true
        })
        .eq('id', jobId);
    }

    if (!installerHasData) {
      console.warn('⚠️ Installer failed but Health-safety succeeded - returning partial result');
      await supabase
        .from('rams_generation_jobs')
        .update({ 
          current_step: '⚠️ Partial: Method statement failed, but risk assessment completed.',
          has_rams_data: true,
          has_method_data: false
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
    const projectInfo = job.project_info || {};
    const projectDetails = {
      projectName: job.project_name || 
                   projectInfo.projectName || 
                   job.prompt?.split('\n')[0]?.substring(0, 100) || 
                   'Electrical Installation Project',
      location: job.location || 
                projectInfo.location || 
                projectInfo.siteAddress || 
                'To be specified',
      contractor: projectInfo.contractor || 
                  projectInfo.companyName || 
                  'To be specified',
      supervisor: projectInfo.supervisor || 
                  projectInfo.supervisorName || 
                  'To be specified',
      assessor: projectInfo.assessor || 
                projectInfo.assessorName || 
                'Site Electrician',
      jobScale: job.job_scale,
      // Preserve emergency contacts
      siteManagerName: projectInfo.siteManagerName || '',
      siteManagerPhone: projectInfo.siteManagerPhone || '',
      firstAiderName: projectInfo.firstAiderName || '',
      firstAiderPhone: projectInfo.firstAiderPhone || '',
      safetyOfficerName: projectInfo.safetyOfficerName || '',
      safetyOfficerPhone: projectInfo.safetyOfficerPhone || '',
      assemblyPoint: projectInfo.assemblyPoint || ''
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
      // Ensure ALL project details are populated
      projectName: projectDetails.projectName,
      location: projectDetails.location,
      contractor: projectDetails.contractor,
      supervisor: projectDetails.supervisor,
      assessor: projectDetails.assessor,
      // Include emergency contacts
      siteManagerName: projectDetails.siteManagerName,
      siteManagerPhone: projectDetails.siteManagerPhone,
      firstAiderName: projectDetails.firstAiderName,
      firstAiderPhone: projectDetails.firstAiderPhone,
      safetyOfficerName: projectDetails.safetyOfficerName,
      safetyOfficerPhone: projectDetails.safetyOfficerPhone,
      assemblyPoint: projectDetails.assemblyPoint,
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
    
    // Helper: Determine what phase this step is (planning, procurement, installation, testing, isolation)
    function determineStepPhase(stepText: string): string {
      if (/planning|survey|inspect site|assess|review|check site|preliminary|walkthrough/i.test(stepText)) {
        return 'planning';
      }
      if (/procurement|ordering|purchase|supplier|materials list|equipment list|obtain|acquire/i.test(stepText)) {
        return 'procurement';
      }
      if (/isolat|shutdown|de-energi|lock.?off|prove dead|test dead|permit to work/i.test(stepText)) {
        return 'isolation';
      }
      if (/test|commission|verify|measure|inspect after|certificate|continuity|insulation resistance/i.test(stepText)) {
        return 'testing';
      }
      if (/install|mount|fix|terminate|connect|run cable|drill|route|pull cable/i.test(stepText)) {
        return 'installation';
      }
      return 'general';
    }

    // Helper: Check if a hazard is relevant to a specific step
    function isHazardRelevantToStep(
      riskText: string,
      stepText: string,
      stepPhase: string,
      hazardLinkedStep: number,
      currentStepNumber: number
    ): boolean {
      // 1. If hazard specifies a step number, only link to that step
      if (hazardLinkedStep > 0 && hazardLinkedStep === currentStepNumber) {
        return true;
      }
      
      // 2. If hazard is general (linkedToStep = 0), apply phase logic
      if (hazardLinkedStep === 0) {
        // Planning phase: Only link planning/survey hazards
        if (stepPhase === 'planning') {
          return /slip|trip|fall(?! from height)|unauthori|access|survey|site visit|traffic|pedestrian/i.test(riskText) &&
                 !/live|electric shock|voltage|energi|battery acid|thermal|drilling|height work/i.test(riskText);
        }
        
        // Procurement phase: Only link admin/logistics hazards when receiving deliveries
        if (stepPhase === 'procurement') {
          return (/manual handling|lifting|vehicle|delivery|storage/i.test(riskText) &&
                  (stepText.includes('receiv') || stepText.includes('collect') || stepText.includes('deliver'))) ||
                 /ordering|specification/i.test(riskText);
        }
        
        // Isolation phase: Electrical hazards ONLY
        if (stepPhase === 'isolation') {
          return /electric|shock|live|voltage|energi|arc flash|isolation|permit/i.test(riskText);
        }
        
        // Installation phase: Physical work hazards
        if (stepPhase === 'installation') {
          return /electric|drill|dust|height|manual handling|vibration|noise|cut|sharp|cable|fixing|power tool/i.test(riskText);
        }
        
        // Testing phase: Testing-specific hazards
        if (stepPhase === 'testing') {
          return /electric|shock|test equipment|meter|voltage indicator|proving unit|continuity/i.test(riskText);
        }
      }
      
      return false;
    }

    // Link hazards to method statement steps (INTELLIGENT PHASE-AWARE VERSION)
    if (combinedRAMSData.risks && installerData?.data?.steps) {
      installerData.data.steps.forEach((step: any, stepIndex: number) => {
        if (!step.linkedHazards) {
          step.linkedHazards = [];
        }
        
        const stepDesc = (step.description || '').toLowerCase();
        const stepTitle = (step.title || '').toLowerCase();
        const stepSafety = (step.safetyRequirements || []).join(' ').toLowerCase();
        const combinedStepText = `${stepTitle} ${stepDesc} ${stepSafety}`;
        
        // Determine step phase
        const stepPhase = determineStepPhase(combinedStepText);
        
        // Find hazards that match this specific phase and step activities
        combinedRAMSData.risks.forEach((risk: any) => {
          const riskHazard = (risk.hazard || '').toLowerCase();
          const riskDesc = (risk.risk || '').toLowerCase();
          const riskControls = (risk.controls || '').toLowerCase();
          const combinedRiskText = `${riskHazard} ${riskDesc} ${riskControls}`;
          
          // Check if hazard is relevant to this step
          const isRelevant = isHazardRelevantToStep(
            combinedRiskText,
            combinedStepText,
            stepPhase,
            risk.linkedToStep || 0,
            stepIndex + 1
          );
          
          if (isRelevant && !step.linkedHazards.includes(risk.hazard)) {
            step.linkedHazards.push(risk.hazard);
          }
        });
        
        // Limit to top 4 most relevant hazards per step
        step.linkedHazards = step.linkedHazards.slice(0, 4);
      });
    }
    
    // ✅ PHASE 4: Validate result before caching
    console.log('💾 Checking if result is cacheable...');
    
    const hasMethods = installerData?.data?.steps && installerData.data.steps.length > 0;
    const hasHazards = combinedRAMSData?.risks && combinedRAMSData.risks.length > 0;
    
    if (hasMethods && hasHazards) {
      console.log('✅ Result is complete - storing in cache');
      await storeRAMSCache({
        supabase,
        jobDescription: job.job_description,
        workType: job.job_scale,
        jobScale: job.job_scale,
        ramsData: combinedRAMSData,
        methodData: installerData.data,
        openAiKey: OPENAI_API_KEY
      });
    } else {
      console.log('⚠️ Result is partial - skipping cache write', {
        hasMethods,
        hasHazards,
        methodSteps: installerData?.data?.steps?.length || 0,
        hazards: combinedRAMSData?.risks?.length || 0
      });
    }
    
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
    
    // Extract emergency contacts from project_info and add to method_data
    const emergencyContacts = job.project_info ? {
      siteManagerName: job.project_info.siteManagerName || "",
      siteManagerPhone: job.project_info.siteManagerPhone || "",
      firstAiderName: job.project_info.firstAiderName || "",
      firstAiderPhone: job.project_info.firstAiderPhone || "",
      safetyOfficerName: job.project_info.safetyOfficerName || "",
      safetyOfficerPhone: job.project_info.safetyOfficerPhone || "",
      assemblyPoint: job.project_info.assemblyPoint || ""
    } : {};

    // Calculate overall risk level from risk assessment
    const calculateOverallRiskLevel = (riskAssessment: any): string => {
      if (!riskAssessment?.hazards || riskAssessment.hazards.length === 0) return 'low';
      const highRiskCount = riskAssessment.hazards.filter((h: any) => 
        h.riskLevel?.toLowerCase() === 'high' || h.riskScore >= 12
      ).length;
      const mediumRiskCount = riskAssessment.hazards.filter((h: any) => 
        h.riskLevel?.toLowerCase() === 'medium' || (h.riskScore >= 6 && h.riskScore < 12)
      ).length;
      
      if (highRiskCount > 0) return 'high';
      if (mediumRiskCount > 2) return 'medium';
      if (mediumRiskCount > 0) return 'medium';
      return 'low';
    };

    // Calculate total estimated time from steps
    const calculateTotalTime = (steps: any[]): string => {
      if (!steps || steps.length === 0) return 'Not specified';
      // If duration is already provided, use it
      if (installerData?.data?.duration) return installerData.data.duration;
      
      // Try to sum up individual step durations if available
      const hasStepDurations = steps.some(s => s.estimatedDuration);
      if (hasStepDurations) {
        const totalMinutes = steps.reduce((sum, step) => {
          const duration = step.estimatedDuration || '';
          const match = duration.match(/(\d+)\s*(min|hour|hr)/i);
          if (match) {
            const value = parseInt(match[1]);
            const unit = match[2].toLowerCase();
            return sum + (unit.includes('hour') || unit.includes('hr') ? value * 60 : value);
          }
          return sum;
        }, 0);
        
        if (totalMinutes >= 60) {
          const hours = Math.floor(totalMinutes / 60);
          const mins = totalMinutes % 60;
          return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
        }
        return `${totalMinutes}min`;
      }
      
      return 'Not specified';
    };

    // Merge emergency contacts and top-level fields into method_data
    const finalMethodData = installerData?.data ? {
      ...installerData.data,
      ...emergencyContacts,
      // Add top-level fields for UI display
      jobTitle: installerData.data.jobTitle || projectDetails.projectName || 'Electrical Installation',
      location: installerData.data.location || projectDetails.location,
      contractor: installerData.data.contractor || projectDetails.contractor,
      supervisor: installerData.data.supervisor || projectDetails.supervisor,
      overallRiskLevel: installerData.data.overallRiskLevel || 
                        calculateOverallRiskLevel(installerData.data.riskAssessment),
      totalEstimatedTime: installerData.data.totalEstimatedTime || 
                          calculateTotalTime(installerData.data.steps || [])
    } : null;

    console.log('🚨 Emergency contacts extracted:', emergencyContacts);
    console.log('📊 Method data top-level fields:', {
      jobTitle: finalMethodData?.jobTitle,
      overallRiskLevel: finalMethodData?.overallRiskLevel,
      totalEstimatedTime: finalMethodData?.totalEstimatedTime,
      stepsCount: finalMethodData?.steps?.length
    });

    // Mark complete with safe property access and merged data
    await supabase
      .from('rams_generation_jobs')
      .update({
        status: 'complete',
        progress: 100,
        current_step: currentStepMessage,
        rams_data: combinedRAMSData,
        ...(finalMethodData ? { method_data: finalMethodData } : {}),
        ...(installerData ? { raw_installer_response: installerData } : {}),
        completed_at: new Date().toISOString(),
        generation_metadata: generationMetadata
      })
      .eq('id', jobId);

    // ✅ PHASE 5: Job summary logging
    console.log('📊 =============== RAMS JOB SUMMARY ===============');
    console.log('📊 Job ID:', jobId);
    console.log('📊 Duration:', `${((Date.now() - Date.parse(job.created_at)) / 1000).toFixed(1)}s`);
    console.log('📊 Health & Safety Agent:', hsHasData ? '✅ SUCCESS' : '❌ FAILED');
    console.log('📊 Installer Agent:', installerHasData ? '✅ SUCCESS' : '❌ FAILED');
    console.log('📊 Hazards Generated:', combinedRAMSData?.risks?.length || 0);
    console.log('📊 Method Steps Generated:', installerData?.data?.steps?.length || 0);
    console.log('📊 Cache Write:', (hsHasData && installerHasData) ? '✅ YES' : '⚠️ SKIPPED (partial)');
    console.log('📊 Final Status:', (hsHasData && installerHasData) ? 'COMPLETE' : 'PARTIAL');
    console.log('📊 ================================================');

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

/**
 * VERSION: v2.1.0 - Enhanced Designer Context (2025-11-22)
 * Parallel Circuit Design Orchestrator
 * Runs designer-agent-v3 and installation-method-agent in parallel
 * Based on proven AI RAMS dual-agent pattern
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'process-circuit-design-parallel' });

  let jobId: string | null = null;
  
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    jobId = body.jobId;
    logger.info('Starting parallel circuit design', { jobId });

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('circuit_design_jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      logger.error('Job not found', { jobId, error: jobError });
      return new Response(
        JSON.stringify({ error: 'Job not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update to processing (0-5%)
    await supabase
      .from('circuit_design_jobs')
      .update({
        status: 'processing',
        progress: 5,
        current_step: 'Initializing parallel agents...',
        designer_status: 'pending',
        installer_status: 'pending',
        started_at: new Date().toISOString()
      })
      .eq('id', jobId);

    logger.info('Job status updated to processing');

    // ===========================================
    // PARALLEL AGENT EXECUTION
    // ===========================================
    
    // Start both agents immediately
    const [designerJobId, installerJobId] = await Promise.all([
      startDesignerAgent(supabase, jobId, job.job_inputs, job.user_id, logger),
      startInstallationAgent(supabase, jobId, job.job_inputs, job.user_id, logger)
    ]);

    logger.info('Both agents started', { designerJobId, installerJobId });

    // Monitor both agents with progress mapping
    await monitorBothAgents(supabase, jobId, installerJobId, logger);

    // Merge results (95-100%)
    await updateJob(supabase, jobId, { 
      progress: 95, 
      current_step: 'Merging circuit designs with installation methods...' 
    });

    const mergedData = await mergeResults(supabase, jobId, installerJobId, logger);

    // Mark as complete
    await updateJob(supabase, jobId, {
      status: 'complete',
      progress: 100,
      current_step: 'Design complete!',
      design_data: mergedData,
      designer_status: 'complete',
      installer_status: 'complete',
      completed_at: new Date().toISOString()
    });

    logger.info('✅ Parallel design generation complete', { jobId });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Parallel design complete',
        jobId: jobId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    logger.error('Parallel orchestration failed', { 
      jobId,
      error: error instanceof Error ? error.message : String(error)
    });

    // Mark job as failed
    if (jobId) {
      try {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );
        
        await supabase
          .from('circuit_design_jobs')
          .update({
            status: 'failed',
            error_message: error instanceof Error ? error.message : 'Unknown error occurred',
            designer_status: 'failed',
            installer_status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (updateError) {
        logger.error('Failed to update job status to failed', { updateError });
      }
    }

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

/**
 * Start the designer agent (circuit calculations only)
 */
async function startDesignerAgent(
  supabase: any, 
  circuitJobId: string, 
  requirements: any,
  logger: any
): Promise<string> {
  logger.info('Starting designer agent', { circuitJobId });

  // Update designer status
  await supabase
    .from('circuit_design_jobs')
    .update({ 
      designer_status: 'processing',
      designer_progress: 0,
      current_step: 'Circuit Designer: Starting calculations...'
    })
    .eq('id', circuitJobId);

  // Invoke designer-agent-v3 (fire and forget - it updates the job directly)
  supabase.functions.invoke('designer-agent-v3', {
    body: {
      ...requirements,
      jobId: circuitJobId,
      mode: 'direct-design'
    }
  }).catch((err: any) => {
    logger.error('Designer agent HTTP error (expected for long-running)', { error: err.message });
  });

  return circuitJobId;
}

/**
 * Start the installation method agent
 */
async function startInstallationAgent(
  supabase: any,
  circuitJobId: string,
  requirements: any,
  logger: any
): Promise<string> {
  logger.info('Starting installation method agent', { circuitJobId });

  // Build installation query from circuit requirements
  const installQuery = buildInstallationQuery(requirements);

  // Create installation method job
  const { data: installJob, error } = await supabase
    .from('installation_method_jobs')
    .insert({
      user_id: userId,
      query: installQuery,
      project_details: {
        projectName: requirements.projectName || 'Circuit Installation',
        location: requirements.location || 'Site location',
        clientName: requirements.clientName,
        electricianName: requirements.electricianName,
        installationType: requirements.installationType || 'commercial',
        scopeDescription: requirements.description || 'Circuit installation work'
      },
      designer_context: {
        // ✅ ENRICHED: Pass FULL circuit technical specifications
        circuits: requirements.circuits.map((circuit: any) => ({
          description: circuit.description,
          loadType: circuit.loadType,
          power: circuit.power,
          cableSize: circuit.cableSize,
          cpcSize: circuit.cpcSize,
          protectionDevice: circuit.protectionDevice,
          installationMethod: circuit.installationMethod,
          cableLength: circuit.cableLength,
          // EV-specific
          chargerType: circuit.chargerType,
          chargerPower: circuit.chargerPower,
          // Calculated values from designer
          designCurrent: circuit.designCurrentIb,
          voltageDropPercent: circuit.voltageDropPercent,
          earthFaultLoopImpedance: circuit.earthFaultLoopImpedanceZs
        })),
        supply: {
          voltage: requirements.supply?.voltage,
          phases: requirements.supply?.phases,
          earthing: requirements.supply?.earthing,
          externalImpedance: requirements.supply?.externalImpedance
        },
        projectType: requirements.installationType,
        location: requirements.location
      },
      status: 'pending',
      progress: 0
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create installation job: ${error.message}`);
  }

  // Link installation job to circuit design job
  await supabase
    .from('circuit_design_jobs')
    .update({ 
      installation_job_id: installJob.id,
      installer_status: 'processing',
      installer_progress: 0
    })
    .eq('id', circuitJobId);

  // Trigger installation method processing (fire and forget)
  supabase.functions.invoke('process-installation-method-job', {
    body: { jobId: installJob.id }
  }).catch((err: any) => {
    logger.error('Installation agent HTTP error (expected for long-running)', { error: err.message });
  });

  return installJob.id;
}

/**
 * Build installation query from circuit requirements
 */
function buildInstallationQuery(requirements: any): string {
  const circuitCount = requirements.circuits?.length || 0;
  const voltage = requirements.supply?.voltage || 230;
  const phases = requirements.supply?.phases || 'single';
  
  return `Generate professional installation method statement for:
${requirements.description || 'Electrical circuit installation'}

Project: ${requirements.projectName || 'Circuit Installation'}
Installation type: ${requirements.installationType || 'commercial'}
Number of circuits: ${circuitCount}
Supply: ${voltage}V ${phases} phase

Include detailed step-by-step installation procedures, tools required, materials needed, and safety considerations for each circuit type.`;
}

/**
 * Monitor both agents with progress mapping
 * Designer: 5-50% zone
 * Installer: 50-95% zone
 */
async function monitorBothAgents(
  supabase: any,
  circuitJobId: string,
  installerJobId: string,
  logger: any
): Promise<void> {
  const maxWaitTime = 300000; // 5 minutes max
  const pollInterval = 2000; // Poll every 2 seconds
  const startTime = Date.now();

  while (true) {
    // Check timeout
    if (Date.now() - startTime > maxWaitTime) {
      throw new Error('Parallel generation timed out after 5 minutes');
    }

    // Fetch both job statuses
    const [circuitJob, installJob] = await Promise.all([
      supabase
        .from('circuit_design_jobs')
        .select('status, progress, current_step, design_data, designer_progress, designer_status')
        .eq('id', circuitJobId)
        .single(),
      supabase
        .from('installation_method_jobs')
        .select('status, progress, current_step, method_data')
        .eq('id', installerJobId)
        .single()
    ]);

    if (circuitJob.error || installJob.error) {
      throw new Error('Failed to fetch job statuses');
    }

    const circuit = circuitJob.data;
    const install = installJob.data;

    // Map designer progress to 5-50% zone
    const mappedDesignerProgress = 5 + (circuit.progress * 0.45);
    
    // Map installer progress to 50-95% zone
    const mappedInstallerProgress = 50 + (install.progress * 0.45);

    // Calculate overall progress (use max of both)
    const overallProgress = Math.max(mappedDesignerProgress, mappedInstallerProgress);

    // Determine current step message
    let currentStep = 'Processing...';
    if (circuit.progress < 100 && install.progress < 100) {
      currentStep = `Designer: ${circuit.progress}% | Installer: ${install.progress}%`;
    } else if (circuit.progress >= 100 && install.progress < 100) {
      currentStep = `Designer: Complete ✓ | Installer: ${install.progress}%`;
    } else if (circuit.progress < 100 && install.progress >= 100) {
      currentStep = `Designer: ${circuit.progress}% | Installer: Complete ✓`;
    }

    // Update main job with combined progress
    await updateJob(supabase, circuitJobId, {
      progress: Math.floor(overallProgress),
      designer_progress: circuit.progress,
      designer_status: circuit.status || 'processing',
      installer_progress: install.progress,
      installer_status: install.status,
      current_step: currentStep
    });

    logger.info('Progress update', {
      designer: `${circuit.progress}% (${circuit.status})`,
      installer: `${install.progress}% (${install.status})`,
      overall: `${Math.floor(overallProgress)}%`
    });

    // Check if both complete
    if (circuit.status === 'complete' && install.status === 'complete') {
      logger.info('✅ Both agents completed successfully');
      break;
    }

    // Check if either failed
    if (circuit.status === 'failed') {
      throw new Error('Designer agent failed');
    }
    if (install.status === 'failed') {
      throw new Error('Installation agent failed');
    }

    // Wait before next poll
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
}

/**
 * Merge designer and installer results
 */
async function mergeResults(
  supabase: any,
  circuitJobId: string,
  installerJobId: string,
  logger: any
): Promise<any> {
  logger.info('Merging results from both agents');

  // Fetch both results
  const [circuitJob, installJob] = await Promise.all([
    supabase
      .from('circuit_design_jobs')
      .select('design_data')
      .eq('id', circuitJobId)
      .single(),
    supabase
      .from('installation_method_jobs')
      .select('method_data')
      .eq('id', installerJobId)
      .single()
  ]);

  if (circuitJob.error || installJob.error) {
    throw new Error('Failed to fetch results for merging');
  }

  const designData = circuitJob.data.design_data;
  const installationData = installJob.data.method_data;

  // ✅ DEBUG: Log installation data structure for verification
  logger.info('📦 Installation data retrieved:', {
    hasExecutiveSummary: !!installationData?.executiveSummary,
    stepsCount: installationData?.steps?.length || 0,
    materialsCount: installationData?.materialsList?.cables?.length || 0,
    testingCount: installationData?.testingRequirements?.tests?.length || 0,
    dataKeys: Object.keys(installationData || {})
  });

  // Store installation data in circuit job
  await supabase
    .from('circuit_design_jobs')
    .update({ installation_data: installationData })
    .eq('id', circuitJobId);

  // Merge circuit specs with installation guidance
  const mergedCircuits = designData.circuits?.map((circuit: any, index: number) => ({
    // Circuit technical specs from designer
    ...circuit,
    
    // ✅ FIXED: Map install-method-agent output structure to frontend expectations
    installationGuidance: installationData?.executiveSummary || '',
    
    // ✅ Map installation steps from install-method-agent
    installationSteps: installationData?.steps?.map((step: any) => step.description || step.title) || [],
    
    // ✅ Map tools from install-method-agent
    toolsRequired: installationData?.steps?.flatMap((step: any) => step.tools || []) || [],
    
    // ✅ Map materials from install-method-agent
    materialsNeeded: installationData?.materialsList?.cables?.map((cable: any) => 
      `${cable.specification} - ${cable.quantity}`
    ) || [],
    
    // ✅ Map safety notes from install-method-agent
    safetyNotes: installationData?.steps?.flatMap((step: any) => step.safetyNotes || []) || [],
    
    // ✅ Map testing requirements from install-method-agent
    testingRequirements: installationData?.testingRequirements?.tests?.map((test: any) => ({
      testName: test.testName,
      regulation: test.regulation,
      expectedResults: test.expectedResults
    })) || [],
    
    // Keep legacy fields
    installationMethod: installationData?.steps?.[0]?.title || circuit.installationMethod || 'Standard installation',
    estimatedInstallTime: installationData?.steps?.reduce((total: number, step: any) => 
      total + (step.estimatedTimeMinutes || 30), 0
    ) || 120
  })) || [];

  return {
    circuits: mergedCircuits,
    supply: designData.supply,
    summary: designData.summary,
    recommendations: designData.recommendations,
    
    // Global installation data
    overallToolsList: installationData.toolsRequired || [],
    overallMaterialsList: installationData.materialsRequired || [],
    testingProcedures: installationData.testingProcedures || [],
    practicalTips: installationData.installationGuide ? [installationData.installationGuide] : [],
    
    // Citations from both agents
    citations: [
      ...(designData.citations || []),
      ...(installationData.metadata?.citations || [])
    ],
    
    fromCache: designData.fromCache || false,
    processingTime: designData.processingTime,
    validationPassed: designData.validationPassed
  };
}

// Helper functions for extracting installation data per circuit
function extractToolsForCircuit(installData: any, circuit: any, index: number): string[] {
  const step = installData.steps?.[index];
  if (step?.tools) return step.tools;
  return installData.toolsRequired || circuit.toolsRequired || [];
}

function extractMaterialsForCircuit(installData: any, circuit: any, index: number): string[] {
  const step = installData.steps?.[index];
  if (step?.materials) return step.materials;
  return installData.materialsRequired || circuit.materialsNeeded || [];
}

function extractStepsForCircuit(installData: any, circuit: any, index: number): string[] {
  const step = installData.steps?.[index];
  if (step?.description) {
    return [step.title, step.description];
  }
  return circuit.installationSteps || [];
}

function extractSafetyForCircuit(installData: any, circuit: any, index: number): string[] {
  const step = installData.steps?.[index];
  if (step?.safetyNotes) return step.safetyNotes;
  return circuit.safetyNotes || [];
}

/**
 * Helper to update job fields
 */
async function updateJob(supabase: any, jobId: string, updates: any) {
  await supabase
    .from('circuit_design_jobs')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', jobId);
}

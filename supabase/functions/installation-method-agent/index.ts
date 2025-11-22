/**
 * Installation Method Agent Edge Function
 * ISOLATED from AI RAMS - Used ONLY by Installation Specialist
 * Generates enhanced method statements for professional PDF templates
 */

import { serve } from '../_shared/minimal-deps.ts';
import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { generateInstallationMethod } from '../_agents/installation-method-core.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const generateRequestId = () => `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const createClient = () => createSupabaseClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const createLogger = (requestId: string) => ({
  info: (msg: string, meta?: any) => console.info(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : ''),
  error: (msg: string, meta?: any) => console.error(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : ''),
  debug: (msg: string, meta?: any) => console.debug(`[${requestId}] ${msg}`, meta ? JSON.stringify(meta) : '')
});

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId);

  try {
    logger.info('🔧 Installation Method Agent request received');

    const body = await req.json();
    const { query, projectDetails, designerContext, jobId } = body;

    if (!query || !projectDetails) {
      throw new Error('Missing required fields: query and projectDetails');
    }

    // ✅ AUTO-DETECT MODE
    // If called from Circuit Designer (designerContext exists), use simplified mode
    // If called from Installation Specialist (no designerContext), use full mode
    const mode = designerContext ? 'simplified' : 'full';

    logger.info('Generating installation method statement', { 
      query: query.substring(0, 100),
      jobTitle: projectDetails.jobTitle,
      jobId,
      mode,
      hasDesignerContext: !!designerContext
    });

    // Create progress updater for job-aware mode
    const updateJobProgress = async (progress: number, step: string) => {
      logger.debug(`Progress: ${progress}%`, { step });
      
      if (jobId) {
        try {
          const supabase = createClient();
          await supabase
            .from('installation_method_jobs')
            .update({
              progress,
              current_step: step
            })
            .eq('id', jobId);
        } catch (err) {
          logger.error('Failed to update job progress', { error: err });
        }
      }
    };

    // Call the installation method core agent WITH MODE AND DESIGNER CONTEXT
    const result = await generateInstallationMethod(
      query,
      projectDetails,
      updateJobProgress,
      undefined,  // sharedRegulations (not used)
      mode,  // ✅ Pass mode
      designerContext  // ✅ Pass full circuit context for circuit-aware guidance
    );

    logger.info('✅ Installation method generated successfully');

    // Transform to expected frontend format
    const response = mode === 'simplified' ? {
      // ✅ SIMPLIFIED MODE: Return enhanced structured guidance for Circuit Designer
      success: true,
      data: {
        installationGuidance: result.installationGuidance || {
          safetyConsiderations: [],
          materialsRequired: [],
          toolsRequired: [],
          cableRouting: [],
          terminationRequirements: [],
          installationProcedure: []
        },
        testingRequirements: result.testingRequirements || {
          intro: '',
          tests: [],
          recordingNote: ''
        },
        ragContextUsed: result.ragContextUsed || {
          regulationsCount: 0,
          practicalProceduresCount: 0,
          toolsExtracted: 0,
          materialsExtracted: 0,
          keyRegulations: []
        },
        ragCitations: result.ragCitations || []
      }
    } : {
      // FULL MODE: Return detailed steps for Method Statement PDF (Installation Specialist)
      success: true,
      data: {
        steps: result.steps.map((step: any, index: number) => ({
          id: `step-${index + 1}`,
          step: step.step,
          stepNumber: step.step,
          title: step.title,
          description: step.description,
          tools: step.tools || [],
          materials: step.materials || [],
          safetyNotes: step.safetyNotes || [],
          linkedHazards: step.linkedHazards || [],
          qualifications: step.qualifications || [],
          estimatedTime: step.estimatedTime || 30,
          riskLevel: determineRiskLevel(step.linkedHazards || []),
          bsReferences: step.bsReferences || [],
          assignedPersonnel: step.assignedPersonnel || []
        })),
        toolsRequired: result.toolsRequired || [],
        materialsRequired: extractAllMaterials(result.steps),
        testingProcedures: result.testingProcedures || [],
        practicalTips: extractPracticalTips(result.steps),
        commonMistakes: extractCommonMistakes(result.steps),
        scopeOfWork: result.scopeOfWork,
        scheduleDetails: result.scheduleDetails,
        competencyRequirements: {
          minimumQualifications: extractQualifications(result.steps)
        },
        ragCitations: result.ragCitations || [],
        executiveSummary: result.executiveSummary || null,
        materialsList: result.materialsList || [],
        testingRequirements: result.testingRequirements || [],
        regulatoryReferences: result.regulatoryReferences || [],
        summary: {
          totalSteps: result.steps.length,
          estimatedDuration: calculateTotalDuration(result.steps),
          requiredQualifications: extractQualifications(result.steps),
          toolsRequired: result.toolsRequired || [],
          materialsRequired: extractAllMaterials(result.steps),
          overallRiskLevel: calculateOverallRisk(result.steps)
        }
      }
    };

    // ✅ Update job status AFTER response is created
    if (jobId) {
      try {
        const supabase = createClient();
        await supabase
          .from('installation_method_jobs')
          .update({
            status: 'complete',
            progress: 100,
            current_step: 'Generation complete!',
            method_data: response.data, // ✅ Now response.data exists with all fields
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (err) {
        logger.error('Failed to update job completion', { error: err });
      }
    }

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    logger.error('Installation method generation failed', { 
      error: error instanceof Error ? error.message : String(error),
      errorName: error?.name,
      statusCode: error?.statusCode
    });

    // Job-aware error handling (jobId already available from line 44)
    if (jobId) {
      try {
        const supabase = createClient();
        
        // Distinguish timeout errors from other failures
        const isTimeout = error?.name === 'AIProviderError' && error?.statusCode === 408;
        const errorMessage = isTimeout
          ? 'OpenAI is taking longer than expected. Please try again or simplify your request.'
          : (error instanceof Error ? error.message : 'Unknown error occurred');
        
        await supabase
          .from('installation_method_jobs')
          .update({
            status: 'failed',
            error_message: errorMessage,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
          
        logger.info('Job marked as failed', { jobId, isTimeout });
      } catch (updateErr) {
        logger.error('Failed to update job failure status', { error: updateErr });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        retryable: error?.statusCode === 408 // Signal to frontend if retryable
      }),
      { 
        status: error?.statusCode || 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper functions
function determineRiskLevel(hazards: string[]): 'low' | 'medium' | 'high' {
  if (hazards.length === 0) return 'low';
  const highRiskKeywords = ['electrical shock', 'live', 'height', 'confined'];
  const hasHighRisk = hazards.some(h => 
    highRiskKeywords.some(k => h.toLowerCase().includes(k))
  );
  return hasHighRisk ? 'high' : hazards.length > 2 ? 'medium' : 'low';
}

function extractAllMaterials(steps: any[]): string[] {
  const materials = new Set<string>();
  steps.forEach(step => {
    (step.materials || []).forEach((m: string) => materials.add(m));
  });
  return Array.from(materials);
}

function extractPracticalTips(steps: any[]): string[] {
  return [
    'Always verify isolation before commencing work',
    'Use proper cable management and support spacing',
    'Document all test results immediately',
    'Maintain clean working area throughout installation'
  ];
}

function extractCommonMistakes(steps: any[]): string[] {
  return [
    'Insufficient cable support spacing',
    'Incorrect termination torque settings',
    'Missing or incomplete test documentation',
    'Poor cable routing in containment'
  ];
}

function extractQualifications(steps: any[]): string[] {
  const quals = new Set<string>();
  steps.forEach(step => {
    (step.qualifications || []).forEach((q: string) => quals.add(q));
  });
  return quals.size > 0 ? Array.from(quals) : ['18th Edition BS7671', 'Level 3 Electrical Installation'];
}

function calculateOverallRisk(steps: any[]): 'low' | 'medium' | 'high' {
  const riskCounts = { low: 0, medium: 0, high: 0 };
  
  steps.forEach(step => {
    const linkedHazards = step.linkedHazards || [];
    if (linkedHazards.length >= 4) riskCounts.high++;
    else if (linkedHazards.length >= 2) riskCounts.medium++;
    else riskCounts.low++;
  });
  
  // If any high-risk steps, overall is high
  if (riskCounts.high > 0) return 'high';
  // If more than half are medium, overall is medium
  if (riskCounts.medium > steps.length / 2) return 'medium';
  return 'low';
}

function calculateTotalDuration(steps: any[]): string {
  const totalMins = steps.reduce((sum, step) => sum + (step.estimatedTime || 30), 0);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

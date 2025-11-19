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
    const { query, projectDetails, jobId } = body;

    if (!query || !projectDetails) {
      throw new Error('Missing required fields: query and projectDetails');
    }

    logger.info('Generating installation method statement', { 
      query: query.substring(0, 100),
      jobTitle: projectDetails.jobTitle,
      jobId 
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

    // Call the installation method core agent
    const result = await generateInstallationMethod(
      query,
      projectDetails,
      updateJobProgress
    );

    logger.info('✅ Installation method generated successfully');

    // Update job status if job-aware mode
    if (jobId) {
      try {
        const supabase = createClient();
        await supabase
          .from('installation_method_jobs')
          .update({
            status: 'complete',
            progress: 100,
            current_step: 'Generation complete!',
            method_data: response.data, // ✅ Store FULL response with all fields
            completed_at: new Date().toISOString()
          })
          .eq('id', jobId);
      } catch (err) {
        logger.error('Failed to update job completion', { error: err });
      }
    }

    // Transform to expected frontend format
    const response = {
      success: true,
      data: {
        steps: result.steps.map((step: any, index: number) => ({
          id: `step-${index + 1}`,
          stepNumber: step.step,
          title: step.title,
          description: step.description,
          safetyRequirements: step.safetyNotes || [],
          equipmentNeeded: step.tools || [],
          qualifications: step.qualifications || [],
          estimatedDuration: `${step.estimatedTime || 30} minutes`,
          riskLevel: determineRiskLevel(step.linkedHazards || []),
          linkedHazards: step.linkedHazards || [],
          materialsNeeded: step.materials || [],
          assignedPersonnel: step.assignedPersonnel || [] // NEW: Personnel assignments
        })),
        toolsRequired: result.toolsRequired || [],
        materialsRequired: extractAllMaterials(result.steps),
        testingProcedures: result.testingProcedures || [],
        practicalTips: extractPracticalTips(result.steps),
        commonMistakes: extractCommonMistakes(result.steps),
        scopeOfWork: result.scopeOfWork, // NEW: For PDF template
        scheduleDetails: result.scheduleDetails, // NEW: For PDF template
        competencyRequirements: {
          minimumQualifications: extractQualifications(result.steps)
        },
        ragCitations: result.ragCitations || [],
        // 🆕 MISSING FIELDS - Pass through complete data
        executiveSummary: result.executiveSummary || null,
        materialsList: result.materialsList || [],
        testingRequirements: result.testingRequirements || [],
        regulatoryReferences: result.regulatoryReferences || []
      }
    };

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
  return Array.from(quals);
}

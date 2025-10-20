import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';
import { ValidationError } from '../_shared/errors.ts';

console.log('[installation-method-generator] Function loaded successfully');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'installation-method-generator' });

  try {
    const { 
      installationDescription,
      installationType = 'domestic',
      context = {}
    } = await req.json();

    if (!installationDescription || typeof installationDescription !== 'string' || installationDescription.trim().length === 0) {
      throw new ValidationError('Installation description is required and must be a non-empty string');
    }

    logger.info('Generating installation method', { 
      installationType,
      descriptionLength: installationDescription.length,
      queryPreview: installationDescription.substring(0, 120)
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build the detailed query (match AI RAMS pattern)
    const detailedQuery = `${installationDescription}

Provide a detailed step-by-step installation method statement including:
1. Preparation and isolation procedures
2. Installation sequence with specific steps
3. Testing and commissioning requirements
4. Tools and materials needed for each step
5. Safety considerations at each step
6. Time estimates for each phase

Job type: ${installationType} installation
${context.projectName ? `Project: ${context.projectName}` : ''}
${context.location ? `Location: ${context.location}` : ''}

Format as clear, numbered steps suitable for a professional method statement.`;

    // Call installer-v3 agent - MATCH THE AI RAMS PATTERN
    const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
      body: {
        query: detailedQuery,
        installationMethod: installationType,
        location: context.location || undefined,
        messages: [],
        previousAgentOutputs: []
      }
    });

    if (installerError) {
      // Robust error message extraction - handle various error structures
      const errorMsg = 
        typeof installerError === 'string' ? installerError :
        installerError?.message ? installerError.message :
        installerError?.error ? installerError.error :
        'Unknown error from installer agent';
      
      logger.error('Installer V3 call failed', { 
        error: errorMsg,
        rawError: installerError
      });
      
      // Surface specific error messages from installer-v3
      let errorMessage = 'Failed to generate installation method';
      if (errorMsg.includes('OPENAI_API_KEY')) {
        errorMessage = 'OpenAI API key not configured. Please contact support.';
      } else if (errorMsg.includes('LOVABLE_API_KEY')) {
        errorMessage = 'Lovable API key not configured. Please contact support.';
      } else if (errorMsg.includes('query is required')) {
        errorMessage = 'Installation description is required';
      } else if (errorMsg.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again with a shorter description.';
      } else {
        errorMessage = errorMsg;
      }
      throw new Error(errorMessage);
    }

    if (!installerData) {
      throw new Error('No response from installer agent');
    }

    // Extract response and structured data
    const installerResponse = installerData.response || '';
    const structuredData = installerData.structuredData || {};

    logger.debug('Installer response received', {
      hasResponse: !!installerResponse,
      hasStructuredData: !!structuredData,
      stepsCount: structuredData.steps?.length || 0
    });

    // PHASE 1: Prioritize structured data over text parsing
    const steps = structuredData.steps && structuredData.steps.length > 0
      ? structuredData.steps.map((s: any, idx: number) => ({
          id: `step-${idx + 1}`,
          stepNumber: idx + 1,
          title: s.stepTitle || s.title || `Step ${idx + 1}`,
          content: s.instructions || s.description || s.details || '',
          safety: s.safetyNotes || s.safety || []
        }))
      : extractSteps(installerResponse);

    // Format the response for method statement display
    const formattedOutput = {
      installationGuide: installerResponse,
      steps: steps,
      summary: {
        totalSteps: steps.length,
        estimatedDuration: structuredData.totalDuration || structuredData.estimatedTime || 'Not specified',
        requiredQualifications: structuredData.requiredQualifications || structuredData.qualifications || [],
        toolsRequired: extractToolsList(structuredData),
        materialsRequired: extractMaterialsList(structuredData),
        overallRiskLevel: structuredData.overallRiskLevel || structuredData.riskLevel || 'medium'
      },
      metadata: {
        installationType,
        generatedAt: new Date().toISOString(),
        citations: installerData.citations || []
      }
    };

    logger.info('Installation method generated successfully', {
      stepsCount: formattedOutput.steps.length
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        ...formattedOutput
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    logger.error('Installation method generation failed', { 
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined
    });
    
    let errorMessage = 'Failed to generate installation method';
    
    if (error instanceof Error) {
      if (error.message.includes('query is required')) {
        errorMessage = 'Installation description is required';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again with a shorter description.';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper functions
function extractSteps(response: string): Array<{stepNumber: number; title: string; content: string; safety?: string[]}> {
  const steps: Array<{stepNumber: number; title: string; content: string; safety?: string[]}> = [];
  const lines = response.split('\n');
  let currentStep: {stepNumber: number; title: string; content: string; safety?: string[]} | null = null;
  
  for (const line of lines) {
    const stepMatch = line.match(/^(?:Step\s+)?(\d+)[:.]\s*(.+)/i);
    if (stepMatch) {
      if (currentStep) steps.push(currentStep);
      currentStep = {
        stepNumber: parseInt(stepMatch[1]),
        title: stepMatch[2].trim(),
        content: '',
        safety: []
      };
    } else if (currentStep) {
      if (line.toLowerCase().includes('safety') || line.toLowerCase().includes('warning')) {
        if (!currentStep.safety) currentStep.safety = [];
        currentStep.safety.push(line.trim());
      } else {
        currentStep.content += line + '\n';
      }
    }
  }
  
  if (currentStep) steps.push(currentStep);
  return steps;
}

function extractToolsList(structuredData: any): string[] {
  const tools = new Set<string>();
  
  // Check multiple possible locations for tools
  if (structuredData.steps) {
    for (const step of structuredData.steps) {
      const stepTools = step.toolsRequired || step.equipmentNeeded || step.tools || [];
      stepTools.forEach((tool: string) => tools.add(tool));
    }
  }
  
  // Also check top-level tools list
  if (structuredData.toolsRequired) {
    structuredData.toolsRequired.forEach((tool: string) => tools.add(tool));
  }
  
  return Array.from(tools);
}

function extractMaterialsList(structuredData: any): string[] {
  const materials = new Set<string>();
  
  // Check multiple possible locations for materials
  if (structuredData.steps) {
    for (const step of structuredData.steps) {
      const stepMaterials = step.materialsNeeded || step.materials || [];
      stepMaterials.forEach((material: string) => materials.add(material));
    }
  }
  
  // Also check top-level materials list
  if (structuredData.materialsRequired) {
    structuredData.materialsRequired.forEach((material: string) => materials.add(material));
  }
  
  return Array.from(materials);
}

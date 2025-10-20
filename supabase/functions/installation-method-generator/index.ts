import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve, createClient, corsHeaders } from '../_shared/deps.ts';
import { createLogger, generateRequestId } from '../_shared/logger.ts';

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

    if (!installationDescription) {
      throw new Error('Installation description is required');
    }

    logger.info('Generating installation method', { 
      installationType,
      descriptionLength: installationDescription.length 
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Call installer-v3 agent
    const { data: installerData, error: installerError } = await supabase.functions.invoke('installer-v3', {
      body: {
        messages: [
          {
            role: 'system',
            content: `You are an expert electrician providing step-by-step installation guidance for ${installationType} installations in the UK. Focus on practical, clear instructions following BS 7671:2018+A3:2024.`
          },
          {
            role: 'user',
            content: `${installationDescription}\n\nProvide a detailed step-by-step installation method including:\n1. Preparation and isolation\n2. Installation sequence\n3. Testing requirements\n4. Tools and materials needed\n5. Safety considerations at each step\n6. Time estimates\n\nFormat as clear, numbered steps suitable for a method statement.`
          }
        ],
        jobScale: installationType,
        context: {
          ...context,
          requestMethodStatement: true
        }
      }
    });

    if (installerError) {
      logger.error('Installer agent error', { error: installerError });
      throw installerError;
    }

    const installerResponse = installerData.response || '';
    const structuredData = installerData.structuredData || {};

    // PHASE 1: Prioritize structured data over text parsing
    const steps = structuredData.steps && structuredData.steps.length > 0
      ? structuredData.steps.map((s: any, idx: number) => ({
          stepNumber: idx + 1,
          title: s.title || s.stepTitle || `Step ${idx + 1}`,
          content: s.description || s.instructions || s.details || '',
          safety: s.safetyNotes || s.safety || s.warnings || []
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
    logger.error('Installation method generation failed', { error });
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate installation method'
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
  if (structuredData.steps) {
    for (const step of structuredData.steps) {
      if (step.toolsRequired) {
        step.toolsRequired.forEach((tool: string) => tools.add(tool));
      }
    }
  }
  return Array.from(tools);
}

function extractMaterialsList(structuredData: any): string[] {
  const materials = new Set<string>();
  if (structuredData.steps) {
    for (const step of structuredData.steps) {
      if (step.materialsNeeded) {
        step.materialsNeeded.forEach((material: string) => materials.add(material));
      }
    }
  }
  return Array.from(materials);
}

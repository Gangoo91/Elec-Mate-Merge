import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbedding,
  callLovableAI
} from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'project-mgmt-v3' });

  try {
    const { query, projectType, scope, timeline } = await req.json();

    if (!query || typeof query !== 'string') {
      throw new ValidationError('query is required and must be a string');
    }

    logger.info('Project Manager V3 request received', { query, projectType });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for project management knowledge
    logger.debug('Generating query embedding');
    const queryEmbedding = await generateEmbedding(
      `${query} ${projectType || ''} project planning timeline coordination`,
      OPENAI_API_KEY
    );

    // Step 2: Search project management knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching project management knowledge');

    const { data: pmKnowledge, error: pmError } = await supabase.rpc('search_project_mgmt', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 8
    });

    if (pmError) {
      logger.warn('Project management search failed', { error: pmError });
    }

    // Step 3: Build PM context
    const pmContext = pmKnowledge && pmKnowledge.length > 0
      ? pmKnowledge.map((pm: any) => 
          `${pm.topic}: ${pm.content}`
        ).join('\n\n')
      : 'Apply general UK electrical project management best practices.';

    const systemPrompt = `You are an expert electrical project manager specialising in UK installations.

Your task is to provide comprehensive project planning and coordination guidance.

CURRENT DATE: September 2025

RELEVANT PROJECT MANAGEMENT KNOWLEDGE:
${pmContext}

Respond ONLY with valid JSON in this exact format:
{
  "projectPlan": {
    "phases": [
      {
        "phase": "Design & Planning",
        "duration": 5,
        "tasks": ["Task 1", "Task 2"],
        "dependencies": [],
        "milestones": ["Milestone 1"]
      }
    ],
    "totalDuration": 20,
    "criticalPath": ["Phase 1", "Phase 2"]
  },
  "resources": {
    "team": [
      {"role": "Electrician", "quantity": 2, "duration": 10}
    ],
    "equipment": ["Tool 1", "Tool 2"]
  },
  "compliance": {
    "notifications": ["Building Control", "DNO"],
    "certifications": ["EIC", "MWC"],
    "inspections": ["First fix", "Second fix"]
  },
  "risks": [
    {"risk": "Risk description", "mitigation": "Mitigation strategy", "severity": "Medium"}
  ],
  "recommendations": ["Key recommendation"]
}`;

    const userPrompt = `Provide a comprehensive project plan for:
${query}

${projectType ? `Project Type: ${projectType}` : ''}
${scope ? `Scope: ${scope}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Include phases, resources, compliance requirements, and risk management.`;

    // Step 4: Call Lovable AI
    logger.debug('Calling Lovable AI');
    const aiResponse = await callLovableAI(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object'
    });

    const pmResult = JSON.parse(aiResponse);

    logger.info('Project plan completed', { 
      phasesCount: pmResult.projectPlan?.phases?.length,
      totalDuration: pmResult.projectPlan?.totalDuration
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: pmResult,
        metadata: {
          requestId,
          knowledgeItemsUsed: pmKnowledge?.length || 0,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Project Manager V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

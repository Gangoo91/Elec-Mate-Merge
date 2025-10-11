import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { 
  corsHeaders, 
  createLogger, 
  generateRequestId, 
  handleError, 
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout
} from '../_shared/v3-core.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ status: 'healthy', function: 'project-mgmt-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'project-mgmt-v3' });

  try {
    const body = await req.json();
    const { query, projectType, scope, timeline, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (projectType && typeof projectType !== 'string') {
      throw new ValidationError('projectType must be a string');
    }
    if (scope && typeof scope !== 'string') {
      throw new ValidationError('scope must be a string');
    }
    if (timeline && typeof timeline !== 'string') {
      throw new ValidationError('timeline must be a string');
    }

    logger.info('Project Manager V3 request received', { query: query.substring(0, 50), projectType });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for project management knowledge (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(
      `${query} ${projectType || ''} project planning timeline coordination`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

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

    // Build conversation context
    let contextSection = '';
    if (messages && messages.length > 0) {
      contextSection = '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nCOMPLETE PROJECT WORK (coordinate all outputs):\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }

    const systemPrompt = `You are an expert electrical project manager specialising in UK installations.

Your task is to provide comprehensive project planning and coordination guidance.

CURRENT DATE: September 2025

RELEVANT PROJECT MANAGEMENT KNOWLEDGE:
${pmContext}${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "Natural language summary of the project plan and key coordination points",
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
  "recommendations": ["Key recommendation"],
  "suggestedNextAgents": []
}`;

    const userPrompt = `Provide a comprehensive project plan for:
${query}

${projectType ? `Project Type: ${projectType}` : ''}
${scope ? `Scope: ${scope}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Include phases, resources, compliance requirements, and risk management.`;

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

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

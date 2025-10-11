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
      JSON.stringify({ status: 'healthy', function: 'health-safety-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-v3' });

  try {
    const body = await req.json();
    const { query, workType, location, hazards, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (workType && typeof workType !== 'string') {
      throw new ValidationError('workType must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }
    if (hazards && !Array.isArray(hazards)) {
      throw new ValidationError('hazards must be an array');
    }

    logger.info('Health & Safety V3 request received', { query: query.substring(0, 50), workType });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for H&S knowledge search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(
      `${query} ${workType || ''} electrical hazards safety risks controls`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search H&S knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching health & safety knowledge');

    const { data: hsKnowledge, error: hsError } = await supabase.rpc('search_health_safety', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 8
    });

    if (hsError) {
      logger.warn('H&S search failed', { error: hsError });
    }

    // Step 3: Build H&S context
    const hsContext = hsKnowledge && hsKnowledge.length > 0
      ? hsKnowledge.map((hs: any) => 
          `${hs.topic}: ${hs.content}`
        ).join('\n\n')
      : 'Apply general electrical safety best practices per HSE guidance and BS 7671.';

    // Build conversation context
    let contextSection = '';
    if (messages && messages.length > 0) {
      contextSection = '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nPREVIOUS WORK (identify hazards from installation plan):\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }

    const systemPrompt = `You are an expert Health & Safety advisor specialising in UK electrical installations.

Your task is to provide comprehensive risk assessments and safety guidance.

CURRENT DATE: September 2025

RELEVANT H&S GUIDANCE:
${hsContext}${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "Natural language summary of key safety risks and control measures",
  "riskAssessment": {
    "hazards": [
      {"hazard": "Electric shock", "severity": "High", "likelihood": "Medium", "risk": "High"}
    ],
    "controls": [
      {"hazard": "Electric shock", "control": "Isolate and lock off", "residualRisk": "Low"}
    ],
    "ppe": ["Safety boots", "Insulated gloves", "Safety glasses"],
    "emergencyProcedures": ["First aid for electric shock", "Fire procedures"]
  },
  "methodStatement": {
    "steps": [
      {"step": 1, "description": "Isolate supply", "safetyPoint": "Use lock-off devices"}
    ],
    "permitRequired": false,
    "competentPerson": true
  },
  "compliance": {
    "regulations": ["HASAWA 1974", "EWR 1989", "BS 7671"],
    "warnings": []
  },
  "suggestedNextAgents": [
    {"agent": "commissioning", "reason": "Get testing procedures that comply with safety requirements", "priority": "high"},
    {"agent": "project-manager", "reason": "Coordinate safety documentation and compliance records", "priority": "medium"}
  ]
}`;

    const userPrompt = `Provide a risk assessment and method statement for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

    const safetyResult = JSON.parse(aiResponse);

    logger.info('Risk assessment completed', { 
      hazardsIdentified: safetyResult.riskAssessment?.hazards?.length,
      controlsApplied: safetyResult.riskAssessment?.controls?.length
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: safetyResult,
        metadata: {
          requestId,
          knowledgeItemsUsed: hsKnowledge?.length || 0,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Health & Safety V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

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
  const logger = createLogger(requestId, { function: 'health-safety-v3' });

  try {
    const { query, workType, location, hazards } = await req.json();

    if (!query || typeof query !== 'string') {
      throw new ValidationError('query is required and must be a string');
    }

    logger.info('Health & Safety V3 request received', { query, workType });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for H&S knowledge search
    logger.debug('Generating query embedding');
    const queryEmbedding = await generateEmbedding(
      `${query} ${workType || ''} electrical hazards safety risks controls`,
      OPENAI_API_KEY
    );

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

    const systemPrompt = `You are an expert Health & Safety advisor specialising in UK electrical installations.

Your task is to provide comprehensive risk assessments and safety guidance.

CURRENT DATE: September 2025

RELEVANT H&S GUIDANCE:
${hsContext}

Respond ONLY with valid JSON in this exact format:
{
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
  }
}`;

    const userPrompt = `Provide a risk assessment and method statement for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call Lovable AI
    logger.debug('Calling Lovable AI');
    const aiResponse = await callLovableAI(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object'
    });

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

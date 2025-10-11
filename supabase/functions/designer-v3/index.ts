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
      JSON.stringify({ status: 'healthy', function: 'designer-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'designer-v3' });

  try {
    const body = await req.json();
    const { query, circuitType, power, voltage, cableLength, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }
    if (circuitType && typeof circuitType !== 'string') {
      throw new ValidationError('circuitType must be a string');
    }
    if (power && (typeof power !== 'number' || power <= 0)) {
      throw new ValidationError('power must be a positive number');
    }
    if (voltage && (typeof voltage !== 'number' || voltage <= 0)) {
      throw new ValidationError('voltage must be a positive number');
    }
    if (cableLength && (typeof cableLength !== 'number' || cableLength <= 0)) {
      throw new ValidationError('cableLength must be a positive number');
    }

    logger.info('Designer V3 request received', { query: query.substring(0, 50), circuitType, power });

    // Get OpenAI API key for embeddings
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Get Lovable API key for completion
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for RAG search (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Fetch RAG context
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Fetching RAG context');

    // Fetch BS 7671 regulations
    const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 5
    });

    if (regError) {
      logger.warn('BS 7671 search failed', { error: regError });
    }

    // Fetch design knowledge
    const { data: designKnowledge, error: designError } = await supabase.rpc('search_design_knowledge', {
      query_embedding: queryEmbedding,
      match_threshold: 0.6,
      match_count: 3
    });

    if (designError) {
      logger.warn('Design knowledge search failed', { error: designError });
    }

    // Step 3: Build context-aware prompt
    const regulationContext = regulations && regulations.length > 0
      ? regulations.map((reg: any) => 
          `${reg.regulation_number} (${reg.section}): ${reg.content}`
        ).join('\n\n')
      : 'No specific regulations found. Apply general BS 7671:2018+A2:2022 principles.';

    const designContext = designKnowledge && designKnowledge.length > 0
      ? designKnowledge.map((dk: any) => 
          `${dk.topic}: ${dk.content}`
        ).join('\n\n')
      : '';

    // Build conversation context for agent awareness
    let contextSection = '';
    if (messages && messages.length > 0) {
      contextSection = '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nPREVIOUS AGENT OUTPUTS:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }

    const systemPrompt = `You are an expert electrical circuit designer specialising in BS 7671:2018+A2:2022 compliant installations.

Your task is to design safe, compliant electrical circuits for UK installations.

CURRENT DATE: September 2025

RELEVANT BS 7671 REGULATIONS:
${regulationContext}

${designContext ? `DESIGN GUIDANCE:\n${designContext}\n` : ''}${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "Natural language summary explaining the design decisions and key considerations",
  "design": {
    "cableSize": 2.5,
    "cableType": "6242Y Twin & Earth",
    "protectionDevice": "32A MCB Type B",
    "voltageDrop": 2.1,
    "maxLength": 27,
    "earthingArrangement": "TN-S",
    "considerations": ["Point 1", "Point 2"]
  },
  "compliance": {
    "status": "compliant",
    "regulations": ["522.6.101", "433.1.1"],
    "warnings": []
  },
  "calculations": {
    "designCurrent": 20,
    "correctionFactors": 0.87,
    "maxZs": 1.44
  },
  "suggestedNextAgents": [
    {"agent": "cost-engineer", "reason": "Get accurate material and labour cost estimate for this design", "priority": "high"},
    {"agent": "installer", "reason": "Get practical installation method and step-by-step guidance", "priority": "medium"}
  ]
}`;

    const userPrompt = `Design a circuit with these requirements:
- Circuit Type: ${circuitType || 'Not specified'}
- Power Rating: ${power ? `${power}W` : 'Not specified'}
- Voltage: ${voltage || 230}V
- Cable Length: ${cableLength ? `${cableLength}m` : 'Not specified'}
- Additional Requirements: ${query}

Provide a complete, BS 7671 compliant design.`;

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

    const designResult = JSON.parse(aiResponse);

    logger.info('Design completed successfully', { 
      cableSize: designResult.design?.cableSize,
      compliant: designResult.compliance?.status === 'compliant'
    });

    // Step 5: Return clean response
    return new Response(
      JSON.stringify({
        success: true,
        result: designResult,
        metadata: {
          requestId,
          regulationsUsed: regulations?.length || 0,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Designer V3 error', { error: error.message });
    return handleError(error);
  }
});

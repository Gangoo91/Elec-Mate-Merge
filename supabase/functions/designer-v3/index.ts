import { serve, createClient, corsHeaders } from "../_shared/deps.ts";
import { handleError, ValidationError } from "../_shared/errors.ts";
import { createLogger, generateRequestId } from "../_shared/logger.ts";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'designer-v3' });

  try {
    const { query, circuitType, power, voltage, cableLength } = await req.json();

    // Validate input
    if (!query || typeof query !== 'string') {
      throw new ValidationError('query is required and must be a string');
    }

    logger.info('Designer V3 request received', { query, circuitType, power });

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

    // Step 1: Generate embedding for RAG search
    logger.debug('Generating query embedding');
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: query,
        model: 'text-embedding-3-small',
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error(`Embedding generation failed: ${embeddingResponse.status}`);
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

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

    const systemPrompt = `You are an expert electrical circuit designer specialising in BS 7671:2018+A2:2022 compliant installations.

Your task is to design safe, compliant electrical circuits for UK installations.

CURRENT DATE: September 2025

RELEVANT BS 7671 REGULATIONS:
${regulationContext}

${designContext ? `DESIGN GUIDANCE:\n${designContext}\n` : ''}

Respond ONLY with valid JSON in this exact format:
{
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
  }
}`;

    const userPrompt = `Design a circuit with these requirements:
- Circuit Type: ${circuitType || 'Not specified'}
- Power Rating: ${power ? `${power}W` : 'Not specified'}
- Voltage: ${voltage || 230}V
- Cable Length: ${cableLength ? `${cableLength}m` : 'Not specified'}
- Additional Requirements: ${query}

Provide a complete, BS 7671 compliant design.`;

    // Step 4: Call Lovable AI
    logger.debug('Calling Lovable AI');
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 2000,
        temperature: 0.7
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      logger.error('Lovable AI error', { status: aiResponse.status, error: errorText });
      throw new Error(`AI completion failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const designResult = JSON.parse(aiData.choices[0].message.content);

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

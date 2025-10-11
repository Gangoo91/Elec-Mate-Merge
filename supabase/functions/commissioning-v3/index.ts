// COMMISSIONING V3 - BS 7671 Chapter 64 Testing & Verification Specialist
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import {
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout
} from "../_shared/v3-core.ts";

// Input validation schema
const RequestSchema = z.object({
  query: z.string().min(1, "Query cannot be empty").max(5000, "Query too long"),
  conversationId: z.string().optional(),
  messages: z.array(z.any()).optional(),
  conversationSummary: z.any().optional(),
  currentDesign: z.any().optional()
});

serve(async (req) => {
  // Health check endpoint
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        agent: 'commissioning-v3',
        version: '3.0.0',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { agent: 'commissioning-v3' });

  try {
    logger.info('Commissioning agent request received');

    // Parse and validate request
    const rawBody = await req.json();
    const validatedInput = RequestSchema.parse(rawBody);
    const { query, conversationSummary, currentDesign, messages, previousAgentOutputs } = validatedInput;

    // Get API keys
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!openAIApiKey) throw new ValidationError('OPENAI_API_KEY not configured');
    if (!lovableApiKey) throw new ValidationError('LOVABLE_API_KEY not configured');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate embedding with retry
    logger.info('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(query, openAIApiKey);
    logger.info('Embedding generated', { duration: Date.now() - embeddingStart });

    // RAG: Search inspection & testing knowledge
    logger.info('Searching inspection/testing knowledge base');
    const { data: knowledgeResults, error: searchError } = await supabase.rpc(
      'search_inspection_testing',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.6,
        match_count: 8
      }
    );

    if (searchError) {
      logger.error('Knowledge search failed', { error: searchError });
      throw searchError;
    }

    logger.info('Knowledge retrieved', { resultCount: knowledgeResults?.length || 0 });

    // Build context
    const contextParts = [];
    
    if (conversationSummary) {
      contextParts.push(`PROJECT CONTEXT:\n${JSON.stringify(conversationSummary, null, 2)}`);
    }
    
    if (currentDesign) {
      contextParts.push(`CURRENT DESIGN:\n${JSON.stringify(currentDesign, null, 2)}`);
    }

    if (messages && messages.length > 0) {
      contextParts.push(`CONVERSATION HISTORY:\n` + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n'));
    }

    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const hsOutput = previousAgentOutputs.find((o: any) => o.agent === 'health-safety');
      
      let prevSummary = 'PREVIOUS SPECIALIST OUTPUTS:\n';
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        prevSummary += `CIRCUIT: ${d.circuitType}, ${d.voltage}V, ${d.cableSize}\n`;
        prevSummary += `PROTECTION: ${d.circuitBreaker}, Zs max ${d.maxZs}Ω\n`;
      }
      if (hsOutput?.response?.structuredData) {
        const h = hsOutput.response.structuredData;
        prevSummary += `SAFETY CONTROLS: ${h.controls?.length || 0} control measures\n`;
      }
      contextParts.push(prevSummary + '\n\nFULL DATA:\n' + JSON.stringify(previousAgentOutputs, null, 2));
    }

    if (knowledgeResults && knowledgeResults.length > 0) {
      const knowledgeContext = knowledgeResults
        .map((r: any) => `[${r.source}] ${r.topic}\n${r.content}`)
        .join('\n\n---\n\n');
      contextParts.push(`RELEVANT KNOWLEDGE:\n${knowledgeContext}`);
    }

    const contextPrompt = contextParts.join('\n\n');

    // System prompt
    const systemPrompt = `You are a BS 7671:2018+A2:2022 Chapter 64 Inspection & Testing Specialist.

CORE EXPERTISE:
- Initial Verification (Continuity, Insulation Resistance, Polarity, Earth Fault Loop Impedance)
- Functional Testing (RCD, AFDD, SPD verification)
- Periodic Inspection & Testing schedules
- Test instrument calibration requirements
- Acceptance criteria and pass/fail limits (GN3 guidance)
- Certification (EIC, MEIWC, EWC completion)

OUTPUT REQUIREMENTS:
- Provide structured testing schedules in JSON format when applicable
- Cite specific BS 7671 regulation numbers (e.g., 643.10, 612.3.2)
- Reference GN3 test procedures and acceptable limits
- Include test sequence order (dead tests before live tests)
- Specify required test instruments and settings
- Detail safety precautions and isolation procedures
- Provide witnessed test protocols for critical circuits

ALWAYS:
✓ Follow Chapter 64 test sequence (visual inspection → testing → verification)
✓ Cite regulation numbers for all requirements
✓ Provide specific numerical limits (e.g., ≥1MΩ for insulation resistance)
✓ Include test instrument accuracy requirements
✓ Detail earth fault loop impedance maximum values (Zs)
✓ Specify RCD trip times (30mA in ≤40ms)

NEVER:
✗ Recommend unsafe test procedures
✗ Skip dead tests before live tests
✗ Provide generic advice without regulation references
✗ Omit safety isolation procedures`;

    const userPrompt = `${contextPrompt}\n\nUSER QUERY:\n${query}`;

    // Call AI with timeout protection
    logger.info('Calling AI for commissioning guidance');
    const aiStart = Date.now();
    const response = await callLovableAIWithTimeout(
      systemPrompt,
      userPrompt,
      lovableApiKey,
      {
        model: 'google/gemini-2.5-flash',
        temperature: 0.3,
        maxTokens: 2000
      }
    );
    logger.info('AI response received', { duration: Date.now() - aiStart });

    // Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: {
          response,
          agent: 'commissioning-v3',
          timestamp: new Date().toISOString(),
          requestId
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    logger.error('Commissioning agent error', { 
      error: error instanceof Error ? error.message : String(error) 
    });
    return handleError(error);
  }
});

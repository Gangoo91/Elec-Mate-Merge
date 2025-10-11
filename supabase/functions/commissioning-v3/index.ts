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

    // System prompt with enhanced response requirements
    const systemPrompt = `You are a BS 7671:2018+A2:2022 Chapter 64 Inspection & Testing Specialist.

CORE EXPERTISE:
- Initial Verification (Continuity, Insulation Resistance, Polarity, Earth Fault Loop Impedance)
- Functional Testing (RCD, AFDD, SPD verification)
- Periodic Inspection & Testing schedules
- Test instrument calibration requirements
- Acceptance criteria and pass/fail limits (GN3 guidance)
- Certification (EIC, MEIWC, EWC completion)

OUTPUT REQUIREMENTS:
Provide a COMPREHENSIVE testing procedure (200-300 words) covering:
- Complete test sequence per BS 7671 Chapter 64 (visual inspection first, then dead tests, then live tests)
- Specific test instrument requirements with accuracy class (e.g., Megger MFT1741 or equivalent, accuracy ±2%)
- Exact numerical pass/fail criteria with regulation references (e.g., R1+R2 continuity per 643.2.1, insulation resistance ≥1MΩ per 643.3.2)
- Earth fault loop impedance maximum values (Zs) for the specific protection device (reference Table 41.3/41.4)
- RCD test requirements (×0.5, ×1, ×5 trip tests with max 40ms at ×1 for 30mA RCDs per 643.10)
- Isolation and proving procedures before testing (lock-off, voltage proving device)
- Test result recording requirements for certification (BS 7671 Appendix 6 forms)
- Safety precautions for live testing (barriers, warning notices, competent person requirements)

ALWAYS:
✓ Follow Chapter 64 test sequence strictly
✓ Cite specific regulation numbers (e.g., 612.3.2, 643.10)
✓ Provide exact numerical limits with units
✓ Include test instrument calibration requirements (annual calibration per manufacturer)
✓ Detail isolation verification procedures

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

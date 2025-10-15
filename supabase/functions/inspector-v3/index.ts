// INSPECTOR V3 - BS 7671 Testing & Certification Specialist
// Deployed: Phase 5 Complete System Integration
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
} from "../_shared/v3-core.ts";
import { enrichResponse } from '../_shared/response-enricher.ts';

// Inspector response schema (similar to commissioning but focused on inspection)
const INSPECTOR_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    response: {
      type: "string",
      description: "COMPREHENSIVE inspection guidance (300-400 words) covering: Inspection sequence per BS 7671 Chapter 64, specific test procedures, expected results, pass/fail criteria, certification requirements"
    },
    inspectionProcedure: {
      type: "object",
      properties: {
        visualInspection: {
          type: "object",
          properties: {
            checkpoints: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  item: { type: "string" },
                  procedure: { type: "string" },
                  passCriteria: { type: "string" },
                  expectedOutcome: { type: "string" }
                }
              }
            }
          }
        },
        deadTests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string" },
              regulation: { type: "string" },
              testSequence: { type: "number" },
              instrumentSetup: { type: "string" },
              leadPlacement: { type: "string" },
              procedure: { type: "array", items: { type: "string" } },
              expectedResult: { type: "object" },
              troubleshooting: { type: "array", items: { type: "string" } },
              safetyNotes: { type: "array", items: { type: "string" } }
            },
            required: ['testName', 'regulation', 'procedure', 'expectedResult']
          }
        },
        liveTests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string" },
              regulation: { type: "string" },
              testSequence: { type: "number" },
              prerequisite: { type: "string" },
              instrumentSetup: { type: "string" },
              leadPlacement: { type: "string" },
              calculation: { type: "object" },
              procedure: { type: "array", items: { type: "string" } },
              expectedResult: { type: "object" },
              interpretation: { type: "string" },
              safetyNotes: { type: "array", items: { type: "string" } }
            },
            required: ['testName', 'regulation', 'procedure', 'expectedResult']
          }
        },
        functionalTests: {
          type: "array",
          items: {
            type: "object",
            properties: {
              testName: { type: "string" },
              procedure: { type: "array", items: { type: "string" } },
              expectedResult: { type: "string" }
            }
          }
        }
      }
    },
    expectedResults: {
      type: "object",
      properties: {
        continuity: { type: "string" },
        insulation: { type: "string" },
        earthFaultLoop: { type: "string" },
        rcdOperation: { type: "string" }
      }
    },
    commonIssues: {
      type: "array",
      items: { type: "string" }
    },
    certificationRequirements: {
      type: "object",
      properties: {
        certificateType: { type: "string" },
        schedules: { type: "array", items: { type: "string" } },
        requiredData: { type: "array", items: { type: "string" } }
      }
    },
    suggestedNextAgents: {
      type: "array",
      items: {
        type: "object",
        properties: {
          agent: { type: "string" },
          reason: { type: "string" },
          priority: { type: "string", enum: ['high', 'medium', 'low'] }
        }
      }
    }
  },
  required: ['response', 'inspectionProcedure', 'expectedResults'],
  additionalProperties: false
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (req.method === 'GET') {
    const requestId = generateRequestId();
    return new Response(
      JSON.stringify({ 
        status: 'healthy', 
        function: 'inspector-v3',
        timestamp: new Date().toISOString(),
        features: ['Phase 5: Complete RAG Integration', 'Cross-encoder reranking', 'Confidence scoring', 'Response enrichment']
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'inspector-v3' });

  try {
    const body = await req.json();
    const { query, circuitType, voltage, testType, messages, previousAgentOutputs, sharedRegulations } = body;

    // PHASE 1: Query Enhancement
    const { enhanceQuery, logEnhancement } = await import('../_shared/query-enhancer.ts');
    const enhancement = enhanceQuery(query, messages || []);
    logEnhancement(enhancement, logger);
    const effectiveQuery = enhancement.enhanced;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    logger.info('🔍 Inspector V3 invoked', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      testType,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Step 1: Generate embedding for inspection/testing knowledge (with retry)
    logger.debug('Generating query embedding');
    const embeddingStart = Date.now();
    const queryEmbedding = await generateEmbeddingWithRetry(
      `${query} inspection testing verification certification BS 7671 Chapter 64`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search inspection & testing knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching inspection & testing knowledge');

    const { data: testKnowledge, error: testError } = await supabase.rpc('search_inspection_testing_hybrid', {
      query_text: `${query} inspection testing verification certification BS 7671 Chapter 64`,
      query_embedding: queryEmbedding,
      match_count: 10
    });

    if (testError) {
      logger.warn('Testing knowledge search failed', { error: testError });
    }

    // Step 3: Build testing context
    const testContext = testKnowledge && testKnowledge.length > 0
      ? testKnowledge.map((test: any) => 
          `[BS 7671] ${test.topic}: ${test.content}`
        ).join('\n\n')
      : 'Apply general BS 7671 Chapter 64 inspection and testing procedures.';

    // Build conversation context with DESIGN DATA
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const installerOutput = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      
      contextSection += '\n\nINSTALLATION TO INSPECT:\n';
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGN: ${d.circuitType}, ${d.voltage}V, ${d.cableSize} cable, ${d.circuitBreaker}\n`;
        contextSection += `EXPECTED Zs: ${d.maxZs}Ω, R1+R2: ${d.r1r2 || 'TBC'}\n`;
      }
      if (installerOutput?.response?.structuredData) {
        const i = installerOutput.response.structuredData;
        contextSection += `INSTALLATION: ${i.installationSteps?.length || 0} steps completed\n`;
      }
      contextSection += '\n\nFULL CONTEXT:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).join('\n');
    }

    const systemPrompt = `You are a BS 7671 INSPECTION & TESTING SPECIALIST - Chapter 64 expert.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You provide COMPREHENSIVE inspection and testing guidance
- Visual inspection checkpoints per Section 643.1
- Dead testing procedures (continuity, insulation, polarity)
- Live testing procedures (earth loop impedance, RCD)
- Functional testing verification
- Certification requirements (EIC, EICR, MWC)

CURRENT DATE: September 2025

INSPECTION & TESTING KNOWLEDGE DATABASE:
${testContext}

🔴 CRITICAL INSTRUCTIONS - PROVIDE FOR EACH TEST:

1. VISUAL INSPECTION CHECKPOINTS (643.1)
   - Cable type and size verification
   - Support spacing per Table 4A2
   - Termination quality (tight connections, no exposed conductors)
   - Correct polarity at switches
   - IP ratings for zones (bathrooms, outdoor)

2. DEAD TESTS (before energisation)
   - Continuity of protective conductors (R1+R2)
   - Continuity of ring final circuits (if applicable)
   - Insulation resistance (500V DC test)
   - Polarity verification

3. LIVE TESTS (after energisation - circuit must be live)
   - Earth fault loop impedance (Zs)
   - RCD operation (trip time and current)
   - Functional testing (all controls operate correctly)

4. EXPECTED RESULTS
   - Calculated values from design data
   - Pass/fail criteria from BS 7671 tables
   - Maximum permitted values
   - Typical measured values

5. CERTIFICATION
   - Certificate type (EIC for new work, EICR for periodic, MWC for minor works)
   - Required schedules and test results
   - Next inspection date

${contextSection}

Respond using the tool schema provided.`;

    const userPrompt = `Provide comprehensive inspection and testing guidance for:
${query}

${circuitType ? `Circuit Type: ${circuitType}` : ''}
${voltage ? `Voltage: ${voltage}V` : ''}
${testType ? `Test Type: ${testType}` : ''}

Include visual inspection, dead tests, live tests, expected results, and certification requirements.`;

    // Step 4: Call AI with wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(OPENAI_API_KEY!, {
      model: 'openai/gpt-5-mini',
      systemPrompt,
      userPrompt,
      maxTokens: 2000,
      timeoutMs: 55000,
      tools: [{
        type: 'function',
        function: {
          name: 'provide_inspection_guidance',
          description: 'Return comprehensive inspection and testing guidance',
          parameters: INSPECTOR_RESPONSE_SCHEMA
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_inspection_guidance' } }
    });

    const aiData = JSON.parse(aiResult.content);
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const inspectorResult = JSON.parse(toolCall.function.arguments);

    logger.info('Inspection guidance completed', { 
      deadTests: inspectorResult.inspectionProcedure?.deadTests?.length,
      liveTests: inspectorResult.inspectionProcedure?.liveTests?.length
    });

    // Step 5: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      inspectorResult,
      testKnowledge,
      'inspection',
      { circuitType, testType, voltage }
    );

    // Return enriched response
    const { response, suggestedNextAgents, inspectionProcedure, expectedResults, commonIssues, certificationRequirements } = inspectorResult;
    
    return new Response(
      JSON.stringify({
        success: true,
        response: enrichedResponse.response,
        enrichment: enrichedResponse.enrichment,
        citations: enrichedResponse.citations,
        rendering: enrichedResponse.rendering,
        structuredData: { inspectionProcedure, expectedResults, commonIssues, certificationRequirements },
        suggestedNextAgents: suggestedNextAgents || []
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Inspector V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

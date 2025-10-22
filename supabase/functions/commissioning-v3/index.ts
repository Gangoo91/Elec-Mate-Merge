// COMMISSIONING V3 - GN3 Practical Testing Guru
// Deployed: 2025-10-11 21:30 UTC
import { serve } from '../_shared/deps.ts';
import {
  corsHeaders,
  createLogger,
  generateRequestId,
  handleError,
  ValidationError,
  createClient,
  generateEmbeddingWithRetry,
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from "../_shared/v3-core.ts";
import { enrichResponse } from '../_shared/response-enricher.ts';
import { suggestNextAgents, generateContextHint } from '../_shared/agent-suggestions.ts';

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
        function: 'commissioning-v3',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'commissioning-v3' });

  try {
    const body = await req.json();
    const { query, circuitType, voltage, messages, previousAgentOutputs, sharedRegulations } = body;

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

    logger.info('🔍 Commissioning V3 request received', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
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

    // Use intelligent RAG with cross-encoder for testing knowledge
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    logger.debug('Starting intelligent RAG for commissioning');
    const ragStart = Date.now();
    
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
    const ragResults = await intelligentRAGSearch({
      circuitType: circuitType || 'general',
      searchTerms: `${query} testing commissioning GN3 Chapter 64 inspection procedures`.split(' ').filter(w => w.length > 3),
      expandedQuery: `${query} testing commissioning GN3 Chapter 64 inspection procedures`
    });
    
    // Use regulations (Chapter 64) for testing knowledge
    const testKnowledge = ragResults?.regulations || [];
    
    logger.debug('Testing knowledge retrieved', { 
      duration: Date.now() - ragStart,
      count: testKnowledge?.length || 0
    });

    // Step 3: Build testing context from GN3 knowledge (LIMIT to top 10 to prevent token overflow)
    const testContext = testKnowledge && testKnowledge.length > 0
      ? testKnowledge.slice(0, 10).map((test: any) => 
          `**${test.regulation_number || 'Testing Procedure'}**\n${test.content || test.section || 'No content available'}`
        ).join('\n\n')
      : 'No specific testing procedures found. Refer to GN3 and BS 7671 Chapter 64.';

    // Build conversation context with DESIGN DATA
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      const hsOutput = previousAgentOutputs.find((o: any) => o.agent === 'health-safety');
      
      contextSection += '\n\nCIRCUIT TO TEST:\n';
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `CIRCUIT: ${d.circuitType}, ${d.voltage}V, ${d.cableSize} cable\n`;
        contextSection += `PROTECTION: ${d.circuitBreaker}\n`;
        contextSection += `Ze (earth fault loop at origin): ${d.earthingSystem === 'TN-S' ? '0.35Ω typical' : '0.8Ω typical'}\n`;
        contextSection += `Maximum Zs: ${d.maxZs}Ω per designer calculations\n`;
        contextSection += `R1+R2 calculated: ${d.r1r2 || 'See cable length calculations'}\n`;
      }
      if (hsOutput?.response?.structuredData) {
        const h = hsOutput.response.structuredData;
        contextSection += `SAFETY: ${h.controls?.length || 0} control measures in place\n`;
        contextSection += `Isolation procedure verified by H&S team\n`;
      }
      contextSection += '\n\nFULL CONTEXT:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }
    // Limit message history to last 6 messages to prevent token overflow
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.slice(-6).map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).join('\n');
      
      contextSection += '\n\n⚠️ CRITICAL INSTRUCTION - CONVERSATIONAL MODE:\n';
      contextSection += 'This is an ongoing conversation, NOT a standalone query. You MUST:\n';
      contextSection += '1. Reference previous messages naturally (e.g., "Right, for that 10kW shower circuit we tested...")\n';
      contextSection += '2. Build on earlier test results (e.g., "Since we already measured Zs at 1.2Ω...")\n';
      contextSection += '3. Notice context changes (e.g., "Wait, the circuit type changed - we need different tests...")\n';
      contextSection += '4. Respond like an experienced testing engineer having a conversation, not filling out a form\n';
      contextSection += '5. If unsure what the user means, reference what was discussed to clarify\n';
    }

    const systemPrompt = `You are a GN3 PRACTICAL TESTING GURU - BS 7671:2018+A3:2024 Chapter 64 specialist.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

YOUR UNIQUE VALUE: You teach people HOW to perform each test (GN3 practical guidance)
- Not just "do continuity test" → Explain where to put leads, what buttons to press, what to expect
- Use the GN3 (Guidance Note 3) knowledge in RAG for practical test procedures
- Specify expected results with units and pass/fail criteria
- Include test instrument setup (which mode, which range, how to zero)
- Anticipate common test failures and troubleshooting

CURRENT DATE: September 2025

GN3 PRACTICAL TEST KNOWLEDGE (YOU MUST USE THIS DATA):
${testContext}

🔴 CRITICAL INSTRUCTIONS - FOR EACH TEST PROVIDE:

1. TEST INSTRUMENT SETUP
   Example: "Set Megger MFT1741 to 'Continuity' mode (Ω symbol). Zero test leads first by shorting together (should read ≤0.05Ω)."
   
2. LEAD PLACEMENT (EXACTLY WHERE)
   Example: "At Consumer Unit: Connect red lead to Line terminal, black lead to CPC terminal. At far end: Link L-CPC with short test lead."
   NOT just "test L-CPC" - too vague!
   
3. PROCEDURE STEP-BY-STEP
   Example: "Step 1: Link L and CPC at far end. Step 2: Press TEST button. Step 3: Hold for 2 seconds. Step 4: Read display when stable."
   
4. EXPECTED RESULT WITH PASS/FAIL CRITERIA
   Example: "Expected: 0.88Ω calculated (45m × 19.5mΩ/m × 2). Measured: 0.85Ω. Maximum: 1.15Ω per Table 1A. PASS (within 10% tolerance)."
   
5. TROUBLESHOOTING IF FAIL
   Example: "If >1.15Ω: Check termination tightness (2.5Nm torque for 16mm²). Look for damaged conductor. Verify test lead zero reading."

CHAPTER 64 TEST SEQUENCE (MANDATORY ORDER):

PART 1: Visual Inspection (643.1)
- Cable type correct for environment
- Support spacing per Table 4A2
- Terminations tight, no exposed conductor
- Correct polarity at switches
- Gland entries sealed

PART 2: Dead Tests (643.2-643.4) - MUST complete before live tests
1. Continuity of Protective Conductors (643.2.1) - R1+R2 method
2. Continuity of Ring Final Circuits (643.2.2) - if applicable
3. Insulation Resistance (643.3) - 500V DC for 230V circuits
4. Polarity (643.4) - verify correct connections

PART 3: Live Tests (after energisation - circuit must be live)
5. Earth Fault Loop Impedance Zs (643.7.1) - no-trip mode if RCD present
6. RCD Testing (643.10) - ×0.5, ×1, ×5 tests with trip times
7. Functional Testing (643.11) - verify operation of controls

INSTRUMENT REQUIREMENTS:
- Multifunction tester (MFT) calibrated within last 12 months
- Accuracy class ±2% or better
- GS38 approved test leads and probes
- Voltage proving device for isolation verification

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "COMPREHENSIVE GN3 testing guidance (300-400 words) covering: Complete Chapter 64 test sequence in correct order (visual → dead → live), specific instrument setup for each test (Megger MFT1741 or equivalent), exact lead placement locations (CU terminals, far end connections), step-by-step procedures (what buttons to press, how long to hold), calculated expected results with units and tolerances (R1+R2, insulation resistance, Zs), pass/fail criteria with regulation references (Table 1A, 643.3.2), troubleshooting guidance for common failures (high resistance, low insulation), safety precautions for live testing (barriers, warning notices, proving dead first), certification requirements (BS 7671 Appendix 6 forms, EIC completion)",
  "testingProcedure": {
    "visualInspection": {
      "checkpoints": [
        {"item": "Cable type", "procedure": "Confirm correct cable installed", "passCriteria": "16mm² T&E confirmed", "expectedOutcome": "PASS"}
      ]
    },
    "deadTests": [
      {
        "testName": "R1+R2 Continuity",
        "regulation": "BS 7671:2018 643.2.1",
        "testSequence": 1,
        "instrumentSetup": "Megger MFT1741: Set to Continuity mode. Zero leads (short together, read ≤0.05Ω).",
        "leadPlacement": "CU: Red to Line, Black to CPC. Far end: Link L-CPC with test lead.",
        "procedure": [
          "Step 1: Verify circuit isolated and locked off",
          "Step 2: Link Line and CPC at far end",
          "Step 3: Press TEST button at CU end",
          "Step 4: Read stable value"
        ],
        "expectedResult": {
          "calculated": "0.88Ω",
          "calculationMethod": "45m × (19.5 + 19.5)mΩ/m for 16mm²",
          "tolerance": "±10% = 0.79-0.97Ω",
          "measured": "0.85Ω",
          "maximumPermitted": "1.15Ω per Table 1A",
          "result": "PASS"
        },
        "troubleshooting": [
          "If HIGH (>1.0Ω): Check terminations with 2.5Nm torque",
          "If VERY HIGH (>5Ω): Possible break - inspect cable",
          "If LOW (<0.5Ω): Check not bridging L-N accidentally"
        ],
        "safetyNotes": ["Ensure circuit fully isolated", "Use lock-off device"]
      }
    ],
    "liveTests": [
      {
        "testName": "Earth Fault Loop Impedance (Zs)",
        "regulation": "BS 7671:2018 643.7.1",
        "testSequence": 5,
        "prerequisite": "Circuit MUST be energised. RCD locked out or use no-trip mode.",
        "instrumentSetup": "MFT: Set to Zs mode. Select No-Trip if RCD present.",
        "leadPlacement": "Test at final point (heater isolator). 3-pin adapter to L-N-E.",
        "calculation": {
          "formula": "Zs = Ze + (R1+R2)",
          "Ze": "0.35Ω (TN-S system, measured at origin)",
          "R1R2": "0.85Ω (from dead tests)",
          "expectedZs": "1.20Ω"
        },
        "procedure": [
          "Step 1: Verify 230V present (voltage indicator)",
          "Step 2: Connect test probes",
          "Step 3: Press TEST (2-second no-trip test)",
          "Step 4: Read Zs value"
        ],
        "expectedResult": {
          "calculated": "1.20Ω",
          "measured": "1.18Ω",
          "maximumPermitted": "1.44Ω (63A Type B per Table 41.3)",
          "marginOfSafety": "0.26Ω (18% margin)",
          "result": "PASS"
        },
        "interpretation": "Zs 1.18Ω ensures <0.4s disconnection per Reg 411.3.2",
        "safetyNotes": ["Live circuit - barriers required", "Competent person only"]
      }
    ]
  },
  "certification": {
    "form": "BS 7671 Electrical Installation Certificate (EIC)",
    "schedules": ["Appendix 6 - Schedule of Inspections", "Appendix 6 - Schedule of Test Results"],
    "requiredData": ["All test results", "Instrument serial numbers", "Tester signature", "Date tested"],
    "nextInspection": "10 years or change of occupancy per Table 65"
  },
  "suggestedNextAgents": []
}`;

    const userPrompt = `Provide detailed GN3 practical testing guidance for:
${query}

${circuitType ? `Circuit Type: ${circuitType}` : ''}
${voltage ? `Voltage: ${voltage}V` : ''}

Include instrument setup, lead placement, step-by-step procedures, expected results, and troubleshooting.`;

    // Step 4: Call Lovable AI with universal wrapper
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    const aiResult = await callAI(OPENAI_API_KEY!, {
      model: 'gpt-5-mini-2025-08-07',
      systemPrompt,
      userPrompt,
      maxTokens: 10000,
      timeoutMs: 280000,  // 280 seconds = 4 min 40 sec (max safe timeout)
      tools: [{
        type: 'function',
        function: {
          name: 'provide_testing_guidance',
          description: 'Return comprehensive GN3 testing procedures with instrument setup',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'Natural testing guidance. Reference conversation context. Detailed step-by-step as needed.'
              },
              testingProcedure: {
                type: 'object',
                properties: {
                  visualInspection: {
                    type: 'object',
                    properties: {
                      checkpoints: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            item: { type: 'string' },
                            procedure: { type: 'string' },
                            passCriteria: { type: 'string' },
                            expectedOutcome: { type: 'string' }
                          }
                        }
                      }
                    }
                  },
                  deadTests: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        testName: { type: 'string' },
                        regulation: { type: 'string' },
                        testSequence: { type: 'number' },
                        instrumentSetup: { type: 'string' },
                        leadPlacement: { type: 'string' },
                        procedure: { type: 'array', items: { type: 'string' } },
                        expectedResult: { type: 'object' },
                        troubleshooting: { type: 'array', items: { type: 'string' } },
                        safetyNotes: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['testName', 'regulation', 'procedure', 'expectedResult']
                    }
                  },
                  liveTests: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        testName: { type: 'string' },
                        regulation: { type: 'string' },
                        testSequence: { type: 'number' },
                        prerequisite: { type: 'string' },
                        instrumentSetup: { type: 'string' },
                        leadPlacement: { type: 'string' },
                        calculation: { type: 'object' },
                        procedure: { type: 'array', items: { type: 'string' } },
                        expectedResult: { type: 'object' },
                        interpretation: { type: 'string' },
                        safetyNotes: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['testName', 'regulation', 'procedure', 'expectedResult']
                    }
                  }
                }
              },
              certification: {
                type: 'object',
                properties: {
                  form: { type: 'string' },
                  schedules: { type: 'array', items: { type: 'string' } },
                  requiredData: { type: 'array', items: { type: 'string' } },
                  nextInspection: { type: 'string' }
                }
              },
              suggestedNextAgents: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    agent: { type: 'string' },
                    reason: { type: 'string' },
                    priority: { type: 'string', enum: ['high', 'medium', 'low'] }
                  },
                  required: ['agent', 'reason', 'priority']
                }
              }
            },
            required: ['response'],
            additionalProperties: false
          }
        }
      }],
      toolChoice: { type: 'function', function: { name: 'provide_testing_guidance' } }
    });

    const aiData = JSON.parse(aiResult.content);
    const toolCall = aiData.choices[0].message.tool_calls[0];
    const commResult = JSON.parse(toolCall.function.arguments);

    // IMPROVEMENT: Response Quality Validation
    const { validateResponse } = await import('../_shared/response-validation.ts');
    const validation = validateResponse(
      commResult.response,
      effectiveQuery,
      { testKnowledge, circuitType }
    );

    if (!validation.isValid) {
      logger.warn('⚠️ Testing response validation issues', {
        issues: validation.issues.length
      });
    }

    logger.info('Testing guidance completed', { 
      deadTests: commResult.testingProcedure?.deadTests?.length,
      liveTests: commResult.testingProcedure?.liveTests?.length,
      validationConfidence: validation.confidence
    });

    // Step 5: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      commResult,
      testKnowledge,
      'commissioning',
      { circuitType, testType: query }
    );

    // Return enriched response
    const { response, suggestedNextAgents, testingProcedure, certification } = commResult;
    
    // Log RAG metrics for observability
    const totalTime = Date.now() - requestId;
    await supabase.from('agent_metrics').insert({
      function_name: 'commissioning-v3',
      request_id: requestId,
      rag_time: ragStart ? Date.now() - ragStart : null,
      total_time: totalTime,
      regulation_count: testKnowledge?.length || 0,
      success: true,
      query_type: circuitType || 'general'
    }).catch(err => logger.warn('Failed to log metrics', { error: err.message }));

    return new Response(
      JSON.stringify({
        success: true,
        response: enrichedResponse.response,
        enrichment: enrichedResponse.enrichment,
        citations: enrichedResponse.citations,
        rendering: enrichedResponse.rendering,
        structuredData: { testingProcedure, certification },
        suggestedNextAgents: suggestNextAgents(
          'commissioning',
          query,
          responseStr,
          (previousAgentOutputs || []).map((o: any) => o.agent)
        ).map((s: any) => ({
          ...s,
          contextHint: generateContextHint(s.agent, 'commissioning', { testingProcedure, certification })
        }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Commissioning V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

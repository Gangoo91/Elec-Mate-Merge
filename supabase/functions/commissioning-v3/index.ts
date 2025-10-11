// COMMISSIONING V3 - GN3 Practical Testing Guru
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
  callLovableAIWithTimeout,
  parseJsonWithRepair
} from "../_shared/v3-core.ts";

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
    const { query, circuitType, voltage, messages, previousAgentOutputs } = body;

    // Enhanced input validation
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('query is required and must be a non-empty string');
    }
    if (query.length > 1000) {
      throw new ValidationError('query must be less than 1000 characters');
    }

    logger.info('Commissioning V3 request received', { query: query.substring(0, 50) });

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
      `${query} testing commissioning GN3 Chapter 64 inspection procedures`,
      OPENAI_API_KEY
    );
    logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

    // Step 2: Search inspection & testing knowledge database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    logger.debug('Searching inspection & testing knowledge');

    const { data: testKnowledge, error: testError } = await supabase.rpc('search_inspection_testing', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 10
    });

    if (testError) {
      logger.warn('Testing knowledge search failed', { error: testError });
    }

    // Step 3: Build testing context from GN3 knowledge
    const testContext = testKnowledge && testKnowledge.length > 0
      ? testKnowledge.map((test: any) => 
          `[GN3] ${test.topic}: ${test.content}`
        ).join('\n\n')
      : 'Apply general BS 7671 Chapter 64 testing procedures and GN3 guidance.';

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
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are a GN3 PRACTICAL TESTING GURU - BS 7671:2018+A2:2022 Chapter 64 specialist.

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

    // Step 4: Call Lovable AI (with timeout)
    logger.debug('Calling Lovable AI');
    const aiStart = Date.now();
    const aiResponse = await callLovableAIWithTimeout(systemPrompt, userPrompt, LOVABLE_API_KEY, {
      responseFormat: 'json_object',
      timeoutMs: 55000
    });
    logger.debug('AI response received', { duration: Date.now() - aiStart });

    // Use shared JSON parser with repair
    const commResult = parseJsonWithRepair(aiResponse, logger, 'commissioning');

    logger.info('Testing guidance completed', { 
      deadTests: commResult.testingProcedure?.deadTests?.length,
      liveTests: commResult.testingProcedure?.liveTests?.length
    });

    // Step 5: Return response
    return new Response(
      JSON.stringify({
        success: true,
        result: commResult,
        metadata: {
          requestId,
          knowledgeItemsUsed: testKnowledge?.length || 0,
          timestamp: new Date().toISOString()
        }
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

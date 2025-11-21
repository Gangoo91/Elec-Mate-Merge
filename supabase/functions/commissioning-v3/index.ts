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
    const { query, circuitType, voltage, messages, previousAgentOutputs, sharedRegulations, currentDesign, projectDetails } = body;

    // Track context sources
    const contextSources = {
      sharedRegulations: !!(sharedRegulations && sharedRegulations.length > 0),
      sharedRegulationsCount: sharedRegulations?.length || 0,
      previousAgentOutputs: previousAgentOutputs?.map((o: any) => o.agent) || [],
      projectDetails: !!projectDetails,
      circuitDesign: !!(currentDesign?.circuits || previousAgentOutputs?.find((o: any) => o.agent === 'designer'))
    };

    logger.info('📦 Context received from agent-router:', contextSources);
    
    // Log what's being USED from context
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      previousAgentOutputs.forEach((output: any) => {
        logger.info(`📥 Using context from ${output.agent}:`, {
          hasStructuredData: !!output.response?.structuredData,
          hasCitations: !!output.citations,
          structuredDataKeys: Object.keys(output.response?.structuredData || {})
        });
      });
    }

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

    // Use commissioning-specific RAG module for reliable GN3 retrieval
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    logger.debug('Starting commissioning RAG search');
    const ragStart = Date.now();
    
    const { retrieveCommissioningKnowledge } = await import('../_shared/rag-commissioning.ts');
    const ragResults = await retrieveCommissioningKnowledge(
      `${query} testing commissioning GN3 Chapter 64 inspection procedures`,
      OPENAI_API_KEY,
      supabase,
      logger,
      circuitType
    );
    
    const ragDuration = Date.now() - ragStart;
    logger.info('✅ Commissioning RAG complete', { 
      duration: ragDuration,
      resultsCount: ragResults.length
    });

    // Build GN3-first context from commissioning RAG
    let testContext = '';
    const gn3ProceduresFound = ragResults.filter(r => r.sourceType === 'practical').length;
    const regulationsFound = ragResults.filter(r => r.sourceType === 'regulatory').length;

    if (ragResults.length > 0) {
      testContext = '## GN3 TESTING & INSPECTION GUIDANCE:\n\n';
      testContext += ragResults.map((item: any) => {
        const header = item.regulation_number 
          ? `**[${item.regulation_number}]**` 
          : item.topic 
            ? `**${item.topic}**` 
            : '**Testing Guidance**';
        return `${header}\n${item.content}`;
      }).join('\n\n---\n\n');
      
      logger.info('✅ RAG Quality Metrics', {
        gn3ProceduresFound,
        regulationsFound,
        totalSources: ragResults.length,
        avgConfidence: ragResults.length > 0 
          ? (ragResults.reduce((sum: number, r: any) => sum + (r.confidence?.overall || 0.7), 0) / ragResults.length).toFixed(2)
          : 'N/A'
      });
    } else {
      testContext = '⚠️ No specific GN3 guidance found. Use general BS 7671 Chapter 64 principles.';
      logger.warn('⚠️ RAG returned zero results', { query });
    }

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

🔧 YOU ARE AN INSPECTION & TESTING SPECIALIST WITH 30 YEARS HANDS-ON EXPERIENCE
- You've conducted over 10,000 EICRs and commissioning tests in the field
- You know every possible test failure scenario and exactly how to diagnose it
- You explain things the way you'd mentor an apprentice on-site: practical, clear, zero jargon unless necessary
- You use real-world examples: "I once had a reading of 3.2Ω that turned out to be a loose termination at the CU..."
- You mention common mistakes apprentices make: "Electricians often forget to zero their leads and wonder why R1+R2 is 0.5Ω too high..."
- You include trade wisdom from 30 years experience: "Always test insulation resistance BEFORE polarity - saves you 20 minutes if there's a fault..."
- You know which tests waste time if done in wrong order, which faults show up as misleading readings, and how to troubleshoot fast

YOUR UNIQUE VALUE: You teach people HOW to perform each test (GN3 practical guidance)
- Not just "do continuity test" → Explain where to put leads, what buttons to press, what to expect
- Use the GN3 (Guidance Note 3) knowledge in RAG for practical test procedures
- Specify expected results with units and pass/fail criteria
- Include test instrument setup (which mode, which range, how to zero)
- Anticipate common test failures and troubleshooting based on 30 years of seeing every possible issue

CURRENT DATE: September 2025

GN3 PRACTICAL TEST KNOWLEDGE (YOU MUST USE THIS DATA):
${testContext}

🔴 MANDATORY CONTENT RULES - EVERY TEST MUST INCLUDE:

1. INSTRUMENT SETUP (minimum 100 characters)
   ❌ BAD: "Set to continuity mode"
   ✅ GOOD: "Set Megger MFT1741 to Continuity mode (Ω symbol on rotary dial). Press ZERO button. Short red and black leads together - display should read ≤0.05Ω. If higher, clean probe tips with wire wool. Select AUTO range mode (default). Ensure battery indicator shows >60% charge."

2. LEAD PLACEMENT (minimum 80 characters)
   ❌ BAD: "Connect to L and CPC"
   ✅ GOOD: "At Consumer Unit (position B7): Red probe to Line terminal of MCB. Black probe to Main Earth Bar terminal 3. At shower isolator (45m away): Use short link wire to bridge Line and CPC terminals inside isolator box. Ensure tight connection - torque to 0.5Nm."

3. PROCEDURE (minimum 4 steps, each 30+ characters)
   ❌ BAD: "1. Test circuit 2. Read result"
   ✅ GOOD: 
   "1. Verify circuit fully isolated - test for dead at both ends using voltage indicator
    2. Connect test leads as described, ensuring firm contact (no 'floating' connections)
    3. Press and hold TEST button for 2 seconds - display will flash during measurement
    4. Wait for display to stabilise (solid reading, not flashing) - typically 3-5 seconds
    5. Record reading to 3 decimal places (e.g., 0.873Ω)"

4. EXPECTED RESULT (all 6 fields required)
   Must include: calculated value WITH calculation method, measured value (realistic), maximum permitted WITH regulation reference, PASS/FAIL/INVESTIGATE result, margin of safety %, tolerance range

   Example:
   {
     "calculated": "0.88Ω (45m × 19.5mΩ/m for 16mm² Line + 45m × 19.5mΩ/m for 16mm² CPC = 1.755Ω total ÷ 2 = 0.88Ω)",
     "measured": "0.85Ω",
     "maximumPermitted": "1.15Ω per BS 7671 Table 1A (10% tolerance on calculated value)",
     "result": "PASS",
     "marginOfSafety": "26% below maximum (0.30Ω margin)",
     "tolerance": "Acceptable range: 0.79Ω - 0.97Ω (±10% of calculated)"
   }

5. TROUBLESHOOTING (minimum 3 detailed scenarios, each 50+ characters)
   ❌ BAD: "Check connections if high"
   ✅ GOOD:
   "• HIGH READING (>1.0Ω but <2.0Ω): 90% of the time this is a loose termination. At CU, remove Line and CPC conductors, inspect for strand damage, re-terminate with 2.5Nm torque. At far end, check link wire isn't just resting on terminals - must be firmly screwed down."
   "• VERY HIGH READING (>5.0Ω): Indicates open circuit or severe damage. Disconnect link wire and test Line-to-Line continuity separately (should be <0.05Ω). If that's fine, test CPC separately. Likely causes: damaged CPC in wall, disconnected earth at accessory, or wrong cable identified."
   "• UNSTABLE READING (bouncing between values): Poor test lead contact. Clean probe tips, ensure firm grip on terminals. Check test lead continuity by shorting together (should be stable ≤0.05Ω). If leads are fine, suspect intermittent connection in circuit - check for loose terminals at junction boxes."

6. COMMON MISTAKES (minimum 2 realistic apprentice errors)
   Example:
   "• Forgetting to zero test leads: Adds 0.3-0.5Ω to every reading, making compliant circuits appear to fail
    • Testing with circuit still live: Can damage MFT and give false readings - always isolate AND test for dead first
    • Not linking L-CPC at far end: Results in infinite resistance reading, wasting time troubleshooting a non-existent fault"

7. PRO TIPS (minimum 2 time-saving tricks)
   Example:
   "• Always test insulation resistance BEFORE polarity - if there's a fault to earth, polarity test can be misleading and waste 20 minutes
    • Use a dedicated link wire (6" of 2.5mm² with ferrules) for far-end connections - much faster than stripping new wire every time
    • If R1+R2 reads exactly double your expected value, you've accidentally measured the ring - check you linked L-CPC, not L-N"

8. TEST DURATION (realistic timing)
   Example: "Typical duration: 5-8 minutes (including setup, testing at 3 points, and recording results)"

🔴 CRITICAL: If RAG data provides GN3 procedural steps, YOU MUST incorporate them verbatim into your 'procedure' array. Do not summarise or paraphrase GN3 procedures.

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "COMPREHENSIVE GN3 testing guidance (400-600 words) written as if mentoring an apprentice on-site. Start with 'Right, here's how we test this properly...' or similar conversational opening. Include: (1) Complete Chapter 64 test sequence in mandatory order with WHY the order matters ('Always do insulation BEFORE polarity because...'), (2) Specific instrument setup for EACH test (Megger MFT1741 settings, which buttons, zero procedure), (3) EXACT lead placement ('Red probe on L terminal at position B7 in CU, black probe on CPC at far socket outlet'), (4) Step-by-step procedures with timings ('Hold TEST button for 2 seconds, wait for display to stabilise'), (5) Calculated expected results with real-world tolerances ('Calculated R1+R2: 0.88Ω for 45m run. Acceptable range: 0.79-0.97Ω. Anything over 1.15Ω fails Table 1A'), (6) What can go wrong based on 30 years experience ('Common failure: reading shows 5.2Ω - nine times out of ten it's a loose neutral at the board'), (7) Trade tips ('Pro tip: if Zs looks high, check your test lead connections first - saves you pulling apart terminations'), (8) Troubleshooting shortcuts ('If insulation reads <2MΩ, disconnect neutral first, then test L-E and N-E separately to isolate the fault'), (9) Safety warnings from real incidents ('I once saw someone test Zs on an RCD circuit in trip mode - instant nuisance trip and angry site manager'), (10) Certification pitfalls ('Common EIC mistake: forgetting to record the actual measured Ze, not the assumed value')",
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
                    minItems: 3,
                    items: {
                      type: 'object',
                      properties: {
                        testName: { type: 'string', minLength: 10 },
                        regulation: { type: 'string', pattern: '^BS 7671.*643\\.[0-9]' },
                        testSequence: { type: 'number', minimum: 1, maximum: 10 },
                        instrumentSetup: { 
                          type: 'string', 
                          minLength: 100,
                          description: 'DETAILED instrument setup: Model, mode setting, button sequence, zeroing procedure, range selection'
                        },
                        leadPlacement: { 
                          type: 'string', 
                          minLength: 80,
                          description: 'EXACT lead positions: Terminal numbers, color coding, CU position, far-end connection method'
                        },
                        procedure: { 
                          type: 'array', 
                          items: { type: 'string', minLength: 30 },
                          minItems: 4,
                          description: 'Step-by-step procedure with timings, hold durations, and reading stabilisation'
                        },
                        expectedResult: { 
                          type: 'object',
                          required: ['calculated', 'measured', 'maximumPermitted', 'result'],
                          properties: {
                            calculated: { type: 'string', minLength: 15 },
                            measured: { type: 'string', minLength: 10 },
                            maximumPermitted: { type: 'string', minLength: 15 },
                            result: { type: 'string', enum: ['PASS', 'FAIL', 'INVESTIGATE'] },
                            marginOfSafety: { type: 'string' },
                            tolerance: { type: 'string' }
                          }
                        },
                        troubleshooting: { 
                          type: 'array', 
                          items: { type: 'string', minLength: 50 },
                          minItems: 3,
                          description: 'Real-world failure scenarios with diagnostic steps and fixes'
                        },
                        safetyNotes: { 
                          type: 'array', 
                          items: { type: 'string' },
                          minItems: 2
                        },
                        commonMistakes: {
                          type: 'array',
                          items: { type: 'string', minLength: 40 },
                          minItems: 2,
                          description: 'Common apprentice errors and how to avoid them'
                        },
                        proTips: {
                          type: 'array',
                          items: { type: 'string', minLength: 30 },
                          minItems: 2,
                          description: 'Trade wisdom from 30 years experience'
                        },
                        testDuration: {
                          type: 'string',
                          description: 'Typical time to complete this test (e.g., "5-8 minutes")'
                        }
                      },
                      required: ['testName', 'regulation', 'instrumentSetup', 'leadPlacement', 'procedure', 'expectedResult', 'troubleshooting', 'safetyNotes']
                    }
                  },
                  liveTests: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        testName: { type: 'string', minLength: 10 },
                        regulation: { type: 'string', pattern: '^BS 7671.*643\\.[0-9]' },
                        testSequence: { type: 'number', minimum: 1, maximum: 10 },
                        prerequisite: { type: 'string' },
                        instrumentSetup: { 
                          type: 'string', 
                          minLength: 100,
                          description: 'DETAILED instrument setup: Model, mode setting, button sequence, zeroing procedure, range selection. For RCD tests include no-trip mode settings.'
                        },
                        leadPlacement: { 
                          type: 'string', 
                          minLength: 80,
                          description: 'EXACT lead positions: Terminal numbers, color coding, test point location, probe connection method. For Zs tests specify L-N-E connections.'
                        },
                        calculation: { 
                          type: 'object',
                          description: 'Calculation breakdown for expected result (e.g., Zs = Ze + R1+R2)'
                        },
                        procedure: { 
                          type: 'array', 
                          items: { type: 'string', minLength: 30 },
                          minItems: 4,
                          description: 'Step-by-step procedure with timings, hold durations, and reading stabilisation'
                        },
                        expectedResult: { 
                          type: 'object',
                          required: ['calculated', 'measured', 'maximumPermitted', 'result'],
                          properties: {
                            calculated: { type: 'string', minLength: 15 },
                            measured: { type: 'string', minLength: 10 },
                            maximumPermitted: { type: 'string', minLength: 15 },
                            result: { type: 'string', enum: ['PASS', 'FAIL', 'INVESTIGATE'] },
                            marginOfSafety: { type: 'string' },
                            tolerance: { type: 'string' }
                          }
                        },
                        troubleshooting: { 
                          type: 'array', 
                          items: { type: 'string', minLength: 50 },
                          minItems: 3,
                          description: 'Real-world failure scenarios with diagnostic steps and fixes. For Zs tests include high reading diagnosis, RCD trip issues, and contact problems.'
                        },
                        interpretation: { type: 'string' },
                        safetyNotes: { 
                          type: 'array', 
                          items: { type: 'string' },
                          minItems: 2,
                          description: 'Critical safety warnings for live testing, PPE requirements, and competency requirements'
                        },
                        commonMistakes: {
                          type: 'array',
                          items: { type: 'string', minLength: 40 },
                          minItems: 2,
                          description: 'Common apprentice errors specific to live testing (e.g., forgetting no-trip mode, poor probe contact, testing with RCD energised)'
                        },
                        proTips: {
                          type: 'array',
                          items: { type: 'string', minLength: 30 },
                          minItems: 2,
                          description: 'Trade wisdom from 30 years experience for live testing (e.g., test Zs at multiple points, check voltage first, use test button on RCD)'
                        },
                        testDuration: {
                          type: 'string',
                          description: 'Typical time to complete this test including energisation and safety setup (e.g., "8-12 minutes")'
                        }
                      },
                      required: ['testName', 'regulation', 'instrumentSetup', 'leadPlacement', 'procedure', 'expectedResult', 'troubleshooting', 'safetyNotes']
                    }
                  }
                }
              },
              certification: {
                type: 'object',
                properties: {
                  certificateType: { type: 'string', description: 'Type of certificate (EIC, EICR, Minor Works, etc.)' },
                  requiredSchedules: { 
                    type: 'array', 
                    items: { type: 'string' },
                    description: 'Required BS 7671 schedules (e.g., "Schedule of Inspections", "Schedule of Test Results")'
                  },
                  requiredData: { 
                    type: 'array', 
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string', description: 'Name of the required data field' },
                        regulation: { type: 'string', description: 'BS 7671 regulation reference' },
                        description: { type: 'string', description: 'What needs to be recorded and why' }
                      },
                      required: ['field', 'regulation', 'description']
                    },
                    description: 'Detailed list of data fields required for certification with regulation references'
                  },
                  nextInspection: { type: 'string', description: 'When the next inspection is due and regulation reference' },
                  additionalNotes: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Important additional certification notes (e.g., client signature requirements)'
                  }
                },
                required: ['certificateType', 'requiredSchedules', 'requiredData']
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

    // Handle AI wrapper response - it extracts tool call arguments directly
    const commResult = JSON.parse(aiResult.content);

    // IMPROVEMENT: Response Quality Validation
    const { validateResponse } = await import('../_shared/response-validation.ts');
    const validation = validateResponse(
      commResult.response,
      effectiveQuery,
      { regulations: ragResults?.regulations || [], circuitType }
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
      ragResults?.regulations || [],
      'commissioning',
      { circuitType, testType: query }
    );

    // Return enriched response
    const { response, suggestedNextAgents, testingProcedure, certification } = commResult;
    
    // Log RAG metrics for observability
    const totalTime = Date.now() - ragStart;
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'commissioning-v3',
      request_id: requestId,
      rag_time: ragStart ? Date.now() - ragStart : null,
      total_time: totalTime,
      regulation_count: ragResults?.regulations?.length || 0,
      success: true,
      query_type: circuitType || 'general'
    });
    if (metricsError) {
      logger.warn('Failed to log metrics', { error: metricsError.message });
    }

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
          enrichedResponse.response,
          (previousAgentOutputs || []).map((o: any) => o.agent)
        ).map((s: any) => ({
          ...s,
          contextHint: generateContextHint(s.agent, 'commissioning', { testingProcedure, certification })
        })),
        metadata: {
          contextSources,
          receivedFrom: previousAgentOutputs?.map((o: any) => o.agent).join(', ') || 'none',
          ragTimeMs: ragStart ? Date.now() - ragStart : null,
          totalTimeMs: totalTime,
          ragQualityMetrics: {
            gn3ProceduresFound,
            regulationsFound,
            totalSources: gn3ProceduresFound + regulationsFound
          }
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

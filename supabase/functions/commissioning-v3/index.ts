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
import { callOpenAI } from '../_shared/ai-providers.ts';
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
    const { query, circuitType, voltage, messages, previousAgentOutputs, sharedRegulations, currentDesign, projectDetails, imageUrl } = body;

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

    // PHASE 0: Query Classification - Detect if user wants procedure vs troubleshooting/Q&A
    const classification = classifyCommissioningQuery(effectiveQuery);
    logger.info('🧠 Query classified', { 
      mode: classification.mode,
      confidence: classification.confidence,
      reasoning: classification.reasoning
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
    
    // Enhanced query for photo analysis
    const enhancedQuery = imageUrl 
      ? `${query} visual inspection photo analysis electrical installation safety compliance`
      : `${query} testing commissioning GN3 Chapter 64 inspection procedures`;
    
    const { retrieveCommissioningKnowledge } = await import('../_shared/rag-commissioning.ts');
    const ragResults = await retrieveCommissioningKnowledge(
      enhancedQuery,
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

    // Query Classification Function
    function classifyCommissioningQuery(query: string): {
      mode: 'procedure' | 'troubleshooting' | 'question';
      confidence: number;
      reasoning: string;
    } {
      const lowerQuery = query.toLowerCase();
      
      // TROUBLESHOOTING PATTERNS (user has a fault/problem)
      const troubleshootingPatterns = [
        /reading.*(?:showing|is|reads|getting)/i,
        /(?:fault|problem|issue|error).*(?:with|on|in)/i,
        /why.*(?:am i|is|does)/i,
        /(?:insulation|continuity|zs|rcd).*(?:failing|failed|won't|doesn't)/i,
        /(?:0\.\d+|[0-9]+\.?[0-9]*)\s*(?:mω|ω|ma|v)\s*on/i,
        /what.*wrong/i,
        /how.*(?:fix|repair|solve)/i
      ];
      
      // QUESTION PATTERNS (learning/clarification)
      const questionPatterns = [
        /^what\s+(?:is|are|does|should)/i,
        /^when\s+(?:do|should|can)/i,
        /^where\s+(?:do|should)/i,
        /^how\s+(?:do|can|should).*(?:\?|$)/i,
        /^can\s+(?:i|you|we)/i,
        /^why\s+(?:is|does|do)/i,
        /what.*(?:mean|required|acceptable|criteria)/i,
        /explain/i,
        /difference between/i
      ];
      
      // PROCEDURE GENERATION PATTERNS (wants full structured output)
      const procedurePatterns = [
        /(?:step|procedure|testing|commission|test).*(?:for|on)/i,
        /(?:generate|create|provide|give me).*(?:procedure|test|commissioning)/i,
        /(?:complete|full).*(?:testing|commissioning|procedure)/i,
        /all.*tests.*required/i,
        /eic|eicr|electrical installation certificate/i,
        /new.*(?:consumer unit|distribution board|circuit)/i
      ];
      
      const troubleshootingScore = troubleshootingPatterns.filter(p => p.test(query)).length;
      const questionScore = questionPatterns.filter(p => p.test(query)).length;
      const procedureScore = procedurePatterns.filter(p => p.test(query)).length;
      
      const isDetailedRequest = query.length > 80 && /\d+/.test(query);
      
      if (troubleshootingScore > 0 && troubleshootingScore >= questionScore) {
        return {
          mode: 'troubleshooting',
          confidence: Math.min(0.95, 0.6 + (troubleshootingScore * 0.15)),
          reasoning: `Detected fault/problem indicators`
        };
      }
      
      if (questionScore > procedureScore && query.length < 100) {
        return {
          mode: 'question',
          confidence: Math.min(0.9, 0.5 + (questionScore * 0.2)),
          reasoning: `Detected question pattern`
        };
      }
      
      if (procedureScore > 0 || isDetailedRequest) {
        return {
          mode: 'procedure',
          confidence: Math.min(0.95, 0.7 + (procedureScore * 0.1)),
          reasoning: `Detected procedure request`
        };
      }
      
      return {
        mode: 'question',
        confidence: 0.4,
        reasoning: 'No clear pattern detected - defaulting to conversational mode'
      };
    }

    // Conversational Prompt Builder
    function buildConversationalPrompt(
      mode: 'troubleshooting' | 'question',
      ragContext: string,
      conversationContext: string
    ): string {
      const threePhaseGuidance = `
**3-PHASE INSTALLATIONS (400V/415V BS 7671:2018+A3:2024)**:

SAFE ISOLATION (Regulation 537.2):
- Prove dead on ALL THREE PHASES individually
- Test phase-to-earth AND phase-to-phase (6 tests total: L1-N, L2-N, L3-N, L1-L2, L2-L3, L3-L1)
- Use approved voltage indicator conforming to GS38
- Lock off isolator, apply warning labels
- Verify isolation at BOTH ends if long cable run

TESTING PROCEDURES:
1. Phase Sequence (correct rotation L1→L2→L3):
   - Use phase rotation tester
   - Motors: clockwise rotation = correct sequence
   - Incorrect = swap ANY TWO phases only (never swap all three)
   - Critical for: Motors, 3-phase heating, lifts, pumps

2. Voltage Balance (max 2% imbalance per BS 7671):
   - Measure L1-N, L2-N, L3-N with no load
   - Expect ~230V each phase
   - Calculate: (Max voltage - Min voltage) / Average voltage × 100%
   - Example: 232V, 228V, 230V → (232-228)/230×100 = 1.74% ✅ PASS

3. Insulation Resistance (500V DC test):
   - Test EACH phase to earth separately (≥1MΩ minimum)
   - Test phase-to-phase: L1-L2, L2-L3, L3-L1 (≥1MΩ each)
   - Disconnect neutral link at distribution board for accurate readings
   - All loads OFF, all switches ON (test entire circuit)

4. Earth Loop Impedance (Zs):
   - Test at EACH phase separately
   - Use highest reading to verify compliance
   - Compare against BS 7671 Table 41.3 maximum Zs for protective device
   - 3-phase circuits often use 4-pole RCBOs: check all poles trip together

5. RCD Testing (if fitted):
   - Test RCD on EACH phase separately
   - All three tests must pass (<300ms at 1×IΔn, <40ms at 5×IΔn)
   - Verify 4-pole RCD disconnects all phases simultaneously

FAULT FINDING:
- Phase loss → Check upstream isolator, check all three fuses, inspect connections at each phase
- Unbalanced load → Redistribute single-phase loads across three phases evenly
- Motor won't start → Verify phase sequence (wrong sequence = reverse rotation or no start)
- Motor hums but won't turn → Likely single-phase supply (one phase lost)
- RCD nuisance tripping → Test IR on each phase separately to identify faulty phase
- High Zs on one phase → Check terminations, neutral-earth fault, or damaged conductor

COMMON 3-PHASE MISTAKES (from 30 years experience):
- Testing phase-to-earth IR only (forgetting phase-to-phase tests)
- Wrong phase sequence causing motor damage
- Not testing Zs on all three phases (highest determines compliance)
- Forgetting to disconnect neutral for accurate IR readings
- Not verifying 4-pole devices trip all poles together
`;

      const basePersona = `You are a GN3 PRACTICAL TESTING GURU with 30 years field experience.

Write all responses in UK English (British spelling and terminology).

You're having a conversation with an electrician who needs quick, practical advice.
- Be conversational but professional
- Reference specific BS 7671 regulations when relevant
- Give actionable steps, not just theory
- Mention common pitfalls from your 30 years experience
- Keep responses focused: 200-400 words max

${threePhaseGuidance}

AVAILABLE KNOWLEDGE:
${ragContext}

${conversationContext}`;

      if (mode === 'troubleshooting') {
        return `${basePersona}

🔧 TROUBLESHOOTING MODE - STRUCTURED FAULT DIAGNOSIS

You MUST provide a comprehensive fault diagnosis using the RAG safety status system:

**RAG STATUS DEFINITIONS:**
- 🔴 RED: Critical safety issue, unsafe condition, MUST be addressed before proceeding
  Examples: Live exposed conductors, arcing, thermal damage, voltage on earth
- 🟡 AMBER: Requires investigation or adjustment, not immediately dangerous but non-compliant
  Examples: High Zs reading (but below 230V), low IR (0.5-1.0MΩ), loose terminals
- 🟢 GREEN: Normal verification checks, routine testing, acceptable conditions
  Examples: Visual inspection, continuity verification, polarity confirmation

**RESPONSE STRUCTURE:**

1. **Fault Summary** (30-50 words)
   - What symptom the user reported
   - 2-4 most likely root causes from experience
   - Safety risk level (LOW/MODERATE/HIGH/CRITICAL)
   - Immediate action required

2. **Diagnostic Workflow** (minimum 3 steps, RAG-coded)
   Each step must include:
   - RAG status (RED/AMBER/GREEN)
   - What to test/inspect/verify
   - What to measure (voltage, resistance, current, etc.)
   - Expected reading with unit (e.g., "230V ±10%", "<0.05Ω", ">1.0MΩ")
   - Acceptable range with tolerance
   - Instrument setup (mode, range, connections)
   - Safety warnings (PPE, isolation, live working)
   - What to do if check fails
   - BS 7671 regulation reference

3. **Corrective Actions**
   For each potential fault:
   - Symptom that triggers this action
   - Specific corrective procedure
   - Tools required
   - Estimated repair time
   - How to verify the fix worked

4. **Lockout/Tagout Requirements**
   - Is LOTO required? (YES/NO)
   - Step-by-step isolation procedure
   - All isolation points to lock

5. **Additional Context**
   - Common mistakes that cause this fault
   - Pro tips from 30 years experience
   - Relevant BS 7671 regulations

**CRITICAL RULES:**
- Always start with safety (isolation, proving dead)
- Give numeric expected readings, not vague descriptions
- Reference specific instrument settings
- Mention PPE requirements for live work
- Cite BS 7671 regulation numbers
- Use real-world fault scenarios from experience

TONE: Urgent but calm, safety-first, practical troubleshooting mentor`;
      } else {
        return `${basePersona}

❓ QUESTION MODE INSTRUCTIONS:

The electrician wants to learn or clarify something. Your response MUST:

1. **Direct answer first** (answer in first 2 sentences)
2. **Explain the "why"** with regulation backing
3. **Give practical context** (when does this apply, exceptions, scenarios)
4. **Add a real-world tip** from your experience
5. **Reference BS 7671** (regulation numbers)

TONE: Clear, helpful, like explaining to an apprentice over coffee`;
      }
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

    // BRANCH LOGIC: Procedure vs Conversational Mode
    if (classification.mode === 'procedure') {
      logger.info('📋 Generating structured procedure');
      
      // EXISTING PROCEDURE GENERATION CODE CONTINUES BELOW
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

**TEST SEQUENCE LOGIC:**
For EVERY test (dead and live), specify:

prerequisiteTests:
- Safety isolation before dead tests
- Continuity tests before insulation resistance
- Dead tests complete before re-energisation
- Polarity verified before Zs testing
- Voltage presence confirmed before RCD testing

conflictingTests:
- Do NOT do insulation resistance immediately after RCD testing (RCD must be reconnected)
- Do NOT do Zs testing before polarity verification
- Do NOT do RCD testing before confirming circuit is energised and stable

Examples:
Dead Test - Insulation Resistance:
  prerequisiteTests: ["Continuity of protective conductors", "Continuity of ring final circuits"]
  conflictingTests: []

Live Test - Earth Fault Loop Impedance (Zs):
  prerequisiteTests: ["Safe re-energisation", "Polarity verification", "Voltage presence confirmed"]
  conflictingTests: ["RCD testing without re-energisation"]

Live Test - RCD Operation:
  prerequisiteTests: ["Zs testing complete", "Circuit proven energised and stable"]
  conflictingTests: ["Insulation resistance (unless RCD reconnected)"]

**CALCULATION BREAKDOWN REQUIREMENTS:**
For live tests requiring calculations (Zs, PSC, voltage drop):
- Formula: Use proper mathematical notation (Zs = Ze + (R1 + R2))
- Components: Break down EVERY value used:
  * Ze: State source (DNO declaration, measured at origin, assumed for design)
  * R1+R2: State if measured or calculated from cable data
  * Cable details: Length in metres, CSA in mm²
- Expected Result: Calculate to 2 decimal places with units
- Limit Check: Show the comparison "0.89Ω < 1.44Ω (Table 41.3 for 32A Type B MCB) ✓"

Example for Zs test:
{
  "formula": "Zs = Ze + (R1 + R2)",
  "components": {
    "Ze": "0.35Ω (measured at origin, TN-S supply)",
    "R1R2": "0.54Ω (measured continuity test on ring final)",
    "cableLength": "18m radial distance",
    "cableCsa": "2.5mm² twin & earth"
  },
  "expectedResult": "0.89Ω",
  "limitCheck": "0.89Ω < 1.44Ω (BS 7671 Table 41.3 for 32A Type B MCB) ✓ COMPLIANT"
}

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
                        },
                        prerequisiteTests: {
                          type: 'array',
                          items: { type: 'string' },
                          description: 'Tests that MUST be completed before this test (e.g., ["Continuity of protective conductors"] before "Insulation resistance")'
                        },
                        conflictingTests: {
                          type: 'array',
                          items: { type: 'string' },
                          description: 'Tests that should NOT be performed immediately before/after this test without intermediate steps'
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
              required: ['formula', 'components'],
              properties: {
                formula: { 
                  type: 'string', 
                  minLength: 10,
                  description: 'Mathematical formula (e.g., "Zs = Ze + (R1 + R2)")'
                },
                components: {
                  type: 'object',
                  description: 'Individual component values with sources',
                  properties: {
                    Ze: { type: 'string', description: 'External impedance with source (e.g., "0.35Ω (from TNS supply)")' },
                    R1: { type: 'string', description: 'Line conductor resistance' },
                    R2: { type: 'string', description: 'CPC resistance' },
                    R1R2: { type: 'string', description: 'Combined R1+R2 value' },
                    cableLength: { type: 'string' },
                    cableCsa: { type: 'string' }
                  }
                },
                expectedResult: { 
                  type: 'string',
                  minLength: 10,
                  description: 'Calculated result with units (e.g., "0.89Ω")'
                },
                limitCheck: {
                  type: 'string',
                  minLength: 20,
                  description: 'Comparison against maximum permitted value from BS 7671 (e.g., "0.89Ω < 1.44Ω (Table 41.3) ✓")'
                }
              }
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
            },
            prerequisiteTests: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tests that MUST be completed before this test (e.g., ["Safe re-energisation", "Polarity verification"] before "Zs testing")'
            },
            conflictingTests: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tests that should NOT be performed immediately before/after this test without intermediate steps'
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
        mode: 'procedure',
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
          classification,
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

  } else {
    // CONVERSATIONAL MODE - Troubleshooting or Question
    logger.info('💬 Generating conversational response', { mode: classification.mode });
    
    const conversationalPrompt = buildConversationalPrompt(
      classification.mode,
      testContext,
      contextSection
    );
    
    // Use structured fault diagnosis for ALL troubleshooting queries (trust AI classification)
    const useStructuredDiagnosis = classification.mode === 'troubleshooting';
    
    if (useStructuredDiagnosis) {
      logger.info('🔧 Using structured fault diagnosis tool');
      
      const faultDiagnosisTool = {
        type: 'function' as const,
        function: {
          name: 'provide_fault_diagnosis',
          description: 'Provide structured fault diagnosis with RAG safety status',
          parameters: {
            type: 'object',
            properties: {
              faultSummary: {
                type: 'object',
                properties: {
                  reportedSymptom: { type: 'string' },
                  likelyRootCauses: { type: 'array', items: { type: 'string' }, minItems: 2, maxItems: 4 },
                  safetyRisk: { type: 'string', enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] },
                  immediateAction: { type: 'string' }
                },
                required: ['reportedSymptom', 'likelyRootCauses', 'safetyRisk']
              },
              diagnosticWorkflow: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    stepNumber: { type: 'number' },
                    ragStatus: { type: 'string', enum: ['RED', 'AMBER', 'GREEN'] },
                    stepTitle: { type: 'string' },
                    action: { type: 'string' },
                    whatToTest: { type: 'string' },
                    whatToMeasure: { type: 'string' },
                    expectedReading: { type: 'string' },
                    acceptableRange: { type: 'string' },
                    instrumentSetup: { type: 'string' },
                    safetyWarnings: { type: 'array', items: { type: 'string' } },
                    ifFailed: { type: 'string' },
                    regulation: { type: 'string' }
                  },
                  required: ['stepNumber', 'ragStatus', 'stepTitle', 'action', 'whatToTest']
                },
                minItems: 3
              },
              correctiveActions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    forSymptom: { type: 'string' },
                    action: { type: 'string' },
                    tools: { type: 'array', items: { type: 'string' } },
                    estimatedTime: { type: 'string' },
                    verificationTest: { type: 'string' }
                  }
                }
              },
              lockoutTagout: {
                type: 'object',
                properties: {
                  required: { type: 'boolean' },
                  procedure: { type: 'array', items: { type: 'string' } },
                  isolationPoints: { type: 'array', items: { type: 'string' } }
                }
              },
              additionalContext: {
                type: 'object',
                properties: {
                  commonMistakes: { type: 'array', items: { type: 'string' } },
                  proTips: { type: 'array', items: { type: 'string' } },
                  regulations: { type: 'array', items: { type: 'string' } }
                }
              }
            },
            required: ['faultSummary', 'diagnosticWorkflow', 'correctiveActions']
          }
        }
      };
      
      // Build messages with vision support
      const troubleshootingMessages: any[] = [
        { role: 'system', content: conversationalPrompt }
      ];

      if (messages && messages.length > 0) {
        troubleshootingMessages.push(...messages.slice(-6));
      }

      // Build user message with photo if provided
      let userMessageContent: any;
      if (imageUrl) {
        logger.info('🖼️ Photo analysis mode (structured diagnosis) - using vision model');
        userMessageContent = [
          {
            type: "text",
            text: `${effectiveQuery}

📸 PHOTO ANALYSIS - STRUCTURED FAULT DIAGNOSIS:
Analyse this installation photo and provide structured fault diagnosis with RAG status codes.`
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl
            }
          }
        ];
      } else {
        userMessageContent = effectiveQuery;
      }

      troubleshootingMessages.push({
        role: 'user',
        content: userMessageContent
      });

      const modelToUse = imageUrl ? 'gpt-4o-mini' : 'gpt-5-mini';
      logger.info(`🤖 Using model: ${modelToUse}${imageUrl ? ' (vision structured diagnosis)' : ''}`);

      const aiResponse = await callOpenAI(
        {
          messages: troubleshootingMessages,
          model: modelToUse,
          tools: [faultDiagnosisTool],
          tool_choice: { type: 'function', function: { name: 'provide_fault_diagnosis' } }
        },
        OPENAI_API_KEY!,
        120000
      );
      
      const toolCall = aiResponse.toolCalls?.[0];
      logger.info('🔧 Tool call response', { 
        hasToolCall: !!toolCall, 
        toolName: toolCall?.function?.name,
        hasArguments: !!toolCall?.function?.arguments 
      });
      
      if (toolCall?.function?.arguments) {
        try {
          const diagnosisData = JSON.parse(toolCall.function.arguments);
          logger.info('✅ Parsed fault diagnosis data successfully', {
            hasWorkflow: !!diagnosisData.diagnosticWorkflow,
            workflowSteps: diagnosisData.diagnosticWorkflow?.length || 0,
            hasSummary: !!diagnosisData.faultSummary
          });
          
          return new Response(
            JSON.stringify({
              success: true,
              mode: 'fault-diagnosis',
              queryType: 'troubleshooting',
              structuredDiagnosis: diagnosisData,
              citations: ragResults || [],
              metadata: {
                classification,
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
          logger.error('❌ Failed to parse tool call arguments', { 
            error: error instanceof Error ? error.message : String(error) 
          });
          // Fall through to conversational mode
        }
      } else {
        logger.warn('⚠️ No tool call returned despite troubleshooting mode - falling back to conversational', {
          responseContent: aiResponse.content?.substring(0, 200)
        });
      }
    }
    
    // Fallback: QUESTION MODE - conversational text response
    const questionModePrompt = buildConversationalPrompt(
      'question',
      testContext,
      contextSection
    );

    // Build messages with vision support
    const questionMessages: any[] = [
      { role: 'system', content: questionModePrompt }
    ];

    // Add conversation history
    if (messages && messages.length > 0) {
      questionMessages.push(...messages.slice(-6));
    }

    // Build user message with photo if provided
    let userMessageContent: any;
    if (imageUrl) {
      logger.info('🖼️ Photo analysis mode (question) - using vision model');
      userMessageContent = [
        {
          type: "text",
          text: `${effectiveQuery}

📸 Analyse this installation photo and answer the question.`
        },
        {
          type: "image_url",
          image_url: {
            url: imageUrl
          }
        }
      ];
    } else {
      userMessageContent = effectiveQuery;
    }

    questionMessages.push({
      role: 'user',
      content: userMessageContent
    });

    const modelToUse = imageUrl ? 'gpt-4o-mini' : 'gpt-5-mini';
    logger.info(`🤖 Using model: ${modelToUse}${imageUrl ? ' (vision Q&A)' : ''}`);

    const aiResponse = await callOpenAI(
      {
        messages: questionMessages,
        model: modelToUse
      },
      OPENAI_API_KEY!,
      120000
    );
    
    const conversationalResponse = aiResponse.content || 'Unable to generate response';
    
    return new Response(
      JSON.stringify({
        success: true,
        mode: 'conversational',
        queryType: classification.mode,
        response: conversationalResponse,
        citations: ragResults || [],
        metadata: {
          classification,
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
  }
  // END OF BRANCH LOGIC

  } catch (error) {
    logger.error('Commissioning V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

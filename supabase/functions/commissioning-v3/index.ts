// COMMISSIONING V3 - GN3 Practical Testing Guru
// Deployed: 2025-11-21 - Updated OpenAI API key configuration
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
import { EICR_CODE_DEFINITIONS, BS7671_DEFECT_EXAMPLES } from '../_shared/eicr-coding-constants.ts';

// Safe JSON stringification to prevent circular reference errors
function safeStringify(obj: any): string {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return '[Circular]';
      }
      seen.add(value);
    }
    return value;
  });
}

// Safe base64 encoding for large buffers (avoids stack overflow)
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192; // Process in 8KB chunks
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  return btoa(binary);
}

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

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
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

🔧 TROUBLESHOOTING MODE - COMPREHENSIVE FAULT DIAGNOSIS

**MANDATORY OUTPUT REQUIREMENTS:**

1. **Fault Summary** (ENHANCED - ALL FIELDS REQUIRED)
   - Reported symptom (verbatim from user)
   - 3-4 likely root causes from 30 years experience
   - Secondary symptoms to look for (2-3 related indicators)
   - Safety risk level with justification
   - Risk to occupants (plain English)
   - Risk to property (fire/damage assessment)
   - Typical repair timeframe (e.g., "30 mins - 2 hours")
   - Immediate action required

2. **Diagnostic Workflow** (MINIMUM 5 STEPS)
   Each step MUST include ALL of:
   - RAG status (RED/AMBER/GREEN) with justification
   - Lead placement (exact terminal positions)
   - Test duration estimate (e.g., "2-3 minutes")
   - Instrument model recommendation (UK brands: Megger, Fluke, Kewtech)
   - Temperature effects on readings (e.g., "Copper resistance changes 0.4% per °C")
   - Real-world troubleshooting example from experience
   - Client explanation (plain English for non-technical explanation)
   - Troubleshooting sequence if step fails
   
   **RAG STATUS DEFINITIONS:**
   - 🔴 RED: Critical safety issue, unsafe condition, MUST be addressed before proceeding
   - 🟡 AMBER: Requires investigation or adjustment, not immediately dangerous
   - 🟢 GREEN: Normal verification checks, routine testing
   
3. **Corrective Actions** (MINIMUM 2 ACTIONS - ENHANCED WITH DETAILED PROCEDURE)
   Each action MUST include ALL of:
   - Symptom that triggers this action
   - Action overview (brief 1-2 sentences)
   - **detailedProcedure**: Array of 3-5 detailed paragraphs (150+ words each) explaining the fix comprehensively
   - **stepByStepFix**: Array of numbered steps with specific measurements, torque values, test points
   - **whyThisWorks**: Technical explanation of why this fix resolves the fault (100+ words)
   - **alternativeMethods**: Array of 2-3 alternative approaches to fix the same issue
   - Materials cost estimate (UK prices, e.g., "£15-25 for terminal blocks")
   - Skill level required (apprentice/qualified/specialist)
   - Part numbers (UK suppliers: MK, Hager, Schneider, Crabtree, etc.)
   - BS 7671 reference for this fix
   - Common brands to use
   - Safety notes for this specific fix
   - Tools required
   - Estimated time
   - Verification test

4. **Cost Estimate** (NEW SECTION - REQUIRED)
   - Materials breakdown (itemised)
   - Labour estimate (hourly rate × estimated time)
   - Total cost range (low-high)
   - Notes on variations

5. **Client Communication** (NEW SECTION - REQUIRED)
   - Plain English summary for client (non-technical)
   - Why urgent (or not) - explain risk clearly
   - What to expect during repair
   - Quotation notes (if applicable)

6. **Documentation Requirements** (NEW SECTION - REQUIRED)
   - Tests to record on certificate
   - Certificates needed (EIC, EICR, Minor Works)
   - Notes for EIC/EICR schedule

7. **Lockout/Tagout Requirements**
   - Is LOTO required? (YES/NO)
   - Step-by-step isolation procedure
   - All isolation points to lock

8. **Additional Context**
   - Common mistakes that cause this fault
   - Pro tips from 30 years experience
   - Relevant BS 7671 regulations

**CRITICAL RULES:**
- Always start with safety (isolation, proving dead)
- Give numeric expected readings with units
- Reference specific instrument settings and models
- Include temperature effects on readings
- Cite BS 7671 regulation numbers
- Use real-world fault scenarios from 30 years experience
- Provide UK-specific part numbers and pricing
- Write client explanations in plain English

TONE: Urgent but calm, safety-first, comprehensive troubleshooting mentor with cost awareness`;
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

SITE EXPERIENCE DEPTH:
- You've tested in every UK building condition: -5°C lofts with condensation, 40°C summer attics, damp basements, dusty construction sites, cramped understairs cupboards with 400mm clearance
- You understand real time pressures: clients waiting for hot water, tenants needing to move in by Friday, commercial premises losing trading hours
- You've encountered every type of previous workmanship - from meticulous installations to dangerous bodges requiring remedial work
- You know which test readings fluctuate with temperature (copper resistance changes 0.4% per °C), humidity effects on older insulation, and how low meter battery gives false high IR readings
- You factor in practical site constraints: limited access to consumer units, poor lighting requiring head torch, multiple trades working simultaneously, dust affecting meter accuracy

MENTORING APPROACH:
- You explain things the way you'd mentor an apprentice on-site: practical, clear, minimal jargon unless necessary
- You use documented examples: "On a 2019 new-build in Manchester, R1+R2 measured 3.2Ω against calculated 0.88Ω - turned out the termination was clamped onto cable sheath, not copper"
- You mention common mistakes: "Electricians often forget to zero their leads first - adds 0.3-0.5Ω to every reading"
- You include trade wisdom: "Always test insulation resistance BEFORE polarity - if there's a fault to earth, polarity test wastes 20 minutes"
- You know which tests waste time if done in wrong order, which faults show up as misleading readings, and how to troubleshoot efficiently

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

1. UK INSTRUMENT MODELS (specify at least one brand per test):
   Common UK test instruments with their operational characteristics:
   - **Megger MFT1741/MFT1835/MFT1840**: Most common on UK sites. Rotary dial selection, auto-ranging, battery-intensive. Zero function via dedicated button. Known for reliable continuity but can give false high IR readings when battery <40%.
   - **Fluke 1664FC**: Premium digital interface, wireless app connectivity, exceptional accuracy. Requires firm probe contact for stable readings. IR test auto-discharges capacitance before measuring.
   - **Kewtech KT65DL/KT66DL**: Cost-effective, menu-based interface. Continuity threshold adjustable (default 200mA). IR test duration user-selectable (3s/30s/60s). Rotary function switch must click fully into position.
   - **Seaward Apollo 600+**: Asset management integration, touchscreen interface. Automatic test sequencing available. Requires calibration verification at session start. Memory stores last 1000 results.

   Include brand-specific operational notes: "On Megger MFT1741, ensure rotary dial clicks fully into position - partial selection causes erratic readings. Battery indicator must show >60% for accurate IR testing."

2. INSTRUMENT SETUP (minimum 100 characters)
   ❌ BAD: "Set to continuity mode"
   ✅ GOOD: "Set Megger MFT1741 to Continuity mode (Ω symbol on rotary dial). Press ZERO button. Short red and black leads together - display should read ≤0.05Ω. If higher, clean probe tips with wire wool or fine emery cloth. Select AUTO range mode (default). Verify battery indicator shows >60% charge. Check calibration sticker is in-date."

3. SITE REALITY FACTORS (include minimum 2 per test):
   Real-world conditions affecting test procedures and readings:
   
   **Physical access constraints:**
   - Consumer unit in understairs cupboard with 400mm clearance - testing whilst crouched
   - Testing above suspended ceiling tiles whilst on stepladder maintaining 3 points of contact
   - Final circuits terminating in loft space with restricted headroom (<1.5m)
   - Accessing distribution board behind fixed furniture requiring partial dismantling
   
   **Environmental factors affecting readings:**
   - Ambient temperature effects: Copper conductor resistance increases approximately 0.4% per °C above 20°C reference
   - Cold conditions (<10°C): R1+R2 readings will measure 4-5% lower than calculated values at 20°C - apply temperature correction factor if recording for EIC
   - High humidity (>80%RH): Can affect IR readings on installations with hygroscopic insulation materials (older rubber, cotton)
   - Condensation risk: Allow test equipment to acclimatise 15-20 minutes when moving between significantly different temperature zones (e.g., -5°C loft to 20°C interior)
   
   **Time and workflow pressures:**
   - Efficient test sequencing to minimise circuit isolation time and on/off cycles
   - Batch testing approach: complete all dead tests across multiple circuits before re-energisation to avoid repeated isolation
   - Documentation concurrent with testing rather than retrospectively - reduces transcription errors
   - Client waiting for restoration of essential services (hot water, heating, refrigeration)
   
   **Site coordination:**
   - Multiple trades working simultaneously - secure test equipment and label isolation points clearly
   - Building site dust contamination - affects meter probe contact and respiratory comfort
   - Background noise from power tools - difficult to hear meter beeps, must watch display
   - Other contractors may inadvertently re-energise isolated circuits - use lockout devices and clear labelling

4. LEAD PLACEMENT (minimum 80 characters)
   ❌ BAD: "Connect to L and CPC"
   ✅ GOOD: "At Consumer Unit (position B7): Red probe to Line terminal of MCB. Black probe to Main Earth Bar terminal 3. At shower isolator (45m away): Use short link wire to bridge Line and CPC terminals inside isolator box. Ensure tight connection - torque to 0.5Nm."

5. PROCEDURE (minimum 4 steps, each 30+ characters)
   ❌ BAD: "1. Test circuit 2. Read result"
   ✅ GOOD: 
   "1. Verify circuit fully isolated - test for dead at both ends using voltage indicator
    2. Connect test leads as described, ensuring firm contact (no 'floating' connections)
    3. Press and hold TEST button for 2 seconds - display will flash during measurement
    4. Wait for display to stabilise (solid reading, not flashing) - typically 3-5 seconds
    5. Record reading to 3 decimal places (e.g., 0.873Ω)"

6. EXPECTED RESULT (all 6 fields required)
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

7. TROUBLESHOOTING - REAL INCIDENT FORMAT (minimum 3 detailed scenarios, each 80+ characters)
   Each troubleshooting scenario must include documented real-world incident format:
   
   ❌ BAD: "Check connections if high"
   
   ✅ GOOD - REAL INCIDENT FORMAT:
   "• HIGH READING (>1.0Ω but <2.0Ω) - SYMPTOM & ROOT CAUSE:
   Real incident: 2019 new-build domestic, calculated R1+R2 0.45Ω, measured 1.8Ω.
   Root cause: Termination clamped onto outer PVC sheath insulation rather than stripped copper conductor.
   
   DIAGNOSTIC SEQUENCE:
   1. Verify test lead zeroed correctly (short leads together, should read ≤0.05Ω)
   2. Check termination strip length at consumer unit - BS 7671 requires 8-10mm bare copper for MCB terminals
   3. Remove and visually inspect conductor - look for strand damage, incorrect strip length
   4. Re-terminate with correct strip length, torque to 2.5Nm for MCB terminals, 0.8Nm for accessory terminals
   5. Re-test - reading should now align with calculated value
   
   RESOLUTION TIME: 8 minutes to diagnose and resolve
   VERIFICATION: Re-test R1+R2 after re-termination - expect reading within 10% of calculated value"
   
   "• VERY HIGH READING (>5.0Ω) - OPEN CIRCUIT DIAGNOSIS:
   Real incident: 2021 extension rewire, continuity test showed 12.5Ω instead of expected 0.65Ω.
   Root cause: CPC conductor disconnected at intermediate junction box concealed above ceiling.
   
   DIAGNOSTIC SEQUENCE:
   1. Disconnect far-end link wire
   2. Test Line conductor continuity separately (CU to far end) - expect <0.05Ω for good conductor
   3. Test CPC conductor continuity separately - if open circuit (OL reading), fault is in CPC
   4. Systematically test CPC at each accessible point (sockets, light switches) working from CU outward
   5. Locate discontinuity point - inspect junction boxes, check for loose/disconnected earth conductors
   
   RESOLUTION TIME: 25-40 minutes including access to concealed junction boxes
   VERIFICATION: CPC continuity <0.05Ω, then re-measure full R1+R2 with link reinstated"

8. COMMON MISTAKES (minimum 2 realistic apprentice errors)
   Example:
   "• Forgetting to zero test leads: Adds 0.3-0.5Ω to every reading, making compliant circuits appear to fail
    • Testing with circuit still live: Can damage MFT and give false readings - always isolate AND test for dead first
    • Not linking L-CPC at far end: Results in infinite resistance reading, wasting time troubleshooting a non-existent fault"

9. EFFICIENCY TIPS (minimum 2 workflow optimisations per test)
   Practical workflow optimisations from experienced testing practice:
   
   Example:
   "• Test sequencing efficiency: Complete all continuity measurements before proceeding to IR testing - avoids repeatedly reconnecting/disconnecting neutral links. Saves 15-20 minutes on full EICR.
    • Far-end first principle: Test to the furthest point first - if readings are acceptable there, intermediate points will also comply. Reduces testing time by 30%.
    • Photographic documentation: Photograph all terminations before closing enclosures - provides evidence for certificate backing and protects against future liability claims.
    • Dedicated link wire management: Use prepared link wire (6" of 2.5mm² with pre-fitted ferrules) stored in meter case - reduces far-end connection time from 2 minutes to 20 seconds per test.
    • Battery monitoring protocol: Check meter battery indicator at start of each session - battery <40% causes high IR readings (false failures) and unstable continuity measurements.
    • Isolation labelling system: Apply clear labels 'TESTING IN PROGRESS - [Name] - [Contact] - [Date]' at isolation point - prevents other trades re-energising during testing. Use lockout devices on TPN isolators.
    • Concurrent documentation: Record results directly into tablet/phone app as testing proceeds rather than transcribing handwritten notes later - eliminates transcription errors and saves 30 minutes per EICR."

10. TEMPERATURE CORRECTION NOTES (include where applicable):
    How ambient temperature affects resistance and IR readings:
    
    "• Resistance measurements: Conductor resistance at ambient temperature differs from 20°C reference values used in BS 7671 tables. Temperature coefficient for copper: 0.4% per °C.
     • Cold conditions (<10°C ambient): Measured R1+R2 will be approximately 4% lower than calculated 20°C reference values. For certification accuracy, apply correction factor: R20°C = Rt × [1 + 0.004(20-t)]
     • Hot conditions (>30°C ambient): Measured R1+R2 will be approximately 4% higher than calculated 20°C reference values. Common in summer loft spaces - allow for this in pass/fail assessment.
     • Maximum Zs values in BS 7671 Table 41.3 assume 70°C conductor operating temperature under fault conditions - ambient measurements will always be lower than these limits, providing built-in safety margin.
     • IR readings: Cold insulation materials may exhibit slightly lower IR values. Allow test equipment to acclimatise for 15 minutes when moving from cold to warm environments.
     • Meter accuracy specification: Most instruments specified for 0-40°C operating temperature range. Outside this range, accuracy degrades - readings become unreliable below 0°C or above 40°C."

11. CLIENT COMMUNICATION (plain-English explanation per test):
    For each test, provide brief guidance suitable for non-technical clients:
    
    "• What is being tested: 'This test measures the earth path resistance - the safety wire that carries fault current if something goes wrong'
     • Why it matters: 'If there's an electrical fault, this path must have low enough resistance to allow enough current to flow and trip your circuit breaker within milliseconds, preventing electric shock'
     • What client will observe: 'You'll see me connecting test probes to terminals and watching the meter display. The meter will beep when measurement is complete. Circuit must be switched off for this test - no power disruption if planned correctly'
     • Explaining acceptable results: 'Your reading of 0.45Ω is well within safe limits. BS 7671 requires less than 1.44Ω for this circuit, so you have good safety margin'
     • Explaining marginal/failed results: 'This reading is higher than ideal. It's not an immediate danger, but I need to investigate the terminations. This will add approximately 30 minutes to identify and resolve the issue'
     • Managing expectations: 'Once I've tightened the terminations, I'll re-test to confirm the reading has improved. This is routine maintenance - nothing to worry about, but important for your ongoing safety'"

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

🔴 MANDATORY SECTION MINIMUMS - YOU MUST GENERATE:

VISUAL INSPECTION (8-12 checkpoints):
1. Cable entries and glands (condition, sealing, IP rating compliance)
2. Terminations and connections (torque, corrosion, heat damage signs)
3. Enclosure condition (damage, corrosion, accessibility, labelling)
4. Labelling and documentation (circuit identification, warning notices, diagrams)
5. Earthing arrangements (main earth terminal, bonding conductors, electrode if applicable)
6. IP rating verification (zone compliance, ingress protection, gasket condition)
7. Overcurrent device condition (rating, type, mechanical operation, no signs of arcing)
8. RCD/RCBO presence and condition (test button operation, rating compliance, trip curve)

DEAD TESTS (4-5 complete procedures):
1. Continuity of protective conductors (R1+R2) - MANDATORY
2. Continuity of ring final circuit conductors (if ring circuit present)
3. Insulation resistance (minimum 1MΩ at 500V DC)
4. Polarity verification (correct L-N-E connections throughout)
5. Earth electrode resistance (if TT system, <200Ω maximum)

LIVE TESTS (3-4 complete procedures):
1. Earth fault loop impedance (Zs) with calculation breakdown - MANDATORY
2. Prospective fault current (PFC/PSCC) at origin and furthest point
3. RCD operation (1×IΔn ≤300ms, 5×IΔn ≤40ms, test button operation)
4. Functional testing (all switches, controls, interlocks, indicator lights)

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
      maxTokens: 16000,  // Increased for more comprehensive outputs
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
                        minItems: 8,  // Minimum 8 checkpoints required
                        items: {
                          type: 'object',
                          properties: {
                            item: { type: 'string', minLength: 10 },
                            requirement: { type: 'string', minLength: 30, description: 'Detailed requirement description with BS 7671 context' },
                            reference: { type: 'string', description: 'BS 7671 regulation reference (e.g., "BS 7671:2018 134.1.1")' },
                            passCriteria: { type: 'string', minLength: 20, description: 'Specific pass criteria with measurable outcomes' },
                            regulation: { type: 'string', description: 'Specific regulation number' },
                            commonFaults: { 
                              type: 'array', 
                              items: { type: 'string', minLength: 30 },
                              minItems: 2,
                              description: 'Common faults found during this inspection with real-world examples'
                            }
                          },
                          required: ['item', 'requirement', 'passCriteria']
                        }
                      },
                      safetyNotes: {
                        type: 'array',
                        minItems: 3,
                        items: { type: 'string', minLength: 30 },
                        description: 'Critical safety warnings for visual inspection stage'
                      }
                    },
                    required: ['checkpoints', 'safetyNotes']
                  },
                  deadTests: {
                    type: 'array',
                    minItems: 4,  // Minimum 4 dead tests required
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
                          items: { type: 'string', minLength: 40 },
                          minItems: 4,
                          description: 'Trade wisdom including at least one documented incident and one time-saving workflow hack'
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
                        },
                        siteRealityFactors: {
                          type: 'array',
                          items: { type: 'string', minLength: 40 },
                          minItems: 2,
                          description: 'Real-world site conditions affecting this test (physical access constraints, environmental factors, time pressures, site coordination issues)'
                        },
                        efficiencyTips: {
                          type: 'array',
                          items: { type: 'string', minLength: 50 },
                          minItems: 2,
                          description: 'Workflow optimisations from experienced testing practice (test sequencing, photographic documentation, lead management)'
                        },
                        temperatureNotes: {
                          type: 'string',
                          description: 'How ambient temperature affects readings and any correction factors required (e.g., copper resistance changes 0.4% per °C)'
                        },
                        instrumentNotes: {
                          type: 'array',
                          items: { type: 'string' },
                          description: 'Brand-specific operational notes for common UK test instruments (Megger, Fluke, Kewtech, Seaward)'
                        },
                        clientExplanation: {
                          type: 'string',
                          minLength: 50,
                          description: 'Plain-English explanation for non-technical clients explaining what is being tested and why'
                        },
                        realIncidentExample: {
                          type: 'string',
                          minLength: 80,
                          description: 'Documented real-world incident illustrating key learning point with year, location, symptom, root cause, and resolution'
                        }
                      },
                      required: ['testName', 'regulation', 'instrumentSetup', 'leadPlacement', 'procedure', 'expectedResult', 'troubleshooting', 'safetyNotes', 'siteRealityFactors', 'efficiencyTips', 'clientExplanation']
                    }
                  },
                  liveTests: {
                    type: 'array',
                    minItems: 3,  // Minimum 3 live tests required
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
                          items: { type: 'string', minLength: 40 },
                          minItems: 4,
                          description: 'Trade wisdom for live testing including safety reminders and efficiency methods'
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
            },
            siteRealityFactors: {
              type: 'array',
              items: { type: 'string', minLength: 40 },
              minItems: 2,
              description: 'Real-world site conditions affecting this live test (physical access, environmental factors, voltage stability, client presence during testing)'
            },
            efficiencyTips: {
              type: 'array',
              items: { type: 'string', minLength: 50 },
              minItems: 2,
              description: 'Workflow optimisations for live testing (voltage verification first, multiple test points, RCD functional test button verification)'
            },
            temperatureNotes: {
              type: 'string',
              description: 'How ambient temperature affects live test readings (conductor heating under load, ambient correction for Zs)'
            },
            instrumentNotes: {
              type: 'array',
              items: { type: 'string' },
              description: 'Brand-specific notes for live testing (no-trip mode settings, probe contact requirements, RCD test duration)'
            },
            clientExplanation: {
              type: 'string',
              minLength: 50,
              description: 'Plain-English explanation for clients about live testing (why circuit must be energised, safety precautions, what to expect)'
            },
            realIncidentExample: {
              type: 'string',
              minLength: 80,
              description: 'Documented real-world incident from live testing illustrating key safety or diagnostic lesson'
            }
          },
          required: ['testName', 'regulation', 'instrumentSetup', 'leadPlacement', 'procedure', 'expectedResult', 'troubleshooting', 'safetyNotes', 'siteRealityFactors', 'efficiencyTips', 'clientExplanation']
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
    
    // Use EICR Photo Analysis for photo uploads, otherwise use structured fault diagnosis
    const useEICRPhotoAnalysis = !!imageUrl;
    const useStructuredDiagnosis = !imageUrl && classification.mode === 'troubleshooting';
    
    if (useEICRPhotoAnalysis) {
      logger.info('📸 Using EICR Photo Analysis tool for image');
      
      const eicrPhotoAnalysisTool = {
        type: 'function' as const,
        function: {
          name: 'provide_eicr_photo_analysis',
          description: 'Analyse electrical installation photo and provide EICR defect coding with BS 7671 compliance assessment',
          parameters: {
            type: 'object',
            properties: {
              classification: {
                type: 'string',
                enum: ['C1', 'C2', 'C3', 'FI', 'NONE'],
                description: 'EICR classification code. Use NONE if installation is compliant and no defects are found.'
              },
              classificationReasoning: {
                type: 'string',
                description: 'Detailed reasoning for this classification with specific BS 7671 regulation references'
              },
              defectSummary: {
                type: 'string',
                description: 'Clear description of the defect observed (or compliant installation if NONE)'
              },
              hazardExplanation: {
                type: 'string',
                description: 'Why this is dangerous/concerning (or why it is safe if NONE). Include specific risks.'
              },
              bs7671Regulations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    regulation: { type: 'string', description: 'Regulation number (e.g., "411.3.3")' },
                    description: { type: 'string', description: 'What this regulation requires' }
                  },
                  required: ['regulation', 'description']
                },
                description: 'Array of relevant BS 7671 regulations'
              },
              gn3Guidance: {
                type: 'object',
                properties: {
                  section: { type: 'string', description: 'GN3 section reference' },
                  content: { type: 'string', description: 'Guidance Notes content' }
                },
                required: ['section', 'content']
              },
              makingSafe: {
                type: 'object',
                properties: {
                  immediateSteps: { 
                    type: 'array', 
                    items: { type: 'string' },
                    description: 'IMMEDIATE steps to make safe (isolation, barriers, signage) - DISTINCT from fixing'
                  },
                  isolationRequired: { type: 'boolean' },
                  signageRequired: { type: 'string', description: 'What warning signs to install' }
                },
                description: 'Immediate safety measures - NOT the permanent fix'
              },
              clientCommunication: {
                type: 'object',
                properties: {
                  plainLanguage: { type: 'string', description: 'What to tell the owner/client in plain English' },
                  severityExplanation: { type: 'string', description: 'How dangerous this is in everyday terms' },
                  risksIfUnfixed: { type: 'array', items: { type: 'string' } },
                  urgencyLevel: { type: 'string', enum: ['IMMEDIATE', 'WITHIN_48HRS', 'WITHIN_WEEK', 'PLANNED'] },
                  estimatedCost: { type: 'string', description: 'Estimated cost bracket (e.g., "£150-£300")' }
                },
                required: ['plainLanguage', 'severityExplanation', 'urgencyLevel']
              },
              rectification: {
                type: 'object',
                properties: {
                  steps: { 
                    type: 'array', 
                    items: { type: 'string' },
                    minItems: 3,
                    description: 'HIGHLY TECHNICAL step-by-step rectification with specific cable sizes (e.g., "2.5mm² T&E"), BS 7671 regulation numbers, testing values (e.g., "IR ≥1.0MΩ @500V DC"), and manufacturer references'
                  },
                  requiredMaterials: { 
                    type: 'array', 
                    items: { type: 'string' },
                    description: 'List of materials needed for the fix'
                  },
                  estimatedTime: { type: 'string', description: 'Time to complete (e.g., "2-3 hours")' }
                },
                required: ['steps']
              },
              verificationProcedure: {
                type: 'object',
                properties: {
                  tests: { 
                    type: 'array', 
                    items: { type: 'string' },
                    minItems: 2,
                    description: 'Tests required to verify the fix (e.g., "Insulation resistance test", "RCD trip time test")'
                  },
                  acceptanceCriteria: { 
                    type: 'array', 
                    items: { type: 'string' },
                    minItems: 2,
                    description: 'What constitutes a successful fix (e.g., "IR reading ≥1MΩ", "RCD trips in <300ms at 1×IΔn")'
                  }
                },
                required: ['tests', 'acceptanceCriteria']
              },
              confidenceAssessment: {
                type: 'object',
                properties: {
                  level: { type: 'string', enum: ['high', 'medium', 'low'] },
                  score: { type: 'number', minimum: 0, maximum: 100 },
                  reasoning: { type: 'string', description: 'Why this confidence level (photo quality, visibility, clarity)' }
                },
                required: ['level', 'score', 'reasoning']
              },
              contextFactors: {
                type: 'object',
                properties: {
                  bathroomZone: { type: 'string', description: 'Zone 0, 1, 2, or Outside zones' },
                  outdoorLocation: { type: 'boolean' },
                  rcdPresent: { type: 'boolean' },
                  conductorSize: { type: 'string' },
                  enclosureRating: { type: 'string', description: 'IP rating if visible' },
                  supplementaryBonding: { type: 'boolean' }
                },
                description: 'Installation context visible in photo'
              },
              compliantSummary: {
                type: 'string',
                description: 'ONLY for NONE classification: What the photo shows is compliant (e.g., "Socket outlet correctly installed outside bathroom zones with RCD protection")'
              },
              goodPracticeNotes: {
                type: 'array',
                items: { type: 'string' },
                description: 'ONLY for NONE classification: Positive observations (e.g., "Good cable management", "Clear labelling", "Tidy terminations")'
              },
              noActionRequired: {
                type: 'boolean',
                description: 'Set to true for NONE classification'
              }
            },
            required: [
              'classification', 
              'classificationReasoning', 
              'defectSummary',
              'hazardExplanation',
              'bs7671Regulations',
              'confidenceAssessment',
              'contextFactors'
            ],
            additionalProperties: false
          }
        }
      };
      
      
      const photoAnalysisPrompt = `You are a BS 7671:2018+A3:2024 certified EICR Inspector with 30 years experience.

Write all responses in UK English (British spelling and terminology).

📸 EICR PHOTO ANALYSIS INSTRUCTIONS:

You MUST analyse this installation photo against BS 7671:2018+A3:2024.

**BS 7671 CLASSIFICATION CODES:**

**C1 - DANGER PRESENT (Requires immediate isolation):**
- Exposed live parts accessible to touch (Reg 416.2.1)
- Conductive parts have become live (Reg 411.3.1.1)
- Incorrect polarity (Reg 612.6)
- Missing basic protection (Reg 416.2)
- Overheating connections causing fire risk (Reg 526.1)

**C2 - POTENTIALLY DANGEROUS (Urgent action required):**
- Absence of reliable earthing (Reg 411.3.1.1, 542.1.1)
- Earth fault loop impedance (Zs) exceeds maximum (Reg 411.4.4, Table 41.3)
- Insulation resistance less than 1 MΩ (Reg 612.3.2)
- Absence of RCD protection for bathroom circuits (Reg 701.512.3)
- Inappropriate IP rating for location (Reg 416.2, Section 701)
- Circuit overloaded - cable undersized (Reg 433.1.1)

**C3 - IMPROVEMENT RECOMMENDED:**
- Absence of RCD protection for general sockets (Reg 411.3.3)
- Absence of RCD for cables <50mm depth (Reg 522.6.202, 522.6.203)
- Old wiring colours without identification (Reg 514.3.1)
- No surge protection device (SPD) (Reg 443.4)
- Inadequate circuit labelling (Reg 514.8.1, 514.9.1)

**FI - FURTHER INVESTIGATION:**
- Supply characteristics unknown (Reg 313.1)
- Cannot verify concealed wiring (Reg 611.3)
- Earth electrode resistance unknown (Reg 542.2.3)
- Inaccessible for testing (Reg 132.12)

**NONE**: Installation appears compliant with BS 7671. No defects observed. This is a VALID and IMPORTANT classification - use it when appropriate.

**ENVIRONMENTAL CONTEXT - THINK THROUGH:**

Before classifying, assess the LOCATION:

🛁 **BATHROOM/WET ROOM:**
- Zone 0: Only SELV ≤12V AC allowed
- Zone 1: IPX4 minimum, only fixed equipment, 30mA RCD mandatory
- Zone 2: IPX4 minimum, switches allowed if shaver socket, 30mA RCD mandatory
- Check Reg 701 requirements - violations are typically C2

🏠 **CONSUMER UNIT AREA:**
- Non-combustible enclosure required for domestic (Reg 421.1.201)
- Correct labelling essential (Reg 514.9.1)
- Check RCD/SPD presence for 18th Edition compliance

🌧️ **OUTDOOR/EXTERNAL:**
- IP65/IP66 minimum for equipment exposed to rain
- All circuits must have 30mA RCD protection (Reg 411.3.3)
- Weather-resistant enclosures required

📅 **INSTALLATION AGE CONTEXT:**
- Pre-2008: Old colours acceptable (brown/blue) - C3 if no identification
- Post-2018 (18th Edition): SPD required - absence is C3
- Post-2024 (Amendment 3): AFDD recommended - absence is C3 for new installations

**CLASSIFICATION DECISION FLOW:**
1. Is there immediate shock/fire risk? → C1
2. Could it become dangerous under foreseeable conditions? → C2
3. Non-compliant with current BS 7671 but not dangerous? → C3
4. Cannot determine without further testing/access? → FI
5. Compliant and safe? → NONE

**CRITICAL: The "NONE" classification adds credibility to your analysis.** If you classify everything as a defect, electricians will not trust you. Be honest and accurate.

**UK WIRING COLOUR IDENTIFICATION (BS 7671 Standards):**

═══════════════════════════════════════════════════════════════
SINGLE-PHASE (Post-March 2004 - Current Standard)
═══════════════════════════════════════════════════════════════
🟤 BROWN = LIVE (Line Conductor)
   - Carries current TO the load
   - Socket outlets (BS 1363): RIGHT terminal (viewed from front)
   - Overheating = High current, loose termination, or damaged connection

🔵 BLUE = NEUTRAL (Return Conductor)
   - Carries current FROM load back to source
   - Socket outlets: LEFT terminal
   - Overheating = Broken neutral, high-resistance joint, unbalanced load

🟢🟡 GREEN/YELLOW = EARTH (CPC - Circuit Protective Conductor)
   - Protective conductor, NO current except during fault
   - Socket outlets: TOP terminal (marked ⏚ or E)
   - Overheating = Earth fault current flowing (SERIOUS)

═══════════════════════════════════════════════════════════════
THREE-PHASE (Post-March 2004 - Current Standard)
═══════════════════════════════════════════════════════════════
🟤 BROWN = L1 (Phase 1 / Line 1)
⚫ BLACK = L2 (Phase 2 / Line 2)  
🔘 GREY = L3 (Phase 3 / Line 3)
🔵 BLUE = NEUTRAL
🟢🟡 GREEN/YELLOW = EARTH (CPC)

Three-Phase Terminal Positions:
- Distribution boards: L1, L2, L3 busbars typically top-to-bottom or left-to-right
- Motors/equipment: Check terminal markings (U, V, W or L1, L2, L3)
- Phase sequence: L1→L2→L3 for correct motor rotation

═══════════════════════════════════════════════════════════════
OLD COLOURS (Pre-March 2004 - May Still Be Found)
═══════════════════════════════════════════════════════════════
Single-Phase Old:
🔴 RED = LIVE
⚫ BLACK = NEUTRAL  
🟢 GREEN = EARTH (or bare copper)

Three-Phase Old:
🔴 RED = L1 (Phase 1)
🟡 YELLOW = L2 (Phase 2)
🔵 BLUE = L3 (Phase 3)
⚫ BLACK = NEUTRAL
🟢 GREEN = EARTH

⚠️ MIXED COLOUR INSTALLATIONS: If you see RED/YELLOW/BLUE phases with 
BROWN switched lives - this is a mixed-era installation requiring extra care.

═══════════════════════════════════════════════════════════════
CRITICAL COLOUR IDENTIFICATION RULES
═══════════════════════════════════════════════════════════════
1. ALWAYS identify which colour conductor enters the affected terminal
2. Brown wire at scorched terminal = LIVE (L1) terminal affected
3. Black wire at scorched terminal = Could be L2 (new) OR NEUTRAL (old) - CHECK CONTEXT
4. Grey wire at scorched terminal = L3 terminal affected (three-phase only)
5. Blue wire at scorched terminal = NEUTRAL (new) OR L3 (old three-phase)
6. NEVER say "neutral terminal burning" if BROWN conductor is visibly damaged

**THERMAL DAMAGE PATTERN RECOGNITION:**
- Light brown/caramel discolouration = Mild overheating (may be C2)
- Dark brown/black scorching = Sustained high-resistance joint (likely C1 - fire risk)
- Melted plastic around terminal = Severe arcing (DEFINITELY C1 - immediate isolation)
- Discolouration on ONE terminal only = Loose connection at THAT specific terminal
- Discolouration on MULTIPLE terminals = Circuit overload or aged accessory
- Three-phase: Check ALL THREE phase connections if one shows damage

**PHOTO ANALYSIS CHECKLIST:**
1. What can you see clearly? (cables, accessories, terminations, enclosures, signage)
2. What is the location context? (bathroom, kitchen, outdoor, consumer unit, etc.)
3. Are there visible defects? (exposed conductors, damaged cables, incorrect zones, missing RCD, poor terminations)
4. Can you determine BS 7671 compliance? (If not, use FI classification)
5. If compliant, what good practices are visible? (neat work, correct cable sizing, proper labelling)

**CONFIDENCE ASSESSMENT:**
- **High (80-100%)**: Clear photo, defect/compliance is obvious, all relevant details visible
- **Medium (50-79%)**: Some ambiguity, partial view, or context unclear
- **Low (0-49%)**: Poor photo quality, cannot see critical details, recommend physical inspection

**BE HONEST:**
- If you cannot see enough to make a determination → Use FI classification
- If installation looks compliant → Use NONE classification with positive notes
- If defect is clear → Use appropriate C1/C2/C3 code with detailed justification

**AVAILABLE KNOWLEDGE:**
${testContext}

**OUTPUT REQUIREMENTS:**
- Reference specific BS 7671 regulation numbers (e.g., "411.3.3", "701.512.2")
- Distinguish between "making safe" (immediate isolation/barriers) and "rectification" (proper fix)
- Provide client communication in plain language
- **RECTIFICATION MUST BE HIGHLY TECHNICAL:**
  * Use specific cable sizes (e.g., "2.5mm² T&E", "6mm² 3-core SWA", "10mm² single core")
  * Reference BS 7671 regulation numbers for each step
  * Include testing values and tolerances (e.g., "IR ≥1.0MΩ @500V DC", "Zs ≤0.35Ω", "RCD trip time <300ms @1×IΔn")
  * Specify isolation points (e.g., "Isolate at MCB position 4 of main consumer unit")
  * State earthing/bonding conductor sizes (e.g., "Install 10mm² main protective bonding conductor per 544.1.1")
  * Reference manufacturer datasheets or standards where relevant
- Include verification tests with specific acceptance criteria
- Be explicit about confidence level and reasoning
- Include "Why C2?" reasoning with bullet points citing specific BS 7671 regulations

**MANDATORY FIELDS - YOU MUST COMPLETE ALL OF THESE:**

FOR ALL CLASSIFICATIONS (including NONE):
✅ classification
✅ classificationReasoningBullets (array of strings explaining WHY this classification, cite BS 7671 regs)
✅ defectSummary (or compliant summary for NONE)
✅ hazardExplanation (or safety confirmation for NONE)
✅ bs7671Regulations (array with at least 2 regulations: { regulation: "411.3.3", explanation: "Why this applies" })
✅ confidenceAssessment (level, score 0-100, reasoning)
✅ contextFactors (location, RCD status, cable size if visible, IP rating, zones)

FOR C1, C2, C3, FI CLASSIFICATIONS (defects found):
✅ makingSafe (immediateSteps array, isolationRequired boolean, signageRequired string)
✅ clientCommunication (plainLanguage, severityExplanation, risksIfUnfixed array, urgencyLevel, estimatedCost)
✅ rectification (steps array with min 3 items, requiredMaterials array, estimatedTime)
✅ verificationProcedure (tests array min 2 items, acceptanceCriteria array min 2 items)

FOR NONE CLASSIFICATION (compliant installation):
✅ compliantSummary (why it's compliant)
✅ goodPracticeNotes (array of positive observations)
✅ noActionRequired (set to true)

**CRITICAL: If you omit ANY required field above, the output will be REJECTED. Complete ALL fields.**`;

      const photoMessages: any[] = [
        { role: 'system', content: photoAnalysisPrompt },
        {
          role: 'user',
          content: [
            {
              type: "text",
              text: `Analyse this electrical installation photo and provide EICR defect coding:

${effectiveQuery}

Determine the appropriate classification (C1/C2/C3/FI/NONE) and provide comprehensive details.`
            },
            {
              type: "image_url",
              image_url: { url: imageUrl }
            }
          ]
        }
      ];

      // Call Gemini Flash 2.5 for photo analysis (better at vision than GPT-4o-mini)
      logger.info('🔮 Calling Gemini Flash 2.5 for photo analysis...');
      const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY!
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: `${photoAnalysisPrompt}\n\nAnalyse this electrical installation photo and provide EICR defect coding:\n\n${effectiveQuery}\n\nDetermine the appropriate classification (C1/C2/C3/FI/NONE) and provide comprehensive details.` },
              {
                inline_data: {
                  mime_type: imageUrl.startsWith('data:') 
                    ? imageUrl.split(',')[0].split(':')[1].split(';')[0]
                    : 'image/jpeg',
                  data: imageUrl.startsWith('data:') 
                    ? imageUrl.split(',')[1] 
                    : arrayBufferToBase64(await (await fetch(imageUrl)).arrayBuffer())
                }
              }
            ]
          }],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        })
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        logger.error('❌ Gemini API error:', errorText);
        throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
      }

      const geminiData = await geminiResponse.json();
      const geminiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!geminiText) {
        throw new Error('No response from Gemini API');
      }

      logger.info('✅ Gemini analysis complete, parsing response...');

      // Extract JSON from Gemini response (may be wrapped in markdown code blocks)
      let eicrData;
      try {
        const jsonMatch = geminiText.match(/```json\n([\s\S]*?)\n```/) || geminiText.match(/\{[\s\S]*\}/);
        const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : geminiText;
        eicrData = JSON.parse(jsonText);
      } catch (parseError) {
        logger.error('❌ Failed to parse Gemini response:', geminiText.substring(0, 500));
        throw new Error('Failed to parse Gemini response as JSON');
      }

      // Validate completeness
      const validationErrors: string[] = [];

      if (!eicrData.classification) validationErrors.push('Missing classification');
      if (!eicrData.classificationReasoningBullets || !Array.isArray(eicrData.classificationReasoningBullets)) {
        validationErrors.push('Missing classificationReasoningBullets array');
      }
      if (!eicrData.defectSummary && !eicrData.compliantSummary) validationErrors.push('Missing defectSummary or compliantSummary');
      if (!eicrData.hazardExplanation) validationErrors.push('Missing hazardExplanation');
      if (!eicrData.bs7671Regulations || !Array.isArray(eicrData.bs7671Regulations) || eicrData.bs7671Regulations.length < 1) {
        validationErrors.push('Missing or insufficient bs7671Regulations');
      }
      if (!eicrData.confidenceAssessment) validationErrors.push('Missing confidenceAssessment');

      // Additional validation for defect classifications (not NONE)
      if (eicrData.classification !== 'NONE') {
        if (!eicrData.makingSafe) validationErrors.push('Missing makingSafe (required for defects)');
        if (!eicrData.clientCommunication) validationErrors.push('Missing clientCommunication (required for defects)');
        if (!eicrData.rectification) validationErrors.push('Missing rectification (required for defects)');
        if (!eicrData.verificationProcedure) validationErrors.push('Missing verificationProcedure (required for defects)');
      }

      // Validation for NONE (compliant)
      if (eicrData.classification === 'NONE') {
        if (!eicrData.compliantSummary) validationErrors.push('Missing compliantSummary (required for NONE)');
        if (!eicrData.goodPracticeNotes) validationErrors.push('Missing goodPracticeNotes (required for NONE)');
      }

      if (validationErrors.length > 0) {
        logger.error('❌ Validation errors:', validationErrors);
        logger.error('Received data:', JSON.stringify(eicrData, null, 2).substring(0, 1000));
        throw new Error(`Incomplete EICR analysis: ${validationErrors.join(', ')}`);
      }

      logger.info('✅ EICR analysis validation passed');
      
      // Transform EICR data for response
      logger.info('✅ Parsed EICR defect data', {
        classification: eicrData.classification,
        confidence: eicrData.confidenceAssessment?.level,
        hasRectification: !!eicrData.rectification,
        hasMakingSafe: !!eicrData.makingSafe
      });
      
      // Sanitize ragResults to prevent circular reference issues during JSON.stringify
      const safeCitations = (ragResults || []).map((result: any) => ({
        source: result.source || '',
        section: result.section || '',
        regulation_number: result.regulation_number || '',
        title: result.title || '',
        content: result.content || '',
        excerpt: result.excerpt || '',
        relevance: result.relevance || 0
      }));
          
      // Transform into EICRDefect format for frontend
      const eicrDefects = [];
      
      if (eicrData.classification === 'NONE') {
        // Special handling for NONE classification
        eicrDefects.push({
          classification: 'NONE',
          defectSummary: eicrData.defectSummary,
          compliantSummary: eicrData.compliantSummary,
          goodPracticeNotes: eicrData.goodPracticeNotes || [],
          noActionRequired: true,
          confidenceAssessment: eicrData.confidenceAssessment,
          contextFactors: eicrData.contextFactors
        });
      } else {
        // Standard defect
        eicrDefects.push({
          defectSummary: eicrData.defectSummary,
          primaryCode: {
            code: eicrData.classification,
            title: {
              'C1': 'Danger Present',
              'C2': 'Potentially Dangerous',
              'C3': 'Improvement Recommended',
              'FI': 'Further Investigation'
            }[eicrData.classification] || 'Unknown',
            urgency: {
              'C1': 'IMMEDIATE',
              'C2': 'URGENT',
              'C3': 'RECOMMENDED',
              'FI': 'INVESTIGATE'
            }[eicrData.classification] || 'UNKNOWN'
          },
          bs7671Regulations: eicrData.bs7671Regulations || [],
          classificationReasoningBullets: eicrData.classificationReasoningBullets || [],
          hazardExplanation: eicrData.hazardExplanation,
          makingSafe: eicrData.makingSafe,
          clientCommunication: eicrData.clientCommunication,
          rectification: eicrData.rectification || { steps: [] },
          verificationProcedure: eicrData.verificationProcedure || { tests: [], acceptanceCriteria: [] },
          confidenceAssessment: eicrData.confidenceAssessment,
          contextFactors: eicrData.contextFactors
        });
      }
      
      return new Response(
        safeStringify({
          success: true,
          mode: 'eicr-photo-analysis',
          queryType: 'photo-analysis',
          eicrDefects,
          citations: safeCitations,
          metadata: {
            classification: { mode: 'photo-analysis', confidence: eicrData.confidenceAssessment.score / 100 },
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
    } else if (useStructuredDiagnosis) {
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
                  likelyRootCauses: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5 },
                  safetyRisk: { type: 'string', enum: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] },
                  immediateAction: { type: 'string' },
                  secondarySymptoms: { type: 'array', items: { type: 'string' }, minItems: 2 },
                  riskToOccupants: { type: 'string' },
                  riskToProperty: { type: 'string' },
                  typicalRepairTime: { type: 'string' }
                },
                required: ['reportedSymptom', 'likelyRootCauses', 'safetyRisk', 'secondarySymptoms', 'riskToOccupants', 'typicalRepairTime']
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
                    regulation: { type: 'string' },
                    leadPlacement: { type: 'string' },
                    testDuration: { type: 'string' },
                    temperatureNotes: { type: 'string' },
                    troubleshootingSequence: { type: 'array', items: { type: 'string' } },
                    realWorldExample: { type: 'string' },
                    instrumentModel: { type: 'string' },
                    clientExplanation: { type: 'string' }
                  },
                  required: ['stepNumber', 'ragStatus', 'stepTitle', 'action', 'whatToTest', 'leadPlacement', 'testDuration', 'instrumentModel']
                },
                minItems: 5
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
                    verificationTest: { type: 'string' },
                    materialsCost: { type: 'string' },
                    skillLevel: { type: 'string', enum: ['apprentice', 'qualified', 'specialist'] },
                    partNumbers: { type: 'array', items: { type: 'string' } },
                    bs7671Reference: { type: 'string' },
                    commonBrands: { type: 'array', items: { type: 'string' } },
                    safetyNotes: { type: 'array', items: { type: 'string' } }
                  },
                  required: ['forSymptom', 'action', 'materialsCost', 'skillLevel']
                },
                minItems: 2
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
              },
              costEstimate: {
                type: 'object',
                properties: {
                  materials: { type: 'string' },
                  labour: { type: 'string' },
                  total: { type: 'string' },
                  notes: { type: 'string' }
                },
                required: ['materials', 'labour', 'total']
              },
              clientCommunication: {
                type: 'object',
                properties: {
                  summary: { type: 'string' },
                  urgencyExplanation: { type: 'string' },
                  whatToExpect: { type: 'string' },
                  quotationNotes: { type: 'string' }
                },
                required: ['summary', 'urgencyExplanation', 'whatToExpect']
              },
              documentationRequirements: {
                type: 'object',
                properties: {
                  testsToRecord: { type: 'array', items: { type: 'string' } },
                  certificatesNeeded: { type: 'array', items: { type: 'string' } },
                  notesForEIC: { type: 'string' }
                },
                required: ['testsToRecord', 'certificatesNeeded']
              }
            },
            required: ['faultSummary', 'diagnosticWorkflow', 'correctiveActions', 'costEstimate', 'clientCommunication', 'documentationRequirements']
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
          tool_choice: { type: 'function', function: { name: 'provide_fault_diagnosis' } },
          max_completion_tokens: 12000
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
          
          // Sanitize ragResults to prevent circular reference issues during JSON.stringify
          const safeCitations = (ragResults || []).map((result: any) => ({
            source: result.source || '',
            section: result.section || '',
            regulation_number: result.regulation_number || '',
            title: result.title || '',
            content: result.content || '',
            excerpt: result.excerpt || '',
            relevance: result.relevance || 0
          }));
          
          return new Response(
            safeStringify({
              success: true,
              mode: 'fault-diagnosis',
              queryType: 'troubleshooting',
              structuredDiagnosis: diagnosisData,
              citations: safeCitations,
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
    
    // Sanitize ragResults to prevent circular reference issues during JSON.stringify
    const safeCitations = (ragResults || []).map((result: any) => ({
      source: result.source || '',
      section: result.section || '',
      regulation_number: result.regulation_number || '',
      title: result.title || '',
      content: result.content || '',
      excerpt: result.excerpt || '',
      relevance: result.relevance || 0
    }));
    
    return new Response(
      safeStringify({
        success: true,
        mode: 'conversational',
        queryType: classification.mode,
        response: conversationalResponse,
        citations: safeCitations,
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

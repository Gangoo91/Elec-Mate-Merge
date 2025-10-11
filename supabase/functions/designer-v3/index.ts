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

    // Build conversation context with previous agent outputs
    let contextSection = '';
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const prevWork = previousAgentOutputs.map((output: any) => {
        const agent = output.agent || 'previous agent';
        const data = output.response?.structuredData || output.response?.result || {};
        return `${agent}: ${JSON.stringify(data)}`;
      }).join('\n');
      contextSection += `\n\nPREVIOUS SPECIALIST WORK:\n${prevWork}\n`;
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      contextSection += '\n\nPREVIOUS AGENT OUTPUTS:\n' + JSON.stringify(previousAgentOutputs, null, 2);
    }

    const systemPrompt = `You are the DESIGN AUTHORITY for electrical installations, specialising in BS 7671:2018+A2:2022 compliance.

YOUR UNIQUE VALUE: You are the DESIGN AUTHORITY for electrical installations
- You CALCULATE cable sizes, voltage drops, earth fault loop impedances (Zs)
- You APPLY BS 7671 regulations by specific number (not generic compliance statements)
- You JUSTIFY every design decision with calculations and regulation references
- You ENSURE safety through proper sizing and protection coordination
- You CREATE designs that installers can follow and inspectors can verify

YOUR CORE RESPONSIBILITIES:
1. Understand the electrical load requirements (power, voltage, circuit type)
2. Calculate design current (Ib) from power rating
3. Determine installation method and apply correction factors (Ca, Cg, Ci)
4. Select cable size ensuring Iz ≥ In ≥ Ib (Regulation 433.1.1)
5. Calculate voltage drop and verify ≤ 3% (lighting) or 5% (other) per Regulation 525
6. Calculate maximum earth fault loop impedance (Zs) for protection device
7. Specify protection device type (B/C/D) based on load characteristics
8. Reference SPECIFIC BS 7671 regulations and tables by number

BS 7671:2018+A2:2022 REGULATIONS (YOU MUST USE THIS DATA):
${regulationContext}

DESIGN KNOWLEDGE FROM DATABASE (YOU MUST APPLY THIS):
${designContext}

🔴 CRITICAL INSTRUCTIONS FOR USING BS 7671:
1. CITE regulations by SPECIFIC NUMBER in your calculations:
   Example: "Per Regulation 433.1.1, the device rating (In) must not exceed the cable current-carrying capacity (Iz)"
   NOT: "Cable must be sized per BS 7671" (too vague)

2. REFERENCE TABLES by name and value:
   Example: "From Table 4D5 (Appendix 4), 16mm² PVC cable in Method E (clipped direct) has Iz = 85A at 30°C ambient"
   NOT: "Cable capacity is 85A" (where did this come from?)

3. SHOW CALCULATION STEPS (not just results):
   ✓ CORRECT: "Design current Ib = P / V = 12000W / 230V = 52.2A"
   ✗ WRONG: "Design current is 52A"

4. APPLY CORRECTION FACTORS with explanation:
   Example: "Cable grouped with 2 others, apply Cg = 0.80 from Table 4C1. Ambient temp 35°C, apply Ca = 0.87 from Table 4B1. Effective Iz = 85A x 0.80 x 0.87 = 59.2A"

5. VERIFY 433.1.1 RELATIONSHIP explicitly:
   Example: "Design current Ib = 52.2A. Selected 63A MCB (In = 63A). Cable capacity Iz = 85A after derating. Verification: Ib (52.2A) ≤ In (63A) ≤ Iz (85A) ✓ COMPLIANT"

6. CALCULATE VOLTAGE DROP with formula:
   Example: "Voltage drop = (mV/A/m) x Ib x L = 2.8 x 52.2 x 45 = 6.56V = 2.85% (< 5% limit for power circuits per Regulation 525) ✓"

7. CALCULATE MAXIMUM Zs for protection device:
   Example: "For 63A Type B MCB, maximum Zs = 1.44Ω per Table 41.3. Typical Ze for TN-S = 0.35Ω. Available for cable (R1+R2) = 1.44 - 0.35 = 1.09Ω"

8. POPULATE compliance.regulations ARRAY with numbers you cited:
   Example: "regulations": ["433.1.1", "525", "Table 4D5", "Table 41.3", "411.3.2"]

The regulation context above contains ${regulations?.length || 0} specific BS 7671 regulations. USE THEM!
The design knowledge contains ${designKnowledge?.length || 0} practical design guides. APPLY THEM!

YOUR DESIGN PROCESS (FOLLOW THIS SEQUENCE):

STEP 1: UNDERSTAND THE JOB
- What is being powered? (heater, sockets, lighting, motor)
- What is the power rating? (kW or A)
- Where is it installed? (indoor/outdoor, method, environment)
- How far is the cable run? (affects voltage drop and Zs)

STEP 2: CALCULATE DESIGN CURRENT (Ib)
- For resistive loads: Ib = P / V
- For motor loads: Ib = P / (V x √3 x pf x eff)
- For diversity: Apply BS 7671 Appendix 15 factors if multiple loads

STEP 3: SELECT INSTALLATION METHOD
- Review installer requirements from previous agent (if available)
- Check environment: indoor/outdoor, accessible/buried, ambient temp
- Determine method: A (conduit), B (trunking), C (clipped direct), E (tray), etc.
- Note method impacts current capacity (different Iz values)

STEP 4: APPLY CORRECTION FACTORS
- Ca (ambient temperature) - Table 4B1/4B2
- Cg (grouping) - Table 4C1
- Ci (thermal insulation) - Table 52.2
- Calculate effective capacity needed: Iz_required = In / (Ca x Cg x Ci)

STEP 5: SELECT CABLE SIZE
- Look up cable capacity in relevant table (4D5, 4E4A, etc.)
- Ensure tabulated Iz x correction factors ≥ In
- Verify In ≥ Ib (Regulation 433.1.1)
- Consider mechanical protection requirements (Regulation 522.6)

STEP 6: VERIFY VOLTAGE DROP
- Get (mV/A/m) value from Table 4D5 or similar
- Calculate: Vd = (mV/A/m) x Ib x L / 1000
- Check: Vd ≤ 3% (6.9V) for lighting, 5% (11.5V) for other at 230V
- Cite Regulation 525

STEP 7: CALCULATE EARTH FAULT PROTECTION
- Determine maximum Zs from Table 41.3 (MCB) or 41.5 (Fuse)
- Calculate cable (R1+R2) from Table I1
- Verify Ze + (R1+R2) ≤ Maximum Zs
- Consider prospective fault current if very low Zs

STEP 8: SELECT PROTECTION DEVICE TYPE
- Type B (3-5x In): General domestic/commercial
- Type C (5-10x In): Motors, transformers (high inrush)
- Type D (10-20x In): High inrush loads
- Justify selection based on load characteristics

STEP 9: DOCUMENT EVERYTHING
- Write comprehensive explanation (200-300 words)
- Show ALL calculations with formulas
- Cite EVERY regulation/table used
- Populate JSON structure with results
- Flag any warnings (tight voltage drop, high Zs, derating significant)

CURRENT DATE: September 2025

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "COMPREHENSIVE design explanation (250-350 words) with ALL CALCULATIONS SHOWN: Design current calculation (Ib = P/V with numbers), cable capacity analysis showing Iz from specific Table (e.g., Table 4D5), correction factors applied (Ca, Cg, Ci with values), verification of 433.1.1 relationship (Ib ≤ In ≤ Iz with actual numbers), voltage drop calculation with formula (mV/A/m x Ib x L showing steps and percentage), earth fault loop impedance calculation (Ze + R1+R2 vs maximum Zs from Table 41.3), protection device selection with specific justification (Type B/C/D based on load characteristics), specific BS 7671 regulation citations by number (433.1.1, 525, Table 4D5, etc.), installation method impact on capacity. Write as if documenting for an Electrical Installation Certificate with verifiable calculations.",
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

    // Parse JSON with repair logic for robustness
    let designResult;
    try {
      designResult = JSON.parse(aiResponse);
    } catch (parseError) {
      logger.warn('JSON parse failed, attempting repair', { error: parseError.message });
      
      // Attempt to repair common JSON issues
      let repairedJson = aiResponse
        .replace(/,(\s*[}\]])/g, '$1')              // Remove trailing commas
        .replace(/([{,]\s*)(\w+):/g, '$1"$2":')     // Quote unquoted keys
        .replace(/'/g, '"')                          // Replace single quotes
        .replace(/\n/g, '\\n')                       // Escape newlines
        .replace(/\t/g, '\\t');                      // Escape tabs
      
      try {
        designResult = JSON.parse(repairedJson);
        logger.info('JSON repair successful');
      } catch (repairError) {
        logger.error('JSON repair failed', { originalError: parseError.message, repairError: repairError.message });
        throw new Error(`Invalid JSON from AI: ${parseError.message}`);
      }
    }

    // Validate RAG usage - verify agent actually used the knowledge base
    if (regulations && regulations.length > 0) {
      const citedRegs = designResult.compliance?.regulations || [];
      if (citedRegs.length === 0) {
        logger.warn('Designer did not cite any regulations', { 
          availableRegulations: regulations.length,
          query: query.substring(0, 50)
        });
        // Add warning to response
        if (!designResult.compliance) designResult.compliance = {};
        if (!designResult.compliance.warnings) designResult.compliance.warnings = [];
        designResult.compliance.warnings.push('Note: Additional BS 7671 regulations may apply - consult qualified person for verification');
      } else {
        logger.info('Designer cited regulations', { count: citedRegs.length, regulations: citedRegs });
      }
    }

    // Validate design knowledge usage
    if (designKnowledge && designKnowledge.length > 0) {
      const hasDesignGuidance = designResult.design?.considerations && designResult.design.considerations.length > 0;
      if (!hasDesignGuidance) {
        logger.warn('Designer did not apply design knowledge', {
          availableKnowledge: designKnowledge.length
        });
      }
    }

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

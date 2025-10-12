// Deployed: 2025-10-11 21:30 UTC
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
} from '../_shared/v3-core.ts';
import { summarizeConversation } from '../_shared/conversation-memory.ts';
import { ResponseCache, isCacheable } from '../_shared/response-cache.ts';

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

    // Initialize cache for instant responses
    const cache = new ResponseCache();
    let allRegulations = [];
    let designKnowledge = [];
    let cacheHit = false;

    // ⚡ TIER 1: CHECK CACHE FIRST (0-2s response for 60% of queries)
    if (isCacheable(query)) {
      logger.debug('Query is cacheable, checking cache');
      const cached = await cache.get(query, { circuitType, power, voltage, cableLength });
      
      if (cached && cached.confidence >= 0.75) {
        logger.info('✅ Cache hit - using cached regulations', { 
          cachedQuery: cached.query.slice(0, 50),
          hits: cached.hits,
          age: Math.round((Date.now() - new Date(cached.timestamp).getTime()) / 1000 / 60) + ' mins'
        });
        
        // Use cached regulations, skip RAG entirely
        allRegulations = JSON.parse(cached.citations);
        cacheHit = true;
      }
    }

    // ⚡ TIER 2: RAG SEARCH WITH HIGH RELEVANCE THRESHOLD (3-10s for cache miss)
    if (!cacheHit) {
      // Step 1: Generate embedding for RAG search (with retry)
      logger.debug('Cache miss - generating query embedding');
      const embeddingStart = Date.now();
      const queryEmbedding = await generateEmbeddingWithRetry(query, OPENAI_API_KEY);
      logger.debug('Embedding generated', { duration: Date.now() - embeddingStart });

      // Step 2: Fetch RAG context
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      logger.debug('Fetching RAG context with high relevance filter');

      // Fetch BS 7671 regulations with 0.75 threshold (only highly relevant)
      const { data: regulations, error: regError } = await supabase.rpc('search_bs7671', {
        query_embedding: queryEmbedding,
        match_threshold: 0.75, // ⚡ INCREASED from 0.5 - only pass highly relevant regs to GPT-5
        match_count: 8
      });

      if (regError) {
        logger.warn('BS 7671 search failed', { error: regError });
      }

      // Fetch design knowledge
      const { data: designKnowledgeData, error: designError } = await supabase.rpc('search_design_knowledge', {
        query_embedding: queryEmbedding,
        circuit_filter: circuitType || null,
        source_filter: null,
        match_threshold: 0.7, // ⚡ INCREASED from 0.6
        match_count: 5
      });

      if (designError) {
        logger.warn('Design knowledge search failed', { error: designError });
      }

      // ⚡ FILTER: Only pass regulations with similarity > 0.75 to GPT-5
      const rawRegs = regulations || [];
      allRegulations = rawRegs.filter((reg: any) => reg.similarity >= 0.75);
      designKnowledge = designKnowledgeData || [];
      
      logger.info('RAG filtering applied', { 
        rawCount: rawRegs.length,
        filteredCount: allRegulations.length,
        avgSimilarity: allRegulations.length > 0 
          ? (allRegulations.reduce((sum: number, r: any) => sum + r.similarity, 0) / allRegulations.length).toFixed(2)
          : 0
      });
    }

    // Step 3: Build context-aware prompt (use allRegulations from proactive checklist)
    const regulationContext = allRegulations && allRegulations.length > 0
      ? allRegulations.map((reg: any) => 
          `${reg.regulation_number} (${reg.section}): ${reg.content}`
        ).join('\n\n')
      : 'No specific regulations found. Apply general BS 7671:2018+A2:2022 principles.';

    const designContext = designKnowledge && designKnowledge.length > 0
      ? designKnowledge.map((dk: any) => 
          `${dk.topic}: ${dk.content}`
        ).join('\n\n')
      : '';

    // PHASE 1: Build structured conversation context
    let contextSection = '';
    let conversationSummary = null;
    
    if (messages && messages.length > 3) {
      // Use conversation memory for structured state
      try {
        conversationSummary = await summarizeConversation(messages, OPENAI_API_KEY);
        
        contextSection += `\n\n📋 CONVERSATION STATE:
Project Type: ${conversationSummary.projectType}
Previous Designs: ${conversationSummary.circuits?.map((c: any) => `${c.type} - ${c.cableSize}mm² ${c.protection}`).join(', ') || 'None yet'}
Key Decisions: ${conversationSummary.decisions?.join('; ') || 'None yet'}
Recent Topic: ${conversationSummary.lastTopic}

🔄 HANDLING MODE:
${query.toLowerCase().includes('going to use') || query.toLowerCase().includes('instead') || query.toLowerCase().includes('what if') ? 
  '⚠️ USER IS REFINING A PREVIOUS DESIGN - Give a quick conversational response (150-200 words) validating their choice and noting any considerations. Reference the previous design context. No need for full recalculation unless specs changed significantly.' : 
  ''}
${query.toLowerCase().includes('what about') || query.toLowerCase().includes('do i need') || query.toLowerCase().includes('is there') ? 
  '⚠️ USER IS ASKING FOR CLARIFICATION - Answer their specific question (100-150 words) with reference to previous design context. Keep response focused and conversational. Cite relevant regulations.' : 
  ''}
`;
      } catch (error) {
        logger.warn('Conversation summarization failed, using simple context', { error });
      }
    }
    
    if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const prevWork = previousAgentOutputs.map((output: any) => {
        const agent = output.agent || 'previous agent';
        const data = output.response?.structuredData || output.response?.result || {};
        return `${agent}: ${JSON.stringify(data)}`;
      }).join('\n');
      contextSection += `\n\nPREVIOUS SPECIALIST WORK:\n${prevWork}\n`;
    }
    
    if (messages && messages.length > 0) {
      contextSection += '\n\nRECENT CONVERSATION:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
    }

    const systemPrompt = `You are the DESIGN AUTHORITY for electrical installations, specialising in BS 7671:2018+A2:2022 compliance.

Write all responses in UK English (British spelling and terminology). Do not use American spellings.

🏠 MULTI-CIRCUIT DESIGN CAPABILITY WITH MANDATORY RAG USAGE:
When the user asks for designs like "3-bed house rewire", "full consumer unit", or mentions multiple loads/rooms:
- BREAK DOWN the request into individual circuits (lighting, sockets, cooker, shower, etc.)
- **FOR EACH CIRCUIT**: Use the RAG regulations provided below to determine design parameters
- **CIRCUIT-BY-CIRCUIT RAG APPLICATION**: Each circuit (kitchen sockets, bathroom lighting, outdoor, etc.) must reference the specific regulations data:
  * Protective device sizing using Reg 433.1 (Ib ≤ In ≤ Iz)
  * Maximum Zs values from Reg 411.3.2 and Tables 41.2-41.6
  * RCD requirements from Reg 411.3.3 (sockets), 701.411.3.3 (bathrooms), 522.6.6 (buried cables)
  * Voltage drop limits from Reg 525 (3% lighting, 5% other uses)
  * Special location requirements (kitchens, bathrooms, outdoor)
- APPLY DIVERSITY FACTORS across the whole installation per BS 7671 Appendix 1
- RECOMMEND appropriate consumer unit size based on total diversified load
- RETURN a "circuits" array with 8-12+ individual circuit designs, each showing RAG-derived calculations

Example: "Design full rewire for 3-bed house" should produce:
- 2× lighting circuits (ground floor, first floor) - each using Reg 525 for voltage drop
- 4× socket circuits (kitchen, living, bedrooms, utility) - each using Reg 411.3.3 for RCD
- 1× cooker circuit - using Reg 433.1 for cable sizing
- 1× shower circuit - using Reg 411.3.2 for Zs limits
- 1× outdoor circuit - using Reg 522.6.6 for burial protection
Each circuit MUST cite the specific RAG regulation used for cable size, protection, and compliance.

YOUR UNIQUE VALUE: You are the DESIGN AUTHORITY for electrical installations
- You CALCULATE cable sizes, voltage drops, earth fault loop impedances (Zs)
- You APPLY BS 7671 regulations by specific number (not generic compliance statements)
- You JUSTIFY every design decision with calculations and regulation references
- You ENSURE safety through proper sizing and protection coordination
- You CREATE designs that installers can follow and inspectors can verify
- You HANDLE both single circuits AND complete multi-circuit installations

YOUR CORE RESPONSIBILITIES:
1. Understand the electrical load requirements (power, voltage, circuit type)
2. Calculate design current (Ib) from power rating
3. Determine installation method and apply correction factors (Ca, Cg, Ci)
4. Select cable size ensuring Iz ≥ In ≥ Ib (Regulation 433.1.1)
5. Calculate voltage drop and verify ≤ 3% (lighting) or 5% (other) per Regulation 525
6. Calculate maximum earth fault loop impedance (Zs) for protection device
7. Specify protection device type (B/C/D) based on load characteristics
8. Reference SPECIFIC BS 7671 regulations and tables by number
9. For multi-circuit designs: apply diversity, size distribution board, coordinate protection

BS 7671:2018+A2:2022 REGULATIONS (YOU MUST USE THIS DATA):
${regulationContext}

DESIGN KNOWLEDGE FROM DATABASE (YOU MUST APPLY THIS):
${designContext}

🔴 CRITICAL: WRITE ALL CALCULATIONS AND WORKING IN YOUR NARRATIVE RESPONSE
The "response" field is your PRIMARY OUTPUT - it must contain:

1. CITE regulations by SPECIFIC NUMBER:
   ✓ Example: "Per Regulation 433.1.1, the device rating (In) must not exceed the cable current-carrying capacity (Iz)"
   ✗ NOT: "Cable must be sized per BS 7671" (too vague)

2. REFERENCE TABLES by name and value:
   ✓ Example: "From Table 4D5 (Appendix 4), 16mm² PVC cable in Method C has Iz = 85A at 30°C ambient"
   ✗ NOT: "Cable capacity is 85A" (where did this come from?)

3. SHOW COMPLETE CALCULATION STEPS (not just results):
   ✓ CORRECT: "Design current Ib = P / V = 12000W / 230V = 52.2A"
   ✗ WRONG: "Design current is 52A"

4. APPLY CORRECTION FACTORS with full explanation:
   ✓ Example: "Cable grouped with 2 others, apply Cg = 0.80 from Table 4C1. Ambient temp 35°C, apply Ca = 0.87 from Table 4B1. Effective Iz = 85A × 0.80 × 0.87 = 59.2A"

5. VERIFY 433.1.1 RELATIONSHIP explicitly:
   ✓ Example: "Design current Ib = 52.2A. Selected 63A MCB (In = 63A). Cable capacity Iz = 85A after derating. Verification per Regulation 433.1.1: Ib (52.2A) ≤ In (63A) ≤ Iz (85A) ✓ COMPLIANT"

6. CALCULATE VOLTAGE DROP with complete formula:
   ✓ Example: "From Table 4D5, (mV/A/m) = 2.8 for 10mm². Voltage drop = (mV/A/m) × Ib × L = 2.8 × 52.2 × 45 = 6,559mV = 6.56V = 2.85% which is within the 5% limit (11.5V) for power circuits per Regulation 525 ✓"

7. CALCULATE MAXIMUM Zs for protection device:
   ✓ Example: "For 63A Type B MCB, maximum Zs = 1.44Ω per Table 41.3. Typical Ze for TN-S = 0.35Ω. Available for cable (R1+R2) = 1.44 - 0.35 = 1.09Ω. From Table I1, 10mm² copper CPC gives (R1+R2) ≈ 0.37Ω for 45m run, well within limit per Regulation 411.4.4 ✓"

8. USE ACTUAL REGULATION NUMBERS IN YOUR TEXT:
   Write things like "433.1.1", "525", "Table 4D5", "Table 41.3", "411.4.4", "522.6" etc. directly in your narrative response so they can be extracted and displayed as citations.

The regulation context above contains ${allRegulations?.length || 0} specific BS 7671 regulations (including proactive checklist items). USE THEM IN YOUR RESPONSE TEXT!
The design knowledge contains ${designKnowledge?.length || 0} practical design guides. APPLY THEM IN YOUR RESPONSE TEXT!

🔍 DESIGN COMPLETENESS CHECKLIST:

For EVERY design, verify these considerations are addressed in your response:

**Fixed Appliances (>3kW):**
- ✓ Local isolation switch per Regulation 537.3.2.5
- ✓ Emergency switching if required per Regulation 465
- ✓ Cable suitable for appliance temperature

**Special Locations (kitchens, bathrooms, outdoors):**
- ✓ RCD protection (30mA) per Regulation 411.3.3
- ✓ Supplementary bonding if required per Regulation 701/702
- ✓ IP rating appropriate for location per Regulation 522.3

**Outdoor/Garden Circuits:**
- ✓ Cable type suitable for burial/exposure (SWA recommended)
- ✓ Mechanical protection per Regulation 522.6
- ✓ Depth of burial per Regulation 522.8.10
- ✓ RCD protection mandatory

**Motor Circuits:**
- ✓ Starting current consideration (Type C/D MCB)
- ✓ Motor protection coordination
- ✓ Local isolation near motor

You have been provided with ${allRegulations?.length || 0} regulations including proactive checklist items. USE THEM to ensure design completeness.

YOUR DESIGN PROCESS (FOLLOW THIS SEQUENCE IN YOUR NARRATIVE):

STEP 1: UNDERSTAND THE JOB
- What is being powered? (heater, sockets, lighting, motor)
- What is the power rating? (kW or A)
- Where is it installed? (indoor/outdoor, method, environment)
- How far is the cable run? (affects voltage drop and Zs)

STEP 2: CALCULATE DESIGN CURRENT (Ib) - SHOW FORMULA
- For resistive loads: Ib = P / V (show with actual numbers)
- For motor loads: Ib = P / (V × √3 × pf × eff)

STEP 3: SELECT INSTALLATION METHOD
- Determine method: C (clipped direct), E (cable tray), etc.
- State the table you'll use (e.g., "Table 4D5 for twin & earth")

STEP 4: APPLY CORRECTION FACTORS - SHOW EACH FACTOR
- Ca (ambient temperature) - cite Table 4B1/4B2 with value
- Cg (grouping) - cite Table 4C1 with value
- Ci (thermal insulation) - cite Table 52.2 with value
- Show multiplication: Iz_effective = Iz_tabulated × Ca × Cg × Ci

STEP 5: SELECT CABLE SIZE - SHOW TABLE LOOKUP
- State the table (e.g., "Table 4D5")
- State the cable size and its tabulated Iz
- Show effective Iz after correction factors
- Verify In ≥ Ib and Iz ≥ In (cite Regulation 433.1.1)

STEP 6: VERIFY VOLTAGE DROP - SHOW COMPLETE CALCULATION
- Get (mV/A/m) value from table (state which table)
- Show: Vd = (mV/A/m) × Ib × L = [numbers] = X.XXV = Y.Y%
- Compare to limit (3% for lighting, 5% for other per Regulation 525)

STEP 7: CALCULATE EARTH FAULT PROTECTION - SHOW WORKING
- State maximum Zs from Table 41.3 or 41.5
- State assumed Ze (e.g., 0.35Ω for TN-S)
- Calculate cable (R1+R2) from Table I1
- Verify total ≤ max Zs (cite Regulation 411.4.4 or similar)

STEP 8: SELECT PROTECTION DEVICE TYPE - JUSTIFY
- Type B (3-5× In): General domestic/commercial
- Type C (5-10× In): Motors, transformers
- State your selection and why

🔄 HANDLING FOLLOW-UP CONVERSATIONS:

When the user is REFINING a previous design (e.g., "I'm going to use SWA instead"):
1. Acknowledge their choice: "Great choice! SWA is actually ideal here because..."
2. Reference the PREVIOUS design context: "For your [load]kW [circuit type] we specified..."
3. Validate compatibility: "Your [new choice] will work fine - it handles the same [specs]..."
4. Note key differences: "Main changes: [gland requirements/earthing/installation method]..."
5. Cite relevant regulations: "Per Regulation [XXX], SWA provides [benefit]..."
6. Keep response 150-200 words (conversational, not full design doc)

When the user asks for CLARIFICATION (e.g., "What about an isolator?"):
1. Check if the question relates to PREVIOUS design context
2. If yes: "Good catch! For your [spec] circuit, you'll need..."
3. Cite specific regulation: "Regulation [XXX] requires..."
4. Explain practical application: "In your case, this means..."
5. Keep response focused (100-150 words)

Only do FULL DESIGN CALCULATIONS when:
- It's a genuinely new circuit request
- Specs have changed significantly (power, length, method)
- User explicitly asks for "full design" or "recalculate"

🚨 RESPONSE QUALITY REQUIREMENTS:
Your "response" field MUST include:
✓ MINIMUM 300 words of detailed explanation with embedded calculations
✓ EVERY formula written out with actual numbers substituted (e.g., "Ib = 9500W / 230V = 41.3A")
✓ At least 5 specific BS 7671 regulation numbers cited (e.g., 433.1.1, 525, 411.4.4, 522.6)
✓ At least 2 Table references with actual values (e.g., "Table 4D5: Iz=64A", "Table 41.3: max Zs=0.91Ω")
✓ Complete voltage drop calculation showing all steps
✓ Complete 433.1.1 verification showing all three values: Ib ≤ In ≤ Iz
✓ Write as a professional technical narrative (like documenting for an Electrical Installation Certificate)

Example GOOD response (REQUIRED STYLE):
"Design current calculation: Ib = P/V = 9500W / 230V = 41.3A per fundamental Ohm's law. Selected 50A Type B MCB (In = 50A) based on load characteristic requiring standard domestic protection. From BS 7671 Table 4D5 (Appendix 4), 10mm² twin and earth cable (6242Y) installed using Method C (clipped direct to surface) has a current-carrying capacity Iz = 64A at reference conditions of 30°C ambient temperature. Applied correction factor Ca = 0.94 for actual 25°C ambient from Table 4B1. No grouping or thermal insulation factors required for this installation. Effective capacity: Iz_effective = 64A × 0.94 = 60.2A. Verification per Regulation 433.1.1: Ib (41.3A) ≤ In (50A) ≤ Iz (60.2A) ✓ COMPLIANT. Voltage drop calculation: From Table 4D5, (mV/A/m) = 4.4 for 10mm² copper. Vd = (mV/A/m) × Ib × L = 4.4 × 41.3A × 15m = 2,725.8mV = 2.73V = 1.19% which is well within the 5% limit (11.5V at 230V) for power circuits per Regulation 525. Maximum earth fault loop impedance: From Table 41.3, for 50A Type B MCB, maximum Zs = 0.91Ω to achieve 0.4s disconnection per Regulation 411.3.2. Assuming typical TN-S external impedance Ze = 0.35Ω, available for cable resistance (R1+R2) = 0.91 - 0.35 = 0.56Ω. From Table I1, 10mm² copper conductor with 6mm² CPC at 15m gives approximate (R1+R2) = 0.11Ω, providing adequate safety margin per Regulation 411.4.4. Design fully complies with BS 7671:2018+A2:2022 requirements and utilises values from Tables 4D5, 4B1, 41.3, and I1. Cable sized per Regulation 522.6 provides mechanical protection appropriate for domestic installation."

CURRENT DATE: September 2025

${contextSection}

Respond ONLY with valid JSON in this exact format:
{
  "response": "COMPREHENSIVE design explanation (300-400 words) with ALL CALCULATIONS EMBEDDED IN THE NARRATIVE TEXT. Include complete formulas with numbers, cite specific regulation numbers (433.1.1, 525, etc.), reference tables with values (Table 4D5, Table 41.3), show voltage drop calculation steps, verify 433.1.1 relationship explicitly. Write as professional technical documentation.",
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
    "regulations": [],
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

    // Step 4: Call Lovable AI with tool calling
    logger.debug('Calling Lovable AI with tool calling');
    const aiStart = Date.now();
    
    // Timeout 270s via AbortController (increased for GPT-5 complex reasoning)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 270000);

    let aiResponse: Response;
    try {
      aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-5',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          tools: [{
            type: 'function',
            function: {
              name: 'produce_circuit_design',
              description: 'Return a full BS 7671 compliant single or multi-circuit design with calculations and regulation references.',
              parameters: {
                type: 'object',
                properties: {
                  response: { type: 'string', description: 'Narrative with calculations and BS 7671 citations.' },
                  circuits: {
                    type: 'array',
                    description: 'Array of per-circuit designs.',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        circuit_type: { type: 'string' },
                        load_power_w: { type: 'number' },
                        voltage_v: { type: 'number' },
                        cable_size_mm2: { type: 'number' },
                        cable_type: { type: 'string' },
                        protective_device: { type: 'string' },
                        in_amps: { type: 'number' },
                        iz_amps: { type: 'number' },
                        ib_amps: { type: 'number' },
                        max_zs_ohms: { type: 'number' },
                        calculated_zs_ohms: { type: 'number' },
                        rcd_required: { type: 'boolean' },
                        regulations: { type: 'array', items: { type: 'string' } }
                      },
                      required: ['name','circuit_type','cable_size_mm2','protective_device']
                    }
                  },
                  compliance_summary: { type: 'array', items: { type: 'string' } }
                },
                required: ['response']
              }
            }
          }],
          tool_choice: { type: 'function', function: { name: 'produce_circuit_design' } },
          max_completion_tokens: 4000,
          // GPT-5 doesn't support temperature - omitted
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      logger.error('Lovable AI error', { status: aiResponse.status, error: errorText });
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    logger.debug('AI response received', { duration: Date.now() - aiStart, hasChoices: !!aiData.choices?.[0] });

    // Extract structured data from tool call
    if (!aiData.choices?.[0]?.message?.tool_calls?.[0]) {
      logger.error('No tool call in AI response', { response: aiData });
      throw new Error('AI did not return tool call response');
    }

    const toolCall = aiData.choices[0].message.tool_calls[0];
    const designResult = JSON.parse(toolCall.function.arguments);

    // Extract regulation numbers from the response text using bulletproof regex
    const responseText = String(designResult.response || '');
    
    // Extract regulation numbers in multiple formats
    const regPatterns = [
      /\b(\d{3}(?:\.\d+){1,2})\b/g,                    // 433.1.1, 522.6.101
      /Regulation\s+(\d{3}(?:\.\d+){0,2})/gi,          // "Regulation 433.1.1"
      /reg\.?\s+(\d{3}(?:\.\d+){0,2})/gi,              // "reg 433.1" or "reg. 433.1"
      /BS\s*7671[:\s]+(\d{3}(?:\.\d+){0,2})/gi         // "BS 7671: 433.1.1"
    ];

    const regulationMatches = [];
    for (const pattern of regPatterns) {
      const matches = responseText.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) regulationMatches.push(match[1]);
      }
    }

    // Extract table references in multiple formats
    const tablePatterns = [
      /Table\s+(\d+[A-Z]?\d*(?:\.\d+)*)/gi,           // "Table 4D5", "Table 41.3"
      /Table\s+([A-Z]\d+)/gi,                         // "Table I1", "Table B2"
      /BS\s*7671\s+Table\s+(\d+[A-Z]?\d*(?:\.\d+)*)/gi, // "BS 7671 Table 4D5"
      /Appendix\s+\d+\s+Table\s+(\d+[A-Z]?\d*)/gi     // "Appendix 4 Table 4D5"
    ];

    const tableMatches = [];
    for (const pattern of tablePatterns) {
      const matches = responseText.matchAll(pattern);
      for (const match of matches) {
        if (match[1]) tableMatches.push(`Table ${match[1]}`);
      }
    }

    // De-duplicate and limit to first 15 unique references
    const extractedRefs = new Set([
      ...new Set(regulationMatches),
      ...new Set(tableMatches)
    ]);
    
    const uniqueRefs = Array.from(extractedRefs).slice(0, 15);
    
    // Always populate compliance.regulations from extracted refs
    if (!designResult.compliance) designResult.compliance = {};
    designResult.compliance.regulations = uniqueRefs;
    
    logger.info('Extracted regulations from response text', { 
      count: uniqueRefs.length, 
      regulations: uniqueRefs 
    });
    
    // Log RAG usage (use allRegulations)
    if (allRegulations && allRegulations.length > 0) {
      const citedRegs = designResult.compliance?.regulations || [];
      logger.info('RAG context usage', { 
        availableRegulations: allRegulations.length,
        citedCount: citedRegs.length
      });
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

    // Step 5: Build citations array - create citation for EVERY extracted reference
    const citations = [];
    const citedRegNumbers = designResult.compliance?.regulations || [];
    
    for (const regNum of citedRegNumbers) {
      // Try to match against fetched RAG data (use allRegulations)
      const regRow = allRegulations?.find(r => 
        r.regulation_number === regNum || 
        regNum.includes(r.regulation_number) ||
        r.regulation_number.includes(regNum)
      );
      
      if (regRow) {
        // Enriched citation from RAG data
        citations.push({
          source: 'BS 7671:2018+A2:2022',
          section: regNum,
          title: regRow.section || `Regulation ${regNum}`,
          content: regRow.content?.slice(0, 240) || '',
          relevance: regRow.similarity || 0.8,
          type: regNum.toLowerCase().includes('table') ? 'table' : 'regulation'
        });
      } else {
        // Fallback citation (still shows in UI even without RAG match)
        citations.push({
          source: 'BS 7671:2018+A2:2022',
          section: regNum,
          title: regNum.toLowerCase().includes('table') ? regNum : `Regulation ${regNum}`,
          content: 'Referenced in design calculations',
          relevance: 0.5,
          type: regNum.toLowerCase().includes('table') ? 'table' : 'regulation'
        });
      }
    }
    
    logger.info('Citations built', { count: citations.length, regulations: citedRegNumbers });
    
    // ⚡ CACHE THE RESULT (for future instant responses)
    if (!cacheHit && isCacheable(query) && allRegulations.length > 0) {
      const confidence = allRegulations.length > 0 
        ? allRegulations.reduce((sum: number, r: any) => sum + r.similarity, 0) / allRegulations.length
        : 0.5;
      
      await cache.set(
        query, 
        designResult.response, 
        allRegulations, 
        confidence,
        { circuitType, power, voltage, cableLength }
      );
      
      logger.info('💾 Response cached for future queries', { 
        confidence: confidence.toFixed(2),
        regCount: allRegulations.length 
      });
    }
    
    // Step 6: Return response - flat format for router/UI
    let { response, suggestedNextAgents, design, compliance, calculations } = designResult;
    
    // CRITICAL: Log narrative snippet for debugging
    logger.info('Narrative snippet', { 
      len: response?.length || 0, 
      sample: String(response || '').slice(0, 120) 
    });
    
    // Safety guard: if narrative is missing or very short, synthesize from design
    if (!response || response.length < 30) {
      logger.warn('Narrative too short or missing, synthesizing fallback', { 
        originalLength: response?.length || 0 
      });
      
      response = `Design Summary: ${design?.cableSize || '?'}mm² ${design?.cableType || 'cable'} protected by ${design?.protectionDevice || 'MCB'}. Design current ${calculations?.designCurrent || '?'}A. Voltage drop ${design?.voltageDrop || '?'}%. Maximum Zs ${calculations?.maxZs || '?'}Ω. ${compliance?.status === 'compliant' ? 'Compliant with BS 7671:2018+A2:2022.' : 'Review compliance notes.'} ${(compliance?.regulations || []).slice(0, 3).join(', ')}`;
    }
    
    return new Response(
      JSON.stringify({
        response,
        structuredData: { 
          design, 
          compliance, 
          calculations, 
          citations,
          suggestedNextAgents: suggestedNextAgents || []
        },
        suggestedNextAgents: suggestedNextAgents || []
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

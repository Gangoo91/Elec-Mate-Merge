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
} from '../_shared/v3-core.ts';
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
      JSON.stringify({ status: 'healthy', function: 'health-safety-v3', requestId, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }

  const requestId = generateRequestId();
  const logger = createLogger(requestId, { function: 'health-safety-v3' });
  const requestStart = Date.now();

  try {
    const body = await req.json();
    const { query, workType, location, hazards, messages, previousAgentOutputs, sharedRegulations } = body;

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
    if (workType && typeof workType !== 'string') {
      throw new ValidationError('workType must be a string');
    }
    if (location && typeof location !== 'string') {
      throw new ValidationError('location must be a string');
    }
    if (hazards && !Array.isArray(hazards)) {
      throw new ValidationError('hazards must be an array');
    }

    logger.info('🦺 Health & Safety V3 request received', { 
      query: effectiveQuery.substring(0, 50),
      enhanced: enhancement.addedContext.length > 0,
      workType,
      hasSharedRegs: !!sharedRegulations?.length
    });

    // PHASE 3: Safety Guardian - Detect critical hazards
    const { detectSafetyRequirements } = await import('../_shared/safety-guardian.ts');
    const safetyWarnings = detectSafetyRequirements(
      effectiveQuery,
      undefined, // circuitType from previousAgentOutputs
      undefined,
      location,
      undefined,
      undefined
    );
    
    if (safetyWarnings.criticalCount > 0) {
      logger.info(`🚨 ${safetyWarnings.criticalCount} critical hazards detected`);
    }

    // Get API keys
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Step 1: Use intelligent RAG with cross-encoder reranking
    logger.debug('Starting intelligent RAG for H&S');
    const ragStart = Date.now();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { intelligentRAGSearch } = await import('../_shared/intelligent-rag.ts');
    
    // Add strict timeout to prevent 2+ minute RAG searches
    const hsKnowledge = await Promise.race([
      intelligentRAGSearch({
        circuitType: workType,
        searchTerms: query.split(' ').filter(w => w.length > 3),
        expandedQuery: query,
        context: {
          ragPriority: {
            bs7671: 70,           // Medium - regulatory compliance for safety
            design: 20,           // Very Low - below threshold, won't search
            health_safety: 95,    // HIGHEST - risk assessment procedures, PPE, hazards
            installation: 70,     // Medium - installation methods inform risk assessments
            inspection: 0,        // Skip - not relevant for risk assessment
            project_mgmt: 0       // Skip - not relevant for risk assessment
          },
          maxSearchTime: 8000,    // 8 seconds max total
          skipFailedSearches: true,
          useCache: true
        }
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('RAG search timeout - using cached results')), 10000)
      )
    ]).catch(error => {
      logger.warn('RAG search timeout, using minimal context', { error });
      return { 
        regulations: [],
        healthSafetyDocs: [],
        installationDocs: []
      };
    });
    
    // PHASE 2: Reuse BS 7671 regulations from Designer (filter for H&S relevant ones)
    const sharedRegs = sharedRegulations || [];
    if (sharedRegs.length >= 8) {
      logger.info('📦 Filtering shared regulations from Designer for H&S relevance');
      
      // Filter for H&S chapters: 41 (Protection), 70 (Special locations), 54 (Earthing), 531 (Devices)
      const hsRelevantRegs = sharedRegs.filter((r: any) => 
        /^(41|70|54|531)/.test(r.regulation_number)
      );
      
      if (hsRelevantRegs.length >= 3) {
        logger.info(`Reused ${hsRelevantRegs.length} regulations from Designer`);
        // Merge with RAG results
        hsKnowledge.regulations = [
          ...hsRelevantRegs,
          ...(hsKnowledge.regulations || [])
        ].slice(0, 15); // Top 15 unique
      }
    }
    
    logger.debug('H&S knowledge retrieved', { 
      duration: Date.now() - ragStart,
      resultsCount: hsKnowledge.regulations?.length || 0,
      avgScore: hsKnowledge.healthSafetyDocs?.length > 0 ? (hsKnowledge.healthSafetyDocs.reduce((s: number, k: any) => s + (k.hybrid_score || 0), 0) / hsKnowledge.healthSafetyDocs.length).toFixed(3) : 'N/A'
    });

    // PHASE 2A: Build H&S context with STRUCTURED hazard extraction
    let hsContext: string;
    let structuredHazards = '';
    
    try {
      logger.info('Building H&S context from RAG results with structured hazard extraction');
      
      // Extract hazards directly from RAG docs
      if (hsKnowledge?.healthSafetyDocs && hsKnowledge.healthSafetyDocs.length > 0) {
        structuredHazards = '\n\n📋 HAZARDS IDENTIFIED IN KNOWLEDGE BASE (You MUST include these):\n\n';
        
        hsKnowledge.healthSafetyDocs.forEach((doc: any, idx: number) => {
          // Extract hazard category from topic
          const category = doc.topic || 'General';
          const content = doc.content || '';
          
          structuredHazards += `${idx + 1}. ${category}\n`;
          structuredHazards += `   Context: ${content.substring(0, 600)}\n`; // Increased from 400 to 600
          
          // Extract specific controls if present
          const controlMatch = content.match(/control[s]?:([^.]+)/i);
          if (controlMatch) {
            structuredHazards += `   Controls: ${controlMatch[1].trim()}\n`;
          }
          
          // Extract PPE if present
          const ppeMatch = content.match(/PPE:([^.]+)/i);
          if (ppeMatch) {
            structuredHazards += `   PPE: ${ppeMatch[1].trim()}\n`;
          }
          
          structuredHazards += '\n';
        });
        
        hsContext = hsKnowledge.healthSafetyDocs.map((hs: any) => 
          `${hs.topic}: ${hs.content}`
        ).join('\n\n');
      } else {
        hsContext = 'Apply general electrical safety best practices per HSE guidance and BS 7671.';
        structuredHazards = '';
      }
      
      logger.info('Context built with structured hazards', {
        hsContextLength: hsContext.length,
        structuredHazardsLength: structuredHazards.length,
        hazardCategoriesFound: hsKnowledge?.healthSafetyDocs?.length || 0
      });
    } catch (contextError) {
      logger.error('Failed to build context', {
        error: contextError instanceof Error ? contextError.message : String(contextError),
        stack: contextError instanceof Error ? contextError.stack : undefined
      });
      
      // Provide minimal fallback to continue processing
      hsContext = 'Apply general electrical safety best practices per HSE guidance and BS 7671.';
      structuredHazards = '';
    }

    // Build HIGH-LEVEL INSTALL KNOWLEDGE from installer output
    let installKnowledge = '';
    let contextSection = '';
    
    // NEW: Parse installationSteps directly from body (preferred) or previousAgentOutputs
    const installationSteps = body.installationSteps || 
      previousAgentOutputs?.find((o: any) => o.agent === 'installer')?.response?.structuredData?.steps;
    
    if (installationSteps && Array.isArray(installationSteps)) {
      installKnowledge = '\n\n📋 INSTALLATION STEPS TO ASSESS FOR RISKS:\n';
      installKnowledge += '⚠️ CRITICAL: Link each hazard to its step number using linkedToStep field\n\n';
      
      installationSteps.forEach((step: any, idx: number) => {
        const stepNum = idx + 1;
        installKnowledge += `Step ${stepNum}: ${step.title || step.stepTitle || 'Untitled'}\n`;
        installKnowledge += `  Description: ${step.description || step.content || 'No description'}\n`;
        if (step.safetyRequirements && step.safetyRequirements.length > 0) {
          installKnowledge += `  Existing safety: ${step.safetyRequirements.join(', ')}\n`;
        }
        if (step.equipmentNeeded && step.equipmentNeeded.length > 0) {
          installKnowledge += `  Tools: ${step.equipmentNeeded.join(', ')}\n`;
        }
        installKnowledge += '\n';
      });
      
      installKnowledge += '⚠️ For each hazard you identify, set linkedToStep to the step number it applies to.\n';
      installKnowledge += '   Example: If "work at height" applies to step 2, set linkedToStep: 2\n';
      installKnowledge += '   General hazards (site access, welfare) should use linkedToStep: 0\n\n';
    } else if (previousAgentOutputs && previousAgentOutputs.length > 0) {
      const installerOutput = previousAgentOutputs.find((o: any) => o.agent === 'installer');
      const designerOutput = previousAgentOutputs.find((o: any) => o.agent === 'designer');
      
      if (installerOutput?.response?.structuredData?.steps) {
        const steps = installerOutput.response.structuredData.steps;
        installKnowledge = '\n\n📋 HIGH-LEVEL INSTALLATION STEPS (assess risks for each):\n\n';
        steps.forEach((step: any, idx: number) => {
          installKnowledge += `${idx + 1}. ${step.action || step.description}\n`;
          if (step.considerations) installKnowledge += `   → ${step.considerations}\n`;
        });
        installKnowledge += '\n';
      }
      
      contextSection += '\n\nWORK TO ASSESS FOR RISKS:\n';
      if (installerOutput?.response?.structuredData) {
        const inst = installerOutput.response.structuredData;
        contextSection += `INSTALLATION STEPS: ${inst.steps?.length || 0} steps\n`;
      }
      if (designerOutput?.response?.structuredData) {
        const d = designerOutput.response.structuredData;
        contextSection += `DESIGN: ${d.voltage}V, ${d.cableType}, ${d.environment}\n`;
      }
    }
    if (messages && messages.length > 0) {
      contextSection += '\n\nCONVERSATION HISTORY:\n' + messages.map((m: any) => 
        `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
      ).slice(-5).join('\n');
      
      contextSection += '\n\n⚠️ CRITICAL INSTRUCTION - CONVERSATIONAL MODE:\n';
      contextSection += 'This is an ongoing conversation, NOT a standalone query. You MUST:\n';
      contextSection += '1. Reference previous messages naturally (e.g., "Right, for that shower circuit we discussed...")\n';
      contextSection += '2. Build on earlier risk assessments (e.g., "Since we already identified live working risks...")\n';
      contextSection += '3. Notice context changes (e.g., "Wait, the location changed from bathroom to kitchen...")\n';
      contextSection += '4. Respond like an experienced H&S adviser having a conversation, not filling out a form\n';
      contextSection += '5. If unsure what the user means, reference what was discussed to clarify\n';
    }

    // METHOD STATEMENT CRITICAL THINKING GUIDANCE
    const methodThinkingGuidance = `
**METHOD STATEMENT CRITICAL THINKING:**
Your method statement must think 3 steps ahead of what the user would consider.

**EXAMPLE - Replacing a Consumer Unit:**

User thinks:
1. Isolate supply
2. Remove old CU
3. Install new CU
4. Test circuits

YOU must think:
0. BEFORE ARRIVAL: Notify DNO of isolation (5 days notice if seal break), check client has occupancy insurance during power outage, arrange generator if critical loads (freezer, medical equipment)
1. PRE-WORK: Customer belongings protection (dust sheets over items below CU), establish exclusion zone (1m), post "Electrical Work - No Entry" signs, identify location of main incoming fuse (often outside meter cupboard), photograph existing installation for records
2. ISOLATION: Check DNO cutout seal intact, contact DNO for seal removal if required, isolate main switch, test dead at distribution board AND at each circuit end (sockets, lights), LOTO with personal lock, display "Danger - Men Working" sign
3. DISCONNECTION: Photograph all final circuit terminations (reference for reconnection), label all cables with circuit designation, safe removal sequence (earth first on removal, earth last on installation), store removed CU in safe location away from work area
4. INSTALLATION: Check mounting surface structural integrity (some cavity walls need backing plate), verify new CU orientation (upright, level, accessible), route incoming tails with strain relief, segregate final circuits by function (lighting/power/immersion)
5. TERMINATION: Torque settings per manufacturer (typically 35-40Nm for main switch, 2.5Nm for MCBs), double-check polarity, ensure earth bonding to gas/water <600mm of entry point per Reg 544.1
6. TESTING: Full sequence: Continuity of protective conductors, Insulation resistance (500V megger), Polarity, Earth fault loop impedance, RCD operation (×1, ×5, ramp test), verify all readings meet BS 7671 Table 41.5
7. ENERGIZATION: Remove LOTO, inform all persons on site, energize main switch, verify voltage at incoming terminals (230V ±10%), close each MCB individually while checking for overload/fault, test sample outlets on each circuit
8. HANDOVER: Complete Minor Works Certificate or EIC, explain new consumer unit operation to client, label all circuits, demonstrate RCD test button, advise 10-year inspection interval per BS 7671 Regulation 514.12.1

**OTHER EXAMPLES OF DEEPER THINKING:**

Cable Installation:
- Not just "install cable" → Consider: Is building occupied? (work out of hours to avoid disruption), Is there asbestos? (Cat A survey needed before penetrations), Are there bats? (protected species, works restricted March-October), What about fire stopping after cables pass through compartment walls? (120-minute rated where required)

MEWP Work:
- Not just "use MEWP" → Consider: Ground bearing capacity (request ground survey for soft ground/cellars below), Overhead power lines (obtain CAT scan + visual check + 3m exclusion), Weather restrictions (wind speed <12.5 m/s, no rain if electrical work), Rescue plan (who retrieves operator if MEWP fails at height? - need second MEWP or fire brigade pre-arrangement)

Testing & Commissioning:
- Not just "test circuits" → Consider: Will testing trip any existing circuits? (test sequence to minimise disruption), Can we test without inconveniencing client? (arrange testing during quiet hours), Do we need a standby generator? (care homes, cold storage), Have we allowed time for thermal imaging? (identify loose connections under load), What about proving functional testing? (operate all emergency lighting, fire alarm testing coordination)
`;

    logger.info('💭 THINKING: Identifying electrical hazards and risks');
    
    const systemPrompt = `You are an expert Health & Safety adviser specialising in UK electrical installations.

**REGULATION-GROUNDED RISK ASSESSMENT:**
Always ground your risk assessment in BS 7671:2018+A2:2022 requirements:
- Reference specific regulations (e.g., "Regulation 411.3.3 requires...")
- Cite applicable chapters (e.g., "Section 701 special locations...")
- Base hazard identification on electrical work requirements
- Connect control measures to regulatory compliance

**CRITICAL: ALL OUTPUT MUST BE IN UK ENGLISH**
- Use UK spellings: analysing (not analyzing), realise (not realize), categorise (not categorize), minimise (not minimize), organise (not organize), authorised (not authorized), recognised (not recognized)
- Use UK terminology: spillage (not spill), tap (not faucet), pavement (not sidewalk), metre (not meter for distance), labour (not labor), earthing (not grounding), consumer unit (not breaker panel)
- Use UK measurements: metres (not meters), litres (not liters), millimetres (not millimeters)
- Use UK phrases: "whilst" (not "while"), "amongst" (not "among"), "towards" (not "toward")
- Reference UK standards: BS 7671, BS EN ISO, HSE guidance, CDM Regulations
- Use UK trade terminology: spanner (not wrench), first fix (not rough-in), second fix (not trim-out)

YOUR ROLE: Produce BS 8800-compliant risk assessments with 5x5 matrix scoring.

KNOWLEDGE BASE (${hsKnowledge?.healthSafetyDocs?.length || 0} safety practices):
${hsContext}

${structuredHazards}

${installKnowledge}

**AI REASONING APPROACH:**
1. **Extract from RAG**: Start by converting each hazard category in "HAZARDS IDENTIFIED IN KNOWLEDGE BASE" into a detailed hazard entry
2. **Assess job specifics**: Consider the installation type, location, and conditions provided
3. **Add supplementary hazards**: If you identify additional risks not covered by RAG (e.g., asbestos in pre-2000 building, overhead power lines, public access areas), add those
4. **Expand controls**: Enhance RAG control measures with job-specific details (e.g., "30mA RCD" becomes "30mA Type A RCD to BS EN 61008-1 feeding bathroom circuit per Reg 701.411.3.3")

Your goal: Comprehensive risk assessment covering all hazards (RAG + supplementary), each with specific controls and regulation references.

**CRITICAL: COMPREHENSIVE HAZARD IDENTIFICATION**
The structured hazards section above contains 8-18 verified hazard categories for this work.
You MUST create detailed hazard entries for ALL relevant categories.

**TARGET RISK COUNT - SCALE TO JOB COMPLEXITY:**

Simple Jobs (10-12 hazards):
- Single-phase domestic installation
- Standard socket circuits
- New build (no asbestos, clean site)
- Ground level work only
Example: "Replace consumer unit in new build flat, ground floor access"

Standard Jobs (12-15 hazards):
- Commercial single-phase work
- Multiple circuits or rooms
- Standard building (post-2000)
- Some height work (ladders, short scaffold)
Example: "Commercial kitchen rewire, 3 circuits, 2m height"

Complex Jobs (15-18 hazards):
- 3-phase installations
- Multiple work types (installation + testing + commissioning)
- Height work >2m (MEWP, scaffold)
- Occupied buildings with public access
- Older buildings (potential asbestos)
Example: "3-phase distribution board in 1980s office building, 4m height, occupied premises"

Very Complex Jobs (18-25 hazards):
- Industrial/heritage buildings (pre-1950)
- Live work + height work + confined space
- Public spaces (crowd control, restricted hours)
- Environmental factors (oil, chemicals, contaminated ground)
- Multiple high-severity hazards (asbestos, HV, structural)
Example: "Bus station external lighting at 5m height, 1943 building, oil/grit contamination, closed to public during works"

**CRITICAL THINKING REQUIRED:**
For each job, think like an experienced H&S adviser:
1. What could the client NOT have thought of? (e.g., asbestos in 1940s building, underground services, bat roosts)
2. What secondary hazards exist? (e.g., ladder work = manual handling of ladder, not just falls)
3. What environmental factors? (weather, contamination, wildlife, adjacent hazards)
4. What human factors? (lone working, fatigue, competence, communication)
5. What "what if" scenarios? (power loss, equipment failure, emergency access)

**EXAMPLE - THINK DEEPER:**
❌ BAD: "Electric shock - use PPE"
✅ GOOD: "Electric shock from inadvertent contact with concealed live conductors during chasing - Old buildings may have unsleeved cables buried in walls (pre-1960s practice). Control: Cable detection with CAT scanner before any penetration, assume all walls are live until proven dead, use GS38 voltage detector, insulated tools to IEC 60900"

Minimum 10 hazards always required. For complex jobs (3-phase, height, heritage buildings, public spaces), aim for 15-20 comprehensive hazards.

Example GOOD entry:
{
  "hazardNumber": 4,
  "hazard": "Electric shock from live conductors during isolation failure",
  "whoAffected": "Electricians, Labourers",
  "likelihood": 3,
  "severity": 5,
  "riskScore": 15,
  "riskLevel": "Very High",
  "controls": ["Follow BS 7671 Section 462 isolation", "LOTO on all sources", "Prove dead with GS38 voltage indicator"],
  "regulation": "EWR 1989 Reg 4(3)",
  "linkedToStep": 2
}

Example BAD (too vague):
{
  "hazardNumber": 1,
  "hazard": "Electrical hazards",
  "controls": ["Use PPE"]
}

RISK MATRIX (5x5):
- Likelihood: 1=Rare, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain
- Severity: 1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Catastrophic
- Risk Score = L × S (1-4: Low, 5-9: Medium, 10-14: High, 15-25: Very High)

INSTRUCTIONS:
1. CRITICAL: You will receive installation steps below - identify hazards for EACH SPECIFIC STEP
2. Use linkedToStep field to link hazards (e.g., step 1 uses linkedToStep: 1, step 2 uses linkedToStep: 2)
3. General site hazards (vehicle movements, site access, welfare facilities) should use linkedToStep: 0
4. General hazards (linkedToStep: 0) will be automatically added to the site setup step
5. Extract hazards from knowledge base with specific regulations (e.g., "EWR 1989 Reg 4(3)", "WAHR 2005 Reg 6")
6. Apply control hierarchy: Elimination → Substitution → Engineering → Admin → PPE
7. Calculate BEFORE and AFTER risk scores to show control effectiveness
8. Reference emergency procedures (HSE INDG231 for shock, CO2 for electrical fires)
9. Include isolation per BS 7671 Section 462 with lock-off devices

**PPE REQUIREMENTS - CONTEXT IS CRITICAL:**
⚠️ CRITICAL: You MUST tailor PPE to the specific job. DO NOT use generic 5-item lists!

**MANDATORY PPE ANALYSIS PROCESS:**
1. Identify ALL hazards present (electrical, height, noise, dust, chemicals, confined space, etc.)
2. For EACH hazard, determine required PPE with specific standards
3. Minimum 5 items, but ADD MORE based on job complexity:
   - Simple domestic socket: 5-6 items
   - Commercial distribution board: 7-9 items
   - Complex work (height + live + confined space): 10-12 items

**EXAMPLES BY JOB TYPE:**

Simple Domestic (5-6 PPE items):
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 2) - MANDATORY
- Knee pads (BS EN 14404) - RECOMMENDED if floor work

Complex Commercial 3-Phase (8-10 PPE items):
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY for isolation
- Arc-rated gloves (BS EN 60903 Class 00) - MANDATORY for live work
- Arc flash suit (IEC 61482-2 Class 2) - MANDATORY if live 3-phase
- Face shield (BS EN 166) - MANDATORY for arc flash risk
- Safety glasses (BS EN 166) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 2) - MANDATORY
- Voltage detector (GS38) - MANDATORY
- Insulated tools (IEC 60900) - MANDATORY

Work at Height (10-12 PPE items):
- Safety helmet with chin strap (BS EN 397) - MANDATORY
- Fall arrest harness (BS EN 361) - MANDATORY above 2m
- Energy absorbing lanyard (BS EN 355) - MANDATORY
- Tool lanyard - MANDATORY
- Safety boots with ankle support (BS EN ISO 20345 S3) - MANDATORY
- High-visibility vest (EN ISO 20471 Class 3) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- Work positioning belt (BS EN 358) - if required
- Rescue equipment - MANDATORY (rescue plan required)
- Mobile phone/radio - MANDATORY for lone working at height

Confined Space (12+ PPE items):
- Breathing apparatus (BS EN 137) - MANDATORY if O2 < 19.5%
- Multi-gas detector (calibrated) - MANDATORY
- Harness with retrieval line (BS EN 361) - MANDATORY
- Emergency rescue tripod - MANDATORY
- Safety helmet (BS EN 397) - MANDATORY
- Safety boots (BS EN ISO 20345 S3) - MANDATORY
- High-visibility coveralls (EN ISO 20471) - MANDATORY
- Safety glasses (BS EN 166) - MANDATORY
- Insulated gloves (BS EN 60903 Class 0) - MANDATORY
- Emergency lighting (ATEX rated if explosive atmosphere) - MANDATORY
- Communication system (radio/hands-free) - MANDATORY
- First aid kit (specific to confined space) - MANDATORY

**CRITICAL RULES:**
- Height work (>2m) → ADD fall arrest harness, tool lanyard, chin strap helmet
- 3-phase live work → ADD arc flash suit, face shield, arc-rated gloves
- Noise >85dB or power tools >2hrs → ADD ear defenders (mandatory: true)
- Dust/drilling → ADD FFP3 mask (mandatory: true if silica dust)
- Confined space → ADD BA, gas monitor, rescue equipment
- Outdoor site → ADD hi-vis Class 2 minimum
- Asbestos risk → ADD Category A PPE (full RPE, coveralls, decontamination)
- Live testing → ADD insulated tools, voltage detector, arc flash PPE

**NEVER:**
- Use the same 5-item list for all jobs
- Mark PPE as "RECOMMENDED" if regulations require it (use mandatory: true)
- Forget to add equipment-specific PPE (MEWP = harness, confined space = BA)

Set mandatory: true ONLY if the hazard is definitely present in this work.
Set mandatory: false for "nice to have" or situational PPE.

You MUST:
1. **ANALYZE the specific job description and hazards to determine appropriate PPE**
2. Extract exact PPE types, standards, and purposes from the knowledge base
3. Apply context-specific mandatory flags based on the actual work being done
4. Structure each PPE item with:
   - itemNumber: Sequential number (1, 2, 3...)
   - ppeType: Equipment name specific to this job (e.g., "Fall arrest harness with shock absorbing lanyard" not just "Harness")
   - standard: BS/EN standard (e.g., "BS EN 397", "BS EN 60903 Class 0", "BS EN 352-2", "IEC 61482-2")
   - mandatory: true ONLY if hazard definitely present; false for situational
   - purpose: Specific protection purpose including when it applies and why it's needed for THIS job
{
  "itemNumber": 7,
  "ppeType": "Respiratory protective equipment (FFP3 mask)",
  "standard": "BS EN 149 FFP3",
  "mandatory": true,
  "purpose": "Essential protection against asbestos fibres if ACMs are present or suspected on site."
}
{
  "itemNumber": 8,
  "ppeType": "Fall arrest harness",
  "standard": "BS EN 361",
  "mandatory": true,
  "purpose": "Mandatory fall protection when working at height >2m using MEWP or scaffold tower."
}

${contextSection}

Return comprehensive risk assessment with practical controls from the knowledge base.`;

    const userPrompt = `Provide a risk assessment and method statement for:
${query}

${workType ? `Work Type: ${workType}` : ''}
${location ? `Location: ${location}` : ''}
${hazards ? `Known Hazards: ${hazards.join(', ')}` : ''}

Include all safety controls, PPE requirements, and emergency procedures.`;

    // Step 4: Call AI with optimized timeout and error handling
    logger.info('💭 THINKING: Assessing likelihood and severity of identified hazards');
    logger.info('Starting AI call with timeout protection');
    logger.debug('Calling AI with wrapper');
    const { callAI } = await import('../_shared/ai-wrapper.ts');
    
    let aiResult;
    try {
      aiResult = await callAI(OPENAI_API_KEY!, {
        model: 'gpt-5-mini-2025-08-07',
        systemPrompt,
        userPrompt,
        maxTokens: 16000,  // Doubled: 8000 for reasoning + 8000 for generating 10-18 detailed hazards
        timeoutMs: 200000,  // 200 seconds (safe margin before Supabase 230s limit)
      tools: [{
        type: 'function',
        function: {
          name: 'provide_safety_assessment',
          description: 'Return comprehensive health and safety assessment with risk mitigation',
          parameters: {
            type: 'object',
            properties: {
              response: {
                type: 'string',
                description: 'Natural, conversational risk assessment IN UK ENGLISH ONLY (authorised not authorized, realise not realize, organise not organize, metres not meters). Reference previous discussion. As detailed as needed.'
              },
              riskAssessment: {
                type: 'object',
                properties: {
                  hazards: {
                    type: 'array',
                     items: {
                      type: 'object',
                      properties: {
                        hazard: { type: 'string', description: 'Hazard description in UK English (authorised, realise, organise, metres)' },
                        linkedToStep: { 
                          type: 'number', 
                          description: 'Step number this hazard applies to (1-based index), or 0 for general site hazards' 
                        },
                        likelihood: { type: 'number', minimum: 1, maximum: 5 },
                        likelihoodReason: { type: 'string' },
                        severity: { type: 'number', minimum: 1, maximum: 5 },
                        severityReason: { type: 'string' },
                        riskScore: { type: 'number' },
                        riskLevel: { type: 'string' },
                        regulation: { type: 'string' }
                      },
                      required: ['hazard', 'linkedToStep', 'likelihood', 'severity', 'riskScore', 'riskLevel']
                    }
                  },
                  controls: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        hazard: { type: 'string' },
                        linkedToStep: { 
                          type: 'number', 
                          description: 'Step number this control applies to (must match hazard linkedToStep)' 
                        },
                        controlMeasure: { type: 'string', description: 'Control measure in UK English (authorised, realise, organise, metres)' },
                        residualLikelihood: { type: 'number' },
                        residualSeverity: { type: 'number' },
                        residualRisk: { type: 'number' },
                        residualRiskLevel: { type: 'string' },
                        regulation: { type: 'string' },
                        practicalImplementation: { type: 'string' }
                      },
                      required: ['hazard', 'linkedToStep', 'controlMeasure', 'residualRisk', 'residualRiskLevel']
                    }
                  },
                  riskMatrix: {
                    type: 'object',
                    properties: {
                      beforeControls: { type: 'object' },
                      afterControls: { type: 'object' }
                    }
                  },
                  ppeDetails: { 
                    type: 'array',
                    description: 'EXTRACT from knowledge base - do not generate generic PPE',
                    items: {
                      type: 'object',
                      properties: {
                        itemNumber: { type: 'number', description: 'Sequential number (1, 2, 3...)' },
                        ppeType: { type: 'string', description: 'Equipment name from knowledge base' },
                        standard: { type: 'string', description: 'BS/EN standard from knowledge base (e.g., BS EN 397)' },
                        mandatory: { type: 'boolean', description: 'true if from knowledge base, false if suggested' },
                        purpose: { type: 'string', description: 'Protection purpose from knowledge base' }
                      },
                      required: ['itemNumber', 'ppeType', 'standard', 'mandatory', 'purpose']
                    }
                  },
                  emergencyProcedures: { type: 'array', items: { type: 'string' } }
                },
                required: ['hazards', 'controls']
              },
              siteLogistics: {
                type: 'object',
                description: 'Site logistics and project management details',
                properties: {
                  vehicleAccess: { type: 'string', description: 'Vehicle access route and restrictions in UK English' },
                  parking: { type: 'string', description: 'Parking arrangements and allocated spaces' },
                  materialStorage: { type: 'string', description: 'Material storage location and requirements' },
                  wasteManagement: { type: 'string', description: 'Waste segregation and disposal procedures' },
                  welfareFacilities: { type: 'string', description: 'Toilet, rest area, kettle facilities' },
                  siteRestrictions: { type: 'string', description: 'Noise hours, occupied building rules, cleanliness standards' }
                }
              },
              competencyMatrix: {
                type: 'object',
                description: 'Competency, training, and certification requirements - LINK EQUIPMENT TO CERTIFICATIONS',
                properties: {
                  competencyRequirements: { type: 'string', description: 'Required qualifications (e.g., ECS Gold Card, 18th Edition)' },
                  trainingRequired: { 
                    type: 'string', 
                    description: 'Mandatory certifications based on equipment/environment:\n- MEWP (scissor lift, boom lift, cherry picker) → IPAF 3a/3b certification required\n- Portable scaffold towers → PASMA certification required\n- Asbestos awareness → Mandatory if ACMs present (Category A training)\n- Confined space entry → CS1/CS2 training and permit-to-work\n- HV switching (>1000V) → AP/AR person authorisation\n- First Aid → At least one First Aid at Work certified person on site' 
                  },
                  supervisionLevel: { type: 'string', description: 'Supervision requirements (e.g., Continuous supervision by approved electrician)' },
                  additionalCertifications: { type: 'string', description: 'Additional certs needed (e.g., AP/AR persons for HV works)' }
                }
              },
              conditionalProcedures: {
                type: 'object',
                description: 'Conditional safety procedures based on installation context',
                properties: {
                  workAtHeight: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      equipment: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            type: { type: 'string', description: 'Equipment type (e.g., MEWP, Scaffold)' },
                            height: { type: 'string', description: 'Working height' },
                            fallProtection: { type: 'string', description: 'Fall protection measures' },
                            inspection: { type: 'string', description: 'Inspection requirements' }
                          }
                        }
                      }
                    }
                  },
                  servicesUtilities: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      detectionMethod: { type: 'string', description: 'CAT & Genny scan procedures' },
                      servicesPresent: { type: 'array', items: { type: 'string' } },
                      catScanner: { type: 'string', description: 'CAT scanner model and usage' },
                      safeDigging: { type: 'string', description: 'Hand digging protocols near services' }
                    }
                  },
                  hotWorks: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      permitRequired: { type: 'string', description: 'Hot works permit details' },
                      fireWatchDuration: { type: 'string', description: 'Fire watch duration after works' },
                      combustiblesRemoved: { type: 'string', description: 'Clearance distance for combustibles' },
                      fireExtinguishers: { type: 'string', description: 'Fire extinguisher requirements' },
                      ventilation: { type: 'string', description: 'Ventilation requirements' }
                    }
                  },
                  noiseDust: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      noiseLevels: { type: 'string', description: 'Expected dB(A) levels' },
                      hearingProtection: { type: 'string', description: 'Hearing protection requirements' },
                      dustSuppression: { type: 'string', description: 'Dust suppression methods' },
                      rpeRequired: { type: 'string', description: 'Respiratory protective equipment' },
                      hoursRestriction: { type: 'string', description: 'Noise restriction hours' }
                    }
                  },
                  clientLiaison: {
                    type: 'object',
                    properties: {
                      required: { type: 'boolean' },
                      occupiedPremises: { type: 'string', description: 'Whether building is occupied' },
                      accessRestrictions: { type: 'string', description: 'Access restrictions and out-of-hours requirements' },
                      publicAreas: { type: 'string', description: 'Public area protection (barriers, cable mats)' },
                      dailyBriefings: { type: 'string', description: 'Client meeting schedule' },
                      disruptionNotices: { type: 'string', description: 'Power outage notification procedures' },
                      cleanlinessStandard: { type: 'string', description: 'Daily cleaning requirements' }
                    }
                  }
                }
              },
              methodStatement: {
                type: 'object',
                properties: {
                  steps: { type: 'array', items: { type: 'object' } },
                  permitRequired: { type: 'boolean' },
                  competentPerson: { type: 'boolean' }
                }
              },
              compliance: {
                type: 'object',
                properties: {
                  regulations: { type: 'array', items: { type: 'string' } },
                  warnings: { type: 'array', items: { type: 'string' } }
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
      toolChoice: { type: 'function', function: { name: 'provide_safety_assessment' } }
      });
      
      logger.info('AI call completed successfully');
      
    } catch (aiError) {
      logger.error('AI call failed', {
        error: aiError instanceof Error ? aiError.message : String(aiError),
        stack: aiError instanceof Error ? aiError.stack : undefined,
        promptLength: systemPrompt.length + userPrompt.length,
        isTimeout: aiError instanceof Error && aiError.message.toLowerCase().includes('timeout')
      });
      
      // For timeouts, return minimal valid response instead of failing completely
      if (aiError instanceof Error && aiError.message.toLowerCase().includes('timeout')) {
        logger.warn('AI timeout - returning minimal safety assessment');
        
        return new Response(
          JSON.stringify({
            success: true,
            response: 'Risk assessment generated with standard electrical hazards per BS 7671 and HSE guidance',
            structuredData: {
              riskAssessment: {
                hazards: [
                  {
                    hazard: "Electrical shock from live conductors",
                    risk: "Electric shock, burns, or fatality",
                    likelihood: 4,
                    severity: 5,
                    riskRating: 20,
                    controls: "Isolate power supply per BS 7671 Section 462; Use voltage tester to prove dead; Wear insulated gloves to BS EN 60903",
                    residualRisk: 4
                  },
                  {
                    hazard: "Arc flash during switching operations",
                    risk: "Burns and blast injuries from electrical arc",
                    likelihood: 3,
                    severity: 5,
                    riskRating: 15,
                    controls: "Maintain safe working distance; Wear arc-rated PPE; Use remote operation where possible",
                    residualRisk: 6
                  }
                ],
                ppeDetails: [
                  {
                    itemNumber: 1,
                    ppeType: "Safety helmet",
                    standard: "BS EN 397",
                    mandatory: true,
                    purpose: "Protection against head injuries from falling objects and impact"
                  },
                  {
                    itemNumber: 2,
                    ppeType: "Safety boots",
                    standard: "BS EN ISO 20345 S3",
                    mandatory: true,
                    purpose: "Protection against electrical hazards, crushing, and penetration"
                  },
                  {
                    itemNumber: 3,
                    ppeType: "Insulated gloves",
                    standard: "BS EN 60903 Class 0",
                    mandatory: true,
                    purpose: "Protection against electrical shock from live conductors up to 500V AC"
                  },
                  {
                    itemNumber: 4,
                    ppeType: "Safety glasses",
                    standard: "BS EN 166",
                    mandatory: true,
                    purpose: "Eye protection against arc flash, debris, and dust"
                  }
                ],
                emergencyProcedures: ["Isolate power supply in emergency", "Call 999 for electric shock incidents", "Administer first aid if qualified", "Ensure first aider location is known to all workers"]
              }
            }
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      
      // Re-throw other errors to be caught by outer handler
      throw aiError;
    }

    // AI wrapper already extracts tool call arguments as JSON string
    // Just parse it directly - no need to navigate through choices/message/tool_calls
    const safetyResult = JSON.parse(aiResult.content);

    logger.info('Risk assessment completed', {
      hazardsIdentified: safetyResult.riskAssessment?.hazards?.length,
      controlsApplied: safetyResult.riskAssessment?.controls?.length
    });

    // Step 5: Build RAG preview from H&S knowledge
    const ragPreview = hsKnowledge?.healthSafetyDocs && hsKnowledge.healthSafetyDocs.length > 0
      ? hsKnowledge.healthSafetyDocs.slice(0, 5).map((item: any) => ({
          id: item.id,
          topic: item.topic || 'Safety Guidance',
          scale: item.scale,
          excerpt: (item.content || '').slice(0, 200) + '…'
        }))
      : [];

    const citations = ragPreview.map((r: any, i: number) => ({
      number: `H&S-${i + 1}`,
      title: r.topic || 'Safety Guidance'
    }));

    // Step 6: Enrich response with UI metadata
    const enrichedResponse = enrichResponse(
      safetyResult,
      hsKnowledge?.healthSafetyDocs || [],
      'health-safety',
      { workType, location, hazards }
    );

    // Log RAG metrics for observability
    const totalTime = Date.now() - requestStart;
    const { error: metricsError } = await supabase.from('agent_metrics').insert({
      function_name: 'health-safety-v3',
      request_id: requestId,
      rag_time: ragStart ? Date.now() - ragStart : null,
      total_time: totalTime,
      regulation_count: hsKnowledge?.healthSafetyDocs?.length || 0,
      success: true,
      query_type: workType || 'general'
    });

    if (metricsError) {
      logger.warn('Failed to log metrics', { error: metricsError.message });
    }

    // Validate response structure before returning
    const riskAssessment = safetyResult.riskAssessment || {};
    const methodStatement = safetyResult.methodStatement || {};
    const compliance = safetyResult.compliance || {};
    
    const validatedRiskAssessment = {
      hazards: (riskAssessment.hazards || []).sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0)),
      controls: riskAssessment.controls || [],
      ppeDetails: riskAssessment.ppeDetails || [],
      emergencyProcedures: riskAssessment.emergencyProcedures || []
    };

    logger.info('Returning validated response', {
      function: 'health-safety-v3',
      hasHazards: validatedRiskAssessment.hazards.length > 0,
      hazardCount: validatedRiskAssessment.hazards.length,
      hasControls: validatedRiskAssessment.controls.length > 0,
      controlsCount: validatedRiskAssessment.controls.length,
      hasPPE: validatedRiskAssessment.ppeDetails.length > 0,
      ppeCount: validatedRiskAssessment.ppeDetails.length,
      hasEmergencyProcs: validatedRiskAssessment.emergencyProcedures.length > 0,
      emergencyProcCount: validatedRiskAssessment.emergencyProcedures.length,
      responseLength: JSON.stringify({ success: true, response: safetyResult.response, structuredData: { riskAssessment: validatedRiskAssessment } }).length
    });

    // Validate we have the minimum required data before returning
    if (!validatedRiskAssessment.hazards || validatedRiskAssessment.hazards.length === 0) {
      logger.warn('No hazards generated, adding fallback hazards');
      validatedRiskAssessment.hazards = [
        {
          hazard: "Electrical work hazards",
          risk: "Various electrical risks per BS 7671",
          likelihood: 3,
          severity: 4,
          riskRating: 12,
          controls: "Follow BS 7671 requirements; Use appropriate PPE; Competent person supervision",
          residualRisk: 6
        }
      ];
    }

    if (!validatedRiskAssessment.ppeDetails || validatedRiskAssessment.ppeDetails.length === 0) {
      logger.warn('⚠️ No PPE in AI response, using context-aware fallback');
      
      // Analyze job description for context clues
      const jobLower = (query + ' ' + workType + ' ' + location).toLowerCase();
      const hasHeight = jobLower.includes('height') || jobLower.includes('ladder') || jobLower.includes('mewp') || 
                        jobLower.includes('scaffold') || jobLower.includes('roof') || jobLower.includes('elevated');
      const hasNoise = jobLower.includes('drilling') || jobLower.includes('cutting') || jobLower.includes('grinding') || 
                       jobLower.includes('noisy') || jobLower.includes('power tool');
      const hasChemicals = jobLower.includes('asbestos') || jobLower.includes('dust') || jobLower.includes('fumes') || 
                          jobLower.includes('confined space') || jobLower.includes('chemical');
      const hasLiveWork = jobLower.includes('live') || jobLower.includes('energised') || jobLower.includes('switching') || 
                         jobLower.includes('isolation');
      const is3Phase = jobLower.includes('3-phase') || jobLower.includes('three phase') || jobLower.includes('distribution') || 
                       jobLower.includes('switchgear') || jobLower.includes('high voltage');
      const isOutdoor = jobLower.includes('outdoor') || jobLower.includes('outside') || jobLower.includes('external') || 
                       jobLower.includes('site');
      const hasConfinedSpace = jobLower.includes('confined') || jobLower.includes('void') || jobLower.includes('tank') || 
                              jobLower.includes('manhole');
      
      logger.info(`🔍 Job context analysis: height=${hasHeight}, noise=${hasNoise}, chemicals=${hasChemicals}, live=${hasLiveWork}, 3phase=${is3Phase}, outdoor=${isOutdoor}, confined=${hasConfinedSpace}`);
      
      // Build context-specific PPE list
      validatedRiskAssessment.ppeDetails = [
        {
          itemNumber: 1,
          ppeType: hasHeight ? "Safety helmet with chin strap" : "Safety helmet",
          standard: "BS EN 397",
          mandatory: true,
          purpose: hasHeight 
            ? "Mandatory head protection when working at height to prevent head injuries from falling objects and impacts" 
            : "Protection against head injuries from falling objects, impact with fixed objects, and overhead hazards"
        },
        {
          itemNumber: 2,
          ppeType: "Safety boots",
          standard: "BS EN ISO 20345 S3",
          mandatory: true,
          purpose: "Protection against electrical hazards, crushing injuries, penetration from sharp objects, and slip resistance"
        },
        {
          itemNumber: 3,
          ppeType: "Safety glasses",
          standard: "BS EN 166",
          mandatory: true,
          purpose: "Eye protection against debris, dust particles, and arc flash during electrical work"
        }
      ];

      let itemNum = 4;

      // Add context-specific PPE based on job type
      if (hasLiveWork || is3Phase) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Insulated gloves",
          standard: is3Phase ? "BS EN 60903 Class 00/0" : "BS EN 60903 Class 0",
          mandatory: true,
          purpose: is3Phase 
            ? "Mandatory protection against electrical shock from live conductors - rated for voltages up to 1000V AC" 
            : "Protection against electrical shock from live conductors up to 500V AC"
        });
      }

      if (is3Phase) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Arc-rated protective clothing",
          standard: "IEC 61482-2 Class 1",
          mandatory: true,
          purpose: "Mandatory protection against arc flash hazards when working on 3-phase distribution equipment or switchgear"
        });
      }

      if (hasHeight) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Fall arrest harness with shock absorbing lanyard",
          standard: "BS EN 361 / BS EN 355",
          mandatory: true,
          purpose: "Mandatory fall protection when working at height above 2 metres using MEWP, scaffold, or near unprotected edges (Work at Height Regulations 2005)"
        });
        
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Tool lanyard",
          standard: "BS 8437",
          mandatory: true,
          purpose: "Prevention of dropped tools and objects when working at height - protects workers below"
        });
      }

      if (isOutdoor && hasHeight) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "High-visibility vest or jacket",
          standard: "EN ISO 20471 Class 2/3",
          mandatory: true,
          purpose: "Mandatory high-visibility clothing for outdoor site work to ensure visibility to plant operators and traffic"
        });
      }

      if (hasNoise) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Hearing protection (ear defenders or plugs)",
          standard: "BS EN 352-2 / BS EN 352-1",
          mandatory: false,
          purpose: "Recommended protection against noise when using power tools for extended periods (>2 hours continuous use or >85dB exposure)"
        });
      }

      if (hasChemicals || hasConfinedSpace) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: hasConfinedSpace ? "Respiratory protective equipment (BA set or FFP3 mask)" : "Respiratory protective equipment (FFP3 mask)",
          standard: hasConfinedSpace ? "BS EN 137 / BS EN 149 FFP3" : "BS EN 149 FFP3",
          mandatory: true,
          purpose: hasConfinedSpace 
            ? "Mandatory breathing apparatus for confined space entry where oxygen levels may be <19.5% or contaminants present" 
            : "Essential protection against asbestos fibres, harmful dust, or chemical fumes"
        });
      }

      if (hasConfinedSpace) {
        validatedRiskAssessment.ppeDetails.push({
          itemNumber: itemNum++,
          ppeType: "Multi-gas detector",
          standard: "BS EN 60079-29-1",
          mandatory: true,
          purpose: "Mandatory gas monitoring for oxygen, flammable gases, CO, and H2S before and during confined space entry"
        });
      }

      logger.info(`✅ Generated ${validatedRiskAssessment.ppeDetails.length} context-specific PPE items`);
    }

    if (!validatedRiskAssessment.emergencyProcedures || validatedRiskAssessment.emergencyProcedures.length === 0) {
      logger.warn('No emergency procedures specified, adding standard procedures');
      validatedRiskAssessment.emergencyProcedures = [
        "Isolate power supply in emergency",
        "Call 999 for electric shock incidents",
        "Ensure first aider location is known"
      ];
    }

    logger.info('Final validation complete', {
      hazardCount: validatedRiskAssessment.hazards.length,
      controlsCount: validatedRiskAssessment.controls.length,
      ppeCount: validatedRiskAssessment.ppeDetails.length,
      emergencyProcCount: validatedRiskAssessment.emergencyProcedures.length,
      hasAllRequiredData: true
    });

    // Return enriched response
    return new Response(
      JSON.stringify({
        success: true,
        response: safetyResult.response,
        enrichment: safetyResult.enrichment || {},
        citations: safetyResult.citations || [],
        rendering: safetyResult.rendering || {},
        structuredData: { 
          riskAssessment: validatedRiskAssessment, 
          methodStatement, 
          compliance,
          ragPreview
        },
        suggestedNextAgents: suggestNextAgents(
          'health-safety',
          query,
          safetyResult.response,
          (previousAgentOutputs || []).map((o: any) => o.agent)
        ).map((s: any) => ({
          ...s,
          contextHint: generateContextHint(s.agent, 'health-safety', { riskAssessment, methodStatement, compliance })
        }))
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    logger.error('Health & Safety V3 error', { error: error instanceof Error ? error.message : String(error) });
    return handleError(error);
  }
});

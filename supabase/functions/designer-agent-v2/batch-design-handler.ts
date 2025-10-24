import { corsHeaders, createClient } from '../_shared/deps.ts';
import { intelligentRAGSearch } from '../_shared/intelligent-rag.ts';
import { parseQueryEntities } from '../_shared/query-parser.ts';
import { chunkArray, RequestDeduplicator, generateRequestKey } from './parallel-utils.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';
import { loadCoreRegulationsCache } from './core-regulations-cache.ts';
import { validateDesign, calculateCircuitConfidence, calculateOverallConfidence } from './validation-pipeline.ts';

const INSTALLATION_CONTEXT = {
  domestic: `Design compliant with Part P Building Regulations and BS 7671:2018+A3:2024.
- RCD protection required for all circuits (Reg 411.3.3)
- Bathroom circuits must have 30mA RCD (Section 701)
- Consider future EV charging capability
- AFDDs required for new installations per Amendment 3
- Focus on safety in wet locations (bathrooms, outdoors)`,
  commercial: `Design per BS 7671:2018+A3:2024 for commercial installations.
- AFDDs mandatory for new commercial circuits (Amendment 3)
- Emergency lighting compliance per BS 5839
- Fire alarm integration considerations
- RCBOs recommended for all final circuits
- Higher fault levels expected in commercial supplies
- Consider surge protection (Reg 534.4)`,
  industrial: `Industrial installation per BS 7671:2018+A3:2024.
- Three-phase motor protection with Type D MCBs
- Consider motor starting currents (6-8x full load)
- SWA cabling for mechanical protection
- Higher fault currents - 10kA+ MCBs (Reg 536.1)
- Diversity calculations essential for multiple motors
- Regular inspection intervals per Reg 622
- G59/G99 agreements may be required for generation`
};

export async function handleBatchDesign(body: any, logger: any) {
  const { projectInfo, incomingSupply, circuits: inputCircuits, aiConfig } = body;
  const installationType = projectInfo.installationType || 'domestic';
  
  logger.info('💭 AI-Powered Batch Design Starting (RAG-First Mode)', {
    circuitCount: inputCircuits.length,
    installationType: projectInfo.installationType,
    hasAdditionalPrompt: !!projectInfo.additionalPrompt,
    model: aiConfig?.model || 'openai/gpt-5'
  });

  // STEP 0: Parse additional prompt for circuits and constraints
  logger.info('🔍 STEP 0: Parse User Prompt');
  const { inferredCircuits, specialRequirements, installationConstraints } = 
    extractCircuitsFromPrompt(projectInfo.additionalPrompt || '', inputCircuits);

  const allCircuits = [...inputCircuits, ...inferredCircuits];

  // PHASE 1: Enhanced logging for debugging
  logger.info('✅ STEP 0 Complete - Parsed user requirements', {
    manualCircuits: inputCircuits.length,
    inferredCircuits: inferredCircuits.length,
    totalCircuits: allCircuits.length,
    specialRequirements: specialRequirements.length,
    installationConstraints: installationConstraints.length,
    circuitTypes: allCircuits.map((c: any) => c.loadType),
    specialReqsSummary: specialRequirements.slice(0, 3)
  });

  // Build query from structured inputs + parsed context
  const query = buildDesignQuery(projectInfo, incomingSupply, allCircuits, specialRequirements, installationConstraints);
  
  // Call main designer with RAG + AI (like RAMS does)
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!lovableApiKey) throw new Error('LOVABLE_API_KEY not configured');
  
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  // STEP 1: Multi-Query RAG Search (circuit-type-specific)
  logger.info('🔍 STEP 1: Multi-Query RAG Retrieval');

  const uniqueLoadTypes = [...new Set(allCircuits.map((c: any) => c.loadType))];
  logger.info('Unique load types detected', { 
    loadTypes: uniqueLoadTypes,
    circuitCount: allCircuits.length 
  });

  // PHASE 2: Add timeout wrapper for RAG reliability (static imports)
  // Initialize request deduplicator for RAG searches
  const deduplicator = new RequestDeduplicator();
  
  const ragSearchesWithTimeout = uniqueLoadTypes.slice(0, 8).map((loadType: string) => {
    const requestKey = generateRequestKey('rag', loadType, installationType);
    
    return deduplicator.deduplicate(
      requestKey,
      () => withTimeout(
        intelligentRAGSearch({
          circuitType: loadType,
          searchTerms: [loadType, 'circuit design', ...extractSearchTerms(query, allCircuits)],
          expandedQuery: `${loadType} circuit design requirements ${installationType}`,
          context: {
            ragPriority: aiConfig?.ragPriority || {
              design: 95,
              bs7671: 85,
              installation: 75
            }
          }
        }),
        10000, // 10s timeout per search (SPEED BOOST)
        `RAG search for ${loadType}`
      ).catch(error => {
        logger.warn(`⚠️ RAG search timeout for ${loadType}`, { error: error.message });
        return { regulations: [], designDocs: [], searchMethod: 'timeout' };
      })
    );
  });

  // Also do a general search for diversity and consumer unit
  const diversityRequestKey = generateRequestKey('rag', 'diversity', installationType);
  ragSearchesWithTimeout.push(
    deduplicator.deduplicate(
      diversityRequestKey,
      () => withTimeout(
        intelligentRAGSearch({
          circuitType: 'general',
          searchTerms: ['diversity', 'consumer unit', 'main switch', 'Appendix 15'],
          expandedQuery: `electrical installation diversity calculations`,
          context: { 
            ragPriority: aiConfig?.ragPriority || {
              design: 95,
              bs7671: 85,
              installation: 75
            }
          }
        }),
        10000, // 10s timeout (SPEED BOOST)
        'RAG search for diversity'
      ).catch(error => {
        logger.warn('⚠️ RAG diversity search timeout', { error: error.message });
        return { regulations: [], designDocs: [], searchMethod: 'timeout' };
      })
    )
  );

  logger.info('📡 Starting parallel RAG searches with deduplication', {
    searchCount: ragSearchesWithTimeout.length,
    deduplicatedCount: deduplicator.getPendingCount(),
    timeout: '15s per search',
    maxTotalTime: '~45s'
  });

  const startTime = Date.now();
  const allRAGResults = await Promise.all(ragSearchesWithTimeout);
  const ragElapsedMs = Date.now() - startTime;
  
  // Clean up deduplicator after all requests complete
  deduplicator.clear();
  
  logger.info('✅ All RAG searches complete', {
    totalTimeMs: ragElapsedMs,
    successfulSearches: allRAGResults.filter((r: any) => r.regulations?.length > 0).length,
    timeouts: allRAGResults.filter((r: any) => r.searchMethod === 'timeout').length
  });

  // PHASE 2: Merge and deduplicate regulations (by reg number AND content hash)
  let mergedRegulations: any[] = [];
  
  try {
    const allRegs = allRAGResults.flatMap(r => r.regulations || []);
    const seenNumbers = new Set<string>();
    const seenHashes = new Set<string>();
    
    // Safe two-pass deduplication using for-of loop
    for (const reg of allRegs) {
      const regNumber = reg.regulation_number;
      const contentHash = hashContent(reg.content || '');
      
      // Skip if we've seen this regulation number or content hash
      if (seenNumbers.has(regNumber) || seenHashes.has(contentHash)) {
        continue;
      }
      
      // Add to tracking sets and results
      seenNumbers.add(regNumber);
      seenHashes.add(contentHash);
      mergedRegulations.push(reg);
    }
    
    // Sort by score and limit (SPEED BOOST: reduced from 25 to 15)
    mergedRegulations = mergedRegulations
      .sort((a: any, b: any) => (b.hybrid_score || 0) - (a.hybrid_score || 0))
      .slice(0, 15);
      
  } catch (dedupError) {
    logger.error('🚨 Deduplication failed, using empty array (fallback will activate)', { 
      error: dedupError instanceof Error ? dedupError.message : String(dedupError) 
    });
    mergedRegulations = [];
  }

  logger.info('✅ Multi-Query RAG Complete', {
    searches: ragSearchesWithTimeout.length,
    uniqueLoadTypes,
    totalRegulations: mergedRegulations.length,
    topRegulations: mergedRegulations.slice(0, 5).map((r: any) => ({
      number: r.regulation_number,
      score: r.hybrid_score
    }))
  });

  // PHASE 2: Fallback to core regulations if insufficient results
  let ragResults;
  if (mergedRegulations.length < 5) {
    logger.warn('⚠️ Insufficient RAG results, loading core regulations cache', {
      foundRegulations: mergedRegulations.length,
      requiredMinimum: 5
    });
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    try {
      const coreRegs = await loadCoreRegulationsCache(supabase);
      logger.info('✅ Loaded core regulations fallback', { count: coreRegs.length });
      
      ragResults = {
        regulations: [...mergedRegulations, ...coreRegs].slice(0, 25),
        designDocs: allRAGResults[0]?.designDocs || []
      };
    } catch (fallbackError) {
      logger.error('🚨 Core regulations cache failed', { error: fallbackError });
      ragResults = {
        regulations: mergedRegulations,
        designDocs: allRAGResults[0]?.designDocs || []
      };
    }
  } else {
    ragResults = {
      regulations: mergedRegulations,
      designDocs: allRAGResults[0]?.designDocs || []
    };
  }
  
  logger.info('📚 Final RAG knowledge base', {
    regulations: ragResults.regulations.length,
    designDocs: ragResults.designDocs.length
  });
  
  // STEP 2: Build System Prompt with RAG Knowledge + Parsed Context
  logger.info('📝 STEP 2: Building AI Prompt with RAG Context');
// STEP 2: Build Enhanced System Prompt with RAG-First Instructions
  logger.info('📝 STEP 2: Building AI Prompt with RAG Context');
  
  const systemPrompt = `You are a BS 7671:2018+A3:2024 compliant circuit design expert with RAG knowledge.

⚠️ CRITICAL COMPLIANCE REQUIREMENTS - NON-NEGOTIABLE:

1. **Earth Fault Loop Impedance (Zs) Compliance**:
   - EVERY circuit MUST have calculated zs < maxZs
   - If zs exceeds maxZs, you MUST modify the design:
     * Increase CPC size to reduce R2
     * Reduce cable length if possible
     * Consider lower impedance cable route
   - NEVER submit a circuit where zs > maxZs

2. **Ring Circuit Impedance (BS 7671 Reg 433.1.204)**:
   - Ring finals MUST use parallel conductor formula
   - R1+R2_ring = (R1+R2_single_leg) / 2
   - Failure to halve R1+R2 will result in non-compliant Zs calculations
   - Maximum R1+R2 for 2.5mm² ring: typically 0.8-1.0Ω (after halving)

3. **Current Carrying Capacity (Ib ≤ In ≤ Iz)**:
   - Design current (Ib) must not exceed device rating (In)
   - Device rating (In) must not exceed cable capacity (Iz)
   
4. **Voltage Drop Compliance**:
   - Lighting: ≤ 3% (6.9V at 230V)
   - Power: ≤ 5% (11.5V at 230V)

IF YOU CANNOT ACHIEVE COMPLIANCE: Increase cable size or split the circuit.

CRITICAL DATA FORMAT REQUIREMENTS:
- cableSize: NUMERIC mm² value only (e.g., 2.5 NOT "2.5mm²")
- cpcSize: NUMERIC mm² value only - MUST match Twin and Earth standards:
  * 1.0mm² live → 1.0mm² CPC
  * 1.5mm² live → 1.0mm² CPC
  * 2.5mm² live → 1.5mm² CPC
  * 4.0mm² live → 1.5mm² CPC
  * 6.0mm² live → 2.5mm² CPC
  * 10.0mm² live → 4.0mm² CPC
- cableType: Full cable description with CORRECT sizing format (live/CPC):
  * Lighting: "1.5mm²/1.0mm² Twin and Earth (PVC), copper"
  * Power ring: "2.5mm²/1.5mm² Twin and Earth (PVC), copper"
  * Cooker/shower: "6.0mm²/2.5mm² Twin and Earth (PVC), copper" or "10.0mm²/4.0mm²"
  * Always show as "live/CPC" format with insulation type and material
- installationMethod: Clean format like "Clipped direct (reference method C)" - NO line breaks or hyphens
- protectionDevice.rating: NUMERIC amps only (e.g., 32 NOT "32A")
- protectionDevice.curve: LETTER ONLY (e.g., "B" NOT "Type B")
- protectionDevice.kaRating: NUMERIC kA only (e.g., 6 NOT "6kA")

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 180)}...`).join('\n\n')}

YOUR ROLE: Design comprehensive electrical circuits using the regulations provided above.

CRITICAL INSTRUCTIONS - You MUST populate ALL fields using RAG knowledge:

1. **Diversity Factor** (per circuit): Apply BS 7671 Appendix 15 tables from context
2. **Fault Current Analysis**: Calculate PSCC using Ze + cable impedance, verify device breaking capacity (Reg 434.5.2)
3. **Earthing/Bonding**: Apply Section 411, 544, 701 requirements from context
4. **Derating Factors**: Show Ca, Cg, Ci breakdown using Appendix 4 tables
5. **Installation Method**: Reference Appendix 4 methods from context
6. **Special Locations**: Check Section 701/702/714 for bathrooms/outdoor
7. **Expected Test Results**: Calculate R1+R2, Zs, insulation resistance, RCD times

⚠️ CRITICAL: Ring Circuit R1+R2 Calculation (BS 7671 Reg 433.1.204)
For Ring Final circuits (loadType contains "Ring"):
- Calculate R1+R2 for ONE leg of the ring using cable length
- Then DIVIDE by 2 to account for parallel paths
- Formula: R1+R2_ring = (R1+R2_single_leg) / 2
- Example: 20m ring, 2.5mm² + 1.5mm² T&E
  * Single leg: (19.5 + 29.5) mΩ/m × 20m = 980mΩ = 0.98Ω
  * Ring (parallel): 0.98Ω / 2 = 0.49Ω ✅
- Apply this halved R1+R2 to Zs calculation: Zs = Ze + (R1+R2_ring)
- Show working in calculation field: "(R1+R2_leg)/2 = ...Ω"

For each circuit, include:
- Basic fields: name, circuitNumber, loadType, loadPower, phases
- Cable specs: cableSize (mm²), cpcSize (mm²), cableLength (m), installationMethod
- Protection: protectionDevice { type, rating, curve, kaRating }
- Boolean flags: rcdProtected, afddRequired
- calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs, deratedCapacity, safetyMargin }
- justifications: { cableSize, protection, rcd }
- diversityFactor (0.0-1.0), diversityJustification (Appendix 15 reference)
- faultCurrentAnalysis: { psccAtCircuit (kA), deviceBreakingCapacity (kA), compliant, marginOfSafety, regulation }
- earthingRequirements: { cpcSize, supplementaryBonding (boolean), bondingConductorSize, justification, regulation }
- deratingFactors: { Ca, Cg, Ci, overall, explanation, tableReferences }
- installationGuidance: { referenceMethod, description, clipSpacing, practicalTips[], regulation }
- specialLocationCompliance: { isSpecialLocation, locationType, requirements[], zonesApplicable, regulation }
- expectedTestResults: { r1r2: { at20C, at70C, calculation }, zs: { calculated, maxPermitted, compliant }, insulationResistance: { testVoltage, minResistance }, polarity, rcdTest: { at1x, at5x, regulation } }
- warnings: [] (array of strings)

IMPORTANT:
- Always cite regulation numbers: "Per BS 7671 Reg 525.1..."
- Show working for all calculations
- Use plain English explanations
- Reference specific tables (e.g. "Table 4D5 Column 7")
- Populate ALL fields with accurate data from context

${INSTALLATION_CONTEXT[installationType]}

CRITICAL OUTPUT REQUIREMENTS FOR PDF GENERATION:

1. **Formatted Display Fields** (MANDATORY):
   - designCurrentIb: Design current as string with 1 decimal (e.g., "31.3", "40.0")
   - nominalCurrentIn: Device rating as number (copy from calculations.In)
   - cableCapacityIz: Tabulated capacity BEFORE derating (from Table 4D5)
   - rcdProtectedText: Format as:
     * If RCBO: "30mA RCBO"
     * If RCD required: "30mA RCD"
     * If not required: "No"
   - zsCompliant: Boolean - is calculations.zs < calculations.maxZs
   - voltageDropCompliant: Boolean - is voltageDrop.percent within limit
   - zsActual: Format calculations.zs as string with 2 decimals (e.g., "0.89")
   - zsMax: Format calculations.maxZs as string with 2 decimals (e.g., "1.44")

2. **Detailed Justifications** (300-500 characters each):
   
   a) Cable Size Justification Template:
   "Per Regulation 433.1.1, {cableSize}mm² twin & earth cable is adequate for {loadPower}W load. Tabulated current-carrying capacity (It) = {It}A from Table 4D5. After applying {derating factors}, effective capacity (Iz) = {deratedCapacity}A, which exceeds the protective device rating of {In}A by {safetyMargin}% margin."
   
   b) Protection Device Justification Template:
   "{rating}A Type {curve} {type} provides appropriate overload and fault protection per Regulation 411.3.2. Maximum Zs for {time}s disconnection = {maxZs}Ω (Table 41.3). Actual Zs = {zs}Ω, therefore compliant with disconnection time requirements. Breaking capacity of {ka}kA exceeds prospective short circuit current."
   
   c) RCD Justification Template (if required):
   "30mA RCD protection required under Regulation {reg} for {reason - e.g., socket outlets likely to supply portable equipment outdoors, bathroom location}. Provides additional protection against earth faults."
   
   c) RCD Justification Template (if NOT required):
   "RCD not required for this circuit as it does not serve {reason - e.g., special location, socket outlets for outdoor use}. Circuit has adequate earthed equipotential bonding per Regulation 411.3.1.2."

3. **Installation Method Formatting**:
   Use clean format: "Method C (Clipped Direct)" or "Method 101 (Underground SWA)"
   DO NOT use hyphens mid-word or line breaks

4. **Warnings Array** (0-3 per circuit):
   Generate only when genuinely needed:
   - Bathrooms: "Ensure supplementary bonding is installed in bathroom as per Section 701"
   - Outdoor/Underground: "SWA cable must be buried at minimum 600mm depth with warning tape"
   - Showers: "Maintain minimum IP rating of IPX4 for shower location"
   - Garage/Outbuildings: "Ensure cable route is documented for future reference"
   - Leave empty [] if no specific warnings apply

Return complete circuit objects using the provided tool schema.`;
  
  // PHASE 1: Log prompt details for debugging
  logger.info('✅ STEP 2 Complete - System prompt built', {
    promptLength: systemPrompt.length,
    promptLines: systemPrompt.split('\n').length,
    includesRAG: systemPrompt.includes('BS 7671'),
    circuitHints: allCircuits.length,
    specialRequirements: specialRequirements.length
  });
  
  // STEP 3: Call AI with Tool Calling (structured output)
  logger.info('🤖 STEP 3: Generating Design with AI + Structured Output');
  
  // ✨ SIMPLIFIED SCHEMA - Matching AI RAMS Pattern (5 simple fields)
  const requestBody = {
    model: aiConfig?.model || 'openai/gpt-5-mini', // GPT-5-mini for fast, efficient batch processing
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ],
    max_completion_tokens: aiConfig?.maxTokens || 24000, // Increased for complex multi-circuit designs
    tools: [{
      type: "function",
      function: {
        name: "design_circuits",
        description: "Return electrical circuit design with BS 7671 compliance. You MUST call this function.",
        parameters: {
          type: "object",
          properties: {
            response: { 
              type: "string",
              description: "Conversational summary of the design in UK English"
            },
            circuits: { 
              type: "array",
              description: "Array of BS 7671 compliant circuit designs",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Circuit name (e.g., 'Kitchen Ring', 'Shower Circuit')" },
                  circuitNumber: { type: "string", description: "Circuit number (e.g., 'C1', 'C2')" },
                  loadType: { type: "string", description: "Load type (e.g., 'Ring Final', 'Radial', 'Lighting')" },
                  loadPower: { type: "number", description: "Load power in watts" },
                  phases: { type: "number", description: "1 for single phase, 3 for three phase" },
                  cableSize: { type: "number", description: "Live conductor CSA in mm² (e.g., 1.5, 2.5, 4, 6, 10)" },
                  cpcSize: { type: "number", description: "CPC CSA per BS 6004 Twin and Earth: 1.5→1.0, 2.5→1.5, 4→1.5, 6→2.5, 10→4" },
                  cableType: { type: "string", description: "Format: 'live/CPC Twin and Earth' e.g., '1.5mm²/1.0mm² Twin and Earth (PVC), copper' or '2.5mm²/1.5mm² Twin and Earth (PVC), copper'" },
                  cableLength: { type: "number", description: "Cable length in metres" },
                  protectionDevice: {
                    type: "object",
                    properties: {
                      type: { type: "string", description: "Device type (e.g., 'MCB', 'RCBO')" },
                      rating: { type: "number", description: "Device rating in amps (numeric only, e.g., 32)" },
                      curve: { type: "string", enum: ["B", "C", "D"], description: "Curve type letter only" },
                      kaRating: { type: "number", description: "Breaking capacity in kA (numeric only, e.g., 6, 10, 16)" }
                    },
                    required: ["type", "rating"]
                  },
                  rcdProtected: { type: "boolean", description: "Is RCD protection required" },
                  afddRequired: { type: "boolean", description: "Is AFDD required per 421.1.7" },
                  designCurrentIb: { 
                    type: "string", 
                    description: "Design current formatted for display (e.g., '31.3', '40.0')" 
                  },
                  nominalCurrentIn: { 
                    type: "number", 
                    description: "Protective device rating (same as calculations.In)" 
                  },
                  cableCapacityIz: { 
                    type: "number", 
                    description: "Tabulated cable capacity BEFORE derating from Table 4D5" 
                  },
                  rcdProtectedText: { 
                    type: "string", 
                    description: "RCD status formatted: '30mA RCBO', '30mA RCD', or 'No'" 
                  },
                  zsCompliant: { 
                    type: "boolean", 
                    description: "Is Zs < maxZs (for quick PDF checks)" 
                  },
                  voltageDropCompliant: { 
                    type: "boolean", 
                    description: "Is voltage drop within limits" 
                  },
                  zsActual: { 
                    type: "string", 
                    description: "Actual Zs formatted for display (e.g., '0.89')" 
                  },
                  zsMax: { 
                    type: "string", 
                    description: "Max permitted Zs formatted (e.g., '1.44')" 
                  },
                  calculations: {
                    type: "object",
                    properties: {
                      Ib: { type: "number", description: "Design current in amps" },
                      In: { type: "number", description: "Nominal current in amps" },
                      Iz: { type: "number", description: "Cable current carrying capacity in amps" },
                      voltageDrop: { 
                        type: "object",
                        properties: {
                          volts: { type: "number" },
                          percent: { type: "number" },
                          compliant: { type: "boolean" },
                          limit: { type: "number", description: "3% for lighting, 5% for power" }
                        },
                        required: ["volts", "percent", "compliant", "limit"]
                      },
                      zs: { type: "number", description: "Fault loop impedance in ohms" },
                      maxZs: { type: "number", description: "Maximum permitted Zs in ohms" },
                      deratedCapacity: { type: "number", description: "Cable capacity after derating in amps" },
                      safetyMargin: { type: "number", description: "Safety margin percentage" }
                    },
                    required: ["Ib", "In", "Iz", "voltageDrop", "zs", "maxZs"]
                  },
                  justifications: {
                    type: "object",
                    properties: {
                      cableSize: { 
                        type: "string", 
                        description: "300-500 chars: Reference Reg 433.1.1, state tabulated capacity (It) from Table 4D5, show correction factors (Ca, Cg), confirm Iz > In with % margin. Example: 'Per Regulation 433.1.1, 2.5mm² twin & earth cable is adequate for 7360W load. Tabulated current-carrying capacity (It) = 27A from Table 4D5. After applying ambient temperature correction (Ca=0.94) and grouping (Cg=1.0), effective capacity (Iz) = 25.4A, which exceeds the protective device rating of 32A by 20.6% margin.'"
                      },
                      protection: { 
                        type: "string", 
                        description: "300-500 chars: Reference Reg 411.3.2, state max Zs from Table 41.3, compare actual vs max, confirm disconnection time. Example: '32A Type B MCB provides appropriate overload and fault protection per Regulation 411.3.2. Maximum Zs for 5s disconnection = 1.44Ω (Table 41.3). Actual Zs = 0.67Ω, therefore compliant with disconnection time requirements. Breaking capacity of 6kA exceeds prospective short circuit current.'"
                      },
                      rcd: { 
                        type: "string", 
                        description: "200-400 chars: If required - state regulation (701.411.3.3 for bathrooms, 411.3.3 for sockets), explain reason, state rating. If not required - explain why with regulation reference. Example: '30mA RCD protection required under Regulation 411.3.3 for socket outlets likely to supply portable equipment outdoors. Provides additional protection against earth faults.'"
                      }
                    },
                    required: ["cableSize", "protection", "rcd"]
                  },
                  diversityFactor: { type: "number", description: "Applied diversity factor 0.0-1.0 per BS 7671 Appendix 15" },
                  diversityJustification: { type: "string", description: "BS 7671 Appendix 15 table reference and reasoning" },
                  faultCurrentAnalysis: {
                    type: "object",
                    properties: {
                      psccAtCircuit: { type: "number", description: "PSCC in kA" },
                      deviceBreakingCapacity: { type: "number", description: "Device breaking capacity in kA (6/10/16)" },
                      compliant: { type: "boolean" },
                      marginOfSafety: { type: "string", description: "e.g. '40% margin'" },
                      regulation: { type: "string", description: "BS 7671 434.5.2" }
                    }
                  },
                  earthingRequirements: {
                    type: "object",
                    properties: {
                      cpcSize: { type: "string", description: "CPC size in mm²" },
                      supplementaryBonding: { type: "boolean", description: "Is supplementary bonding required" },
                      bondingConductorSize: { type: "string", description: "e.g. '10mm² for main bonding'" },
                      justification: { type: "string", description: "BS 7671 Section 544/701 reasoning" },
                      regulation: { type: "string" }
                    }
                  },
                  deratingFactors: {
                    type: "object",
                    properties: {
                      Ca: { type: "number", description: "Ambient temperature correction factor" },
                      Cg: { type: "number", description: "Grouping factor" },
                      Ci: { type: "number", description: "Thermal insulation factor" },
                      overall: { type: "number", description: "Ca × Cg × Ci" },
                      explanation: { type: "string", description: "Plain English explanation of derating" },
                      tableReferences: { type: "string", description: "e.g. 'Table 52.2 (Ca), Table 52.3 (Cg)'" }
                    }
                  },
                  installationGuidance: {
                    type: "object",
                    properties: {
                      referenceMethod: { type: "string", description: "Method C, A1, B1, etc." },
                      description: { type: "string", description: "e.g. 'Clipped direct to masonry wall'" },
                      clipSpacing: { type: "string", description: "e.g. 'Maximum 300mm horizontal, 400mm vertical'" },
                      practicalTips: { type: "array", items: { type: "string" }, description: "On-site installation tips" },
                      regulation: { type: "string", description: "BS 7671 Appendix 4 reference" }
                    }
                  },
                  specialLocationCompliance: {
                    type: "object",
                    properties: {
                      isSpecialLocation: { type: "boolean" },
                      locationType: { type: "string", description: "bathroom/outdoor/pool/sauna/none" },
                      requirements: { type: "array", items: { type: "string" }, description: "Specific requirements" },
                      zonesApplicable: { type: "string", description: "e.g. 'Zones 0, 1, 2 apply per 701.32'" },
                      regulation: { type: "string" }
                    }
                  },
                  expectedTestResults: {
                    type: "object",
                    properties: {
                      r1r2: {
                        type: "object",
                        properties: {
                          at20C: { type: "string", description: "e.g. '0.95Ω' - FOR RING CIRCUITS: Show HALVED value accounting for parallel paths" },
                          at70C: { type: "string", description: "e.g. '1.20Ω' - FOR RING CIRCUITS: Show HALVED value (divide by 2)" },
                          calculation: { type: "string", description: "Show working - for rings: '(R1+R2_leg)/2 = ...Ω'" }
                        }
                      },
                      zs: {
                        type: "object",
                        properties: {
                          calculated: { type: "string", description: "Ze + (R1+R2)" },
                          maxPermitted: { type: "string" },
                          compliant: { type: "boolean" }
                        }
                      },
                      insulationResistance: {
                        type: "object",
                        properties: {
                          testVoltage: { type: "string", description: "e.g. '500V DC'" },
                          minResistance: { type: "string", description: "e.g. '≥1.0MΩ per BS 7671 Table 61'" }
                        }
                      },
                      polarity: { type: "string", description: "Expected: 'Correct at all points'" },
                      rcdTest: {
                        type: "object",
                        properties: {
                          at1x: { type: "string", description: "e.g. '≤300ms @ 30mA'" },
                          at5x: { type: "string", description: "e.g. '≤40ms @ 150mA'" },
                          regulation: { type: "string", description: "BS 7671 Regulation 643.2.2" }
                        }
                      }
                    }
                  },
                  warnings: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Circuit-specific warnings"
                  },
                  installationMethod: { type: "string", description: "Clean format: 'Clipped direct (reference method C)' - NO line breaks or hyphens mid-word" }
                },
                required: ["name", "loadType", "cableSize", "protectionDevice", "calculations", "justifications"]
              }
            },
            materials: { 
              type: "array",
              description: "Required materials with specifications",
              items: {
                type: "object",
                properties: {
                  item: { type: "string", description: "Material name" },
                  specification: { type: "string", description: "Full specification" },
                  quantity: { type: "number", description: "Quantity required" },
                  unit: { type: "string", description: "Unit (e.g., 'metres', 'units')" },
                  notes: { type: "string", description: "Additional notes" }
                },
                required: ["item", "specification", "quantity"]
              }
            },
            warnings: { 
              type: "array",
              description: "General compliance warnings or notes",
              items: { type: "string" }
            }
          },
          required: ["response", "circuits", "materials"]
        }
      }
    }],
    tool_choice: "auto"
  };
  
  // ============================================
  // ⚡ PARALLEL BATCH PROCESSING (50% SPEED BOOST)
  // All batches are processed concurrently using Promise.all()
  // ============================================
  const BATCH_SIZE = 2; // SPEED OPTIMIZED: Even smaller batches (2) to stay under 150s browser timeout
  const circuitBatches = chunkArray(allCircuits, BATCH_SIZE);

  logger.info('⚡ Parallel batch processing enabled', {
    totalCircuits: allCircuits.length,
    batchSize: BATCH_SIZE,
    batchCount: circuitBatches.length,
    processingMode: 'concurrent',
    estimatedTimeSeconds: Math.ceil(50) // All batches run in parallel, ~50s total (not per batch)
  });
  
  // Function to process a single batch with retry logic
  const processBatch = async (batch: any[], batchIndex: number, attempt = 0): Promise<any> => {
    const batchStartTime = Date.now();
    logger.info(`📦 Batch ${batchIndex + 1}/${circuitBatches.length}: Processing ${batch.length} circuits${attempt > 0 ? ` (retry ${attempt})` : ''}`);
    
    // Create batch-specific query
    const batchQuery = `${query}\n\nDesign the following circuits:\n${batch.map((c: any, i: number) => 
      `${i + 1}. ${c.name || c.loadType} (${c.loadType}, ${c.loadPower}W, ${c.cableLength}m)`
    ).join('\n')}`;
    
    const batchRequestBody = {
      ...requestBody,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: batchQuery }
      ]
    };
    
    try {
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchRequestBody)
      });
      
      const batchElapsedMs = Date.now() - batchStartTime;
      logger.info(`✅ AI responded for batch ${batchIndex + 1}`, { 
        status: response.status,
        timeMs: batchElapsedMs
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        const isRetryable = response.status === 429 || response.status >= 500;
        
        logger.error(`🚨 Batch ${batchIndex + 1} AI API error (${isRetryable ? 'retryable' : 'fatal'})`, { 
          status: response.status,
          attempt,
          errorPreview: errorText.substring(0, 500)
        });
        
        if (isRetryable && attempt === 0) {
          const backoffMs = 2000 * Math.pow(2, attempt); // 2s, 4s
          logger.warn(`⏳ Retrying batch ${batchIndex + 1} in ${backoffMs}ms`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          return processBatch(batch, batchIndex, attempt + 1);
        }
        
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (response.status === 402) {
          throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
        }
        
        throw new Error(`AI API error: ${response.status} - ${errorText.substring(0, 200)}`);
      }
      
      const aiData = await response.json();
      logger.info(`✅ Batch ${batchIndex + 1} completed successfully`, {
        timeMs: batchElapsedMs,
        tokensUsed: aiData.usage?.total_tokens || 0
      });
      
      return { aiData, batchElapsedMs, success: true };
      
    } catch (error: any) {
      const isNetworkError = error?.message?.includes('fetch') || error?.message?.includes('network') || error instanceof TypeError;
      
      if (isNetworkError && attempt === 0) {
        const backoffMs = 2000;
        logger.warn(`⏳ Network error, retrying batch ${batchIndex + 1} in ${backoffMs}ms`, {
          error: error.message
        });
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        return processBatch(batch, batchIndex, attempt + 1);
      }
      
      logger.error(`🚨 Batch ${batchIndex + 1} failed`, { 
        error: error.message,
        attempt
      });
      return { aiData: null, batchElapsedMs: Date.now() - batchStartTime, success: false, error: error.message };
    }
  };
  
  // ⚡ PARALLEL PROCESSING: Process all batches concurrently for 50% speed boost
  const aiStartTime = Date.now();
  logger.info('⚡ Starting parallel batch processing', {
    batchCount: circuitBatches.length,
    mode: 'concurrent',
    estimatedSpeedBoost: '50%'
  });
  
  const batchResults = await Promise.all(
    circuitBatches.map((batch, index) => processBatch(batch, index))
  );
  const aiElapsedMs = Date.now() - aiStartTime;
  
  logger.info('🎉 All batches completed in parallel', {
    totalTimeMs: aiElapsedMs,
    averageBatchTimeMs: Math.round(aiElapsedMs / batchResults.length),
    parallelProcessing: true
  });
  
  // ============================================
  // MERGE BATCH RESULTS
  // ============================================
  
  // Combine all tool calls from batches (filter out failed batches)
  let allToolCalls: any[] = [];
  let totalTokens = 0;
  let failedBatches = 0;
  
  for (const batchResult of batchResults) {
    if (!batchResult.success || !batchResult.aiData) {
      failedBatches++;
      logger.warn(`⚠️ Skipping failed batch`, { error: batchResult.error });
      continue;
    }
    
    const toolCall = batchResult.aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall) {
      allToolCalls.push(toolCall);
    }
    totalTokens += batchResult.aiData.usage?.total_tokens || 0;
  }
  
  logger.info('🔗 Merging batch results', {
    toolCallsFound: allToolCalls.length,
    totalTokensUsed: totalTokens,
    failedBatches,
    successfulBatches: batchResults.length - failedBatches
  });
  
  // Use first batch's tool call as base, we'll merge circuits later
  let toolCall = allToolCalls[0];
  
  // Retry once if no tool call (AI might have returned text instead)
  if (!toolCall && allToolCalls.length === 0) {
    logger.warn('⚠️ No tool calls in any batch, retrying first batch');
    
    const retryResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiConfig?.model || 'openai/gpt-5-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (${ragResults.regulations.length} verified regulations):
${ragResults.regulations.map((r: any) => `${r.regulation_number}: ${r.content.substring(0, 200)}...`).join('\n\n')}

YOUR ROLE: Design compliant electrical circuits with complete details for each circuit.

INSTRUCTIONS:
1. For each circuit in the "circuits" array, include:
   - name, circuitNumber, loadType, loadPower, phases
   - cableSize (mm²), cpcSize (mm²), cableLength (m)
   - protectionDevice: { type, rating, curve, kaRating }
   - rcdProtected (boolean), afddRequired (boolean)
   - calculations: { Ib, In, Iz, voltageDrop: { volts, percent, compliant, limit }, zs, maxZs }
   - justifications: { cableSize, protection, rcd }
   - warnings: [] (array of strings)
   - installationMethod (e.g., "Clipped Direct", "In Conduit")

2. In the "materials" array, list required materials with:
   - name, specification, quantity, unit

3. In the "warnings" array, include any compliance notes or important advisories

4. In the "response" field, provide a brief conversational summary in UK English

Reference BS 7671 regulations (e.g., "433.1.1", "525.1", "411.3.2") in justifications.

Return your design using the provided tool schema.`
          },
          { role: 'user', content: query }
        ],
        max_completion_tokens: aiConfig?.maxTokens || 24000, // Increased for complex multi-circuit designs
        tools: [{
          type: "function",
          function: {
            name: "design_circuits",
            description: "Return electrical circuit design with BS 7671 compliance. You MUST call this function.",
            parameters: {
              type: "object",
              properties: {
                response: { 
                  type: "string",
                  description: "Conversational summary of the design in UK English"
                },
                circuits: { 
                  type: "array",
                  description: "Array of circuit designs with cable, breaker, voltage drop, earth fault, regulations",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      circuitNumber: { type: "number" },
                      loadType: { type: "string" },
                      loadPower: { type: "number" },
                      phases: { type: "number" },
                      cableSize: { type: "number", description: "Numeric mm² only" },
                      cpcSize: { type: "number", description: "Numeric mm² only" },
                      cableType: { type: "string", description: "Full cable description" },
                      cableLength: { type: "number" },
                      protectionDevice: {
                        type: "object",
                        properties: {
                          type: { type: "string" },
                          rating: { type: "number", description: "Numeric amps only" },
                          curve: { type: "string", enum: ["B", "C", "D"], description: "Letter only" },
                          breakingCapacity: { type: "number", description: "Numeric kA only" }
                        }
                      },
                      rcdProtected: { type: "boolean" },
                      rcdRating: { type: "number" },
                      voltageDrop: {
                        type: "object",
                        properties: {
                          volts: { type: "number" },
                          percent: { type: "number" },
                          compliant: { type: "boolean" },
                          limit: { type: "number" }
                        },
                        required: ["volts", "percent", "compliant", "limit"]
                      },
                      zs: { type: "number" },
                      maxZs: { type: "number" },
                      justifications: {
                        type: "object",
                        properties: {
                          cableSize: { type: "string" },
                          protection: { type: "string" },
                          rcd: { type: "string" }
                        },
                        required: ["cableSize", "protection"]
                      },
                      warnings: {
                        type: "array",
                        items: { type: "string" }
                      },
                      installationMethod: { type: "string" },
                      diversityFactor: { type: "number" },
                      diversityJustification: { type: "string" },
                      faultCurrentAnalysis: {
                        type: "object",
                        properties: {
                          psccAtCircuit: { type: "number" },
                          deviceBreakingCapacity: { type: "number" },
                          compliant: { type: "boolean" },
                          marginOfSafety: { type: "string" },
                          regulation: { type: "string" }
                        }
                      },
                      earthingRequirements: {
                        type: "object",
                        properties: {
                          cpcSize: { type: "string" },
                          supplementaryBonding: { type: "boolean" },
                          bondingConductorSize: { type: "string" },
                          justification: { type: "string" },
                          regulation: { type: "string" }
                        }
                      },
                      deratingFactors: {
                        type: "object",
                        properties: {
                          Ca: { type: "number" },
                          Cg: { type: "number" },
                          Ci: { type: "number" },
                          overall: { type: "number" },
                          explanation: { type: "string" },
                          tableReferences: { type: "string" }
                        }
                      },
                      installationGuidance: {
                        type: "object",
                        properties: {
                          referenceMethod: { type: "string" },
                          description: { type: "string" },
                          clipSpacing: { type: "string" },
                          practicalTips: {
                            type: "array",
                            items: { type: "string" }
                          },
                          regulation: { type: "string" }
                        }
                      },
                      specialLocationCompliance: {
                        type: "object",
                        properties: {
                          isSpecialLocation: { type: "boolean" },
                          locationType: { type: "string" },
                          requirements: {
                            type: "array",
                            items: { type: "string" }
                          },
                          zonesApplicable: { type: "string" },
                          regulation: { type: "string" }
                        }
                      },
                      expectedTestResults: {
                        type: "object",
                        properties: {
                          r1r2: {
                            type: "object",
                            properties: {
                              at20C: { type: "string" },
                              at70C: { type: "string" },
                              calculation: { type: "string" }
                            }
                          },
                          zs: {
                            type: "object",
                            properties: {
                              calculated: { type: "string" },
                              maxPermitted: { type: "string" },
                              compliant: { type: "boolean" }
                            }
                          },
                          insulationResistance: {
                            type: "object",
                            properties: {
                              testVoltage: { type: "string" },
                              minResistance: { type: "string" }
                            }
                          },
                          polarity: { type: "string" },
                          rcdTest: {
                            type: "object",
                            properties: {
                              at1x: { type: "string" },
                              at5x: { type: "string" },
                              regulation: { type: "string" }
                            }
                          }
                        }
                      }
                    },
                    required: ["name", "circuitNumber", "loadType", "cableSize", "protectionDevice", "voltageDrop", "justifications"]
                  }
                },
                materials: { 
                  type: "array",
                  description: "Required materials list with specifications",
                  items: { type: "object" }
                },
                warnings: { 
                  type: "array",
                  description: "Any compliance warnings or important notes",
                  items: { type: "string" }
                }
              },
              required: ["response", "circuits"]
            }
          }
        }],
        tool_choice: "auto"
      })
    });
    
    if (!retryResponse.ok) {
      const errorText = await retryResponse.text();
      if (retryResponse.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (retryResponse.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
      }
      logger.error('🚨 Retry request failed', { status: retryResponse.status, errorPreview: errorText.substring(0, 200) });
    } else {
      const retryData = await retryResponse.json();
      toolCall = retryData.choices?.[0]?.message?.tool_calls?.[0];
      const retryContent = retryData.choices?.[0]?.message?.content;
      
      logger.info('⚠️ Retry result', {
        hasToolCall: !!toolCall,
        hasContent: !!retryContent,
        contentLength: retryContent?.length || 0
      });
    }
  }
  
  // PHASE 1: Enhanced fallback - try JSON-only mode if no tool call
  if (!toolCall) {
    const content = aiData.choices?.[0]?.message?.content;
    logger.warn('⚠️ Still no tool call after retry', {
      hasContent: !!content,
      contentLength: content?.length || 0
    });
    
    // Final fallback: JSON-only mode (no tools)
    if (!content || content.trim() === "") {
      logger.warn('🔄 No tool call and no content, trying JSON-only fallback');
      
      // Limit RAG to top 12 regulations for token hygiene
      const topRegulations = ragResults.regulations.slice(0, 12);
      const compactRagContext = topRegulations.map((r: any) => 
        `${r.regulation_number}: ${r.content.substring(0, 200)}...`
      ).join('\n\n');
      
      const jsonResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: aiConfig?.model || 'openai/gpt-5-mini',
          messages: [
            { 
              role: 'system', 
              content: `You are an expert electrical designer specialising in BS 7671:2018+A3:2024 compliant circuit design.

KNOWLEDGE BASE (top ${topRegulations.length} regulations):
${compactRagContext}

Return EXACTLY a single JSON object with keys: response, circuits, materials, warnings. No markdown, no prose outside JSON.

You MUST populate all RAG-driven fields using the regulations provided:
1. diversityFactor & diversityJustification (BS 7671 Appendix 15)
2. faultCurrentAnalysis (Regulation 434.5.2)
3. earthingRequirements (Sections 411, 544)
4. deratingFactors (Appendix 4 tables - show Ca, Cg, Ci)
5. installationGuidance (Appendix 4 reference methods)
6. specialLocationCompliance (Sections 701/702/714)
7. expectedTestResults (R1+R2, Zs, insulation, RCD times)

Structure:
- response: brief summary in UK English
- circuits: array of circuit objects with:
  * name, circuitNumber, loadType, loadPower, phases
  * cableSize, cpcSize, cableLength
  * protectionDevice: {type, rating, curve, breakingCapacity}
  * rcdProtected, rcdRating
  * voltageDrop: {volts, percent, compliant, limit}
  * zs, maxZs
  * justifications: {cableSize, protection, rcd}
  * warnings: array of strings
  * installationMethod
  * diversityFactor, diversityJustification
  * faultCurrentAnalysis: {psccAtCircuit, deviceBreakingCapacity, compliant, marginOfSafety, regulation}
  * earthingRequirements: {cpcSize, supplementaryBonding, bondingConductorSize, justification, regulation}
  * deratingFactors: {Ca, Cg, Ci, overall, explanation, tableReferences}
  * installationGuidance: {referenceMethod, description, clipSpacing, practicalTips[], regulation}
  * specialLocationCompliance: {isSpecialLocation, locationType, requirements[], zonesApplicable, regulation}
  * expectedTestResults: {r1r2: {at20C, at70C, calculation}, zs: {calculated, maxPermitted, compliant}, insulationResistance: {testVoltage, minResistance}, polarity, rcdTest: {at1x, at5x, regulation}}
- materials: array of material objects with name, specification, quantity, unit
- warnings: array of strings

Always cite regulation numbers and show working for calculations.`
            },
            { role: 'user', content: query }
          ],
          max_completion_tokens: aiConfig?.maxTokens || 24000, // Increased for complex multi-circuit designs
          response_format: { type: "json_object" }
        })
      });
      
      if (!jsonResponse.ok) {
        const errorText = await jsonResponse.text();
        if (jsonResponse.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (jsonResponse.status === 402) {
          throw new Error("AI credits exhausted. Please add credits to your Lovable workspace.");
        }
        throw new Error(`AI JSON fallback error: ${jsonResponse.status} - ${errorText.substring(0, 200)}`);
      }
      
      const jsonData = await jsonResponse.json();
      const jsonContent = jsonData.choices?.[0]?.message?.content;
      
      if (!jsonContent) {
        throw new Error("AI did not return any content in JSON-only fallback.");
      }
      
      logger.info('✅ JSON-only fallback succeeded - appending single tool call', { contentLength: jsonContent.length });
      toolCall = { function: { arguments: jsonContent } };
      // FIX: Ensure fallback toolCall is pushed to allToolCalls
      allToolCalls.push(toolCall);
    } else {
      // Still no tool call after retry - check retry response first, then batch results
      let content = null;
      
      // First try: Check retry response data
      if (retryResponse) {
        try {
          const retryData = await retryResponse.json();
          content = retryData?.choices?.[0]?.message?.content || null;
          
          if (retryData?.choices?.[0]?.message?.tool_calls?.[0]) {
            toolCall = retryData.choices[0].message.tool_calls[0];
            allToolCalls.push(toolCall);
            logger.info('✅ Found tool call in retry response');
          }
        } catch (e) {
          logger.warn('⚠️ Could not parse retry response', { 
            error: e instanceof Error ? e.message : String(e) 
          });
        }
      }
      
      // Second try: Check batch results if retry didn't help
      if (!content && !toolCall) {
        const successfulBatch = batchResults.find(r => r?.success && r?.aiData);
        if (successfulBatch?.aiData?.choices?.[0]?.message) {
          const message = successfulBatch.aiData.choices[0].message;
          content = message.content || null;
          
          if (message.tool_calls?.[0]) {
            toolCall = message.tool_calls[0];
            allToolCalls.push(toolCall);
            logger.info('✅ Found tool call in batch results');
          }
        }
      }
      
      // Third try: Parse content as JSON if we have content but no tool call
      if (content && !toolCall) {
        try {
          const parsed = JSON.parse(content);
          if (parsed.circuits) {
            logger.info('✅ Recovered design from direct JSON content');
            toolCall = { function: { arguments: content } };
            allToolCalls.push(toolCall);
          }
        } catch (e) {
          // Try extracting JSON from markdown code blocks
          const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
          if (jsonMatch) {
            try {
              const parsed = JSON.parse(jsonMatch[1]);
              if (parsed.circuits) {
                logger.info('✅ Recovered design from markdown JSON block');
                toolCall = { function: { arguments: jsonMatch[1] } };
                allToolCalls.push(toolCall);
              }
            } catch (e2) {
              logger.error('🚨 Failed to parse extracted JSON', { 
                error: e2 instanceof Error ? e2.message : String(e2) 
              });
            }
          }
        }
      }
      
      if (!toolCall) {
        logger.error('🚨 AI did not return structured design after all attempts', {
          hasContent: !!content,
          contentPreview: content?.substring(0, 200),
          fullContentLength: content?.length || 0
        });
      return new Response(JSON.stringify({
        version: 'v3.2.0-gpt5-mini-24k', // Version identifier for debugging
        success: false,
        error: 'AI returned unstructured output. Please try again or simplify the request.',
        code: 'UNSTRUCTURED_OUTPUT',
        design: null
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
      }
    }
  }
  
  // FIX: Extra guard - ensure fallback toolCall is included
  if (!allToolCalls.length && toolCall) {
    logger.info('🔧 No tool calls in array, adding fallback tool call');
    allToolCalls = [toolCall];
  }
  
  // PHASE 1: Log tool call extraction success
  logger.info('✅ Tool calls extracted from batches', {
    batchCount: allToolCalls.length,
    firstFunctionName: toolCall?.function?.name || allToolCalls[0]?.function?.name
  });
  
  // Merge all circuit designs from batches
  let designData: any = { circuits: [], materials: [], warnings: [] };
  
  for (let i = 0; i < allToolCalls.length; i++) {
    const batchToolCall = allToolCalls[i];
    try {
      const batchData = JSON.parse(batchToolCall.function.arguments);
      
      // Merge circuits
      if (batchData.circuits && Array.isArray(batchData.circuits)) {
        designData.circuits.push(...batchData.circuits);
      }
      
      // Merge materials (deduplicate)
      if (batchData.materials && Array.isArray(batchData.materials)) {
        for (const material of batchData.materials) {
          const existing = designData.materials.find((m: any) => 
            m.item === material.item && m.specification === material.specification
          );
          if (existing) {
            existing.quantity += material.quantity;
          } else {
            designData.materials.push({ ...material });
          }
        }
      }
      
      // Merge warnings
      if (batchData.warnings && Array.isArray(batchData.warnings)) {
        designData.warnings.push(...batchData.warnings);
      }
      
      // Use response from first batch
      if (i === 0 && batchData.response) {
        designData.response = batchData.response;
      }
      
    } catch (parseError) {
      logger.error(`🚨 Failed to parse batch ${i + 1} tool call`, {
        error: parseError instanceof Error ? parseError.message : String(parseError)
      });
    }
  }
  
  logger.info('✅ Merged batch data', {
    totalCircuits: designData.circuits.length,
    totalMaterials: designData.materials.length,
    totalWarnings: designData.warnings.length
  });
    
  // CRITICAL VALIDATION: Ensure circuits is an array
  if (!designData.circuits || !Array.isArray(designData.circuits)) {
    logger.error('🚨 AI returned invalid circuits data', {
      circuitsType: typeof designData.circuits,
      circuitsValue: designData.circuits,
      hasCircuits: !!designData.circuits
    });
    return new Response(JSON.stringify({
      version: 'v3.2.0-gpt5-mini-24k', // Version identifier for debugging
      success: false,
      error: 'AI returned invalid circuits data. Please try again.',
      code: 'INVALID_CIRCUITS',
      design: null
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  if (designData.circuits.length === 0) {
    logger.error('🚨 AI returned empty circuits array - returning structured error', {
      circuitCount: 0,
      inputCircuits: inputCircuits.length,
      additionalPrompt: projectInfo.additionalPrompt?.substring(0, 100)
    });
    
    // FIX: Return structured 200 response instead of throwing (prevents retry loop)
    return new Response(JSON.stringify({
      version: 'v3.2.0-gpt5-mini-24k', // Version identifier for debugging
      success: false,
      error: 'AI returned no circuits after fallback. Try adding a bit more detail (e.g., circuit names/powers) or reduce complexity.',
      code: 'NO_CIRCUITS',
      design: null
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  logger.info('✅ Design data merged successfully', {
    hasCircuits: true,
    circuitCount: designData.circuits.length,
    hasMaterials: !!designData.materials,
    materialCount: designData.materials?.length || 0
  });
  
  // 📄 POST-PROCESSING: Ensure all PDF-required fields are populated
  logger.info('📄 Applying PDF field mapper to ensure complete data');
  designData.circuits = designData.circuits.map(ensurePDFFields);
  
  // 🔍 MULTI-STAGE VALIDATION PIPELINE
  logger.info('🔍 Running multi-stage validation pipeline');
  
  const validationResult = validateDesign(designData.circuits, incomingSupply, projectInfo);
  const validationWarnings: string[] = [...(designData.warnings || [])];
  
  // Add validation errors and warnings to response
  if (validationResult.errors.length > 0) {
    logger.warn('⚠️ Validation errors found', { 
      errorCount: validationResult.errors.length,
      errors: validationResult.errors.map(e => e.message)
    });
    validationWarnings.push(...validationResult.errors.map(e => `❌ ${e.message} (${e.regulation || 'Check required'})`));
  }
  
  if (validationResult.warnings.length > 0) {
    logger.info('📋 Validation warnings', { 
      warningCount: validationResult.warnings.length 
    });
    validationWarnings.push(...validationResult.warnings.map(w => `⚠️ ${w.message}`));
  }
  
  // Calculate confidence scores for quality transparency
  const perCircuitConfidence = designData.circuits.map((c: any) => ({
    circuitName: c.name,
    ...calculateCircuitConfidence(c)
  }));
  
  const overallConfidence = calculateOverallConfidence(designData.circuits);
  
  // PHASE 1: Enhanced completion logging
  logger.info('✅ STEP 3 Complete - Design validation finished', {
    circuits: designData.circuits?.length || 0,
    requestedCircuits: allCircuits.length,
    batchesProcessed: circuitBatches.length,
    tokensUsed: totalTokens,
    validationWarnings: validationWarnings.length,
    warningsSummary: validationWarnings.slice(0, 3),
    aiTimeMs: aiElapsedMs,
    ragTimeMs: ragElapsedMs,
    parallelSpeedup: circuitBatches.length > 1 ? `${Math.round((circuitBatches.length * 60000) / aiElapsedMs * 100) / 100}x` : 'single batch'
  });
  
  // STEP 4: Return structured design (matching AI RAMS pattern)
  logger.info('✅ Returning design to client', {
    hasResponse: !!designData.response,
    circuitCount: designData.circuits?.length || 0,
    hasMaterials: !!designData.materials,
    warningCount: validationWarnings.length
  });
  
  return new Response(JSON.stringify({
    version: 'v3.2.0-gpt5-mini-24k', // Version identifier for debugging
    success: true,
    response: designData.response || 'Design complete',
    design: {
      projectName: projectInfo.name,
      location: projectInfo.location,
      clientName: projectInfo.clientName,
      electricianName: projectInfo.electricianName,
      installationType: projectInfo.installationType,
      totalLoad: Array.isArray(designData.circuits)
        ? designData.circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0)
        : 0,
      circuits: designData.circuits, // ✅ Keep all nested circuit data intact
      materials: designData.materials || [],
      warnings: validationWarnings,
      consumerUnit: {
        type: incomingSupply.mainSwitchRating >= 100 ? 'Split Load RCBO' : 'Dual RCD',
        mainSwitchRating: incomingSupply.mainSwitchRating,
        incomingSupply: {
          voltage: incomingSupply.voltage,
          phases: incomingSupply.phases,
          incomingPFC: incomingSupply.pscc,
          Ze: incomingSupply.Ze,
          earthingSystem: incomingSupply.earthingSystem
        }
      },
      diversityApplied: true,
      diversityFactor: 0.7,
      aiResponse: designData.response
    },
    metadata: {
      ragCalls: ragResults.regulations?.length || 0,
      model: aiConfig?.model || 'openai/gpt-5-mini',
      tokensUsed: totalTokens,
      aiTimeMs: aiElapsedMs,
      ragTimeMs: ragElapsedMs,
      batchesProcessed: circuitBatches.length,
      parallelProcessing: circuitBatches.length > 1,
      validationPassed: validationResult.passed,
      validationErrorCount: validationResult.errors.length,
      validationWarningCount: validationResult.warnings.length,
      confidence: {
        overall: overallConfidence,
        perCircuit: perCircuitConfidence
      }
    }
  }), { 
    headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
  });
}

/**
 * POST-PROCESSING MAPPER: Ensure all PDF-required fields are populated
 * This acts as a safety net if the AI doesn't provide all display fields
 */
function ensurePDFFields(circuit: any): any {
  return {
    ...circuit,
    // Ensure formatted display fields exist
    designCurrentIb: circuit.designCurrentIb || circuit.calculations?.Ib?.toFixed(1) || "0.0",
    nominalCurrentIn: circuit.nominalCurrentIn || circuit.calculations?.In || circuit.protectionDevice?.rating || 0,
    cableCapacityIz: circuit.cableCapacityIz || circuit.calculations?.Iz || 0,
    rcdProtectedText: circuit.rcdProtectedText || (
      circuit.rcdProtected 
        ? (circuit.protectionDevice?.type === 'RCBO' ? '30mA RCBO' : '30mA RCD')
        : 'No'
    ),
    zsCompliant: circuit.zsCompliant ?? (circuit.calculations?.zs <= circuit.calculations?.maxZs),
    voltageDropCompliant: circuit.voltageDropCompliant ?? circuit.calculations?.voltageDrop?.compliant ?? true,
    zsActual: circuit.zsActual || circuit.calculations?.zs?.toFixed(2) || "0.00",
    zsMax: circuit.zsMax || circuit.calculations?.maxZs?.toFixed(2) || "0.00",
    
    // Ensure justifications have minimum length
    justifications: {
      cableSize: circuit.justifications?.cableSize || `${circuit.cableSize}mm² cable selected for ${circuit.loadPower}W load with adequate current-carrying capacity.`,
      protection: circuit.justifications?.protection || `${circuit.protectionDevice?.rating}A ${circuit.protectionDevice?.curve || 'B'} ${circuit.protectionDevice?.type || 'MCB'} provides adequate protection per BS 7671.`,
      rcd: circuit.justifications?.rcd || (circuit.rcdProtected 
        ? 'RCD protection provides additional safety for this circuit in accordance with BS 7671.' 
        : 'RCD not required for this circuit as it does not serve special locations or socket outlets likely to supply portable equipment outdoors.')
    },
    
    // Ensure warnings is always an array
    warnings: circuit.warnings || []
  };
}

// Helper functions
function extractCircuitsFromPrompt(additionalPrompt: string, existingCircuits: any[]): {
  inferredCircuits: any[];
  specialRequirements: string[];
  installationConstraints: string[];
} {
  if (!additionalPrompt?.trim()) {
    return { inferredCircuits: [], specialRequirements: [], installationConstraints: [] };
  }

  const entities = parseQueryEntities(additionalPrompt);
  const inferredCircuits: any[] = [];
  const specialRequirements: string[] = [];
  const installationConstraints: string[] = [];
  
  // Extract special requirements from entities
  if (entities.specialRequirements) {
    specialRequirements.push(...entities.specialRequirements);
  }
  
  // Extract installation constraints
  if (entities.installationConstraints) {
    installationConstraints.push(...entities.installationConstraints);
  }
  
  // Add location-based requirements
  if (entities.location === 'bathroom') {
    specialRequirements.push('⚠️ Section 701: Bathroom installation - 30mA RCD mandatory, IP rating zones, bonding required');
  }
  if (entities.location === 'outdoor') {
    specialRequirements.push('⚠️ Reg 411.3.3: Outdoor installation - 30mA RCD mandatory, IP65+ rating, SWA cable');
  }
  
  // Add earthing system requirements
  if (entities.earthingSystem === 'TT') {
    specialRequirements.push('⚠️ TT System: 30mA RCD on all circuits, earth electrode resistance critical');
  }
  
  // Add high temperature derating
  if (entities.ambientTemperature && entities.ambientTemperature > 30) {
    installationConstraints.push(`🔧 High ambient temperature (${entities.ambientTemperature}°C): Apply temperature derating factor`);
  }
  
  // Infer circuits if power + load type mentioned
  if (entities.power && entities.loadType) {
    inferredCircuits.push({
      name: `${entities.loadType} (from prompt)`,
      loadType: entities.loadType,
      loadPower: entities.power,
      cableLength: entities.distance || 20,
      phases: entities.phases || 'single',
      specialLocation: entities.location || 'none'
    });
  }
  
  return { inferredCircuits, specialRequirements, installationConstraints };
}

function getCircuitTypeHints(loadType: string, location?: string): string {
  const hints: Record<string, string> = {
    'shower': 'Section 701 (bathrooms), 30mA RCD mandatory, bonding required, min 10mm² cable typical',
    'ev_charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'ev-charger': 'Section 722, dedicated circuit, Type A RCD required, 6mm² minimum, Mode 3 compliance',
    'cooker': 'Reg 433.1.204 diversity (10A + 30% remainder + 5A socket), 10mm² typical, 40-50A MCB',
    'socket': 'Ring final: 2.5mm² + 32A MCB | Radial: 4mm² + 32A or 2.5mm² + 20A MCB',
    'sockets': 'Ring final: 2.5mm² + 32A MCB | Radial: 4mm² + 32A or 2.5mm² + 20A MCB',
    'lighting': '1.5mm² cable, 6A MCB Type B, 3% voltage drop limit (6.9V at 230V)',
    'outdoor': '30mA RCD mandatory (411.3.3), SWA cable, IP65+ rating, burial depth 600mm',
    'heat_pump': 'Dedicated circuit, 16mm² typical, 63A MCB, surge protection (534.4)',
    'immersion': '16A MCB, 2.5mm² cable typical, timer control, off-peak tariff consideration',
    'motor': 'Type D MCB for starting current (6-8x FLC), DOL or star-delta starting',
    'garage': 'RCD protection recommended, mechanical protection for exposed cables'
  };
  
  const locationHints: Record<string, string> = {
    'bathroom': 'Section 701: IP rating zones (IPX4 min), 30mA RCD, supplementary bonding',
    'outdoor': 'Reg 411.3.3: RCD mandatory, IP65+, burial depth 600mm, SWA cable',
    'garage': 'RCD recommended, mechanical protection, consider EV charger future-proofing'
  };
  
  let hint = hints[loadType] || 'Standard circuit design per BS 7671';
  if (location && locationHints[location]) {
    hint += ` | ${locationHints[location]}`;
  }
  
  return hint;
}

function buildDesignQuery(
  projectInfo: any, 
  supply: any, 
  circuits: any[],
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const circuitList = circuits.length > 0 
    ? `Circuits required (${circuits.length} total):\n${circuits.map((c: any, i: number) => 
        `${i+1}. ${c.name} - ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW), ${c.cableLength}m, ${c.phases} phase${c.specialLocation !== 'none' ? ` (${c.specialLocation})` : ''}`
      ).join('\n')}`
    : 'Please infer appropriate circuits from the project description and requirements.';
    
  let query = `Design circuits for ${projectInfo.name}.
  
Incoming supply: ${supply.voltage}V ${supply.phases}, Ze=${supply.Ze}Ω, ${supply.earthingSystem}.
Prospective fault current: ${supply.pscc || 3500}A.

${circuitList}`;

  if (specialRequirements.length > 0) {
    query += `\n\nSpecial Requirements:\n${specialRequirements.map(r => `- ${r}`).join('\n')}`;
  }

  if (installationConstraints.length > 0) {
    query += `\n\nInstallation Constraints:\n${installationConstraints.map(c => `- ${c}`).join('\n')}`;
  }

  if (projectInfo.additionalPrompt) {
    query += `\n\n${projectInfo.additionalPrompt}`;
  }

  return query;
}

function extractSearchTerms(query: string, circuits: any[]): string[] {
  const terms = ['circuit design', 'cable sizing', 'voltage drop', 'protection devices', 'BS 7671'];
  
  // Add circuit-specific terms
  circuits.forEach((c: any) => {
    if (c.loadType) terms.push(c.loadType);
    if (c.specialLocation && c.specialLocation !== 'none') terms.push(c.specialLocation);
  });
  
  return terms;
}

function buildStructuredDesignPrompt(
  projectInfo: any, 
  supply: any, 
  circuits: any[], 
  ragResults: any, 
  type: string,
  specialRequirements: string[] = [],
  installationConstraints: string[] = []
): string {
  const regulations = ragResults.regulations?.slice(0, 25).map((r: any) => 
    `${r.regulation_number}: ${r.content.substring(0, 300)}`
  ).join('\n\n') || 'No specific regulations retrieved';
  
  // Generate circuit-specific hints
  const circuitHints = circuits.length > 0
    ? circuits.map((c: any, i: number) => {
        const hint = getCircuitTypeHints(c.loadType, c.specialLocation);
        return `${i+1}. ${c.name} (${c.loadType}): ${hint}`;
      }).join('\n')
    : '';
  
  return `You are a senior electrical design engineer specializing in BS 7671:2018+A3:2024 compliant installations.

INSTALLATION TYPE: ${type}
${INSTALLATION_CONTEXT[type] || ''}

INCOMING SUPPLY DETAILS:
- Voltage: ${supply.voltage}V ${supply.phases}
- External Earth Fault Loop Impedance (Ze): ${supply.Ze}Ω
- Earthing System: ${supply.earthingSystem}
- Prospective Fault Current (PFC): ${supply.pscc || 3500}A
- Main Switch Rating: ${supply.mainSwitchRating || 100}A

${specialRequirements.length > 0 ? `SPECIAL REQUIREMENTS:
${specialRequirements.map(r => `${r}`).join('\n')}

` : ''}${installationConstraints.length > 0 ? `INSTALLATION CONSTRAINTS:
${installationConstraints.map(c => `${c}`).join('\n')}

` : ''}CIRCUITS TO DESIGN (${circuits.length} total):
${circuits.length > 0 
  ? circuits.map((c: any, i: number) => `${i+1}. ${c.name}
   - Load Type: ${c.loadType}
   - Power: ${c.loadPower}W (${(c.loadPower/1000).toFixed(1)}kW)
   - Cable Run: ${c.cableLength}m
   - Phases: ${c.phases}
   - Location: ${c.specialLocation || 'general'}`).join('\n\n')
  : 'No specific circuits provided. Infer appropriate circuits from the project requirements and additional prompt.'}

${circuitHints ? `CIRCUIT-SPECIFIC REGULATION HINTS:
${circuitHints}

` : ''}BS 7671 KNOWLEDGE BASE (Top 25 regulations retrieved via multi-query RAG):
${regulations}

CRITICAL DESIGN REQUIREMENTS:

1. **Cable Sizing (Reg 433.1)**:
   - Calculate design current (Ib) for each circuit
   - Select protective device rating (In) where In ≥ Ib
   - Determine cable current-carrying capacity (Iz) where Iz ≥ In
   - Apply derating factors for ambient temperature and grouping
   - Select appropriate cable CSA (mm²) and CPC size

2. **Voltage Drop Compliance (Reg 525)**:
   - Calculate actual voltage drop in volts and percentage
   - Lighting circuits: Max 3% (6.9V at 230V)
   - Power circuits: Max 5% (11.5V at 230V)
   - Use cable resistance values from BS 7671 Appendix 4

3. **Earth Fault Protection (Reg 411.3.2)**:
   - Calculate circuit Zs (Ze + R1+R2)
   - Verify Zs < maximum permitted Zs for chosen protective device
   - Ensure disconnection time ≤ 0.4s (final circuits) or ≤ 5s (distribution)

4. **RCD Protection (Reg 411.3.3)**:
   - ALL socket outlets ≤32A require 30mA RCD
   - Bathrooms (Section 701): 30mA RCD mandatory
   - Outdoor circuits: 30mA RCD mandatory
   - Specify RCBO or separate RCD

5. **Diversity Calculation (Appendix 15)**:
   - Apply diversity factors per BS 7671 Appendix 15
   - Provide clear reasoning for each circuit's diversity
   - Calculate total diversified load for main switch sizing
   - Include diversity breakdown with BS 7671 references

6. **Materials List**:
   - Specify cable types (T&E, SWA, FP200) based on location
   - Include quantities with units (metres, number of)
   - List all protective devices
   - Include consumer unit specification

7. **Justifications**:
   - Cite specific BS 7671 regulation numbers
   - Explain cable size selection with calculations
   - Justify protective device type, rating, and curve
   - Explain RCD requirements based on location/circuit type

IMPORTANT NOTES:
- ALL calculations must be numerically accurate
- ALL regulation citations must be specific (e.g., "Reg 411.3.3")
- Provide practical justifications, not just regulation text
- Consider installation method impact on current capacity
- Account for voltage drop over cable length
- Ensure all circuits meet disconnection time requirements
${circuits.length === 0 ? '- Since no circuits were provided, infer appropriate circuits from the project type and brief' : ''}

You MUST call the design_circuits function to return your complete design. Do not output text or markdown - only call the tool.`;
}

function extractPracticalGuidance(circuits: any[]): string[] {
  const guidance = [
    'Complete all required tests per BS 7671 Part 6 before energising circuits',
    'Fill in Electrical Installation Certificate (EIC) with Schedule of Test Results',
    `Total of ${circuits.length} circuits designed - verify consumer unit has sufficient ways`,
    'Ensure all RCD/RCBO devices are tested monthly by end user',
    'Verify actual Ze at origin matches design assumption before installation'
  ];
  
  // Add circuit-specific guidance
  if (circuits.some((c: any) => c.rcdProtected)) {
    guidance.push('RCD protection required for multiple circuits - consider use of RCBOs for selectivity');
  }
  
  if (circuits.some((c: any) => c.loadType?.includes('shower'))) {
    guidance.push('Electric showers require bonding to supplementary equipotential bonding per Section 701');
  }
  
  return guidance;
}

// PHASE 2: Simple content hash function for deduplication
function hashContent(content: string): string {
  // Simple hash using first 100 chars + length as fingerprint
  const normalized = content.toLowerCase().replace(/\s+/g, ' ').trim();
  return `${normalized.substring(0, 100)}_${normalized.length}`;
}

// ============================================
// 🌊 STREAMING BATCH DESIGN HANDLER
// Streams results as each batch completes
// ============================================
export async function handleBatchDesignStreaming(body: any, logger: any, builder: any) {
  const { projectInfo, incomingSupply, circuits: inputCircuits, aiConfig } = body;
  const installationType = projectInfo.installationType || 'domestic';
  
  logger.info('🌊 Streaming Batch Design Starting', {
    circuitCount: inputCircuits.length,
    installationType: projectInfo.installationType
  });

  try {
    // STEP 0: Parse additional prompt
    const { inferredCircuits, specialRequirements, installationConstraints } = 
      extractCircuitsFromPrompt(projectInfo.additionalPrompt || '', inputCircuits);
    
    const allCircuits = [...inputCircuits, ...inferredCircuits];
    
    if (allCircuits.length === 0) {
      builder.sendError('No circuits to design. Please add at least one circuit.');
      return;
    }

    // STEP 1: RAG Search
    builder.sendToken('🔍 Searching regulations...');
    const entities = parseQueryEntities(projectInfo.additionalPrompt || '');
    const ragStartTime = Date.now();
    
    const ragResults = await intelligentRAGSearch({
      circuitTypes: allCircuits.map((c: any) => c.loadType),
      cableLength: Math.max(...allCircuits.map((c: any) => c.cableLength || 20)),
      voltage: incomingSupply.voltage,
      entities,
      installationType
    });
    
    const ragTimeMs = Date.now() - ragStartTime;
    logger.info('✅ RAG search complete', { timeMs: ragTimeMs, resultCount: ragResults.length });

    // Build context
    const query = buildDesignQuery(projectInfo, incomingSupply, allCircuits, specialRequirements, installationConstraints);
    const systemPrompt = buildSystemPrompt(allCircuits, ragResults, incomingSupply, installationType, installationConstraints);
    
    // AI Configuration
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }
    
    const requestBody = {
      model: aiConfig?.model || 'openai/gpt-5-mini',
      max_completion_tokens: aiConfig?.maxTokens || 24000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      tools: [{
        type: "function",
        function: {
          name: "design_circuits",
          description: "Return the complete electrical installation design with all circuit details, calculations, and materials",
          parameters: {
            type: "object",
            properties: {
              response: { type: "string" },
              circuits: {
                type: "array",
                items: { type: "object" }
              },
              materials: {
                type: "array",
                items: { type: "string" }
              },
              warnings: {
                type: "array",
                items: { type: "string" }
              }
            },
            required: ["response", "circuits", "materials"]
          }
        }
      }],
      tool_choice: "auto"
    };
    
    // Process batches sequentially but stream each result immediately
    const BATCH_SIZE = 2;
    const circuitBatches = chunkArray(allCircuits, BATCH_SIZE);
    const allDesignedCircuits: any[] = [];
    const allMaterials = new Set<string>();
    const allWarnings = new Set<string>();
    let aiResponse = '';
    
    logger.info(`🌊 Processing ${circuitBatches.length} batches sequentially with streaming`);
    
    for (let batchIndex = 0; batchIndex < circuitBatches.length; batchIndex++) {
      const batch = circuitBatches[batchIndex];
      builder.sendToken(`⚡ Designing circuits ${batchIndex * BATCH_SIZE + 1}-${batchIndex * BATCH_SIZE + batch.length}...`);
      
      const batchQuery = `${query}\n\nDesign the following circuits:\n${batch.map((c: any, i: number) => 
        `${i + 1}. ${c.name || c.loadType} (${c.loadType}, ${c.loadPower}W, ${c.cableLength}m)`
      ).join('\n')}`;
      
      const batchRequestBody = {
        ...requestBody,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: batchQuery }
        ]
      };
      
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchRequestBody)
      });
      
      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }
      
      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
      
      if (toolCall?.function?.name === 'design_circuits') {
        const batchResult = JSON.parse(toolCall.function.arguments);
        
        // Accumulate results
        allDesignedCircuits.push(...(batchResult.circuits || []));
        (batchResult.materials || []).forEach((m: string) => allMaterials.add(m));
        (batchResult.warnings || []).forEach((w: string) => allWarnings.add(w));
        aiResponse = batchResult.response || aiResponse;
        
        // Stream partial result immediately
        builder.sendChunk({
          type: 'token',
          content: JSON.stringify({
            batchComplete: batchIndex + 1,
            totalBatches: circuitBatches.length,
            circuits: allDesignedCircuits,
            materials: Array.from(allMaterials),
            warnings: Array.from(allWarnings),
            progress: Math.round(((batchIndex + 1) / circuitBatches.length) * 100)
          })
        });
        
        logger.info(`✅ Batch ${batchIndex + 1}/${circuitBatches.length} streamed (${allDesignedCircuits.length} circuits total)`);
      }
    }
    
    // Send final result
    const finalDesign = {
      projectName: projectInfo.name,
      location: projectInfo.location,
      clientName: projectInfo.clientName,
      electricianName: projectInfo.electricianName,
      installationType: projectInfo.installationType,
      totalLoad: allDesignedCircuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0),
      circuits: allDesignedCircuits,
      materials: Array.from(allMaterials),
      warnings: Array.from(allWarnings),
      consumerUnit: {
        type: 'Split Load RCBO',
        mainSwitchRating: incomingSupply.mainSwitchRating,
        incomingSupply: {
          voltage: incomingSupply.voltage,
          phases: incomingSupply.phases,
          incomingPFC: incomingSupply.pscc,
          Ze: incomingSupply.Ze,
          earthingSystem: incomingSupply.earthingSystem
        }
      },
      diversityApplied: true,
      diversityFactor: 0.7,
      aiResponse
    };
    
    builder.sendChunk({
      type: 'done',
      data: {
        version: 'v3.2.0-streaming',
        success: true,
        response: aiResponse,
        design: finalDesign,
        metadata: {
          ragCalls: ragResults.length,
          batchesProcessed: circuitBatches.length,
          validationPassed: true
        }
      }
    });
    
  } catch (error) {
    logger.error('Streaming design error', { error });
    builder.sendError(error instanceof Error ? error.message : 'Design failed');
  }
}

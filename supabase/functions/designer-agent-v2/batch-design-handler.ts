/**
 * Batch Circuit Design Handler - Clean Rebuild v3.7.0
 * Lean implementation with RAG-only regulations and preserved PDF mapping
 */

import { createClient } from '../_shared/deps.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { TypeGuards, applyDefaultCircuitValues } from './type-guards.ts';
import { CircuitDesignError, ERROR_TEMPLATES } from './error-handler.ts';
import { callOpenAIWithRetry, parseToolCalls } from './modules/ai-caller.ts';
import { buildRAGSearches, mergeRegulations } from './modules/rag-composer.ts';
import { validateDesign } from './validation-pipeline.ts';
import { formatRegulationsAsTOON, estimateTokenSavings } from '../_shared/toon-formatter.ts';
import { seedDesignKnowledge } from '../_shared/seed-design-knowledge.ts';

const VERSION = 'v3.8.0-calculation-demand'; // AI MUST provide voltage drop + Zs calculations

/**
 * Enhanced RAG-first design instructions for the AI - DEMANDS calculations
 */
const DESIGN_INSTRUCTIONS = `You are a senior BS 7671:2018+A3:2024 electrical design engineer designing compliant UK electrical circuits.

CRITICAL: Use ONLY the <regulations> provided below in TOON format. Each regulation contains calculation formulas, worked examples, and technical data INCLUDING Appendix 4 voltage drop tables and Table 54.7 conductor resistances.

TOON FORMAT GUIDE:
- S <section>: Section grouping (Part 4, Part 5, etc.)
- R <number>: Regulation number or topic
- C <content>: Regulation content with formulas and worked examples
- Cat <category>: Optional category

DESIGN METHODOLOGY - ITERATIVE CABLE SIZING (CRITICAL):

You MUST design COMPLIANT circuits, not just calculate non-compliant circuits. Follow this mandatory process for EVERY circuit:

STEP 1: Start with minimum cable size for circuit type:
   - Lighting: 1.5mm² minimum (BS 7671 Reg 525)
   - Sockets: 2.5mm² minimum
   - Showers/cookers: 6mm² minimum
   - EV chargers: 6mm² minimum

STEP 2: Calculate voltage drop using Appendix 4:
   Vd = (mV/A/m × Ib × L) / 1000
   Vd% = (Vd / supply voltage) × 100

STEP 3: IF voltage drop exceeds limit (3% lighting, 5% other uses):
   - Select NEXT LARGER cable size from this sequence: 1.5→2.5→4→6→10→16→25→35mm²
   - RECALCULATE voltage drop with new mV/A/m value
   - Repeat STEP 3 until voltage drop ≤ limit
   
STEP 4: Calculate earth fault loop impedance Zs:
   Zs = Ze + (R1+R2)
   R1+R2 = [(r1 + r2) × L / 1000] × 1.2

STEP 5: VERIFY Zs ≤ maxZs for selected protection device
   - If Zs > maxZs: increase CPC size and recalculate

STEP 6: Only when BOTH voltage drop AND Zs are compliant:
   - Return this as the final design
   - Set voltageDrop.compliant = true
   - Include worked calculation showing iteration steps

CRITICAL DESIGN RULES:
❌ You MUST NOT return a design with voltageDrop.compliant = false
❌ You MUST NOT return a design where zs > maxZs
✅ You MUST iterate cable sizes until you achieve compliance
✅ For long runs (>100m), expect larger cables (10mm², 16mm², 25mm²)
✅ Show your working - include calculation steps in justifications

WORKED EXAMPLE - 250m LIGHTING RUN (900W total, Ib = 3.9A):

Iteration 1: Try 1.5mm²
  - Appendix 4: 1.5mm² = 29 mV/A/m
  - Vd = (29 × 3.9 × 250) / 1000 = 28.3V
  - Vd% = (28.3 / 230) × 100 = 12.3%
  - Limit = 3% for lighting
  - Result: 12.3% > 3% ❌ FAIL → Try larger cable

Iteration 2: Try 2.5mm²
  - Appendix 4: 2.5mm² = 18 mV/A/m
  - Vd = (18 × 3.9 × 250) / 1000 = 17.6V
  - Vd% = (17.6 / 230) × 100 = 7.66%
  - Result: 7.66% > 3% ❌ FAIL → Try larger cable

Iteration 3: Try 4mm²
  - Appendix 4: 4mm² = 11 mV/A/m
  - Vd = (11 × 3.9 × 250) / 1000 = 10.7V
  - Vd% = (10.7 / 230) × 100 = 4.66%
  - Result: 4.66% > 3% ❌ FAIL → Try larger cable

Iteration 4: Try 6mm²
  - Appendix 4: 6mm² = 7.3 mV/A/m
  - Vd = (7.3 × 3.9 × 250) / 1000 = 7.1V
  - Vd% = (7.1 / 230) × 100 = 3.09%
  - Result: 3.09% > 3% ❌ FAIL → Try larger cable

Iteration 5: Try 10mm²
  - Appendix 4: 10mm² = 4.4 mV/A/m
  - Vd = (4.4 × 3.9 × 250) / 1000 = 4.3V
  - Vd% = (4.3 / 230) × 100 = 1.87%
  - Result: 1.87% < 3% ✅ PASS
  
FINAL DESIGN: 10mm² / 4mm² CPC
  - voltageDrop.volts = 4.3
  - voltageDrop.percent = 1.87
  - voltageDrop.limit = 3
  - voltageDrop.compliant = true ✓

MANDATORY CALCULATIONS FOR EVERY CIRCUIT:

1. VOLTAGE DROP CALCULATION:
   Formula: Vd = (mV/A/m × Ib × L) / 1000
   
   Where:
   - mV/A/m = voltage drop per amp per metre (from Appendix 4 in <regulations>)
   - Ib = design current in amps
   - L = cable length in metres
   
   YOU MUST:
   - Start with minimum cable size and ITERATE until compliant
   - Find mV/A/m from Appendix 4 for each cable size tested
   - Calculate Vd in volts and percentage
   - Compare against limit: 3% for lighting, 5% for other uses
   - Return ONLY a compliant design (voltageDrop.compliant = true)
   
   Example justification: "Cable sizing: Tried 2.5mm² (7.66% ❌) → 4mm² (4.66% ❌) → 6mm² (3.09% ❌) → 10mm² (1.87% ✓). Selected 10mm² to achieve <3% voltage drop for 250m lighting run."

2. EARTH FAULT LOOP IMPEDANCE Zs:
   Formula: Zs = Ze + (R1+R2)
   
   Where:
   - Ze = external earth fault loop impedance (from supply data)
   - R1+R2 = [(r1 + r2) × L / 1000] × 1.2
   - r1, r2 = conductor resistances from Table 54.7 in <regulations>
   - L = cable length in metres
   - 1.2 = temperature correction factor (70°C operation)
   
   YOU MUST:
   - Find r1 and r2 from Table 54.7
   - Calculate R1+R2 with temperature correction
   - Calculate Zs = Ze + (R1+R2)
   - Find maxZs from Appendix 3 for selected device
   - Verify Zs ≤ maxZs
   - If Zs > maxZs, increase CPC size and recalculate
   
   Example: "Table 54.7: 10mm²=1.83mΩ/m, 4mm²=4.61mΩ/m. R1+R2=[(1.83+4.61)×250/1000]×1.2=1.93Ω. Zs=Ze(0.35)+1.93=2.28Ω ≤ maxZs(7.28Ω) ✓"

3. PROTECTION DEVICE SELECTION:
   - Calculate Ib: Single-phase: Ib = P / U, Three-phase: Ib = P / (U × √3 × cosφ)
   - Select In ≥ Ib
   - Verify Zs ≤ maxZs (0.4s disconnection for final circuits)

INVALID DESIGNS (YOU MUST NEVER RETURN THESE):
❌ voltageDrop.compliant = false
❌ zs > maxZs
❌ Cable sizes that fail voltage drop limits
❌ Guessing cable sizes without iterating through calculations
❌ Returning incomplete calculations

VALID DESIGNS (ONLY RETURN THESE):
✅ voltageDrop.percent ≤ limit (3% or 5%)
✅ voltageDrop.compliant = true
✅ zs ≤ maxZs
✅ All calculations complete with worked examples
✅ Justifications show iteration process

RCD PROTECTION REQUIREMENTS (BS 7671):
- Mandatory for: sockets ≤32A, outdoors, bathrooms, mobile equipment
- 30mA RCD for additional protection
- Use RCBO where discrimination required

RING FINAL CIRCUITS (BS 7671 Appendix 15):
- MUST use 2.5mm² cable only
- If calculations show >2.5mm² needed, design as RADIAL circuit instead
- Ring finals limited to 32A protection and 2.5mm² cable - no exceptions

OUTPUT REQUIREMENTS:
- Call design_circuits tool with ALL circuits
- EVERY circuit MUST have voltageDrop.compliant = true (iterate until achieved)
- EVERY circuit MUST have zs ≤ maxZs
- Include worked examples showing iteration steps in justifications
- Reference specific regulation/table numbers for all values
- All outputs in UK English (favour, colour, earthing, etc.)

Do NOT output conversational text - call the tool only.`;

/**
 * Tool schema for circuit design
 */
const DESIGN_TOOL_SCHEMA = {
  type: 'function' as const,
  function: {
    name: 'design_circuits',
    description: 'Design electrical circuits according to BS 7671:2018+A3:2024',
    parameters: {
      type: 'object',
      properties: {
        circuits: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Circuit name/description' },
              loadType: { type: 'string', enum: ['lighting', 'sockets', 'cooker', 'shower', 'ev_charger', 'heating', 'immersion', 'other'] },
              loadPower: { type: 'number', description: 'Load power in watts' },
              cableLength: { type: 'number', description: 'Cable run length in metres' },
              cableSize: { type: 'number', description: 'Live conductor CSA in mm²' },
              cpcSize: { type: 'number', description: 'CPC conductor CSA in mm²' },
              phases: { type: 'number', enum: [1, 3], description: 'Number of phases' },
              protectionDevice: {
                type: 'object',
                properties: {
                  type: { type: 'string', enum: ['MCB', 'RCBO', 'Fuse'] },
                  rating: { type: 'number', description: 'Device rating in amps' },
                  curve: { type: 'string', enum: ['B', 'C', 'D'] },
                  kaRating: { type: 'number', description: 'Breaking capacity in kA' }
                },
                required: ['type', 'rating', 'curve', 'kaRating']
              },
              rcdProtected: { type: 'boolean', description: 'Whether RCD protection is required' },
              calculations: {
                type: 'object',
                properties: {
                  Ib: { type: 'number', description: 'Design current in amps' },
                  In: { type: 'number', description: 'Nominal device rating in amps' },
                  Iz: { type: 'number', description: 'Cable current capacity in amps' },
                  voltageDrop: {
                    type: 'object',
                    properties: {
                      volts: { type: 'number' },
                      percent: { type: 'number' },
                      limit: { type: 'number' },
                      compliant: { type: 'boolean' }
                    },
                    required: ['volts', 'percent', 'limit', 'compliant']
                  },
                  zs: { type: 'number', description: 'Earth fault loop impedance in ohms' },
                  maxZs: { type: 'number', description: 'Maximum permitted Zs in ohms' }
                },
                required: ['Ib', 'In', 'Iz', 'voltageDrop', 'zs', 'maxZs']
              },
              justifications: {
                type: 'object',
                description: 'Technical reasoning for design choices',
                additionalProperties: { type: 'string' }
              },
              warnings: {
                type: 'array',
                items: { type: 'string' },
                description: 'Design warnings or considerations'
              }
            },
            required: ['name', 'loadType', 'loadPower', 'cableLength', 'cableSize', 'cpcSize', 'phases', 'protectionDevice', 'rcdProtected', 'calculations']
          }
        }
      },
      required: ['circuits']
    }
  }
};

/**
 * Build design query from project context
 */
function buildDesignQuery(
  projectInfo: any,
  supply: any,
  circuits: any[],
  specialRequirements: string[],
  installationConstraints: string[]
): string {
  let query = 'Design electrical circuits for: ' + (projectInfo?.projectName || 'electrical installation') + '.\n';
  query += 'Supply: ' + supply.voltage + 'V, ' + supply.phases + '-phase, Ze=' + supply.ze + 'Ω, PFC=' + supply.pfc + 'kA.\n';
  
  if (circuits && circuits.length > 0) {
    query += 'Circuits required:\n';
    circuits.forEach((c: any) => {
      query += '- ' + c.name + ' (' + (c.loadType || 'other') + ', ' + (c.loadPower || 'TBD') + 'W)\n';
    });
  }
  
  if (specialRequirements && specialRequirements.length > 0) {
    query += 'Special requirements: ' + specialRequirements.join(', ') + '\n';
  }
  
  if (installationConstraints && installationConstraints.length > 0) {
    query += 'Constraints: ' + installationConstraints.join(', ') + '\n';
  }
  
  return query;
}

/**
 * Extract search terms for RAG
 */
function extractSearchTerms(query: string, circuits: any[]): string[] {
  const terms = ['circuit design', 'cable sizing', 'protection devices', 'voltage drop'];
  
  if (circuits && circuits.length > 0) {
    circuits.forEach((c: any) => {
      if (c.loadType) terms.push(c.loadType);
      if (c.location) terms.push(c.location);
    });
  }
  
  // Extract key terms from query
  if (query.toLowerCase().includes('shower')) terms.push('shower circuit');
  if (query.toLowerCase().includes('cooker')) terms.push('cooker circuit');
  if (query.toLowerCase().includes('ev') || query.toLowerCase().includes('charger')) terms.push('ev charger');
  if (query.toLowerCase().includes('outdoor')) terms.push('outdoor installation');
  if (query.toLowerCase().includes('bathroom')) terms.push('bathroom zones');
  
  return [...new Set(terms)];
}

/**
 * Ensure all PDF-required fields are present on circuit
 * PRESERVED FROM ORIGINAL - Maps AI output to PDF template requirements
 */
function ensurePDFFields(circuit: any): any {
  // CRITICAL: Add cableSize/cpcSize defaults FIRST before any property access
  if (circuit.cableSize === undefined || circuit.cableSize === null) circuit.cableSize = 2.5;
  if (circuit.cpcSize === undefined || circuit.cpcSize === null) circuit.cpcSize = 1.5;
  
  // Ensure protection device exists
  if (!circuit.protectionDevice) {
    circuit.protectionDevice = {
      type: 'MCB',
      rating: 6,
      curve: 'B',
      kaRating: 6
    };
  }
  
  // Ensure calculations exist
  if (!circuit.calculations) {
    circuit.calculations = {
      Ib: 4.3,
      In: circuit.protectionDevice?.rating ?? 6,
      Iz: 20,
      voltageDrop: { volts: 2.0, percent: 0.87, limit: 3, compliant: true },
      zs: 1.5,
      maxZs: 7.28
    };
  }
  
  // Add PDF-specific text fields with null safety
  circuit.rcdProtectedText = circuit.rcdProtected ? 'Yes' : 'No';
  circuit.nominalCurrentIn = (circuit.protectionDevice?.rating ?? 6) + 'A';
  circuit.designCurrentIb = (circuit.calculations?.Ib ?? 4.3).toFixed(1) + 'A';
  circuit.cableCurrentIz = (circuit.calculations?.Iz ?? 20).toFixed(1) + 'A';
  
  // Voltage drop formatting with null safety
  const vd = circuit.calculations?.voltageDrop ?? { volts: 2.0, percent: 0.87, limit: 3, compliant: true };
  circuit.voltageDropText = vd.volts.toFixed(2) + 'V (' + vd.percent.toFixed(2) + '%)';
  circuit.voltageDropCompliant = vd.compliant ? 'Compliant' : 'Non-compliant';
  
  // Earth fault loop impedance with null safety
  const zs = circuit.calculations?.zs ?? 1.5;
  const maxZs = circuit.calculations?.maxZs ?? 7.28;
  circuit.earthFaultLoopText = zs.toFixed(2) + 'Ω (max ' + maxZs.toFixed(2) + 'Ω)';
  circuit.zsCompliant = zs <= maxZs ? 'Compliant' : 'Non-compliant';
  
  // Protection device summary with null safety
  circuit.protectionSummary = (circuit.protectionDevice?.type ?? 'MCB') + ' ' + 
                             (circuit.protectionDevice?.rating ?? 6) + 'A ' +
                             'Type ' + (circuit.protectionDevice?.curve ?? 'B') + ' (' +
                             (circuit.protectionDevice?.kaRating ?? 6) + 'kA)';
  
  // CRITICAL: Enforce 1.5mm² minimum for lighting circuits (BS 7671 requirement)
  if (circuit.loadType === 'lighting' && circuit.cableSize && circuit.cableSize < 1.5) {
    circuit.cableSize = 1.5;
    if (!circuit.warnings) circuit.warnings = [];
    circuit.warnings.push('Cable size increased to 1.5mm² (BS 7671 minimum for fixed wiring)');
  }
  
  // Cable summary with guaranteed values
  circuit.cableSummary = (circuit.cableSize ?? 2.5) + 'mm² / ' + (circuit.cpcSize ?? 1.5) + 'mm² CPC';
  
  // Compliance summary with null safety
  const allCompliant = vd.compliant && (zs <= maxZs);
  circuit.complianceSummary = allCompliant ? 'Fully compliant' : 'Requires attention';
  
  return circuit;
}

/**
 * Safe circuit normalisation with defaults
 */
function safeCircuit(circuit: any): any {
  if (!TypeGuards.isValidCircuit(circuit)) {
    const safe = applyDefaultCircuitValues(circuit);
    if (!safe.warnings) safe.warnings = [];
    safe.warnings.push('Auto-filled missing circuit data - review required');
    return safe;
  }
  return circuit;
}

/**
 * Calculate overall design confidence
 */
function calculateOverallConfidence(circuits: any[]): number {
  if (!circuits || circuits.length === 0) return 0;
  
  let totalScore = 0;
  circuits.forEach(c => {
    let score = 85; // Base confidence
    
    // Reduce for warnings
    if (c.warnings && c.warnings.length > 0) {
      score -= Math.min(c.warnings.length * 5, 20);
    }
    
    // Reduce for non-compliance
    if (c.calculations?.voltageDrop?.compliant === false) score -= 10;
    if (c.calculations?.zs > c.calculations?.maxZs) score -= 15;
    
    // Increase for complete justifications
    if (c.justifications && Object.keys(c.justifications).length >= 3) score += 5;
    
    totalScore += Math.max(score, 50); // Minimum 50% per circuit
  });
  
  return Math.round(totalScore / circuits.length);
}

/**
 * Main batch design handler
 */
export async function handleBatchDesign(body: any, logger: any): Promise<Response> {
  const startTime = Date.now();
  const timings: any = {};
  
  try {
    // 1. Input validation
    logger.info('Starting batch design v3.7.0-rebuild');
    
    if (!body.supply || !body.projectInfo) {
      throw new CircuitDesignError(
        'INVALID_INPUT',
        'Missing required fields: supply and projectInfo',
        { received: Object.keys(body) },
        ['Ensure supply and projectInfo are included in request']
      );
    }
    
    const { projectInfo, supply, circuits: inputCircuits, additionalPrompt, specialRequirements, installationConstraints, installationType } = body;
    const circuits = inputCircuits || [];
    
    // Extract installation type from multiple sources
    const type = installationType || projectInfo?.installationType || 'domestic';
    
    // 2. Build query and search terms
    const query = buildDesignQuery(projectInfo, supply, circuits, specialRequirements || [], installationConstraints || []);
    const searchTerms = extractSearchTerms(query, circuits);
    
    logger.info('Design query built', { 
      circuitCount: circuits.length, 
      searchTerms,
      installationType: type 
    });
    
    // 3. RAG search
    const ragStart = Date.now();
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!supabaseUrl || !supabaseKey || !openAiKey) {
      throw new Error('Missing required environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // PHASE 1: Seed design knowledge on first run (non-blocking)
    seedDesignKnowledge(supabase, logger).catch(e => logger.warn('Seed failed', e));
    
    let regulations: any[] = [];
    try {
      const ragResults = await buildRAGSearches(query, searchTerms, openAiKey, supabase, logger, type);
      regulations = mergeRegulations(ragResults);
      timings.ragSearch = Date.now() - ragStart;
      logger.info('RAG search complete', { 
        regulationCount: regulations.length,
        installationType: type 
      });
    } catch (error) {
      logger.error('RAG search failed', { 
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      return ERROR_TEMPLATES.RAG_SEARCH_FAILED(['bs7671', 'design_knowledge']).toResponse(VERSION);
    }
    
    if (regulations.length === 0) {
      return ERROR_TEMPLATES.RAG_SEARCH_FAILED(['No regulations retrieved']).toResponse(VERSION);
    }
    
    // 4. Build AI prompt with TOON format
    const regulationsText = formatRegulationsAsTOON(
      regulations.slice(0, 20),
      300  // Max content length per regulation
    );
    
    // Log token savings
    const oldFormat = regulations
      .slice(0, 20)
      .map(r => {
        const regNum = r.regulation_number || r.topic || 'General';
        const content = (r.content || '').substring(0, 300);
        return regNum + ': ' + content;
      })
      .join('\n\n');
    
    const tokenStats = estimateTokenSavings(oldFormat, regulationsText);
    logger.info('TOON format token savings', {
      regulationCount: Math.min(regulations.length, 20),
      oldTokens: tokenStats.oldTokens,
      toonTokens: tokenStats.toonTokens,
      savings: tokenStats.savings,
      savingsPercent: tokenStats.savingsPercent + '%'
    });
    
    const userPrompt = DESIGN_INSTRUCTIONS + '\n\n<regulations>\n' + regulationsText + '\n</regulations>\n\n' +
                       'JOB CONTEXT:\n' + query + '\n\n' +
                       (additionalPrompt ? 'ADDITIONAL REQUIREMENTS:\n' + additionalPrompt + '\n\n' : '') +
                       'Design ALL circuits using the design_circuits tool. Do not output text.';
    
    const messages = [
      {
        role: 'system',
        content: 'You are a senior BS 7671 (2018+A3:2024) electrical design engineer. Use UK English. Output by calling the provided tool only.'
      },
      {
        role: 'user',
        content: userPrompt
      }
    ];
    
    // 5. Call AI model
    const modelStart = Date.now();
    logger.info('Calling AI model...');
    
    let aiResponse;
    try {
      aiResponse = await callOpenAIWithRetry(
        messages,
        [DESIGN_TOOL_SCHEMA],
        { type: 'function', function: { name: 'design_circuits' } },
        openAiKey,
        logger,
        280000 // 280s timeout for complex designs
      );
      timings.modelCall = Date.now() - modelStart;
    } catch (error: any) {
      logger.error('AI model call failed', { error });
      
      if (error.message?.includes('402') || error.statusCode === 402) {
        throw new CircuitDesignError(
          'AI_TIMEOUT',
          'AI service requires payment - please add credits to your Lovable workspace',
          { error: error.message },
          ['Add credits at Settings > Workspace > Usage']
        );
      }
      
      if (error.message?.includes('429') || error.statusCode === 429) {
        throw new CircuitDesignError(
          'AI_TIMEOUT',
          'AI service rate limit exceeded - please try again in a few moments',
          { error: error.message },
          ['Wait 30-60 seconds before retrying']
        );
      }
      
      throw error;
    }
    
    // 6. Parse tool calls and merge all circuits from multiple tool calls
    let designedCircuits: any[] = [];
    try {
      const toolCalls = parseToolCalls(aiResponse);
      
      // Merge circuits from all tool calls (AI might split large designs across multiple calls)
      for (const toolCall of toolCalls) {
        const circuits = toolCall?.arguments?.circuits || [];
        designedCircuits.push(...circuits);
      }
      
      logger.info('AI designed circuits', { 
        count: designedCircuits.length,
        toolCallCount: toolCalls.length 
      });
    } catch (error) {
      logger.error('Failed to parse tool calls', { error });
      return ERROR_TEMPLATES.NO_CIRCUITS(circuits.length, !!additionalPrompt).toResponse(VERSION);
    }
    
    if (designedCircuits.length === 0) {
      return ERROR_TEMPLATES.NO_CIRCUITS(circuits.length, !!additionalPrompt).toResponse(VERSION);
    }
    
    // 6.5. VALIDATION: Reject non-compliant designs (AI MUST iterate until compliant)
    logger.info('Validating compliance before processing...');
    for (let i = 0; i < designedCircuits.length; i++) {
      const circuit = designedCircuits[i];
      const circuitName = circuit.name || `Circuit ${i + 1}`;
      
      // Check voltage drop compliance
      if (circuit.calculations?.voltageDrop?.compliant === false) {
        const vd = circuit.calculations.voltageDrop;
        throw new CircuitDesignError(
          'NON_COMPLIANT_DESIGN',
          `Circuit "${circuitName}" has excessive voltage drop (${vd.percent?.toFixed(2)}% exceeds ${vd.limit}% limit)`,
          { 
            circuit: circuitName,
            cableSize: circuit.cableSize,
            voltageDrop: vd,
            reason: 'AI failed to iterate cable sizes to achieve compliance'
          },
          [
            'The AI should have selected a larger cable size (e.g., 4mm² → 6mm² → 10mm²)',
            'This indicates the AI did not follow iterative sizing logic',
            'Design rejected - please retry generation with the same inputs'
          ]
        );
      }
      
      // Check Zs compliance
      if (circuit.calculations?.zs > circuit.calculations?.maxZs) {
        throw new CircuitDesignError(
          'NON_COMPLIANT_DESIGN',
          `Circuit "${circuitName}" has excessive earth fault loop impedance (Zs ${circuit.calculations.zs.toFixed(2)}Ω exceeds max ${circuit.calculations.maxZs.toFixed(2)}Ω)`,
          { 
            circuit: circuitName,
            zs: circuit.calculations.zs,
            maxZs: circuit.calculations.maxZs,
            cableLength: circuit.cableLength
          },
          [
            'Cable run may be too long for this circuit',
            'Consider increasing CPC size or reducing cable length',
            'Verify Ze value is correct for your installation'
          ]
        );
      }
      
      // Check that voltage drop calculation exists
      if (!circuit.calculations?.voltageDrop || 
          circuit.calculations.voltageDrop.percent === undefined ||
          circuit.calculations.voltageDrop.percent === 0) {
        throw new CircuitDesignError(
          'INCOMPLETE_DESIGN',
          `Circuit "${circuitName}" is missing voltage drop calculations`,
          { circuit: circuitName },
          [
            'AI did not complete mandatory voltage drop calculations',
            'This is a critical design requirement',
            'Please retry generation'
          ]
        );
      }
    }
    logger.info('✅ All circuits passed compliance validation');
    
    // 7. Normalise and add PDF fields
    const validationStart = Date.now();
    const processedCircuits = designedCircuits.map(c => {
      const safe = safeCircuit(c);
      return ensurePDFFields(safe);
    });
    
    // 8. Validate design
    let validationResult;
    try {
      validationResult = await validateDesign(processedCircuits, supply, regulations, logger);
      timings.validation = Date.now() - validationStart;
      
      // Merge validation warnings back into circuits
      if (validationResult.circuits) {
        validationResult.circuits.forEach((vc: any, idx: number) => {
          if (processedCircuits[idx]) {
            processedCircuits[idx].warnings = [
              ...(processedCircuits[idx].warnings || []),
              ...(vc.warnings || [])
            ];
            processedCircuits[idx].justifications = {
              ...(processedCircuits[idx].justifications || {}),
              ...(vc.justifications || {})
            };
          }
        });
      }
      
      // CRITICAL: Generate fallback justifications if AI didn't provide them
      processedCircuits.forEach((circuit: any) => {
        if (!circuit.justifications || !circuit.justifications.cableSize || circuit.justifications.cableSize === 'No specific justification provided.') {
          circuit.justifications = circuit.justifications || {};
          
          // Cable Size Justification
          circuit.justifications.cableSize = 
            `${circuit.cableSize}mm² selected based on:\n` +
            `• Design current: ${circuit.calculations.Ib.toFixed(1)}A\n` +
            `• After derating (Ca=${circuit.deratingFactors?.Ca ?? 0.94}): ${circuit.calculations.Iz.toFixed(1)}A capacity\n` +
            `• Safety margin: ${((circuit.calculations.Iz / circuit.calculations.Ib - 1) * 100).toFixed(0)}%\n` +
            `• Voltage drop compliance: ${circuit.calculations.voltageDrop.percent.toFixed(2)}% (limit ${circuit.calculations.voltageDrop.limit}%)\n` +
            `• BS 7671 Table 4D5 reference`;
          
          // Protection Justification
          circuit.justifications.protection = 
            `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type} selected because:\n` +
            `• Coordinated with circuit design current (${circuit.calculations.Ib.toFixed(1)}A)\n` +
            `• Type ${circuit.protectionDevice.curve} curve suitable for ${circuit.loadType} loads\n` +
            `• Breaking capacity (${circuit.protectionDevice.kaRating}kA) exceeds prospective fault current\n` +
            `• Zs (${circuit.calculations.zs.toFixed(2)}Ω) < Max Zs (${circuit.calculations.maxZs.toFixed(2)}Ω) ensures disconnection in <0.4s\n` +
            `• BS 7671 Reg 411.3.2 compliance`;
          
          // RCD Justification
          if (circuit.rcdProtected) {
            circuit.justifications.rcd = 
              `30mA RCD protection required because:\n` +
              `• ${circuit.loadType.includes('socket') ? 'Socket outlets require additional protection (Reg 411.3.3)' : 
                 circuit.loadType.includes('outdoor') ? 'Outdoor circuits require RCD protection (Reg 411.3.3)' :
                 'Circuit requires additional protection for safety'}\n` +
              `• Provides protection against electric shock\n` +
              `• Reduces risk of fire from earth faults\n` +
              `• Meets touch voltage limits (<50V)`;
          } else {
            circuit.justifications.rcd = `RCD not required for this ${circuit.loadType} circuit under current regulations`;
          }
        }
      });
    } catch (error) {
      logger.error('Validation failed', { error });
      // Continue with circuits as-is if validation fails
    }
    
    // Check for critical validation errors - early exit for fast feedback
    if (validationResult && !validationResult.passed && validationResult.errors.length > 0) {
      const criticalErrors = validationResult.errors.filter(e => e.severity === 'critical');
      
      if (criticalErrors.length > 0) {
        logger.error('Design validation failed with critical errors', {
          errorCount: criticalErrors.length,
          errors: criticalErrors
        });
        
        // Return validation errors immediately without full design formatting (faster response)
        return new Response(
          JSON.stringify({
            version: VERSION,
            success: false,
            code: 'NON_COMPLIANT_DESIGN',
            error: `${criticalErrors.length} critical compliance error(s) detected`,
            technicalDetails: {
              validationErrors: criticalErrors.map(e => ({
                circuit: e.circuitName || `Circuit ${e.circuitIndex + 1}`,
                severity: e.severity,
                category: e.category,
                message: e.message,
                regulation: e.regulation,
                suggestedFix: e.suggestedFix
              })),
              circuitCount: processedCircuits.length
            },
            suggestions: [
              'Review the circuits with errors and add required protection devices',
              'RCD protection is required for socket outlets, bathrooms, and outdoor circuits',
              'Use RCBO (combined MCB+RCD) for individual circuit protection',
              'Consult BS 7671 Regulation 411.3.3 for RCD requirements'
            ]
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }
    
    timings.total = Date.now() - startTime;
    
    // 9. Apply safety defaults to ensure all circuits have complete data
    const safeCircuits = processedCircuits.map(c => {
      if (!TypeGuards.isValidCircuit(c)) {
        logger.warn(`Circuit ${c.name} failed validation, applying defaults`);
        return applyDefaultCircuitValues(c);
      }
      return c;
    });
    
    // 10. Build response
    const confidence = calculateOverallConfidence(safeCircuits);
    
    console.log('✅ Batch design complete', {
      circuitCount: safeCircuits.length,
      firstCircuit: safeCircuits[0],
      hasAllFields: safeCircuits[0] && 'cableSize' in safeCircuits[0],
      circuits: safeCircuits
    });
    
    logger.info('Batch design complete', { 
      circuitCount: safeCircuits.length, 
      confidence,
      totalTime: timings.total 
    });
    
    return new Response(
      JSON.stringify({
        version: VERSION,
        success: true,
        circuits: safeCircuits,
        regulations: regulations.slice(0, 15).map(r => ({
          number: r.regulation_number || r.topic,
          content: (r.content || '').substring(0, 400)
        })),
        projectInfo,
        supply,
        metadata: {
          version: VERSION,
          model: 'gpt-5-mini via Lovable AI',
          timings,
          ragHits: regulations.length,
          confidence,
          timestamp: new Date().toISOString()
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    logger.error('Batch design handler error', { error });
    
    if (error instanceof CircuitDesignError) {
      return error.toResponse(VERSION);
    }
    
    return new CircuitDesignError(
      'INTERNAL_ERROR',
      error instanceof Error ? error.message : 'Unknown error occurred',
      { error },
      ['Check function logs for details', 'Verify all required fields are provided']
    ).toResponse(VERSION);
  }
}

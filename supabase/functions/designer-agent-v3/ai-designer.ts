/**
 * AI Designer Module
 * Uses OpenAI GPT-5 Mini with structured tool calling for BS 7671 compliant circuit designs
 */

import { callOpenAI } from '../_shared/ai-providers.ts';
import type { NormalizedInputs, RAGContext, Design, DesignedCircuit } from './types.ts';

export class AIDesigner {
  private openAiKey: string;

  constructor(private logger: any) {
    this.openAiKey = Deno.env.get('OPENAI_API_KEY')!;
    
    if (!this.openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }
  }

  /**
   * Generate circuit designs from normalized inputs and RAG context
   */
  async generate(inputs: NormalizedInputs, context: RAGContext): Promise<Design> {
    this.logger.info('AI Designer starting', {
      circuits: inputs.circuits.length,
      ragResults: context.totalResults
    });

    const startTime = Date.now();

    // Build system prompt with RAG context
    const systemPrompt = this.buildSystemPrompt(context);
    
    // Convert form to structured JSON
    const structuredInput = this.buildStructuredInput(inputs);
    
    // Define tool schema
    const tools = [this.buildDesignTool()];
    const tool_choice = { type: 'function', function: { name: 'design_circuits' } };

    // Call OpenAI with timeout
    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 8000, // Reduced from 12000 (Phase 1.1: saves 5-8s)
        tools,
        tool_choice
      },
      this.openAiKey,
      240000 // 240s timeout (4 minutes max for initial generation)
    );

    const duration = Date.now() - startTime;
    this.logger.info('AI Designer complete', { 
      duration,
      hasToolCalls: !!response.toolCalls 
    });

    // Parse tool call
    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error('No tool calls in AI response');
    }

    const toolCall = response.toolCalls[0];
    const design = JSON.parse(toolCall.function.arguments) as Design;

    // Validate circuit count matches input
    if (design.circuits.length !== inputs.circuits.length) {
      throw new Error(
        `Circuit count mismatch: expected ${inputs.circuits.length}, got ${design.circuits.length}`
      );
    }

    return design;
  }

  /**
   * Build system prompt with RAG context injection
   */
  private buildSystemPrompt(context: RAGContext): string {
    const parts: string[] = [];

    // Core identity with dynamic voltage support (PHASE 1)
    parts.push('You are a BS 7671:2018+A2:2022 electrical circuit design expert.');
    parts.push('Design COMPLIANT circuits using the knowledge base provided.');
    parts.push('Supply voltage and phases vary by installation - use the exact values provided in each request.');
    parts.push('');

    // Inject top regulations (weight 90, top 3 - increased from 2)
    if (context.regulations.length > 0) {
      parts.push('=== KEY REGULATIONS ===');
      context.regulations.slice(0, 3).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    // Design patterns removed - not part of RAG context anymore

    // Inject top practical guides (weight 95, top 3)
    if (context.practicalGuides.length > 0) {
      parts.push('=== PRACTICAL GUIDANCE ===');
      context.practicalGuides.slice(0, 3).forEach(guide => {
        parts.push(`${guide.primary_topic}: ${guide.content || 'See keywords'}`);
        if (guide.bs7671_regulations?.length > 0) {
          parts.push(`  Regulations: ${guide.bs7671_regulations.join(', ')}`);
        }
      });
      parts.push('');
    }

    // MANDATORY OUTPUT FORMAT
    parts.push('=== MANDATORY OUTPUT FORMAT ===');
    parts.push('For EVERY circuit, you MUST provide:');
    parts.push('');
    parts.push('1. AT A GLANCE SUMMARY CARD');
    parts.push('   - loadKw: MUST calculate from circuit loadPower: loadPower/1000 (e.g., 7360W → 7.36)');
    parts.push('   - loadIb: Design current Ib as string with A unit (e.g., "32A")');
    parts.push('   - Cable (size, type)');
    parts.push('   - Protective Device (type, rating, curve)');
    parts.push('   - Voltage Drop (value + "✓ Compliant" or "✗ Non-compliant")');
    parts.push('   - Zs (value + compliance statement)');
    parts.push('   - Compliance Tick (boolean)');
    parts.push('   - Notes (future-proofing, special conditions)');
    parts.push('');
    parts.push('2. EXACTLY 9 SECTIONS (in order, no repeats):');
    parts.push('   1. Circuit Summary');
    parts.push('   2. Load Details');
    parts.push('   3. Cable Selection & Calculation Breakdown');
    parts.push('   4. Protective Device Selection');
    parts.push('   5. Compliance Confirmation');
    parts.push('   6. Design Justification');
    parts.push('   7. Installation Guidance');
    parts.push('   8. Safety Notes');
    parts.push('   9. Testing & Commissioning Guidance');
    parts.push('');
    parts.push('CRITICAL RULES:');
    parts.push('- Never repeat Installation Guidance or any other section');
    parts.push('- Each section must be unique and information-rich');
    parts.push('- Use professional engineering language');
    parts.push('- Include regulation numbers where applicable');
    parts.push('');
    
    // Design rules
    parts.push('=== DESIGN RULES ===');
    parts.push('1. Cable sizing: Ib ≤ In ≤ Iz (Reg 433.1.1)');
    parts.push('2. Voltage drop: ≤3% lighting, ≤5% power (Reg 525.1)');
    parts.push('3. Earth fault protection: Zs ≤ max Zs (Reg 411.3.2)');
    parts.push('4. Socket circuits require RCBO protection for 30mA RCD (Reg 411.3.3)');
    parts.push('5. Bathroom circuits require RCBO protection for RCD (Reg 701.411.3.3)');
    parts.push('6. Use reference method tables for Iz calculation');
    parts.push('7. Calculate voltage drop per Appendix 4 tables');
    parts.push('8. CPC sizing per Reg 543.1.1');
    parts.push('');

    // Output requirements (PHASE 3 & 4: Add installation guidance and reasoning)
    parts.push('=== OUTPUT REQUIREMENTS ===');
    parts.push('- Provide ALL calculations (Ib, In, Iz, VD, Zs)');
    parts.push('- Justify EVERY selection with regulation numbers');
    parts.push('- Include comprehensive installation guidance (routing, termination, testing)');
    parts.push('- Explain your design reasoning and compliance checks');
    parts.push('- Use frontend pre-calculated values as starting hints');
    parts.push('- Ensure voltageDrop.compliant = true');
    parts.push('- Match circuit count exactly');
    parts.push('');
    
    // CRITICAL ENGINEERING VALIDATION
    parts.push('=== CRITICAL ENGINEERING VALIDATION (AUTO-CORRECT SILENTLY) ===');
    parts.push('');
    parts.push('1. THREE-PHASE VOLTAGE ENFORCEMENT:');
    parts.push('   - 3-phase circuits MUST use 400V or 415V ONLY (never 230V)');
    parts.push('   - Auto-correct: If phases="three" and voltage ≠ 400/415, SET voltage=400V');
    parts.push('   - Single-phase circuits use 230V');
    parts.push('');
    parts.push('2. MOTOR FULL LOAD CURRENT (FLC) CALCULATION:');
    parts.push('   - Motors: Calculate FLC = (Power_kW × 1000) / (√3 × Voltage × PF × Efficiency)');
    parts.push('   - PF (power factor) = 0.85 typical for motors');
    parts.push('   - Efficiency = 0.90 typical');
    parts.push('   - Example: 5.5kW motor at 400V → FLC = (5500) / (1.732 × 400 × 0.85 × 0.90) = 10.4A');
    parts.push('   - Design current Ib = FLC × 1.25 (motor starting allowance)');
    parts.push('   - Protection device: Use Type D MCB rated at Ib (to handle 10-14x FLC starting surge)');
    parts.push('');
    parts.push('=== MOTOR CIRCUIT SPECIAL RULES ===');
    parts.push('- If loadType contains "motor" or "pump" or "compressor":');
    parts.push('  1. Calculate motor FLC = (Power_kW × 1000) / (√3 × 400 × 0.85 × 0.90) for 3-phase');
    parts.push('  2. Calculate motor FLC = (Power_kW × 1000) / (230 × 0.95) for single-phase');
    parts.push('  3. Design current Ib = FLC × 1.25 (starting allowance per Reg 552.1.1)');
    parts.push('  4. Protection device: Type D MCB to handle 10-14x FLC starting surge');
    parts.push('  5. Cable sizing: Use Ib for current-carrying capacity check');
    parts.push('  6. Voltage drop: Check at FLC (running), must be ≤5%');
    parts.push('  7. Document in justifications: "Motor circuit designed for FLC=XA, starting current ~10x FLC"');
    parts.push('');
    parts.push('=== RCBO PROTECTION MANDATORY RULES ===');
    parts.push('1. ALL socket circuits MUST use RCBO protection (never MCB)');
    parts.push('   - Includes: wall sockets, power outlets, socket rings, radial sockets');
    parts.push('   - Regulation: 411.3.3 - Additional protection by RCD');
    parts.push('');
    parts.push('2. ALL bathroom circuits MUST use RCBO protection');
    parts.push('   - Includes: lights, extractors, shaver sockets, heated towel rails');
    parts.push('   - Regulation: 701.411.3.3 - Special locations');
    parts.push('');
    parts.push('3. Auto-correct rule:');
    parts.push('   - If loadType contains "socket" OR specialLocation contains "bathroom"');
    parts.push('   - SET protectionDevice.type = "RCBO"');
    parts.push('   - Document in justifications: "RCBO required per BS 7671:2018+A3 Reg 411.3.3/701.411.3.3"');
    parts.push('');
    parts.push('EXCEPTION: Lighting circuits in NON-bathroom locations may use MCB');
    parts.push('');
    parts.push('3. CABLE CSA RESTRICTED TO REAL SIZES:');
    parts.push('   - T&E (Twin & Earth) valid sizes: 1.5, 2.5, 4, 6, 10, 16mm²');
    parts.push('   - SWA (Steel Wire Armoured) valid sizes: 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95mm²');
    parts.push('   - Auto-correct: Round UP to nearest valid size if calculated size is non-standard');
    parts.push('   - Example: 3.2mm² calculated → use 4mm²');
    parts.push('');
    parts.push('4. CPC SIZING PER BS 7671 TABLE 54.7:');
    parts.push('   - CPC must maintain correct ratio to live conductor per Table 54.7');
    parts.push('   - Standard ratios (live → CPC):');
    parts.push('     * 1.5mm² → 1.0mm² CPC');
    parts.push('     * 2.5mm² → 1.5mm² CPC');
    parts.push('     * 4mm² → 2.5mm² CPC (or 4mm² for outdoor/high-risk)');
    parts.push('     * 6mm² → 2.5mm² CPC (or 4mm² for outdoor)');
    parts.push('     * 10mm² → 4mm² CPC (or 6mm² for outdoor)');
    parts.push('     * 16mm² → 6mm² CPC');
    parts.push('     * 25mm²+ → use same size or calculate per adiabatic equation');
    parts.push('   - Auto-correct: If CPC undersized, increase to Table 54.7 minimum');
    parts.push('   - Outdoor/buried circuits: Use 75% safety margin on Zs, may need larger CPC');
    parts.push('');
    parts.push('5. SWA ARMOUR SIZING VALIDATION:');
    parts.push('   - SWA armour acts as CPC - must meet Table 54.7 requirements');
    parts.push('   - 2-core SWA: Armour CSA typically 16-95mm² depending on cable size');
    parts.push('   - 3-core SWA: Armour CSA typically 16-120mm² depending on cable size');
    parts.push('   - 4-core SWA: Armour CSA typically 25-150mm² depending on cable size');
    parts.push('   - Auto-correct: For SWA, if armour CSA < required CPC, add separate CPC or upsize cable');
    parts.push('');
    parts.push('6. INSTALLATION METHOD MATCHES CABLE TYPE:');
    parts.push('   - T&E cable → Methods A, B, C (clipped direct, conduit, trunking) - NOT buried');
    parts.push('   - SWA cable → Methods B, C, D (conduit, clipped, buried/ducting)');
    parts.push('   - Outdoor/buried → MUST use SWA (never T&E)');
    parts.push('   - Auto-correct examples:');
    parts.push('     * Input: "outdoor socket with T&E" → Change to "SWA cable"');
    parts.push('     * Input: "buried T&E" → Change to "SWA cable, Method D - buried"');
    parts.push('     * Input: "SWA Method A" → Change to "SWA Method C - clipped direct"');
    parts.push('');
    parts.push('7. SILENT AUTO-CORRECTION POLICY:');
    parts.push('   - NEVER output warnings, amber states, or "non-compliant" flags to user');
    parts.push('   - Auto-correct ALL violations before final output');
    parts.push('   - Document corrections in justifications.corrections field');
    parts.push('   - Example: "Voltage corrected from 230V to 400V for 3-phase motor circuit per BS 7671 requirements"');
    parts.push('');
    
    parts.push('=== CRITICAL FIELD REQUIREMENTS ===');
    parts.push('- ALWAYS include circuitNumber (sequential from 1)');
    parts.push('- ALWAYS copy loadPower from input');
    parts.push('- ALWAYS copy phases from input (single or three)');
    parts.push('- ALWAYS set voltage (230V single-phase, 400V/415V three-phase)');
    parts.push('- ALWAYS copy cableLength from input');
    parts.push('- ALWAYS provide installationMethod (e.g., "Method C - clipped direct")');
    parts.push('- ALWAYS set rcdProtected (true if RCBO or special location requires RCD)');
    parts.push('- ALWAYS generate full cableType description');
    parts.push('- ALWAYS use RCBO for socket outlets and bathroom circuits (not plain MCB)');

    return parts.join('\n');
  }

  /**
   * Build optimized system prompt for batch processing
   */
  private buildBatchSystemPrompt(
    context: RAGContext,
    circuitCount: number,
    batchNumber: number,
    totalBatches: number
  ): string {
    const parts: string[] = [];

    parts.push('You are a BS 7671:2018+A2:2022 electrical circuit design expert.');
    parts.push(`Designing batch ${batchNumber}/${totalBatches} with ${circuitCount} circuits.`);
    parts.push('');

    // OPTIMIZATION: Reduce RAG context for batches with 6+ circuits
    const ragLimit = circuitCount >= 6 ? 2 : 3; // Top 2 vs top 3

    if (context.regulations.length > 0) {
      parts.push('=== KEY REGULATIONS ===');
      context.regulations.slice(0, ragLimit).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    if (context.practicalGuides.length > 0) {
      parts.push('=== PRACTICAL GUIDANCE ===');
      context.practicalGuides.slice(0, ragLimit).forEach(guide => {
        parts.push(`${guide.primary_topic}: ${guide.content || 'See keywords'}`);
        if (guide.bs7671_regulations?.length > 0) {
          parts.push(`  Regulations: ${guide.bs7671_regulations.join(', ')}`);
        }
      });
      parts.push('');
    }

    // MANDATORY OUTPUT FORMAT
    parts.push('=== MANDATORY OUTPUT FORMAT ===');
    parts.push('For EVERY circuit, you MUST provide:');
    parts.push('');
    parts.push('1. AT A GLANCE SUMMARY CARD');
    parts.push('   - loadKw: MUST calculate from circuit loadPower: loadPower/1000 (e.g., 7360W → 7.36)');
    parts.push('   - loadIb: Design current Ib as string with A unit (e.g., "32A")');
    parts.push('   - Cable (size, type)');
    parts.push('   - Protective Device (type, rating, curve)');
    parts.push('   - Voltage Drop (value + "✓ Compliant" or "✗ Non-compliant")');
    parts.push('   - Zs (value + compliance statement)');
    parts.push('   - Compliance Tick (boolean)');
    parts.push('   - Notes (future-proofing, special conditions)');
    parts.push('');
    parts.push('2. EXACTLY 9 SECTIONS (in order, no repeats):');
    parts.push('   1. Circuit Summary');
    parts.push('   2. Load Details');
    parts.push('   3. Cable Selection & Calculation Breakdown');
    parts.push('   4. Protective Device Selection');
    parts.push('   5. Compliance Confirmation');
    parts.push('   6. Design Justification');
    parts.push('   7. Installation Guidance');
    parts.push('   8. Safety Notes');
    parts.push('   9. Testing & Commissioning Guidance');
    parts.push('');
    parts.push('CRITICAL RULES:');
    parts.push('- Never repeat Installation Guidance or any other section');
    parts.push('- Each section must be unique and information-rich');
    parts.push('- Use professional engineering language');
    parts.push('- Include regulation numbers where applicable');
    parts.push('');

    // Design rules (same as standard prompt)
    parts.push('=== DESIGN RULES ===');
    parts.push('1. Cable sizing: Ib ≤ In ≤ Iz (Reg 433.1.1)');
    parts.push('2. Voltage drop: ≤3% lighting, ≤5% power (Reg 525.1)');
    parts.push('3. Earth fault protection: Zs ≤ max Zs (Reg 411.3.2)');
    parts.push('4. Socket circuits require RCBO protection for 30mA RCD (Reg 411.3.3)');
    parts.push('5. Bathroom circuits require RCBO protection for RCD (Reg 701.411.3.3)');
    parts.push('6. Use reference method tables for Iz calculation');
    parts.push('7. Calculate voltage drop per Appendix 4 tables');
    parts.push('8. CPC sizing per Reg 543.1.1');
    parts.push('');
    
    // CRITICAL ENGINEERING VALIDATION (SAME AS SINGLE MODE)
    parts.push('=== CRITICAL ENGINEERING VALIDATION (AUTO-CORRECT SILENTLY) ===');
    parts.push('');
    parts.push('1. THREE-PHASE VOLTAGE: 3-phase MUST use 400V or 415V ONLY');
    parts.push('2. MOTOR FLC: Calculate FLC = (kW×1000)/(√3×V×0.85×0.90), Ib = FLC×1.25, Type D MCB');
    parts.push('3. CABLE CSA: T&E: 1.5-16mm², SWA: 1.5-95mm², round UP to nearest valid size');
    parts.push('4. CPC SIZING: Per Table 54.7, outdoor circuits need larger CPC for Zs');
    parts.push('5. RCBO MANDATORY: ALL socket circuits = RCBO (never MCB), ALL bathroom circuits = RCBO');
    parts.push('6. AUTO-CORRECT: If loadType contains "socket" OR specialLocation contains "bathroom", SET type="RCBO"');
    parts.push('5. SWA ARMOUR: Verify armour CSA meets CPC requirements');
    parts.push('6. CABLE TYPE: Outdoor/buried MUST use SWA (never T&E)');
    parts.push('7. AUTO-CORRECT: Silently fix all violations, document in justifications.corrections');
    parts.push('');

    parts.push('=== OUTPUT REQUIREMENTS ===');
    parts.push('- Design ALL circuits in this batch');
    parts.push('- ALWAYS copy loadPower from input');
    parts.push('- ALWAYS copy phases from input (single or three)');
    parts.push('- ALWAYS set voltage (230V single-phase, 400V/415V three-phase)');
    parts.push('- ALWAYS copy cableLength from input');
    parts.push('- ALWAYS provide installationMethod (e.g., "Method C - clipped direct")');
    parts.push('- ALWAYS set rcdProtected (true if RCBO or special location requires RCD)');
    parts.push('- ALWAYS generate full cableType description');
    parts.push('- ALWAYS use RCBO for socket outlets and bathroom circuits (not plain MCB)');

    return parts.join('\n');
  }

  /**
   * OPTIMIZED: Generate correction with reduced tokens and optimized prompt
   * Only sends validation errors + essential context (no full RAG re-injection)
   */
  async generateCorrection(
    inputs: NormalizedInputs,
    originalDesign: Design,
    validationErrors: string
  ): Promise<Design> {
    this.logger.info('AI Correction starting (optimized)', {
      circuits: inputs.circuits.length
    });

    const startTime = Date.now();

    // Lightweight correction prompt (no RAG context)
    const correctionPrompt = this.buildCorrectionPrompt(validationErrors, originalDesign);
    
    // Convert form to structured JSON
    const structuredInput = this.buildStructuredInput(inputs);
    
    // Define tool schema
    const tools = [this.buildDesignTool()];
    const tool_choice = { type: 'function', function: { name: 'design_circuits' } };

    // Call OpenAI with REDUCED tokens for correction (8000 vs 16000)
    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: correctionPrompt },
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 8000, // OPTIMIZATION: 50% reduction
        tools,
        tool_choice
      },
      this.openAiKey,
      120000 // 120s timeout (2 minutes - correction buffer)
    );

    const duration = Date.now() - startTime;
    this.logger.info('AI Correction complete', { 
      duration,
      circuits: response.toolCalls?.[0] ? JSON.parse(response.toolCalls[0].function.arguments).circuits.length : 0,
      hasToolCalls: !!response.toolCalls
    });

    // Parse tool call
    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error('No tool calls in AI correction response');
    }

    const toolCall = response.toolCalls[0];
    const design = JSON.parse(toolCall.function.arguments) as Design;

    // Validate circuit count matches input
    if (design.circuits.length !== inputs.circuits.length) {
      throw new Error(
        `Circuit count mismatch in correction: expected ${inputs.circuits.length}, got ${design.circuits.length}`
      );
    }

    return design;
  }

  /**
   * Generate design for a batch of circuits (batch processing mode)
   */
  async generateBatch(
    inputs: NormalizedInputs,
    context: RAGContext,
    batchNumber: number,
    totalBatches: number
  ): Promise<Design> {
    this.logger.info('AI Designer Batch starting (parallel)', {
      batch: `${batchNumber}/${totalBatches}`,
      circuits: inputs.circuits.length,
      ragResults: context.totalResults
    });

    const startTime = Date.now();

    // Build system prompt with REDUCED RAG context for large batches
    const systemPrompt = this.buildBatchSystemPrompt(
      context,
      inputs.circuits.length,
      batchNumber,
      totalBatches
    );

    const structuredInput = this.buildStructuredInput(inputs);
    const tools = [this.buildDesignTool()];
    const tool_choice = { type: 'function', function: { name: 'design_circuits' } };

    // REDUCED timeout for batch processing (90s per batch vs 240s for full)
    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 10000, // Slightly reduced from 12000
        tools,
        tool_choice
      },
      this.openAiKey,
      180000 // 180s timeout per batch (3 minutes)
    );

    const duration = Date.now() - startTime;
    this.logger.info('AI Designer Batch complete (parallel)', {
      batch: `${batchNumber}/${totalBatches}`,
      duration,
      circuits: response.toolCalls?.[0] ? JSON.parse(response.toolCalls[0].function.arguments).circuits.length : 0
    });

    // Parse and validate
    if (!response.toolCalls || response.toolCalls.length === 0) {
      throw new Error(`No tool calls in AI batch ${batchNumber} response`);
    }

    const toolCall = response.toolCalls[0];
    const design = JSON.parse(toolCall.function.arguments) as Design;

    if (design.circuits.length !== inputs.circuits.length) {
      throw new Error(
        `Batch ${batchNumber}: Circuit count mismatch: expected ${inputs.circuits.length}, got ${design.circuits.length}`
      );
    }

    return design;
  }

  /**
   * Build optimized correction prompt (no RAG re-injection)
   */
  private buildCorrectionPrompt(validationErrors: string, originalDesign: Design): string {
    const parts: string[] = [];
    
    parts.push('You are a BS 7671:2018+A2:2022 electrical circuit design expert.');
    parts.push('');
    parts.push('=== CORRECTION MODE ===');
    parts.push('The previous design failed validation. Fix ONLY the errors listed below.');
    parts.push('Keep all compliant aspects of the design unchanged.');
    parts.push('');
    parts.push('=== VALIDATION ERRORS ===');
    parts.push(validationErrors);
    parts.push('');
    parts.push('=== ORIGINAL DESIGN (for reference) ===');
    parts.push(JSON.stringify(originalDesign.circuits.map(c => ({
      name: c.name,
      cableSize: c.cableSize,
      protectionRating: c.protectionDevice.rating,
      calculations: c.calculations
    })), null, 2));
    parts.push('');
    parts.push('=== FIX INSTRUCTIONS ===');
    parts.push('1. If In > Iz: Increase cable size or reduce MCB rating');
    parts.push('2. If voltage drop fails: Increase cable size');
    parts.push('3. If Zs too high: Increase CPC size');
    parts.push('4. If RCD protection required: Change MCB to RCBO (sockets and bathrooms need RCD per 411.3.3)');
    parts.push('5. Preserve all regulation citations and installation guidance');
    
    return parts.join('\n');
  }

  /**
   * Convert normalized form to structured JSON input
   */
  private buildStructuredInput(inputs: NormalizedInputs): object {
    return {
      supply: {
        voltage: inputs.supply.voltage,
        phases: inputs.supply.phases,
        ze: inputs.supply.ze,
        earthing: inputs.supply.earthing,
        installationType: inputs.supply.installationType
      },
      circuits: inputs.circuits.map((c, idx) => ({
        index: idx,
        name: c.name,
        loadType: c.loadType,
        loadPower: c.loadPower,
        cableLength: c.cableLength,
        phases: c.phases,
        specialLocation: c.specialLocation,
        installMethod: c.installMethod,
        protectionType: c.protectionType,
        bathroomZone: c.bathroomZone,
        outdoorInstall: c.outdoorInstall,
        // Frontend pre-calculations (use as hints)
        hints: {
          calculatedIb: c.calculatedIb,
          suggestedMCB: c.suggestedMCB,
          calculatedDiversity: c.calculatedDiversity,
          estimatedCableSize: c.estimatedCableSize
        }
      }))
    };
  }

  /**
   * Build strict tool schema for design_circuits function
   */
  private buildDesignTool(): object {
    return {
      type: 'function',
      function: {
        name: 'design_circuits',
        description: 'Design BS 7671 compliant electrical circuits. CRITICAL AUTO-CORRECTIONS: (1) 3-phase = 400/415V only, (2) ALL socket circuits = RCBO (never MCB), (3) Bathroom circuits = RCBO, (4) Motor FLC calculations mandatory, (5) Cable sizes must be standard T&E/SWA, (6) CPC per Table 54.7.',
        parameters: {
          type: 'object',
          properties: {
            circuits: {
              type: 'array',
              description: 'Array of designed circuits (must match input count)',
              items: {
                type: 'object',
                properties: {
                  name: { 
                    type: 'string',
                    description: 'Circuit name from input'
                  },
                  loadType: {
                    type: 'string',
                    description: 'Load type from input (e.g., socket_outlet, lighting, cooker, shower)'
                  },
                  specialLocation: {
                    type: 'string',
                    description: 'Special location from input (bathroom, outdoor, none, etc.)'
                  },
                  circuitNumber: {
                    type: 'number',
                    description: 'Circuit number (sequential from 1)'
                  },
                  loadPower: {
                    type: 'number',
                    description: 'Load power in Watts (use from input or calculate from Ib * voltage)'
                  },
                  phases: {
                    type: 'string',
                    enum: ['single', 'three'],
                    description: 'Phase configuration from input (single or three)'
                  },
                  voltage: {
                    type: 'number',
                    enum: [110, 230, 400, 415],
                    description: 'Operating voltage: 230V single-phase, 400V or 415V three-phase, 110V site supply. THREE-PHASE MUST USE 400V OR 415V ONLY.'
                  },
                  cableLength: {
                    type: 'number',
                    description: 'Cable length in meters (use from input)'
                  },
                  installationMethod: {
                    type: 'string',
                    description: 'Installation method reference (e.g., "Method C - clipped direct", "Method B - enclosed in conduit")'
                  },
                  cableType: {
                    type: 'string',
                    description: 'Full cable description (e.g., "6mm² twin and earth with 2.5mm² CPC, 70°C thermoplastic insulation")'
                  },
                  rcdProtected: {
                    type: 'boolean',
                    description: 'Whether circuit requires RCD protection (true if RCBO or special location)'
                  },
                  cableSize: {
                    type: 'number',
                    enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0],
                    description: 'Live conductor CSA in mm². T&E: 1.5-16mm². SWA: 1.5-95mm². Must be standard size per BS 7671 Appendix 4.'
                  },
                  cpcSize: { 
                    type: 'number',
                    enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0],
                    description: 'CPC conductor CSA in mm² per BS 7671 Table 54.7. Must maintain correct ratio to live conductor. Outdoor circuits may need larger CPC for Zs compliance.'
                  },
                  protectionDevice: {
                    type: 'object',
                    properties: {
                      type: { 
                        type: 'string',
                        enum: ['MCB', 'RCBO'],
                        description: 'Protection device type. IMPORTANT: Use RCBO for ALL socket circuits (Reg 411.3.3) and bathroom circuits (Reg 701.411.3.3). Use MCB only for lighting and fixed equipment.'
                      },
                      rating: { 
                        type: 'number',
                        enum: [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100],
                        description: 'MCB/RCBO rating in Amps'
                      },
                      curve: { 
                        type: 'string',
                        enum: ['B', 'C', 'D'],
                        description: 'B for resistive, C for general, D for motors'
                      },
                      kaRating: { 
                        type: 'number',
                        enum: [6, 10],
                        description: 'Short circuit breaking capacity (6kA domestic, 10kA commercial)'
                      }
                    },
                    required: ['type', 'rating', 'curve', 'kaRating']
                  },
                  calculations: {
                    type: 'object',
                    description: 'All BS 7671 calculations',
                    properties: {
                      Ib: { 
                        type: 'number',
                        description: 'Design current in Amps (load / voltage)'
                      },
                      In: { 
                        type: 'number',
                        description: 'Nominal current of protection device in Amps'
                      },
                      Iz: { 
                        type: 'number',
                        description: 'Current carrying capacity of cable in Amps (from tables)'
                      },
                      voltageDrop: {
                        type: 'object',
                        properties: {
                          volts: { 
                            type: 'number',
                            description: 'Voltage drop in Volts'
                          },
                          percent: { 
                            type: 'number',
                            description: 'Voltage drop as percentage'
                          },
                          limit: { 
                            type: 'number',
                            description: 'Permitted limit (3% or 5%)'
                          },
                          compliant: { 
                            type: 'boolean',
                            description: 'True if percent <= limit'
                          }
                        },
                        required: ['volts', 'percent', 'limit', 'compliant']
                      },
                      zs: { 
                        type: 'number',
                        description: 'Earth fault loop impedance in Ohms'
                      },
                      maxZs: { 
                        type: 'number',
                        description: 'Maximum permitted Zs in Ohms (from tables)'
                      }
                    },
                    required: ['Ib', 'In', 'Iz', 'voltageDrop', 'zs', 'maxZs']
                  },
                  justifications: {
                    type: 'object',
                    description: 'Regulation-based justifications',
                    properties: {
                      cableSize: { 
                        type: 'string',
                        description: 'Why this cable size? (reference Iz table, method, Ib≤In≤Iz)'
                      },
                      protection: { 
                        type: 'string',
                        description: 'Why this MCB/RCBO? (curve selection, rating, Zs compliance)'
                      },
                      rcd: { 
                        type: 'string',
                        description: 'If RCBO used, justify why RCD is required (location, load type)'
                      },
                      corrections: {
                        type: 'string',
                        description: 'PHASE 2: If in correction mode, explain what was changed and why'
                      }
                    },
                    required: ['cableSize', 'protection']
                  },
                  installationGuidance: {
                    type: 'object',
                    description: 'PHASE 3: Practical installation guidance for electricians',
                    properties: {
                      cableRouting: {
                        type: 'string',
                        description: 'How to route the cable (clip spacing, conduit size, tray spacing)'
                      },
                      terminationAdvice: {
                        type: 'string',
                        description: 'Termination best practices (ferrules, torque settings, connection method)'
                      },
                      testingRequirements: {
                        type: 'string',
                        description: 'Required tests (R1+R2, Zs, insulation, polarity, RCD trip time)'
                      },
                      safetyNotes: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Safety warnings and precautions'
                      },
                      toolsRequired: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Specific tools needed for this circuit'
                      },
                      estimatedInstallTime: {
                        type: 'string',
                        description: 'Estimated installation time (e.g., "2-3 hours")'
                      }
                    },
                    required: ['cableRouting', 'terminationAdvice', 'testingRequirements', 'safetyNotes']
                  },
                  structuredOutput: {
                    type: 'object',
                    description: 'PHASE 5: MANDATORY structured output for professional engineering format',
                    properties: {
                      atAGlanceSummary: {
                        type: 'object',
                        description: 'Summary card with key design parameters',
                        properties: {
                          loadKw: { type: 'number', description: 'Load in kW - CALCULATE from loadPower: loadPower/1000 (e.g., 7360W → 7.36)' },
                          loadIb: { type: 'string', description: 'Design current Ib with unit (e.g., "32A")' },
                          cable: { type: 'string', description: 'Cable specification (e.g., "6mm² twin & earth with 2.5mm² CPC")' },
                          protectiveDevice: { type: 'string', description: 'Protection (e.g., "40A Type B MCB (6kA)")' },
                          voltageDrop: { type: 'string', description: 'VD result with compliance (e.g., "6.2V (2.7%) ✓ Compliant")' },
                          zs: { type: 'string', description: 'Zs with compliance (e.g., "0.68Ω ✓ Well within 1.37Ω limit")' },
                          complianceTick: { type: 'boolean', description: 'Overall compliance (true if all checks pass)' },
                          notes: { type: 'string', description: 'Future-proofing or special conditions (e.g., "Designed with 20% safety margin for future EV charger upgrade")' }
                        },
                        required: ['loadKw', 'loadIb', 'cable', 'protectiveDevice', 'voltageDrop', 'zs', 'complianceTick', 'notes']
                      },
                      sections: {
                        type: 'object',
                        description: 'EXACTLY 9 sections in strict order - NO REPETITION',
                        properties: {
                          circuitSummary: { 
                            type: 'string', 
                            description: '1. Circuit Summary: Overview of the circuit purpose, load served, and installation context (100-150 words)' 
                          },
                          loadDetails: { 
                            type: 'string', 
                            description: '2. Load Details: Detailed load analysis including power factor, diversity, and current calculations (100-150 words)' 
                          },
                          cableSelectionBreakdown: { 
                            type: 'string', 
                            description: '3. Cable Selection & Calculation Breakdown: Full cable sizing logic with Iz tables, derating factors, and voltage drop calculations (150-200 words)' 
                          },
                          protectiveDeviceSelection: { 
                            type: 'string', 
                            description: '4. Protective Device Selection: MCB/RCBO selection with curve justification, Zs compliance, and fault current analysis (100-150 words)' 
                          },
                          complianceConfirmation: { 
                            type: 'string', 
                            description: '5. Compliance Confirmation: BS 7671 regulation verification with specific regulation numbers (411.3.2, 433.1, etc.) (100-150 words)' 
                          },
                          designJustification: { 
                            type: 'string', 
                            description: '6. Design Justification: Professional engineering rationale for design choices and safety margins (100-150 words)' 
                          },
                          installationGuidance: { 
                            type: 'string', 
                            description: '7. Installation Guidance: Practical step-by-step installation instructions ONLY HERE - cable routing, fixing, terminations (150-200 words)' 
                          },
                          safetyNotes: { 
                            type: 'string', 
                            description: '8. Safety Notes: Critical safety warnings, isolation requirements, and safe working practices (100-150 words)' 
                          },
                          testingCommissioningGuidance: { 
                            type: 'string', 
                            description: '9. Testing & Commissioning Guidance: Required tests (R1+R2, Zs, insulation, RCD), expected results, and acceptance criteria (150-200 words)' 
                          }
                        },
                        required: [
                          'circuitSummary', 
                          'loadDetails', 
                          'cableSelectionBreakdown', 
                          'protectiveDeviceSelection', 
                          'complianceConfirmation', 
                          'designJustification', 
                          'installationGuidance', 
                          'safetyNotes', 
                          'testingCommissioningGuidance'
                        ]
                      }
                    },
                    required: ['atAGlanceSummary', 'sections']
                  }
                },
                required: [
                  'circuitNumber',
                  'name', 
                  'loadType', 
                  'loadPower',
                  'phases',
                  'voltage',
                  'cableLength',
                  'installationMethod',
                  'specialLocation', 
                  'cableSize', 
                  'cpcSize',
                  'cableType',
                  'protectionDevice',
                  'rcdProtected',
                  'calculations', 
                  'justifications', 
                  'installationGuidance',
                  'structuredOutput'
                ]
              }
            },
            reasoning: {
              type: 'object',
              description: 'PHASE 4: Overall design reasoning and compliance verification',
              properties: {
                voltageContext: {
                  type: 'string',
                  description: 'Explain voltage selection implications (110V/230V/400V, single/three-phase)'
                },
                cableSelectionLogic: {
                  type: 'string',
                  description: 'Overall strategy for cable sizing across all circuits'
                },
                protectionLogic: {
                  type: 'string',
                  description: 'Protection device selection strategy and coordination'
                },
                complianceChecks: {
                  type: 'string',
                  description: 'Summary of BS 7671 compliance verification performed'
                },
                correctionsApplied: {
                  type: 'string',
                  description: 'If in correction mode, explain all corrections made'
                }
              },
              required: ['voltageContext', 'cableSelectionLogic', 'protectionLogic', 'complianceChecks']
            }
          },
          required: ['circuits', 'reasoning'],
          additionalProperties: false
        }
      }
    };
  }
}

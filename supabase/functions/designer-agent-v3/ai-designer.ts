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

    // Detect installation type from circuits
    const installationType = this.detectInstallationType(inputs);

    // Build system prompt with RAG context and installation type
    const systemPrompt = this.buildSystemPrompt(context, installationType);
    
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
      360000 // 360s timeout (6 minutes for complex multi-circuit designs)
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
   * Build system prompt with RAG context injection (OPTIMIZED - 50% reduction)
   */
  private buildSystemPrompt(context: RAGContext, installationType?: string): string {
    const parts: string[] = [];

    // Enhanced core identity with installation type context
    parts.push('You are a BS 7671:2018+A3:2024 electrical circuit design expert. Design COMPLIANT circuits using the provided knowledge base. Use exact voltage/phase values from each request.');
    parts.push('');
    
    // Installation type context
    const type = installationType || 'general';
    if (type === 'domestic') {
      parts.push('=== DOMESTIC INSTALLATION CONTEXT ===');
      parts.push('- Typically single-phase 230V supply, rarely three-phase');
      parts.push('- Focus on socket circuits (ring finals/radials), lighting, showers, cookers');
      parts.push('- RCBO protection mandatory for ALL socket circuits (411.3.3)');
      parts.push('- Standard cable types: Twin & Earth (T&E) for internal, SWA for external/buried');
      parts.push('- Typical max demand: 60-100A per dwelling');
      parts.push('');
    } else if (type === 'commercial') {
      parts.push('=== COMMERCIAL INSTALLATION CONTEXT ===');
      parts.push('- Often three-phase 400V supply for larger loads');
      parts.push('- Higher diversity factors, larger distribution boards');
      parts.push('- More SWA cable usage for sub-mains and outdoor runs');
      parts.push('- Consider fire alarm systems, emergency lighting, data circuits');
      parts.push('- Discrimination between protective devices critical');
      parts.push('');
    } else if (type === 'industrial') {
      parts.push('=== INDUSTRIAL INSTALLATION CONTEXT ===');
      parts.push('- Predominantly three-phase 400V, sometimes higher voltages');
      parts.push('- Large motor loads, heavy machinery, high-power equipment');
      parts.push('- SWA cable standard for most circuits, often larger sizes (>16mm²)');
      parts.push('- Type D MCBs common for motors, contactors, and DOL starters');
      parts.push('- Consider fault levels, discrimination, and starting currents');
      parts.push('');
    }
    parts.push('');

    // Inject Regulations Intelligence
    if (context.regulations && context.regulations.length > 0) {
      parts.push('=== REGULATIONS INTELLIGENCE ===');
      context.regulations.slice(0, 5).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    // Inject Design Knowledge Intelligence (enriched facets only)
    if (context.designKnowledge && context.designKnowledge.length > 0) {
      parts.push('=== DESIGN KNOWLEDGE INTELLIGENCE ===');
      
      context.designKnowledge.slice(0, 6).forEach(facet => {
        parts.push(`\n[${facet.facet_type.toUpperCase()}] ${facet.primary_topic}`);
        
        // Core content
        if (facet.content) {
          parts.push(`${facet.content}`);
        }
        
        // Formulas
        if (facet.formulas && facet.formulas.length > 0) {
          parts.push(`📐 Formulas: ${facet.formulas.join(' | ')}`);
        }
        
        // Calculation steps
        if (facet.calculation_steps && facet.calculation_steps.length > 0) {
          parts.push(`🔢 Steps: ${facet.calculation_steps.join(' → ')}`);
        }
        
        // Worked examples
        if (facet.worked_examples && facet.worked_examples.length > 0) {
          const examples = facet.worked_examples.slice(0, 2).map(ex => 
            typeof ex === 'string' ? ex : JSON.stringify(ex)
          );
          parts.push(`💡 Examples: ${examples.join(' | ')}`);
        }
        
        // BS 7671 references
        if (facet.bs7671_regulations && facet.bs7671_regulations.length > 0) {
          parts.push(`📖 Regs: ${facet.bs7671_regulations.join(', ')}`);
        }
        
        // Table references
        if (facet.table_refs && facet.table_refs.length > 0) {
          parts.push(`📊 Tables: ${facet.table_refs.join(', ')}`);
        }
        
        // Common mistakes
        if (facet.common_mistakes && facet.common_mistakes.length > 0) {
          parts.push(`⚠️ Avoid: ${facet.common_mistakes.join('; ')}`);
        }
        
        // Typical values
        if (facet.typical_values) {
          parts.push(`📋 Typical Values: ${JSON.stringify(facet.typical_values)}`);
        }
      });
      parts.push('');
    }

    // Output format
    parts.push('=== OUTPUT FORMAT ===');
    parts.push('1. AT A GLANCE CARD: loadKw (loadPower/1000), loadIb (Ib with unit), Cable, Device, VD (pass/fail), Zs, Compliance, Notes');
    parts.push('2. 9 SECTIONS: Circuit Summary, Load Details, Cable Selection & Calc, Device Selection, Compliance, Justification, Installation Context (basic electrical only), Safety, Testing');
    parts.push('3. INSTALLATION: Provide only electrical installation method reference, basic termination requirements, and required tests. Detailed practical work methods handled by installation specialist agent.');
    parts.push('');
    
    // === YOUR ROLE ===
    parts.push('=== YOUR ROLE ===');
    parts.push('You are a BS 7671:2018+A3:2024 electrical circuit design expert.');
    parts.push('USE THE KNOWLEDGE BASE ABOVE to design compliant circuits.');
    parts.push('APPLY the formulas, tables, regulations, and examples from the intelligence sections.');
    parts.push('SHOW YOUR WORKING using calculation steps from the knowledge base.');
    parts.push('CITE specific regulation numbers and table references from the RAG results.');
    parts.push('');

    // === OUTPUT REQUIREMENTS ===
    parts.push('=== OUTPUT REQUIREMENTS ===');
    parts.push('1. Design circuits that comply with BS 7671 regulations found in knowledge base');
    parts.push('2. Show calculations using formulas from Design Knowledge Intelligence');
    parts.push('3. Reference tables explicitly (e.g., "Table 54.7: 2.5mm² conductor resistance = 7.41 mΩ/m")');
    parts.push('4. Cite regulation numbers in justifications (e.g., "per 433.1.1", "Table 41.3")');
    parts.push('5. Use exact voltage/phase values from each circuit request');
    parts.push('');

    // === INSTALLATION NOTES ===
    parts.push('=== INSTALLATION NOTES ===');
    parts.push('Provide "installationNotes" as a STRING (2-4 sentences max).');
    parts.push('Include: installation method reference, basic termination, required tests.');
    parts.push('Do NOT generate "installationGuidance" object - handled by specialist agent.');
    parts.push('');
    
    // === CALCULATIONS SCHEMA ===
    parts.push('=== CALCULATIONS SCHEMA ===');
    parts.push('The "calculations" and "expectedTests" objects are NON-OPTIONAL.');
    parts.push('Even if you provide values, they will be OVERWRITTEN by deterministic BS 7671 calculation engine.');
    parts.push('YOUR values serve as HINTS only. The actual compliant values come from code.');
    parts.push('');
    parts.push('REQUIRED calculations fields:');
    parts.push('- Ib: Design current (find formula in RAG knowledge base)');
    parts.push('- In: Protection device rating');
    parts.push('- Iz: Cable capacity after derating (from BS 7671 tables in RAG)');
    parts.push('- voltageDrop: { volts, percent, limit, compliant } - will be recalculated deterministically');
    parts.push('- zs: Earth fault loop impedance - will be recalculated deterministically');
    parts.push('- maxZs: Maximum Zs from Table 41.3 - will be recalculated deterministically');
    parts.push('');
    
    // Field requirements
    parts.push('=== REQUIRED FIELDS ===');
    parts.push('Copy from input: loadPower, phases, cableLength. Set: voltage (230V single/400V three), installationMethod, rcdProtected, circuitNumber (1+), full cableType description.');

    return parts.join('\n');
  }

  /**
   * Build optimized system prompt for batch processing with installation type context
   */
  private buildBatchSystemPrompt(
    context: RAGContext,
    circuitCount: number,
    batchNumber: number,
    totalBatches: number,
    installationType?: string
  ): string {
    const parts: string[] = [];

    parts.push(`BS 7671:2018+A3:2024 expert. Batch ${batchNumber}/${totalBatches}, ${circuitCount} circuits. Design COMPLIANT circuits.`);
    parts.push('');

    // Add installation type context for batches
    const type = installationType || 'general';
    if (type === 'domestic') {
      parts.push('DOMESTIC: Single-phase 230V typical. RCBO for all sockets. T&E standard, SWA external.');
    } else if (type === 'commercial') {
      parts.push('COMMERCIAL: Three-phase 400V common. More SWA, discrimination critical.');
    } else if (type === 'industrial') {
      parts.push('INDUSTRIAL: Three-phase 400V standard. Motors common (Type D), large SWA cables.');
    }
    parts.push('');

    // Reduce RAG for large batches
    const ragLimit = circuitCount >= 6 ? 2 : 3;

    if (context.regulations && context.regulations.length > 0) {
      parts.push('=== REGULATIONS INTELLIGENCE ===');
      context.regulations.slice(0, ragLimit).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    if (context.designKnowledge && context.designKnowledge.length > 0) {
      parts.push('=== DESIGN KNOWLEDGE INTELLIGENCE ===');
      context.designKnowledge.slice(0, ragLimit).forEach(facet => {
        parts.push(`[${facet.facet_type}] ${facet.primary_topic}`);
        if (facet.formulas?.length) parts.push(`📐 ${facet.formulas.join(' | ')}`);
        if (facet.bs7671_regulations?.length) parts.push(`📖 ${facet.bs7671_regulations.join(', ')}`);
        if (facet.common_mistakes?.length) parts.push(`⚠️ ${facet.common_mistakes[0]}`);
      });
      parts.push('');
    }

    // Consolidated format and rules
    parts.push('=== OUTPUT FORMAT ===');
    parts.push('1. AT A GLANCE: loadKw, loadIb, Cable, Device, VD, Zs, Compliance, Notes');
    parts.push('2. 9 SECTIONS: Summary, Load, Cable Calc, Device, Compliance, Justification, Installation (electrical only), Safety, Testing');
    parts.push('3. installationNotes STRING ONLY - no installationGuidance object');
    parts.push('');
    
    parts.push('=== CORE RULES ===');
    parts.push('- Ib ≤ In ≤ Iz | VD: ≤3% light, ≤5% power | Zs ≤ max');
    parts.push('- RCBO: sockets, bathrooms | T&E 1.5-16mm², SWA 1.5-95mm²');
    parts.push('- CPC: T&E per Table 54.7, SWA=live size | 3-phase=400V | Motors: Type D');
    parts.push('- USE EXACT FORMULAS from knowledge | SHOW STEPS | CITE REGS');
    parts.push('');

    parts.push('=== AUTO-CORRECT ===');
    parts.push('Fix silently: 3-phase voltage, socket/bathroom RCBO, motor FLC, cable types, outdoor SWA. Document in justifications.corrections.');
    parts.push('');
    
    parts.push('=== REQUIRED ===');
    parts.push('Copy: loadPower, phases, cableLength. Set: voltage, installationMethod, rcdProtected, circuitNumber, cableType. Design ALL circuits.');

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
      240000 // 240s timeout (4 minutes for complex multi-circuit corrections)
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

    // Detect installation type
    const installationType = this.detectInstallationType(inputs);

    // Build system prompt with installation type context
    const systemPrompt = this.buildBatchSystemPrompt(
      context,
      inputs.circuits.length,
      batchNumber,
      totalBatches,
      installationType
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
    
    parts.push('You are a BS 7671:2018+A3:2024 electrical circuit design expert.');
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
      protectionRating: c.protectionDevice?.rating || 'unknown',
      calculations: {
        ...c.calculations,
        // Ensure these objects always exist for correction logic
        voltageDrop: c.calculations.voltageDrop || { 
          percent: 0, 
          compliant: false, 
          limit: 5,
          warning: 'Missing from AI response - using defaults'
        },
        zs: c.calculations.zs !== undefined ? c.calculations.zs : 0,
        maxZs: c.calculations.maxZs !== undefined ? c.calculations.maxZs : 0
      }
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
                  installationNotes: {
                    type: 'string',
                    description: 'Circuit-specific installation guidance (2-4 sentences). CRITICAL: Must reference THIS circuit\'s exact specifications: load type, power, cable size, length, location, and protection. Example for 9.5kW shower, 10mm² cable, 18m run: "This 9.5kW shower requires 10mm² cable over 18m. Use 25mm PVC conduit where exposed. All connections must use heat-resistant terminals rated for 40A continuous load. Install RCD spur at shower pull-cord location for local isolation."'
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
                          installationNotes: { 
                            type: 'string', 
                            description: '7. Installation Notes: ELECTRICAL specifications only (installation method, termination requirements, testing). 2-4 sentences. Reference THIS circuit\'s exact load, cable spec, and length. Example: "This 32A ring uses 2.5mm² T&E over 45m, Method C. Terminate in RCBO. Test: R1+R2 ≤ 0.85Ω, Zs ≤ 1.44Ω, RCD 30mA trip." Do NOT generate detailed practical work methods - handled by installation specialist.' 
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
                  'installationNotes',
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

  /**
   * Detect installation type from circuit characteristics
   */
  private detectInstallationType(inputs: NormalizedInputs): string {
    // Check project info first
    if (inputs.projectInfo?.installationType) {
      return inputs.projectInfo.installationType.toLowerCase();
    }

    // Detect from circuit characteristics
    const hasMotors = inputs.circuits.some(c => 
      c.loadType.toLowerCase().includes('motor') || 
      c.loadType.toLowerCase().includes('machinery')
    );
    
    const hasThreePhase = inputs.circuits.some(c => c.phases === 3);
    const hasLargePower = inputs.circuits.some(c => c.loadPower > 10000); // >10kW
    
    if (hasMotors || (hasThreePhase && hasLargePower)) {
      return 'industrial';
    }
    
    const hasCommercialLoads = inputs.circuits.some(c => 
      c.loadType.toLowerCase().includes('emergency') ||
      c.loadType.toLowerCase().includes('fire alarm') ||
      c.loadType.toLowerCase().includes('data')
    );
    
    if (hasCommercialLoads || (hasThreePhase && !hasMotors)) {
      return 'commercial';
    }
    
    return 'domestic';
  }
}

/**
 * AI Designer Module
 * Uses OpenAI GPT-5 Mini with structured tool calling for BS 7671 compliant circuit designs
 */

import { callOpenAI } from '../_shared/ai-providers.ts';
import type { NormalizedInputs, RAGContext, Design, DesignedCircuit } from './types.ts';
import {
  getRecommendedCableTypes,
  getRecommendedEnclosure,
  detectFireEmergencyCircuit,
  detectSpecialLocation
} from '../_shared/cable-enclosure-rules.ts';

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
    
    // Define tool schema with installation type for dynamic cable type constraints
    const tools = [this.buildDesignTool(installationType)];
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
      90000 // 90s timeout (increased from 30s for complex designs)
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
    
    // Installation type context with MANDATORY cable type enforcement
    const type = installationType || 'general';
    if (type === 'domestic') {
      parts.push('=== DOMESTIC INSTALLATION CONTEXT ===');
      parts.push('- Typically single-phase 230V supply, rarely three-phase');
      parts.push('- Focus on socket circuits (ring finals/radials), lighting, showers, cookers');
      parts.push('- RCBO protection mandatory for ALL socket circuits (411.3.3)');
      parts.push('- Typical max demand: 60-100A per dwelling');
      parts.push('');
      parts.push('=== DOMESTIC CABLE TYPE RULES (MANDATORY) ===');
      parts.push('✅ Internal circuits: Twin & Earth (T&E) ONLY');
      parts.push('✅ External/buried circuits: SWA (Steel Wire Armoured) ONLY');
      parts.push('✅ Outdoor circuits: SWA with appropriate glands');
      parts.push('❌ NEVER use: PVC singles, LSZH singles, conduit systems');
      parts.push('NOTE: T&E has REDUCED CPC size per BS 7671 Table 54.7 (e.g., 2.5mm² T&E = 1.5mm² CPC)');
      parts.push('');
    } else if (type === 'commercial') {
      parts.push('=== COMMERCIAL INSTALLATION CONTEXT ===');
      parts.push('- Often three-phase 400V supply for larger loads');
      parts.push('- Higher diversity factors, larger distribution boards');
      parts.push('- SWA cable usage for sub-mains and outdoor runs');
      parts.push('- Fire alarm systems, emergency lighting, data circuits');
      parts.push('- Discrimination between protective devices critical');
      parts.push('');
      parts.push('=== COMMERCIAL CABLE TYPE RULES (MANDATORY) ===');
      parts.push('❌ NEVER use Twin & Earth (T&E) - not suitable for commercial installations');
      parts.push('✅ Internal distribution: LSZH singles in conduit/trunking');
      parts.push('✅ Sub-mains/outdoor: SWA (Steel Wire Armoured)');
      parts.push('✅ Fire circuits (alarms/emergency lighting): FP200/FP400 MANDATORY');
      parts.push('✅ Data/low smoke areas: LSZH cables required');
      parts.push('NOTE: CPC size EQUALS live conductor size for singles/SWA (NOT reduced like T&E)');
      parts.push('');
    } else if (type === 'industrial') {
      parts.push('=== INDUSTRIAL INSTALLATION CONTEXT ===');
      parts.push('- Predominantly three-phase 400V, sometimes higher voltages');
      parts.push('- Large motor loads, heavy machinery, high-power equipment');
      parts.push('- SWA cable standard for most circuits, often larger sizes (>16mm²)');
      parts.push('- Type D MCBs common for motors, contactors, and DOL starters');
      parts.push('- Consider fault levels, discrimination, and starting currents');
      parts.push('');
      parts.push('=== INDUSTRIAL CABLE TYPE RULES (MANDATORY) ===');
      parts.push('❌ NEVER use Twin & Earth (T&E) - not suitable for industrial installations');
      parts.push('✅ Standard for ALL circuits: SWA (Steel Wire Armoured)');
      parts.push('✅ Heavy machinery: Flexible SWA or armoured flex');
      parts.push('✅ Fixed installations: LSZH singles in heavy-duty steel conduit');
      parts.push('✅ Fire/emergency systems: FP200/FP400 or similar fire-rated');
      parts.push('NOTE: CPC size EQUALS live conductor size for SWA/singles (NOT reduced like T&E)');
      parts.push('');
    }
    
    // PRIORITY 1: Fire and Emergency Circuit Rules (OVERRIDE ALL ENVIRONMENT RULES)
    parts.push('=== PRIORITY 1: FIRE & EMERGENCY CIRCUIT RULES (MANDATORY - OVERRIDE ENVIRONMENT) ===');
    parts.push('🔥 EMERGENCY LIGHTING: MUST use FP200, FP400, or MICC (BS 5266-1)');
    parts.push('🔥 FIRE ALARM SYSTEMS: MUST use FP200, FP400, or MICC (BS 5839-1)');
    parts.push('🔥 SMOKE DETECTION: MUST use FP200 or FP400 (BS 5839-1)');
    parts.push('🔥 SPRINKLER SYSTEMS: MUST use FP200, FP400, or MICC (BS EN 12845)');
    parts.push('🔥 FIRE SUPPRESSION: MUST use FP200, FP400, or MICC (BS 7671 Reg 560.8)');
    parts.push('These circuits require fire-rated cables REGARDLESS of environment (domestic/commercial/industrial).');
    parts.push('');
    
    // PRIORITY 2: Special Location Rules
    parts.push('=== PRIORITY 2: SPECIAL LOCATION RULES ===');
    parts.push('🌍 OUTDOOR/EXTERNAL: MUST use SWA (BS 7671 Reg 522.8)');
    parts.push('🌍 UNDERGROUND/BURIED: MUST use SWA with warning tape and marker posts (BS 7671 Reg 522.8.10)');
    parts.push('💧 BATHROOM: Use appropriate cable for environment, avoid zones, supplementary bonding (BS 7671 Section 701)');
    parts.push('🔥 HIGH TEMPERATURE: Use XLPE, MICC, or SWA-XLPE rated to 90°C+ (BS 7671 Reg 523.1)');
    parts.push('🏊 SWIMMING POOL: LSZH singles in steel conduit or SWA, zone restrictions apply (BS 7671 Section 702)');
    parts.push('');
    
    // Enclosure Selection Rules
    parts.push('=== ENCLOSURE/INSTALLATION METHOD RULES ===');
    parts.push('🔧 SWA cables: Clipped direct or on cable tray - NO CONDUIT/TRUNKING NEEDED (armour provides protection)');
    parts.push('🔧 LSZH singles: MUST be in steel conduit, metal trunking, or cable basket (Reg 521.5.1)');
    parts.push('🔧 Twin & Earth: Clipped direct, in PVC conduit, or in mini trunking for domestic');
    parts.push('🔧 FP200/FP400: Clipped direct with fire-rated clips or in steel trunking');
    parts.push('🔧 MICC: Clipped direct with pyrotenax clips (self-supporting, inherently fire-rated)');
    parts.push('');

    // Inject Regulations Intelligence (Phase 5: Increased to 25 from 5)
    if (context.regulations && context.regulations.length > 0) {
      parts.push('=== REGULATIONS INTELLIGENCE ===');
      context.regulations.slice(0, 25).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    // Inject Design Knowledge Intelligence (Phase 5: Increased to 25 from 6)
    if (context.designKnowledge && context.designKnowledge.length > 0) {
      parts.push('=== DESIGN KNOWLEDGE INTELLIGENCE ===');
      
      context.designKnowledge.slice(0, 25).forEach(facet => {
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

    // Practical Work Intelligence removed - handled by Design Installation Agent running in parallel

    // Output format (FOCUSED on electrical design - installation handled separately)
    parts.push('=== OUTPUT FORMAT ===');
    parts.push('1. AT A GLANCE CARD: loadKw (loadPower/1000), loadIb (Ib with unit), Cable, Device, VD (pass/fail), Zs, Compliance, Notes');
    parts.push('2. 8 SECTIONS: Summary, Load, Cable Calc, Device, Compliance, Justification, Safety (electrical), Testing (electrical tests only)');
    parts.push('');
    
    // === YOUR ROLE ===
    parts.push('=== YOUR ROLE ===');
    parts.push('You are a BS 7671:2018+A3:2024 electrical circuit design expert.');
    parts.push('FOCUS on cable sizing, protection device selection, and electrical calculations.');
    parts.push('USE THE KNOWLEDGE BASE ABOVE to design compliant circuits.');
    parts.push('APPLY the formulas, tables, regulations, and examples from the intelligence sections.');
    parts.push('SHOW YOUR WORKING using calculation steps from the knowledge base.');
    parts.push('CITE specific regulation numbers and table references from the RAG results.');
    parts.push('NOTE: Installation guidance (routing, fixing, testing procedures) is handled by a separate Installation Agent.');
    parts.push('');

    // === CPC SIZING REQUIREMENTS (CRITICAL) ===
    parts.push('=== CPC SIZING REQUIREMENTS ===');
    parts.push('For TWIN AND EARTH cables, CPC is SMALLER than live conductor per BS 7671 Table 54.7:');
    parts.push('• 1.5mm² T&E → Live: 1.5mm², CPC: 1.0mm²');
    parts.push('• 2.5mm² T&E → Live: 2.5mm², CPC: 1.5mm²');
    parts.push('• 4mm² T&E → Live: 4mm², CPC: 2.5mm²');
    parts.push('• 6mm² T&E → Live: 6mm², CPC: 2.5mm²');
    parts.push('• 10mm² T&E → Live: 10mm², CPC: 4mm²');
    parts.push('• 16mm² T&E → Live: 16mm², CPC: 6mm²');
    parts.push('');
    parts.push('For SINGLE CORES and SWA, CPC typically EQUALS live conductor size.');
    parts.push('');
    parts.push('CRITICAL: You MUST set correct cpcSize field for accurate Zs and R1+R2 calculations!');
    parts.push('Incorrect CPC sizing will result in wrong expected test values and installation failures.');
    parts.push('');
    
    // === OUTPUT REQUIREMENTS ===
    parts.push('=== OUTPUT REQUIREMENTS ===');
    parts.push('1. Design circuits that comply with BS 7671 regulations found in knowledge base');
    parts.push('2. Show calculations using formulas from Design Knowledge Intelligence');
    parts.push('3. Reference tables explicitly (e.g., "Table 54.7: 2.5mm² conductor resistance = 7.41 mΩ/m")');
    parts.push('4. Cite regulation numbers in justifications (e.g., "per 433.1.1", "Table 41.3")');
    parts.push('5. Use exact voltage/phase values from each circuit request');
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
   * FAST GENERATION: Minimal prompt for 1-3 circuits
   * Target: 15-20 seconds
   */
  async generateFast(
    inputs: NormalizedInputs,
    context: RAGContext
  ): Promise<Design> {
    this.logger.info('AI Designer FAST MODE', {
      circuits: inputs.circuits.length,
      ragResults: context.totalResults
    });
    
    const startTime = Date.now();
    
    // MINIMAL PROMPT (2000 tokens max)
    const systemPrompt = `BS 7671:2018+A3:2024 expert. Design ${inputs.circuits.length} compliant circuit(s).

QUICK RULES:
- Ib ≤ In ≤ Iz | VD ≤ 5% | Zs ≤ max
- RCBO for sockets/bathrooms | T&E/SWA standard sizes
- Show key calculations | Cite main regulations

${context.designKnowledge.slice(0, 3).map(k => 
  `${k.primary_topic}: ${k.content.slice(0, 200)}`
).join('\n\n')}

Generate: cable size, MCB/RCBO, calculations only (installation handled separately).`;

    const structuredInput = this.buildStructuredInput(inputs);
    const tools = [this.buildSimpleTool()];
    
    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) }
        ],
        model: 'gpt-5-mini-2025-08-07',
        max_completion_tokens: 4000, // REDUCED from 8000
        tools,
        tool_choice: { type: 'function', function: { name: 'design_circuits_fast' } }
      },
      this.openAiKey,
      30000 // 30s timeout
    );
    
    const duration = Date.now() - startTime;
    this.logger.info('AI FAST MODE complete', { 
      duration,
      circuits: response.toolCalls?.[0] ? JSON.parse(response.toolCalls[0].function.arguments).circuits.length : 0
    });
    
    const design = JSON.parse(response.toolCalls[0].function.arguments);
    return design;
  }

  /**
   * Simplified tool schema for fast mode
   */
  private buildSimpleTool(): object {
    return {
      type: 'function',
      function: {
        name: 'design_circuits_fast',
        description: 'Quick BS 7671 circuit design',
        parameters: {
          type: 'object',
          properties: {
            circuits: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  cableSize: { type: 'string' },
                  cableType: { type: 'string' },
                  protectionDevice: {
                    type: 'object',
                    properties: {
                      type: { type: 'string' },
                      rating: { type: 'number' }
                    }
                  },
                  calculations: {
                    type: 'object',
                    properties: {
                      Ib: { type: 'number' },
                      In: { type: 'number' },
                      Iz: { type: 'number' },
                      voltageDrop: { type: 'object' },
                      zs: { type: 'number' },
                      maxZs: { type: 'number' }
                    }
                  },
                  // installationNotes removed - handled by Design Installation Agent
                },
                required: ['name', 'cableSize', 'protectionDevice', 'calculations']
              }
            }
          },
          required: ['circuits']
        }
      }
    };
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
  private buildDesignTool(installationType?: string): object {
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
                    description: 'Installation method reference. IMPORTANT: SWA cables = "clipped direct" or "on cable tray" (NO conduit needed). LSZH singles = "in steel conduit" or "in metal trunking" (MUST be enclosed). T&E = "clipped direct" or "in PVC conduit". FP cables = "clipped direct with fire-rated clips". Format: "Method C - clipped direct" or "Method B - in steel conduit"'
                  },
                  cableType: {
                    type: 'string',
                    enum: this.getAllowedCableTypes(installationType || 'general'),
                    description: this.getCableTypeDescription(installationType || 'general')
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
                    description: 'CPC conductor CSA in mm² per BS 7671 Table 54.7. CRITICAL FOR TWIN & EARTH: CPC is SMALLER than live (1.5mm² T&E = 1.0mm² CPC, 2.5mm² T&E = 1.5mm² CPC, 4mm² T&E = 2.5mm² CPC, 6mm² T&E = 2.5mm² CPC, 10mm² T&E = 4mm² CPC, 16mm² T&E = 6mm² CPC). For single cores/SWA, CPC typically equals live size. This affects R1+R2 and Zs calculations.'
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
                          cable: { type: 'string', description: 'Cable specification: Size and type only (e.g., "1.5mm² twin and earth" or "6mm² SWA"). DO NOT include CPC size here.' },
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
                        description: 'EXACTLY 8 sections in strict order - NO REPETITION',
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
                          safetyNotes: { 
                            type: 'string', 
                            description: '7. Safety Notes: Critical electrical safety warnings, isolation requirements, and safe working practices (100-150 words)' 
                          },
                          testingCommissioningGuidance: { 
                            type: 'string', 
                            description: '8. Testing & Commissioning Guidance: BS 7671 Part 6 electrical tests ONLY - continuity of protective conductors (R1+R2), earth fault loop impedance (Zs), insulation resistance between live conductors and earth, RCD trip time and residual current. Include expected numerical readings based on cable size and circuit parameters, and acceptance criteria per GN3. NO installation procedures (handled by Installation Agent). (150-200 words)' 
                          }
                        },
                        required: [
                          'circuitSummary', 
                          'loadDetails', 
                          'cableSelectionBreakdown', 
                          'protectiveDeviceSelection', 
                          'complianceConfirmation', 
                          'designJustification', 
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
   * Get allowed cable types based on installation environment with circuit-type-specific rules
   * LAYER 2: Dynamic Schema Constraint - now with priority-based rules
   */
  private getAllowedCableTypes(installationType: string): string[] {
    const cableSizes = ['1.5mm²', '2.5mm²', '4mm²', '6mm²', '10mm²', '16mm²', '25mm²', '35mm²', '50mm²', '70mm²', '95mm²'];
    
    // Enhanced rules include fire-rated cables for ALL environments
    // Fire/emergency circuits will be enforced at system prompt level
    if (installationType === 'domestic') {
      return [
        ...cableSizes.map(size => `${size} twin and earth`),
        ...cableSizes.map(size => `${size} SWA`),
        // Add fire-rated options for emergency circuits in domestic (rare but possible)
        ...cableSizes.map(size => `${size} FP200`),
        ...cableSizes.map(size => `${size} FP400`)
      ];
    }
    
    if (installationType === 'commercial') {
      return [
        ...cableSizes.map(size => `${size} LSZH single`),
        ...cableSizes.map(size => `${size} SWA`),
        ...cableSizes.map(size => `${size} FP200`),
        ...cableSizes.map(size => `${size} FP400`),
        ...cableSizes.map(size => `${size} MICC`)
      ];
    }
    
    if (installationType === 'industrial') {
      return [
        ...cableSizes.map(size => `${size} SWA`),
        ...cableSizes.map(size => `${size} LSZH single`),
        ...cableSizes.map(size => `${size} FP200`),
        ...cableSizes.map(size => `${size} FP400`),
        ...cableSizes.map(size => `${size} armoured flex`),
        ...cableSizes.map(size => `${size} XLPE`)
      ];
    }
    
    // Fallback: all types allowed
    return [
      ...cableSizes.map(size => `${size} twin and earth`),
      ...cableSizes.map(size => `${size} SWA`),
      ...cableSizes.map(size => `${size} LSZH single`),
      ...cableSizes.map(size => `${size} FP200`)
    ];
  }

  /**
   * Get cable type description based on installation environment with enhanced rules
   * LAYER 2: Dynamic Schema Constraint
   */
  private getCableTypeDescription(installationType: string): string {
    if (installationType === 'domestic') {
      return 'DOMESTIC: Twin & earth for internal, SWA for external/buried. PRIORITY: Fire/emergency circuits MUST use FP200/FP400. Format: "2.5mm² twin and earth" or "6mm² SWA" or "1.5mm² FP200"';
    }
    
    if (installationType === 'commercial') {
      return 'COMMERCIAL: LSZH singles in conduit/trunking, SWA for sub-mains. PRIORITY: Fire/emergency circuits MUST use FP200/FP400/MICC. Outdoor MUST use SWA. Format: "2.5mm² LSZH single" or "10mm² SWA" or "1.5mm² FP200"';
    }
    
    if (installationType === 'industrial') {
      return 'INDUSTRIAL: SWA standard for most circuits, LSZH singles in heavy conduit. PRIORITY: Fire/emergency circuits MUST use FP200/FP400. High temp use XLPE. Format: "10mm² SWA" or "6mm² LSZH single" or "2.5mm² FP200"';
    }
    
    return 'Cable type: size + type. PRIORITY: Fire/emergency MUST use FP200/FP400, outdoor MUST use SWA. Format: "2.5mm² twin and earth" or "6mm² SWA" or "1.5mm² FP200"';
  }

  /**
   * Detect installation type from circuit characteristics
   */
  private detectInstallationType(inputs: NormalizedInputs): string {
    // Check supply info first
    if (inputs.supply?.installationType) {
      return inputs.supply.installationType.toLowerCase();
    }

    // Detect from circuit characteristics
    const hasMotors = inputs.circuits.some(c => 
      c.loadType.toLowerCase().includes('motor') || 
      c.loadType.toLowerCase().includes('machinery')
    );
    
    const hasThreePhase = inputs.circuits.some(c => c.phases === 'three');
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

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
        max_completion_tokens: 16000,
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

    // Inject top regulations (weight 90, top 3)
    if (context.regulations.length > 0) {
      parts.push('=== KEY REGULATIONS ===');
      context.regulations.slice(0, 3).forEach(reg => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    // Inject top design patterns (weight 95, top 3)
    if (context.designPatterns.length > 0) {
      parts.push('=== DESIGN PATTERNS ===');
      context.designPatterns.slice(0, 3).forEach(pattern => {
        parts.push(`${pattern.topic}: ${pattern.content}`);
      });
      parts.push('');
    }

    // Inject top practical guides (weight 90, top 3)
    if (context.practicalGuides.length > 0) {
      parts.push('=== PRACTICAL GUIDANCE ===');
      context.practicalGuides.slice(0, 3).forEach(guide => {
        parts.push(`${guide.primary_topic}: ${guide.content || 'See keywords'}`);
        if (guide.bs7671_regulations && guide.bs7671_regulations.length > 0) {
          parts.push(`  Regulations: ${guide.bs7671_regulations.join(', ')}`);
        }
      });
      parts.push('');
    }

    // Design rules
    parts.push('=== DESIGN RULES ===');
    parts.push('1. Cable sizing: Ib ≤ In ≤ Iz (Reg 433.1.1)');
    parts.push('2. Voltage drop: ≤3% lighting, ≤5% power (Reg 525.1)');
    parts.push('3. Earth fault protection: Zs ≤ max Zs (Reg 411.3.2)');
    parts.push('4. Sockets require 30mA RCD protection (Reg 411.3.3)');
    parts.push('5. Bathrooms require RCD protection (Reg 701.411.3.3)');
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
      90000 // 90s timeout (1.5 minutes - prevents edge function timeout)
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
    parts.push('4. Preserve all regulation citations and installation guidance');
    
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
        description: 'Design BS 7671 compliant electrical circuits with complete calculations and justifications',
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
                  cableSize: {
                    type: 'number',
                    enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0],
                    description: 'Live conductor CSA in mm²'
                  },
                  cpcSize: { 
                    type: 'number',
                    enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0],
                    description: 'CPC conductor CSA in mm² (Reg 543.1.1)'
                  },
                  protectionDevice: {
                    type: 'object',
                    properties: {
                      type: { 
                        type: 'string',
                        enum: ['MCB', 'RCBO'],
                        description: 'MCB for general, RCBO for RCD-required locations'
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
                  }
                },
                required: ['name', 'loadType', 'specialLocation', 'cableSize', 'cpcSize', 'protectionDevice', 'calculations', 'justifications', 'installationGuidance']
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

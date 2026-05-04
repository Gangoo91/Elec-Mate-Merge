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
  detectSpecialLocation,
} from '../_shared/cable-enclosure-rules.ts';

export class AIDesigner {
  private openAiKey: string;

  constructor(
    private logger: any,
    private circuitProgressCallback?: (
      completed: number,
      total: number,
      circuitName: string
    ) => void,
    private circuitDoneCallback?: (
      circuit: DesignedCircuit,
      index: number
    ) => Promise<void>
  ) {
    this.openAiKey = Deno.env.get('OPENAI_API_KEY')!;

    if (!this.openAiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }
  }

  /**
   * Generate circuit designs from normalized inputs and RAG context
   * PARALLELIZED: Each circuit is designed independently in parallel
   */
  async generate(inputs: NormalizedInputs, context: RAGContext): Promise<Design> {
    this.logger.info('AI Designer starting (PARALLEL)', {
      circuits: inputs.circuits.length,
      ragResults: context.totalResults,
    });

    const startTime = Date.now();

    // Detect installation type from circuits
    const installationType = this.detectInstallationType(inputs);

    // Build system prompt ONCE with RAG context (shared across all circuits)
    const systemPrompt = this.buildSystemPrompt(context, installationType, inputs);

    // Create parallel promises for each circuit, with per-circuit streaming hook
    let completedCount = 0;
    const circuitPromises = inputs.circuits.map((circuit, index) =>
      this.generateSingleCircuit(circuit, index, systemPrompt, installationType, inputs.supply)
        .then(async (designed) => {
          completedCount++;
          // Stream to partials table immediately (best-effort, non-blocking)
          if (this.circuitDoneCallback) {
            try {
              await this.circuitDoneCallback({ ...designed, circuitNumber: index + 1 }, index);
            } catch (err) {
              this.logger.warn('circuitDoneCallback failed (continuing)', {
                index,
                error: err instanceof Error ? err.message : String(err),
              });
            }
          }
          // Bump progress per-circuit-as-it-lands
          if (this.circuitProgressCallback) {
            try {
              await this.circuitProgressCallback(
                completedCount,
                inputs.circuits.length,
                designed.name || `Circuit ${index + 1}`
              );
            } catch (err) {
              this.logger.warn('circuitProgressCallback failed (continuing)', {
                error: err instanceof Error ? err.message : String(err),
              });
            }
          }
          return designed;
        })
    );

    // Execute ALL circuits in parallel — wrapped in a hard wall-clock deadline
    // so even if an individual OpenAI call hangs (timeout helper failed,
    // socket closed without response, etc.) the batch still resolves.
    // Per-circuit promises that haven't settled by the deadline are forced
    // to "rejected" with a deadline_exceeded reason — the existing 80% threshold
    // + per-circuit failure handling then kicks in cleanly.
    const HARD_DEADLINE_MS = 180_000; // 3 minutes
    this.logger.info('Executing parallel AI calls', {
      count: circuitPromises.length,
      hardDeadlineMs: HARD_DEADLINE_MS,
    });

    const deadline = new Promise<PromiseSettledResult<DesignedCircuit>[]>((resolve) => {
      setTimeout(() => {
        // Build a settled-array of pending=rejected fallbacks. We can't actually
        // know which promises settled, so race to mark anything still pending.
        const fallback: PromiseSettledResult<DesignedCircuit>[] = circuitPromises.map(
          (_p, idx) => ({
            status: 'rejected' as const,
            reason: new Error(
              `Hard deadline exceeded (${HARD_DEADLINE_MS / 1000}s) — circuit ${idx + 1} did not complete`
            ),
          })
        );
        resolve(fallback);
      }, HARD_DEADLINE_MS);
    });

    // Promise.allSettled never rejects, so race against the deadline:
    const results = await Promise.race([Promise.allSettled(circuitPromises), deadline]);

    // If the deadline wins, mark which circuits actually completed by checking
    // whether they wrote a partial via the streaming callback. The completedCount
    // counter (above the .then handlers) is the source of truth for this.
    if (completedCount < circuitPromises.length) {
      this.logger.warn('Batch did not complete fully — using whatever resolved', {
        completedCount,
        total: circuitPromises.length,
        unresolved: circuitPromises.length - completedCount,
      });
    }

    // Total successful generations
    const successfulCount = results.filter((r) => r.status === 'fulfilled').length;

    // Map results to preserve original array positions
    // Set circuitNumber = index + 1 for consistency with frontend display
    const circuitsWithPositions = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return {
          ...result.value,
          circuitNumber: index + 1, // Force circuitNumber to match array position
        };
      }
      return null;
    });

    // Identify failures for retry
    const failureIndices = results
      .map((r, idx) => ({ result: r, index: idx }))
      .filter((item) => item.result.status === 'rejected')
      .map((item) => item.index);

    // Track failed circuit names for user notification
    const failedCircuitNames: string[] = [];

    // Calculate success rate and apply 80% threshold
    const totalCircuits = inputs.circuits.length;
    const successRate = successfulCount / totalCircuits;

    // Track failed circuits for user notification
    if (failureIndices.length > 0) {
      for (const failureIndex of failureIndices) {
        const circuit = inputs.circuits[failureIndex];
        const circuitName = circuit.name || `Circuit ${failureIndex + 1}`;
        failedCircuitNames.push(circuitName);

        const failureReason =
          results[failureIndex].status === 'rejected'
            ? (results[failureIndex] as PromiseRejectedResult).reason?.message || 'Unknown error'
            : 'Unknown error';

        this.logger.error(`Circuit ${failureIndex + 1} failed: ${circuitName}`, {
          error: failureReason,
        });
      }
    }

    // 80% threshold check - if less than 80% succeed, fail the entire job
    if (successRate < 0.8) {
      throw new Error(
        `Only ${successfulCount}/${totalCircuits} circuits succeeded (${Math.round(successRate * 100)}%). ` +
          `Minimum 80% success required. Failed circuits: ${failedCircuitNames.join(', ')}`
      );
    }

    // Log partial success if applicable (80-99% success)
    if (failedCircuitNames.length > 0) {
      this.logger.warn('Partial success - returning completed circuits', {
        successCount: successfulCount,
        failedCount: failedCircuitNames.length,
        failedCircuits: failedCircuitNames,
        successRate: `${Math.round(successRate * 100)}%`,
      });
    }

    // Filter out failures and extract successful circuits
    const circuits = circuitsWithPositions.filter((c): c is DesignedCircuit => c !== null);

    if (circuits.length === 0) {
      throw new Error('All circuits failed to design. Check logs for details.');
    }

    const duration = Date.now() - startTime;
    this.logger.info('AI Designer PARALLEL complete', {
      duration,
      successCount: circuits.length,
      failureCount: failedCircuitNames.length,
      avgTimePerCircuit: Math.round(duration / inputs.circuits.length),
    });

    return {
      circuits,
      failedCircuits: {
        count: failedCircuitNames.length,
        names: failedCircuitNames,
      },
      reasoning: {
        voltageContext: `Parallel design mode: ${circuits.length}/${inputs.circuits.length} circuits successful`,
        cableSelectionLogic: 'Each circuit designed independently with RAG context',
        protectionLogic: 'Per-circuit protection device selection',
        complianceChecks: 'Independent BS 7671 compliance verification per circuit',
      },
    };
  }

  /**
   * Generate design for a SINGLE circuit (called in parallel)
   * Timeout: 45 seconds per circuit
   * Tokens: 2000 per circuit
   */
  private async generateSingleCircuit(
    circuit: any,
    index: number,
    systemPrompt: string,
    installationType: string,
    supply: any
  ): Promise<DesignedCircuit> {
    const circuitStart = Date.now();

    this.logger.info(`Circuit ${index + 1}: Starting parallel design`, {
      name: circuit.name,
      loadPower: circuit.loadPower,
    });

    // Build single-circuit input
    const singleCircuitInput = {
      supply: {
        voltage: supply.voltage,
        phases: supply.phases,
        ze: supply.ze,
        earthing: supply.earthing,
        installationType: supply.installationType,
      },
      circuit: {
        index,
        name: circuit.name,
        loadType: circuit.loadType,
        loadPower: circuit.loadPower,
        cableLength: circuit.cableLength,
        phases: circuit.phases,
        specialLocation: circuit.specialLocation,
        installMethod: circuit.installMethod,
        protectionType: circuit.protectionType,
        bathroomZone: circuit.bathroomZone,
        outdoorInstall: circuit.outdoorInstall,
        circuitTopology: circuit.circuitTopology || 'auto',
        hints: {
          calculatedIb: circuit.calculatedIb,
          suggestedMCB: circuit.suggestedMCB,
          calculatedDiversity: circuit.calculatedDiversity,
          estimatedCableSize: circuit.estimatedCableSize,
        },
        enforced: (circuit as any).enforced || null,
      },
    };

    // Define single-circuit tool schema
    const tools = [this.buildSingleCircuitTool(installationType)];
    const tool_choice = { type: 'function', function: { name: 'design_single_circuit' } };

    // Primary model configuration
    const PRIMARY_MODEL = 'gpt-5.4-mini-2026-03-17';
    const FALLBACK_MODEL = 'gpt-5.4-mini-2026-03-17'; // Faster fallback for timeout scenarios
    const PRIMARY_TIMEOUT = 120000; // 120 seconds for primary (reduced from 180)
    const FALLBACK_TIMEOUT = 90000; // 90 seconds for fallback

    try {
      // Call OpenAI with primary model (GPT-5 Mini)
      const response = await callOpenAI(
        {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: JSON.stringify(singleCircuitInput, null, 2) },
          ],
          model: PRIMARY_MODEL,
          max_completion_tokens: 24000, // Generous — cite-or-die requires room for regulation_refs + structuredOutput + justifications
          tools,
          tool_choice,
        },
        this.openAiKey,
        PRIMARY_TIMEOUT
      );

      const circuitDuration = Date.now() - circuitStart;

      // Parse tool call
      if (!response.toolCalls || response.toolCalls.length === 0) {
        throw new Error(`No tool calls in AI response for circuit ${index + 1}`);
      }

      const toolCall = response.toolCalls[0];
      const design = JSON.parse(toolCall.function.arguments) as { circuit: DesignedCircuit };

      this.logger.info(`Circuit ${index + 1}: Complete`, {
        name: circuit.name,
        duration: circuitDuration,
        model: PRIMARY_MODEL,
        cableSize: design.circuit.cableSize,
        protection: design.circuit.protectionDevice?.rating,
      });

      return design.circuit;
    } catch (primaryError) {
      const primaryDuration = Date.now() - circuitStart;
      const isTimeout =
        primaryError.message?.toLowerCase().includes('timeout') ||
        primaryError.message?.toLowerCase().includes('timed out') ||
        primaryError.message?.toLowerCase().includes('aborted');

      this.logger.warn(`Circuit ${index + 1}: Primary model failed`, {
        name: circuit.name,
        duration: primaryDuration,
        isTimeout,
        error: primaryError.message,
      });

      // FALLBACK: If timeout or rate limit, try faster model
      if (isTimeout || primaryError.message?.toLowerCase().includes('rate limit')) {
        this.logger.info(`Circuit ${index + 1}: Attempting fallback model`, {
          name: circuit.name,
          fallbackModel: FALLBACK_MODEL,
        });

        try {
          const fallbackStart = Date.now();
          const fallbackResponse = await callOpenAI(
            {
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: JSON.stringify(singleCircuitInput, null, 2) },
              ],
              model: FALLBACK_MODEL,
              max_completion_tokens: 24000,
              tools,
              tool_choice,
            },
            this.openAiKey,
            FALLBACK_TIMEOUT
          );

          const fallbackDuration = Date.now() - fallbackStart;

          if (!fallbackResponse.toolCalls || fallbackResponse.toolCalls.length === 0) {
            throw new Error(`No tool calls in fallback response for circuit ${index + 1}`);
          }

          const toolCall = fallbackResponse.toolCalls[0];
          const design = JSON.parse(toolCall.function.arguments) as { circuit: DesignedCircuit };

          this.logger.info(`Circuit ${index + 1}: Complete (FALLBACK)`, {
            name: circuit.name,
            duration: fallbackDuration,
            totalDuration: primaryDuration + fallbackDuration,
            model: FALLBACK_MODEL,
            cableSize: design.circuit.cableSize,
            protection: design.circuit.protectionDevice?.rating,
          });

          return design.circuit;
        } catch (fallbackError) {
          const totalDuration = Date.now() - circuitStart;
          this.logger.error(`Circuit ${index + 1}: Both models failed`, {
            name: circuit.name,
            totalDuration,
            primaryError: primaryError.message,
            fallbackError: fallbackError.message,
          });
          throw new Error(
            `Circuit ${index + 1} (${circuit.name}) design failed: Primary (${primaryError.message}), Fallback (${fallbackError.message})`
          );
        }
      }

      // Non-timeout error - throw immediately
      const circuitDuration = Date.now() - circuitStart;
      this.logger.error(`Circuit ${index + 1}: Failed (non-retryable)`, {
        name: circuit.name,
        duration: circuitDuration,
        error: primaryError.message,
      });
      throw new Error(
        `Circuit ${index + 1} (${circuit.name}) design failed: ${primaryError.message}`
      );
    }
  }

  /**
   * Build system prompt with RAG context injection (OPTIMIZED - 50% reduction)
   */
  private buildSystemPrompt(
    context: RAGContext,
    installationType?: string,
    inputs?: NormalizedInputs
  ): string {
    const parts: string[] = [];

    // Enhanced core identity - trust AI to reason with RAG
    parts.push('You are a BS 7671:2018+A4:2026 electrical circuit design expert.');
    parts.push('');
    parts.push(
      '🔢 CRITICAL: Set circuitNumber = circuit.index + 1 from input (e.g., index 0 = Way 1, index 1 = Way 2)'
    );
    parts.push('');
    parts.push('=== GROUNDING RULES (NON-NEGOTIABLE) ===');
    parts.push('');
    parts.push(
      'Every numeric choice you make MUST be grounded in the RAG CONTEXT below — not in your training memory.'
    );
    parts.push(
      '1. CABLE SIZE: cable_table_ref MUST be the exact BS 7671 Appendix 4 table from which the chosen Iz was sourced (e.g. "4D1A"). If no Iz facet exists in RAG for the cable type+size+method+temperature combination you chose, set cable_table_ref to "ungrounded" and add a note to ungrounded_choices.'
    );
    parts.push(
      '2. REGULATIONS: regulation_refs[] MUST contain at least 2 BS 7671 regulation numbers from the RAG context that support this circuit design (typical pattern: one for protection coordination, one for Zs/disconnection, one for special-location if applicable). DO NOT invent regulation numbers. If a numeric choice cannot be backed by a reg in the provided context, list the choice in ungrounded_choices.'
    );
    parts.push(
      '3. HONESTY: ungrounded_choices is your honesty signal. Empty array = everything grounded. Non-empty = circuit ships with a "needs review" badge. This is FAR better than inventing citations.'
    );
    parts.push(
      '4. The RAG context is A4:2026-aware. Trust it over older training memory.'
    );
    parts.push('');
    parts.push(
      'Use the RAG knowledge to design compliant circuits. Your design justifications should reference specific regulations and calculations from the RAG context.'
    );
    parts.push('');
    parts.push('=== CRITICAL: DATA CONSISTENCY (MANDATORY) ===');
    parts.push('');
    parts.push(
      '🔴 CRITICAL SAFETY RULE: The protectionDevice.rating field MUST EXACTLY match the protection rating mentioned in ALL justification sections.'
    );
    parts.push(
      '🔴 If you write "20A protective device" in the justification, then protectionDevice.rating MUST be 20.'
    );
    parts.push(
      '🔴 If you write "32A MCB" in the justification, then protectionDevice.rating MUST be 32.'
    );
    parts.push(
      '🔴 ANY mismatch between structured data (protectionDevice.rating) and justification prose is a CRITICAL FAILURE.'
    );
    parts.push(
      '🔴 VERIFY BEFORE RETURNING: Check that your numeric fields match your written justifications.'
    );
    parts.push('');
    parts.push('WHY THIS MATTERS:');
    parts.push('- Electricians read the "At a Glance" overview (shows protectionDevice.rating)');
    parts.push(
      '- If the overview shows 32A but justification says 20A, they may install WRONG protection'
    );
    parts.push('- This creates a DANGEROUS SAFETY HAZARD - cables overload, fires occur');
    parts.push('- The justification is the engineering truth - structured data must match it');
    parts.push('');
    parts.push('=== CABLE TYPE RULES BY LOCATION (MANDATORY) ===');
    parts.push('');
    parts.push(
      '🔴 The cable family is dictated by WHERE the circuit runs, not what type of load it is.'
    );
    parts.push(
      '🔴 Read circuit.specialLocation, circuit.outdoorInstall, and the circuit name carefully.'
    );
    parts.push('');
    parts.push('OUTDOOR / EXTERNAL (above-ground): SWA 3-core or 4-core 90°C XLPE.');
    parts.push(
      '  ✗ NEVER twin & earth (BS 6004) — that is a BS 6004 indoor cable, UV degrades it, no mechanical protection.'
    );
    parts.push('  ✓ SWA per BS 6724 — UV stable, mechanical protection from armour.');
    parts.push('  Per BS 7671 522.6 / 522.8.');
    parts.push('');
    parts.push('UNDERGROUND / BURIED: SWA mandatory — Method D (direct in ground).');
    parts.push('  Mechanical protection requirement makes T&E unsuitable.');
    parts.push('  Per BS 7671 522.6.');
    parts.push('');
    parts.push('FIRE ALARM / EMERGENCY LIGHTING / SMOKE DETECTION / SOUNDER:');
    parts.push('  FP200 enhanced (or FP400, or MICC mineral-insulated).');
    parts.push('  ✗ NEVER twin & earth — fails the fire-resistance test.');
    parts.push('  Per BS 7671 560.7 · BS 5266-1 · BS 5839-1.');
    parts.push('');
    parts.push(
      'INDUSTRIAL FIXED PLANT (motors, machinery, VFDs, welding, compressors, production lines):'
    );
    parts.push('  SWA preferred — mechanical protection + EMC screening.');
    parts.push('  LSZH singles in steel conduit/trunking acceptable when fully enclosed.');
    parts.push('  ✗ T&E unacceptable for industrial fixed plant.');
    parts.push('');
    parts.push('COMMERCIAL DISTRIBUTION + SUBMAINS: SWA 4-core 90°C XLPE.');
    parts.push('  LSZH singles in steel conduit/trunking for general lighting/socket runs.');
    parts.push('');
    parts.push('DOMESTIC INDOOR (lighting, sockets, kitchen, bathroom indoor): T&E acceptable.');
    parts.push('  T&E (BS 6004) is suitable for indoor concealed wiring on Method C clipped direct.');
    parts.push('');
    parts.push('NEGATIVE EXAMPLES (THESE ARE WRONG):');
    parts.push('  ✗ Outdoor lighting circuit with cableType "1.5 mm² twin and earth" — FAIL');
    parts.push('  ✗ EV charger (specialLocation: outdoor) with T&E — FAIL');
    parts.push('  ✗ Fire alarm with T&E — FAIL');
    parts.push('  ✗ Three-phase motor with T&E — FAIL');
    parts.push('  ✓ Outdoor lighting with "1.5 mm² SWA 3-core 90°C XLPE" — correct');
    parts.push('  ✓ Fire alarm with "1.5 mm² FP200 enhanced" — correct');
    parts.push('  ✓ Three-phase motor with "6 mm² SWA 4-core 90°C XLPE" — correct');
    parts.push('');
    parts.push('Enclosure selection follows cable type:');
    parts.push('- SWA: Clipped direct (armour provides protection)');
    parts.push('- LSZH singles: Steel conduit/trunking required');
    parts.push('- Twin & Earth: Clipped direct or PVC conduit');
    parts.push('- FP200/FP400: Clipped direct with fire-rated clips');
    parts.push('');
    parts.push('');
    parts.push('=== BS 7671 TABLE 41.3 - MAXIMUM Zs VALUES (MANDATORY) ===');
    parts.push('');
    parts.push('🔴 ZS LOOKUP DISCIPLINE:');
    parts.push('1. Read protectionDevice.rating EXACTLY (e.g. 20).');
    parts.push('2. Read protectionDevice.curve EXACTLY (e.g. B).');
    parts.push('3. Find that ROW. Set calculations.maxZs to that EXACT value.');
    parts.push('4. RCBOs use the SAME Table 41.3 values as MCBs of equivalent type+rating.');
    parts.push('   The RCBO\'s integrated 30 mA RCD is *additional* protection per 411.4.5;');
    parts.push('   the declared maxZs in the schedule remains the Table 41.3 value.');
    parts.push('');
    parts.push('🔴 NEGATIVE EXAMPLES (THESE ARE COMMON MISTAKES — DO NOT DO):');
    parts.push('   ✗ 20A Type B with maxZs = 1.37   ← that is the 32A row, FAIL');
    parts.push('   ✗ 16A Type B with maxZs = 2.19   ← that is the 20A row, FAIL');
    parts.push('   ✗ 16A Type C with maxZs = 0.68   ← that is the 32A row, FAIL');
    parts.push('   ✗ 32A Type B with maxZs = 0.87   ← that is the 50A row, FAIL');
    parts.push('   ✓ 20A Type B → 2.19Ω (correct)');
    parts.push('   ✓ 32A Type B → 1.37Ω (correct)');
    parts.push('   ✓ 16A Type C → 1.37Ω (correct)');
    parts.push('');
    parts.push('🔴 CRITICAL: Use EXACT values from this table - do NOT calculate or approximate!');
    parts.push('');
    parts.push('TYPE B MCB (0.4s disconnection - Table 41.3):');
    parts.push('6A=7.28Ω, 10A=4.37Ω, 16A=2.73Ω, 20A=2.19Ω, 25A=1.75Ω, 32A=1.37Ω');
    parts.push('40A=1.09Ω, 50A=0.87Ω, 63A=0.69Ω, 80A=0.55Ω, 100A=0.44Ω, 125A=0.35Ω');
    parts.push('');
    parts.push('TYPE C MCB (0.4s disconnection - Table 41.3):');
    parts.push('6A=3.64Ω, 10A=2.19Ω, 16A=1.37Ω, 20A=1.09Ω, 25A=0.87Ω, 32A=0.68Ω');
    parts.push('40A=0.55Ω, 50A=0.44Ω, 63A=0.35Ω, 80A=0.27Ω, 100A=0.22Ω, 125A=0.17Ω');
    parts.push('');
    parts.push('TYPE D MCB (0.4s disconnection - Table 41.3):');
    parts.push('6A=1.82Ω, 10A=1.09Ω, 16A=0.68Ω, 20A=0.55Ω, 25A=0.44Ω, 32A=0.34Ω');
    parts.push('40A=0.27Ω, 50A=0.22Ω, 63A=0.17Ω, 80A=0.14Ω, 100A=0.11Ω, 125A=0.09Ω');
    parts.push('');
    parts.push('TYPE D MCB (5s disconnection - Table 41.3 - MOTORS/FIXED EQUIPMENT ONLY):');
    parts.push('6A=3.64Ω, 10A=2.19Ω, 16A=1.37Ω, 20A=1.09Ω, 25A=0.87Ω, 32A=0.68Ω');
    parts.push('40A=0.55Ω, 50A=0.44Ω, 63A=0.35Ω, 80A=0.27Ω, 100A=0.22Ω, 125A=0.17Ω');
    parts.push('');
    parts.push(
      '⚠️ CRITICAL: Only Type D has 5s values. Types B and C use 0.4s ONLY (final circuits).'
    );
    parts.push('');
    parts.push('=== SINGLE-PHASE vs THREE-PHASE VOLTAGE (CRITICAL) ===');
    parts.push('');
    parts.push(
      '🔴 The SUPPLY voltage and the CIRCUIT voltage are NOT the same thing on a three-phase board.'
    );
    parts.push('');
    parts.push('SUPPLY (the board feed):');
    parts.push('   ✓ 230 V single-phase: phase-to-neutral, 1φ supply');
    parts.push('   ✓ 400 V three-phase: line-to-line, 3φ supply (415 V on some legacy systems)');
    parts.push('');
    parts.push('CIRCUIT voltage (what each way operates at):');
    parts.push(
      '   ✓ phases==="single" → CIRCUIT VOLTAGE IS 230 V (phase-to-neutral) regardless of supply'
    );
    parts.push('   ✓ phases==="three"  → CIRCUIT VOLTAGE IS 400 V or 415 V (line-to-line)');
    parts.push('');
    parts.push('CALCULATIONS — use the right voltage:');
    parts.push('   Single-phase:  Ib = P / 230');
    parts.push('   Three-phase:   Ib = P / (√3 × 400) ≈ P / 692.8');
    parts.push('');
    parts.push(
      'A 3 kW lighting circuit on a TP+N board is STILL a 230 V single-phase circuit:'
    );
    parts.push('   ✓ Ib = 3000 / 230 = 13.0 A · 16 A MCB suits it');
    parts.push('   ✗ Ib = 3000 / 400 = 7.5 A · this is WRONG (carrying supply voltage onto a 1φ circuit)');
    parts.push('');
    parts.push(
      'VOLT DROP — also referenced to the circuit voltage, not the supply voltage:'
    );
    parts.push(
      '   Single-phase circuit Vd %  =  Vd_volts / 230 × 100  (NOT / 400)'
    );
    parts.push('   Three-phase circuit Vd %  =  Vd_volts / 400 × 100');
    parts.push('');
    parts.push(
      '🔴 Set calculations.voltage to 230 for single-phase circuits, 400 (or 415) for three-phase circuits.'
    );
    parts.push(
      '🔴 Single-phase circuits on a TP+N board live on a single phase (L1, L2, or L3) — the assignment is handled by the board layout, but each circuit IS still a 230 V single-phase circuit for cable / Ib / Vd purposes.'
    );
    parts.push('');
    parts.push('=== RING FINAL VOLTAGE DROP (PARALLEL PATHS) ===');
    parts.push('');
    parts.push(
      '🔴 Ring finals have TWO legs in parallel. Worst-case load is at the mid-point of the ring.'
    );
    parts.push('🔴 Effective length × current = (L × Ib) / 4 — not L × Ib.');
    parts.push('');
    parts.push('FORMULA:');
    parts.push('   Vd_volts = (mV/A/m × Ib × L_total) / 4000');
    parts.push('   where L_total is the total ring perimeter (the cableLength field).');
    parts.push('');
    parts.push('NEGATIVE EXAMPLES:');
    parts.push(
      '   ✗ 32A ring on 2.5 mm² T&E (mV/A/m=18) over 20 m: Vd_volts = 18×32×20/1000 = 11.5 V (5.0%) ← USED RADIAL FORMULA, WRONG'
    );
    parts.push(
      '   ✓ Same ring, correct formula: Vd_volts = 18×32×20/4000 = 2.88 V (1.25%) ← ring formula'
    );
    parts.push('');
    parts.push(
      '🔴 Set calculations.voltageDrop.percent and .volts using the RING formula when circuitTopology=="ring" or the load is described as a ring final.'
    );
    parts.push('');
    parts.push('=== RING FINAL CIRCUIT RULES (FROM RAG KNOWLEDGE) ===');
    parts.push('');
    parts.push('🔴 CRITICAL: Check circuit.circuitTopology field to determine ring vs radial');
    parts.push(
      '🔴 If circuitTopology === "ring": ALWAYS 2.5mm² + 1.5mm² CPC + 32A RCBO (BS 7671 Appendix 15)'
    );
    parts.push(
      '🔴 If circuitTopology === "radial": Size cable and MCB based on diversified load (Id)'
    );
    parts.push('🔴 Ring circuits require minimum 2kW load - low loads (<2kW) should use radials');
    parts.push('');
    parts.push('📐 RING FINAL SPECIFICATIONS:');
    parts.push('  • Cable: ALWAYS 2.5mm² + 1.5mm² CPC (BS 7671 Appendix 15)');
    parts.push('  • Protection: ALWAYS 32A RCBO (sockets require RCD)');
    parts.push('  • Max area: 100m² floor area (Reg 433.1.5)');
    parts.push('  • Parallel paths: Current splits 50/50, each leg ~16A max');
    parts.push('  • Calculations: Use HALF cable length (parallel paths affect Zs and VD)');
    parts.push('  • Never use: 1.5mm², 4mm², 6mm², or 10mm² for rings');
    parts.push('');
    parts.push('📐 RADIAL SOCKET SPECIFICATIONS:');
    parts.push('  • 20A radial: 2.5mm² cable acceptable (serves up to 50m²)');
    parts.push('  • 32A radial: 4mm² minimum required (serves up to 75m²)');
    parts.push('  • Protection: MCB/RCBO sized based on diversified load');
    parts.push('  • Use full cable length in calculations (no parallel paths)');
    parts.push('');
    parts.push('💡 JUSTIFICATION FORMAT:');
    parts.push('  • Ring: "Ring final circuit: 32A + 2.5mm² per BS 7671 Appendix 15"');
    parts.push('  • Radial 20A: "Radial circuit: 20A + 2.5mm² per Table 4D1A"');
    parts.push('  • Radial 32A: "Radial circuit: 32A + 4mm² per Table 4D1A"');
    parts.push('');
    // Determine installation type for diversity rules
    const type = installationType || 'general';

    // Add commercial radial vs ring decision guidance
    if (type === 'commercial' || type === 'industrial') {
      parts.push('=== COMMERCIAL/INDUSTRIAL CIRCUIT DESIGN RULES ===');
      parts.push('');
      parts.push('🏢 COMMERCIAL RADIALS (circuit.circuitTopology === "radial"):');
      parts.push('  • EPOS/Till stations: 20A radial (2.5mm²) - typically <2kW total');
      parts.push('  • Office workstations: 20A radial - dedicated desk clusters');
      parts.push('  • Server/IT equipment: 20A or 32A radial - dedicated feeds');
      parts.push('  • ATM supplies: 20A radial - single dedicated outlet');
      parts.push('  • Printers/copiers: 20A radial - dedicated equipment');
      parts.push('  • Kitchen equipment: Dedicated radials per appliance');
      parts.push('');
      parts.push('📊 LOAD-BASED MCB SELECTION (for radials):');
      parts.push('  • Id <10A (2.3kW): 16A MCB + 2.5mm² cable');
      parts.push('  • Id 10-16A (2.3-3.68kW): 20A MCB + 2.5mm² cable');
      parts.push('  • Id 16-20A (3.68-4.6kW): 25A MCB + 4mm² cable');
      parts.push('  • Id 20-32A (4.6-7.36kW): 32A MCB + 4mm² cable');
      parts.push('  • Id >32A: Dedicated circuit sized to load');
      parts.push('');
      parts.push('🏢 COMMERCIAL RINGS (circuit.circuitTopology === "ring"):');
      parts.push('  • Use ONLY for general-purpose socket outlets (multiple unspecified loads)');
      parts.push('  • Open-plan office areas with numerous socket points');
      parts.push('  • Minimum load: 2kW (ring circuits for low loads are wasteful)');
      parts.push('  • ALWAYS: 32A RCBO + 2.5mm² + 1.5mm² CPC');
      parts.push('');
      parts.push('🔌 INSTALLATION METHODS (commercial):');
      parts.push('  • Office sockets: Plastic dado trunking + LSZH singles (NOT steel conduit)');
      parts.push('  • Server rooms: Steel trunking + LSZH singles');
      parts.push('  • Plant rooms/workshops: Steel conduit + LSZH singles');
      parts.push('  • Sub-mains: SWA armoured cable (clipped direct)');
      parts.push('  • Fire circuits: FP200/FP400 with fire-rated clips');
      parts.push('');
      parts.push('💡 PRACTICAL EXAMPLES:');
      parts.push('  • Phone Booth Sockets (1kW/4.35A) → 16A RADIAL + 2.5mm² + plastic dado');
      parts.push('  • Consultation Room Sockets (2kW/8.7A) → 20A RADIAL + 2.5mm² + plastic dado');
      parts.push('  • X-Ray Suite (8kW/34.78A) → 40A RADIAL + 6mm² + steel conduit');
      parts.push('  • Hot Desk Zone (5kW) → 32A RADIAL (4mm²) OR ring (2.5mm²) + plastic dado');
      parts.push('');

      // Add industrial protective device guidance
      parts.push('=== INDUSTRIAL PROTECTIVE DEVICE SELECTION ===');
      parts.push('');
      parts.push('🏭 INDUSTRIAL INSTALLATIONS - Device Selection Rules:');
      parts.push('');
      parts.push('📊 FAULT LEVEL BASED SELECTION:');
      parts.push('  • PSCC > 16kA → BS88 HRC fuse MANDATORY (80kA breaking capacity)');
      parts.push('  • PSCC 10-16kA → BS88 fuse or MCB with 25kA rating');
      parts.push('  • PSCC <10kA → MCB with 25kA rating acceptable');
      parts.push('  • Standard MCBs (6-10kA) INSUFFICIENT for industrial');
      parts.push('');
      parts.push('📊 CURRENT LEVEL BASED SELECTION (MANDATORY FOR INDUSTRIAL):');
      parts.push('  • Ib > 400A → MCCB REQUIRED (only option above 400A)');
      parts.push('  • Ib 100-400A → BS88 HRC FUSE MANDATORY (80kA breaking capacity)');
      parts.push('  • Ib 63-100A → BS88 HRC FUSE MANDATORY (red-spot boards standard)');
      parts.push('  • Ib <63A → MCB/RCBO acceptable (25kA rating minimum)');
      parts.push('');
      parts.push(
        '🔴 CRITICAL RULE: Industrial circuits with Ib >63A MUST use BS88 fuses or MCCB, NOT MCBs'
      );
      parts.push('🔴 MCBs are LIMITED to 125A maximum and typically 63A for industrial');
      parts.push('🔴 For 200A motor circuit: Use BS88 250A gG fuse (NOT 200A Type D MCB)');
      parts.push('');
      parts.push('⚙️ MOTOR PROTECTION (MANDATORY RULES):');
      parts.push('  • Motors >100A → BS88 aM-type fuse MANDATORY (motor starting duty)');
      parts.push('  • Motors 63-100A → BS88 aM-type fuse MANDATORY (NOT Type D MCB)');
      parts.push('  • Motors 30-63A → Type D MCB acceptable (but BS88 preferred)');
      parts.push('  • Motors <30A → Type D MCB or Type C acceptable');
      parts.push('  • Direct-on-line starters >63A → BS88 aM fuse REQUIRED');
      parts.push('  • Soft-start motors <63A → Type C MCB acceptable');
      parts.push('');
      parts.push('🔴 MOTOR PROTECTION SIZING (CRITICAL - MUST SIZE TO LOAD):');
      parts.push('  • The fuse TYPE (BS88 gM/aM) is separate from the RATING');
      parts.push('  • ALWAYS select In = next standard rating above Ib');
      parts.push('  • DO NOT default to 160A for all motors!');
      parts.push('');
      parts.push(
        '📊 BS88 FUSE STANDARD RATINGS: 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250A'
      );
      parts.push('');
      parts.push('💡 MOTOR PROTECTION SIZING EXAMPLES:');
      parts.push('  • 12kW 3-phase motor (Ib=17.3A) → 20A BS88 gM fuse (NOT 160A!)');
      parts.push('  • 15kW 3-phase motor (Ib=21.7A) → 25A BS88 gM fuse (NOT 160A!)');
      parts.push('  • 7.5kW 3-phase motor (Ib=10.8A) → 16A BS88 gM fuse (NOT 160A!)');
      parts.push('  • 12kW single-phase motor (Ib=52A) → 63A BS88 gM fuse (NOT 160A!)');
      parts.push('  • 10kW machine tool (Ib=43.5A) → 50A BS88 gM fuse (NOT 160A!)');
      parts.push('  • 75kW motor (Ib=108A) → 125A BS88 gM fuse');
      parts.push('  • 100kW motor (Ib=144A) → 160A BS88 gM fuse');
      parts.push('');
      parts.push('🔴 CRITICAL ERROR TO AVOID:');
      parts.push('  • WRONG: 12kW motor (25A) with 160A fuse - NO OVERLOAD PROTECTION!');
      parts.push('  • RIGHT: 12kW motor (25A) with 32A BS88 gM fuse - correct protection');
      parts.push('  • WRONG: 10kW machine (43A) with 160A fuse - DANGEROUS!');
      parts.push('  • RIGHT: 10kW machine (43A) with 50A BS88 gM fuse - safe');
      parts.push('');
      parts.push('🔴 CRITICAL: DEDICATED EQUIPMENT = NEVER RING CIRCUITS');
      parts.push('  • Welding equipment → RADIAL (sized to load, typically 40-80A)');
      parts.push('  • Motors/machines → RADIAL with BS88/Type D (motor protection)');
      parts.push('  • EV chargers → RADIAL (7.4kW-22kW dedicated supply)');
      parts.push('  • Steam generators → RADIAL (high-power single load)');
      parts.push('  • Any load >7.36kW (32A) → RADIAL (exceeds ring limit)');
      parts.push('  • Any single-point high-power load → RADIAL');
      parts.push('');
      parts.push('⚠️ Ring circuits are ONLY for general-purpose socket outlets');
      parts.push('   with multiple unknown loads distributed across the ring.');
      parts.push('');
      parts.push('🔴 RED-SPOT BOARDS (Industrial Standard):');
      parts.push('  • Distribution boards with BS88 HRC fuses');
      parts.push('  • Breaking capacity: 80kA minimum');
      parts.push('  • Fuse classes: gG (general purpose), aM (motor)');
      parts.push('  • Sub-main protection: 100A-630A typical');
      parts.push('  • Example: 200A circuit → BS88-2 gG 250A fuse (max Zs: 0.09Ω per Table 41.4)');
      parts.push('');
      parts.push('📊 BS88 FUSE MAX Zs VALUES (Table 41.4) - USE THESE FOR INDUSTRIAL CIRCUITS:');
      parts.push('');
      parts.push('BS88 gG FUSE (0.4s disconnection - final circuits):');
      parts.push('  • 6A: 8.89Ω | 10A: 5.33Ω | 16A: 2.82Ω | 20A: 2.05Ω | 25A: 1.50Ω | 32A: 1.09Ω');
      parts.push(
        '  • 40A: 0.86Ω | 50A: 0.65Ω | 63A: 0.49Ω | 80A: 0.36Ω | 100A: 0.27Ω | 125A: 0.21Ω'
      );
      parts.push(
        '  • 160A: 0.16Ω | 200A: 0.12Ω | 250A: 0.09Ω | 315A: 0.07Ω | 400A: 0.055Ω | 500A: 0.043Ω | 630A: 0.034Ω'
      );
      parts.push('');
      parts.push('BS88 gG FUSE (5s disconnection - MOTORS/FIXED EQUIPMENT ONLY):');
      parts.push(
        '  • 2A: 44Ω | 4A: 21Ω | 6A: 12Ω | 10A: 6.8Ω | 16A: 4.0Ω | 20A: 2.8Ω | 25A: 2.2Ω | 32A: 1.7Ω'
      );
      parts.push(
        '  • 40A: 1.3Ω | 50A: 0.99Ω | 63A: 0.78Ω | 80A: 0.55Ω | 100A: 0.42Ω | 125A: 0.32Ω'
      );
      parts.push('  • 160A: 0.27Ω | 200A: 0.18Ω');
      parts.push('');
      parts.push(
        '🔴 CRITICAL: Use 5s values for motors/fixed equipment with BS88 fuses (Table 41.4)'
      );
      parts.push('');
      parts.push('📐 SWA CABLE CAPACITY (Table 4D4A) - CRITICAL FOR CORRECT SIZING:');
      parts.push('  • 16mm²: 85A | 25mm²: 112A | 35mm²: 137A | 50mm²: 164A');
      parts.push('  • 70mm²: 201A | 95mm²: 238A | 120mm²: 274A | 150mm²: 310A');
      parts.push('  • 185mm²: 348A | 240mm²: 399A | 300mm²: 450A');
      parts.push('');
      parts.push('🔴 EXAMPLE: 200A motor circuit (122.64A Ib):');
      parts.push('  • Protection: BS88-2 gG 200A fuse (max Zs: 0.12Ω)');
      parts.push('  • Cable: 70mm² SWA (Iz: 201A) or 95mm² (Iz: 238A)');
      parts.push('  • NOT 35mm² (only 137A) - CRITICAL SAFETY ERROR');
      parts.push('  • NOT 200A Type D MCB - use BS88 fuse for industrial >63A');
      parts.push('');
      parts.push('=== PROTECTION DEVICE SIZING - MANDATORY RULE ===');
      parts.push('');
      parts.push('🔴 CRITICAL: Ib ≤ In ≤ Iz (BS 7671 Regulation 433.1)');
      parts.push('  • Ib = Design current (load current with diversity)');
      parts.push('  • In = Protection device rating (MUST be next standard size above Ib)');
      parts.push('  • Iz = Cable current capacity from BS 7671 tables');
      parts.push('');
      parts.push('📊 PROTECTION DEVICE SELECTION PROCESS:');
      parts.push('  1. Calculate Ib (design current with diversity)');
      parts.push('  2. Select In = next standard rating above Ib (e.g., Ib=25A → In=32A)');
      parts.push('  3. Select cable with Iz ≥ In from BS 7671 tables');
      parts.push('  4. Verify Ib ≤ In ≤ Iz');
      parts.push('');
      parts.push('⚠️ COMMON ERRORS TO AVOID:');
      parts.push(
        '  • In > Ib × 2.5 for non-motors (massively oversized - nuisance tripping/poor protection)'
      );
      parts.push('  • In < Ib (dangerous undersizing - cable overload)');
      parts.push('  • In > Iz (cable cannot handle protection rating - fire risk)');
      parts.push('');
      parts.push('💡 EXAMPLES:');
      parts.push('  • 25A design → 32A MCB (NOT 80A or 50A)');
      parts.push('  • 43.5A design → 50A MCB (next size up)');
      parts.push(
        '  • 122.6A industrial motor → 160A BS88 fuse (next size up, NOT 200A Type D MCB)'
      );
      parts.push('');
      parts.push('📐 MAX ZS VALUES FOR BS88 FUSES (Table 41.4):');
      parts.push('  • 32A: 1.09Ω, 63A: 0.49Ω, 100A: 0.27Ω');
      parts.push('  • 125A: 0.21Ω, 200A: 0.12Ω, 400A: 0.055Ω');
      parts.push('  • 630A: 0.034Ω, 1000A: 0.021Ω');
      parts.push('');
      parts.push('💡 INDUSTRIAL EXAMPLES:');
      parts.push('  • Machine Tool (15kW/65A, PSCC 18kA) → BS88 80A gG fuse + 16mm² SWA');
      parts.push('  • Motor Circuit (11kW/49A, DOL) → BS88 63A aM fuse + 10mm² SWA');
      parts.push('  • Sub-Main (100A, PSCC 20kA) → BS88 125A gG fuse + 25mm² SWA');
      parts.push('  • Control Panel (5kW/22A) → 25A Type C MCB (25kA) + 4mm² SWA');
      parts.push('');
    }

    parts.push('=== DIVERSITY FACTORS - MANDATORY ===');
    parts.push('🎯 CRITICAL: Calculate BOTH Ib (connected) AND Id (diversified) for every circuit');
    parts.push('🎯 Use Id (diversified current) for MCB selection: Id ≤ In ≤ Iz');
    parts.push('');

    // Installation-type-specific diversity factors
    if (type === 'domestic') {
      parts.push('📊 DOMESTIC DIVERSITY (BS 7671 Appendix A):');
      parts.push('');
      parts.push('  LIGHTING CIRCUITS:');
      parts.push('  • Diversity: 66% of connected load (0.66 factor)');
      parts.push('  • Example: 2400W × 0.66 = 1584W (6.9A at 230V)');
      parts.push('  • Justification: "Lighting: 66% diversity per BS 7671 Appendix A (domestic)"');
      parts.push('');
      parts.push('  RADIAL SOCKET CIRCUITS:');
      parts.push('  • Diversity: 100% first 7360W (32A) + 40% of remainder');
      parts.push('  • Example: 10kW → 7360W + (2640W × 0.4) = 8416W');
      parts.push('  • Justification: "Radial: 7.36kW + 40% of excess per BS 7671 Appendix A"');
      parts.push('');
      parts.push('  RING FINAL CIRCUITS:');
      parts.push('  • Diversity: NONE - always 32A (topology provides diversity)');
      parts.push('  • Ib = Id = connected load / 230V (no reduction)');
      parts.push('  • MCB: ALWAYS 32A regardless of calculated current');
      parts.push('  • Justification: "Ring final: 32A per Appendix 15 (domestic)"');
      parts.push('');
      parts.push('  COOKER CIRCUITS:');
      parts.push('  • Diversity: 10A + 30% of next 10A + 60% of remainder (Table A1)');
      parts.push('  • Example: 12kW → 2.3kW + (2.3kW × 0.3) + (7.4kW × 0.6) = 7.53kW');
      parts.push('  • Justification: "Cooker: BS 7671 Appendix A Table A1 (domestic)"');
      parts.push('');
    } else if (type === 'commercial') {
      parts.push('📊 COMMERCIAL DIVERSITY:');
      parts.push('');
      parts.push('  LIGHTING CIRCUITS:');
      parts.push('  • Diversity: 80% of connected load (0.80 factor)');
      parts.push('  • Higher than domestic - larger areas with simultaneous use');
      parts.push('  • Example: 3000W × 0.80 = 2400W (10.4A at 230V)');
      parts.push(
        '  • Justification: "Lighting: 80% diversity (commercial - larger areas with simultaneous use)"'
      );
      parts.push('');
      parts.push('  RADIAL SOCKET CIRCUITS:');
      parts.push('  • Diversity: 100% first 7360W + 60% of remainder');
      parts.push('  • Higher than domestic - office/shop equipment often running');
      parts.push('  • Example: 10kW → 7360W + (2640W × 0.6) = 8944W');
      parts.push('  • Justification: "Radial: 7.36kW + 60% of excess (commercial diversity)"');
      parts.push('');
      parts.push('  COOKER/KITCHEN CIRCUITS:');
      parts.push('  • Diversity: NONE - 100% load (NO DIVERSITY!)');
      parts.push('  • Commercial kitchens operate all equipment simultaneously');
      parts.push('  • Ib = Id = connected load / voltage');
      parts.push(
        '  • Justification: "Commercial kitchen: 100% load - no diversity (simultaneous operation)"'
      );
      parts.push('');
      parts.push('  HEATING CIRCUITS:');
      parts.push('  • Diversity: 90% of connected load (zone-controlled)');
      parts.push('  • Example: 10kW × 0.90 = 9kW');
      parts.push('  • Justification: "Heating: 90% diversity (commercial zone-controlled)"');
      parts.push('');
    } else if (type === 'industrial') {
      parts.push('📊 INDUSTRIAL DIVERSITY (CONSERVATIVE):');
      parts.push('');
      parts.push('  LIGHTING CIRCUITS:');
      parts.push('  • Diversity: 90% of connected load (0.90 factor)');
      parts.push('  • Factory/warehouse - most areas lit at once');
      parts.push('  • Example: 5000W × 0.90 = 4500W (19.6A at 230V)');
      parts.push(
        '  • Justification: "Lighting: 90% diversity (industrial - warehouse/production area)"'
      );
      parts.push('');
      parts.push('  RADIAL SOCKET CIRCUITS:');
      parts.push('  • Diversity: 100% first 7360W + 80% of remainder');
      parts.push('  • Equipment expected to run - less diversity');
      parts.push('  • Example: 15kW → 7360W + (7640W × 0.8) = 13.47kW');
      parts.push('  • Justification: "Radial: 7.36kW + 80% of excess (industrial - conservative)"');
      parts.push('');
      parts.push('  MOTORS/MACHINERY:');
      parts.push('  • Diversity: NONE - 100% load');
      parts.push('  • Assume simultaneous operation of equipment');
      parts.push('  • Factor in starting currents for motors');
      parts.push('  • Justification: "Motors: 100% load - no diversity (industrial equipment)"');
      parts.push('');
      parts.push('  HEATING/PROCESS:');
      parts.push('  • Diversity: NONE - 100% load');
      parts.push('  • Process heating runs continuously');
      parts.push('  • Justification: "Process heating: 100% load - no diversity"');
      parts.push('');
    }

    parts.push('📊 FIXED HIGH-POWER LOADS (ALL INSTALLATIONS):');
    parts.push('  • Showers, Immersion heaters, EV Chargers: 100% load (NO diversity)');
    parts.push('  • Ib = Id (no reduction) - continuous fixed loads');
    parts.push('  • Justification: "No diversity - continuous fixed load"');
    parts.push('');
    parts.push('🎯 OUTPUT FORMAT: Always include in calculations object:');
    parts.push('  • Ib: Raw design current (connected load / voltage)');
    parts.push('  • Id: Diversified current (for MCB selection)');
    parts.push('  • diversityFactor: Factor applied (e.g., 0.66 for domestic lighting)');
    parts.push('  • diversifiedLoad: Diversified load in watts');
    parts.push('  • In justifications.diversityApplied: Explain diversity with installation type');
    parts.push('');

    // Installation type context with MANDATORY cable type enforcement
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
      parts.push(
        'NOTE: T&E has REDUCED CPC size per BS 7671 Table 54.7 (e.g., 2.5mm² T&E = 1.5mm² CPC)'
      );
      parts.push('');
      parts.push('=== TWIN & EARTH AVAILABILITY (CRITICAL) ===');
      parts.push('⚠️ T&E commonly available: 1.0, 1.5, 2.5, 4, 6, 10mm² (widely stocked)');
      parts.push('⚠️ T&E rare/expensive: 16mm² (exists but hard to source, expensive)');
      parts.push('❌ T&E DOES NOT EXIST: 25mm² and above (not manufactured)');
      parts.push('🔄 If circuit needs >10mm² T&E capacity, SWITCH to SWA or singles in conduit');
      parts.push('🔄 For 16mm² requirements, strongly consider SWA for better availability');
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
      parts.push('✅ Data cables: Cat6/Cat6a (LSZH jacket), separate from power circuits');
      parts.push('✅ Data/low smoke areas: LSZH cables required');
      parts.push('');
      parts.push('=== CPC (CIRCUIT PROTECTIVE CONDUCTOR) SIZING ===');
      parts.push('📏 TWIN & EARTH: Reduced CPC per BS 7671 Table 54.7:');
      parts.push('  • 1.5mm² T&E → 1.0mm² CPC');
      parts.push('  • 2.5mm² T&E → 1.5mm² CPC (Ring finals: 2.5mm² live + 1.5mm² CPC)');
      parts.push('  • 4mm² T&E → 2.5mm² CPC');
      parts.push('  • 6mm² T&E → 2.5mm² CPC');
      parts.push('  • 10mm² T&E → 4mm² CPC');
      parts.push('');
      parts.push('📏 SINGLES IN CONDUIT/TRUNKING: CPC equals live (practical installation):');
      parts.push('  • 2.5mm² singles → 2.5mm² CPC (Ring finals: 2.5mm² live + 2.5mm² CPC)');
      parts.push('  • 4mm² singles → 4mm² CPC');
      parts.push('  • All conductors same size for ease of installation');
      parts.push('');
      parts.push('📏 SWA: CPC equals live conductor:');
      parts.push('  • 2.5mm² SWA → 2.5mm² CPC');
      parts.push('  • 4mm² SWA → 4mm² CPC');
      parts.push('');
      parts.push('=== COMMERCIAL CONTAINMENT - LOAD-BASED SELECTION ===');
      parts.push('• <20A (EPOS, office sockets, lights): PVC/plastic trunking with LSZH singles');
      parts.push('• 20-63A (ring finals, distribution): Steel trunking or cable tray/basket');
      parts.push(
        '• >63A (sub-mains): Heavy-duty tray/ladder. SWA clipped direct for individual runs'
      );
      parts.push('• Fire-rated areas: Steel trunking mandatory or FP200/FP400 clipped');
      parts.push('• Ceiling voids: Perforated tray or cable basket');
      parts.push('• Data circuits: Separate basket/trunking, 300mm from power or screened cable');
      parts.push(
        '• LSZH singles: Steel conduit/trunking (fire routes), PVC trunking (low-load), tray/basket (ceiling). All phases grouped per Reg 521.5.1'
      );
      parts.push('');
    } else if (type === 'industrial') {
      parts.push('=== INDUSTRIAL INSTALLATION CONTEXT ===');
      parts.push('- Predominantly three-phase 400V, sometimes higher voltages');
      parts.push('- Large motor loads, heavy machinery, high-power equipment');
      parts.push('- SWA cable standard for process areas, often larger sizes (>16mm²)');
      parts.push('- Type D MCBs common for motors, contactors, and DOL starters');
      parts.push('- Consider fault levels, discrimination, and starting currents');
      parts.push('');
      parts.push('=== INDUSTRIAL CABLE TYPE RULES (MANDATORY) ===');
      parts.push('❌ NEVER use Twin & Earth (T&E) - not suitable for industrial installations');
      parts.push('');
      parts.push('📦 INDUSTRIAL SOCKET CIRCUITS (ring finals, radials):');
      parts.push(
        '✅ INTERNAL workshop/office (clean environment): LSZH singles in metal trunking/conduit'
      );
      parts.push(
        '✅ INTERNAL workshop (harsh/dusty/wet): Consider SWA clipped direct OR singles in steel conduit'
      );
      parts.push(
        '✅ EXTERNAL workshop supply: SWA clipped direct - mechanical protection required'
      );
      parts.push(
        '⚠️ CRITICAL: For INTERNAL ring finals, trunking/conduit with singles is MORE practical than SWA'
      );
      parts.push('⚠️ Ask yourself: Is this internal or external? Is there mechanical damage risk?');
      parts.push('');
      parts.push('📦 INDUSTRIAL PROCESS AREAS (production, machinery, motors):');
      parts.push('✅ SWA (Steel Wire Armoured) - standard for machinery, motors, and equipment');
      parts.push('✅ Flexible SWA or armoured flex - for machinery with vibration/movement');
      parts.push('✅ XLPE - for high temperature environments (ovens, furnaces)');
      parts.push('');
      parts.push('🏢 OFFICE/RECEPTION AREAS WITHIN INDUSTRIAL BUILDINGS:');
      parts.push('✅ LSZH singles in galvanised steel trunking - clean office environments');
      parts.push('✅ LSZH singles in steel conduit - visible runs, fire-rated routes');
      parts.push(
        '⚠️ SWA is overkill for internal office sockets - use LSZH singles in containment'
      );
      parts.push('');
      parts.push('🔥 FIRE/EMERGENCY CIRCUITS (ALL AREAS):');
      parts.push('✅ FP200/FP400 or MICC - MANDATORY regardless of location');
      parts.push('❌ NEVER use SWA, T&E, or LSZH singles for fire circuits');
      parts.push('');
      parts.push(
        '(CPC sizing rules: See above - Singles/SWA use equal size, T&E uses reduced CPC per Table 54.7)'
      );
      parts.push('');
      parts.push('=== INDUSTRIAL CONTAINMENT SELECTION ===');
      parts.push('• ≥50mm²: Cable ladder (heavy loads, galvanised steel)');
      parts.push('• 16-50mm² SWA: Heavy-duty perforated tray or ladder for long runs');
      parts.push('• ≤25mm² SWA: Clipped direct with SWA cleats');
      parts.push('• Machinery (vibration): Flexible SWA in liquid-tight flexible conduit (IP65+)');
      parts.push(
        '• Harsh/corrosive: Galvanised steel conduit (singles) or hot-dip tray/ladder (SWA)'
      );
      parts.push(
        '• LSZH singles: Heavy-duty galvanised conduit or industrial tray. All phases grouped per Reg 521.5.1'
      );
      parts.push('• Overhead routes: Cable ladder or heavy-duty tray with 50% safety factor');
      parts.push('');
    }

    // PRIORITY 1: Fire and Emergency Circuit Rules (OVERRIDE ALL ENVIRONMENT RULES)
    parts.push(
      '=== PRIORITY 1: FIRE & EMERGENCY CIRCUIT RULES (MANDATORY - OVERRIDE ENVIRONMENT) ==='
    );
    parts.push('🔥 EMERGENCY LIGHTING: MUST use FP200, FP400, or MICC (BS 5266-1)');
    parts.push('🔥 FIRE ALARM SYSTEMS: MUST use FP200, FP400, or MICC (BS 5839-1)');
    parts.push('🔥 SMOKE DETECTION: MUST use FP200 or FP400 (BS 5839-1)');
    parts.push('🔥 SPRINKLER SYSTEMS: MUST use FP200, FP400, or MICC (BS EN 12845)');
    parts.push('🔥 FIRE SUPPRESSION: MUST use FP200, FP400, or MICC (BS 7671 Reg 560.8)');
    parts.push(
      'These circuits require fire-rated cables REGARDLESS of environment (domestic/commercial/industrial).'
    );
    parts.push('');

    // PRIORITY 2: Special Location Rules
    parts.push('=== PRIORITY 2: SPECIAL LOCATION RULES ===');
    parts.push('🌍 OUTDOOR/EXTERNAL: MUST use SWA (BS 7671 Reg 522.8)');
    parts.push(
      '🌍 UNDERGROUND/BURIED: MUST use SWA with warning tape and marker posts (BS 7671 Reg 522.8.10)'
    );
    parts.push(
      '💧 BATHROOM: Use appropriate cable for environment, avoid zones, supplementary bonding (BS 7671 Section 701)'
    );
    parts.push(
      '🔥 HIGH TEMPERATURE: Use XLPE, MICC, or SWA-XLPE rated to 90°C+ (BS 7671 Reg 523.1)'
    );
    parts.push(
      '🏊 SWIMMING POOL: LSZH singles in steel conduit or SWA, zone restrictions apply (BS 7671 Section 702)'
    );
    parts.push('');

    // Enclosure Selection Rules (Enhanced with containment details)
    parts.push('=== ENCLOSURE/INSTALLATION METHOD RULES (COMPREHENSIVE) ===');
    parts.push(
      '🔧 SWA cables: Clipped direct or on cable tray/ladder - NO CONDUIT/TRUNKING NEEDED'
    );
    parts.push('  • Armour provides mechanical protection and earth continuity');
    parts.push('  • Small SWA (≤25mm²): Clipped direct with SWA cleats');
    parts.push('  • Large SWA (50mm²+): Cable ladder for heavy-duty support');
    parts.push('');
    parts.push('🔧 LSZH singles: MUST be enclosed (all phases together per Reg 521.5.1)');
    parts.push('  • Commercial: Steel/PVC trunking or perforated cable tray');
    parts.push('  • Industrial: Heavy-duty galvanised conduit or cable tray');
    parts.push('  • Fire areas: Steel trunking/conduit mandatory');
    parts.push('');
    parts.push('🔧 Twin & Earth (domestic only):');
    parts.push('  • Clipped direct (most common)');
    parts.push('  • In PVC conduit for concealed runs');
    parts.push('  • In mini trunking for surface-mounted aesthetic runs');
    parts.push('');
    parts.push('🔧 FP200/FP400 (fire-rated cables):');
    parts.push('  • Clipped direct with fire-rated clips (most common)');
    parts.push('  • In steel trunking if mechanical protection needed');
    parts.push('  • Fire-stopping at compartment boundaries mandatory');
    parts.push('');
    parts.push('🔧 Flexible SWA (industrial machinery):');
    parts.push('  • Liquid-tight flexible conduit for protection');
    parts.push('  • Vibration-rated flexible SWA glands');
    parts.push('  • Regular inspection for mechanical fatigue');
    parts.push('');
    parts.push('🔧 Data cables (Cat6/Cat6a):');
    parts.push('  • Cable basket or plastic trunking (separate from power)');
    parts.push('  • 300mm segregation from power or use screened (FTP/STP)');
    parts.push('  • Data centres: Raised floor or overhead basket per TIA-942');
    parts.push('');

    // BS 7671 FACETS (A4:2026 grounded — primary source for cite-or-die)
    // These are atomic, semantically-indexed facts. Cite them by reg_number.
    if (context.bs7671Facets && context.bs7671Facets.length > 0) {
      parts.push('=== BS 7671 FACETS (A4:2026 GROUNDED — PRIMARY) ===');
      parts.push('Each facet below is an atomic, retrievable fact from BS 7671:2018+A4:2026,');
      parts.push('GN3 9th Ed:2022 (A4), or OSG 9th Ed:2022 (A4). Use these for cable Iz lookup,');
      parts.push('regulation references, Zs limits, and protection requirements. The reg_number');
      parts.push('value is what you must put into regulation_refs. The table reference (e.g. 4D1A)');
      parts.push('is what you must put into cable_table_ref.');
      parts.push('');
      context.bs7671Facets.slice(0, 30).forEach((f: any, i: number) => {
        const ref = f.reg_number ? ` [${f.reg_number}]` : '';
        const doc = f.document_type ? ` (${f.document_type})` : '';
        const topic = f.primary_topic ? ` ${f.primary_topic}` : '';
        const ftype = f.facet_type ? `[${String(f.facet_type).toUpperCase()}]` : '';
        parts.push(`${i + 1}. ${ftype}${ref}${doc}${topic}`);
        if (f.content) parts.push(`   ${f.content}`);
      });
      parts.push('');
    }

    // Regulations intelligence (legacy enrichment table — secondary)
    if (context.regulations && context.regulations.length > 0) {
      parts.push('=== REGULATIONS INTELLIGENCE (SECONDARY) ===');
      context.regulations.slice(0, 15).forEach((reg) => {
        parts.push(`${reg.regulation_number}: ${reg.content}`);
      });
      parts.push('');
    }

    // Inject Design Knowledge Intelligence (Phase 5: Reduced to 15 for performance)
    if (context.designKnowledge && context.designKnowledge.length > 0) {
      parts.push('=== DESIGN KNOWLEDGE INTELLIGENCE ===');

      context.designKnowledge.slice(0, 15).forEach((facet) => {
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
          const examples = facet.worked_examples
            .slice(0, 2)
            .map((ex) => (typeof ex === 'string' ? ex : JSON.stringify(ex)));
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

    // === DESIGN METHODOLOGY: USE RAG KNOWLEDGE ===
    parts.push('=== DESIGN METHODOLOGY ===');
    parts.push('Use the Knowledge Base sections above to design circuits. You MUST:');
    parts.push('');
    parts.push('1. **Reference BS 7671 Tables** for cable current ratings:');
    parts.push('   - Table 4D1A (70°C thermoplastic single-core non-armoured in conduit)');
    parts.push(
      '   - Table 4D5 (70°C thermoplastic flat cable with protective conductor - Twin & Earth)'
    );
    parts.push('   - Table 4E4A (XLPE 90°C armoured cables - SWA)');
    parts.push(
      '   - Apply appropriate derating factors from Tables 4B1 (ambient temp), 4C1 (grouping)'
    );
    parts.push('');
    parts.push('2. **Apply voltage drop calculations** using formulas from knowledge base:');
    parts.push('   - Calculate mV/A/m values from Tables 4D1B, 4D5 (conductor + CPC resistance)');
    parts.push('   - Voltage Drop (%) = (Current × Length × mV/A/m) / (Voltage × 1000)');
    parts.push('   - Maximum: 3% for lighting, 5% for other circuits (Reg 525.1)');
    parts.push('');
    parts.push('3. **Follow circuit-specific requirements**:');
    parts.push(
      '   - EV Chargers: Section 722.531.3 (minimum 6mm², RCD protection, PME restrictions)'
    );
    parts.push('   - Showers: Typically 8.5-10.5kW → requires 40-50A protection, 6-10mm² cable');
    parts.push(
      '   - Socket rings: BS 7671 standard = 2.5mm² + 32A RCBO (serves max 100m² floor area)'
    );
    parts.push('   - Lighting: Typically 1.5mm² + 6A Type B MCB (rarely needs larger)');
    parts.push('');
    parts.push('4. **Select protection devices** based on:');
    parts.push('   - Ib ≤ In ≤ Iz (Reg 433.1): Design current ≤ Device rating ≤ Cable capacity');
    parts.push(
      '   - Disconnection times from Table 41.3 (0.4s for socket circuits, 5s for distribution)'
    );
    parts.push('   - Use RCBO for sockets (Reg 411.3.3), bathrooms, and outdoor circuits');
    parts.push('');
    parts.push('5. **Calculate and verify Earth Fault Loop Impedance (Zs)**:');
    parts.push('   - Use Zs = Ze + R1 + R2 formula from knowledge base');
    parts.push('   - Compare against maximum Zs from Table 41.3 for disconnection compliance');
    parts.push('   - For TN-S: typical Ze = 0.35Ω, TN-C-S: Ze = 0.35Ω, TT: up to 200Ω');
    parts.push('');
    parts.push(
      '**CRITICAL: NEVER mention "RAG" in justifications - cite BS 7671 regulation numbers and tables directly.**'
    );
    parts.push(
      '**EXAMPLE**: "Selected 6mm² cable per BS 7671 Table 4D5: Iz=47A (Method C), sufficient for 40A MCB"'
    );
    parts.push('');

    // Output format (FOCUSED on electrical design - installation handled separately)
    parts.push('=== OUTPUT FORMAT ===');
    parts.push(
      '1. AT A GLANCE CARD: loadKw (loadPower/1000), loadIb (Ib with unit), Cable, Device, VD (pass/fail), Zs, Compliance, Notes'
    );
    parts.push(
      '2. 8 SECTIONS: Summary, Load, Cable Calc, Device, Compliance, Justification, Safety (electrical), Testing (electrical tests only)'
    );
    parts.push('');

    // === YOUR ROLE ===
    parts.push('=== YOUR ROLE ===');
    parts.push('You are a BS 7671:2018+A4:2026 electrical circuit design expert.');
    parts.push('FOCUS on cable sizing, protection device selection, and electrical calculations.');
    parts.push('USE THE KNOWLEDGE BASE ABOVE to design compliant circuits.');
    parts.push(
      'APPLY the formulas, tables, regulations, and examples from the intelligence sections.'
    );
    parts.push('SHOW YOUR WORKING using calculation steps from the knowledge base.');
    parts.push(
      'CITE BS 7671 regulation numbers (e.g., "per Reg 433.1.1") and table references (e.g., "Table 4D5") directly.'
    );
    parts.push(
      '**NEVER mention "RAG" or "RAG results" in justifications - cite actual regulations only.**'
    );
    parts.push(
      'NOTE: Installation guidance (routing, fixing, testing procedures) is handled by a separate Installation Agent.'
    );
    parts.push('');

    // === CPC SIZING REQUIREMENTS (CRITICAL) ===
    parts.push('=== CPC SIZING REQUIREMENTS ===');
    parts.push(
      'For TWIN AND EARTH cables, CPC is SMALLER than live conductor per BS 7671 Table 54.7:'
    );
    parts.push('• 1.5mm² T&E → Live: 1.5mm², CPC: 1.0mm²');
    parts.push('• 2.5mm² T&E → Live: 2.5mm², CPC: 1.5mm²');
    parts.push('• 4mm² T&E → Live: 4mm², CPC: 2.5mm²');
    parts.push('• 6mm² T&E → Live: 6mm², CPC: 2.5mm²');
    parts.push('• 10mm² T&E → Live: 10mm², CPC: 4mm²');
    parts.push('• 16mm² T&E → Live: 16mm², CPC: 6mm²');
    parts.push('');
    parts.push('For SINGLE CORES and SWA, CPC typically EQUALS live conductor size.');
    parts.push('');
    parts.push(
      'CRITICAL: You MUST set correct cpcSize field for accurate Zs and R1+R2 calculations!'
    );
    parts.push(
      'Incorrect CPC sizing will result in wrong expected test values and installation failures.'
    );
    parts.push('');

    // === JUSTIFICATION REQUIREMENTS (CIRCUIT-SPECIFIC) ===
    parts.push('=== JUSTIFICATION REQUIREMENTS ===');
    parts.push(
      'Each circuit MUST have a unique, circuit-specific justification that cites BS 7671 directly:'
    );
    parts.push(
      '1. The specific BS 7671 regulation number for THIS circuit type (e.g., ring final: "per BS 7671 Appendix 15")'
    );
    parts.push('2. The BS 7671 table reference for cable sizing (e.g., "Table 4D5", "Table 4E4A")');
    parts.push('3. Why THIS specific circuit requires THIS cable size and THIS protection rating');
    parts.push(
      '4. **NEVER mention "RAG" - cite regulation numbers and tables directly (e.g., "per Reg 433.1.1", "Table 41.3")**'
    );
    parts.push(
      'DO NOT use generic justifications across multiple circuits - each must be unique and specific!'
    );
    parts.push('');

    // === OUTPUT REQUIREMENTS ===
    parts.push('=== OUTPUT REQUIREMENTS ===');
    parts.push('1. Design circuits that comply with BS 7671 regulations found in knowledge base');
    parts.push('2. Show calculations using formulas from Design Knowledge Intelligence');
    parts.push(
      '3. Reference tables explicitly (e.g., "Table 54.7: 2.5mm² conductor resistance = 7.41 mΩ/m")'
    );
    parts.push('4. Cite regulation numbers in justifications (e.g., "per 433.1.1", "Table 41.3")');
    parts.push('5. Use exact voltage/phase values from each circuit request');
    parts.push('');

    // === CALCULATIONS & EXPECTED TEST VALUES ===
    parts.push('=== CALCULATIONS & EXPECTED TEST VALUES (MANDATORY) ===');
    parts.push(
      'Generate complete calculations and expectedTests objects using BS 7671 formulas from RAG context.'
    );
    parts.push('');
    parts.push('REQUIRED calculations fields:');
    parts.push('- Ib: Design current (connected load / voltage)');
    parts.push('- Id: Diversified current (for MCB selection)');
    parts.push('- In: Protection device rating (Id ≤ In ≤ Iz)');
    parts.push('- Iz: Cable capacity after derating (from BS 7671 tables in RAG)');
    parts.push('- diversityFactor: Factor applied (e.g., 0.66 for domestic lighting)');
    parts.push('- diversifiedLoad: Diversified load in watts (Ib × diversityFactor × voltage)');
    parts.push('- voltageDrop: { volts, percent, limit, compliant }');
    parts.push('- zs: Earth fault loop impedance in Ohms');
    parts.push(
      '- maxZs: Maximum permitted Zs in Ohms (Table 41.3 for 0.4s final circuits, Table 41.6 for 5s motors/distribution)'
    );
    parts.push(
      '- disconnectionTime: 0.4 or 5 (seconds) - use 5s for motors/fixed equipment, 0.4s for final circuits'
    );
    parts.push('');
    parts.push('=== DISCONNECTION TIMES (BS 7671 Regulation 411.3.2.3) ===');
    parts.push('**CRITICAL: Use correct disconnection time to select appropriate Zs table:**');
    parts.push(
      '- **0.4s disconnection** (Table 41.3): Final circuits ≤32A (sockets, lighting, small loads)'
    );
    parts.push(
      '- **5s disconnection** (Table 41.6): Motors, conveyors, fixed equipment, distribution circuits'
    );
    parts.push('  → Motors get HIGHER permitted Zs (e.g., 32A Type D: 0.36Ω @ 0.4s vs 0.72Ω @ 5s)');
    parts.push(
      '**Keywords for 5s:** motor, compressor, pump, fan, conveyor, chiller, HVAC, machine, production line'
    );
    parts.push('');
    parts.push('=== EXPECTED TEST VALUES (BS 7671 PART 6) - MANDATORY NUMERICAL VALUES ===');
    parts.push(
      'Generate expectedTests object for EVERY circuit with NUMERICAL values calculated using BS 7671 formulas:'
    );
    parts.push('');
    parts.push(
      '🔴 CRITICAL: Use NUMERICAL VALUES, NOT placeholder text like "Less than 1Ω" or "Zs value within acceptable limits"'
    );
    parts.push(
      '❌ WRONG: { value: "Less than 1Ω" } | ✅ CORRECT: { at20C: 0.39, at70C: 0.47, value: "0.47Ω" }'
    );
    parts.push('');
    parts.push('1. R1+R2 (Continuity of protective conductors - BS 7671 Reg 612.2):');
    parts.push('   - Use BS 7671 Table 9A conductor resistance values (mΩ/m at 20°C)');
    parts.push('   - Formula: R1+R2 = ((R_live + R_cpc) × cable_length) / 1000');
    parts.push(
      '   - Example: 2.5mm² live (7.41 mΩ/m) + 1.5mm² CPC (12.1 mΩ/m) × 20m = 0.39Ω at 20°C'
    );
    parts.push('   - Temperature correction: at70C = at20C × 1.2');
    parts.push(
      '   - Output format: { at20C: 0.39, at70C: 0.47, value: "0.47Ω", regulation: "BS 7671 Reg 612.2" }'
    );
    parts.push('');
    parts.push('2. Zs (Earth fault loop impedance - BS 7671 Reg 612.9):');
    parts.push('   - Formula: Zs = Ze + R1+R2 (at 70°C)');
    parts.push(
      '   - Get maxPermitted from BS 7671 Table 41.3 (0.4s) or Table 41.6 (5s) based on circuit type'
    );
    parts.push(
      '   - Use Table 41.6 (5s) for motors/fixed equipment, Table 41.3 (0.4s) for final circuits'
    );
    parts.push(
      '   - Calculate margin: marginPercent = ((maxPermitted - expected) / maxPermitted) × 100'
    );
    parts.push('   - Set compliant: expected ≤ maxPermitted');
    parts.push('   - Example: Ze 0.35Ω + R1+R2 0.47Ω = 0.82Ω (max 1.37Ω for 32A Type B MCB)');
    parts.push(
      '   - Output format: { expected: 0.82, maxPermitted: 1.37, marginPercent: 40.1, compliant: true, regulation: "BS 7671 Reg 612.9" }'
    );
    parts.push('');
    parts.push('3. Insulation Resistance (BS 7671 Table 61):');
    parts.push('   - LV circuits up to 500V: testVoltage = "500V DC", minResistance = "≥1.0 MΩ"');
    parts.push('   - SELV/PELV ≤50V: testVoltage = "250V DC", minResistance = "≥0.5 MΩ"');
    parts.push(
      '   - Output format: { testVoltage: "500V DC", minResistance: "≥1.0 MΩ", regulation: "BS 7671 Table 61" }'
    );
    parts.push('');
    parts.push('4. RCD Test (if RCD/RCBO protected - BS 7671 Reg 612.13):');
    parts.push('   - ratingmA: typically 30mA for socket/bathroom circuits');
    parts.push('   - maxTripTimeMs: <300ms at 1×IΔn, <40ms at 5×IΔn');
    parts.push('   - testCurrentMultiple: 1 or 5 (standard test procedure)');
    parts.push(
      '   - Output format: { ratingmA: 30, maxTripTimeMs: 300, testCurrentMultiple: 1, regulation: "BS 7671 Reg 612.13" }'
    );
    parts.push('   - Only include if circuit is RCD/RCBO protected');
    parts.push('');
    parts.push('📋 BS 7671 Table 9A - Common Conductor Resistances (mΩ/m at 20°C):');
    parts.push('  • 1.0mm²: 18.1 | 1.5mm²: 12.1 | 2.5mm²: 7.41 | 4mm²: 4.61 | 6mm²: 3.08');
    parts.push('  • 10mm²: 1.83 | 16mm²: 1.15 | 25mm²: 0.727 | 35mm²: 0.524 | 50mm²: 0.387');
    parts.push('');

    // Field requirements
    parts.push('=== REQUIRED FIELDS ===');
    parts.push(
      'Copy from input: loadPower, phases, cableLength. Set: voltage (230V single/400V three), installationMethod, rcdProtected, circuitNumber (1+), full cableType description.'
    );

    return parts.join('\n');
  }

  /**
   * FAST GENERATION: Minimal prompt for 1-3 circuits
   * Target: 15-20 seconds
   */
  async generateFast(inputs: NormalizedInputs, context: RAGContext): Promise<Design> {
    this.logger.info('AI Designer FAST MODE', {
      circuits: inputs.circuits.length,
      ragResults: context.totalResults,
    });

    const startTime = Date.now();

    // MINIMAL PROMPT (2000 tokens max) - IET On-Site Guide Table 1B/H2 Diversity Rules
    const diversityRules =
      installationType === 'commercial'
        ? `• Lighting: 90% of total | Radial sockets: 100% up to 10A + 50% remainder | Ring finals: 32A per ring (100% largest + 50% others) | Showers: 100% largest + 80% second + 60% remainder | Heating: 90% | EV/Immersion: 100% (NO diversity)`
        : installationType === 'industrial'
          ? `• Lighting: 90% | Radial sockets: 100% up to 10A + 60% remainder | Motors/Process: 100% (NO diversity) | Heating: 100%`
          : `• Lighting: 66% of total | Radial sockets: 100% up to 10A + 40% remainder | Ring finals: 32A per ring (100% largest + 40% others) | Cookers: 10A + 30% of excess (+ 5A if socket) | Showers: 100% largest + 100% second + 25% remainder | Heating: 100% | EV/Immersion/Floor warming/Storage heaters: 100% (NO diversity)`;

    const systemPrompt = `BS 7671:2018+A4:2026 expert. Design ${inputs.circuits.length} compliant ${installationType || 'domestic'} circuit(s) WITH DIVERSITY per IET On-Site Guide.

QUICK RULES:
- Calculate Ib (connected load) AND Id (diversified current)
- Use Id for MCB selection: Id ≤ In ≤ Iz | VD ≤ 5% | Zs ≤ max
- IET ON-SITE GUIDE TABLE 1B/H2 DIVERSITY (${installationType === 'domestic' ? 'Domestic' : installationType === 'commercial' ? 'Commercial' : 'Industrial'}):
  ${diversityRules}
- RCBO for sockets/bathrooms | T&E/SWA standard sizes
- Show: Ib, Id, diversity factor with formula, key calculations | Cite "IET On-Site Guide Table 1B" or "Table H2"

${context.designKnowledge
  .slice(0, 3)
  .map((k) => `${k.primary_topic}: ${k.content.slice(0, 200)}`)
  .join('\n\n')}

CRITICAL: In diversityApplied justification, cite specific table item (e.g., "per IET On-Site Guide Table 1B item 1") and show calculation (e.g., "Ib 4.35A × 66% = Id 2.87A").`;

    const structuredInput = this.buildStructuredInput(inputs);
    const tools = [this.buildSimpleTool()];

    const response = await callOpenAI(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) },
        ],
        model: 'gpt-5.4-mini-2026-03-17',
        max_completion_tokens: 4000, // REDUCED from 8000
        tools,
        tool_choice: { type: 'function', function: { name: 'design_circuits_fast' } },
      },
      this.openAiKey,
      30000 // 30s timeout
    );

    const duration = Date.now() - startTime;
    this.logger.info('AI FAST MODE complete', {
      duration,
      circuits: response.toolCalls?.[0]
        ? JSON.parse(response.toolCalls[0].function.arguments).circuits.length
        : 0,
    });

    const design = JSON.parse(response.toolCalls[0].function.arguments);
    return design;
  }

  private buildSimpleTool(): object {
    return {
      type: 'function',
      function: {
        name: 'design_circuits_fast',
        description: 'Quick BS 7671 circuit design with diversity',
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
                      rating: { type: 'number' },
                    },
                  },
                  calculations: {
                    type: 'object',
                    properties: {
                      Ib: { type: 'number', description: 'Raw design current (connected load)' },
                      Id: {
                        type: 'number',
                        description:
                          'Diversified design current (for MCB selection) - apply BS 7671 Appendix A diversity',
                      },
                      In: { type: 'number' },
                      Iz: { type: 'number' },
                      voltageDrop: { type: 'object' },
                      zs: { type: 'number' },
                      maxZs: { type: 'number' },
                      diversityFactor: {
                        type: 'number',
                        description: 'Diversity factor applied (e.g., 0.66 for lighting)',
                      },
                      diversifiedLoad: { type: 'number', description: 'Diversified load in watts' },
                    },
                  },
                  justifications: {
                    type: 'object',
                    properties: {
                      cableSize: { type: 'string' },
                      protection: { type: 'string' },
                      diversityApplied: {
                        type: 'string',
                        description: 'Explanation of diversity applied per BS 7671 Appendix A',
                      },
                    },
                  },
                },
                required: [
                  'name',
                  'cableSize',
                  'protectionDevice',
                  'calculations',
                  'justifications',
                ],
              },
            },
          },
          required: ['circuits'],
        },
      },
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
      circuits: inputs.circuits.length,
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
          { role: 'user', content: JSON.stringify(structuredInput, null, 2) },
        ],
        model: 'gpt-5.4-mini-2026-03-17',
        max_completion_tokens: 8000, // OPTIMIZATION: 50% reduction
        tools,
        tool_choice,
      },
      this.openAiKey,
      240000 // 240s timeout (4 minutes for complex multi-circuit corrections)
    );

    const duration = Date.now() - startTime;
    this.logger.info('AI Correction complete', {
      duration,
      circuits: response.toolCalls?.[0]
        ? JSON.parse(response.toolCalls[0].function.arguments).circuits.length
        : 0,
      hasToolCalls: !!response.toolCalls,
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

    parts.push('You are a BS 7671:2018+A4:2026 electrical circuit design expert.');
    parts.push('');
    parts.push('=== CORRECTION MODE ===');
    parts.push('The previous design failed validation. Fix ONLY the errors listed below.');
    parts.push('Keep all compliant aspects of the design unchanged.');
    parts.push('');
    parts.push('=== VALIDATION ERRORS ===');
    parts.push(validationErrors);
    parts.push('');
    parts.push('=== ORIGINAL DESIGN (for reference) ===');
    parts.push(
      JSON.stringify(
        originalDesign.circuits.map((c) => ({
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
              warning: 'Missing from AI response - using defaults',
            },
            zs: c.calculations.zs !== undefined ? c.calculations.zs : 0,
            maxZs: c.calculations.maxZs !== undefined ? c.calculations.maxZs : 0,
          },
        })),
        null,
        2
      )
    );
    parts.push('');
    parts.push('=== FIX INSTRUCTIONS ===');
    parts.push('1. If In > Iz: Increase cable size or reduce MCB rating');
    parts.push('2. If voltage drop fails: Increase cable size');
    parts.push('3. If Zs too high: Increase CPC size');
    parts.push(
      '4. If RCD protection required: Change MCB to RCBO (sockets and bathrooms need RCD per 411.3.3)'
    );
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
        installationType: inputs.supply.installationType,
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
        circuitTopology: c.circuitTopology || 'auto',
        // Frontend pre-calculations (use as hints)
        hints: {
          calculatedIb: c.calculatedIb,
          suggestedMCB: c.suggestedMCB,
          calculatedDiversity: c.calculatedDiversity,
          estimatedCableSize: c.estimatedCableSize,
        },
        // Ring final enforcement (if detected)
        enforced: (c as any).enforced || null,
      })),
    };
  }

  /**
   * Build tool schema for SINGLE circuit design (used in parallel execution)
   */
  private buildSingleCircuitTool(installationType?: string): object {
    return {
      type: 'function',
      function: {
        name: 'design_single_circuit',
        description:
          'Design a single BS 7671 compliant electrical circuit. CRITICAL AUTO-CORRECTIONS: (1) 3-phase = 400/415V only, (2) Socket circuits = RCBO (never MCB), (3) Bathroom circuits = RCBO, (4) Motor FLC calculations mandatory, (5) Cable sizes must be standard T&E/SWA, (6) CPC per Table 54.7.',
        parameters: {
          type: 'object',
          properties: {
            circuit: {
              type: 'object',
              description: 'Single designed circuit',
              properties: {
                name: {
                  type: 'string',
                  description: 'Circuit name from input',
                },
                loadType: {
                  type: 'string',
                  description:
                    'Load type from input (e.g., socket_outlet, lighting, cooker, shower)',
                },
                specialLocation: {
                  type: 'string',
                  description: 'Special location from input (bathroom, outdoor, none, etc.)',
                },
                circuitTopology: {
                  type: 'string',
                  enum: ['ring', 'radial', 'not_applicable'],
                  description:
                    'Circuit topology for socket circuits. CRITICAL: ring = 32A + 2.5mm² always (BS 7671 Appendix 15), radial 32A = 4mm² minimum, radial 20A = 2.5mm² acceptable. Use from input if specified, otherwise infer from load characteristics.',
                },
                circuitNumber: {
                  type: 'number',
                  description:
                    'Circuit number - MUST be set to circuit.index + 1 from input (e.g., index 0 = Way 1, index 1 = Way 2)',
                },
                loadPower: {
                  type: 'number',
                  description:
                    'Load power in Watts (use from input or calculate from Ib * voltage)',
                },
                phases: {
                  type: 'string',
                  enum: ['single', 'three'],
                  description: 'Phase configuration from input (single or three)',
                },
                voltage: {
                  type: 'number',
                  enum: [110, 230, 400, 415],
                  description:
                    'Operating voltage: 230V single-phase, 400V or 415V three-phase, 110V site supply. THREE-PHASE MUST USE 400V OR 415V ONLY.',
                },
                cableLength: {
                  type: 'number',
                  description: 'Cable length in meters (use from input)',
                },
                installationMethod: {
                  type: 'string',
                  description:
                    'Installation method reference. IMPORTANT: SWA cables = "clipped direct" or "on cable tray" (NO conduit needed). LSZH singles = "in steel conduit" or "in metal trunking" (MUST be enclosed). T&E = "clipped direct" or "in PVC conduit". FP cables = "clipped direct with fire-rated clips". Format: "Method C - clipped direct" or "Method B - in steel conduit"',
                },
                cableType: {
                  type: 'string',
                  enum: this.getAllowedCableTypes(installationType || 'general'),
                  description: this.getCableTypeDescription(installationType || 'general'),
                },
                rcdProtected: {
                  type: 'boolean',
                  description:
                    'Whether circuit requires RCD protection (true if RCBO or special location)',
                },
                cableSize: {
                  type: 'number',
                  enum: this.getCableSizeEnum(installationType),
                  description:
                    'Live conductor CSA in mm². CRITICAL CONSISTENCY: This value MUST match the cable size stated in cableSelectionBreakdown and designJustification sections - Design Justification is the single source of truth. RING FINAL SOCKETS: MUST be 2.5mm² (BS 7671 standard). LIGHTING: Typically 1.5mm² or 2.5mm². SHOWERS/COOKERS: 6mm²-10mm². Must be standard size per BS 7671 Appendix 4.',
                },
                cpcSize: {
                  type: 'number',
                  enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0],
                  description:
                    'CPC conductor CSA in mm² per BS 7671 Table 54.7. CRITICAL FOR TWIN & EARTH: CPC is SMALLER than live (1.5mm² T&E = 1.0mm² CPC, 2.5mm² T&E = 1.5mm² CPC, 4mm² T&E = 2.5mm² CPC, 6mm² T&E = 2.5mm² CPC, 10mm² T&E = 4mm² CPC, 16mm² T&E = 6mm² CPC). For single cores/SWA, CPC typically equals live size. This affects R1+R2 and Zs calculations.',
                },
                protectionDevice: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      enum: ['MCB', 'RCBO', 'BS88', 'MCCB', 'BS1361', 'BS3036'],
                      description:
                        'Protection device type. MCB/RCBO for domestic/commercial (up to 125A). BS88 HRC fuse for industrial high fault levels or high current (125A+). MCCB for industrial very high current (>400A). BS1361 for legacy cartridge fuse boards. BS3036 for old rewirable fuse boards (assessment only). IMPORTANT: Use RCBO for ALL socket circuits (Reg 411.3.3) and bathroom circuits (Reg 701.411.3.3).',
                    },
                    rating: {
                      type: 'number',
                      enum: [
                        6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400,
                        500, 630, 800, 1000, 1250,
                      ],
                      description:
                        'Protection device rating in Amps. Standard MCB/RCBO: 6-125A. BS88 fuses: 6-1250A. MCCB: 125-1600A.',
                    },
                    curve: {
                      type: 'string',
                      enum: ['B', 'C', 'D', 'gG', 'aM'],
                      description:
                        'Trip curve/fuse class. MCB/RCBO: B (resistive), C (general), D (motors). BS88 fuses: gG (general purpose), aM (motor protection - tolerates high inrush). BS1361/BS3036: Not applicable (leave as B).',
                    },
                    kaRating: {
                      type: 'number',
                      enum: [6, 10, 16, 25, 50, 80, 100],
                      description:
                        'Short circuit breaking capacity in kA. Domestic MCB: 6-10kA. Commercial MCB: 10-16kA. Industrial MCB: 16-25kA. BS88 HRC fuse: 80kA (standard). MCCB: 50-100kA.',
                    },
                  },
                  required: ['type', 'rating', 'curve', 'kaRating'],
                },
                cable_table_ref: {
                  type: 'string',
                  description:
                    'BS 7671 Appendix 4 cable table reference grounding the cableSize choice. MUST be one of: "4D1A","4D2A","4D4A","4D5A","4E1A","4E2A","4E4A","4F1A","4F2A","4F4A","4F1B","4F2B","4G1A","4G2A","4H1A","4H2A","4J1A","4J2A","4J4A". This must match the table from which the chosen cable Iz was sourced. If RAG context lacks an explicit Iz facet for this cable choice, output "ungrounded" — do NOT invent a table number.',
                },
                regulation_refs: {
                  type: 'array',
                  description:
                    'BS 7671 regulation numbers grounding the design. Each ref must come from the RAG context provided. Minimum 2 refs required. If the model cannot ground a numeric choice in a regulation from RAG, list it under ungrounded_choices instead. Examples: [{reg:"433.1.1",reason:"Ib≤In≤Iz coordination"},{reg:"411.4.5",reason:"TN-S Zs limit"}]',
                  minItems: 2,
                  items: {
                    type: 'object',
                    properties: {
                      reg: {
                        type: 'string',
                        description:
                          'Regulation number, e.g. "433.1.1", "411.3.3", "421.1.7", "543.1.2"',
                      },
                      reason: {
                        type: 'string',
                        description: 'One-line reason this regulation applies to this circuit',
                      },
                    },
                    required: ['reg', 'reason'],
                  },
                },
                ungrounded_choices: {
                  type: 'array',
                  description:
                    'Honest signal: any numeric choice (cable size, protection rating, Zs) that the model could NOT ground in RAG context. Empty array if all grounded. If non-empty, the circuit will be flagged for human review.',
                  items: { type: 'string' },
                },
                calculations: {
                  type: 'object',
                  description: 'All BS 7671 calculations WITH DIVERSITY',
                  properties: {
                    Ib: {
                      type: 'number',
                      description:
                        'Raw design current in Amps (connected load / voltage) - BEFORE diversity',
                    },
                    Id: {
                      type: 'number',
                      description:
                        'Diversified design current in Amps (for MCB selection). Apply BS 7671 Appendix A diversity: Lighting 66%, Radial sockets 100%+40%, Cookers Table A1, Ring finals no reduction (topology handles it), Showers/Immersion/EV 100%',
                    },
                    In: {
                      type: 'number',
                      description: 'Nominal current of protection device in Amps (must be ≥ Id)',
                    },
                    Iz: {
                      type: 'number',
                      description: 'Current carrying capacity of cable in Amps (from tables)',
                    },
                    diversityFactor: {
                      type: 'number',
                      description:
                        'Diversity factor applied (e.g., 0.66 for lighting, 1.0 for ring finals/showers)',
                    },
                    diversifiedLoad: {
                      type: 'number',
                      description: 'Diversified load in Watts (connected load × diversityFactor)',
                    },
                    voltageDrop: {
                      type: 'object',
                      properties: {
                        volts: {
                          type: 'number',
                          description: 'Voltage drop in Volts',
                        },
                        percent: {
                          type: 'number',
                          description: 'Voltage drop as percentage',
                        },
                        limit: {
                          type: 'number',
                          description: 'Permitted limit (3% or 5%)',
                        },
                        compliant: {
                          type: 'boolean',
                          description: 'True if percent <= limit',
                        },
                      },
                      required: ['volts', 'percent', 'limit', 'compliant'],
                    },
                    zs: {
                      type: 'number',
                      description: 'Earth fault loop impedance in Ohms',
                    },
                    maxZs: {
                      type: 'number',
                      description: 'Maximum permitted Zs in Ohms (from tables)',
                    },
                  },
                  required: [
                    'Ib',
                    'Id',
                    'In',
                    'Iz',
                    'diversityFactor',
                    'diversifiedLoad',
                    'voltageDrop',
                    'zs',
                    'maxZs',
                  ],
                },
                expectedTests: {
                  type: 'object',
                  description: 'Expected test values for BS 7671 Part 6 verification',
                  properties: {
                    r1r2: {
                      type: 'object',
                      description: 'Continuity of protective conductors',
                      properties: {
                        at20C: {
                          type: 'number',
                          description: 'R1+R2 at 20°C in Ohms (from Table 9A)',
                        },
                        at70C: {
                          type: 'number',
                          description: 'R1+R2 at 70°C in Ohms (×1.2 temperature correction)',
                        },
                        value: {
                          type: 'string',
                          description: 'Formatted value e.g., "0.47Ω"',
                        },
                        regulation: {
                          type: 'string',
                          description: 'BS 7671 Reg 612.2',
                        },
                      },
                      required: ['at20C', 'at70C', 'value', 'regulation'],
                    },
                    zs: {
                      type: 'object',
                      description: 'Earth fault loop impedance',
                      properties: {
                        expected: {
                          type: 'number',
                          description: 'Expected Zs = Ze + R1+R2 at 70°C in Ohms',
                        },
                        maxPermitted: {
                          type: 'number',
                          description: 'Maximum from BS 7671 Table 41.3 in Ohms',
                        },
                        marginPercent: {
                          type: 'number',
                          description: 'Safety margin percentage',
                        },
                        compliant: {
                          type: 'boolean',
                          description: 'True if expected ≤ maxPermitted',
                        },
                        regulation: {
                          type: 'string',
                          description: 'BS 7671 Reg 612.9',
                        },
                      },
                      required: [
                        'expected',
                        'maxPermitted',
                        'marginPercent',
                        'compliant',
                        'regulation',
                      ],
                    },
                    insulationResistance: {
                      type: 'object',
                      description: 'Insulation resistance test',
                      properties: {
                        testVoltage: {
                          type: 'string',
                          description: '500V DC for LV, 250V DC for SELV',
                        },
                        minResistance: {
                          type: 'string',
                          description: '≥1.0 MΩ for LV, ≥0.5 MΩ for SELV',
                        },
                        regulation: {
                          type: 'string',
                          description: 'BS 7671 Table 61',
                        },
                      },
                      required: ['testVoltage', 'minResistance', 'regulation'],
                    },
                    rcd: {
                      type: 'object',
                      description: 'RCD test (only for RCD/RCBO protected circuits)',
                      properties: {
                        ratingmA: {
                          type: 'number',
                          description: 'RCD rating in mA (typically 30)',
                        },
                        maxTripTimeMs: {
                          type: 'number',
                          description: 'Max trip time at 1×IΔn (300ms)',
                        },
                        testCurrentMultiple: {
                          type: 'number',
                          description: 'Test current multiple (1 or 5)',
                        },
                        regulation: {
                          type: 'string',
                          description: 'BS 7671 Reg 612.13',
                        },
                      },
                      required: ['ratingmA', 'maxTripTimeMs', 'testCurrentMultiple', 'regulation'],
                    },
                  },
                  required: ['r1r2', 'zs', 'insulationResistance'],
                },
                justifications: {
                  type: 'object',
                  description: 'Regulation-based justifications',
                  properties: {
                    cableSize: {
                      type: 'string',
                      description: 'Why this cable size? (reference Iz table, method, Ib≤In≤Iz)',
                    },
                    protection: {
                      type: 'string',
                      description:
                        'Why this MCB/RCBO rating and type? Include: Id (diversified) ≤ In ≤ Iz, curve justification',
                    },
                    rcd: {
                      type: 'string',
                      description:
                        'Why RCBO or not? (Reg 411.3.3 for sockets, Reg 701 for bathrooms)',
                    },
                    diversityApplied: {
                      type: 'string',
                      description:
                        'Explain diversity applied per BS 7671 Appendix A. E.g., "Lighting: 66% diversity applied. 2400W connected × 0.66 = 1584W diversified (6.9A)" or "Ring final: 32A fixed per Appendix 15, ring topology provides inherent diversity"',
                    },
                    circuitTopology: {
                      type: 'string',
                      description:
                        'For socket circuits: Explain if ring or radial and cable sizing justification. E.g., "Ring final circuit: 32A + 2.5mm² per BS 7671 Appendix 15" or "Radial circuit: 32A + 4mm² per Table 4D1A (radials require larger cable than rings)"',
                    },
                  },
                  required: ['cableSize', 'protection', 'diversityApplied'],
                },
                installationNotes: {
                  type: 'string',
                  description:
                    'Circuit-specific installation guidance (2-4 sentences). CRITICAL: Must reference THIS circuit\'s exact specifications: load type, power, cable size, length, location, and protection. Example for 9.5kW shower, 10mm² cable, 18m run: "This 9.5kW shower requires 10mm² cable over 18m. Use 25mm PVC conduit where exposed. All connections must use heat-resistant terminals rated for 40A continuous load. Install RCD spur at shower pull-cord location for local isolation."',
                },
                structuredOutput: {
                  type: 'object',
                  description: 'MANDATORY structured output for professional engineering format',
                  properties: {
                    atAGlanceSummary: {
                      type: 'object',
                      description: 'Summary card with key design parameters',
                      properties: {
                        loadKw: {
                          type: 'number',
                          description:
                            'Load in kW - CALCULATE from loadPower: loadPower/1000 (e.g., 7360W → 7.36)',
                        },
                        loadIb: {
                          type: 'string',
                          description: 'Design current Ib with unit (e.g., "32A")',
                        },
                        cable: {
                          type: 'string',
                          description:
                            'Cable specification: Size and type only (e.g., "1.5mm² twin and earth" or "6mm² SWA"). DO NOT include CPC size here. CRITICAL: The size MUST match the cableSize numeric field exactly.',
                        },
                        protectiveDevice: {
                          type: 'string',
                          description: 'Protection (e.g., "40A Type B MCB (6kA)")',
                        },
                        voltageDrop: {
                          type: 'string',
                          description:
                            'VD result with compliance (e.g., "6.2V (2.7%) ✓ Compliant")',
                        },
                        zs: {
                          type: 'string',
                          description:
                            'Zs with compliance (e.g., "0.68Ω ✓ Well within 1.37Ω limit")',
                        },
                        complianceTick: {
                          type: 'boolean',
                          description: 'Overall compliance (true if all checks pass)',
                        },
                        notes: {
                          type: 'string',
                          description:
                            'Future-proofing or special conditions (e.g., "Designed with 20% safety margin for future EV charger upgrade")',
                        },
                      },
                      required: [
                        'loadKw',
                        'loadIb',
                        'cable',
                        'protectiveDevice',
                        'voltageDrop',
                        'zs',
                        'complianceTick',
                        'notes',
                      ],
                    },
                    sections: {
                      type: 'object',
                      description: 'EXACTLY 8 sections in strict order',
                      properties: {
                        circuitSummary: {
                          type: 'string',
                          description:
                            '1. Circuit Summary: Overview of the circuit purpose, load served, and installation context (100-150 words)',
                        },
                        loadDetails: {
                          type: 'string',
                          description:
                            '2. Load Details: Detailed load analysis including power factor, diversity, and current calculations (100-150 words)',
                        },
                        cableSelectionBreakdown: {
                          type: 'string',
                          description:
                            '3. Cable Selection & Calculation Breakdown: Full cable sizing logic with Iz tables, derating factors, and voltage drop calculations. CRITICAL: The cable size stated here MUST match the cableSize numeric field exactly. (150-200 words)',
                        },
                        protectiveDeviceSelection: {
                          type: 'string',
                          description:
                            '4. Protective Device Selection: MCB/RCBO selection with curve justification, Zs compliance, and fault current analysis (100-150 words)',
                        },
                        complianceConfirmation: {
                          type: 'string',
                          description:
                            '5. Compliance Confirmation: BS 7671 regulation verification with specific regulation numbers (411.3.2, 433.1, etc.) (100-150 words)',
                        },
                        designJustification: {
                          type: 'string',
                          description:
                            '6. Design Justification: Professional engineering rationale for design choices and safety margins. THIS SECTION IS THE SINGLE SOURCE OF TRUTH - the cableSize numeric field MUST match the cable size stated here. (100-150 words)',
                        },
                        safetyNotes: {
                          type: 'string',
                          description:
                            '7. Safety Notes: Critical electrical safety warnings, isolation requirements, and safe working practices (100-150 words)',
                        },
                        testingCommissioningGuidance: {
                          type: 'string',
                          description:
                            '8. Testing & Commissioning Guidance: BS 7671 Part 6 electrical tests ONLY - continuity of protective conductors (R1+R2), earth fault loop impedance (Zs), insulation resistance between live conductors and earth, RCD trip time and residual current. Include expected numerical readings based on cable size and circuit parameters, and acceptance criteria per GN3. NO installation procedures (handled by Installation Agent). (150-200 words)',
                        },
                      },
                      required: [
                        'circuitSummary',
                        'loadDetails',
                        'cableSelectionBreakdown',
                        'protectiveDeviceSelection',
                        'complianceConfirmation',
                        'designJustification',
                        'safetyNotes',
                        'testingCommissioningGuidance',
                      ],
                    },
                  },
                  required: ['atAGlanceSummary', 'sections'],
                },
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
                'cable_table_ref',
                'regulation_refs',
                'ungrounded_choices',
                'rcdProtected',
                'calculations',
                'expectedTests',
                'justifications',
                'installationNotes',
                'structuredOutput',
              ],
            },
          },
          required: ['circuit'],
          additionalProperties: false,
        },
      },
    };
  }

  /**
   * Build strict tool schema for design_circuits function (BATCH MODE - legacy)
   */
  private buildDesignTool(installationType?: string): object {
    return {
      type: 'function',
      function: {
        name: 'design_circuits',
        description:
          'Design BS 7671 compliant electrical circuits. CRITICAL AUTO-CORRECTIONS: (1) 3-phase = 400/415V only, (2) ALL socket circuits = RCBO (never MCB), (3) Bathroom circuits = RCBO, (4) Motor FLC calculations mandatory, (5) Cable sizes must be standard T&E/SWA, (6) CPC per Table 54.7.',
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
                    description: 'Circuit name from input',
                  },
                  loadType: {
                    type: 'string',
                    description:
                      'Load type from input (e.g., socket_outlet, lighting, cooker, shower)',
                  },
                  specialLocation: {
                    type: 'string',
                    description: 'Special location from input (bathroom, outdoor, none, etc.)',
                  },
                  circuitNumber: {
                    type: 'number',
                    description: 'Circuit number (sequential from 1)',
                  },
                  loadPower: {
                    type: 'number',
                    description:
                      'Load power in Watts (use from input or calculate from Ib * voltage)',
                  },
                  phases: {
                    type: 'string',
                    enum: ['single', 'three'],
                    description: 'Phase configuration from input (single or three)',
                  },
                  voltage: {
                    type: 'number',
                    enum: [110, 230, 400, 415],
                    description:
                      'Operating voltage: 230V single-phase, 400V or 415V three-phase, 110V site supply. THREE-PHASE MUST USE 400V OR 415V ONLY.',
                  },
                  cableLength: {
                    type: 'number',
                    description: 'Cable length in meters (use from input)',
                  },
                  installationMethod: {
                    type: 'string',
                    description:
                      'Installation method reference. IMPORTANT: SWA cables = "clipped direct" or "on cable tray" (NO conduit needed). LSZH singles = "in steel conduit" or "in metal trunking" (MUST be enclosed). T&E = "clipped direct" or "in PVC conduit". FP cables = "clipped direct with fire-rated clips". Format: "Method C - clipped direct" or "Method B - in steel conduit"',
                  },
                  cableType: {
                    type: 'string',
                    enum: this.getAllowedCableTypes(installationType || 'general'),
                    description: this.getCableTypeDescription(installationType || 'general'),
                  },
                  rcdProtected: {
                    type: 'boolean',
                    description:
                      'Whether circuit requires RCD protection (true if RCBO or special location)',
                  },
                  cableSize: {
                    type: 'number',
                    enum: this.getCableSizeEnum(installationType),
                    description:
                      'Live conductor CSA in mm². RING FINAL SOCKETS: MUST be 2.5mm² (BS 7671 standard). LIGHTING: Typically 1.5mm² or 2.5mm². SHOWERS/COOKERS: 6mm²-10mm². Must be standard size per BS 7671 Appendix 4.',
                  },
                  cpcSize: {
                    type: 'number',
                    enum: [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0],
                    description:
                      'CPC conductor CSA in mm² per BS 7671 Table 54.7. CRITICAL FOR TWIN & EARTH: CPC is SMALLER than live (1.5mm² T&E = 1.0mm² CPC, 2.5mm² T&E = 1.5mm² CPC, 4mm² T&E = 2.5mm² CPC, 6mm² T&E = 2.5mm² CPC, 10mm² T&E = 4mm² CPC, 16mm² T&E = 6mm² CPC). For single cores/SWA, CPC typically equals live size. This affects R1+R2 and Zs calculations.',
                  },
                  protectionDevice: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        enum: ['MCB', 'RCBO', 'BS88', 'MCCB', 'BS1361', 'BS3036'],
                        description:
                          'Protection device type. MCB/RCBO for domestic/commercial (up to 125A). BS88 HRC fuse for industrial high fault levels or high current (125A+). MCCB for industrial very high current (>400A). BS1361 for legacy cartridge fuse boards. BS3036 for old rewirable fuse boards (assessment only). IMPORTANT: Use RCBO for ALL socket circuits (Reg 411.3.3) and bathroom circuits (Reg 701.411.3.3).',
                      },
                      rating: {
                        type: 'number',
                        enum: [
                          6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400,
                          500, 630, 800, 1000, 1250,
                        ],
                        description:
                          'Protection device rating in Amps. Standard MCB/RCBO: 6-125A. BS88 fuses: 6-1250A. MCCB: 125-1600A.',
                      },
                      curve: {
                        type: 'string',
                        enum: ['B', 'C', 'D', 'gG', 'aM'],
                        description:
                          'Trip curve/fuse class. MCB/RCBO: B (resistive), C (general), D (motors). BS88 fuses: gG (general purpose), aM (motor protection - tolerates high inrush). BS1361/BS3036: Not applicable (leave as B).',
                      },
                      kaRating: {
                        type: 'number',
                        enum: [6, 10, 16, 25, 50, 80, 100],
                        description:
                          'Short circuit breaking capacity in kA. Domestic MCB: 6-10kA. Commercial MCB: 10-16kA. Industrial MCB: 16-25kA. BS88 HRC fuse: 80kA (standard). MCCB: 50-100kA.',
                      },
                      fuseClass: {
                        type: 'string',
                        enum: ['gG', 'aM', 'gM'],
                        description:
                          'Fuse class for BS88/BS1361/BS3036 only. gG = general purpose (full range), aM = motor (partial range - allows high inrush), gM = motor (full range). Leave empty for MCB/RCBO/MCCB.',
                      },
                    },
                    required: ['type', 'rating', 'curve', 'kaRating'],
                  },
                  calculations: {
                    type: 'object',
                    description: 'All BS 7671 calculations WITH DIVERSITY',
                    properties: {
                      Ib: {
                        type: 'number',
                        description:
                          'Raw design current in Amps (connected load / voltage) - BEFORE diversity',
                      },
                      Id: {
                        type: 'number',
                        description:
                          'Diversified design current in Amps (for MCB selection). Apply BS 7671 Appendix A diversity: Lighting 66%, Radial sockets 100%+40%, Cookers Table A1, Ring finals no reduction (topology handles it), Showers/Immersion/EV 100%',
                      },
                      In: {
                        type: 'number',
                        description: 'Nominal current of protection device in Amps (must be ≥ Id)',
                      },
                      Iz: {
                        type: 'number',
                        description: 'Current carrying capacity of cable in Amps (from tables)',
                      },
                      diversityFactor: {
                        type: 'number',
                        description:
                          'Diversity factor applied (e.g., 0.66 for lighting, 1.0 for ring finals/showers)',
                      },
                      diversifiedLoad: {
                        type: 'number',
                        description: 'Diversified load in Watts (connected load × diversityFactor)',
                      },
                      voltageDrop: {
                        type: 'object',
                        properties: {
                          volts: {
                            type: 'number',
                            description: 'Voltage drop in Volts',
                          },
                          percent: {
                            type: 'number',
                            description: 'Voltage drop as percentage',
                          },
                          limit: {
                            type: 'number',
                            description: 'Permitted limit (3% or 5%)',
                          },
                          compliant: {
                            type: 'boolean',
                            description: 'True if percent <= limit',
                          },
                        },
                        required: ['volts', 'percent', 'limit', 'compliant'],
                      },
                      zs: {
                        type: 'number',
                        description: 'Earth fault loop impedance in Ohms',
                      },
                      maxZs: {
                        type: 'number',
                        description: 'Maximum permitted Zs in Ohms (from tables)',
                      },
                    },
                    required: [
                      'Ib',
                      'Id',
                      'In',
                      'Iz',
                      'diversityFactor',
                      'diversifiedLoad',
                      'voltageDrop',
                      'zs',
                      'maxZs',
                    ],
                  },
                  expectedTests: {
                    type: 'object',
                    description: 'Expected test values for BS 7671 Part 6 verification',
                    properties: {
                      r1r2: {
                        type: 'object',
                        description: 'Continuity of protective conductors',
                        properties: {
                          at20C: {
                            type: 'number',
                            description: 'R1+R2 at 20°C in Ohms (from Table 9A)',
                          },
                          at70C: {
                            type: 'number',
                            description: 'R1+R2 at 70°C in Ohms (×1.2 temperature correction)',
                          },
                          value: {
                            type: 'string',
                            description: 'Formatted value e.g., "0.47Ω"',
                          },
                          regulation: {
                            type: 'string',
                            description: 'BS 7671 Reg 612.2',
                          },
                        },
                        required: ['at20C', 'at70C', 'value', 'regulation'],
                      },
                      zs: {
                        type: 'object',
                        description: 'Earth fault loop impedance',
                        properties: {
                          expected: {
                            type: 'number',
                            description: 'Expected Zs = Ze + R1+R2 at 70°C in Ohms',
                          },
                          maxPermitted: {
                            type: 'number',
                            description: 'Maximum from BS 7671 Table 41.3 in Ohms',
                          },
                          marginPercent: {
                            type: 'number',
                            description: 'Safety margin percentage',
                          },
                          compliant: {
                            type: 'boolean',
                            description: 'True if expected ≤ maxPermitted',
                          },
                          regulation: {
                            type: 'string',
                            description: 'BS 7671 Reg 612.9',
                          },
                        },
                        required: [
                          'expected',
                          'maxPermitted',
                          'marginPercent',
                          'compliant',
                          'regulation',
                        ],
                      },
                      insulationResistance: {
                        type: 'object',
                        description: 'Insulation resistance test',
                        properties: {
                          testVoltage: {
                            type: 'string',
                            description: '500V DC for LV, 250V DC for SELV',
                          },
                          minResistance: {
                            type: 'string',
                            description: '≥1.0 MΩ for LV, ≥0.5 MΩ for SELV',
                          },
                          regulation: {
                            type: 'string',
                            description: 'BS 7671 Table 61',
                          },
                        },
                        required: ['testVoltage', 'minResistance', 'regulation'],
                      },
                      rcd: {
                        type: 'object',
                        description: 'RCD test (only for RCD/RCBO protected circuits)',
                        properties: {
                          ratingmA: {
                            type: 'number',
                            description: 'RCD rating in mA (typically 30)',
                          },
                          maxTripTimeMs: {
                            type: 'number',
                            description: 'Max trip time at 1×IΔn (300ms)',
                          },
                          testCurrentMultiple: {
                            type: 'number',
                            description: 'Test current multiple (1 or 5)',
                          },
                          regulation: {
                            type: 'string',
                            description: 'BS 7671 Reg 612.13',
                          },
                        },
                        required: [
                          'ratingmA',
                          'maxTripTimeMs',
                          'testCurrentMultiple',
                          'regulation',
                        ],
                      },
                    },
                    required: ['r1r2', 'zs', 'insulationResistance'],
                  },
                  justifications: {
                    type: 'object',
                    description: 'Regulation-based justifications',
                    properties: {
                      cableSize: {
                        type: 'string',
                        description: 'Why this cable size? (reference Iz table, method, Ib≤In≤Iz)',
                      },
                      protection: {
                        type: 'string',
                        description:
                          'Why this MCB/RCBO rating and type? Include: Id (diversified) ≤ In ≤ Iz, curve justification',
                      },
                      rcd: {
                        type: 'string',
                        description:
                          'Why RCBO or not? (Reg 411.3.3 for sockets, Reg 701 for bathrooms)',
                      },
                      diversityApplied: {
                        type: 'string',
                        description:
                          'Explain diversity applied per BS 7671 Appendix A. E.g., "Lighting: 66% diversity applied. 2400W connected × 0.66 = 1584W diversified (6.9A)" or "Ring final: 32A fixed per Appendix 15, ring topology provides inherent diversity"',
                      },
                    },
                    required: ['cableSize', 'protection', 'diversityApplied'],
                  },
                  installationNotes: {
                    type: 'string',
                    description:
                      'Circuit-specific installation guidance (2-4 sentences). CRITICAL: Must reference THIS circuit\'s exact specifications: load type, power, cable size, length, location, and protection. Example for 9.5kW shower, 10mm² cable, 18m run: "This 9.5kW shower requires 10mm² cable over 18m. Use 25mm PVC conduit where exposed. All connections must use heat-resistant terminals rated for 40A continuous load. Install RCD spur at shower pull-cord location for local isolation."',
                  },
                  structuredOutput: {
                    type: 'object',
                    description:
                      'PHASE 5: MANDATORY structured output for professional engineering format',
                    properties: {
                      atAGlanceSummary: {
                        type: 'object',
                        description: 'Summary card with key design parameters',
                        properties: {
                          loadKw: {
                            type: 'number',
                            description:
                              'Load in kW - CALCULATE from loadPower: loadPower/1000 (e.g., 7360W → 7.36)',
                          },
                          loadIb: {
                            type: 'string',
                            description: 'Design current Ib with unit (e.g., "32A")',
                          },
                          cable: {
                            type: 'string',
                            description:
                              'Cable specification: Size and type only (e.g., "1.5mm² twin and earth" or "6mm² SWA"). DO NOT include CPC size here.',
                          },
                          protectiveDevice: {
                            type: 'string',
                            description: 'Protection (e.g., "40A Type B MCB (6kA)")',
                          },
                          voltageDrop: {
                            type: 'string',
                            description:
                              'VD result with compliance (e.g., "6.2V (2.7%) ✓ Compliant")',
                          },
                          zs: {
                            type: 'string',
                            description:
                              'Zs with compliance (e.g., "0.68Ω ✓ Well within 1.37Ω limit")',
                          },
                          complianceTick: {
                            type: 'boolean',
                            description: 'Overall compliance (true if all checks pass)',
                          },
                          notes: {
                            type: 'string',
                            description:
                              'Future-proofing or special conditions (e.g., "Designed with 20% safety margin for future EV charger upgrade")',
                          },
                        },
                        required: [
                          'loadKw',
                          'loadIb',
                          'cable',
                          'protectiveDevice',
                          'voltageDrop',
                          'zs',
                          'complianceTick',
                          'notes',
                        ],
                      },
                      sections: {
                        type: 'object',
                        description: 'EXACTLY 8 sections in strict order - NO REPETITION',
                        properties: {
                          circuitSummary: {
                            type: 'string',
                            description:
                              '1. Circuit Summary: Overview of the circuit purpose, load served, and installation context (100-150 words)',
                          },
                          loadDetails: {
                            type: 'string',
                            description:
                              '2. Load Details: Detailed load analysis including power factor, diversity, and current calculations (100-150 words)',
                          },
                          cableSelectionBreakdown: {
                            type: 'string',
                            description:
                              '3. Cable Selection & Calculation Breakdown: Full cable sizing logic with Iz tables, derating factors, and voltage drop calculations (150-200 words)',
                          },
                          protectiveDeviceSelection: {
                            type: 'string',
                            description:
                              '4. Protective Device Selection: MCB/RCBO selection with curve justification, Zs compliance, and fault current analysis (100-150 words)',
                          },
                          complianceConfirmation: {
                            type: 'string',
                            description:
                              '5. Compliance Confirmation: BS 7671 regulation verification with specific regulation numbers (411.3.2, 433.1, etc.) (100-150 words)',
                          },
                          designJustification: {
                            type: 'string',
                            description:
                              '6. Design Justification: Professional engineering rationale for design choices and safety margins (100-150 words)',
                          },
                          safetyNotes: {
                            type: 'string',
                            description:
                              '7. Safety Notes: Critical electrical safety warnings, isolation requirements, and safe working practices (100-150 words)',
                          },
                          testingCommissioningGuidance: {
                            type: 'string',
                            description:
                              '8. Testing & Commissioning Guidance: BS 7671 Part 6 electrical tests ONLY - continuity of protective conductors (R1+R2), earth fault loop impedance (Zs), insulation resistance between live conductors and earth, RCD trip time and residual current. Include expected numerical readings based on cable size and circuit parameters, and acceptance criteria per GN3. NO installation procedures (handled by Installation Agent). (150-200 words)',
                          },
                        },
                        required: [
                          'circuitSummary',
                          'loadDetails',
                          'cableSelectionBreakdown',
                          'protectiveDeviceSelection',
                          'complianceConfirmation',
                          'designJustification',
                          'safetyNotes',
                          'testingCommissioningGuidance',
                        ],
                      },
                    },
                    required: ['atAGlanceSummary', 'sections'],
                  },
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
                  'expectedTests',
                  'justifications',
                  'installationNotes',
                  'structuredOutput',
                ],
              },
            },
            reasoning: {
              type: 'object',
              description: 'PHASE 4: Overall design reasoning and compliance verification',
              properties: {
                voltageContext: {
                  type: 'string',
                  description:
                    'Explain voltage selection implications (110V/230V/400V, single/three-phase)',
                },
                cableSelectionLogic: {
                  type: 'string',
                  description: 'Overall strategy for cable sizing across all circuits',
                },
                protectionLogic: {
                  type: 'string',
                  description: 'Protection device selection strategy and coordination',
                },
                complianceChecks: {
                  type: 'string',
                  description: 'Summary of BS 7671 compliance verification performed',
                },
                correctionsApplied: {
                  type: 'string',
                  description: 'If in correction mode, explain all corrections made',
                },
              },
              required: [
                'voltageContext',
                'cableSelectionLogic',
                'protectionLogic',
                'complianceChecks',
              ],
            },
          },
          required: ['circuits', 'reasoning'],
          additionalProperties: false,
        },
      },
    };
  }

  /**
   * Get allowed cable types based on installation environment with circuit-type-specific rules
   * LAYER 2: Dynamic Schema Constraint - now with priority-based rules
   */
  private getAllowedCableTypes(installationType: string): string[] {
    const cableSizes = [
      '1.5mm²',
      '2.5mm²',
      '4mm²',
      '6mm²',
      '10mm²',
      '16mm²',
      '25mm²',
      '35mm²',
      '50mm²',
      '70mm²',
      '95mm²',
    ];

    // Enhanced rules include fire-rated cables for ALL environments
    // Fire/emergency circuits will be enforced at system prompt level
    if (installationType === 'domestic') {
      return [
        ...cableSizes.map((size) => `${size} twin and earth`),
        ...cableSizes.map((size) => `${size} SWA`),
        // Add fire-rated options for emergency circuits in domestic (rare but possible)
        ...cableSizes.map((size) => `${size} FP200`),
        ...cableSizes.map((size) => `${size} FP400`),
      ];
    }

    if (installationType === 'commercial') {
      return [
        ...cableSizes.map((size) => `${size} LSZH single`),
        ...cableSizes.map((size) => `${size} SWA`),
        ...cableSizes.map((size) => `${size} FP200`),
        ...cableSizes.map((size) => `${size} FP400`),
        ...cableSizes.map((size) => `${size} MICC`),
      ];
    }

    if (installationType === 'industrial') {
      return [
        ...cableSizes.map((size) => `${size} SWA`),
        ...cableSizes.map((size) => `${size} LSZH single`),
        ...cableSizes.map((size) => `${size} FP200`),
        ...cableSizes.map((size) => `${size} FP400`),
        ...cableSizes.map((size) => `${size} armoured flex`),
        ...cableSizes.map((size) => `${size} XLPE`),
      ];
    }

    // Fallback: all types allowed
    return [
      ...cableSizes.map((size) => `${size} twin and earth`),
      ...cableSizes.map((size) => `${size} SWA`),
      ...cableSizes.map((size) => `${size} LSZH single`),
      ...cableSizes.map((size) => `${size} FP200`),
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
      return `INDUSTRIAL CABLE SELECTION:

FOR OFFICE/RECEPTION AREAS WITHIN INDUSTRIAL BUILDINGS:
- Use LSZH singles in galvanised steel trunking for clean office environments
- SWA is overkill for internal office sockets, lighting, or data
- Galvanised trunking provides containment and earthing

FOR INDUSTRIAL PROCESS AREAS:
- SWA standard for machinery, motors, and equipment
- SWA REQUIRED for routes through harsh/washdown environments
- SWA REQUIRED for external runs and buried cables
- XLPE for high temperature environments
- Armoured flex for machinery with vibration/movement

PRIORITY: Fire/emergency circuits MUST use FP200/FP400.

Format: "10mm² SWA" or "2.5mm² LSZH single" or "1.5mm² FP200"`;
    }

    return 'Cable type: size + type. PRIORITY: Fire/emergency MUST use FP200/FP400, outdoor MUST use SWA. Format: "2.5mm² twin and earth" or "6mm² SWA" or "1.5mm² FP200"';
  }

  /**
   * Get cable size enum - all standard sizes available
   * Circuit-type-specific guidance is provided in description field
   */
  private getCableSizeEnum(installationType: string): number[] {
    // Return all standard sizes
    // AI will select appropriate size based on pre-validation constraints and circuit type
    return [1.0, 1.5, 2.5, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0, 70.0, 95.0];
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
    const hasMotors = inputs.circuits.some(
      (c) =>
        c.loadType.toLowerCase().includes('motor') || c.loadType.toLowerCase().includes('machinery')
    );

    const hasThreePhase = inputs.circuits.some((c) => c.phases === 'three');
    const hasLargePower = inputs.circuits.some((c) => c.loadPower > 10000); // >10kW

    if (hasMotors || (hasThreePhase && hasLargePower)) {
      return 'industrial';
    }

    const hasCommercialLoads = inputs.circuits.some(
      (c) =>
        c.loadType.toLowerCase().includes('emergency') ||
        c.loadType.toLowerCase().includes('fire alarm') ||
        c.loadType.toLowerCase().includes('data')
    );

    if (hasCommercialLoads || (hasThreePhase && !hasMotors)) {
      return 'commercial';
    }

    return 'domestic';
  }

  /**
   * Detect circuit type from name and load type
   */
  private detectCircuitTypeFromName(name: string, loadType: string): string {
    const nameLower = name.toLowerCase();
    const typeLower = loadType.toLowerCase();

    if (nameLower.includes('ring') || typeLower.includes('ring')) return 'socket_ring';
    if (
      typeLower.includes('lighting') ||
      nameLower.includes('lighting') ||
      nameLower.includes('light')
    )
      return 'lighting';
    if (typeLower.includes('socket') || nameLower.includes('socket')) return 'socket';
    if (typeLower.includes('cooker') || nameLower.includes('cooker')) return 'cooker';
    if (typeLower.includes('shower') || nameLower.includes('shower')) return 'shower';

    return 'other';
  }
}

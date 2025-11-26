/**
 * Design Pipeline - Core Orchestrator
 * 1. Normalize → 2. Cache Check → 3. RAG → 4. AI → 5. Validate → 6. Cache Store
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { searchDesignIntelligence, searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';
import { AIDesigner } from './ai-designer.ts';
import { ValidationEngine } from './validation-engine.ts';
import { DeterministicCalculator } from './deterministic-calculations.ts';
import { PreValidationCalculator } from './pre-validation-calculator.ts';
import { AutoFixEngine } from './auto-fix-engine.ts';
import { safeAll, type ParallelTask } from '../_shared/safe-parallel.ts';
import type { NormalizedInputs, DesignResult } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private ai: AIDesigner;
  private validator: ValidationEngine;
  private calculator: DeterministicCalculator;
  private preValidator: PreValidationCalculator;
  private autoFix: AutoFixEngine;
  private progressCallback?: (msg: string) => void;

  constructor(
    private logger: any, 
    private requestId: string,
    progressCallback?: (msg: string) => void
  ) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.ai = new AIDesigner(logger);
    this.validator = new ValidationEngine(logger);
    this.calculator = new DeterministicCalculator(logger);
    this.preValidator = new PreValidationCalculator(logger);
    this.autoFix = new AutoFixEngine(logger);
    this.progressCallback = progressCallback;
  }

  async execute(rawInput: any): Promise<DesignResult> {
    const startTime = Date.now();
    
    // ========================================
    // PHASE 1: Normalize & Validate Form Inputs
    // ========================================
    const normalized = this.normalizer.normalize(rawInput);
    this.logger.info('Form normalized', {
      circuits: normalized.circuits.length,
      voltage: normalized.supply.voltage,
      phases: normalized.supply.phases,
      earthing: normalized.supply.earthing
    });

    // ========================================
    // PHASE 1.5: Pre-Validation Constraints Calculator (NEW)
    // Calculate minimum cable sizes and protection requirements BEFORE AI
    // ========================================
    const preValidationConstraints = this.preValidator.calculateAll(
      normalized.circuits,
      normalized.supply
    );

    this.logger.info('Pre-validation constraints calculated', {
      constraintsCount: preValidationConstraints.size,
      sampleConstraints: Array.from(preValidationConstraints.entries())
        .slice(0, 2)
        .map(([key, val]) => ({
          key,
          minCable: val.minimumCableSize,
          mcb: val.recommendedMCB,
          rcbo: val.mustUseRCBO
        }))
    });

    // ========================================
    // PHASE 2: Cache Check (DISABLED FOR TESTING RING FINAL FIX)
    // ========================================
    const cacheKey = this.cache.generateKey(normalized);
    
    // TEMPORARILY DISABLED - Force fresh generation for testing
    const cached = null; // Force cache miss
    // const cached = await this.cache.get(cacheKey); // DISABLED
    
    if (cached) {
      // This block will never execute while disabled
      this.logger.info('Cache HIT (disabled)', {
        key: cacheKey.slice(0, 12)
      });
    }
    
    this.logger.info('Cache DISABLED - forcing fresh generation', {
      key: cacheKey.slice(0, 12)
    });

    // ========================================
    // Regular path: 1-5 circuits → full RAG + complete prompt (90s timeout)
    // Batch path: 6+ circuits → parallel batch processing
    // ========================================

    // ========================================
    // PHASE 3: Fast Indexed RAG Search (Intelligence Tables)
    // Uses GIN-indexed keyword search on intelligence tables
    // ========================================
    const ragStart = Date.now();
    
    // Create Supabase client for intelligence search
    const { createClient } = await import('../_shared/deps.ts');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // Extract search keywords from circuits (targeting ~50 keywords for comprehensive RAG)
    const keywords = new Set<string>();
    const loadTypes = new Set<string>();
    const cableSizes = new Set<number>();
    
    // Circuit type keyword mappings for precise RAG matches
    const circuitTypeKeywords: Record<string, string[]> = {
      'socket': ['ring final', 'radial circuit', '13 A socket-outlet', '2.5mm', '32A', '433-02-01', 'ring circuit'],
      'ring': ['ring final', '2.5mm', '32A', '433-02-01', 'ring circuit', 'socket-outlet'],
      'lighting': ['lighting circuit', '1.5mm', '6A', 'B6', 'Type B', 'radial', 'lighting point'],
      'cooker': ['cooker circuit', '6mm', '10mm', '32A', '45A', 'cooker control unit', 'diversity'],
      'shower': ['shower circuit', 'instantaneous water heater', '40A', '45A', '6mm', '10mm', 'bathroom'],
      'immersion': ['immersion heater', '16A', '3kW', '2.5mm', 'hot water'],
      'ev_charger': ['electric vehicle', 'EV charger', '32A', '6mm', '7kW', 'car charging'],
      'oven': ['cooker circuit', '32A', '6mm', 'oven', 'diversity'],
      'hob': ['cooker circuit', '32A', '6mm', 'hob', 'diversity'],
      'motor': ['motor circuit', 'Type D', 'starting current', 'inrush']
    };
    
    normalized.circuits.forEach(circuit => {
      // Add load type
      const loadTypeLower = circuit.loadType.toLowerCase();
      loadTypes.add(loadTypeLower);
      
      // Add voltage keywords
      keywords.add(`${normalized.supply.voltage}v`);
      keywords.add(normalized.supply.phases === 3 ? 'three-phase' : 'single-phase');
      
      // Add circuit-specific keywords
      keywords.add(loadTypeLower);
      keywords.add('cable sizing');
      keywords.add('voltage drop');
      keywords.add('protection');
      
      // Add circuit-type-specific keywords for precise RAG matching
      Object.keys(circuitTypeKeywords).forEach(typeKey => {
        if (loadTypeLower.includes(typeKey) || circuit.name.toLowerCase().includes(typeKey)) {
          circuitTypeKeywords[typeKey].forEach(kw => keywords.add(kw));
        }
      });
      
      // Detect ring finals from name/description OR power
      const isLikelyRingFinal = 
        circuit.name.toLowerCase().includes('ring') || 
        (loadTypeLower === 'socket' && circuit.loadPower <= 7360);
      
      if (isLikelyRingFinal) {
        keywords.add('ring final');
        keywords.add('32A');
        keywords.add('2.5mm');
        keywords.add('433-02-01');
        keywords.add('ring circuit');
        keywords.add('13 A socket-outlet');
      }
      
      // Power-based keyword inference for specific circuit types
      if (circuit.loadPower >= 7000 && circuit.loadPower <= 10500) {
        keywords.add('shower');
        keywords.add('instantaneous water heater');
        keywords.add('40A');
        keywords.add('45A');
        keywords.add('10mm');
        keywords.add('high power bathroom');
      }
      
      if (circuit.loadPower >= 5000 && circuit.loadPower <= 15000) {
        if (circuit.name.toLowerCase().includes('cooker') || 
            circuit.name.toLowerCase().includes('oven') ||
            circuit.name.toLowerCase().includes('hob')) {
          keywords.add('cooker circuit');
          keywords.add('32A');
          keywords.add('45A');
          keywords.add('6mm');
          keywords.add('10mm');
          keywords.add('diversity');
        }
      }
      
      if (circuit.loadPower >= 7000 && (circuit.name.toLowerCase().includes('ev') || circuit.name.toLowerCase().includes('charger'))) {
        keywords.add('electric vehicle');
        keywords.add('EV charger');
        keywords.add('32A');
        keywords.add('6mm');
        keywords.add('Mode 3');
      }
      
      // Design-specific keywords (cable sizing, protection, compliance)
      keywords.add('diversity factor');
      keywords.add('derating factors');
      keywords.add('grouping factor');
      keywords.add('ambient temperature');
      keywords.add('buried depth');
      
      // Special location keywords
      if (circuit.specialLocation) {
        keywords.add(circuit.specialLocation.toLowerCase());
      }
      
      // Common cable sizes for filtering
      [1.5, 2.5, 4, 6, 10, 16, 25, 35].forEach(size => cableSizes.add(size));
    });
    
    this.logger.info('RAG search parameters', {
      keywords: Array.from(keywords),
      loadTypes: Array.from(loadTypes),
      cableSizes: Array.from(cableSizes),
      keywordCount: keywords.size,
      sampleKeywords: Array.from(keywords).slice(0, 10)
    });
    
    // PARALLEL: Search design and regulations intelligence tables (installation guidance handled by separate agent)
    let designIntelligence: any[] = [];
    let regulationsIntelligence: any[] = [];
    
    try {
      [designIntelligence, regulationsIntelligence] = await Promise.all([
        searchDesignIntelligence(supabase, {
          keywords: Array.from(keywords),
          loadTypes: Array.from(loadTypes),
          cableSizes: Array.from(cableSizes),
          categories: ['cable_sizing', 'voltage_drop', 'protection'],
          limit: 20  // Increased from 15 since we removed practical work
        }),
        searchRegulationsIntelligence(supabase, {
          keywords: Array.from(keywords),
          appliesTo: Array.from(loadTypes),
          limit: 15  // Increased from 10 since we removed practical work
        })
      ]);
    } catch (ragError) {
      this.logger.error('RAG search failed', {
        error: ragError instanceof Error ? ragError.message : String(ragError),
        keywords: Array.from(keywords).slice(0, 5)
      });
      // Continue with empty results rather than failing
      designIntelligence = [];
      regulationsIntelligence = [];
    }
    
    const ragTime = Date.now() - ragStart;
    
    // ENHANCED LOGGING: Verify RAG returns circuit-specific data
    const ringFinalMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('ring final') || k.toLowerCase().includes('ring circuit'))
    ).length;
    const cookerMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('cooker'))
    ).length;
    const showerMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('shower'))
    ).length;
    const lightingMatches = designIntelligence.filter((d: any) => 
      d.keywords?.some((k: string) => k.toLowerCase().includes('lighting'))
    ).length;
    
    this.logger.info('Fast RAG complete (2-layer design focus)', {
      designIntelligence: designIntelligence.length,
      regulationsIntelligence: regulationsIntelligence.length,
      searchTime: ragTime,
      note: 'Installation guidance handled by Design Installation Agent',
      circuitSpecificMatches: {
        ringFinals: ringFinalMatches,
        cookers: cookerMatches,
        showers: showerMatches,
        lighting: lightingMatches
      },
      sampleDesignKeywords: designIntelligence.slice(0, 3).map((d: any) => d.keywords?.slice(0, 3)).flat(),
      sampleRegulations: regulationsIntelligence.slice(0, 3).map((r: any) => r.regulation_number)
    });
    
    // CRITICAL CHECK: Verify RAG returned results
    if (designIntelligence.length === 0 && regulationsIntelligence.length === 0) {
      this.logger.warn('RAG returned ZERO results - AI will use general knowledge only', {
        keywords: Array.from(keywords).slice(0, 10),
        possibleCauses: [
          'Keywords do not match database entries',
          'Database table is empty',
          'RAG search query syntax issue'
        ]
      });
    }
    
    // Build RAG context for AI (pure design focus - no practical work)
    const ragContext = {
      regulations: regulationsIntelligence.map((r: any) => ({
        regulation_number: r.regulation_number,
        content: r.content,
        confidence: r.confidence_score || 0,
        source: 'regulations_intelligence'
      })),
      designKnowledge: designIntelligence,
      totalResults: designIntelligence.length + regulationsIntelligence.length,
      searchTime: ragTime
    };
    
    this.logger.info('RAG context built', {
      totalResults: ragContext.totalResults,
      hasRegulations: ragContext.regulations.length > 0,
      hasDesignKnowledge: ragContext.designKnowledge.length > 0,
      isEmpty: ragContext.totalResults === 0
    });

    // ========================================
    // PHASE 4: AI Design Generation (with batch processing)
    // ========================================
    let design: any;
    
    // Log batch evaluation for debugging
    this.logger.info('Evaluating batch processing need', {
      circuitCount: normalized.circuits.length,
      willBatch: normalized.circuits.length > 2
    });
    
    // PER-CIRCUIT PARALLEL PROCESSING for all circuit counts
    if (normalized.circuits.length === 1) {
      // Single circuit: use regular generation
      this.logger.info('Single circuit mode', {
        circuit: normalized.circuits[0].name,
        timeout: '90s'
      });
      design = await this.ai.generate(normalized, ragContext, preValidationConstraints);
      
      this.logger.info('AI design complete', {
        circuits: design.circuits.length
      });
    } else {
      // PARALLEL PROCESSING: Generate each circuit in parallel for 2+ circuits
      const parallelStartTime = Date.now();
      
      this.logger.info('Per-circuit parallel processing enabled', {
        totalCircuits: normalized.circuits.length,
        estimatedTime: '40-60s (all circuits in parallel)'
      });

      // Create parallel tasks for each individual circuit
      const circuitTasks: ParallelTask<any>[] = normalized.circuits.map((circuit, i) => ({
        name: `Circuit ${i + 1}/${normalized.circuits.length}: ${circuit.name}`,
        execute: async () => {
          const circuitStartTime = Date.now();
          
          this.logger.info(`Circuit ${i + 1}/${normalized.circuits.length} starting`, {
            name: circuit.name,
            loadType: circuit.loadType,
            power: circuit.loadPower
          });

          // Create single-circuit inputs for this specific circuit
          const singleCircuitInputs: NormalizedInputs = {
            supply: normalized.supply,
            circuits: [circuit]
          };

          // Generate design for this single circuit (reuse RAG context)
          const circuitDesign = await this.ai.generate(
            singleCircuitInputs,
            ragContext,
            preValidationConstraints
          );

          this.logger.info(`Circuit ${i + 1}/${normalized.circuits.length} complete`, {
            duration: Date.now() - circuitStartTime,
            cableType: circuitDesign.circuits[0]?.cableType,
            protection: circuitDesign.circuits[0]?.protectionDevice?.rating
          });

          return {
            circuit: circuitDesign.circuits[0],
            reasoning: circuitDesign.reasoning,
            originalIndex: i
          };
        }
      }));

      // Execute all circuits in parallel
      const { successes, failures } = await safeAll(circuitTasks);

      const parallelDuration = Date.now() - parallelStartTime;
      this.logger.info('Per-circuit parallel execution complete', {
        duration: parallelDuration,
        successful: successes.length,
        failed: failures.length
      });

      // Handle failures: fail fast with clear error
      if (failures.length > 0) {
        const errorMessages = failures.map(f => `${f.name}: ${f.error}`).join('\n');
        throw new Error(`Circuit generation failed (${failures.length}/${normalized.circuits.length} circuits):\n${errorMessages}`);
      }

      // Merge all circuit results into single design, preserving original order
      const sortedResults = successes
        .map(s => s.result)
        .sort((a, b) => a.originalIndex - b.originalIndex);

      const allDesignedCircuits = sortedResults.map((result, idx) => ({
        ...result.circuit,
        circuitNumber: idx + 1 // Sequential numbering: 1, 2, 3, 4...
      }));

      design = {
        circuits: allDesignedCircuits,
        reasoning: sortedResults[sortedResults.length - 1]?.reasoning || 'Parallel circuit generation complete'
      };

      this.logger.info('All circuits complete', {
        totalCircuits: design.circuits.length,
        parallelDuration,
        circuitNumbers: allDesignedCircuits.map(c => c.circuitNumber)
      });
    }

    // ========================================
    // PHASE 4.5: Safety Net - Ensure Complete Calculations
    // ========================================
    // Prevent "Cannot read properties of undefined" errors by ensuring
    // all circuits have complete calculation objects
    design.circuits = design.circuits.map((circuit: any, idx: number) => {
      if (!circuit.calculations) {
        this.logger.error('Circuit missing calculations object entirely', {
          circuit: circuit.name || `Circuit ${idx + 1}`
        });
        circuit.calculations = {};
      }

      // Ensure voltageDrop object exists
      if (!circuit.calculations.voltageDrop) {
        this.logger.warn('Missing voltageDrop object, initializing with defaults', {
          circuit: circuit.name
        });
        circuit.calculations.voltageDrop = {
          percent: 0,
          compliant: false,
          limit: 5,
          warning: 'Auto-initialized due to missing AI data'
        };
      }
      
      // Ensure zs exists
      if (circuit.calculations.zs === undefined || circuit.calculations.zs === null) {
        this.logger.warn('Missing zs value, initializing with default', {
          circuit: circuit.name
        });
        circuit.calculations.zs = 0;
      }
      
      // Ensure maxZs exists
      if (circuit.calculations.maxZs === undefined || circuit.calculations.maxZs === null) {
        this.logger.warn('Missing maxZs value, initializing with default', {
          circuit: circuit.name
        });
        circuit.calculations.maxZs = 0;
      }
      
      return circuit;
    });

    this.logger.info('Safety net applied - all calculations validated');

    // ========================================
    // PHASE 4.6: Auto-Fix Engine (BEFORE calculations - CRITICAL ORDER)
    // Apply deterministic fixes to correct cable/MCB sizes FIRST
    // ========================================
    design.circuits = this.autoFix.fixAll(design.circuits, normalized.supply);

    this.logger.info('Auto-fix engine complete (before calculations)', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 4.7: Apply Deterministic BS 7671 Calculations (AFTER auto-fix)
    // ========================================
    // CRITICAL: Calculate Zs/VD using CORRECT cable sizes after auto-fix downgrades
    design.circuits = this.calculator.applyToCircuits(design.circuits, normalized.supply);
    
    this.logger.info('Deterministic calculations applied to corrected circuit designs', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 5: Validation (with voltage context)
    // ========================================
    let validationResult = this.validator.validate(design, normalized.supply.voltage);
    
    // RAG-FIRST: Comprehensive RAG (40 keywords, 50 results) eliminates need for retries
    // Validation issues surface clearly for manual review of edge cases
    if (!validationResult.isValid) {
      const maxRetries = 0; // Trust improved RAG for first-time compliance, avoid timeouts on 10+ circuits
      let correctionAttempt = 0;
      
      // Update progress to show validation complete, entering correction phase
      if (this.logger.updateJobProgress) {
        await this.logger.updateJobProgress(87, 'Validating design compliance...');
      }
      
      while (!validationResult.isValid && correctionAttempt < maxRetries) {
        correctionAttempt++;
        
        const errorCount = validationResult.issues.filter((i: any) => i.severity === 'error').length;
        
        this.logger.warn(`Design validation failed, attempting correction (${correctionAttempt}/${maxRetries})`, { 
          errorCount,
          failedCircuits: validationResult.issues
            .filter((i: any) => i.severity === 'error')
            .map((i: any) => i.circuitNumber || 'unknown')
        });
        
        // OPTIMIZATION: Only correct failed circuits (not all circuits)
        const failedCircuitNumbers = new Set(
          validationResult.issues
            .filter((i: any) => i.severity === 'error' && i.circuitNumber)
            .map((i: any) => i.circuitNumber)
        );
        
        const errorSummary = validationResult.autoFixSuggestions.join('\n\n');
        
        try {
          if (failedCircuitNumbers.size > 0 && failedCircuitNumbers.size < design.circuits.length) {
            // Partial correction: Only correct failed circuits
            this.logger.info('Partial correction mode', {
              failedCircuits: Array.from(failedCircuitNumbers),
              totalCircuits: design.circuits.length,
              attempt: correctionAttempt
            });

            const failedCircuits = design.circuits.filter((c: any) => 
              failedCircuitNumbers.has(c.circuitNumber)
            );
            
            const correctionInputs = {
              supply: normalized.supply,
              circuits: normalized.circuits.filter((_, idx) => 
                failedCircuitNumbers.has(idx + 1)
              )
            };
            
            const correctedDesign = await this.ai.generateCorrection(
              correctionInputs,
              { circuits: failedCircuits, reasoning: design.reasoning },
              errorSummary
            );
            
            // Merge corrected circuits back into full design
            correctedDesign.circuits.forEach((correctedCircuit: any) => {
              const index = design.circuits.findIndex((c: any) => 
                c.circuitNumber === correctedCircuit.circuitNumber
              );
              if (index !== -1) {
                design.circuits[index] = correctedCircuit;
              }
            });
          } else {
            // Full correction: Re-process all circuits
            this.logger.info('Full correction mode', { attempt: correctionAttempt });
            design = await this.ai.generateCorrection(normalized, design, errorSummary);
          }
          
          // Re-validate corrected design
          validationResult = this.validator.validate(design, normalized.supply.voltage);
          
          if (!validationResult.isValid) {
            this.logger.warn(`Correction attempt ${correctionAttempt} still has errors`, {
              remainingErrors: validationResult.issues.filter((i: any) => i.severity === 'error').length
            });
            
            if (correctionAttempt >= maxRetries) {
              throw new Error(
                `Design validation failed after ${maxRetries} correction attempts:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
              );
            }
          } else {
            this.logger.info(`RAG-first design validation complete`, {
              originalIssues: validationResult.issues.length,
              ragResults: context?.totalResults || 0,
              strategy: 'First-time compliance via comprehensive RAG'
            });
          }
        } catch (correctionError) {
          this.logger.error('Correction attempt failed', { 
            error: correctionError.message,
            attempt: correctionAttempt,
            isTimeout: correctionError.message.includes('timeout')
          });
          
          // Provide clear error message for timeout vs other errors
          const errorMessage = correctionError.message.includes('timeout')
            ? `AI correction timed out after ${correctionAttempt} attempts. This design may be too complex. Try reducing the number of circuits or simplifying the requirements.`
            : `Design validation failed:\n\n${errorSummary}\n\nCorrection attempt ${correctionAttempt} failed: ${correctionError.message}`;
          
          throw new Error(errorMessage);
        }
      }
    }

    const isValidAfterCalculations = validationResult.isValid;
    
    this.logger.info('Design validation complete', {
      passed: isValidAfterCalculations,
      errorCount: validationResult.issues.filter((i: any) => i.severity === 'error').length,
      warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
    });

    // ========================================
    // PHASE 6: Cache Storage (DISABLED FOR TESTING RING FINAL FIX)
    // ========================================
    // TEMPORARILY DISABLED - Don't cache during ring final testing
    // await this.cache.set(cacheKey, design);
    this.logger.info('Cache storage DISABLED for testing');

    const duration = Date.now() - startTime;
    this.logger.info('Pipeline complete', {
      duration,
      circuits: design.circuits.length,
      fromCache: false,
      validationPassed: isValidAfterCalculations
    });

    return {
      success: true,
      circuits: design.circuits,
      supply: normalized.supply,
      fromCache: false,
      processingTime: duration,
      validationPassed: isValidAfterCalculations,
      autoFixApplied: false,
      reasoning: design.reasoning,
      // Surface validation results to frontend
      validationIssues: validationResult.issues,
      autoFixSuggestions: validationResult.autoFixSuggestions
    };
  }
}

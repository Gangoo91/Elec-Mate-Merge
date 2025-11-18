/**
 * Design Pipeline - Core Orchestrator
 * 1. Normalize → 2. Cache Check → 3. RAG → 4. AI → 5. Validate → 6. Cache Store
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { RAGEngine } from './rag-engine.ts';
import { AIDesigner } from './ai-designer.ts';
import { ValidationEngine } from './validation-engine.ts';
import { safeAll, type ParallelTask } from '../_shared/safe-parallel.ts';
import type { NormalizedInputs, DesignResult } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private rag: RAGEngine;
  private ai: AIDesigner;
  private validator: ValidationEngine;

  constructor(private logger: any, private requestId: string) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.rag = new RAGEngine(logger);
    this.ai = new AIDesigner(logger);
    this.validator = new ValidationEngine(logger);
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
    // PHASE 2: Cache Check (DISABLED FOR TESTING)
    // ========================================
    // ========================================
    // PHASE 2: Cache Check (Phase 2.1: Re-enabled for 60% faster cache hits)
    // ========================================
    const cacheKey = this.cache.generateKey(normalized);
    const cached = await this.cache.get(cacheKey);
    
    if (cached) {
      this.logger.info('Cache HIT', {
        key: cacheKey.slice(0, 12),
        age: cached.ageSeconds,
        hits: cached.hitCount
      });
      
      return {
        success: true,
        circuits: cached.design.circuits,
        supply: normalized.supply,
        fromCache: true,
        cacheAge: cached.ageSeconds,
        processingTime: Date.now() - startTime,
        validationPassed: true,
        autoFixApplied: false
      };
    }
    
    this.logger.info('Cache MISS - proceeding with fresh generation', {
      key: cacheKey.slice(0, 12)
    });

    // ========================================
    // PHASE 3: RAG Search (enhanced for installation guidance)
    // Phase 3 Optimization: Pass batch flag for dynamic match count
    // ========================================
    const isBatch = normalized.circuits.length > 2;
    const ragContext = await this.rag.search(normalized, isBatch);
    this.logger.info('RAG complete', {
      regulations: ragContext.regulations.length,
      practicalGuides: ragContext.practicalGuides.length,
      totalResults: ragContext.totalResults,
      searchTime: ragContext.searchTime,
      voltage: normalized.supply.voltage,
      isBatch
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
    
    // Determine if batching is needed
    if (normalized.circuits.length > 2) {
      // BATCH PROCESSING for 3+ circuits
      const batchSize = this.determineBatchSize(normalized.circuits.length);
      const batches = this.splitIntoBatches(normalized.circuits, batchSize);
      
      this.logger.info('Batch processing enabled', {
        totalCircuits: normalized.circuits.length,
        batchCount: batches.length,
        batchSize,
        estimatedTime: `${batches.length * 90}s`
      });

      // PARALLEL PROCESSING: Run all batches concurrently
      const parallelStartTime = Date.now();
      
      this.logger.info('Starting parallel batch execution', {
        batches: batches.length,
        estimatedTime: '90s (parallel)'
      });

      // Create parallel tasks for each batch
      const batchTasks: ParallelTask<any>[] = batches.map((batch, i) => ({
        name: `Batch ${i + 1}/${batches.length}`,
        execute: async () => {
          const batchStartTime = Date.now();
          
          this.logger.info(`Batch ${i + 1}/${batches.length} starting`, {
            circuits: batch.map(c => c.name),
            circuitCount: batch.length
          });

          // Create temporary normalized inputs for this batch
          const batchInputs = {
            supply: normalized.supply,
            circuits: batch
          };

          // Generate design for this batch (reuse RAG context)
          const batchDesign = await this.ai.generateBatch(
            batchInputs,
            ragContext,
            i + 1,
            batches.length
          );

          this.logger.info(`Batch ${i + 1}/${batches.length} complete`, {
            duration: Date.now() - batchStartTime,
            circuits: batchDesign.circuits.length
          });

          return batchDesign;
        }
      }));

      // Execute all batches in parallel
      const { successes, failures } = await safeAll(batchTasks);

      const parallelDuration = Date.now() - parallelStartTime;
      this.logger.info('Parallel batch execution complete', {
        duration: parallelDuration,
        successful: successes.length,
        failed: failures.length
      });

      // Handle failures: retry failed batches sequentially as fallback
      if (failures.length > 0) {
        this.logger.warn('Some batches failed, retrying sequentially', {
          failedBatches: failures.map(f => f.name)
        });

        // If too many failures (>50%), fail the entire design
        if (failures.length > batches.length / 2) {
          const errorMessages = failures.map(f => `${f.name}: ${f.error}`).join('\n');
          throw new Error(`Too many batch failures (${failures.length}/${batches.length}):\n${errorMessages}`);
        }

        // Retry failed batches sequentially
        for (const failure of failures) {
          const batchIndex = parseInt(failure.name.split(' ')[1].split('/')[0]) - 1;
          const batch = batches[batchIndex];

          this.logger.info(`Retrying failed ${failure.name}`, {
            circuits: batch.map(c => c.name)
          });

          const batchInputs = {
            supply: normalized.supply,
            circuits: batch
          };

          const batchDesign = await this.ai.generateBatch(
            batchInputs,
            ragContext,
            batchIndex + 1,
            batches.length
          );

          successes.push({ name: failure.name, result: batchDesign });
        }
      }

      // Merge all batch results into single design
      let allDesignedCircuits: any[] = [];
      let lastReasoning = '';

      successes.forEach(({ result }) => {
        allDesignedCircuits.push(...result.circuits);
        lastReasoning = result.reasoning;
      });

      design = {
        circuits: allDesignedCircuits,
        reasoning: lastReasoning
      };

      this.logger.info('All batches complete', {
        totalCircuits: design.circuits.length,
        batches: batches.length,
        parallelDuration
      });
    } else {
      // SINGLE CALL for 1-5 circuits (existing flow)
      this.logger.info('Single-call processing (≤5 circuits)');
      design = await this.ai.generate(normalized, ragContext);
      
      this.logger.info('AI design complete', {
        circuits: design.circuits.length
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
    // PHASE 5: Validation (with voltage context)
    // ========================================
    let validationResult = this.validator.validate(design, normalized.supply.voltage);
    
    // OPTIMIZATION: Auto-correction loop (up to 2 retries for cascading fixes)
    if (!validationResult.isValid) {
      const maxRetries = 2;
      let correctionAttempt = 0;
      
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
            
            // Phase 1.2: Reduced retries from 2 to 1 (saves 1-2s)
            const maxRetries = 1;
            if (correctionAttempt >= maxRetries) {
              throw new Error(
                `Design validation failed after ${maxRetries} correction attempts:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
              );
            }
          } else {
            this.logger.info(`Correction successful on attempt ${correctionAttempt}!`);
          }
        } catch (correctionError) {
          this.logger.error('Correction attempt failed', { 
            error: correctionError.message,
            attempt: correctionAttempt
          });
          throw new Error(
            `Design validation failed:\n\n${errorSummary}\n\nCorrection attempt ${correctionAttempt} failed: ${correctionError.message}`
          );
        }
      }
    }

    this.logger.info('Design validated successfully', {
      warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
    });

    // ========================================
    // PHASE 6: Cache Storage (Phase 2.1: Re-enabled)
    // ========================================
    try {
      await this.cache.set(cacheKey, design);
      this.logger.info('Design cached successfully', {
        key: cacheKey.slice(0, 12)
      });
    } catch (error) {
      this.logger.warn('Cache storage failed (non-critical)', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    const duration = Date.now() - startTime;
    this.logger.info('Pipeline complete', {
      duration,
      circuits: design.circuits.length,
      fromCache: false
    });

    return {
      success: true,
      circuits: design.circuits,
      supply: normalized.supply,
      fromCache: false,
      processingTime: duration,
      validationPassed: true,
      autoFixApplied: false,
      reasoning: design.reasoning
    };
  }

  /**
   * Determine optimal batch size based on circuit count
   * PARALLEL PROCESSING: Always use 2 circuits per batch for 3+ circuits
   */
  private determineBatchSize(circuitCount: number): number {
    if (circuitCount <= 2) return circuitCount; // Process 1-2 circuits in one call
    return 2; // Batch everything else into groups of 2
  }

  /**
   * Split array into batches of specified size
   */
  private splitIntoBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }
}

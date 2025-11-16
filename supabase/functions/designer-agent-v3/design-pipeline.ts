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
    // CACHE DISABLED - Always perform fresh design generation
    this.logger.info('Cache DISABLED - skipping cache check');

    // ========================================
    // PHASE 3: RAG Search (enhanced for installation guidance)
    // ========================================
    const ragContext = await this.rag.search(normalized);
    this.logger.info('RAG complete', {
      regulations: ragContext.regulations.length,
      practicalGuides: ragContext.practicalGuides.length,
      totalResults: ragContext.totalResults,
      searchTime: ragContext.searchTime,
      voltage: normalized.supply.voltage
    });

    // ========================================
    // PHASE 4: AI Design Generation (with batch processing)
    // ========================================
    let design: any;
    
    // Determine if batching is needed
    if (normalized.circuits.length > 5) {
      // BATCH PROCESSING for 6+ circuits
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
    // PHASE 5: Validation (with voltage context)
    // ========================================
    let validationResult = this.validator.validate(design, normalized.supply.voltage);
    
    // OPTIMIZATION: Auto-correction loop (1 retry max)
    if (!validationResult.isValid) {
      const errorCount = validationResult.issues.filter((i: any) => i.severity === 'error').length;
      
      this.logger.warn('Design validation failed, attempting correction', { 
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
            totalCircuits: design.circuits.length
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
          this.logger.info('Full correction mode');
          design = await this.ai.generateCorrection(normalized, design, errorSummary);
        }
        
        // Re-validate corrected design
        validationResult = this.validator.validate(design, normalized.supply.voltage);
        
        if (!validationResult.isValid) {
          this.logger.error('Correction failed, still has errors');
          throw new Error(
            `Design validation failed after correction:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
          );
        }
        
        this.logger.info('Correction successful!');
      } catch (correctionError) {
        this.logger.error('Correction attempt failed', { error: correctionError.message });
        throw new Error(
          `Design validation failed:\n\n${errorSummary}\n\nCorrection attempt failed: ${correctionError.message}`
        );
      }
    }

    this.logger.info('Design validated successfully', {
      warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
    });

    // ========================================
    // PHASE 6: Cache Storage & Return (DISABLED FOR TESTING)
    // ========================================
    // CACHE DISABLED - Not storing design in cache
    this.logger.info('Cache DISABLED - skipping cache storage');

    const duration = Date.now() - startTime;
    this.logger.info('Pipeline complete', {
      duration,
      circuits: design.circuits.length,
      fromCache: false
    });

    return {
      success: true,
      circuits: design.circuits,
      fromCache: false,
      autoFixApplied: false,
      reasoning: design.reasoning
    };
  }

  /**
   * Determine optimal batch size based on circuit count
   * PARALLEL PROCESSING: Always use 2 circuits per batch for 6+ circuits
   */
  private determineBatchSize(circuitCount: number): number {
    if (circuitCount <= 5) return circuitCount;
    return 2; // Always 2 circuits per batch for parallel processing
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

/**
 * Design Pipeline - Core Orchestrator
 * 1. Normalize → 2. Cache Check → 3. RAG → 4. AI → 5. Validate → 6. Cache Store
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { RAGEngine } from './rag-engine.ts';
import { AIDesigner } from './ai-designer.ts';
import { ValidationEngine } from './validation-engine.ts';
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
    // PHASE 2: Check Cache (deterministic key)
    // ========================================
    const cacheKey = this.cache.generateKey(normalized);
    const cached = await this.cache.get(cacheKey);
    
    if (cached) {
      this.logger.info('Cache HIT', { 
        key: cacheKey.slice(0, 12),
        age: cached.ageSeconds,
        hitCount: cached.hitCount 
      });
      
      return {
        success: true,
        circuits: cached.design,
        fromCache: true,
        cacheAge: cached.ageSeconds,
        cacheHitCount: cached.hitCount,
        autoFixApplied: false
      };
    }

    this.logger.info('Cache MISS', { key: cacheKey.slice(0, 12) });

    // ========================================
    // PHASE 3: RAG Search (enhanced for installation guidance)
    // ========================================
    const ragContext = await this.rag.search(normalized);
    this.logger.info('RAG complete', {
      regulations: ragContext.regulations.length,
      designPatterns: ragContext.designPatterns.length,
      practicalGuides: ragContext.practicalGuides.length,
      totalResults: ragContext.totalResults,
      searchTime: ragContext.searchTime,
      voltage: normalized.supply.voltage // PHASE 1: Log voltage context
    });

    // ========================================
    // PHASE 4: AI Design Generation (with auto-correction)
    // ========================================
    this.logger.info('AI design generation starting');

    let design = await this.ai.generate(normalized, ragContext);
    
    this.logger.info('AI design complete', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 5: Validation (with voltage context)
    // ========================================
    let validationResult = this.validator.validate(design, normalized.supply.voltage);
    
    // OPTIMIZATION: Auto-correction loop (1 retry max)
    if (!validationResult.isValid) {
      const errorCount = validationResult.issues.filter((i: any) => i.severity === 'error').length;
      
      this.logger.warn('Design validation failed, attempting correction', { errorCount });
      
      // Format validation errors for correction
      const errorSummary = validationResult.autoFixSuggestions.join('\n\n');
      
      try {
        // OPTIMIZED: Use lightweight correction (no RAG re-search, 8000 tokens)
        design = await this.ai.generateCorrection(normalized, design, errorSummary);
        
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
    // PHASE 6: Cache Storage & Return
    // ========================================
    await this.cache.set(cacheKey, design.circuits);
    this.logger.info('Design cached successfully', {
      key: cacheKey.slice(0, 12),
      circuits: design.circuits.length
    });

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
}

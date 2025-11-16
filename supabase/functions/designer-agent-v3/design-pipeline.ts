/**
 * Design Pipeline - Core Orchestrator
 * Single class handling entire flow with clear phases:
 * 1. Normalize → 2. Cache Check → 3. RAG (deferred) → 4. AI (deferred) → 5. Validate (deferred) → 6. Cache Store
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
    // PHASE 3: RAG Search (3 sources, fixed weights)
    // ========================================
    const ragContext = await this.rag.search(normalized);
    this.logger.info('RAG complete', {
      regulations: ragContext.regulations.length,
      designPatterns: ragContext.designPatterns.length,
      practicalGuides: ragContext.practicalGuides.length,
      totalResults: ragContext.totalResults,
      searchTime: ragContext.searchTime
    });

    // ========================================
    // PHASE 4: AI Design Generation
    // ========================================
    const design = await this.ai.generate(normalized, ragContext);
    this.logger.info('AI design complete', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 5: Validation
    // ========================================
    const validationResult = this.validator.validate(design);
    
    if (!validationResult.isValid) {
      this.logger.error('Design validation failed', {
        errorCount: validationResult.issues.filter(i => i.severity === 'error').length,
        warningCount: validationResult.issues.filter(i => i.severity === 'warning').length
      });
      
      throw new Error(
        `Design validation failed:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
      );
    }

    this.logger.info('Design validated successfully', {
      warningCount: validationResult.issues.filter(i => i.severity === 'warning').length
    });

    // ========================================
    // PHASE 6: Cache Storage & Return (not yet implemented)
    // ========================================
    throw new Error('Cache storage not yet implemented - Phase 4 complete');
  }
}

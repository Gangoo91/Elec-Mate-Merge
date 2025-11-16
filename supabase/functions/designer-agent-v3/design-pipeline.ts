/**
 * Design Pipeline - Core Orchestrator with Self-Correction (PHASE 2)
 * 1. Normalize → 2. Cache Check → 3. RAG → 4. AI → 5. Validate 
 * → If failed: 6. Build Correction Prompt → 7. AI Retry → 8. Re-validate
 * → 9. Cache Store
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { RAGEngine } from './rag-engine.ts';
import { AIDesigner } from './ai-designer.ts';
import { ValidationEngine } from './validation-engine.ts';
import { ValidationFeedback } from './validation-feedback.ts';
import type { NormalizedInputs, DesignResult } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private rag: RAGEngine;
  private ai: AIDesigner;
  private validator: ValidationEngine;
  private feedback: ValidationFeedback;

  constructor(private logger: any, private requestId: string) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.rag = new RAGEngine(logger);
    this.ai = new AIDesigner(logger);
    this.validator = new ValidationEngine(logger);
    this.feedback = new ValidationFeedback();
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
    // PHASE 4: AI Design Generation (with self-correction)
    // ========================================
    const maxAttempts = 2;
    let design: any;
    let validationResult: any;
    let attempts = 0;
    let originalIssues: any[] = [];
    let correctionApplied = false;

    for (attempts = 1; attempts <= maxAttempts; attempts++) {
      this.logger.info(`AI design attempt ${attempts}/${maxAttempts}`);

      // Generate design (with correction context on retry)
      const correctionContext = attempts > 1 
        ? this.feedback.buildCorrectionPrompt(validationResult.issues, inputs, design)
        : undefined;

      design = await this.ai.generateWithCorrection(normalized, ragContext, correctionContext);
      
      this.logger.info('AI design complete', {
        circuits: design.circuits.length,
        attempt: attempts
      });

      // ========================================
      // PHASE 5: Validation
      // ========================================
      validationResult = this.validator.validate(design);
      
      if (attempts === 1 && !validationResult.isValid) {
        // Store original issues for reporting
        originalIssues = [...validationResult.issues];
      }

      if (validationResult.isValid) {
        this.logger.info('Design validated successfully', {
          attempt: attempts,
          warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
        });
        
        if (attempts > 1) {
          correctionApplied = true;
        }
        
        break; // Success!
      }

      // Log validation failure
      this.logger.warn(`Validation failed on attempt ${attempts}`, {
        errorCount: validationResult.issues.filter((i: any) => i.severity === 'error').length,
        warningCount: validationResult.issues.filter((i: any) => i.severity === 'warning').length
      });

      // If last attempt, throw error
      if (attempts === maxAttempts) {
        this.logger.error('Design validation failed after max attempts', {
          attempts,
          errorCount: validationResult.issues.filter((i: any) => i.severity === 'error').length
        });
        
        throw new Error(
          `Design validation failed after ${maxAttempts} attempts:\n\n${validationResult.autoFixSuggestions.join('\n\n')}\n\nPlease review the design inputs and try again.`
        );
      }

      // Continue to next attempt with correction
      this.logger.info('Attempting correction...', { attempt: attempts + 1 });
    }

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
      fromCache: false,
      correctionApplied,
      attempts
    });

    return {
      success: true,
      circuits: design.circuits,
      fromCache: false,
      autoFixApplied: false,
      correctionApplied,
      correctionAttempts: attempts,
      originalIssues: originalIssues.length > 0 ? originalIssues : undefined,
      correctedIssues: correctionApplied ? validationResult.issues : undefined,
      reasoning: design.reasoning
    };
  }
}

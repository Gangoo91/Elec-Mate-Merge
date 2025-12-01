/**
 * Design Pipeline - Simplified Architecture
 * Form → RAG → AI → Results (with minimal safety checks)
 * 
 * Trust the AI to reason with RAG context. No correcting the AI after the fact.
 */

import { FormNormalizer } from './form-normalizer.ts';
import { CacheManager } from './cache-manager.ts';
import { searchDesignIntelligence, searchRegulationsIntelligence } from '../_shared/intelligence-search.ts';
import { AIDesigner } from './ai-designer.ts';
import { MinimalSafetyChecks } from './minimal-safety-checks.ts';
import { ensureExpectedTestValues } from './test-value-calculator.ts';
import type { NormalizedInputs, DesignResult, RAGContext } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private ai: AIDesigner;
  private safetyChecks: MinimalSafetyChecks;

  constructor(
    private logger: any,
    private requestId: string,
    private progressCallback?: (msg: string) => void,
    private circuitProgressCallback?: (completed: number, total: number, circuitName: string) => void
  ) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.ai = new AIDesigner(logger, circuitProgressCallback);
    this.safetyChecks = new MinimalSafetyChecks(logger);
  }

  async execute(rawInput: any): Promise<DesignResult> {
    const startTime = Date.now();

    // ========================================
    // PHASE 1: Normalize Form Inputs
    // ========================================
    const normalized = this.normalizer.normalize(rawInput);
    this.logger.info('Form normalized', {
      circuits: normalized.circuits.length,
      voltage: normalized.supply.voltage,
      phases: normalized.supply.phases
    });

    // ========================================
    // PHASE 2: Cache Check (Optional)
    // ========================================
    const cacheKey = this.cache.generateKey(normalized);
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      this.logger.info('Cache HIT', { key: cacheKey.slice(0, 12) });
      return {
        ...cached.design,
        fromCache: true,
        processingTime: Date.now() - startTime,
        cacheAgeSeconds: cached.ageSeconds,
        cacheHitCount: cached.hitCount
      };
    }

    this.logger.info('Cache MISS', { key: cacheKey.slice(0, 12) });

    // ========================================
    // PHASE 3: RAG Search (GIN-indexed, fast)
    // ========================================
    const ragContext = await this.performRAGSearch(normalized);

    this.logger.info('RAG search complete', {
      designKnowledge: ragContext.designKnowledge.length,
      regulations: ragContext.regulations.length,
      totalResults: ragContext.totalResults
    });

    // ========================================
    // PHASE 4: AI Generation
    // ========================================
    const design = await this.ai.generate(normalized, ragContext);

    this.logger.info('AI generation complete', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 5: Minimal Safety Checks
    // ========================================
    design.circuits = this.safetyChecks.apply(design.circuits);

    this.logger.info('Safety checks applied', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 6: Ensure Expected Test Values
    // ========================================
    const ze = normalized.supply.ze || 0.35;
    design.circuits = design.circuits.map(circuit => 
      ensureExpectedTestValues(circuit, ze, this.logger)
    );

    this.logger.info('Expected test values calculated', {
      circuits: design.circuits.length
    });

    // ========================================
    // PHASE 7: Cache Store
    // ========================================
    await this.cache.set(cacheKey, design);

    const result: DesignResult = {
      ...design,
      fromCache: false,
      processingTime: Date.now() - startTime
    };

    return result;
  }

  /**
   * RAG Search using comprehensive keyword extraction (400+ keywords)
   */
  private async performRAGSearch(inputs: NormalizedInputs): Promise<RAGContext> {
    const ragStart = Date.now();

    // Create Supabase client
    const { createClient } = await import('../_shared/deps.ts');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Import comprehensive keyword extractor
    const { extractDesignKeywords } = await import('./design-keyword-extractor.ts');

    // Extract comprehensive keywords (50-150+ per job)
    const { keywords, loadTypes, cableSizes } = extractDesignKeywords(
      inputs.circuits,
      inputs.supply,
      inputs.projectInfo
    );

    this.logger.info('Keywords extracted', {
      keywordCount: keywords.size,
      loadTypes: Array.from(loadTypes),
      cableSizes: Array.from(cableSizes)
    });

    // Parallel RAG searches with CORRECT database categories
    const [designKnowledge, regulations] = await Promise.all([
      searchDesignIntelligence(supabase, {
        keywords: Array.from(keywords),
        loadTypes: Array.from(loadTypes),
        // cableSizes removed - only 1.6% database coverage causes near-zero results
        limit: 30  // 30 design knowledge items (formulas, tables, examples)
      }),
      searchRegulationsIntelligence(supabase, {
        keywords: Array.from(keywords),
        categories: ['Cables', 'Protection', 'Earthing', 'Design', 'Circuits', 'Safety', 'Special Locations'],
        limit: 15  // 15 regulation items (BS 7671 compliance)
      })
    ]);

    const ragDuration = Date.now() - ragStart;
    this.logger.info('RAG search complete', {
      duration: ragDuration,
      designKnowledge: designKnowledge.length,
      regulations: regulations.length
    });

    return {
      designKnowledge,
      regulations,
      totalResults: designKnowledge.length + regulations.length,
      searchDuration: ragDuration
    };
  }
}

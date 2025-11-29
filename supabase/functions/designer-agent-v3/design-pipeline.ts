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
import type { NormalizedInputs, DesignResult, RAGContext } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private ai: AIDesigner;
  private safetyChecks: MinimalSafetyChecks;

  constructor(
    private logger: any,
    private requestId: string,
    private progressCallback?: (msg: string) => void
  ) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.ai = new AIDesigner(logger);
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
        ...cached,
        fromCache: true,
        processingTime: Date.now() - startTime
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
    // PHASE 6: Cache Store
    // ========================================
    await this.cache.store(cacheKey, design, normalized);

    const result: DesignResult = {
      ...design,
      fromCache: false,
      processingTime: Date.now() - startTime
    };

    return result;
  }

  /**
   * RAG Search using GIN-indexed keyword searches
   */
  private async performRAGSearch(inputs: NormalizedInputs): Promise<RAGContext> {
    const ragStart = Date.now();

    // Create Supabase client
    const { createClient } = await import('../_shared/deps.ts');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Extract keywords from circuits
    const keywords = new Set<string>();
    const loadTypes = new Set<string>();
    const cableSizes = new Set<number>();

    inputs.circuits.forEach(circuit => {
      keywords.add(circuit.loadType.toLowerCase());
      keywords.add('cable sizing');
      keywords.add('voltage drop');
      keywords.add('protection');
      keywords.add('earthing');

      loadTypes.add(circuit.loadType.toLowerCase());
      [1.5, 2.5, 4, 6, 10, 16, 25].forEach(size => cableSizes.add(size));
    });

    // Parallel RAG searches
    const [designKnowledge, regulations] = await Promise.all([
      searchDesignIntelligence(supabase, {
        keywords: Array.from(keywords),
        loadTypes: Array.from(loadTypes),
        cableSizes: Array.from(cableSizes),
        limit: 25
      }),
      searchRegulationsIntelligence(supabase, {
        keywords: Array.from(keywords),
        categories: ['cable_sizing', 'voltage_drop', 'protection', 'earthing'],
        limit: 15
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

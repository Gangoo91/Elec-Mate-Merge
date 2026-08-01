/**
 * Design Pipeline
 * Form → RAG → AI (per-circuit streaming) → Tripwire safety checks
 *
 * Trust the AI to reason from BS 7671 facets RAG context.
 * Apply only narrow, UK-specific safety tripwires after — no heavy auto-correction.
 */

import { applyCableCapacityTripwire } from './cable-capacity-validator.ts';
import { applyZsTripwire } from './zs-table-validator.ts';
import { applyCableTypeTripwire } from './cable-type-validator.ts';
import { applyRingVdTripwire } from './vd-ring-validator.ts';
import { applyVoltageTripwire } from './circuit-voltage-validator.ts';
import { runCritiquePass } from './critique-pass.ts';
import { CacheManager } from './cache-manager.ts';
import {
  searchDesignIntelligence,
  searchRegulationsIntelligence,
} from '../_shared/intelligence-search.ts';
import { generateLargeEmbedding } from '../_shared/ai-providers.ts';
import { AIDesigner } from './ai-designer.ts';
import { MinimalSafetyChecks } from './minimal-safety-checks.ts';
import { ensureExpectedTestValues } from './test-value-calculator.ts';
import { FormNormalizer } from './form-normalizer.ts';
import type { NormalizedInputs, DesignResult, RAGContext, DesignedCircuit } from './types.ts';

export class DesignPipeline {
  private normalizer: FormNormalizer;
  private cache: CacheManager;
  private ai: AIDesigner;
  private safetyChecks: MinimalSafetyChecks;

  constructor(
    private logger: any,
    private requestId: string,
    private progressCallback?: (msg: string) => void,
    private circuitProgressCallback?: (
      completed: number,
      total: number,
      circuitName: string
    ) => void,
    private circuitDoneCallback?: (circuit: DesignedCircuit, index: number) => Promise<void>
  ) {
    this.normalizer = new FormNormalizer();
    this.cache = new CacheManager(logger);
    this.ai = new AIDesigner(logger, circuitProgressCallback, circuitDoneCallback);
    this.safetyChecks = new MinimalSafetyChecks(logger);
  }

  async execute(rawInput: any): Promise<DesignResult> {
    const startTime = Date.now();

    const normalized = this.normalizer.normalize(rawInput);
    this.logger.info('Form normalized', {
      circuits: normalized.circuits.length,
      voltage: normalized.supply.voltage,
      phases: normalized.supply.phases,
    });

    const cacheKey = this.cache.generateKey(normalized);
    const cached = await this.cache.get(cacheKey);

    if (cached) {
      this.logger.info('Cache HIT', {
        key: cacheKey.slice(0, 12),
        ageSeconds: cached.ageSeconds,
        hitCount: cached.hitCount,
      });
      return {
        ...cached.design,
        fromCache: true,
        cacheHit: true,
        processingTime: Date.now() - startTime,
        cacheAgeSeconds: cached.ageSeconds,
        cacheHitCount: cached.hitCount,
      };
    }

    this.logger.info('Cache MISS', {
      key: cacheKey.slice(0, 12),
      circuitCount: normalized.circuits.length,
    });

    const ragContext = await this.performRAGSearch(normalized);
    this.logger.info('RAG search complete', {
      designKnowledge: ragContext.designKnowledge.length,
      regulations: ragContext.regulations.length,
      totalResults: ragContext.totalResults,
    });

    const design = await this.ai.generate(normalized, ragContext);
    this.logger.info('AI generation complete', { circuits: design.circuits.length });

    // Tripwire 1a: Circuit voltage reference. Single-phase circuits on a 3φ supply
    // use 230 V phase-to-neutral, not 400 V line-to-line. Run BEFORE the others
    // because a wrong voltage cascades into wrong Ib, wrong Vd, wrong protection.
    const voltageResult = applyVoltageTripwire(design.circuits, this.logger);
    design.circuits = voltageResult.circuits;
    if (voltageResult.corrections.length > 0) {
      (design as any).voltageCorrections = voltageResult.corrections;
    }

    // Tripwire 1: UK-specific narrow safety checks (ring final 32A, socket RCD, fire-rated cables)
    design.circuits = this.safetyChecks.apply(design.circuits);

    // Tripwire 1b: BS 7671 Table 41.3 / 41.4 Zs deterministic lookup.
    // Overrides any Zs row mix-up (e.g. AI quoting 32A's 1.37Ω against a 20A device).
    const zsResult = applyZsTripwire(design.circuits, this.logger);
    design.circuits = zsResult.circuits;
    if (zsResult.corrections.length > 0) {
      (design as any).zsCorrections = zsResult.corrections;
    }

    // Tripwire 1c: Cable type vs location. Backstop the obvious mistakes
    // (T&E for outdoor / buried, T&E for industrial plant, non-FP for fire circuits).
    const cableTypeResult = applyCableTypeTripwire(design.circuits, this.logger);
    design.circuits = cableTypeResult.circuits;
    if (cableTypeResult.corrections.length > 0) {
      (design as any).cableTypeCorrections = cableTypeResult.corrections;
    }

    // Tripwire 1e: Cable capacity (ELE-1425). Runs AFTER the cable-type tripwire
    // — the type decides which BS 7671 table applies — and BEFORE expected test
    // values, because correcting a size changes R1+R2, Zs and Vd downstream.
    // Previously this was flag-only and ran last, so a 1.5mm² cable proposed for
    // a 330A circuit stayed in the design and the warning was dropped by the UI.
    const capacityResult = applyCableCapacityTripwire(design.circuits, this.logger);
    design.circuits = capacityResult.circuits;
    if (capacityResult.corrections.length > 0) {
      (design as any).cableCapacityCorrections = capacityResult.corrections;
    }
    if (capacityResult.uncorrectable.length > 0) {
      // No tabulated size fixes these — the design needs a human decision.
      (design as any).cableCapacityIssues = capacityResult.uncorrectable;
    }

    // Tripwire 1d: Ring final voltage-drop. AI sometimes calcs ring as radial —
    // override with ring formula (parallel paths, worst case at mid-point = Vd/4).
    const ringVdResult = applyRingVdTripwire(design.circuits, this.logger);
    design.circuits = ringVdResult.circuits;
    if (ringVdResult.corrections.length > 0) {
      (design as any).ringVdCorrections = ringVdResult.corrections;
    }

    // Ensure expected test values present (R1+R2, Zs, IR, RCD)
    const ze = normalized.supply.ze || 0.35;
    design.circuits = design.circuits.map((circuit) =>
      ensureExpectedTestValues(circuit, ze, this.logger)
    );

    // ELE-1426 — ensureExpectedTestValues writes the deterministic Zs into
    // `expectedTests` only. `calculations.zs` is what most result surfaces read,
    // and it kept whatever the model returned — frequently 0, which then
    // rendered as "0.00 / 2.73" with a green tick because 0 <= 2.73. The correct
    // value was being computed all along and written to the wrong field.
    design.circuits = design.circuits.map((circuit) => {
      const derived = Number((circuit as any).expectedTests?.zs?.expected);
      if (!Number.isFinite(derived) || derived <= 0) return circuit;
      const current = Number(circuit.calculations?.zs);
      if (Number.isFinite(current) && Math.abs(current - derived) < 0.001) return circuit;
      this.logger.info('Zs synced from deterministic calculation', {
        circuit: circuit.name,
        was: circuit.calculations?.zs ?? null,
        now: derived,
      });
      return {
        ...circuit,
        calculations: { ...circuit.calculations, zs: derived },
      };
    });

    // Phase 7: Multi-pass critique loop. AI reviews the whole design as a system,
    // catches concerns per-circuit checks miss (discrimination, phase imbalance,
    // grouping, A4 considerations). Findings are advisory — they don't mutate
    // circuits, just surface as a "Design audit" panel on the results page.
    try {
      const openAiKey = Deno.env.get('OPENAI_API_KEY');
      if (openAiKey) {
        const critique = await runCritiquePass(design, openAiKey, this.logger);
        (design as any).criticReview = critique;
      }
    } catch (err) {
      this.logger.warn('Critique pass threw; continuing without audit', {
        error: err instanceof Error ? err.message : String(err),
      });
    }

    await this.cache.set(cacheKey, design);

    return {
      ...design,
      fromCache: false,
      cacheHit: false,
      processingTime: Date.now() - startTime,
    };
  }

  private async performRAGSearch(inputs: NormalizedInputs): Promise<RAGContext> {
    const ragStart = Date.now();

    const { createClient } = await import('../_shared/deps.ts');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { extractDesignKeywords } = await import('./design-keyword-extractor.ts');

    const { keywords, loadTypes, cableSizes } = extractDesignKeywords(
      inputs.circuits,
      inputs.supply,
      inputs.projectInfo
    );

    this.logger.info('Keywords extracted', {
      keywordCount: keywords.size,
      loadTypes: Array.from(loadTypes),
      cableSizes: Array.from(cableSizes),
    });

    // Build a natural-language query from the design brief for the BS 7671 facets pass.
    const facetQuery = this.buildFacetsQuery(inputs);

    const openAiKey = Deno.env.get('OPENAI_API_KEY')!;
    const facetsEmbeddingPromise = generateLargeEmbedding(facetQuery, openAiKey).catch((err) => {
      this.logger.warn('Facets embedding failed — facets pass skipped', {
        error: err instanceof Error ? err.message : String(err),
      });
      return null;
    });

    const [designKnowledge, regulations, facetsEmbedding] = await Promise.all([
      searchDesignIntelligence(supabase, {
        keywords: Array.from(keywords),
        loadTypes: Array.from(loadTypes),
        limit: 30,
      }),
      searchRegulationsIntelligence(supabase, {
        keywords: Array.from(keywords),
        categories: [
          'Cables',
          'Protection',
          'Earthing',
          'Design',
          'Circuits',
          'Safety',
          'Special Locations',
        ],
        limit: 15,
      }),
      facetsEmbeddingPromise,
    ]);

    // BS 7671 FACETS PASS — A4:2026 grounded, halfvec(3072), hybrid RRF.
    // This is the gold-standard source for cite-or-die.
    let bs7671Facets: any[] = [];
    if (facetsEmbedding) {
      try {
        const { data, error } = await supabase.rpc('search_bs7671_v3', {
          query_embedding: facetsEmbedding,
          query_text: facetQuery,
          document_types: ['bs7671', 'gn3', 'osg'],
          reg_number_filter: null,
          zones_filter: null,
          system_types_filter: null,
          equipment_filter: null,
          protection_filter: null,
          facet_type_filter: null, // pull all facet types — requirement, table, definition, etc.
          match_count: 40,
          vector_weight: 0.6,
          bm25_weight: 0.4,
          rrf_k: 60,
          expand_graph: true,
          graph_expand_limit: 10,
        });
        if (error) {
          this.logger.warn('search_bs7671_v3 errored', { error: error.message });
        } else if (Array.isArray(data)) {
          bs7671Facets = data;
        }
      } catch (err) {
        this.logger.warn('bs7671 facets RPC threw', {
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }

    const ragDuration = Date.now() - ragStart;
    this.logger.info('RAG search complete', {
      duration: ragDuration,
      designKnowledge: designKnowledge.length,
      regulations: regulations.length,
      bs7671Facets: bs7671Facets.length,
    });

    return {
      designKnowledge,
      regulations,
      bs7671Facets,
      totalResults: designKnowledge.length + regulations.length + bs7671Facets.length,
      searchDuration: ragDuration,
    } as RAGContext;
  }

  /**
   * Build a natural-language query for the bs7671_facets vector + BM25 hybrid.
   * Captures supply, install type, and circuit profile so retrieval lands the
   * right Iz / protection / Zs facets.
   */
  private buildFacetsQuery(inputs: NormalizedInputs): string {
    const supply = inputs.supply;
    const circuitDescriptions = inputs.circuits
      .slice(0, 8) // cap so the embedding stays focused
      .map((c) => {
        const parts = [c.name, c.loadType, c.specialLocation, `${c.loadPower}W`]
          .filter(Boolean)
          .join(' ');
        return parts;
      })
      .join('; ');

    return [
      `BS 7671:2018+A4:2026 design`,
      `${supply.voltage}V ${supply.phases}-phase`,
      `${supply.earthingSystem} earthing`,
      `Ze ${supply.ze}Ω`,
      `circuits: ${circuitDescriptions}`,
      'cable sizing, protective device selection, Zs limits, voltage drop, RCD requirements',
    ].join(' — ');
  }
}

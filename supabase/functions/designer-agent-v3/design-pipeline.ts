/**
 * Design Pipeline - Simplified Architecture
 * Form → RAG → AI → Results (with minimal safety checks)
 * 
 * Trust the AI to reason with RAG context. No correcting the AI after the fact.
 */

import { ConsistencyValidator } from './consistency-validator.ts';
import { validateCableCapacity, validateIndustrialProtection } from './cable-capacity-validator.ts';
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
    // PHASE 6.5: Consistency Validation (CRITICAL SAFETY)
    // ========================================
    const { validateCircuitConsistency, validateMaxZs } = await import('./consistency-validator.ts');
    design.circuits = design.circuits.map(circuit => {
      // Validate and fix protection device consistency
      const consistentCircuit = validateCircuitConsistency(circuit, this.logger);
      
      // Validate max Zs for all device types (MCB, RCBO, BS88, BS1361, BS3036)
      const zsValidation = validateMaxZs(consistentCircuit, this.logger);
      if (!zsValidation.isValid && zsValidation.correctedMaxZs) {
        return {
          ...consistentCircuit,
          calculations: {
            ...consistentCircuit.calculations,
            maxZs: zsValidation.correctedMaxZs
          }
        };
      }
      
      return consistentCircuit;
    });

    this.logger.info('Consistency validation complete', {
      circuits: design.circuits.length
    });
    
    // ========================================
    // PHASE 6.6: Breaking Capacity Validation (INDUSTRIAL SAFETY)
    // ========================================
    const { validateBreakingCapacity } = await import('./breaking-capacity-validator.ts');
    const breakingCapacityIssues = validateBreakingCapacity(
      design.circuits,
      normalized.supply,
      this.logger
    );
    
    if (breakingCapacityIssues.length > 0) {
      const errorCount = breakingCapacityIssues.filter(i => i.severity === 'error').length;
      const warningCount = breakingCapacityIssues.filter(i => i.severity === 'warning').length;
      
      this.logger.warn('Breaking capacity issues detected', {
        errors: errorCount,
        warnings: warningCount,
        issues: breakingCapacityIssues.map(i => ({
          circuit: i.circuitName,
          severity: i.severity,
          message: i.message
        }))
      });
      
      // Attach breaking capacity warnings to design result
      (design as any).breakingCapacityIssues = breakingCapacityIssues;
    } else {
      this.logger.info('Breaking capacity validation passed', {
        circuits: design.circuits.length
      });
    }

    // ========================================
    // PHASE 6.7: Cable Capacity Validation (CRITICAL SAFETY - PREVENT UNDERSIZING)
    // ========================================
    const cableCapacityErrors: any[] = [];
    const industrialProtectionErrors: any[] = [];
    const protectionSizingErrors: any[] = [];
    
    design.circuits.forEach((circuit, index) => {
      // Validate cable capacity against BS 7671 tables
      const capacityValidation = validateCableCapacity(circuit, this.logger);
      if (!capacityValidation.valid) {
        cableCapacityErrors.push({
          circuitNumber: circuit.circuitNumber || index + 1,
          circuitName: circuit.name,
          error: capacityValidation.error,
          recommendation: capacityValidation.recommendation,
          severity: capacityValidation.recommendation?.includes('CRITICAL') ? 'error' : 'warning'
        });
      }
      
      // Validate industrial protection device selection (BS88/MCCB for >63A)
      const protectionValidation = validateIndustrialProtection(
        circuit,
        normalized.supply.installationType || 'commercial',
        this.logger
      );
      if (!protectionValidation.valid) {
        industrialProtectionErrors.push({
          circuitNumber: circuit.circuitNumber || index + 1,
          circuitName: circuit.name,
          error: protectionValidation.error,
          recommendation: protectionValidation.recommendation,
          severity: 'error'
        });
      }
      
      // Validate protection sizing (Ib ≤ In ≤ Iz) - DO NOT correct here, just log
      const { validateProtectionSizing } = await import('./cable-capacity-validator.ts');
      const sizingValidation = validateProtectionSizing(circuit, this.logger);
      if (!sizingValidation.valid) {
        protectionSizingErrors.push({
          circuitNumber: circuit.circuitNumber || index + 1,
          circuitName: circuit.name,
          reason: sizingValidation.reason,
          correctedRating: sizingValidation.correctedRating,
          severity: 'warning'
        });
      }
    });
    
    // Log validation results
    if (cableCapacityErrors.length > 0) {
      this.logger.error('🔴 Cable capacity validation FAILED', {
        errorCount: cableCapacityErrors.length,
        errors: cableCapacityErrors
      });
      (design as any).cableCapacityErrors = cableCapacityErrors;
    } else {
      this.logger.info('✅ Cable capacity validation passed', {
        circuits: design.circuits.length
      });
    }
    
    if (industrialProtectionErrors.length > 0) {
      this.logger.error('🔴 Industrial protection validation FAILED', {
        errorCount: industrialProtectionErrors.length,
        errors: industrialProtectionErrors
      });
      (design as any).industrialProtectionErrors = industrialProtectionErrors;
    } else {
      this.logger.info('✅ Industrial protection validation passed', {
        circuits: design.circuits.length
      });
    }
    
    if (protectionSizingErrors.length > 0) {
      this.logger.warn('🟡 Protection sizing issues detected', {
        issueCount: protectionSizingErrors.length,
        issues: protectionSizingErrors
      });
      (design as any).protectionSizingWarnings = protectionSizingErrors;
    } else {
      this.logger.info('✅ Protection sizing validation passed', {
        circuits: design.circuits.length
      });
    }

    // ========================================
    // PHASE 6.8: Protection Sizing Auto-Correction (Ib ≤ In ≤ Iz)
    // ========================================
    const { validateProtectionSizing: validateProtectionSizingFunc } = await import('./cable-capacity-validator.ts');
    let correctionCount = 0;
    
    design.circuits = design.circuits.map(circuit => {
      const validation = validateProtectionSizingFunc(circuit, this.logger);
      
      if (!validation.valid && validation.correctedRating) {
        correctionCount++;
        this.logger.info('🔧 Auto-correcting protection device', {
          circuit: circuit.name,
          originalRating: circuit.protectionDevice?.rating,
          correctedRating: validation.correctedRating,
          reason: validation.reason
        });
        
        return {
          ...circuit,
          protectionDevice: {
            ...circuit.protectionDevice,
            rating: validation.correctedRating
          },
          calculations: {
            ...circuit.calculations,
            In: validation.correctedRating
          }
        };
      }
      
      return circuit;
    });
    
    if (correctionCount > 0) {
      this.logger.info('✅ Protection sizing auto-correction complete', {
        corrected: correctionCount,
        total: design.circuits.length
      });
    }


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

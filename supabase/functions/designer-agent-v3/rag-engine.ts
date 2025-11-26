/**
 * RAG Engine - 2-Source Parallel Search
 * Searches regulations_intelligence (90) and practical_work_intelligence (95)
 */

import { createClient } from '../_shared/deps.ts';
import { EmbeddingBuilder } from './embedding-builder.ts';
import type { NormalizedInputs, RAGContext, Logger } from './types.ts';

export class RAGEngine {
  private embedder: EmbeddingBuilder;
  private supabase: any;

  constructor(private logger: Logger) {
    this.embedder = new EmbeddingBuilder();
    this.supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
  }

  /**
   * Execute RAG search for circuit design regulations ONLY
   * Installation methods are now handled by installation-method-agent
   * Phase 3: Added batch-aware match count for faster processing
   */
  async search(normalized: NormalizedInputs, isBatch = false): Promise<RAGContext> {
    const startTime = Date.now();

    // Phase 5: Reduced to 30 items to prevent timeouts (20 for batches)
    const matchCount = isBatch ? 20 : 30;

    // Build search queries from form fields (NOT text prompts)
    const queries = {
      regulationKeywords: this.buildRegulationKeywords(normalized)
    };

    this.logger.info('RAG queries built', {
      regulationKeywords: queries.regulationKeywords.split(' ').length,
      isBatch,
      matchCount
    });

    // Phase 4: Execute parallel searches for regulations + design knowledge
    const [regulations, designKnowledge] = await Promise.all([
      this.searchRegulations(queries.regulationKeywords, matchCount).catch(err => {
        this.logger.error('Regulations search failed', { error: err.message });
        return [];
      }),
      this.searchDesignKnowledge(queries.regulationKeywords, matchCount).catch(err => {
        this.logger.error('Design knowledge search failed', { error: err.message });
        return [];
      })
    ]);

    const searchTime = Date.now() - startTime;

    // Fallback: If both searches failed, use core regulations cache
    if (regulations.length === 0 && designKnowledge.length === 0) {
      this.logger.warn('All searches failed, using core regulations fallback');
      const coreRegs = this.getCoreRegulations();
      return {
        regulations: this.weightResults(coreRegs, 90),
        designKnowledge: [],
        practicalGuides: [],
        totalResults: coreRegs.length,
        searchTime
      };
    }

    // Log RAG quality metrics for debugging
    this.logger.info('RAG Quality Check', {
      totalItems: regulations.length + designKnowledge.length,
      topRegulations: regulations.slice(0, 3).map(r => r.regulation_number),
      topDesignTopics: designKnowledge.slice(0, 3).map(d => d.primary_topic),
      avgRegScore: regulations.length > 0 ? (regulations.reduce((sum, r) => sum + (r.hybrid_score || r.similarity || 0), 0) / regulations.length).toFixed(2) : '0',
      avgDesignScore: designKnowledge.length > 0 ? (designKnowledge.reduce((sum, d) => sum + (d.hybrid_score || d.similarity || 0), 0) / designKnowledge.length).toFixed(2) : '0',
      searchTime
    });

    return {
      regulations: this.weightResults(regulations, 85),
      designKnowledge: this.weightResults(designKnowledge, 95), // Higher weight for enriched knowledge
      practicalGuides: [], // Installation methods now handled by installation-method-agent
      totalResults: regulations.length + designKnowledge.length,
      searchTime
    };
  }


  /**
   * Build regulation-specific keywords from form fields
   * Phase 1: Optimized to reduce keyword density and eliminate redundancy
   */
  private buildRegulationKeywords(inputs: NormalizedInputs): string {
    const keywords: string[] = [];

    // Supply keywords - simplified (Phase 1)
    keywords.push(`${inputs.supply.voltage}V`);
    keywords.push(inputs.supply.phases === 'three' ? 'three phase' : 'single phase');
    keywords.push(inputs.supply.earthing);

    // Circuit-specific keywords - EXPANDED for better RAG coverage (Phase 5)
    inputs.circuits.forEach(c => {
      keywords.push(c.loadType);
      
      // Power rating keywords for better matching
      if (c.loadPower > 5000) keywords.push('high power load');
      if (c.loadPower > 10000) keywords.push('heavy duty');
      
      // Installation method keywords
      if (c.installMethod && c.installMethod !== 'auto') {
        keywords.push(c.installMethod.replace('method_', 'Reference Method '));
      }
      
      // Cable length keywords (affects VD and Zs)
      if (c.cableLength > 50) keywords.push('long cable run');
      if (c.cableLength > 100) keywords.push('extended circuit');
      
      // Special locations - EXPANDED
      if (c.specialLocation !== 'none') {
        keywords.push(c.specialLocation);
        keywords.push(`Section 7${c.specialLocation === 'bathroom' ? '01' : '17'}`); // BS 7671 sections
        
        if (c.specialLocation === 'bathroom' && c.bathroomZone) {
          const zoneNum = c.bathroomZone.replace('zone_', '');
          keywords.push(`Zone ${zoneNum}`);
          keywords.push('IP rating'); // Bathrooms need IP-rated equipment
          keywords.push('RCD protection'); // Mandatory in bathrooms
        }
        
        if (c.specialLocation === 'outdoor') {
          keywords.push('SWA cable'); // Outdoor typically needs SWA
          keywords.push('IP65'); // Outdoor IP rating
          keywords.push('weather resistance');
          if (c.outdoorInstall === 'underground') {
            keywords.push('buried cable');
            keywords.push('depth requirements');
          }
        }
      }
      
      // Three-phase specific keywords
      if (c.phases === 'three') {
        keywords.push('three phase');
        keywords.push('load balancing');
        keywords.push('neutral conductor');
      }
      
      // Protection type - only if specified
      if (c.protectionType && c.protectionType !== 'auto') {
        keywords.push(c.protectionType);
      }
    });

    // Supply-specific keywords
    if (inputs.supply.earthing === 'TN-S') {
      keywords.push('separate earth');
    } else if (inputs.supply.earthing === 'TN-C-S') {
      keywords.push('PME');
      keywords.push('protective multiple earthing');
    }

    // Core regulation sections - essential only
    keywords.push('Section 433'); // Overcurrent protection
    keywords.push('Section 522'); // Cable selection
    keywords.push('Table 4A2'); // Voltage drop

    // Phase 5: Deduplicate and limit to top 40 keywords for comprehensive coverage
    const uniqueKeywords = [...new Set(keywords)].slice(0, 40);
    return uniqueKeywords.join(' ');
  }

  /**
   * Search Design Knowledge Intelligence (hybrid search, weight 95)
   * Phase 4: Added to retrieve enriched formulas, examples, and calculations
   */
  private async searchDesignKnowledge(keywords: string, matchCount = 6): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        'search_design_knowledge_intelligence_hybrid',
        {
          query_text: keywords,
          match_count: matchCount
        }
      ).abortSignal(AbortSignal.timeout(45000)); // Phase 5: Increased for 50-item searches

      if (error) {
        this.logger.warn('Design knowledge search failed', { error: error.message });
        return [];
      }

      this.logger.info('Design knowledge search complete', { 
        results: data?.length || 0,
        matchCount
      });

      return data || [];
    } catch (error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        this.logger.warn('Design knowledge search timed out');
        return [];
      }
      this.logger.error('Design knowledge search exception', { error: error.message });
      return [];
    }
  }

  /**
   * Search Regulations Intelligence (keyword search, weight 85)
   * Phase 2: Increased timeout and improved fallback handling
   * Phase 3: Dynamic match count based on batch size
   */
  private async searchRegulations(keywords: string, matchCount = 6): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        'search_regulations_intelligence_hybrid',
        {
          query_text: keywords,
          match_count: matchCount
        }
      ).abortSignal(AbortSignal.timeout(45000)); // Phase 5: Increased for 50-item searches

      if (error) {
        this.logger.warn('Regulations search failed, using fallback', { error: error.message });
        return this.getCoreRegulations();
      }

      this.logger.info('Regulations search complete', { 
        results: data?.length || 0,
        matchCount
      });

      return data || this.getCoreRegulations();
    } catch (error) {
      // Phase 2: Timeout-specific fallback
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        this.logger.warn('Regulations search timed out, using core regulations');
        return this.getCoreRegulations();
      }
      this.logger.error('Regulations search exception, using fallback', { error: error.message });
      return this.getCoreRegulations();
    }
  }

  /**
   * Hardcoded fallback - 10 essential BS 7671 regulations
   */
  private getCoreRegulations(): any[] {
    return [
      {
        regulation_number: '433.1.1',
        content: 'Every circuit shall be designed so that a protective device will operate automatically to disconnect the supply in the event of a fault. The protective device must ensure: Ib ≤ In ≤ Iz',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '525.1',
        content: 'Voltage drop between origin of installation and fixed current-using equipment shall not exceed 3% for lighting circuits and 5% for other uses',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '411.3.2',
        content: 'Automatic disconnection of supply (ADS): The earth fault loop impedance Zs shall not exceed the value required to ensure disconnection in required time',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '411.3.3',
        content: 'RCD protection with rated residual operating current not exceeding 30mA shall be provided for socket-outlets',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '701.411.3.3',
        content: 'Bathrooms: RCD protection with operating current not exceeding 30mA is mandatory for all circuits in zones',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '543.1.1',
        content: 'Circuit protective conductors (CPC) shall have conductance not less than that given in Table 54.7',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '531.3.3',
        content: 'MCB selection: The rated current of the device shall be not less than the design current of the circuit',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '522.8.10',
        content: 'Buried cables shall be at sufficient depth to avoid damage by any reasonably foreseeable disturbance',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: '559.10.3.1',
        content: 'Three-phase circuits: Load balancing shall be considered in design',
        similarity: 1.0,
        source: 'core_fallback'
      },
      {
        regulation_number: 'Appendix 4',
        content: 'Voltage drop tables: Use appropriate mV/A/m values for cable sizing calculations',
        similarity: 1.0,
        source: 'core_fallback'
      }
    ];
  }

  /**
   * Weight results by source importance
   */
  private weightResults(results: any[], weight: number): any[] {
    return results.map(r => ({
      ...r,
      weightedScore: (r.similarity || r.hybrid_score || 0) * (weight / 100)
    })).sort((a, b) => b.weightedScore - a.weightedScore);
  }
}

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
   * Execute parallel RAG search across 2 intelligence tables
   */
  async search(normalized: NormalizedInputs): Promise<RAGContext> {
    const startTime = Date.now();

    // Build search queries from form fields (NOT text prompts)
    const queries = {
      regulationKeywords: this.buildRegulationKeywords(normalized),
      practicalKeywords: this.buildPracticalKeywords(normalized)
    };

    this.logger.info('RAG queries built', {
      regulationKeywords: queries.regulationKeywords.split(' ').length,
      practicalKeywords: queries.practicalKeywords.split(' ').length
    });

    // Parallel search without artificial timeouts - let queries complete naturally
    const [regulations, practicalGuides] = await Promise.all([
      this.searchRegulations(queries.regulationKeywords).catch(err => {
        this.logger.error('Regulations search failed', { error: err.message });
        return [];
      }),
      this.searchPracticalWork(queries.practicalKeywords).catch(err => {
        this.logger.error('Practical work search failed', { error: err.message });
        return [];
      })
    ]);

    const searchTime = Date.now() - startTime;

    // Fallback: If all sources failed, use core regulations cache
    if (regulations.length === 0 && practicalGuides.length === 0) {
      this.logger.warn('All RAG sources failed, using core regulations fallback');
      const coreRegs = this.getCoreRegulations();
      return {
        regulations: this.weightResults(coreRegs, 90),
        practicalGuides: [],
        totalResults: coreRegs.length,
        searchTime
      };
    }

    return {
      regulations: this.weightResults(regulations, 90),
      practicalGuides: this.weightResults(practicalGuides, 95),
      totalResults: regulations.length + practicalGuides.length,
      searchTime
    };
  }


  /**
   * Build regulation-specific keywords from form fields
   */
  private buildRegulationKeywords(inputs: NormalizedInputs): string {
    const keywords: string[] = [];

    // Supply keywords
    keywords.push(`${inputs.supply.voltage}V`);
    keywords.push(inputs.supply.phases === 'three' ? 'three phase' : 'single phase');
    keywords.push(inputs.supply.earthing);

    // Circuit-specific keywords
    inputs.circuits.forEach(c => {
      keywords.push(c.loadType);
      
      // Special location regulations
      if (c.specialLocation !== 'none') {
        keywords.push(c.specialLocation);
        
        if (c.specialLocation === 'bathroom' && c.bathroomZone) {
          const zoneNum = c.bathroomZone.replace('zone_', '');
          keywords.push(`Zone ${zoneNum}`);
          keywords.push('Section 701'); // Bathroom-specific regulation
        }
        
        if (c.specialLocation === 'outdoor') {
          keywords.push('outdoor installation');
          keywords.push('Section 522'); // External influences
        }
      }

      // Power-based keywords
      if (c.loadPower > 7200) {
        keywords.push('high power circuit');
        keywords.push('cable sizing');
      }

      // Length-based keywords
      if (c.cableLength > 50) {
        keywords.push('voltage drop');
        keywords.push('Section 525');
      }

      // Phase-specific
      if (c.phases === 'three') {
        keywords.push('three phase circuit');
        keywords.push('Section 559');
      }

      // Protection keywords
      if (c.protectionType === 'rcbo') {
        keywords.push('RCBO');
        keywords.push('Section 531');
      }
    });

    // Core regulations always included
    keywords.push('433.1.1'); // Cable sizing
    keywords.push('525.1');   // Voltage drop
    keywords.push('411.3.2'); // ADS

    return keywords.join(' ');
  }

  /**
   * Build practical work keywords from installation details
   * PHASE 3: Enhanced with installation-specific terms
   */
  private buildPracticalKeywords(inputs: NormalizedInputs): string {
    const keywords: string[] = [];

    // PHASE 3: Add installation guidance keywords
    keywords.push('installation');
    keywords.push('termination');
    keywords.push('testing');
    keywords.push('cable routing');
    keywords.push('tools required');

    inputs.circuits.forEach(c => {
      // Installation method
      if (c.installMethod && c.installMethod !== 'auto') {
        const methodNum = c.installMethod.replace('method_', '');
        keywords.push(`reference method ${methodNum}`);
        keywords.push('cable installation');
        keywords.push('clip spacing'); // PHASE 3
      }

      // Load-specific practical guidance
      keywords.push(`${c.loadType} installation`);
      
      if (c.loadType === 'shower') {
        keywords.push('shower circuit installation');
        keywords.push('isolator switch');
        keywords.push('pull cord'); // PHASE 3
      }
      
      if (c.loadType === 'cooker') {
        keywords.push('cooker circuit installation');
        keywords.push('control unit');
        keywords.push('diversity factor'); // PHASE 3
      }

      // Outdoor installation specifics
      if (c.specialLocation === 'outdoor' && c.outdoorInstall) {
        keywords.push(`${c.outdoorInstall} cable`);
        keywords.push('outdoor wiring');
        keywords.push('SWA termination'); // PHASE 3
        keywords.push('gland sizing'); // PHASE 3
      }

      // Protection installation
      if (c.protectionType && c.protectionType !== 'auto') {
        keywords.push(`${c.protectionType} installation`);
        keywords.push('RCD testing'); // PHASE 3
      }
    });

    // Trade filter
    keywords.push('electrical installation');
    keywords.push('commissioning');
    keywords.push('safe isolation'); // PHASE 3

    return keywords.join(' ');
  }

  /**
   * Search Regulations Intelligence (keyword search, weight 90)
   */
  private async searchRegulations(keywords: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        'search_regulations_intelligence_hybrid',
        {
          query_text: keywords,
          match_count: 10
        }
      ).abortSignal(AbortSignal.timeout(15000));

      if (error) {
        this.logger.warn('Regulations search failed, using fallback', { error: error.message });
        return this.getCoreRegulations();
      }

      this.logger.info('Regulations search complete', { 
        results: data?.length || 0 
      });

      return data || this.getCoreRegulations();
    } catch (error) {
      this.logger.error('Regulations search exception, using fallback', { error: error.message });
      return this.getCoreRegulations();
    }
  }

  /**
   * Search Practical Work Intelligence (keyword search, weight 95)
   * OPTIMIZATION: Reduced match_count for faster queries
   */
  private async searchPracticalWork(keywords: string): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.rpc(
        'search_practical_work_intelligence_hybrid',
        {
          query_text: keywords,
          match_count: 5, // Reduced from 10 for faster queries
          filter_trade: 'installer'
        }
      );

      if (error) {
        this.logger.warn('Practical work search failed', { error: error.message });
        return [];
      }

      this.logger.info('Practical work search complete', { 
        results: data?.length || 0 
      });

      return data || [];
    } catch (error) {
      this.logger.warn('Practical work search exception', { error: error.message });
      return [];
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

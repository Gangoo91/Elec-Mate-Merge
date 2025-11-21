/**
 * RAG Composer Module - Ultra-Fast Intelligence Integration
 * Replaced slow vector search with <50ms keyword-based GIN index searches
 */

import { searchCircuitRegulations, searchInstallationPractices } from '../../_shared/circuit-rag.ts';
import { filterRegulationsForCircuit } from '../../_shared/circuit-regulation-mapper.ts';
import { searchDesignIntelligence } from '../../_shared/intelligence-search.ts';
import { extractIntelligenceKeywords } from '../../_shared/circuit-keyword-extractor.ts';

/**
 * Core Regulations Cache Loader
 * Emergency fallback when RAG pipeline fails
 */
async function loadCoreRegulations(supabase: any) {
  const coreRegNumbers = [
    '433.1.1', '433.1.204', // Cable sizing fundamentals
    '525', '525.1', '525.2', // Voltage drop
    '411.3.2', '411.3.3', // Protection & RCD
    '543.1.1', '543.1.3', '543.7', // Earth fault loop
    '701.410.3.5', '701.411.3.3', // Bathroom RCD & bonding
    '522.8.10', '522.6', // Outdoor/buried cables
    '531.3.3', '531.3.4', // Protection device selection
    '559.10.3.1' // Three-phase circuits
  ];
  
  const { data, error } = await supabase
    .from('bs7671_embeddings')
    .select('*')
    .in('regulation_number', coreRegNumbers);
  
  if (error) {
    console.error('Failed to load core regulations cache:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Extract Circuit-Specific Keywords from User Input
 * Builds high-signal keywords from actual circuit data fields
 */
function extractCircuitKeywords(circuits: any[]): string[] {
  const keywords = new Set<string>();
  
  circuits.forEach(circuit => {
    // Load type keywords (primary signal)
    if (circuit.loadType) {
      keywords.add(circuit.loadType.toLowerCase());
    }
    
    // Power-based keywords
    if (circuit.loadPower) {
      if (circuit.loadPower > 7000) keywords.add('high power circuit');
      if (circuit.loadPower > 3000) keywords.add('dedicated circuit');
    }
    
    // Cable length keywords
    if (circuit.cableLength) {
      if (circuit.cableLength > 30) keywords.add('voltage drop calculation');
      if (circuit.cableLength > 50) keywords.add('long cable run');
    }
    
    // Phase keywords
    if (circuit.phases === 'three') {
      keywords.add('three phase installation');
      keywords.add('balanced loading');
    }
    
    // Special location keywords (high priority)
    if (circuit.specialLocation && circuit.specialLocation !== 'none') {
      keywords.add(`${circuit.specialLocation} regulations`);
      
      if (circuit.specialLocation === 'bathroom') {
        keywords.add('Section 701');
        keywords.add('RCD 30mA protection');
        keywords.add('IP ratings bathroom zones');
      }
      if (circuit.specialLocation === 'outdoor') {
        keywords.add('IP65 weatherproof');
        keywords.add('outdoor installation');
      }
      if (circuit.specialLocation === 'underground') {
        keywords.add('buried cable');
        keywords.add('mechanical protection');
      }
    }
    
    // Load-specific regulations
    if (circuit.loadType?.includes('socket')) {
      keywords.add('ring final circuit');
      keywords.add('socket outlet RCD');
      keywords.add('Reg 411.3.3');
    }
    
    if (circuit.loadType?.includes('shower')) {
      keywords.add('shower circuit sizing');
      keywords.add('dedicated shower circuit');
      keywords.add('high current CPC');
    }
    
    if (circuit.loadType?.includes('cooker')) {
      keywords.add('cooker circuit diversity');
      keywords.add('cooker control unit');
    }
    
    if (circuit.loadType?.includes('lighting')) {
      keywords.add('lighting circuit design');
      keywords.add('radial lighting');
    }
    
    // Parse notes for additional keywords (longer tokens only)
    if (circuit.notes) {
      const noteWords = circuit.notes.toLowerCase().split(/\W+/);
      noteWords.forEach(word => {
        if (word.length > 4) keywords.add(word);
      });
    }
  });
  
  // Return top 18 keywords (keeps RPC fast)
  return Array.from(keywords).slice(0, 18);
}

/**
 * PHASE 2: Pre-Structured Calculation Formulas Retrieval
 * Direct database query (no embedding needed, <50ms)
 * Based on AI RAMS success pattern
 */
async function retrieveStructuredCalculations(
  supabase: any,
  circuitTypes: string[]
): Promise<any[]> {
  console.log('📐 Retrieving pre-structured calculations for:', circuitTypes);
  
  // Build OR query for all circuit types
  const orConditions = circuitTypes
    .filter(type => type && type.trim())
    .map(type => `circuit_type.ilike.%${type.toLowerCase()}%,topic.ilike.%${type.toLowerCase()}%`)
    .join(',');
  
  if (!orConditions) {
    // Fallback: get general calculation formulas
    const { data } = await supabase
      .from('circuit_design_calculations')
      .select('*')
      .or('circuit_type.ilike.%general%,circuit_type.ilike.%voltage drop%,topic.ilike.%appendix 4%')
      .limit(8);
    
    return data || [];
  }
  
  // Direct DB query (no embedding, ~50ms)
  const { data, error } = await supabase
    .from('circuit_design_calculations')
    .select('*')
    .or(orConditions)
    .limit(10);
    
  if (error) {
    console.error('Failed to retrieve calculations:', error);
    return [];
  }
  
  console.log('✅ Retrieved calculation formulas:', data?.length || 0);
  return data || [];
}

/**
 * Get critical topics based on installation type
 */
function getCriticalTopicsForType(type: 'domestic' | 'commercial' | 'industrial'): string[] {
  const critical: Record<string, string[]> = {
    domestic: [
      'ring final calculation',
      'cpc sizing table',
      'socket rcd protection',
      'voltage drop mV/A/m',
      'shower circuit design',
      'Part P requirements'
    ],
    commercial: [
      'emergency lighting design',
      'fire alarm circuits',
      'diversity factors commercial',
      'discrimination selectivity',
      'BS 5266 emergency',
      'fire alarm segregation',
      'non-maintained lighting'
    ],
    industrial: [
      'motor circuit design',
      'three-phase distribution',
      'harmonics power factor',
      'industrial socket requirements',
      'DOL starter sizing',
      'star delta motor',
      'Section 552 rotating machines',
      'motor derating factors'
    ]
  };
  
  return critical[type] || critical.domestic;
}

/**
 * Build RAG searches for circuit design
 * OPTIMIZED: Ultra-fast keyword-based intelligence search
 */
export async function buildRAGSearches(
  query: string,
  searchTerms: string[],
  openAiKey: string,
  supabase: any,
  logger: any,
  installationType?: 'domestic' | 'commercial' | 'industrial',
  circuits?: any[],
  strictValidation: boolean = false
): Promise<any> {
  const type = installationType || 'domestic';
  
  logger.info('⚡ Ultra-Fast RAG: Intelligence keyword search', { 
    searchTerms: searchTerms.length, 
    installationType: type,
    circuitCount: circuits?.length || 0
  });

  // Extract circuit-specific keywords from user input
  const circuitKeywords = circuits ? extractCircuitKeywords(circuits) : [];
  
  // Merge with existing search terms (deduplicate)
  const allKeywords = [...new Set([
    ...searchTerms.map(t => t.toLowerCase()),
    ...circuitKeywords
  ])].slice(0, 20); // Cap at 20 keywords for optimal performance
  
  logger.info('🔍 Combined keywords', { 
    generic: searchTerms.length,
    circuitSpecific: circuitKeywords.length,
    total: allKeywords.length,
    examples: allKeywords.slice(0, 10)
  });

  const startTime = Date.now();
  
  // ============= SOFT VALIDATION WITH ASSUMPTIONS =============
  const assumptions: string[] = [];
  
  if (circuits && circuits.length > 0) {
    for (const circuit of circuits) {
      const circuitId = circuit.name || 'unnamed';
      
      // Validate loadType
      if (!circuit.loadType) {
        if (strictValidation) {
          throw new Error(`Circuit \"${circuitId}\" missing loadType`);
        }
        assumptions.push(`Circuit \"${circuitId}\": load type details missing - proceeding with generic design guidance`);
        logger.warn(`⚠️ Assumption: Circuit \"${circuitId}\" missing loadType, using generic approach`, { circuitId });
      }
      
      // Validate installMethod with intelligent defaults
      if (!circuit.installMethod) {
        if (strictValidation) {
          throw new Error(`Circuit \"${circuitId}\" missing installMethod`);
        }
        
        // Apply safe defaults based on context
        if (circuit.specialLocation === 'outdoor') {
          assumptions.push(`Circuit \"${circuitId}\": install method assumed - outdoor typical installation (SWA buried/clipped)`);
          logger.warn(`⚠️ Assumption: Circuit \"${circuitId}\" outdoor installation method assumed`, { circuitId });
        } else {
          // Default to Reference Method C (clipped direct) for domestic
          circuit.installMethod = 'method_c';
          assumptions.push(`Circuit \"${circuitId}\": install method assumed - Reference Method C (clipped direct)`);
          logger.warn(`⚠️ Assumption: Circuit \"${circuitId}\" using Reference Method C as default`, { circuitId, method: 'method_c' });
        }
      }
    }
    
    if (assumptions.length > 0) {
      logger.info(`📋 Applied ${assumptions.length} assumption(s) across ${circuits.length} circuit(s)`);
    } else {
      logger.info(`✅ Pre-validated ${circuits.length} circuits before RAG`);
    }
  }
  
  // ============= SELF-CORRECTION KNOWLEDGE INJECTION =============
  if (circuits && circuits.length > 0) {
    circuits.forEach(c => {
      // Add RCD-specific searches for circuits that need RCD
      if (c.loadType?.includes('socket') || c.specialLocation === 'bathroom') {
        searchTerms.push('RCBO 30mA Type A selection');
        searchTerms.push('Reg 411.3.3 RCD protection requirements');
        searchTerms.push('socket circuit RCD mandatory');
      }
      
      // Add ring final specific searches
      if (c.loadType?.includes('ring') || c.loadType?.includes('socket')) {
        searchTerms.push('Appendix 15 ring final circuit design');
        searchTerms.push('Ring final 2.5mm cable sizing mandatory');
        searchTerms.push('Ring circuit R1+R2 divide by 4');
        searchTerms.push('ring final cpc calculation');
      }
      
      // Add special location searches
      if (c.specialLocation === 'bathroom') {
        searchTerms.push('Section 701 bathroom special location');
        searchTerms.push('bathroom RCD 30mA protection');
        searchTerms.push('Section 701 bathroom IP ratings');
        searchTerms.push('Bathroom zone RCD supplementary bonding');
        searchTerms.push('IP44 bathroom zones');
      }
      
      if (c.specialLocation === 'outdoor') {
        searchTerms.push('Outdoor IP65 weatherproof requirements');
        searchTerms.push('Buried cable mechanical protection');
        searchTerms.push('outdoor socket RCD protection');
      }
      
      // Add voltage drop self-correction searches
      if ((c.cableLength || 0) > 30) {
        searchTerms.push('voltage drop calculation mV/A/m');
        searchTerms.push('Appendix 4 voltage drop tables');
        searchTerms.push('cable size voltage drop compliance');
      }
      
      // Add Zs self-correction searches
      if (c.loadType?.includes('shower') || c.loadType?.includes('cooker')) {
        searchTerms.push('high power circuit Zs requirements');
        searchTerms.push('CPC sizing earth fault loop');
        searchTerms.push('Table 41.3 maximum Zs values');
      }
    });
  }
  
  // Get circuit types for structured calculations
  const circuitTypes = circuits?.map((c: any) => c.circuitType).filter(Boolean) || [];
  
  // ===== SIMPLE PARALLEL RAG SEARCHES (ULTRA-FAST INTELLIGENCE) =====
  const searchStart = Date.now();
  
  // Build job inputs for RAG search
  const jobInputs = {
    circuits: circuits || [],
    supply: {},
    projectInfo: { installationType: type }
  };
  
  let designDocs: any[] = [];
  let regulations: any[] = [];
  let calculations: any[] = [];
  let failedBranches = 0;
  
  try {
    // STEP 1: ULTRA-FAST INTELLIGENCE SEARCH (replaces slow vector search)
    try {
      logger.info('⚡ Searching design intelligence (keyword GIN indexes, <50ms)');
      
      const intelligenceKeywords = extractIntelligenceKeywords(circuits || []);
      const loadTypes = circuits?.map(c => c.loadType).filter(Boolean) || [];
      
      designDocs = await searchDesignIntelligence(supabase, {
        keywords: [...allKeywords, ...intelligenceKeywords],
        loadTypes: loadTypes,
        categories: ['cable_sizing', 'voltage_drop', 'protection', 'earthing', 'special_locations'],
        facetTypes: ['concept', 'formula', 'table', 'example'],
        limit: 25 // Increased - we can afford more now it's <50ms
      });
      
      logger.info(`✅ Intelligence search: ${designDocs.length} facets in ${Date.now() - searchStart}ms`);
    } catch (err) {
      logger.error('❌ Intelligence search failed', { 
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
      failedBranches++;
    }
    
    // STEP 2: BS7671 Regulations via VECTOR search (not hybrid) - INCREASED LIMIT
    try {
      logger.info('🎯 Searching BS7671 regulations (vector search, limit 15)');
      regulations = await searchCircuitRegulations(jobInputs, 'vector');
      logger.info(`✅ BS7671 RAG: ${regulations.length} results`);
    } catch (err) {
      logger.error('❌ BS7671 RAG failed', {
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
      failedBranches++;
    }
    
    // STEP 3: Structured calculations (practical work removed - install-method-agent handles installation guidance)
    try {
      calculations = await retrieveStructuredCalculations(supabase, circuitTypes);
    } catch (err) {
      logger.warn('⚠️ Structured calculations failed (non-critical)', { 
        error: err instanceof Error ? err.message : String(err) 
      });
      failedBranches++;
    }
    
  } catch (error) {
    logger.error('RAG search pipeline failed', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
  
  // PHASE 3: Critical RAG source validation (fail fast if essential data missing)
  const criticalSourcesMissing = [];
  if (designDocs.length === 0) {
    criticalSourcesMissing.push('Design Intelligence');
    logger.error('🚨 CRITICAL: Design intelligence returned 0 results');
  }
  if (regulations.length === 0) {
    criticalSourcesMissing.push('BS 7671 Regulations');
    logger.error('🚨 CRITICAL: BS7671 RAG returned 0 results');
  }
  
  // If BOTH critical sources failed, throw error (don't proceed with incomplete context)
  if (criticalSourcesMissing.length === 2) {
    logger.error('🚨 FATAL: Both critical RAG sources failed - cannot design compliant circuits safely');
    throw new Error(`Critical RAG sources failed: ${criticalSourcesMissing.join(', ')}. Circuit design requires both design intelligence and BS 7671 regulations.`);
  }
  
  // If only ONE critical source failed, load fallback but log warning
  if (criticalSourcesMissing.length === 1) {
    logger.warn(`⚠️ Critical source missing: ${criticalSourcesMissing[0]} - loading fallback regulations`);
    const coreRegs = await loadCoreRegulations(supabase);
    if (regulations.length === 0) regulations = coreRegs;
    logger.info(`✅ Loaded ${coreRegs.length} fallback regulations`);
  }
  
  // Log completion
  const ragTime = Date.now() - searchStart;
  const totalBranches = 3;
  const successfulBranches = totalBranches - failedBranches;
  
  logger.info(`✅ Intelligence: ${designDocs.length} facets`);
  logger.info(`✅ BS 7671: ${regulations.length} regs`);
  logger.info(`✅ Calculations: ${calculations.length} formulas`);
  logger.info(`⏱️ RAG completed in ${ragTime}ms with ${successfulBranches}/${totalBranches} branches`);
  
  const totalTime = Date.now() - startTime;
  
  // Build suggestions array for UI
  const suggestions: string[] = [];
  if (assumptions.length > 0) {
    suggestions.push("Specify install method (e.g., Method C clipped direct, Method E in conduit) to improve accuracy");
  }
  if (circuits && circuits.some(c => !c.loadType)) {
    suggestions.push("Provide detailed load type information for more precise design calculations");
  }
  
  // Fallback: if ALL searches timed out, provide essential regulations
  const hasAnyResults = designDocs.length + regulations.length > 0;
  
  if (!hasAnyResults) {
    logger.warn('⚠️ All RAG searches failed, using essential fallback regulations');
    const fallbackRegulations = [
      {
        regulation_number: '433.1.1',
        content: 'Every circuit shall be designed so that a protective device is provided to break any overload current flowing in the circuit conductors before such a current could cause a temperature rise detrimental to insulation, joints, terminations or surroundings.',
        section: 'Protection against overload current',
        similarity: 1.0,
        source: 'fallback'
      },
      {
        regulation_number: '525.1',
        content: 'The voltage drop between the origin of the installation and any load point shall not exceed 3% of the nominal voltage for lighting circuits and 5% for other uses.',
        section: 'Voltage drop in consumers installations',
        similarity: 1.0,
        source: 'fallback'
      }
    ];
    
    return {
      regulations: fallbackRegulations,
      designDocs: [],
      practicalWorkDocs: [],
      healthSafetyDocs: [],
      installationDocs: [],
      maintenanceDocs: [],
      structuredCalculations: calculations,
      searchMethod: 'fallback',
      totalDocs: fallbackRegulations.length + calculations.length
    };
  }
  
  logger.info('⚡ Ultra-Fast RAG Complete', {
    intelligence: designDocs.length,
    regulations: regulations.length,
    calculations: calculations.length,
    ragTime: `${ragTime}ms`,
    totalTime: `${totalTime}ms`
  });
  
  const ragResults = {
    regulations,
    designDocs,
    practicalWorkDocs: [],
    healthSafetyDocs: [],
    installationDocs: [],
    maintenanceDocs: [],
    structuredCalculations: calculations,
    searchMethod: 'intelligence-keywords',
    totalDocs: designDocs.length + regulations.length + calculations.length,
    assumptions,
    suggestions
  };
  
  return ragResults;
}

/**
 * Format intelligence facets for AI consumption
 * Groups by facet type for structured learning
 */
function formatIntelligenceFacets(facets: any[]): string {
  const grouped = {
    concepts: facets.filter(f => f.facet_type === 'concept'),
    formulas: facets.filter(f => f.facet_type === 'formula'),
    tables: facets.filter(f => f.facet_type === 'table'),
    examples: facets.filter(f => f.facet_type === 'example'),
    regulations: facets.filter(f => f.facet_type === 'regulation')
  };
  
  let output = '=== DESIGN INTELLIGENCE ===\n\n';
  
  // Concepts first (understanding)
  if (grouped.concepts.length > 0) {
    output += '## DESIGN CONCEPTS\n';
    grouped.concepts.forEach(f => {
      output += `### ${f.primary_topic}\n`;
      output += `${f.content}\n`;
      if (f.bs7671_regulations?.length > 0) {
        output += `Regulations: ${f.bs7671_regulations.join(', ')}\n`;
      }
      output += '\n';
    });
  }
  
  // Formulas second (calculations)
  if (grouped.formulas.length > 0) {
    output += '## CALCULATION FORMULAS\n';
    grouped.formulas.forEach(f => {
      output += `### ${f.primary_topic}\n`;
      if (f.formulas?.length > 0) {
        f.formulas.forEach((formula: string) => {
          output += `Formula: ${formula}\n`;
        });
      }
      output += `${f.content}\n`;
      if (f.calculation_steps?.length > 0) {
        output += `Steps:\n`;
        f.calculation_steps.forEach((step: string, i: number) => {
          output += `${i + 1}. ${step}\n`;
        });
      }
      output += '\n';
    });
  }
  
  // Tables third (lookup data)
  if (grouped.tables.length > 0) {
    output += '## REFERENCE TABLES\n';
    grouped.tables.forEach(f => {
      output += `### ${f.primary_topic}\n`;
      output += `${f.content}\n\n`;
    });
  }
  
  // Examples last (worked examples)
  if (grouped.examples.length > 0) {
    output += '## WORKED EXAMPLES\n';
    grouped.examples.forEach(f => {
      output += `### ${f.primary_topic}\n`;
      output += `${f.content}\n`;
      if (f.worked_examples?.length > 0) {
        f.worked_examples.forEach((ex: any) => {
          output += `Example: ${JSON.stringify(ex)}\n`;
        });
      }
      output += '\n';
    });
  }
  
  return output;
}

/**
 * Merge regulation results from multiple sources
 */
export function mergeRegulations(ragResults: any): any[] {
  const regulations = new Map();

  // PHASE 0: Format and add design intelligence FIRST (highest priority)
  if (ragResults.designDocs && ragResults.designDocs.length > 0) {
    const intelligenceContext = formatIntelligenceFacets(ragResults.designDocs);
    
    regulations.set('DESIGN_INTELLIGENCE', {
      regulation_number: 'DESIGN_INTELLIGENCE',
      content: intelligenceContext,
      section: 'Enhanced Design Knowledge',
      similarity: 1.0
    });
  }

  // PHASE 1: Add pre-structured calculation formulas SECOND
  if (ragResults.structuredCalculations && ragResults.structuredCalculations.length > 0) {
    ragResults.structuredCalculations.forEach((calc: any, idx: number) => {
      regulations.set(`CALC-${idx}`, {
        regulation_number: `CALC_${calc.calculation_name}`,
        content: `Formula: ${calc.formula}\n\n${calc.notes || ''}`,
        section: calc.topic || 'Calculations',
        similarity: 0.9
      });
    });
  }

  // PHASE 2: Merge BS 7671 results
  if (ragResults.regulations) {
    ragResults.regulations.forEach((reg: any) => {
      regulations.set(reg.regulation_number, reg);
    });
  }

  return Array.from(regulations.values());
}

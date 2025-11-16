/**
 * RAG Composer Module - 3-5 Second Optimization
 * Parallel RAG searches with circuit-specific keywords
 * Direct keyword extraction from user inputs
 */

import { searchPracticalWorkIntelligence, formatForAIContext } from '../../_shared/rag-practical-work.ts';
import { filterRegulationsForCircuit } from '../../_shared/circuit-regulation-mapper.ts';
import { withTimeout, Timeouts } from '../../_shared/timeout.ts';
import { withRetry } from '../../_shared/retry.ts';
import { generateEmbedding } from '../../_shared/rams-rag.ts';
import { safeAll } from '../../_shared/safe-parallel.ts';

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
 * Helper: Search Design Knowledge (vector-based semantic search)
 * Generates embedding from query text and uses vector similarity search
 */
async function searchDesignKnowledge(supabase: any, query: string, keywords: string[], limit: number) {
  console.log(`📚 Design Knowledge Search: ${query}`);
  
  try {
    // Generate embedding from text with timeout & retry (~200-400ms)
    console.log('🔄 Generating embedding for design knowledge query...');
    const queryEmbedding = await withRetry(
      () => withTimeout(generateEmbedding(query), 5000, 'Embedding Generation'),
      { maxRetries: 2, baseDelayMs: 500, maxDelayMs: 2000 }
    );
    console.log(`✅ Embedding generated (${queryEmbedding.length} dimensions)`);
    
    // Call RPC with vector embedding and correct parameters
    const { data, error } = await supabase.rpc('search_design_knowledge', {
      query_embedding: queryEmbedding,
      circuit_filter: null,
      source_filter: null,
      match_threshold: 0.7,
      match_count: limit
    });
    
    if (error) {
      console.error('Design knowledge search error:', error);
      return [];
    }
    
    console.log(`✅ Found ${data?.length || 0} design knowledge results`);
    return data || [];
  } catch (error) {
    console.error('Design knowledge search failed:', error);
    return [];
  }
}

/**
 * Helper: Search Regulations Intelligence (keyword-based hybrid)
 * FIX: Use search_keywords parameter for lightning-fast keyword search
 */
async function searchRegulationsIntelligence(supabase: any, keywords: string[], limit: number) {
  const queryText = keywords.join(' ');
  const { data, error } = await supabase.rpc('search_regulations_intelligence_hybrid', {
    query_text: queryText,
    match_count: limit
  });
  
  if (error) {
    console.error('Regulations intelligence search error:', error);
    return [];
  }
  
  return (data || []).map((row: any) => ({
    regulation_number: row.regulation_number,
    content: row.content || row.regulation_text || '',
    section: row.section,
    similarity: row.hybrid_score ? row.hybrid_score / 10 : 0.5 // Normalize
  }));
}

/**
 * Helper: Search Practical Work Intelligence (keyword)
 */
async function searchPracticalWorkIntelligenceDirect(supabase: any, params: any) {
  const { keywords, limit } = params;
  const queryText = keywords.join(' ');
  const { data, error } = await supabase.rpc('search_practical_work_intelligence_hybrid', {
    query_text: queryText,
    match_count: limit,
    filter_trade: null // All trades
  });
  
  if (error) {
    console.error('Practical work intelligence search error:', error);
    return [];
  }
  
  return (data || []).map((row: any) => ({
    content: row.primary_topic || row.content || '',
    keywords: row.keywords,
    equipment_category: row.equipment_category,
    tools_required: row.tools_required,
    bs7671_regulations: row.bs7671_regulations
  }));
}

/**
 * Build RAG searches for circuit design
 * REFACTORED: Direct searches, no shared intelligent-rag.ts
 */
export async function buildRAGSearches(
  query: string,
  searchTerms: string[],
  openAiKey: string,
  supabase: any,
  logger: any,
  installationType?: 'domestic' | 'commercial' | 'industrial',
  circuits?: any[]
): Promise<any> {
  const type = installationType || 'domestic';
  
  logger.info('🎯 3-5s RAG: Parallel searches with circuit-specific keywords', { 
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
  
  // ============= EARLY VALIDATION =============
  // Validate circuits before wasting RAG calls
  if (circuits && circuits.length > 0) {
    for (const circuit of circuits) {
      if (!circuit.loadType) {
        throw new Error(`Circuit "${circuit.name || 'unnamed'}" missing loadType`);
      }
      if (!circuit.installMethod) {
        throw new Error(`Circuit "${circuit.name || 'unnamed'}" missing installMethod`);
      }
    }
    logger.info(`✅ Pre-validated ${circuits.length} circuits before RAG`);
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
  
  // ===== PARALLEL RAG SEARCHES WITH INCREASED TIMEOUTS =====
  const searchStart = Date.now();
  
  const { successes, failures } = await safeAll([
    {
      name: 'Design Knowledge',
      execute: () => withTimeout(
        searchDesignKnowledge(supabase, query, allKeywords, 8),
        10000,
        'Design Knowledge RAG'
      )
    },
    {
      name: 'BS 7671 Regulations',
      execute: () => withTimeout(
        searchRegulationsIntelligence(supabase, allKeywords, 6),
        8000,
        'BS 7671 RAG'
      )
    },
    {
      name: 'Practical Work',
      execute: () => withTimeout(
        searchPracticalWorkIntelligenceDirect(supabase, {
          keywords: allKeywords,
          limit: 6,
          activity_filter: []
        }),
        8000,
        'Practical Work RAG'
      )
    },
    {
      name: 'Structured Calculations',
      execute: () => withTimeout(
        retrieveStructuredCalculations(supabase, circuitTypes),
        6000,
        'Structured Calculations DB'
      )
    }
  ]);
  
  // Extract results, defaulting to [] for failed branches
  let designDocs = successes.find(s => s.name === 'Design Knowledge')?.result || [];
  let regulations = successes.find(s => s.name === 'BS 7671 Regulations')?.result || [];
  let practicalWork = successes.find(s => s.name === 'Practical Work')?.result || [];
  let calculations = successes.find(s => s.name === 'Structured Calculations')?.result || [];
  
  // Log any failures (but don't crash)
  failures.forEach(f => {
    logger.warn(`⚠️ RAG branch failed: ${f.name}`, f.error);
  });
  
  // Fallback to core regulations if ALL RAG branches failed
  if (designDocs.length === 0 && regulations.length === 0 && 
      practicalWork.length === 0 && calculations.length === 0) {
    logger.warn('⚠️ ALL RAG branches failed - loading core regulations fallback');
    const coreRegs = await loadCoreRegulations(supabase);
    regulations = coreRegs;
    logger.info(`✅ Loaded ${coreRegs.length} core regulations as fallback`);
  }
  
  // Log completion
  const ragTime = Date.now() - searchStart;
  logger.info(`✅ Design: ${designDocs.length} docs`);
  logger.info(`✅ BS 7671: ${regulations.length} regs`);
  logger.info(`✅ Practical: ${practicalWork.length} docs`);
  logger.info(`✅ Calculations: ${calculations.length} formulas`);
  logger.info(`⏱️ RAG completed in ${ragTime}ms with ${successes.length}/4 branches`);
  
  // Monitor RAG health
  const successRate = (successes.length / 4) * 100;
  logger.info(`📊 RAG Health: ${successRate.toFixed(0)}% (${successes.length}/4 branches)`);
  
  if (successRate < 50) {
    logger.error(`🚨 CRITICAL: Only ${successes.length}/4 RAG branches succeeded`);
  }
  
  const totalTime = Date.now() - startTime;
  
  // Fallback: if ALL searches timed out, provide essential regulations
  const hasAnyResults = designDocs.length + regulations.length + practicalWork.length > 0;
  
  if (!hasAnyResults) {
    logger.warn('⚠️ All RAG searches timed out, using essential fallback regulations');
    const fallbackRegulations = [
      {
        regulation_number: '433.1.1',
        content: 'Every circuit shall be designed so that a protective device is provided to break any overload current flowing in the circuit conductors before such a current could cause a temperature rise detrimental to insulation, joints, terminations or surroundings.',
        section: 'Protection against overload current',
        similarity: 1.0,
        source: 'timeout-fallback'
      },
      {
        regulation_number: '525.1',
        content: 'The voltage drop between the origin of the installation and any load point shall not exceed 3% of the nominal voltage for lighting circuits and 5% for other uses.',
        section: 'Voltage drop in consumers installations',
        similarity: 1.0,
        source: 'timeout-fallback'
      },
      {
        regulation_number: '411.3.2',
        content: 'RCD protection required for socket-outlets rated up to 20A for use by ordinary persons and intended for general use.',
        section: 'RCD protection requirements',
        similarity: 1.0,
        source: 'timeout-fallback'
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
      searchMethod: 'timeout-fallback',
      totalDocs: fallbackRegulations.length + calculations.length
    };
  }
  
  logger.info('🎯 RAG Complete (3-5s optimization)', {
    designDocs: designDocs.length,
    regulations: regulations.length,
    practicalWork: practicalWork.length,
    calculations: calculations.length,
    ragTime: `${ragTime}ms`,
    totalTime: `${totalTime}ms`
  });
  
  const ragResults = {
    regulations,
    designDocs,
    practicalWorkDocs: practicalWork,
    healthSafetyDocs: [],
    installationDocs: [],
    maintenanceDocs: [],
    structuredCalculations: calculations,
    searchMethod: 'direct-search',
    totalDocs: designDocs.length + regulations.length + practicalWork.length + calculations.length
  };
  
  // ============= PHASE 2: CIRCUIT-SPECIFIC RAG FILTERING =============
  // Extract unique circuit types from batch
  const circuitTypesSet = new Set(
    circuits?.map(c => (c.loadType || 'socket').toLowerCase()) || ['socket']
  );
  
  // If batch has multiple circuit types, keep all regulations
  // If batch is homogeneous (all same type) AND has 4+ circuits, filter aggressively to reduce tokens
  // Smaller batches retain all context to avoid losing critical regulations
  if (circuitTypesSet.size === 1 && circuits && circuits.length >= 4) {
    const singleType = Array.from(circuitTypesSet)[0];
    logger.info(`🔍 Homogeneous batch detected: ${circuits.length} ${singleType} circuits, applying aggressive RAG filtering`);
    
    const originalRegCount = ragResults.regulations?.length || 0;
    const originalDocCount = ragResults.designDocs?.length || 0;
    
    // Filter regulations to ONLY those relevant for this circuit type
    ragResults.regulations = filterRegulationsForCircuit(
      ragResults.regulations || [],
      singleType
    );
    
    ragResults.designDocs = filterRegulationsForCircuit(
      ragResults.designDocs || [],
      singleType
    );
    
    const newRegCount = ragResults.regulations?.length || 0;
    const newDocCount = ragResults.designDocs?.length || 0;
    
    logger.info(`📉 RAG filtered: regulations ${originalRegCount}→${newRegCount}, docs ${originalDocCount}→${newDocCount} (${Math.round((1 - (newRegCount + newDocCount) / (originalRegCount + originalDocCount)) * 100)}% reduction)`);
  } else {
    const reason = circuitTypesSet.size > 1 
      ? `Mixed batch with ${circuitTypesSet.size} types`
      : `Small homogeneous batch (${circuits?.length || 0} circuits)`;
    logger.info(`🔀 ${reason}, keeping all regulations to avoid missing requirements`);
  }

  return ragResults;
}

/**
 * Merge regulation results from multiple sources
 */
export function mergeRegulations(ragResults: any): any[] {
  const regulations = new Map();

  // PHASE 1: Add pre-structured calculation formulas FIRST (highest priority)
  if (ragResults.calculationFormulas && ragResults.calculationFormulas.length > 0) {
    ragResults.calculationFormulas.forEach((calc: any, idx: number) => {
      regulations.set(`CALC-${idx}`, {
        regulation_number: calc.regulation_reference || `Calculation-${calc.circuit_type}`,
        topic: calc.calculation_name,
        content: formatCalculationForAI(calc),
        category: 'calculation_formula',
        circuit_type: calc.circuit_type
      });
    });
  }

  // Merge BS 7671 results
  if (ragResults.regulations) {
    ragResults.regulations.forEach((reg: any) => {
      regulations.set(reg.regulation_number, reg);
    });
  }

  // Merge design knowledge
  if (ragResults.designKnowledge) {
    ragResults.designKnowledge.forEach((doc: any, idx: number) => {
      regulations.set(`DK-${idx}`, { ...doc, regulation_number: `Design-${idx}` });
    });
  }

  // Merge design docs (if not already included)
  if (ragResults.designDocs) {
    ragResults.designDocs.forEach((doc: any, idx: number) => {
      const key = doc.regulation_number || `DOC-${idx}`;
      if (!regulations.has(key)) {
        regulations.set(key, { ...doc, regulation_number: key });
      }
    });
  }

  return Array.from(regulations.values());
}

/**
 * Format calculation formula for AI consumption
 * Pre-structures calculation data so AI can directly apply formulas
 */
function formatCalculationForAI(calc: any): string {
  let content = `${calc.calculation_name}\n\n`;
  
  if (calc.formula) {
    content += `Formula: ${calc.formula}\n\n`;
  }
  
  if (calc.worked_example) {
    content += `Worked Example:\n`;
    if (typeof calc.worked_example === 'object') {
      Object.entries(calc.worked_example).forEach(([key, value]) => {
        content += `  ${key}: ${value}\n`;
      });
    } else {
      content += `${calc.worked_example}\n`;
    }
    content += '\n';
  }
  
  if (calc.table_data) {
    content += `Table Data:\n`;
    if (Array.isArray(calc.table_data)) {
      calc.table_data.forEach((row: any) => {
        if (typeof row === 'object') {
          content += `  ${JSON.stringify(row)}\n`;
        } else {
          content += `  ${row}\n`;
        }
      });
    }
    content += '\n';
  }
  
  if (calc.notes) {
    content += `Notes: ${calc.notes}`;
  }
  
  return content.trim();
}

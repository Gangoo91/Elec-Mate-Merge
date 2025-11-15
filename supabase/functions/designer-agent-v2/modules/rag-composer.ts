/**
 * RAG Composer Module
 * Direct RAG searches for Designer Agent V2
 * Eliminates shared intelligent-rag.ts complexity
 */

import { searchPracticalWorkIntelligence, formatForAIContext } from '../../_shared/rag-practical-work.ts';
import { filterRegulationsForCircuit } from '../../_shared/circuit-regulation-mapper.ts';

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
 * Helper: Search Design Knowledge (vector)
 */
async function searchDesignKnowledge(supabase: any, query: string, keywords: string[], limit: number) {
  const { data, error } = await supabase.rpc('search_design_knowledge', {
    query_text: query,
    match_count: limit
  });
  
  if (error) {
    console.error('Design knowledge search error:', error);
    return [];
  }
  
  return data || [];
}

/**
 * Helper: Search Regulations Intelligence (keyword)
 */
async function searchRegulationsIntelligence(supabase: any, keywords: string[], limit: number) {
  const queryText = keywords.join(' ');
  const { data, error } = await supabase.rpc('search_bs7671_intelligence_hybrid', {
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
  
  logger.info('🎯 Designer Agent V2: Direct RAG searches (Design + Regulations + Practical Work)', { 
    searchTerms, 
    installationType: type,
    circuitCount: circuits?.length || 0
  });

  // PHASE 6: Fast path for simple jobs (<=3 circuits, no special locations)
  const isSimpleJob = circuits && circuits.length <= 3 && 
                      circuits.every((c: any) => 
                        c.specialLocation === 'none' && 
                        (c.loadPower || 0) < 7200
                      );

  if (isSimpleJob) {
    logger.info('🚀 FAST PATH: Simple job detected (≤3 circuits, no special locations), using core regulations only');
    
    // Get pre-structured calculations for circuit types
    const circuitTypes = circuits?.map((c: any) => c.circuitType).filter(Boolean) || [];
    const calculations = await retrieveStructuredCalculations(supabase, circuitTypes);
    
    // Core regulations for simple domestic circuits (hardcoded for speed)
    const coreRegulations = [
      {
        regulation_number: '433.1.1',
        content: 'Every circuit shall be designed so that a protective device is provided to break any overload current flowing in the circuit conductors before such a current could cause a temperature rise detrimental to insulation, joints, terminations or surroundings.',
        section: 'Protection against overload current',
        similarity: 1.0,
        source: 'fast-path-core'
      },
      {
        regulation_number: '525.1',
        content: 'The voltage drop between the origin of the installation and any load point shall not exceed 3% of the nominal voltage for lighting circuits and 5% for other uses.',
        section: 'Voltage drop in consumers installations',
        similarity: 1.0,
        source: 'fast-path-core'
      },
      {
        regulation_number: '411.3.2',
        content: 'RCD protection required for socket-outlets rated up to 20A for use by ordinary persons and intended for general use.',
        section: 'RCD protection requirements',
        similarity: 1.0,
        source: 'fast-path-core'
      }
    ];

    logger.info('✅ FAST PATH: Using core regulations', { 
      regulations: coreRegulations.length,
      calculations: calculations.length 
    });

    return {
      regulations: coreRegulations,
      designDocs: [],
      practicalWorkDocs: [],
      healthSafetyDocs: [],
      installationDocs: [],
      maintenanceDocs: [],
      structuredCalculations: calculations,
      searchMethod: 'fast-path-core',
      totalDocs: coreRegulations.length + calculations.length
    };
  }

  // NORMAL PATH: Full RAG searches
  const startTime = Date.now();
  
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
  
  // ===== SEARCH 1: Design Knowledge (Vector) =====
  const designDocs = await searchDesignKnowledge(supabase, query, searchTerms, 10);
  
  // ===== SEARCH 2: Regulations Intelligence (Keyword) =====
  const regulations = await searchRegulationsIntelligence(supabase, searchTerms, 15);
  
  // ===== SEARCH 3: Practical Work Intelligence (Keyword) =====
  const practicalWork = await searchPracticalWorkIntelligenceDirect(supabase, {
    keywords: searchTerms,
    limit: 12,
    activity_filter: []
  });
  
  // PHASE 2: Get pre-structured calculations
  const circuitTypes = circuits?.map((c: any) => c.circuitType).filter(Boolean) || [];
  const calculations = await retrieveStructuredCalculations(supabase, circuitTypes);
  
  const totalTime = Date.now() - startTime;
  
  logger.info('✅ RAG Complete', {
    designDocs: designDocs.length,
    regulations: regulations.length,
    practicalWork: practicalWork.length,
    calculations: calculations.length,
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

/**
 * RAG Composer Module
 * Orchestrates intelligent RAG searches and merges results
 */

import { intelligentRAGSearch } from '../../_shared/intelligent-rag.ts';
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
 * Build RAG searches for circuit design
 * Enhanced with PHASE 2: Pre-structured calculation retrieval
 */
export async function buildRAGSearches(
  query: string,
  searchTerms: string[],
  openAiKey: string,
  supabase: any,
  logger: any,
  installationType?: 'domestic' | 'commercial' | 'industrial',
  circuits?: any[] // PHASE 2: Pass circuits for targeted calculation lookup
): Promise<any> {
  const type = installationType || 'domestic';
  
  logger.info('Performing intelligent RAG search with calculation formula lookup...', { 
    searchTerms, 
    installationType: type,
    circuitCount: circuits?.length || 0
  });

  // ============= PHASE 2: RETRIEVE PRE-STRUCTURED CALCULATIONS FIRST =============
  // Extract circuit types from circuits or search terms
  const circuitTypes = new Set<string>();
  
  // ============= SELF-CORRECTION KNOWLEDGE INJECTION =============
  if (circuits && circuits.length > 0) {
    circuits.forEach(c => {
      if (c.loadType) circuitTypes.add(c.loadType);
      
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
  
  // Add critical topics for installation type
  const criticalTopics = getCriticalTopicsForType(type);
  
  // Add circuit types from search terms
  searchTerms.forEach(term => {
    const lowerTerm = term.toLowerCase();
    if (lowerTerm.includes('shower')) circuitTypes.add('shower');
    if (lowerTerm.includes('socket')) circuitTypes.add('socket');
    if (lowerTerm.includes('lighting')) circuitTypes.add('lighting');
    if (lowerTerm.includes('cooker')) circuitTypes.add('cooker');
    if (lowerTerm.includes('ev') || lowerTerm.includes('charger')) circuitTypes.add('ev_charger');
    if (lowerTerm.includes('motor')) circuitTypes.add('motor');
    if (lowerTerm.includes('control') || lowerTerm.includes('panel')) circuitTypes.add('control_panel');
    if (lowerTerm.includes('emergency')) circuitTypes.add('emergency_light');
    if (lowerTerm.includes('fire') || lowerTerm.includes('alarm')) circuitTypes.add('fire_alarm');
    if (lowerTerm.includes('data') || lowerTerm.includes('comms')) circuitTypes.add('data');
    if (lowerTerm.includes('hvac') || lowerTerm.includes('air')) circuitTypes.add('hvac');
    if (lowerTerm.includes('compressor')) circuitTypes.add('compressor');
    if (lowerTerm.includes('conveyor')) circuitTypes.add('conveyor');
  });
  
  // Retrieve calculation formulas (FAST: <50ms, no embedding)
  const calculationFormulas = await retrieveStructuredCalculations(
    supabase,
    Array.from(circuitTypes)
  );

  logger.info('✅ Pre-loaded calculation formulas', { count: calculationFormulas?.length || 0 });

  // ============= WEIGHTED RAG SEARCH =============
  // Apply custom search weights: 95% design knowledge (vector), 90% regulations/practical (keyword)
  const ragResults = await intelligentRAGSearch({
    expandedQuery: query,
    searchTerms,
    priorities: {
      design_knowledge: 95,    // Design docs FIRST: +95% boost, vector search (HIGHEST PRIORITY)
      bs7671: 90,              // Regulations: +90% boost, keyword search
      practical_work: 90,      // Practical work: +90% boost, keyword search (NEW - was 0)
      installation_knowledge: 0,
      health_safety: 85        // Health & Safety: +85% boost, hybrid search (NEW - was 0)
    },
    limit: 40,
    installationType: type
  }, openAiKey, supabase, logger);
  
  logger.info('✅ Weighted RAG search complete', { 
    regulations: ragResults.regulations.length,
    designDocs: ragResults.designDocs.length,
    practicalWorkDocs: ragResults.practicalWorkDocs?.length || 0,
    healthSafetyDocs: ragResults.healthSafetyDocs.length,
    searchMethod: ragResults.searchMethod,
    searchTimeMs: ragResults.searchTimeMs
  });
  
  // Inject calculation formulas at the top (PHASE 2: Pre-structured calculations)
  ragResults.calculationFormulas = calculationFormulas;
  ragResults.designDocs = ragResults.designDocs || [];

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

  // PHASE 4: Force-include critical design knowledge based on installation type
  const criticalTopics = getCriticalTopicsForType(type);

  const foundTopics = (ragResults.designDocs || []).map((d: any) => (d.topic || '').toLowerCase());
  const missingCritical = criticalTopics.filter(topic =>
    !foundTopics.some(found => found.includes(topic.replace(/ /g, '')))
  );

  if (missingCritical.length > 0) {
    logger.warn('Missing critical design knowledge, attempting direct lookup', {
      missing: missingCritical
    });
    
    const { data: criticalDocs } = await supabase
      .from('design_knowledge')
      .select('*')
      .or(missingCritical.map(topic => 
        `topic.ilike.%${topic}%`
      ).join(','))
      .limit(5);
      
    if (criticalDocs && criticalDocs.length > 0) {
      ragResults.designDocs = ragResults.designDocs || [];
      ragResults.designDocs.unshift(...criticalDocs);
      logger.info('✅ Added critical design knowledge', {
        count: criticalDocs.length,
        topics: criticalDocs.map((d: any) => d.topic)
      });
    }
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

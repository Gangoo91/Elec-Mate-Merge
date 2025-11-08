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
      'voltage drop mV/A/m'
    ],
    commercial: [
      'emergency lighting design',
      'fire alarm circuits',
      'diversity factors',
      'discrimination selectivity'
    ],
    industrial: [
      'motor circuit design',
      'three-phase distribution',
      'harmonics power factor',
      'industrial socket requirements'
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
  
  if (circuits && circuits.length > 0) {
    circuits.forEach(c => {
      if (c.loadType) circuitTypes.add(c.loadType);
    });
  }
  
  // Add circuit types from search terms
  searchTerms.forEach(term => {
    const lowerTerm = term.toLowerCase();
    if (lowerTerm.includes('shower')) circuitTypes.add('shower');
    if (lowerTerm.includes('socket')) circuitTypes.add('socket');
    if (lowerTerm.includes('lighting')) circuitTypes.add('lighting');
    if (lowerTerm.includes('cooker')) circuitTypes.add('cooker');
    if (lowerTerm.includes('ev') || lowerTerm.includes('charger')) circuitTypes.add('ev_charger');
  });
  
  // Retrieve calculation formulas (FAST: <50ms, no embedding)
  const calculationFormulas = await retrieveStructuredCalculations(
    supabase,
    Array.from(circuitTypes)
  );

  logger.info('✅ Pre-loaded calculation formulas', { count: calculationFormulas?.length || 0 });

  const ragResults = await intelligentRAGSearch({
    expandedQuery: query,
    searchTerms,
    priorities: {
      design_knowledge: 95,    // Design docs FIRST: +95% boost, vector search, 15 results
      bs7671: 85,              // Regulations: +85% boost, keyword search, 10 results
      installation_knowledge: 0,
      practical_work: 0,
      health_safety: 0
    },
    limit: 30,
    installationType: type     // Pass context for boost prioritization
  }, openAiKey, supabase, logger);
  
  // Inject calculation formulas at the top (PHASE 2: Pre-structured calculations)
  ragResults.calculationFormulas = calculationFormulas;
  ragResults.designDocs = ragResults.designDocs || [];

  // ============= PHASE 2: CIRCUIT-SPECIFIC RAG FILTERING =============
  // Extract unique circuit types from batch
  const circuitTypesSet = new Set(
    circuits?.map(c => (c.loadType || 'socket').toLowerCase()) || ['socket']
  );
  
  // If batch has multiple circuit types, keep all regulations
  // If batch is homogeneous (all same type), filter aggressively to reduce tokens
  if (circuitTypesSet.size === 1) {
    const singleType = Array.from(circuitTypesSet)[0];
    logger.info(`🔍 Homogeneous batch detected: ${singleType}, applying aggressive RAG filtering`);
    
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
    logger.info(`🔀 Mixed batch with ${circuitTypesSet.size} types, keeping all regulations to avoid missing requirements`);
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

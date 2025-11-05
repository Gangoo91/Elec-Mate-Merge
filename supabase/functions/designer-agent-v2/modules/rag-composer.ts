/**
 * RAG Composer Module
 * Orchestrates intelligent RAG searches and merges results
 */

import { intelligentRAGSearch } from '../../_shared/intelligent-rag.ts';

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
 */
export async function buildRAGSearches(
  query: string,
  searchTerms: string[],
  openAiKey: string,
  supabase: any,
  logger: any,
  installationType?: 'domestic' | 'commercial' | 'industrial'
): Promise<any> {
  const type = installationType || 'domestic';
  
  logger.info('Performing intelligent RAG search with calculation formula lookup...', { 
    searchTerms, 
    installationType: type 
  });

  // PHASE 0: Direct calculation formula lookup (instant, no embedding needed)
  const { data: calcFormulas } = await supabase
    .from('circuit_design_calculations')
    .select('*');

  logger.info('✅ Loaded calculation formulas', { count: calcFormulas?.length || 0 });

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
  
  // Inject calculation formulas at the top
  ragResults.calculationFormulas = calcFormulas || [];
  ragResults.designDocs = ragResults.designDocs || [];

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

  return Array.from(regulations.values());
}

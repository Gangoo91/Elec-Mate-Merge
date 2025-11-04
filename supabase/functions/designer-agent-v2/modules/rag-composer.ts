/**
 * RAG Composer Module
 * Orchestrates intelligent RAG searches and merges results
 */

import { intelligentRAGSearch } from '../../_shared/intelligent-rag.ts';

/**
 * Build RAG searches for circuit design
 */
export async function buildRAGSearches(
  query: string,
  searchTerms: string[],
  openAiKey: string,
  supabase: any,
  logger: any
): Promise<any> {
  logger.info('Performing intelligent RAG search with enhanced thresholds...', { searchTerms });

  const ragResults = await intelligentRAGSearch({
    expandedQuery: query,
    searchTerms,
    priorities: {
      bs7671: 95,              // Vector threshold 0.65+ (95% confidence)
      design_knowledge: 85,    // Keyword-only with 85% relevance
      installation_knowledge: 0,
      practical_work: 0,
      health_safety: 0
    },
    limit: 30
  }, openAiKey, supabase, logger);

  // PHASE 4: Force-include critical design knowledge if missing
  const criticalTopics = [
    'ring final calculation',
    'cpc sizing table',
    'voltage drop mV/A/m',
    'zs calculation method'
  ];

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

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
  logger.info('Performing intelligent RAG search...', { searchTerms });

  const ragResults = await intelligentRAGSearch({
    query,
    searchTerms,
    priorities: {
      bs7671: 95,
      design_knowledge: 90,
      installation_knowledge: 70,
      practical_work: 0,
      health_safety: 0
    },
    limit: 30
  }, openAiKey, supabase, logger);

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

/**
 * Shared RAG utilities for Circuit Design Generation
 * Handles vector + keyword hybrid search across circuit knowledge bases
 * Mirrors rams-rag.ts pattern
 */

import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const createClient = () => createSupabaseClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

/**
 * Generate embedding for RAG search
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text.slice(0, 8000),
      model: 'text-embedding-3-small'
    })
  });
  
  if (!response.ok) {
    throw new Error(`Embedding generation failed: ${await response.text()}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Search BS7671 regulations using PURE VECTOR search (PHASE 3)
 * Replaces hybrid keyword+vector for better semantic matching
 */
export async function searchBS7671Vector(
  jobInputs: any,
  onProgress?: (msg: string) => void
): Promise<any[]> {
  const supabase = createClient();
  
  const query = buildCircuitQuery(jobInputs);
  
  if (onProgress) onProgress('Generating embedding for BS7671 vector search...');
  
  try {
    // Generate embedding from query
    const queryEmbedding = await generateEmbedding(query);
    
    if (onProgress) onProgress('Searching BS7671 regulations (vector)...');
    
    // Pure vector search on bs7671_embeddings
    const { data, error } = await supabase.rpc('match_bs7671_regulations', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 15  // Increased from 10 to 15
    });
    
    if (error) {
      console.error('BS7671 vector search error:', error);
      return [];
    }
    
    if (onProgress) onProgress(`Found ${data?.length || 0} BS7671 regulations`);
    
    // Format results to match expected structure
    return (data || []).map((row: any) => ({
      regulation_number: row.regulation_number,
      content: row.content,
      section: row.section,
      similarity: row.similarity || 0.8,
      metadata: row.metadata
    }));
  } catch (error) {
    console.error('BS7671 vector search failed:', error);
    return [];
  }
}

/**
 * Search circuit regulations - Router function for vector or hybrid mode
 * PHASE 3: Now defaults to vector search, supports 'hybrid' for backward compat
 */
export async function searchCircuitRegulations(
  jobInputs: any,
  searchMode: 'vector' | 'hybrid' = 'vector',
  onProgress?: (msg: string) => void
): Promise<any[]> {
  if (searchMode === 'vector') {
    return searchBS7671Vector(jobInputs, onProgress);
  }
  
  // Legacy hybrid mode (kept for backward compatibility)
  const supabase = createClient();
  const query = buildCircuitQuery(jobInputs);
  
  if (onProgress) onProgress('Searching regulations database (hybrid)...');
  
  const { data, error } = await supabase.rpc('search_regulations_intelligence_hybrid', {
    query_text: query,
    match_count: 10
  });
  
  if (error) {
    console.error('Regulations RAG error:', error);
    return [];
  }
  
  if (onProgress) onProgress(`Found ${data?.length || 0} regulations`);
  return data || [];
}

/**
 * Search practical installation guides
 * PHASE 4: Added progress callbacks to match AI RAMS pattern
 */
export async function searchInstallationPractices(
  jobInputs: any,
  onProgress?: (msg: string) => void
): Promise<any[]> {
  const supabase = createClient();
  
  const query = buildCircuitQuery(jobInputs);
  
  if (onProgress) onProgress('Searching practical installation guides...');
  
  const { data, error } = await supabase.rpc('search_practical_work_intelligence_hybrid', {
    query_text: query,
    match_count: 10,
    filter_trade: 'electrician'
  });
  
  if (error) {
    console.error('Practical Work RAG error:', error);
    return [];
  }
  
  if (onProgress) onProgress(`Found ${data?.length || 0} practical guides`);
  return data || [];
}

/**
 * Build circuit query string
 */
function buildCircuitQuery(jobInputs: any): string {
  const circuits = jobInputs.circuits || [];
  const supply = jobInputs.supply || {};
  
  return `
    ${circuits.length} electrical circuits
    ${supply.voltage || 230}V ${supply.phases || 'single'} phase
    Earthing: ${supply.earthingSystem || 'TN-C-S'}
    Ze: ${supply.ze || 0.35}Ω
    Load types: ${circuits.map((c: any) => c.loadType).join(', ')}
    Total power: ${circuits.reduce((sum: number, c: any) => sum + (c.loadPower || 0), 0)}W
  `.trim();
}

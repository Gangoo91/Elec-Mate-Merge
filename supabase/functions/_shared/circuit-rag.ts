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
 * Search circuit regulations (BS 7671, IET Wiring Regulations)
 */
export async function searchCircuitRegulations(
  jobInputs: any,
  onProgress?: (msg: string) => void
): Promise<any[]> {
  const supabase = createClient();
  
  // Build query from circuit parameters
  const query = buildCircuitQuery(jobInputs);
  
  if (onProgress) onProgress('Generating query embedding...');
  const queryEmbedding = await generateEmbedding(query);
  
  if (onProgress) onProgress('Searching BS 7671 & design regulations...');
  
  // Search regulations intelligence (same as RAMS uses)
  const { data, error } = await supabase.rpc('search_regulations_intelligence_hybrid', {
    query_text: query,
    match_count: 15  // Enough for both designer and installer agents
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

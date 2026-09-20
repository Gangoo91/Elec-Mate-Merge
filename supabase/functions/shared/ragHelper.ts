// RAG Helper - Lightning-fast retrieval from embedding tables
// Generates embeddings and queries pgvector for relevant context

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

interface RAGResult {
  id: string;
  content: string;
  similarity: number;
  metadata?: any;
}

/**
 * Generate embedding for a query using OpenAI
 */
async function generateEmbedding(text: string, openAIApiKey: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI embeddings API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Search BS 7671 regulations using RAG
 */
export async function searchBS7671Regulations(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 15
): Promise<string> {
  console.log('🔍 RAG: Searching BS 7671 regulations for:', query);
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_bs7671', {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant regulations found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant regulations`);
  
  return data.map((reg: any) => 
    `Reg ${reg.regulation_number} (${reg.section}): ${reg.content} [Similarity: ${(reg.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

/**
 * Search installation knowledge using RAG
 */
export async function searchInstallationKnowledge(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 10
): Promise<string> {
  console.log('🔍 RAG: Searching installation knowledge for:', query);
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_installation_knowledge', {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant installation knowledge found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant installation guides`);
  
  return data.map((item: any) => 
    `${item.topic} (${item.source}): ${item.content} [Similarity: ${(item.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

/**
 * Search pricing data using RAG
 */
export async function searchPricingData(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  category?: string,
  limit: number = 15
): Promise<string> {
  console.log('🔍 RAG: Searching pricing data for:', query, category ? `(category: ${category})` : '');
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_pricing', {
    query_embedding: JSON.stringify(embedding),
    category_filter: category || null,
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant pricing data found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant products`);
  
  return data.map((item: any) => 
    `${item.item_name} at ${item.wholesaler}: £${item.base_cost} ${item.price_per_unit} ${item.in_stock ? '✓ In Stock' : '✗ Out of Stock'} [Similarity: ${(item.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

/**
 * Search project management knowledge using RAG
 */
export async function searchProjectManagement(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 10
): Promise<string> {
  console.log('🔍 RAG: Searching project management knowledge for:', query);
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_project_mgmt', {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant project management knowledge found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant project management guides`);
  
  return data.map((item: any) => 
    `${item.topic} (${item.source}): ${item.content} [Similarity: ${(item.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

/**
 * Search health & safety knowledge using RAG
 */
export async function searchHealthSafety(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 10
): Promise<string> {
  console.log('🔍 RAG: Searching health & safety knowledge for:', query);
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_health_safety', {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant health & safety knowledge found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant health & safety guides`);
  
  return data.map((item: any) => 
    `${item.topic} (${item.source}): ${item.content} [Similarity: ${(item.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

/**
 * Search inspection & testing knowledge using RAG
 */
export async function searchInspectionTesting(
  query: string,
  openAIApiKey: string,
  supabaseUrl: string,
  supabaseKey: string,
  limit: number = 10
): Promise<string> {
  console.log('🔍 RAG: Searching inspection & testing knowledge for:', query);
  
  const embedding = await generateEmbedding(query, openAIApiKey);
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase.rpc('search_inspection_testing', {
    query_embedding: JSON.stringify(embedding),
    match_threshold: 0.7,
    match_count: limit
  });

  if (error) {
    console.error('RAG search error:', error);
    return '';
  }

  if (!data || data.length === 0) {
    console.log('⚠️ No relevant inspection & testing knowledge found');
    return '';
  }

  console.log(`✅ Found ${data.length} relevant inspection & testing guides`);
  
  return data.map((item: any) => 
    `${item.topic} (${item.source}): ${item.content} [Similarity: ${(item.similarity * 100).toFixed(0)}%]`
  ).join('\n\n');
}

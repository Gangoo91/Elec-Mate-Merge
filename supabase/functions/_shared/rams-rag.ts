/**
 * Shared RAG utilities for RAMS generation
 * Handles vector + keyword hybrid search across all knowledge bases
 */

import { createClient as createSupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const createClient = () => createSupabaseClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

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

export async function searchHealthSafetyKnowledge(query: string) {
  const supabase = createClient();
  const queryEmbedding = await generateEmbedding(query);
  
  const { data, error } = await supabase.rpc('search_health_safety_hybrid', {
    query_embedding: queryEmbedding,
    query_text: query,
    match_count: 20
  });
  
  if (error) {
    console.error('Health & Safety RAG error:', error);
    return [];
  }
  
  return data || [];
}

export async function searchRegulationsIntelligence(query: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.rpc('search_regulations_intelligence_hybrid', {
    query_text: query,
    match_count: 15
  });
  
  if (error) {
    console.error('Regulations RAG error:', error);
    return [];
  }
  
  return data || [];
}

export async function searchPracticalWorkIntelligence(query: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.rpc('search_practical_work_intelligence_hybrid', {
    query_text: query,
    match_count: 35,
    filter_trade: null
  });
  
  if (error) {
    console.error('Practical Work RAG error:', error);
    return [];
  }
  
  return data || [];
}

export async function searchBS7671Intelligence(query: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.rpc('search_bs7671_intelligence_hybrid', {
    search_keywords: query,
    match_count: 20
  });
  
  if (error) {
    console.error('BS 7671 RAG error:', error);
    return [];
  }
  
  return data || [];
}

export async function callOpenAI({
  messages,
  model,
  tools,
  tool_choice
}: {
  messages: any[];
  model: string;
  tools?: any[];
  tool_choice?: any;
}): Promise<any> {
  const isNewModel = model.includes('gpt-5') || model.includes('gpt-4.1');
  const body: any = {
    model,
    messages,
    max_completion_tokens: isNewModel ? 30000 : undefined,
    max_tokens: isNewModel ? undefined : 30000,
    temperature: isNewModel ? undefined : 0.7
  };
  
  if (tools) {
    body.tools = tools;
    if (tool_choice) body.tool_choice = tool_choice;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI error: ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    toolCalls: data.choices[0].message.tool_calls
  };
}

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PDFChunk {
  regulation_number?: string;
  section: string;
  content: string;
  metadata: Record<string, any>;
  source: string;
  chunk_index?: number;
  total_chunks?: number;
}

// Utility: Estimate tokens (chars / 4 is a reasonable approximation)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// Utility: Split content on paragraph boundaries
function splitContent(text: string, maxTokens: number = 4000): string[] {
  const estimatedTokens = estimateTokens(text);
  if (estimatedTokens <= maxTokens) return [text];

  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let currentChunk = '';

  for (const para of paragraphs) {
    const testChunk = currentChunk ? currentChunk + '\n\n' + para : para;
    if (estimateTokens(testChunk) > maxTokens && currentChunk) {
      chunks.push(currentChunk);
      currentChunk = para;
    } else {
      currentChunk = testChunk;
    }
  }

  if (currentChunk) chunks.push(currentChunk);

  // Safety: if any chunk is still too large, force split
  const finalChunks: string[] = [];
  for (const chunk of chunks) {
    if (estimateTokens(chunk) > maxTokens) {
      // Force split by character count
      const chunkSize = Math.floor(chunk.length * (maxTokens / estimateTokens(chunk)));
      for (let i = 0; i < chunk.length; i += chunkSize) {
        finalChunks.push(chunk.slice(i, i + chunkSize));
      }
    } else {
      finalChunks.push(chunk);
    }
  }

  return finalChunks;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chunks, source } = await req.json() as { 
      chunks: PDFChunk[], 
      source: string
    };
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`Processing ${chunks.length} chunks from ${source}`);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Pre-process: expand any oversized chunks before batching
    const expandedChunks: PDFChunk[] = [];
    for (const chunk of chunks) {
      const tokens = estimateTokens(chunk.content);
      if (tokens > 4000) {
        console.log(`📦 Splitting oversized chunk: ${chunk.regulation_number || chunk.section} (~${tokens} tokens)`);
        const splitParts = splitContent(chunk.content, 4000);
        splitParts.forEach((part, idx) => {
          expandedChunks.push({
            ...chunk,
            content: part,
            chunk_index: idx + 1,
            total_chunks: splitParts.length,
            section: chunk.chunk_index 
              ? `${chunk.section} (Part ${chunk.chunk_index}.${idx + 1})`
              : `${chunk.section} (Part ${idx + 1} of ${splitParts.length})`,
          });
        });
      } else {
        expandedChunks.push(chunk);
      }
    }

    console.log(`📊 Expanded ${chunks.length} chunks to ${expandedChunks.length} processable chunks`);

    // Process in smaller batches to reduce risk
    const batchSize = 50;
    let processedCount = 0;

    for (let i = 0; i < expandedChunks.length; i += batchSize) {
      const batch = expandedChunks.slice(i, i + batchSize);
      
      // Final safety check
      const validBatch = batch.filter(chunk => estimateTokens(chunk.content) <= 4000);
      const skippedCount = batch.length - validBatch.length;
      
      if (skippedCount > 0) {
        console.warn(`⚠️ Skipping ${skippedCount} chunks in batch ${Math.floor(i / batchSize) + 1}`);
      }
      
      if (validBatch.length === 0) {
        console.log(`Batch ${Math.floor(i / batchSize) + 1}: All chunks oversized, skipping`);
        continue;
      }
      
      // Generate embeddings with retry logic
      let embeddingResponse;
      let retryAttempt = 0;
      
      while (retryAttempt < 2) {
        embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: validBatch.map(chunk => chunk.content),
          }),
        });

        if (embeddingResponse.ok) break;

        // Handle 400 errors with context length issues
        if (embeddingResponse.status === 400) {
          const errorText = await embeddingResponse.text();
          console.error(`❌ OpenAI API error ${embeddingResponse.status}:`, errorText);
          
          if (errorText.includes('maximum context length') && retryAttempt === 0) {
            // Find and log the largest chunk
            const largest = validBatch.reduce((max, chunk) => 
              estimateTokens(chunk.content) > estimateTokens(max.content) ? chunk : max
            );
            console.error(`🔍 Largest chunk: ${largest.regulation_number || largest.section} (~${estimateTokens(largest.content)} tokens)`);
            console.error(`📝 Content preview: ${largest.content.substring(0, 200)}...`);
            throw new Error(`Context length exceeded. Largest chunk: ${largest.regulation_number || largest.section} with ~${estimateTokens(largest.content)} tokens`);
          }
          
          throw new Error(`OpenAI API error: ${embeddingResponse.status} - ${errorText}`);
        }

        retryAttempt++;
      }

      if (!embeddingResponse || !embeddingResponse.ok) {
        const errorText = await embeddingResponse?.text() || 'Unknown error';
        console.error(`OpenAI API error ${embeddingResponse?.status}:`, errorText);
        throw new Error(`OpenAI API error: ${embeddingResponse?.status} - ${errorText}`);
      }

      const embeddingData = await embeddingResponse.json();
      
      // Insert into appropriate table
      if (source === 'bs7671') {
        const records = validBatch.map((chunk, idx) => ({
          regulation_number: chunk.regulation_number || 'Unknown',
          section: chunk.section,
          content: chunk.content,
          embedding: JSON.stringify(embeddingData.data[idx].embedding),
          metadata: chunk.metadata,
        }));

        const { error } = await supabase
          .from('bs7671_embeddings')
          .insert(records);

        if (error) throw error;
      } else if (source === 'design-guide') {
        const records = validBatch.map((chunk, idx) => ({
          topic: chunk.section,
          content: chunk.content,
          source: 'design-guide',
          embedding: JSON.stringify(embeddingData.data[idx].embedding),
          metadata: chunk.metadata,
        }));

        const { error } = await supabase
          .from('design_knowledge')
          .insert(records);

        if (error) throw error;
      } else {
        const records = validBatch.map((chunk, idx) => ({
          topic: chunk.section,
          content: chunk.content,
          source,
          embedding: JSON.stringify(embeddingData.data[idx].embedding),
          metadata: chunk.metadata,
        }));

        const { error } = await supabase
          .from('installation_knowledge')
          .insert(records);

        if (error) throw error;
      }

      processedCount += validBatch.length;
      console.log(`Processed ${processedCount}/${chunks.length} chunks (${batch.length - validBatch.length} skipped)`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      processed: processedCount,
      source 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error processing PDF embeddings:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Failed to process PDF' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

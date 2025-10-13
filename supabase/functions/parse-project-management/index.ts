import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, source = 'user_upload' } = await req.json();
    
    if (!text) {
      return new Response(JSON.stringify({ error: 'Text content is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`📄 Processing project management document from ${source}`);
    console.log(`📊 Document length: ${text.length} characters`);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Chunk text into manageable pieces
    const chunks = chunkText(text, 1500);
    console.log(`✂️ Split into ${chunks.length} chunks`);

    let processed = 0;
    let errors = 0;

    // Process in batches of 20 to avoid rate limits and improve performance
    const BATCH_SIZE = 20;
    
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      console.log(`📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}`);
      
      try {
        // Generate embeddings for entire batch in parallel
        const embeddingPromises = batch.map(chunk => 
          fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openAIApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: chunk.text,
            }),
          })
        );

        const embeddingResponses = await Promise.all(embeddingPromises);
        
        // Process responses and prepare batch insert
        const insertData = [];
        for (let j = 0; j < embeddingResponses.length; j++) {
          const response = embeddingResponses[j];
          const chunk = batch[j];
          
          if (!response.ok) {
            console.error(`❌ Embedding error for chunk ${i + j}:`, await response.text());
            errors++;
            continue;
          }

          const embeddingData = await response.json();
          const embedding = embeddingData.data[0].embedding;

          insertData.push({
            content: chunk.text,
            topic: chunk.topic,
            source: source,
            embedding: JSON.stringify(embedding),
            metadata: { chunk_index: chunk.index }
          });
        }

        // Batch insert into database
        if (insertData.length > 0) {
          const { error: insertError } = await supabase
            .from('project_mgmt_knowledge')
            .insert(insertData);

          if (insertError) {
            console.error('❌ Batch insert error:', insertError);
            errors += insertData.length;
          } else {
            processed += insertData.length;
            console.log(`✅ Inserted ${insertData.length} chunks`);
          }
        }
      } catch (error) {
        console.error('❌ Batch processing error:', error);
        errors += batch.length;
      }
    }

    console.log(`✅ Processed ${processed}/${chunks.length} chunks (${errors} errors)`);

    return new Response(JSON.stringify({ 
      success: true,
      total: chunks.length,
      processed,
      errors
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Parse error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function chunkText(text: string, maxLength: number): Array<{ text: string; topic: string; index: number }> {
  const chunks: Array<{ text: string; topic: string; index: number }> = [];
  const paragraphs = text.split(/\n\n+/);
  
  let currentChunk = '';
  let chunkIndex = 0;

  for (const paragraph of paragraphs) {
    if (currentChunk.length + paragraph.length > maxLength && currentChunk.length > 0) {
      chunks.push({
        text: currentChunk.trim(),
        topic: extractTopic(currentChunk),
        index: chunkIndex++
      });
      currentChunk = '';
    }
    currentChunk += paragraph + '\n\n';
  }

  if (currentChunk.trim()) {
    chunks.push({
      text: currentChunk.trim(),
      topic: extractTopic(currentChunk),
      index: chunkIndex
    });
  }

  return chunks;
}

function extractTopic(text: string): string {
  const firstLine = text.split('\n')[0];
  return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
}

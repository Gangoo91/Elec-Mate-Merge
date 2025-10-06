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

    // Process in batches of 100 to avoid rate limits
    const batchSize = 100;
    let processedCount = 0;

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      
      // Generate embeddings for this batch
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: batch.map(chunk => chunk.content),
        }),
      });

      if (!embeddingResponse.ok) {
        const errorText = await embeddingResponse.text();
        console.error(`OpenAI API error ${embeddingResponse.status}:`, errorText);
        console.error(`Batch info: ${batch.length} chunks, sizes:`, batch.map(c => c.content.length));
        throw new Error(`OpenAI API error: ${embeddingResponse.status} - ${errorText}`);
      }

      const embeddingData = await embeddingResponse.json();
      
      // Insert into appropriate table
      if (source === 'bs7671') {
        const records = batch.map((chunk, idx) => ({
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
      } else {
        const records = batch.map((chunk, idx) => ({
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

      processedCount += batch.length;
      console.log(`Processed ${processedCount}/${chunks.length} chunks`);
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

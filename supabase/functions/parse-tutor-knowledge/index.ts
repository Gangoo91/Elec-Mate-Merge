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
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      throw new Error('No file content provided');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('📚 Processing tutor knowledge file...');

    // Chunk by paragraphs (approximately 1500 characters)
    const paragraphs = fileContent
      .split(/\n\n+/)
      .filter((p: string) => p.trim().length > 50);

    const chunks = [];
    let currentChunk = '';

    for (const para of paragraphs) {
      if (currentChunk.length + para.length < 1500) {
        currentChunk += para + '\n\n';
      } else {
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        currentChunk = para + '\n\n';
      }
    }
    if (currentChunk.trim()) chunks.push(currentChunk.trim());

    console.log(`📊 Created ${chunks.length} chunks`);

    // Process chunks and generate embeddings
    let processedCount = 0;
    
    for (const chunk of chunks) {
      // Extract metadata using simple keyword detection
      const lowerChunk = chunk.toLowerCase();
      
      const metadata: any = {};
      
      // Qualification level detection
      if (lowerChunk.includes('level 2') || lowerChunk.includes('2365 level 2')) {
        metadata.qualification_level = 'level_2';
      } else if (lowerChunk.includes('level 3') || lowerChunk.includes('2365 level 3')) {
        metadata.qualification_level = 'level_3';
      } else if (lowerChunk.includes('level 4') || lowerChunk.includes('hnc') || lowerChunk.includes('hnd')) {
        metadata.qualification_level = 'level_4';
      }

      // Subject area detection
      if (lowerChunk.includes('calculation') || lowerChunk.includes('formula') || lowerChunk.includes('equation')) {
        metadata.subject_area = 'calculations';
      } else if (lowerChunk.includes('regulation') || lowerChunk.includes('bs 7671') || lowerChunk.includes('wiring')) {
        metadata.subject_area = 'regulations';
      } else if (lowerChunk.includes('practical') || lowerChunk.includes('hands-on') || lowerChunk.includes('installation')) {
        metadata.subject_area = 'practical';
      } else if (lowerChunk.includes('theory') || lowerChunk.includes('principle') || lowerChunk.includes('concept')) {
        metadata.subject_area = 'theory';
      }

      // Exam body detection
      if (lowerChunk.includes('city') || lowerChunk.includes('guilds') || lowerChunk.includes('2365')) {
        metadata.exam_relevance = 'city_and_guilds';
      } else if (lowerChunk.includes('eal')) {
        metadata.exam_relevance = 'eal';
      } else if (lowerChunk.includes('niceic')) {
        metadata.exam_relevance = 'niceic';
      }

      // Extract topic from first line
      const firstLine = chunk.split('\n')[0].trim();
      const topic = firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;

      // Generate embedding
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: chunk,
        }),
      });

      if (!embeddingResponse.ok) {
        console.error('Embedding failed:', await embeddingResponse.text());
        continue;
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Insert into database
      const { error } = await supabase
        .from('tutor_knowledge')
        .insert({
          topic,
          content: chunk,
          source: 'uploaded_txt',
          metadata,
          embedding,
        });

      if (error) {
        console.error('Insert error:', error);
      } else {
        processedCount++;
      }
    }

    console.log(`✅ Successfully processed ${processedCount} chunks`);

    return new Response(
      JSON.stringify({
        success: true,
        chunksProcessed: processedCount,
        totalChunks: chunks.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

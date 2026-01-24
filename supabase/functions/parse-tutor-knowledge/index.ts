import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent, text } = await req.json();
    const content = fileContent || text;
    
    if (!content) {
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

    // CRITICAL: Hard limit to prevent exceeding OpenAI's 8192 token limit
    const MAX_CHUNK_SIZE = 6000;

    // Force split by character limit (hard boundary)
    const forceChunkBySize = (text: string): string[] => {
      if (text.length <= MAX_CHUNK_SIZE) return [text];
      
      const chunks: string[] = [];
      let start = 0;
      
      while (start < text.length) {
        let end = Math.min(start + MAX_CHUNK_SIZE, text.length);
        
        // Find last space before limit to avoid word splitting
        if (end < text.length) {
          const lastSpace = text.lastIndexOf(' ', end);
          if (lastSpace > start + MAX_CHUNK_SIZE * 0.8) {
            end = lastSpace;
          }
        }
        
        chunks.push(text.slice(start, end).trim());
        start = end + 1;
      }
      
      return chunks;
    };

    // Helper function to split large paragraphs intelligently (NO RECURSION)
    const splitLargeParagraph = (text: string, maxSize: number = 900): string[] => {
      if (text.length <= maxSize) return [text];
      
      // Try splitting by sentences first
      const sentencePattern = /[^.!?]+[.!?]+(?:\s|$)/g;
      const sentences = text.match(sentencePattern) || [];
      
      // Fallback: if no sentences found, split by newlines or words
      if (sentences.length === 0) {
        const lines = text.split(/\n/);
        if (lines.length > 1) {
          const chunks: string[] = [];
          let currentChunk = '';
          
          for (const line of lines) {
            if (currentChunk.length + line.length < maxSize) {
              currentChunk += line + '\n';
            } else {
              if (currentChunk.trim()) chunks.push(currentChunk.trim());
              currentChunk = line + '\n';
            }
          }
          if (currentChunk.trim()) chunks.push(currentChunk.trim());
          return chunks;
        }
        
        // Last resort: split at word boundaries
        const words = text.split(/\s+/);
        const chunks: string[] = [];
        let currentChunk = '';
        
        for (const word of words) {
          // Handle mega-words that exceed maxSize
          if (word.length > maxSize) {
            if (currentChunk.trim()) chunks.push(currentChunk.trim());
            chunks.push(...forceChunkBySize(word));
            currentChunk = '';
            continue;
          }
          
          if (currentChunk.length + word.length + 1 < maxSize) {
            currentChunk += (currentChunk ? ' ' : '') + word;
          } else {
            if (currentChunk.trim()) chunks.push(currentChunk.trim());
            currentChunk = word;
          }
        }
        if (currentChunk.trim()) chunks.push(currentChunk.trim());
        return chunks;
      }
      
      // Build chunks from sentences
      const chunks: string[] = [];
      let currentChunk = '';
      
      for (const sentence of sentences) {
        if (currentChunk.length + sentence.length < maxSize) {
          currentChunk += sentence;
        } else {
          if (currentChunk.trim()) chunks.push(currentChunk.trim());
          currentChunk = sentence;
        }
      }
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      
      // CRITICAL: Replace recursion with forceChunkBySize
      const finalChunks: string[] = [];
      for (const chunk of chunks) {
        if (chunk.length > maxSize) {
          finalChunks.push(...forceChunkBySize(chunk));
        } else {
          finalChunks.push(chunk);
        }
      }
      
      return finalChunks;
    };

    // Smart chunking: Split by paragraphs, then split large paragraphs
    const paragraphs = content
      .split(/\n\n+/)
      .filter((p: string) => p.trim().length > 50);

    let chunks: string[] = [];

    for (const para of paragraphs) {
      if (para.length <= 1000) {
        chunks.push(para.trim());
      } else {
        // Paragraph too large, split it intelligently
        const subChunks = splitLargeParagraph(para, 900);
        chunks.push(...subChunks);
      }
    }

    // CRITICAL: Apply hard size limit as final safety check
    chunks = chunks.flatMap(chunk => 
      chunk.length > MAX_CHUNK_SIZE ? forceChunkBySize(chunk) : [chunk]
    );

    console.log(`📊 Created ${chunks.length} chunks`);
    
    // Log chunk statistics with validation
    if (chunks.length > 0) {
      const avgChunkSize = Math.round(chunks.reduce((sum, c) => sum + c.length, 0) / chunks.length);
      const maxChunkSize = Math.max(...chunks.map(c => c.length));
      const minChunkSize = Math.min(...chunks.map(c => c.length));
      console.log(`📏 Chunk stats - Avg: ${avgChunkSize} chars, Min: ${minChunkSize}, Max: ${maxChunkSize}`);
      
      // Validation warning
      const oversizedChunks = chunks.filter(c => c.length > MAX_CHUNK_SIZE);
      if (oversizedChunks.length > 0) {
        console.error(`⚠️ WARNING: ${oversizedChunks.length} chunks exceed ${MAX_CHUNK_SIZE} chars!`);
      }
    }

    // Process chunks and generate embeddings
    let processedCount = 0;
    
    for (const chunk of chunks) {
      // Preflight token estimation (safety check)
      const estimatedTokens = Math.ceil(chunk.length / 4);
      if (estimatedTokens > 8000) {
        console.warn(`⚠️ Chunk too large (~${estimatedTokens} tokens), skipping...`);
        continue;
      }
      
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

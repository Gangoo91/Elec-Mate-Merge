import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Chunk {
  section: string;
  content: string;
  metadata: {
    document: string;
    chapter_number?: string;
    chapter_title?: string;
    topic: string;
    keywords: string[];
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📕 Starting City & Guilds Level 3 processing...');
    
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      throw new Error('No file content provided in request body');
    }
    
    const lines = fileContent.split('\n');
    console.log(`📄 Total lines: ${lines.length}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Smart chunking function for PDFs
    const smartChunk = (text: string, targetSize: number = 2500): string[] => {
      const results: string[] = [];
      let currentPos = 0;
      
      while (currentPos < text.length) {
        let chunkEnd = Math.min(currentPos + targetSize, text.length);
        
        // Don't exceed max safe size (6000 chars ≈ 1500 tokens)
        const maxChunkSize = 6000;
        if (chunkEnd - currentPos > maxChunkSize) {
          chunkEnd = currentPos + maxChunkSize;
        }
        
        // If not at end, try to break at paragraph
        if (chunkEnd < text.length) {
          const paragraphBreak = text.lastIndexOf('\n\n', chunkEnd);
          if (paragraphBreak > currentPos && chunkEnd - paragraphBreak < 500) {
            chunkEnd = paragraphBreak + 2;
          } else {
            // Try sentence boundary
            const sentenceEnd = Math.max(
              text.lastIndexOf('. ', chunkEnd),
              text.lastIndexOf('.\n', chunkEnd),
              text.lastIndexOf('! ', chunkEnd),
              text.lastIndexOf('? ', chunkEnd)
            );
            if (sentenceEnd > currentPos && chunkEnd - sentenceEnd < 200) {
              chunkEnd = sentenceEnd + 2;
            } else {
              // Try word boundary
              const spacePos = text.lastIndexOf(' ', chunkEnd);
              if (spacePos > currentPos) {
                chunkEnd = spacePos + 1;
              }
            }
          }
        }
        
        const chunk = text.slice(currentPos, chunkEnd).trim();
        if (chunk.length >= 100) {
          results.push(chunk);
        }
        currentPos = chunkEnd;
      }
      
      return results;
    };

    const fullText = fileContent.trim();
    const textChunks = smartChunk(fullText);
    
    console.log(`📦 Created ${textChunks.length} smart chunks (avg ${Math.round(fullText.length / textChunks.length)} chars each)`);

    const chunks: Chunk[] = [];
    
    for (let i = 0; i < textChunks.length; i++) {
      const content = textChunks[i];
      
      // Validate chunk size
      const estimatedTokens = Math.ceil(content.length / 4);
      if (estimatedTokens > 2000) {
        console.warn(`⚠️ Large chunk at index ${i}: ${content.length} chars (~${estimatedTokens} tokens)`);
      }

      const chapterMatch = content.match(/(?:LO\d+|Unit|Topic)\s+(\d+\.?\d*)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      let topic = 'Level 3 Advanced Installation';
      let keywords: string[] = ['City & Guilds', 'Level 3', '8202-30'];

      if (content.toLowerCase().includes('planning') || content.toLowerCase().includes('overseeing')) {
        topic = 'Planning & Supervision';
        keywords.push('planning', 'supervision', 'work programmes');
      } else if (content.toLowerCase().includes('electrical science') || content.toLowerCase().includes('transformer')) {
        topic = 'Advanced Electrical Science';
        keywords.push('electrical science', 'transformers', 'three phase');
      } else if (content.toLowerCase().includes('motor') && content.toLowerCase().includes('control')) {
        topic = 'Motor Control Systems';
        keywords.push('motor control', 'DOL', 'star-delta');
      } else if (content.toLowerCase().includes('lighting') && content.toLowerCase().includes('design')) {
        topic = 'Lighting Design';
        keywords.push('lighting design', 'lux levels', 'illumination');
      } else if (content.toLowerCase().includes('heating') || content.toLowerCase().includes('thermal')) {
        topic = 'Electrical Heating Systems';
        keywords.push('heating', 'thermal storage', 'appliances');
      } else if (content.toLowerCase().includes('design') && content.toLowerCase().includes('calculation')) {
        topic = 'Electrical Design & Calculations';
        keywords.push('design calculations', 'diversity', 'volt drop');
      } else if (content.toLowerCase().includes('earthing') && content.toLowerCase().includes('arrangement')) {
        topic = 'Earthing Arrangements';
        keywords.push('TN-S', 'TN-C-S', 'TT', 'earthing systems');
      } else if (content.toLowerCase().includes('test') || content.toLowerCase().includes('commission')) {
        topic = 'Testing & Commissioning';
        keywords.push('testing', 'commissioning', 'certification');
      } else if (content.toLowerCase().includes('fault') && content.toLowerCase().includes('diagnosis')) {
        topic = 'Fault Diagnosis';
        keywords.push('fault finding', 'diagnosis', 'rectification');
      }

      chunks.push({
        section: chapterTitle || `Section ${i + 1}`,
        content,
        metadata: {
          document: 'City & Guilds Level 3 Advanced Technical Diploma (8202-30)',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from City & Guilds Level 3`);
    console.log(`📊 Topics: ${[...new Set(chunks.map(c => c.metadata.topic))].slice(0, 5).join(', ')}`);

    const response = await fetch(`${supabaseUrl}/functions/v1/process-pdf-embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chunks: chunks.map(chunk => ({
          section: chunk.section,
          content: chunk.content,
          metadata: chunk.metadata,
          source: 'city-guilds-level-3'
        })),
        source: 'city-guilds-level-3'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ City & Guilds Level 3 embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing City & Guilds Level 3:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
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
    console.log('⚡ Starting IET Code of Practice: EV Charging processing...');
    
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      throw new Error('No file content provided in request body');
    }
    
    const lines = fileContent.split('\n');
    console.log(`📄 Total lines: ${lines.length}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const chunks: Chunk[] = [];
    const chunkSize = 110;

    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunkLines = lines.slice(i, i + chunkSize);
      const content = chunkLines.join('\n').trim();
      
      if (content.length < 100) continue;

      const chapterMatch = content.match(/(?:Chapter|Section)\s+(\d+)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      let topic = 'EV Charging Infrastructure';
      let keywords: string[] = ['EV charging', 'electric vehicle', 'charging points'];

      if (content.toLowerCase().includes('installation') || content.toLowerCase().includes('mounting')) {
        topic = 'EV Charger Installation';
        keywords.push('installation', 'mounting', 'positioning');
      } else if (content.toLowerCase().includes('load') || content.toLowerCase().includes('diversity')) {
        topic = 'EV Charging Load Management';
        keywords.push('load management', 'diversity', 'demand');
      } else if (content.toLowerCase().includes('earthing') || content.toLowerCase().includes('protection')) {
        topic = 'EV Charging Protection';
        keywords.push('earthing', 'protective devices', 'RCD');
      } else if (content.toLowerCase().includes('cable') || content.toLowerCase().includes('wiring')) {
        topic = 'EV Charging Cabling';
        keywords.push('cable sizing', 'wiring requirements', 'installation methods');
      } else if (content.toLowerCase().includes('smart') || content.toLowerCase().includes('communication')) {
        topic = 'Smart EV Charging';
        keywords.push('smart charging', 'communications', 'remote control');
      } else if (content.toLowerCase().includes('residential') || content.toLowerCase().includes('domestic')) {
        topic = 'Domestic EV Charging';
        keywords.push('residential', 'domestic', 'home charging');
      } else if (content.toLowerCase().includes('commercial') || content.toLowerCase().includes('workplace')) {
        topic = 'Commercial EV Charging';
        keywords.push('commercial', 'workplace', 'fleet charging');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'IET Code of Practice: EV Charging',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from EV Charging Code`);
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
          source: 'ev-charging'
        })),
        source: 'ev-charging'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ EV Charging Code embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing EV Charging Code:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

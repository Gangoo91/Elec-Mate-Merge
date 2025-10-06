import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    console.log('📐 Starting Electrical Installation Design Guide processing...');
    
    const { fileContent } = await req.json();
    
    if (!fileContent) {
      throw new Error('No file content provided in request body');
    }
    
    const lines = fileContent.split('\n');
    console.log(`📄 Total lines: ${lines.length}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const chunks: Chunk[] = [];
    const chunkSize = 100;

    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunkLines = lines.slice(i, i + chunkSize);
      const content = chunkLines.join('\n').trim();
      
      if (content.length < 100) continue;

      const chapterMatch = content.match(/(?:Chapter|Section)\s+(\d+)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      let topic = 'Installation Design';
      let keywords: string[] = ['design guide', 'installation design', 'calculations'];

      if (content.toLowerCase().includes('load') && content.toLowerCase().includes('calculation')) {
        topic = 'Load Calculations';
        keywords.push('load assessment', 'demand', 'diversity');
      } else if (content.toLowerCase().includes('cable') && content.toLowerCase().includes('sizing')) {
        topic = 'Cable Sizing & Selection';
        keywords.push('cable sizing', 'current capacity', 'derating');
      } else if (content.toLowerCase().includes('voltage drop') || content.toLowerCase().includes('volt drop')) {
        topic = 'Voltage Drop Calculations';
        keywords.push('voltage drop', 'volt drop', 'distance');
      } else if (content.toLowerCase().includes('discrimination')) {
        topic = 'Protection & Discrimination';
        keywords.push('discrimination', 'protective devices', 'selectivity');
      } else if (content.toLowerCase().includes('earthing') || content.toLowerCase().includes('fault loop')) {
        topic = 'Earthing Design';
        keywords.push('earthing', 'fault loop impedance', 'protective conductor');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'Electrical Installation Design Guide',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from Design Guide`);
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
          source: 'design-guide'
        })),
        source: 'design-guide'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Design Guide embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing Design Guide:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

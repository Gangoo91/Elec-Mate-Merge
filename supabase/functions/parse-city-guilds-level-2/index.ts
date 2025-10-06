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
    console.log('📘 Starting City & Guilds Level 2 processing...');
    
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

      const chapterMatch = content.match(/(?:LO\d+|Unit|Topic)\s+(\d+\.?\d*)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      let topic = 'Level 2 Electrical Installation';
      let keywords: string[] = ['City & Guilds', 'Level 2', '8202-20'];

      if (content.toLowerCase().includes('health') && content.toLowerCase().includes('safety')) {
        topic = 'Health & Safety Practices';
        keywords.push('health and safety', 'PPE', 'risk assessment', 'RAMS');
      } else if (content.toLowerCase().includes('electrical science') || content.toLowerCase().includes('circuit')) {
        topic = 'Electrical Science Basics';
        keywords.push('electrical science', 'circuits', 'Ohm\'s law');
      } else if (content.toLowerCase().includes('tools') || content.toLowerCase().includes('equipment')) {
        topic = 'Tools & Equipment';
        keywords.push('tools', 'equipment', 'installation practices');
      } else if (content.toLowerCase().includes('cable') || content.toLowerCase().includes('containment')) {
        topic = 'Cable Installation & Containment';
        keywords.push('cables', 'containment', 'conduit', 'trunking');
      } else if (content.toLowerCase().includes('earthing') || content.toLowerCase().includes('bonding')) {
        topic = 'Earthing & Bonding';
        keywords.push('earthing', 'bonding', 'protection');
      } else if (content.toLowerCase().includes('test') || content.toLowerCase().includes('inspect')) {
        topic = 'Testing & Inspection';
        keywords.push('testing', 'inspection', 'verification');
      } else if (content.toLowerCase().includes('protection') && content.toLowerCase().includes('device')) {
        topic = 'Protection Devices';
        keywords.push('MCB', 'RCD', 'fuses', 'protection');
      } else if (content.toLowerCase().includes('final circuit')) {
        topic = 'Final Circuits';
        keywords.push('final circuits', 'ring circuit', 'radial circuit');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'City & Guilds Level 2 Technical Certificate (8202-20)',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from City & Guilds Level 2`);
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
          source: 'city-guilds-level-2'
        })),
        source: 'city-guilds-level-2'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ City & Guilds Level 2 embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing City & Guilds Level 2:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

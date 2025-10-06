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
    book: string;
    qualification_level: string;
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
    console.log('📗 Starting City & Guilds Book 1 processing...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const fileContent = await Deno.readTextFile('/var/task/public/data/CITY-GUILDS-BOOK-1.txt');
    const lines = fileContent.split('\n');
    
    console.log(`📄 Total lines: ${lines.length}`);

    const chunks: Chunk[] = [];
    const chunkSize = 120;

    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunkLines = lines.slice(i, i + chunkSize);
      const content = chunkLines.join('\n').trim();
      
      if (content.length < 100) continue;

      // Extract chapter information
      const chapterMatch = content.match(/(?:Chapter|Unit)\s+(\d+)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      // Determine topic and qualification level
      let topic = 'General Installation Principles';
      let qualificationLevel = 'Level 2/3';
      let keywords: string[] = ['City & Guilds', 'electrical installation'];

      if (content.toLowerCase().includes('health') && content.toLowerCase().includes('safety')) {
        topic = 'Health & Safety';
        qualificationLevel = 'Level 2';
        keywords.push('H&S', 'PPE', 'risk assessment');
      } else if (content.toLowerCase().includes('cable') && (content.toLowerCase().includes('select') || content.toLowerCase().includes('size'))) {
        topic = 'Cable Selection & Sizing';
        qualificationLevel = 'Level 2/3';
        keywords.push('cable sizing', 'current capacity', 'volt drop');
      } else if (content.toLowerCase().includes('isolat') || content.toLowerCase().includes('switch')) {
        topic = 'Safe Isolation Procedures';
        qualificationLevel = 'Level 2';
        keywords.push('isolation', 'switching', 'safety');
      } else if (content.toLowerCase().includes('test') || content.toLowerCase().includes('inspect')) {
        topic = 'Testing & Inspection Methods';
        qualificationLevel = 'Level 2/3';
        keywords.push('testing', 'inspection', 'verification');
      } else if (content.toLowerCase().includes('circuit') && content.toLowerCase().includes('design')) {
        topic = 'Circuit Design Basics';
        qualificationLevel = 'Level 3';
        keywords.push('circuit design', 'diversity', 'load calculation');
      } else if (content.toLowerCase().includes('earthing') || content.toLowerCase().includes('bonding')) {
        topic = 'Earthing & Bonding';
        qualificationLevel = 'Level 2/3';
        keywords.push('earthing', 'bonding', 'protection');
      } else if (content.toLowerCase().includes('wiring') && content.toLowerCase().includes('system')) {
        topic = 'Wiring Systems';
        qualificationLevel = 'Level 2';
        keywords.push('wiring systems', 'conduit', 'trunking');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          book: 'City & Guilds Book 1',
          qualification_level: qualificationLevel,
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from City & Guilds Book 1`);
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
          source: 'city-guilds-book-1'
        })),
        source: 'city-guilds-book-1'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ City & Guilds Book 1 embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing City & Guilds Book 1:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

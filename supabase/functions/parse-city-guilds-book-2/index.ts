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
    console.log('📙 Starting City & Guilds Book 2 processing...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const fileContent = await Deno.readTextFile('/var/task/public/data/CITY-GUILDS-BOOK-2.txt');
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

      // Determine advanced topics (Level 3)
      let topic = 'Advanced Installation Techniques';
      const qualificationLevel = 'Level 3';
      let keywords: string[] = ['City & Guilds', 'advanced', 'Level 3'];

      if (content.toLowerCase().includes('motor') && content.toLowerCase().includes('control')) {
        topic = 'Motor Control Circuits';
        keywords.push('motor control', 'DOL', 'star-delta', 'soft start');
      } else if (content.toLowerCase().includes('distribution') && content.toLowerCase().includes('design')) {
        topic = 'Distribution System Design';
        keywords.push('distribution', 'sub-main', 'switchgear');
      } else if (content.toLowerCase().includes('three phase') || content.toLowerCase().includes('3-phase')) {
        topic = 'Three Phase Systems';
        keywords.push('three phase', 'balanced load', 'neutral current');
      } else if (content.toLowerCase().includes('transformer') || content.toLowerCase().includes('substation')) {
        topic = 'Transformers & Substations';
        keywords.push('transformer', 'substation', 'HV');
      } else if (content.toLowerCase().includes('power factor') || content.toLowerCase().includes('harmonics')) {
        topic = 'Power Quality';
        keywords.push('power factor', 'harmonics', 'reactive power');
      } else if (content.toLowerCase().includes('lighting') && content.toLowerCase().includes('design')) {
        topic = 'Advanced Lighting Design';
        keywords.push('lighting design', 'lux levels', 'uniformity');
      } else if (content.toLowerCase().includes('fire alarm') || content.toLowerCase().includes('emergency')) {
        topic = 'Fire & Emergency Systems';
        keywords.push('fire alarm', 'emergency systems', 'BS 5839');
      } else if (content.toLowerCase().includes('data') || content.toLowerCase().includes('structured cabling')) {
        topic = 'Data & Communications Cabling';
        keywords.push('data cabling', 'Cat 6', 'fibre optic');
      } else if (content.toLowerCase().includes('solar') || content.toLowerCase().includes('renewable')) {
        topic = 'Renewable Energy Systems';
        keywords.push('solar PV', 'renewable', 'microgeneration');
      } else if (content.toLowerCase().includes('ev') || content.toLowerCase().includes('charging')) {
        topic = 'EV Charging Infrastructure';
        keywords.push('EV charging', 'electric vehicle', 'charging point');
      } else if (content.toLowerCase().includes('design') && content.toLowerCase().includes('calculation')) {
        topic = 'Electrical Design Calculations';
        keywords.push('design calculations', 'load assessment', 'diversity');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          book: 'City & Guilds Book 2',
          qualification_level: qualificationLevel,
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from City & Guilds Book 2`);
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
          source: 'city-guilds-book-2'
        })),
        source: 'city-guilds-book-2'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ City & Guilds Book 2 embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing City & Guilds Book 2:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

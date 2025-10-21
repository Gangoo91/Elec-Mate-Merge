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
    console.log('🧮 Starting Electrical Installation Calculations: Basic processing...');
    
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

      let topic = 'Basic Electrical Calculations';
      let keywords: string[] = ['calculations', 'basic electrical', 'formulae'];

      if (content.toLowerCase().includes('ohm') || content.toLowerCase().includes('resistance')) {
        topic = "Ohm's Law & Resistance";
        keywords.push("Ohm's law", 'resistance', 'voltage', 'current');
      } else if (content.toLowerCase().includes('power') || content.toLowerCase().includes('watt')) {
        topic = 'Power Calculations';
        keywords.push('power', 'watts', 'energy', 'consumption');
      } else if (content.toLowerCase().includes('cable') && content.toLowerCase().includes('size')) {
        topic = 'Cable Sizing Calculations';
        keywords.push('cable sizing', 'current capacity', 'volt drop');
      } else if (content.toLowerCase().includes('voltage drop') || content.toLowerCase().includes('volt drop')) {
        topic = 'Voltage Drop Calculations';
        keywords.push('voltage drop', 'volt drop', 'mV/A/m');
      } else if (content.toLowerCase().includes('earth fault') || content.toLowerCase().includes('loop impedance')) {
        topic = 'Earth Fault Loop Impedance';
        keywords.push('Zs', 'earth fault loop', 'impedance');
      } else if (content.toLowerCase().includes('diversity') || content.toLowerCase().includes('maximum demand')) {
        topic = 'Diversity & Maximum Demand';
        keywords.push('diversity', 'maximum demand', 'load assessment');
      } else if (content.toLowerCase().includes('three phase') || content.toLowerCase().includes('3-phase')) {
        topic = 'Three Phase Calculations';
        keywords.push('three phase', 'balanced load', 'power factor');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'Electrical Installation Calculations: Basic',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from Basic Calculations`);
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
          source: 'calculations-basic'
        })),
        source: 'calculations-basic'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Basic Calculations embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing Basic Calculations:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

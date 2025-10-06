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
    console.log('🎓 Starting NEBOSH IGC Course Notes processing...');
    
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

      const chapterMatch = content.match(/(?:Element|Chapter|Section)\s+(\d+)[:\s-]+([^\n]+)/i);
      const chapterNumber = chapterMatch ? chapterMatch[1] : undefined;
      const chapterTitle = chapterMatch ? chapterMatch[2]?.trim() : undefined;

      let topic = 'NEBOSH IGC General';
      let keywords: string[] = ['NEBOSH', 'IGC', 'international certificate'];

      if (content.toLowerCase().includes('legal') || content.toLowerCase().includes('legislation')) {
        topic = 'Health & Safety Legislation';
        keywords.push('legislation', 'legal framework', 'compliance');
      } else if (content.toLowerCase().includes('management system') || content.toLowerCase().includes('sms')) {
        topic = 'Safety Management Systems';
        keywords.push('SMS', 'management systems', 'policy');
      } else if (content.toLowerCase().includes('chemical') || content.toLowerCase().includes('substance')) {
        topic = 'Chemical & Substance Hazards';
        keywords.push('chemicals', 'substances', 'COSHH');
      } else if (content.toLowerCase().includes('electrical') || content.toLowerCase().includes('shock')) {
        topic = 'Electrical Safety';
        keywords.push('electrical hazards', 'shock', 'arc flash');
      } else if (content.toLowerCase().includes('fire') || content.toLowerCase().includes('explosion')) {
        topic = 'Fire & Explosion Prevention';
        keywords.push('fire safety', 'explosion', 'flammable');
      } else if (content.toLowerCase().includes('transport') || content.toLowerCase().includes('vehicle')) {
        topic = 'Transport & Vehicle Safety';
        keywords.push('transport safety', 'vehicle operations', 'driving');
      } else if (content.toLowerCase().includes('welfare') || content.toLowerCase().includes('wellbeing')) {
        topic = 'Health & Welfare';
        keywords.push('welfare', 'wellbeing', 'occupational health');
      } else if (content.toLowerCase().includes('noise') || content.toLowerCase().includes('vibration')) {
        topic = 'Physical Hazards';
        keywords.push('noise', 'vibration', 'temperature');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'NEBOSH IGC IG1 Course Notes',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from NEBOSH IGC`);
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
          source: 'nebosh-igc'
        })),
        source: 'nebosh-igc'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ NEBOSH IGC embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing NEBOSH IGC:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

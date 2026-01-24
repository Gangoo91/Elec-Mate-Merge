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
    console.log('📘 Starting Guidance Note 3 processing...');
    
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

      let topic = 'Inspection & Testing';
      let keywords: string[] = ['Guidance Note 3', 'inspection', 'testing'];

      if (content.toLowerCase().includes('earth') || content.toLowerCase().includes('continuity')) {
        topic = 'Continuity & Earth Testing';
        keywords.push('continuity', 'earth fault loop', 'protective conductor');
      } else if (content.toLowerCase().includes('insulation') && content.toLowerCase().includes('resistance')) {
        topic = 'Insulation Resistance Testing';
        keywords.push('insulation resistance', 'IR testing', 'megger');
      } else if (content.toLowerCase().includes('rcd') || content.toLowerCase().includes('residual current')) {
        topic = 'RCD Testing';
        keywords.push('RCD', 'residual current device', 'trip time');
      } else if (content.toLowerCase().includes('polarity')) {
        topic = 'Polarity Testing';
        keywords.push('polarity', 'correct connections');
      } else if (content.toLowerCase().includes('certification') || content.toLowerCase().includes('certificate')) {
        topic = 'Certification & Documentation';
        keywords.push('EIC', 'MEIWC', 'certification');
      } else if (content.toLowerCase().includes('schedule') || content.toLowerCase().includes('test results')) {
        topic = 'Test Results & Schedules';
        keywords.push('test results', 'schedules', 'recording');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'Guidance Note 3: Inspection & Testing',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from Guidance Note 3`);
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
          source: 'guidance-note-3'
        })),
        source: 'guidance-note-3'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Guidance Note 3 embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing Guidance Note 3:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

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
    console.log('🔐 Starting Health & Safety Risk Management processing...');
    
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

      let topic = 'Health & Safety Management';
      let keywords: string[] = ['health and safety', 'risk management', 'HSE'];

      if (content.toLowerCase().includes('risk assessment') || content.toLowerCase().includes('hazard identification')) {
        topic = 'Risk Assessment';
        keywords.push('risk assessment', 'hazard identification', 'RIDDOR');
      } else if (content.toLowerCase().includes('accident') || content.toLowerCase().includes('incident')) {
        topic = 'Accident & Incident Management';
        keywords.push('accidents', 'incidents', 'investigation');
      } else if (content.toLowerCase().includes('ppe') || content.toLowerCase().includes('protective equipment')) {
        topic = 'Personal Protective Equipment';
        keywords.push('PPE', 'protective equipment', 'safety gear');
      } else if (content.toLowerCase().includes('work at height') || content.toLowerCase().includes('scaffold')) {
        topic = 'Work at Height';
        keywords.push('work at height', 'scaffolding', 'fall protection');
      } else if (content.toLowerCase().includes('manual handling') || content.toLowerCase().includes('lifting')) {
        topic = 'Manual Handling';
        keywords.push('manual handling', 'lifting', 'ergonomics');
      } else if (content.toLowerCase().includes('confined space')) {
        topic = 'Confined Space Working';
        keywords.push('confined spaces', 'entry procedures', 'atmosphere testing');
      } else if (content.toLowerCase().includes('permit to work')) {
        topic = 'Permit to Work Systems';
        keywords.push('permit to work', 'hot work', 'authorization');
      } else if (content.toLowerCase().includes('fire') || content.toLowerCase().includes('emergency')) {
        topic = 'Fire & Emergency Procedures';
        keywords.push('fire safety', 'emergency procedures', 'evacuation');
      }

      chunks.push({
        section: chapterTitle || `Section at line ${i}`,
        content,
        metadata: {
          document: 'Health and Safety Risk Management (5th Edition)',
          chapter_number: chapterNumber,
          chapter_title: chapterTitle,
          topic,
          keywords
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from Health & Safety Risk Management`);
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
          source: 'health-safety-management'
        })),
        source: 'health-safety-management'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Health & Safety Risk Management embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing Health & Safety Risk Management:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

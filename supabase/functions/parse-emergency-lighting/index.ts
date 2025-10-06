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
    standard: string;
    topic: string;
    keywords: string[];
    section_number?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📘 Starting Emergency Lighting Guide processing...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Read the Emergency Lighting guide
    const fileContent = await Deno.readTextFile('/var/task/public/data/EMERGENCY-LIGHTING.txt');
    const lines = fileContent.split('\n');
    
    console.log(`📄 Total lines: ${lines.length}`);

    const chunks: Chunk[] = [];
    const chunkSize = 80; // Smaller chunks for focused emergency lighting content

    for (let i = 0; i < lines.length; i += chunkSize) {
      const chunkLines = lines.slice(i, i + chunkSize);
      const content = chunkLines.join('\n').trim();
      
      if (content.length < 50) continue;

      // Extract section information
      const sectionMatch = content.match(/(?:Section|Chapter)\s+(\d+\.?\d*)/i);
      const sectionNumber = sectionMatch ? sectionMatch[1] : `Line ${i}`;

      // Determine topic from content
      let topic = 'Emergency Lighting Systems';
      let keywords: string[] = ['emergency lighting', 'BS 5266'];

      if (content.toLowerCase().includes('escape') || content.toLowerCase().includes('evacuation')) {
        topic = 'Emergency Escape Lighting';
        keywords.push('escape routes', 'evacuation');
      } else if (content.toLowerCase().includes('test')) {
        topic = 'Emergency Lighting Testing';
        keywords.push('testing', 'maintenance', 'inspection');
      } else if (content.toLowerCase().includes('design') || content.toLowerCase().includes('calculation')) {
        topic = 'Emergency Lighting Design';
        keywords.push('design', 'calculations', 'lux levels');
      } else if (content.toLowerCase().includes('exit') || content.toLowerCase().includes('sign')) {
        topic = 'Exit Signs & Signage';
        keywords.push('exit signs', 'safety signs', 'signage');
      } else if (content.toLowerCase().includes('battery') || content.toLowerCase().includes('duration')) {
        topic = 'Battery Systems & Duration';
        keywords.push('battery', 'duration', 'autonomy');
      } else if (content.toLowerCase().includes('maintained') || content.toLowerCase().includes('non-maintained')) {
        topic = 'Lighting Modes';
        keywords.push('maintained', 'non-maintained', 'sustained');
      }

      chunks.push({
        section: `Section ${sectionNumber}`,
        content,
        metadata: {
          standard: 'BS 5266',
          topic,
          keywords,
          section_number: sectionNumber
        }
      });
    }

    console.log(`✅ Parsed ${chunks.length} chunks from Emergency Lighting Guide`);
    console.log(`📊 Sample topics: ${[...new Set(chunks.map(c => c.metadata.topic))].slice(0, 5).join(', ')}`);

    // Send to processing function
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
          source: 'emergency-lighting'
        })),
        source: 'emergency-lighting'
      }),
    });

    if (!response.ok) {
      throw new Error(`Processing failed: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Emergency Lighting embeddings created successfully');

    return new Response(JSON.stringify({ 
      success: true,
      chunksProcessed: chunks.length,
      result 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Error processing Emergency Lighting:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Processing failed' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

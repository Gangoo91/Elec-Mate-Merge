import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-timeout, x-request-id',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent, fileName } = await req.json();
    
    console.log(`📚 Parsing Schneider MV Design Guide: ${fileName}`);
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Split content into lines
    const lines = fileContent.split('\n');
    const chunks: { topic: string; content: string; metadata: any }[] = [];
    
    // Parse with 110 line chunks for MV design guides
    const chunkSize = 110;
    let currentChunk: string[] = [];
    let chunkStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      currentChunk.push(lines[i]);
      
      if (currentChunk.length >= chunkSize || i === lines.length - 1) {
        const content = currentChunk.join('\n').trim();
        
        if (content.length > 100) {
          // Detect topic based on content
          let topic = detectTopic(content);
          
          chunks.push({
            topic,
            content,
            metadata: {
              manufacturer: 'Schneider Electric',
              guide_type: 'MV Design Guide',
              voltage_level: 'MV (1-36kV)',
              document_name: fileName,
              line_range: `${chunkStart}-${i}`
            }
          });
        }
        
        currentChunk = [];
        chunkStart = i + 1;
      }
    }
    
    console.log(`✅ Created ${chunks.length} chunks from MV design guide`);
    
    // Store chunks with embeddings
    let storedCount = 0;
    
    for (const chunk of chunks) {
      try {
        // Generate embedding
        const embeddingResponse = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: `${chunk.topic}: ${chunk.content}`,
          }),
        });

        if (!embeddingResponse.ok) {
          console.error('Failed to generate embedding:', await embeddingResponse.text());
          continue;
        }

        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;
        
        // Store in design_knowledge table
        const { error: insertError } = await supabase
          .from('design_knowledge')
          .insert({
            topic: chunk.topic,
            content: chunk.content,
            source: getSourceIdentifier(fileName),
            embedding,
            metadata: chunk.metadata
          });

        if (insertError) {
          console.error('Failed to insert chunk:', insertError);
        } else {
          storedCount++;
        }
      } catch (error) {
        console.error('Error processing chunk:', error);
      }
    }
    
    console.log(`✅ Stored ${storedCount}/${chunks.length} chunks in design_knowledge`);
    
    return new Response(JSON.stringify({
      success: true,
      chunks: chunks.length,
      stored: storedCount,
      fileName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error parsing Schneider MV guide:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function detectTopic(content: string): string {
  const lower = content.toLowerCase();
  
  // MV Distribution topics
  if (lower.includes('switchgear') || lower.includes('switch-gear')) {
    return 'MV Switchgear Design';
  }
  if (lower.includes('protection coordination') || lower.includes('selectivity')) {
    return 'Protection Coordination & Selectivity';
  }
  if (lower.includes('arc flash') || lower.includes('arc-flash')) {
    return 'Arc Flash Analysis';
  }
  
  // Network Design topics
  if (lower.includes('load flow') || lower.includes('power flow')) {
    return 'Load Flow Analysis';
  }
  if (lower.includes('short circuit') || lower.includes('fault current')) {
    return 'Short Circuit Calculations';
  }
  if (lower.includes('earthing') || lower.includes('grounding')) {
    return 'Earthing & Grounding Systems';
  }
  
  // Equipment Selection topics
  if (lower.includes('circuit breaker') || lower.includes('cb selection')) {
    return 'Circuit Breaker Selection';
  }
  if (lower.includes('transformer') && (lower.includes('selection') || lower.includes('sizing'))) {
    return 'Transformer Selection & Sizing';
  }
  if (lower.includes('protection relay') || lower.includes('relay setting')) {
    return 'Protection Relay Settings';
  }
  if (lower.includes('cable') && (lower.includes('sizing') || lower.includes('selection'))) {
    return 'MV Cable Sizing & Selection';
  }
  
  // Standards & Calculations
  if (lower.includes('iec') || lower.includes('standard')) {
    return 'MV Standards & Compliance';
  }
  if (lower.includes('calculation') || lower.includes('formula')) {
    return 'MV Design Calculations';
  }
  if (lower.includes('harmonic') || lower.includes('power quality')) {
    return 'Power Quality & Harmonics';
  }
  
  // Installation & Maintenance
  if (lower.includes('installation') || lower.includes('commissioning')) {
    return 'MV Installation & Commissioning';
  }
  if (lower.includes('maintenance') || lower.includes('testing')) {
    return 'MV Maintenance & Testing';
  }
  
  return 'MV Network Design';
}

function getSourceIdentifier(fileName: string): string {
  if (fileName.includes('AMTED')) return 'schneider-amted-guide';
  if (fileName.includes('814582662')) return 'schneider-mv-design-guide';
  if (fileName.includes('328196305')) return 'schneider-mv-design-guide-v2';
  return 'schneider-mv-guide';
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent, fileName, equipmentType } = await req.json();
    
    console.log(`📚 Parsing ABB ${equipmentType} manual: ${fileName}`);
    
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
    
    // Parse with larger chunks (120 lines) for technical density
    const chunkSize = 120;
    let currentChunk: string[] = [];
    let chunkStart = 0;
    
    for (let i = 0; i < lines.length; i++) {
      currentChunk.push(lines[i]);
      
      if (currentChunk.length >= chunkSize || i === lines.length - 1) {
        const content = currentChunk.join('\n').trim();
        
        if (content.length > 100) {
          // Detect topic based on content and equipment type
          let topic = detectTopic(content, equipmentType);
          
          chunks.push({
            topic,
            content,
            metadata: {
              manufacturer: 'ABB',
              equipment_type: equipmentType,
              voltage_level: detectVoltageLevel(content),
              document_name: fileName,
              line_range: `${chunkStart}-${i}`
            }
          });
        }
        
        currentChunk = [];
        chunkStart = i + 1;
      }
    }
    
    console.log(`✅ Created ${chunks.length} chunks from ${equipmentType} manual`);
    
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
      equipmentType,
      fileName
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error parsing ABB equipment manual:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

function detectTopic(content: string, equipmentType: string): string {
  const lower = content.toLowerCase();
  
  // Transformer topics
  if (equipmentType === 'transformer') {
    if (lower.includes('oil') || lower.includes('liquid')) return 'Oil-Filled Transformers';
    if (lower.includes('dry') || lower.includes('resin')) return 'Dry-Type Transformers';
    if (lower.includes('cooling') || lower.includes('temperature')) return 'Transformer Cooling Systems';
    if (lower.includes('protection') || lower.includes('buchholz')) return 'Transformer Protection';
    if (lower.includes('maintenance') || lower.includes('testing')) return 'Transformer Maintenance';
    if (lower.includes('insulation') || lower.includes('dielectric')) return 'Insulation Systems';
    return 'Transformer Design & Operation';
  }
  
  // Circuit Breaker topics
  if (equipmentType === 'circuit-breaker' || equipmentType === 'gcb') {
    if (lower.includes('sf6') || lower.includes('gas')) return 'SF6 Circuit Breaker Technology';
    if (lower.includes('breaking') || lower.includes('interruption')) return 'Breaking Capacity & Arc Quenching';
    if (lower.includes('contact') || lower.includes('mechanism')) return 'Operating Mechanism';
    if (lower.includes('maintenance') || lower.includes('service')) return 'Circuit Breaker Maintenance';
    if (lower.includes('generator') || lower.includes('gcb')) return 'Generator Circuit Breaker (GCB)';
    if (lower.includes('short circuit') || lower.includes('fault')) return 'Short Circuit Breaking';
    return 'Circuit Breaker Operation';
  }
  
  // Motor topics
  if (equipmentType === 'motor') {
    if (lower.includes('design') || lower.includes('construction')) return 'Motor Design & Construction';
    if (lower.includes('insulation') || lower.includes('winding')) return 'Motor Insulation Systems';
    if (lower.includes('cooling') || lower.includes('ventilation')) return 'Motor Cooling Systems';
    if (lower.includes('protection') || lower.includes('relay')) return 'Motor Protection';
    if (lower.includes('bearing') || lower.includes('lubrication')) return 'Bearings & Lubrication';
    if (lower.includes('maintenance') || lower.includes('service')) return 'Motor Maintenance';
    return 'High Voltage Motor Operation';
  }
  
  return `${equipmentType} Technical Specification`;
}

function detectVoltageLevel(content: string): string {
  const lower = content.toLowerCase();
  
  if (lower.match(/\b[1-9]\d{2,3}\s*kv\b/) || lower.includes('high voltage') || lower.includes('hv ')) {
    return 'HV (>36kV)';
  }
  if (lower.match(/\b[1-3]?[0-9]\s*kv\b/) || lower.includes('medium voltage') || lower.includes('mv ')) {
    return 'MV (1-36kV)';
  }
  if (lower.includes('low voltage') || lower.includes('lv ') || lower.match(/\b[0-9]{2,3}\s*v\b/)) {
    return 'LV (<1kV)';
  }
  
  return 'Various';
}

function getSourceIdentifier(fileName: string): string {
  if (fileName.includes('Transformer')) return 'abb-transformer-handbook';
  if (fileName.includes('GCB')) return 'abb-gcb-training';
  if (fileName.includes('MOTOR')) return 'abb-motor-manual';
  if (fileName.includes('Circuit') || fileName.includes('Erection')) return 'abb-circuit-breaker-manual';
  return 'abb-equipment-manual';
}

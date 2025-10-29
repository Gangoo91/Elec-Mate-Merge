/**
 * Offline Regulation Enrichment Pipeline
 * 
 * Extracts structured hazards from raw BS 7671 regulations using GPT-4o
 * Run once, then update quarterly when regulations change
 * 
 * This transforms 50,000 raw regulation documents into 
 * pre-structured, actionable hazard intelligence
 * 
 * Cost: ~$120 one-time, ~$30/quarter for updates
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get batch size from request or default to 10
    const { batchSize = 10, startFrom = 0 } = await req.json().catch(() => ({}));
    
    console.log(`🚀 Starting enrichment: batch=${batchSize}, startFrom=${startFrom}`);
    
    // Get regulations not yet enriched
    const { data: enrichedIds } = await supabase
      .from('regulation_hazards_extracted')
      .select('regulation_id');
    
    const enrichedSet = new Set((enrichedIds || []).map((r: any) => r.regulation_id));
    
    const { data: regulations, error: fetchError } = await supabase
      .from('bs7671_embeddings')
      .select('*')
      .order('created_at', { ascending: true })
      .range(startFrom, startFrom + batchSize - 1);
    
    if (fetchError) {
      throw fetchError;
    }
    
    if (!regulations || regulations.length === 0) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No regulations to process',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Filter out already enriched
    const toProcess = regulations.filter(r => !enrichedSet.has(r.id));
    
    console.log(`📊 Found ${toProcess.length} regulations to process`);
    
    let processed = 0;
    let errors = 0;
    
    for (const reg of toProcess) {
      console.log(`\n📖 Processing: ${reg.regulation_number} - ${reg.section.substring(0, 60)}...`);
      
      try {
        // Extract hazards using GPT-4o
        const extraction = await extractHazardsWithGPT4o(reg, OPENAI_API_KEY);
        
        if (!extraction || !extraction.hazards || extraction.hazards.length === 0) {
          console.log(`⚠️ No hazards extracted from ${reg.regulation_number}`);
          continue;
        }
        
        console.log(`✅ Extracted ${extraction.hazards.length} hazards`);
        
        // Insert each hazard
        for (const hazard of extraction.hazards) {
          // Generate embedding for hazard description
          const embedding = await generateEmbedding(hazard.description, OPENAI_API_KEY);
          
          const { error: insertError } = await supabase
            .from('regulation_hazards_extracted')
            .insert({
              regulation_id: reg.id,
              hazard_description: hazard.description,
              hazard_category: hazard.category,
              likelihood: hazard.likelihood,
              severity: hazard.severity,
              control_measures: hazard.controls || [],
              control_hierarchy: hazard.controlHierarchy || 'engineering',
              required_ppe: hazard.ppe || [],
              applies_to_work_types: hazard.workTypes || ['domestic', 'commercial'],
              applies_to_locations: hazard.locations || ['general'],
              applies_to_equipment: hazard.equipment || [],
              applies_to_installation_phases: hazard.phases || ['installation'],
              regulation_number: reg.regulation_number,
              regulation_section: reg.section,
              regulation_excerpt: extractExcerpt(reg.content, hazard.description),
              hazard_embedding: embedding,
              confidence_score: 0.95
            });
          
          if (insertError) {
            console.error(`❌ Insert error for hazard:`, insertError);
            errors++;
          }
        }
        
        processed++;
        
        // Rate limiting: wait 1 second between regulations
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error processing ${reg.regulation_number}:`, error);
        errors++;
      }
    }
    
    console.log(`\n✅ Enrichment complete: ${processed} regulations processed, ${errors} errors`);
    
    return new Response(JSON.stringify({
      success: true,
      processed,
      errors,
      total: toProcess.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Enrichment pipeline error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

/**
 * Extract hazards from regulation using GPT-4o
 */
async function extractHazardsWithGPT4o(regulation: any, apiKey: string) {
  const prompt = `Analyze this electrical regulation and extract ALL potential hazards:

${regulation.regulation_number}: ${regulation.section}
${regulation.content}

For EACH hazard, provide:
1. Hazard description (specific, actionable, 10-20 words)
2. Category (electrical, physical, chemical, environmental, human_factors)
3. Likelihood (1-5 scale)
4. Severity (1-5 scale)
5. Control measures (array of specific actions, BS 7671 compliant)
6. Control hierarchy (engineering, administrative, ppe)
7. Required PPE with standards (array of objects: {type, standard, mandatory, purpose})
8. Work types this applies to (domestic, commercial, industrial)
9. Locations this applies to (bathroom, kitchen, outdoor, garage, general)
10. Equipment this applies to (consumer_unit, shower, ev_charger, socket, lighting, cooker, heating)
11. Installation phases this applies to (site_survey, isolation, installation, testing, commissioning)

Return as JSON: { hazards: [{ description, category, likelihood, severity, controls, controlHierarchy, ppe, workTypes, locations, equipment, phases }] }

Be exhaustive. Extract 3-8 hazards per regulation. Focus on electrical safety hazards.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // Low temperature for consistency
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GPT-4o API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch {
    console.error('Failed to parse GPT-4o response:', content);
    return { hazards: [] };
  }
}

/**
 * Generate embedding for text
 */
async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: text
    })
  });
  
  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Extract relevant excerpt from regulation content
 */
function extractExcerpt(content: string, hazardDesc: string): string {
  // Simple excerpt: first 500 characters
  return content.substring(0, 500);
}

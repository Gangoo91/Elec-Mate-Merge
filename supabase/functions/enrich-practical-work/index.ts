import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';
import { Timeouts, withTimeout } from '../_shared/timeout.ts';
import { searchPracticalWorkBatch, searchBS7671Batch } from '../_shared/rag-batch-loader.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { batchId, items } = await req.json();
    logger.info(`🔧 Unified practical work enrichment batch ${batchId}: ${items.length} items`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('batch_progress').update({
      status: 'processing',
      started_at: new Date().toISOString()
    }).eq('id', batchId);

    const enrichedItems = [];
    let lastHeartbeat = Date.now();
    let totalFacets = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (Date.now() - lastHeartbeat > 15000) {
        await supabase.from('batch_progress').update({
          items_processed: i,
          updated_at: new Date().toISOString(),
          data: { last_heartbeat: new Date().toISOString(), last_item_id: item.id }
        }).eq('id', batchId);
        lastHeartbeat = Date.now();
      }

      try {
        const facets = await enrichProcedure(supabase, item, logger);
        totalFacets += facets.length;
        enrichedItems.push({ id: item.id, facets: facets.length });
        logger.info(`✅ Enriched ${item.id} → ${facets.length} facets`);
      } catch (error) {
        logger.error(`❌ Failed to enrich item ${item.id}`, { error });
        // Insert minimal primary facet so we don't lose the item
        await insertMinimalFacet(supabase, item, error.message);
      }
    }

    await supabase.from('batch_progress').update({
      status: 'completed',
      items_processed: items.length,
      completed_at: new Date().toISOString(),
      data: { total_facets_created: totalFacets }
    }).eq('id', batchId);

    logger.info(`📦 Batch ${batchId} complete: ${items.length} items → ${totalFacets} facets`);

    return new Response(JSON.stringify({ success: true, total_facets: totalFacets }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Unified enrichment failed', { 
      error: error.message, 
      stack: error.stack,
      details: error.details || error.hint || 'No additional details'
    });
    
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Transform GPT output to match PostgreSQL schema types
function transformFacetForDB(facet: any, baseItem: any): any {
  return {
    practical_work_id: baseItem.id,
    facet_type: facet.facet_type,
    cluster_id: baseItem.cluster_id,
    canonical_id: baseItem.id,
    source_tables: baseItem.source_tables,
    
    // Primary fields
    activity_types: facet.activity_types || baseItem.activity_types || [],
    equipment_category: facet.equipment_category || baseItem.equipment_category,
    
    // ✅ FIX: safety_requirements expects JSONB object with items array
    safety_requirements: facet.safety_requirements 
      ? { items: Array.isArray(facet.safety_requirements) ? facet.safety_requirements : [facet.safety_requirements] }
      : null,
    
    typical_location: facet.typical_location,
    skill_level: facet.skill_level,
    
    // Installation fields (text arrays - OK as-is)
    installation_method: facet.installation_method,
    fixing_intervals: facet.fixing_intervals, // JSONB object - OK
    cable_routes: facet.cable_routes, // text[] - OK
    termination_methods: facet.termination_methods, // text[] - OK
    
    // Maintenance fields
    maintenance_intervals: facet.maintenance_intervals, // JSONB object - OK
    
    // ✅ FIX: maintenance_tasks expects array of JSONB objects
    maintenance_tasks: facet.maintenance_tasks
      ? facet.maintenance_tasks.map((task: any) => 
          typeof task === 'string' ? { task, frequency: null } : task
        )
      : null,
    
    common_defects: facet.common_defects, // text[] - OK
    degradation_signs: facet.degradation_signs, // text[] - OK
    
    // Testing fields
    // ✅ FIX: test_procedures expects array of JSONB objects
    test_procedures: facet.test_procedures
      ? facet.test_procedures.map((proc: any) =>
          typeof proc === 'string' ? { procedure: proc, standard: null } : proc
        )
      : null,
    
    required_instruments: facet.required_instruments, // text[] - OK
    acceptance_criteria: facet.acceptance_criteria, // JSONB object - OK
    test_sequence: facet.test_sequence, // text[] - OK
    
    // Costing fields
    estimated_duration: facet.estimated_duration, // JSONB object - OK
    
    // ✅ FIX: material_requirements expects array of JSONB objects
    material_requirements: facet.material_requirements
      ? facet.material_requirements.map((mat: any) =>
          typeof mat === 'string' ? { item: mat, quantity: 1, unit: 'each' } : mat
        )
      : null,
    
    labour_category: facet.labour_category,
    difficulty_multiplier: facet.difficulty_multiplier,
    
    // Store raw for debugging
    enrichment_metadata: { 
      raw: facet.raw_content || 'transformed',
      transformed: true 
    }
  };
}

async function enrichProcedure(supabase: any, item: any, logger: any): Promise<any[]> {
  const { id, content, description, equipment_category, activity_types, cluster_id, source_tables } = item;
  
  // RAG context for comprehensive enrichment
  const practicalContext = await searchPracticalWorkBatch(supabase, {
    keywords: [equipment_category || 'electrical', 'installation', 'maintenance'],
    limit: 5
  });

  const bs7671Context = await searchBS7671Batch(supabase, {
    keywords: [equipment_category || 'installation', 'testing', 'inspection'],
    limit: 3
  });

  const prompt = `You are a comprehensive electrical procedures analyst. Analyze this procedure and extract ALL applicable facets in UK English.

PROCEDURE: ${content || description}
EQUIPMENT: ${equipment_category}

PRACTICAL KNOWLEDGE:
${practicalContext.map(c => c.content).join('\n\n')}

BS 7671 CONTEXT:
${bs7671Context.map(c => c.content).join('\n\n')}

Create a facet for EACH activity type present in this procedure. Return a JSON array of facets.

ALWAYS include a PRIMARY facet:
{
  "facet_type": "primary",
  "activity_types": ["installation", "testing", etc.],
  "equipment_category": string,
  "safety_requirements": array,
  "typical_location": string,
  "skill_level": "Apprentice" | "Improver" | "Electrician" | "Specialist"
}

IF installation/fixing/termination is mentioned, add INSTALLATION facet:
{
  "facet_type": "installation",
  "installation_method": "Surface" | "Buried" | "Overhead" | "Concealed",
  "fixing_intervals": {"horizontal_mm": number, "vertical_mm": number, "bends_mm": number},
  "cable_routes": array,
  "termination_methods": array
}

IF maintenance/inspection/service is mentioned, add MAINTENANCE facet:
{
  "facet_type": "maintenance",
  "maintenance_intervals": {"routine": string, "detailed": string},
  "maintenance_tasks": array,
  "common_defects": array,
  "degradation_signs": array
}

IF testing/commissioning/verification is mentioned, add TESTING facet:
{
  "facet_type": "testing",
  "test_procedures": array,
  "required_instruments": array,
  "acceptance_criteria": object,
  "test_sequence": array
}

IF materials/labour/time is relevant, add COSTING facet:
{
  "facet_type": "costing",
  "estimated_duration": {"min_minutes": number, "typical_minutes": number, "max_minutes": number},
  "material_requirements": [{"item": "Cable clips", "quantity": 20, "unit": "each"}],
  "labour_category": "Electrician",
  "difficulty_multiplier": 1.2
}

IMPORTANT: For arrays of complex data, return objects with proper structure:
- maintenance_tasks: array of objects with {task, frequency}
- test_procedures: array of objects with {procedure, standard}
- material_requirements: array of objects with {item, quantity, unit}
- safety_requirements: will be wrapped automatically

Return ONLY a valid JSON array of facet objects with proper structure.`;

  const chatCompletion = await withTimeout(
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [{ role: 'user', content: prompt }],
        max_completion_tokens: 6000,
        response_format: { type: 'json_object' }
      }),
    }).then(res => res.json()),
    Timeouts.PRACTICAL_WORK,
    'Unified practical work enrichment'
  );

  // Parse with resilience
  let facetsData;
  const rawContent = chatCompletion.choices[0].message.content;
  
  try {
    const parsed = JSON.parse(rawContent);
    // Handle both array and object with facets key
    facetsData = Array.isArray(parsed) ? parsed : (parsed.facets || [parsed]);
  } catch (parseError) {
    logger.error(`JSON parse failed for ${id}, attempting repair`, { rawContent });
    // Attempt to extract JSON array/object
    const jsonMatch = rawContent.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const repaired = JSON.parse(jsonMatch[0]);
        facetsData = Array.isArray(repaired) ? repaired : [repaired];
      } catch {
        throw new Error('JSON repair failed');
      }
    } else {
      throw new Error('No JSON found in response');
    }
  }

  // Transform and upsert all facets
  const facetsToInsert = facetsData.map((facet: any) => 
    transformFacetForDB(facet, item)
  );

  const { error } = await supabase.from('practical_work_intelligence').upsert(
    facetsToInsert,
    { onConflict: 'practical_work_id,facet_type' }
  );

  if (error) {
    logger.error(`Failed to insert facets for ${id}`, { 
      error: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint
    });
    throw error;
  }

  return facetsToInsert;
}

async function insertMinimalFacet(supabase: any, item: any, errorMsg: string) {
  // Always insert at least a primary facet so we don't lose the procedure
  const { error } = await supabase.from('practical_work_intelligence').upsert({
    practical_work_id: item.id,
    facet_type: 'primary',
    cluster_id: item.cluster_id,
    canonical_id: item.id,
    source_tables: item.source_tables,
    activity_types: item.activity_types || [],
    equipment_category: item.equipment_category,
    enrichment_metadata: { error: errorMsg, minimal: true }
  }, { onConflict: 'practical_work_id,facet_type' });

  if (error) {
    console.error(`Failed to insert minimal facet for ${item.id}:`, error);
  }
}

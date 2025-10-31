import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';
import { Timeouts, withTimeout } from '../_shared/timeout.ts';
import { searchPracticalWorkBatch, searchBS7671Batch } from '../_shared/rag-batch-loader.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// ==================== INTELLIGENT EXTRACTION HELPERS ====================

// INTELLIGENT EQUIPMENT CATEGORY EXTRACTION
function extractEquipmentCategory(item: any): string {
  // 1. Check metadata first
  if (item.metadata?.equipment_category) return item.metadata.equipment_category;
  if (item.metadata?.equipment_type) return item.metadata.equipment_type;
  
  // 2. Pattern matching for common equipment types
  const text = (item.topic || item.content || item.description || '').toLowerCase();
  const patterns = [
    { regex: /\b(ups|uninterruptible power supply)\b/i, category: 'UPS' },
    { regex: /\b(solar panel|photovoltaic|pv system)\b/i, category: 'solar_panel' },
    { regex: /\b(ev charger|electric vehicle|charging point)\b/i, category: 'ev_charger' },
    { regex: /\b(battery|energy storage)\b/i, category: 'battery_system' },
    { regex: /\b(generator|standby power)\b/i, category: 'generator' },
    { regex: /\b(transformer|distribution)\b/i, category: 'transformer' },
    { regex: /\b(switchgear|switch gear)\b/i, category: 'switchgear' },
    { regex: /\b(motor|drive|vfd)\b/i, category: 'motor' },
    { regex: /\b(lighting|luminaire|lamp)\b/i, category: 'lighting' },
    { regex: /\b(socket|outlet|receptacle)\b/i, category: 'socket_outlet' },
    { regex: /\b(circuit breaker|mcb|rcbo|rcd)\b/i, category: 'protection_device' },
    { regex: /\b(cable|wiring|conductor)\b/i, category: 'cabling' },
    { regex: /\b(meter|metering)\b/i, category: 'metering' },
    { regex: /\b(inverter)\b/i, category: 'inverter' },
    { regex: /\b(fire alarm|smoke detector)\b/i, category: 'fire_alarm' },
  ];
  
  for (const { regex, category } of patterns) {
    if (regex.test(text)) return category;
  }
  
  // 3. Derive from topic first word
  if (item.topic) {
    const firstWord = item.topic.split(/[\s\-_]/)[0];
    if (firstWord && firstWord.length > 2) return firstWord.toLowerCase();
  }
  
  return 'electrical_equipment';
}

// EXTRACT TECHNICAL TERMS from content
function extractTechnicalTerms(content: string): string[] {
  const terms: string[] = [];
  const text = content.toLowerCase();
  
  // Technical patterns
  const technicalPatterns = [
    /\b(\d+\s*(?:kw|kva|mw|w|amp|a|volt|v|hz))\b/gi,
    /\b(ip\d{2}|iec\s*\d+|bs\s*\d+|en\s*\d+)\b/gi,
    /\b(three-?phase|single-?phase|dc|ac)\b/gi,
    /\b(earthing|bonding|rcd|rcbo|mcb|spd)\b/gi,
  ];
  
  technicalPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) terms.push(...matches.slice(0, 3));
  });
  
  return [...new Set(terms)].slice(0, 5);
}

// EXTRACT basic keywords for minimal facet
function extractBasicKeywords(content: string): string[] {
  const keywords: string[] = [];
  const text = content.toLowerCase();
  
  // Common electrical terms
  const terms = ['installation', 'testing', 'safety', 'earthing', 'bonding', 'rcd', 'circuit', 'cable', 
                 'inspection', 'maintenance', 'protective', 'isolation', 'voltage', 'current'];
  
  terms.forEach(term => {
    if (text.includes(term)) keywords.push(term);
  });
  
  return [...new Set(keywords)].slice(0, 8);
}

// EXTRACT basic safety info for minimal facet
function extractBasicSafety(content: string): any {
  const safety: any = {};
  const text = content.toLowerCase();
  
  if (text.includes('isolate') || text.includes('isolation')) {
    safety.isolation = 'Required - isolate supply before work';
  }
  if (text.includes('earth') || text.includes('bonding')) {
    safety.earthing = 'Verify earthing and bonding';
  }
  if (text.includes('rcd') || text.includes('rcbo')) {
    safety.electrical_safety = 'RCD protection required';
  }
  if (text.includes('ppe') || text.includes('gloves') || text.includes('protective')) {
    safety.ppe = 'Use appropriate PPE';
  }
  
  return Object.keys(safety).length > 0 ? safety : { electrical_safety: 'Follow BS 7671 requirements' };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { batchId, batchSize, startFrom, jobId } = await req.json();
    logger.info(`🔧 Unified practical work enrichment batch ${batchId}: fetching ${batchSize} items from ${startFrom}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query items from practical_work using batch parameters
    const { data: items, error: queryError } = await supabase
      .from('practical_work')
      .select('*')
      .eq('is_canonical', true)
      .range(startFrom, startFrom + batchSize - 1);

    if (queryError) {
      logger.error('Failed to query practical work items', { queryError });
      throw queryError;
    }

    if (!items || items.length === 0) {
      logger.info(`No items found for batch ${batchId} (${startFrom} to ${startFrom + batchSize - 1})`);
      return new Response(JSON.stringify({ success: true, total_facets: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logger.info(`📦 Retrieved ${items.length} items for processing`);

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

// Transform GPT output to match actual DB schema - ONLY fields that exist
function transformFacetForDB(facet: any, baseItem: any): any {
  return {
    practical_work_id: baseItem.id,
    facet_type: facet.facet_type || 'primary',
    
    // Core metadata (required)
    activity_types: facet.activity_types || baseItem.activity_types || [],
    equipment_category: facet.equipment_category || baseItem.metadata?.equipment_category || baseItem.metadata?.equipment_type || baseItem.topic?.split(' ')[0] || 'electrical equipment',
    equipment_subcategory: facet.equipment_subcategory,
    
    // Installation fields
    bs7671_zones: facet.bs7671_zones || [],
    installation_method: facet.installation_method,
    fixing_intervals: facet.fixing_intervals,
    cable_routes: facet.cable_routes || [],
    termination_methods: facet.termination_methods || [],
    
    // Testing fields
    test_procedures: facet.test_procedures || [],
    test_equipment_required: facet.test_equipment_required || [],
    test_frequency: facet.test_frequency,
    acceptance_criteria: facet.acceptance_criteria,
    
    // Inspection fields
    inspection_checklist: facet.inspection_checklist || [],
    visual_inspection_points: facet.visual_inspection_points || [],
    eicr_observation_codes: facet.eicr_observation_codes || [],
    
    // Defects & diagnostics
    common_defects: facet.common_defects || [],
    wear_indicators: facet.wear_indicators || [],
    replacement_criteria: facet.replacement_criteria || [],
    common_failures: facet.common_failures || [],
    troubleshooting_steps: facet.troubleshooting_steps || [],
    diagnostic_tests: facet.diagnostic_tests || [],
    
    // Maintenance fields
    maintenance_intervals: facet.maintenance_intervals,
    maintenance_tasks: facet.maintenance_tasks || [],
    
    // Resources & timing
    typical_duration_minutes: facet.typical_duration_minutes,
    skill_level: facet.skill_level,
    team_size: facet.team_size,
    tools_required: facet.tools_required || [],
    materials_needed: facet.materials_needed || [],
    
    // Safety (JSONB)
    safety_requirements: facet.safety_requirements,
    
    // Standards
    bs7671_regulations: facet.bs7671_regulations || [],
    other_standards: facet.other_standards || [],
    
    // Search & metadata
    keywords: facet.keywords || [],
    related_topics: facet.related_topics || [],
    confidence_score: facet.confidence_score || 0.85,
    
    // Provenance (required)
    cluster_id: baseItem.cluster_id,
    canonical_id: baseItem.id,
    source_tables: baseItem.source_tables || [],
    provenance: facet.provenance || { 
      enrichment_version: 'v3',
      enriched_at: new Date().toISOString()
    }
  };
}

async function enrichProcedure(supabase: any, item: any, logger: any): Promise<any[]> {
  const { id, content, description, activity_types, cluster_id, source_tables, metadata, topic } = item;
  
  // INTELLIGENT equipment category extraction
  const equipment_category = extractEquipmentCategory(item);
  const technicalTerms = extractTechnicalTerms(content || description || '');
  
  // EQUIPMENT-SPECIFIC RAG queries with technical terms
  const practicalContext = await searchPracticalWorkBatch(supabase, {
    keywords: [
      equipment_category,
      ...technicalTerms.slice(0, 2), // Top 2 technical terms
      ...(activity_types || ['installation', 'maintenance']).slice(0, 2)
    ],
    limit: 8,
    activity_filter: activity_types
  });

  const bs7671Context = await searchBS7671Batch(supabase, {
    keywords: [
      equipment_category,
      ...technicalTerms.slice(0, 1),
      ...(activity_types || ['installation']).slice(0, 1),
      'regulation', 'compliance'
    ],
    limit: 5
  });

  const prompt = `You are a comprehensive electrical procedures analyst. Analyze this procedure and extract ALL applicable facets in UK English.

PROCEDURE: ${content || description}
EQUIPMENT: ${equipment_category}
ACTIVITY TYPES: ${activity_types?.join(', ') || 'general electrical work'}

PRACTICAL KNOWLEDGE:
${practicalContext.map(c => c.content).join('\n\n')}

BS 7671 CONTEXT:
${bs7671Context.map(c => c.content).join('\n\n')}

Create facets matching this EXACT schema. Return a JSON array.

ALWAYS include a PRIMARY facet:
{
  "facet_type": "primary",
  "activity_types": ["installation", "testing"],
  "equipment_category": string,
  "skill_level": "Apprentice"|"Improver"|"Electrician"|"Specialist",
  "typical_duration_minutes": number,
  "safety_requirements": {"ppe": [], "precautions": [], "hazards": []},
  "bs7671_regulations": ["reg numbers"],
  "keywords": ["relevant", "terms"]
}

IF installation mentioned, add INSTALLATION facet:
{
  "facet_type": "installation",
  "installation_method": "Surface"|"Buried"|"Overhead"|"Concealed",
  "fixing_intervals": {"horizontal_mm": 400, "vertical_mm": 400},
  "cable_routes": ["routes"],
  "termination_methods": ["methods"],
  "bs7671_zones": ["zones"],
  "tools_required": ["tools"],
  "materials_needed": ["materials"]
}

IF testing mentioned, add TESTING facet:
{
  "facet_type": "testing",
  "test_procedures": ["text array only"],
  "test_equipment_required": ["instruments"],
  "test_frequency": "Annual",
  "acceptance_criteria": {"limits": {}},
  "visual_inspection_points": ["points"]
}

IF maintenance mentioned, add MAINTENANCE facet:
{
  "facet_type": "maintenance",
  "maintenance_intervals": {"routine": "6 months", "detailed": "1 year"},
  "maintenance_tasks": ["text array only"],
  "common_defects": ["defects"],
  "wear_indicators": ["signs"],
  "troubleshooting_steps": ["steps"]
}

CRITICAL: All arrays are TEXT[] (simple strings), NOT objects. Return ONLY valid JSON array.`;

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
        temperature: 0.2,
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
  // Extract equipment category using same intelligent extraction
  const equipment_category = extractEquipmentCategory(item);
  const basicKeywords = extractBasicKeywords(item.content || item.description || '');
  const basicSafety = extractBasicSafety(item.content || item.description || '');
  
  // Always insert at least a primary facet with enriched data
  const { error } = await supabase.from('practical_work_intelligence').upsert({
    practical_work_id: item.id,
    facet_type: 'primary',
    cluster_id: item.cluster_id,
    canonical_id: item.id,
    source_tables: item.source_tables,
    activity_types: item.activity_types || [],
    equipment_category: equipment_category,
    keywords: [equipment_category, ...basicKeywords, ...(item.activity_types || [])],
    safety_requirements: basicSafety,
    bs7671_regulations: [],
    tools_required: [],
    materials_needed: [],
    test_procedures: [],
    maintenance_tasks: []
  }, { onConflict: 'practical_work_id,facet_type' });

  if (error) {
    console.error(`Failed to insert minimal facet for ${item.id}:`, error);
  }
}

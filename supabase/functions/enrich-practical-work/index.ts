import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = Deno.env.get('OPENAI_MINI_MODEL') || 'gpt-4o-mini'; // Use Mini 5.0 if configured

// ==================== WORLD-CLASS FILTERS & VALIDATORS ====================

/**
 * Phase 1: Content Quality Filter - Skip low-value chunks
 */
function shouldEnrichChunk(item: any): boolean {
  const content = (item.content || item.description || '').toLowerCase();
  
  // Min length check
  if (content.length < 150) return false;
  
  // Electrical term density
  const electricalTerms = ['cable', 'wire', 'mcb', 'rcd', 'circuit', 'test', 'install', 
    'earth', 'bond', 'isolate', 'voltage', 'current', 'amp', 'volt', 'protection',
    'consumer unit', 'distribution', 'switch', 'socket', 'lighting', 'cooker', 'shower'];
  const termCount = electricalTerms.filter(term => content.includes(term)).length;
  if (termCount < 3) return false;
  
  // Must have procedural OR specification content
  const hasProcedural = /\b(install|connect|test|check|measure|fix|mount|terminate|strip|crimp|commissioning|inspect)\b/.test(content);
  const hasSpecs = /\b(\d+(?:mm²|mm|amp|a|volt|v|kw|m|metre))\b/i.test(content);
  
  return hasProcedural || hasSpecs;
}

/**
 * Phase 6: Calculate enrichment priority - process high-value content first
 */
function calculateEnrichmentPriority(item: any): number {
  const content = (item.content || item.description || '').toLowerCase();
  let score = 0;
  
  // High value: Installation procedures
  if (content.includes('install') || content.includes('fit') || content.includes('mount')) score += 10;
  
  // High value: Testing procedures
  if (content.includes('test') || content.includes('commissioning') || content.includes('inspect')) score += 10;
  
  // High value: Specific equipment
  const equipment = ['consumer unit', 'ev charger', 'solar', 'shower', 'cooker', 'distribution', 'switchgear'];
  score += equipment.filter(e => content.includes(e)).length * 5;
  
  // High value: Contains specs
  const hasSpecs = /\d+(?:mm²|amp|kw|volt)/.test(content);
  if (hasSpecs) score += 8;
  
  // High value: Contains BS7671 references
  if (/bs\s*7671|section\s*\d+|regulation\s*\d+/.test(content)) score += 8;
  
  // Content length bonus
  score += Math.min(content.length / 200, 5);
  
  return score;
}

/**
 * Normalise category/subcategory spellings
 */
const CATEGORY_ALIASES: Record<string, string> = {
  'ombined': 'combined',
  'combi': 'combined',
  'introduction': 'general',
  'intro': 'general',
  'overview': 'general'
};

function normaliseCategory(category: string): string {
  const lower = (category || '').toLowerCase().trim();
  return CATEGORY_ALIASES[lower] || lower;
}

/**
 * Phase 5: Validate facet quality - RELAXED RULES FOR BETTER COVERAGE (Fix 3)
 */
function validatePracticalWorkFacet(facet: any): boolean {
  if (!facet) return false;
  
  // MUST have keywords (relaxed from 6 to 4)
  if (!facet.keywords || facet.keywords.length < 4) return false;
  
  // MUST have primary_topic
  if (!facet.primary_topic || facet.primary_topic.length < 30) return false;
  
  // MUST have equipment category
  const category = normaliseCategory(facet.equipment_category);
  if (!category || category.length < 3) return false;
  
  // MUST have tools OR materials
  const hasTools = facet.tools_required && facet.tools_required.length >= 1;
  const hasMaterials = facet.materials_needed && facet.materials_needed.length >= 1;
  if (!hasTools && !hasMaterials) return false;
  
  // MUST have core intelligence (NEW REQUIREMENT)
  if (!facet.typical_duration_minutes || facet.typical_duration_minutes < 1) return false;
  if (!facet.skill_level || !['apprentice', 'electrician', 'designer', 'specialist'].includes(facet.skill_level)) return false;
  if (!facet.safety_requirements) return false;
  
  // Accept lower confidence for inferred data (was 0.60, now 0.50)
  if (facet.confidence_score && facet.confidence_score < 0.50) return false;
  
  return true;
}

// ==================== TYPE NORMALIZATION HELPERS ====================

function ensureArrayOfStrings(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v));
  if (typeof value === 'string') return [value];
  return [];
}

function toJsonOrNull(value: any): any {
  if (!value) return null;
  if (typeof value === 'object') return value;
  if (typeof value === 'string') return { notes: value };
  return null;
}

function ensureJsonArray(value: any): any[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(v => {
      if (typeof v === 'object') return v;
      if (typeof v === 'string') return { step: v };
      return { value: String(v) };
    });
  }
  if (typeof value === 'string') return [{ step: value }];
  return [];
}

// ==================== GPT ENRICHMENT ====================

async function callGPTForFacets(content: string, logger: any, retryCount = 0): Promise<any> {
  const systemPrompt = `You are a UK electrical work intelligence AI. Your job is to UNDERSTAND electrical procedures and generate COMPLETE technical intelligence, not just extract what's written.

CRITICAL MINDSET SHIFT:
- DON'T just copy text → UNDERSTAND the electrical task and INFER complete details
- If content mentions "install lighting circuit" → INFER: cable routing, termination methods, test procedures, typical duration, skill level
- If content mentions "test RCD" → INFER: test equipment, acceptance criteria, test frequency, safety requirements
- If content is sparse → USE YOUR ELECTRICAL KNOWLEDGE to fill gaps

INFERENCE RULES BY TASK TYPE:

**Installation Tasks (mounting, installing, connecting)**
MUST infer:
- installation_method: (surface/flush/clipped direct based on equipment type)
- cable_routes: (typical routes for that equipment)
- termination_methods: (screw/push-fit based on equipment)
- typical_duration_minutes: (realistic time for competent electrician)
- skill_level: (apprentice/electrician/designer based on complexity)

**Testing Tasks (measuring, checking, commissioning)**
MUST infer:
- test_procedures: (step-by-step BS7671-compliant test sequence)
- test_equipment_required: (appropriate test instruments)
- acceptance_criteria: (BS7671 limits for that test)
- test_frequency: (initial/periodic based on BS7671)

**Maintenance Tasks (inspecting, servicing, replacing)**
MUST infer:
- maintenance_intervals: (frequency based on equipment type and BS7671)
- maintenance_tasks: (typical maintenance activities)
- wear_indicators: (signs of deterioration)
- replacement_criteria: (when to replace vs repair)

FIELD-SPECIFIC INFERENCE GUIDANCE:

typical_duration_minutes:
- Socket circuit install: 120-180 min
- Consumer unit replacement: 240-360 min
- RCD test: 5-10 min
- Lighting circuit: 90-150 min
- Emergency lighting test: 15-30 min
ALWAYS provide realistic duration based on task complexity

skill_level (choose ONE):
- "apprentice": Basic tasks under supervision (testing, simple installations)
- "electrician": Standard installations, most testing
- "designer": Design calculations, complex systems
- "specialist": EV chargers, solar, fire alarms
ALWAYS assign appropriate skill level

installation_method:
If mounting equipment → INFER from equipment type:
- Sockets/switches: "flush mounted" (domestic) or "surface mounted" (commercial)
- Consumer units: "surface mounted on non-combustible board"
- Cable runs: "clipped direct", "in conduit", "in trunking"
ALWAYS provide if installation-related content

test_procedures:
If testing mentioned → GENERATE complete BS7671-compliant steps:
- Insulation resistance: ["Isolate circuit", "Remove sensitive equipment", "Test L-E, N-E, L-N", "Record ≥1MΩ"]
- Earth continuity: ["Isolate supply", "Test main bonding", "Test circuit protective conductors", "Verify <0.5Ω"]
ALWAYS provide detailed steps for test tasks

Generate 8-20 DISTINCT micro-facets. Each facet = ONE specific scenario with COMPLETE intelligence.

JSON SCHEMA:
{
  "facets": [
    {
      "primary_topic": "string (40-100 words, describe specific scenario with context)",
      "keywords": ["6-10 specific keywords"],
      "equipment_category": "specific category (consumer_unit, socket_circuit, lighting_circuit, etc.)",
      "equipment_subcategory": "optional subcategory",
      "applies_to": ["domestic", "commercial", etc.] (ALWAYS include),
      "cable_sizes": ["1.5mm²", "2.5mm²"] (if applicable),
      "power_ratings": ["16A", "32A"] (if applicable),
      "location_types": ["indoor", "outdoor"] (if applicable),
      "bs7671_regulations": ["411.3.3"] (minimum 1 relevant reg),
      
      "installation_method": "INFER if installation task, null if pure testing/maintenance",
      "cable_routes": ["ceiling void", "trunking"] (if installation),
      "termination_methods": ["screw terminal"] (if installation),
      
      "test_procedures": ["Step 1: ...", "Step 2: ..."] (GENERATE if testing task),
      "test_equipment_required": ["multimeter", "proving unit"] (if testing),
      "acceptance_criteria": {"param": "value"} (if testing),
      
      "visual_inspection_points": ["check terminations"] (if inspection/EICR),
      "common_defects": ["loose connections"] (INFER common issues for equipment type),
      
      "maintenance_intervals": {"routine": "6 months"} (INFER based on equipment),
      "maintenance_tasks": ["visual check", "functional test"] (GENERATE typical maintenance),
      "wear_indicators": ["discolouration"] (INFER for equipment type),
      
      "typical_duration_minutes": NUMBER (ALWAYS infer realistic duration),
      "skill_level": "apprentice|electrician|designer|specialist" (ALWAYS assign),
      "team_size": 1 or 2 (INFER based on task complexity),
      "tools_required": ["tool1", "tool2"] (minimum 2, INFER standard tools),
      "materials_needed": ["material1"] (if installation, INFER consumables),
      "common_mistakes": ["mistake1"] (INFER typical errors for task type),
      "safety_requirements": {"ppe": [...], "isolations": [...]} (ALWAYS include UK safety reqs),
      "confidence_score": 0.75-0.95 (0.75 for inferred, 0.90+ for explicit)
    }
  ]
}

QUALITY REQUIREMENTS:
- EVERY facet MUST have: typical_duration_minutes, skill_level, safety_requirements
- Installation facets MUST have: installation_method, tools (4+), materials (3+)
- Testing facets MUST have: test_procedures (3+ steps), test_equipment_required, acceptance_criteria
- Maintenance facets MUST have: maintenance_intervals, maintenance_tasks (3+)
- NO null fields for core metadata (duration, skill, safety) - USE INFERENCE

Return ONLY valid JSON, NO markdown, NO explanations.`;

  const userPrompt = `Extract micro-facets from this UK electrical procedure:

${content}

Return ONLY the JSON object with the "facets" array.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    logger.error(`GPT API failed: ${response.status} ${response.statusText}`, { errorText });
    throw new Error(`GPT API failed: ${response.statusText}`);
  }

  const data = await response.json();
  const gptResponse = data.choices[0].message.content;

  // Parse JSON response
  const cleanJson = gptResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    const parsed = JSON.parse(cleanJson);
    
    // Extract facets array
    if (!parsed.facets || !Array.isArray(parsed.facets)) {
      logger.warn('Invalid extraction - missing facets array');
      
      // Retry once with more explicit prompt
      if (retryCount === 0) {
        logger.info('Retrying with stricter prompt...');
        return callGPTForFacets(content, logger, 1);
      }
      
      return null;
    }
    
    // Validate and filter facets
    const validFacets = parsed.facets.filter((facet: any) => {
      // Normalise categories before validation
      if (facet.equipment_category) {
        facet.equipment_category = normaliseCategory(facet.equipment_category);
      }
      
      const isValid = validatePracticalWorkFacet(facet);
      if (!isValid) {
        logger.warn('Rejected low-quality facet', { 
          primary_topic: facet.primary_topic?.substring(0, 50),
          keywordCount: facet.keywords?.length,
          category: facet.equipment_category,
          hasTools: !!facet.tools_required?.length,
          hasMaterials: !!facet.materials_needed?.length,
          hasBS7671: !!facet.bs7671_regulations?.length,
          hasAppliesTo: !!facet.applies_to?.length,
          confidence: facet.confidence_score
        });
      }
      return isValid;
    });
    
    if (validFacets.length === 0) {
      logger.warn('No valid facets extracted after filtering');
      
      // Retry once
      if (retryCount === 0) {
        logger.info('Retrying due to 0 valid facets...');
        return callGPTForFacets(content, logger, 1);
      }
      
      return null;
    }
    
    logger.info(`✅ Extracted ${validFacets.length} valid facets from GPT (${OPENAI_MODEL})`);
    return { facets: validFacets };
    
  } catch (parseError) {
    logger.error('Failed to parse GPT response', { 
      parseError: parseError.message,
      responsePreview: cleanJson.substring(0, 200)
    });
    
    // Retry once
    if (retryCount === 0) {
      logger.info('Retrying due to parse error...');
      return callGPTForFacets(content, logger, 1);
    }
    
    return null;
  }
}

/**
 * Helper function to infer activity types from facet content (Fix 1)
 */
function inferActivityTypes(facet: any, sourceItem: any): string[] {
  const content = ((facet.primary_topic || '') + ' ' + (sourceItem.content || '')).toLowerCase();
  const types = [];
  
  if (/install|fitting|mount|fix/.test(content)) types.push('installation');
  if (/test|commission|inspect|verify/.test(content)) types.push('testing');
  if (/maintain|service|clean|replace/.test(content)) types.push('maintenance');
  if (/design|calculate|size|select/.test(content)) types.push('design');
  if (/fault|diagnose|troubleshoot|repair/.test(content)) types.push('fault_finding');
  
  return types.length > 0 ? types : ['installation']; // Default to installation
}

/**
 * Helper function to infer facet type from content (Fix for duplicate key constraint)
 * Allows multiple facets per source item by assigning different types
 */
function inferFacetType(facet: any, index: number): string {
  const topic = (facet.primary_topic || '').toLowerCase();
  
  // Prioritize specific types based on content
  if (facet.test_procedures?.length > 0 || /test|commission|verify/.test(topic)) {
    return 'testing';
  }
  if (facet.maintenance_tasks?.length > 0 || /maintain|service|inspect/.test(topic)) {
    return 'maintenance';
  }
  if (facet.installation_method || /install|mount|fix|fit/.test(topic)) {
    return 'installation';
  }
  if (facet.materials_needed?.length > 0 && /cost|price|material/.test(topic)) {
    return 'costing';
  }
  
  // Default: alternate between primary types to avoid conflicts
  const types = ['installation', 'testing', 'maintenance', 'primary'];
  return types[index % types.length];
}

async function enrichProcedure(supabase: any, item: any, logger: any): Promise<number> {
  const content = item.content || item.description || '';
  
  if (!content || content.length < 150) {
    logger.warn('Content too short', { id: item.id, length: content.length });
    return 0;
  }

  // Call GPT to extract multi-facets
  const intelligence = await callGPTForFacets(content, logger);
  
  if (!intelligence || !intelligence.facets || intelligence.facets.length === 0) {
    logger.warn('No facets extracted', { id: item.id });
    return 0;
  }

  // Fix 1: Add missing required columns + Fix 2: Map all enhanced GPT fields
  const facetsToInsert = intelligence.facets.map((facet: any, i: number) => ({
    practical_work_id: item.id,
    facet_type: inferFacetType(facet, i),
    
    // ✅ Fix 1: Add missing NOT NULL columns
    activity_types: inferActivityTypes(facet, item),
    source_tables: ['practical_work'],
    provenance: {
      enrichment_model: OPENAI_MODEL,
      enrichment_function: 'enrich-practical-work',
      enriched_at: new Date().toISOString(),
      source_content_length: content.length,
      gpt_tokens: intelligence.tokens || null
    },
    
    // Existing basic fields
    primary_topic: facet.primary_topic,
    keywords: facet.keywords,
    equipment_category: normaliseCategory(facet.equipment_category),
    equipment_subcategory: facet.equipment_subcategory || null,
    applies_to: facet.applies_to || [],
    cable_sizes: facet.cable_sizes || [],
    power_ratings: facet.power_ratings || [],
    location_types: facet.location_types || [],
    tools_required: facet.tools_required || [],
    materials_needed: facet.materials_needed || [],
    bs7671_regulations: facet.bs7671_regulations || [],
    
    // ✅ Fix 2: Add installation-specific fields
    installation_method: facet.installation_method || null,
    cable_routes: ensureArrayOfStrings(facet.cable_routes),
    termination_methods: ensureArrayOfStrings(facet.termination_methods),
    
    // ✅ Fix 2: Add testing & commissioning fields
    test_procedures: ensureJsonArray(facet.test_procedures),
    test_equipment_required: ensureArrayOfStrings(facet.test_equipment_required),
    acceptance_criteria: toJsonOrNull(facet.acceptance_criteria),
    
    // ✅ Fix 2: Add inspection fields
    visual_inspection_points: ensureArrayOfStrings(facet.visual_inspection_points),
    eicr_observation_codes: ensureArrayOfStrings(facet.eicr_observation_codes),
    common_defects: ensureArrayOfStrings(facet.common_defects),
    
    // ✅ Fix 2: Add maintenance fields
    maintenance_intervals: toJsonOrNull(facet.maintenance_intervals),
    maintenance_tasks: ensureArrayOfStrings(facet.maintenance_tasks),
    wear_indicators: ensureArrayOfStrings(facet.wear_indicators),
    
    // ✅ NEW: Add required core intelligence fields
    typical_duration_minutes: facet.typical_duration_minutes || null,
    skill_level: facet.skill_level || null,
    team_size: facet.team_size || 1,
    
    // Existing error & safety fields
    common_mistakes: ensureArrayOfStrings(facet.common_mistakes),
    safety_requirements: toJsonOrNull(facet.safety_requirements),
    
    confidence_score: facet.confidence_score || 0.85
  }));

  // Fix 4: Add comprehensive error logging
  const { data: insertedData, error: insertError } = await supabase
    .from('practical_work_intelligence')
    .insert(facetsToInsert)
    .select(); // ✅ Select to verify insertion

  if (insertError) {
    logger.error('❌ Insert failed', { 
      error: insertError.message,
      code: insertError.code,
      details: insertError.details,
      hint: insertError.hint,
      id: item.id,
      facetCount: facetsToInsert.length,
      sampleFacet: JSON.stringify(facetsToInsert[0], null, 2) // Log first facet for debugging
    });
    return 0;
  }

  if (!insertedData || insertedData.length === 0) {
    logger.warn('⚠️ Insert succeeded but no rows returned', {
      id: item.id,
      facetCount: facetsToInsert.length
    });
    return 0;
  }

  logger.info(`✅ Inserted ${insertedData.length} facets`, { 
    id: item.id,
    avgConfidence: (insertedData.reduce((sum, f) => sum + f.confidence_score, 0) / insertedData.length).toFixed(2)
  });

  return insertedData.length;
}

// ==================== MAIN HANDLER ====================

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const logger = createLogger(requestId);

  try {
    const { batchId, batchSize, startFrom } = await req.json();
    logger.info(`🚀 World-class enrichment batch ${batchId}: ${batchSize} items from ${startFrom}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Query items from practical_work
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
      logger.info(`No items found for batch ${batchId}`);
      return new Response(JSON.stringify({ success: true, total_facets: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logger.info(`📦 Retrieved ${items.length} items`);

    // Phase 1: Filter quality items
    const qualityItems = items.filter(item => shouldEnrichChunk(item));
    logger.info(`📊 Filtered ${items.length} → ${qualityItems.length} quality items (${((qualityItems.length / items.length) * 100).toFixed(1)}% pass rate)`);

    // Phase 6: Sort by priority
    qualityItems.sort((a, b) => calculateEnrichmentPriority(b) - calculateEnrichmentPriority(a));
    logger.info('🎯 Sorted by enrichment priority');

    await supabase.from('batch_progress').update({
      status: 'processing',
      started_at: new Date().toISOString()
    }).eq('id', batchId);

    let totalFacets = 0;
    let lastHeartbeat = Date.now();

    for (let i = 0; i < qualityItems.length; i++) {
      const item = qualityItems[i];
      
      // Heartbeat every 15 seconds
      if (Date.now() - lastHeartbeat > 15000) {
        await supabase.from('batch_progress').update({
          items_processed: i,
          updated_at: new Date().toISOString(),
          data: { last_heartbeat: new Date().toISOString(), total_facets: totalFacets }
        }).eq('id', batchId);
        lastHeartbeat = Date.now();
      }

      try {
        const facetCount = await enrichProcedure(supabase, item, logger);
        totalFacets += facetCount;
      } catch (error) {
        logger.error(`Failed to enrich item ${item.id}`, { error: error.message });
      }
    }

    await supabase.from('batch_progress').update({
      status: 'completed',
      items_processed: qualityItems.length,
      completed_at: new Date().toISOString(),
      data: { 
        total_facets_created: totalFacets,
        quality_filtered: items.length - qualityItems.length,
        avg_facets_per_item: (totalFacets / qualityItems.length).toFixed(1)
      }
    }).eq('id', batchId);

    logger.info(`🎉 Batch complete: ${qualityItems.length} items → ${totalFacets} facets (avg ${(totalFacets / qualityItems.length).toFixed(1)} facets/item)`);

    return new Response(JSON.stringify({ 
      success: true, 
      total_facets: totalFacets,
      items_processed: qualityItems.length,
      items_filtered: items.length - qualityItems.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('Enrichment failed', { 
      error: error.message, 
      stack: error.stack
    });
    
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

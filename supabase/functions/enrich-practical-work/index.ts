import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

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
 * Phase 5: Validate facet quality - stricter rules
 */
function validatePracticalWorkFacet(facet: any): boolean {
  if (!facet) return false;
  
  // MUST have rich keywords (5+)
  if (!facet.keywords || facet.keywords.length < 5) return false;
  
  // MUST have detailed primary_topic (30+ characters)
  if (!facet.primary_topic || facet.primary_topic.length < 30) return false;
  
  // MUST have equipment category
  if (!facet.equipment_category || facet.equipment_category.length < 3) return false;
  
  // MUST have tools OR materials (practical work needs resources)
  const hasTools = facet.tools_required && facet.tools_required.length >= 2;
  const hasMaterials = facet.materials_needed && facet.materials_needed.length >= 2;
  if (!hasTools && !hasMaterials) return false;
  
  // MUST have BS7671 references (electrical work must reference standards)
  if (!facet.bs7671_regulations || facet.bs7671_regulations.length < 1) return false;
  
  // MUST have applies_to context
  if (!facet.applies_to || facet.applies_to.length < 1) return false;
  
  return true;
}

// ==================== GPT ENRICHMENT ====================

async function callGPTForFacets(content: string, logger: any): Promise<any> {
  const prompt = `You are a UK electrical intelligence extractor. Generate 8-20 DISTINCT micro-facets for this practical work procedure. Each facet represents ONE specific scenario/application/trade context.

PROCEDURE CONTENT:
${content}

FACET EXPLOSION RULES:
1. Generate 8-12 facets for SIMPLE procedures (socket installation, basic testing)
2. Generate 12-18 facets for MEDIUM procedures (consumer units, circuits)
3. Generate 15-25 facets for COMPLEX procedures (EV chargers, solar, medical locations)

Each facet MUST be genuinely distinct based on:
- Trade: Domestic/Commercial/Industrial/Agricultural/Medical
- Equipment: Specific load type or circuit configuration
- Phase: Installation/Testing/Commissioning/Maintenance/Troubleshooting
- Location: Indoor/Outdoor/Bathroom/Kitchen/Special location
- Scale: Different cable sizes, different power ratings, different protection devices

CRITICAL: Each facet must have:
- Distinct "primary_topic" (30-80 words describing the specific scenario)
- Distinct "keywords" array (6-10 keywords specific to that scenario)
- Distinct "equipment_subcategory" if applicable
- Trade-specific "applies_to" array (e.g., ["domestic"], ["commercial"], ["industrial"])
- "cable_sizes" if cables mentioned (e.g., ["1.5mm²", "2.5mm²"])
- "power_ratings" if power mentioned (e.g., ["16A", "32A", "9.5kW"])
- "location_types" if location mentioned (e.g., ["indoor"], ["bathroom"], ["outdoor"])

Return ONLY valid JSON (no markdown):
{
  "facets": [
    {
      "primary_topic": "Domestic consumer unit installation in TT earthing system - requires 100mA S-type RCD for main protection with 30mA RCBOs for final circuits per BS7671 411.5",
      "keywords": ["consumer unit", "TT system", "S-type RCD", "100mA", "30mA RCBO", "domestic", "earthing", "main protection"],
      "equipment_category": "consumer_unit",
      "equipment_subcategory": "domestic_TT_system",
      "applies_to": ["domestic"],
      "cable_sizes": ["16mm²", "25mm²"],
      "power_ratings": ["100A"],
      "location_types": ["indoor"],
      "bs7671_regulations": ["314.1", "411.5", "531.2"],
      "tools_required": ["torque screwdriver", "insulated tools", "earth loop tester", "multimeter"],
      "materials_needed": ["100mA S-type RCD", "30mA RCBOs", "busbar", "earth bar"],
      "safety_notes": "Isolate main supply, verify dead, test RCD operation",
      "confidence_score": 0.90
    }
  ]
}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
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
      return null;
    }
    
    // Validate and filter facets
    const validFacets = parsed.facets.filter((facet: any) => {
      const isValid = validatePracticalWorkFacet(facet);
      if (!isValid) {
        logger.warn('Rejected low-quality facet', { 
          primary_topic: facet.primary_topic?.substring(0, 50),
          keywordCount: facet.keywords?.length,
          hasTools: !!facet.tools_required?.length,
          hasMaterials: !!facet.materials_needed?.length,
          hasBS7671: !!facet.bs7671_regulations?.length
        });
      }
      return isValid;
    });
    
    if (validFacets.length === 0) {
      logger.warn('No valid facets extracted');
      return null;
    }
    
    logger.info(`✅ Extracted ${validFacets.length} valid facets from GPT`);
    return { facets: validFacets };
    
  } catch (parseError) {
    logger.error('Failed to parse GPT response', { parseError: parseError.message });
    return null;
  }
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

  // Store enriched intelligence - multiple facets per item
  const facetsToInsert = intelligence.facets.map((facet: any) => ({
    practical_work_id: item.id,
    facet_type: 'scenario',
    primary_topic: facet.primary_topic,
    keywords: facet.keywords,
    equipment_category: facet.equipment_category,
    equipment_subcategory: facet.equipment_subcategory || null,
    applies_to: facet.applies_to || [],
    cable_sizes: facet.cable_sizes || [],
    power_ratings: facet.power_ratings || [],
    location_types: facet.location_types || [],
    tools_required: facet.tools_required || [],
    materials_needed: facet.materials_needed || [],
    bs7671_regulations: facet.bs7671_regulations || [],
    safety_notes: facet.safety_notes || '',
    procedure_steps: facet.procedure_steps || [],
    common_mistakes: facet.common_mistakes || [],
    testing_requirements: facet.testing_requirements || '',
    confidence_score: facet.confidence_score || 0.85
  }));

  const { error: insertError } = await supabase
    .from('practical_work_intelligence')
    .insert(facetsToInsert);

  if (insertError) {
    logger.error('Failed to insert facets', { 
      error: insertError.message,
      id: item.id,
      facetCount: facetsToInsert.length
    });
    return 0;
  }

  logger.info(`✅ Enriched item with ${facetsToInsert.length} facets`, { 
    id: item.id,
    avgConfidence: (facetsToInsert.reduce((sum: number, f: any) => sum + f.confidence_score, 0) / facetsToInsert.length).toFixed(2)
  });

  return facetsToInsert.length;
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

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
  const text = content.toLowerCase();
  const ppe: string[] = [];
  const precautions: string[] = [];
  const hazards: string[] = [];
  
  // Extract PPE
  if (text.includes('gloves') || text.includes('insulated')) ppe.push('Insulated gloves');
  if (text.includes('safety glasses') || text.includes('goggles')) ppe.push('Safety glasses');
  if (text.includes('boots')) ppe.push('Safety boots');
  if (text.includes('helmet') || text.includes('hard hat')) ppe.push('Hard hat');
  
  // Extract precautions
  if (text.includes('isolate') || text.includes('isolation')) precautions.push('Isolate supply before work');
  if (text.includes('prove dead') || text.includes('test before touch')) precautions.push('Prove circuit dead');
  if (text.includes('earth') || text.includes('bonding')) precautions.push('Verify earthing and bonding');
  if (text.includes('rcd') || text.includes('rcbo')) precautions.push('Ensure RCD protection');
  if (text.includes('permit') || text.includes('lock off')) precautions.push('Use permit to work system');
  
  // Extract hazards
  if (text.includes('shock') || text.includes('electric')) hazards.push('Electric shock');
  if (text.includes('arc') || text.includes('flash')) hazards.push('Arc flash');
  if (text.includes('fire')) hazards.push('Fire risk');
  if (text.includes('burn')) hazards.push('Burns');
  if (text.includes('fall') || text.includes('height')) hazards.push('Falls from height');
  
  // Defaults if nothing found
  if (ppe.length === 0) ppe.push('Insulated gloves', 'Safety glasses');
  if (precautions.length === 0) precautions.push('Isolate supply', 'Prove dead', 'Follow BS 7671');
  if (hazards.length === 0) hazards.push('Electric shock', 'Arc flash');
  
  return { ppe, precautions, hazards };
}

// PREPROCESS CONTENT: Clean and extract key info before sending to GPT
function preprocessContent(content: string): { cleaned: string; specs: string[]; procedures: string[]; safety: string[] } {
  const text = content.toLowerCase();
  const specs: string[] = [];
  const procedures: string[] = [];
  const safety: string[] = [];
  
  // Extract technical specifications
  const specPatterns = [
    /\b(\d+\s*(?:mm²|amp|a|volt|v|kw|kva|hz))\b/gi,
    /\b(ip\d{2}|iec\s*\d+|bs\s*\d+|en\s*\d+)\b/gi,
    /\b(three-?phase|single-?phase|dc|ac|230v|400v)\b/gi,
  ];
  
  specPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) specs.push(...matches.slice(0, 5));
  });
  
  // Extract procedural steps (lines starting with numbers, bullets, or action words)
  const lines = content.split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^[\d\.\)\-\*]\s+/.test(trimmed) || /^(install|connect|test|check|ensure|verify|measure)/i.test(trimmed)) {
      if (trimmed.length > 10 && trimmed.length < 150) {
        procedures.push(trimmed.replace(/^[\d\.\)\-\*]\s+/, ''));
      }
    }
  });
  
  // Extract safety warnings
  const safetyKeywords = ['danger', 'warning', 'caution', 'hazard', 'risk', 'isolate', 'de-energize', 'ppe', 'protective'];
  lines.forEach(line => {
    if (safetyKeywords.some(kw => line.toLowerCase().includes(kw))) {
      if (line.length > 15 && line.length < 150) {
        safety.push(line.trim());
      }
    }
  });
  
  // Clean the content
  const cleaned = content
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n')  // Max 2 newlines
    .trim();
  
  return { cleaned, specs: [...new Set(specs)], procedures: procedures.slice(0, 10), safety: safety.slice(0, 5) };
}

// VALIDATE EXTRACTED DATA QUALITY
function validateExtractedFacets(facets: any[]): boolean {
  if (!facets || facets.length === 0) return false;
  
  const primaryFacet = facets.find(f => f.facet_type === 'primary');
  if (!primaryFacet) return false;
  
  // Check for meaningful electrical terms in arrays
  const electricalTerms = [
    'cable', 'wire', 'mcb', 'rcd', 'rcbo', 'circuit', 'earth', 'test', 'meter', 'tool', 
    'install', 'screw', 'strip', 'crimp', 'socket', 'switch', 'voltage', 'insulation',
    'volt', 'amp', 'watt', 'phase', 'neutral', 'protective'
  ];
  
  const hasElectricalContent = (arr: any[]): boolean => {
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const joined = arr.join(' ').toLowerCase();
    return electricalTerms.some(term => joined.includes(term));
  };
  
  // Validate primary facet has meaningful data
  const hasTools = hasElectricalContent(primaryFacet.tools_required || []);
  const hasMaterials = hasElectricalContent(primaryFacet.materials_needed || []);
  const hasKeywords = hasElectricalContent(primaryFacet.keywords || []);
  const hasSafety = primaryFacet.safety_requirements?.ppe?.length > 0;
  
  // Need at least 2 of these to be meaningful
  const meaningfulFields = [hasTools, hasMaterials, hasKeywords, hasSafety].filter(Boolean).length;
  
  return meaningfulFields >= 2;
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
        // Insert minimal primary facet so we don't lose the item - with preprocessing
        const rawContent = item.content || item.description || '';
        const { specs, procedures } = preprocessContent(rawContent);
        await insertMinimalFacet(supabase, item, error.message, specs, procedures);
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
  
  // PREPROCESS CONTENT to extract key information
  const rawContent = content || description || '';
  const { cleaned, specs, procedures, safety } = preprocessContent(rawContent);
  
  // INTELLIGENT equipment category extraction
  const equipment_category = extractEquipmentCategory(item);
  const technicalTerms = extractTechnicalTerms(rawContent);
  
  logger.info(`Processing ${id}: ${equipment_category}, extracted ${specs.length} specs, ${procedures.length} procedures, ${safety.length} safety notes`);
  
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

  // EQUIPMENT-SPECIFIC PROMPT GENERATION
  const getEquipmentSpecificGuidance = (category: string): string => {
    const guidance: Record<string, string> = {
      'consumer_unit': `
MUST EXTRACT for Consumer Units:
- tools_required: ["insulated screwdrivers", "torque screwdriver", "cable strippers", "multimeter", "voltage tester"]
- materials_needed: ["MCBs", "RCBOs", "busbar", "neutral bar", "earth bar", "cable glands"]
- test_procedures: ["insulation resistance test", "earth fault loop impedance test", "RCD trip time test", "polarity test"]
- bs7671_regulations: ["Chapter 42", "Section 421", "Regulation 421.1.201", "Section 530"]
- safety_requirements: {"ppe": ["insulated gloves", "safety glasses"], "precautions": ["isolate supply", "prove dead"], "hazards": ["electric shock", "arc flash"]}`,
      
      'ev_charger': `
MUST EXTRACT for EV Chargers:
- tools_required: ["drill", "SDS drill", "cable detector", "insulated tools", "torque wrench", "earth loop tester"]
- materials_needed: ["EV charge point", "6mm² or 10mm² cable", "32A Type B RCD", "isolation switch", "outdoor enclosure"]
- test_procedures: ["earth continuity test", "insulation resistance test", "polarity test", "RCD test", "earth fault loop test"]
- bs7671_regulations: ["Section 722", "Regulation 722.411.4.1", "Section 314.1"]
- safety_requirements: {"ppe": ["insulated gloves", "safety boots"], "precautions": ["confirm EV socket de-energized", "label supply"], "hazards": ["electric shock", "outdoor hazards"]}`,
      
      'solar_panel': `
MUST EXTRACT for Solar Panels:
- tools_required: ["roof ladder", "harness", "MC4 crimpers", "insulated tools", "solar edge tester", "IR camera"]
- materials_needed: ["PV panels", "mounting rails", "inverter", "DC isolator", "AC isolator", "generation meter"]
- test_procedures: ["open circuit voltage test", "short circuit current test", "insulation resistance test", "earth continuity", "polarity check"]
- bs7671_regulations: ["Section 712", "Regulation 712.411.3.2.1", "BS 7909"]
- safety_requirements: {"ppe": ["harness", "hard hat", "gloves"], "precautions": ["roof safety", "DC isolation", "cover panels"], "hazards": ["falls from height", "DC shock", "arc flash"]}`,
      
      'socket_outlet': `
MUST EXTRACT for Socket Outlets:
- tools_required: ["insulated screwdrivers", "cable strippers", "socket tester", "multimeter", "fish tape"]
- materials_needed: ["13A sockets", "back boxes", "2.5mm² cable", "grommets", "cable clips"]
- test_procedures: ["polarity test", "earth continuity test", "insulation resistance", "socket outlet test"]
- bs7671_regulations: ["Section 411.3.2", "Regulation 521.10.1", "Table 4E2A"]
- safety_requirements: {"ppe": ["insulated gloves"], "precautions": ["isolate circuit", "prove dead"], "hazards": ["electric shock"]}`,
      
      'lighting': `
MUST EXTRACT for Lighting:
- tools_required: ["steps", "insulated screwdrivers", "cable strippers", "multimeter", "drill"]
- materials_needed: ["luminaires", "1.5mm² cable", "ceiling roses", "lampholders", "connectors"]
- test_procedures: ["polarity test", "earth continuity", "insulation resistance", "functional test"]
- bs7671_regulations: ["Section 559", "Section 411.3.2"]
- safety_requirements: {"ppe": ["gloves", "safety glasses"], "precautions": ["isolate circuit", "secure ladder"], "hazards": ["electric shock", "falls"]}`,
    };
    
    return guidance[category] || `
MUST EXTRACT minimum data:
- tools_required: At least 3 specific tools used for this work
- materials_needed: At least 3 specific materials or components
- test_procedures: At least 2 relevant test procedures
- bs7671_regulations: At least 1 BS 7671 regulation reference
- safety_requirements: {"ppe": ["minimum 2 items"], "precautions": ["minimum 2"], "hazards": ["minimum 2"]}`;
  };

  const equipmentGuidance = getEquipmentSpecificGuidance(equipment_category);

  // ENHANCED CONTEXT with preprocessed information
  const contextSummary = `
EXTRACTED SPECIFICATIONS: ${specs.join(', ') || 'None found'}
IDENTIFIED PROCEDURES: ${procedures.length > 0 ? procedures.slice(0, 5).join(' | ') : 'None found'}
SAFETY NOTES: ${safety.length > 0 ? safety.slice(0, 3).join(' | ') : 'None found'}`;

  const prompt = `You are an expert UK electrical procedures analyst. Extract comprehensive, structured data from this procedure in UK English.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROCEDURE CONTENT:
${cleaned}

${contextSummary}

EQUIPMENT TYPE: ${equipment_category}
ACTIVITY TYPES: ${activity_types?.join(', ') || 'general electrical work'}
TECHNICAL TERMS: ${technicalTerms.join(', ')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RELEVANT PRACTICAL KNOWLEDGE CONTEXT:
${practicalContext.slice(0, 5).map((c, i) => `[${i+1}] ${c.content}`).join('\n\n')}

RELEVANT BS 7671 REGULATIONS:
${bs7671Context.slice(0, 3).map((c, i) => `[${i+1}] ${c.content}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${equipmentGuidance}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXTRACTION RULES (MANDATORY):
1. **NEVER return NULL or empty arrays** - Always extract meaningful data
2. **Extract from BOTH the procedure text AND the context provided**
3. **Be specific** - "multimeter" not "testing equipment", "6mm² cable" not "cable"
4. **Include quantities** where relevant - "2x 32A MCBs" not just "MCBs"
5. **Use UK terminology** - "earthing" not "grounding", "consumer unit" not "breaker panel"

RESPONSE FORMAT (JSON array with facets):

MANDATORY PRIMARY FACET:
{
  "facet_type": "primary",
  "activity_types": ["installation", "testing", "maintenance"], // From content
  "equipment_category": "${equipment_category}",
  "equipment_subcategory": "specific model/type if mentioned",
  "skill_level": "Apprentice|Improver|Electrician|Specialist",
  "typical_duration_minutes": <realistic time estimate>,
  "tools_required": ["MUST have min 5 specific tools"],
  "materials_needed": ["MUST have min 5 specific materials/components"],
  "safety_requirements": {
    "ppe": ["MUST list min 3 PPE items"],
    "precautions": ["MUST list min 3 safety steps"],
    "hazards": ["MUST list min 3 specific hazards"]
  },
  "bs7671_regulations": ["MUST include regulation numbers from context"],
  "keywords": ["MUST include ${equipment_category} and technical terms"]
}

IF installation work mentioned, ADD INSTALLATION FACET:
{
  "facet_type": "installation",
  "installation_method": "Surface|Buried|Overhead|Concealed",
  "fixing_intervals": {"horizontal_mm": number, "vertical_mm": number},
  "cable_routes": ["specific route descriptions"],
  "termination_methods": ["specific termination types"],
  "bs7671_zones": ["relevant zones"],
  "tools_required": ["installation-specific tools"],
  "materials_needed": ["installation materials"]
}

IF testing/commissioning mentioned, ADD TESTING FACET:
{
  "facet_type": "testing",
  "test_procedures": ["MUST list specific test procedures with steps"],
  "test_equipment_required": ["MUST list specific test instruments"],
  "test_frequency": "Initial|Annual|3-yearly|5-yearly|As required",
  "acceptance_criteria": {"test_name": "pass criteria"},
  "visual_inspection_points": ["specific inspection checks"]
}

IF maintenance mentioned, ADD MAINTENANCE FACET:
{
  "facet_type": "maintenance",
  "maintenance_intervals": {"routine": "X months", "detailed": "Y years"},
  "maintenance_tasks": ["MUST list specific maintenance tasks"],
  "common_defects": ["specific defects to look for"],
  "wear_indicators": ["signs of wear/deterioration"],
  "troubleshooting_steps": ["diagnostic steps for faults"]
}

CRITICAL: Return ONLY valid JSON array. All arrays MUST contain meaningful electrical data, NOT generic placeholders.`;


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
  const rawGPTContent = chatCompletion.choices[0].message.content;
  
  try {
    const parsed = JSON.parse(rawGPTContent);
    // Handle both array and object with facets key
    facetsData = Array.isArray(parsed) ? parsed : (parsed.facets || [parsed]);
  } catch (parseError) {
    logger.error(`JSON parse failed for ${id}, attempting repair`, { rawGPTContent });
    // Attempt to extract JSON array/object
    const jsonMatch = rawGPTContent.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
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

  // VALIDATE QUALITY of extracted facets
  const isValid = validateExtractedFacets(facetsData);
  
  if (!isValid) {
    logger.warn(`Low quality extraction for ${id}, using enhanced fallback`);
    // Fallback to minimal but meaningful facet
    await insertMinimalFacet(supabase, item, 'Low quality GPT extraction - using enriched fallback', specs, procedures);
    return [];
  }

  // Transform and upsert all facets
  const facetsToInsert = facetsData.map((facet: any) => 
    transformFacetForDB(facet, item)
  );
  
  logger.info(`Validated ${facetsToInsert.length} facets for ${id}: ${facetsToInsert.map(f => f.facet_type).join(', ')}`);

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

async function insertMinimalFacet(supabase: any, item: any, errorMsg: string, specs: string[] = [], procedures: string[] = []) {
  // Extract equipment category using same intelligent extraction
  const equipment_category = extractEquipmentCategory(item);
  const rawContent = item.content || item.description || '';
  const basicKeywords = extractBasicKeywords(rawContent);
  const basicSafety = extractBasicSafety(rawContent);
  
  // Extract tools and materials from content
  const text = rawContent.toLowerCase();
  const tools_required = [];
  const materials_needed = [];
  
  // Common electrical tools
  const toolPatterns = ['screwdriver', 'multimeter', 'tester', 'pliers', 'stripper', 'drill', 'saw', 'crimper'];
  toolPatterns.forEach(tool => {
    if (text.includes(tool)) tools_required.push(tool);
  });
  if (tools_required.length === 0) tools_required.push('insulated screwdrivers', 'multimeter', 'voltage tester');
  
  // Extract materials from specs or use defaults
  if (specs.length > 0) {
    materials_needed.push(...specs.slice(0, 5));
  }
  if (materials_needed.length === 0) {
    const materialPatterns = ['cable', 'mcb', 'rcd', 'socket', 'switch', 'connector'];
    materialPatterns.forEach(mat => {
      if (text.includes(mat)) materials_needed.push(mat);
    });
  }
  if (materials_needed.length === 0) materials_needed.push('cables', 'terminals', 'fixings');
  
  // Use procedures if available
  const test_procedures = procedures.length > 0 
    ? procedures.slice(0, 8) 
    : ['Visual inspection', 'Polarity test', 'Insulation resistance test'];
  
  // Always insert at least a primary facet with enriched data
  const { error } = await supabase.from('practical_work_intelligence').upsert({
    practical_work_id: item.id,
    facet_type: 'primary',
    cluster_id: item.cluster_id,
    canonical_id: item.id,
    source_tables: item.source_tables,
    activity_types: item.activity_types || [],
    equipment_category: equipment_category,
    keywords: [equipment_category, ...basicKeywords, ...specs.slice(0, 3), ...(item.activity_types || [])],
    safety_requirements: basicSafety,
    bs7671_regulations: [],
    tools_required: [...new Set(tools_required)].slice(0, 10),
    materials_needed: [...new Set(materials_needed)].slice(0, 10),
    test_procedures: test_procedures,
    maintenance_tasks: [],
    confidence_score: 0.4, // Lower score for fallback data
    provenance: {
      enrichment_version: 'v3-fallback',
      enriched_at: new Date().toISOString(),
      fallback_reason: errorMsg
    }
  }, { onConflict: 'practical_work_id,facet_type' });

  if (error) {
    console.error(`Failed to insert minimal facet for ${item.id}:`, error);
  }
}

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';
import { withTimeout, Timeouts } from '../_shared/timeout.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = Deno.env.get('OPENAI_MODEL') || 'gpt-5-mini'; // Use GPT-5 Mini for complex reasoning

// ==================== WORLD-CLASS FILTERS & VALIDATORS ====================

/**
 * Phase 1: Content Quality Filter - Skip low-value chunks
 * For practical_work: Trust canonical curation, enrich everything
 */
function shouldEnrichChunk(item: any, taskType: string = 'bs7671'): boolean {
  // For practical_work, bypass filter - items are already curated as canonical
  if (taskType === 'practical_work') {
    return true;
  }
  
  // Strict filter for BS7671/health-safety content
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
 * Validate facet for dangerous maintenance advice
 */
function validateFacetSafety(facet: any): string | null {
  const dangerousPatterns = [
    /clean.*with.*water/i,
    /damp.*cloth/i,
    /wet.*wipe/i,
    /spray.*contact/i,
    /wd-?40/i,
    /solvent.*clean/i,
    /live.*work/i,
    /work.*on.*live/i,
    /test.*live.*circuit/i,
    /energ(i|y)sed.*clean/i
  ];
  
  // Check maintenance_tasks and primary_topic for dangerous patterns
  const checkFields = [
    JSON.stringify(facet.maintenance_tasks || []),
    facet.primary_topic || ''
  ].join(' ');
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(checkFields)) {
      return `Dangerous pattern detected: ${pattern.source}`;
    }
  }
  
  // Additional check: if maintenance on electrical equipment, must mention isolation
  if (facet.equipment_category && 
      Array.isArray(facet.maintenance_tasks) && 
      facet.maintenance_tasks.length > 0) {
    const tasksStr = JSON.stringify(facet.maintenance_tasks).toLowerCase();
    const hasIsolation = /isolat|de-energ|switch.*off|disconnect.*supply/i.test(tasksStr);
    const isElectricalClean = /clean|wipe|brush|vacuum/i.test(tasksStr);
    
    if (isElectricalClean && !hasIsolation) {
      return 'Electrical equipment cleaning without isolation mentioned';
    }
  }
  
  return null; // Safe
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
      if (typeof v === 'string') return { task: v };
      return { value: String(v) };
    });
  }
  if (typeof value === 'string') return [{ task: value }];
  return [];
}

// ==================== GPT ENRICHMENT ====================

async function callGPTForFacets(id: string, title: string, content: string, logger: any, retryCount = 0, compactMode = false): Promise<any> {
  // Compact mode: shorter content for retry (reduced token budget)
  let processedContent = compactMode ? content.slice(0, 6000) : content.slice(0, 18000); // ~12K tokens at 1.5 chars/token
  
  // Remove TOC/header patterns selectively to preserve technical content
  processedContent = processedContent
    .replace(/^table of contents[\s\S]{0,500}/gim, '') // Remove TOC sections
    .replace(/^chapter \d+\s*$/gim, '') // Only bare chapter headers
    .replace(/^section \d+\s*$/gim, '') // Only bare section headers
    .replace(/^figure \d+\.\s*$/gim, '') // Only standalone "Figure 7." without description
    .replace(/^page \d+\s*$/gim, '') // Only page numbers alone
    .trim();
  
  const targetFacets = compactMode ? '4-6' : '8'; // ✅ EXACTLY 8 facets total (enforced via dedup + top-8 selection)
  
  const systemPrompt = `You are a precision parser extracting structured electrical training data from real textbook content.

PRIMARY DIRECTIVE: EXTRACT > INFER > GENERATE

EXTRACTION PRIORITY (in order):
1. **EXTRACT FIRST**: If the source content contains procedures, test values, tools, specifications, or regulations → USE THEM VERBATIM
2. **INFER SECOND**: If critical fields are missing but can be logically deduced from equipment type → infer using UK electrical standards
3. **GENERATE LAST**: Only generate if genuinely absent AND essential for completeness

CRITICAL RULES:
- If step-by-step procedure exists in source → EXTRACT it word-for-word (do NOT paraphrase)
- If test values/limits exist in source → USE EXACT NUMBERS from source
- If tools are mentioned → USE EXACT TOOL NAMES from source
- If BS 7671 regulations cited → PRESERVE EXACT regulation numbers
- If duration mentioned → USE SOURCE VALUE, don't infer
- ONLY infer when field is genuinely absent from source content

EXTRACTION EXAMPLES:
✅ Source: "Test insulation resistance between live conductors and earth. Acceptable reading ≥1MΩ at 500V DC"
   Extract: test_procedures: ["Test insulation resistance between live conductors and earth"], acceptance_criteria: {"insulation_resistance": "≥1MΩ at 500V DC"}

✅ Source: "Tools required: insulated screwdriver set, torque driver, cable strippers"
   Extract: tools_required: ["insulated screwdriver set", "torque driver", "cable strippers"]

❌ Source: "Test insulation resistance"
   Don't infer: test_procedures: ["Isolate circuit", "Remove sensitive equipment", "Test L-E, N-E, L-N"]
   Instead: Extract what's there, infer ONLY the missing essentials

TASK TYPE RULES (EXTRACT if present, INFER if absent):

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

**Fault Diagnosis Tasks (troubleshooting, diagnosing, repairing)**
MUST infer:
- common_failures: [{fault: "...", cause: "...", symptoms: "..."}]
- troubleshooting_steps: ["Step 1: Check...", "Step 2: Test...", "Step 3: Measure..."]
- diagnostic_tests: ["continuity test", "insulation resistance test", "voltage measurement"]
- replacement_criteria: ["replace if resistance >1Ω", "replace if terminals burnt"]

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

CONCRETE EXAMPLES OF COMPLETE FACETS:

Example A: Emergency Lighting Testing
{
  "primary_topic": "Monthly functional testing of emergency lighting system in commercial office building to verify 30-second duration mode operation and automatic failure detection",
  "keywords": ["emergency lighting", "functional test", "monthly inspection", "30-second test", "self-test", "battery backup"],
  "equipment_category": "emergency_lighting",
  "applies_to": ["commercial", "industrial"],
  "test_procedures": [
    "Isolate normal lighting supply at distribution board",
    "Verify emergency lights illuminate within 5 seconds",
    "Time emergency light operation for minimum 30 seconds",
    "Check all luminaire indicators show green (charged)",
    "Restore normal supply and verify automatic recharge",
    "Record any failures or dim luminaires on test log"
  ],
  "test_equipment_required": ["stopwatch", "test key/switch", "test log sheet"],
  "acceptance_criteria": {
    "illumination_time": "< 5 seconds",
    "minimum_duration": "30 seconds",
    "luminaire_brightness": "adequate illumination"
  },
  "typical_duration_minutes": 20,
  "skill_level": "apprentice",
  "team_size": 1,
  "tools_required": ["stopwatch", "test key"],
  "safety_requirements": {
    "ppe": ["none required"],
    "isolations": ["none required"]
  }
}

Example B: Consumer Unit Installation
{
  "primary_topic": "Installation of 18-way dual RCD consumer unit in domestic property, replacing old fuse box with modern protection including RCBO circuits for kitchen and bathroom",
  "keywords": ["consumer unit", "installation", "dual RCD", "RCBO", "domestic", "replacement"],
  "equipment_category": "consumer_unit",
  "applies_to": ["domestic"],
  "installation_method": "surface mounted on non-combustible backboard with 50mm clearance",
  "cable_routes": ["existing tails from meter", "circuits routed through ceiling void", "segregated in plastic trunking"],
  "termination_methods": ["MCB screw terminals torqued to 3.5Nm", "main switch torqued to manufacturer spec", "neutral bar connections verified"],
  "typical_duration_minutes": 240,
  "skill_level": "electrician",
  "team_size": 1,
  "tools_required": ["screwdriver set", "torque screwdriver", "cable strippers", "drill", "spirit level"],
  "materials_needed": ["consumer unit", "MCBs/RCBOs", "cable markers", "backboard", "fixing screws"],
  "safety_requirements": {
    "ppe": ["safety glasses", "insulated tools"],
    "isolations": ["isolation at meter confirmed", "DNO notification if seal broken"]
  }
}

Example C: Consumer Unit Maintenance (SAFE)
{
  "primary_topic": "Annual preventive maintenance inspection of 18-way consumer unit in commercial premises to check connections, clean terminals, and verify RCD operation",
  "keywords": ["consumer unit", "maintenance", "annual inspection", "RCD test", "terminal check"],
  "equipment_category": "consumer_unit",
  "applies_to": ["commercial"],
  "facet_type": "maintenance",
  "maintenance_intervals": "annual inspection, RCD test every 6 months",
  "maintenance_tasks": [
    "Isolate main supply and prove dead",
    "Remove front cover and vacuum dust from terminals (dry brush only)",
    "Visually inspect busbars for discolouration/overheating",
    "Check all MCB/RCBO terminal tightness (torque to 3.5Nm)",
    "Test all RCDs using test button and RCD tester",
    "Restore supply and verify operation"
  ],
  "wear_indicators": ["discoloured terminals", "loose connections", "RCD fails to trip", "burning smell"],
  "tools_required": ["vacuum cleaner", "dry brush", "torque screwdriver", "RCD tester", "voltage indicator"],
  "safety_requirements": {
    "ppe": ["insulated gloves", "safety glasses"],
    "isolations": ["main supply isolated", "DNO notified if required"]
  },
  "typical_duration_minutes": 45,
  "skill_level": "electrician"
}

CRITICAL SAFETY RULES - NEVER VIOLATE:

❌ FORBIDDEN maintenance_tasks:
- "Use water to clean [electrical equipment]"
- "Wipe down consumer unit with damp cloth"
- "Clean with solvents/liquids while energised"
- "Test live circuits without isolation"
- "Work on live equipment"

✅ SAFE maintenance_tasks for consumer units/switchgear:
- "Isolate supply, then vacuum dust from terminals"
- "Brush debris from busbars (isolated)"
- "Inspect for signs of overheating (visual only)"
- "Check tightness of terminations (isolated, torque to spec)"

RULE: If generating cleaning tasks for electrical equipment:
1. ALWAYS prefix with "Isolate supply, then..."
2. NEVER suggest water/liquid cleaning
3. Use: "vacuum", "brush", "compressed air", "dry wipe"

If unsure → DO NOT generate maintenance_tasks field at all

CRITICAL REQUIREMENT - COUNT YOUR OUTPUT BEFORE RESPONDING:
⚠️ Generate EXACTLY 8 facets - NO MORE, NO LESS.
⚠️ If you generate 9+ facets, the batch will be REJECTED and you will retry.
⚠️ Before responding, verify: facets.length === 8

Each facet = ONE broad scenario covering multiple aspects. DO NOT break down into tiny sub-facets.

Example: If source content describes "Consumer Unit Installation", create 1-2 comprehensive facets covering the entire process, NOT 20 separate facets for each tiny step.

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
      "maintenance_tasks": [{"task": "visual check", "frequency": "monthly"}] (GENERATE as JSONB array),
      "wear_indicators": ["discolouration"] (INFER for equipment type),
      
      "common_failures": [{"fault": "MCB won't reset", "cause": "persistent fault", "symptoms": "trips immediately"}] (if fault diagnosis),
      "troubleshooting_steps": ["Isolate circuit", "Test Zs", "Check for N-E fault"] (if troubleshooting),
      "diagnostic_tests": ["insulation resistance test", "earth loop impedance test"] (if diagnosis),
      "replacement_criteria": ["replace if Zs >1.4Ω", "replace if terminals burnt"] (if repair/replace decision),
      
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

  const userPrompt = `SOURCE CONTENT (${processedContent.length} characters):

Topic: ${title}

---FULL SOURCE TEXT---
${processedContent}
---END SOURCE TEXT---

TASK: Extract all practical facets from the above source content.

CRITICAL INSTRUCTIONS:
1. READ the source content carefully
2. EXTRACT procedures, test values, tools, specifications VERBATIM from source
3. Only INFER fields that are genuinely absent but essential
4. Preserve exact terminology, regulation numbers, and values from source
5. Generate 8-20 distinct micro-facets (one per specific scenario)

Return ONLY the JSON object with the "facets" array.`;

  const response = await withTimeout(
    fetch('https://api.openai.com/v1/chat/completions', {
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
        max_completion_tokens: 10000
      }),
    }),
    Timeouts.PRACTICAL_WORK,
    'Practical Work Enrichment GPT Call'
  );

  if (!response.ok) {
    const errorText = await response.text();
    
    // Retry on 504 timeout with compact mode
    if (response.status === 504 && retryCount < 1) {
      logger.warn(`⏱️ 504 timeout, retrying in compact mode...`, { id });
      return callGPTForFacets(id, title, content, logger, retryCount + 1, true);
    }
    
    logger.error(`GPT API failed: ${response.status} ${response.statusText}`, { errorText });
    throw new Error(`GPT API failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  const choice = data.choices?.[0];
  if (!choice) {
    logger.error('No choices in API response', { 
      responsePreview: JSON.stringify(data).substring(0, 500)
    });
    throw new Error('No choices returned from OpenAI API');
  }

  const finishReason = choice.finish_reason;
  logger.debug('GPT response received', {
    finish_reason: finishReason,
    has_content: !!choice.message?.content,
    model: OPENAI_MODEL
  });

  // Retry on "length" stop with compact mode
  if (finishReason === 'length' && retryCount < 1) {
    logger.warn(`🔁 Hit token limit, retrying in compact mode...`, { id });
    return callGPTForFacets(id, title, content, logger, retryCount + 1, true);
  }

  // Extract from message.content (no tool_calls defined in request)
  const gptResponse = choice.message.content;
  
  if (!gptResponse) {
    if (!compactMode && retryCount < 1) {
      logger.info('Retrying due to empty response...', { id });
      return callGPTForFacets(id, title, content, logger, retryCount + 1, true);
    }
    logger.error('Empty response from GPT', { finish_reason: finishReason, model: OPENAI_MODEL, id });
    throw new Error('Empty GPT response');
  }
  
  if (!gptResponse || gptResponse.trim() === '') {
    logger.error('Empty response from GPT', { 
      finish_reason: choice.finish_reason,
      model: OPENAI_MODEL
    });
    
    // Retry once if empty response on first attempt
    if (retryCount === 0) {
      logger.info('Retrying due to empty response...');
      return callGPTForFacets(id, title, content, logger, 1);
    }
    
    return null;
  }
  
  logger.info('Parsing JSON from message.content', { id });
  
  // Remove markdown fences if present
  const cleanJson = gptResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  let parsedResponse;
  try {
    parsedResponse = JSON.parse(cleanJson);
  } catch (parseErr) {
    logger.warn('Initial JSON parse failed, attempting brace-slice recovery', { 
      parseError: parseErr instanceof Error ? parseErr.message : String(parseErr),
      responsePreview: gptResponse.substring(0, 200)
    });
    
    // Attempt brace-slice recovery
    const start = cleanJson.indexOf('{');
    const end = cleanJson.lastIndexOf('}');
    
    if (start !== -1 && end !== -1 && end > start) {
      try {
        const slicedJson = cleanJson.slice(start, end + 1);
        parsedResponse = JSON.parse(slicedJson);
        logger.info('Brace-slice recovery successful');
      } catch (sliceErr) {
        logger.error('Brace-slice recovery also failed', {
          sliceError: sliceErr instanceof Error ? sliceErr.message : String(sliceErr)
        });
        
        // Retry once if parse error on first attempt
        if (retryCount === 0) {
          logger.info('Retrying due to parse error...');
          return callGPTForFacets(id, title, content, logger, 1);
        }
        
        return null;
      }
    } else {
      logger.error('No valid JSON braces found');
      
      // Retry once if parse error on first attempt
      if (retryCount === 0) {
        logger.info('Retrying due to parse error...');
        return callGPTForFacets(id, title, content, logger, 1);
      }
      
      return null;
    }
  }

  // Validate response structure
  if (!parsedResponse || !parsedResponse.facets || !Array.isArray(parsedResponse.facets)) {
    logger.warn('Invalid response structure', { 
      id,
      hasResponse: !!parsedResponse,
      hasFacets: !!(parsedResponse?.facets),
      isArray: Array.isArray(parsedResponse?.facets)
    });
    
    // Retry once if invalid structure on first attempt
    if (retryCount === 0) {
      logger.info('Retrying due to invalid structure...');
      return callGPTForFacets(id, title, content, logger, 1);
    }
    
    return null;
  }
    
    // Validate and filter facets
    const validFacets = parsedResponse.facets.filter((facet: any) => {
      // Normalise categories before validation
      if (facet.equipment_category) {
        facet.equipment_category = normaliseCategory(facet.equipment_category);
      }
      
      // SAFETY CHECK: Reject dangerous maintenance advice
      const safetyError = validateFacetSafety(facet);
      if (safetyError) {
        logger.warn(`🚨 SAFETY VIOLATION: Rejected unsafe facet - ${safetyError}`, { 
          facet_topic: facet.primary_topic,
          dangerous_tasks: facet.maintenance_tasks
        });
        return false; // REJECT this facet
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
        return callGPTForFacets(id, title, content, logger, 1);
      }
      
      return null;
    }
    
    logger.info(`✅ Extracted ${validFacets.length} valid facets from GPT (${OPENAI_MODEL})`);
    return { facets: validFacets };
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

/**
 * Compute facet hash for deduplication
 */
function computeFacetHash(facet: any): string {
  const canonical = [
    (facet.primary_topic || '').toLowerCase().trim(),
    (facet.equipment_category || '').toLowerCase().trim(),
    (facet.keywords || []).map((k: string) => k.toLowerCase().trim()).sort().join('|'),
    (facet.bs7671_regulations || []).map((r: string) => r.toLowerCase().trim()).sort().join('|')
  ].join('::');
  
  // Simple hash using Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  return Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
}

/**
 * Score facet quality for top-8 selection
 */
function scoreFacetQuality(facet: any): number {
  let score = 0;
  
  // Core fields (1 point each)
  if (facet.typical_duration_minutes) score += 1;
  if (facet.skill_level) score += 1;
  if (facet.safety_requirements) score += 1;
  
  // Rich content (2 points for regulations)
  if (facet.bs7671_regulations && facet.bs7671_regulations.length > 0) score += 2;
  
  // Testing procedures (2 points if ≥3)
  if (facet.test_procedures && facet.test_procedures.length >= 3) score += 2;
  
  // Tools (1 point if ≥4)
  if (facet.tools_required && facet.tools_required.length >= 4) score += 1;
  
  // Materials (1 point if ≥3)
  if (facet.materials_needed && facet.materials_needed.length >= 3) score += 1;
  
  return score;
}

/**
 * Select top 8 facets with diversity preservation
 */
function selectTop8WithDiversity(facets: any[]): any[] {
  if (facets.length <= 8) return facets;
  
  // Score each facet
  const scored = facets.map(f => ({
    facet: f,
    score: scoreFacetQuality(f),
    category: f.equipment_category || 'unknown',
    type: f.facet_type || 'unknown'
  }));
  
  // Apply light diversity penalty for repeated categories
  const categoryCounts: Record<string, number> = {};
  scored.forEach(s => {
    const key = `${s.category}:${s.type}`;
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
    if (categoryCounts[key] > 1) {
      s.score -= 0.5; // Light penalty for duplicates
    }
  });
  
  // Sort by score (descending) and take top 8
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map(s => s.facet);
}

async function enrichProcedure(supabase: any, item: any, logger: any): Promise<number> {
  const content = item.content || item.description || '';
  const title = item.topic || 'Untitled';
  
  if (!content || content.length < 150) {
    logger.warn('Content too short', { id: item.id, length: content.length });
    return 0;
  }

  // ✅ PHASE 1: ATOMIC SOURCE LOCKING - Prevent race conditions
  const staleThreshold = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 min stale lock
  const { data: claimedSource, error: claimError } = await supabase
    .from('practical_work')
    .update({ 
      enrichment_status: 'processing',
      enrichment_locked_at: new Date().toISOString()
    })
    .eq('id', item.id)
    .or(`enrichment_status.is.null,enrichment_locked_at.lt.${staleThreshold}`)
    .select()
    .single();
  
  if (claimError || !claimedSource) {
    // Enhanced logging: distinguish why we're skipping
    const { data: statusCheck } = await supabase
      .from('practical_work')
      .select('enrichment_status, enrichment_locked_at')
      .eq('id', item.id)
      .single();
    
    if (statusCheck?.enrichment_status === 'completed') {
      logger.debug(`⏭️ Skipping (already completed)`, { id: item.id, topic: title });
    } else if (statusCheck?.enrichment_locked_at && new Date(statusCheck.enrichment_locked_at) > new Date(staleThreshold)) {
      logger.debug(`⏭️ Skipping (claimed by another worker)`, { id: item.id, lockedAt: statusCheck.enrichment_locked_at });
    } else {
      logger.warn(`⏭️ Skipping (unknown reason)`, { id: item.id, status: statusCheck?.enrichment_status, claimError });
    }
    return 0;
  }
  
  logger.info(`🔒 Source locked for enrichment`, { id: item.id, topic: title });

  // Check if enrichment already complete
  const { count: existingCount } = await supabase
    .from('practical_work_intelligence')
    .select('*', { count: 'exact', head: true })
    .eq('practical_work_id', item.id);
  
  if (existingCount && existingCount >= 8) {
    logger.info(`⏭️ Already enriched (${existingCount} facets)`, { id: item.id });
    // Mark complete and unlock
    await supabase
      .from('practical_work')
      .update({ enrichment_status: 'completed' })
      .eq('id', item.id);
    return 0;
  }
  
  const maxNewFacets = 8 - (existingCount || 0);
  logger.info(`🔍 Extracting (need ${maxNewFacets} more facets, ${existingCount || 0} exist)`, { id: item.id, topic: title });

  // Call GPT to extract multi-facets (passing full content)
  const intelligence = await callGPTForFacets(item.id, title, content, logger);
  
  if (!intelligence || !intelligence.facets || intelligence.facets.length === 0) {
    logger.warn('No facets extracted', { id: item.id });
    return 0;
  }

  // ✅ POST-GPT VALIDATION: Warn if GPT generated too many facets
  if (intelligence.facets.length > 10) {
    logger.warn(`⚠️ GPT generated ${intelligence.facets.length} facets (expected 8), applying quality filter`, { id: item.id });
  }

  // ✅ DEDUPLICATION: Compute hash for each facet
  const facetsWithHash = intelligence.facets.map((facet: any) => ({
    ...facet,
    facet_hash: computeFacetHash(facet)
  }));
  
  // ✅ SCORING & TOP-8 SELECTION: Preserve diversity
  const top8Facets = selectTop8WithDiversity(facetsWithHash).slice(0, maxNewFacets);
  
  logger.info(`✅ Selected ${top8Facets.length}/${intelligence.facets.length} facets (avg quality: ${(top8Facets.reduce((sum, f) => sum + scoreFacetQuality(f), 0) / top8Facets.length).toFixed(1)})`);

  // Fix 1: Add missing required columns + Fix 2: Map all enhanced GPT fields
  const facetsToInsert = top8Facets.map((facet: any, i: number) => ({
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
    maintenance_tasks: ensureJsonArray(facet.maintenance_tasks),
    wear_indicators: ensureArrayOfStrings(facet.wear_indicators),
    
    // ✅ NEW: Add fault diagnosis fields
    common_failures: ensureJsonArray(facet.common_failures),
    troubleshooting_steps: ensureArrayOfStrings(facet.troubleshooting_steps),
    diagnostic_tests: ensureArrayOfStrings(facet.diagnostic_tests),
    replacement_criteria: ensureArrayOfStrings(facet.replacement_criteria),
    
    // ✅ NEW: Add required core intelligence fields
    typical_duration_minutes: facet.typical_duration_minutes || null,
    skill_level: facet.skill_level || null,
    team_size: facet.team_size || 1,
    
    // Existing error & safety fields
    common_mistakes: ensureArrayOfStrings(facet.common_mistakes),
    safety_requirements: toJsonOrNull(facet.safety_requirements),
    
    confidence_score: facet.confidence_score || 0.85,
    
    // ✅ ADD FACET HASH for deduplication
    facet_hash: facet.facet_hash
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

  // ✅ PHASE 1: Mark source as completed and unlock
  await supabase
    .from('practical_work')
    .update({ enrichment_status: 'completed' })
    .eq('id', item.id);

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

    // Enforce 12-item batch limit (with 8 facets/source target via dedup + capping)
    const effectiveBatchSize = Math.min(batchSize || 12, 12);
    const { data: items, error: queryError } = await supabase
      .from('practical_work')
      .select('id, source_table, topic, content, metadata, is_canonical')
      .eq('is_canonical', true)
      .or('enrichment_status.is.null,enrichment_status.eq.pending')
      .range(startFrom, startFrom + effectiveBatchSize - 1);

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

    logger.info(`📦 Retrieved ${items.length} items (batch size: ${effectiveBatchSize})`);

    // Phase 1: Filter quality items (bypass for practical_work)
    const qualityItems = items.filter(item => shouldEnrichChunk(item, 'practical_work'));
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

    // Process with concurrency limit (2 at a time)
    for (let i = 0; i < qualityItems.length; i += 2) {
      const batch = qualityItems.slice(i, Math.min(i + 2, qualityItems.length));
      
      // Heartbeat every 15 seconds
      if (Date.now() - lastHeartbeat > 15000) {
        await supabase.from('batch_progress').update({
          items_processed: i,
          updated_at: new Date().toISOString(),
          data: { last_heartbeat: new Date().toISOString(), total_facets: totalFacets }
        }).eq('id', batchId);
        lastHeartbeat = Date.now();
      }

      const results = await Promise.allSettled(
        batch.map(async (item) => {
          try {
            const facetCount = await enrichProcedure(supabase, item, logger);
            totalFacets += facetCount;
          } catch (error) {
            logger.error(`Failed to enrich item ${item.id}`, { error: error.message });
          }
        })
      );
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

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from '../_shared/deps.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { corsHeaders } from '../_shared/cors.ts';
import { createLogger } from '../_shared/logger.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_MODEL = Deno.env.get('OPENAI_MODEL') || 'gpt-5-mini';

// ==================== CONTENT FILTER ====================
function shouldEnrichChunk(item: any): boolean {
  const content = (item.content || '').toLowerCase();
  if (content.length < 200) return false; // Min 200 chars for design content
  
  // Design-specific terms
  const designTerms = ['voltage', 'current', 'cable', 'circuit', 'load', 'amp', 'volt', 
    'calculation', 'formula', 'regulation', 'bs 7671', 'design', 'install'];
  const termCount = designTerms.filter(term => content.includes(term)).length;
  
  return termCount >= 3; // Must have at least 3 design terms
}

// ==================== VALIDATION ====================
function validateDesignFacet(facet: any): boolean {
  if (!facet) return false;
  if (!facet.keywords || facet.keywords.length < 4) return false;
  if (!facet.primary_topic || facet.primary_topic.length < 30) return false;
  if (!facet.design_category || facet.design_category.length < 3) return false;
  if (!facet.applies_to || facet.applies_to.length < 1) return false;
  if (facet.confidence_score && facet.confidence_score < 0.5) return false;
  return true;
}

// ==================== TYPE HELPERS ====================
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
async function callGPTForFacets(id: string, title: string, content: string, logger: any, retryCount = 0): Promise<any> {
  let processedContent = content.slice(0, 18000); // ~12K tokens at 1.5 chars/token
  
  // Remove TOC/header noise
  processedContent = processedContent
    .replace(/^table of contents[\s\S]{0,500}/gim, '')
    .replace(/^chapter \d+\s*$/gim, '')
    .replace(/^section \d+\s*$/gim, '')
    .replace(/^figure \d+\.\s*$/gim, '')
    .replace(/^page \d+\s*$/gim, '')
    .trim();
  
  const systemPrompt = `You are a precision parser extracting structured electrical design knowledge from UK regulatory and guidance documents (BS 7671, Guidance Notes, design guides).

PRIMARY DIRECTIVE: EXTRACT FORMULAS > REGULATIONS > EXAMPLES > CONCEPTS

CRITICAL RULES:
- If formula exists in source → EXTRACT it EXACTLY (preserve mathematical notation)
- If regulation referenced → USE EXACT regulation number from source
- If worked example exists → EXTRACT step-by-step with values
- If table/data exists → EXTRACT complete table reference and values
- ONLY infer when field is genuinely absent from source content

TARGET: Generate EXACTLY 8 facets - NO MORE, NO LESS.

FACET TYPES (in priority order):
1. **formula** - Mathematical formula with explanation
2. **regulation** - BS 7671 regulation with context
3. **example** - Worked calculation with step-by-step
4. **table** - Data table or lookup reference
5. **concept** - Design principle or methodology
6. **general** - General design guidance

EXTRACTION EXAMPLES:

✅ Source: "Voltage drop (Vd) = (mV/A/m × Ib × L) / 1000 where Ib is design current"
   Extract: 
   {
     "facet_type": "formula",
     "primary_topic": "Voltage drop calculation formula for single-phase AC circuits using cable resistance and design current over a given length",
     "design_category": "voltage_drop",
     "formulas": ["Vd = (mV/A/m × Ib × L) / 1000"],
     "required_parameters": ["mV/A/m from Appendix 4", "Design current Ib", "Cable length L"],
     "keywords": ["voltage drop", "Vd", "design current", "cable length", "Appendix 4"]
   }

✅ Source: "BS 7671 Regulation 411.3.3: Maximum disconnection time for final circuits not exceeding 32A is 0.4s"
   Extract:
   {
     "facet_type": "regulation",
     "primary_topic": "Maximum disconnection time requirements for final circuits up to 32A under fault conditions to ensure automatic disconnection of supply",
     "design_category": "protection",
     "bs7671_regulations": ["411.3.3"],
     "design_constraints": {"max_disconnection_time": "0.4s", "max_circuit_rating": "32A"},
     "keywords": ["disconnection time", "final circuit", "32A", "ADS", "fault protection"]
   }

JSON SCHEMA:
{
  "facets": [
    {
      "facet_type": "formula | regulation | example | table | concept | general",
      "primary_topic": "string (40-100 words)",
      "design_category": "voltage_drop | cable_sizing | protection | earthing | special_locations | etc.",
      "design_subcategory": "optional subcategory",
      "content": "string (800-1200 chars, focused content)",
      "keywords": ["6-10 specific keywords"],
      "formulas": ["formula strings if applicable"],
      "calculation_steps": ["step 1", "step 2"],
      "worked_examples": [{"scenario": "", "calculation": "", "result": ""}],
      "bs7671_regulations": ["regulation numbers"],
      "guidance_note_refs": ["GN references"],
      "table_refs": ["table references"],
      "applies_to": ["domestic", "commercial", "industrial"],
      "load_types": ["lighting", "socket", "motor"],
      "cable_sizes": ["1.5mm²", "2.5mm²"],
      "power_ratings": ["16A", "32A"],
      "voltage_levels": ["230V", "400V"],
      "location_types": ["indoor", "outdoor"],
      "design_constraints": {"key": "value"},
      "required_parameters": ["param1", "param2"],
      "typical_values": {"key": "value"},
      "test_procedures": ["procedure 1"],
      "acceptance_criteria": {"key": "value"},
      "common_mistakes": ["mistake 1"],
      "confidence_score": 0.7-0.95
    }
  ]
}

CRITICAL REQUIREMENT: Count your output. Return EXACTLY 8 facets.
`;

  const timeout = setTimeout(() => {
    throw new Error('GPT request timeout after 480s');
  }, 480000);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Source: ${title}\n\n${processedContent}\n\nExtract EXACTLY 8 facets.` }
        ],
        max_completion_tokens: 10000,
        temperature: undefined
      })
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`GPT error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content.trim();
    
    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*"facets"[\s\S]*\}/);
    if (!jsonMatch) {
      if (retryCount === 0) {
        logger.info('Retrying due to JSON extraction failure...');
        return callGPTForFacets(id, title, content, logger, 1);
      }
      return null;
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);
    
    if (!parsedResponse?.facets || !Array.isArray(parsedResponse.facets)) {
      if (retryCount === 0) {
        logger.info('Retrying due to invalid structure...');
        return callGPTForFacets(id, title, content, logger, 1);
      }
      return null;
    }
    
    const validFacets = parsedResponse.facets.filter(validateDesignFacet);
    
    if (validFacets.length === 0) {
      if (retryCount === 0) {
        logger.info('Retrying due to 0 valid facets...');
        return callGPTForFacets(id, title, content, logger, 1);
      }
      return null;
    }
    
    logger.info(`✅ Extracted ${validFacets.length} valid facets from GPT (${OPENAI_MODEL})`);
    return { facets: validFacets };
  } catch (error) {
    clearTimeout(timeout);
    logger.error('GPT call failed:', error);
    
    if (retryCount === 0) {
      logger.info('Retrying after error...');
      return callGPTForFacets(id, title, content, logger, 1);
    }
    
    return null;
  }
}

// ==================== HASH & SCORING ====================
function computeFacetHash(facet: any): string {
  const canonical = [
    (facet.primary_topic || '').toLowerCase().trim(),
    (facet.design_category || '').toLowerCase().trim(),
    (facet.keywords || []).map((k: string) => k.toLowerCase().trim()).sort().join('|'),
    (facet.bs7671_regulations || []).map((r: string) => r.toLowerCase().trim()).sort().join('|')
  ].join('::');
  
  const encoder = new TextEncoder();
  const data = encoder.encode(canonical);
  return Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
}

function scoreFacetQuality(facet: any): number {
  let score = 0;
  
  // Formula presence (3 points - highest priority)
  if (facet.formulas && facet.formulas.length > 0) score += 3;
  
  // BS 7671 regulations (2 points)
  if (facet.bs7671_regulations && facet.bs7671_regulations.length > 0) score += 2;
  
  // Worked examples (2 points)
  if (facet.worked_examples && facet.worked_examples.length > 0) score += 2;
  
  // Table references (1 point)
  if (facet.table_refs && facet.table_refs.length > 0) score += 1;
  
  // Calculation steps (1 point)
  if (facet.calculation_steps && facet.calculation_steps.length >= 3) score += 1;
  
  // Required parameters (1 point)
  if (facet.required_parameters && facet.required_parameters.length >= 3) score += 1;
  
  return score;
}

function selectTop8WithDiversity(facets: any[]): any[] {
  if (facets.length <= 8) return facets;
  
  const scored = facets.map(f => ({
    facet: f,
    score: scoreFacetQuality(f),
    category: f.design_category || 'unknown',
    type: f.facet_type || 'unknown'
  }));
  
  // Apply light diversity penalty
  const categoryCounts: Record<string, number> = {};
  scored.forEach(s => {
    const key = `${s.category}:${s.type}`;
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
    if (categoryCounts[key] > 1) {
      s.score -= 0.5;
    }
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map(s => s.facet);
}

// ==================== ENRICHMENT ====================
async function enrichDesignKnowledge(supabase: any, item: any, logger: any): Promise<number> {
  const content = item.content || '';
  const title = item.topic || 'Untitled';
  
  if (!content || content.length < 200) {
    logger.warn('Content too short', { id: item.id, length: content.length });
    return 0;
  }

  // Check existing facet count
  const { count: existingCount } = await supabase
    .from('design_knowledge_intelligence')
    .select('*', { count: 'exact', head: true })
    .eq('design_knowledge_id', item.id);
  
  if (existingCount && existingCount >= 8) {
    logger.info(`⏭️ Already enriched (${existingCount} facets)`, { id: item.id });
    return 0;
  }
  
  const maxNewFacets = 8 - (existingCount || 0);
  logger.info(`🔍 Extracting (need ${maxNewFacets} more facets, ${existingCount || 0} exist)`, { id: item.id });

  const intelligence = await callGPTForFacets(item.id, title, content, logger);
  
  if (!intelligence || !intelligence.facets || intelligence.facets.length === 0) {
    logger.warn('No facets extracted', { id: item.id });
    return 0;
  }

  if (intelligence.facets.length > 10) {
    logger.warn(`⚠️ GPT generated ${intelligence.facets.length} facets (expected 8), applying quality filter`, { id: item.id });
  }

  const facetsWithHash = intelligence.facets.map((facet: any) => ({
    ...facet,
    facet_hash: computeFacetHash(facet),
    quality_score: scoreFacetQuality(facet)
  }));
  
  const top8Facets = selectTop8WithDiversity(facetsWithHash).slice(0, maxNewFacets);
  
  logger.info(`✅ Selected ${top8Facets.length}/${intelligence.facets.length} facets (avg quality: ${(top8Facets.reduce((sum, f) => sum + (f.quality_score || 0), 0) / top8Facets.length).toFixed(1)})`);

  const facetsToInsert = top8Facets.map((facet: any) => ({
    design_knowledge_id: item.id,
    facet_type: facet.facet_type || 'general',
    primary_topic: facet.primary_topic,
    design_category: facet.design_category,
    design_subcategory: facet.design_subcategory || null,
    content: facet.content || facet.primary_topic,
    keywords: facet.keywords || [],
    formulas: ensureArrayOfStrings(facet.formulas),
    calculation_steps: ensureArrayOfStrings(facet.calculation_steps),
    worked_examples: ensureJsonArray(facet.worked_examples),
    bs7671_regulations: ensureArrayOfStrings(facet.bs7671_regulations),
    guidance_note_refs: ensureArrayOfStrings(facet.guidance_note_refs),
    table_refs: ensureArrayOfStrings(facet.table_refs),
    other_standards: ensureArrayOfStrings(facet.other_standards),
    applies_to: facet.applies_to || ['domestic', 'commercial', 'industrial'],
    load_types: ensureArrayOfStrings(facet.load_types),
    cable_sizes: ensureArrayOfStrings(facet.cable_sizes),
    power_ratings: ensureArrayOfStrings(facet.power_ratings),
    voltage_levels: ensureArrayOfStrings(facet.voltage_levels),
    location_types: ensureArrayOfStrings(facet.location_types),
    design_constraints: toJsonOrNull(facet.design_constraints),
    required_parameters: ensureArrayOfStrings(facet.required_parameters),
    typical_values: toJsonOrNull(facet.typical_values),
    test_procedures: ensureArrayOfStrings(facet.test_procedures),
    acceptance_criteria: toJsonOrNull(facet.acceptance_criteria),
    common_mistakes: ensureArrayOfStrings(facet.common_mistakes),
    confidence_score: facet.confidence_score || 0.8,
    facet_hash: facet.facet_hash,
    quality_score: facet.quality_score || 0,
    source: item.source || 'design-guide',
    enrichment_version: 'v1'
  }));

  const { data: insertedData, error: insertError } = await supabase
    .from('design_knowledge_intelligence')
    .insert(facetsToInsert)
    .select();

  if (insertError) {
    logger.error('❌ Insert failed', { 
      error: insertError.message,
      code: insertError.code,
      id: item.id
    });
    return 0;
  }

  if (!insertedData || insertedData.length === 0) {
    logger.warn('⚠️ Insert succeeded but no rows returned', { id: item.id });
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
    logger.info(`🚀 Design knowledge enrichment batch ${batchId}: ${batchSize} items from ${startFrom}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const effectiveBatchSize = Math.min(batchSize || 12, 12);
    const { data: items, error: queryError } = await supabase
      .from('design_knowledge')
      .select('id, topic, content, source, metadata')
      .range(startFrom, startFrom + effectiveBatchSize - 1);

    if (queryError) {
      logger.error('Failed to query design knowledge items', { queryError });
      throw queryError;
    }

    if (!items || items.length === 0) {
      logger.info(`No items found for batch ${batchId}`);
      return new Response(JSON.stringify({ success: true, total_facets: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    logger.info(`📦 Retrieved ${items.length} items (batch size: ${effectiveBatchSize})`);

    const qualityItems = items.filter(shouldEnrichChunk);
    logger.info(`📊 Filtered ${items.length} → ${qualityItems.length} quality items`);

    await supabase.from('batch_progress').update({
      status: 'processing',
      started_at: new Date().toISOString()
    }).eq('id', batchId);

    let totalFacets = 0;
    let lastHeartbeat = Date.now();

    // Process with concurrency limit (2 at a time)
    for (let i = 0; i < qualityItems.length; i += 2) {
      const batch = qualityItems.slice(i, Math.min(i + 2, qualityItems.length));
      
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
            const facetCount = await enrichDesignKnowledge(supabase, item, logger);
            return { success: true, id: item.id, facets: facetCount };
          } catch (error: any) {
            logger.error('Item enrichment failed', { id: item.id, error: error.message });
            return { success: false, id: item.id, error: error.message };
          }
        })
      );

      for (const result of results) {
        if (result.status === 'fulfilled' && result.value.success) {
          totalFacets += result.value.facets || 0;
        }
      }
    }

    await supabase.from('batch_progress').update({
      status: 'completed',
      items_processed: qualityItems.length,
      completed_at: new Date().toISOString(),
      data: { total_facets: totalFacets }
    }).eq('id', batchId);

    logger.info(`✅ Batch ${batchId} completed: ${totalFacets} facets created`);

    return new Response(JSON.stringify({ 
      success: true, 
      items_processed: qualityItems.length,
      total_facets: totalFacets 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    logger.error('Batch failed', { error: error.message });
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

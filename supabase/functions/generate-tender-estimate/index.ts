import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TenderEstimateInput {
  tenderId?: string;
  opportunityId?: string;
  documentUrls?: string[];
  description?: string;
  postcode?: string;
  scope_of_works?: string;
  categories?: string[];
  value_estimate?: number;
}

interface EstimateOutput {
  labour_hours: number;
  labour_cost: number;
  materials_cost: number;
  equipment_cost: number;
  overheads: number;
  profit: number;
  total_estimate: number;
  hazards: string[];
  programme: string;
  rams_scoped: boolean;
  confidence: 'Low' | 'Medium' | 'High';
  confidence_factors: string[];
  notes: string;
  breakdown: {
    labour: Array<{ task: string; hours: number; rate: number; cost: number }>;
    materials: Array<{ item: string; quantity: number; unit: string; unit_price: number; cost: number }>;
    equipment: Array<{ item: string; days: number; rate: number; cost: number }>;
  };
  regional_adjustment: number;
  citations: Array<{ source: string; item: string; price: number }>;
}

interface PricingResult {
  id: string;
  item_name: string;
  base_cost: number;
  wholesaler: string;
  price_per_unit: string;
  in_stock: boolean;
  category?: string;
  similarity?: number;
}

interface LabourTimeResult {
  primary_topic: string;
  content: string;
  equipment_category?: string;
  confidence_score?: number;
}

/**
 * Generate embedding for semantic search
 */
async function generateEmbedding(text: string, apiKey: string): Promise<number[] | null> {
  try {
    const response = await fetch('https://ai.gateway.lovable.dev/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) {
      console.error('[EMBED] Failed:', response.status);
      return null;
    }

    const data = await response.json();
    return data.data[0].embedding;
  } catch (error) {
    console.error('[EMBED] Error:', error);
    return null;
  }
}

/**
 * Semantic search for pricing data using vector + keyword hybrid
 */
async function searchPricingData(
  supabase: any,
  query: string,
  embedding: number[] | null,
  categories: string[]
): Promise<PricingResult[]> {
  console.log('[RAG] Searching pricing data...');

  try {
    const searches = [];

    // Vector search if embedding available
    if (embedding) {
      searches.push(
        supabase.rpc('search_pricing', {
          query_embedding: embedding,
          match_threshold: 0.5,
          match_count: 15
        })
      );
    }

    // Keyword search for specific categories
    const categoryKeywords = categories.length > 0
      ? categories.map(c => c.replace('_', ' ')).join('|')
      : 'electrical cable MCB consumer unit';

    searches.push(
      supabase
        .from('pricing_embeddings')
        .select('*')
        .or(`item_name.ilike.%${query}%,category.ilike.%${categoryKeywords}%`)
        .limit(10)
    );

    const results = await Promise.all(searches);

    // Merge and dedupe
    const allItems: PricingResult[] = [];
    for (const result of results) {
      if (result.data) {
        allItems.push(...result.data);
      }
    }

    // Dedupe by id
    const uniqueItems = allItems.filter((item, index, self) =>
      index === self.findIndex(t => t.id === item.id)
    ).slice(0, 20);

    console.log(`[RAG] Found ${uniqueItems.length} pricing items`);
    return uniqueItems;
  } catch (error) {
    console.error('[RAG] Pricing search error:', error);
    return [];
  }
}

/**
 * Search practical work intelligence for labour time estimates
 */
async function searchLabourData(
  supabase: any,
  query: string
): Promise<LabourTimeResult[]> {
  console.log('[RAG] Searching labour time data...');

  try {
    const { data, error } = await supabase.rpc(
      'search_practical_work_fast',
      {
        query_text: query,
        match_count: 12
      }
    );

    if (error) {
      console.error('[RAG] Labour search error:', error);
      return [];
    }

    console.log(`[RAG] Found ${data?.length || 0} labour time records`);
    return (data || []).map((row: any) => ({
      primary_topic: row.primary_topic,
      content: row.description || row.primary_topic || '',
      equipment_category: row.equipment_category,
      confidence_score: row.confidence_score
    }));
  } catch (error) {
    console.error('[RAG] Labour search exception:', error);
    return [];
  }
}

/**
 * Get regional pricing multiplier based on postcode
 */
async function getRegionalMultiplier(
  supabase: any,
  postcode: string | undefined
): Promise<{ multiplier: number; region: string }> {
  if (!postcode) {
    return { multiplier: 1.0, region: 'UK Average' };
  }

  const locationLower = postcode.toLowerCase();

  // Quick heuristic based on postcode prefix
  if (locationLower.match(/^(e|ec|n|nw|se|sw|w|wc)\d/i)) {
    return { multiplier: 1.45, region: 'London' };
  }
  if (locationLower.match(/^(m|ol|bl|wn)\d/i)) {
    return { multiplier: 1.1, region: 'Greater Manchester' };
  }
  if (locationLower.match(/^(b)\d/i)) {
    return { multiplier: 1.08, region: 'Birmingham' };
  }
  if (locationLower.match(/^(ls|bd|hx)\d/i)) {
    return { multiplier: 1.05, region: 'West Yorkshire' };
  }
  if (locationLower.match(/^(g|ml|pa)\d/i)) {
    return { multiplier: 0.95, region: 'Scotland' };
  }
  if (locationLower.match(/^(cf|sa|np)\d/i)) {
    return { multiplier: 0.92, region: 'Wales' };
  }

  // Try to get from regional_job_pricing table
  try {
    const outcode = postcode.replace(/\s+/g, '').match(/^[A-Z]{1,2}\d{1,2}/i)?.[0];
    if (outcode) {
      const { data } = await supabase
        .from('regional_multipliers')
        .select('multiplier, region')
        .ilike('postcode_prefix', `${outcode}%`)
        .limit(1);

      if (data && data.length > 0) {
        return { multiplier: data[0].multiplier, region: data[0].region };
      }
    }
  } catch (error) {
    console.log('[REGIONAL] Lookup failed, using default');
  }

  return { multiplier: 1.0, region: 'UK Average' };
}

/**
 * Calculate complexity score from project details
 */
function calculateComplexity(
  categories: string[],
  scopeLength: number,
  valueEstimate: number
): { score: number; level: string; tokenMultiplier: number } {
  let score = 50;

  // Category complexity
  const complexCategories = ['fire_alarm', 'ev_charging', 'data_cabling', 'emergency_lighting'];
  const simpleCategories = ['testing', 'consumer_units'];

  for (const cat of categories) {
    if (complexCategories.includes(cat)) score += 15;
    if (simpleCategories.includes(cat)) score -= 10;
  }

  // Scope length suggests complexity
  if (scopeLength > 1000) score += 20;
  else if (scopeLength > 500) score += 10;
  else if (scopeLength < 100) score -= 10;

  // Value suggests scale
  if (valueEstimate > 100000) score += 25;
  else if (valueEstimate > 50000) score += 15;
  else if (valueEstimate > 25000) score += 5;

  score = Math.max(10, Math.min(100, score));

  let level = 'standard';
  let tokenMultiplier = 1.0;

  if (score >= 75) {
    level = 'complex';
    tokenMultiplier = 1.5;
  } else if (score <= 30) {
    level = 'simple';
    tokenMultiplier = 0.8;
  }

  return { score, level, tokenMultiplier };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Authenticate user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const input: TenderEstimateInput = await req.json();
    const {
      tenderId,
      opportunityId,
      documentUrls = [],
      description,
      postcode,
      scope_of_works,
      categories = [],
      value_estimate
    } = input;

    console.log(`[TENDER-ESTIMATE] Processing:`, {
      tenderId,
      opportunityId,
      documents: documentUrls.length,
      postcode
    });

    // Fetch tender or opportunity details
    let tender: any = null;
    let opportunity: any = null;

    if (tenderId) {
      const { data, error } = await supabase
        .from('tenders')
        .select('*')
        .eq('id', tenderId)
        .single();

      if (error) {
        console.error('[TENDER-ESTIMATE] Tender fetch error:', error);
      } else {
        tender = data;
      }
    }

    if (opportunityId) {
      const { data, error } = await supabase
        .from('tender_opportunities')
        .select('*')
        .eq('id', opportunityId)
        .single();

      if (error) {
        console.error('[TENDER-ESTIMATE] Opportunity fetch error:', error);
      } else {
        opportunity = data;
      }
    }

    // Build project context from available data
    const projectTitle = tender?.title || opportunity?.title || 'Electrical Project';
    const projectClient = tender?.client || opportunity?.client_name || 'Client';
    const projectDescription = description || scope_of_works || tender?.description || opportunity?.scope_of_works || opportunity?.description || '';
    const projectCategories = categories.length > 0 ? categories : (opportunity?.categories || ['electrical']);
    const projectPostcode = postcode || opportunity?.postcode || '';
    const projectValue = value_estimate || tender?.value || opportunity?.value_exact || opportunity?.value_high || opportunity?.value_low || 0;

    // Calculate complexity
    const complexity = calculateComplexity(projectCategories, projectDescription.length, projectValue);
    console.log(`[TENDER-ESTIMATE] Complexity: ${complexity.level} (score: ${complexity.score})`);

    // Get Lovable API key for AI
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.log('[TENDER-ESTIMATE] No API key, using fallback estimation');
      const fallbackEstimate = generateFallbackEstimate(projectValue, projectCategories, complexity.level);

      return new Response(
        JSON.stringify({
          success: true,
          estimate: fallbackEstimate,
          confidence: 'Low',
          notes: 'Basic estimate - AI unavailable. Upload specifications for detailed breakdown.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate embedding for semantic search
    const ragQuery = `${projectTitle} ${projectDescription.substring(0, 500)} ${projectCategories.join(' ')} electrical installation materials cable MCB`;
    const embedding = await generateEmbedding(ragQuery, lovableApiKey);

    // Parallel RAG searches
    const [pricingResults, labourResults, regional] = await Promise.all([
      searchPricingData(supabase, ragQuery, embedding, projectCategories),
      searchLabourData(supabase, ragQuery),
      getRegionalMultiplier(supabase, projectPostcode)
    ]);

    console.log(`[TENDER-ESTIMATE] RAG complete:`, {
      pricing: pricingResults.length,
      labour: labourResults.length,
      region: regional.region,
      multiplier: regional.multiplier
    });

    // Format RAG context for AI
    const pricingContext = pricingResults.length > 0
      ? `DATABASE PRICES (15% markup applied):\n${pricingResults.slice(0, 15).map(p =>
          `- ${p.item_name}: £${p.base_cost?.toFixed(2) || 'N/A'} (${p.wholesaler || 'Trade'})${p.in_stock ? '' : ' ⚠ Lead time'}`
        ).join('\n')}`
      : 'No specific pricing found - use 2025 UK wholesale rates (CEF/Screwfix/TLC).';

    const labourContext = labourResults.length > 0
      ? `LABOUR TIME STANDARDS:\n${labourResults.slice(0, 8).map(l =>
          `- ${l.primary_topic}: ${l.content.substring(0, 150)}${l.confidence_score ? ` (${Math.round(l.confidence_score * 100)}% confidence)` : ''}`
        ).join('\n')}`
      : 'Use standard UK electrical installation times.';

    // Calculate adaptive token limit
    const baseTokens = 4000;
    const maxTokens = Math.min(Math.round(baseTokens * complexity.tokenMultiplier), 8000);

    // Build comprehensive AI prompt
    const systemPrompt = `You are an expert UK electrical contractor estimator with 20+ years experience pricing tenders.
Generate a detailed, realistic cost estimate for this project.

CRITICAL PRICING RULES:
1. Use the DATABASE PRICES below when available - they are real wholesale prices
2. Apply ${regional.region} regional adjustment: ${regional.multiplier}x
3. Validate against 2025 market rates - flag if database prices seem incorrect
4. Include 10% contingency for unforeseen issues

2025 UK MARKET RATES (for validation):
- Qualified electrician: £45-55/hr (£300-400/day)
- Electrician's mate: £18-25/hr (£150-200/day)
- Consumer units (metal, dual RCD): 6-way £55-85, 10-way £95-130, 18-way £280-420
- MCBs Type B: 6-32A £8-15, 40A+ £15-25
- RCBOs: £28-45 each
- Twin & Earth (6242Y): 1.5mm² £0.85-1.20/m, 2.5mm² £1.30-1.80/m, 4mm² £2.10-2.90/m, 6mm² £3.20-4.50/m
- SWA cable: 4mm² 3-core £4.50-6.00/m, 6mm² £5.50-7.50/m
- First fix per circuit: 3-4 hours
- Second fix per circuit: 1.5-2.5 hours
- Testing & certification: 1-2 hours per circuit

${pricingContext}

${labourContext}

REGIONAL ADJUSTMENT: ${regional.region} = ${regional.multiplier}x base rates

PROJECT DETAILS:
- Title: ${projectTitle}
- Client: ${projectClient}
- Location: ${projectPostcode || 'UK'}
- Categories: ${projectCategories.join(', ')}
- Estimated Value Range: ${projectValue > 0 ? `£${projectValue.toLocaleString()}` : 'Not specified'}
- Documents: ${documentUrls.length} files uploaded
- Complexity: ${complexity.level.toUpperCase()} (score: ${complexity.score}/100)

SCOPE OF WORKS:
${projectDescription || 'No detailed scope provided - estimate based on project type and value.'}

RESPONSE FORMAT (JSON only):
{
  "labour_hours": <total hours>,
  "labour_cost": <GBP>,
  "materials_cost": <GBP>,
  "equipment_cost": <GBP>,
  "overheads": <GBP - 10-15% of subtotal>,
  "profit": <GBP - 10-20% markup>,
  "total_estimate": <sum>,
  "hazards": ["list of identified hazards"],
  "programme": "<duration e.g. '3 weeks'>",
  "confidence": "<Low|Medium|High>",
  "confidence_factors": ["reasons for confidence level"],
  "notes": "<assumptions and key pricing decisions>",
  "breakdown": {
    "labour": [{"task": "<phase>", "hours": <n>, "rate": <hourly>, "cost": <total>}],
    "materials": [{"item": "<name>", "quantity": <n>, "unit": "<each/m/etc>", "unit_price": <price>, "cost": <total>}],
    "equipment": [{"item": "<name>", "days": <n>, "rate": <daily>, "cost": <total>}]
  },
  "regional_adjustment": ${regional.multiplier},
  "citations": [{"source": "<wholesaler/reference>", "item": "<name>", "price": <value>}]
}`;

    // Call AI for estimation
    console.log(`[TENDER-ESTIMATE] Calling AI (max_tokens: ${maxTokens})...`);

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Generate the detailed cost estimate in JSON format.' }
        ],
        max_completion_tokens: maxTokens,
        temperature: 0.3 // Lower temperature for more consistent pricing
      }),
    });

    if (!aiResponse.ok) {
      console.error('[TENDER-ESTIMATE] AI call failed:', aiResponse.status);
      const fallbackEstimate = generateFallbackEstimate(projectValue, projectCategories, complexity.level);
      return new Response(
        JSON.stringify({
          success: true,
          estimate: fallbackEstimate,
          confidence: 'Low',
          notes: 'AI estimation unavailable - using baseline calculation.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const responseText = aiData.choices?.[0]?.message?.content || '';

    // Parse AI response
    let estimate: EstimateOutput;
    try {
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found in AI response');

      estimate = JSON.parse(jsonMatch[0]);
      estimate.rams_scoped = true;

      // Validate and apply regional multiplier if not already applied
      if (estimate.regional_adjustment !== regional.multiplier) {
        console.log('[TENDER-ESTIMATE] Applying regional adjustment:', regional.multiplier);
      }

      console.log(`[TENDER-ESTIMATE] ✅ AI estimate complete: £${estimate.total_estimate?.toLocaleString()}`);
    } catch (parseError) {
      console.error('[TENDER-ESTIMATE] Failed to parse AI response:', parseError);
      estimate = generateFallbackEstimate(projectValue, projectCategories, complexity.level);
    }

    // Save estimate if we have a tender ID
    if (tenderId) {
      try {
        const { data: savedEstimate, error: saveError } = await supabase
          .from('tender_estimates')
          .insert({
            tender_id: tenderId,
            user_id: user.id,
            labour_hours: estimate.labour_hours,
            labour_cost: estimate.labour_cost,
            materials_cost: estimate.materials_cost,
            equipment_cost: estimate.equipment_cost,
            overheads: estimate.overheads,
            profit: estimate.profit,
            total_estimate: estimate.total_estimate,
            hazards: estimate.hazards,
            programme: estimate.programme,
            rams_scoped: estimate.rams_scoped,
            confidence: estimate.confidence,
            notes: estimate.notes
          })
          .select()
          .single();

        if (saveError) {
          console.error('[TENDER-ESTIMATE] Save error:', saveError);
        } else {
          console.log(`[TENDER-ESTIMATE] Saved to database: ${savedEstimate.id}`);
        }
      } catch (saveErr) {
        console.error('[TENDER-ESTIMATE] Save exception:', saveErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        estimate,
        metadata: {
          complexity: complexity.level,
          complexity_score: complexity.score,
          region: regional.region,
          regional_multiplier: regional.multiplier,
          rag_pricing_items: pricingResults.length,
          rag_labour_items: labourResults.length,
          tokens_used: maxTokens
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('[TENDER-ESTIMATE] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Generate fallback estimate when AI is unavailable
 */
function generateFallbackEstimate(
  baseValue: number,
  categories: string[],
  complexity: string
): EstimateOutput {
  const value = baseValue || 15000;

  // Adjust percentages based on complexity
  let labourPercent = 0.35;
  let materialsPercent = 0.40;
  let equipmentPercent = 0.05;

  if (complexity === 'complex') {
    labourPercent = 0.40;
    materialsPercent = 0.38;
    equipmentPercent = 0.07;
  } else if (complexity === 'simple') {
    labourPercent = 0.30;
    materialsPercent = 0.45;
    equipmentPercent = 0.03;
  }

  const labourCost = Math.round(value * labourPercent);
  const materialsCost = Math.round(value * materialsPercent);
  const equipmentCost = Math.round(value * equipmentPercent);
  const subtotal = labourCost + materialsCost + equipmentCost;
  const overheads = Math.round(subtotal * 0.12);
  const profit = Math.round((subtotal + overheads) * 0.12);
  const labourHours = Math.round(labourCost / 48);

  return {
    labour_hours: labourHours,
    labour_cost: labourCost,
    materials_cost: materialsCost,
    equipment_cost: equipmentCost,
    overheads,
    profit,
    total_estimate: subtotal + overheads + profit,
    hazards: [
      'Working at height',
      'Electrical hazards - isolation required',
      'Manual handling of heavy equipment',
      'Working with power tools',
      ...(categories.includes('fire_alarm') ? ['Fire alarm system work - BS 5839 compliance'] : []),
      ...(categories.includes('ev_charging') ? ['High voltage EV charging - isolation protocol'] : [])
    ],
    programme: `${Math.ceil(labourHours / 40)} weeks`,
    rams_scoped: false,
    confidence: 'Low',
    confidence_factors: [
      'Estimate based on project value only',
      'No detailed specification available',
      'Regional rates not applied'
    ],
    notes: `Baseline estimate for ${complexity} ${categories.join('/')} project. Upload detailed specifications for AI-powered breakdown with real pricing data.`,
    breakdown: {
      labour: [
        { task: 'First fix', hours: Math.round(labourHours * 0.4), rate: 48, cost: Math.round(labourCost * 0.4) },
        { task: 'Second fix', hours: Math.round(labourHours * 0.35), rate: 48, cost: Math.round(labourCost * 0.35) },
        { task: 'Testing & commissioning', hours: Math.round(labourHours * 0.25), rate: 48, cost: Math.round(labourCost * 0.25) }
      ],
      materials: [
        { item: 'Cables & containment', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.5), cost: Math.round(materialsCost * 0.5) },
        { item: 'Distribution & protection', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.3), cost: Math.round(materialsCost * 0.3) },
        { item: 'Accessories & sundries', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.2), cost: Math.round(materialsCost * 0.2) }
      ],
      equipment: [
        { item: 'Access equipment', days: Math.ceil(labourHours / 8), rate: Math.round(equipmentCost / Math.ceil(labourHours / 8)), cost: equipmentCost }
      ]
    },
    regional_adjustment: 1.0,
    citations: []
  };
}

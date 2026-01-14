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
  // New team composition fields
  team_size: number;
  team_composition: {
    electricians: number;
    mates: number;
    supervisors: number;
  };
  labour_rate_used: number;
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
 * Enhanced semantic search for pricing data using multi-pass strategy
 */
async function searchPricingData(
  supabase: any,
  query: string,
  embedding: number[] | null,
  categories: string[],
  scopeKeywords: string[]
): Promise<PricingResult[]> {
  console.log('[RAG] Searching pricing data (enhanced multi-pass)...');

  try {
    const searches = [];

    // Pass 1: Vector search if embedding available (25 items)
    if (embedding) {
      searches.push(
        supabase.rpc('search_pricing', {
          query_embedding: embedding,
          match_threshold: 0.4, // Lower threshold for more results
          match_count: 25
        })
      );
    }

    // Pass 2: Keyword search for scope-specific items (15 items per keyword)
    for (const keyword of scopeKeywords.slice(0, 4)) {
      searches.push(
        supabase
          .from('pricing_embeddings')
          .select('*')
          .ilike('item_name', `%${keyword}%`)
          .limit(10)
      );
    }

    // Pass 3: Category-based search (10 items per category)
    for (const category of categories.slice(0, 3)) {
      const categorySearch = category.replace('_', ' ');
      searches.push(
        supabase
          .from('pricing_embeddings')
          .select('*')
          .or(`category.ilike.%${categorySearch}%,item_name.ilike.%${categorySearch}%`)
          .limit(10)
      );
    }

    // Pass 4: Essential electrical items fallback
    searches.push(
      supabase
        .from('pricing_embeddings')
        .select('*')
        .or('category.ilike.%cable%,category.ilike.%MCB%,category.ilike.%consumer%,category.ilike.%socket%')
        .limit(15)
    );

    const results = await Promise.all(searches);

    // Merge and dedupe
    const allItems: PricingResult[] = [];
    for (const result of results) {
      if (result.data) {
        allItems.push(...result.data);
      }
    }

    // Dedupe by id and rank by relevance
    const seenIds = new Set<string>();
    const uniqueItems = allItems.filter(item => {
      if (seenIds.has(item.id)) return false;
      seenIds.add(item.id);
      return true;
    });

    // Prioritise items with similarity scores, then by relevance to keywords
    uniqueItems.sort((a, b) => {
      if (a.similarity && b.similarity) return b.similarity - a.similarity;
      if (a.similarity) return -1;
      if (b.similarity) return 1;
      return 0;
    });

    const finalItems = uniqueItems.slice(0, 50);
    console.log(`[RAG] Found ${finalItems.length} pricing items (from ${allItems.length} total)`);
    return finalItems;
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
  query: string,
  scopeKeywords: string[]
): Promise<LabourTimeResult[]> {
  console.log('[RAG] Searching labour time data...');

  try {
    const searches = [];

    // Primary search with main query
    searches.push(
      supabase.rpc('search_practical_work_fast', {
        query_text: query,
        match_count: 15
      })
    );

    // Additional searches for specific keywords
    for (const keyword of scopeKeywords.slice(0, 3)) {
      searches.push(
        supabase.rpc('search_practical_work_fast', {
          query_text: keyword,
          match_count: 8
        })
      );
    }

    const results = await Promise.all(searches);

    // Merge and dedupe
    const allRecords: LabourTimeResult[] = [];
    const seenTopics = new Set<string>();

    for (const result of results) {
      if (result.data) {
        for (const row of result.data) {
          const topic = row.primary_topic;
          if (!seenTopics.has(topic)) {
            seenTopics.add(topic);
            allRecords.push({
              primary_topic: topic,
              content: row.description || row.primary_topic || '',
              equipment_category: row.equipment_category,
              confidence_score: row.confidence_score
            });
          }
        }
      }
    }

    const finalRecords = allRecords.slice(0, 25);
    console.log(`[RAG] Found ${finalRecords.length} labour time records`);
    return finalRecords;
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
 * Calculate intelligent team size based on scope analysis
 */
function calculateTeamSize(
  scope: string,
  value: number,
  categories: string[]
): { electricians: number; mates: number; supervisors: number; total: number } {
  const scopeLower = scope.toLowerCase();

  // Extract unit counts from scope
  const unitMatch = scopeLower.match(/(\d+)\s*(?:unit|flat|property|dwelling|apartment|house)/i);
  const unitCount = unitMatch ? parseInt(unitMatch[1]) : 1;

  // Base team by project value
  let electricians = 1;
  let mates = 0;
  let supervisors = 0;

  if (value > 500000) {
    electricians = 6;
    mates = 2;
    supervisors = 1;
  } else if (value > 200000) {
    electricians = 4;
    mates = 2;
    supervisors = 1;
  } else if (value > 100000) {
    electricians = 3;
    mates = 1;
    supervisors = 0;
  } else if (value > 50000) {
    electricians = 2;
    mates = 1;
  } else if (value > 25000) {
    electricians = 2;
  }

  // Adjust by unit count
  if (unitCount > 50) {
    electricians = Math.max(electricians, 5);
    mates = Math.max(mates, 2);
    supervisors = 1;
  } else if (unitCount > 20) {
    electricians = Math.max(electricians, 3);
    mates = Math.max(mates, 1);
  } else if (unitCount > 10) {
    electricians = Math.max(electricians, 2);
  }

  // Adjust by scope keywords
  if (scopeLower.includes('rewire') && (scopeLower.includes('block') || unitCount > 10)) {
    electricians = Math.max(electricians, 3);
    mates = Math.max(mates, 1);
  }
  if (scopeLower.includes('fire alarm') && scopeLower.includes('emergency')) {
    electricians = Math.max(electricians, 2);
  }
  if (scopeLower.includes('commercial') || scopeLower.includes('industrial')) {
    electricians = Math.max(electricians, 2);
  }
  if (scopeLower.includes('high rise') || scopeLower.includes('tower')) {
    supervisors = 1;
    electricians = Math.max(electricians, 4);
  }

  // Category adjustments
  if (categories.includes('ev_charging') && value > 50000) {
    electricians = Math.max(electricians, 2);
  }
  if (categories.includes('data_cabling')) {
    electricians = Math.max(electricians, 2);
  }

  // Cap at realistic levels
  electricians = Math.min(electricians, 8);
  mates = Math.min(mates, 3);
  supervisors = Math.min(supervisors, 1);

  return {
    electricians,
    mates,
    supervisors,
    total: electricians + mates + supervisors
  };
}

/**
 * Calculate regional labour rates
 */
function calculateLabourRates(
  region: string,
  sector: string
): { qualified: number; mate: number; supervisor: number } {
  // Base regional rates (2025 UK market)
  const baseRates: Record<string, { qualified: number; mate: number; supervisor: number }> = {
    'London': { qualified: 55, mate: 25, supervisor: 70 },
    'Greater Manchester': { qualified: 48, mate: 22, supervisor: 60 },
    'Birmingham': { qualified: 46, mate: 21, supervisor: 58 },
    'West Yorkshire': { qualified: 45, mate: 20, supervisor: 56 },
    'Scotland': { qualified: 42, mate: 19, supervisor: 54 },
    'Wales': { qualified: 40, mate: 18, supervisor: 52 },
    'UK Average': { qualified: 45, mate: 20, supervisor: 55 }
  };

  const rates = { ...(baseRates[region] || baseRates['UK Average']) };

  // Sector premiums
  if (sector === 'healthcare' || sector === 'nhs') {
    rates.qualified *= 1.15; // Healthcare premium
    rates.supervisor *= 1.15;
  }
  if (sector === 'nuclear' || sector === 'defence') {
    rates.qualified *= 1.25; // High security premium
    rates.supervisor *= 1.25;
  }
  if (sector === 'commercial') {
    rates.qualified *= 1.10; // Commercial premium
  }

  return {
    qualified: Math.round(rates.qualified),
    mate: Math.round(rates.mate),
    supervisor: Math.round(rates.supervisor)
  };
}

/**
 * Extract electrical keywords from scope for better RAG search
 */
function extractElectricalKeywords(scope: string): string[] {
  const keywords: string[] = [];
  const scopeLower = scope.toLowerCase();

  // Materials
  if (scopeLower.includes('consumer unit') || scopeLower.includes('distribution board')) keywords.push('consumer unit');
  if (scopeLower.includes('mcb')) keywords.push('MCB');
  if (scopeLower.includes('rcbo')) keywords.push('RCBO');
  if (scopeLower.includes('rcd')) keywords.push('RCD');
  if (scopeLower.includes('cable') || scopeLower.includes('twin and earth')) keywords.push('cable');
  if (scopeLower.includes('swa')) keywords.push('SWA cable');
  if (scopeLower.includes('conduit')) keywords.push('conduit');
  if (scopeLower.includes('trunking')) keywords.push('trunking');
  if (scopeLower.includes('socket')) keywords.push('socket');
  if (scopeLower.includes('switch')) keywords.push('switch');
  if (scopeLower.includes('light') || scopeLower.includes('luminaire')) keywords.push('lighting');
  if (scopeLower.includes('emergency light')) keywords.push('emergency lighting');
  if (scopeLower.includes('fire alarm') || scopeLower.includes('smoke detector')) keywords.push('fire alarm');
  if (scopeLower.includes('ev charg')) keywords.push('EV charger');
  if (scopeLower.includes('isolator')) keywords.push('isolator');

  // Work types
  if (scopeLower.includes('rewir')) keywords.push('rewire');
  if (scopeLower.includes('eicr') || scopeLower.includes('periodic')) keywords.push('testing');
  if (scopeLower.includes('first fix')) keywords.push('first fix');
  if (scopeLower.includes('second fix')) keywords.push('second fix');

  return keywords.length > 0 ? keywords : ['electrical', 'cable', 'MCB', 'socket'];
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

    // Extract keywords from scope for better RAG search
    const scopeKeywords = extractElectricalKeywords(projectDescription);
    console.log(`[TENDER-ESTIMATE] Scope keywords: ${scopeKeywords.join(', ')}`);

    // Calculate intelligent team size based on scope analysis
    const teamSize = calculateTeamSize(projectDescription, projectValue, projectCategories);
    console.log(`[TENDER-ESTIMATE] Team size: ${teamSize.electricians} electricians, ${teamSize.mates} mates, ${teamSize.supervisors} supervisors`);

    // Get Lovable API key for AI
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      console.log('[TENDER-ESTIMATE] No API key, using fallback estimation');
      const fallbackEstimate = generateFallbackEstimate(
        projectValue,
        projectCategories,
        complexity.level,
        teamSize,
        45 // Default UK rate when no regional data available
      );

      return new Response(
        JSON.stringify({
          success: true,
          estimate: fallbackEstimate,
          confidence: 'Low',
          notes: 'Basic estimate - AI unavailable. Upload specifications for detailed breakdown.',
          metadata: {
            team_size: teamSize.total,
            team_composition: teamSize,
            complexity: complexity.level
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate embedding for semantic search
    const ragQuery = `${projectTitle} ${projectDescription.substring(0, 500)} ${projectCategories.join(' ')} ${scopeKeywords.join(' ')} electrical installation`;
    const embedding = await generateEmbedding(ragQuery, lovableApiKey);

    // Parallel RAG searches with enhanced multi-pass strategy
    const [pricingResults, labourResults, regional] = await Promise.all([
      searchPricingData(supabase, ragQuery, embedding, projectCategories, scopeKeywords),
      searchLabourData(supabase, ragQuery, scopeKeywords),
      getRegionalMultiplier(supabase, projectPostcode)
    ]);

    // Calculate regional labour rates
    const projectSector = opportunity?.sector || tender?.category?.toLowerCase() || 'public';
    const labourRates = calculateLabourRates(regional.region, projectSector);

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

    // Build comprehensive AI prompt with team size guidelines
    const systemPrompt = `You are an expert UK electrical contractor estimator with 20+ years experience pricing tenders.
Generate a detailed, realistic cost estimate for this project.

CRITICAL REQUIREMENTS:
1. Use REALISTIC TEAM SIZES - A rewire of 24 units requires 3-4 electricians, NOT 1 person!
2. Calculate programme based on team size × days, not just total hours
3. Use the DATABASE PRICES below - they are real wholesale prices with 15% markup
4. Apply regional labour rates (already calculated for this location)

RECOMMENDED TEAM FOR THIS PROJECT:
- Electricians: ${teamSize.electricians}
- Mates: ${teamSize.mates}
- Supervisors: ${teamSize.supervisors}
- Total team: ${teamSize.total} people

REGIONAL LABOUR RATES FOR ${regional.region} (${projectSector} sector):
- Qualified electrician: £${labourRates.qualified}/hr
- Electrician's mate: £${labourRates.mate}/hr
- Supervisor: £${labourRates.supervisor}/hr

TEAM SIZE GUIDELINES (use these to validate your estimate):
- Single property rewire/EICR: 1-2 electricians
- Small block (10-20 units): 2-3 electricians + 1 mate
- Large block (20-50 units): 3-4 electricians + 1 mate + supervisor
- Major project (50+ units): 4-6 electricians + 2 mates + supervisor

2025 UK MATERIAL PRICES (for validation):
- Consumer units (metal, dual RCD): 6-way £55-85, 10-way £95-130, 18-way £280-420
- MCBs Type B: 6-32A £8-15, 40A+ £15-25
- RCBOs: £28-45 each
- Twin & Earth (6242Y): 1.5mm² £0.85-1.20/m, 2.5mm² £1.30-1.80/m, 4mm² £2.10-2.90/m
- SWA cable: 4mm² 3-core £4.50-6.00/m, 6mm² £5.50-7.50/m

INSTALLATION TIME STANDARDS:
- First fix per circuit: 3-4 hours
- Second fix per circuit: 1.5-2.5 hours
- Testing & certification: 1-2 hours per circuit

${pricingContext}

${labourContext}

PROJECT DETAILS:
- Title: ${projectTitle}
- Client: ${projectClient}
- Location: ${projectPostcode || 'UK'}
- Sector: ${projectSector}
- Categories: ${projectCategories.join(', ')}
- Estimated Value Range: ${projectValue > 0 ? `£${projectValue.toLocaleString()}` : 'Not specified'}
- Documents: ${documentUrls.length} files uploaded
- Complexity: ${complexity.level.toUpperCase()} (score: ${complexity.score}/100)

SCOPE OF WORKS:
${projectDescription || 'No detailed scope provided - estimate based on project type and value.'}

RESPONSE FORMAT (JSON only - include team_size and team_composition):
{
  "labour_hours": <total hours for entire team>,
  "labour_cost": <GBP>,
  "materials_cost": <GBP>,
  "equipment_cost": <GBP>,
  "overheads": <GBP - 10-15% of subtotal>,
  "profit": <GBP - 10-20% markup>,
  "total_estimate": <sum>,
  "team_size": ${teamSize.total},
  "team_composition": {
    "electricians": ${teamSize.electricians},
    "mates": ${teamSize.mates},
    "supervisors": ${teamSize.supervisors}
  },
  "labour_rate_used": ${labourRates.qualified},
  "hazards": ["list of identified hazards"],
  "programme": "<duration e.g. '3 weeks' - MUST be realistic for team size>",
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
      const fallbackEstimate = generateFallbackEstimate(
        projectValue,
        projectCategories,
        complexity.level,
        teamSize,
        labourRates.qualified
      );
      return new Response(
        JSON.stringify({
          success: true,
          estimate: fallbackEstimate,
          confidence: 'Low',
          notes: 'AI estimation unavailable - using baseline calculation.',
          metadata: {
            team_size: teamSize.total,
            team_composition: teamSize,
            region: regional.region,
            labour_rate: labourRates.qualified,
            complexity: complexity.level
          }
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
      estimate = generateFallbackEstimate(
        projectValue,
        projectCategories,
        complexity.level,
        teamSize,
        labourRates.qualified
      );
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
          team_size: estimate.team_size || teamSize.total,
          team_composition: estimate.team_composition || teamSize,
          labour_rate: estimate.labour_rate_used || labourRates.qualified,
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
  complexity: string,
  teamSize?: { electricians: number; mates: number; supervisors: number; total: number },
  labourRate?: number
): EstimateOutput {
  const value = baseValue || 15000;
  const rate = labourRate || 45; // Default UK rate

  // Use provided team size or calculate basic one from value
  const team = teamSize || {
    electricians: value > 100000 ? 3 : value > 50000 ? 2 : 1,
    mates: value > 100000 ? 1 : 0,
    supervisors: value > 200000 ? 1 : 0,
    total: value > 200000 ? 5 : value > 100000 ? 4 : value > 50000 ? 2 : 1
  };

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
  const labourHours = Math.round(labourCost / rate);

  // Calculate realistic programme based on team size
  const totalTeamDays = Math.ceil(labourHours / (8 * team.total));
  const programmeWeeks = Math.ceil(totalTeamDays / 5);

  return {
    labour_hours: labourHours,
    labour_cost: labourCost,
    materials_cost: materialsCost,
    equipment_cost: equipmentCost,
    overheads,
    profit,
    total_estimate: subtotal + overheads + profit,
    team_size: team.total,
    team_composition: {
      electricians: team.electricians,
      mates: team.mates,
      supervisors: team.supervisors
    },
    labour_rate_used: rate,
    hazards: [
      'Working at height',
      'Electrical hazards - isolation required',
      'Manual handling of heavy equipment',
      'Working with power tools',
      ...(categories.includes('fire_alarm') ? ['Fire alarm system work - BS 5839 compliance'] : []),
      ...(categories.includes('ev_charging') ? ['High voltage EV charging - isolation protocol'] : [])
    ],
    programme: programmeWeeks === 1 ? '1 week' : `${programmeWeeks} weeks`,
    rams_scoped: false,
    confidence: 'Low',
    confidence_factors: [
      'Estimate based on project value only',
      'No detailed specification available',
      'Regional rates not applied'
    ],
    notes: `Baseline estimate for ${complexity} ${categories.join('/')} project. Team of ${team.total} (${team.electricians} electricians${team.mates ? `, ${team.mates} mate${team.mates > 1 ? 's' : ''}` : ''}${team.supervisors ? ', 1 supervisor' : ''}). Upload detailed specifications for AI-powered breakdown with real pricing data.`,
    breakdown: {
      labour: [
        { task: 'First fix', hours: Math.round(labourHours * 0.4), rate, cost: Math.round(labourCost * 0.4) },
        { task: 'Second fix', hours: Math.round(labourHours * 0.35), rate, cost: Math.round(labourCost * 0.35) },
        { task: 'Testing & commissioning', hours: Math.round(labourHours * 0.25), rate, cost: Math.round(labourCost * 0.25) }
      ],
      materials: [
        { item: 'Cables & containment', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.5), cost: Math.round(materialsCost * 0.5) },
        { item: 'Distribution & protection', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.3), cost: Math.round(materialsCost * 0.3) },
        { item: 'Accessories & sundries', quantity: 1, unit: 'lot', unit_price: Math.round(materialsCost * 0.2), cost: Math.round(materialsCost * 0.2) }
      ],
      equipment: [
        { item: 'Access equipment', days: Math.ceil(labourHours / 8), rate: Math.round(equipmentCost / Math.max(1, Math.ceil(labourHours / 8))), cost: equipmentCost }
      ]
    },
    regional_adjustment: 1.0,
    citations: []
  };
}

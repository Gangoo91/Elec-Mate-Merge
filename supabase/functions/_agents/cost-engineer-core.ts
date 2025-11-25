/**
 * Cost Engineer Core Logic
 * Complete business logic extracted from edge function
 * Pattern: Same as installation-method-core.ts
 */

import { searchPricingKnowledge, formatPricingContext } from '../_shared/rag-cost-engineer.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';
import { createLogger } from '../_shared/logger.ts';
import { formatTradePricingPrompt, validatePricing, validateTimescales } from '../_shared/uk-trade-pricing-2025.ts';

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// ===== PRICING CONSTANTS =====
const COST_ENGINEER_PRICING = {
  ELECTRICIAN_RATE_PER_HOUR: 45.00,
  APPRENTICE_RATE_PER_HOUR: 25.00,
  MATERIAL_MARKUP_PERCENT: 12,
  VAT_RATE: 20
};

const AUTO_OVERHEADS_2025 = {
  perJobDay: 35.00,
  certification: {
    niceicPerCircuit: 2.50,
    buildingControl: 250,
    eicr: 0
  }
};

const REGIONAL_MULTIPLIERS: Record<string, number> = {
  london: 1.25,
  southeast: 1.15,
  scotland: 1.08,
  northwest: 1.02,
  yorkshire: 1.02,
  wales: 0.98,
  southwest: 1.05,
  eastMidlands: 1.00,
  westMidlands: 1.00,
  northeast: 0.95,
  other: 1.00
};

// ===== INTERFACES =====
interface CostEngineerRequest {
  query: string;
  region?: string;
  projectContext?: {
    projectType?: 'domestic' | 'commercial' | 'industrial';
    projectName?: string;
    clientInfo?: string;
    additionalInfo?: string;
  };
  businessSettings?: {
    labourRate?: number;
    overheadPercentage?: number;
    profitMargin?: number;
    dailyOverheads?: number;
  };
  skipProfitability?: boolean;
}

interface Material {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  supplier: string;
  category?: string;
}

interface LabourTask {
  description: string;
  hours: number;
  rate: number;
  total: number;
  workerType?: string;
}

interface CostEstimate {
  materials: {
    items: Material[];
    subtotal: number;
  };
  labour: {
    tasks: LabourTask[];
    subtotal: number;
    totalHours: number;
  };
  timescales: {
    totalDays: number;
    breakdown: string;
  };
  summary: {
    materialsSubtotal: number;
    labourSubtotal: number;
    subtotal: number;
    vat: number;
    grandTotal: number;
  };
  profitability?: any;
  valueEngineering?: string[];
}

export async function generateCostEstimate(
  supabase: any,
  request: CostEngineerRequest
): Promise<CostEstimate> {
  const startTime = Date.now();
  
  console.log('💷 Cost Engineer START', {
    query: request.query.substring(0, 100),
    region: request.region,
    projectType: request.projectContext?.projectType
  });

  // STEP 1: Extract keywords
  const keywords = extractCostKeywords(request.query, request.projectContext);
  console.log(`📝 Extracted ${keywords.size} keywords`);

  // STEP 2: Generate embedding for query
  const logger = createLogger('cost-engineer-core');
  const embedding = await generateEmbedding(request.query);
  
  // STEP 3: Parallel RAG searches
  const ragStart = Date.now();
  const [pricingResults, practicalWork] = await Promise.all([
    searchPricingKnowledge(
      request.query,
      embedding,
      supabase,
      logger,
      request.projectContext?.projectType
    ),
    searchPracticalWorkIntelligence(supabase, {
      query: request.query,
      tradeFilter: 'installer',
      matchCount: 20
    })
  ]);

  const ragTime = Date.now() - ragStart;
  console.log(`⚡ RAG complete in ${ragTime}ms:`, {
    pricingHits: pricingResults.length,
    practicalWorkHits: practicalWork.results.length
  });

  // STEP 4: Call OpenAI for cost estimation
  const aiStart = Date.now();
  const costEstimate = await callCostEstimationAI(
    request,
    {
      pricing: pricingResults,
      practicalWork: practicalWork.results,
      keywords: Array.from(keywords)
    }
  );
  const aiTime = Date.now() - aiStart;

  // STEP 5: Calculate profitability if requested
  if (!request.skipProfitability) {
    costEstimate.profitability = calculateProfitability(
      costEstimate,
      request.businessSettings
    );
  }

  const totalTime = Date.now() - startTime;
  console.log(`✅ Cost Engineer complete in ${totalTime}ms (RAG: ${ragTime}ms, AI: ${aiTime}ms)`);

  return costEstimate;
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text
    })
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

function extractCostKeywords(query: string, projectContext?: any): Set<string> {
  const keywords = new Set<string>();
  
  // Base cost keywords
  const baseKeywords = [
    'cable', 'socket', 'light', 'consumer', 'unit', 'board',
    'mcb', 'rcbo', 'rcd', 'protection', 'installation',
    'labour', 'material', 'cost', 'price', 'rewire'
  ];
  
  baseKeywords.forEach(kw => keywords.add(kw));

  // Extract from query
  const queryWords = query.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3);
  
  queryWords.forEach(w => keywords.add(w));

  // Project type keywords
  if (projectContext?.projectType) {
    keywords.add(projectContext.projectType);
  }

  return keywords;
}

/**
 * Detect whether this is a domestic, commercial, or industrial project
 */
function detectProjectType(query: string): 'domestic' | 'commercial' | 'industrial' {
  const q = query.toLowerCase();
  
  // Commercial indicators
  if (q.includes('restaurant') || (q.includes('kitchen') && q.includes('commercial')) ||
      q.includes('cold room') || q.includes('3-phase') || q.includes('3 phase') ||
      q.includes('extraction') || q.includes('emergency lighting') ||
      q.includes('bar') || q.includes('café') || q.includes('cafe') ||
      q.includes('shop') || q.includes('office') || q.includes('warehouse') ||
      q.includes('retail') || q.includes('gym') || q.includes('hotel')) {
    return 'commercial';
  }
  
  // Industrial indicators
  if (q.includes('factory') || q.includes('industrial') || q.includes('manufacturing') ||
      q.includes('plant') || q.includes('production') || q.includes('workshop') ||
      q.includes('cnc') || q.includes('welding') || q.includes('compressor') ||
      q.includes('conveyor') || q.includes('crane') || q.includes('spray booth')) {
    return 'industrial';
  }
  
  return 'domestic';
}

async function callCostEstimationAI(
  request: CostEngineerRequest,
  ragContext: any
): Promise<CostEstimate> {
  // Detect project type from query if not specified
  const projectType = request.projectContext?.projectType || detectProjectType(request.query);
  
  console.log(`🏗️ Detected project type: ${projectType}`);
  
  // Get accurate trade pricing prompt
  const tradePricingPrompt = formatTradePricingPrompt();

  const systemPrompt = `You are an expert Electrical Cost Engineer for UK installations.

Generate a detailed cost estimate based on BS 7671:2018+A2:2024 and current UK pricing (2025).

${tradePricingPrompt}

KNOWLEDGE BASE PROVIDED:
- ${ragContext.pricing.length} pricing intelligence results (use for specialist items only)
- ${ragContext.practicalWork.length} practical work intelligence results WITH TIMING DATA
- Keywords: ${ragContext.keywords.slice(0, 15).join(', ')}

⚠️ CRITICAL: Use the practical work timing data below to ensure realistic labour hours. These are based on real UK electrician job data.

RAG TIMING BENCHMARKS:
${ragContext.practicalWork.slice(0, 10).map((pw: any, i: number) => {
  const durationHours = pw.typical_duration_minutes 
    ? (pw.typical_duration_minutes / 60).toFixed(1) 
    : (pw.duration_hours || 'N/A');
  const teamSize = pw.team_size || 1;
  const taskName = pw.primary_topic || pw.activity_description || 'Task';
  return `  • ${taskName}: ${durationHours} hours (${teamSize} person${teamSize > 1 ? 's' : ''})`;
}).join('\n')}

💡 CROSS-REFERENCE your labour estimates against these benchmarks. If your estimate differs by >30%, explain why in valueEngineering.

OUTPUT STRUCTURE (JSON):
{
  "materials": {
    "items": [
      {
        "description": "Item name with specifications",
        "quantity": number,
        "unit": "metres|units|boxes",
        "unitPrice": number,
        "total": number,
        "supplier": "CEF|TLC|RS",
        "category": "cables|protection|accessories"
      }
    ],
    "subtotal": number
  },
  "labour": {
    "tasks": [
      {
        "description": "Task description",
        "hours": number,
        "rate": ${request.businessSettings?.labourRate || 45},
        "total": number,
        "workerType": "Qualified Electrician"
      }
    ],
    "subtotal": number,
    "totalHours": number
  },
  "timescales": {
    "totalDays": number,
    "breakdown": "Day-by-day breakdown"
  },
  "summary": {
    "materialsSubtotal": number,
    "labourSubtotal": number,
    "subtotal": number,
    "vat": number (20%),
    "grandTotal": number
  },
  "upsells": [
    {
      "opportunity": "Smart lighting control system",
      "price": 450,
      "winRate": 65,
      "isHot": true,
      "timing": "During initial consultation",
      "script": "While I'm here, I noticed your lighting could benefit from smart controls. For an extra £450, I can install motion sensors and dimming - it'll save you £200/year on electricity and add convenience."
    }
  ],
  "paymentTerms": {
    "depositPercent": 30,
    "depositAmount": number,
    "balanceAmount": number,
    "terms": "30% deposit before work starts, balance on completion",
    "lateFeePolicy": "Interest charged at 4% above base rate after 30 days",
    "paymentMilestones": [
      {
        "stage": "Deposit",
        "percentage": 30,
        "amount": number,
        "trigger": "Before work starts"
      }
    ]
  },
  "pipeline": [
    {
      "opportunity": "EV Charger Installation",
      "description": "7kW home charger with app control",
      "timeframe": "6-12 months",
      "estimatedValue": 1200,
      "priority": "medium",
      "trigger": "When they mention new electric car",
      "timing": "6-12 months"
    }
  ],
  "valueEngineering": ["Suggestion 1", "Suggestion 2"]
}

REQUIREMENTS:
- ⚠️ USE THE TRADE PRICES LISTED ABOVE - they are accurate 2025 trade prices
- Only use database pricing intelligence for specialist/unusual items not in the list above
- If using database prices, remember they are LIST prices - apply 40% trade discount
- Include 10% cable waste and 5% materials contingency
- Labour rates: Electrician £${request.businessSettings?.labourRate || 45}/hr
- Regional multiplier: ${getRegionalMultiplier(request.region || 'other')}x
- Include all fixings, accessories, and sundries
- Realistic time estimates based on practical work intelligence
- UK English spelling (metres, colour, earthing)
- All prices in GBP (£)
- Compare your total against the benchmarks provided - if significantly higher, review your pricing!
- 🔥 MANDATORY: ALWAYS include 2-3 upsells (immediate add-ons), payment terms with deposit structure, and 1-2 future pipeline opportunities - these fields are REQUIRED
- ${projectType === 'commercial' ? 'COMMERCIAL PROJECT: Include phased payment milestones (typically 30% deposit, 40% at first fix, 30% completion). Upsells should focus on efficiency upgrades (LED lighting, smart controls). Future work: maintenance contracts, expansion.' : 'DOMESTIC PROJECT: Standard deposit is 30-50%. Upsells: surge protection, USB sockets, outdoor lighting. Future work: EV charger, solar panels, security systems.'}
- Respond in valid JSON only`;

  const userPrompt = `Generate cost estimate for: ${request.query}

${request.projectContext ? `
PROJECT DETAILS:
- Type: ${request.projectContext.projectType || 'domestic'}
- Name: ${request.projectContext.projectName || 'N/A'}
- Client: ${request.projectContext.clientInfo || 'N/A'}
- Additional: ${request.projectContext.additionalInfo || 'N/A'}
` : ''}

PRICING INTELLIGENCE (Top 15):
${ragContext.pricing.slice(0, 15).map((p: any, i: number) => 
  `${i + 1}. ${p.item_name}: £${p.base_cost} (${p.wholesaler})`
).join('\n')}

PRACTICAL WORK INTELLIGENCE (Top 10):
${ragContext.practicalWork.slice(0, 10).map((pw: any, i: number) => {
  const durationHours = pw.typical_duration_minutes 
    ? (pw.typical_duration_minutes / 60).toFixed(1) 
    : (pw.duration_hours || 'N/A');
  const teamSize = pw.team_size || 1;
  return `${i + 1}. ${pw.primary_topic || pw.activity_description || 'Task'} - ${durationHours}hrs (${teamSize} person team)`;
}).join('\n')}`;

  console.log('🤖 Calling OpenAI for cost estimation...');

  // Add timeout protection (2 minutes)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error('⏱️ OpenAI call timeout after 120 seconds');
    controller.abort();
  }, 120000);

  let response;
  try {
    response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-5-mini-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' },
        max_completion_tokens: 8000
      }),
      signal: controller.signal
    });
  } catch (fetchError: any) {
    clearTimeout(timeoutId);
    if (fetchError.name === 'AbortError') {
      console.error('❌ OpenAI fetch aborted (timeout)');
      throw new Error('OpenAI request timed out after 2 minutes');
    }
    console.error('❌ OpenAI fetch error:', fetchError.message);
    throw new Error(`OpenAI fetch failed: ${fetchError.message}`);
  }

  clearTimeout(timeoutId);
  console.log(`📡 OpenAI response status: ${response.status}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API error:', response.status, errorText.substring(0, 500));
    throw new Error(`OpenAI API error (${response.status}): ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  // Validate response
  if (!data.choices || data.choices.length === 0) {
    throw new Error('OpenAI returned no choices');
  }

  const message = data.choices[0].message;

  // Check for refusal
  if (message.refusal) {
    throw new Error(`OpenAI refused: ${message.refusal}`);
  }

  const content = message.content;

  if (!content || content.trim().length === 0) {
    throw new Error(`Empty response from OpenAI (finish_reason: ${data.choices[0].finish_reason})`);
  }

  console.log(`✅ OpenAI response: ${content.length} chars`);

  // Parse JSON
  let parsedEstimate;
  try {
    parsedEstimate = JSON.parse(content);
  } catch (parseError: any) {
    console.error('❌ JSON parse failed:', parseError.message);
    console.error('📋 Raw content (first 500 chars):', content.substring(0, 500));
    throw new Error(`Failed to parse OpenAI JSON: ${parseError.message}`);
  }

  // Validate pricing against benchmarks
  const pricingWarnings = validatePricing(parsedEstimate);
  if (pricingWarnings.length > 0) {
    console.warn('⚠️ Pricing validation warnings:', pricingWarnings);
    // Add warnings to value engineering suggestions
    if (!parsedEstimate.valueEngineering) {
      parsedEstimate.valueEngineering = [];
    }
    pricingWarnings.forEach(warning => {
      if (!parsedEstimate.valueEngineering.includes(warning)) {
        parsedEstimate.valueEngineering.push(warning);
      }
    });
  }

  // Validate timescales against benchmarks
  const timescaleWarnings = validateTimescales(parsedEstimate, request.query);
  if (timescaleWarnings.length > 0) {
    console.warn('⚠️ Timescale validation warnings:', timescaleWarnings);
    // Add warnings to value engineering suggestions
    if (!parsedEstimate.valueEngineering) {
      parsedEstimate.valueEngineering = [];
    }
    timescaleWarnings.forEach(warning => {
      if (!parsedEstimate.valueEngineering.includes(warning)) {
        parsedEstimate.valueEngineering.push(warning);
      }
    });
  }

  // FALLBACK: Ensure required fields exist
  if (!parsedEstimate.upsells || parsedEstimate.upsells.length === 0) {
    console.warn('⚠️ No upsells returned by AI - adding fallback');
    parsedEstimate.upsells = [
      {
        opportunity: "Surge protection device",
        price: 180,
        winRate: 45,
        isHot: false,
        timing: "During quote discussion",
        script: "I'd recommend adding surge protection to your consumer unit for £180. It protects all your expensive appliances from voltage spikes - especially important with all the electronics we have these days."
      },
      {
        opportunity: "USB charging sockets",
        price: 120,
        winRate: 55,
        isHot: false,
        timing: "When discussing sockets",
        script: "While we're upgrading sockets, I can install USB charging points for £120. Much more convenient than using plug adapters, and they're very popular right now."
      }
    ];
  }

  if (!parsedEstimate.paymentTerms) {
    console.warn('⚠️ No payment terms returned by AI - adding fallback');
    const grandTotal = parsedEstimate.summary.grandTotal;
    const depositAmount = grandTotal * 0.3;
    const balanceAmount = grandTotal - depositAmount;
    parsedEstimate.paymentTerms = {
      depositPercent: 30,
      depositAmount: depositAmount,
      balanceAmount: balanceAmount,
      terms: "30% deposit before work starts, balance on completion",
      lateFeePolicy: "Interest charged at 4% above base rate after 30 days",
      paymentMilestones: [
        { stage: "Deposit", percentage: 30, amount: depositAmount, trigger: "Before work starts" },
        { stage: "Completion", percentage: 70, amount: balanceAmount, trigger: "On completion" }
      ]
    };
  }

  if (!parsedEstimate.pipeline || parsedEstimate.pipeline.length === 0) {
    console.warn('⚠️ No pipeline returned by AI - adding fallback');
    parsedEstimate.pipeline = [
      {
        opportunity: "EV Charger Installation",
        description: "7kW home charger with app control",
        timeframe: "6-12 months",
        estimatedValue: 1200,
        priority: "medium",
        trigger: "When they mention new electric car",
        timing: "6-12 months"
      }
    ];
  }

  return parsedEstimate;
}

function calculateProfitability(
  costEstimate: CostEstimate,
  businessSettings?: any
): any {
  const jobDuration = costEstimate.timescales?.totalDays || 1;
  const materialsTotal = costEstimate.summary.materialsSubtotal;
  const labourTotal = costEstimate.summary.labourSubtotal;
  const directTotal = materialsTotal + labourTotal;
  
  const dailyOverheads = businessSettings?.dailyOverheads || AUTO_OVERHEADS_2025.perJobDay;
  const overheadAllocation = jobDuration * dailyOverheads;
  const breakEvenSubtotal = directTotal + overheadAllocation;
  
  return {
    directCosts: { 
      materials: materialsTotal, 
      labour: labourTotal, 
      total: directTotal 
    },
    jobOverheads: {
      estimatedDuration: `${jobDuration} days`,
      overheadAllocation,
      total: overheadAllocation
    },
    breakEven: {
      subtotal: breakEvenSubtotal,
      vat: breakEvenSubtotal * 0.20,
      total: breakEvenSubtotal * 1.20,
      explanation: 'Break-even covers direct costs plus overhead allocation'
    },
    quotingGuidance: {
      minimum: {
        margin: 15,
        subtotal: breakEvenSubtotal * 1.15,
        vat: (breakEvenSubtotal * 1.15) * 0.20,
        total: (breakEvenSubtotal * 1.15) * 1.20,
        profit: breakEvenSubtotal * 0.15,
        explanation: 'Minimum 15% margin - covers costs with modest profit'
      },
      target: {
        margin: 25,
        subtotal: breakEvenSubtotal * 1.25,
        vat: (breakEvenSubtotal * 1.25) * 0.20,
        total: (breakEvenSubtotal * 1.25) * 1.20,
        profit: breakEvenSubtotal * 0.25,
        explanation: 'Target 25% margin - recommended for healthy profit'
      },
      premium: {
        margin: 35,
        subtotal: breakEvenSubtotal * 1.35,
        vat: (breakEvenSubtotal * 1.35) * 0.20,
        total: (breakEvenSubtotal * 1.35) * 1.20,
        profit: breakEvenSubtotal * 0.35,
        explanation: 'Premium 35% margin - for specialist/complex work'
      }
    }
  };
}

function getRegionalMultiplier(region: string): number {
  const regionLower = region.toLowerCase();
  for (const [key, value] of Object.entries(REGIONAL_MULTIPLIERS)) {
    if (regionLower.includes(key)) {
      return value;
    }
  }
  return REGIONAL_MULTIPLIERS.other;
}

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
${ragContext.practicalWork.slice(0, 8).map((pw: any, i: number) => {
  const durationHours = pw.typical_duration_minutes 
    ? (pw.typical_duration_minutes / 60).toFixed(1) 
    : (pw.duration_hours || 'N/A');
  const teamSize = pw.team_size || 1;
  const taskName = pw.primary_topic || pw.activity_description || 'Task';
  return `  • ${taskName}: ${durationHours} hours (${teamSize} person${teamSize > 1 ? 's' : ''})`;
}).join('\n')}

💡 CROSS-REFERENCE your labour estimates against these benchmarks. If your estimate differs by >30%, explain why in valueEngineering.

OUTPUT (JSON):
{
  "materials": {"items": [{"description": string, "quantity": number, "unit": string, "unitPrice": number, "total": number, "supplier": string, "category": string}], "subtotal": number},
  "labour": {"tasks": [{"description": string, "hours": number, "rate": ${request.businessSettings?.labourRate || 45}, "total": number, "workerType": string}], "subtotal": number, "totalHours": number},
  "timescales": {"totalDays": number, "breakdown": string},
  "summary": {"materialsSubtotal": number, "labourSubtotal": number, "subtotal": number, "vat": number, "grandTotal": number},
  "complexity": {"rating": number, "label": string, "factors": [string], "estimatedHours": number, "reasoning": string},
  "riskAssessment": {"risks": [{"title": string, "severity": "low" | "medium" | "high" | "critical", "likelihood": "low" | "medium" | "high", "mitigation": string, "contingencyPercent": number}]},
  "siteChecklist": {"critical": [string], "important": [string], "documentation": [string]},
  "upsells": [{"opportunity": string, "price": number, "winRate": number, "isHot": boolean, "timing": string, "script": string}],
  "paymentTerms": {"depositPercent": number, "depositAmount": number, "balanceAmount": number, "terms": string, "lateFeePolicy": string, "paymentMilestones": [{"stage": string, "percentage": number, "amount": number, "trigger": string}]},
  "pipeline": [{"opportunity": string, "description": string, "timeframe": string, "estimatedValue": number, "priority": string, "trigger": string, "timing": string}],
  "valueEngineering": [string]
}

COMPLEXITY RATING GUIDE (1-10 scale):
- 1-2 (Low): Simple socket/light swaps, single circuit additions, basic repairs
- 3-4 (Moderate): Small rewires, consumer unit upgrades, basic outdoor installations
- 5-6 (Moderate-High): Full house rewires, multiple circuits, fire alarm systems, EV chargers
- 7-8 (High): Commercial fit-outs, 3-phase installations, complex access constraints
- 9-10 (Very High): Industrial installations, specialist certifications, major infrastructure projects

Consider: labour hours, technical difficulty, access constraints, regulatory complexity, materials complexity

RISK ASSESSMENT GUIDE:
- Identify 3-7 project-specific risks relevant to this job
- severity: "critical" (immediate safety/compliance threat), "high" (significant cost/delay risk), "medium" (manageable impact), "low" (minor inconvenience)
- likelihood: "high" (>60% chance), "medium" (30-60%), "low" (<30%)
- Always include practical mitigation strategy and contingency percentage (0-15%)
- Consider: unforeseen site conditions, access difficulties, existing installation issues, client availability, weather (outdoor work)

SITE CHECKLIST GUIDE:
- critical: Must-do items before starting work (isolation verification, access confirmation, safety checks, asbestos survey if pre-2000 building)
- important: Items affecting efficiency (furniture clearance, parking arrangements, client availability, tool access)
- documentation: Required paperwork (EIC certificate, Part P notification, building control, warranties, insurance certificates)

RULES:
- USE trade prices listed above (accurate 2025 prices)
- Database prices = LIST prices. Apply 20% trade discount (LIST × 0.80 = TRADE price, NOT 0.60)
- Include 10% cable waste, 5% materials contingency
- Labour: £${request.businessSettings?.labourRate || 45}/hr, regional multiplier: ${getRegionalMultiplier(request.region || 'other')}x
- Cross-reference labour hours with timing benchmarks (flag if >30% different)
- UK English (metres, colour, earthing), all prices in GBP
- MANDATORY: Include 2-3 upsells, payment terms with deposit, 1-2 pipeline opportunities
- ${projectType === 'commercial' ? 'COMMERCIAL: Phased payments (30% deposit, 40% first fix, 30% completion). Upsells: LED, smart controls. Pipeline: maintenance, expansion.' : 'DOMESTIC: 30-50% deposit. Upsells: surge protection, USB sockets, outdoor lighting. Pipeline: EV charger, solar, security.'}
- Valid JSON only`;

  const userPrompt = `Generate cost estimate for: ${request.query}

${request.projectContext ? `
PROJECT DETAILS:
- Type: ${request.projectContext.projectType || 'domestic'}
- Name: ${request.projectContext.projectName || 'N/A'}
- Client: ${request.projectContext.clientInfo || 'N/A'}
- Additional: ${request.projectContext.additionalInfo || 'N/A'}
` : ''}

PRICING INTELLIGENCE (Top 12):
${ragContext.pricing.slice(0, 12).map((p: any, i: number) => 
  `${i + 1}. ${p.item_name}: £${p.base_cost} (${p.wholesaler})`
).join('\n')}

PRACTICAL WORK INTELLIGENCE (Top 8):
${ragContext.practicalWork.slice(0, 8).map((pw: any, i: number) => {
  const durationHours = pw.typical_duration_minutes 
    ? (pw.typical_duration_minutes / 60).toFixed(1) 
    : (pw.duration_hours || 'N/A');
  const teamSize = pw.team_size || 1;
  return `${i + 1}. ${pw.primary_topic || pw.activity_description || 'Task'} - ${durationHours}hrs (${teamSize} person team)`;
}).join('\n')}`;

  console.log('🤖 Calling OpenAI for cost estimation (max 5 min timeout)...');
  console.log('📊 Prompt size:', systemPrompt.length + userPrompt.length, 'chars');

  // Add timeout protection (5 minutes for complex estimates)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error('⏱️ OpenAI call timeout after 300 seconds');
    controller.abort();
  }, 300000);

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
        max_completion_tokens: 12000
      }),
      signal: controller.signal
    });
  } catch (fetchError: any) {
    clearTimeout(timeoutId);
    if (fetchError.name === 'AbortError') {
      console.error('❌ OpenAI fetch aborted (timeout)');
      throw new Error('OpenAI request timed out after 5 minutes');
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
    if (data.choices[0].finish_reason === 'length') {
      throw new Error('Response too long - try simplifying your query or breaking it into smaller estimates');
    }
    throw new Error(`Empty response from OpenAI (finish_reason: ${data.choices[0].finish_reason})`);
  }

  console.log(`✅ OpenAI response: ${content.length} chars`);
  console.log(`📊 Token usage: ${data.usage?.completion_tokens || 'N/A'} completion, ${data.usage?.prompt_tokens || 'N/A'} prompt`);

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

  // FALLBACK: Add complexity if AI didn't return it
  if (!parsedEstimate.complexity) {
    console.warn('⚠️ No complexity returned by AI - adding fallback');
    const totalHours = parsedEstimate.labour?.totalHours || 8;
    
    // Calculate rating based on hours: 1-8hrs=Low, 9-24hrs=Moderate, 25-48hrs=Moderate-High, 49+hrs=High
    let rating = 1;
    let label = 'Low';
    
    if (totalHours <= 8) {
      rating = Math.min(2, Math.max(1, Math.ceil(totalHours / 4)));
      label = 'Low';
    } else if (totalHours <= 24) {
      rating = Math.min(4, Math.max(3, Math.ceil(totalHours / 6)));
      label = 'Moderate';
    } else if (totalHours <= 48) {
      rating = Math.min(6, Math.max(5, Math.ceil(totalHours / 8)));
      label = 'Moderate–High';
    } else {
      rating = Math.min(10, Math.max(7, Math.ceil(totalHours / 10)));
      label = totalHours > 80 ? 'Very High' : 'High';
    }
    
    parsedEstimate.complexity = {
      rating: rating,
      label: label,
      factors: ['Based on estimated labour hours', `${totalHours} total hours required`],
      estimatedHours: totalHours,
      reasoning: `Complexity rating of ${rating}/10 (${label}) estimated from ${totalHours} hours of total labour time.`
    };
  }

  // FALLBACK: Add riskAssessment if AI didn't return it
  if (!parsedEstimate.riskAssessment || !parsedEstimate.riskAssessment.risks?.length) {
    console.warn('⚠️ No riskAssessment returned by AI - adding fallback');
    parsedEstimate.riskAssessment = {
      risks: [
        { 
          title: 'Unforeseen site conditions', 
          severity: 'medium', 
          likelihood: 'medium', 
          mitigation: 'Allow contingency time and budget for unexpected issues', 
          contingencyPercent: 5 
        },
        { 
          title: 'Access difficulties', 
          severity: 'low', 
          likelihood: 'medium', 
          mitigation: 'Pre-survey site access and confirm arrangements with client', 
          contingencyPercent: 2 
        },
        { 
          title: 'Existing installation issues', 
          severity: 'medium', 
          likelihood: 'medium', 
          mitigation: 'Conduct thorough inspection before quoting final price', 
          contingencyPercent: 3 
        }
      ]
    };
  }

  // FALLBACK: Add siteChecklist if AI didn't return it
  if (!parsedEstimate.siteChecklist) {
    console.warn('⚠️ No siteChecklist returned by AI - adding fallback');
    parsedEstimate.siteChecklist = {
      critical: [
        'Isolate electrical supply and verify dead before work starts',
        'Verify safe access to work areas',
        'Confirm asbestos survey if building pre-2000',
        'Check existing earthing system adequacy'
      ],
      important: [
        'Clear work area of furniture and obstructions',
        'Arrange parking for van near property',
        'Confirm client or keyholder available during work',
        'Ensure adequate lighting in work areas'
      ],
      documentation: [
        'Electrical Installation Certificate (EIC) required on completion',
        'Part P Building Regulations notification if applicable',
        'Test certificates and schedules',
        'Manufacturer warranties for installed equipment',
        'Public liability insurance certificate if requested'
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
  // IMPORTANT: Labour rate (£45/hr) ALREADY includes overheads
  // Don't double-count by adding overheads separately!
  
  const jobDuration = costEstimate.timescales?.totalDays || 1;
  const materialsTotal = costEstimate.summary.materialsSubtotal;
  const labourTotal = costEstimate.summary.labourSubtotal;
  
  // Calculate 5% contingency for materials & labour
  const contingency = (materialsTotal + labourTotal) * 0.05;
  
  // Base Quote = Your absolute minimum (materials + labour + contingency)
  // This covers all costs because labour rate already includes overheads
  const baseQuote = materialsTotal + labourTotal + contingency;
  
  // SIMPLIFIED: 2 pricing tiers only - Standard and Busy Period
  const standardMargin = 0.20;  // 20% profit - your normal healthy margin
  const busyMargin = 0.35;      // 35% profit - when demand is high
  
  const result = {
    directCosts: { 
      materials: materialsTotal, 
      labour: labourTotal, 
      contingency: contingency,
      total: materialsTotal + labourTotal + contingency
    },
    breakEvenPoint: baseQuote, // ADD: What frontend expects for "Your Minimum Quote"
    baseQuote: {
      subtotal: baseQuote,
      vat: baseQuote * 0.20,
      total: baseQuote * 1.20,
      explanation: 'Your minimum quote - covers materials, labour, and contingency. Labour rate already includes your overheads.'
    },
    quoteTiers: {
      standard: {
        margin: standardMargin,
        subtotal: baseQuote * (1 + standardMargin),
        vat: (baseQuote * (1 + standardMargin)) * 0.20,
        total: (baseQuote * (1 + standardMargin)) * 1.20,
        profit: baseQuote * standardMargin,
        price: (baseQuote * (1 + standardMargin)) * 1.20,
        explanation: 'Standard 20% profit - healthy business margin for normal periods'
      },
      busy: {
        margin: busyMargin,
        subtotal: baseQuote * (1 + busyMargin),
        vat: (baseQuote * (1 + busyMargin)) * 0.20,
        total: (baseQuote * (1 + busyMargin)) * 1.20,
        profit: baseQuote * busyMargin,
        price: (baseQuote * (1 + busyMargin)) * 1.20,
        explanation: 'Busy Period 35% profit - when you\'re in high demand'
      }
    },
    recommendedQuote: {  // ADD: Default recommendation for frontend
      tier: 'standard',
      amount: (baseQuote * (1 + standardMargin)) * 1.20
    }
  };
  
  return result;
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

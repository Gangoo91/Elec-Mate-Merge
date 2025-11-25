/**
 * Cost Engineer Core Logic
 * Complete business logic extracted from edge function
 * Pattern: Same as installation-method-core.ts
 */

import { searchPricingIntelligence } from '../_shared/rag-pricing.ts';
import { searchPracticalWorkIntelligence } from '../_shared/rag-practical-work.ts';

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

  // STEP 2: Parallel RAG searches
  const ragStart = Date.now();
  const [pricingResult, practicalWork] = await Promise.all([
    searchPricingIntelligence(supabase, {
      query: request.query,
      categories: ['cables', 'protection', 'accessories', 'consumer_units'],
      matchCount: 30
    }),
    searchPracticalWorkIntelligence(supabase, {
      query: request.query,
      tradeFilter: 'installer',
      matchCount: 20
    })
  ]);

  const ragTime = Date.now() - ragStart;
  console.log(`⚡ RAG complete in ${ragTime}ms:`, {
    pricingHits: pricingResult.results.length,
    practicalWorkHits: practicalWork.results.length
  });

  // STEP 3: Call OpenAI for cost estimation
  const aiStart = Date.now();
  const costEstimate = await callCostEstimationAI(
    request,
    {
      pricing: pricingResult.results,
      practicalWork: practicalWork.results,
      keywords: Array.from(keywords)
    }
  );
  const aiTime = Date.now() - aiStart;

  // STEP 4: Calculate profitability if requested
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

async function callCostEstimationAI(
  request: CostEngineerRequest,
  ragContext: any
): Promise<CostEstimate> {
  const systemPrompt = `You are an expert Electrical Cost Engineer for UK installations.

Generate a detailed cost estimate based on BS 7671:2018+A2:2024 and current UK pricing (2025).

KNOWLEDGE BASE PROVIDED:
- ${ragContext.pricing.length} pricing intelligence results
- ${ragContext.practicalWork.length} practical work intelligence results
- Keywords: ${ragContext.keywords.slice(0, 15).join(', ')}

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
  "valueEngineering": ["Suggestion 1", "Suggestion 2"]
}

REQUIREMENTS:
- Use ACTUAL UK trade prices from knowledge base
- Include 10% cable waste and 5% materials contingency
- Labour rates: Electrician £${request.businessSettings?.labourRate || 45}/hr
- Regional multiplier: ${getRegionalMultiplier(request.region || 'other')}x
- Include all fixings, accessories, and sundries
- Realistic time estimates based on practical work intelligence
- UK English spelling (metres, colour, earthing)
- All prices in GBP (£)
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
  `${i + 1}. ${p.product_name}: £${p.price_gbp} (${p.supplier})`
).join('\n')}

PRACTICAL WORK INTELLIGENCE (Top 10):
${ragContext.practicalWork.slice(0, 10).map((pw: any, i: number) => 
  `${i + 1}. ${pw.activity_description || pw.task_name} - ${pw.duration_hours}hrs`
).join('\n')}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
    })
  });

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
  try {
    return JSON.parse(content);
  } catch (parseError: any) {
    console.error('❌ JSON parse failed:', parseError.message);
    console.error('📋 Raw content (first 500 chars):', content.substring(0, 500));
    throw new Error(`Failed to parse OpenAI JSON: ${parseError.message}`);
  }
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

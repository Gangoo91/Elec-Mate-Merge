// Profitability Calculation Helper Functions
// Completely standalone - NO shared dependencies to avoid bundling issues

export interface ProfitabilityAnalysis {
  directCosts: {
    materials: number;
    labour: number;
    total: number;
  };
  jobOverheads: {
    estimatedDuration: string;
    overheadAllocation: number;
    total: number;
  };
  breakEven: {
    subtotal: number;
    vat: number;
    total: number;
    explanation: string;
  };
  quotingGuidance: {
    minimum: QuoteOption;
    target: QuoteOption;
    premium: QuoteOption;
  };
}

export interface QuoteOption {
  margin: number;
  subtotal: number;
  vat: number;
  total: number;
  profit: number;
  explanation: string;
}

/**
 * Create fallback profitability when AI fails
 */
export function createFallbackProfitability(costResult: any): ProfitabilityAnalysis {
  const jobDuration = costResult.timescales?.totalDays || 1;
  const materialsTotal = costResult.summary?.materialsSubtotal || 0;
  const labourTotal = costResult.summary?.labourSubtotal || 0;
  const directTotal = materialsTotal + labourTotal;
  const overheadAllocation = jobDuration * 35;
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

/**
 * Calculate profitability using OpenAI API directly (no shared utilities)
 */
export async function calculateProfitabilityAnalysis(
  costResult: any,
  businessSettings: any,
  LOVABLE_API_KEY: string,
  logger: any
): Promise<ProfitabilityAnalysis> {
  try {
    logger.info('🧮 Calculating profitability analysis');
    
    const materialsTotal = costResult.summary?.materialsSubtotal || 0;
    const labourTotal = costResult.summary?.labourSubtotal || 0;
    const jobDuration = costResult.timescales?.totalDays || 1;

    const prompt = `Calculate profitability for UK electrical job:

Direct Costs:
- Materials: £${materialsTotal}
- Labour: £${labourTotal}
- Job duration: ${jobDuration} days

Business overheads: £35/day
Calculate break-even and three quote tiers (15%, 25%, 35% margins).

Return JSON:
{
  "directCosts": {"materials": number, "labour": number, "total": number},
  "jobOverheads": {"estimatedDuration": "X days", "overheadAllocation": number, "total": number},
  "breakEven": {"subtotal": number, "vat": number, "total": number, "explanation": "string"},
  "quotingGuidance": {
    "minimum": {"margin": 15, "subtotal": number, "vat": number, "total": number, "profit": number, "explanation": "string"},
    "target": {"margin": 25, "subtotal": number, "vat": number, "total": number, "profit": number, "explanation": "string"},
    "premium": {"margin": 35, "subtotal": number, "vat": number, "total": number, "profit": number, "explanation": "string"}
  }
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a UK electrical business profitability calculator. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '{}';
    const cleanJson = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleanJson);

    logger.info('✅ Profitability calculated', { breakEven: result.breakEven?.total });
    return result as ProfitabilityAnalysis;

  } catch (error: any) {
    logger.error('❌ Profitability failed, using fallback', { error: error.message });
    return createFallbackProfitability(costResult);
  }
}

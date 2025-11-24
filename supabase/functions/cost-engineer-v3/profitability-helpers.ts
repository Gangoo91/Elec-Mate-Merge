// Profitability Calculation Helper Functions
// Extracted from monolithic index.ts to eliminate syntax errors

import { callLovableAIWithTimeout, parseJsonWithRepair } from '../_shared/v3-core.ts';

export interface ProfitabilityAnalysis {
  directCosts: {
    materials: number;
    labour: number;
    total: number;
  };
  jobOverheads: {
    estimatedDuration: string;
    overheadAllocation: number;
    travelCosts?: number;
    permitsCosts?: number;
    wasteCosts?: number;
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
  recommendations?: string[];
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
 * Pure function: Create fallback profitability structure
 * Used when AI profitability calculation fails
 */
export function createFallbackProfitability(costResult: any): ProfitabilityAnalysis {
  const jobDuration = costResult.timescales?.totalDays || 1;
  const materialsTotal = costResult.summary?.materialsSubtotal || 0;
  const labourTotal = costResult.summary?.labourSubtotal || 0;
  const directTotal = materialsTotal + labourTotal;
  const jobOverheadsTotal = jobDuration * 35; // £35/day overhead
  const breakEvenSubtotal = directTotal + jobOverheadsTotal;
  
  return {
    directCosts: { 
      materials: materialsTotal, 
      labour: labourTotal, 
      total: directTotal 
    },
    jobOverheads: {
      estimatedDuration: `${jobDuration} day${jobDuration > 1 ? 's' : ''}`,
      overheadAllocation: jobOverheadsTotal,
      travelCosts: 0,
      permitsCosts: 0,
      wasteCosts: 0,
      total: jobOverheadsTotal
    },
    breakEven: {
      subtotal: breakEvenSubtotal,
      vat: breakEvenSubtotal * 0.20,
      total: breakEvenSubtotal * 1.20,
      explanation: `You must charge at least this amount to cover all direct costs (£${directTotal.toFixed(2)}) plus allocated job overheads (£${jobOverheadsTotal.toFixed(2)}).`
    },
    quotingGuidance: {
      minimum: {
        margin: 10,
        subtotal: breakEvenSubtotal * 1.10,
        vat: breakEvenSubtotal * 1.10 * 0.20,
        total: breakEvenSubtotal * 1.10 * 1.20,
        profit: breakEvenSubtotal * 0.10,
        explanation: `Minimum viable quote - covers costs with small 10.0% margin`
      },
      target: {
        margin: 25,
        subtotal: breakEvenSubtotal * 1.25,
        vat: breakEvenSubtotal * 1.25 * 0.20,
        total: breakEvenSubtotal * 1.25 * 1.20,
        profit: breakEvenSubtotal * 0.25,
        explanation: `Recommended quote - healthy 25.0% profit margin for business growth`
      },
      premium: {
        margin: 35,
        subtotal: breakEvenSubtotal * 1.35,
        vat: breakEvenSubtotal * 1.35 * 0.20,
        total: breakEvenSubtotal * 1.35 * 1.20,
        profit: breakEvenSubtotal * 0.35,
        explanation: `Premium quote - strong 35.0% margin for high-value clients`
      }
    },
    recommendations: ["Profitability analysis used fallback calculations - review manually"]
  };
}

/**
 * Async function: Calculate profitability analysis using AI
 * Runs as background task via EdgeRuntime.waitUntil()
 */
export async function calculateProfitabilityAnalysis(
  costResult: any,
  businessSettings: any,
  LOVABLE_API_KEY: string,
  logger: any
): Promise<ProfitabilityAnalysis> {
  try {
    logger.info('🧮 Calculating profitability analysis');
    
    const profitabilitySystemPrompt = `Profitability Analysis for UK Electrician

CRITICAL JSON FORMATTING: Never use contractions (it's → it is, we're → we are, don't → do not). Always use full words.

BUSINESS SETTINGS:
Monthly Overheads:
- Van costs: £${businessSettings.monthlyOverheads.vanCosts}
- Tool depreciation: £${businessSettings.monthlyOverheads.toolDepreciation}
- Business insurance: £${businessSettings.monthlyOverheads.insurance}
- Office/admin: £${businessSettings.monthlyOverheads.adminCosts}
- Marketing: £${businessSettings.monthlyOverheads.marketing}
- Total monthly overheads: £${Object.values(businessSettings.monthlyOverheads).reduce((a: number, b: number) => a + b, 0)}/month
- Per working day (22 days): £${(Object.values(businessSettings.monthlyOverheads).reduce((a: number, b: number) => a + b, 0) / 22).toFixed(2)}/day

Labour Rates:
- Qualified electrician: £${businessSettings.labourRates.electrician}/hr
- Apprentice: £${businessSettings.labourRates.apprentice}/hr
- Target personal income: £${businessSettings.labourRates.targetIncome}/month

Profit Margin Targets (REDUCED FOR REALISTIC PRICING):
- Minimum margin: 15% (was 20%)
- Target margin: 25% (was 30%)
- Premium margin: 35% (was 40%)

Job-Specific Costs:
- Average travel per job: £${businessSettings.jobCosts.travel}
- Permits/parking: £${businessSettings.jobCosts.permits}
- Waste disposal: £${businessSettings.jobCosts.waste}

CURRENT JOB COSTS:
- Materials subtotal (with markup): £${costResult.summary.materialsSubtotal}
- Materials NET (before markup): £${(costResult.summary.materialsSubtotal / 1.12).toFixed(2)}
- Labour subtotal: £${costResult.summary.labourSubtotal}
- Total labour hours: ${costResult.labour.tasks.reduce((sum: number, task: any) => sum + (task.hours || 0), 0)} hours
- Estimated job duration: ${costResult.timescales?.totalDays || 0} days

PROFITABILITY CALCULATION REQUIREMENTS (FIXED FOR REALISTIC PRICING):
1. Estimate total job duration in working days (use timescales.totalDays from job)
2. Calculate job overhead allocation:
   - Daily overhead rate = monthly overheads / 22 working days
   - Job overhead = daily rate × estimated job days
   - Add job-specific costs (travel + permits + waste)
3. Calculate break-even point (CRITICAL - USE NET MATERIAL COSTS):
   - Materials NET = materials subtotal / 1.12 (reverse the 12% markup)
   - Direct costs = materials NET + labour subtotal
   - Job overheads = allocated overheads + travel + permits + waste
   - Break-even subtotal = direct costs + job overheads
   - Break-even VAT = break-even subtotal × 0.20
   - Break-even total = break-even subtotal + VAT
4. Calculate profitability tiers (REDUCED MARGINS):
   - Minimum: break-even subtotal × 1.15 (15% margin)
   - Target: break-even subtotal × 1.25 (25% margin) ← RECOMMENDED
   - Premium: break-even subtotal × 1.35 (35% margin)
5. For each tier, calculate:
   - Margin amount = (tier subtotal - break-even subtotal)
   - VAT = tier subtotal × 0.20
   - Total with VAT = tier subtotal + VAT
6. Provide clear recommendations

VALIDATION: Ensure 3-bed rewire quotes fall within £4,000-6,500 range

Return ONLY profitability analysis object.`;

    const profitabilityUserPrompt = `Calculate profitability analysis for this job using the business settings and job costs above.`;

    const profitabilityResult = await callLovableAIWithTimeout(LOVABLE_API_KEY, {
      model: 'gemini-2.0-flash-001',
      systemPrompt: profitabilitySystemPrompt,
      userPrompt: profitabilityUserPrompt,
      maxTokens: 4000,
      timeoutMs: 280000,
      jsonMode: true
    });

    logger.info('✅ Profitability AI call completed');

    // Parse result
    const profitabilityAnalysis = parseJsonWithRepair(
      profitabilityResult.content, 
      logger, 
      'profitability-analysis'
    );
    
    // Transform to expected format
    const jobDuration = costResult.timescales?.totalDays || 1;
    const breakEvenSubtotal = profitabilityAnalysis.breakEvenPoint || 0;
    const minimumPrice = profitabilityAnalysis.quoteTiers?.minimum?.price || 0;
    const targetPrice = profitabilityAnalysis.quoteTiers?.target?.price || 0;
    const premiumPrice = profitabilityAnalysis.quoteTiers?.premium?.price || 0;
    
    return {
      directCosts: profitabilityAnalysis.directCosts || { materials: 0, labour: 0, total: 0 },
      jobOverheads: {
        estimatedDuration: `${jobDuration} day${jobDuration > 1 ? 's' : ''}`,
        overheadAllocation: profitabilityAnalysis.jobOverheads?.allocatedBusinessOverheads || 0,
        travelCosts: profitabilityAnalysis.jobOverheads?.travel || 0,
        permitsCosts: profitabilityAnalysis.jobOverheads?.permitsAndFees || 0,
        wasteCosts: profitabilityAnalysis.jobOverheads?.wasteDisposal || 0,
        total: profitabilityAnalysis.jobOverheads?.total || 0
      },
      breakEven: {
        subtotal: breakEvenSubtotal,
        vat: breakEvenSubtotal * 0.20,
        total: breakEvenSubtotal * 1.20,
        explanation: `You must charge at least this amount to cover all direct costs (£${(profitabilityAnalysis.directCosts?.total || 0).toFixed(2)}) plus allocated job overheads (£${(profitabilityAnalysis.jobOverheads?.total || 0).toFixed(2)}).`
      },
      quotingGuidance: {
        minimum: {
          margin: profitabilityAnalysis.quoteTiers?.minimum?.marginPercent || 0,
          subtotal: minimumPrice,
          vat: minimumPrice * 0.20,
          total: minimumPrice * 1.20,
          profit: profitabilityAnalysis.quoteTiers?.minimum?.margin || 0,
          explanation: `Minimum viable quote - covers costs with small ${(profitabilityAnalysis.quoteTiers?.minimum?.marginPercent || 0).toFixed(1)}% margin`
        },
        target: {
          margin: profitabilityAnalysis.quoteTiers?.target?.marginPercent || 0,
          subtotal: targetPrice,
          vat: targetPrice * 0.20,
          total: targetPrice * 1.20,
          profit: profitabilityAnalysis.quoteTiers?.target?.margin || 0,
          explanation: `Recommended quote - healthy ${(profitabilityAnalysis.quoteTiers?.target?.marginPercent || 0).toFixed(1)}% profit margin for business growth`
        },
        premium: {
          margin: profitabilityAnalysis.quoteTiers?.premium?.marginPercent || 0,
          subtotal: premiumPrice,
          vat: premiumPrice * 0.20,
          total: premiumPrice * 1.20,
          profit: profitabilityAnalysis.quoteTiers?.premium?.margin || 0,
          explanation: `Premium quote - strong ${(profitabilityAnalysis.quoteTiers?.premium?.marginPercent || 0).toFixed(1)}% margin for high-value clients`
        }
      },
      recommendations: profitabilityAnalysis.recommendations || []
    };
    
  } catch (error) {
    logger.error('Profitability calculation failed, using fallback', { error });
    return createFallbackProfitability(costResult);
  }
}

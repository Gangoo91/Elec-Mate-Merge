import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Copy, Download, Eye, ChevronRight, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { transformCostOutputToQuoteItems, CostEngineerOutput } from "@/utils/cost-to-quote-transformer";
import ComprehensiveResultsView from "./comprehensive/ComprehensiveResultsView";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface CostAnalysisResultsProps {
  analysis: ParsedCostAnalysis;
  projectName?: string;
  originalQuery?: string;
  onNewAnalysis: () => void;
  structuredData?: any; // V3 structured response
  projectContext?: {
    projectName?: string;
    clientInfo?: string;
    location?: string;
    additionalInfo?: string;
    projectType?: string;
  };
}

const CostAnalysisResults = ({ analysis, projectName, originalQuery, onNewAnalysis, structuredData, projectContext }: CostAnalysisResultsProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);
  const [showQuoteHubConfirm, setShowQuoteHubConfirm] = useState(false);
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(analysis.rawText);
    toast({
      title: "Copied to clipboard",
      description: "Cost analysis has been copied to your clipboard",
    });
  };

  const buildPdfPayload = () => {
    // Debug logging: Check what data we have
    console.log('📦 Building PDF payload from structuredData:', {
      hasStructuredData: !!structuredData,
      hasResponse: !!structuredData?.response,
      hasComplexity: !!structuredData?.complexity,
      hasConfidence: !!structuredData?.confidence,
      confidenceFields: structuredData?.confidence ? Object.keys(structuredData.confidence) : [],
      materialsConfidence: structuredData?.confidence?.materials,
      labourConfidence: structuredData?.confidence?.labour,
      hasRiskAssessment: !!structuredData?.riskAssessment,
      hasMaterials: !!structuredData?.materials,
      hasLabour: !!structuredData?.labour,
      hasUpsells: !!structuredData?.upsells,
      hasProfitability: !!structuredData?.profitabilityAnalysis
    });

    // Helper to round to 2 decimal places
    const round2dp = (value: number) => Math.round((value || 0) * 100) / 100;

    // Recursive helper to round all numbers in nested objects/arrays
    const roundNumbers = (obj: any): any => {
      if (typeof obj === 'number') {
        return round2dp(obj);
      }
      if (Array.isArray(obj)) {
        return obj.map(item => roundNumbers(item));
      }
      if (obj !== null && typeof obj === 'object') {
        const rounded: any = {};
        for (const key in obj) {
          rounded[key] = roundNumbers(obj[key]);
        }
        return rounded;
      }
      return obj;
    };

    // Calculate derived metrics (matching ComprehensiveResultsView.tsx)
    const totalLabourHours = round2dp(structuredData?.labour?.tasks?.reduce(
      (sum: number, t: any) => sum + (t.hours || 0), 0
    ) || 0);
    
    const breakEven = round2dp(structuredData?.profitabilityAnalysis?.breakEvenPoint || analysis.subtotal || 0);
    const selectedTier = structuredData?.recommendedQuote?.tier || 'normal';
    const selectedAmount = round2dp(structuredData?.recommendedQuote?.amount || analysis.totalCost || 0);
    
    const profit = round2dp(selectedAmount - breakEven);
    const margin = round2dp(breakEven > 0 ? ((selectedAmount - breakEven) / selectedAmount) * 100 : 0);
    const profitPerHour = round2dp(totalLabourHours > 0 ? profit / totalLabourHours : 0);

    // Calculate tier prices (matching PricingOptionsTiers.tsx logic)
    const sparsePrice = structuredData?.profitabilityAnalysis?.quoteTiers?.minimum?.price || breakEven * 1.2;
    const normalPrice = structuredData?.profitabilityAnalysis?.quoteTiers?.target?.price || breakEven * 1.3;
    const busyPrice = structuredData?.profitabilityAnalysis?.quoteTiers?.premium?.price || breakEven * 1.4;

    // Helper function to calculate tier metrics
    const calculateTierMetrics = (price: number) => {
      const profit = price - breakEven;
      const margin = price > 0 ? ((profit / price) * 100) : 0;
      const profitPerHour = totalLabourHours > 0 ? profit / totalLabourHours : 0;
      
      return { 
        price: round2dp(Math.max(0, price)),
        margin: round2dp(Math.max(0, margin)),
        profit: round2dp(Math.max(0, profit)),
        profitPerHour: round2dp(Math.max(0, profitPerHour))
      };
    };

    // Calculate all three tiers
    const sparseTier = calculateTierMetrics(sparsePrice);
    const normalTier = calculateTierMetrics(normalPrice);
    const busyTier = calculateTierMetrics(busyPrice);

    // Calculate cost breakdown components
    const materialsSubtotal = round2dp(structuredData?.materials?.subtotal || analysis.materialsTotal || 0);
    const materialsMarkup = round2dp(structuredData?.materials?.markup || 15);
    const labourSubtotal = round2dp(structuredData?.labour?.subtotal || analysis.labourTotal || 0);
    const overheadsTotal = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.total || 0);
    const contingencyPercentage = round2dp(structuredData?.confidence?.contingency?.percentage || 5);
    const contingencyAmount = round2dp((materialsSubtotal + labourSubtotal) * (contingencyPercentage / 100));

    const payload = {
      // 0. Original User Request
      originalRequest: {
        query: originalQuery || '',
        timestamp: new Date().toISOString(),
        projectContext: {
          projectName: projectContext?.projectName || '',
          clientInfo: projectContext?.clientInfo || '',
          location: projectContext?.location || '',
          additionalInfo: projectContext?.additionalInfo || ''
        }
      },
      
      // 1. AI Analysis Header
      aiAnalysisHeader: {
        jobDescription: structuredData?.response || '',
        complexity: structuredData?.complexity ? {
          rating: structuredData.complexity.rating || 0,
          label: structuredData.complexity.label || 'Unknown',
          score: round2dp(structuredData.complexity.score || 0)
        } : null,
        confidence: (() => {
          if (!structuredData?.confidence) return null;
          const materialsLevel = structuredData.confidence.materials?.level || 0;
          const labourLevel = structuredData.confidence.labour?.level || 0;
          const avgConfidence = Math.round((materialsLevel + labourLevel) / 2);
          
          return {
            averagePercentage: avgConfidence,
            materials: {
              level: materialsLevel,
              reasoning: structuredData.confidence.materials?.reason || ''
            },
            labour: {
              level: labourLevel,
              reasoning: structuredData.confidence.labour?.reason || ''
            }
          };
        })(),
        riskAssessment: (() => {
          if (!structuredData?.riskAssessment?.risks) return null;
          const highRisks = structuredData.riskAssessment.risks.filter((r: any) => 
            r.severity === 'critical' || r.severity === 'high'
          );
          
          return {
            highRiskCount: highRisks.length,
            totalRiskCount: structuredData.riskAssessment.risks.length,
            level: highRisks.length > 0 ? 'high' : 'low',
            highRisks: highRisks.map((r: any) => ({
              title: r.title || r.risk,
              severity: r.severity,
              mitigation: r.mitigation || ''
            }))
          };
        })(),
        recommendedTier: structuredData?.recommendedQuote?.tier?.toUpperCase() || 'NORMAL',
        keyActionItems: (() => {
          const actions: Array<{text: string, priority: string}> = [];
          
          // Action 1: Critical site checks
          if (structuredData?.siteChecklist?.critical?.[0]) {
            actions.push({
              text: structuredData.siteChecklist.critical[0],
              priority: 'critical'
            });
          }
          
          // Action 2: Payment terms
          if (structuredData?.paymentTerms) {
            actions.push({
              text: `Secure ${structuredData.paymentTerms.depositPercent}% deposit (£${round2dp(structuredData.paymentTerms.depositAmount || 0)}) before starting`,
              priority: 'high'
            });
          }
          
          // Action 3: High-value upsell or risk mitigation
          const hotUpsell = structuredData?.upsells?.find((u: any) => u.isHot);
          if (hotUpsell) {
            actions.push({
              text: `Offer ${hotUpsell.opportunity} (+£${round2dp(hotUpsell.price || 0)}) - ${hotUpsell.winRate}% win rate`,
              priority: 'medium'
            });
          } else if (structuredData?.riskAssessment?.risks?.[0]) {
            const topRisk = structuredData.riskAssessment.risks[0];
            actions.push({
              text: topRisk.mitigation,
              priority: 'high'
            });
          }
          
          return actions.slice(0, 3);
        })()
      },
      
      // 1. Project Context
      projectContext: {
        projectName: projectContext?.projectName || projectName || 'Electrical Project',
        clientInfo: projectContext?.clientInfo || '',
        location: projectContext?.location || '',
        additionalInfo: projectContext?.additionalInfo || '',
        projectType: projectContext?.projectType || 'domestic'
      },
      
      // 2. Cost Breakdown Summary
      costBreakdown: {
        materials: {
          percentage: materialsMarkup,
          amount: round2dp(materialsSubtotal * (materialsMarkup / 100)),
          material: materialsSubtotal,
          total: round2dp(materialsSubtotal + (materialsSubtotal * (materialsMarkup / 100)))
        },
        labour: labourSubtotal,
        overheads: overheadsTotal,
        contingency: {
          percentage: contingencyPercentage,
          amount: contingencyAmount
        },
        subtotal: round2dp(materialsSubtotal + labourSubtotal + overheadsTotal + contingencyAmount),
        breakEvenPoint: round2dp(breakEven)
      },
      
      // 2. Core Cost Analysis (enhanced with all V3 data)
      costAnalysis: {
        response: structuredData?.response || analysis.rawText,
        materials: structuredData?.materials ? {
          ...structuredData.materials,
          items: (structuredData.materials.items || []).map((item: any) => ({
            ...item,
            quantity: round2dp(item.quantity || 0),
            unitPrice: round2dp(item.unitPrice || 0),
            total: round2dp(item.total || 0)
          })),
          subtotal: round2dp(structuredData.materials.subtotal || 0),
          markup: round2dp(structuredData.materials.markup || 0)
        } : {
          items: analysis.materials.map((item: any) => ({
            ...item,
            quantity: round2dp(item.quantity || 0),
            unitPrice: round2dp(item.unitPrice || 0),
            total: round2dp(item.total || 0)
          })),
          subtotal: round2dp(analysis.materialsTotal || 0),
          markup: round2dp(0)
        },
        labour: structuredData?.labour ? {
          ...structuredData.labour,
          tasks: (structuredData.labour.tasks || []).map((task: any) => ({
            ...task,
            hours: round2dp(task.hours || 0),
            rate: round2dp(task.rate || 0),
            total: round2dp(task.total || 0),
            electricianHours: task.electricianHours ? round2dp(task.electricianHours) : undefined,
            apprenticeHours: task.apprenticeHours ? round2dp(task.apprenticeHours) : undefined
          })),
          subtotal: round2dp(structuredData.labour.subtotal || 0)
        } : {
          tasks: [{
            description: analysis.labour.description,
            hours: round2dp(analysis.labour.hours || 0),
            rate: round2dp(analysis.labour.rate || 0),
            total: round2dp(analysis.labour.total || 0)
          }],
          subtotal: round2dp(analysis.labourTotal || 0)
        },
        summary: structuredData?.summary || {
          subtotal: round2dp(analysis.subtotal || 0),
          vat: round2dp(analysis.vatAmount || 0),
          grandTotal: round2dp(analysis.totalCost || 0)
        },
        contingency: {
          percentage: round2dp(structuredData?.confidence?.contingency?.percentage || 5),
          amount: round2dp((analysis.materialsTotal + analysis.labourTotal) * ((structuredData?.confidence?.contingency?.percentage || 5) / 100)),
          reasoning: structuredData?.confidence?.contingency?.reasoning || 'Standard contingency buffer for unforeseen issues'
        },
        timescales: structuredData?.timescales || null,
        alternatives: structuredData?.alternatives || null,
        orderList: structuredData?.orderList || null,
        compliance: structuredData?.compliance || null
      },
      
      // 3. Job Assessment
      complexity: structuredData?.complexity ? {
        ...structuredData.complexity,
        score: round2dp(structuredData.complexity.score || 0),
        estimatedHours: round2dp(structuredData.complexity.estimatedHours || 0)
      } : null,
      confidence: structuredData?.confidence ? {
        ...structuredData.confidence,
        score: round2dp(structuredData.confidence.score || 0),
        contingency: structuredData.confidence.contingency ? {
          percentage: round2dp(structuredData.confidence.contingency.percentage || 0),
          reasoning: structuredData.confidence.contingency.reasoning
        } : undefined
      } : null,
      riskAssessment: roundNumbers(structuredData?.riskAssessment || null),
      
      // 4. Pricing & Profitability
      recommendedQuote: structuredData?.recommendedQuote || null,
      profitabilityAnalysis: structuredData?.profitabilityAnalysis ? {
        ...structuredData.profitabilityAnalysis,
        breakEvenPoint: round2dp(structuredData.profitabilityAnalysis.breakEvenPoint || 0),
        directCosts: structuredData.profitabilityAnalysis.directCosts ? {
          materials: round2dp(structuredData.profitabilityAnalysis.directCosts.materials || 0),
          labour: round2dp(structuredData.profitabilityAnalysis.directCosts.labour || 0),
          total: round2dp(structuredData.profitabilityAnalysis.directCosts.total || 0)
        } : undefined,
        jobOverheads: structuredData.profitabilityAnalysis.jobOverheads ? {
          allocatedBusinessOverheads: round2dp(structuredData.profitabilityAnalysis.jobOverheads.allocatedBusinessOverheads || 0),
          travel: round2dp(structuredData.profitabilityAnalysis.jobOverheads.travel || 0),
          permitsAndFees: round2dp(structuredData.profitabilityAnalysis.jobOverheads.permitsAndFees || 0),
          wasteDisposal: round2dp(structuredData.profitabilityAnalysis.jobOverheads.wasteDisposal || 0),
          total: round2dp(structuredData.profitabilityAnalysis.jobOverheads.total || 0)
        } : undefined,
        quoteTiers: structuredData.profitabilityAnalysis.quoteTiers ? {
          minimum: {
            price: round2dp(structuredData.profitabilityAnalysis.quoteTiers.minimum.price || 0),
            margin: round2dp(structuredData.profitabilityAnalysis.quoteTiers.minimum.margin || 0),
            marginPercent: round2dp(structuredData.profitabilityAnalysis.quoteTiers.minimum.marginPercent || 0)
          },
          target: {
            price: round2dp(structuredData.profitabilityAnalysis.quoteTiers.target.price || 0),
            margin: round2dp(structuredData.profitabilityAnalysis.quoteTiers.target.margin || 0),
            marginPercent: round2dp(structuredData.profitabilityAnalysis.quoteTiers.target.marginPercent || 0)
          },
          premium: {
            price: round2dp(structuredData.profitabilityAnalysis.quoteTiers.premium.price || 0),
            margin: round2dp(structuredData.profitabilityAnalysis.quoteTiers.premium.margin || 0),
            marginPercent: round2dp(structuredData.profitabilityAnalysis.quoteTiers.premium.marginPercent || 0)
          }
        } : undefined,
        recommendations: structuredData.profitabilityAnalysis.recommendations || []
      } : null,
      
      // 4.5 Pricing Options (Calculated Tiers)
      pricingOptions: {
        explanation: structuredData?.recommendedQuote?.reasoning || null,
        rawTierPrices: {
          sparse: round2dp(sparsePrice),
          normal: round2dp(normalPrice),
          busy: round2dp(busyPrice)
        },
        tiers: {
          workSparse: {
            name: 'Work Sparse',
            description: 'Low margin pricing for when work is scarce',
            price: sparseTier.price,
            margin: sparseTier.margin,
            profit: sparseTier.profit,
            profitPerHour: sparseTier.profitPerHour
          },
          normal: {
            name: 'Normal',
            description: 'Target pricing - recommended',
            price: normalTier.price,
            margin: normalTier.margin,
            profit: normalTier.profit,
            profitPerHour: normalTier.profitPerHour,
            recommended: true
          },
          busyPeriod: {
            name: 'Busy Period',
            description: 'High margin pricing when demand is high',
            price: busyTier.price,
            margin: busyTier.margin,
            profit: busyTier.profit,
            profitPerHour: busyTier.profitPerHour
          }
        },
        selectedTier: selectedTier,
        breakEven: round2dp(breakEven),
        totalLabourHours: round2dp(totalLabourHours)
      },
      
      // 5. Calculated Metrics (for easy PDF access)
      calculatedMetrics: {
        totalLabourHours: round2dp(totalLabourHours),
        breakEven: round2dp(breakEven),
        selectedTier,
        selectedAmount: round2dp(selectedAmount),
        profit: round2dp(profit),
        margin: round2dp(margin),
        profitPerHour: round2dp(profitPerHour),
        vatAmount: round2dp(analysis.vatAmount || 0),
        totalIncVat: round2dp(analysis.totalCost || 0)
      },
      
      // 6. Client-facing Elements
      upsells: (structuredData?.upsells || []).map((upsell: any) => ({
        ...upsell,
        price: round2dp(upsell.price || 0),
        winRate: round2dp(upsell.winRate || 0)
      })),
      pipeline: (structuredData?.pipeline || []).map((item: any) => ({
        ...item,
        estimatedValue: round2dp(item.estimatedValue || 0),
        probability: round2dp(item.probability || 0)
      })),
      conversations: structuredData?.conversations || null,
      paymentTerms: structuredData?.paymentTerms ? {
        depositPercent: round2dp(structuredData.paymentTerms.depositPercent || 0),
        depositAmount: round2dp(structuredData.paymentTerms.depositAmount || 0),
        balanceAmount: round2dp(structuredData.paymentTerms.balanceAmount || 0),
        paymentMilestones: (structuredData.paymentTerms.paymentMilestones || []).map((milestone: any) => ({
          stage: milestone.stage || '',
          percentage: round2dp(milestone.percentage || 0),
          amount: round2dp(milestone.amount || 0),
          trigger: milestone.trigger || ''
        })),
        terms: structuredData.paymentTerms.terms || '',
        milestones: [] // Deprecated, kept for backward compatibility
      } : null,
      
      // 6.5. Client Quote Justification
      clientJustification: {
        valueProposition: `Professional Electrical Quote - ${formatCurrency(selectedAmount)}\n\nI'm a qualified electrician with 18th Edition certification and full NICEIC/NAPIT registration. This quote covers ${Math.round(totalLabourHours)} hours of professional work using quality materials from trusted UK suppliers.\n\nWhat's Included:\n✓ Quality materials: ${formatCurrency(materialsSubtotal * (1 + (materialsMarkup / 100)))}\n✓ Professional labour: ${formatCurrency(labourSubtotal)} (${Math.round(totalLabourHours)} hours)\n✓ Full BS7671:2018+A3:2024 compliance\n✓ Electrical Installation Certificate\n✓ £2M public liability insurance\n✓ 12-month workmanship guarantee\n\nThis is transparent, competitive pricing ensuring safety, compliance, and quality workmanship lasting 20+ years.`,
        keyNumbers: {
          materialsNet: round2dp(materialsSubtotal),
          materialsMarkup: round2dp(materialsMarkup),
          materialsTotal: round2dp(materialsSubtotal * (1 + (materialsMarkup / 100))),
          labourHours: round2dp(totalLabourHours),
          labourRate: round2dp(totalLabourHours > 0 ? labourSubtotal / totalLabourHours : 0),
          labourTotal: round2dp(labourSubtotal),
          overheads: round2dp(overheadsTotal),
          contingency: round2dp(contingencyAmount),
          breakEven: round2dp(breakEven),
          recommendedPrice: round2dp(selectedAmount),
          profit: round2dp(profit),
          margin: round2dp(margin),
          region: projectContext?.location || 'other'
        },
        objectionResponses: [
          {
            objection: "This seems expensive / too high",
            response: "I understand. Let me break down what's included:",
            details: `Materials: ${formatCurrency(materialsSubtotal * (1 + (materialsMarkup / 100)))}\n• Net cost ${formatCurrency(materialsSubtotal)} + ${materialsMarkup.toFixed(0)}% markup\n• Industry standard: 15-25%\n\nLabour: ${formatCurrency(labourSubtotal)} (${Math.round(totalLabourHours)} hours)\n• Rate: ${formatCurrency(totalLabourHours > 0 ? labourSubtotal / totalLabourHours : 0)}/hour\n• UK qualified rate: £24-35/hour\n\nBusiness Costs: ${formatCurrency(overheadsTotal)}\n• Van, tools, insurance, certifications\n\nThis reflects professional work lasting 20+ years.`
          },
          {
            objection: "I got a cheaper quote",
            response: "Lower quotes often cut corners. Questions to ask:",
            details: "⚠️ Are they:\n• 18th Edition qualified?\n• Fully insured (£2M)?\n• Providing certification?\n• Using quality materials?\n\n✓ Our quote includes all professional standards, warranties, and guarantees.\n\n❌ Budget quotes may:\n• Use unqualified labour\n• Skip testing\n• Add hidden extras\n\nYour safety isn't worth the risk."
          },
          {
            objection: "Can you discount?",
            response: "This price is already fair:",
            details: `Break-even: ${formatCurrency(breakEven)}\nQuote: ${formatCurrency(selectedAmount)}\nProfit: ${formatCurrency(profit)} (${margin.toFixed(1)}% margin)\n\nIndustry margins:\n• Budget: 10-15%\n• Professional: 20-30%\n• Specialist: 30-40%\n\nWhat I CAN do:\n• Phase the work\n• Adjust scope\n• Payment terms\n\nWhat I can't do:\n• Work below break-even\n• Cut safety corners`
          }
        ],
        comparisonChecklist: [
          "□ 18th Edition certified?",
          "□ NICEIC/NAPIT registered?",
          "□ £2M public liability insurance?",
          "□ Materials from trusted suppliers?",
          "□ Full EIC certification?",
          "□ Itemized quote breakdown?",
          "□ 12-month workmanship guarantee?",
          "□ Transparent pricing (no hidden extras)?"
        ],
        whyChoosePoints: [
          "✓ Qualified, insured electrician",
          "✓ Quality materials with warranties",
          "✓ Full compliance & certification",
          "✓ Professional standards throughout",
          "✓ Fair, transparent pricing",
          "✓ 12-month guarantee"
        ]
      },
      
      // 7. Project Execution
      siteChecklist: structuredData?.siteChecklist || null,
      valueEngineering: structuredData?.valueEngineering || [],
      
      // 8. Job Notes (User Input)
      jobNotes: (() => {
        const projectNameKey = projectContext?.projectName || projectName;
        if (!projectNameKey) return null;
        
        const stored = localStorage.getItem(`job-notes-${projectNameKey}`);
        if (!stored) return null;
        
        try {
          const notes = JSON.parse(stored);
          return {
            siteObservations: notes.siteObservations || '',
            pipelineNotes: notes.pipelineNotes || '',
            updatedAt: notes.updatedAt || null
          };
        } catch {
          return null;
        }
      })(),
      
      // 9. Post-Job Review (Tracking)
      postJobReview: {
        estimatedCost: round2dp(analysis.totalCost || 0),
        estimatedHours: round2dp(totalLabourHours),
        estimatedProfit: round2dp(profit)
      },
      
      // 10. Trade Intelligence (RAG Self-Validation)
      tradeIntelligence: structuredData?.tradeIntelligence ? {
        materialsCompleteness: {
          status: structuredData.tradeIntelligence.materialsCompleteness.status,
          score: round2dp(structuredData.tradeIntelligence.materialsCompleteness.score || 0),
          commentary: structuredData.tradeIntelligence.materialsCompleteness.commentary,
          missingItems: structuredData.tradeIntelligence.materialsCompleteness.missingItems || [],
          recommendations: structuredData.tradeIntelligence.materialsCompleteness.recommendations || []
        },
        labourRealism: {
          status: structuredData.tradeIntelligence.labourRealism.status,
          score: round2dp(structuredData.tradeIntelligence.labourRealism.score || 0),
          commentary: structuredData.tradeIntelligence.labourRealism.commentary,
          benchmarkComparison: structuredData.tradeIntelligence.labourRealism.benchmarkComparison || '',
          concerns: structuredData.tradeIntelligence.labourRealism.concerns || [],
          recommendations: structuredData.tradeIntelligence.labourRealism.recommendations || []
        },
        futureWorkLogic: {
          status: structuredData.tradeIntelligence.futureWorkLogic.status,
          score: round2dp(structuredData.tradeIntelligence.futureWorkLogic.score || 0),
          commentary: structuredData.tradeIntelligence.futureWorkLogic.commentary,
          relevanceCheck: structuredData.tradeIntelligence.futureWorkLogic.relevanceCheck || '',
          concerns: structuredData.tradeIntelligence.futureWorkLogic.concerns || [],
          recommendations: structuredData.tradeIntelligence.futureWorkLogic.recommendations || []
        },
        overallAssessment: {
          readyToQuote: structuredData.tradeIntelligence.overallAssessment.readyToQuote,
          summary: structuredData.tradeIntelligence.overallAssessment.summary,
          criticalIssues: structuredData.tradeIntelligence.overallAssessment.criticalIssues || []
        }
      } : null,
      
      // 11. Metadata
      generatedAt: new Date().toISOString(),
      version: '3.0'
    };
    
    // Debug logging: Verify payload completeness
    console.log('📦 Generated PDF payload:', {
      hasAiAnalysisHeader: !!payload.aiAnalysisHeader,
      aiAnalysisHeaderFields: payload.aiAnalysisHeader ? Object.keys(payload.aiAnalysisHeader) : [],
      hasJobDescription: !!payload.aiAnalysisHeader?.jobDescription,
      jobDescriptionLength: payload.aiAnalysisHeader?.jobDescription?.length || 0,
      hasComplexity: !!payload.aiAnalysisHeader?.complexity,
      complexityRating: payload.aiAnalysisHeader?.complexity?.rating,
      hasConfidence: !!payload.aiAnalysisHeader?.confidence,
      confidenceAvg: payload.aiAnalysisHeader?.confidence?.averagePercentage,
      materialsReasoning: payload.aiAnalysisHeader?.confidence?.materials?.reasoning?.substring(0, 50),
      labourReasoning: payload.aiAnalysisHeader?.confidence?.labour?.reasoning?.substring(0, 50),
      hasRiskAssessment: !!payload.aiAnalysisHeader?.riskAssessment,
      keyActionItemsCount: payload.aiAnalysisHeader?.keyActionItems?.length || 0,
      hasCostBreakdown: !!payload.costBreakdown,
      hasPricingOptions: !!payload.pricingOptions,
      hasMaterials: !!(payload.costAnalysis?.materials?.items?.length),
      materialsCount: payload.costAnalysis?.materials?.items?.length || 0,
      hasLabour: !!(payload.costAnalysis?.labour?.tasks?.length),
      labourCount: payload.costAnalysis?.labour?.tasks?.length || 0,
      hasUpsells: !!(payload.upsells?.length),
      upsellsCount: payload.upsells?.length || 0,
      hasPipeline: !!(payload.pipeline?.length),
      pipelineCount: payload.pipeline?.length || 0
    });
    
    return payload;
  };

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const pdfData = buildPdfPayload();
      
      // Call edge function to generate PDF
      const { data, error } = await supabase.functions.invoke('generate-cost-engineer-pdf', {
        body: pdfData
      });
      
      if (error) throw error;
      
      if (data.success && data.downloadUrl) {
        // Download PDF with custom filename
        const response = await fetch(data.downloadUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = data.filename || 'AI Cost Engineer.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "PDF Downloaded Successfully",
          description: "Your cost estimate PDF has been downloaded",
        });
      } else {
        throw new Error(data.error || 'PDF generation failed');
      }
      
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate PDF",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendToQuoteHub = () => {
    setShowQuoteHubConfirm(true);
  };

  const confirmSendToQuoteHub = () => {
    if (!structuredData) {
      toast({
        title: "No Data Available",
        description: "Unable to transfer to Quote Hub. Please generate a new cost estimate.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Transform structured data to CostEngineerOutput format
      const costOutput: CostEngineerOutput = {
        materials: (structuredData.materials?.items || []).map((item: any) => ({
          item: item.description || item.item || 'Material',
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice || 0,
          supplier: item.supplier || 'TBC',
          total: item.total || (item.quantity * item.unitPrice) || 0
        })),
        labour: {
          hours: structuredData.labour?.tasks?.reduce((sum: number, t: any) => sum + (t.hours || 0), 0) || 0,
          rate: structuredData.labour?.tasks?.[0]?.rate || 45,
          total: structuredData.labour?.subtotal || 0
        },
        totalCost: structuredData.profitabilityAnalysis?.breakEvenPoint || analysis.totalCost || 0,
        vatAmount: structuredData.summary?.vat || analysis.vatAmount,
        breakdown: {
          materialsTotal: structuredData.materials?.subtotal || analysis.materialsTotal || 0,
          labourTotal: structuredData.labour?.subtotal || analysis.labourTotal || 0
        },
        valueEngineering: structuredData.alternatives?.map((alt: any) => alt.description) || []
      };

      // Store in sessionStorage with a unique ID
      const sessionId = `cost-transfer-${Date.now()}`;
      sessionStorage.setItem(sessionId, JSON.stringify({
        costData: costOutput,
        projectContext: {
          projectName: projectContext?.projectName || projectName || 'Cost Engineer Project',
          description: originalQuery || '',
          location: projectContext?.location || '',
          projectType: projectContext?.projectType || 'domestic'
        }
      }));

      toast({
        title: "Transferring to Quote Hub",
        description: "Opening Quote Builder with cost data...",
      });

      // Navigate to Quote Builder with session ID
      navigate(`/electrician/quote-builder/create?costSessionId=${sessionId}`);
      
    } catch (error) {
      console.error('Error transferring to Quote Hub:', error);
      toast({
        title: "Transfer Failed",
        description: "Unable to transfer data to Quote Hub. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mobile-safe-area mobile-section-spacing animate-fade-in">
      {/* Comprehensive Results View */}
      <ComprehensiveResultsView
        analysis={analysis}
        structuredData={structuredData}
        projectContext={projectContext}
        originalQuery={originalQuery}
        onNewAnalysis={onNewAnalysis}
      />

      {/* Action Buttons - Reorganized with clear hierarchy */}
      <div className="space-y-3">
        {/* Primary Actions - Most Important */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            onClick={handleSendToQuoteHub}
            className="touch-manipulation bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-12"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to Quote Hub
          </Button>
          <Button 
            onClick={handleExportPDF}
            variant="outline"
            className="touch-manipulation h-12"
            disabled={isGeneratingPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Export Internal PDF'}
          </Button>
        </div>
        
        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleCopyToClipboard}
            variant="outline"
            size="sm"
            className="touch-manipulation"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Data
          </Button>
          <Button 
            onClick={() => setShowPayloadPreview(true)}
            variant="ghost"
            size="sm"
            className="touch-manipulation text-muted-foreground"
          >
            <Eye className="h-4 w-4 mr-2" />
            Debug
          </Button>
        </div>
      </div>

      {/* New Analysis Button */}
      <div className="pt-4 border-t border-elec-yellow/10">
        <Button
          onClick={onNewAnalysis}
          className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold touch-manipulation h-12"
        >
          <ChevronRight className="h-5 w-5 mr-2" />
          Start New Cost Analysis
        </Button>
      </div>

      {/* Payload Preview Dialog */}
      <Dialog open={showPayloadPreview} onOpenChange={setShowPayloadPreview}>
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-elec-yellow" />
              PDF Payload Preview
            </DialogTitle>
            <DialogDescription>
              This is the exact JSON payload that will be sent to the PDF generator
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[500px] w-full rounded-lg border border-elec-yellow/20 bg-elec-dark/60 p-4">
            <pre className="text-xs text-foreground font-mono leading-relaxed">
              {JSON.stringify(buildPdfPayload(), null, 2)}
            </pre>
          </ScrollArea>

          <DialogFooter className="gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(buildPdfPayload(), null, 2));
                toast({
                  title: "Payload copied",
                  description: "JSON payload copied to clipboard",
                });
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy JSON
            </Button>
            <Button
              onClick={() => {
                setShowPayloadPreview(false);
                handleExportPDF();
              }}
              disabled={isGeneratingPDF}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Generate PDF'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Hub Confirmation Dialog */}
      <ConfirmationDialog
        open={showQuoteHubConfirm}
        onOpenChange={setShowQuoteHubConfirm}
        title="Send to Quote Hub?"
        description="This will take you to the Quote Builder. Make sure you've generated any internal PDFs you need first, as you'll leave this results page."
        confirmText="Continue to Quote Hub"
        cancelText="Stay Here"
        onConfirm={confirmSendToQuoteHub}
      />
    </div>
  );
};

export default CostAnalysisResults;

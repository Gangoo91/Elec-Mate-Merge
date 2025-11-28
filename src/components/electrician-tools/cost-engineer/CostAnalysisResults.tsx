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
    console.log('📦 Building clean 20-section PDF payload');

    // Helper to round to 2 decimal places
    const round2dp = (value: number) => Math.round((value || 0) * 100) / 100;

    // Calculate core metrics
    const totalLabourHours = round2dp(structuredData?.labour?.tasks?.reduce(
      (sum: number, t: any) => sum + (t.hours || 0), 0
    ) || 0);
    
    const breakEven = round2dp(structuredData?.profitabilityAnalysis?.breakEvenPoint || analysis.subtotal || 0);
    const selectedTier = structuredData?.recommendedQuote?.tier || 'normal';
    const selectedAmount = round2dp(structuredData?.recommendedQuote?.amount || analysis.totalCost || 0);
    
    const profit = round2dp(selectedAmount - breakEven);
    const margin = round2dp(breakEven > 0 ? ((selectedAmount - breakEven) / selectedAmount) * 100 : 0);
    const profitPerHour = round2dp(totalLabourHours > 0 ? profit / totalLabourHours : 0);

    // Calculate tier prices
    const sparsePrice = round2dp(structuredData?.profitabilityAnalysis?.quoteTiers?.minimum?.price || breakEven * 1.2);
    const normalPrice = round2dp(structuredData?.profitabilityAnalysis?.quoteTiers?.target?.price || breakEven * 1.3);
    const busyPrice = round2dp(structuredData?.profitabilityAnalysis?.quoteTiers?.premium?.price || breakEven * 1.4);

    // Helper: calculate tier metrics
    const calculateTier = (price: number) => ({
      price: round2dp(price),
      profit: round2dp(price - breakEven),
      marginPercent: round2dp(price > 0 ? ((price - breakEven) / price) * 100 : 0),
      profitPerHour: round2dp(totalLabourHours > 0 ? (price - breakEven) / totalLabourHours : 0)
    });

    // Materials & Labour
    const materialsNet = round2dp(structuredData?.materials?.subtotal || analysis.materialsTotal || 0);
    const materialsMarkup = round2dp(structuredData?.materials?.markup || 15);
    const labourTotal = round2dp(structuredData?.labour?.subtotal || analysis.labourTotal || 0);
    const labourRate = round2dp(totalLabourHours > 0 ? labourTotal / totalLabourHours : 0);
    
    // Overheads
    const overheadsTravel = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.travel || 0);
    const overheadsPermits = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.permitsAndFees || 0);
    const overheadsWaste = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.wasteDisposal || 0);
    const overheadsBusiness = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.allocatedBusinessOverheads || 0);
    const overheadsTotal = round2dp(structuredData?.profitabilityAnalysis?.jobOverheads?.total || 0);
    
    // Contingency
    const contingencyPercent = round2dp(structuredData?.confidence?.contingency?.percentage || 5);
    const contingencyAmount = round2dp((materialsNet + labourTotal) * (contingencyPercent / 100));

    // Confidence
    const materialsConfidence = structuredData?.confidence?.materials?.level || 75;
    const labourConfidence = structuredData?.confidence?.labour?.level || 75;
    const avgConfidence = Math.round((materialsConfidence + labourConfidence) / 2);

    // Risk assessment
    const risks = structuredData?.riskAssessment?.risks || [];
    const highRisks = risks.filter((r: any) => r.severity === 'critical' || r.severity === 'high');

    // Build clean payload matching 20 frontend sections
    const payload = {
      // Section 0: Original Request
      originalRequest: {
        query: originalQuery || '',
        projectName: projectContext?.projectName || '',
        clientInfo: projectContext?.clientInfo || '',
        location: projectContext?.location || '',
        projectType: projectContext?.projectType || 'domestic',
        additionalInfo: projectContext?.additionalInfo || '',
        timestamp: new Date().toISOString()
      },

      // Section 1: Quote Hero
      quoteHero: {
        recommendedPrice: selectedAmount,
        tier: selectedTier,
        profit: profit,
        marginPercent: margin,
        profitPerHour: profitPerHour,
        confidencePercent: avgConfidence,
        totalLabourHours: totalLabourHours
      },

      // Section 2: AI Analysis Summary
      aiSummary: structuredData?.response || analysis.rawText || '',

      // Section 3: Quick Metrics Snapshot
      quickMetrics: {
        complexity: structuredData?.complexity ? {
          rating: structuredData.complexity.rating || 0,
          label: structuredData.complexity.label || 'Unknown',
          score: round2dp(structuredData.complexity.score || 0)
        } : null,
        confidence: {
          average: round2dp(avgConfidence / 100),
          materials: round2dp(materialsConfidence / 100),
          labour: round2dp(labourConfidence / 100)
        },
        riskLevel: {
          level: highRisks.length > 0 ? 'high' : 'low',
          highRiskCount: highRisks.length,
          totalCount: risks.length
        }
      },

      // Section 4: Key Action Items
      keyActions: (() => {
        const actions: Array<{text: string, priority: 'critical' | 'high' | 'medium'}> = [];
        
        if (structuredData?.siteChecklist?.critical?.[0]) {
          actions.push({
            text: structuredData.siteChecklist.critical[0],
            priority: 'critical'
          });
        }
        
        if (structuredData?.paymentTerms) {
          actions.push({
            text: `Secure ${structuredData.paymentTerms.depositPercent}% deposit (£${round2dp(structuredData.paymentTerms.depositAmount || 0)}) before starting`,
            priority: 'high'
          });
        }
        
        const hotUpsell = structuredData?.upsells?.find((u: any) => u.isHot);
        if (hotUpsell) {
          actions.push({
            text: `Offer ${hotUpsell.opportunity} (+£${round2dp(hotUpsell.price || 0)}) - ${hotUpsell.winRate}% win rate`,
            priority: 'medium'
          });
        }
        
        return actions.slice(0, 3);
      })(),

      // Section 5: Trade Intelligence (RAG Validation)
      tradeIntelligence: structuredData?.tradeIntelligence ? {
        materialsCompleteness: {
          status: structuredData.tradeIntelligence.materialsCompleteness?.status || 'unknown',
          score: round2dp(structuredData.tradeIntelligence.materialsCompleteness?.score || 0),
          commentary: structuredData.tradeIntelligence.materialsCompleteness?.commentary || '',
          missingItems: structuredData.tradeIntelligence.materialsCompleteness?.missingItems || [],
          recommendations: structuredData.tradeIntelligence.materialsCompleteness?.recommendations || []
        },
        labourRealism: {
          status: structuredData.tradeIntelligence.labourRealism?.status || 'unknown',
          score: round2dp(structuredData.tradeIntelligence.labourRealism?.score || 0),
          commentary: structuredData.tradeIntelligence.labourRealism?.commentary || '',
          concerns: structuredData.tradeIntelligence.labourRealism?.concerns || [],
          recommendations: structuredData.tradeIntelligence.labourRealism?.recommendations || []
        },
        futureWorkLogic: {
          status: structuredData.tradeIntelligence.futureWorkLogic?.status || 'unknown',
          score: round2dp(structuredData.tradeIntelligence.futureWorkLogic?.score || 0),
          commentary: structuredData.tradeIntelligence.futureWorkLogic?.commentary || '',
          concerns: structuredData.tradeIntelligence.futureWorkLogic?.concerns || [],
          recommendations: structuredData.tradeIntelligence.futureWorkLogic?.recommendations || []
        },
        overallAssessment: {
          readyToQuote: structuredData.tradeIntelligence.overallAssessment?.readyToQuote || false,
          summary: structuredData.tradeIntelligence.overallAssessment?.summary || '',
          criticalIssues: structuredData.tradeIntelligence.overallAssessment?.criticalIssues || []
        }
      } : null,

      // Section 6: Pricing Tiers (3 Options)
      pricingTiers: {
        workSparse: calculateTier(sparsePrice),
        normal: { ...calculateTier(normalPrice), recommended: true },
        busyPeriod: calculateTier(busyPrice)
      },

      // Section 7: Cost Breakdown
      costBreakdown: {
        materials: {
          net: materialsNet,
          markupPercent: materialsMarkup,
          total: round2dp(materialsNet * (1 + materialsMarkup / 100))
        },
        labour: {
          hours: totalLabourHours,
          rate: labourRate,
          total: labourTotal
        },
        overheads: {
          travel: overheadsTravel,
          permits: overheadsPermits,
          waste: overheadsWaste,
          business: overheadsBusiness,
          total: overheadsTotal
        },
        contingency: {
          percent: contingencyPercent,
          amount: contingencyAmount
        },
        breakEvenPoint: breakEven,
        subtotal: round2dp(materialsNet + labourTotal + overheadsTotal + contingencyAmount)
      },

      // Section 8: Client Quote Justification
      clientJustification: {
        valueProposition: `Professional electrical work completed to BS 7671 standards by qualified electricians`,
        objectionResponses: [
          {
            objection: "Price seems high",
            response: "Our quote reflects professional standards, quality materials, and proper certification",
            details: `Materials: £${materialsNet}, Labour: ${totalLabourHours}hrs @ £${labourRate}/hr, Overheads: £${overheadsTotal}`
          },
          {
            objection: "I got a cheaper quote",
            response: "Lower quotes often cut corners on qualifications, insurance, or materials",
            details: "Ask if they're 18th Edition qualified, fully insured, and providing certification"
          },
          {
            objection: "Can you discount?",
            response: "Our pricing is already competitive for professional work",
            details: `Break-even: £${breakEven}, Quote: £${selectedAmount}, Margin: ${margin.toFixed(1)}%`
          }
        ],
        comparisonChecklist: [
          "18th Edition certified",
          "NICEIC/NAPIT registered",
          "£2M public liability insurance",
          "Quality materials included",
          "Full EIC certification",
          "12-month workmanship guarantee"
        ],
        whyChoosePoints: [
          `${totalLabourHours} hours of qualified electrical work`,
          "All materials sourced from reputable suppliers",
          "Full BS 7671 compliance guaranteed",
          "Professional insurance and warranties included"
        ]
      },

      // Section 9: Materials List
      materials: (structuredData?.materials?.items || analysis.materials || []).map((item: any) => ({
        description: item.description || item.item || '',
        quantity: round2dp(item.quantity || 0),
        unit: item.unit || 'units',
        unitPrice: round2dp(item.unitPrice || 0),
        total: round2dp(item.total || 0),
        supplier: item.supplier || 'TBC',
        category: item.category || 'General'
      })),

      // Section 10: Labour Tasks
      labourTasks: (structuredData?.labour?.tasks || []).map((task: any) => ({
        description: task.description || '',
        hours: round2dp(task.hours || 0),
        rate: round2dp(task.rate || 0),
        total: round2dp(task.total || 0),
        workerType: task.workerType || 'Qualified Electrician'
      })),

      // Section 11: Job Complexity
      jobComplexity: structuredData?.complexity ? {
        rating: structuredData.complexity.rating || 0,
        label: structuredData.complexity.label || 'Unknown',
        factors: structuredData.complexity.factors || [],
        estimatedHours: round2dp(structuredData.complexity.estimatedHours || 0),
        reasoning: structuredData.complexity.reasoning || ''
      } : null,

      // Section 12: Risk Assessment
      risks: risks.map((risk: any) => ({
        title: risk.title || risk.risk || '',
        severity: risk.severity || 'medium',
        likelihood: risk.likelihood || 'possible',
        mitigation: risk.mitigation || '',
        contingencyPercent: round2dp(risk.contingencyPercent || 0)
      })),

      // Section 13: Pricing Confidence
      pricingConfidence: structuredData?.confidence ? {
        materials: {
          level: round2dp(materialsConfidence / 100),
          reasoning: structuredData.confidence.materials?.reason || ''
        },
        labour: {
          level: round2dp(labourConfidence / 100),
          reasoning: structuredData.confidence.labour?.reason || ''
        },
        contingency: {
          percent: contingencyPercent,
          reasoning: structuredData.confidence.contingency?.reasoning || 'Standard contingency buffer'
        }
      } : null,

      // Section 14: Immediate Upsells
      upsells: (structuredData?.upsells || []).map((upsell: any) => ({
        opportunity: upsell.opportunity || '',
        price: round2dp(upsell.price || 0),
        winRate: round2dp(upsell.winRate > 1 ? upsell.winRate / 100 : upsell.winRate),
        isHot: upsell.isHot || false,
        timing: upsell.timing || 'now',
        script: upsell.script || ''
      })),

      // Section 15: Future Work Pipeline
      futurePipeline: (structuredData?.pipeline || []).map((item: any) => ({
        opportunity: item.opportunity || '',
        description: item.description || '',
        timeframe: item.timeframe || 'TBC',
        estimatedValue: round2dp(item.estimatedValue || 0),
        priority: item.priority || 'medium',
        trigger: item.trigger || ''
      })),

      // Section 16: Client Conversations
      clientConversations: structuredData?.conversations ? {
        topics: (structuredData.conversations.topics || []).map((topic: any) => ({
          topic: topic.topic || '',
          script: topic.script || ''
        })),
        closingScript: structuredData.conversations.closingScript || ''
      } : null,

      // Section 17: Site Arrival Checklist
      siteChecklist: structuredData?.siteChecklist ? {
        critical: structuredData.siteChecklist.critical || [],
        important: structuredData.siteChecklist.important || [],
        documentation: structuredData.siteChecklist.documentation || []
      } : null,

      // Section 18: Payment Terms
      paymentTerms: structuredData?.paymentTerms ? {
        depositPercent: round2dp(structuredData.paymentTerms.depositPercent || 0),
        depositAmount: round2dp(structuredData.paymentTerms.depositAmount || 0),
        balanceAmount: round2dp(structuredData.paymentTerms.balanceAmount || 0),
        terms: structuredData.paymentTerms.terms || '',
        lateFeePolicy: structuredData.paymentTerms.lateFeePolicy || '',
        milestones: (structuredData.paymentTerms.milestones || structuredData.paymentTerms.paymentMilestones || []).map((milestone: any) => ({
          stage: milestone.stage || '',
          percentage: round2dp(milestone.percentage || 0),
          amount: round2dp(milestone.amount || 0),
          trigger: milestone.trigger || ''
        }))
      } : null,

      // Section 19: Job Notes (optional user input)
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

      // Section 20: Post-Job Review (tracking placeholders)
      postJobReview: {
        estimatedCost: breakEven,
        estimatedHours: totalLabourHours,
        estimatedProfit: profit,
        actualCost: null,
        actualHours: null,
        actualProfit: null,
        notes: null
      },

      // Metadata
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '3.1',
        pdfTemplate: 'cost-engineer-comprehensive'
      }
    };
    
    console.log('✅ Clean 20-section PDF payload built:', {
      sections: Object.keys(payload).length,
      materialsCount: payload.materials.length,
      labourTasksCount: payload.labourTasks.length,
      risksCount: payload.risks.length,
      upsellsCount: payload.upsells.length,
      futureOpportunitiesCount: payload.futurePipeline.length
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
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <pre className="text-xs">
              {JSON.stringify(buildPdfPayload(), null, 2)}
            </pre>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowPayloadPreview(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Hub Confirmation Dialog */}
      <ConfirmationDialog
        open={showQuoteHubConfirm}
        onOpenChange={setShowQuoteHubConfirm}
        onConfirm={confirmSendToQuoteHub}
        title="Send to Quote Hub?"
        description="This will transfer the cost analysis data to Quote Builder where you can create a formal quotation. The current data will be preserved."
        confirmText="Continue to Quote Hub"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CostAnalysisResults;

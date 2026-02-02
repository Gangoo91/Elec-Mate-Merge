import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Copy, Download, Eye, ArrowRight, Send, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { transformCostOutputToQuoteItems, CostEngineerOutput } from "@/utils/cost-to-quote-transformer";
import ComprehensiveResultsView from "./comprehensive/ComprehensiveResultsView";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface CostAnalysisResultsProps {
  analysis: ParsedCostAnalysis;
  projectName?: string;
  originalQuery?: string;
  onNewAnalysis: () => void;
  structuredData?: any;
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

    // Build payload matching 20 frontend sections
    const payload = {
      originalRequest: {
        query: originalQuery || '',
        projectName: projectContext?.projectName || '',
        clientInfo: projectContext?.clientInfo || '',
        location: projectContext?.location || '',
        projectType: projectContext?.projectType || 'domestic',
        additionalInfo: projectContext?.additionalInfo || '',
        timestamp: new Date().toISOString()
      },
      quoteHero: {
        recommendedPrice: selectedAmount,
        tier: selectedTier,
        profit: profit,
        marginPercent: margin,
        profitPerHour: profitPerHour,
        confidencePercent: avgConfidence,
        totalLabourHours: totalLabourHours
      },
      aiSummary: structuredData?.response || analysis.rawText || '',
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
      keyActions: (() => {
        const actions: Array<{text: string, priority: 'critical' | 'high' | 'medium'}> = [];
        if (structuredData?.siteChecklist?.critical?.[0]) {
          actions.push({ text: structuredData.siteChecklist.critical[0], priority: 'critical' });
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
      tradeIntelligence: structuredData?.tradeIntelligence || null,
      pricingTiers: {
        workSparse: calculateTier(sparsePrice),
        normal: { ...calculateTier(normalPrice), recommended: true },
        busyPeriod: calculateTier(busyPrice)
      },
      costBreakdown: {
        materials: { net: materialsNet, markupPercent: materialsMarkup, total: round2dp(materialsNet * (1 + materialsMarkup / 100)) },
        labour: { hours: totalLabourHours, rate: labourRate, total: labourTotal },
        overheads: { travel: overheadsTravel, permits: overheadsPermits, waste: overheadsWaste, business: overheadsBusiness, total: overheadsTotal },
        contingency: { percent: contingencyPercent, amount: contingencyAmount },
        breakEvenPoint: breakEven,
        subtotal: round2dp(materialsNet + labourTotal + overheadsTotal + contingencyAmount)
      },
      clientJustification: {
        valueProposition: `Professional electrical work completed to BS 7671 standards by qualified electricians`,
        objectionResponses: [
          { objection: "Price seems high", response: "Our quote reflects professional standards, quality materials, and proper certification", details: `Materials: £${materialsNet}, Labour: ${totalLabourHours}hrs @ £${labourRate}/hr` },
          { objection: "I got a cheaper quote", response: "Lower quotes often cut corners on qualifications, insurance, or materials", details: "Ask if they're 18th Edition qualified, fully insured, and providing certification" },
          { objection: "Can you discount?", response: "Our pricing is already competitive for professional work", details: `Break-even: £${breakEven}, Quote: £${selectedAmount}, Margin: ${margin.toFixed(1)}%` }
        ],
        comparisonChecklist: ["18th Edition certified", "NICEIC/NAPIT registered", "£2M public liability insurance", "Quality materials included", "Full EIC certification", "12-month workmanship guarantee"],
        whyChoosePoints: [`${totalLabourHours} hours of qualified electrical work`, "All materials sourced from reputable suppliers", "Full BS 7671 compliance guaranteed", "Professional insurance and warranties included"]
      },
      materials: (structuredData?.materials?.items || analysis.materials || []).map((item: any) => ({
        description: item.description || item.item || '',
        quantity: round2dp(item.quantity || 0),
        unit: item.unit || 'units',
        unitPrice: round2dp(item.unitPrice || 0),
        total: round2dp(item.total || 0),
        supplier: item.supplier || 'TBC',
        category: item.category || 'General'
      })),
      labourTasks: (structuredData?.labour?.tasks || []).map((task: any) => ({
        description: task.description || '',
        hours: round2dp(task.hours || 0),
        rate: round2dp(task.rate || 0),
        total: round2dp(task.total || 0),
        workerType: task.workerType || 'Qualified Electrician'
      })),
      jobComplexity: structuredData?.complexity || null,
      risks: risks.map((risk: any) => ({
        title: risk.title || risk.risk || '',
        severity: risk.severity || 'medium',
        likelihood: risk.likelihood || 'possible',
        mitigation: risk.mitigation || '',
        contingencyPercent: round2dp(risk.contingencyPercent || 0)
      })),
      pricingConfidence: structuredData?.confidence || null,
      upsells: (structuredData?.upsells || []).map((upsell: any) => ({
        opportunity: upsell.opportunity || '',
        price: round2dp(upsell.price || 0),
        winRate: round2dp(upsell.winRate > 1 ? upsell.winRate / 100 : upsell.winRate),
        isHot: upsell.isHot || false,
        timing: upsell.timing || 'now',
        script: upsell.script || ''
      })),
      futurePipeline: (structuredData?.pipeline || []).map((item: any) => ({
        opportunity: item.opportunity || '',
        description: item.description || '',
        timeframe: item.timeframe || 'TBC',
        estimatedValue: round2dp(item.estimatedValue || 0),
        priority: item.priority || 'medium',
        trigger: item.trigger || ''
      })),
      clientConversations: structuredData?.conversations || null,
      siteChecklist: structuredData?.siteChecklist || null,
      paymentTerms: structuredData?.paymentTerms || null,
      jobNotes: null,
      postJobReview: {
        estimatedCost: breakEven,
        estimatedHours: totalLabourHours,
        estimatedProfit: profit,
        actualCost: null,
        actualHours: null,
        actualProfit: null,
        notes: null
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '3.1',
        pdfTemplate: 'cost-engineer-comprehensive'
      }
    };

    return payload;
  };

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      const pdfData = buildPdfPayload();
      const { data, error } = await supabase.functions.invoke('generate-cost-engineer-pdf', { body: pdfData });

      if (error) throw error;

      if (data.success && data.downloadUrl) {
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

        toast({ title: "PDF Downloaded", description: "Your cost estimate PDF has been downloaded" });
      } else {
        throw new Error(data.error || 'PDF generation failed');
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({ title: "PDF Generation Failed", description: error instanceof Error ? error.message : "Failed to generate PDF", variant: "destructive" });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSendToQuoteHub = () => {
    setShowQuoteHubConfirm(true);
  };

  const confirmSendToQuoteHub = () => {
    if (!structuredData) {
      toast({ title: "No Data Available", description: "Unable to transfer to Quote Hub. Please generate a new cost estimate.", variant: "destructive" });
      return;
    }

    try {
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

      toast({ title: "Transferring to Quote Hub", description: "Opening Quote Builder with cost data..." });
      navigate(`/electrician/quote-builder/create?costSessionId=${sessionId}`);
    } catch (error) {
      console.error('Error transferring to Quote Hub:', error);
      toast({ title: "Transfer Failed", description: "Unable to transfer data to Quote Hub. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Results Content */}
      <div className="flex-1 px-4 pb-48 sm:pb-8">
        <ComprehensiveResultsView
          analysis={analysis}
          structuredData={structuredData}
          projectContext={projectContext}
          originalQuery={originalQuery}
          onNewAnalysis={onNewAnalysis}
        />

        {/* Desktop Actions - Inline at bottom of content */}
        <div className="hidden sm:block mt-8 max-w-2xl mx-auto">
          <div className="bg-card/50 border border-white/10 rounded-2xl p-6 space-y-4">
            {/* Primary Action */}
            <Button
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-black font-bold"
              onClick={handleSendToQuoteHub}
            >
              <Send className="h-5 w-5 mr-2" />
              Send to Quote Hub
            </Button>

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="default"
                className="h-11"
                onClick={handleExportPDF}
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
              </Button>
              <Button
                variant="ghost"
                size="default"
                className="h-11 border border-white/20 hover:bg-white/5"
                onClick={onNewAnalysis}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </div>

            {/* Tertiary Actions */}
            <div className="flex justify-center gap-4 pt-1">
              <button
                onClick={handleCopyToClipboard}
                className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
              >
                <Copy className="h-3 w-3" />
                Copy
              </button>
              <button
                onClick={() => setShowPayloadPreview(true)}
                className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1"
              >
                <Eye className="h-3 w-3" />
                Debug
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Only - Fixed Bottom Actions */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-background via-background/95 to-transparent z-40">
        <div className="max-w-md mx-auto space-y-3">
          {/* Primary Action */}
          <Button
            size="lg"
            className="w-full h-12 bg-gradient-to-r from-elec-yellow to-amber-500 hover:from-elec-yellow/90 hover:to-amber-500/90 text-black font-bold touch-manipulation"
            onClick={handleSendToQuoteHub}
          >
            <Send className="h-5 w-5 mr-2" />
            Send to Quote Hub
          </Button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="default"
              className="h-11 touch-manipulation"
              onClick={handleExportPDF}
              disabled={isGeneratingPDF}
            >
              <Download className="h-4 w-4 mr-2" />
              {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="h-11 border border-white/20 hover:bg-white/5 touch-manipulation"
              onClick={onNewAnalysis}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Tertiary Actions */}
          <div className="flex justify-center gap-4 pt-1">
            <button
              onClick={handleCopyToClipboard}
              className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1 touch-manipulation"
            >
              <Copy className="h-3 w-3" />
              Copy
            </button>
            <button
              onClick={() => setShowPayloadPreview(true)}
              className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1 touch-manipulation"
            >
              <Eye className="h-3 w-3" />
              Debug
            </button>
          </div>
        </div>
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
              JSON payload sent to PDF generator
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
            <pre className="text-xs">{JSON.stringify(buildPdfPayload(), null, 2)}</pre>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowPayloadPreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quote Hub Confirmation */}
      <ConfirmationDialog
        open={showQuoteHubConfirm}
        onOpenChange={setShowQuoteHubConfirm}
        onConfirm={confirmSendToQuoteHub}
        title="Send to Quote Hub?"
        description="This will transfer the cost analysis data to Quote Builder where you can create a formal quotation."
        confirmText="Continue to Quote Hub"
        cancelText="Cancel"
      />
    </div>
  );
};

export default CostAnalysisResults;

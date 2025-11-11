import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Copy, Download, Save, Eye, ChevronRight } from "lucide-react";
import ComprehensiveResultsView from "./comprehensive/ComprehensiveResultsView";

interface CostAnalysisResultsProps {
  analysis: ParsedCostAnalysis;
  projectName?: string;
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

const CostAnalysisResults = ({ analysis, projectName, onNewAnalysis, structuredData, projectContext }: CostAnalysisResultsProps) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);

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

    return {
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
          material: materialsSubtotal
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
        ...structuredData.paymentTerms,
        milestones: (structuredData.paymentTerms.milestones || []).map((milestone: any) => ({
          ...milestone,
          percentage: round2dp(milestone.percentage || 0),
          amount: round2dp(milestone.amount || 0)
        }))
      } : null,
      
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
      
      // 10. Metadata
      generatedAt: new Date().toISOString(),
      version: '3.0'
    };
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
        // Open PDF in new tab
        window.open(data.downloadUrl, '_blank');
        
        toast({
          title: "PDF Generated Successfully",
          description: "Your cost estimate PDF is ready",
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

  const handleSaveToLibrary = () => {
    toast({
      title: "Save to Library",
      description: "Library feature coming soon",
    });
  };

  return (
    <div className="mobile-safe-area mobile-section-spacing animate-fade-in">
      {/* Comprehensive Results View */}
      <ComprehensiveResultsView
        analysis={analysis}
        structuredData={structuredData}
        projectContext={projectContext}
        onNewAnalysis={onNewAnalysis}
      />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleCopyToClipboard}
          variant="outline"
          className="flex-1 touch-manipulation"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy to Clipboard
        </Button>
        <Button 
          onClick={() => setShowPayloadPreview(true)}
          variant="outline"
          className="flex-1 touch-manipulation"
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Payload
        </Button>
        <Button 
          onClick={handleExportPDF}
          variant="outline"
          className="flex-1 touch-manipulation"
          disabled={isGeneratingPDF}
        >
          <Download className="h-4 w-4 mr-2" />
          {isGeneratingPDF ? 'Generating PDF...' : 'Export PDF'}
        </Button>
        <Button 
          onClick={handleSaveToLibrary}
          variant="outline"
          className="flex-1 touch-manipulation"
        >
          <Save className="h-4 w-4 mr-2" />
          Save to Library
        </Button>
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
    </div>
  );
};

export default CostAnalysisResults;

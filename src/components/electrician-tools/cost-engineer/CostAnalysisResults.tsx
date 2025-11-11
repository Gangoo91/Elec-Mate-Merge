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
    // Calculate derived metrics (matching ComprehensiveResultsView.tsx)
    const totalLabourHours = structuredData?.labour?.tasks?.reduce(
      (sum: number, t: any) => sum + (t.hours || 0), 0
    ) || 0;
    
    const breakEven = structuredData?.profitabilityAnalysis?.breakEvenPoint || analysis.subtotal;
    const selectedTier = structuredData?.recommendedQuote?.tier || 'normal';
    const selectedAmount = structuredData?.recommendedQuote?.amount || analysis.totalCost;
    
    const profit = selectedAmount - breakEven;
    const margin = breakEven > 0 ? ((selectedAmount - breakEven) / selectedAmount) * 100 : 0;
    const profitPerHour = totalLabourHours > 0 ? profit / totalLabourHours : 0;

    return {
      // 1. Project Context
      projectContext: {
        projectName: projectContext?.projectName || projectName || 'Electrical Project',
        clientInfo: projectContext?.clientInfo || '',
        location: projectContext?.location || '',
        additionalInfo: projectContext?.additionalInfo || '',
        projectType: projectContext?.projectType || 'domestic'
      },
      
      // 2. Core Cost Analysis (enhanced with all V3 data)
      costAnalysis: {
        response: structuredData?.response || analysis.rawText,
        materials: structuredData?.materials || {
          items: analysis.materials,
          subtotal: analysis.materialsTotal,
          markup: 0
        },
        labour: structuredData?.labour || {
          tasks: [{
            description: analysis.labour.description,
            hours: analysis.labour.hours,
            rate: analysis.labour.rate,
            total: analysis.labour.total
          }],
          subtotal: analysis.labourTotal
        },
        summary: structuredData?.summary || {
          subtotal: analysis.subtotal,
          vat: analysis.vatAmount,
          grandTotal: analysis.totalCost
        },
        timescales: structuredData?.timescales || null,
        alternatives: structuredData?.alternatives || null,
        orderList: structuredData?.orderList || null,
        compliance: structuredData?.compliance || null
      },
      
      // 3. Job Assessment
      complexity: structuredData?.complexity || null,
      confidence: structuredData?.confidence || null,
      riskAssessment: structuredData?.riskAssessment || null,
      
      // 4. Pricing & Profitability
      recommendedQuote: structuredData?.recommendedQuote || null,
      profitabilityAnalysis: structuredData?.profitabilityAnalysis || null,
      
      // 5. Calculated Metrics (for easy PDF access)
      calculatedMetrics: {
        totalLabourHours,
        breakEven,
        selectedTier,
        selectedAmount,
        profit,
        margin,
        profitPerHour,
        vatAmount: analysis.vatAmount,
        totalIncVat: analysis.totalCost
      },
      
      // 6. Client-facing Elements
      upsells: structuredData?.upsells || [],
      pipeline: structuredData?.pipeline || [],
      conversations: structuredData?.conversations || null,
      paymentTerms: structuredData?.paymentTerms || null,
      
      // 7. Project Execution
      siteChecklist: structuredData?.siteChecklist || null,
      valueEngineering: structuredData?.valueEngineering || [],
      
      // 8. Metadata
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

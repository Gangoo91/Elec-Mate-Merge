import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MobileButton } from "@/components/ui/mobile-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Package, Clock, TrendingUp, FileText, Copy, Download, Save, 
  CheckCircle2, ChevronRight, Sparkles, Calendar, Star, Eye, Settings, InfoIcon 
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import CostStatCard from "./CostStatCard";
import { toast } from "@/hooks/use-toast";
import TimescalesPanel from "./TimescalesPanel";
import AlternativeQuotesPanel from "./AlternativeQuotesPanel";
import OrderListPanel from "./OrderListPanel";
import ProfitabilityDashboard from "./ProfitabilityDashboard";
import JobOverheadsBreakdown from "./JobOverheadsBreakdown";
import { DetailedMaterialsBreakdown } from "./DetailedMaterialsBreakdown";
import { DetailedLabourBreakdown } from "./DetailedLabourBreakdown";
import { EnhancedProfitabilityDashboard } from "./EnhancedProfitabilityDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
    return {
      projectContext: {
        projectName: projectContext?.projectName || projectName || 'Electrical Project',
        clientInfo: projectContext?.clientInfo || '',
        location: projectContext?.location || '',
        additionalInfo: projectContext?.additionalInfo || '',
        projectType: projectContext?.projectType || 'domestic'
      },
      costAnalysis: structuredData || {
        response: analysis.rawText,
        materials: {
          items: analysis.materials,
          subtotal: analysis.materialsTotal
        },
        labour: {
          tasks: [{
            description: analysis.labour.description,
            hours: analysis.labour.hours,
            rate: analysis.labour.rate,
            total: analysis.labour.total
          }],
          subtotal: analysis.labourTotal
        },
        summary: {
          subtotal: analysis.subtotal,
          vat: analysis.vatAmount,
          grandTotal: analysis.totalCost
        }
      }
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

  const lineItemCount = analysis.materials.length + (analysis.labour.total > 0 ? 1 : 0);
  const profitMargin = analysis.subtotal > 0 ? ((analysis.totalCost - analysis.subtotal) / analysis.subtotal * 100).toFixed(1) : '0';

  return (
    <div className="mobile-safe-area mobile-section-spacing animate-fade-in">
      {/* Success Header */}
      <Card className="bg-gradient-to-br from-green-500/10 to-elec-yellow/10 border-green-500/30">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <CardTitle className="mobile-heading font-bold text-foreground flex items-center gap-2">
                  Cost Analysis Complete
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </CardTitle>
                <CardDescription className="mobile-text text-elec-light mt-1">
                  {projectName || 'Electrical Installation Project'}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-base sm:text-lg px-4 py-2 font-bold self-start sm:self-center tabular-nums">
              {formatCurrency(analysis.totalCost)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 mobile-card-spacing">
        <CostStatCard
          icon={Package}
          label="Materials"
          value={formatCurrency(analysis.materialsTotal)}
          subtitle={`${analysis.materials.length} items`}
          iconColor="text-blue-500"
        />
        <CostStatCard
          icon={Clock}
          label="Labour"
          value={formatCurrency(analysis.labourTotal)}
          subtitle={analysis.labour.hours > 0 ? `${analysis.labour.hours} hours` : undefined}
          iconColor="text-green-500"
        />
        <CostStatCard
          icon={TrendingUp}
          label="VAT"
          value={formatCurrency(analysis.vatAmount)}
          subtitle={`${analysis.vatRate}% rate`}
          iconColor="text-elec-yellow"
        />
        <CostStatCard
          icon={FileText}
          label="Line Items"
          value={lineItemCount.toString()}
          subtitle="Total entries"
          iconColor="text-elec-yellow"
        />
      </div>

      {/* Enhanced Profitability Dashboard */}
      {structuredData?.profitabilityAnalysis ? (
        <EnhancedProfitabilityDashboard 
          directCosts={structuredData.profitabilityAnalysis.directCosts}
          jobOverheads={structuredData.profitabilityAnalysis.jobOverheads}
          breakEvenPoint={structuredData.profitabilityAnalysis.breakEvenPoint}
          quoteTiers={structuredData.profitabilityAnalysis.quoteTiers}
          recommendations={structuredData.profitabilityAnalysis.recommendations || []}
        />
      ) : (
        <Alert className="border-blue-500/30 bg-blue-500/5">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertDescription className="ml-2 text-sm">
            <strong className="text-foreground">Profitability Analysis Unavailable</strong>
            <p className="text-muted-foreground mt-1">
              Configure your business settings (hourly rates, overheads, profit targets) to unlock break-even analysis, quote tiers, and profit guidance.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 border-blue-500/30 hover:bg-blue-500/10"
              onClick={() => {
                const settingsBtn = document.querySelector('[data-business-settings-trigger]') as HTMLButtonElement;
                settingsBtn?.click();
              }}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Business Settings
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Materials Breakdown with Pricing Transparency */}
      {structuredData?.materials && structuredData.materials.items && structuredData.materials.items.length > 0 && (
        <DetailedMaterialsBreakdown 
          materials={structuredData.materials.items.map((item: any) => ({
            description: item.description || item.item || 'Unknown item',
            quantity: item.quantity || 1,
            unit: item.unit || 'each',
            wholesalePrice: item.wholesalePrice || item.unitPrice || 0,
            markupPercent: item.markupPercent || 15,
            markupAmount: item.markupAmount || (item.wholesalePrice || item.unitPrice || 0) * 0.15,
            unitPrice: item.unitPrice || 0,
            total: item.total || 0,
            supplier: item.supplier || 'Trade Supplier',
            supplierCode: item.supplierCode,
            inStock: item.inStock !== false,
            inDatabase: item.inDatabase !== false,
            alternativeSuppliers: item.alternativeSuppliers
          }))}
          wholesaleTotal={structuredData.summary?.materialsWholesale || analysis.materialsTotal / 1.15}
          markupTotal={structuredData.summary?.materialsMarkup || analysis.materialsTotal * 0.15}
          subtotal={structuredData.summary?.materialsSubtotal || analysis.materialsTotal}
          wastagePercent={structuredData.materials.wastagePercent || 0}
          wastageAmount={structuredData.materials.wastageAmount || 0}
          finalTotal={analysis.materialsTotal}
        />
      )}

      {/* Detailed Labour Breakdown with Team Composition */}
      {structuredData?.labour && structuredData.labour.tasks && structuredData.labour.tasks.length > 0 && (
        <DetailedLabourBreakdown 
          tasks={structuredData.labour.tasks.map((task: any) => ({
            description: task.description || 'Installation work',
            hours: task.hours || 0,
            teamComposition: task.teamComposition,
            electricianHours: task.electricianHours || task.hours || 0,
            apprenticeHours: task.apprenticeHours || 0,
            electricianRate: task.electricianRate || 50,
            apprenticeRate: task.apprenticeRate || 25,
            electricianCost: task.electricianCost || (task.electricianHours || task.hours || 0) * 50,
            apprenticeCost: task.apprenticeCost || (task.apprenticeHours || 0) * 25,
            total: task.total || 0,
            category: task.category
          }))}
          electricianTotalHours={
            structuredData.labour.tasks.reduce((sum: number, t: any) => 
              sum + (t.electricianHours || t.hours || 0), 0
            )
          }
          apprenticeTotalHours={
            structuredData.labour.tasks.reduce((sum: number, t: any) => 
              sum + (t.apprenticeHours || 0), 0
            )
          }
          electricianSubtotal={
            structuredData.labour.tasks.reduce((sum: number, t: any) => 
              sum + (t.electricianCost || (t.electricianHours || t.hours || 0) * 50), 0
            )
          }
          apprenticeSubtotal={
            structuredData.labour.tasks.reduce((sum: number, t: any) => 
              sum + (t.apprenticeCost || 0), 0
            )
          }
          labourSubtotal={structuredData.labour.subtotal || analysis.labourTotal}
          overheadAllocation={structuredData.labour.overheadAllocation}
          travelTime={structuredData.labour.travelTime}
          travelCost={structuredData.labour.travelCost}
          finalTotal={analysis.labourTotal}
        />
      )}

      {/* Enhanced Panels for V3 Data */}
      {structuredData?.timescales && (
        <TimescalesPanel timescales={structuredData.timescales} />
      )}

      {structuredData?.alternatives && (
        <AlternativeQuotesPanel alternatives={structuredData.alternatives} />
      )}

      {structuredData?.orderList && (
        <OrderListPanel orderList={structuredData.orderList} />
      )}

      {/* Detailed Breakdown Tabs */}
      <Card className="border-elec-yellow/20">
        <Tabs defaultValue="materials" className="w-full">
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="materials" className="mobile-small-text h-12 sm:h-10">
                <Package className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Materials</span>
                <span className="xs:hidden">Mat.</span>
              </TabsTrigger>
              <TabsTrigger value="labour" className="mobile-small-text h-12 sm:h-10">
                <Clock className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Labour</span>
                <span className="xs:hidden">Lab.</span>
              </TabsTrigger>
              <TabsTrigger value="summary" className="mobile-small-text h-12 sm:h-10">
                <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Report</span>
                <span className="xs:hidden">Rep.</span>
              </TabsTrigger>
              <TabsTrigger value="json" className="mobile-small-text h-12 sm:h-10">
                <FileText className="h-4 w-4 mr-1 sm:mr-2" />
                JSON
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="materials" className="mt-0 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="mobile-heading text-foreground">Materials Breakdown</h3>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500">
                  {analysis.materials.length} items
                </Badge>
              </div>

              {analysis.materials.length > 0 ? (
                <div className="space-y-2">
                  {analysis.materials.map((material, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start justify-between p-4 sm:p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10 hover:border-elec-yellow/30 transition-all"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-elec-yellow font-bold text-base">{idx + 1}.</span>
                          <p className="mobile-text font-semibold text-foreground">
                            {material.item}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mobile-small-text text-elec-light ml-6">
                          <span className="font-medium">Qty: {material.quantity} {material.unit}</span>
                          {material.supplier && <span className="font-medium">Supplier: {material.supplier}</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="mobile-text font-bold text-foreground tabular-nums">
                          {formatCurrency(material.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-blue-500/10 border-2 border-blue-500/30">
                    <p className="mobile-text font-bold text-foreground">Materials Subtotal</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-500 tabular-nums">
                      {formatCurrency(analysis.materialsTotal)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mobile-text text-elec-light text-center py-8">No materials data available</p>
              )}
            </TabsContent>

            <TabsContent value="labour" className="mt-0 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="mobile-heading text-foreground">Labour Calculation</h3>
                <Badge variant="outline" className="border-green-500/30 text-green-500">
                  {analysis.labour.hours > 0 ? `${analysis.labour.hours} hours` : 'Estimated'}
                </Badge>
              </div>

              {analysis.labourTotal > 0 ? (
                <div className="space-y-3">
                  <div className="p-5 sm:p-6 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="mobile-text text-elec-light font-medium">Installation Time</span>
                      <span className="mobile-text font-bold text-foreground">
                        {analysis.labour.hours > 0 ? `${analysis.labour.hours} hours` : 'To be confirmed'}
                      </span>
                    </div>

                    {analysis.labour.rate > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="mobile-text text-elec-light font-medium">Labour Rate</span>
                        <span className="mobile-text font-bold text-foreground tabular-nums">
                          {formatCurrency(analysis.labour.rate)}/day
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-elec-yellow/10">
                      <span className="mobile-text text-elec-light font-medium">Description</span>
                      <span className="mobile-text font-bold text-foreground text-right max-w-[60%]">
                        {analysis.labour.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border-2 border-green-500/30">
                    <p className="mobile-text font-bold text-foreground">Labour Subtotal</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-500 tabular-nums">
                      {formatCurrency(analysis.labourTotal)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mobile-text text-elec-light text-center py-8">No labour data available</p>
              )}
            </TabsContent>

            <TabsContent value="summary" className="mt-0 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="mobile-heading text-foreground">Complete Cost Summary</h3>
              </div>

              <div className="space-y-3">
                {/* MATERIALS BREAKDOWN WITH MARKUP */}
                <div className="p-4 rounded-xl bg-blue-500/5 border-2 border-blue-500/20 space-y-3">
                  <h4 className="mobile-text font-bold text-blue-400 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Materials Breakdown
                  </h4>
                  
                  {structuredData?.summary?.materialsWholesale !== undefined ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="mobile-small-text text-elec-light font-medium">Wholesale Cost</span>
                        <span className="mobile-small-text font-bold text-foreground tabular-nums">
                          {formatCurrency(structuredData.summary.materialsWholesale)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="mobile-small-text text-elec-light font-medium">Markup (15%)</span>
                        <span className="mobile-small-text font-bold text-green-500 tabular-nums">
                          +{formatCurrency(structuredData.summary.materialsMarkup || 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-blue-500/20">
                        <span className="mobile-text text-elec-light font-medium">Materials Subtotal</span>
                        <span className="mobile-text font-bold text-foreground tabular-nums">
                          {formatCurrency(structuredData.summary.materialsSubtotal || analysis.materialsTotal)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="mobile-text text-elec-light font-medium">Materials Subtotal</span>
                      <span className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(analysis.materialsTotal)}</span>
                    </div>
                  )}
                </div>

                {/* LABOUR BREAKDOWN */}
                <div className="p-4 rounded-xl bg-green-500/5 border-2 border-green-500/20 space-y-3">
                  <h4 className="mobile-text font-bold text-green-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Labour Breakdown
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="mobile-text text-elec-light font-medium">Labour Subtotal</span>
                    <span className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(analysis.labourTotal)}</span>
                  </div>
                </div>
                
                {/* Net Total (Before VAT) */}
                <div className="p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10">
                  <div className="flex items-center justify-between">
                    <span className="mobile-text text-elec-light font-medium">Net Total (Before VAT)</span>
                    <span className="mobile-text font-bold text-foreground tabular-nums">{formatCurrency(analysis.subtotal)}</span>
                  </div>
                </div>

                {/* VAT */}
                <div className="p-4 rounded-xl bg-elec-yellow/10 border-2 border-elec-yellow/20">
                  <div className="flex items-center justify-between">
                    <span className="mobile-text text-elec-light font-medium">VAT ({analysis.vatRate}%)</span>
                    <span className="mobile-text font-bold text-elec-yellow tabular-nums">{formatCurrency(analysis.vatAmount)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-green-500/20 to-elec-yellow/20 border-2 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mobile-small-text text-elec-light mb-1 font-semibold">Final Quote Total</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
                        {formatCurrency(analysis.totalCost)}
                      </p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                {/* Full Text Report */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Complete AI Analysis
                  </h4>
                  <div className="p-4 rounded-lg bg-elec-dark/60 border border-elec-yellow/10 max-h-[400px] overflow-y-auto">
                    <pre className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
                      {analysis.rawText}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="json" className="mt-0 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Raw JSON Response</h3>
                <Button
                  onClick={() => {
                    const fullData = {
                      projectContext: projectContext || {},
                      costAnalysis: structuredData || analysis
                    };
                    navigator.clipboard.writeText(JSON.stringify(fullData, null, 2));
                    toast({
                      title: "JSON copied",
                      description: "JSON data copied to clipboard",
                    });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-elec-dark/60 border border-elec-yellow/10 max-h-[600px] overflow-auto">
                <pre className="text-xs font-mono text-muted-foreground whitespace-pre">
                  {JSON.stringify({
                    project_name: projectContext?.projectName || '',
                    client_name: projectContext?.clientInfo || '',
                    location: projectContext?.location || '',
                    project_type: projectContext?.projectType || 'domestic',
                    generated_date: new Date().toLocaleDateString('en-GB'),
                    
                    summary: {
                      materials_subtotal: analysis.materialsTotal,
                      labour_subtotal: analysis.labourTotal,
                      net_total: analysis.subtotal,
                      vat: analysis.vatAmount,
                      vat_rate: analysis.vatRate,
                      grand_total: analysis.totalCost
                    },
                    
                    materials: {
                      items: analysis.materials.map((m: any) => ({
                        description: m.item || '',
                        quantity: m.quantity,
                        unit: m.unit,
                        unit_price: m.unitPrice,
                        total: m.total,
                        supplier: m.supplier || ''
                      })),
                      subtotal: analysis.materialsTotal
                    },
                    
                    labour: {
                      tasks: structuredData?.labour?.tasks?.map((t: any) => ({
                        description: t.description,
                        hours: t.hours,
                        rate: t.rate,
                        total: t.total
                      })) || [{
                        description: analysis.labour.description,
                        hours: analysis.labour.hours,
                        rate: analysis.labour.rate,
                        total: analysis.labour.total
                      }],
                      subtotal: analysis.labourTotal
                    },
                    
                    timescales: structuredData?.timescales ? {
                      overall: structuredData.timescales.overall || '',
                      phases: (Array.isArray(structuredData.timescales.phases) ? structuredData.timescales.phases : []).map((p: any) => ({
                        name: p.name || '',
                        duration: p.duration || '',
                        description: p.description || ''
                      }))
                    } : null,
                    
                    alternatives: (Array.isArray(structuredData?.alternatives) ? structuredData.alternatives : []).map((alt: any) => ({
                      title: alt.title || '',
                      description: alt.description || '',
                      cost_change: alt.costChange || ''
                    })),
                    
                    order_list: structuredData?.orderList ? {
                      suppliers: (Array.isArray(structuredData.orderList.suppliers) ? structuredData.orderList.suppliers : []).map((s: any) => ({
                        name: s.name || '',
                        items: (Array.isArray(s.items) ? s.items : []).map((item: any) => ({
                          description: item.description || '',
                          quantity: item.quantity || 0,
                          unit: item.unit || ''
                        })),
                        subtotal: s.subtotal || 0
                      }))
                    } : null,
                    
                    additional_requirements: projectContext?.additionalInfo || ''
                  }, null, 2)}
                </pre>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

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

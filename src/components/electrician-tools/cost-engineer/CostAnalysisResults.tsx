import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Clock, TrendingUp, FileText, Copy, Download, Save, 
  CheckCircle2, ChevronRight, Sparkles, Calendar, Star 
} from "lucide-react";
import { ParsedCostAnalysis } from "@/utils/cost-analysis-parser";
import CostStatCard from "./CostStatCard";
import { toast } from "@/hooks/use-toast";
import TimescalesPanel from "./TimescalesPanel";
import AlternativeQuotesPanel from "./AlternativeQuotesPanel";
import OrderListPanel from "./OrderListPanel";

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

  const handleExportPDF = () => {
    toast({
      title: "PDF Export",
      description: "PDF export feature coming soon",
    });
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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Success Header */}
      <Card className="bg-gradient-to-br from-green-500/10 to-elec-yellow/10 border-green-500/30">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl text-foreground flex items-center gap-2">
                  Cost Analysis Complete
                  <Sparkles className="h-5 w-5 text-elec-yellow" />
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-1">
                  {projectName || 'Electrical Installation Project'}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-base sm:text-lg px-4 py-2 font-bold self-start sm:self-center">
              {formatCurrency(analysis.totalCost)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="materials" className="text-xs sm:text-sm">
                <Package className="h-4 w-4 mr-2 hidden sm:inline" />
                Materials
              </TabsTrigger>
              <TabsTrigger value="labour" className="text-xs sm:text-sm">
                <Clock className="h-4 w-4 mr-2 hidden sm:inline" />
                Labour
              </TabsTrigger>
              <TabsTrigger value="summary" className="text-xs sm:text-sm">
                <FileText className="h-4 w-4 mr-2 hidden sm:inline" />
                Full Report
              </TabsTrigger>
              <TabsTrigger value="json" className="text-xs sm:text-sm">
                <FileText className="h-4 w-4 mr-2 hidden sm:inline" />
                Raw JSON
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="materials" className="mt-0 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Materials Breakdown</h3>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500">
                  {analysis.materials.length} items
                </Badge>
              </div>

              {analysis.materials.length > 0 ? (
                <div className="space-y-2">
                  {analysis.materials.map((material, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start justify-between p-3 sm:p-4 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-elec-yellow font-bold text-sm">{idx + 1}.</span>
                          <p className="font-medium text-sm sm:text-base text-foreground">
                            {material.item}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground ml-6">
                          <span>Qty: {material.quantity} {material.unit}</span>
                          {material.supplier && <span>Supplier: {material.supplier}</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-sm sm:text-base text-foreground">
                          {formatCurrency(material.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 mt-3 border-t border-elec-yellow/20">
                    <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-blue-500/10">
                      <p className="font-semibold text-base sm:text-lg text-foreground">Materials Subtotal</p>
                      <p className="font-bold text-lg sm:text-xl text-blue-500">
                        {formatCurrency(analysis.materialsTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No materials data available</p>
              )}
            </TabsContent>

            <TabsContent value="labour" className="mt-0 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Labour Calculation</h3>
                <Badge variant="outline" className="border-green-500/30 text-green-500">
                  {analysis.labour.hours > 0 ? `${analysis.labour.hours} hours` : 'Estimated'}
                </Badge>
              </div>

              {analysis.labourTotal > 0 ? (
                <div className="space-y-3">
                  <div className="p-4 sm:p-6 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Installation Time</span>
                      <span className="font-semibold text-foreground">
                        {analysis.labour.hours > 0 ? `${analysis.labour.hours} hours` : 'To be confirmed'}
                      </span>
                    </div>

                    {analysis.labour.rate > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Labour Rate</span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(analysis.labour.rate)}/day
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-elec-yellow/10">
                      <span className="text-muted-foreground">Description</span>
                      <span className="font-semibold text-foreground text-right max-w-[60%]">
                        {analysis.labour.description}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 rounded-lg bg-green-500/10">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-base sm:text-lg text-foreground">Labour Subtotal</p>
                      <p className="font-bold text-lg sm:text-xl text-green-500">
                        {formatCurrency(analysis.labourTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No labour data available</p>
              )}
            </TabsContent>

            <TabsContent value="summary" className="mt-0 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Complete Cost Summary</h3>
              </div>

              <div className="space-y-3">
                {/* Subtotals */}
                <div className="p-4 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Materials Subtotal</span>
                    <span className="font-semibold text-foreground">{formatCurrency(analysis.materialsTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Labour Subtotal</span>
                    <span className="font-semibold text-foreground">{formatCurrency(analysis.labourTotal)}</span>
                  </div>
                  
                  {/* Show discrepancy warning if Net Total doesn't match calculation */}
                  {Math.abs(analysis.subtotal - (analysis.materialsTotal + analysis.labourTotal)) > 0.01 && (
                    <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded px-3 py-2">
                      <span className="text-xs text-amber-500 font-medium">⚠️ Additional Costs Detected</span>
                      <span className="text-xs font-semibold text-amber-500">
                        {formatCurrency(analysis.subtotal - (analysis.materialsTotal + analysis.labourTotal))}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-elec-yellow/10">
                    <span className="font-medium text-foreground">Net Total</span>
                    <span className="font-bold text-foreground">{formatCurrency(analysis.subtotal)}</span>
                  </div>
                </div>

                {/* VAT */}
                <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">VAT ({analysis.vatRate}%)</span>
                    <span className="font-bold text-elec-yellow">{formatCurrency(analysis.vatAmount)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="p-5 sm:p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-elec-yellow/20 border-2 border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Final Quote Total</p>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">
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
                    projectContext: projectContext || {},
                    costAnalysis: structuredData || analysis
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
          onClick={handleExportPDF}
          variant="outline"
          className="flex-1 touch-manipulation"
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
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
    </div>
  );
};

export default CostAnalysisResults;

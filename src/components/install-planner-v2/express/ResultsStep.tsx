import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Cable, Zap, TrendingDown, Shield, Package, DollarSign, BookOpen, FileText, Loader2 } from "lucide-react";
import { InstallPlanDataV2, CalculationResult, SiteInfo, ProjectInfo } from "../types";
import { InstallationInsights } from "../InstallationInsights";
import { RegulationTooltip } from "../RegulationTooltip";
import { SiteProjectInfoDialog } from "../SiteProjectInfoDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateInstallationPlanPDF, generatePlanReference } from "@/utils/installation-plan-pdf";

interface ResultsStepProps {
  planData: InstallPlanDataV2;
  updatePlanData: (data: InstallPlanDataV2) => void;
  result: CalculationResult | null;
}

export const ResultsStep = ({ planData, result }: ResultsStepProps) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showSiteInfoDialog, setShowSiteInfoDialog] = useState(false);
  const { toast } = useToast();

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-muted-foreground">
          <p>Calculating...</p>
        </div>
      </div>
    );
  }

  const handleExportPdf = () => {
    setShowSiteInfoDialog(true);
  };

  const handleSiteInfoSave = async (siteInfo: SiteInfo, projectInfo: ProjectInfo) => {
    setIsGeneratingPdf(true);
    const updatedPlanData = {
      ...planData,
      siteInfo,
      projectInfo: {
        ...projectInfo,
        planReference: projectInfo.planReference || generatePlanReference()
      }
    };

    try {
      await generateInstallationPlanPDF(updatedPlanData, result);
      toast({
        title: "PDF Generated",
        description: "Your installation plan has been downloaded successfully"
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Export failed",
        description: "Could not generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const hasSiteInfo = planData.siteInfo?.propertyAddress || planData.siteInfo?.clientName;
  const hasProjectInfo = planData.projectInfo?.leadElectrician || planData.projectInfo?.plannedStartDate;

  return (
    <div className="space-y-6">
      {/* Site/Project Info Preview & PDF Export */}
      <div className="space-y-3">
        {(hasSiteInfo || hasProjectInfo) && (
          <Card className="bg-elec-grey/50 border-primary/20">
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {hasSiteInfo && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Site Information</h4>
                    {planData.siteInfo?.propertyAddress && (
                      <p className="text-foreground/70">Address: {planData.siteInfo.propertyAddress}</p>
                    )}
                    {planData.siteInfo?.clientName && (
                      <p className="text-foreground/70">Client: {planData.siteInfo.clientName}</p>
                    )}
                  </div>
                )}
                {hasProjectInfo && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Project Information</h4>
                    {planData.projectInfo?.leadElectrician && (
                      <p className="text-foreground/70">Electrician: {planData.projectInfo.leadElectrician}</p>
                    )}
                    {planData.projectInfo?.plannedStartDate && (
                      <p className="text-foreground/70">Start: {planData.projectInfo.plannedStartDate}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="flex justify-end gap-2">
          {(hasSiteInfo || hasProjectInfo) && (
            <Button 
              onClick={() => setShowSiteInfoDialog(true)} 
              variant="outline"
              size="sm"
              className="gap-2"
            >
              Edit Details
            </Button>
          )}
          <Button 
            onClick={handleExportPdf} 
            disabled={isGeneratingPdf}
            variant="outline"
            className="gap-2"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Export Professional PDF
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Compliance Status - Mobile Optimized */}
      <div className={`p-4 md:p-6 rounded-xl ${
        result.compliant 
          ? 'bg-green-500/10 border-2 border-green-500/50' 
          : 'bg-red-500/10 border-2 border-red-500/50'
      }`}>
        <div className="flex items-center gap-2 md:gap-3">
          {result.compliant ? (
            <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-green-500 flex-shrink-0" />
          ) : (
            <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-red-500 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <h3 className="text-lg md:text-2xl font-bold text-foreground">
              {result.compliant ? 'BS 7671 Compliant' : 'Non-Compliant'}
            </h3>
            <p className="text-xs md:text-sm text-foreground/80">
              {result.compliant 
                ? 'Meets all electrical safety standards' 
                : 'Requires adjustments to meet standards'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Results - Mobile Optimized */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
              <Cable className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Cable Size
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
                {result.recommendedCableSize}mm²
              </div>
              <RegulationTooltip 
                topic="cable size" 
                context={{ size: result.recommendedCableSize, load: planData.totalLoad, length: planData.cableLength }}
              />
            </div>
            <div className="text-xs md:text-sm text-foreground">
              Capacity: {result.deratedCapacity.toFixed(1)}A (derated)
            </div>
            <div className="text-xs text-foreground/70 mt-0.5 md:mt-1">
              Base capacity: {result.capacity}A
            </div>
          </CardContent>
        </Card>

        <Card className="bg-elec-yellow/5 border-elec-yellow/20">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
              Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl md:text-4xl font-bold text-elec-yellow mb-1 md:mb-2">
              {result.protectiveDevice}
            </div>
            <div className="text-xs md:text-sm text-foreground">
              Overcurrent protection device
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Voltage Drop
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1 md:mb-2">
              {result.voltageDropPercent.toFixed(2)}%
            </div>
            <div className="text-xs md:text-sm text-foreground mb-1">
              {result.voltageDrop.toFixed(2)}V drop
            </div>
            <Badge className={result.voltageDropPercent <= 3 ? 'bg-green-500 text-foreground' : 'bg-amber-500 text-foreground'}>
              {result.voltageDropPercent <= 3 ? 'Within limits' : 'Review required'}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              Safety Margin
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1 md:mb-2">
              {result.safetyMargin.toFixed(1)}%
            </div>
            <div className="text-xs md:text-sm text-foreground">
              Capacity above requirement
            </div>
            <div className="text-xs text-foreground/70 mt-0.5 md:mt-1">
              Zs: {result.zs.toFixed(3)}Ω
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Insights */}
      <InstallationInsights planData={planData} result={result} />

      {/* Derating Factors - Mobile Optimized */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
            Applied Derating Factors
            <RegulationTooltip 
              topic="derating factors" 
              context={{ temp: result.factors.temperature, grouping: result.factors.grouping }}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
            <div>
              <div className="text-xs md:text-sm text-foreground/70">Temperature</div>
              <div className="text-xl md:text-2xl font-bold text-primary">{result.factors.temperature}</div>
            </div>
            <div>
              <div className="text-xs md:text-sm text-foreground/70">Grouping</div>
              <div className="text-xl md:text-2xl font-bold text-primary">{result.factors.grouping}</div>
            </div>
            <div>
              <div className="text-xs md:text-sm text-foreground/70">Overall</div>
              <div className="text-xl md:text-2xl font-bold text-primary">{result.factors.overall.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Materials List - Mobile Optimized */}
      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
            <Package className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Required Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 md:space-y-3">
            {result.materials.map((material, idx) => (
              <div key={idx} className="flex justify-between items-start gap-3 pb-2 md:pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="text-left min-w-0">
                  <p className="text-sm md:text-base font-medium text-foreground">{material.name}</p>
                  <p className="text-xs md:text-sm text-foreground/70 mt-0.5">{material.specification}</p>
                </div>
                <span className="text-xs md:text-sm font-semibold text-primary flex-shrink-0">{material.quantity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Estimate - Mobile Optimized with £ */}
      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
            <span className="text-primary text-base md:text-lg">£</span>
            Cost Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 md:space-y-3">
            {result.costEstimate.breakdown.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center gap-3 text-xs md:text-sm">
                <span className="text-left text-foreground/80">{item.item}</span>
                <span className="font-medium text-foreground">£{item.cost}</span>
              </div>
            ))}
            <div className="pt-2 md:pt-3 border-t border-border flex justify-between items-center gap-3">
              <span className="font-semibold text-sm md:text-base text-foreground text-left">Total Estimate</span>
              <span className="text-lg md:text-xl font-bold text-primary">£{result.costEstimate.total}</span>
            </div>
            <p className="text-xs text-foreground/70 mt-2 text-left">
              * Prices are estimates based on UK market rates (September 2025)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Practical Guidance - Mobile Optimized */}
      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="text-sm md:text-base text-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Installation Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 md:space-y-4">
            {result.practicalGuidance.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-xs md:text-sm mb-2 text-foreground text-left">{section.title}</h4>
                <ul className="space-y-1 md:space-y-1.5">
                  {section.points.map((point, pidx) => (
                    <li key={pidx} className="flex gap-1.5 items-start text-xs md:text-sm text-foreground leading-snug">
                      <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                      <span className="break-words text-left">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Warnings - Mobile Optimized */}
      {result.warnings.length > 0 && (
        <div className="p-3 md:p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-semibold text-sm md:text-base text-amber-400 mb-1.5 md:mb-2">Warnings</h4>
              <ul className="space-y-0.5 md:space-y-1">
                {result.warnings.map((warning, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-foreground">• {warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations - Mobile Optimized */}
      {result.recommendations.length > 0 && (
        <div className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="font-semibold text-sm md:text-base text-primary mb-1.5 md:mb-2">Recommendations</h4>
              <ul className="space-y-0.5 md:space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-foreground">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Site & Project Info Dialog */}
      <SiteProjectInfoDialog
        open={showSiteInfoDialog}
        onOpenChange={setShowSiteInfoDialog}
        planData={planData}
        onSave={handleSiteInfoSave}
      />
    </div>
  );
};

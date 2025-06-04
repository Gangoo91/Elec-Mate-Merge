
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstallPlanData, InstallPlanResult } from "./types";
import { Download, Calculator, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CableSelectionEngine } from "./CableSelectionEngine";
import CableRecommendationsCard from "./CableRecommendationsCard";
import InstallationSuggestionsCard from "./InstallationSuggestionsCard";
import ComplianceChecksCard from "./ComplianceChecksCard";

interface ResultsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const ResultsStep = ({ planData }: ResultsStepProps) => {
  // Calculate design current
  const designCurrent = planData.phases === "single" 
    ? planData.totalLoad / planData.voltage 
    : planData.totalLoad / (planData.voltage * Math.sqrt(3));

  // Use the enhanced cable selection engine
  const cableOptions = CableSelectionEngine.calculateCableOptions(planData);
  const recommendedCable = cableOptions[0];
  const alternativeCables = cableOptions.slice(1, 4); // Top 3 alternatives

  // Calculate Zs (simplified)
  const r1r2 = planData.cableLength * (recommendedCable?.size === "1.5mm²" ? 24.2 : 
                                      recommendedCable?.size === "2.5mm²" ? 14.8 : 
                                      recommendedCable?.size === "4.0mm²" ? 9.2 : 
                                      recommendedCable?.size === "6.0mm²" ? 6.2 : 3.66) / 1000;
  const zsValue = planData.ze + r1r2;
  
  // MCB trip characteristics (simplified)
  const maxZs = planData.protectiveDevice.includes("rcbo") || planData.protectiveDevice.includes("mcb") ? 
    (planData.voltage === 230 ? 1.44 : 0.83) : 1.15;
  
  const zsCompliance = zsValue <= maxZs;

  // Generate suggestions and compliance checks
  const suggestions = CableSelectionEngine.generateSuggestions(planData, cableOptions);
  const complianceChecks = recommendedCable ? 
    CableSelectionEngine.performComplianceChecks(planData, zsValue, recommendedCable) : [];

  const exportResults = () => {
    const exportData = {
      planData,
      recommendedCable,
      alternativeCables,
      suggestions,
      complianceChecks,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `install-plan-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!recommendedCable) {
    return (
      <div className="space-y-6">
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-300" />
          <AlertDescription className="text-red-200">
            <strong>Unable to generate recommendations.</strong> Please check your input parameters and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Enhanced Installation Plan</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis with multiple recommendations and BS 7671 compliance checks.
          </p>
        </div>
        <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cable Recommendations */}
        <div className="lg:col-span-2">
          <CableRecommendationsCard 
            recommendations={[recommendedCable, ...alternativeCables]}
          />
        </div>

        {/* Right Column - Design Summary */}
        <div>
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Design Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Design Current</p>
                <p className="text-xl font-bold">{designCurrent.toFixed(2)}A</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protective Device</p>
                <p className="font-medium">{recommendedCable.ratedCurrent}A {planData.protectiveDevice}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Zs Value</p>
                <p className="text-xl font-bold flex items-center gap-2">
                  {zsValue.toFixed(3)}Ω
                  {zsCompliance ? 
                    <CheckCircle className="h-5 w-5 text-green-400" /> : 
                    <XCircle className="h-5 w-5 text-red-400" />
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maximum Demand</p>
                <p className="text-xl font-bold">{(planData.totalLoad * 1.1 / 1000).toFixed(2)}kW</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Installation Method</p>
                <p className="font-medium">{planData.installationMethod}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cable Length</p>
                <p className="font-medium">{planData.cableLength}m</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggestions and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InstallationSuggestionsCard suggestions={suggestions} />
        <ComplianceChecksCard checks={complianceChecks} />
      </div>

      <Alert className="bg-amber-500/10 border-amber-500/30">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          <strong>Professional Verification Required:</strong> This tool provides guidance based on simplified calculations. 
          Always verify results with current BS 7671 requirements and manufacturer specifications. 
          Professional design verification is recommended for critical installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsStep;

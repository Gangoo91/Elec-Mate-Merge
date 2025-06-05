
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstallPlanData } from "./types";
import { Download, Calculator, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CableSelectionEngine } from "./CableSelectionEngine";
import CableRecommendationsCard from "./CableRecommendationsCard";
import InstallationSuggestionsCard from "./InstallationSuggestionsCard";
import ComplianceChecksCard from "./ComplianceChecksCard";
import VisualCircuitDesigner from "./VisualCircuitDesigner";

interface ResultsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const ResultsStep = ({ planData }: ResultsStepProps) => {
  // Calculate design current
  const designCurrent = planData.phases === "single" 
    ? planData.totalLoad / planData.voltage 
    : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.85));

  // Use the enhanced cable selection engine
  const cableOptions = CableSelectionEngine.calculateCableOptions(planData);
  const recommendedCable = cableOptions[0];
  const alternativeCables = cableOptions.slice(1, 4);

  // Calculate Zs (enhanced calculation)
  const r1r2 = planData.cableLength * (
    recommendedCable?.size === "1.5mm²" ? 24.2 : 
    recommendedCable?.size === "2.5mm²" ? 14.8 : 
    recommendedCable?.size === "4.0mm²" ? 9.2 : 
    recommendedCable?.size === "6.0mm²" ? 6.2 : 
    recommendedCable?.size === "10.0mm²" ? 3.66 : 
    recommendedCable?.size === "16.0mm²" ? 2.3 : 
    recommendedCable?.size === "25.0mm²" ? 1.454 : 1.0
  ) / 1000;
  
  const zsValue = planData.ze + r1r2;
  
  // Enhanced Zs compliance check
  const getMaxZs = () => {
    if (planData.protectiveDevice.includes("rcbo") || planData.protectiveDevice.includes("mcb")) {
      return planData.voltage === 230 ? 1.44 : 0.83;
    } else {
      return planData.voltage === 230 ? 1.15 : 0.66;
    }
  };
  
  const maxZs = getMaxZs();
  const zsCompliance = zsValue <= maxZs;

  // Generate enhanced suggestions and compliance checks
  const suggestions = CableSelectionEngine.generateSuggestions(planData, cableOptions);
  const complianceChecks = recommendedCable ? 
    CableSelectionEngine.performComplianceChecks(planData, zsValue, recommendedCable) : [];

  // Calculate diversity factor based on installation type and load
  const getDiversityFactor = () => {
    if (planData.installationType === "domestic") {
      switch (planData.loadType) {
        case "power": return 0.4; // 40% diversity for socket outlets
        case "lighting": return 0.66; // 66% diversity for lighting
        case "cooker": return 0.1; // 10% diversity for cookers
        default: return 0.8;
      }
    } else if (planData.installationType === "commercial") {
      return 0.75; // 75% diversity for commercial
    }
    return 1.0; // No diversity for industrial/specialised
  };

  const diversityFactor = getDiversityFactor();
  const diversifiedLoad = planData.totalLoad * diversityFactor;

  const exportResults = () => {
    const exportData = {
      planData,
      calculations: {
        designCurrent: designCurrent.toFixed(2),
        zsValue: zsValue.toFixed(3),
        zsCompliance,
        diversityFactor,
        diversifiedLoad: diversifiedLoad.toFixed(0)
      },
      recommendedCable,
      alternativeCables,
      suggestions,
      complianceChecks,
      timestamp: new Date().toISOString(),
      generatedBy: "Elec-Mate Installation Planner v2.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-install-plan-${Date.now()}.json`;
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
            The design current may exceed available cable capacities for the specified conditions.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Professional Installation Plan</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis with visual circuit design, multiple recommendations, and BS 7671 compliance verification.
          </p>
        </div>
        <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </div>

      {/* Visual Circuit Designer */}
      <VisualCircuitDesigner 
        planData={planData} 
        recommendedCable={recommendedCable}
      />

      {/* Main Results Grid */}
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Design Current</p>
                  <p className="text-xl font-bold text-elec-yellow">{designCurrent.toFixed(2)}A</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Protective Device</p>
                  <p className="font-medium">{recommendedCable.ratedCurrent}A {planData.protectiveDevice.toUpperCase()}</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Zs Value</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{zsValue.toFixed(3)}Ω</span>
                    {zsCompliance ? 
                      <CheckCircle className="h-5 w-5 text-green-400" /> : 
                      <XCircle className="h-5 w-5 text-red-400" />
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Max: {maxZs.toFixed(3)}Ω</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Voltage Drop</p>
                  <p className="text-xl font-bold text-blue-400">
                    {recommendedCable.voltageDropPercentage.toFixed(2)}%
                  </p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Diversity Applied</p>
                  <p className="font-medium">{(diversityFactor * 100).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">
                    Diversified: {(diversifiedLoad / 1000).toFixed(2)}kW
                  </p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Installation Method</p>
                  <p className="font-medium capitalize">{planData.installationMethod.replace('-', ' ')}</p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Environment</p>
                  <p className="font-medium">{planData.ambientTemperature}°C</p>
                  <p className="text-xs text-muted-foreground">
                    Grouping: {planData.groupingFactor}
                  </p>
                </div>
              </div>

              {/* Quick Status Indicators */}
              <div className="pt-4 border-t border-elec-yellow/20">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Capacity</span>
                    <div className="flex items-center gap-1">
                      {recommendedCable.currentCarryingCapacity >= designCurrent * 1.1 ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <span className={recommendedCable.currentCarryingCapacity >= designCurrent * 1.1 ? 
                        "text-green-400" : "text-red-400"}>
                        {recommendedCable.currentCarryingCapacity >= designCurrent * 1.1 ? "OK" : "INSUFFICIENT"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Voltage Drop</span>
                    <div className="flex items-center gap-1">
                      {recommendedCable.voltageDropPercentage <= 
                        (planData.loadType === "lighting" ? 3 : 5) ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <span className={recommendedCable.voltageDropPercentage <= 
                        (planData.loadType === "lighting" ? 3 : 5) ? 
                        "text-green-400" : "text-red-400"}>
                        {recommendedCable.voltageDropPercentage <= 
                          (planData.loadType === "lighting" ? 3 : 5) ? "OK" : "EXCESSIVE"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Earth Fault Loop</span>
                    <div className="flex items-center gap-1">
                      {zsCompliance ? 
                        <CheckCircle className="h-4 w-4 text-green-400" /> : 
                        <XCircle className="h-4 w-4 text-red-400" />
                      }
                      <span className={zsCompliance ? "text-green-400" : "text-red-400"}>
                        {zsCompliance ? "COMPLIANT" : "NON-COMPLIANT"}
                      </span>
                    </div>
                  </div>
                </div>
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

      {/* Professional Notice */}
      <Alert className="bg-amber-500/10 border-amber-500/30">
        <Lightbulb className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          <strong>Professional Verification Required:</strong> This tool provides guidance based on BS 7671:2018+A2:2022 requirements and simplified calculations. 
          Always verify results with current regulations, manufacturer specifications, and site-specific conditions. 
          Professional design verification and testing is recommended for all electrical installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsStep;

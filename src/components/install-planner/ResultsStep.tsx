
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Professional Installation Plan</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis with visual circuit design, multiple recommendations, and BS 7671 compliance verification.
        </p>
      </div>

      {/* Visual Circuit Designer */}
      <VisualCircuitDesigner 
        planData={planData} 
        recommendedCable={recommendedCable}
      />

      {/* Main Results Grid - Mobile-First Layout */}
      <div className="space-y-6">
        {/* Design Summary - Mobile First */}
        <div>
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Design Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics Grid - Mobile Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1 sm:col-span-2 md:col-span-1 p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Design Current</p>
                  <p className="text-2xl font-bold text-elec-yellow">{designCurrent.toFixed(2)}A</p>
                </div>
                
                <div className="col-span-1 sm:col-span-2 md:col-span-1 p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Cable Size</p>
                  <p className="text-xl font-bold text-green-400">{recommendedCable.size}</p>
                </div>

                <div className="col-span-1 p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Voltage Drop</p>
                  <p className="text-lg font-bold text-blue-400">{recommendedCable.voltageDropPercentage.toFixed(1)}%</p>
                </div>

                <div className="col-span-1 p-4 bg-elec-dark/50 rounded border border-elec-yellow/20 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Zs Value</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg font-bold">{zsValue.toFixed(2)}Ω</span>
                    {zsCompliance ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                  </div>
                </div>
              </div>

              {/* Protective Device Selection */}
              <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-elec-light">Compatible Protective Devices</p>
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                    RECOMMENDED
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-elec-yellow/10 rounded border border-elec-yellow/30">
                    <span className="font-medium">{recommendedCable.ratedCurrent}A {planData.protectiveDevice.toUpperCase()}</span>
                    <Badge variant="outline" className="text-green-400 border-green-400/30">OPTIMAL</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-elec-dark/30 rounded border border-gray-600">
                    <span className="text-muted-foreground">{Math.max(recommendedCable.ratedCurrent - 10, 16)}A MCB</span>
                    <Badge variant="outline" className="text-amber-400 border-amber-400/30">ALTERNATIVE</Badge>
                  </div>
                </div>
              </div>
                
              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Installation Method</p>
                  <p className="font-medium capitalize">{planData.installationMethod.replace('-', ' ')}</p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Environment</p>
                  <p className="font-medium">{planData.ambientTemperature}°C</p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Load After Diversity</p>
                  <p className="font-medium">{(diversifiedLoad / 1000).toFixed(1)}kW</p>
                  <p className="text-xs text-muted-foreground">({(diversityFactor * 100).toFixed(0)}% applied)</p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Expected Cost</p>
                  <p className="font-medium text-green-400">£{(recommendedCable.size === "1.5mm²" ? 45 : recommendedCable.size === "2.5mm²" ? 65 : 85)}-{(recommendedCable.size === "1.5mm²" ? 85 : recommendedCable.size === "2.5mm²" ? 125 : 165)}</p>
                  <p className="text-xs text-muted-foreground">Per 100m estimate</p>
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

        {/* Cable Recommendations */}
        <CableRecommendationsCard 
          recommendations={[recommendedCable, ...alternativeCables]}
        />

        {/* Suggestions and Compliance - Stacked for Mobile */}
        <div className="space-y-6">
          <ComplianceChecksCard checks={complianceChecks} />
          <InstallationSuggestionsCard suggestions={suggestions} />
        </div>
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

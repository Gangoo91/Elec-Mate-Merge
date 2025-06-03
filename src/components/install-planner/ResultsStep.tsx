
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InstallPlanData, InstallPlanResult, CableRecommendation } from "./types";
import { CheckCircle, AlertTriangle, XCircle, Download, Cable, Shield, Calculator, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ResultsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const ResultsStep = ({ planData }: ResultsStepProps) => {
  // Calculate design current
  const designCurrent = planData.phases === "single" 
    ? planData.totalLoad / planData.voltage 
    : planData.totalLoad / (planData.voltage * Math.sqrt(3));

  // Simplified cable sizing logic (in real implementation, this would reference proper cable tables)
  const calculateCableSize = (): InstallPlanResult => {
    const correctedCurrent = designCurrent / (planData.groupingFactor * planData.derating);
    
    // Simplified cable recommendations based on current
    const getCableRecommendation = (current: number): CableRecommendation => {
      let size = "1.5";
      let capacity = 20;
      
      if (current > 32) {
        size = "10.0";
        capacity = 64;
      } else if (current > 26) {
        size = "6.0";
        capacity = 47;
      } else if (current > 20) {
        size = "4.0";
        capacity = 32;
      } else if (current > 13) {
        size = "2.5";
        capacity = 27;
      }

      // Simplified voltage drop calculation (actual would use proper mV/A/m values)
      const voltageDropMv = planData.cableLength * current * (size === "1.5" ? 29 : size === "2.5" ? 18 : size === "4.0" ? 11 : size === "6.0" ? 7.3 : 4.4);
      const voltageDropPercentage = (voltageDropMv / 1000 / planData.voltage) * 100;
      
      const maxVoltageDropPercentage = planData.loadType === "lighting" ? 3 : 5;
      const suitability: "suitable" | "marginal" | "unsuitable" = 
        voltageDropPercentage <= maxVoltageDropPercentage ? "suitable" : 
        voltageDropPercentage <= maxVoltageDropPercentage + 1 ? "marginal" : "unsuitable";

      return {
        size: `${size}mm²`,
        type: planData.cableType,
        currentCarryingCapacity: capacity,
        voltageDropPercentage,
        ratedCurrent: Math.ceil(current * 1.45), // 45% safety margin for MCB rating
        suitability,
        notes: [
          `Current capacity: ${capacity}A (derated: ${(capacity * planData.groupingFactor * planData.derating).toFixed(1)}A)`,
          `Voltage drop: ${voltageDropPercentage.toFixed(2)}% (limit: ${maxVoltageDropPercentage}%)`,
          suitability === "unsuitable" ? "Voltage drop exceeds BS 7671 limits" : ""
        ].filter(Boolean)
      };
    };

    const recommendedCable = getCableRecommendation(correctedCurrent);
    
    // Calculate Zs (simplified)
    const r1r2 = planData.cableLength * (recommendedCable.size === "1.5mm²" ? 24.2 : 
                                        recommendedCable.size === "2.5mm²" ? 14.8 : 
                                        recommendedCable.size === "4.0mm²" ? 9.2 : 
                                        recommendedCable.size === "6.0mm²" ? 6.2 : 3.66) / 1000;
    const zsValue = planData.ze + r1r2;
    
    // MCB trip characteristics (simplified)
    const maxZs = planData.protectiveDevice.includes("rcbo") || planData.protectiveDevice.includes("mcb") ? 
      (planData.voltage === 230 ? 1.44 : 0.83) : 1.15; // Simplified Zs limits
    
    const zsCompliance = zsValue <= maxZs;

    return {
      recommendedCable,
      alternativeCables: [],
      protectiveDeviceRating: recommendedCable.ratedCurrent,
      maximumDemand: planData.totalLoad * 1.1, // 10% diversity
      zsValue,
      zsCompliance,
      diversityFactor: 0.9,
      totalSystemLoad: planData.totalLoad,
      warnings: [
        !zsCompliance ? "Zs value exceeds maximum for selected protective device" : "",
        recommendedCable.suitability === "unsuitable" ? "Cable size inadequate for voltage drop requirements" : "",
        correctedCurrent > 32 ? "High current load - consider load splitting" : ""
      ].filter(Boolean),
      recommendations: [
        "Verify all calculations with current BS 7671 requirements",
        "Consider future load expansion in final design",
        "Ensure adequate circuit protection coordination",
        "Check manufacturer's installation guidelines"
      ]
    };
  };

  const results = calculateCableSize();

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case "suitable":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "marginal":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "unsuitable":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case "suitable":
        return "bg-green-500/20 border-green-500/30 text-green-300";
      case "marginal":
        return "bg-amber-500/20 border-amber-500/30 text-amber-300";
      case "unsuitable":
        return "bg-red-500/20 border-red-500/30 text-red-300";
      default:
        return "";
    }
  };

  const exportResults = () => {
    const exportData = {
      planData,
      results,
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Installation Plan Results</h2>
          <p className="text-muted-foreground">
            Based on your specifications, here's the recommended installation plan.
          </p>
        </div>
        <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cable Recommendation */}
        <Card className={`border-2 ${getSuitabilityColor(results.recommendedCable.suitability)}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cable className="h-5 w-5" />
              Recommended Cable
              {getSuitabilityIcon(results.recommendedCable.suitability)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-bold">
              {results.recommendedCable.size}
            </div>
            <div className="space-y-2">
              <p><strong>Type:</strong> {results.recommendedCable.type}</p>
              <p><strong>Current Capacity:</strong> {results.recommendedCable.currentCarryingCapacity}A</p>
              <p><strong>Voltage Drop:</strong> {results.recommendedCable.voltageDropPercentage.toFixed(2)}%</p>
              <Badge variant={results.recommendedCable.suitability === "suitable" ? "default" : "destructive"}>
                {results.recommendedCable.suitability.toUpperCase()}
              </Badge>
            </div>
            <div className="text-sm space-y-1">
              {results.recommendedCable.notes.map((note, index) => (
                <p key={index} className="text-muted-foreground">• {note}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Protection Details */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Protection Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Protective Device Rating</p>
              <p className="text-2xl font-bold">{results.protectiveDeviceRating}A</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Zs Value</p>
              <p className="text-xl font-bold flex items-center gap-2">
                {results.zsValue.toFixed(3)}Ω
                {results.zsCompliance ? 
                  <CheckCircle className="h-5 w-5 text-green-400" /> : 
                  <XCircle className="h-5 w-5 text-red-400" />
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maximum Demand</p>
              <p className="text-xl font-bold">{(results.maximumDemand / 1000).toFixed(2)}kW</p>
            </div>
          </CardContent>
        </Card>

        {/* Design Summary */}
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
              <p className="text-sm text-muted-foreground">Installation Method</p>
              <p className="font-medium">{planData.installationMethod}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cable Length</p>
              <p className="font-medium">{planData.cableLength}m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Load Type</p>
              <p className="font-medium capitalize">{planData.loadType}</p>
            </div>
          </CardContent>
        </Card>

        {/* Warnings & Recommendations */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Notes & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.warnings.length > 0 && (
              <div>
                <h4 className="font-medium text-red-300 mb-2">Warnings:</h4>
                <div className="space-y-1">
                  {results.warnings.map((warning, index) => (
                    <Alert key={index} className="bg-red-500/10 border-red-500/30">
                      <AlertTriangle className="h-4 w-4 text-red-300" />
                      <AlertDescription className="text-red-200 text-sm">
                        {warning}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h4 className="font-medium text-blue-300 mb-2">Recommendations:</h4>
              <div className="space-y-1">
                {results.recommendations.map((rec, index) => (
                  <p key={index} className="text-sm text-muted-foreground">• {rec}</p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-amber-500/10 border-amber-500/30">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          <strong>Important:</strong> This tool provides guidance based on simplified calculations. 
          Always verify results with current BS 7671 requirements and manufacturer specifications. 
          Professional design verification is recommended for critical installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ResultsStep;

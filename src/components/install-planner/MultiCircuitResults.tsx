
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Calculator, AlertTriangle, CheckCircle, XCircle, Zap, Power, Cable } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InstallPlanData, MultiCircuitResult, Circuit } from "./types";
import { CableSelectionEngine } from "./CableSelectionEngine";
import { toast } from "@/hooks/use-toast";

interface MultiCircuitResultsProps {
  planData: InstallPlanData;
}

const MultiCircuitResults: React.FC<MultiCircuitResultsProps> = ({ planData }) => {
  const circuits = planData.circuits?.filter(c => c.enabled) || [];
  
  if (circuits.length === 0) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="text-center py-12">
          <Cable className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Circuits</h3>
          <p className="text-muted-foreground">
            Enable at least one circuit to see design calculations and recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Calculate results for each circuit
  const circuitResults = circuits.map(circuit => {
    const circuitPlanData = {
      ...planData,
      loadType: circuit.loadType,
      totalLoad: circuit.totalLoad,
      voltage: circuit.voltage,
      phases: circuit.phases,
      cableLength: circuit.cableLength,
      installationMethod: circuit.installationMethod,
      cableType: circuit.cableType,
      protectiveDevice: circuit.protectiveDevice,
      powerFactor: circuit.powerFactor
    };

    const designCurrent = circuit.phases === "single" 
      ? circuit.totalLoad / circuit.voltage 
      : circuit.totalLoad / (circuit.voltage * Math.sqrt(3) * (circuit.powerFactor || 0.85));

    const cableOptions = CableSelectionEngine.calculateCableOptions(circuitPlanData);
    const recommendedCable = cableOptions[0];

    // Calculate Zs
    const r1r2 = circuit.cableLength * (
      recommendedCable?.size === "1.5mm²" ? 24.2 : 
      recommendedCable?.size === "2.5mm²" ? 14.8 : 
      recommendedCable?.size === "4.0mm²" ? 9.2 : 
      recommendedCable?.size === "6.0mm²" ? 6.2 : 
      recommendedCable?.size === "10.0mm²" ? 3.66 : 1.0
    ) / 1000;
    
    const zsValue = planData.ze + r1r2;
    const maxZs = circuit.voltage === 230 ? 1.44 : 0.83;
    const zsCompliance = zsValue <= maxZs;

    const voltageDropLimit = circuit.loadType === "lighting" ? 3 : 5;
    const voltageDropCompliance = recommendedCable ? 
      recommendedCable.voltageDropPercentage <= voltageDropLimit : false;

    const warnings: string[] = [];
    if (!zsCompliance) warnings.push("Earth fault loop impedance exceeds maximum permitted value");
    if (!voltageDropCompliance) warnings.push("Voltage drop exceeds recommended limits");
    if (!recommendedCable) warnings.push("No suitable cable found for specified conditions");

    return {
      circuit,
      recommendedCable,
      alternativeCables: cableOptions.slice(1, 3),
      designCurrent,
      protectiveDeviceRating: recommendedCable?.ratedCurrent || 32,
      zsValue,
      zsCompliance,
      voltageDropCompliance,
      warnings
    };
  });

  // Calculate system totals
  const totalConnectedLoad = circuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
  
  // Apply diversity factor based on installation type
  const getDiversityFactor = () => {
    if (planData.installationType === "domestic") return 0.4;
    if (planData.installationType === "commercial") return 0.75;
    return 1.0;
  };

  const diversityFactor = getDiversityFactor();
  const diversifiedLoad = totalConnectedLoad * diversityFactor;
  const recommendedSupplyRating = Math.ceil(diversifiedLoad / (planData.voltage * (planData.phases === "three" ? Math.sqrt(3) : 1)) / 5) * 5;

  // System compliance checks
  const systemWarnings: string[] = [];
  const systemRecommendations: string[] = [];

  if (totalConnectedLoad > 100000) {
    systemWarnings.push("Total connected load exceeds 100kW - consider load management");
  }

  if (circuits.some(c => c.phases === "three") && circuits.some(c => c.phases === "single")) {
    systemRecommendations.push("Mixed single and three-phase loads detected - ensure proper load balancing");
  }

  const exportResults = () => {
    const exportData = {
      planData,
      circuitResults,
      systemTotals: {
        totalConnectedLoad,
        diversifiedLoad,
        diversityFactor,
        recommendedSupplyRating
      },
      timestamp: new Date().toISOString(),
      generatedBy: "Elec-Mate Multi-Circuit Installation Planner v2.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-multi-circuit-plan-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported",
      description: "Multi-circuit installation plan has been exported successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Multi-Circuit Installation Results</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of {circuits.length} active circuits with system-wide calculations.
          </p>
        </div>
        <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Complete Plan
        </Button>
      </div>

      {/* System Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="h-5 w-5 text-elec-yellow" />
            System Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-elec-yellow">{circuits.length}</div>
              <div className="text-sm text-muted-foreground">Active Circuits</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-blue-400">{(totalConnectedLoad / 1000).toFixed(1)}kW</div>
              <div className="text-sm text-muted-foreground">Connected Load</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-green-400">{(diversifiedLoad / 1000).toFixed(1)}kW</div>
              <div className="text-sm text-muted-foreground">Diversified Load</div>
            </div>
            <div className="text-center p-4 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <div className="text-2xl font-bold text-amber-400">{recommendedSupplyRating}A</div>
              <div className="text-sm text-muted-foreground">Supply Rating</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-elec-dark/30 rounded border border-elec-yellow/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Diversity Applied</span>
              <span className="text-sm text-elec-yellow">{(diversityFactor * 100).toFixed(0)}%</span>
            </div>
            <Progress value={diversityFactor * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Load reduction based on {planData.installationType} installation type
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Circuit Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Individual Circuit Analysis</h3>
        
        {circuitResults.map((result, index) => (
          <Card key={result.circuit.id} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  {result.circuit.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={result.zsCompliance && result.voltageDropCompliance ? 
                      'border-green-400/30 text-green-400' : 
                      'border-red-400/30 text-red-400'
                    }
                  >
                    {result.zsCompliance && result.voltageDropCompliance ? 'Compliant' : 'Issues'}
                  </Badge>
                  <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                    {result.circuit.loadType}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Design Current</p>
                  <p className="text-lg font-bold text-elec-yellow">{result.designCurrent.toFixed(2)}A</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Recommended Cable</p>
                  <p className="font-medium">{result.recommendedCable?.size || "TBD"}</p>
                  <p className="text-xs text-muted-foreground">{result.circuit.cableType.toUpperCase()}</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Protection</p>
                  <p className="font-medium">{result.protectiveDeviceRating}A</p>
                  <p className="text-xs text-muted-foreground">{result.circuit.protectiveDevice.toUpperCase()}</p>
                </div>
                
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground">Voltage Drop</p>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{result.recommendedCable?.voltageDropPercentage.toFixed(2) || "0.00"}%</span>
                    {result.voltageDropCompliance ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Zs Value</span>
                    {result.zsCompliance ? 
                      <CheckCircle className="h-4 w-4 text-green-400" /> : 
                      <XCircle className="h-4 w-4 text-red-400" />
                    }
                  </div>
                  <p className="text-lg font-bold">{result.zsValue.toFixed(3)}Ω</p>
                  <p className="text-xs text-muted-foreground">Max: 1.44Ω</p>
                </div>

                <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
                  <p className="text-sm text-muted-foreground mb-1">Load Details</p>
                  <p className="font-medium">{result.circuit.totalLoad}W</p>
                  <p className="text-xs text-muted-foreground">
                    {result.circuit.phases === "single" ? "Single" : "Three"} Phase • {result.circuit.cableLength}m
                  </p>
                </div>
              </div>

              {result.warnings.length > 0 && (
                <Alert className="mt-4 bg-red-500/10 border-red-500/30">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                  <AlertDescription className="text-red-200">
                    <strong>Circuit Issues:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {result.warnings.map((warning, idx) => (
                        <li key={idx} className="text-sm">{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Warnings and Recommendations */}
      {(systemWarnings.length > 0 || systemRecommendations.length > 0) && (
        <div className="space-y-4">
          {systemWarnings.length > 0 && (
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              <AlertDescription className="text-amber-200">
                <strong>System Warnings:</strong>
                <ul className="list-disc list-inside mt-1">
                  {systemWarnings.map((warning, idx) => (
                    <li key={idx} className="text-sm">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {systemRecommendations.length > 0 && (
            <Alert className="bg-blue-500/10 border-blue-500/30">
              <Calculator className="h-4 w-4 text-blue-300" />
              <AlertDescription className="text-blue-200">
                <strong>System Recommendations:</strong>
                <ul className="list-disc list-inside mt-1">
                  {systemRecommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm">{rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiCircuitResults;


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calculator, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InstallPlanData } from "./types";
import { EnhancedCableSelectionEngine } from "./EnhancedCableSelectionEngine";

interface MultiCircuitResultsProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitResults: React.FC<MultiCircuitResultsProps> = ({ planData }) => {
  const circuits = planData.circuits?.filter(c => c.enabled) || [];
  
  if (circuits.length === 0) {
    return (
      <Alert className="bg-amber-500/10 border-amber-500/30">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          No active circuits configured. Please add circuits before proceeding with analysis.
        </AlertDescription>
      </Alert>
    );
  }

  const circuitAnalysis = EnhancedCableSelectionEngine.calculateMultiCircuitOptions(
    circuits, 
    planData.environmentalSettings
  );

  const totalSystemLoad = circuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
  const totalDesignCurrent = circuitAnalysis.reduce((sum, analysis) => sum + analysis.designCurrent, 0);

  // Calculate diversity factor based on installation type and mix of loads
  const diversityFactor = 0.8; // Simplified for this implementation
  const diversifiedLoad = totalSystemLoad * diversityFactor;

  const exportResults = () => {
    const exportData = {
      planData,
      circuitAnalysis,
      systemSummary: {
        totalCircuits: circuits.length,
        totalSystemLoad,
        totalDesignCurrent,
        diversityFactor,
        diversifiedLoad
      },
      timestamp: new Date().toISOString(),
      generatedBy: "Elec-Mate Multi-Circuit Planner v2.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elec-mate-multi-circuit-plan-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Multi-Circuit System Analysis</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of {circuits.length} circuits with BS 7671 compliance checking and system diversity calculations.
          </p>
        </div>
        <Button onClick={exportResults} variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Analysis
        </Button>
      </div>

      {/* System Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            System Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <p className="text-sm text-muted-foreground">Total Circuits</p>
              <p className="text-2xl font-bold text-elec-yellow">{circuits.length}</p>
            </div>
            <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <p className="text-sm text-muted-foreground">System Load</p>
              <p className="text-2xl font-bold text-blue-400">{(totalSystemLoad / 1000).toFixed(1)}kW</p>
            </div>
            <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <p className="text-sm text-muted-foreground">Design Current</p>
              <p className="text-2xl font-bold text-green-400">{totalDesignCurrent.toFixed(1)}A</p>
            </div>
            <div className="p-3 bg-elec-dark/50 rounded border border-elec-yellow/20">
              <p className="text-sm text-muted-foreground">After Diversity</p>
              <p className="text-2xl font-bold text-purple-400">{(diversifiedLoad / 1000).toFixed(1)}kW</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Circuit Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Individual Circuit Analysis</h3>
        {circuitAnalysis.map((analysis, index) => {
          const bestRecommendation = analysis.recommendations[0];
          const isCompliant = bestRecommendation?.suitability === "suitable";
          
          return (
            <Card key={analysis.circuit.id} className={`border-2 ${
              isCompliant ? 'border-green-500/30 bg-green-500/5' : 'border-amber-500/30 bg-amber-500/5'
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {analysis.circuit.loadType === "lighting" ? "💡" :
                       analysis.circuit.loadType === "power" ? "🔌" :
                       analysis.circuit.loadType === "cooker" ? "🍳" :
                       analysis.circuit.loadType === "heating" ? "🔥" : "⚡"}
                    </div>
                    <div>
                      <CardTitle className="text-base">{analysis.circuit.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {analysis.circuit.totalLoad}W • {analysis.circuit.voltage}V • {analysis.circuit.cableLength}m
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCompliant ? 
                      <CheckCircle className="h-5 w-5 text-green-400" /> : 
                      <XCircle className="h-5 w-5 text-amber-400" />
                    }
                    <Badge variant={isCompliant ? "default" : "destructive"}>
                      {isCompliant ? "Compliant" : "Needs Attention"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              {bestRecommendation && (
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Recommended Cable</p>
                      <p className="font-medium">{bestRecommendation.size} {bestRecommendation.type.toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Design Current</p>
                      <p className="font-medium">{analysis.designCurrent.toFixed(1)}A</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cable Capacity</p>
                      <p className="font-medium">{bestRecommendation.currentCarryingCapacity}A</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Voltage Drop</p>
                      <p className="font-medium">{bestRecommendation.voltageDropPercentage.toFixed(2)}%</p>
                    </div>
                  </div>
                  
                  {bestRecommendation.notes.length > 0 && (
                    <div className="mt-3 p-3 bg-elec-dark/50 rounded">
                      <p className="text-sm font-medium mb-1">Analysis Notes:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {bestRecommendation.notes.map((note, noteIndex) => (
                          <li key={noteIndex}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* System Recommendations */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            System Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-elec-dark/50 rounded">
              <p className="font-medium text-blue-300 mb-1">Supply Requirements</p>
              <p className="text-sm text-muted-foreground">
                Recommended main supply: {Math.ceil(totalDesignCurrent * diversityFactor)}A three-phase supply
              </p>
            </div>
            
            <div className="p-3 bg-elec-dark/50 rounded">
              <p className="font-medium text-blue-300 mb-1">Consumer Unit</p>
              <p className="text-sm text-muted-foreground">
                Minimum {circuits.length + 2} way consumer unit with {Math.ceil(totalDesignCurrent * diversityFactor)}A main switch
              </p>
            </div>
            
            <div className="p-3 bg-elec-dark/50 rounded">
              <p className="font-medium text-blue-300 mb-1">Earthing</p>
              <p className="text-sm text-muted-foreground">
                {planData.environmentalSettings?.earthingSystem || "TN-S"} earthing system with Ze ≤ {planData.environmentalSettings?.ze || 0.35}Ω
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Notice */}
      <Alert className="bg-amber-500/10 border-amber-500/30">
        <AlertTriangle className="h-4 w-4 text-amber-300" />
        <AlertDescription className="text-amber-200">
          <strong>Professional Verification Required:</strong> This multi-circuit analysis provides guidance based on BS 7671:2018+A2:2022. 
          All calculations assume standard conditions and simplified diversity factors. Professional design verification, 
          site-specific assessments, and comprehensive testing are required for all electrical installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MultiCircuitResults;

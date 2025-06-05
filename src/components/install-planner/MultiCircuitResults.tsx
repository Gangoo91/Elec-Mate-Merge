
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, CheckCircle, AlertTriangle, TrendingUp, Shield, 
  Thermometer, MapPin, Calculator, FileText, Download 
} from "lucide-react";
import { InstallPlanData, MultiCircuitResult, EnvironmentalAnalysis } from "./types";
import { Button } from "@/components/ui/button";

interface MultiCircuitResultsProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitResults: React.FC<MultiCircuitResultsProps> = ({ planData }) => {
  const circuits = planData.circuits?.filter(c => c.enabled) || [];
  const environmentalSettings = planData.environmentalSettings || {
    ambientTemperature: 30,
    environmentalConditions: "Indoor dry locations",
    earthingSystem: "TN-S",
    ze: 0.35,
    globalGroupingFactor: 1,
    specialRequirements: [],
    installationZones: []
  };

  // Calculate multi-circuit results with environmental analysis
  const calculateMultiCircuitResults = (): MultiCircuitResult => {
    const circuitResults = circuits.map(circuit => {
      // Get environmental factors for this circuit
      const circuitEnvironment = circuit.installationZone 
        ? environmentalSettings.installationZones?.find(z => z.id === circuit.installationZone)
        : null;

      const ambientTemp = circuitEnvironment?.ambientTemperature || environmentalSettings.ambientTemperature;
      const conditions = circuitEnvironment?.environmentalConditions || environmentalSettings.environmentalConditions;

      // Calculate derating factors
      const temperatureDerating = ambientTemp <= 30 ? 1.0 : 
                                 ambientTemp <= 40 ? 0.94 :
                                 ambientTemp <= 50 ? 0.87 : 0.79;

      const groupingFactor = environmentalSettings.globalGroupingFactor;
      const overallDerating = temperatureDerating * groupingFactor;

      // Calculate design current
      const designCurrent = circuit.phases === "three" 
        ? circuit.totalLoad / (Math.sqrt(3) * circuit.voltage * (circuit.powerFactor || 0.85))
        : circuit.totalLoad / circuit.voltage;

      const adjustedCurrent = designCurrent / overallDerating;

      // Simple cable sizing logic
      const getCableSize = (current: number) => {
        if (current <= 20) return "2.5mm²";
        if (current <= 32) return "4.0mm²";
        if (current <= 43) return "6.0mm²";
        if (current <= 57) return "10mm²";
        if (current <= 76) return "16mm²";
        if (current <= 101) return "25mm²";
        if (current <= 138) return "35mm²";
        return "50mm²";
      };

      const cableSize = getCableSize(adjustedCurrent);
      const protectiveDeviceRating = Math.ceil(adjustedCurrent / 5) * 5;

      // Voltage drop calculation (simplified)
      const voltageDropPercentage = (designCurrent * circuit.cableLength * 0.018) / circuit.voltage * 100;
      const voltageDropCompliance = voltageDropPercentage <= 5;

      // Zs calculation (simplified)
      const zsValue = environmentalSettings.ze + (circuit.cableLength * 0.01);
      const zsCompliance = zsValue <= 1.44; // Simplified BS 7671 requirement

      const warnings: string[] = [];
      if (!voltageDropCompliance) warnings.push("Voltage drop exceeds 5%");
      if (!zsCompliance) warnings.push("Zs value exceeds maximum permitted");
      if (ambientTemp > 40) warnings.push("High ambient temperature affects cable rating");

      return {
        circuit,
        recommendedCable: {
          size: cableSize,
          type: circuit.cableType,
          currentCarryingCapacity: adjustedCurrent,
          voltageDropPercentage,
          ratedCurrent: protectiveDeviceRating,
          suitability: warnings.length === 0 ? "suitable" : warnings.length === 1 ? "marginal" : "unsuitable",
          notes: warnings,
          temperatureDerating,
          groupingDerating: groupingFactor,
          environmentalSuitability: conditions
        },
        alternativeCables: [],
        designCurrent,
        protectiveDeviceRating,
        zsValue,
        zsCompliance,
        voltageDropCompliance,
        warnings,
        appliedEnvironmentalFactors: {
          ambientTemperature: ambientTemp,
          temperatureDerating,
          groupingFactor,
          overallDerating,
          environmentalConditions: conditions,
          specialRequirements: circuitEnvironment?.specialRequirements || environmentalSettings.specialRequirements,
          mitigationMeasures: []
        }
      };
    });

    const totalConnectedLoad = circuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
    const diversityFactor = totalConnectedLoad > 10000 ? 0.75 : totalConnectedLoad > 5000 ? 0.85 : 0.95;
    const diversifiedLoad = totalConnectedLoad * diversityFactor;

    // Environmental analysis
    const globalEnvironmentalAnalysis: EnvironmentalAnalysis = {
      temperatureDerating: environmentalSettings.ambientTemperature <= 30 ? 1.0 : 
                          environmentalSettings.ambientTemperature <= 40 ? 0.94 : 0.87,
      groupingFactor: environmentalSettings.globalGroupingFactor,
      overallDerating: 0.94 * environmentalSettings.globalGroupingFactor,
      environmentalWarnings: environmentalSettings.ambientTemperature > 40 ? ["High ambient temperature"] : [],
      recommendedMitigations: [],
      complianceNotes: []
    };

    const zoneAnalysis = (environmentalSettings.installationZones || []).map(zone => ({
      zone,
      circuitCount: zone.circuitIds.length,
      totalLoad: circuits.filter(c => zone.circuitIds.includes(c.id)).reduce((sum, c) => sum + c.totalLoad, 0),
      averageDerating: zone.ambientTemperature <= 30 ? 1.0 : 0.94,
      criticalFactors: zone.ambientTemperature > 40 ? ["High temperature"] : [],
      recommendations: zone.ambientTemperature > 40 ? ["Consider ventilation improvements"] : []
    }));

    return {
      circuits: circuitResults,
      totalSystemLoad: diversifiedLoad,
      mainSupplyRequirements: {
        totalDemand: diversifiedLoad,
        recommendedSupplyRating: Math.ceil(diversifiedLoad / 230) + 20,
        mainSwitchRating: Math.ceil(diversifiedLoad / 230 / 5) * 5,
        earthingRequirements: [`${environmentalSettings.earthingSystem} earthing system`, "Main earthing terminal required"]
      },
      diversityCalculations: {
        totalConnectedLoad,
        diversifiedLoad,
        diversityFactor
      },
      complianceChecks: [
        {
          regulation: "BS 7671",
          requirement: "Circuit protection",
          status: circuitResults.every(r => r.zsCompliance) ? "pass" : "fail",
          reference: "Chapter 43",
          details: "All circuits must have adequate fault protection"
        }
      ],
      warnings: circuitResults.flatMap(r => r.warnings),
      recommendations: [
        "Regular testing and inspection required",
        "Maintain circuit documentation",
        "Consider energy monitoring systems"
      ],
      environmentalAnalysis: {
        globalFactors: globalEnvironmentalAnalysis,
        circuitSpecificFactors: {},
        zoneAnalysis,
        systemWideRecommendations: [
          "Monitor ambient temperatures regularly",
          "Ensure adequate ventilation in high-load areas",
          "Consider environmental protection upgrades"
        ],
        environmentalCompliance: [
          {
            requirement: "Temperature management",
            standard: "BS 7671",
            status: environmentalSettings.ambientTemperature <= 40 ? "compliant" : "requires-attention",
            details: "Installation temperature within acceptable limits",
            affectedCircuits: circuits.map(c => c.id),
            recommendedActions: environmentalSettings.ambientTemperature > 40 ? ["Improve ventilation", "Consider cable derating"] : []
          }
        ]
      }
    };
  };

  const results = calculateMultiCircuitResults();
  const overallCompliance = results.circuits.every(r => r.zsCompliance && r.voltageDropCompliance);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Multi-Circuit Installation Analysis</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of your {circuits.length} circuit installation with environmental considerations.
          </p>
        </div>
        <Badge 
          variant="outline" 
          className={`${overallCompliance ? 'border-green-400/30 text-green-400' : 'border-amber-400/30 text-amber-400'}`}
        >
          {overallCompliance ? 'Compliant' : 'Requires Attention'}
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Total Load</p>
                <p className="text-lg font-bold">{Math.round(results.totalSystemLoad)}W</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Diversity Factor</p>
                <p className="text-lg font-bold">{(results.diversityCalculations.diversityFactor * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Ambient Temp</p>
                <p className="text-lg font-bold">{environmentalSettings.ambientTemperature}°C</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              <div>
                <p className="text-sm text-muted-foreground">Install Zones</p>
                <p className="text-lg font-bold">{environmentalSettings.installationZones?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="circuits" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-elec-dark border border-elec-yellow/20">
          <TabsTrigger value="circuits">Circuit Analysis</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="circuits" className="space-y-4">
          {results.circuits.map((circuitResult) => (
            <Card key={circuitResult.circuit.id} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{circuitResult.circuit.name}</CardTitle>
                  <Badge 
                    variant="outline"
                    className={`${
                      circuitResult.recommendedCable.suitability === 'suitable' ? 'border-green-400/30 text-green-400' :
                      circuitResult.recommendedCable.suitability === 'marginal' ? 'border-amber-400/30 text-amber-400' :
                      'border-red-400/30 text-red-400'
                    }`}
                  >
                    {circuitResult.recommendedCable.suitability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cable Size:</span>
                    <p className="font-medium">{circuitResult.recommendedCable.size}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Protection:</span>
                    <p className="font-medium">{circuitResult.protectiveDeviceRating}A</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Voltage Drop:</span>
                    <p className="font-medium">{circuitResult.recommendedCable.voltageDropPercentage.toFixed(2)}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Environment:</span>
                    <p className="font-medium">{circuitResult.appliedEnvironmentalFactors.ambientTemperature}°C</p>
                  </div>
                </div>

                {circuitResult.warnings.length > 0 && (
                  <div className="mt-3">
                    <Alert className="bg-amber-500/10 border-amber-500/30">
                      <AlertTriangle className="h-4 w-4 text-amber-300" />
                      <AlertDescription className="text-amber-200">
                        <ul className="list-disc list-inside">
                          {circuitResult.warnings.map((warning, index) => (
                            <li key={index}>{warning}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          {/* Global Environmental Factors */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-elec-yellow" />
                Global Environmental Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-muted-foreground">Temperature Derating:</span>
                  <p className="font-medium">{(results.environmentalAnalysis.globalFactors.temperatureDerating * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Grouping Factor:</span>
                  <p className="font-medium">{(results.environmentalAnalysis.globalFactors.groupingFactor * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Overall Derating:</span>
                  <p className="font-medium">{(results.environmentalAnalysis.globalFactors.overallDerating * 100).toFixed(0)}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Earthing System:</span>
                  <p className="font-medium">{environmentalSettings.earthingSystem}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Zone Analysis */}
          {results.environmentalAnalysis.zoneAnalysis.length > 0 && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-elec-yellow" />
                  Installation Zone Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.environmentalAnalysis.zoneAnalysis.map((zoneAnalysis) => (
                    <div key={zoneAnalysis.zone.id} className="border border-elec-yellow/20 rounded p-4">
                      <h4 className="font-medium mb-2">{zoneAnalysis.zone.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Circuits:</span>
                          <p className="font-medium">{zoneAnalysis.circuitCount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Load:</span>
                          <p className="font-medium">{zoneAnalysis.totalLoad}W</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temperature:</span>
                          <p className="font-medium">{zoneAnalysis.zone.ambientTemperature}°C</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Conditions:</span>
                          <p className="font-medium">{zoneAnalysis.zone.environmentalConditions}</p>
                        </div>
                      </div>
                      {zoneAnalysis.recommendations.length > 0 && (
                        <div className="mt-2">
                          <span className="text-muted-foreground text-sm">Recommendations:</span>
                          <ul className="text-sm list-disc list-inside mt-1">
                            {zoneAnalysis.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Compliance Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-elec-yellow/20 rounded">
                    <div>
                      <h4 className="font-medium">{check.requirement}</h4>
                      <p className="text-sm text-muted-foreground">{check.regulation} - {check.reference}</p>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`${
                        check.status === 'pass' ? 'border-green-400/30 text-green-400' :
                        check.status === 'warning' ? 'border-amber-400/30 text-amber-400' :
                        'border-red-400/30 text-red-400'
                      }`}
                    >
                      {check.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environmental Compliance */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Environmental Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.environmentalAnalysis.environmentalCompliance.map((check, index) => (
                  <div key={index} className="p-3 border border-elec-yellow/20 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{check.requirement}</h4>
                      <Badge 
                        variant="outline"
                        className={`${
                          check.status === 'compliant' ? 'border-green-400/30 text-green-400' :
                          check.status === 'requires-attention' ? 'border-amber-400/30 text-amber-400' :
                          'border-red-400/30 text-red-400'
                        }`}
                      >
                        {check.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{check.details}</p>
                    {check.recommendedActions.length > 0 && (
                      <div>
                        <span className="text-sm font-medium">Recommended Actions:</span>
                        <ul className="text-sm list-disc list-inside mt-1">
                          {check.recommendedActions.map((action, actionIndex) => (
                            <li key={actionIndex}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-elec-yellow" />
                Installation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">System Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Connected Load:</span>
                      <p className="font-medium">{results.diversityCalculations.totalConnectedLoad}W</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Diversified Load:</span>
                      <p className="font-medium">{Math.round(results.diversityCalculations.diversifiedLoad)}W</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Main Supply Rating:</span>
                      <p className="font-medium">{results.mainSupplyRequirements.recommendedSupplyRating}A</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Main Switch Rating:</span>
                      <p className="font-medium">{results.mainSupplyRequirements.mainSwitchRating}A</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">System Recommendations</h4>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {results.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Environmental Recommendations</h4>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {results.environmentalAnalysis.systemWideRecommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiCircuitResults;

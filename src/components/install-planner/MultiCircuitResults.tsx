
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  InstallPlanData, 
  MultiCircuitResult, 
  CircuitResult,
  CableRecommendation,
  AppliedEnvironmentalFactors 
} from "./types";
import { 
  Zap, 
  Cable, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Thermometer,
  Users,
  MapPin
} from "lucide-react";

interface MultiCircuitResultsProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitResults: React.FC<MultiCircuitResultsProps> = ({ planData }) => {
  // Mock calculation function - in real implementation this would use proper electrical calculations
  const calculateMultiCircuitResults = (): MultiCircuitResult => {
    const enabledCircuits = planData.circuits?.filter(c => c.enabled) || [];
    
    if (enabledCircuits.length === 0) {
      return {
        circuits: [],
        totalSystemLoad: 0,
        mainSupplyRequirements: {
          totalDemand: 0,
          recommendedSupplyRating: 100,
          mainSwitchRating: 100,
          earthingRequirements: []
        },
        diversityCalculations: {
          totalConnectedLoad: 0,
          diversifiedLoad: 0,
          diversityFactor: 1
        },
        complianceChecks: [],
        warnings: [],
        recommendations: [],
        environmentalAnalysis: {
          globalFactors: {
            temperatureDerating: planData.environmentalSettings?.globalGroupingFactor || 1,
            groupingFactor: planData.environmentalSettings?.globalGroupingFactor || 1,
            overallDerating: planData.environmentalSettings?.globalGroupingFactor || 1,
            environmentalWarnings: [],
            recommendedMitigations: [],
            complianceNotes: []
          },
          circuitSpecificFactors: {},
          zoneAnalysis: [],
          systemWideRecommendations: [],
          environmentalCompliance: []
        }
      };
    }

    const totalConnectedLoad = enabledCircuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
    const diversityFactor = totalConnectedLoad > 10000 ? 0.8 : 0.9;
    const diversifiedLoad = totalConnectedLoad * diversityFactor;

    const circuitResults: CircuitResult[] = enabledCircuits.map(circuit => {
      const designCurrent = circuit.totalLoad / circuit.voltage;
      const protectiveDeviceRating = Math.ceil(designCurrent / 5) * 5;
      
      // Get environmental factors for this circuit
      const environmentalSettings = planData.environmentalSettings!;
      const zone = environmentalSettings.installationZones?.find(z => z.id === circuit.installationZone);
      const ambientTemp = zone?.ambientTemperature || environmentalSettings.ambientTemperature;
      
      // Calculate derating factors
      const temperatureDerating = ambientTemp > 30 ? 0.87 : 1.0;
      const groupingFactor = environmentalSettings.globalGroupingFactor;
      const overallDerating = temperatureDerating * groupingFactor;

      const appliedEnvironmentalFactors: AppliedEnvironmentalFactors = {
        ambientTemperature: ambientTemp,
        temperatureDerating,
        groupingFactor,
        overallDerating,
        environmentalConditions: zone?.environmentalConditions || environmentalSettings.environmentalConditions,
        specialRequirements: zone?.specialRequirements || environmentalSettings.specialRequirements,
        mitigationMeasures: []
      };

      // Calculate cable size based on derating
      const deratedCurrent = designCurrent / overallDerating;
      const cableSize = deratedCurrent <= 16 ? "2.5mm²" : 
                      deratedCurrent <= 25 ? "4mm²" : 
                      deratedCurrent <= 32 ? "6mm²" : "10mm²";

      const recommendedCable: CableRecommendation = {
        size: cableSize,
        type: circuit.cableType,
        currentCarryingCapacity: Math.ceil(deratedCurrent * 1.2),
        voltageDropPercentage: (circuit.cableLength * deratedCurrent * 0.018) / circuit.voltage * 100,
        ratedCurrent: Math.ceil(deratedCurrent),
        suitability: deratedCurrent <= 32 ? "suitable" as const : "marginal" as const,
        notes: [`Designed for ${circuit.loadType}`, `Installation: ${circuit.installationMethod}`],
        temperatureDerating,
        groupingDerating: groupingFactor,
        environmentalSuitability: ambientTemp <= 40 ? "Good" : "Requires attention"
      };

      const zsValue = 0.8 + (circuit.cableLength * 0.02);
      const zsCompliance = zsValue <= 1.44;
      const voltageDropCompliance = recommendedCable.voltageDropPercentage <= 5;

      return {
        circuit,
        recommendedCable,
        alternativeCables: [],
        designCurrent,
        protectiveDeviceRating,
        zsValue,
        zsCompliance,
        voltageDropCompliance,
        warnings: zsCompliance ? [] : [`Zs value (${zsValue.toFixed(2)}Ω) exceeds maximum for ${protectiveDeviceRating}A protection`],
        appliedEnvironmentalFactors
      };
    });

    return {
      circuits: circuitResults,
      totalSystemLoad: diversifiedLoad,
      mainSupplyRequirements: {
        totalDemand: diversifiedLoad,
        recommendedSupplyRating: Math.ceil(diversifiedLoad / 230 / 0.8 / 10) * 10,
        mainSwitchRating: Math.ceil(diversifiedLoad / 230 / 0.8 / 10) * 10,
        earthingRequirements: [
          "Main earth terminal required",
          "Equipotential bonding to gas and water services",
          planData.environmentalSettings?.earthingSystem === "TT" ? "Earth electrode required" : ""
        ].filter(Boolean)
      },
      diversityCalculations: {
        totalConnectedLoad,
        diversifiedLoad,
        diversityFactor
      },
      complianceChecks: [
        {
          regulation: "BS 7671:2018",
          requirement: "Voltage drop limitation",
          status: circuitResults.every(c => c.voltageDropCompliance) ? "pass" : "warning",
          reference: "Section 525",
          details: "Maximum 5% voltage drop for lighting and power circuits"
        },
        {
          regulation: "BS 7671:2018", 
          requirement: "Earth fault loop impedance",
          status: circuitResults.every(c => c.zsCompliance) ? "pass" : "fail",
          reference: "Section 411",
          details: "Zs values must not exceed maximum values for protective devices"
        }
      ],
      warnings: circuitResults.flatMap(c => c.warnings),
      recommendations: [
        "Consider RCD protection for all circuits",
        "Label all circuits clearly at distribution board",
        "Provide circuit schedules and as-built drawings"
      ],
      environmentalAnalysis: {
        globalFactors: {
          temperatureDerating: planData.environmentalSettings?.ambientTemperature || 30 > 30 ? 0.87 : 1.0,
          groupingFactor: planData.environmentalSettings?.globalGroupingFactor || 1,
          overallDerating: (planData.environmentalSettings?.ambientTemperature || 30 > 30 ? 0.87 : 1.0) * (planData.environmentalSettings?.globalGroupingFactor || 1),
          environmentalWarnings: planData.environmentalSettings?.ambientTemperature || 30 > 40 ? ["High ambient temperature conditions"] : [],
          recommendedMitigations: [],
          complianceNotes: []
        },
        circuitSpecificFactors: {},
        zoneAnalysis: planData.environmentalSettings?.installationZones?.map(zone => ({
          zone,
          circuitCount: enabledCircuits.filter(c => c.installationZone === zone.id).length,
          totalLoad: enabledCircuits.filter(c => c.installationZone === zone.id).reduce((sum, c) => sum + c.totalLoad, 0),
          averageDerating: zone.ambientTemperature > 30 ? 0.87 : 1.0,
          criticalFactors: zone.ambientTemperature > 40 ? ["High temperature"] : [],
          recommendations: []
        })) || [],
        systemWideRecommendations: [
          "Implement comprehensive labelling system",
          "Consider future expansion requirements"
        ],
        environmentalCompliance: []
      }
    };
  };

  const results = calculateMultiCircuitResults();

  if (!planData.circuits || planData.circuits.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Circuits Defined</h3>
          <p className="text-muted-foreground">
            Please add circuits in the Circuit Design step to see multi-circuit analysis results.
          </p>
        </div>
      </div>
    );
  }

  const enabledCircuits = planData.circuits.filter(c => c.enabled);
  
  if (enabledCircuits.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Active Circuits</h3>
          <p className="text-muted-foreground">
            Please enable at least one circuit to see analysis results.
          </p>
        </div>
      </div>
    );
  }

  const hasWarnings = results.warnings.length > 0;
  const hasFailedCompliance = results.complianceChecks.some(check => check.status === "fail");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Multi-Circuit Installation Analysis</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of your {enabledCircuits.length} circuit installation with environmental considerations and BS 7671 compliance checking.
        </p>
      </div>

      {/* System Overview */}
      <Card className="border-elec-yellow/20 bg-elec-dark/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">
                {enabledCircuits.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Circuits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {(results.totalSystemLoad / 1000).toFixed(1)}kW
              </div>
              <div className="text-sm text-muted-foreground">Total Demand</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {results.mainSupplyRequirements.recommendedSupplyRating}A
              </div>
              <div className="text-sm text-muted-foreground">Supply Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {(results.diversityCalculations.diversityFactor * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Diversity Factor</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings and Compliance */}
      {(hasWarnings || hasFailedCompliance) && (
        <div className="space-y-3">
          {hasFailedCompliance && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-300" />
              <AlertDescription className="text-red-200">
                <strong>Compliance Issues Detected:</strong> Some circuits do not meet BS 7671 requirements. Review the circuit details below.
              </AlertDescription>
            </Alert>
          )}
          
          {hasWarnings && (
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <Info className="h-4 w-4 text-amber-300" />
              <AlertDescription className="text-amber-200">
                <strong>System Warnings:</strong> {results.warnings.join("; ")}
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Environmental Analysis Summary */}
      {planData.environmentalSettings && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-green-400" />
              Environmental Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Global Conditions</h4>
                <p className="text-sm text-muted-foreground">
                  {planData.environmentalSettings.ambientTemperature}°C ambient, {planData.environmentalSettings.earthingSystem} earthing
                </p>
                <div className="mt-1">
                  <span className="text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                    Derating: {(results.environmentalAnalysis.globalFactors.overallDerating * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Installation Zones</h4>
                <p className="text-sm text-muted-foreground">
                  {results.environmentalAnalysis.zoneAnalysis.length} zones defined
                </p>
                {results.environmentalAnalysis.zoneAnalysis.map(zone => (
                  <div key={zone.zone.id} className="mt-1">
                    <span className="text-xs bg-blue-400/20 text-blue-400 px-2 py-1 rounded">
                      {zone.zone.name}: {zone.circuitCount} circuits
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-medium mb-2">Special Requirements</h4>
                <div className="space-y-1">
                  {planData.environmentalSettings.specialRequirements.slice(0, 3).map(req => (
                    <div key={req} className="text-xs bg-purple-400/20 text-purple-400 px-2 py-1 rounded">
                      {req}
                    </div>
                  ))}
                  {planData.environmentalSettings.specialRequirements.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{planData.environmentalSettings.specialRequirements.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Circuit Results */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Cable className="h-5 w-5" />
          Individual Circuit Analysis
        </h3>
        
        {results.circuits.map((circuitResult, index) => (
          <Card key={circuitResult.circuit.id} className="border-elec-yellow/20 bg-elec-dark/50">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{circuitResult.circuit.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {circuitResult.circuit.loadType} • {circuitResult.circuit.totalLoad}W • {circuitResult.circuit.cableLength}m
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge 
                    variant="outline"
                    className={`${
                      circuitResult.recommendedCable.suitability === "suitable" ? "border-green-400/30 text-green-400" :
                      circuitResult.recommendedCable.suitability === "marginal" ? "border-amber-400/30 text-amber-400" :
                      "border-red-400/30 text-red-400"
                    }`}
                  >
                    {circuitResult.recommendedCable.suitability}
                  </Badge>
                  {circuitResult.zsCompliance && circuitResult.voltageDropCompliance ? (
                    <Badge variant="outline" className="border-green-400/30 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Compliant
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-400/30 text-red-400">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Issues
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cable Recommendation */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Cable className="h-4 w-4" />
                    Recommended Cable
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{circuitResult.recommendedCable.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{circuitResult.recommendedCable.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Capacity:</span>
                      <span className="font-medium">{circuitResult.recommendedCable.currentCarryingCapacity}A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Voltage Drop:</span>
                      <span className={`font-medium ${
                        circuitResult.recommendedCable.voltageDropPercentage <= 3 ? "text-green-400" :
                        circuitResult.recommendedCable.voltageDropPercentage <= 5 ? "text-amber-400" :
                        "text-red-400"
                      }`}>
                        {circuitResult.recommendedCable.voltageDropPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environmental Factors */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Environmental Factors
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ambient Temp:</span>
                      <span className="font-medium">{circuitResult.appliedEnvironmentalFactors.ambientTemperature}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature Derating:</span>
                      <span className="font-medium">{(circuitResult.appliedEnvironmentalFactors.temperatureDerating * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grouping Factor:</span>
                      <span className="font-medium">{(circuitResult.appliedEnvironmentalFactors.groupingFactor * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Overall Derating:</span>
                      <span className="font-medium">{(circuitResult.appliedEnvironmentalFactors.overallDerating * 100).toFixed(0)}%</span>
                    </div>
                    {circuitResult.circuit.installationZone && (
                      <div className="flex items-center gap-1 mt-2">
                        <MapPin className="h-3 w-3 text-blue-400" />
                        <span className="text-xs text-blue-400">
                          Zone: {planData.environmentalSettings?.installationZones?.find(z => z.id === circuitResult.circuit.installationZone)?.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Protection and Compliance */}
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Design Current:</span>
                  <p className="font-medium">{circuitResult.designCurrent.toFixed(1)}A</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Protection:</span>
                  <p className="font-medium">{circuitResult.protectiveDeviceRating}A MCB</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Zs Value:</span>
                  <p className={`font-medium ${circuitResult.zsCompliance ? "text-green-400" : "text-red-400"}`}>
                    {circuitResult.zsValue.toFixed(2)}Ω
                  </p>
                </div>
              </div>

              {/* Warnings for this circuit */}
              {circuitResult.warnings.length > 0 && (
                <Alert className="bg-amber-500/10 border-amber-500/30 mt-4">
                  <AlertTriangle className="h-4 w-4 text-amber-300" />
                  <AlertDescription className="text-amber-200">
                    {circuitResult.warnings.join("; ")}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              System Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiCircuitResults;

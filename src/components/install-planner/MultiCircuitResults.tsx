
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { InstallPlanData } from "./types";
import { SimplifiedCableSelectionEngine } from "./SimplifiedCableSelectionEngine";
import { CableSelectionEngine } from "./CableSelectionEngine";
import { SystemSummaryCard } from "./system-summary-card";
import { UnifiedResultsCard } from "./unified-results-card";
import { SupplyRequirementsCard } from "./supply-requirements-card";
import { ConsumerUnitGuidance } from "./consumer-unit-guidance";
import { ResultCard } from "@/components/ui/result-card";
import CableRecommendationsCard from "./CableRecommendationsCard";
import InstallationSuggestionsCard from "./InstallationSuggestionsCard";
import ComplianceChecksCard from "./ComplianceChecksCard";
import SimplifiedValidationCard from "./SimplifiedValidationCard";
import VisualCircuitDesigner from "./VisualCircuitDesigner";
import PostResultGuidance from "./PostResultGuidance";

interface MultiCircuitResultsProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const MultiCircuitResults: React.FC<MultiCircuitResultsProps> = ({ planData }) => {
  const circuits = planData.circuits?.filter(c => c.enabled) || [];
  
  if (circuits.length === 0) {
    return (
      <div className="space-y-4">
        <ResultCard
          isEmpty={true}
          emptyMessage="No active circuits configured. Please add circuits to proceed with analysis."
          icon={<AlertTriangle className="h-8 w-8" />}
        />
      </div>
    );
  }

  const circuitAnalysis = circuits.map(circuit => {
    const circuitPlanData = {
      installationType: "multi-circuit",
      loadType: circuit.loadType,
      totalLoad: circuit.totalLoad,
      voltage: circuit.voltage,
      phases: circuit.phases || "single",
      powerFactor: circuit.powerFactor || 0.95,
      cableType: circuit.cableType,
      cableLength: circuit.cableLength,
      installationMethod: circuit.installationMethod,
      protectiveDevice: circuit.protectiveDevice,
      deviceRating: 16, // Default fallback
      ambientTemp: 30, // Default fallback
      grouping: 1, // Default fallback
      environmentalSettings: planData.environmentalSettings
    };
    const recommendations = SimplifiedCableSelectionEngine.calculateCableOptions(circuitPlanData);
    const designCurrent = circuit.totalLoad / (circuit.voltage || 230) / (circuit.powerFactor || 0.95);
    return { circuit, recommendations, designCurrent };
  });

  const totalSystemLoad = circuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
  const totalDesignCurrent = circuitAnalysis.reduce((sum, analysis) => sum + analysis.designCurrent, 0);

  // IET On-Site Guide Table 1B/H2 diversity calculation
  const diversityCalculation = React.useMemo(() => {
    const { calculateSystemDiversity } = require('@/utils/diversityCalculator');
    
    const circuitsForDiversity = circuitAnalysis.map(analysis => ({
      id: analysis.circuit.id,
      name: analysis.circuit.name,
      loadType: analysis.circuit.loadType,
      totalLoad: analysis.circuit.totalLoad,
      designCurrent: analysis.designCurrent,
      voltage: analysis.circuit.voltage
    }));
    
    // Default to domestic premises type (can be enhanced later with premises type selector)
    const premisesType = 'domestic' as const;
    
    return calculateSystemDiversity(circuitsForDiversity, premisesType);
  }, [circuitAnalysis]);

  const diversityFactor = diversityCalculation.diversityFactor;
  const diversifiedCurrent = diversityCalculation.diversifiedCurrent;
  const diversifiedLoad = totalSystemLoad * diversityFactor;

  // Realistic UK main switch recommendations
  const getRecommendedMainSwitch = (current: number) => {
    if (current <= 63) return 63;
    if (current <= 80) return 80;
    if (current <= 100) return 100;
    return 125;
  };

  const recommendedMainSwitch = getRecommendedMainSwitch(diversifiedCurrent);

  return (
    <div className="space-y-6">
      <SystemSummaryCard
        circuits={circuits}
        totalSystemLoad={totalSystemLoad}
        totalDesignCurrent={totalDesignCurrent}
        diversityFactor={diversityFactor}
        diversifiedLoad={diversifiedLoad}
      />

      {/* Diversity Breakdown */}
      {diversityCalculation.breakdown.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Diversity Applied (IET On-Site Guide Table 1B/H2)
          </h3>
          <div className="space-y-4">
            {diversityCalculation.breakdown.map((group, index) => (
              <div key={index} className="border-l-2 border-elec-yellow pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-foreground capitalize">
                      {group.type.replace(/([A-Z])/g, ' $1').trim()} 
                      <span className="text-muted-foreground text-sm ml-2">
                        ({group.count} circuit{group.count > 1 ? 's' : ''})
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">{group.formula}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {group.totalCurrent.toFixed(2)}A → {group.diversifiedCurrent.toFixed(2)}A
                    </p>
                    <p className="text-xs text-elec-yellow">
                      {(group.diversityFactor * 100).toFixed(0)}% applied
                    </p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {group.details.map((detail, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {detail}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total System Diversity:</span>
                <div className="text-right">
                  <p className="font-bold text-elec-yellow">
                    {diversityCalculation.totalSystemCurrent.toFixed(2)}A → {diversityCalculation.diversifiedCurrent.toFixed(2)}A
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Overall factor: {(diversityCalculation.diversityFactor * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supply Requirements */}
      <SupplyRequirementsCard
        totalDesignCurrent={totalDesignCurrent}
        diversityFactor={diversityFactor}
        diversifiedLoad={diversifiedLoad}
        earthingSystem={planData.environmentalSettings?.earthingSystem}
        ze={planData.environmentalSettings?.ze}
      />

      {/* Consumer Unit Guidance */}
      <ConsumerUnitGuidance
        totalCircuits={circuits.length}
        recommendedMainSwitch={recommendedMainSwitch}
      />

      {/* Individual Circuit Analysis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Circuit Analysis</h3>
        <div className="space-y-4">
          {circuitAnalysis.map((analysis, index) => {
            // Calculate Zs for each circuit using same logic as single circuit
            const getR1R2 = (size: string, type: string) => {
              const twinEarthResistances: Record<string, number> = {
                "1.5": 24.2, "2.5": 14.8, "4.0": 9.22, "6.0": 6.16, 
                "10.0": 3.66, "16.0": 2.30, "25.0": 1.454, "35.0": 1.045, "50.0": 0.772
              };
              
              if (type.includes('twin') || type.includes('earth')) {
                return twinEarthResistances[size] || 10;
              }
              
              const singleCoreR1: Record<string, number> = {
                "1.5": 12.1, "2.5": 7.41, "4.0": 4.61, "6.0": 3.08,
                "10.0": 1.83, "16.0": 1.15, "25.0": 0.727, "35.0": 0.524, "50.0": 0.387
              };
              return (singleCoreR1[size] || 5) * 2;
            };

            const recommendedCable = analysis.recommendations.find(r => r.suitability === "suitable") || analysis.recommendations[0];
            const r1r2PerKm = recommendedCable ? getR1R2(recommendedCable.size, recommendedCable.type) : 10;
            const r1r2 = analysis.circuit.cableLength * r1r2PerKm / 1000;
            const zsValue = (planData.environmentalSettings?.ze || 0.35) + r1r2;
            
            // Calculate max Zs (simplified for Type B MCB)
            const maxZs = 1.44; // Conservative value for 230V Type B MCB

            // Generate detailed analysis for each circuit - matching single circuit
            const circuitPlanDataDetailed = {
              ...analysis.circuit,
              installationType: "multi-circuit",
              environmentalSettings: planData.environmentalSettings,
              ze: planData.environmentalSettings?.ze || 0.35,
              ambientTemperature: planData.environmentalSettings?.ambientTemperature || 30,
              groupingFactor: planData.environmentalSettings?.globalGroupingFactor || 1
            };
            
            const suggestions = CableSelectionEngine.generateSuggestions(circuitPlanDataDetailed, analysis.recommendations);
            const complianceChecks = recommendedCable ? 
              CableSelectionEngine.performComplianceChecks(circuitPlanDataDetailed, zsValue, recommendedCable) : [];

            return (
              <div key={analysis.circuit.id} className="space-y-4">
                {/* Circuit Header */}
                <div className="text-center md:text-left border-b border-elec-yellow/20 pb-2">
                  <h3 className="text-lg font-bold text-white">
                    Circuit {index + 1}: {analysis.circuit.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {analysis.circuit.loadType} • {analysis.circuit.totalLoad}W • {analysis.circuit.cableLength}m
                  </p>
                </div>

                {/* Visual Circuit Designer for each circuit */}
                <VisualCircuitDesigner 
                  planData={circuitPlanDataDetailed} 
                  recommendedCable={recommendedCable}
                />

                {/* Unified Results Card */}
                <UnifiedResultsCard
                  planData={circuitPlanDataDetailed}
                  recommendations={analysis.recommendations}
                  designCurrent={analysis.designCurrent}
                  zsValue={zsValue}
                  maxZs={maxZs}
                  circuitName={analysis.circuit.name}
                  circuitIndex={index}
                />

                {/* Detailed Analysis Cards - matching single circuit */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CableRecommendationsCard 
                    recommendations={analysis.recommendations}
                    showNonCompliant={true}
                  />
                  
                  <SimplifiedValidationCard planData={circuitPlanDataDetailed} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InstallationSuggestionsCard suggestions={suggestions} />
                  
                  <ComplianceChecksCard checks={complianceChecks} />
                </div>

                {/* Post Result Guidance for compliant circuits */}
                {recommendedCable && zsValue <= maxZs && (
                  <PostResultGuidance 
                    planData={circuitPlanDataDetailed}
                    recommendedCable={recommendedCable}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Notice - Mobile Optimised */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <AlertTriangle className="h-6 w-6 text-amber-300 flex-shrink-0 self-center sm:self-start sm:mt-0.5" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <p className="font-medium text-amber-200 text-lg sm:text-base">Professional Verification Required</p>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              This analysis provides guidance based on BS7671:2018+A3:2024. All calculations assume standard conditions. 
              Professional design verification, site-specific assessments, and comprehensive testing are required for all electrical installations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCircuitResults;

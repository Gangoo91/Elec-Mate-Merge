
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { InstallPlanData } from "./types";
import { EnhancedCableSelectionEngine } from "./EnhancedCableSelectionEngine";
import { SystemSummaryCard } from "./system-summary-card";
import { CircuitAnalysisCard } from "./circuit-analysis-card";
import { SupplyRequirementsCard } from "./supply-requirements-card";
import { ConsumerUnitGuidance } from "./consumer-unit-guidance";
import { ResultCard } from "@/components/ui/result-card";

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

  const circuitAnalysis = EnhancedCableSelectionEngine.calculateMultiCircuitOptions(
    circuits, 
    planData.environmentalSettings
  );

  const totalSystemLoad = circuits.reduce((sum, circuit) => sum + circuit.totalLoad, 0);
  const totalDesignCurrent = circuitAnalysis.reduce((sum, analysis) => sum + analysis.designCurrent, 0);

  // Enhanced diversity factor calculation based on load types and BS7671
  const calculateDiversityFactor = () => {
    const loadTypes = circuits.map(c => c.loadType);
    const hasHeating = loadTypes.some(type => type.includes('heating'));
    const hasLighting = loadTypes.some(type => type.includes('lighting'));
    const hasSocket = loadTypes.some(type => type.includes('socket'));
    
    if (hasHeating && hasLighting && hasSocket && circuits.length > 5) return 0.75;
    if ((hasHeating || hasSocket) && circuits.length > 3) return 0.8;
    return 0.85; // Conservative for smaller installations
  };

  const diversityFactor = calculateDiversityFactor();
  const diversifiedLoad = totalSystemLoad * diversityFactor;
  const diversifiedCurrent = totalDesignCurrent * diversityFactor;

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
        <h3 className="text-lg font-semibold">Circuit Analysis</h3>
        <div className="space-y-4">
          {circuitAnalysis.map((analysis, index) => (
            <CircuitAnalysisCard
              key={analysis.circuit.id}
              circuit={analysis.circuit}
              analysis={analysis}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Professional Notice - Mobile Optimised */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <AlertTriangle className="h-6 w-6 text-amber-300 flex-shrink-0 self-center sm:self-start sm:mt-0.5" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <p className="font-medium text-amber-200 text-lg sm:text-base">Professional Verification Required</p>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              This analysis provides guidance based on BS7671:2018+A2:2022. All calculations assume standard conditions. 
              Professional design verification, site-specific assessments, and comprehensive testing are required for all electrical installations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCircuitResults;

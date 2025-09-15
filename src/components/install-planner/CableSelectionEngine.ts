
// Simplified BS7671 compliant calculations - bulletproof approach
import { SimplifiedCableSelectionEngine } from "./SimplifiedCableSelectionEngine";
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    // Use the improved simplified engine with cross-type fallback and safety checks
    const options = SimplifiedCableSelectionEngine.calculateCableOptions(planData);
    
    // Log for debugging if needed
    if (options.length > 0) {
      const firstOption = options[0];
      console.log(`Cable calculation for ${planData.totalLoad}W load:`, {
        designCurrent: planData.phases === "single" 
          ? planData.totalLoad / planData.voltage
          : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.9)),
        cableType: planData.cableType,
        recommendedSize: firstOption.size,
        capacity: firstOption.currentCarryingCapacity,
        suitability: firstOption.suitability
      });
    }
    
    return options;
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    return SimplifiedCableSelectionEngine.generateRecommendations(cableOptions).map(rec => ({
      type: "cable-upgrade",
      title: "Cable Selection",
      description: rec,
      impact: "high",
      regulation: "BS 7671"
    }));
  }

  static performComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];
    
    // Basic compliance checks with confidence
    checks.push({
      regulation: "BS 7671",
      requirement: "Current Carrying Capacity",
      status: recommendedCable.suitability === "suitable" ? "pass" : "fail",
      reference: "Section 523",
      details: `Cable capacity: ${recommendedCable.currentCarryingCapacity}A`
    });
    
    checks.push({
      regulation: "BS 7671", 
      requirement: "Voltage Drop",
      status: recommendedCable.voltageDropPercentage <= 5 ? "pass" : "fail",
      reference: "Appendix 4",
      details: `Voltage drop: ${recommendedCable.voltageDropPercentage}%`
    });
    
    return checks;
  }
}

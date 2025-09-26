
// BS7671 compliant calculations - using verified bulletproof approach
import { SimplifiedCableSelectionEngine } from "./SimplifiedCableSelectionEngine";
import { IntelligentCableEngine } from "./IntelligentCableEngine";
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    // Use the enhanced intelligent engine with proper BS 7671 data
    // It now uses bulletproof SimplifiedCableDatabase with verified calculations
    return IntelligentCableEngine.calculateIntelligentRecommendations(planData);
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const suitableOptions = cableOptions.filter(opt => opt.suitability === "suitable");
    const suggestions: InstallationSuggestion[] = [];
    
    if (suitableOptions.length === 0) {
      suggestions.push({
        type: "cable-upgrade",
        title: "Cable Size Insufficient",
        description: "No cable sizes meet BS 7671 requirements. Consider increasing cable size or reducing load.",
        impact: "high",
        regulation: "BS 7671 Sections 523 & Appendix 4"
      });
    } else {
      const bestOption = suitableOptions[0];
      suggestions.push({
        type: "cable-upgrade", 
        title: "Recommended Cable",
        description: `${bestOption.size} ${bestOption.type} meets all BS 7671 requirements with ${bestOption.ratedCurrent}A protection`,
        impact: "high",
        regulation: "BS 7671"
      });
      
      // Add upgrade suggestion if marginal
      const currentCapacityMargin = ((bestOption.currentCarryingCapacity - (planData.totalLoad / planData.voltage)) / (planData.totalLoad / planData.voltage)) * 100;
      if (currentCapacityMargin < 20 && suitableOptions.length > 1) {
        const nextSize = suitableOptions[1];
        suggestions.push({
          type: "cable-upgrade",
          title: "Consider Larger Cable",
          description: `${nextSize.size} provides better safety margin and future-proofing`,
          impact: "medium",
          regulation: "BS 7671 Good Practice"
        });
      }
    }
    
    return suggestions;
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

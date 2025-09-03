
// Updated to use improved BS7671 compliant calculations
import { ImprovedCableSelectionEngine } from "./ImprovedCableSelectionEngine";
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    // Determine if this should be a ring circuit
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return ImprovedCableSelectionEngine.calculateCableOptions(planData, isRingCircuit);
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return ImprovedCableSelectionEngine.generateEnhancedSuggestions(planData, cableOptions, isRingCircuit);
  }

  static performComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation): ComplianceCheck[] {
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return ImprovedCableSelectionEngine.performEnhancedComplianceChecks(planData, zsValue, recommendedCable, isRingCircuit);
  }
}

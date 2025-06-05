
// Legacy wrapper for backward compatibility
import { EnhancedCableSelectionEngine } from "./EnhancedCableSelectionEngine";
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    // Determine if this should be a ring circuit
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return EnhancedCableSelectionEngine.calculateCableOptions(planData, isRingCircuit);
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return EnhancedCableSelectionEngine.generateEnhancedSuggestions(planData, cableOptions, isRingCircuit);
  }

  static performComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation): ComplianceCheck[] {
    const isRingCircuit = planData.loadType === "power" && 
                         planData.cableLength <= 106 && 
                         planData.totalLoad <= 7200;
    
    return EnhancedCableSelectionEngine.performEnhancedComplianceChecks(planData, zsValue, recommendedCable, isRingCircuit);
  }
}

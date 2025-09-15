
// Professional BS7671 compliant cable selection using comprehensive database
import { calculateSmartCableSelection } from "../../lib/calculators/engines/smartCableSelectionEngine";
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    // Calculate design current based on load and phases
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage
      : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.9));

    // Prepare smart selection inputs
    const smartInputs = {
      current: designCurrent,
      installationType: planData.installationType || 'C', // Default to clipped direct
      ambientTemp: planData.ambientTemp || 30,
      groupingCircuits: planData.groupingCircuits || 1,
      length: planData.cableRun || 50,
      preferredCableType: planData.cableType,
      applicationContext: this.determineApplicationContext(planData),
      directBurial: planData.installationType === 'D2',
      mechanicalProtection: this.determineMechanicalProtection(planData),
      firePerformance: this.determineFirePerformance(planData)
    };

    // Get smart cable selection results
    const smartResults = calculateSmartCableSelection(smartInputs);
    
    // Convert to legacy format for compatibility
    const options: CableRecommendation[] = [];
    
    // Add primary recommendation
    const primary = this.convertToLegacyFormat(smartResults.primaryRecommendation, planData);
    if (primary) options.push(primary);
    
    // Add alternatives
    smartResults.alternatives.forEach(alt => {
      const converted = this.convertToLegacyFormat(alt, planData);
      if (converted) options.push(converted);
    });

    // Log comprehensive debugging information
    console.log(`Professional cable calculation for ${planData.totalLoad}W load:`, {
      designCurrent: Math.round(designCurrent * 10) / 10,
      primaryRecommendation: {
        type: smartResults.primaryRecommendation.cableName,
        size: smartResults.primaryRecommendation.size,
        capacity: smartResults.primaryRecommendation.deratedCapacity,
        suitability: smartResults.primaryRecommendation.suitability,
        price: `£${smartResults.primaryRecommendation.pricing.bestPrice}/m`,
        supplier: smartResults.primaryRecommendation.pricing.bestSupplier
      },
      alternatives: smartResults.alternatives.length,
      warnings: smartResults.warnings
    });
    
    return options;
  }

  private static determineApplicationContext(planData: InstallPlanData): 'domestic' | 'commercial' | 'industrial' | 'fire-safety' {
    if (planData.totalLoad > 100000) return 'industrial'; // >100kW
    if (planData.totalLoad > 20000) return 'commercial';  // >20kW
    return 'domestic';
  }

  private static determineMechanicalProtection(planData: InstallPlanData): 'none' | 'light' | 'heavy' {
    const installType = planData.installationType;
    if (installType === 'D1' || installType === 'D2') return 'heavy';
    if (installType === 'E' || installType === 'F' || installType === 'G') return 'light';
    return 'none';
  }

  private static determineFirePerformance(planData: InstallPlanData): 'standard' | 'lsoh' | 'fire-resistant' {
    // Could be enhanced with specific building type detection
    return 'standard';
  }

  private static convertToLegacyFormat(
    smartRec: any, 
    planData: InstallPlanData
  ): CableRecommendation | null {
    if (!smartRec) return null;

    return {
      size: smartRec.size,
      cableType: smartRec.cableType,
      currentCarryingCapacity: smartRec.deratedCapacity,
      voltageDropPercentage: smartRec.voltage_drop,
      suitability: smartRec.suitability,
      reasoning: smartRec.reasoning,
      costPerMetre: smartRec.pricing.bestPrice,
      supplier: smartRec.pricing.bestSupplier,
      availability: smartRec.pricing.availability,
      leadTime: smartRec.pricing.leadTime,
      installationNotes: smartRec.installationNotes
    };
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const suggestions: InstallationSuggestion[] = [];
    
    if (cableOptions.length === 0) {
      suggestions.push({
        type: "cable-upgrade",
        title: "No Suitable Cable Found",
        description: "Unable to find suitable cable for this application. Please review load requirements.",
        impact: "high",
        regulation: "BS 7671"
      });
      return suggestions;
    }

    const primary = cableOptions[0];
    
    // Generate specific suggestions based on cable selection
    if (primary.suitability === 'marginal') {
      suggestions.push({
        type: "cable-upgrade",
        title: "Consider Larger Cable Size",
        description: `Current selection has minimal safety margin. Consider upgrading to next size for better performance.`,
        impact: "medium",
        regulation: "BS 7671"
      });
    }

    if (primary.voltageDropPercentage > 3) {
      suggestions.push({
        type: "cable-upgrade",
        title: "High Voltage Drop",
        description: `Voltage drop is ${primary.voltageDropPercentage}%. Consider larger cable or shorter run to improve efficiency.`,
        impact: "medium",
        regulation: "BS 7671 Appendix 4"
      });
    }

    if (primary.cableType === 'pvc-twin-earth' && primary.size > 6) {
      suggestions.push({
        type: "cable-upgrade",
        title: "Consider SWA Alternative",
        description: "Large T&E cables are difficult to install. SWA would provide easier installation and better performance.",
        impact: "high",
        regulation: "BS 7671"
      });
    }

    // Cost-effective alternatives
    if (cableOptions.length > 1) {
      const alternative = cableOptions[1];
      if (alternative.costPerMetre && primary.costPerMetre && alternative.costPerMetre < primary.costPerMetre) {
        const savings = ((primary.costPerMetre - alternative.costPerMetre) / primary.costPerMetre * 100).toFixed(0);
        suggestions.push({
          type: "cost-optimization",
          title: "Cost-Effective Alternative Available",
          description: `${alternative.cableType} could save ${savings}% on cable costs while meeting requirements.`,
          impact: "low",
          regulation: "BS 7671"
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

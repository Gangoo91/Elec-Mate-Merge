
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
      installationType: planData.installationType || planData.installationMethod || 'C', // Default to clipped direct
      ambientTemp: planData.ambientTemperature ?? planData.environmentalSettings?.ambientTemperature ?? 30,
      groupingCircuits: planData.groupingFactor ?? planData.environmentalSettings?.globalGroupingFactor ?? 1,
      length: planData.cableLength ?? 50,
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

    const sizeStr = typeof smartRec.size === 'number' ? `${smartRec.size}mm²` : String(smartRec.size);

    // Map numeric price to cost band
    const price = smartRec?.pricing?.bestPrice as number | undefined;
    const costBand: 'low' | 'medium' | 'high' | 'very-high' | undefined =
      typeof price === 'number'
        ? price <= 2
          ? 'low'
          : price <= 5
          ? 'medium'
          : price <= 10
          ? 'high'
          : 'very-high'
        : undefined;

    const availabilityRaw = (smartRec?.pricing?.availability || '').toString().toLowerCase();
    const availability: 'common' | 'limited' | 'special-order' | undefined = availabilityRaw.includes('special')
      ? 'special-order'
      : availabilityRaw.includes('limited')
      ? 'limited'
      : availabilityRaw
      ? 'common'
      : undefined;

    return {
      size: sizeStr,
      type: smartRec.cableName || smartRec.cableType,
      currentCarryingCapacity: smartRec.deratedCapacity,
      voltageDropPercentage: smartRec.voltage_drop,
      ratedCurrent: Math.round(smartRec.deratedCapacity),
      suitability: smartRec.suitability,
      notes: [smartRec.reasoning, ...(smartRec.installationNotes || [])],
      cost: costBand,
      availability
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

    const primarySize = parseFloat(String(primary.size).replace(/[^\d.]/g, '')) || 0;
    const isTwinEarth = (primary.type || '').toLowerCase().includes('twin') && (primary.type || '').toLowerCase().includes('earth');
    if (isTwinEarth && primarySize > 6) {
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
      const order: Record<string, number> = { low: 1, medium: 2, high: 3, 'very-high': 4 };
      const altCostRank = alternative.cost ? order[alternative.cost] : Infinity;
      const priCostRank = primary.cost ? order[primary.cost] : Infinity;

      if (altCostRank < priCostRank) {
        suggestions.push({
          type: "cost-optimization",
          title: "Lower-Cost Alternative Available",
          description: `${alternative.type} offers a lower cost band while meeting requirements.`,
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

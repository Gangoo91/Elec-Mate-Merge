
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

interface CableData {
  size: string;
  currentCapacity: number;
  voltageDropMvAmM: number;
  cost: "low" | "medium" | "high";
  availability: "common" | "limited" | "special-order";
  installationComplexity: "simple" | "moderate" | "complex";
}

const cableDatabase: Record<string, CableData[]> = {
  "Twin and Earth": [
    { size: "1.0mm²", currentCapacity: 16, voltageDropMvAmM: 44, cost: "low", availability: "common", installationComplexity: "simple" },
    { size: "1.5mm²", currentCapacity: 20, voltageDropMvAmM: 29, cost: "low", availability: "common", installationComplexity: "simple" },
    { size: "2.5mm²", currentCapacity: 27, voltageDropMvAmM: 18, cost: "low", availability: "common", installationComplexity: "simple" },
    { size: "4.0mm²", currentCapacity: 37, voltageDropMvAmM: 11, cost: "medium", availability: "common", installationComplexity: "simple" },
    { size: "6.0mm²", currentCapacity: 47, voltageDropMvAmM: 7.3, cost: "medium", availability: "common", installationComplexity: "moderate" },
    { size: "10.0mm²", currentCapacity: 64, voltageDropMvAmM: 4.4, cost: "high", availability: "common", installationComplexity: "moderate" },
    { size: "16.0mm²", currentCapacity: 85, voltageDropMvAmM: 2.8, cost: "high", availability: "limited", installationComplexity: "complex" },
  ],
  "SWA Cable": [
    { size: "1.5mm²", currentCapacity: 22, voltageDropMvAmM: 29, cost: "medium", availability: "common", installationComplexity: "moderate" },
    { size: "2.5mm²", currentCapacity: 30, voltageDropMvAmM: 18, cost: "medium", availability: "common", installationComplexity: "moderate" },
    { size: "4.0mm²", currentCapacity: 40, voltageDropMvAmM: 11, cost: "medium", availability: "common", installationComplexity: "moderate" },
    { size: "6.0mm²", currentCapacity: 51, voltageDropMvAmM: 7.3, cost: "high", availability: "common", installationComplexity: "moderate" },
    { size: "10.0mm²", currentCapacity: 69, voltageDropMvAmM: 4.4, cost: "high", availability: "common", installationComplexity: "complex" },
    { size: "16.0mm²", currentCapacity: 90, voltageDropMvAmM: 2.8, cost: "high", availability: "common", installationComplexity: "complex" },
    { size: "25.0mm²", currentCapacity: 119, voltageDropMvAmM: 1.8, cost: "high", availability: "limited", installationComplexity: "complex" },
  ],
  "XLPE/SWA": [
    { size: "4.0mm²", currentCapacity: 45, voltageDropMvAmM: 11, cost: "high", availability: "common", installationComplexity: "moderate" },
    { size: "6.0mm²", currentCapacity: 57, voltageDropMvAmM: 7.3, cost: "high", availability: "common", installationComplexity: "moderate" },
    { size: "10.0mm²", currentCapacity: 76, voltageDropMvAmM: 4.4, cost: "high", availability: "common", installationComplexity: "complex" },
    { size: "16.0mm²", currentCapacity: 98, voltageDropMvAmM: 2.8, cost: "high", availability: "common", installationComplexity: "complex" },
    { size: "25.0mm²", currentCapacity: 129, voltageDropMvAmM: 1.8, cost: "high", availability: "limited", installationComplexity: "complex" },
  ]
};

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage 
      : planData.totalLoad / (planData.voltage * Math.sqrt(3));

    const correctedCurrent = designCurrent / (planData.groupingFactor * planData.derating);
    const maxVoltageDropPercentage = planData.loadType === "lighting" ? 3 : 5;

    const availableCables = cableDatabase[planData.cableType] || cableDatabase["Twin and Earth"];
    
    return availableCables.map(cable => {
      const voltageDropMv = planData.cableLength * designCurrent * cable.voltageDropMvAmM;
      const voltageDropPercentage = (voltageDropMv / 1000 / planData.voltage) * 100;
      
      const currentAdequate = cable.currentCapacity * planData.groupingFactor * planData.derating >= correctedCurrent;
      const voltageDropAcceptable = voltageDropPercentage <= maxVoltageDropPercentage;
      const voltageDropMarginal = voltageDropPercentage <= maxVoltageDropPercentage + 1;

      let suitability: "suitable" | "marginal" | "unsuitable";
      if (currentAdequate && voltageDropAcceptable) {
        suitability = "suitable";
      } else if (currentAdequate && voltageDropMarginal) {
        suitability = "marginal";
      } else {
        suitability = "unsuitable";
      }

      const notes = [];
      if (!currentAdequate) {
        notes.push(`Current capacity insufficient (${cable.currentCapacity}A derated to ${(cable.currentCapacity * planData.groupingFactor * planData.derating).toFixed(1)}A, need ${correctedCurrent.toFixed(1)}A)`);
      }
      if (!voltageDropAcceptable) {
        notes.push(`Voltage drop ${voltageDropPercentage.toFixed(2)}% exceeds ${maxVoltageDropPercentage}% limit`);
      }
      if (suitability === "suitable") {
        notes.push(`Meets all BS 7671 requirements`);
      }
      if (suitability === "marginal") {
        notes.push(`Acceptable but close to limits - consider next size up`);
      }

      return {
        size: cable.size,
        type: planData.cableType,
        currentCarryingCapacity: cable.currentCapacity,
        voltageDropPercentage,
        ratedCurrent: Math.ceil(correctedCurrent * 1.45),
        suitability,
        notes,
        cost: cable.cost,
        availability: cable.availability,
        installationComplexity: cable.installationComplexity
      };
    }).sort((a, b) => {
      // Sort by suitability first, then by size
      const suitabilityOrder = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
      if (suitabilityOrder[a.suitability] !== suitabilityOrder[b.suitability]) {
        return suitabilityOrder[a.suitability] - suitabilityOrder[b.suitability];
      }
      return parseFloat(a.size) - parseFloat(b.size);
    });
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const suggestions: InstallationSuggestion[] = [];
    const recommendedCable = cableOptions[0];

    if (recommendedCable?.suitability === "unsuitable") {
      // Find the first suitable cable
      const suitableCable = cableOptions.find(c => c.suitability === "suitable");
      if (suitableCable) {
        suggestions.push({
          type: "cable-upgrade",
          title: `Upgrade to ${suitableCable.size} Cable`,
          description: `Current ${recommendedCable.size} cable is unsuitable. Upgrade to ${suitableCable.size} to meet BS 7671 requirements.`,
          impact: "high",
          cost: suitableCable.cost
        });
      }

      // Suggest installation method change if high voltage drop
      if (recommendedCable.voltageDropPercentage > 5) {
        suggestions.push({
          type: "installation-method",
          title: "Consider Alternative Installation Method",
          description: "High voltage drop detected. Consider using conduit/trunking for easier cable upgrade or SWA cable for better performance.",
          impact: "medium",
          cost: "medium"
        });
      }

      // Suggest circuit splitting for high loads
      const designCurrent = planData.phases === "single" 
        ? planData.totalLoad / planData.voltage 
        : planData.totalLoad / (planData.voltage * Math.sqrt(3));
      
      if (designCurrent > 32) {
        suggestions.push({
          type: "safety",
          title: "Consider Load Splitting",
          description: `High load current (${designCurrent.toFixed(1)}A). Consider splitting into multiple circuits for better safety and flexibility.`,
          impact: "high",
          cost: "medium"
        });
      }
    }

    // Cost optimization suggestions
    if (recommendedCable?.cost === "high" && cableOptions.some(c => c.suitability === "suitable" && c.cost === "medium")) {
      const mediumCostOption = cableOptions.find(c => c.suitability === "suitable" && c.cost === "medium");
      if (mediumCostOption) {
        suggestions.push({
          type: "cost-optimization",
          title: "Cost-Effective Alternative Available",
          description: `Consider ${mediumCostOption.size} cable for better cost-effectiveness while maintaining compliance.`,
          impact: "low",
          cost: "medium"
        });
      }
    }

    return suggestions;
  }

  static performComplianceChecks(planData: InstallPlanData, zsValue: number, cableRecommendation: CableRecommendation): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // Zs compliance check
    const maxZs = planData.protectiveDevice.includes("rcbo") || planData.protectiveDevice.includes("mcb") ? 
      (planData.voltage === 230 ? 1.44 : 0.83) : 1.15;
    
    checks.push({
      regulation: "BS 7671",
      requirement: "Earth Fault Loop Impedance (Zs)",
      status: zsValue <= maxZs ? "pass" : "fail",
      reference: "411.4.5",
      details: `Zs = ${zsValue.toFixed(3)}Ω (max ${maxZs}Ω)`
    });

    // Voltage drop compliance
    const maxVdrop = planData.loadType === "lighting" ? 3 : 5;
    checks.push({
      regulation: "BS 7671",
      requirement: "Voltage Drop",
      status: cableRecommendation.voltageDropPercentage <= maxVdrop ? "pass" : "fail",
      reference: "525",
      details: `${cableRecommendation.voltageDropPercentage.toFixed(2)}% (max ${maxVdrop}%)`
    });

    // Current carrying capacity
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage 
      : planData.totalLoad / (planData.voltage * Math.sqrt(3));
    
    const deratedCapacity = cableRecommendation.currentCarryingCapacity * planData.groupingFactor * planData.derating;
    
    checks.push({
      regulation: "BS 7671",
      requirement: "Current Carrying Capacity",
      status: deratedCapacity >= designCurrent ? "pass" : "fail",
      reference: "523",
      details: `${deratedCapacity.toFixed(1)}A capacity vs ${designCurrent.toFixed(1)}A load`
    });

    // Protective device coordination
    checks.push({
      regulation: "BS 7671",
      requirement: "Protective Device Coordination",
      status: cableRecommendation.ratedCurrent > designCurrent ? "pass" : "warning",
      reference: "433.1",
      details: `${cableRecommendation.ratedCurrent}A device vs ${designCurrent.toFixed(1)}A load`
    });

    return checks;
  }
}

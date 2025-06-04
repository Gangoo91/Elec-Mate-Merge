import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

interface CableData {
  size: string;
  currentCapacity: number;
  voltageDropMvAmM: number;
  cost: "low" | "medium" | "high";
  availability: "common" | "limited" | "special-order";
  installationComplexity: "simple" | "moderate" | "complex";
  maxOperatingTemp?: number;
  specialApplications?: string[];
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
    { size: "35.0mm²", currentCapacity: 148, voltageDropMvAmM: 1.3, cost: "high", availability: "limited", installationComplexity: "complex" },
    { size: "50.0mm²", currentCapacity: 180, voltageDropMvAmM: 0.93, cost: "high", availability: "special-order", installationComplexity: "complex" },
  ],
  "XLPE/SWA": [
    { size: "4.0mm²", currentCapacity: 45, voltageDropMvAmM: 11, cost: "high", availability: "common", installationComplexity: "moderate", maxOperatingTemp: 90 },
    { size: "6.0mm²", currentCapacity: 57, voltageDropMvAmM: 7.3, cost: "high", availability: "common", installationComplexity: "moderate", maxOperatingTemp: 90 },
    { size: "10.0mm²", currentCapacity: 76, voltageDropMvAmM: 4.4, cost: "high", availability: "common", installationComplexity: "complex", maxOperatingTemp: 90 },
    { size: "16.0mm²", currentCapacity: 98, voltageDropMvAmM: 2.8, cost: "high", availability: "common", installationComplexity: "complex", maxOperatingTemp: 90 },
    { size: "25.0mm²", currentCapacity: 129, voltageDropMvAmM: 1.8, cost: "high", availability: "limited", installationComplexity: "complex", maxOperatingTemp: 90 },
    { size: "35.0mm²", currentCapacity: 162, voltageDropMvAmM: 1.3, cost: "high", availability: "limited", installationComplexity: "complex", maxOperatingTemp: 90 },
    { size: "50.0mm²", currentCapacity: 196, voltageDropMvAmM: 0.93, cost: "high", availability: "special-order", installationComplexity: "complex", maxOperatingTemp: 90 },
  ],
  "Fire Rated Cable": [
    { size: "1.5mm²", currentCapacity: 18, voltageDropMvAmM: 32, cost: "high", availability: "limited", installationComplexity: "moderate", specialApplications: ["fire-systems", "emergency-lighting"] },
    { size: "2.5mm²", currentCapacity: 24, voltageDropMvAmM: 20, cost: "high", availability: "limited", installationComplexity: "moderate", specialApplications: ["fire-systems", "emergency-lighting"] },
    { size: "4.0mm²", currentCapacity: 32, voltageDropMvAmM: 12, cost: "high", availability: "limited", installationComplexity: "moderate", specialApplications: ["fire-systems", "emergency-lighting"] },
  ],
  "LSOH Cable": [
    { size: "1.5mm²", currentCapacity: 19, voltageDropMvAmM: 30, cost: "medium", availability: "common", installationComplexity: "simple", specialApplications: ["public-buildings", "transport"] },
    { size: "2.5mm²", currentCapacity: 26, voltageDropMvAmM: 19, cost: "medium", availability: "common", installationComplexity: "simple", specialApplications: ["public-buildings", "transport"] },
    { size: "4.0mm²", currentCapacity: 35, voltageDropMvAmM: 12, cost: "medium", availability: "common", installationComplexity: "simple", specialApplications: ["public-buildings", "transport"] },
    { size: "6.0mm²", currentCapacity: 45, voltageDropMvAmM: 7.5, cost: "high", availability: "common", installationComplexity: "moderate", specialApplications: ["public-buildings", "transport"] },
  ],
  "Mineral Insulated": [
    { size: "1.5mm²", currentCapacity: 23, voltageDropMvAmM: 28, cost: "high", availability: "special-order", installationComplexity: "complex", maxOperatingTemp: 250, specialApplications: ["high-temperature", "fire-resistant"] },
    { size: "2.5mm²", currentCapacity: 31, voltageDropMvAmM: 17, cost: "high", availability: "special-order", installationComplexity: "complex", maxOperatingTemp: 250, specialApplications: ["high-temperature", "fire-resistant"] },
    { size: "4.0mm²", currentCapacity: 42, voltageDropMvAmM: 10, cost: "high", availability: "special-order", installationComplexity: "complex", maxOperatingTemp: 250, specialApplications: ["high-temperature", "fire-resistant"] },
  ],
  "Data Cable": [
    { size: "1.5mm²", currentCapacity: 16, voltageDropMvAmM: 35, cost: "medium", availability: "common", installationComplexity: "simple", specialApplications: ["data-centers", "it-equipment"] },
    { size: "2.5mm²", currentCapacity: 23, voltageDropMvAmM: 22, cost: "medium", availability: "common", installationComplexity: "simple", specialApplications: ["data-centers", "it-equipment"] },
  ]
};

export class CableSelectionEngine {
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage 
      : planData.totalLoad / (planData.voltage * Math.sqrt(3));

    const correctedCurrent = designCurrent / (planData.groupingFactor * planData.derating);
    
    // Enhanced voltage drop limits based on load type
    const maxVoltageDropPercentage = this.getVoltageDropLimit(planData.loadType);
    
    // Select appropriate cable type based on installation and load type
    const cableType = this.selectCableType(planData);
    const availableCables = cableDatabase[cableType] || cableDatabase["Twin and Earth"];
    
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

      const notes = this.generateCableNotes(cable, planData, currentAdequate, voltageDropAcceptable, voltageDropPercentage, maxVoltageDropPercentage, correctedCurrent);
      const specialConsiderations = this.getSpecialConsiderations(cable, planData);

      return {
        size: cable.size,
        type: cableType,
        currentCarryingCapacity: cable.currentCapacity,
        voltageDropPercentage,
        ratedCurrent: Math.ceil(correctedCurrent * 1.45),
        suitability,
        notes,
        cost: cable.cost,
        availability: cable.availability,
        installationComplexity: cable.installationComplexity,
        specialConsiderations
      };
    }).sort((a, b) => {
      const suitabilityOrder = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
      if (suitabilityOrder[a.suitability] !== suitabilityOrder[b.suitability]) {
        return suitabilityOrder[a.suitability] - suitabilityOrder[b.suitability];
      }
      return parseFloat(a.size) - parseFloat(b.size);
    });
  }

  private static getVoltageDropLimit(loadType: string): number {
    const limits = {
      "lighting": 3,
      "emergency": 3,
      "medical": 3,
      "motor": 6.5,
      "hvac": 6.5,
      "welding": 6.5,
      "crane": 6.5,
      "ev-charging": 5,
      "solar-pv": 3,
      "it-equipment": 3,
      "default": 5
    };
    
    return limits[loadType as keyof typeof limits] || limits.default;
  }

  private static selectCableType(planData: InstallPlanData): string {
    // Enhanced cable type selection based on installation type and load
    if (planData.loadType === "emergency" || planData.loadType === "fire-systems") {
      return "Fire Rated Cable";
    }
    
    if (planData.installationType === "transport" || planData.installationType === "healthcare") {
      return "LSOH Cable";
    }
    
    if (planData.loadType === "it-equipment" && planData.installationType === "data-center") {
      return "Data Cable";
    }
    
    if (planData.ambientTemperature > 60 || planData.loadType === "furnace") {
      return "Mineral Insulated";
    }
    
    if (planData.installationType === "industrial" && (planData.loadType === "motor" || planData.loadType === "welding")) {
      return "XLPE/SWA";
    }
    
    if (planData.installationMethod === "direct-buried" || planData.installationMethod === "ducting") {
      return "SWA Cable";
    }
    
    return planData.cableType || "Twin and Earth";
  }

  private static generateCableNotes(cable: CableData, planData: InstallPlanData, currentAdequate: boolean, voltageDropAcceptable: boolean, voltageDropPercentage: number, maxVoltageDropPercentage: number, correctedCurrent: number): string[] {
    const notes = [];
    
    if (!currentAdequate) {
      notes.push(`Current capacity insufficient (${cable.currentCapacity}A derated to ${(cable.currentCapacity * planData.groupingFactor * planData.derating).toFixed(1)}A, need ${correctedCurrent.toFixed(1)}A)`);
    }
    
    if (!voltageDropAcceptable) {
      notes.push(`Voltage drop ${voltageDropPercentage.toFixed(2)}% exceeds ${maxVoltageDropPercentage}% limit for ${planData.loadType} loads`);
    }
    
    if (currentAdequate && voltageDropAcceptable) {
      notes.push(`Meets all BS 7671 requirements for ${planData.loadType} applications`);
    }
    
    if (cable.specialApplications?.includes(planData.loadType)) {
      notes.push(`Specifically designed for ${planData.loadType} applications`);
    }
    
    if (cable.maxOperatingTemp && planData.ambientTemperature > 40) {
      notes.push(`Suitable for high temperature environments (max ${cable.maxOperatingTemp}°C)`);
    }
    
    return notes;
  }

  private static getSpecialConsiderations(cable: CableData, planData: InstallPlanData): string[] {
    const considerations = [];
    
    if (planData.loadType === "motor" || planData.loadType === "hvac") {
      considerations.push("Consider starting current and DOL/Star-Delta protection");
    }
    
    if (planData.loadType === "ev-charging" && planData.totalLoad > 7000) {
      considerations.push("DNO notification required for installations >7kW");
    }
    
    if (planData.installationType === "healthcare" && planData.loadType === "medical") {
      considerations.push("IT earthing system may be required for life support equipment");
    }
    
    if (cable.specialApplications?.includes("fire-systems")) {
      considerations.push("Enhanced fire resistance - maintains circuit integrity");
    }
    
    return considerations;
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

    // Enhanced suggestions for specialized loads
    if (planData.loadType === "ev-charging" && planData.totalLoad > 7000) {
      suggestions.push({
        type: "regulatory",
        title: "DNO Application Required",
        description: "EV charging installations over 7kW require Distribution Network Operator notification under G100 regulations.",
        impact: "high",
        regulation: "G100"
      });
    }

    if (planData.loadType === "solar-pv") {
      suggestions.push({
        type: "regulatory",
        title: "G99 Application Required",
        description: "Solar PV installations require DNO approval under G99 regulations. Consider export limitation devices.",
        impact: "high",
        regulation: "G99"
      });
    }

    if (planData.installationType === "healthcare" && planData.loadType === "medical") {
      suggestions.push({
        type: "safety",
        title: "Medical Location Requirements",
        description: "Consider HTM 06-01 requirements for medical locations including isolated supplies and additional monitoring.",
        impact: "high",
        regulation: "HTM 06-01"
      });
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

    // Enhanced compliance checks for specialized installations
    if (planData.loadType === "emergency") {
      checks.push({
        regulation: "BS 5266",
        requirement: "Emergency Lighting Duration",
        status: "warning",
        reference: "BS 5266-1",
        details: "Ensure 3-hour duration for escape routes, 1-hour for open areas"
      });
    }

    if (planData.installationType === "healthcare") {
      checks.push({
        regulation: "HTM 06-01",
        requirement: "Medical Location Classification",
        status: "warning",
        reference: "HTM 06-01",
        details: "Verify location classification and appropriate protection measures"
      });
    }

    if (planData.loadType === "ev-charging") {
      checks.push({
        regulation: "IET Code of Practice",
        requirement: "EV Charging Installation",
        status: "warning",
        reference: "IET CoP",
        details: "Ensure compliance with IET Code of Practice for EV charging"
      });
    }

    return checks;
  }
}

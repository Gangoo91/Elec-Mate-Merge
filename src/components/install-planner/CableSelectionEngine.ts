
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck } from "./types";

export class CableSelectionEngine {
  
  // Cable database with comprehensive properties
  private static cableDatabase = {
    "1.5mm²": {
      currentCarryingCapacity: { clippedDirect: 20, conduit: 17, trunking: 18, ducting: 22, directBuried: 24 },
      voltageDropPerMetre: { copper: 29, aluminium: 47 },
      resistance: { r1: 12.1, r2: 12.1 },
      cost: "low",
      availability: "common",
      installationComplexity: "simple",
      maxLength: 50
    },
    "2.5mm²": {
      currentCarryingCapacity: { clippedDirect: 27, conduit: 23, trunking: 25, ducting: 30, directBuried: 33 },
      voltageDropPerMetre: { copper: 18, aluminium: 29 },
      resistance: { r1: 7.41, r2: 7.41 },
      cost: "low",
      availability: "common",
      installationComplexity: "simple",
      maxLength: 80
    },
    "4.0mm²": {
      currentCarryingCapacity: { clippedDirect: 37, conduit: 30, trunking: 33, ducting: 40, directBuried: 45 },
      voltageDropPerMetre: { copper: 11, aluminium: 18 },
      resistance: { r1: 4.61, r2: 4.61 },
      cost: "medium",
      availability: "common",
      installationComplexity: "simple",
      maxLength: 120
    },
    "6.0mm²": {
      currentCarryingCapacity: { clippedDirect: 47, conduit: 38, trunking: 41, ducting: 51, directBuried: 58 },
      voltageDropPerMetre: { copper: 7.3, aluminium: 12 },
      resistance: { r1: 3.08, r2: 3.08 },
      cost: "medium",
      availability: "common",
      installationComplexity: "moderate",
      maxLength: 180
    },
    "10.0mm²": {
      currentCarryingCapacity: { clippedDirect: 65, conduit: 52, trunking: 57, ducting: 70, directBuried: 80 },
      voltageDropPerMetre: { copper: 4.4, aluminium: 7.1 },
      resistance: { r1: 1.83, r2: 1.83 },
      cost: "medium",
      availability: "common",
      installationComplexity: "moderate",
      maxLength: 250
    },
    "16.0mm²": {
      currentCarryingCapacity: { clippedDirect: 85, conduit: 69, trunking: 76, ducting: 94, directBuried: 107 },
      voltageDropPerMetre: { copper: 2.8, aluminium: 4.5 },
      resistance: { r1: 1.15, r2: 1.15 },
      cost: "high",
      availability: "common",
      installationComplexity: "moderate",
      maxLength: 350
    },
    "25.0mm²": {
      currentCarryingCapacity: { clippedDirect: 112, conduit: 89, trunking: 96, ducting: 119, directBuried: 138 },
      voltageDropPerMetre: { copper: 1.8, aluminium: 2.9 },
      resistance: { r1: 0.727, r2: 0.727 },
      cost: "high",
      availability: "limited",
      installationComplexity: "complex",
      maxLength: 500
    },
    "35.0mm²": {
      currentCarryingCapacity: { clippedDirect: 138, conduit: 110, trunking: 119, ducting: 148, directBuried: 171 },
      voltageDropPerMetre: { copper: 1.3, aluminium: 2.1 },
      resistance: { r1: 0.524, r2: 0.524 },
      cost: "high",
      availability: "limited",
      installationComplexity: "complex",
      maxLength: 700
    }
  };

  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    const designCurrent = this.calculateDesignCurrent(planData);
    const options: CableRecommendation[] = [];

    // Apply derating factors
    const deratingFactor = this.calculateDeratingFactor(planData);
    
    for (const [size, cableData] of Object.entries(this.cableDatabase)) {
      const installMethod = this.mapInstallationMethod(planData.installationMethod);
      const baseCapacity = cableData.currentCarryingCapacity[installMethod] || cableData.currentCarryingCapacity.clippedDirect;
      const deratedCapacity = baseCapacity * deratingFactor;
      
      // Calculate voltage drop
      const voltageDropPerMetre = cableData.voltageDropPerMetre.copper;
      const totalVoltageDrop = (voltageDropPerMetre * planData.cableLength * designCurrent) / 1000;
      const voltageDropPercentage = (totalVoltageDrop / planData.voltage) * 100;
      
      // Determine suitability
      const currentOK = deratedCapacity >= designCurrent * 1.1; // 10% safety margin
      const voltageDropOK = voltageDropPercentage <= this.getMaxVoltageDropPercentage(planData.loadType);
      const lengthOK = planData.cableLength <= cableData.maxLength;
      
      let suitability: "suitable" | "marginal" | "unsuitable";
      if (currentOK && voltageDropOK && lengthOK) {
        suitability = "suitable";
      } else if ((currentOK && voltageDropOK) || (currentOK && lengthOK)) {
        suitability = "marginal";
      } else {
        suitability = "unsuitable";
      }

      // Generate notes
      const notes: string[] = [];
      if (!currentOK) notes.push(`Current capacity insufficient (${deratedCapacity.toFixed(1)}A vs ${(designCurrent * 1.1).toFixed(1)}A required)`);
      if (!voltageDropOK) notes.push(`Voltage drop exceeds limits (${voltageDropPercentage.toFixed(2)}% vs ${this.getMaxVoltageDropPercentage(planData.loadType)}% max)`);
      if (!lengthOK) notes.push(`Cable length exceeds recommendations (${planData.cableLength}m vs ${cableData.maxLength}m max)`);
      if (suitability === "suitable") notes.push("Meets all requirements with adequate safety margins");

      // Calculate protective device rating
      const ratedCurrent = this.calculateProtectiveDeviceRating(designCurrent, deratedCapacity);

      options.push({
        size,
        type: planData.cableType,
        currentCarryingCapacity: Math.round(deratedCapacity),
        voltageDropPercentage,
        ratedCurrent,
        suitability,
        notes,
        cost: cableData.cost as "low" | "medium" | "high",
        availability: cableData.availability as "common" | "limited" | "special-order",
        installationComplexity: cableData.installationComplexity as "simple" | "moderate" | "complex",
        specialConsiderations: this.getSpecialConsiderations(planData, size)
      });
    }

    // Sort by suitability and then by cost-effectiveness
    return options.sort((a, b) => {
      const suitabilityOrder = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
      const costOrder = { "low": 0, "medium": 1, "high": 2 };
      
      if (suitabilityOrder[a.suitability] !== suitabilityOrder[b.suitability]) {
        return suitabilityOrder[a.suitability] - suitabilityOrder[b.suitability];
      }
      
      return costOrder[a.cost || "medium"] - costOrder[b.cost || "medium"];
    });
  }

  static generateSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[]): InstallationSuggestion[] {
    const suggestions: InstallationSuggestion[] = [];
    const bestOption = cableOptions[0];

    // Cable upgrade suggestions
    if (bestOption && bestOption.suitability !== "suitable") {
      const suitableOptions = cableOptions.filter(opt => opt.suitability === "suitable");
      if (suitableOptions.length > 0) {
        suggestions.push({
          type: "cable-upgrade",
          title: "Consider Cable Upgrade",
          description: `Upgrade to ${suitableOptions[0].size} cable for better performance and compliance.`,
          impact: "high",
          cost: suitableOptions[0].cost,
          regulation: "BS 7671"
        });
      }
    }

    // Installation method optimization
    if (planData.installationMethod === "clipped-direct" && planData.cableLength > 50) {
      suggestions.push({
        type: "installation-method",
        title: "Consider Protective Installation Method",
        description: "For longer cable runs, consider conduit or trunking for better protection and heat dissipation.",
        impact: "medium",
        cost: "medium"
      });
    }

    // Cost optimization
    const currentCostLevel = bestOption?.cost;
    if (currentCostLevel === "high") {
      const lowerCostOptions = cableOptions.filter(opt => 
        opt.suitability === "suitable" && (opt.cost === "low" || opt.cost === "medium")
      );
      if (lowerCostOptions.length > 0) {
        suggestions.push({
          type: "cost-optimization",
          title: "Cost Optimization Available",
          description: `Consider ${lowerCostOptions[0].size} cable for similar performance at lower cost.`,
          impact: "low",
          cost: "low"
        });
      }
    }

    // Safety suggestions based on load type
    if (planData.loadType === "motor" || planData.loadType === "hvac") {
      suggestions.push({
        type: "safety",
        title: "Motor Circuit Protection",
        description: "Consider motor protection relay and appropriate starting method for motor loads.",
        impact: "high",
        regulation: "BS 7671 Section 552"
      });
    }

    // Environmental considerations
    if (planData.installationMethod === "direct-buried") {
      suggestions.push({
        type: "environmental",
        title: "Underground Installation Requirements",
        description: "Ensure adequate burial depth (450mm minimum) and warning tape installation.",
        impact: "high",
        regulation: "BS 7671 Section 522"
      });
    }

    return suggestions;
  }

  static performComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // Zs compliance check
    const maxZs = this.getMaxZs(planData.protectiveDevice, planData.voltage);
    checks.push({
      regulation: "BS 7671",
      requirement: "Earth Fault Loop Impedance (Zs)",
      status: zsValue <= maxZs ? "pass" : "fail",
      reference: "Regulation 411.4.5",
      details: `Measured Zs: ${zsValue.toFixed(3)}Ω, Maximum allowed: ${maxZs.toFixed(3)}Ω`
    });

    // Voltage drop compliance
    const maxVoltageDropPercentage = this.getMaxVoltageDropPercentage(planData.loadType);
    checks.push({
      regulation: "BS 7671",
      requirement: "Voltage Drop Limits",
      status: recommendedCable.voltageDropPercentage <= maxVoltageDropPercentage ? "pass" : "fail",
      reference: "Appendix 4",
      details: `Calculated voltage drop: ${recommendedCable.voltageDropPercentage.toFixed(2)}%, Maximum allowed: ${maxVoltageDropPercentage}%`
    });

    // Current carrying capacity
    const designCurrent = this.calculateDesignCurrent(planData);
    const adequateCapacity = recommendedCable.currentCarryingCapacity >= designCurrent * 1.45; // Including safety factor
    checks.push({
      regulation: "BS 7671",
      requirement: "Current Carrying Capacity",
      status: adequateCapacity ? "pass" : "warning",
      reference: "Regulation 523.1",
      details: `Cable capacity: ${recommendedCable.currentCarryingCapacity}A, Design current: ${designCurrent.toFixed(1)}A`
    });

    // Protection coordination
    const protectionAdequate = recommendedCable.ratedCurrent >= designCurrent && 
                              recommendedCable.ratedCurrent <= recommendedCable.currentCarryingCapacity;
    checks.push({
      regulation: "BS 7671",
      requirement: "Protection Coordination",
      status: protectionAdequate ? "pass" : "warning",
      reference: "Regulation 433.1",
      details: `Protective device: ${recommendedCable.ratedCurrent}A, Cable capacity: ${recommendedCable.currentCarryingCapacity}A`
    });

    return checks;
  }

  private static calculateDesignCurrent(planData: InstallPlanData): number {
    if (planData.phases === "single") {
      return planData.totalLoad / planData.voltage;
    } else {
      return planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.85));
    }
  }

  private static calculateDeratingFactor(planData: InstallPlanData): number {
    let factor = 1.0;
    
    // Temperature derating
    if (planData.ambientTemperature > 30) {
      factor *= 0.94; // Simplified derating for high temperature
    }
    
    // Grouping factor
    factor *= planData.groupingFactor;
    
    // Installation method factor
    if (planData.installationMethod === "conduit-embedded") {
      factor *= 0.9;
    }
    
    return factor;
  }

  private static mapInstallationMethod(method: string): keyof typeof this.cableDatabase["1.5mm²"]["currentCarryingCapacity"] {
    const mapping: Record<string, keyof typeof this.cableDatabase["1.5mm²"]["currentCarryingCapacity"]> = {
      "clipped-direct": "clippedDirect",
      "conduit-surface": "conduit",
      "conduit-embedded": "conduit",
      "trunking": "trunking",
      "ducting": "ducting",
      "direct-buried": "directBuried",
      "overhead": "clippedDirect"
    };
    return mapping[method] || "clippedDirect";
  }

  private static getMaxVoltageDropPercentage(loadType: string): number {
    const lightingLoads = ["lighting", "emergency"];
    return lightingLoads.includes(loadType) ? 3 : 5;
  }

  private static calculateProtectiveDeviceRating(designCurrent: number, cableCapacity: number): number {
    const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    const minRating = Math.ceil(designCurrent * 1.1);
    const maxRating = Math.floor(cableCapacity);
    
    return standardRatings.find(rating => rating >= minRating && rating <= maxRating) || minRating;
  }

  private static getMaxZs(protectiveDevice: string, voltage: number): number {
    // Simplified Zs values - in practice these would be more comprehensive
    const zsTable: Record<string, Record<number, number>> = {
      "mcb": { 230: 1.44, 400: 0.83 },
      "rcbo": { 230: 1.44, 400: 0.83 },
      "fuse": { 230: 1.15, 400: 0.66 }
    };
    
    const deviceType = protectiveDevice.includes("mcb") || protectiveDevice.includes("rcbo") ? "mcb" : "fuse";
    return zsTable[deviceType]?.[voltage] || 1.15;
  }

  private static getSpecialConsiderations(planData: InstallPlanData, cableSize: string): string[] {
    const considerations: string[] = [];
    
    if (planData.loadType === "motor") {
      considerations.push("Motor starting current considerations apply");
    }
    
    if (planData.installationMethod === "direct-buried") {
      considerations.push("Mechanical protection may be required");
    }
    
    if (parseFloat(cableSize) >= 25) {
      considerations.push("Heavy cable - additional support required");
    }
    
    return considerations;
  }
}

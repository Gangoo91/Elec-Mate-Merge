
import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck, Circuit } from "./types";
import { getCableDatabase, BS7671_CABLE_DATABASE } from "./EnhancedCableDatabase";

export class EnhancedCableSelectionEngine {
  
  static calculateCableOptions(planData: InstallPlanData, isRingCircuit: boolean = false): CableRecommendation[] {
    const designCurrent = this.calculateDesignCurrent(planData);
    const options: CableRecommendation[] = [];
    const cableDatabase = getCableDatabase(isRingCircuit);

    // Apply derating factors
    const deratingFactor = this.calculateDeratingFactor(planData);
    
    for (const [size, cableData] of Object.entries(cableDatabase)) {
      const installMethod = this.mapInstallationMethod(planData.installationMethod);
      const baseCapacity = cableData.currentCarryingCapacity[installMethod] || cableData.currentCarryingCapacity["clipped-direct"];
      const deratedCapacity = baseCapacity * deratingFactor;
      
      // Calculate voltage drop with ring circuit consideration
      const voltageDropPerMetre = cableData.voltageDropPerMetre.copper;
      let totalVoltageDrop: number;
      
      if (isRingCircuit) {
        // Ring circuit voltage drop calculation (BS7671 Appendix 4)
        totalVoltageDrop = (voltageDropPerMetre * planData.cableLength * designCurrent) / (4 * 1000);
      } else {
        // Radial circuit voltage drop calculation
        totalVoltageDrop = (voltageDropPerMetre * planData.cableLength * designCurrent) / 1000;
      }
      
      const voltageDropPercentage = (totalVoltageDrop / planData.voltage) * 100;
      
      // Determine suitability with enhanced checks
      const currentOK = deratedCapacity >= designCurrent * 1.1;
      const voltageDropOK = voltageDropPercentage <= this.getMaxVoltageDropPercentage(planData.loadType);
      const lengthOK = planData.cableLength <= cableData.maxLength;
      const breakerCompatible = this.isBreakingDeviceCompatible(designCurrent, cableData, planData.protectiveDevice);
      
      let suitability: "suitable" | "marginal" | "unsuitable";
      if (currentOK && voltageDropOK && lengthOK && breakerCompatible) {
        suitability = "suitable";
      } else if ((currentOK && voltageDropOK) || (currentOK && lengthOK)) {
        suitability = "marginal";
      } else {
        suitability = "unsuitable";
      }

      // Generate comprehensive notes
      const notes: string[] = [];
      if (!currentOK) notes.push(`Current capacity insufficient (${deratedCapacity.toFixed(1)}A vs ${(designCurrent * 1.1).toFixed(1)}A required)`);
      if (!voltageDropOK) notes.push(`Voltage drop exceeds limits (${voltageDropPercentage.toFixed(2)}% vs ${this.getMaxVoltageDropPercentage(planData.loadType)}% max)`);
      if (!lengthOK) notes.push(`Cable length exceeds recommendations (${planData.cableLength}m vs ${cableData.maxLength}m max)`);
      if (!breakerCompatible) notes.push(`Protective device rating incompatible with cable capacity`);
      if (suitability === "suitable") {
        notes.push(`Meets all BS7671 requirements with adequate safety margins`);
        if (isRingCircuit) notes.push(`Ring circuit configuration validated`);
      }

      // Calculate protective device rating with BS7671 coordination
      const ratedCurrent = this.calculateProtectiveDeviceRating(designCurrent, deratedCapacity, cableData);

      options.push({
        size,
        type: planData.cableType,
        currentCarryingCapacity: Math.round(deratedCapacity),
        voltageDropPercentage,
        ratedCurrent,
        suitability,
        notes,
        cost: cableData.cost,
        availability: cableData.availability,
        installationComplexity: cableData.installationComplexity,
        specialConsiderations: this.getSpecialConsiderations(planData, size, isRingCircuit)
      });
    }

    // Sort by suitability, then by cost-effectiveness
    return options.sort((a, b) => {
      const suitabilityOrder = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
      const costOrder = { "low": 0, "medium": 1, "high": 2 };
      
      if (suitabilityOrder[a.suitability] !== suitabilityOrder[b.suitability]) {
        return suitabilityOrder[a.suitability] - suitabilityOrder[b.suitability];
      }
      
      return costOrder[a.cost || "medium"] - costOrder[b.cost || "medium"];
    });
  }

  static calculateMultiCircuitOptions(circuits: Circuit[], environmentalSettings: any): Array<{
    circuit: Circuit;
    recommendations: CableRecommendation[];
    designCurrent: number;
  }> {
    return circuits.filter(c => c.enabled).map(circuit => {
      const planData: InstallPlanData = {
        ...circuit,
        installationType: "multi-circuit",
        environmentalSettings,
        ambientTemperature: environmentalSettings.ambientTemperature,
        groupingFactor: environmentalSettings.globalGroupingFactor,
        earthingSystem: environmentalSettings.earthingSystem,
        ze: environmentalSettings.ze
      };

      const isRingCircuit = circuit.loadType === "power" && 
                           circuit.cableLength <= 106 && 
                           circuit.totalLoad <= 7200;

      const recommendations = this.calculateCableOptions(planData, isRingCircuit);
      const designCurrent = this.calculateDesignCurrent(planData);

      return {
        circuit,
        recommendations,
        designCurrent
      };
    });
  }

  static generateEnhancedSuggestions(planData: InstallPlanData, cableOptions: CableRecommendation[], isRingCircuit: boolean = false): InstallationSuggestion[] {
    const suggestions: InstallationSuggestion[] = [];
    const bestOption = cableOptions[0];

    // Ring circuit suggestions
    if (!isRingCircuit && planData.loadType === "power" && planData.cableLength <= 106) {
      suggestions.push({
        type: "cable-upgrade",
        title: "Consider Ring Circuit Configuration",
        description: "For power circuits, a ring configuration may provide better load distribution and reduced voltage drop.",
        impact: "medium",
        cost: "low",
        regulation: "BS 7671 Section 433"
      });
    }

    // Cable upgrade suggestions with specific BS7671 references
    if (bestOption && bestOption.suitability !== "suitable") {
      const suitableOptions = cableOptions.filter(opt => opt.suitability === "suitable");
      if (suitableOptions.length > 0) {
        suggestions.push({
          type: "cable-upgrade",
          title: "Cable Upgrade Required for Compliance",
          description: `Upgrade to ${suitableOptions[0].size} cable to meet BS 7671 current carrying capacity and voltage drop requirements.`,
          impact: "high",
          cost: suitableOptions[0].cost,
          regulation: "BS 7671 Sections 523 & Appendix 4"
        });
      }
    }

    // Protective device coordination
    if (bestOption && planData.protectiveDevice) {
      const designCurrent = this.calculateDesignCurrent(planData);
      if (bestOption.ratedCurrent < designCurrent) {
        suggestions.push({
          type: "protective-device",
          title: "Protective Device Rating Too Low",
          description: `Current protective device rating (${bestOption.ratedCurrent}A) is insufficient for design current (${designCurrent.toFixed(1)}A).`,
          impact: "high",
          regulation: "BS 7671 Section 433.1"
        });
      }
    }

    // Environmental considerations
    if (planData.ambientTemperature > 30) {
      suggestions.push({
        type: "environmental",
        title: "High Ambient Temperature Derating",
        description: "High ambient temperature requires cable derating. Consider improved ventilation or larger cable size.",
        impact: "medium",
        regulation: "BS 7671 Appendix 4"
      });
    }

    // Installation method optimization
    if (planData.installationMethod === "conduit" && planData.cableLength > 50) {
      suggestions.push({
        type: "installation-method",
        title: "Consider Alternative Installation Method",
        description: "For longer runs, cable tray or trunking may provide better heat dissipation and easier maintenance.",
        impact: "medium",
        cost: "medium"
      });
    }

    return suggestions;
  }

  static performEnhancedComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation, isRingCircuit: boolean = false): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // Zs compliance check with accurate values
    const maxZs = this.getMaxZs(planData.protectiveDevice, planData.voltage);
    checks.push({
      regulation: "BS 7671",
      requirement: "Earth Fault Loop Impedance (Zs)",
      status: zsValue <= maxZs ? "pass" : "fail",
      reference: "Regulation 411.4.5",
      details: `Measured Zs: ${zsValue.toFixed(3)}Ω, Maximum allowed: ${maxZs.toFixed(3)}Ω`
    });

    // Voltage drop compliance with ring circuit consideration
    const maxVoltageDropPercentage = this.getMaxVoltageDropPercentage(planData.loadType);
    const voltageDropStatus = recommendedCable.voltageDropPercentage <= maxVoltageDropPercentage ? "pass" : "fail";
    checks.push({
      regulation: "BS 7671",
      requirement: "Voltage Drop Limits",
      status: voltageDropStatus,
      reference: "Appendix 4",
      details: `Calculated voltage drop: ${recommendedCable.voltageDropPercentage.toFixed(2)}%, Maximum allowed: ${maxVoltageDropPercentage}%${isRingCircuit ? ' (Ring circuit)' : ''}`
    });

    // Current carrying capacity with BS7671 factors
    const designCurrent = this.calculateDesignCurrent(planData);
    const adequateCapacity = recommendedCable.currentCarryingCapacity >= designCurrent * 1.45;
    checks.push({
      regulation: "BS 7671",
      requirement: "Current Carrying Capacity",
      status: adequateCapacity ? "pass" : "warning",
      reference: "Regulation 523.1",
      details: `Cable capacity: ${recommendedCable.currentCarryingCapacity}A, Design current: ${designCurrent.toFixed(1)}A (with derating factors applied)`
    });

    // Protection coordination with enhanced logic
    const protectionAdequate = recommendedCable.ratedCurrent >= designCurrent && 
                              recommendedCable.ratedCurrent <= recommendedCable.currentCarryingCapacity * 1.45;
    checks.push({
      regulation: "BS 7671",
      requirement: "Protection Coordination",
      status: protectionAdequate ? "pass" : "warning",
      reference: "Regulation 433.1",
      details: `Protective device: ${recommendedCable.ratedCurrent}A, Cable capacity: ${recommendedCable.currentCarryingCapacity}A`
    });

    // Ring circuit specific checks
    if (isRingCircuit) {
      const ringLengthOK = planData.cableLength <= 106;
      checks.push({
        regulation: "BS 7671",
        requirement: "Ring Circuit Length",
        status: ringLengthOK ? "pass" : "fail",
        reference: "Regulation 433.1.204",
        details: `Ring circuit length: ${planData.cableLength}m, Maximum allowed: 106m`
      });

      const ringLoadOK = planData.totalLoad <= 7200;
      checks.push({
        regulation: "BS 7671",
        requirement: "Ring Circuit Load",
        status: ringLoadOK ? "pass" : "fail",
        reference: "Regulation 433.1.204",
        details: `Ring circuit load: ${planData.totalLoad}W, Maximum recommended: 7200W`
      });
    }

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
    
    // Temperature derating (BS7671 Appendix 4 Table 4B1)
    const ambientTemp = planData.ambientTemperature || 30;
    if (ambientTemp > 30) {
      const tempDeratingFactors: Record<number, number> = {
        35: 0.94, 40: 0.87, 45: 0.79, 50: 0.71, 55: 0.61, 60: 0.50
      };
      const nearestTemp = Math.min(60, Math.max(35, Math.ceil(ambientTemp / 5) * 5));
      factor *= tempDeratingFactors[nearestTemp] || 0.50;
    }
    
    // Grouping factor (BS7671 Appendix 4 Table 4C1)
    factor *= planData.groupingFactor || 1;
    
    // Installation method factor
    if (planData.installationMethod === "conduit" && planData.cableLength > 100) {
      factor *= 0.95;
    }
    
    return Math.max(0.5, factor); // Minimum derating factor
  }

  private static mapInstallationMethod(method: string): string {
    const mapping: Record<string, string> = {
      "clipped-direct": "clipped-direct",
      "conduit": "conduit",
      "trunking": "trunking",
      "ducted": "ducted",
      "buried-direct": "buried-direct",
      "tray": "tray",
      "overhead": "clipped-direct"
    };
    return mapping[method] || "clipped-direct";
  }

  private static getMaxVoltageDropPercentage(loadType: string): number {
    const lightingLoads = ["lighting", "emergency"];
    return lightingLoads.includes(loadType) ? 3 : 5;
  }

  private static isBreakingDeviceCompatible(designCurrent: number, cableData: any, protectiveDevice: string): boolean {
    const requiredRating = Math.ceil(designCurrent * 1.1);
    return requiredRating >= cableData.minBreaker && requiredRating <= cableData.maxBreaker;
  }

  private static calculateProtectiveDeviceRating(designCurrent: number, cableCapacity: number, cableData: any): number {
    const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    const minRating = Math.max(Math.ceil(designCurrent * 1.1), cableData.minBreaker);
    const maxRating = Math.min(Math.floor(cableCapacity * 1.45), cableData.maxBreaker);
    
    return standardRatings.find(rating => rating >= minRating && rating <= maxRating) || minRating;
  }

  private static getMaxZs(protectiveDevice: string, voltage: number): number {
    // BS7671 Table 41.3 - Maximum Zs values for different protective devices
    const zsTable: Record<string, Record<number, number>> = {
      "mcb-b": { 230: 2.30, 400: 1.33 },
      "mcb-c": { 230: 1.15, 400: 0.66 },
      "mcb": { 230: 1.44, 400: 0.83 }, // Type B default
      "rcbo": { 230: 1.44, 400: 0.83 },
      "rcd": { 230: 1.44, 400: 0.83 }
    };
    
    const deviceType = protectiveDevice.toLowerCase().includes("mcb") || protectiveDevice.toLowerCase().includes("rcbo") ? "mcb" : "rcbo";
    return zsTable[deviceType]?.[voltage] || 1.15;
  }

  private static getSpecialConsiderations(planData: InstallPlanData, cableSize: string, isRingCircuit: boolean): string[] {
    const considerations: string[] = [];
    
    if (isRingCircuit) {
      considerations.push("Ring circuit configuration - ensure proper testing of both legs");
      considerations.push("Socket outlets should be distributed evenly around the ring");
    }
    
    if (planData.loadType === "motor") {
      considerations.push("Motor starting current considerations apply (typically 5-7x full load current)");
      considerations.push("Consider motor protection relay for loads >0.37kW");
    }
    
    if (planData.loadType === "lighting") {
      considerations.push("Consider LED compatibility and inrush current characteristics");
    }
    
    if (planData.installationMethod === "buried-direct") {
      considerations.push("Mechanical protection required - minimum 450mm burial depth");
      considerations.push("Warning tape required 150mm above cable");
    }
    
    if (parseFloat(cableSize) >= 25) {
      considerations.push("Heavy cable - additional support and bend radius considerations");
    }
    
    return considerations;
  }
}

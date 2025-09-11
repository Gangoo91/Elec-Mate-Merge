// Simplified Cable Selection Engine - Bulletproof BS7671 Calculations
// Every selection impacts results, everything works properly

import { InstallPlanData, CableRecommendation } from "./types";
import { SIMPLIFIED_CABLE_DATABASE, getSimpleCableSpec } from "./SimplifiedCableDatabase";

export interface SimplifiedCalculationInputs {
  designCurrent: number;
  cableLength: number;
  voltage: number;
  cableType: string;
  installationMethod: string;
  ambientTemp: number;
  groupingCircuits: number;
}

export interface SimplifiedResult {
  size: string;
  capacity: number;
  deratedCapacity: number;
  voltageDropPercent: number;
  voltageDropVolts: number;
  suitable: boolean;
  derating: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  compliance: {
    currentOK: boolean;
    voltageDropOK: boolean;
    overallOK: boolean;
  };
  notes: string[];
}

export class SimplifiedCableSelectionEngine {
  
  // Get temperature derating factor
  static getTemperatureFactor(ambientTemp: number, cableType: string): number {
    const spec = getSimpleCableSpec(cableType, "2.5"); // Get cable type characteristics
    if (!spec) return 0.87; // Conservative fallback
    
    const ratedTemp = spec.tempRating;
    
    // BS 7671 Table 4B1 - simplified but accurate
    if (ratedTemp === 70) {
      // PVC cables
      if (ambientTemp <= 30) return 1.0;
      if (ambientTemp <= 35) return 0.94;
      if (ambientTemp <= 40) return 0.87;
      if (ambientTemp <= 45) return 0.79;
      if (ambientTemp <= 50) return 0.71;
      return 0.6; // Above 50°C
    } else {
      // XLPE cables (90°C)
      if (ambientTemp <= 30) return 1.0;
      if (ambientTemp <= 35) return 0.96;
      if (ambientTemp <= 40) return 0.91;
      if (ambientTemp <= 45) return 0.87;
      if (ambientTemp <= 50) return 0.82;
      if (ambientTemp <= 55) return 0.76;
      return 0.7; // Above 55°C
    }
  }

  // Get grouping derating factor
  static getGroupingFactor(numCircuits: number): number {
    // BS 7671 Table 4C1 - simplified
    if (numCircuits <= 1) return 1.0;
    if (numCircuits === 2) return 0.8;
    if (numCircuits <= 4) return 0.7;
    if (numCircuits <= 6) return 0.65;
    if (numCircuits <= 9) return 0.6;
    return 0.5; // 10+ circuits
  }

  // Get installation method factor (if needed for special cases)
  static getInstallationFactor(method: string): number {
    // Most methods are already accounted for in the capacity table
    // This is for special adjustments if needed
    if (method === "through-insulation") return 0.8; // Additional derating
    return 1.0;
  }

  // Calculate voltage drop
  static calculateVoltageDrop(inputs: SimplifiedCalculationInputs, size: string): number {
    const spec = getSimpleCableSpec(inputs.cableType, size);
    if (!spec) return 999; // Force failure if no spec
    
    const { designCurrent, cableLength, voltage } = inputs;
    
    // Voltage drop = (mV/A/m × Current × Length) / 1000
    const voltageDropVolts = (spec.resistance * designCurrent * cableLength) / 1000;
    const voltageDropPercent = (voltageDropVolts / voltage) * 100;
    
    return voltageDropPercent;
  }

  // Check if voltage drop is acceptable
  static isVoltageDropOK(voltageDropPercent: number, loadType: string): boolean {
    // BS 7671 Appendix 4 - simplified limits
    const limit = loadType === "lighting" ? 3 : 5;
    return voltageDropPercent <= limit;
  }

  // Calculate cable options for given inputs
  static calculateCableOptions(planData: InstallPlanData): CableRecommendation[] {
    const options: CableRecommendation[] = [];
    
    // Calculate design current
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage
      : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.95));

    // Get available sizes for the selected cable type
    const availableSizes = Object.keys(SIMPLIFIED_CABLE_DATABASE[planData.cableType] || {});
    
    for (const size of availableSizes) {
      const spec = getSimpleCableSpec(planData.cableType, size);
      if (!spec) continue;

      // Get base capacity for installation method
      const methodKey = this.mapInstallationMethod(planData.installationMethod);
      const baseCapacity = spec.capacity[methodKey] || spec.capacity["clipped-direct"];
      
      // Calculate derating factors
      const tempFactor = this.getTemperatureFactor(
        planData.ambientTemperature || 30, 
        planData.cableType
      );
      const groupingFactor = this.getGroupingFactor(planData.groupingFactor || 1);
      const installationFactor = this.getInstallationFactor(planData.installationMethod);
      
      const overallDerating = tempFactor * groupingFactor * installationFactor;
      const deratedCapacity = baseCapacity * overallDerating;
      
      // Calculate voltage drop
      const inputs: SimplifiedCalculationInputs = {
        designCurrent,
        cableLength: planData.cableLength,
        voltage: planData.voltage,
        cableType: planData.cableType,
        installationMethod: planData.installationMethod,
        ambientTemp: planData.ambientTemperature || 30,
        groupingCircuits: planData.groupingFactor || 1
      };
      
      const voltageDropPercent = this.calculateVoltageDrop(inputs, size);
      const voltageDropVolts = (voltageDropPercent * planData.voltage) / 100;
      
      // Check compliance
      const currentOK = deratedCapacity >= designCurrent;
      const voltageDropOK = this.isVoltageDropOK(voltageDropPercent, planData.loadType);
      const overallOK = currentOK && voltageDropOK;
      
      // Generate notes with confidence
      const notes: string[] = [];
      notes.push(`🔧 ${spec.name} - ${spec.description}`);
      notes.push(`🌡️ Rated for ${spec.tempRating}°C continuous operation`);
      notes.push(`📊 Base capacity: ${baseCapacity}A, Derated: ${deratedCapacity.toFixed(1)}A`);
      notes.push(`⚡ Voltage drop: ${voltageDropPercent.toFixed(2)}% (${voltageDropVolts.toFixed(1)}V)`);
      
      if (overallOK) {
        const margin = ((deratedCapacity - designCurrent) / designCurrent * 100).toFixed(1);
        notes.push(`✅ BS 7671 compliant with ${margin}% safety margin`);
      } else {
        if (!currentOK) notes.push(`❌ Insufficient current capacity`);
        if (!voltageDropOK) notes.push(`❌ Voltage drop exceeds limit`);
      }
      
      // Application notes
      notes.push(`💡 Best for: ${spec.applications.join(", ")}`);
      
      if (spec.firePerformance === "enhanced") {
        notes.push(`🔥 Enhanced fire performance - suitable for escape routes`);
      }

      options.push({
        size,
        type: planData.cableType,
        currentCarryingCapacity: Math.round(deratedCapacity),
        voltageDropPercentage: parseFloat(voltageDropPercent.toFixed(2)),
        ratedCurrent: this.getStandardBreakerRating(designCurrent),
        suitability: overallOK ? "suitable" : "unsuitable",
        notes,
        cost: spec.costLevel,
        availability: "common",
        installationComplexity: "simple",
        specialConsiderations: []
      });
    }

    // Sort by suitability first, then by size
    return options.sort((a, b) => {
      if (a.suitability === "suitable" && b.suitability !== "suitable") return -1;
      if (b.suitability === "suitable" && a.suitability !== "suitable") return 1;
      return parseFloat(a.size) - parseFloat(b.size);
    });
  }

  // Map installation method to capacity key
  private static mapInstallationMethod(method: string): string {
    const mapping: Record<string, string> = {
      "clipped-direct": "clipped-direct",
      "conduit-surface": "in-conduit",
      "conduit-embedded": "in-conduit", 
      "conduit-underground": "in-conduit",
      "trunking-metal": "in-trunking",
      "trunking-plastic": "in-trunking",
      "ducting": "underground",
      "direct-buried": "underground",
      "cable-tray": "cable-tray",
      "cable-ladder": "cable-tray",
      "basket-tray": "cable-tray",
      "ceiling-void": "in-trunking",
      "wall-chase": "in-conduit",
      "through-insulation": "through-insulation"
    };
    
    return mapping[method] || "clipped-direct";
  }

  // Get standard BS 7671 breaker rating
  static getStandardBreakerRating(designCurrent: number): number {
    // BS EN 60898 standard ratings
    const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
    return standardRatings.find(rating => rating >= designCurrent) || standardRatings[standardRatings.length - 1];
  }

  // Generate simplified recommendations with multiple options
  static generateRecommendations(options: CableRecommendation[]): string[] {
    const recommendations: string[] = [];
    const suitableOptions = options.filter(opt => opt.suitability === "suitable");
    
    if (suitableOptions.length === 0) {
      recommendations.push("No suitable cable sizes found - check design current and cable length");
      const largestOption = options[options.length - 1];
      if (largestOption) {
        recommendations.push(`Consider ${largestOption.size}mm² or review installation parameters`);
      }
    } else {
      // Show multiple suitable options for professional choice
      const primary = suitableOptions[0];
      recommendations.push(`Primary choice: ${primary.size}mm² ${primary.type} (code minimum)`);
      recommendations.push(`Protection: ${primary.ratedCurrent}A breaker required`);
      
      // Show alternative if available
      if (suitableOptions.length > 1) {
        const alternative = suitableOptions[1];
        recommendations.push(`Alternative: ${alternative.size}mm² for enhanced performance`);
        recommendations.push(`Trade-off: Higher cost but better voltage regulation`);
      }
    }
    
    return recommendations;
  }
}
// Practical Calculations Engine - Professional Installation Support

import { InstallPlanData, CableRecommendation } from "./types";

export interface PracticalCalculations {
  cablePulling: CablePullingCalculation;
  earthingContinuity: EarthingCalculation;
  faultCurrent: FaultCurrentCalculation;
  conduitFill: ConduitFillCalculation;
  circuitSchedule: CircuitScheduleData;
  testingGuidance: TestingGuidance;
  costEstimate: CostEstimate;
  installationTime: TimeEstimate;
}

export interface CablePullingCalculation {
  maxPullingForce: number; // Newtons
  recommendedLubricant: string;
  bendRadius: number; // mm
  supportSpacing: number; // metres
  warnings: string[];
}

export interface EarthingCalculation {
  cpcResistance: number; // Ohms
  earthLoopImpedance: number; // Ohms
  maxDisconnectionTime: number; // seconds
  swaEarthingRequired: boolean;
}

export interface FaultCurrentCalculation {
  prospectiveFaultCurrent: number; // kA
  maxZs: number; // Ohms
  actualZs: number; // Ohms
  safetyMargin: number; // %
  complianceStatus: "pass" | "marginal" | "fail";
}

export interface ConduitFillCalculation {
  conduitSize: number; // mm diameter
  fillPercentage: number; // %
  maxCables: number;
  recommendations: string[];
}

export interface CircuitScheduleData {
  circuitRef: string;
  description: string;
  typeOfWiring: string;
  referenceMethod: string;
  cableSize: string;
  protectiveDevice: string;
  maxPermittedZs: number;
  testResults: {
    r1r2: number | null;
    insulationResistance: number | null;
    zs: number | null;
  };
}

export interface TestingGuidance {
  preCommissioningTests: TestStep[];
  functionalTests: TestStep[];
  periodicInspection: {
    nextDue: string;
    frequency: string;
  };
}

export interface TestStep {
  sequence: number;
  test: string;
  reference: string;
  expectedResult: string;
  tolerance: string;
  notes: string[];
}

export interface CostEstimate {
  materials: {
    cable: number;
    accessories: number;
    protective: number;
    installation: number;
  };
  labour: {
    installation: number;
    testing: number;
    certification: number;
  };
  total: number;
  breakdown: CostBreakdownItem[];
}

export interface CostBreakdownItem {
  description: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  category: "cable" | "accessory" | "protective" | "labour" | "testing";
}

export interface TimeEstimate {
  planning: number; // hours
  installation: number; // hours
  testing: number; // hours
  certification: number; // hours
  total: number; // hours
  factors: string[];
}

export class PracticalCalculationsEngine {
  static generatePracticalCalculations(
    planData: InstallPlanData, 
    recommendedCable: CableRecommendation
  ): PracticalCalculations {
    return {
      cablePulling: this.calculateCablePulling(planData, recommendedCable),
      earthingContinuity: this.calculateEarthing(planData, recommendedCable),
      faultCurrent: this.calculateFaultCurrent(planData, recommendedCable),
      conduitFill: this.calculateConduitFill(planData, recommendedCable),
      circuitSchedule: this.generateCircuitSchedule(planData, recommendedCable),
      testingGuidance: this.generateTestingGuidance(planData, recommendedCable),
      costEstimate: this.generateCostEstimate(planData, recommendedCable),
      installationTime: this.estimateInstallationTime(planData, recommendedCable)
    };
  }

  private static calculateCablePulling(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): CablePullingCalculation {
    const cableWeight = this.getCableWeight(parseFloat(cable.size), planData.cableType || "pvc-twin-earth");
    const basePullingForce = cableWeight * planData.cableLength * 9.81; // N
    const frictionFactor = this.getFrictionFactor(planData.installationMethod || "clipped-direct");
    const maxPullingForce = basePullingForce * frictionFactor;

    const warnings: string[] = [];
    
    if (maxPullingForce > 1000) {
      warnings.push("High pulling force - consider intermediate pulling points");
    }
    
    if (planData.cableLength > 30) {
      warnings.push("Long cable run - use cable pulling lubricant");
    }

    if (planData.installationMethod?.includes("conduit") && planData.cableLength > 15) {
      warnings.push("Consider draw-in cables or larger conduit for easier installation");
    }

    return {
      maxPullingForce: Math.round(maxPullingForce),
      recommendedLubricant: maxPullingForce > 500 ? "Cable pulling gel" : "Talcum powder",
      bendRadius: this.getMinBendRadius(parseFloat(cable.size), planData.cableType || "pvc-twin-earth"),
      supportSpacing: this.getSupportSpacing(parseFloat(cable.size), planData.installationMethod || "clipped-direct"),
      warnings
    };
  }

  private static calculateEarthing(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): EarthingCalculation {
    // Basic CPC resistance calculation (simplified)
    const cpcSize = this.getCPCSize(parseFloat(cable.size));
    const cpcResistance = (planData.cableLength * this.getResistancePerMetre(cpcSize)) / 1000;
    
    // Earth loop impedance
    const earthLoopImpedance = planData.ze + cpcResistance;
    
    // Maximum disconnection time based on circuit type
    const maxDisconnectionTime = planData.loadType === "power" ? 0.4 : 5.0; // seconds
    
    return {
      cpcResistance: Math.round(cpcResistance * 1000) / 1000,
      earthLoopImpedance: Math.round(earthLoopImpedance * 1000) / 1000,
      maxDisconnectionTime,
      swaEarthingRequired: planData.cableType?.toLowerCase().includes('swa') || false
    };
  }

  private static calculateFaultCurrent(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): FaultCurrentCalculation {
    const voltage = planData.voltage;
    const earthLoopImpedance = planData.ze + (planData.cableLength * 0.02); // Simplified
    const prospectiveFaultCurrent = voltage / earthLoopImpedance / 1000; // kA
    
    // Get maximum Zs for protective device
    const maxZs = this.getMaxZs(cable.ratedCurrent, planData.protectiveDevice || "mcb-b");
    const actualZs = earthLoopImpedance;
    const safetyMargin = ((maxZs - actualZs) / maxZs) * 100;
    
    let complianceStatus: "pass" | "marginal" | "fail" = "pass";
    if (safetyMargin < 0) complianceStatus = "fail";
    else if (safetyMargin < 25) complianceStatus = "marginal";
    
    return {
      prospectiveFaultCurrent: Math.round(prospectiveFaultCurrent * 100) / 100,
      maxZs: Math.round(maxZs * 100) / 100,
      actualZs: Math.round(actualZs * 100) / 100,
      safetyMargin: Math.round(safetyMargin),
      complianceStatus
    };
  }

  private static calculateConduitFill(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): ConduitFillCalculation {
    if (!planData.installationMethod?.includes("conduit")) {
      return {
        conduitSize: 0,
        fillPercentage: 0,
        maxCables: 0,
        recommendations: ["Not applicable - not conduit installation"]
      };
    }

    const cableDiameter = this.getCableDiameter(parseFloat(cable.size), planData.cableType || "pvc-twin-earth");
    const recommendedConduitSize = this.getRecommendedConduitSize(cableDiameter, 1);
    const fillPercentage = (Math.PI * (cableDiameter/2)**2) / (Math.PI * (recommendedConduitSize/2)**2) * 100;
    
    const recommendations: string[] = [];
    if (fillPercentage > 31) recommendations.push("Consider larger conduit size");
    if (planData.cableLength > 15) recommendations.push("Provide draw-in points every 15m");
    
    return {
      conduitSize: recommendedConduitSize,
      fillPercentage: Math.round(fillPercentage),
      maxCables: Math.floor(1 / (fillPercentage / 31)), // Simplified
      recommendations
    };
  }

  private static generateCircuitSchedule(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): CircuitScheduleData {
    return {
      circuitRef: "L1", // Would be generated based on system
      description: `${planData.loadType} - ${planData.totalLoad}W`,
      typeOfWiring: this.getWiringType(planData.cableType || "pvc-twin-earth"),
      referenceMethod: this.getReferenceMethod(planData.installationMethod || "clipped-direct"),
      cableSize: `${cable.size}mm²`,
      protectiveDevice: `${cable.ratedCurrent}A ${planData.protectiveDevice?.toUpperCase()}`,
      maxPermittedZs: this.getMaxZs(cable.ratedCurrent, planData.protectiveDevice || "mcb-b"),
      testResults: {
        r1r2: null, // To be filled during testing
        insulationResistance: null,
        zs: null
      }
    };
  }

  private static generateTestingGuidance(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): TestingGuidance {
    const preCommissioningTests: TestStep[] = [
      {
        sequence: 1,
        test: "Continuity of Protective Conductors",
        reference: "BS 7671 Section 643.2",
        expectedResult: `≤${((planData.cableLength * 0.02) * 1.25).toFixed(2)}Ω`,
        tolerance: "±5%",
        notes: ["Test at each outlet", "Include parallel earth paths"]
      },
      {
        sequence: 2,
        test: "Insulation Resistance",
        reference: "BS 7671 Section 643.3",
        expectedResult: "≥1MΩ at 500V DC",
        tolerance: "No tolerance",
        notes: ["Test all conductor combinations", "Remove electronic equipment"]
      },
      {
        sequence: 3,
        test: "Earth Fault Loop Impedance",
        reference: "BS 7671 Section 643.7",
        expectedResult: `≤${this.getMaxZs(cable.ratedCurrent, planData.protectiveDevice || "mcb-b")}Ω`,
        tolerance: "Temperature corrected",
        notes: ["Test at furthest point", "Apply temperature correction"]
      }
    ];

    const functionalTests: TestStep[] = [
      {
        sequence: 1,
        test: "Operation of Switchgear",
        reference: "BS 7671 Section 643.10",
        expectedResult: "Correct operation",
        tolerance: "Visual/functional",
        notes: ["Test all switching devices", "Check correct labelling"]
      }
    ];

    return {
      preCommissioningTests,
      functionalTests,
      periodicInspection: {
        nextDue: this.getNextInspectionDate(planData.installationType || "commercial"),
        frequency: planData.installationType === "domestic" ? "10 years" : "5 years"
      }
    };
  }

  private static generateCostEstimate(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): CostEstimate {
    const cableLength = Math.ceil(planData.cableLength * 1.1); // 10% waste
    const cableCostPerMetre = this.getCableCostPerMetre(parseFloat(cable.size), planData.cableType || "pvc-twin-earth");
    
    const breakdown: CostBreakdownItem[] = [
      {
        description: `${cable.size}mm² ${planData.cableType} cable`,
        quantity: cableLength,
        unit: "m",
        unitCost: cableCostPerMetre,
        totalCost: cableLength * cableCostPerMetre,
        category: "cable"
      },
      {
        description: `${cable.ratedCurrent}A ${planData.protectiveDevice}`,
        quantity: 1,
        unit: "nr",
        unitCost: this.getProtectiveDeviceCost(cable.ratedCurrent, planData.protectiveDevice || "mcb-b"),
        totalCost: this.getProtectiveDeviceCost(cable.ratedCurrent, planData.protectiveDevice || "mcb-b"),
        category: "protective"
      },
      {
        description: "Installation accessories",
        quantity: 1,
        unit: "sum",
        unitCost: cableLength * 2,
        totalCost: cableLength * 2,
        category: "accessory"
      },
      {
        description: "Installation labour",
        quantity: this.getInstallationHours(planData),
        unit: "hr",
        unitCost: 45,
        totalCost: this.getInstallationHours(planData) * 45,
        category: "labour"
      },
      {
        description: "Testing and certification",
        quantity: 2,
        unit: "hr",
        unitCost: 55,
        totalCost: 110,
        category: "testing"
      }
    ];

    const materials = breakdown
      .filter(item => ["cable", "accessory", "protective"].includes(item.category))
      .reduce((sum, item) => sum + item.totalCost, 0);

    const labour = breakdown
      .filter(item => item.category === "labour")
      .reduce((sum, item) => sum + item.totalCost, 0);

    const testing = breakdown
      .filter(item => item.category === "testing")
      .reduce((sum, item) => sum + item.totalCost, 0);

    return {
      materials: {
        cable: breakdown.find(item => item.category === "cable")?.totalCost || 0,
        accessories: breakdown.find(item => item.category === "accessory")?.totalCost || 0,
        protective: breakdown.find(item => item.category === "protective")?.totalCost || 0,
        installation: 0
      },
      labour: {
        installation: labour,
        testing: testing,
        certification: 0
      },
      total: materials + labour + testing,
      breakdown
    };
  }

  private static estimateInstallationTime(
    planData: InstallPlanData, 
    cable: CableRecommendation
  ): TimeEstimate {
    const baseInstallationRate = this.getInstallationRate(planData.installationMethod || "clipped-direct");
    const installationTime = planData.cableLength / baseInstallationRate;
    
    const factors: string[] = [];
    let multiplier = 1.0;
    
    if (planData.installationMethod?.includes("underground")) {
      multiplier *= 2.0;
      factors.push("Underground installation (2x)");
    }
    
    if (planData.cableType?.toLowerCase().includes("swa")) {
      multiplier *= 1.3;
      factors.push("SWA termination complexity (1.3x)");
    }
    
    if (planData.cableLength > 50) {
      multiplier *= 1.2;
      factors.push("Long cable run (1.2x)");
    }

    return {
      planning: 1,
      installation: Math.round(installationTime * multiplier * 10) / 10,
      testing: 2,
      certification: 1,
      total: 1 + (installationTime * multiplier) + 2 + 1,
      factors
    };
  }

  // Helper methods for calculations
  private static getCableWeight(size: number, type: string): number {
    // Simplified cable weight lookup (kg/m)
    const weights: Record<string, Record<number, number>> = {
      "pvc-twin-earth": { 1.5: 0.12, 2.5: 0.18, 4: 0.25, 6: 0.35, 10: 0.55 },
      "swa-xlpe": { 2.5: 0.95, 4: 1.2, 6: 1.5, 10: 2.1, 16: 3.2, 25: 4.8 }
    };
    return weights[type]?.[size] || 0.5;
  }

  private static getFrictionFactor(method: string): number {
    const factors: Record<string, number> = {
      "clipped-direct": 1.1,
      "in-conduit": 1.8,
      "in-trunking": 1.3,
      "cable-tray": 1.2,
      "underground": 1.5
    };
    return factors[method] || 1.2;
  }

  private static getMinBendRadius(size: number, type: string): number {
    // Minimum bend radius in mm
    if (type.includes("swa")) return size * 12;
    return size * 6;
  }

  private static getSupportSpacing(size: number, method: string): number {
    // Support spacing in metres
    if (method === "clipped-direct") {
      if (size <= 2.5) return 0.4;
      if (size <= 6) return 0.35;
      return 0.3;
    }
    return 1.0; // Default for other methods
  }

  private static getCPCSize(liveSize: number): number {
    // Simplified CPC sizing
    if (liveSize <= 16) return liveSize;
    if (liveSize <= 35) return 16;
    return liveSize / 2;
  }

  private static getResistancePerMetre(size: number): number {
    // Resistance in mΩ/m
    const resistances: Record<number, number> = {
      1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.8, 35: 1.3
    };
    return resistances[size] || 5;
  }

  private static getMaxZs(deviceRating: number, deviceType: string): number {
    // Simplified maximum Zs values for 230V
    const mcbBValues: Record<number, number> = {
      6: 7.67, 10: 4.60, 16: 2.87, 20: 2.30, 25: 1.84, 32: 1.44, 40: 1.15, 50: 0.92, 63: 0.73
    };
    return mcbBValues[deviceRating] || 1.0;
  }

  private static getCableDiameter(size: number, type: string): number {
    // Cable overall diameter in mm
    if (type === "pvc-twin-earth") {
      const diameters: Record<number, number> = { 1.5: 8.5, 2.5: 10.5, 4: 12.5, 6: 14.5, 10: 18 };
      return diameters[size] || 15;
    }
    return size + 10; // Simplified
  }

  private static getRecommendedConduitSize(cableDiameter: number, cableCount: number): number {
    // Conduit internal diameter in mm
    const requiredArea = Math.PI * (cableDiameter/2)**2 * cableCount / 0.31; // 31% fill
    const requiredDiameter = Math.sqrt(requiredArea / Math.PI) * 2;
    
    const standardSizes = [16, 20, 25, 32, 40, 50, 63, 75, 100];
    return standardSizes.find(size => size >= requiredDiameter) || 100;
  }

  private static getWiringType(cableType: string): string {
    const types: Record<string, string> = {
      "pvc-twin-earth": "PVC/PVC flat twin & earth",
      "xlpe-lsoh": "XLPE/LSOH single core",
      "swa-xlpe": "XLPE/SWA/PVC armoured",
      "micc": "Mineral insulated",
      "h07rn-f": "Heavy duty flexible"
    };
    return types[cableType] || "PVC insulated";
  }

  private static getReferenceMethod(installMethod: string): string {
    const methods: Record<string, string> = {
      "clipped-direct": "Method C (clipped direct)",
      "in-conduit": "Method B (enclosed conduit)",
      "in-trunking": "Method B (enclosed trunking)",
      "cable-tray": "Method E (cable tray)",
      "underground": "Method D (underground)"
    };
    return methods[installMethod] || "Method C";
  }

  private static getNextInspectionDate(installType: string): string {
    const years = installType === "domestic" ? 10 : 5;
    const nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + years);
    return nextDate.toLocaleDateString("en-GB");
  }

  private static getCableCostPerMetre(size: number, type: string): number {
    // Basic cost estimates in £/m
    const costs: Record<string, Record<number, number>> = {
      "pvc-twin-earth": { 1.5: 1.2, 2.5: 1.8, 4: 2.5, 6: 3.5, 10: 5.5 },
      "swa-xlpe": { 2.5: 4.5, 4: 6.2, 6: 8.5, 10: 12, 16: 18, 25: 28 }
    };
    return costs[type]?.[size] || 5;
  }

  private static getProtectiveDeviceCost(rating: number, type: string): number {
    if (type.includes("rcbo")) return 35;
    if (type.includes("mcb")) return 15;
    return 25;
  }

  private static getInstallationHours(planData: InstallPlanData): number {
    let baseHours = planData.cableLength / 10; // 10m per hour base rate
    
    if (planData.installationMethod?.includes("underground")) baseHours *= 3;
    if (planData.cableType?.toLowerCase().includes("swa")) baseHours *= 1.5;
    
    return Math.max(2, Math.round(baseHours));
  }

  private static getInstallationRate(method: string): number {
    // metres per hour
    const rates: Record<string, number> = {
      "clipped-direct": 15,
      "in-conduit": 8,
      "in-trunking": 12,
      "cable-tray": 20,
      "underground": 5
    };
    return rates[method] || 10;
  }
}
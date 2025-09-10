import { InstallPlanData, CableRecommendation, InstallationSuggestion, ComplianceCheck, Circuit } from "./types";
import { getCableDatabase, BS7671_CABLE_DATABASE } from "./EnhancedCableDatabase";
import { 
  calculateCableCapacity, 
  calculateVoltageDrop, 
  CableType,
  getRecommendations as getCableCapacityRecommendations,
  getVoltageDropRecommendations
} from '@/lib/calculators';
import { legacyStandardDeviceRatings, getNextStandardRating } from '@/lib/calculators/utils/calculatorUtils';
import { zsValues } from '@/components/apprentice/calculators/zs-values/ZsValuesData';
import { getSuitableDevices, getMaxZs, getRecommendedDeviceType } from '@/lib/calculators/bs7671-data/protectiveDevices';

export class ImprovedCableSelectionEngine {
  
  static calculateCableOptions(planData: InstallPlanData, isRingCircuit: boolean = false): CableRecommendation[] {
    const designCurrent = this.calculateDesignCurrent(planData);
    const options: CableRecommendation[] = [];
    const cableDatabase = getCableDatabase(isRingCircuit);

    for (const [size, cableData] of Object.entries(cableDatabase)) {
      const cableSize = parseFloat(size);
      
      // Use proper BS7671 cable capacity calculation
      const cableType = this.mapCableType(planData.cableType);
      const capacityInputs = {
        cableType,
        cableSize,
        ambientTemp: planData.ambientTemperature || 30,
        groupingCircuits: this.getGroupingCircuits(planData),
        designCurrent,
        deviceRating: this.getProposedDeviceRating(designCurrent, cableData),
        installationMethod: this.getInstallationMethod(planData.installationMethod),
        soilTemp: planData.installationMethod?.includes('buried') ? 20 : undefined
      };

      const capacityResult = calculateCableCapacity(capacityInputs);
      if (!capacityResult) continue;

      // Use proper BS7671 voltage drop calculation
      const voltageDropInputs = {
        cableType,
        cableSize,
        length: planData.cableLength,
        current: designCurrent,
        voltage: planData.voltage,
        powerFactor: planData.powerFactor || 0.95,
        phaseConfig: planData.phases as 'single' | 'three',
        temperature: planData.ambientTemperature || 30
      };

      const voltageDropResult = calculateVoltageDrop(voltageDropInputs);
      if (!voltageDropResult) continue;

      // Calculate Zs properly
      const r1r2 = planData.cableLength * (cableData.resistance.r1 + cableData.resistance.r2) / 1000;
      const zsValue = planData.ze + r1r2;
      const maxZs = this.getMaxZs(planData.protectiveDevice, planData.voltage, capacityResult.In);
      const zsOK = zsValue <= maxZs;

      // Determine suitability using BS7671 compliant checks
      const currentOK = capacityResult.compliance.InLeIz;
      const voltageDropOK = voltageDropResult.compliance.isCompliant;
      const coordinationOK = capacityResult.compliance.IbLeIn;
      const lengthOK = planData.cableLength <= cableData.maxLength;

      let suitability: "suitable" | "marginal" | "unsuitable";
      if (currentOK && voltageDropOK && coordinationOK && zsOK && lengthOK) {
        suitability = "suitable";
      } else if (currentOK && zsOK && (voltageDropResult.voltageDropPercent <= this.getMaxVoltageDropPercentage(planData.loadType, planData.specialRequirements) * 1.2)) {
        suitability = "marginal";
      } else {
        suitability = "unsuitable";
      }

      // Generate comprehensive notes
      const notes: string[] = [];
      if (!currentOK) notes.push(`❌ ${capacityResult.compliance.InLeIz ? 'Current capacity adequate' : 'Current capacity insufficient'}`);
      if (!voltageDropOK) notes.push(`❌ Voltage drop: ${voltageDropResult.voltageDropPercent.toFixed(2)}% (max: ${this.getMaxVoltageDropPercentage(planData.loadType, planData.specialRequirements)}%)`);
      if (!coordinationOK) notes.push(`❌ Device coordination: Ib (${capacityResult.Ib}A) > In (${capacityResult.In}A)`);
      if (!zsOK) notes.push(`❌ Zs too high: ${zsValue.toFixed(3)}Ω > ${maxZs.toFixed(3)}Ω max`);
      if (!lengthOK) notes.push(`❌ Cable length exceeds recommendations`);

      if (suitability === "suitable") {
        notes.push(`✅ Complies with BS7671 - Safety margin: ${capacityResult.compliance.safetyMargin.toFixed(1)}%`);
        if (isRingCircuit) notes.push(`✅ Ring circuit validated`);
      }

      // Add calculation equations for transparency
      notes.push(`📊 ${capacityResult.equation}`);
      notes.push(`📊 ${voltageDropResult.equation}`);

      options.push({
        size,
        type: planData.cableType,
        currentCarryingCapacity: Math.round(capacityResult.Iz),
        voltageDropPercentage: voltageDropResult.voltageDropPercent,
        ratedCurrent: capacityResult.In,
        suitability,
        notes,
        cost: cableData.cost,
        availability: cableData.availability,
        installationComplexity: cableData.installationComplexity,
        specialConsiderations: this.getSpecialConsiderations(planData, size, isRingCircuit, capacityResult, voltageDropResult)
      });
    }

    // Sort by suitability, then cost, then cable size, then voltage drop as tiebreaker
    return options.sort((a, b) => {
      const suitabilityOrder = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
      const costOrder = { "low": 0, "medium": 1, "high": 2 };
      
      // Primary sort: suitability (suitable cables first)
      if (suitabilityOrder[a.suitability] !== suitabilityOrder[b.suitability]) {
        return suitabilityOrder[a.suitability] - suitabilityOrder[b.suitability];
      }
      
      // Secondary sort: cost (prefer lower cost)
      if (costOrder[a.cost || "medium"] !== costOrder[b.cost || "medium"]) {
        return costOrder[a.cost || "medium"] - costOrder[b.cost || "medium"];
      }
      
      // Tertiary sort: cable size (prefer smaller cable)
      const sizeA = parseFloat(a.size);
      const sizeB = parseFloat(b.size);
      if (Math.abs(sizeA - sizeB) > 0.1) {
        return sizeA - sizeB;
      }
      
      // Final tiebreaker: voltage drop (prefer lower voltage drop)
      return a.voltageDropPercentage - b.voltageDropPercentage;
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

    // Use the recommendations from the BS7671 engines
    if (bestOption && bestOption.suitability !== "suitable") {
      const suitableOptions = cableOptions.filter(opt => opt.suitability === "suitable");
      if (suitableOptions.length > 0) {
        suggestions.push({
          type: "cable-upgrade",
          title: "Cable Upgrade Required for BS7671 Compliance",
          description: `Upgrade to ${suitableOptions[0].size}mm² cable to meet all requirements.`,
          impact: "high",
          cost: suitableOptions[0].cost,
          regulation: "BS 7671 Sections 523 & Appendix 4"
        });
      }
    }

    // Ring circuit recommendations
    if (!isRingCircuit && planData.loadType === "power" && planData.cableLength <= 106 && planData.totalLoad <= 7200) {
      suggestions.push({
        type: "cable-upgrade",
        title: "Consider Ring Circuit Configuration",
        description: "A 32A ring final circuit using 2.5mm² T&E may be more economical and provide better load distribution.",
        impact: "medium",
        cost: "low",
        regulation: "BS 7671 Section 433.1.204"
      });
    }

    // Temperature considerations
    if (planData.ambientTemperature > 30) {
      suggestions.push({
        type: "environmental",
        title: "High Ambient Temperature",
        description: `Temperature derating applied. Consider improved ventilation or larger cable.`,
        impact: "medium",
        regulation: "BS 7671 Appendix 4 Table 4B1"
      });
    }

    return suggestions;
  }

  static performEnhancedComplianceChecks(planData: InstallPlanData, zsValue: number, recommendedCable: CableRecommendation, isRingCircuit: boolean = false): ComplianceCheck[] {
    const checks: ComplianceCheck[] = [];

    // Zs compliance with accurate device-specific values
    const maxZs = this.getMaxZs(planData.protectiveDevice, planData.voltage, recommendedCable.ratedCurrent);
    checks.push({
      regulation: "BS 7671",
      requirement: "Earth Fault Loop Impedance (Zs)",
      status: zsValue <= maxZs ? "pass" : "fail",
      reference: "Regulation 411.4.5",
      details: `Measured Zs: ${zsValue.toFixed(3)}Ω, Maximum allowed: ${maxZs.toFixed(3)}Ω`
    });

    // Voltage drop compliance
    const maxVoltageDropPercentage = this.getMaxVoltageDropPercentage(planData.loadType, planData.specialRequirements);
    const voltageDropStatus = recommendedCable.voltageDropPercentage <= maxVoltageDropPercentage ? "pass" : "fail";
    checks.push({
      regulation: "BS 7671",
      requirement: "Voltage Drop Limits",
      status: voltageDropStatus,
      reference: "Appendix 4",
      details: `Calculated voltage drop: ${recommendedCable.voltageDropPercentage.toFixed(2)}%, Maximum allowed: ${maxVoltageDropPercentage}%`
    });

    // Current carrying capacity (Ib ≤ In ≤ Iz)
    const designCurrent = this.calculateDesignCurrent(planData);
    const ibLeIn = designCurrent <= recommendedCable.ratedCurrent;
    const inLeIz = recommendedCable.ratedCurrent <= recommendedCable.currentCarryingCapacity;
    
    checks.push({
      regulation: "BS 7671",
      requirement: "Current Coordination (Ib ≤ In ≤ Iz)",
      status: ibLeIn && inLeIz ? "pass" : "fail",
      reference: "Regulation 433.1",
      details: `Ib: ${designCurrent.toFixed(1)}A, In: ${recommendedCable.ratedCurrent}A, Iz: ${recommendedCable.currentCarryingCapacity}A`
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

  private static mapCableType(cableType: string): CableType {
    const mapping: Record<string, CableType> = {
      "twin-and-earth": "pvc-twin-earth",
      "single-core": "pvc-single", 
      "swa": "swa",
      "lsf": "pvc-single",
      "armored": "swa",
      "heat-resistant": "xlpe-single",
      "micc": "xlpe-single", // Map MICC to available type
      "mineral-insulated": "xlpe-single"
    };
    return mapping[cableType] || "pvc-twin-earth";
  }

  private static getInstallationMethod(method: string): 'air' | 'soil' {
    return method?.includes('buried') || method?.includes('underground') ? 'soil' : 'air';
  }

  private static getGroupingCircuits(planData: InstallPlanData): number {
    return planData.groupingFactor ? Math.round(1 / planData.groupingFactor) : 1;
  }

  private static getProposedDeviceRating(designCurrent: number, cableData: any): number {
    const minRating = Math.ceil(designCurrent * 1.1);
    const maxCapacity = cableData.currentCarryingCapacity?.["clipped-direct"] || 100;
    
    // Get suitable devices - this now includes BS88 and MCCB for higher currents
    const suitableDevices = getSuitableDevices(designCurrent, maxCapacity);
    
    // Return the recommended rating from the most suitable device type
    return suitableDevices.length > 0 ? suitableDevices[0].recommended : minRating;
  }

  private static getMaxZs(protectiveDevice: string, voltage: number, deviceRating: number): number {
    // Use the enhanced protective device database for accurate Zs values
    const maxZsValue = getMaxZs(protectiveDevice, deviceRating, voltage);
    
    if (maxZsValue > 0) {
      return maxZsValue;
    }
    
    // Fallback to ZsValuesData for legacy compatibility
    const deviceInfo = this.parseProtectiveDevice(protectiveDevice);
    const deviceKey = `${deviceInfo.curve}${deviceRating}`;
    
    if (zsValues[deviceKey]) {
      return zsValues[deviceKey];
    }
    
    // Conservative fallback values
    const conservativeValues: Record<string, number> = {
      'type-b': 2.3 / deviceRating * 32,
      'type-c': 1.15 / deviceRating * 32,
      'type-d': 0.58 / deviceRating * 32
    };
    
    return conservativeValues[deviceInfo.curve] || 1.15;
  }

  private static parseProtectiveDevice(device: string): { type: string; curve: string; rating?: number } {
    const deviceLower = device.toLowerCase();
    
    let curve = 'type-b'; // Default
    if (deviceLower.includes('type-c') || deviceLower.includes('c-curve')) {
      curve = 'type-c';
    } else if (deviceLower.includes('type-d') || deviceLower.includes('d-curve')) {
      curve = 'type-d';
    }
    
    let type = 'mcb';
    if (deviceLower.includes('rcbo')) {
      type = 'rcbo';
    } else if (deviceLower.includes('rcd')) {
      type = 'rcd';
    }
    
    return { type, curve };
  }

  private static getMaxVoltageDropPercentage(loadType: string, specialRequirements?: string[]): number {
    // BS 7671 Appendix 4 Section 6.4 - Voltage drop limits
    const lightingLoads = ["lighting", "emergency", "emergency-lighting"];
    const emergencyRequirements = specialRequirements?.some(req => 
      req.toLowerCase().includes('emergency') || 
      req.toLowerCase().includes('fire safety') ||
      req.toLowerCase().includes('life safety')
    );
    
    // Emergency lighting and life safety circuits require 3% max
    if (lightingLoads.includes(loadType) || emergencyRequirements) {
      return 3;
    }
    
    return 5;
  }

  private static getSpecialConsiderations(
    planData: InstallPlanData, 
    cableSize: string, 
    isRingCircuit: boolean,
    capacityResult: any,
    voltageDropResult: any
  ): string[] {
    const considerations: string[] = [];
    
    if (isRingCircuit) {
      considerations.push("Ring circuit: Test both legs for continuity and resistance");
      considerations.push("Socket outlets distributed evenly around ring");
    }
    
    if (capacityResult.factors.overall < 0.8) {
      considerations.push(`Heavy derating applied (${(capacityResult.factors.overall * 100).toFixed(0)}%) - review installation conditions`);
    }
    
    if (voltageDropResult.voltageDropPercent > 3) {
      considerations.push("Higher voltage drop may affect sensitive equipment performance");
    }
    
    if (parseFloat(cableSize) >= 25) {
      considerations.push("Large cable: Check bend radius and support requirements");
    }
    
    return considerations;
  }
}
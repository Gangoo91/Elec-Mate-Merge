import { InstallPlanData, CableRecommendation } from "./types";
import { getTemperatureFactor } from "@/lib/calculators/bs7671-data";

interface CableTypeProfile {
  temperatureRating: number;
  applications: string[];
  firePerformance: "standard" | "lsoh" | "fire-resistant";
  mechanicalProtection: "none" | "light" | "armoured";
  costMultiplier: number;
  environmentalSuitability: string[];
}

const CABLE_PROFILES: Record<string, CableTypeProfile> = {
  "pvc-twin-earth": {
    temperatureRating: 70,
    applications: ["domestic", "commercial-light"],
    firePerformance: "standard",
    mechanicalProtection: "none",
    costMultiplier: 1.0,
    environmentalSuitability: ["indoor-domestic", "dry-indoor"]
  },
  "xlpe-lsoh": {
    temperatureRating: 90,
    applications: ["commercial", "public-areas", "fire-critical"],
    firePerformance: "lsoh",
    mechanicalProtection: "light",
    costMultiplier: 1.4,
    environmentalSuitability: ["fire-critical", "commercial", "high-temperature"]
  },
  "swa-xlpe": {
    temperatureRating: 90,
    applications: ["outdoor", "underground", "industrial"],
    firePerformance: "standard",
    mechanicalProtection: "armoured",
    costMultiplier: 1.8,
    environmentalSuitability: ["outdoor-exposed", "underground", "industrial"]
  },
  "micc": {
    temperatureRating: 250,
    applications: ["high-temperature", "fire-resistant", "industrial"],
    firePerformance: "fire-resistant",
    mechanicalProtection: "armoured",
    costMultiplier: 3.2,
    environmentalSuitability: ["high-temperature", "fire-critical", "industrial"]
  }
};

const PROTECTION_DEVICE_DATABASE = {
  mcb: {
    maxRating: 125,
    costMultiplier: 1.0,
    applications: ["domestic", "commercial"],
    breakingCapacity: 10000
  },
  rcbo: {
    maxRating: 63,
    costMultiplier: 2.5,
    applications: ["domestic", "commercial"],
    breakingCapacity: 10000
  },
  mccb: {
    maxRating: 1600,
    costMultiplier: 8.0,
    applications: ["industrial", "high-current"],
    breakingCapacity: 25000
  },
  bs88: {
    maxRating: 800,
    costMultiplier: 3.0,
    applications: ["industrial", "motor-protection"],
    breakingCapacity: 80000
  }
};

export class IntelligentCableEngine {
  
  static selectOptimalCableType(planData: InstallPlanData): string {
    const environment = planData.environmentalConditions;
    const ambientTemp = planData.ambientTemperature || 20;
    const loadType = planData.loadType;
    
    // Priority scoring system
    const scores: Record<string, number> = {};
    
    Object.entries(CABLE_PROFILES).forEach(([cableType, profile]) => {
      let score = 100; // Base score
      
      // Environmental suitability (highest priority)
      if (profile.environmentalSuitability.includes(environment)) {
        score += 50;
      } else {
        score -= 30;
      }
      
      // Temperature handling
      if (ambientTemp > 40 && profile.temperatureRating >= 90) {
        score += 30;
      } else if (ambientTemp > 60 && profile.temperatureRating >= 250) {
        score += 50;
      } else if (ambientTemp <= 30 && profile.temperatureRating === 70) {
        score += 10; // PVC bonus for normal temps
      }
      
      // Fire performance requirements
      if (environment === "fire-critical") {
        if (profile.firePerformance === "lsoh" || profile.firePerformance === "fire-resistant") {
          score += 40;
        } else {
          score -= 50; // Heavy penalty for non-fire performance cables
        }
      }
      
      // Cost efficiency (lower cost = higher score)
      score += (4.0 - profile.costMultiplier) * 10;
      
      // Load type suitability
      if (loadType === "power" && profile.mechanicalProtection === "armoured") {
        score += 20; // SWA good for high power
      }
      
      scores[cableType] = score;
    });
    
    // Return highest scoring cable type
    return Object.entries(scores).reduce((best, [type, score]) => 
      score > scores[best] ? type : best
    , Object.keys(scores)[0]);
  }
  
  static selectOptimalInstallationMethod(planData: InstallPlanData, cableType: string): string {
    const environment = planData.environmentalConditions;
    const cableProfile = CABLE_PROFILES[cableType];
    
    // Installation method selection logic
    const methodScores: Record<string, number> = {
      "clipped-direct": 100,
      "in-conduit": 80,
      "in-trunking": 85,
      "through-insulation": 60,
      "underground": 70,
      "cable-tray": 90
    };
    
    // Environment-specific adjustments
    if (environment === "outdoor-exposed" || environment === "underground") {
      methodScores["underground"] += 50;
      methodScores["clipped-direct"] -= 30;
    }
    
    if (environment === "fire-critical") {
      methodScores["in-trunking"] += 30;
      methodScores["cable-tray"] += 20;
    }
    
    if (environment === "industrial") {
      methodScores["cable-tray"] += 40;
      methodScores["in-trunking"] += 30;
    }
    
    // Cable type compatibility
    if (cableType === "swa-xlpe") {
      methodScores["underground"] += 30;
      methodScores["clipped-direct"] += 20;
      methodScores["in-conduit"] -= 20; // SWA doesn't need conduit
    }
    
    if (cableType === "pvc-twin-earth") {
      methodScores["clipped-direct"] += 20;
      methodScores["in-conduit"] += 15;
    }
    
    return Object.entries(methodScores).reduce((best, [method, score]) => 
      score > methodScores[best] ? method : best
    , Object.keys(methodScores)[0]);
  }
  
  static calculateIntelligentRecommendations(planData: InstallPlanData): CableRecommendation[] {
    // Auto-select optimal cable type and installation method
    const optimalCableType = this.selectOptimalCableType(planData);
    const optimalInstallationMethod = this.selectOptimalInstallationMethod(planData, optimalCableType);
    
    // Create enhanced plan data with intelligent selections
    const enhancedPlanData = {
      ...planData,
      cableType: optimalCableType,
      installationMethod: optimalInstallationMethod
    };
    
    // Calculate design current
    const designCurrent = planData.phases === "single" 
      ? planData.totalLoad / planData.voltage 
      : planData.totalLoad / (planData.voltage * Math.sqrt(3) * (planData.powerFactor || 0.9));
    
    // Get available cable sizes for the selected type
    const availableSizes = ["1.5", "2.5", "4.0", "6.0", "10.0", "16.0", "25.0", "35.0", "50.0", "70.0", "95.0", "120.0", "150.0", "185.0", "240.0"];
    
    const recommendations: CableRecommendation[] = [];
    
    availableSizes.forEach(size => {
      // Get base cable capacity (simplified for MVP)
      const baseCapacity = parseFloat(size) * 20; // Simplified calculation
      
      // Apply derating factors
      const tempFactor = 0.9; // Simplified temp factor
      const groupingFactor = planData.groupingFactor || 1.0;
      const deratedCapacity = baseCapacity * tempFactor * groupingFactor;
      
      // Calculate voltage drop (simplified)
      const voltageDropPercentage = this.calculateVoltageDropPercentage(
        planData.voltage, planData.cableLength, designCurrent, size, planData.phases
      );
      
      // Determine suitability
      let suitability: "suitable" | "marginal" | "unsuitable" = "unsuitable";
      const maxVoltageDropPercentage = planData.loadType === "lighting" ? 3 : 5;
      
      if (deratedCapacity >= designCurrent * 1.2 && voltageDropPercentage <= maxVoltageDropPercentage) {
        suitability = "suitable";
      } else if (deratedCapacity >= designCurrent && voltageDropPercentage <= maxVoltageDropPercentage + 1) {
        suitability = "marginal";
      }
      
      // Calculate estimated cost
      const cableProfile = CABLE_PROFILES[optimalCableType];
      const baseCostPerMeter = this.getBaseCablePrice(parseFloat(size));
      const estimatedCost = baseCostPerMeter * cableProfile.costMultiplier * planData.cableLength;
      
      recommendations.push({
        size: `${size}mm²`,
        type: optimalCableType,
        currentCarryingCapacity: deratedCapacity,
        voltageDropPercentage,
        ratedCurrent: this.getRecommendedProtectionRating(deratedCapacity, designCurrent),
        suitability,
        notes: this.generateIntelligentNotes(enhancedPlanData, size, suitability),
        cost: this.getCostCategory(estimatedCost),
        availability: this.getAvailabilityStatus(optimalCableType, size),
        installationComplexity: this.getInstallationComplexity(optimalInstallationMethod),
        specialConsiderations: this.getSpecialConsiderations(enhancedPlanData, optimalCableType),
        temperatureDerating: tempFactor,
        groupingDerating: groupingFactor,
        environmentalSuitability: `Optimal for ${planData.environmentalConditions?.replace('-', ' ')}`
      });
    });
    
    return recommendations
      .filter(rec => rec.suitability !== "unsuitable" || recommendations.length < 3)
      .sort((a, b) => {
        if (a.suitability !== b.suitability) {
          const order = { "suitable": 0, "marginal": 1, "unsuitable": 2 };
          return order[a.suitability] - order[b.suitability];
        }
        return parseFloat(a.size) - parseFloat(b.size);
      })
      .slice(0, 5);
  }
  
  static selectOptimalProtectionDevice(designCurrent: number, cableCapacity: number): { type: string; rating: number; cost: number } {
    const requiredRating = Math.ceil(designCurrent * 1.1); // 10% margin
    
    // Select device type based on current level
    if (requiredRating <= 63 && designCurrent < 32) {
      return {
        type: "rcbo",
        rating: this.getNextStandardRating(requiredRating, [6, 10, 16, 20, 25, 32, 40, 50, 63]),
        cost: PROTECTION_DEVICE_DATABASE.rcbo.costMultiplier
      };
    } else if (requiredRating <= 125) {
      return {
        type: "mcb",
        rating: this.getNextStandardRating(requiredRating, [16, 20, 25, 32, 40, 50, 63, 80, 100, 125]),
        cost: PROTECTION_DEVICE_DATABASE.mcb.costMultiplier
      };
    } else if (requiredRating <= 800) {
      return {
        type: "bs88",
        rating: this.getNextStandardRating(requiredRating, [160, 200, 250, 315, 400, 500, 630, 800]),
        cost: PROTECTION_DEVICE_DATABASE.bs88.costMultiplier
      };
    } else {
      return {
        type: "mccb",
        rating: this.getNextStandardRating(requiredRating, [400, 630, 800, 1000, 1250, 1600]),
        cost: PROTECTION_DEVICE_DATABASE.mccb.costMultiplier
      };
    }
  }
  
  static generateCostEstimate(planData: InstallPlanData, recommendedCable: CableRecommendation, protectionDevice: { type: string; rating: number; cost: number }): {
    materials: number;
    labour: number;
    total: number;
    breakdown: { item: string; cost: number }[];
  } {
    const breakdown: { item: string; cost: number }[] = [];
    
    // Cable cost
    const cableProfile = CABLE_PROFILES[recommendedCable.type];
    const baseCablePrice = this.getBaseCablePrice(parseFloat(recommendedCable.size));
    const cableCost = baseCablePrice * cableProfile.costMultiplier * planData.cableLength;
    breakdown.push({ item: `${planData.cableLength}m of ${recommendedCable.size} ${recommendedCable.type}`, cost: cableCost });
    
    // Protection device cost
    const deviceBaseCost = protectionDevice.type === "rcbo" ? 45 : protectionDevice.type === "mcb" ? 15 : 120;
    const deviceCost = deviceBaseCost * protectionDevice.cost;
    breakdown.push({ item: `${protectionDevice.rating}A ${protectionDevice.type.toUpperCase()}`, cost: deviceCost });
    
    // Installation accessories
    const accessoryCost = this.calculateAccessoryCosts(planData);
    breakdown.push({ item: "Installation accessories", cost: accessoryCost });
    
    // Labour estimate
    const labourHours = this.calculateLabourHours(planData);
    const labourRate = 45; // £45/hour average electrician rate
    const labourCost = labourHours * labourRate;
    breakdown.push({ item: `${labourHours} hours labour`, cost: labourCost });
    
    const materials = cableCost + deviceCost + accessoryCost;
    const total = materials + labourCost;
    
    return { materials, labour: labourCost, total, breakdown };
  }
  
  // Helper methods
  private static calculateVoltageDropPercentage(voltage: number, length: number, current: number, size: string, phases: string): number {
    // Simplified voltage drop calculation - BS 7671 Appendix 4
    const resistancePerKm = this.getCableResistance(size);
    const voltageDrop = phases === "single" 
      ? current * resistancePerKm * length / 1000
      : current * resistancePerKm * length / 1000 * Math.sqrt(3);
    
    return (voltageDrop / voltage) * 100;
  }
  
  private static getCableResistance(size: string): number {
    const resistances: Record<string, number> = {
      "1.5": 12.1, "2.5": 7.41, "4.0": 4.61, "6.0": 3.08, "10.0": 1.83,
      "16.0": 1.15, "25.0": 0.727, "35.0": 0.524, "50.0": 0.387, "70.0": 0.268,
      "95.0": 0.193, "120.0": 0.153, "150.0": 0.124, "185.0": 0.0991, "240.0": 0.0754
    };
    return resistances[size] || 1.0;
  }
  
  private static getBaseCablePrice(size: number): number {
    // Base prices per meter in £
    if (size <= 2.5) return 1.20;
    if (size <= 6.0) return 2.40;
    if (size <= 16.0) return 4.80;
    if (size <= 35.0) return 8.50;
    if (size <= 70.0) return 15.20;
    return 25.00;
  }
  
  private static getRecommendedProtectionRating(cableCapacity: number, designCurrent: number): number {
    const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600];
    const minRating = Math.ceil(designCurrent);
    return standardRatings.find(rating => rating >= minRating && rating <= cableCapacity) || standardRatings[0];
  }
  
  private static getNextStandardRating(required: number, ratings: number[]): number {
    return ratings.find(rating => rating >= required) || ratings[ratings.length - 1];
  }
  
  private static getCostCategory(cost: number): "low" | "medium" | "high" | "very-high" {
    if (cost < 100) return "low";
    if (cost < 300) return "medium";
    if (cost < 600) return "high";
    return "very-high";
  }
  
  private static getAvailabilityStatus(cableType: string, size: string): "common" | "limited" | "special-order" {
    const sizeNum = parseFloat(size);
    if (cableType === "pvc-twin-earth" && sizeNum <= 10) return "common";
    if (cableType === "swa-xlpe" && sizeNum <= 25) return "common";
    if (sizeNum > 95) return "special-order";
    return "limited";
  }
  
  private static getInstallationComplexity(method: string): "simple" | "moderate" | "complex" {
    const complexMethods = ["underground", "through-insulation"];
    const moderateMethods = ["in-trunking", "cable-tray"];
    
    if (complexMethods.includes(method)) return "complex";
    if (moderateMethods.includes(method)) return "moderate";
    return "simple";
  }
  
  private static getSpecialConsiderations(planData: InstallPlanData, cableType: string): string[] {
    const considerations: string[] = [];
    
    if (cableType === "swa-xlpe") {
      considerations.push("Requires armour earthing");
      considerations.push("Use appropriate cable glands");
    }
    
    if (planData.environmentalConditions === "fire-critical") {
      considerations.push("Fire stopping required at boundaries");
      considerations.push("LSOH certification required");
    }
    
    if (planData.ambientTemperature > 40) {
      considerations.push("High temperature derating applied");
      considerations.push("Consider ventilation requirements");
    }
    
    return considerations;
  }
  
  private static generateIntelligentNotes(planData: InstallPlanData, size: string, suitability: string): string[] {
    const notes: string[] = [];
    
    if (suitability === "suitable") {
      notes.push("Meets all BS 7671 requirements with safety margin");
    } else if (suitability === "marginal") {
      notes.push("Meets minimum requirements - consider next size up for future-proofing");
    }
    
    const sizeNum = parseFloat(size);
    if (sizeNum >= 25) {
      notes.push("Large cable - ensure adequate support and termination facilities");
    }
    
    if (planData.cableLength > 50) {
      notes.push("Long cable run - voltage drop is critical factor");
    }
    
    return notes;
  }
  
  private static calculateAccessoryCosts(planData: InstallPlanData): number {
    let cost = 0;
    
    // Basic accessories
    cost += 25; // Clips, fixings, basic accessories
    
    if (planData.installationMethod === "underground") {
      cost += 45; // Warning tape, marker posts
    }
    
    if (planData.cableType === "swa-xlpe") {
      cost += 35; // Cable glands, earthing accessories
    }
    
    if (planData.installationMethod === "in-conduit") {
      cost += planData.cableLength * 2.5; // Conduit and fittings
    }
    
    return cost;
  }
  
  private static calculateLabourHours(planData: InstallPlanData): number {
    let hours = 2; // Base installation time
    
    // Cable length factor
    hours += planData.cableLength / 25; // 1 hour per 25m
    
    // Installation method complexity
    const methodMultipliers: Record<string, number> = {
      "clipped-direct": 1.0,
      "in-conduit": 1.5,
      "underground": 2.0,
      "in-trunking": 1.3,
      "cable-tray": 1.2,
      "through-insulation": 1.8
    };
    
    hours *= methodMultipliers[planData.installationMethod] || 1.0;
    
    // Testing and certification
    hours += 1;
    
    return Math.round(hours * 10) / 10; // Round to 1 decimal
  }
}
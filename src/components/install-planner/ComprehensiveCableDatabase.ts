// Comprehensive cable database with proper XLPE-LSOH specifications
// BS7671 18th Edition compliant with accurate temperature ratings and performance data

export interface CableSpecification {
  insulationType: 'PVC' | 'XLPE' | 'EPR' | 'MICC';
  sheathType: 'PVC' | 'LSOH' | 'PE' | 'None';
  maxOperatingTemp: number; // °C
  emergencyTemp: number; // °C (overload)
  currentCarryingCapacity: {
    [method: string]: number;
  };
  voltageDropPerMetre: {
    copper: number; // mV/A/m
    aluminium: number; // mV/A/m
  };
  resistance: {
    r1: number; // mΩ/m at 20°C
    r2: number; // mΩ/m at 20°C
    tempCoeff: number; // Temperature coefficient for XLPE vs PVC
  };
  firePerformance: {
    rating: 'Standard' | 'Enhanced' | 'Superior';
    smokeEmission: 'Standard' | 'Low' | 'Zero-Halogen';
    toxicity: 'Standard' | 'Low' | 'Very-Low';
    flameRetardant: boolean;
    circuitIntegrity: number; // minutes at 842°C
  };
  environmentalSuitability: string[];
  applications: string[];
  cost: "low" | "medium" | "high";
  availability: "common" | "limited" | "special-order";
  installationComplexity: "simple" | "moderate" | "complex";
  standardsCompliance: string[];
  maxLength: number;
  minBreaker: number;
  maxBreaker: number;
}

// Enhanced cable database with proper XLPE-LSOH data
export const COMPREHENSIVE_CABLE_DATABASE: Record<string, Record<string, CableSpecification>> = {
  // PVC/PVC Cables (6181Y Type)
  "pvc-pvc": {
    "1.5mm²": {
      insulationType: 'PVC',
      sheathType: 'PVC',
      maxOperatingTemp: 70,
      emergencyTemp: 100,
      currentCarryingCapacity: {
        "clipped-direct": 20,
        "conduit": 17,
        "trunking": 18,
        "ducted": 22,
        "buried-direct": 24,
        "tray": 19
      },
      voltageDropPerMetre: {
        copper: 29,
        aluminium: 47
      },
      resistance: {
        r1: 12.1,
        r2: 12.1,
        tempCoeff: 0.004 // PVC temp coefficient
      },
      firePerformance: {
        rating: 'Standard',
        smokeEmission: 'Standard',
        toxicity: 'Standard',
        flameRetardant: true,
        circuitIntegrity: 0
      },
      environmentalSuitability: ["dry-locations", "moderate-temp"],
      applications: ["general-wiring", "domestic", "commercial-standard"],
      cost: "low",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS 6004", "BS 7671"],
      maxLength: 50,
      minBreaker: 6,
      maxBreaker: 16
    },
    "2.5mm²": {
      insulationType: 'PVC',
      sheathType: 'PVC',
      maxOperatingTemp: 70,
      emergencyTemp: 100,
      currentCarryingCapacity: {
        "clipped-direct": 27,
        "conduit": 23,
        "trunking": 25,
        "ducted": 30,
        "buried-direct": 33,
        "tray": 26
      },
      voltageDropPerMetre: {
        copper: 18,
        aluminium: 29
      },
      resistance: {
        r1: 7.41,
        r2: 7.41,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Standard',
        smokeEmission: 'Standard',
        toxicity: 'Standard',
        flameRetardant: true,
        circuitIntegrity: 0
      },
      environmentalSuitability: ["dry-locations", "moderate-temp"],
      applications: ["general-wiring", "domestic", "commercial-standard"],
      cost: "low",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS 6004", "BS 7671"],
      maxLength: 80,
      minBreaker: 6,
      maxBreaker: 20
    }
  },

  // XLPE/PVC Cables (6491X Type) - 90°C rating
  "xlpe-pvc": {
    "1.5mm²": {
      insulationType: 'XLPE',
      sheathType: 'PVC',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 23, // Higher than PVC due to 90°C rating
        "conduit": 20,
        "trunking": 21,
        "ducted": 25,
        "buried-direct": 28,
        "tray": 22
      },
      voltageDropPerMetre: {
        copper: 29,
        aluminium: 47
      },
      resistance: {
        r1: 12.1,
        r2: 12.1,
        tempCoeff: 0.004 // XLPE has better temp characteristics
      },
      firePerformance: {
        rating: 'Enhanced',
        smokeEmission: 'Standard',
        toxicity: 'Standard',
        flameRetardant: true,
        circuitIntegrity: 0
      },
      environmentalSuitability: ["dry-locations", "high-temp", "harsh-conditions"],
      applications: ["high-temp-environments", "industrial", "commercial-enhanced"],
      cost: "medium",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS 5467", "BS 7671"],
      maxLength: 60,
      minBreaker: 6,
      maxBreaker: 20
    },
    "2.5mm²": {
      insulationType: 'XLPE',
      sheathType: 'PVC',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 31, // Higher than PVC equivalent
        "conduit": 26,
        "trunking": 28,
        "ducted": 34,
        "buried-direct": 38,
        "tray": 30
      },
      voltageDropPerMetre: {
        copper: 18,
        aluminium: 29
      },
      resistance: {
        r1: 7.41,
        r2: 7.41,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Enhanced',
        smokeEmission: 'Standard',
        toxicity: 'Standard',
        flameRetardant: true,
        circuitIntegrity: 0
      },
      environmentalSuitability: ["dry-locations", "high-temp", "harsh-conditions"],
      applications: ["high-temp-environments", "industrial", "commercial-enhanced"],
      cost: "medium",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS 5467", "BS 7671"],
      maxLength: 95,
      minBreaker: 6,
      maxBreaker: 25
    }
  },

  // XLPE/LSOH Cables (6491B Type) - Superior fire performance
  "xlpe-lsoh": {
    "1.5mm²": {
      insulationType: 'XLPE',
      sheathType: 'LSOH',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 23, // Same as XLPE/PVC - insulation is key
        "conduit": 20,
        "trunking": 21,
        "ducted": 25,
        "buried-direct": 28,
        "tray": 22
      },
      voltageDropPerMetre: {
        copper: 29,
        aluminium: 47
      },
      resistance: {
        r1: 12.1,
        r2: 12.1,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Superior',
        smokeEmission: 'Low',
        toxicity: 'Very-Low',
        flameRetardant: true,
        circuitIntegrity: 30 // Enhanced fire survival
      },
      environmentalSuitability: ["escape-routes", "public-areas", "high-occupancy", "healthcare"],
      applications: ["escape-routes", "public-buildings", "healthcare", "education", "high-rise"],
      cost: "high",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS EN 50200", "BS 7671", "IEC 60332"],
      maxLength: 60,
      minBreaker: 6,
      maxBreaker: 20
    },
    "2.5mm²": {
      insulationType: 'XLPE',
      sheathType: 'LSOH',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 31,
        "conduit": 26,
        "trunking": 28,
        "ducted": 34,
        "buried-direct": 38,
        "tray": 30
      },
      voltageDropPerMetre: {
        copper: 18,
        aluminium: 29
      },
      resistance: {
        r1: 7.41,
        r2: 7.41,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Superior',
        smokeEmission: 'Low',
        toxicity: 'Very-Low',
        flameRetardant: true,
        circuitIntegrity: 30
      },
      environmentalSuitability: ["escape-routes", "public-areas", "high-occupancy", "healthcare"],
      applications: ["escape-routes", "public-buildings", "healthcare", "education", "high-rise"],
      cost: "high",
      availability: "common",
      installationComplexity: "simple",
      standardsCompliance: ["BS EN 50200", "BS 7671", "IEC 60332"],
      maxLength: 95,
      minBreaker: 6,
      maxBreaker: 25
    },
    "4.0mm²": {
      insulationType: 'XLPE',
      sheathType: 'LSOH',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 42, // Higher than PVC equivalent
        "conduit": 34,
        "trunking": 37,
        "ducted": 45,
        "buried-direct": 51,
        "tray": 40
      },
      voltageDropPerMetre: {
        copper: 11,
        aluminium: 18
      },
      resistance: {
        r1: 4.61,
        r2: 4.61,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Superior',
        smokeEmission: 'Low',
        toxicity: 'Very-Low',
        flameRetardant: true,
        circuitIntegrity: 30
      },
      environmentalSuitability: ["escape-routes", "public-areas", "high-occupancy", "healthcare"],
      applications: ["escape-routes", "public-buildings", "healthcare", "education", "high-rise"],
      cost: "high",
      availability: "common",
      installationComplexity: "moderate",
      standardsCompliance: ["BS EN 50200", "BS 7671", "IEC 60332"],
      maxLength: 140,
      minBreaker: 10,
      maxBreaker: 35
    }
  },

  // SWA LSOH Cables - Armoured with fire performance
  "swa-lsoh": {
    "2.5mm²": {
      insulationType: 'XLPE',
      sheathType: 'LSOH',
      maxOperatingTemp: 90,
      emergencyTemp: 250,
      currentCarryingCapacity: {
        "clipped-direct": 33,
        "conduit": 28,
        "trunking": 30,
        "ducted": 36,
        "buried-direct": 42,
        "tray": 32
      },
      voltageDropPerMetre: {
        copper: 18,
        aluminium: 29
      },
      resistance: {
        r1: 7.41,
        r2: 7.41,
        tempCoeff: 0.004
      },
      firePerformance: {
        rating: 'Superior',
        smokeEmission: 'Low',
        toxicity: 'Very-Low',
        flameRetardant: true,
        circuitIntegrity: 60 // Enhanced with armour
      },
      environmentalSuitability: ["outdoor", "underground", "mechanical-protection", "escape-routes"],
      applications: ["external-wiring", "underground-feeds", "industrial-harsh", "escape-routes"],
      cost: "high",
      availability: "common",
      installationComplexity: "complex",
      standardsCompliance: ["BS 5467", "BS EN 50200", "BS 7671"],
      maxLength: 100,
      minBreaker: 6,
      maxBreaker: 25
    }
  }
};

// Get cable specification for a given type and size
export function getCableSpecification(cableType: string, size: string): CableSpecification | null {
  const typeDatabase = COMPREHENSIVE_CABLE_DATABASE[cableType];
  if (!typeDatabase) return null;
  
  return typeDatabase[size] || null;
}

// Get all available sizes for a cable type
export function getAvailableSizes(cableType: string): string[] {
  const typeDatabase = COMPREHENSIVE_CABLE_DATABASE[cableType];
  if (!typeDatabase) return [];
  
  return Object.keys(typeDatabase);
}

// Get fire performance requirements for different applications
export function getFirePerformanceRequirements(application: string): {
  minRating: string;
  smokeEmission: string;
  circuitIntegrity: number;
} {
  const requirements = {
    "escape-routes": {
      minRating: 'Superior',
      smokeEmission: 'Low',
      circuitIntegrity: 30
    },
    "public-buildings": {
      minRating: 'Superior',
      smokeEmission: 'Low',
      circuitIntegrity: 30
    },
    "healthcare": {
      minRating: 'Superior',
      smokeEmission: 'Low',
      circuitIntegrity: 60
    },
    "high-rise": {
      minRating: 'Superior',
      smokeEmission: 'Low',
      circuitIntegrity: 90
    },
    "general": {
      minRating: 'Standard',
      smokeEmission: 'Standard',
      circuitIntegrity: 0
    }
  };
  
  return requirements[application] || requirements["general"];
}

// Check if cable meets fire performance requirements
export function checkFireCompliance(
  cableSpec: CableSpecification, 
  application: string
): { compliant: boolean; recommendations: string[] } {
  const requirements = getFirePerformanceRequirements(application);
  const recommendations: string[] = [];
  
  let compliant = true;
  
  if (cableSpec.firePerformance.rating === 'Standard' && requirements.minRating !== 'Standard') {
    compliant = false;
    recommendations.push(`Upgrade to ${requirements.minRating} fire performance cable for ${application}`);
  }
  
  if (cableSpec.firePerformance.smokeEmission === 'Standard' && requirements.smokeEmission !== 'Standard') {
    compliant = false;
    recommendations.push(`Use LSOH sheathed cable to reduce smoke emission in ${application}`);
  }
  
  if (cableSpec.firePerformance.circuitIntegrity < requirements.circuitIntegrity) {
    compliant = false;
    recommendations.push(`Use FP cable with ${requirements.circuitIntegrity}min circuit integrity for ${application}`);
  }
  
  if (compliant) {
    recommendations.push(`✅ Cable meets fire performance requirements for ${application}`);
  }
  
  return { compliant, recommendations };
}
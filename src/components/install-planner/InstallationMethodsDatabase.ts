// Enhanced Installation Methods Database - Professional BS7671 Compliant

export interface InstallationMethodSpec {
  name: string;
  description: string;
  category: "internal" | "external" | "underground" | "industrial";
  groupingFactor: number; // Default grouping factor
  temperatureRating: "standard" | "enhanced"; // Temperature considerations
  mechanicalProtection: "low" | "medium" | "high";
  applications: string[];
  considerations: string[];
  maxCableSize?: number; // mm² limitation if applicable
  specialRequirements?: string[];
}

export const INSTALLATION_METHODS_DATABASE: Record<string, InstallationMethodSpec> = {
  // Internal Installation Methods
  "clipped-direct": {
    name: "Clipped Direct to Surface",
    description: "Cable clipped directly to walls or structural surfaces",
    category: "internal",
    groupingFactor: 1.0,
    temperatureRating: "standard",
    mechanicalProtection: "low",
    applications: ["Domestic installations", "Commercial lighting", "Distribution circuits"],
    considerations: [
      "Ensure adequate spacing between cables",
      "Use appropriate cable clips for cable weight",
      "Consider aesthetic impact in finished areas"
    ],
    specialRequirements: ["Minimum 20mm spacing for grouped circuits"]
  },

  "in-conduit": {
    name: "Enclosed in Conduit/Trunking",
    description: "Cable installed within protective conduit or trunking systems",
    category: "internal",
    groupingFactor: 0.8,
    temperatureRating: "standard",
    mechanicalProtection: "high",
    applications: ["Commercial installations", "Industrial wiring", "Retrofit projects"],
    considerations: [
      "40% fill factor for single cables, 31% for multiple",
      "Adequate draw-in facilities required",
      "Consider thermal effects in enclosed spaces"
    ],
    specialRequirements: ["Conduit sizing calculations required", "Draw wire provision"]
  },

  "in-trunking": {
    name: "Enclosed in Cable Trunking",
    description: "Cable laid in ventilated or non-ventilated trunking",
    category: "internal",
    groupingFactor: 0.85,
    temperatureRating: "standard",
    mechanicalProtection: "high",
    applications: ["Office buildings", "Retail installations", "Educational facilities"],
    considerations: [
      "Maintain separation between power and data cables",
      "Ensure adequate trunking capacity for future circuits",
      "Regular access points for inspection"
    ],
    specialRequirements: ["Fire stopping at compartment boundaries"]
  },

  "through-insulation": {
    name: "Surrounded by Thermal Insulation",
    description: "Cable installed through or surrounded by thermal insulation",
    category: "internal",
    groupingFactor: 0.65,
    temperatureRating: "enhanced",
    mechanicalProtection: "medium",
    applications: ["Loft spaces", "Cavity walls", "Insulated roof spaces"],
    considerations: [
      "Significant derating required due to heat buildup",
      "Consider alternative routing to avoid insulation",
      "Fire performance of insulation materials"
    ],
    specialRequirements: ["Enhanced fire rating may be required"]
  },

  // External Installation Methods
  "cable-tray": {
    name: "Cable Tray Installation",
    description: "Cable laid on perforated or ladder-type cable trays",
    category: "external",
    groupingFactor: 0.9,
    temperatureRating: "standard",
    mechanicalProtection: "medium",
    applications: ["Industrial installations", "Plant rooms", "External distribution"],
    considerations: [
      "Adequate spacing between cable layers",
      "Weather protection for external installations",
      "Earthing continuity of metallic trays"
    ],
    specialRequirements: ["Tray support calculations", "Segregation requirements"]
  },

  "ladder-rack": {
    name: "Ladder Rack System",
    description: "Cable support on industrial ladder rack systems",
    category: "industrial",
    groupingFactor: 0.95,
    temperatureRating: "standard",
    mechanicalProtection: "medium",
    applications: ["Heavy industrial", "Power stations", "Large commercial"],
    considerations: [
      "Excellent ventilation characteristics",
      "High load capacity for heavy cables",
      "Easy access for maintenance"
    ],
    specialRequirements: ["Structural load calculations", "Seismic considerations"]
  },

  "free-air": {
    name: "Free Air Installation",
    description: "Cable installed in open air with natural ventilation",
    category: "external",
    groupingFactor: 1.0,
    temperatureRating: "standard",
    mechanicalProtection: "low",
    applications: ["Overhead lines", "External catenary systems", "Open installations"],
    considerations: [
      "Weather resistance essential",
      "UV degradation protection",
      "Wind loading on supports"
    ],
    specialRequirements: ["Weather protection", "UV-resistant outer sheath"]
  },

  // Underground Installation Methods
  "underground": {
    name: "Direct Buried Underground",
    description: "Cable buried directly in ground with protective bedding",
    category: "underground",
    groupingFactor: 1.0,
    temperatureRating: "enhanced",
    mechanicalProtection: "high",
    applications: ["Distribution networks", "Garden supplies", "Street lighting"],
    considerations: [
      "Minimum burial depth 450mm (LV)",
      "Sand bedding and protective covering",
      "Warning tape 300mm above cable"
    ],
    specialRequirements: ["Mechanical protection", "Route marking", "Permit to dig"]
  },

  "enclosed-trench": {
    name: "Enclosed Cable Trench",
    description: "Cable installed in covered concrete or masonry trenches",
    category: "underground",
    groupingFactor: 0.9,
    temperatureRating: "standard",
    mechanicalProtection: "high",
    applications: ["Industrial sites", "Major distribution", "Urban areas"],
    considerations: [
      "Drainage provisions essential",
      "Access for maintenance",
      "Fire stopping between compartments"
    ],
    specialRequirements: ["Drainage design", "Access chamber provision"]
  },

  "cable-tunnel": {
    name: "Cable Tunnel System",
    description: "Cable installed in purpose-built tunnel infrastructure",
    category: "underground",
    groupingFactor: 0.85,
    temperatureRating: "standard",
    mechanicalProtection: "high",
    applications: ["Major infrastructure", "City centres", "Industrial complexes"],
    considerations: [
      "Ventilation systems required",
      "Emergency access provisions",
      "Fire detection and suppression"
    ],
    specialRequirements: ["Emergency procedures", "Confined space entry"]
  }
};

export function getInstallationMethod(method: string): InstallationMethodSpec | null {
  return INSTALLATION_METHODS_DATABASE[method] || null;
}

export function getMethodsByCategory(category: "internal" | "external" | "underground" | "industrial"): InstallationMethodSpec[] {
  return Object.values(INSTALLATION_METHODS_DATABASE).filter(method => method.category === category);
}

export function getAllInstallationMethods(): string[] {
  return Object.keys(INSTALLATION_METHODS_DATABASE);
}

// Enhanced environmental factors for advanced calculations
export interface EnvironmentalFactors {
  ambientTemperature: number;
  soilThermalResistivity?: number; // K⋅m/W for underground cables
  groupingCircuits: number;
  seismicConsiderations: boolean;
  corrosiveAtmosphere: "C1" | "C2" | "C3" | "C4" | "C5" | "none";
  fireCompartmentBoundary: boolean;
  rodentProtection: boolean;
  uvExposure: boolean;
}

export const ENVIRONMENTAL_FACTORS = {
  // Soil thermal resistivity values
  SOIL_THERMAL_RESISTIVITY: {
    wet: 1.0,
    moist: 1.5,
    dry: 2.5,
    "very-dry": 3.5
  },
  
  // Corrosive atmosphere classifications
  CORROSIVE_ATMOSPHERE: {
    C1: "Very low corrosivity (heated buildings)",
    C2: "Low corrosivity (unheated buildings, rural areas)",
    C3: "Medium corrosivity (urban/industrial areas)",
    C4: "High corrosivity (coastal areas, chemical plants)",
    C5: "Very high corrosivity (extreme industrial/marine)"
  },
  
  // Temperature correction factors for different installation methods
  TEMPERATURE_FACTORS: {
    air: {
      range: { min: -10, max: 80, standard: 30 },
      factors: {
        20: 1.12,
        25: 1.06,
        30: 1.00,
        35: 0.94,
        40: 0.87,
        45: 0.79,
        50: 0.71,
        55: 0.61,
        60: 0.50
      }
    },
    soil: {
      range: { min: 5, max: 65, standard: 20 },
      factors: {
        10: 1.10,
        15: 1.05,
        20: 1.00,
        25: 0.95,
        30: 0.89,
        35: 0.84,
        40: 0.77,
        45: 0.71,
        50: 0.63
      }
    }
  }
};
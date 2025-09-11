import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

export interface CircuitTemplate {
  name: string;
  totalLoad: number;
  voltage: number;
  phases: "single" | "three" | "dc";
  cableLength: number;
  powerFactor?: number;
  recommendedInstallationMethod: string;
  recommendedCableType: string;
  recommendedProtectiveDevice: string;
  description: string;
  typicalApplications: string[];
}

// Bulletproof circuit templates - only use supported cable types and installation methods
export const SIMPLIFIED_CIRCUIT_TEMPLATES: Record<string, CircuitTemplate> = {
  // DOMESTIC CIRCUITS - bulletproof selection
  "lighting": {
    name: "Lighting Circuit",
    totalLoad: 1200,
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "mcb",
    description: "Standard domestic lighting circuit",
    typicalApplications: ["LED downlights", "Ceiling lights", "Wall lights", "Switches"]
  },
  
  "power": {
    name: "Power Circuit (Ring)",
    totalLoad: 7200,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "rcbo",
    description: "13A socket outlet ring circuit",
    typicalApplications: ["13A socket outlets", "General purpose outlets", "Kitchen appliances"]
  },
  
  "power-radial": {
    name: "Power Circuit (Radial)",
    totalLoad: 4600,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "rcbo",
    description: "20A radial socket circuit",
    typicalApplications: ["Kitchen appliances", "Utility rooms", "Garage sockets"]
  },

  "cooker": {
    name: "Cooker Circuit",
    totalLoad: 8500,
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "mcb",
    description: "Electric cooker dedicated circuit",
    typicalApplications: ["Electric cookers", "Hobs", "Built-in ovens"]
  },

  "shower": {
    name: "Electric Shower",
    totalLoad: 9500,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "rcbo",
    description: "Electric shower dedicated circuit",
    typicalApplications: ["Electric showers", "Instantaneous water heaters"]
  },

  "heating": {
    name: "Heating Circuit",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "pvc-twin-earth",
    recommendedProtectiveDevice: "mcb",
    description: "Electric heating circuit",
    typicalApplications: ["Electric radiators", "UFH", "Storage heaters"]
  },

  "ev-charging": {
    name: "EV Charging Point",
    totalLoad: 7400,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    recommendedInstallationMethod: "underground-direct",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "rcbo",
    description: "Electric vehicle charging point",
    typicalApplications: ["Home EV chargers", "Workplace charging"]
  },

  "heat-pump": {
    name: "Air Source Heat Pump",
    totalLoad: 6000,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    powerFactor: 0.9,
    recommendedInstallationMethod: "underground-direct",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "rcbo",
    description: "Air source heat pump system",
    typicalApplications: ["ASHP units", "Ground source pumps", "Heating controls"]
  },

  // COMMERCIAL CIRCUITS - reliable templates
  "commercial-lighting": {
    name: "Commercial Lighting",
    totalLoad: 2500,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "in-conduit",
    recommendedCableType: "xlpe-lsoh",
    recommendedProtectiveDevice: "mcb",
    description: "Commercial lighting installation",
    typicalApplications: ["Office lighting", "Retail lighting", "Emergency lighting"]
  },

  "commercial-power": {
    name: "Commercial Power",
    totalLoad: 5000,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "in-conduit",
    recommendedCableType: "xlpe-lsoh",
    recommendedProtectiveDevice: "rcbo",
    description: "Commercial power circuit",
    typicalApplications: ["Office equipment", "Commercial kitchens", "Workshop tools"]
  },

  "hvac": {
    name: "HVAC System",
    totalLoad: 12000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.85,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "HVAC system power supply",
    typicalApplications: ["Air conditioning", "Ventilation fans", "Heat pumps"]
  },

  "it-equipment": {
    name: "IT Equipment",
    totalLoad: 4000,
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "in-conduit",
    recommendedCableType: "xlpe-lsoh",
    recommendedProtectiveDevice: "rcbo",
    description: "IT equipment power supply",
    typicalApplications: ["Server rooms", "Network equipment", "UPS systems"]
  },

  "emergency": {
    name: "Emergency Systems",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "in-conduit",
    recommendedCableType: "micc",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency lighting and systems",
    typicalApplications: ["Emergency lighting", "Fire alarm systems", "Security systems"]
  },

  // INDUSTRIAL CIRCUITS - proven templates
  "motor-small": {
    name: "Small Motor Load",
    totalLoad: 5500,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.85,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "Small industrial motor",
    typicalApplications: ["Pumps", "Fans", "Conveyors", "Small machinery"]
  },

  "motor-large": {
    name: "Large Motor Load",
    totalLoad: 22000,
    voltage: 400,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.85,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "Large industrial motor",
    typicalApplications: ["Large pumps", "Compressors", "Industrial machinery"]
  },

  "welding": {
    name: "Welding Equipment",
    totalLoad: 15000,
    voltage: 400,
    phases: "three",
    cableLength: 25,
    powerFactor: 0.75,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "Industrial welding station",
    typicalApplications: ["Arc welding", "MIG welding", "Industrial fabrication"]
  },

  "industrial-hvac": {
    name: "Industrial HVAC",
    totalLoad: 25000,
    voltage: 400,
    phases: "three",
    cableLength: 60,
    powerFactor: 0.85,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "Industrial HVAC system",
    typicalApplications: ["Factory ventilation", "Process cooling", "Air handling units"]
  },

  "distribution": {
    name: "Distribution Board",
    totalLoad: 50000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.9,
    recommendedInstallationMethod: "in-cable-tray",
    recommendedCableType: "swa-xlpe",
    recommendedProtectiveDevice: "mcb",
    description: "Sub-distribution board feed",
    typicalApplications: ["Sub-distribution", "Panel boards", "Load centres"]
  }
};

// Load type categories for UI filtering
export const LOAD_TYPE_CATEGORIES = {
  domestic: [
    "lighting", "power", "power-radial", "cooker", "shower", "heating", "ev-charging", "heat-pump"
  ],
  commercial: [
    "commercial-lighting", "commercial-power", "hvac", "it-equipment", "emergency"
  ],
  industrial: [
    "motor-small", "motor-large", "welding", "industrial-hvac", "distribution"
  ]
};

// Get simplified load type options based on installation type
export function getSimplifiedLoadTypeOptions(installationType?: string): Array<{value: string, label: string}> {
  const categoryMap = {
    "domestic": LOAD_TYPE_CATEGORIES.domestic,
    "commercial": LOAD_TYPE_CATEGORIES.commercial,
    "industrial": LOAD_TYPE_CATEGORIES.industrial
  };

  const loadTypes = categoryMap[installationType as keyof typeof categoryMap] || [
    ...LOAD_TYPE_CATEGORIES.domestic,
    ...LOAD_TYPE_CATEGORIES.commercial,
    ...LOAD_TYPE_CATEGORIES.industrial
  ];

  return loadTypes.map(type => ({
    value: type,
    label: SIMPLIFIED_CIRCUIT_TEMPLATES[type]?.name || type
  }));
}

// Validate that a load type is supported
export function isLoadTypeSupported(loadType: string): boolean {
  return Object.keys(SIMPLIFIED_CIRCUIT_TEMPLATES).includes(loadType);
}

// Get cable type validation for load type
export function getCableTypeValidation(loadType: string, cableType: string): {
  isValid: boolean;
  reason?: string;
  confidence: number;
} {
  const template = SIMPLIFIED_CIRCUIT_TEMPLATES[loadType];
  if (!template) {
    return { isValid: false, reason: "Load type not supported", confidence: 0 };
  }

  const recommendedCable = template.recommendedCableType;
  if (cableType === recommendedCable) {
    return { isValid: true, confidence: 100 };
  }

  // Check if cable type is in our simplified database
  const supportedCables = ["pvc-twin-earth", "xlpe-lsoh", "swa-xlpe", "micc"];
  if (!supportedCables.includes(cableType)) {
    return { isValid: false, reason: "Cable type not in simplified database", confidence: 0 };
  }

  // Partial support - different cable but still valid
  return { isValid: true, reason: "Different cable selected", confidence: 70 };
}
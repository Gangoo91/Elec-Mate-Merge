
import { Circuit } from "./types";
import { v4 as uuidv4 } from "uuid";

export interface CircuitTemplate {
  name: string;
  totalLoad: number;
  voltage: number;
  phases: "single" | "three";
  cableLength: number;
  powerFactor?: number;
  recommendedInstallationMethod: string;
  recommendedCableType: string;
  recommendedProtectiveDevice: string;
  description: string;
  typicalApplications: string[];
}

export const CIRCUIT_TEMPLATES: Record<string, CircuitTemplate> = {
  // Domestic circuits
  lighting: {
    name: "Lighting Circuit",
    totalLoad: 1200, // Typical domestic lighting load
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "mcb",
    description: "Standard domestic lighting circuit",
    typicalApplications: ["LED downlights", "Ceiling lights", "Wall lights", "Switches"]
  },
  
  power: {
    name: "Power Circuit (Ring)",
    totalLoad: 7200, // 32A ring circuit at 230V
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "rcbo",
    description: "13A socket outlet ring circuit",
    typicalApplications: ["13A socket outlets", "General purpose outlets", "Kitchen appliances"]
  },
  
  "power-radial": {
    name: "Power Circuit (Radial)",
    totalLoad: 4600, // 20A radial circuit
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "rcbo",
    description: "20A radial socket circuit",
    typicalApplications: ["Kitchen appliances", "Utility rooms", "Garage sockets"]
  },

  cooker: {
    name: "Cooker Circuit",
    totalLoad: 8500, // Typical electric cooker
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "mcb",
    description: "Electric cooker dedicated circuit",
    typicalApplications: ["Electric cookers", "Hobs", "Built-in ovens"]
  },

  shower: {
    name: "Electric Shower",
    totalLoad: 9500, // High-power electric shower
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "rcbo",
    description: "Electric shower dedicated circuit",
    typicalApplications: ["Electric showers", "Instantaneous water heaters"]
  },

  heating: {
    name: "Heating Circuit",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "mcb",
    description: "Electric heating circuit",
    typicalApplications: ["Electric radiators", "UFH", "Storage heaters"]
  },

  "ev-charging": {
    name: "EV Charging Point",
    totalLoad: 7400, // 32A EV charger
    voltage: 230,
    phases: "single",
    cableLength: 25,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Electric vehicle charging point",
    typicalApplications: ["Home EV chargers", "Workplace charging"]
  },

  // Commercial circuits
  "commercial-lighting": {
    name: "Commercial Lighting",
    totalLoad: 2500,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
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
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Commercial power circuit",
    typicalApplications: ["Office equipment", "Commercial kitchens", "Workshop tools"]
  },

  hvac: {
    name: "HVAC System",
    totalLoad: 12000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
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
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "IT equipment power supply",
    typicalApplications: ["Server rooms", "Network equipment", "UPS systems"]
  },

  emergency: {
    name: "Emergency Systems",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency lighting and systems",
    typicalApplications: ["Emergency lighting", "Fire alarm systems", "Security systems"]
  },

  // Industrial circuits
  "motor-small": {
    name: "Small Motor Load",
    totalLoad: 5500, // 7.5HP motor
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Small industrial motor",
    typicalApplications: ["Pumps", "Fans", "Conveyors", "Small machinery"]
  },

  "motor-large": {
    name: "Large Motor Load",
    totalLoad: 22000, // 30HP motor
    voltage: 400,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Large industrial motor",
    typicalApplications: ["Large pumps", "Compressors", "Industrial machinery"]
  },

  welding: {
    name: "Welding Equipment",
    totalLoad: 15000,
    voltage: 400,
    phases: "three",
    cableLength: 25,
    powerFactor: 0.75,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Industrial welding station",
    typicalApplications: ["Arc welding", "MIG welding", "Industrial fabrication"]
  },

  crane: {
    name: "Crane & Hoist",
    totalLoad: 35000,
    voltage: 400,
    phases: "three",
    cableLength: 100,
    powerFactor: 0.80,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Overhead crane power supply",
    typicalApplications: ["Overhead cranes", "Hoists", "Material handling"]
  },

  furnace: {
    name: "Industrial Furnace",
    totalLoad: 75000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.95,
    recommendedInstallationMethod: "ducted",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "High-temperature industrial furnace",
    typicalApplications: ["Electric furnaces", "Kilns", "Heat treatment"]
  },

  medical: {
    name: "Medical Equipment",
    totalLoad: 8000,
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "rcbo",
    description: "Critical medical equipment supply",
    typicalApplications: ["Medical imaging", "Life support", "Surgical equipment"]
  }
};

export function createCircuitFromTemplate(templateKey: string, installationType: string): Circuit {
  const template = CIRCUIT_TEMPLATES[templateKey];
  if (!template) {
    throw new Error(`Circuit template '${templateKey}' not found`);
  }

  // Adjust installation method and cable type based on installation type
  let installationMethod = template.recommendedInstallationMethod;
  let cableType = template.recommendedCableType;

  if (installationType === "domestic") {
    installationMethod = installationMethod === "tray" ? "clipped-direct" : installationMethod;
    cableType = "t&e";
  } else if (installationType === "industrial") {
    installationMethod = installationMethod === "clipped-direct" ? "tray" : installationMethod;
    cableType = "swa";
  }

  return {
    id: uuidv4(),
    name: template.name,
    loadType: templateKey,
    totalLoad: template.totalLoad,
    voltage: template.voltage,
    phases: template.phases,
    powerFactor: template.powerFactor,
    cableLength: template.cableLength,
    installationMethod,
    cableType,
    protectiveDevice: template.recommendedProtectiveDevice,
    enabled: true
  };
}

export function getAvailableTemplatesForInstallationType(installationType: string): string[] {
  switch (installationType) {
    case "domestic":
      return ["lighting", "power", "power-radial", "cooker", "shower", "heating", "ev-charging"];
    case "commercial":
      return ["commercial-lighting", "commercial-power", "hvac", "it-equipment", "emergency", "power"];
    case "industrial":
      return ["motor-small", "motor-large", "welding", "crane", "furnace", "hvac", "emergency"];
    default:
      return ["lighting", "power"];
  }
}

export function getTemplateDescription(templateKey: string): string {
  return CIRCUIT_TEMPLATES[templateKey]?.description || "Circuit template";
}

export function getTemplateApplications(templateKey: string): string[] {
  return CIRCUIT_TEMPLATES[templateKey]?.typicalApplications || [];
}

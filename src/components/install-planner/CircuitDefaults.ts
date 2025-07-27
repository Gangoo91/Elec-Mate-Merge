
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

export const CIRCUIT_TEMPLATES: Record<string, CircuitTemplate> = {
  // Domestic circuits
  lighting: {
    name: "Lighting Circuit",
    totalLoad: 1200,
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
    totalLoad: 7200,
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
    totalLoad: 4600,
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
    totalLoad: 8500,
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
    totalLoad: 9500,
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
    totalLoad: 7400,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Electric vehicle charging point",
    typicalApplications: ["Home EV chargers", "Workplace charging"]
  },

  "smart-home": {
    name: "Smart Home Automation",
    totalLoad: 500,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "cat6",
    recommendedProtectiveDevice: "mcb",
    description: "Smart home control systems",
    typicalApplications: ["Smart switches", "Home automation hubs", "IoT devices"]
  },

  "renewable-solar": {
    name: "Solar PV Installation",
    totalLoad: 4000,
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "solar-dc",
    recommendedProtectiveDevice: "dc-isolator",
    description: "Solar photovoltaic system",
    typicalApplications: ["Solar panels", "String inverters", "DC isolators"]
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
    totalLoad: 5500,
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
    totalLoad: 22000,
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
  },

  // Data Center circuits
  "ups-system": {
    name: "UPS System",
    totalLoad: 50000,
    voltage: 400,
    phases: "three",
    cableLength: 20,
    powerFactor: 0.95,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Uninterruptible power supply system",
    typicalApplications: ["Data center UPS", "Server power backup", "Critical load protection"]
  },

  "server-rack": {
    name: "Server Rack Power",
    totalLoad: 8000,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Server rack power distribution",
    typicalApplications: ["Server racks", "Network cabinets", "PDU connections"]
  },

  "cooling-system": {
    name: "Data Center Cooling",
    totalLoad: 25000,
    voltage: 400,
    phases: "three",
    cableLength: 35,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Data center cooling system",
    typicalApplications: ["CRAC units", "Chilled water pumps", "Cooling towers"]
  },

  "backup-generator": {
    name: "Backup Generator",
    totalLoad: 100000,
    voltage: 400,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.8,
    recommendedInstallationMethod: "ducted",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency backup generator",
    typicalApplications: ["Diesel generators", "Transfer switches", "Load banks"]
  },

  // Education circuits
  "classroom-power": {
    name: "Classroom Power",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Educational facility power",
    typicalApplications: ["Classroom sockets", "Interactive whiteboards", "AV equipment"]
  },

  "lab-equipment": {
    name: "Laboratory Equipment",
    totalLoad: 6000,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Science laboratory power",
    typicalApplications: ["Lab equipment", "Fume cupboards", "Emergency showers"]
  },

  "sports-lighting": {
    name: "Sports Hall Lighting",
    totalLoad: 8000,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Sports facility lighting",
    typicalApplications: ["Sports hall lighting", "Emergency lighting", "Score boards"]
  },

  // Hospitality circuits
  "kitchen-equipment": {
    name: "Commercial Kitchen",
    totalLoad: 15000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.9,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Commercial kitchen equipment",
    typicalApplications: ["Commercial ovens", "Dishwashers", "Extraction fans"]
  },

  "guest-room": {
    name: "Hotel Guest Room",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 35,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "t&e",
    recommendedProtectiveDevice: "rcbo",
    description: "Hotel guest room power",
    typicalApplications: ["Room sockets", "Bathroom heating", "Mini fridges"]
  },

  "laundry-equipment": {
    name: "Laundry Equipment",
    totalLoad: 12000,
    voltage: 400,
    phases: "three",
    cableLength: 25,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Commercial laundry equipment",
    typicalApplications: ["Industrial washers", "Tumble dryers", "Ironing equipment"]
  },

  // Retail circuits
  "retail-lighting": {
    name: "Retail Display Lighting",
    totalLoad: 4000,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Retail display and general lighting",
    typicalApplications: ["Display lighting", "Track lighting", "Shop front lighting"]
  },

  "pos-systems": {
    name: "Point of Sale Systems",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Point of sale and payment systems",
    typicalApplications: ["Till systems", "Card readers", "Receipt printers"]
  },

  "cold-storage": {
    name: "Cold Storage/Refrigeration",
    totalLoad: 8000,
    voltage: 400,
    phases: "three",
    cableLength: 20,
    powerFactor: 0.8,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Refrigeration and cold storage",
    typicalApplications: ["Walk-in freezers", "Display chillers", "Cold rooms"]
  },

  // Agriculture circuits
  "irrigation-pump": {
    name: "Irrigation Pump",
    totalLoad: 10000,
    voltage: 400,
    phases: "three",
    cableLength: 100,
    powerFactor: 0.85,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Agricultural irrigation pump",
    typicalApplications: ["Water pumps", "Irrigation systems", "Sprinkler controls"]
  },

  "grain-dryer": {
    name: "Grain Drying Equipment",
    totalLoad: 20000,
    voltage: 400,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.9,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Grain drying and storage equipment",
    typicalApplications: ["Grain dryers", "Conveyor belts", "Storage fans"]
  },

  "livestock-equipment": {
    name: "Livestock Equipment",
    totalLoad: 5000,
    voltage: 230,
    phases: "single",
    cableLength: 75,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Livestock management equipment",
    typicalApplications: ["Milking equipment", "Feed systems", "Water heaters"]
  },

  // Transportation circuits
  "charging-station": {
    name: "EV Charging Station",
    totalLoad: 22000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    recommendedInstallationMethod: "ducted",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Public EV charging station",
    typicalApplications: ["Fast chargers", "Rapid chargers", "Payment systems"]
  },

  "platform-lighting": {
    name: "Platform Lighting",
    totalLoad: 6000,
    voltage: 230,
    phases: "single",
    cableLength: 200,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Transport platform lighting",
    typicalApplications: ["Railway platforms", "Bus stations", "Airport terminals"]
  },

  "signal-systems": {
    name: "Traffic Signal Systems",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 150,
    recommendedInstallationMethod: "ducted",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Traffic control systems",
    typicalApplications: ["Traffic lights", "Crossing signals", "Variable signs"]
  },

  // Sports/Entertainment circuits
  "floodlighting": {
    name: "Sports Floodlighting",
    totalLoad: 25000,
    voltage: 400,
    phases: "three",
    cableLength: 100,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Sports venue floodlighting",
    typicalApplications: ["Football stadiums", "Tennis courts", "Athletic tracks"]
  },

  "sound-system": {
    name: "Audio/Visual Systems",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Entertainment audio/visual systems",
    typicalApplications: ["PA systems", "Video screens", "Lighting rigs"]
  },

  "scoreboard": {
    name: "Electronic Scoreboard",
    totalLoad: 4000,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Electronic scoreboard and displays",
    typicalApplications: ["LED scoreboards", "Digital displays", "Timing systems"]
  },

  // Laboratory circuits
  "fume-cupboard": {
    name: "Fume Cupboard",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Laboratory fume extraction",
    typicalApplications: ["Fume cupboards", "Extract fans", "Safety systems"]
  },

  "analytical-equipment": {
    name: "Analytical Equipment",
    totalLoad: 5000,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Precision analytical instruments",
    typicalApplications: ["Spectrometers", "Chromatographs", "Microscopes"]
  },

  "clean-room": {
    name: "Clean Room Systems",
    totalLoad: 8000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.9,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Clean room environmental control",
    typicalApplications: ["HEPA filtration", "Laminar flow", "Environmental monitoring"]
  },

  // Marine/Offshore circuits
  "marine-power": {
    name: "Marine Power System",
    totalLoad: 15000,
    voltage: 440,
    phases: "three",
    cableLength: 60,
    powerFactor: 0.85,
    recommendedInstallationMethod: "marine-tray",
    recommendedCableType: "marine-cable",
    recommendedProtectiveDevice: "marine-mcb",
    description: "Marine vessel power distribution",
    typicalApplications: ["Ship systems", "Offshore platforms", "Port facilities"]
  },

  "navigation-equipment": {
    name: "Navigation Equipment",
    totalLoad: 2000,
    voltage: 24,
    phases: "dc",
    cableLength: 30,
    recommendedInstallationMethod: "marine-conduit",
    recommendedCableType: "marine-cable",
    recommendedProtectiveDevice: "dc-breaker",
    description: "Marine navigation systems",
    typicalApplications: ["GPS systems", "Radar", "Communication equipment"]
  },

  "winch-system": {
    name: "Winch System",
    totalLoad: 30000,
    voltage: 440,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.8,
    recommendedInstallationMethod: "marine-tray",
    recommendedCableType: "marine-cable",
    recommendedProtectiveDevice: "marine-mcb",
    description: "Marine winch and lifting equipment",
    typicalApplications: ["Anchor winches", "Cargo cranes", "Mooring equipment"]
  },

  // Mining circuits
  "conveyor-belt": {
    name: "Conveyor Belt System",
    totalLoad: 40000,
    voltage: 400,
    phases: "three",
    cableLength: 200,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "mining-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Mining conveyor systems",
    typicalApplications: ["Ore conveyors", "Coal handling", "Material transport"]
  },

  "ventilation-fan": {
    name: "Mine Ventilation",
    totalLoad: 50000,
    voltage: 400,
    phases: "three",
    cableLength: 150,
    powerFactor: 0.9,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "mining-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Mine ventilation systems",
    typicalApplications: ["Main fans", "Auxiliary fans", "Air conditioning"]
  },

  "crushing-equipment": {
    name: "Crushing Equipment",
    totalLoad: 75000,
    voltage: 400,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.8,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "mining-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Ore crushing and processing",
    typicalApplications: ["Jaw crushers", "Ball mills", "Processing equipment"]
  },

  // Hazardous Area circuits
  "zone1-lighting": {
    name: "Zone 1 Lighting",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "ex-mcb",
    description: "Hazardous area lighting (Zone 1)",
    typicalApplications: ["Ex-proof lighting", "Emergency lighting", "Inspection lighting"]
  },

  "zone1-motor": {
    name: "Zone 1 Motor",
    totalLoad: 10000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.85,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "ex-mcb",
    description: "Hazardous area motor (Zone 1)",
    typicalApplications: ["Ex-proof motors", "Pumps", "Fans"]
  },

  "intrinsically-safe": {
    name: "Intrinsically Safe Circuit",
    totalLoad: 50,
    voltage: 24,
    phases: "dc",
    cableLength: 100,
    recommendedInstallationMethod: "is-cable",
    recommendedCableType: "is-cable",
    recommendedProtectiveDevice: "is-barrier",
    description: "Intrinsically safe instrumentation",
    typicalApplications: ["Gas detectors", "Level sensors", "Control instrumentation"]
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
      return ["lighting", "power", "power-radial", "cooker", "shower", "heating", "ev-charging", "smart-home", "renewable-solar"];
    case "commercial":
      return ["commercial-lighting", "commercial-power", "hvac", "it-equipment", "emergency", "power"];
    case "industrial":
      return ["motor-small", "motor-large", "welding", "crane", "furnace", "hvac", "emergency"];
    case "data-center":
      return ["ups-system", "server-rack", "cooling-system", "backup-generator", "it-equipment", "emergency"];
    case "education":
      return ["classroom-power", "lab-equipment", "sports-lighting", "commercial-lighting", "it-equipment"];
    case "hospitality":
      return ["kitchen-equipment", "guest-room", "laundry-equipment", "commercial-lighting", "hvac"];
    case "retail":
      return ["retail-lighting", "pos-systems", "cold-storage", "commercial-power", "security-systems"];
    case "agriculture":
      return ["irrigation-pump", "grain-dryer", "livestock-equipment", "motor-small", "outdoor-lighting"];
    case "transportation":
      return ["charging-station", "platform-lighting", "signal-systems", "emergency", "communications"];
    case "sports-entertainment":
      return ["floodlighting", "sound-system", "scoreboard", "commercial-power", "emergency"];
    case "laboratory":
      return ["fume-cupboard", "analytical-equipment", "clean-room", "emergency", "lighting"];
    case "marine-offshore":
      return ["marine-power", "navigation-equipment", "winch-system", "emergency", "communications"];
    case "mining":
      return ["conveyor-belt", "ventilation-fan", "crushing-equipment", "motor-large", "emergency"];
    case "healthcare":
      return ["medical", "emergency", "it-equipment", "hvac", "backup-generator"];
    case "hazardous-areas":
      return ["zone1-lighting", "zone1-motor", "intrinsically-safe", "emergency"];
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

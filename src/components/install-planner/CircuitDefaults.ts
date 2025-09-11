
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
    recommendedCableType: "pvc-twin-earth",
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

  cooker: {
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

  shower: {
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

  heating: {
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

  "mining-emergency": {
    name: "Mining Emergency Systems",
    totalLoad: 2500,
    voltage: 230,
    phases: "single",
    cableLength: 300,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency lighting and safety systems for mining",
    typicalApplications: ["Emergency lighting", "Communication systems", "Safety alarms", "Escape route lighting"]
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
  },

  // Phase 2: Enhanced Smart Home & Renewable Energy Templates
  "solar-inverter": {
    name: "Solar String Inverter",
    totalLoad: 5000,
    voltage: 400,
    phases: "three",
    cableLength: 20,
    powerFactor: 0.98,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "solar-ac",
    recommendedProtectiveDevice: "ac-isolator",
    description: "Solar PV string inverter connection",
    typicalApplications: ["String inverters", "Power optimizers", "Monitoring systems"]
  },

  "battery-storage": {
    name: "Battery Energy Storage",
    totalLoad: 8000,
    voltage: 400,
    phases: "three",
    cableLength: 15,
    powerFactor: 0.95,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "dc-cable",
    recommendedProtectiveDevice: "dc-isolator",
    description: "Home battery storage system",
    typicalApplications: ["Lithium batteries", "Hybrid inverters", "Energy management"]
  },

  "heat-pump": {
    name: "Air Source Heat Pump",
    totalLoad: 6000,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    powerFactor: 0.9,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Air source heat pump system",
    typicalApplications: ["ASHP units", "Ground source pumps", "Heating controls"]
  },

  "smart-lighting": {
    name: "Smart Lighting Control",
    totalLoad: 800,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "data-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Intelligent lighting control system",
    typicalApplications: ["Smart switches", "Occupancy sensors", "Daylight harvesting"]
  },

  "home-automation": {
    name: "Home Automation Hub",
    totalLoad: 200,
    voltage: 230,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "clipped-direct",
    recommendedCableType: "cat6",
    recommendedProtectiveDevice: "mcb",
    description: "Central home automation system",
    typicalApplications: ["Smart hubs", "Voice assistants", "IoT devices"]
  },

  // Process Control & Automation
  "process-control": {
    name: "Process Control System",
    totalLoad: 2000,
    voltage: 24,
    phases: "dc",
    cableLength: 200,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "instrumentation",
    recommendedProtectiveDevice: "dc-breaker",
    description: "Industrial process control",
    typicalApplications: ["PLCs", "SCADA systems", "Field instruments"]
  },

  "variable-speed-drive": {
    name: "Variable Speed Drive",
    totalLoad: 18500,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.95,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "vsd-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Motor variable speed control",
    typicalApplications: ["VSD panels", "Motor control", "Energy saving"]
  },

  "soft-starter": {
    name: "Motor Soft Starter",
    totalLoad: 11000,
    voltage: 400,
    phases: "three",
    cableLength: 25,
    powerFactor: 0.9,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Motor soft start control",
    typicalApplications: ["Pump control", "Fan control", "Reduced starting current"]
  },

  // Advanced Healthcare
  "operating-theatre": {
    name: "Operating Theatre Power",
    totalLoad: 12000,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "it-isolator",
    description: "Critical operating theatre supply",
    typicalApplications: ["Surgical equipment", "Anaesthetic machines", "Monitoring"]
  },

  "mri-equipment": {
    name: "MRI Equipment",
    totalLoad: 25000,
    voltage: 400,
    phases: "three",
    cableLength: 20,
    powerFactor: 0.95,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "it-isolator",
    description: "Magnetic resonance imaging equipment",
    typicalApplications: ["MRI scanners", "RF shielding", "Cryogenic systems"]
  },

  "isolation-transformer": {
    name: "Medical Isolation Transformer",
    totalLoad: 8000,
    voltage: 230,
    phases: "single",
    cableLength: 10,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "it-isolator",
    description: "Medical isolation system",
    typicalApplications: ["IT systems", "Patient safety", "Insulation monitoring"]
  },

  // Advanced Data Center
  "modular-ups": {
    name: "Modular UPS System",
    totalLoad: 100000,
    voltage: 400,
    phases: "three",
    cableLength: 15,
    powerFactor: 0.99,
    recommendedInstallationMethod: "busbar",
    recommendedCableType: "power-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Scalable modular UPS",
    typicalApplications: ["Tier 3/4 data centers", "Redundant power", "Hot-swappable modules"]
  },

  "pdu-intelligent": {
    name: "Intelligent PDU",
    totalLoad: 16000,
    voltage: 400,
    phases: "three",
    cableLength: 5,
    recommendedInstallationMethod: "busbar",
    recommendedCableType: "power-cable",
    recommendedProtectiveDevice: "mcb",
    description: "Intelligent power distribution unit",
    typicalApplications: ["Rack PDUs", "Power monitoring", "Remote switching"]
  },

  "ups-battery-string": {
    name: "UPS Battery String",
    totalLoad: 0,
    voltage: 240,
    phases: "dc",
    cableLength: 10,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "battery-cable",
    recommendedProtectiveDevice: "dc-fuse",
    description: "UPS battery backup system",
    typicalApplications: ["VRLA batteries", "Lithium-ion", "Battery monitoring"]
  },

  // Specialized Industrial
  "induction-furnace": {
    name: "Induction Furnace",
    totalLoad: 500000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.95,
    recommendedInstallationMethod: "busbar",
    recommendedCableType: "water-cooled",
    recommendedProtectiveDevice: "hv-breaker",
    description: "High-power induction furnace",
    typicalApplications: ["Steel melting", "Metal casting", "Heat treatment"]
  },

  "arc-furnace": {
    name: "Electric Arc Furnace",
    totalLoad: 1000000,
    voltage: 400,
    phases: "three",
    cableLength: 25,
    powerFactor: 0.85,
    recommendedInstallationMethod: "busbar",
    recommendedCableType: "water-cooled",
    recommendedProtectiveDevice: "hv-breaker",
    description: "Electric arc furnace for steel production",
    typicalApplications: ["Steel production", "Scrap melting", "Alloy production"]
  },

  "electroplating": {
    name: "Electroplating System",
    totalLoad: 50000,
    voltage: 12,
    phases: "dc",
    cableLength: 20,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "dc-cable",
    recommendedProtectiveDevice: "dc-breaker",
    description: "Industrial electroplating equipment",
    typicalApplications: ["Metal finishing", "Anodizing", "Galvanizing"]
  },

  // Additional Industrial Circuit Types
  "415v-supply": {
    name: "415V Three-Phase Supply",
    totalLoad: 25000,
    voltage: 415,
    phases: "three",
    cableLength: 50,
    powerFactor: 0.9,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Standard 415V three-phase industrial supply",
    typicalApplications: ["Motor circuits", "Industrial machinery", "Distribution boards"]
  },

  "110v-supply": {
    name: "110V CTE Supply",
    totalLoad: 3000,
    voltage: 110,
    phases: "single",
    cableLength: 30,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "arctic",
    recommendedProtectiveDevice: "rcbo",
    description: "110V centre-tapped earth supply for portable tools",
    typicalApplications: ["Portable tools", "Site lighting", "Temporary supplies"]
  },

  "emergency-lighting": {
    name: "Emergency Lighting System",
    totalLoad: 800,
    voltage: 230,
    phases: "single",
    cableLength: 100,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency lighting system with battery backup",
    typicalApplications: ["Exit signs", "Escape route lighting", "Anti-panic lighting"]
  },

  // Enhanced Industrial Circuits
  "compressed-air": {
    name: "Compressed Air System",
    totalLoad: 30000,
    voltage: 400,
    phases: "three",
    cableLength: 75,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Industrial compressed air generation",
    typicalApplications: ["Air compressors", "Pneumatic tools", "Process air supply", "Instrument air"]
  },

  "waste-treatment": {
    name: "Waste Treatment System",
    totalLoad: 25000,
    voltage: 400,
    phases: "three",
    cableLength: 100,
    powerFactor: 0.8,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Industrial waste treatment equipment",
    typicalApplications: ["Waste pumps", "Treatment plants", "Filtration systems", "Sludge handling"]
  },

  "material-handling": {
    name: "Material Handling System",
    totalLoad: 20000,
    voltage: 400,
    phases: "three",
    cableLength: 120,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Automated material handling equipment",
    typicalApplications: ["Robotic arms", "Automated conveyors", "Sorting systems", "Palletizers"]
  },

  "control-room-power": {
    name: "Control Room Power",
    totalLoad: 8000,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Critical control room power supply",
    typicalApplications: ["Control panels", "SCADA systems", "HMI displays", "Communication equipment"]
  },

  "blast-furnace": {
    name: "Blast Furnace System",
    totalLoad: 2000000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.9,
    recommendedInstallationMethod: "busbar",
    recommendedCableType: "water-cooled",
    recommendedProtectiveDevice: "hv-breaker",
    description: "Industrial blast furnace for iron production",
    typicalApplications: ["Iron production", "Ore smelting", "Steel making"]
  },

  "heat-treatment-furnace": {
    name: "Heat Treatment Furnace",
    totalLoad: 150000,
    voltage: 400,
    phases: "three",
    cableLength: 35,
    powerFactor: 0.95,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Controlled atmosphere heat treatment furnace",
    typicalApplications: ["Metal hardening", "Annealing", "Tempering"]
  },

  // Additional Circuit Types for Enhanced Templates
  "security-systems": {
    name: "Security Systems",
    totalLoad: 1200,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Security and access control systems",
    typicalApplications: ["CCTV", "Access control", "Intruder alarms", "Perimeter detection"]
  },

  "access-control": {
    name: "Access Control System",
    totalLoad: 800,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Electronic access control and door entry systems",
    typicalApplications: ["Card readers", "Electric locks", "Turnstiles", "Barriers"]
  },

  "precision-cooling": {
    name: "Precision Cooling System",
    totalLoad: 35000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "High-precision environmental cooling",
    typicalApplications: ["Data center CRAC", "Server room cooling", "Precision air conditioning"]
  },

  "fire-suppression": {
    name: "Fire Suppression System",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Automated fire detection and suppression",
    typicalApplications: ["Gas suppression", "Water mist", "Sprinkler pumps", "Detection systems"]
  },

  "interactive-boards": {
    name: "Interactive Display Systems",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 40,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Educational interactive display technology",
    typicalApplications: ["Smart whiteboards", "Interactive projectors", "Touch displays"]
  },

  "av-systems": {
    name: "Audio/Visual Systems",
    totalLoad: 2500,
    voltage: 230,
    phases: "single",
    cableLength: 60,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Professional audio/visual equipment",
    typicalApplications: ["Projectors", "Audio amplifiers", "Video distribution", "Control systems"]
  },

  "elevator-systems": {
    name: "Elevator Control Systems",
    totalLoad: 15000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.8,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Elevator motor and control systems",
    typicalApplications: ["Lift motors", "Control panels", "Safety systems", "Emergency power"]
  },

  "pool-equipment": {
    name: "Swimming Pool Equipment",
    totalLoad: 8000,
    voltage: 400,
    phases: "three",
    cableLength: 30,
    powerFactor: 0.85,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Swimming pool filtration and heating",
    typicalApplications: ["Pool pumps", "Filtration systems", "Heating elements", "UV sterilizers"]
  },

  "spa-systems": {
    name: "Spa Equipment",
    totalLoad: 6000,
    voltage: 230,
    phases: "single",
    cableLength: 25,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Spa and wellness equipment",
    typicalApplications: ["Jacuzzi pumps", "Steam generators", "Sauna heaters", "Mood lighting"]
  },

  "digital-signage": {
    name: "Digital Signage Systems",
    totalLoad: 1800,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Digital advertising and information displays",
    typicalApplications: ["LED displays", "Digital billboards", "Menu boards", "Way-finding displays"]
  },

  "nurse-call-system": {
    name: "Nurse Call System",
    totalLoad: 500,
    voltage: 230,
    phases: "single",
    cableLength: 100,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Patient communication and alert system",
    typicalApplications: ["Call points", "Corridor displays", "Staff pagers", "Integration systems"]
  },

  "patient-monitoring": {
    name: "Patient Monitoring Equipment",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "rcbo",
    description: "Critical patient monitoring systems",
    typicalApplications: ["Vital signs monitors", "Telemetry", "Central monitoring", "Alarms"]
  },

  "surgical-lighting": {
    name: "Surgical Lighting System",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "mcb",
    description: "Specialized surgical lighting",
    typicalApplications: ["Operating lights", "Examination lights", "Emergency lighting", "UV sterilization"]
  },

  // Enhanced Healthcare Circuits
  "defibrillator-power": {
    name: "Defibrillator Power Supply",
    totalLoad: 3000,
    voltage: 230,
    phases: "single",
    cableLength: 10,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "rcbo",
    description: "Critical defibrillator power supply",
    typicalApplications: ["Defibrillators", "Cardiac monitors", "Emergency response equipment"]
  },

  "oxygen-therapy": {
    name: "Oxygen Therapy Equipment",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 15,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "rcbo",
    description: "Medical oxygen delivery systems",
    typicalApplications: ["Oxygen concentrators", "Ventilators", "Respiratory equipment", "Gas monitoring"]
  },

  "surgical-equipment": {
    name: "Surgical Equipment Power",
    totalLoad: 5000,
    voltage: 230,
    phases: "single",
    cableLength: 20,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "mineral",
    recommendedProtectiveDevice: "rcbo",
    description: "Critical surgical equipment power",
    typicalApplications: ["Surgical robots", "Electrosurgery units", "Anaesthesia machines", "Surgical pumps"]
  },

  // Enhanced Agriculture Circuits
  "agriculture-emergency": {
    name: "Agricultural Emergency Lighting",
    totalLoad: 1200,
    voltage: 230,
    phases: "single",
    cableLength: 200,
    recommendedInstallationMethod: "swa-direct",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Emergency lighting for agricultural facilities",
    typicalApplications: ["Barn emergency lighting", "Yard lighting", "Livestock area safety", "Equipment shed lighting"]
  },

  // Enhanced Marine/Offshore Circuits
  "marine-emergency": {
    name: "Marine Emergency Lighting",
    totalLoad: 1500,
    voltage: 230,
    phases: "single",
    cableLength: 150,
    recommendedInstallationMethod: "marine-conduit",
    recommendedCableType: "marine-cable",
    recommendedProtectiveDevice: "marine-mcb",
    description: "Emergency lighting for marine vessels and offshore platforms",
    typicalApplications: ["Lifeboat stations", "Muster points", "Escape routes", "Navigation safety"]
  },

  // Additional Circuit Types for Enhanced Coverage
  "building-management": {
    name: "Building Management System",
    totalLoad: 1000,
    voltage: 230,
    phases: "single",
    cableLength: 80,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Building automation and control systems",
    typicalApplications: ["BMS controllers", "Sensors", "Actuators", "Integration systems"]
  },

  "cctv-systems": {
    name: "CCTV Surveillance System",
    totalLoad: 800,
    voltage: 230,
    phases: "single",
    cableLength: 100,
    recommendedInstallationMethod: "conduit",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Video surveillance and security monitoring",
    typicalApplications: ["IP cameras", "NVR systems", "PTZ cameras", "Monitoring stations"]
  },

  "telecommunications": {
    name: "Telecommunications Equipment",
    totalLoad: 2000,
    voltage: 230,
    phases: "single",
    cableLength: 50,
    recommendedInstallationMethod: "trunking",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "rcbo",
    description: "Communication and data transmission equipment",
    typicalApplications: ["PBX systems", "Network switches", "Fiber equipment", "Communication rooms"]
  },

  "waste-management": {
    name: "Waste Management Systems",
    totalLoad: 5000,
    voltage: 400,
    phases: "three",
    cableLength: 40,
    powerFactor: 0.85,
    recommendedInstallationMethod: "tray",
    recommendedCableType: "swa",
    recommendedProtectiveDevice: "mcb",
    description: "Automated waste collection and processing",
    typicalApplications: ["Compactors", "Shredders", "Conveyor systems", "Sorting equipment"]
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
      return ["lighting", "power", "power-radial", "cooker", "shower", "heating", "ev-charging", "smart-home", "renewable-solar", "solar-inverter", "battery-storage", "heat-pump", "smart-lighting", "home-automation"];
    case "commercial":
      return [
        "commercial-lighting", "commercial-power", "hvac", "it-equipment", "emergency", "emergency-lighting",
        "power", "lighting", "smart-lighting", "process-control",
        "sound-system", "scoreboard", "security-systems", "access-control", "building-management",
        "cctv-systems", "telecommunications", "elevator-systems", "av-systems"
      ];
    case "industrial":
      return [
        // Basic Industrial
        "motor-small", "motor-large", "welding", "crane", "hvac", "emergency", "emergency-lighting",
        // Power Supply Options
        "415v-supply", "110v-supply", "lighting", "power",
        // Advanced Industrial
        "variable-speed-drive", "soft-starter", "process-control",
        // Enhanced Industrial Systems
        "compressed-air", "waste-treatment", "material-handling", "control-room-power",
        // Furnace Types
        "furnace", "induction-furnace", "arc-furnace", "blast-furnace", "heat-treatment-furnace",
        // Specialized Equipment
        "electroplating", "conveyor-belt", "ventilation-fan", "crushing-equipment",
        // Infrastructure
        "building-management", "cctv-systems", "telecommunications", "waste-management",
        // Hazardous Areas
        "zone1-lighting", "zone1-motor", "intrinsically-safe"
      ];
    case "data-center":
      return [
        "ups-system", "server-rack", "cooling-system", "backup-generator", 
        "modular-ups", "pdu-intelligent", "ups-battery-string",
        "precision-cooling", "fire-suppression", "access-control", "emergency-lighting"
      ];
    case "education":
      return [
        "classroom-power", "lab-equipment", "sports-lighting", "commercial-lighting",
        "emergency", "emergency-lighting", "it-equipment", "fume-cupboard",
        "analytical-equipment", "interactive-boards", "av-systems", "lighting", "power"
      ];
    case "hospitality":
      return [
        "kitchen-equipment", "guest-room", "laundry-equipment", "commercial-lighting",
        "hvac", "emergency", "emergency-lighting", "elevator-systems", 
        "pool-equipment", "spa-systems", "lighting", "power", "building-management",
        "cctv-systems", "telecommunications", "digital-signage", "av-systems"
      ];
    case "retail":
      return [
        "retail-lighting", "pos-systems", "cold-storage", "commercial-power",
        "hvac", "emergency", "emergency-lighting", "security-systems",
        "digital-signage", "sound-system", "lighting", "power", "building-management",
        "cctv-systems", "telecommunications", "waste-management"
      ];
    case "agriculture":
      return [
        "irrigation-pump", "grain-dryer", "livestock-equipment", "motor-small", 
        "variable-speed-drive", "soft-starter", "emergency-lighting", "agriculture-emergency",
        "lighting", "power", "process-control"
      ];
    case "transportation":
      return ["charging-station", "platform-lighting", "signal-systems", "emergency", "emergency-lighting", "smart-lighting"];
    case "sports-entertainment":
      return ["floodlighting", "sound-system", "scoreboard", "commercial-power", "emergency", "emergency-lighting", "smart-lighting"];
    case "laboratory":
      return ["fume-cupboard", "analytical-equipment", "clean-room", "emergency", "emergency-lighting", "lighting", "power", "process-control"];
    case "marine-offshore":
      return [
        "marine-power", "navigation-equipment", "winch-system", "emergency", "emergency-lighting", 
        "marine-emergency", "lighting", "power", "process-control"
      ];
    case "mining":
      return [
        "conveyor-belt", "ventilation-fan", "crushing-equipment", "motor-large", "emergency", 
        "emergency-lighting", "mining-emergency", "variable-speed-drive", "lighting", "power"
      ];
    case "healthcare":
      return [
        "medical", "operating-theatre", "mri-equipment", "isolation-transformer",
        "emergency", "emergency-lighting", "it-equipment", "nurse-call-system",
        "patient-monitoring", "surgical-lighting", "defibrillator-power", 
        "oxygen-therapy", "surgical-equipment", "lighting", "power"
      ];
    case "hazardous-areas":
      return ["zone1-lighting", "zone1-motor", "intrinsically-safe", "emergency", "emergency-lighting", "process-control"];
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

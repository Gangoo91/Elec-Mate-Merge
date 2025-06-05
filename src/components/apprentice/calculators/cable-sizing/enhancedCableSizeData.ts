
export interface EnhancedCableSizeOption {
  value: string;
  size: string;
  coreConfig: string; // e.g., "3C+E", "2C+E", "Single"
  currentRating: {
    pvc: number;
    xlpe: number;
    epr?: number;
    swa?: number;
    lsf?: number;
    armored?: number;
    micc?: number; // Mineral Insulated Copper Clad
    fplsoh?: number; // Fire Performance Low Smoke Zero Halogen
  };
  voltageDropPerAmpereMeter: number; // mV/A/m
  impedance: {
    r1: number; // Line conductor resistance (mΩ/m)
    r2: number; // CPC resistance (mΩ/m)
    x: number;  // Reactance (mΩ/m)
  };
  maxOperatingTemp: number;
  installationMethods: string[];
  cableType: 'single' | 'twin-and-earth' | 'swa' | 'lsf' | 'armored' | 'heat-resistant' | 'micc' | 'fplsoh' | 'data' | 'fire-alarm';
  applications: string[];
  priceCategory: 'low' | 'medium' | 'high' | 'premium';
  availability: 'common' | 'limited' | 'special-order';
  standards: string[];
  environmentalRating: string;
  firePerformance?: string;
  mechanicalProtection: 'none' | 'light' | 'medium' | 'heavy';
  calculatedVoltageDrop?: number;
  meetsVoltageDrop?: boolean;
  complianceNotes?: string[];
}

// Enhanced cable database with comprehensive cable sizes up to 400mm²
export const enhancedCableSizes: EnhancedCableSizeOption[] = [
  // Twin and Earth - Domestic installations
  {
    value: "1-twin",
    size: "1.0 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 13, xlpe: 15 },
    voltageDropPerAmpereMeter: 44, // mV/A/m
    impedance: { r1: 18.1, r2: 18.1, x: 0.15 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["lighting-circuits", "low-power-outlets"],
    priceCategory: 'low',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },
  {
    value: "1.5-twin",
    size: "1.5 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 16, xlpe: 19 },
    voltageDropPerAmpereMeter: 29, // mV/A/m
    impedance: { r1: 12.1, r2: 12.1, x: 0.14 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["lighting-circuits", "socket-outlets"],
    priceCategory: 'low',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },
  {
    value: "2.5-twin",
    size: "2.5 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 22, xlpe: 26 },
    voltageDropPerAmpereMeter: 18, // mV/A/m
    impedance: { r1: 7.3, r2: 7.3, x: 0.13 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["socket-outlets", "ring-circuits", "radial-circuits"],
    priceCategory: 'low',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },
  {
    value: "4-twin",
    size: "4.0 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 29, xlpe: 35 },
    voltageDropPerAmpereMeter: 11, // mV/A/m
    impedance: { r1: 4.6, r2: 4.6, x: 0.12 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["cooker-circuits", "shower-circuits", "large-appliances"],
    priceCategory: 'low',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },
  {
    value: "6-twin",
    size: "6.0 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 37, xlpe: 44 },
    voltageDropPerAmpereMeter: 7.3, // mV/A/m
    impedance: { r1: 3.08, r2: 3.08, x: 0.11 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["large-appliances", "sub-mains"],
    priceCategory: 'low',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },
  {
    value: "10-twin",
    size: "10 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 50, xlpe: 60 },
    voltageDropPerAmpereMeter: 4.4, // mV/A/m
    impedance: { r1: 1.83, r2: 1.83, x: 0.10 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'twin-and-earth',
    applications: ["sub-mains", "large-loads"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 6004", "BS 7671"],
    environmentalRating: "Indoor dry",
    mechanicalProtection: 'light'
  },

  // SWA Cables - Small to Medium sizes
  {
    value: "1.5-swa-3c",
    size: "1.5 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 17, xlpe: 21, swa: 19 },
    voltageDropPerAmpereMeter: 29, // mV/A/m
    impedance: { r1: 12.1, r2: 12.1, x: 0.08 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["sub-mains", "motor-circuits", "outdoor-lighting"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "2.5-swa-3c",
    size: "2.5 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 23, xlpe: 28, swa: 26 },
    voltageDropPerAmpereMeter: 18, // mV/A/m
    impedance: { r1: 7.3, r2: 7.3, x: 0.075 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["sub-mains", "motor-circuits", "outdoor-supplies"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "4-swa-3c",
    size: "4.0 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 31, xlpe: 37, swa: 34 },
    voltageDropPerAmpereMeter: 11, // mV/A/m
    impedance: { r1: 4.6, r2: 4.6, x: 0.07 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["sub-mains", "motor-circuits", "industrial-supplies"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "6-swa-3c",
    size: "6.0 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 40, xlpe: 48, swa: 44 },
    voltageDropPerAmpereMeter: 7.3, // mV/A/m
    impedance: { r1: 3.08, r2: 3.08, x: 0.065 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["sub-mains", "motor-circuits", "industrial-supplies"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "10-swa-3c",
    size: "10 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 52, xlpe: 63, swa: 58 },
    voltageDropPerAmpereMeter: 4.4, // mV/A/m
    impedance: { r1: 1.83, r2: 1.83, x: 0.065 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-motors", "industrial-feeders"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "16-swa-3c",
    size: "16 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 68, xlpe: 82, swa: 75 },
    voltageDropPerAmpereMeter: 2.8, // mV/A/m
    impedance: { r1: 1.15, r2: 1.15, x: 0.06 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-motors", "industrial-feeders"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "25-swa-3c",
    size: "25 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 89, xlpe: 108, swa: 98 },
    voltageDropPerAmpereMeter: 1.8, // mV/A/m
    impedance: { r1: 0.727, r2: 0.727, x: 0.055 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },

  // SWA Cables - Large sizes for industrial applications
  {
    value: "35-swa-3c",
    size: "35 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 115, xlpe: 138, swa: 125 },
    voltageDropPerAmpereMeter: 1.3, // mV/A/m
    impedance: { r1: 0.524, r2: 0.524, x: 0.052 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "50-swa-3c",
    size: "50 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 144, xlpe: 173, swa: 156 },
    voltageDropPerAmpereMeter: 0.93, // mV/A/m
    impedance: { r1: 0.387, r2: 0.387, x: 0.05 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "70-swa-3c",
    size: "70 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 184, xlpe: 221, swa: 200 },
    voltageDropPerAmpereMeter: 0.65, // mV/A/m
    impedance: { r1: 0.268, r2: 0.268, x: 0.048 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "95-swa-3c",
    size: "95 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 223, xlpe: 268, swa: 242 },
    voltageDropPerAmpereMeter: 0.49, // mV/A/m
    impedance: { r1: 0.193, r2: 0.193, x: 0.046 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "120-swa-3c",
    size: "120 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 258, xlpe: 310, swa: 280 },
    voltageDropPerAmpereMeter: 0.39, // mV/A/m
    impedance: { r1: 0.153, r2: 0.153, x: 0.044 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'common',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "150-swa-3c",
    size: "150 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 299, xlpe: 359, swa: 325 },
    voltageDropPerAmpereMeter: 0.32, // mV/A/m
    impedance: { r1: 0.124, r2: 0.124, x: 0.042 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'limited',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "185-swa-3c",
    size: "185 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 341, xlpe: 409, swa: 370 },
    voltageDropPerAmpereMeter: 0.26, // mV/A/m
    impedance: { r1: 0.099, r2: 0.099, x: 0.041 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'high',
    availability: 'limited',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "240-swa-3c",
    size: "240 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 406, xlpe: 487, swa: 440 },
    voltageDropPerAmpereMeter: 0.193, // mV/A/m
    impedance: { r1: 0.075, r2: 0.075, x: 0.04 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'premium',
    availability: 'limited',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "300-swa-3c",
    size: "300 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 464, xlpe: 557, swa: 505 },
    voltageDropPerAmpereMeter: 0.154, // mV/A/m
    impedance: { r1: 0.060, r2: 0.060, x: 0.039 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'premium',
    availability: 'special-order',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },
  {
    value: "400-swa-3c",
    size: "400 mm²",
    coreConfig: "3C+E",
    currentRating: { pvc: 546, xlpe: 655, swa: 595 },
    voltageDropPerAmpereMeter: 0.116, // mV/A/m
    impedance: { r1: 0.047, r2: 0.047, x: 0.038 },
    maxOperatingTemp: 70,
    installationMethods: ["direct-buried", "in-duct", "clipped-direct", "on-tray"],
    cableType: 'swa',
    applications: ["main-distribution", "large-industrial-supplies", "sub-stations"],
    priceCategory: 'premium',
    availability: 'special-order',
    standards: ["BS 5467", "BS 7671"],
    environmentalRating: "Indoor/Outdoor",
    mechanicalProtection: 'heavy'
  },

  // MICC Cables - Fire-resistant applications
  {
    value: "1.5-micc-2c",
    size: "1.5 mm²",
    coreConfig: "2C",
    currentRating: { pvc: 23, xlpe: 25, micc: 25 },
    voltageDropPerAmpereMeter: 29, // mV/A/m
    impedance: { r1: 12.1, r2: 12.1, x: 0.05 },
    maxOperatingTemp: 250,
    installationMethods: ["clipped-direct", "in-conduit", "exposed"],
    cableType: 'micc',
    applications: ["fire-alarm", "emergency-lighting", "essential-services"],
    priceCategory: 'high',
    availability: 'limited',
    standards: ["BS EN 60702-1", "BS 7671"],
    environmentalRating: "Fire-resistant",
    firePerformance: "Category C",
    mechanicalProtection: 'heavy'
  },
  {
    value: "2.5-micc-2c",
    size: "2.5 mm²",
    coreConfig: "2C",
    currentRating: { pvc: 31, xlpe: 35, micc: 33 },
    voltageDropPerAmpereMeter: 18, // mV/A/m
    impedance: { r1: 7.3, r2: 7.3, x: 0.045 },
    maxOperatingTemp: 250,
    installationMethods: ["clipped-direct", "in-conduit", "exposed"],
    cableType: 'micc',
    applications: ["fire-alarm", "emergency-lighting", "essential-services"],
    priceCategory: 'high',
    availability: 'limited',
    standards: ["BS EN 60702-1", "BS 7671"],
    environmentalRating: "Fire-resistant",
    firePerformance: "Category C",
    mechanicalProtection: 'heavy'
  },

  // FP LSoH Cables - Enhanced fire performance
  {
    value: "1.5-fplsoh-2c",
    size: "1.5 mm²",
    coreConfig: "2C+E",
    currentRating: { pvc: 18, xlpe: 21, fplsoh: 20 },
    voltageDropPerAmpereMeter: 29, // mV/A/m
    impedance: { r1: 12.1, r2: 12.1, x: 0.08 },
    maxOperatingTemp: 90,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'fplsoh',
    applications: ["escape-routes", "places-of-assembly", "healthcare"],
    priceCategory: 'high',
    availability: 'limited',
    standards: ["BS EN 50200", "BS 7671"],
    environmentalRating: "Enhanced fire performance",
    firePerformance: "PH 30/60/90/120",
    mechanicalProtection: 'medium'
  },

  // Data Cables - Category 6A
  {
    value: "cat6a-utp",
    size: "23 AWG",
    coreConfig: "4P",
    currentRating: { pvc: 1, xlpe: 1 }, // Very low current for data
    voltageDropPerAmpereMeter: 100, // mV/A/m (high for data applications)
    impedance: { r1: 93.8, r2: 93.8, x: 43.7 },
    maxOperatingTemp: 60,
    installationMethods: ["in-conduit", "in-trunking", "clipped-direct"],
    cableType: 'data',
    applications: ["data-networks", "telecommunications", "av-systems"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS EN 50288-2-1", "ISO/IEC 11801"],
    environmentalRating: "Indoor",
    mechanicalProtection: 'none'
  },

  // Fire Alarm Cables
  {
    value: "1.5-fire-alarm",
    size: "1.5 mm²",
    coreConfig: "2C",
    currentRating: { pvc: 15, xlpe: 18, fplsoh: 17 },
    voltageDropPerAmpereMeter: 29, // mV/A/m
    impedance: { r1: 12.1, r2: 12.1, x: 0.08 },
    maxOperatingTemp: 70,
    installationMethods: ["clipped-direct", "in-conduit", "in-trunking"],
    cableType: 'fire-alarm',
    applications: ["fire-detection", "alarm-systems", "emergency-communications"],
    priceCategory: 'medium',
    availability: 'common',
    standards: ["BS 5839-1", "BS EN 54"],
    environmentalRating: "Fire-resistant",
    firePerformance: "Enhanced",
    mechanicalProtection: 'light'
  }
];

// Industry-specific cable templates
export interface CableTemplate {
  id: string;
  name: string;
  description: string;
  industry: string;
  defaultCableTypes: string[];
  installationMethods: string[];
  environmentalRequirements: string[];
  complianceStandards: string[];
  typicalApplications: string[];
}

export const industryTemplates: CableTemplate[] = [
  {
    id: "residential",
    name: "Residential Installation",
    description: "Standard domestic electrical installation",
    industry: "Residential",
    defaultCableTypes: ["twin-and-earth"],
    installationMethods: ["clipped-direct", "in-conduit"],
    environmentalRequirements: ["indoor-dry"],
    complianceStandards: ["BS 7671", "Part P"],
    typicalApplications: ["lighting", "socket-outlets", "cooker-circuits"]
  },
  {
    id: "commercial",
    name: "Commercial Building",
    description: "Office and retail environments",
    industry: "Commercial",
    defaultCableTypes: ["swa", "lsf"],
    installationMethods: ["on-tray", "in-trunking", "clipped-direct"],
    environmentalRequirements: ["fire-performance", "low-smoke"],
    complianceStandards: ["BS 7671", "BS 5266", "BS 5839"],
    typicalApplications: ["sub-mains", "emergency-lighting", "fire-alarm"]
  },
  {
    id: "industrial",
    name: "Industrial Installation",
    description: "Manufacturing and processing facilities",
    industry: "Industrial",
    defaultCableTypes: ["swa", "armored"],
    installationMethods: ["direct-buried", "on-tray", "in-duct"],
    environmentalRequirements: ["mechanical-protection", "chemical-resistance"],
    complianceStandards: ["BS 7671", "ATEX", "DSEAR"],
    typicalApplications: ["motor-circuits", "control-panels", "instrumentation"]
  },
  {
    id: "healthcare",
    name: "Healthcare Facility",
    description: "Hospitals and medical facilities",
    industry: "Healthcare",
    defaultCableTypes: ["fplsoh", "micc"],
    installationMethods: ["clipped-direct", "in-conduit"],
    environmentalRequirements: ["enhanced-fire-performance", "low-smoke"],
    complianceStandards: ["BS 7671", "HTM 06-01", "BS EN 50200"],
    typicalApplications: ["essential-services", "medical-equipment", "emergency-systems"]
  },
  {
    id: "education",
    name: "Educational Building",
    description: "Schools and universities",
    industry: "Education",
    defaultCableTypes: ["lsf", "data"],
    installationMethods: ["in-trunking", "clipped-direct"],
    environmentalRequirements: ["fire-performance", "low-smoke"],
    complianceStandards: ["BS 7671", "BB 100", "BS EN 50200"],
    typicalApplications: ["classroom-circuits", "it-infrastructure", "emergency-lighting"]
  }
];

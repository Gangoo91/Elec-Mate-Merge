/**
 * Test Data Fixtures for E2E Tests
 *
 * Provides consistent test data for EICR, EIC, and Minor Works certificates
 */

// Client/Property test data
export const testClient = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "020 1234 5678",
  address: "123 Main Street",
  address2: "Flat 1",
  city: "London",
  postcode: "SW1A 1AA",
  description: "Residential property - 3 bedroom semi-detached house"
};

// Alternative client for multi-test scenarios
export const testClient2 = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "07700 900123",
  address: "456 Oak Avenue",
  address2: "Suite 5",
  city: "Manchester",
  postcode: "M1 2AB",
  description: "Commercial premises - retail unit"
};

// Installation details
export const testInstallation = {
  supplyType: "1P",
  earthing: "TN-C-S",
  voltage: "230",
  frequency: "50",
  ze: "0.35",
  pscc: "16.5",
  supplyPhases: "single",
  prospectiveFaultCurrent: "16.5"
};

// Three-phase installation
export const testInstallation3Phase = {
  supplyType: "3P",
  earthing: "TN-S",
  voltage: "400",
  frequency: "50",
  ze: "0.20",
  pscc: "25.0",
  supplyPhases: "three",
  prospectiveFaultCurrent: "25.0"
};

// Circuit test data
export const testCircuit = {
  number: "1",
  designation: "C1",
  description: "Ring Main - Kitchen",
  deviceType: "RCBO",
  deviceRating: "32A",
  deviceCurve: "B",
  r1r2: "0.45",
  zs: "0.95",
  insulation: "10.5",
  conductorLive: "2.5",
  conductorCpc: "1.5",
  cableType: "T&E",
  referenceMethod: "C"
};

// Additional circuits for multi-circuit testing
export const testCircuit2 = {
  number: "2",
  designation: "C2",
  description: "Lighting - Ground Floor",
  deviceType: "MCB",
  deviceRating: "6A",
  deviceCurve: "B",
  r1r2: "0.75",
  zs: "1.15",
  insulation: "15.2",
  conductorLive: "1.5",
  conductorCpc: "1.0",
  cableType: "T&E",
  referenceMethod: "C"
};

export const testCircuit3 = {
  number: "3",
  designation: "C3",
  description: "Cooker",
  deviceType: "MCB",
  deviceRating: "32A",
  deviceCurve: "B",
  r1r2: "0.35",
  zs: "0.85",
  insulation: "12.0",
  conductorLive: "6.0",
  conductorCpc: "2.5",
  cableType: "T&E",
  referenceMethod: "C"
};

// Declaration/Inspector details
export const testDeclaration = {
  name: "Jane Doe",
  qualifications: "Level 3 NVQ",
  company: "Acme Electric Ltd",
  scheme: "NICEIC",
  regNumber: "12345",
  position: "Qualified Supervisor"
};

// Test instruments
export const testInstruments = {
  continuityTester: {
    make: "Megger",
    serial: "MFT1735-001",
    calDate: "2025-01-15"
  },
  insulationTester: {
    make: "Fluke",
    serial: "1664FC-002",
    calDate: "2025-02-20"
  },
  loopImpedanceTester: {
    make: "Kewtech",
    serial: "KT65DL-003",
    calDate: "2025-03-01"
  },
  rcdTester: {
    make: "Megger",
    serial: "RCD-004",
    calDate: "2025-01-10"
  }
};

// Test results (passing values)
export const testResultsPassing = {
  ringContinuityLive: "0.05",
  ringContinuityNeutral: "0.05",
  r1r2: "0.45",
  insulationLN: "250",
  insulationLE: "250",
  insulationNE: "250",
  polarity: "correct",
  zs: "0.95",
  rcdTripTime: "25",
  rcdTestButton: "satisfactory",
  ambientTemp: "20"
};

// Test results (failing values)
export const testResultsFailing = {
  ringContinuityLive: "0.05",
  ringContinuityNeutral: "0.05",
  r1r2: "2.50", // Too high
  insulationLN: "0.5", // Too low
  insulationLE: "250",
  insulationNE: "250",
  polarity: "incorrect",
  zs: "3.50", // Too high
  rcdTripTime: "450", // Too slow
  rcdTestButton: "unsatisfactory",
  ambientTemp: "20"
};

// Work types for Minor Works
export const workTypes = {
  addition: {
    type: "addition",
    subCategories: ["Socket outlet", "Lighting point", "Fixed equipment", "New circuit"]
  },
  alteration: {
    type: "alteration",
    subCategories: ["Circuit modification", "Board upgrade", "Earthing improvement"]
  },
  replacement: {
    type: "replacement",
    subCategories: ["Consumer unit", "Socket outlet", "Switch", "Light fitting"]
  },
  accessory: {
    type: "accessory",
    subCategories: ["Socket replacement", "Switch replacement", "Accessory change"]
  }
};

// Inspection item outcomes
export const inspectionOutcomes = {
  pass: "satisfactory",
  c1: "C1",
  c2: "C2",
  c3: "C3",
  nv: "N/V",
  na: "N/A",
  lim: "LIM"
};

// Protective device types
export const protectiveDevices = {
  types: ["MCB", "RCBO", "Fuse BS3036", "Fuse BS1361", "Fuse BS88", "RCD"],
  ratings: ["6A", "10A", "16A", "20A", "25A", "32A", "40A", "50A", "63A"],
  curves: ["B", "C", "D"],
  bsStandards: ["BS EN 60898", "BS EN 61009", "BS 3036", "BS 1361", "BS 88"]
};

// Earthing arrangements
export const earthingArrangements = ["TN-S", "TN-C-S", "TT"];

// Cable types
export const cableTypes = ["T&E", "SWA", "LSF", "MI", "FP", "SY"];

// Reference methods
export const referenceMethods = ["A", "B", "C", "D", "E", "F", "G"];

// RCD types
export const rcdTypes = {
  types: ["AC", "A", "F", "B"],
  ratings: ["30mA", "100mA", "300mA"]
};

// Scheme providers
export const schemeProviders = [
  "NICEIC",
  "NAPIT",
  "ELECSA",
  "SELECT",
  "BRE",
  "Stroma"
];

// Qualification levels
export const qualificationLevels = [
  "Level 3 NVQ",
  "Level 4 HNC",
  "Degree",
  "City & Guilds 2391",
  "City & Guilds 2394/95"
];

// Distribution board test data
export const testDistributionBoard = {
  name: "Main DB",
  location: "Under stairs",
  make: "Hager",
  model: "VML112",
  totalWays: 12
};

export const testDistributionBoard2 = {
  name: "Sub DB",
  location: "Garage",
  make: "MK",
  model: "Sentry",
  totalWays: 6
};

// Observation codes with descriptions
export const observationCodes = {
  C1: {
    code: "C1",
    description: "Danger present - Risk of injury. Immediate remedial action required.",
    urgency: "Immediate"
  },
  C2: {
    code: "C2",
    description: "Potentially dangerous - Urgent remedial action required.",
    urgency: "Urgent"
  },
  C3: {
    code: "C3",
    description: "Improvement recommended.",
    urgency: "Advisory"
  },
  FI: {
    code: "FI",
    description: "Further investigation required without delay.",
    urgency: "Investigation"
  }
};

// Common observation descriptions
export const commonObservations = [
  { code: "C1", text: "No RCD protection on socket circuits" },
  { code: "C1", text: "Damaged cable insulation - live parts exposed" },
  { code: "C2", text: "Inadequate earthing arrangement" },
  { code: "C2", text: "No main protective bonding to gas" },
  { code: "C3", text: "Labels missing from distribution board" },
  { code: "C3", text: "Recommend upgrading to RCBO protection" },
  { code: "FI", text: "Unable to access all circuits for testing" }
];

// Helper function to generate unique IDs
export function generateTestId(prefix: string = "test"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

// Helper to get date X days from now
export function getFutureDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

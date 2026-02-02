/**
 * EV Charging Certificate Types (IET Code of Practice)
 * EVCP installation certificate with OZEV compliance
 */

// Charger types as per IET CoP
export type ChargerMode = 'Mode2' | 'Mode3' | 'Mode4';
export type ChargerConnection = 'tethered' | 'socketed';
export type PhaseType = 1 | 3;

// Protection device types
export type ProtectionDeviceType = 'MCB' | 'RCBO' | 'MCCB';
export type ProtectionDeviceCurve = 'B' | 'C' | 'D';

// Earthing arrangements
export type EarthingArrangement = 'TN-C-S' | 'TN-S' | 'TT';

export interface EVChargingFormData {
  // Certificate metadata
  certificateNumber: string;
  installationDate: string;

  // Client details
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;

  // Vehicle details (optional)
  vehicleMake: string;
  vehicleModel: string;
  vehicleRegistration: string;

  // Installation address
  installationAddress: string;
  installationType: 'domestic' | 'commercial' | 'public';

  // Charger details
  chargerMake: string;
  chargerModel: string;
  chargerSerial: string;
  chargerType: ChargerMode | '';
  chargerConnection: ChargerConnection | '';
  powerRating: number; // kW
  phases: PhaseType;
  ratedCurrent: number; // A
  socketType: string; // Type 1, Type 2, CCS, CHAdeMO

  // Electrical supply details
  supplyVoltage: number;
  supplyPhases: 'single' | 'three';
  earthingArrangement: EarthingArrangement | '';
  ze: string;
  prospectiveFaultCurrent: string;
  externalLoopImpedance: string;

  // PME considerations
  isPME: boolean;
  pmeEarthingMeasures: string;
  earthElectrodeInstalled: boolean;
  earthElectrodeResistance: string;

  // Circuit details
  circuitDesignation: string;
  cableType: string;
  cableSize: number; // mm²
  cableLength: number; // m
  installationMethod: string;

  // Protection device
  protectionDeviceType: ProtectionDeviceType | '';
  protectionDeviceRating: number; // A
  protectionDeviceCurve: ProtectionDeviceCurve | '';

  // RCD protection
  rcdType: 'Type A' | 'Type B' | 'Type A + 6mA DC' | '';
  rcdRating: number; // mA
  rcdIntegral: boolean; // Built into charger

  // Test results
  testResults: {
    r1r2: string;
    r2: string;
    zs: string;
    maxZs: string;
    insulationResistance: string;
    polarity: 'correct' | 'incorrect' | '';
    rcdTripTime: string; // ms
    rcdTripTimeX5: string; // ms
    earthElectrodeRa: string;
    functionalTest: 'pass' | 'fail' | '';
    loadTest: 'pass' | 'fail' | '';
    loadTestCurrent: string;
  };

  // OZEV Grant details
  ozevGrantApplicable: boolean;
  ozevGrantRef: string;
  ozevScheme: 'EVHS' | 'WCS' | 'OZEV-flat' | ''; // Electric Vehicle Homecharge Scheme, Workplace Charging Scheme

  // DNO notification
  dnoNotified: boolean;
  dnoNotificationDate: string;
  dnoReference: string;
  g98Notification: boolean;
  g99Application: boolean;

  // Smart functionality
  smartChargingEnabled: boolean;
  loadManagement: boolean;
  loadManagementType: string;

  // User instructions
  userInstructionsProvided: boolean;
  operatingManualProvided: boolean;

  // Installer declaration
  installerName: string;
  installerCompany: string;
  installerQualifications: string;
  installerScheme: string; // NAPIT, NICEIC, ELECSA, etc.
  installerSchemeNumber: string;
  installerSignature: string;
  installerDate: string;

  // Compliance
  bs7671Compliance: boolean;
  ietCopCompliance: boolean;
  buildingRegsCompliance: boolean;

  // Additional notes
  additionalNotes: string;
  specialConditions: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default form data factory
export const getDefaultEVChargingFormData = (): EVChargingFormData => ({
  certificateNumber: '',
  installationDate: new Date().toISOString().split('T')[0],

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  vehicleMake: '',
  vehicleModel: '',
  vehicleRegistration: '',

  installationAddress: '',
  installationType: 'domestic',

  chargerMake: '',
  chargerModel: '',
  chargerSerial: '',
  chargerType: '',
  chargerConnection: '',
  powerRating: 7.4,
  phases: 1,
  ratedCurrent: 32,
  socketType: 'Type 2',

  supplyVoltage: 230,
  supplyPhases: 'single',
  earthingArrangement: '',
  ze: '',
  prospectiveFaultCurrent: '',
  externalLoopImpedance: '',

  isPME: true,
  pmeEarthingMeasures: '',
  earthElectrodeInstalled: false,
  earthElectrodeResistance: '',

  circuitDesignation: '',
  cableType: '',
  cableSize: 6,
  cableLength: 0,
  installationMethod: '',

  protectionDeviceType: '',
  protectionDeviceRating: 32,
  protectionDeviceCurve: 'B',

  rcdType: '',
  rcdRating: 30,
  rcdIntegral: false,

  testResults: {
    r1r2: '',
    r2: '',
    zs: '',
    maxZs: '',
    insulationResistance: '',
    polarity: '',
    rcdTripTime: '',
    rcdTripTimeX5: '',
    earthElectrodeRa: '',
    functionalTest: '',
    loadTest: '',
    loadTestCurrent: '',
  },

  ozevGrantApplicable: false,
  ozevGrantRef: '',
  ozevScheme: '',

  dnoNotified: false,
  dnoNotificationDate: '',
  dnoReference: '',
  g98Notification: false,
  g99Application: false,

  smartChargingEnabled: false,
  loadManagement: false,
  loadManagementType: '',

  userInstructionsProvided: false,
  operatingManualProvided: false,

  installerName: '',
  installerCompany: '',
  installerQualifications: '',
  installerScheme: '',
  installerSchemeNumber: '',
  installerSignature: '',
  installerDate: new Date().toISOString().split('T')[0],

  bs7671Compliance: false,
  ietCopCompliance: false,
  buildingRegsCompliance: false,

  additionalNotes: '',
  specialConditions: '',

  completedSections: {},
  status: 'draft',
});

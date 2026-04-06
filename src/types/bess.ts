/**
 * Battery Energy Storage System (BESS) Certificate Types
 * IET Code of Practice for EESS + MCS MIS 3002 + BS 7671:2018+A3:2024
 */

export type BatteryChemistry = 'LFP' | 'NMC' | 'NCA' | 'lead-acid' | 'flow' | 'other';
export type CouplingType = 'AC' | 'DC' | 'hybrid';
export type InverterType = 'hybrid' | 'ac-coupled' | 'dc-coupled';
export type EarthingArrangement = 'TN-S' | 'TN-C-S' | 'TT';
export type DCEarthingMethod = 'galvanic-isolation' | 'separate-earth-electrode' | 'it-with-imd';
export type OperatingMode = 'self-consumption' | 'time-of-use' | 'backup' | 'export-maximisation' | 'custom';
export type VentilationType = 'natural' | 'mechanical' | 'none';
export type FireDetectionType = 'smoke' | 'heat' | 'none';
export type ThermalManagement = 'passive' | 'active-air' | 'liquid';
export type ProtectionDeviceType = 'MCB' | 'RCBO' | 'MCCB' | 'fuse';
export type RCDType = 'Type A' | 'Type B' | 'Type F' | '';
export type PassFail = 'pass' | 'fail' | '';
export type YesNo = 'yes' | 'no' | '';

export interface GridProtectionSetting {
  voltage?: string;
  frequency?: string;
  rate?: string;
  tripTime: string;
}

export interface BESSFormData {
  // Certificate metadata
  certificateNumber: string;
  installationDate: string;
  commissioningDate: string;

  // Client details
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;

  // Installation
  installationType: 'domestic' | 'commercial' | 'industrial';
  installationAddress: string;
  installationLocation: 'indoor' | 'outdoor' | 'garage' | 'dedicated-enclosure' | '';
  associatedPV: boolean;
  associatedPVRef: string;
  associatedPVCapacity: string; // kWp

  // Installer
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  installerScheme: string;
  installerSchemeNumber: string;
  mcsInstallerNumber: string;
  installerSignature: string;
  installerDate: string;

  // Commissioner (may differ from installer)
  commissionerName: string;
  commissionerSignature: string;

  // Battery system
  batteryManufacturer: string;
  batteryModel: string;
  batterySerials: string; // comma-separated for multiple modules
  batteryChemistry: BatteryChemistry | '';
  usableCapacity: string; // kWh
  nominalVoltage: string; // V DC
  numberOfModules: string;
  configuration: 'single' | 'parallel' | 'series-parallel' | '';
  maxChargeRate: string; // kW
  maxDischargeRate: string; // kW
  depthOfDischarge: string; // %
  roundTripEfficiency: string; // %
  mcsBatteryProductCert: string;
  iec62619Compliant: boolean;

  // Inverter/charger
  inverterManufacturer: string;
  inverterModel: string;
  inverterSerial: string;
  inverterRatedPower: string; // kW
  inverterType: InverterType | '';
  inverterPhases: 'single' | 'three';
  inverterFirmware: string;
  mcsInverterProductCert: string;

  // System configuration
  couplingType: CouplingType | '';
  operatingMode: OperatingMode | '';
  chargeRateLimit: string; // kW
  dischargeRateLimit: string; // kW
  dodLimit: string; // %
  backupReserve: string; // %
  epsEnabled: boolean;
  exportLimited: boolean;
  exportLimit: string; // kW
  totalSiteGeneration: string; // kW — determines G98 vs G99

  // DC circuit
  dcCableType: string;
  dcCableCSA: string; // mm²
  dcCableLength: string; // m
  dcProtectionType: string;
  dcProtectionRating: string; // A
  dcIsolatorLocation: string;
  dcIsolatorRating: string; // A
  dcSPDType: string;
  dcSPDManufacturer: string;
  dcEarthFaultMethod: string;

  // Earthing
  earthingArrangement: EarthingArrangement | '';
  pmeRiskAssessment: boolean;
  dcEarthingMethod: DCEarthingMethod | '';
  earthElectrodeResistance: string; // Ω

  // AC circuit
  acCableType: string;
  acCableCSA: string; // mm²
  acCableLength: string; // m
  acProtectionType: ProtectionDeviceType | '';
  acProtectionRating: string; // A
  acProtectionCurve: 'B' | 'C' | 'D' | '';
  rcdType: RCDType;
  rcdRating: string; // mA
  acIsolatorLocation: string;
  acSPDType: string;
  acSPDManufacturer: string;

  // Battery safety
  locationSuitable: boolean;
  distanceFromCombustibles: string; // mm
  ventilation: VentilationType | '';
  fireDetection: FireDetectionType | '';
  thermalManagement: ThermalManagement | '';
  warningSignageInstalled: boolean;
  warningSignageLocations: string;
  emergencyShutdownProvided: boolean;
  fireServiceInfoProvided: boolean;

  // AC test results
  ze: string;
  zs: string;
  r1r2: string;
  r2: string;
  acInsulationResistance: string; // MΩ
  acPolarity: 'correct' | 'incorrect' | '';
  pscc: string; // kA
  rcdTripTimeIdn: string; // ms
  rcdTripTime5xIdn: string; // ms

  // DC test results
  dcInsulationResistance: string; // MΩ
  dcTestVoltage: string; // V — auto-set by chemistry
  dcStringVoltage: string; // V measured
  dcStringVoltageExpected: string; // V expected
  dcPolarityVerified: boolean;
  batterySoCAtCommissioning: string; // %

  // Grid protection settings (G98 defaults pre-filled)
  ovStage1Voltage: string;
  ovStage1Time: string;
  ovStage2Voltage: string;
  ovStage2Time: string;
  uvStage1Voltage: string;
  uvStage1Time: string;
  uvStage2Voltage: string;
  uvStage2Time: string;
  ofStage1Freq: string;
  ofStage1Time: string;
  ofStage2Freq: string;
  ofStage2Time: string;
  ufStage1Freq: string;
  ufStage1Time: string;
  ufStage2Freq: string;
  ufStage2Time: string;
  rocoFRate: string;
  rocoFTime: string;
  reconnectionDelay: string; // s

  // DNO
  gridConnectionType: 'G98' | 'G99' | '';
  dnoName: string;
  dnoReference: string;
  dnoNotificationDate: string;
  mpan: string;
  exportMeterFitted: boolean;
  exportMeterSerial: string;

  // Functional tests
  antiIslandingTest: PassFail;
  antiIslandingMethod: string;
  chargeTest: PassFail;
  dischargeTest: PassFail;
  epsTest: PassFail;
  epsSwitchoverTime: string; // ms
  monitoringConfirmed: boolean;

  // Manufacturer commissioning
  portalRegistered: boolean;
  commModuleType: 'wifi' | '4g' | 'lan' | 'ethernet' | '';
  commModuleSerial: string;
  cloudMonitoringWorking: boolean;
  manufacturerCommRef: string;
  firmwaresCurrent: boolean;

  // Test instrument
  testInstrumentMake: string;
  testInstrumentModel: string;
  testInstrumentSerial: string;
  testInstrumentCalDate: string;

  // Metering
  smartMeterFitted: boolean;
  smartMeterSerial: string;
  segRegistered: boolean;

  // Warranty
  batteryWarrantyYears: string;
  inverterWarrantyYears: string;

  // BMS
  bmsFirmware: string;

  // Customer handover
  operatingInstructionsProvided: boolean;
  emergencyShutdownExplained: boolean;
  maintenanceScheduleProvided: boolean;
  customerAppSetup: boolean;
  dnoNotificationCopyProvided: boolean;
  mcsCertificateProvided: boolean;
  warrantyRegistered: boolean;
  buildingControlNotified: boolean;

  // Client acknowledgement
  clientSignature: string;
  clientDate: string;

  // Photos
  photos: string[];

  // Notes
  additionalNotes: string;
  defectsObservations: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// G98 default protection settings
const G98_DEFAULTS = {
  ovStage1Voltage: '264',
  ovStage1Time: '1.0',
  ovStage2Voltage: '276',
  ovStage2Time: '0.5',
  uvStage1Voltage: '207',
  uvStage1Time: '1.5',
  uvStage2Voltage: '196',
  uvStage2Time: '0.5',
  ofStage1Freq: '50.4',
  ofStage1Time: '0.5',
  ofStage2Freq: '52',
  ofStage2Time: '0.5',
  ufStage1Freq: '47.5',
  ufStage1Time: '0.5',
  ufStage2Freq: '47',
  ufStage2Time: '0.5',
  rocoFRate: '1',
  rocoFTime: '0.5',
  reconnectionDelay: '60',
};

export const getDefaultBESSFormData = (): BESSFormData => ({
  certificateNumber: '',
  installationDate: new Date().toISOString().split('T')[0],
  commissioningDate: new Date().toISOString().split('T')[0],

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  installationType: 'domestic',
  installationAddress: '',
  installationLocation: '',
  associatedPV: false,
  associatedPVRef: '',
  associatedPVCapacity: '',

  installerName: '',
  installerCompany: '',
  installerPhone: '',
  installerEmail: '',
  installerScheme: '',
  installerSchemeNumber: '',
  mcsInstallerNumber: '',
  installerSignature: '',
  installerDate: new Date().toISOString().split('T')[0],

  commissionerName: '',
  commissionerSignature: '',

  batteryManufacturer: '',
  batteryModel: '',
  batterySerials: '',
  batteryChemistry: '',
  usableCapacity: '',
  nominalVoltage: '',
  numberOfModules: '1',
  configuration: '',
  maxChargeRate: '',
  maxDischargeRate: '',
  depthOfDischarge: '100',
  roundTripEfficiency: '',
  mcsBatteryProductCert: '',
  iec62619Compliant: true,

  inverterManufacturer: '',
  inverterModel: '',
  inverterSerial: '',
  inverterRatedPower: '',
  inverterType: '',
  inverterPhases: 'single',
  inverterFirmware: '',
  mcsInverterProductCert: '',

  couplingType: '',
  operatingMode: '',
  chargeRateLimit: '',
  dischargeRateLimit: '',
  dodLimit: '100',
  backupReserve: '20',
  epsEnabled: false,
  exportLimited: false,
  exportLimit: '',
  totalSiteGeneration: '',

  dcCableType: '',
  dcCableCSA: '',
  dcCableLength: '',
  dcProtectionType: '',
  dcProtectionRating: '',
  dcIsolatorLocation: '',
  dcIsolatorRating: '',
  dcSPDType: '',
  dcSPDManufacturer: '',
  dcEarthFaultMethod: '',

  earthingArrangement: '',
  pmeRiskAssessment: false,
  dcEarthingMethod: '',
  earthElectrodeResistance: '',

  acCableType: '',
  acCableCSA: '',
  acCableLength: '',
  acProtectionType: '',
  acProtectionRating: '',
  acProtectionCurve: '',
  rcdType: '',
  rcdRating: '30',
  acIsolatorLocation: '',
  acSPDType: '',
  acSPDManufacturer: '',

  locationSuitable: true,
  distanceFromCombustibles: '',
  ventilation: '',
  fireDetection: '',
  thermalManagement: '',
  warningSignageInstalled: false,
  warningSignageLocations: '',
  emergencyShutdownProvided: false,
  fireServiceInfoProvided: false,

  ze: '',
  zs: '',
  r1r2: '',
  r2: '',
  acInsulationResistance: '',
  acPolarity: '',
  pscc: '',
  rcdTripTimeIdn: '',
  rcdTripTime5xIdn: '',

  dcInsulationResistance: '',
  dcTestVoltage: '',
  dcStringVoltage: '',
  dcStringVoltageExpected: '',
  dcPolarityVerified: false,
  batterySoCAtCommissioning: '',

  // G98 defaults pre-filled
  ...G98_DEFAULTS,

  gridConnectionType: '',
  dnoName: '',
  dnoReference: '',
  dnoNotificationDate: '',
  mpan: '',
  exportMeterFitted: false,
  exportMeterSerial: '',

  antiIslandingTest: '',
  antiIslandingMethod: '',
  chargeTest: '',
  dischargeTest: '',
  epsTest: '',
  epsSwitchoverTime: '',
  monitoringConfirmed: false,

  portalRegistered: false,
  commModuleType: '',
  commModuleSerial: '',
  cloudMonitoringWorking: false,
  manufacturerCommRef: '',
  firmwaresCurrent: false,

  testInstrumentMake: '',
  testInstrumentModel: '',
  testInstrumentSerial: '',
  testInstrumentCalDate: '',

  smartMeterFitted: false,
  smartMeterSerial: '',
  segRegistered: false,

  batteryWarrantyYears: '',
  inverterWarrantyYears: '',

  bmsFirmware: '',

  operatingInstructionsProvided: false,
  emergencyShutdownExplained: false,
  maintenanceScheduleProvided: false,
  customerAppSetup: false,
  dnoNotificationCopyProvided: false,
  mcsCertificateProvided: false,
  warrantyRegistered: false,
  buildingControlNotified: false,

  clientSignature: '',
  clientDate: '',

  photos: [],

  additionalNotes: '',
  defectsObservations: '',

  completedSections: {},
  status: 'draft',
});

// Chemistry-aware DC insulation resistance test voltage
export const getDCTestVoltage = (chemistry: BatteryChemistry | ''): { voltage: string; minResistance: string } => {
  switch (chemistry) {
    case 'LFP':
    case 'NMC':
    case 'NCA':
      return { voltage: '500', minResistance: '1.0' }; // ≤500V DC systems
    case 'lead-acid':
      return { voltage: '250', minResistance: '0.5' }; // Lower voltage systems
    default:
      return { voltage: '500', minResistance: '1.0' };
  }
};

// Common battery manufacturers for autocomplete
export const BATTERY_MANUFACTURERS = [
  'Tesla', 'GivEnergy', 'SolarEdge', 'Enphase', 'Huawei',
  'Fox ESS', 'BYD', 'Pylontech', 'Sofar', 'SolaX',
  'Solis', 'Sunsynk', 'AlphaESS', 'Victron', 'Growatt',
];

// Common inverter manufacturers
export const INVERTER_MANUFACTURERS = [
  'GivEnergy', 'SolarEdge', 'Enphase', 'Huawei', 'Fox ESS',
  'SolaX', 'Solis', 'Sunsynk', 'Growatt', 'Sofar',
  'Fronius', 'SMA', 'Victron', 'Tesla',
];

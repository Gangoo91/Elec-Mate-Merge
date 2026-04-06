/**
 * G99 Commissioning Certificate Types
 * EREC G99 Issue 5 — Generators >16A per phase
 * Two-stage process: Application (pre-install) + Commissioning (post-install)
 */

export const UK_DNOS = [
  'UK Power Networks', 'Western Power Distribution', 'Northern Powergrid',
  'SP Energy Networks', 'SSE Networks', 'Electricity North West',
  'National Grid Electricity Distribution',
];

// G99 default protection settings (same base as G98 but DNO may override)
export const G99_DEFAULTS = {
  ovStage1Voltage: '264.0', ovStage1Time: '1.0',
  ovStage2Voltage: '276.0', ovStage2Time: '0.5',
  uvStage1Voltage: '207.0', uvStage1Time: '1.5',
  uvStage2Voltage: '195.5', uvStage2Time: '0.5',
  ofStage1Freq: '50.4', ofStage1Time: '0.5',
  ofStage2Freq: '52.0', ofStage2Time: '0.5',
  ufStage1Freq: '47.5', ufStage1Time: '0.5',
  ufStage2Freq: '47.0', ufStage2Time: '0.5',
  rocoFRate: '1.0', rocoFTime: '0.5',
  reconnectionDelay: '60',
};

export interface G99FormData {
  referenceNumber: string;
  // Stage 1: Application
  applicationDate: string;
  proposedCommissioningDate: string;
  dnoName: string;
  dnoApplicationRef: string;
  dnoApprovalReceived: boolean;
  dnoApprovalDate: string;
  dnoApprovalRef: string;
  dnoSpecialConditions: string;
  networkStudyRequired: boolean;
  interTripRequired: boolean;
  connectionVoltage: 'LV' | 'HV' | 'EHV' | '';
  // Installer
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  mcsNumber: string;
  registrationScheme: string;
  registrationNumber: string;
  // Site
  installationAddress: string;
  mpan: string;
  supplyType: string;
  earthingArrangement: string;
  // Equipment
  equipmentType: string;
  equipmentManufacturer: string;
  equipmentModel: string;
  equipmentSerial: string;
  ratedOutput: string;
  numberOfPhases: string;
  numberOfGeneratingUnits: string;
  typeTestCertRef: string;
  inverterManufacturer: string;
  inverterModel: string;
  proposedExportCapacity: string;
  associatedCertRef: string;
  // Export
  exportCapable: boolean;
  exportLimited: boolean;
  exportLimit: string;
  exportMeterFitted: boolean;
  exportMeterSerial: string;
  segSupplier: string;
  // Stage 2: Commissioning
  commissioningDate: string;
  settingsSource: 'G99 default' | 'DNO specified' | '';
  // Protection settings
  ovStage1Voltage: string; ovStage1Time: string;
  ovStage2Voltage: string; ovStage2Time: string;
  uvStage1Voltage: string; uvStage1Time: string;
  uvStage2Voltage: string; uvStage2Time: string;
  ofStage1Freq: string; ofStage1Time: string;
  ofStage2Freq: string; ofStage2Time: string;
  ufStage1Freq: string; ufStage1Time: string;
  ufStage2Freq: string; ufStage2Time: string;
  rocoFRate: string; rocoFTime: string;
  reconnectionDelay: string;
  // Additional G99 tests
  powerQualityTHD: string;
  reactivePowerVerified: boolean;
  activePowerControlVerified: boolean;
  frequencyResponseVerified: boolean;
  interTripTested: 'pass' | 'fail' | 'na' | '';
  measuredExportKW: string;
  gridVoltageAtConnection: string;
  // DNO witness
  dnoWitnessRequired: boolean;
  dnoWitnessName: string;
  dnoWitnessDate: string;
  // Commissioning confirmation
  antiIslandingConfirmed: boolean;
  protectionSettingsVerified: boolean;
  systemOperating: boolean;
  labelsApplied: boolean;
  customerInformed: boolean;
  // Overall
  overallResult: 'satisfactory' | 'unsatisfactory' | '';
  // Signatures
  installerSignature: string;
  installerDate: string;
  dnoWitnessSignature: string;
  customerSignature: string;
  customerDate: string;
  notes: string;
  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

export const getDefaultG99FormData = (): G99FormData => ({
  referenceNumber: `G99-${Date.now().toString(36).toUpperCase()}`,
  applicationDate: new Date().toISOString().split('T')[0],
  proposedCommissioningDate: '',
  dnoName: '', dnoApplicationRef: '',
  dnoApprovalReceived: false, dnoApprovalDate: '', dnoApprovalRef: '',
  dnoSpecialConditions: '', networkStudyRequired: false, interTripRequired: false,
  connectionVoltage: '',
  installerName: '', installerCompany: '', installerPhone: '', installerEmail: '',
  mcsNumber: '', registrationScheme: '', registrationNumber: '',
  installationAddress: '', mpan: '', supplyType: 'three-phase', earthingArrangement: '',
  equipmentType: '', equipmentManufacturer: '', equipmentModel: '', equipmentSerial: '',
  ratedOutput: '', numberOfPhases: '3', numberOfGeneratingUnits: '1',
  typeTestCertRef: '', inverterManufacturer: '', inverterModel: '',
  proposedExportCapacity: '', associatedCertRef: '',
  exportCapable: true, exportLimited: false, exportLimit: '',
  exportMeterFitted: false, exportMeterSerial: '', segSupplier: '',
  commissioningDate: '', settingsSource: '',
  ...G99_DEFAULTS,
  powerQualityTHD: '', reactivePowerVerified: false,
  activePowerControlVerified: false, frequencyResponseVerified: false,
  interTripTested: '', measuredExportKW: '', gridVoltageAtConnection: '',
  dnoWitnessRequired: false, dnoWitnessName: '', dnoWitnessDate: '',
  antiIslandingConfirmed: false, protectionSettingsVerified: false,
  systemOperating: false, labelsApplied: false, customerInformed: false,
  overallResult: '',
  installerSignature: '', installerDate: new Date().toISOString().split('T')[0],
  dnoWitnessSignature: '', customerSignature: '', customerDate: '',
  notes: '',
  completedSections: {}, status: 'draft',
});

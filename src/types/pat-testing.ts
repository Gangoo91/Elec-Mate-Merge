/**
 * PAT Testing Certificate Types (IET Code of Practice)
 * Portable appliance test register/log
 */

export type ApplianceClass = 'I' | 'II' | 'III';
export type TestResult = 'pass' | 'fail' | 'na' | '';
export type ApplianceCategory =
  | 'IT'
  | 'portable'
  | 'moveable'
  | 'stationary'
  | 'fixed'
  | 'hand-held';

/**
 * PAT repair codes — these describe what physical repair was done.
 * NOT the same as EICR C1/C2/C3 severity/observation codes.
 */
export const PAT_REPAIR_CODES = [
  { value: '', label: 'N/A — No repair needed' },
  { value: 'RP', label: 'Replaced 13A plug' },
  { value: 'RF3', label: 'Changed fuse to 3A' },
  { value: 'RF5', label: 'Changed fuse to 5A' },
  { value: 'RF13', label: 'Changed fuse to 13A' },
  { value: 'RC', label: 'Replaced/trimmed cable' },
  { value: 'RS', label: 'Replaced trailing socket' },
  { value: 'RE', label: 'Repaired enclosure' },
  { value: 'RO', label: 'Other repair (see notes)' },
  { value: 'SCRAP', label: 'Scrapped — beyond repair' },
  { value: 'RFS', label: 'Removed from service' },
] as const;

export type PATRepairCode = (typeof PAT_REPAIR_CODES)[number]['value'];

export interface Appliance {
  id: string;
  assetNumber: string;
  description: string;
  make: string;
  model: string;
  serialNumber: string;
  location: string;
  applianceClass: ApplianceClass;
  category: ApplianceCategory;

  // Photos
  photos: string[];

  // Visual inspection
  visualInspection: {
    flexCondition: TestResult;
    plugCondition: TestResult;
    fuseRating: string;
    enclosureCondition: TestResult;
    switchesControls: TestResult;
    suitableForEnvironment: TestResult;
    notes: string;
  };

  // Electrical tests
  electricalTests: {
    earthContinuity: {
      result: TestResult;
      reading: string; // Ohms
      limit: string;
    };
    insulationResistance: {
      result: TestResult;
      reading: string; // MOhms
      limit: string;
    };
    loadTest: {
      result: TestResult;
      reading: string; // kVA
      limit: string;
    };
    polarity: TestResult;
    functionalCheck: TestResult;
    leakageCurrent?: {
      result: TestResult;
      reading: string; // mA
      limit: string;
    };
  };

  // Overall result
  overallResult: 'pass' | 'fail' | '';
  repairCode: PATRepairCode;
  barcodeScanned: boolean;
  nextTestDue: string;
  notes: string;

  // Metadata
  testDate: string;
  testedBy: string;
}

export interface PATTestingFormData {
  // Certificate metadata
  certificateNumber: string;
  testDate: string;
  reportReference: string;

  // CRM link
  selectedCustomerId?: string;

  // Client details
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;
  contactPerson: string;

  // Site details
  siteName: string;
  siteAddress: string;
  siteContactName: string;
  siteContactPhone: string;

  // Test equipment
  testEquipment: {
    make: string;
    model: string;
    serialNumber: string;
    lastCalibrationDate: string;
    nextCalibrationDue: string;
  };

  // Appliances
  appliances: Appliance[];

  // Summary
  totalAppliancesTested: number;
  totalPassed: number;
  totalFailed: number;

  // Failed appliances
  failedAppliances: {
    id: string;
    assetNumber: string;
    description: string;
    failureReason: string;
    actionRequired: string;
  }[];

  // Recommendations
  recommendations: string;

  // Testing intervals guidance
  suggestedRetestInterval: string;

  // Tester declaration
  testerName: string;
  testerCompany: string;
  testerQualifications: string;
  testerSignature: string;
  testerDate: string;

  // Next test
  nextTestDue: string;

  // Additional notes
  additionalNotes: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default appliance factory
export const getDefaultAppliance = (): Appliance => ({
  id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  assetNumber: '',
  description: '',
  make: '',
  model: '',
  serialNumber: '',
  location: '',
  applianceClass: 'I',
  category: 'portable',
  photos: [],

  visualInspection: {
    flexCondition: '',
    plugCondition: '',
    fuseRating: '',
    enclosureCondition: '',
    switchesControls: '',
    suitableForEnvironment: '',
    notes: '',
  },

  electricalTests: {
    earthContinuity: {
      result: '',
      reading: '',
      limit: '0.1',
    },
    insulationResistance: {
      result: '',
      reading: '',
      limit: '1.0',
    },
    loadTest: {
      result: '',
      reading: '',
      limit: '',
    },
    polarity: '',
    functionalCheck: '',
  },

  overallResult: '',
  repairCode: '',
  barcodeScanned: false,
  nextTestDue: '',
  notes: '',
  testDate: new Date().toISOString().split('T')[0],
  testedBy: '',
});

// Default form data factory
export const getDefaultPATTestingFormData = (): PATTestingFormData => ({
  certificateNumber: '',
  testDate: new Date().toISOString().split('T')[0],
  reportReference: '',

  selectedCustomerId: undefined,

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',
  contactPerson: '',

  siteName: '',
  siteAddress: '',
  siteContactName: '',
  siteContactPhone: '',

  testEquipment: {
    make: '',
    model: '',
    serialNumber: '',
    lastCalibrationDate: '',
    nextCalibrationDue: '',
  },

  appliances: [],

  totalAppliancesTested: 0,
  totalPassed: 0,
  totalFailed: 0,

  failedAppliances: [],

  recommendations: '',
  suggestedRetestInterval: '12',

  testerName: '',
  testerCompany: '',
  testerQualifications: '',
  testerSignature: '',
  testerDate: new Date().toISOString().split('T')[0],

  nextTestDue: '',

  additionalNotes: '',

  completedSections: {},
  status: 'draft',
});

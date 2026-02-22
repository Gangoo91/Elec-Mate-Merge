/**
 * Emergency Lighting Certificate Types (BS 5266)
 * Installation and periodic inspection certificates
 */

export type SystemType = 'maintained' | 'non-maintained' | 'combined';
export type LuminaireCategory = 'escape-route' | 'open-area' | 'high-risk' | 'standby';
export type TestType = 'monthly' | 'annual' | 'commissioning';

export interface CertificatePhoto {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: string;
  category: 'installation' | 'luminaire' | 'defect' | 'central-battery' | 'exit-sign';
  linkedItemId?: string; // Links to luminaire or defect ID
}

export interface Luminaire {
  id: string;
  location: string;
  luminaireType: string;
  manufacturer: string;
  model: string;
  wattage: number;
  batteryType: string;
  category: LuminaireCategory;
  ratedDuration: 60 | 180; // minutes
  installDate: string;
  functionalTestResult: 'pass' | 'fail' | 'na' | '';
  durationTestResult: 'pass' | 'fail' | 'na' | '';
  notes: string;
  photoUrl?: string; // Photo of this luminaire
}

export interface LuxReading {
  id: string;
  location: string;
  category?: 'escape-route' | 'open-area' | 'high-risk'; // BS EN 1838 zone category
  luxReading: string;
  minRequired: string;
  result: 'pass' | 'fail' | '';
}

export type CertificateType = 'completion' | 'periodic' | 'existing-site' | 'completion-small';

export interface EmergencyLightingFormData {
  // Certificate metadata
  certificateNumber: string;
  certificateType: CertificateType | '';
  testType: TestType | '';
  testDate: string;

  // Client details
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;

  // Premises details
  premisesName: string;
  premisesAddress: string;
  premisesType: string;
  occupancyType: string;
  extentOfInstallation: string;

  // System details
  systemType: SystemType | '';
  ratedDuration: 60 | 180;
  centralBatterySystem: boolean;
  centralBatteryLocation: string;
  selfContainedUnits: boolean;

  // Purpose of system (BS 5266-1 Part 7)
  purposeEscapeRoute: boolean;
  purposeOpenArea: boolean;
  purposeHighRisk: boolean;
  purposeStandby: boolean;

  // Equipment counts
  luminaireCount: number;
  exitSignCount: number;
  centralBatteryCount: number;

  // Luminaire schedule
  luminaires: Luminaire[];

  // Test results
  monthlyFunctionalTest: {
    date: string;
    allLuminairesOperational: boolean;
    chargingIndicatorsNormal: boolean;
    faultsFound: string;
    actionTaken: string;
  };

  annualDurationTest: {
    date: string;
    duration: number; // minutes tested
    allLuminairesOperational: boolean;
    batteryCondition: 'good' | 'fair' | 'poor' | '';
    faultsFound: string;
    actionTaken: string;
  };

  // Individual luminaire test results
  luminaireTestResults: {
    id: string;
    luminaireId: string;
    functionalTest: 'pass' | 'fail' | 'na' | '';
    durationTest: 'pass' | 'fail' | 'na' | '';
    notes: string;
  }[];

  // Test equipment
  luxMeterMake: string;
  luxMeterSerial: string;
  luxMeterCalibrationDate: string;

  // Lux readings (if required)
  luxReadings: LuxReading[];

  // Defects
  defectsFound: {
    id: string;
    description: string;
    priority: 'immediate' | 'within-7-days' | 'within-28-days' | 'recommendation';
    rectified: boolean;
    rectificationDate: string;
    luminaireId?: string; // Link to specific luminaire
    photoUrl?: string; // Photo evidence of defect
  }[];

  // Photos
  photos: CertificatePhoto[];

  // Recommendations
  recommendations: string;

  // Installer/Tester declaration
  testerName: string;
  testerCompany: string;
  testerQualifications: string;
  testerSignature: string;
  testerDate: string;

  // Responsible person (client representative)
  responsiblePersonName: string;
  responsiblePersonPosition: string;
  responsiblePersonSignature: string;
  responsiblePersonDate: string;

  // Service schedule
  nextMonthlyTestDue: string;
  nextAnnualTestDue: string;

  // Overall result
  overallResult: 'satisfactory' | 'unsatisfactory' | '';

  // Additional notes
  additionalNotes: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default form data factory
export const getDefaultEmergencyLightingFormData = (): EmergencyLightingFormData => ({
  certificateNumber: '',
  certificateType: '',
  testType: '',
  testDate: new Date().toISOString().split('T')[0],

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  premisesName: '',
  premisesAddress: '',
  premisesType: '',
  occupancyType: '',
  extentOfInstallation: '',

  systemType: '',
  ratedDuration: 180,
  centralBatterySystem: false,
  centralBatteryLocation: '',
  selfContainedUnits: true,

  purposeEscapeRoute: false,
  purposeOpenArea: false,
  purposeHighRisk: false,
  purposeStandby: false,

  luminaireCount: 0,
  exitSignCount: 0,
  centralBatteryCount: 0,

  luminaires: [],

  monthlyFunctionalTest: {
    date: '',
    allLuminairesOperational: false,
    chargingIndicatorsNormal: false,
    faultsFound: '',
    actionTaken: '',
  },

  annualDurationTest: {
    date: '',
    duration: 0,
    allLuminairesOperational: false,
    batteryCondition: '',
    faultsFound: '',
    actionTaken: '',
  },

  luminaireTestResults: [],

  luxMeterMake: '',
  luxMeterSerial: '',
  luxMeterCalibrationDate: '',

  luxReadings: [],

  defectsFound: [],
  photos: [],
  recommendations: '',

  testerName: '',
  testerCompany: '',
  testerQualifications: '',
  testerSignature: '',
  testerDate: new Date().toISOString().split('T')[0],

  responsiblePersonName: '',
  responsiblePersonPosition: '',
  responsiblePersonSignature: '',
  responsiblePersonDate: '',

  nextMonthlyTestDue: '',
  nextAnnualTestDue: '',

  overallResult: '',

  additionalNotes: '',

  completedSections: {},
  status: 'draft',
});

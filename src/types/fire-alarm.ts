/**
 * Fire Alarm Certificate Types (BS 5839)
 * Installation, commissioning, and periodic test certificates
 */

// System category as defined in BS 5839
export type FireAlarmSystemCategory =
  | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'  // Life safety categories
  | 'M'                                 // Manual system
  | 'P1' | 'P2';                        // Property protection

// Detection types
export type DetectorType =
  | 'optical-smoke'
  | 'ionisation-smoke'
  | 'heat-fixed'
  | 'heat-ror'           // Rate of rise
  | 'multi-sensor'
  | 'beam'
  | 'aspirating'
  | 'flame'
  | 'co';

// Sounder types
export type SounderType =
  | 'bell'
  | 'electronic-sounder'
  | 'voice-alarm'
  | 'visual-beacon';

export interface FireAlarmZone {
  id: string;
  zoneNumber: number;
  zoneName: string;
  location: string;
  detectorCount: number;
  callPointCount: number;
  sounderCount: number;
}

export interface FireAlarmDetector {
  id: string;
  zoneId: string;
  location: string;
  type: DetectorType;
  make: string;
  model: string;
  serialNumber: string;
  installDate: string;
  testResult: 'pass' | 'fail' | 'na' | '';
  notes: string;
}

export interface FireAlarmSounder {
  id: string;
  zoneId: string;
  location: string;
  type: SounderType;
  make: string;
  model: string;
  dBReading: string;
  testResult: 'pass' | 'fail' | 'na' | '';
}

export interface FireAlarmCallPoint {
  id: string;
  zoneId: string;
  location: string;
  type: 'resettable' | 'break-glass';
  make: string;
  model: string;
  testResult: 'pass' | 'fail' | 'na' | '';
}

export interface FireAlarmTestResult {
  id: string;
  testCategory: string;
  testItem: string;
  result: 'pass' | 'fail' | 'na' | '';
  notes: string;
  bs5839Reference: string;
}

export interface FireAlarmFormData {
  // Certificate metadata
  certificateNumber: string;
  certificateType: 'installation' | 'commissioning' | 'periodic';
  inspectionDate: string;
  previousCertificateRef: string;  // For periodic testing - reference to previous cert

  // Third-party certification
  thirdPartyCertification: {
    bafeRegistration: string;      // BAFE SP203-1 registration number
    fiaMembership: string;         // FIA membership number
    nsiSsaibCertification: string; // NSI/SSAIB certification number
    otherAccreditation: string;    // Any other accreditation
  };

  // Fire Risk Assessment reference
  fireRiskAssessment: {
    fraReference: string;
    fraDate: string;
    fraAuthor: string;
    fraCompany: string;
  };

  // Monitoring/ARC details
  monitoringDetails: {
    isMonitored: boolean;
    arcName: string;               // Alarm Receiving Centre name
    arcContactNumber: string;
    arcAccountNumber: string;
    signallingRoute: 'dual-path' | 'single-path' | 'redcare' | 'dualcom' | 'gsm' | 'other' | '';
    signallingRouteOther: string;
  };

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
  floorsCount: number;

  // System details
  systemCategory: FireAlarmSystemCategory | '';
  systemMake: string;
  systemModel: string;
  panelLocation: string;
  panelSerialNumber: string;
  panelSerialPhoto: string;  // Base64 or URL of serial number photo
  zonesCount: number;
  repeatersInstalled: boolean;
  networkType: 'standalone' | 'networked' | 'addressable' | 'conventional';

  // Power supply
  mainsPowerSupply: boolean;
  batteryBackupHours: number;
  batteryType: string;
  batteryTestResult: 'pass' | 'fail' | '';

  // Equipment counts
  detectorCount: {
    opticalSmoke: number;
    ionisationSmoke: number;
    heatFixed: number;
    heatRor: number;
    multiSensor: number;
    beam: number;
    aspirating: number;
    flame: number;
    co: number;
  };
  callPointCount: number;
  sounderCount: number;
  visualAlarmCount: number;

  // Zones
  zones: FireAlarmZone[];

  // Detectors (for detailed schedule)
  detectors: FireAlarmDetector[];

  // Sounders (for detailed schedule)
  sounders: FireAlarmSounder[];

  // Call points (for detailed schedule)
  callPoints: FireAlarmCallPoint[];

  // Sound level readings
  soundLevelReadings: {
    id: string;
    zone: string;
    location: string;
    dBReading: string;
    minRequired: string;
    result: 'pass' | 'fail' | '';
  }[];

  // Testing schedule
  testResults: FireAlarmTestResult[];

  // Control panel tests
  panelTests: {
    powerOnTest: 'pass' | 'fail' | 'na' | '';
    zoneIndicators: 'pass' | 'fail' | 'na' | '';
    faultIndicators: 'pass' | 'fail' | 'na' | '';
    silenceFacility: 'pass' | 'fail' | 'na' | '';
    resetFunction: 'pass' | 'fail' | 'na' | '';
    eventLog: 'pass' | 'fail' | 'na' | '';
    remoteSignalling: 'pass' | 'fail' | 'na' | '';
  };

  // Battery and power tests
  powerTests: {
    mainsSupply: 'pass' | 'fail' | 'na' | '';
    batteryVoltage: string;
    batteryCondition: 'pass' | 'fail' | 'na' | '';
    chargerOperation: 'pass' | 'fail' | 'na' | '';
    standbyDuration: 'pass' | 'fail' | 'na' | '';
  };

  // Fault simulation tests
  faultTests: {
    openCircuit: 'pass' | 'fail' | 'na' | '';
    shortCircuit: 'pass' | 'fail' | 'na' | '';
    earthFault: 'pass' | 'fail' | 'na' | '';
    powerFail: 'pass' | 'fail' | 'na' | '';
  };

  // Commissioning details
  commissioningDate: string;
  handoverDate: string;
  handoverDocumentation: {
    asBuiltDrawings: boolean;
    operationManual: boolean;
    maintenanceLog: boolean;
    zoneChart: boolean;
    causeEffectMatrix: boolean;
    trainingProvided: boolean;
  };

  // Defects and observations
  defectsFound: {
    id: string;
    description: string;
    severity: 'critical' | 'non-critical' | 'recommendation';
    rectified: boolean;
    rectificationDate: string;
    photoUrl?: string;
  }[];

  // Previous defects (for periodic testing - from previous certificate)
  previousDefects: {
    id: string;
    description: string;
    originalDate: string;
    status: 'outstanding' | 'rectified' | 'no-longer-applicable';
    notes: string;
  }[];

  // Declarations
  designerName: string;
  designerCompany: string;
  designerQualifications: string;
  designerSignature: string;
  designerDate: string;

  installerName: string;
  installerCompany: string;
  installerQualifications: string;
  installerSignature: string;
  installerDate: string;

  commissionerName: string;
  commissionerCompany: string;
  commissionerQualifications: string;
  commissionerSignature: string;
  commissionerDate: string;

  // Certification
  overallResult: 'satisfactory' | 'unsatisfactory' | '';
  nextServiceDue: string;
  nextInspectionDue: string;

  // Additional notes
  additionalNotes: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default form data factory
export const getDefaultFireAlarmFormData = (): FireAlarmFormData => ({
  certificateNumber: '',
  certificateType: 'installation',
  inspectionDate: new Date().toISOString().split('T')[0],
  previousCertificateRef: '',

  thirdPartyCertification: {
    bafeRegistration: '',
    fiaMembership: '',
    nsiSsaibCertification: '',
    otherAccreditation: '',
  },

  fireRiskAssessment: {
    fraReference: '',
    fraDate: '',
    fraAuthor: '',
    fraCompany: '',
  },

  monitoringDetails: {
    isMonitored: false,
    arcName: '',
    arcContactNumber: '',
    arcAccountNumber: '',
    signallingRoute: '',
    signallingRouteOther: '',
  },

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  premisesName: '',
  premisesAddress: '',
  premisesType: '',
  occupancyType: '',
  floorsCount: 1,

  systemCategory: '',
  systemMake: '',
  systemModel: '',
  panelLocation: '',
  panelSerialNumber: '',
  panelSerialPhoto: '',
  zonesCount: 1,
  repeatersInstalled: false,
  networkType: 'conventional',

  mainsPowerSupply: true,
  batteryBackupHours: 24,
  batteryType: '',
  batteryTestResult: '',

  detectorCount: {
    opticalSmoke: 0,
    ionisationSmoke: 0,
    heatFixed: 0,
    heatRor: 0,
    multiSensor: 0,
    beam: 0,
    aspirating: 0,
    flame: 0,
    co: 0,
  },
  callPointCount: 0,
  sounderCount: 0,
  visualAlarmCount: 0,

  zones: [],
  detectors: [],
  sounders: [],
  callPoints: [],
  soundLevelReadings: [],
  testResults: [],

  panelTests: {
    powerOnTest: '',
    zoneIndicators: '',
    faultIndicators: '',
    silenceFacility: '',
    resetFunction: '',
    eventLog: '',
    remoteSignalling: '',
  },

  powerTests: {
    mainsSupply: '',
    batteryVoltage: '',
    batteryCondition: '',
    chargerOperation: '',
    standbyDuration: '',
  },

  faultTests: {
    openCircuit: '',
    shortCircuit: '',
    earthFault: '',
    powerFail: '',
  },

  commissioningDate: '',
  handoverDate: '',
  handoverDocumentation: {
    asBuiltDrawings: false,
    operationManual: false,
    maintenanceLog: false,
    zoneChart: false,
    causeEffectMatrix: false,
    trainingProvided: false,
  },

  defectsFound: [],
  previousDefects: [],

  designerName: '',
  designerCompany: '',
  designerQualifications: '',
  designerSignature: '',
  designerDate: '',

  installerName: '',
  installerCompany: '',
  installerQualifications: '',
  installerSignature: '',
  installerDate: '',

  commissionerName: '',
  commissionerCompany: '',
  commissionerQualifications: '',
  commissionerSignature: '',
  commissionerDate: '',

  overallResult: '',
  nextServiceDue: '',
  nextInspectionDue: '',

  additionalNotes: '',

  completedSections: {},
  status: 'draft',
});

/**
 * Fire Alarm Certificate Types (BS 5839)
 * Installation, commissioning, and periodic test certificates
 */

// System category as defined in BS 5839
export type FireAlarmSystemCategory =
  | 'L1'
  | 'L2'
  | 'L3'
  | 'L4'
  | 'L5' // Life safety categories
  | 'M' // Manual system
  | 'P1'
  | 'P2'; // Property protection

// Detection types
export type DetectorType =
  | 'optical-smoke'
  | 'ionisation-smoke'
  | 'heat-fixed'
  | 'heat-ror' // Rate of rise
  | 'multi-sensor'
  | 'beam'
  | 'aspirating'
  | 'flame'
  | 'co';

// Sounder types
export type SounderType = 'bell' | 'electronic-sounder' | 'voice-alarm' | 'visual-beacon';

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

export interface InterfaceEquipment {
  id: string;
  type: 'door-holders' | 'sprinkler-interface' | 'lift-recall' | 'ventilation-dampers' | 'gas-shutdown' | 'access-control' | 'suppression' | 'other' | '';
  location: string;
  interfaceMethod: 'volt-free-relay' | 'monitored-output' | 'addressable-module' | 'hardwired' | '';
  details: string;
  tested: boolean;
}

export interface AspiratingUnit {
  id: string;
  make: string;
  model: string;
  samplingPoints: number;
  pipeLength: string;
  transportTime: string;
  sensitivityLevel: 'class-a' | 'class-b' | 'class-c' | '';
}

export interface TestEquipmentItem {
  id: string;
  type: 'sound-level-meter' | 'smoke-detector-tester' | 'heat-detector-tester' | 'call-point-key' | 'multimeter' | 'other' | '';
  make: string;
  model: string;
  serialNumber: string;
  calibrationDate: string;
  calibrationDue: string;
}

export interface FireAlarmFormData {
  // Certificate metadata
  certificateNumber: string;
  certificateType: 'design' | 'installation' | 'commissioning' | 'acceptance' | 'verification' | 'periodic' | 'modification';
  inspectionDate: string;
  previousCertificateRef: string; // For periodic testing - reference to previous cert

  // Third-party certification
  thirdPartyCertification: {
    bafeRegistration: string; // BAFE SP203-1 registration number
    fiaMembership: string; // FIA membership number
    nsiSsaibCertification: string; // NSI/SSAIB certification number
    otherAccreditation: string; // Any other accreditation
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
    arcName: string; // Alarm Receiving Centre name
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
  panelSerialPhoto: string; // Base64 or URL of serial number photo
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
    areaType: 'general' | 'sleeping' | 'stairwell' | 'plant-room' | '';
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

  // Standard edition reference (P1)
  standardEdition: string;

  // Panel firmware version (P1)
  panelFirmwareVersion: string;

  // Interface equipment (P1)
  interfaceEquipment: InterfaceEquipment[];

  // Cable & wiring details (P1)
  cableType: 'standard-ph30' | 'enhanced-ph120' | 'mineral-insulated' | 'other' | '';
  cableFireRating: string;
  circuitIntegrity: 'standard' | 'enhanced' | 'critical-signal-path' | '';
  wiringNotes: string;

  // Cause & effect (P1)
  causeAndEffectRef: string;
  causeAndEffectVerified: boolean;
  causeAndEffectDate: string;

  // Responsible person acknowledgement (P1)
  responsiblePersonName: string;
  responsiblePersonPosition: string;
  responsiblePersonSignature: string;
  responsiblePersonDate: string;
  responsiblePersonAcknowledgement: boolean;

  // Devices tested count - periodic (P1)
  devicesTestedCount: number;
  devicesTotalCount: number;
  deviceTestingComplete: boolean;

  // Design certificate fields (Phase 1)
  designBasis: string;
  designCoverageCategory: string;
  designDeviations: string;
  designDocRef: string;

  // Acceptance certificate fields (Phase 1)
  acceptanceCriteria: string;
  acceptanceTrainingProvided: boolean;
  acceptanceLogBookProvided: boolean;

  // Verification certificate fields (Phase 1)
  verificationOrganisation: string;
  verificationScope: string;
  verificationFindings: string;
  verificationCompliant: boolean;
  verifierName: string;
  verifierCompany: string;
  verifierQualifications: string;
  verifierSignature: string;
  verifierDate: string;

  // Modification certificate fields (Phase 1)
  modificationDescription: string;
  modificationReason: string;
  modificationExtent: string;
  originalCertRef: string;

  // False alarm management (P2)
  falseAlarmManagement: boolean;
  falseAlarmStrategy: 'none' | 'coincidence-detection' | 'verification' | 'intelligent-detectors' | 'other' | '';
  investigationDelay: number;
  falseAlarmNotes: string;

  // Loop/addressable device count (P2)
  loopCount: number;
  devicesPerLoop: string;
  totalAddressableDevices: number;
  maxLoopCapacity: number;

  // Aspirating system details (P2)
  aspiratingUnits: AspiratingUnit[];

  // Previous certificate details - periodic (P2)
  previousCertificateDate: string;
  previousInspector: string;
  previousInspectorCompany: string;

  // Zone plan reference (P2)
  zonePlanRef: string;
  zonePlanDate: string;

  // Extent of inspection/limitations - periodic (P2)
  extentOfInspection: 'full-system' | 'partial' | '';
  inspectionLimitations: string;
  agreedScope: string;

  // Detector spacing/siting compliance (P2)
  detectorSpacingCompliant: boolean;
  spacingNotes: string;

  // Expanded handover checklist (P2)
  handoverAsBuiltDrawings: boolean;
  handoverOperatingInstructions: boolean;
  handoverLogBook: boolean;
  handoverSpares: boolean;

  // Test equipment details (P3)
  testEquipment: TestEquipmentItem[];

  // Environmental conditions (P3)
  ambientTemperature: string;
  ambientNoiseLevel: string;
  weatherConditions: 'dry' | 'wet' | 'windy' | 'extreme-heat' | 'extreme-cold' | '';

  // Building plan reference (P3)
  buildingPlanRef: string;
  buildingPlanDate: string;

  // Estimated occupancy (P3)
  estimatedOccupancy: number;
  occupancyBasis: string;

  // Installer/commissioner contact details (P3)
  installerCompanyAddress: string;
  installerCompanyPhone: string;
  commissionerCompanyAddress: string;
  commissionerCompanyPhone: string;

  // Related standards references (P3)
  relatedStandards: string[];

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

  standardEdition: 'BS 5839-1:2017+A1:2024',
  panelFirmwareVersion: '',

  interfaceEquipment: [],

  cableType: '',
  cableFireRating: '',
  circuitIntegrity: '',
  wiringNotes: '',

  causeAndEffectRef: '',
  causeAndEffectVerified: false,
  causeAndEffectDate: '',

  responsiblePersonName: '',
  responsiblePersonPosition: '',
  responsiblePersonSignature: '',
  responsiblePersonDate: '',
  responsiblePersonAcknowledgement: false,

  devicesTestedCount: 0,
  devicesTotalCount: 0,
  deviceTestingComplete: false,

  designBasis: '',
  designCoverageCategory: '',
  designDeviations: '',
  designDocRef: '',

  acceptanceCriteria: '',
  acceptanceTrainingProvided: false,
  acceptanceLogBookProvided: false,

  verificationOrganisation: '',
  verificationScope: '',
  verificationFindings: '',
  verificationCompliant: false,
  verifierName: '',
  verifierCompany: '',
  verifierQualifications: '',
  verifierSignature: '',
  verifierDate: '',

  modificationDescription: '',
  modificationReason: '',
  modificationExtent: '',
  originalCertRef: '',

  falseAlarmManagement: false,
  falseAlarmStrategy: '',
  investigationDelay: 0,
  falseAlarmNotes: '',

  loopCount: 0,
  devicesPerLoop: '',
  totalAddressableDevices: 0,
  maxLoopCapacity: 0,

  aspiratingUnits: [],

  previousCertificateDate: '',
  previousInspector: '',
  previousInspectorCompany: '',

  zonePlanRef: '',
  zonePlanDate: '',

  extentOfInspection: '',
  inspectionLimitations: '',
  agreedScope: '',

  detectorSpacingCompliant: false,
  spacingNotes: '',

  handoverAsBuiltDrawings: false,
  handoverOperatingInstructions: false,
  handoverLogBook: false,
  handoverSpares: false,

  testEquipment: [],

  ambientTemperature: '',
  ambientNoiseLevel: '',
  weatherConditions: '',

  buildingPlanRef: '',
  buildingPlanDate: '',

  estimatedOccupancy: 0,
  occupancyBasis: '',

  installerCompanyAddress: '',
  installerCompanyPhone: '',
  commissionerCompanyAddress: '',
  commissionerCompanyPhone: '',

  relatedStandards: [],

  completedSections: {},
  status: 'draft',
});

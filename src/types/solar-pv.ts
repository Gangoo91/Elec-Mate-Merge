/**
 * Solar PV Installation Certificate Types (MCS Compliance)
 *
 * Standards Referenced:
 * - BS 7671:2018+A3:2024 (18th Edition Amendment 3 - includes bidirectional protective devices)
 * - BS EN IEC 62446-1:2016+A1:2018 (PV commissioning, testing and documentation)
 * - MIS 3002:2025 V5.0 (MCS Solar PV Installation Standard)
 *
 * Required for Smart Export Guarantee (SEG) and government grants
 */

// ============================================================================
// Core Enums
// ============================================================================

export type SystemType = 'grid-tied' | 'hybrid' | 'off-grid';
export type MountingType = 'roof-integrated' | 'roof-mounted' | 'ground-mounted' | 'building-integrated';
export type InverterType = 'string' | 'micro' | 'hybrid' | 'central';
export type PhaseType = 'single' | 'three';
export type BatteryChemistry = 'lithium-ion' | 'lfp' | 'lead-acid' | 'other';
export type MeterType = 'smart' | 'export' | 'generation' | 'none';
export type EarthingArrangement = 'TN-S' | 'TN-C-S' | 'TT';
export type DefectSeverity = 'critical' | 'non-critical' | 'recommendation';
export type PhotoCategory = 'array' | 'inverter' | 'meter' | 'isolator' | 'label' | 'general';

// MCS Compliance - Certificate Types per MIS-3002
export type CertificateType = 'installation' | 'commissioning' | 'design-only';
export type WorkType = 'new-installation' | 'retrofit' | 'extension' | 'replacement' | 'repair';
export type YieldCalculationMethod = 'mcs-estimator' | 'sap-2012' | 'pvgis' | 'pvsyst' | 'manufacturer' | 'other';
export type PropertyType = 'domestic' | 'commercial' | 'industrial' | 'agricultural' | 'mixed-use';
export type OwnershipType = 'owner-occupied' | 'landlord' | 'tenant' | 'housing-association' | 'commercial-owner' | 'other';

// ============================================================================
// MCS Compliance
// ============================================================================

export interface MCSDetails {
  installerNumber: string;        // MCS installer registration number
  installationNumber: string;     // MCS installation certificate number
  consumerCode: 'RECC' | 'HIES' | 'other' | '';
  consumerCodeOther?: string;
}

// ============================================================================
// PV Array (String of Panels)
// ============================================================================

export interface PVArray {
  id: string;
  arrayNumber: number;

  // Panels
  panelMake: string;
  panelModel: string;
  panelWattage: number;           // Wp per panel
  panelCount: number;
  mcsCertified: boolean;

  // Configuration
  orientation: string;            // e.g., "South", "South-West", "180°"
  tiltAngle: number;              // degrees from horizontal
  shadingFactor: number;          // 0-1 (1 = no shading)
  mountingType: MountingType;

  // Electrical - Open Circuit
  vocRated: number;               // Voc rated (from datasheet)
  iscRated: number;               // Isc rated (from datasheet)
  vmpRated: number;               // Vmp rated (from datasheet)
  impRated: number;               // Imp rated (from datasheet)

  // String Configuration
  stringsInParallel: number;      // Number of parallel strings
  panelsPerString: number;        // Panels in series per string
  stringVoltageVoc: number;       // String Voc (calculated)
  stringVoltageVmp: number;       // String Vmp (calculated)
  stringCurrentIsc: number;       // String Isc (calculated)
  stringCurrentImp: number;       // String Imp (calculated)

  // Calculated
  arrayCapacity: number;          // kWp (auto-calc: panels × wattage / 1000)

  // DC Cabling
  dcCableType: string;            // e.g., "H1Z2Z2-K Solar Cable"
  dcCableSize: number;            // mm²
  dcCableLength: number;          // metres (one way)

  // Notes
  notes: string;
}

// ============================================================================
// Inverter
// ============================================================================

export interface Inverter {
  id: string;
  make: string;
  model: string;
  serialNumber: string;
  ratedPowerAc: number;           // kW AC output
  ratedPowerDc: number;           // kW DC input
  mcsCertified: boolean;
  type: InverterType;
  mpptCount: number;              // Number of MPPT inputs
  mpptVoltageRange: string;       // e.g., "150-850V"
  maxInputVoltage: number;        // V
  maxInputCurrent: number;        // A per MPPT
  efficiency: number;             // % (e.g., 97.5)
  location: string;               // Physical location
  phases: PhaseType;
  g98g99Compliant: boolean;

  // For hybrid inverters
  batteryCompatible: boolean;

  // Notes
  notes: string;
}

// ============================================================================
// Battery Storage (Optional)
// ============================================================================

export interface BatteryStorage {
  installed: boolean;
  make?: string;
  model?: string;
  serialNumber?: string;
  capacity?: number;              // kWh usable
  capacityTotal?: number;         // kWh total
  chemistry?: BatteryChemistry;
  voltage?: number;               // V nominal
  maxChargePower?: number;        // kW
  maxDischargePower?: number;     // kW
  depthOfDischarge?: number;      // % (e.g., 90)
  cycles?: number;                // Warranty cycles
  location?: string;
  mcsCertified?: boolean;
  notes?: string;
}

// ============================================================================
// DNO/Grid Connection
// ============================================================================

export interface GridConnection {
  dnoName: string;                // e.g., "UK Power Networks", "Western Power"
  dnoRegion?: string;             // e.g., "Eastern", "Southern"
  mpan: string;                   // Meter Point Admin Number (21 digits)
  supplyVoltage: number;          // V (typically 230 or 400)
  supplyPhases: PhaseType;
  maxSupplyFuse: number;          // A
  cutOutLocation: string;

  // G98/G99 Application
  applicationType: 'G98' | 'G99' | ''; // G98 <16A per phase, G99 >16A
  applicationReference: string;
  applicationDate: string;
  approvalDate?: string;
  approvalReference?: string;
  approvalStatus: 'pending' | 'approved' | 'not-required' | '';

  // Export Limiting
  exportLimited: boolean;
  exportLimitKw?: number;
  exportLimitingMethod?: string;  // e.g., "Inverter setting", "Export limiter"

  // Notes
  notes: string;
}

// ============================================================================
// Metering
// ============================================================================

export interface Metering {
  meterType: MeterType;
  meterMake?: string;
  meterModel?: string;
  meterSerial?: string;
  meterLocation?: string;
  ctInstalled?: boolean;          // CT clamp metering
  ctRatio?: string;               // For CT metering, e.g., "100:5"
  generationMeterRequired: boolean;
  exportMeterRequired: boolean;
  smartMeterCompatible: boolean;
  segRegistered: boolean;         // Smart Export Guarantee
  segSupplier?: string;           // SEG supplier name
  notes: string;
}

// ============================================================================
// Test Results (BS 7671:2018+A3:2024 + BS EN IEC 62446-1:2016+A1:2018)
// ============================================================================

// Per-array DC tests
export interface ArrayTestResult {
  arrayId: string;

  // Open Circuit Voltage
  vocMeasured: number;            // V measured
  vocExpected: number;            // V expected (from calculations)
  vocWithinTolerance: boolean;    // Typically ±10%

  // Short Circuit Current
  iscMeasured: number;            // A measured
  iscExpected: number;            // A expected
  iscWithinTolerance: boolean;    // Typically ±10%

  // Insulation Resistance (MΩ)
  irPositiveToEarth: number;      // Positive to earth
  irNegativeToEarth: number;      // Negative to earth
  irPositiveToNegative?: number;  // Positive to negative (optional)
  irMinimumRequired: number;      // Typically 1MΩ
  irTestVoltage: number;          // V (typically 500V or 1000V)

  // Polarity & Continuity
  polarityCorrect: boolean;
  stringContinuity: boolean;

  // Environmental Conditions During Test
  irradiance?: number;            // W/m² (affects Voc/Isc)
  ambientTemp?: number;           // °C
  moduleTemp?: number;            // °C

  // Notes
  notes: string;
}

// Per-inverter tests
export interface InverterTestResult {
  inverterId: string;

  // Isolators
  dcIsolatorOperational: boolean;
  dcIsolatorLocation: string;
  acIsolatorOperational: boolean;
  acIsolatorLocation: string;

  // Protection
  antiIslandingTest: boolean;     // G98/G99 requirement
  antiIslandingMethod: string;    // How verified
  earthFaultProtection: boolean;
  overvoltageProtection: boolean;

  // Commissioning
  firmwareVersion?: string;
  commissioning: {
    powerOnTest: boolean;
    gridSyncTest: boolean;
    displayFunctional: boolean;
    communicationsTest: boolean;
  };

  // Notes
  notes: string;
}

// AC Side Tests (standard BS 7671:2018+A3:2024)
export interface ACTestResults {
  // Earthing
  earthingArrangement: EarthingArrangement;
  zeValue: number;                // Ω (external earth fault loop impedance)
  zeLocation: string;             // Where measured

  // Loop Impedance
  zsValue: number;                // Ω (earth fault loop impedance at furthest point)
  zsLocation: string;             // Where measured
  r1r2Value?: number;             // Ω (R1+R2)

  // RCD Protection
  rcdInstalled: boolean;
  rcdType: string;                // Type A, Type B, etc.
  rcdRating: number;              // mA (typically 30)
  rcdTripTime: number;            // ms at rated current
  rcdTripTimeAt5x?: number;       // ms at 5× rated (for Type A)

  // Insulation Resistance
  insulationResistance: number;   // MΩ
  irTestVoltage: number;          // V (typically 500V)

  // Polarity
  polarityCorrect: boolean;

  // Protection Device
  mcbRating: number;              // A
  mcbType: string;                // B, C, D curve
  mcbLocation: string;

  // Bidirectional Protection (BS 7671:2018+A3:2024 Reg. 530.3.201)
  // Required for generating sets including solar PV, battery storage, V2G
  bidirectionalDeviceInstalled: boolean;
  bidirectionalDeviceType?: string;     // e.g., "Type B RCBO", "Bidirectional MCB"
  bidirectionalDeviceMake?: string;
  bidirectionalDeviceModel?: string;

  // Prospective Fault Current
  pfc: number;                    // kA

  // Notes
  notes: string;
}

// Commissioning checklist
export interface CommissioningResults {
  systemOperational: boolean;
  exportVerified: boolean;
  generationMeterReading?: number;
  exportMeterReading?: number;

  // Customer demonstration
  customerBriefed: boolean;
  shutdownProcedureExplained: boolean;
  emergencyContactProvided: boolean;

  // Documentation
  documentationProvided: boolean;
  systemPerformanceExplained: boolean;
  maintenanceRequirementsExplained: boolean;
  warrantyDetailsExplained: boolean;

  // Initial performance check
  initialPowerOutput?: number;    // kW observed
  weatherConditions?: string;

  // Notes
  notes: string;
}

// Combined test results
export interface SolarTestResults {
  arrayTests: ArrayTestResult[];
  inverterTests: InverterTestResult[];
  acTests: ACTestResults;
  commissioning: CommissioningResults;
}

// ============================================================================
// Defects & Observations
// ============================================================================

export interface Defect {
  id: string;
  description: string;
  severity: DefectSeverity;
  location: string;
  rectified: boolean;
  rectificationDate?: string;
  rectificationNotes?: string;
  photoUrl?: string;
}

// ============================================================================
// Photos
// ============================================================================

export interface CertificatePhoto {
  id: string;
  url: string;
  category: PhotoCategory;
  caption: string;
  timestamp?: string;
}

// ============================================================================
// Handover Documentation
// ============================================================================

export interface HandoverDocumentation {
  userManualProvided: boolean;
  warrantyDocsProvided: boolean;
  mcsDocumentProvided: boolean;
  maintenanceScheduleProvided: boolean;
  emergencyShutdownExplained: boolean;
  systemDesignProvided: boolean;
  g98g99ConfirmationProvided: boolean;
  performanceEstimateProvided: boolean;
  dnoNotificationCopyProvided: boolean;
}

// ============================================================================
// Declaration
// ============================================================================

export interface InstallerDeclaration {
  installerName: string;
  installerCompany: string;
  installerMcsNumber: string;
  installerAddress: string;
  installerPhone: string;
  installerEmail: string;
  installerSignature: string;
  installerDate: string;
}

export interface ElectricianDeclaration {
  required: boolean;              // Different person than installer?
  electricianName?: string;
  electricianCompany?: string;
  electricianRegistration?: string;  // NICEIC, NAPIT, ELECSA, etc.
  electricianScheme?: string;     // Which scheme
  electricianSignature?: string;
  electricianDate?: string;
}

// ============================================================================
// Main Form Data
// ============================================================================

export interface SolarPVFormData {
  // ========== Metadata ==========
  id?: string;
  certificateNumber: string;
  certificateType: CertificateType;       // MCS requirement: Installation/Commissioning/Design
  workType: WorkType;                      // New install/Retrofit/Extension
  installationDate: string;
  commissioningDate: string;
  status: 'draft' | 'in-progress' | 'completed';

  // ========== Client Details ==========
  clientName: string;
  clientAddress: string;
  clientPostcode: string;
  clientEmail: string;
  clientPhone: string;

  // ========== Property & Ownership (MCS Requirement) ==========
  propertyType: PropertyType;
  ownershipType: OwnershipType;
  ownershipOther?: string;                 // If 'other' selected
  propertyAge?: string;                    // Approximate age/era
  roofAge?: string;                        // Roof condition consideration

  // ========== Site Access & Safety ==========
  siteAccessNotes: string;                 // Access requirements, parking, etc.
  safeIsolationVerified: boolean;          // MCS requirement
  asbestosCheckRequired: boolean;          // Pre-2000 properties
  asbestosCheckCompleted: boolean;
  structuralAssessmentRequired: boolean;   // For heavier systems
  structuralAssessmentCompleted: boolean;

  // ========== Installation Address (if different) ==========
  installationSameAsClient: boolean;
  installationAddress: string;
  installationPostcode: string;

  // ========== MCS Compliance ==========
  mcsDetails: MCSDetails;

  // ========== System Overview ==========
  systemType: SystemType;
  totalCapacity: number;          // kWp (auto-calc from arrays)
  estimatedAnnualYield: number;   // kWh
  yieldCalculationMethod: YieldCalculationMethod;
  yieldCalculationNotes?: string; // Additional notes on yield calculation
  co2SavingsAnnual?: number;      // kg CO2/year

  // ========== Design Reference ==========
  designReference?: string;       // Internal design/quote reference
  previousInstallationRef?: string; // If retrofit/extension, reference to prior work

  // ========== PV Arrays ==========
  arrays: PVArray[];

  // ========== Inverter(s) ==========
  inverters: Inverter[];

  // ========== Battery Storage (optional) ==========
  battery: BatteryStorage;

  // ========== Grid Connection ==========
  gridConnection: GridConnection;

  // ========== Metering ==========
  metering: Metering;

  // ========== Test Results ==========
  testResults: SolarTestResults;

  // ========== Defects/Observations ==========
  defects: Defect[];

  // ========== Handover ==========
  handover: HandoverDocumentation;

  // ========== Declarations ==========
  installerDeclaration: InstallerDeclaration;
  electricianDeclaration: ElectricianDeclaration;

  // ========== Photos ==========
  photos: CertificatePhoto[];

  // ========== Additional Notes ==========
  additionalNotes: string;

  // ========== Overall Assessment ==========
  overallSatisfactory: boolean;

  // ========== Form State ==========
  completedSections: Record<string, boolean>;
}

// ============================================================================
// Default Form Data Factory
// ============================================================================

export const getDefaultPVArray = (arrayNumber: number = 1): PVArray => ({
  id: `array-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  arrayNumber,
  panelMake: '',
  panelModel: '',
  panelWattage: 0,
  panelCount: 0,
  mcsCertified: true,
  orientation: 'South',
  tiltAngle: 35,
  shadingFactor: 1,
  mountingType: 'roof-mounted',
  vocRated: 0,
  iscRated: 0,
  vmpRated: 0,
  impRated: 0,
  stringsInParallel: 1,
  panelsPerString: 0,
  stringVoltageVoc: 0,
  stringVoltageVmp: 0,
  stringCurrentIsc: 0,
  stringCurrentImp: 0,
  arrayCapacity: 0,
  dcCableType: 'H1Z2Z2-K Solar Cable',
  dcCableSize: 6,
  dcCableLength: 0,
  notes: '',
});

export const getDefaultInverter = (): Inverter => ({
  id: `inverter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  make: '',
  model: '',
  serialNumber: '',
  ratedPowerAc: 0,
  ratedPowerDc: 0,
  mcsCertified: true,
  type: 'string',
  mpptCount: 2,
  mpptVoltageRange: '',
  maxInputVoltage: 0,
  maxInputCurrent: 0,
  efficiency: 97,
  location: '',
  phases: 'single',
  g98g99Compliant: true,
  batteryCompatible: false,
  notes: '',
});

export const getDefaultArrayTestResult = (arrayId: string): ArrayTestResult => ({
  arrayId,
  vocMeasured: 0,
  vocExpected: 0,
  vocWithinTolerance: false,
  iscMeasured: 0,
  iscExpected: 0,
  iscWithinTolerance: false,
  irPositiveToEarth: 0,
  irNegativeToEarth: 0,
  irMinimumRequired: 1,
  irTestVoltage: 1000,
  polarityCorrect: false,
  stringContinuity: false,
  notes: '',
});

export const getDefaultInverterTestResult = (inverterId: string): InverterTestResult => ({
  inverterId,
  dcIsolatorOperational: false,
  dcIsolatorLocation: '',
  acIsolatorOperational: false,
  acIsolatorLocation: '',
  antiIslandingTest: false,
  antiIslandingMethod: '',
  earthFaultProtection: false,
  overvoltageProtection: false,
  commissioning: {
    powerOnTest: false,
    gridSyncTest: false,
    displayFunctional: false,
    communicationsTest: false,
  },
  notes: '',
});

export const getDefaultSolarPVFormData = (): SolarPVFormData => ({
  // Metadata
  certificateNumber: '',
  certificateType: 'installation',
  workType: 'new-installation',
  installationDate: new Date().toISOString().split('T')[0],
  commissioningDate: new Date().toISOString().split('T')[0],
  status: 'draft',

  // Client
  clientName: '',
  clientAddress: '',
  clientPostcode: '',
  clientEmail: '',
  clientPhone: '',

  // Property & Ownership
  propertyType: 'domestic',
  ownershipType: 'owner-occupied',
  propertyAge: '',
  roofAge: '',

  // Site Access & Safety
  siteAccessNotes: '',
  safeIsolationVerified: false,
  asbestosCheckRequired: false,
  asbestosCheckCompleted: false,
  structuralAssessmentRequired: false,
  structuralAssessmentCompleted: false,

  // Installation
  installationSameAsClient: true,
  installationAddress: '',
  installationPostcode: '',

  // MCS
  mcsDetails: {
    installerNumber: '',
    installationNumber: '',
    consumerCode: '',
  },

  // System Overview
  systemType: 'grid-tied',
  totalCapacity: 0,
  estimatedAnnualYield: 0,
  yieldCalculationMethod: 'mcs-estimator',
  yieldCalculationNotes: '',
  designReference: '',
  previousInstallationRef: '',

  // Arrays - start with one empty array
  arrays: [getDefaultPVArray(1)],

  // Inverters - start with one empty inverter
  inverters: [getDefaultInverter()],

  // Battery
  battery: {
    installed: false,
  },

  // Grid Connection
  gridConnection: {
    dnoName: '',
    mpan: '',
    supplyVoltage: 230,
    supplyPhases: 'single',
    maxSupplyFuse: 100,
    cutOutLocation: '',
    applicationType: '',
    applicationReference: '',
    applicationDate: '',
    approvalStatus: '',
    exportLimited: false,
    notes: '',
  },

  // Metering
  metering: {
    meterType: 'smart',
    generationMeterRequired: false,
    exportMeterRequired: false,
    smartMeterCompatible: true,
    segRegistered: false,
    notes: '',
  },

  // Test Results
  testResults: {
    arrayTests: [],
    inverterTests: [],
    acTests: {
      earthingArrangement: 'TN-C-S',
      zeValue: 0,
      zeLocation: '',
      zsValue: 0,
      zsLocation: '',
      rcdInstalled: true,
      rcdType: 'Type A',
      rcdRating: 30,
      rcdTripTime: 0,
      insulationResistance: 0,
      irTestVoltage: 500,
      polarityCorrect: false,
      mcbRating: 0,
      mcbType: 'B',
      mcbLocation: '',
      bidirectionalDeviceInstalled: false,
      bidirectionalDeviceType: '',
      bidirectionalDeviceMake: '',
      bidirectionalDeviceModel: '',
      pfc: 0,
      notes: '',
    },
    commissioning: {
      systemOperational: false,
      exportVerified: false,
      customerBriefed: false,
      shutdownProcedureExplained: false,
      emergencyContactProvided: false,
      documentationProvided: false,
      systemPerformanceExplained: false,
      maintenanceRequirementsExplained: false,
      warrantyDetailsExplained: false,
      notes: '',
    },
  },

  // Defects
  defects: [],

  // Handover
  handover: {
    userManualProvided: false,
    warrantyDocsProvided: false,
    mcsDocumentProvided: false,
    maintenanceScheduleProvided: false,
    emergencyShutdownExplained: false,
    systemDesignProvided: false,
    g98g99ConfirmationProvided: false,
    performanceEstimateProvided: false,
    dnoNotificationCopyProvided: false,
  },

  // Declarations
  installerDeclaration: {
    installerName: '',
    installerCompany: '',
    installerMcsNumber: '',
    installerAddress: '',
    installerPhone: '',
    installerEmail: '',
    installerSignature: '',
    installerDate: '',
  },
  electricianDeclaration: {
    required: false,
  },

  // Photos
  photos: [],

  // Notes
  additionalNotes: '',

  // Overall Assessment
  overallSatisfactory: false,

  // Form State
  completedSections: {},
});

// ============================================================================
// UK DNO List
// ============================================================================

export const UK_DNOS = [
  { name: 'UK Power Networks', regions: ['Eastern', 'London', 'South Eastern'] },
  { name: 'Western Power Distribution', regions: ['West Midlands', 'East Midlands', 'South West', 'South Wales'] },
  { name: 'Scottish Power Energy Networks', regions: ['North Wales', 'Merseyside', 'South Scotland'] },
  { name: 'Scottish & Southern Electricity Networks', regions: ['North Scotland', 'Southern England'] },
  { name: 'Northern Powergrid', regions: ['North East', 'Yorkshire'] },
  { name: 'Electricity North West', regions: ['North West England'] },
  { name: 'NIE Networks', regions: ['Northern Ireland'] },
] as const;

// ============================================================================
// Orientation Options
// ============================================================================

export const ORIENTATIONS = [
  { label: 'North', value: 'North', bearing: 0 },
  { label: 'North-East', value: 'North-East', bearing: 45 },
  { label: 'East', value: 'East', bearing: 90 },
  { label: 'South-East', value: 'South-East', bearing: 135 },
  { label: 'South', value: 'South', bearing: 180 },
  { label: 'South-West', value: 'South-West', bearing: 225 },
  { label: 'West', value: 'West', bearing: 270 },
  { label: 'North-West', value: 'North-West', bearing: 315 },
] as const;

// ============================================================================
// Shading Factor Guidance
// ============================================================================

export const SHADING_FACTORS = [
  { value: 1.0, label: 'No shading (100%)', description: 'Completely unshaded' },
  { value: 0.95, label: 'Minimal shading (95%)', description: 'Very minor obstructions' },
  { value: 0.90, label: 'Light shading (90%)', description: 'Some shading at edges' },
  { value: 0.85, label: 'Moderate shading (85%)', description: 'Partial shading at times' },
  { value: 0.80, label: 'Significant shading (80%)', description: 'Regular partial shading' },
  { value: 0.75, label: 'Heavy shading (75%)', description: 'Frequent significant shading' },
] as const;

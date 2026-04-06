/**
 * Lightning Protection System Test Certificate Types
 * BS EN 62305-3 Inspection & Testing
 */

export type InspectionType = 'initial' | 'periodic' | 'after-alteration' | 'after-strike';
export type LPSClass = 'I' | 'II' | 'III' | 'IV';
export type LPSType = 'isolated' | 'non-isolated';
export type DesignStandard = 'BS EN 62305' | 'BS 6651' | 'unknown';
export type AirTerminationType = 'mesh' | 'rod' | 'catenary' | 'natural' | 'combination';
export type ConductorMaterial = 'copper-tape' | 'copper-cable' | 'aluminium' | 'galvanised-steel' | 'stainless-steel';
export type ElectrodeType = 'rod' | 'plate' | 'strip' | 'ring' | 'foundation';
export type ElectrodeMaterial = 'copper-clad-steel' | 'solid-copper' | 'galvanised-steel';
export type TestMethod = 'fall-of-potential' | 'stakeless' | 'clamp-on';
export type WeatherCondition = 'dry' | 'damp' | 'wet' | 'frost';
export type SoilCondition = 'dry' | 'moist' | 'saturated' | 'frozen';
export type InspectionResult = 'pass' | 'fail' | 'na' | '';
export type DefectSeverity = 'C1' | 'C2' | 'C3';
export type OverallResult = 'satisfactory' | 'unsatisfactory' | 'satisfactory-with-observations' | '';
export type SPDStatus = 'ok' | 'fault' | 'replaced' | '';

export interface EarthElectrodeTest {
  id: string;
  reference: string;
  location: string;
  electrodeType: ElectrodeType | '';
  testMethod: TestMethod | '';
  measuredResistance: string; // Ω
  previousReading: string; // Ω
  photo: string;
  notes: string;
}

export interface DownConductorTest {
  id: string;
  reference: string;
  location: string;
  fromPoint: string;
  toPoint: string;
  measuredResistance: string; // Ω
  previousReading: string; // Ω
  photo: string;
}

export interface BondingTest {
  id: string;
  reference: string;
  serviceBonded: string;
  bondLocation: string;
  conductorSize: string; // mm²
  measuredResistance: string; // Ω
}

export interface SPDCheck {
  id: string;
  reference: string;
  location: string;
  spdType: '1' | '2' | '3' | '';
  make: string;
  model: string;
  statusIndicator: SPDStatus;
  disconnectorCheck: 'ok' | 'tripped' | '';
}

export interface SeparationDistanceCheck {
  id: string;
  location: string;
  measuredDistance: string; // mm
  requiredDistance: string; // mm
}

export interface VisualInspectionItem {
  id: string;
  category: string;
  description: string;
  result: InspectionResult;
  photo: string;
  note: string;
}

export interface Observation {
  id: string;
  reference: string;
  location: string;
  description: string;
  severity: DefectSeverity | '';
  recommendedAction: string;
  photo: string;
  completionDate: string;
}

export interface LightningProtectionFormData {
  // Certificate
  certificateNumber: string;
  inspectionDate: string;
  inspectionType: InspectionType | '';
  previousCertRef: string;
  previousCertDate: string;
  nextInspectionDue: string;
  nextVisualInspectionDue: string;
  designStandard: DesignStandard | '';

  // Client
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;

  // Site
  siteName: string;
  siteAddress: string;
  buildingType: string;
  buildingUse: string;
  numberOfFloors: string;
  buildingHeight: string; // m
  constructionType: string;

  // Contractor
  contractorCompany: string;
  atlasNumber: string;
  testerName: string;
  testerQualifications: string;
  reviewerName: string;

  // LPS overview
  lpsClass: LPSClass | '';
  lpsType: LPSType | '';
  originalInstallDate: string;
  systemAge: string; // years

  // Air termination
  airTerminationType: AirTerminationType | '';
  airTerminationMaterial: ConductorMaterial | '';
  meshSize: string; // e.g. "5x5"
  numberOfAirRods: string;

  // Down conductors
  downConductorMaterial: ConductorMaterial | '';
  downConductorSize: string; // mm²
  numberOfDownConductors: string;
  downConductorSpacing: string; // m

  // Earth termination
  numberOfElectrodes: string;
  electrodeType: ElectrodeType | '';
  electrodeMaterial: ElectrodeMaterial | '';
  electrodeDepth: string; // m

  // Strike counter
  strikeCounterFitted: boolean;
  strikeCounterReading: string;
  strikeCounterPreviousReading: string;

  // Bonding
  bondingBarLocation: string;
  servicesBonded: {
    electrical: boolean;
    gas: boolean;
    water: boolean;
    telecoms: boolean;
    structuralSteel: boolean;
    hvac: boolean;
    other: string;
  };

  // SPDs
  spd1Fitted: boolean;
  spd1Location: string;
  spd1Make: string;
  spd1Model: string;
  spd2Fitted: boolean;
  spd2Location: string;
  spd2Make: string;
  spd2Model: string;
  spd3Fitted: boolean;
  spd3Location: string;
  spd3Make: string;
  spd3Model: string;

  // Visual inspection
  visualInspection: VisualInspectionItem[];

  // Test conditions
  weatherCondition: WeatherCondition | '';
  soilCondition: SoilCondition | '';
  ambientTemp: string; // °C

  // LPS drawing
  lpsDrawingRef: string;
  lpsDrawingAttached: boolean;

  // Test limitations
  hasTestLimitations: boolean;
  testLimitations: string;

  // Soil resistivity
  soilResistivity: string; // Ω·m

  // Test instrument
  instrumentMake: string;
  instrumentModel: string;
  instrumentSerial: string;
  instrumentCalDate: string;

  // Test schedules
  earthElectrodeTests: EarthElectrodeTest[];
  downConductorTests: DownConductorTest[];
  bondingTests: BondingTest[];
  spdChecks: SPDCheck[];
  separationChecks: SeparationDistanceCheck[];

  // Observations
  observations: Observation[];

  // Risk assessment
  riskAssessmentRef: string;
  riskAssessmentDate: string;
  requiredLPSClass: LPSClass | '';
  actualLPSClass: LPSClass | '';
  riskAssessmentCompliant: boolean;

  // Overall
  overallResult: OverallResult;

  // Signatures
  inspectorSignature: string;
  inspectorDate: string;
  reviewerSignature: string;
  reviewerDate: string;
  clientSignature: string;
  clientDate: string;

  // Photos
  photos: string[];
  additionalNotes: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default visual inspection items
const defaultVisualInspection = (): VisualInspectionItem[] => [
  // Air termination
  { id: crypto.randomUUID(), category: 'Air Termination', description: 'Air rods/terminals condition', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Air Termination', description: 'Horizontal/mesh conductors condition', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Air Termination', description: 'Conductor fixings secure', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Air Termination', description: 'Corrosion on conductors or connections', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Air Termination', description: 'Mesh/rod spacing compliant with class', result: '', photo: '', note: '' },
  // Down conductors
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'Conductors continuous and undamaged', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'Fixings secure', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'Test clamps accessible', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'Routing maintained (not altered by building works)', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'No bi-metallic corrosion at joints', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Down Conductors', description: 'Conductor size adequate for LPS class', result: '', photo: '', note: '' },
  // Earth termination
  { id: crypto.randomUUID(), category: 'Earth Termination', description: 'Inspection housings accessible and in good condition', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Earth Termination', description: 'Earth electrode condition (where visible)', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Earth Termination', description: 'Connections at earth electrodes secure', result: '', photo: '', note: '' },
  // Bonding
  { id: crypto.randomUUID(), category: 'Bonding', description: 'Equipotential bonding bar intact', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Bonding', description: 'All incoming services bonded', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Bonding', description: 'Bonding conductor sizes adequate', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'Bonding', description: 'Connections tight and corrosion-free', result: '', photo: '', note: '' },
  // SPDs
  { id: crypto.randomUUID(), category: 'SPDs', description: 'SPD condition indicators checked', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'SPDs', description: 'SPD disconnectors intact', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'SPDs', description: 'SPD coordination adequate', result: '', photo: '', note: '' },
  // General
  { id: crypto.randomUUID(), category: 'General', description: 'Warning notices in place', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'General', description: 'LPS schematic/drawing available on site', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'General', description: 'New building works or rooftop equipment since last test', result: '', photo: '', note: '' },
  { id: crypto.randomUUID(), category: 'General', description: 'Separation distances maintained', result: '', photo: '', note: '' },
];

// Down conductor spacing requirements per class
export const DOWN_CONDUCTOR_SPACING: Record<string, number> = {
  'I': 10, 'II': 10, 'III': 15, 'IV': 20,
};

// Mesh size requirements per class
export const MESH_SIZE: Record<string, string> = {
  'I': '5×5', 'II': '10×10', 'III': '15×15', 'IV': '20×20',
};

// Next test interval per class (years)
export const TEST_INTERVAL: Record<string, number> = {
  'I': 2, 'II': 2, 'III': 4, 'IV': 4,
};

// Test thresholds
export const EARTH_RESISTANCE_THRESHOLD = 10; // Ω
export const CONTINUITY_THRESHOLD = 1; // Ω
export const BONDING_THRESHOLD = 0.2; // Ω

export const getDefaultLightningProtectionFormData = (): LightningProtectionFormData => ({
  certificateNumber: '',
  inspectionDate: new Date().toISOString().split('T')[0],
  inspectionType: '',
  previousCertRef: '',
  previousCertDate: '',
  nextInspectionDue: '',
  nextVisualInspectionDue: '',
  designStandard: '',

  clientName: '',
  clientAddress: '',
  clientPhone: '',
  clientEmail: '',

  siteName: '',
  siteAddress: '',
  buildingType: '',
  buildingUse: '',
  numberOfFloors: '',
  buildingHeight: '',
  constructionType: '',

  contractorCompany: '',
  atlasNumber: '',
  testerName: '',
  testerQualifications: '',
  reviewerName: '',

  lpsClass: '',
  lpsType: '',
  originalInstallDate: '',
  systemAge: '',

  airTerminationType: '',
  airTerminationMaterial: '',
  meshSize: '',
  numberOfAirRods: '',

  downConductorMaterial: '',
  downConductorSize: '',
  numberOfDownConductors: '',
  downConductorSpacing: '',

  numberOfElectrodes: '',
  electrodeType: '',
  electrodeMaterial: '',
  electrodeDepth: '',

  strikeCounterFitted: false,
  strikeCounterReading: '',
  strikeCounterPreviousReading: '',

  bondingBarLocation: '',
  servicesBonded: {
    electrical: false, gas: false, water: false, telecoms: false,
    structuralSteel: false, hvac: false, other: '',
  },

  spd1Fitted: false, spd1Location: '', spd1Make: '', spd1Model: '',
  spd2Fitted: false, spd2Location: '', spd2Make: '', spd2Model: '',
  spd3Fitted: false, spd3Location: '', spd3Make: '', spd3Model: '',

  visualInspection: defaultVisualInspection(),

  weatherCondition: '',
  soilCondition: '',
  ambientTemp: '',

  lpsDrawingRef: '',
  lpsDrawingAttached: false,

  hasTestLimitations: false,
  testLimitations: '',

  soilResistivity: '',

  instrumentMake: '',
  instrumentModel: '',
  instrumentSerial: '',
  instrumentCalDate: '',

  earthElectrodeTests: [{ id: crypto.randomUUID(), reference: 'E1', location: '', electrodeType: '', testMethod: '', measuredResistance: '', previousReading: '', photo: '', notes: '' }],
  downConductorTests: [{ id: crypto.randomUUID(), reference: 'DC1', location: '', fromPoint: '', toPoint: '', measuredResistance: '', previousReading: '', photo: '' }],
  bondingTests: [{ id: crypto.randomUUID(), reference: 'B1', serviceBonded: '', bondLocation: '', conductorSize: '', measuredResistance: '' }],
  spdChecks: [],
  separationChecks: [],

  observations: [],

  riskAssessmentRef: '',
  riskAssessmentDate: '',
  requiredLPSClass: '',
  actualLPSClass: '',
  riskAssessmentCompliant: false,

  overallResult: '',

  inspectorSignature: '',
  inspectorDate: new Date().toISOString().split('T')[0],
  reviewerSignature: '',
  reviewerDate: '',
  clientSignature: '',
  clientDate: '',

  photos: [],
  additionalNotes: '',

  completedSections: {},
  status: 'draft',
});

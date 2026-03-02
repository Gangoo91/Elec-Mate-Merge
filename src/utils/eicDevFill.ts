/**
 * EIC (Electrical Installation Certificate) - Dev Fill Data
 *
 * Provides realistic test data for EVERY field read by generateTestJSON()
 * so the PDF renders fully populated. Based on BS 7671:2018+A2:2022.
 * Scenario: Domestic consumer unit replacement with ground floor rewire, TN-C-S.
 */

const today = () => new Date().toISOString().split('T')[0];

// ---------------------------------------------------------------------------
// All scalar fields that generateTestJSON reads from formData
// ---------------------------------------------------------------------------

const EIC_DEV_FILL_SCALARS: Record<string, any> = {
  // ========== Client / Installation ==========
  clientName: 'Mr David Thompson',
  clientAddress: '15 Birchwood Close, Solihull, B91 3PQ',
  clientPhone: '0121 704 5678',
  clientEmail: 'david.thompson@email.co.uk',
  installationAddress: '15 Birchwood Close, Solihull, B91 3PQ',
  sameAsClientAddress: 'true',
  installationType: 'domestic',
  description:
    'New domestic consumer unit replacement with full rewire of ground floor lighting and power circuits. RCBO board fitted throughout.',
  extentOfInstallation: 'Full rewire ground floor, consumer unit replacement',
  installationDate: today(),
  testDate: today(),
  constructionDate: today(),

  // ========== Standards ==========
  designStandard: 'BS7671',
  partPCompliance: 'compliant',

  // ========== Supply Characteristics ==========
  supplyVoltage: '230',
  supplyFrequency: '50',
  phases: 'single',
  earthingArrangement: 'tncs',
  supplyType: 'Single phase',
  supplyPME: 'Yes',
  liveConductorType: 'ac-1ph-2w',
  prospectiveFaultCurrent: '1.28',
  externalEarthFaultLoopImpedance: '0.18',
  supplyPolarityConfirmed: true,
  otherSourcesOfSupply: false,
  otherSourcesDetails: '',

  // ========== Supply Protective Device (DNO fuse) ==========
  supplyDeviceBsEn: 'BS 88-3',
  supplyDeviceType: 'Fuse',
  supplyDeviceRating: '100',

  // ========== Main Protective Device ==========
  mainProtectiveDevice: '100A Main Switch',
  mainSwitchRating: '100',
  mainSwitchLocation: 'Under stairs cupboard',
  breakingCapacity: '16',
  mainSwitchBsEn: 'BS EN 60947-3',
  mainSwitchPoles: '2',

  // ========== RCD (root level — main switch RCD if any) ==========
  rcdMainSwitch: '',
  rcdRating: '',
  rcdType: '',

  // ========== Distribution Board (root-level single-board fields) ==========
  boardSize: '14',
  boardType: 'Consumer Unit',
  boardLocation: 'Under stairs cupboard',

  // ========== Cables ==========
  intakeCableSize: '25',
  intakeCableType: 'T+E',
  tailsSize: '25',
  tailsLength: '1.5',

  // ========== Earth Electrode (TN-C-S — no electrode) ==========
  earthElectrodeType: '',
  earthElectrodeResistance: '',
  earthElectrodeLocation: '',

  // ========== Earthing & Bonding ==========
  meansOfEarthing: 'Supplier (TN-C-S)',
  earthingConductorMaterial: 'Copper',
  earthingConductorCsa: '16',
  earthingConductorVerified: true,
  mainBondingMaterial: 'Copper',
  mainBondingVerified: true,
  mainBondingConductor: '10',
  mainBondingSize: '10',
  supplementaryBonding: 'Present where required',
  supplementaryBondingSize: '4',
  equipotentialBonding: 'Satisfactory',
  bondingCompliance: 'Satisfactory',

  // Bonding location checkboxes
  mainBondingLocations: 'Water, Gas',
  bondingToWater: true,
  bondingToGas: true,
  bondingToOil: false,
  bondingToStructuralSteel: false,
  bondingToLightningProtection: false,
  bondingToOther: false,
  bondingOtherSpecify: '',

  // ========== Demand ==========
  maximumDemand: '80',
  maximumDemandUnit: 'amps',
  continuationSheetNo: '',

  // ========== Test Instruments (separate fields for PDF) ==========
  testInstrumentMake: 'Megger MFT1741',
  testInstrumentSerial: '12345678',
  calibrationDate: '2026-01-15',
  testTemperature: '20',
  // Combined string (for UI display)
  testInstruments:
    'Megger MFT1741 S/N: 12345678 Cal: 01/2026 / Kewtech KT65DL S/N: 87654321 Cal: 03/2026',

  // ========== Test Information ==========
  testMethod: 'Dead testing followed by live testing',
  testVoltage: '500',
  testNotes:
    'All circuits tested satisfactorily. RCBOs tested at x1 and x5 rated residual operating current.',

  // ========== Designer ==========
  designerName: 'DAVID THOMPSON',
  designerQualifications: 'C&G 2391-52, C&G 2382-22, AM1, JIB Gold Card',
  designerCompany: 'Thompson Electrical Services Ltd',
  designerAddress: 'Unit 4, Station Road, Solihull, B91 1AA',
  designerPostcode: 'B91 1AA',
  designerPhone: '0121 704 9999',
  designerDate: today(),
  designerSignature: 'D.Thompson',
  designerBs7671Date: '2022',
  designerDepartures: 'None',
  permittedExceptions: 'None',
  riskAssessmentAttached: false,

  // ========== Constructor ==========
  constructorName: 'DAVID THOMPSON',
  constructorQualifications: 'C&G 2391-52, C&G 2382-22, AM1',
  constructorCompany: 'Thompson Electrical Services Ltd',
  constructorAddress: 'Unit 4, Station Road, Solihull, B91 1AA',
  constructorPostcode: 'B91 1AA',
  constructorPhone: '0121 704 9999',
  constructorDate: today(),
  constructorSignature: 'D.Thompson',
  constructorBs7671Date: '2022',
  constructorDepartures: 'None',
  sameAsDesigner: true,

  // ========== Inspector ==========
  inspectorName: 'JAMES MITCHELL',
  inspectorQualifications: 'C&G 2391-52, C&G 2382-22, AM1',
  inspectorCompany: 'Thompson Electrical Services Ltd',
  inspectorAddress: 'Unit 4, Station Road, Solihull, B91 1AA',
  inspectorPostcode: 'B91 1AA',
  inspectorPhone: '0121 704 9999',
  inspectorDate: today(),
  inspectorSignature: 'J.Mitchell',
  inspectorBs7671Date: '2022',
  inspectorDepartures: 'None',
  sameAsConstructor: false,

  // ========== Next Inspection ==========
  nextInspectionInterval: '120',
  nextInspectionDate: new Date(new Date().setFullYear(new Date().getFullYear() + 10))
    .toISOString()
    .split('T')[0],

  // ========== Existing Installation Comments ==========
  existingInstallationComments: '',

  // ========== Inspected By ==========
  inspectedByName: 'JAMES MITCHELL',
  inspectedByForOnBehalfOf: 'Thompson Electrical Services Ltd',
  inspectedByPosition: 'Inspection Engineer',
  inspectedByAddress: 'Unit 4, Station Road, Solihull, B91 1AA',
  inspectedByCpScheme: 'NAPIT',
  inspectedByCpSchemeNA: false,
  inspectedBySignature: 'J.Mitchell',

  // ========== Report Authorised By ==========
  reportAuthorisedByName: 'DAVID THOMPSON',
  reportAuthorisedByDate: today(),
  reportAuthorisedByForOnBehalfOf: 'Thompson Electrical Services Ltd',
  reportAuthorisedByPosition: 'Managing Director',
  reportAuthorisedByAddress: 'Unit 4, Station Road, Solihull, B91 1AA',
  reportAuthorisedByPostcode: 'B91 1AA',
  reportAuthorisedByPhone: '0121 704 9999',
  reportAuthorisedByMembershipNo: 'NAPIT/12345',
  reportAuthorisedBySignature: 'D.Thompson',

  // ========== Additional Notes ==========
  additionalNotes:
    'Installation compliant with BS 7671:2018+A2:2022. Part P notification submitted via NAPIT.',

  // ========== Compliance Booleans ==========
  bs7671Compliance: true,
  buildingRegsCompliance: true,
  competentPersonScheme: true,
};

// ---------------------------------------------------------------------------
// Distribution boards (array of 1)
// ---------------------------------------------------------------------------

const DEV_DISTRIBUTION_BOARDS = [
  {
    id: 'dev-db-1',
    dbReference: 'DB1',
    reference: 'DB1',
    location: 'Under stairs cupboard',
    boardType: 'Consumer Unit',
    type: 'Consumer Unit',
    make: 'Hager',
    boardMake: 'Hager',
    model: 'VML955RK',
    boardModel: 'VML955RK',
    totalWays: '14',
    ways: '14',
    usedWays: '10',
    spareWays: '4',
    zdb: '0.18',
    ipf: '1.28',
    mainSwitchBsEn: 'BS EN 61009',
    mainSwitchType: 'RCBO',
    mainSwitchRating: '100',
    mainSwitchPoles: '2',
    rcdType: '',
    rcdRating: '',
    rcdMeasuredTime: '',
    spdFitted: true,
    spdOperationalStatus: true,
    spdOperational: true,
    spdT1: false,
    spdT2: true,
    spdT3: false,
    spdNA: false,
    confirmedCorrectPolarity: true,
    polarityConfirmed: true,
    confirmedPhaseSequence: false,
    phaseSequenceConfirmed: false,
    supplyFrom: 'Main',
    supplyCableSize: '25',
    supplyCableType: 'T+E',
  },
];

// ---------------------------------------------------------------------------
// Inspection items (14 items per BS 7671 EIC schedule)
// ---------------------------------------------------------------------------

type InspectionOutcome = 'satisfactory' | 'not-applicable' | 'limitation' | '';

interface DevInspectionItem {
  id: string;
  itemNumber: string;
  description: string;
  outcome: InspectionOutcome;
  notes: string;
}

const DEV_INSPECTION_ITEMS: DevInspectionItem[] = [
  {
    id: 'eic_1',
    itemNumber: '1',
    description: "Condition of consumer's intake equipment (Visual inspection only)",
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_2',
    itemNumber: '2',
    description: 'Parallel or switched alternative sources of supply',
    outcome: 'not-applicable',
    notes: '',
  },
  {
    id: 'eic_3',
    itemNumber: '3',
    description: 'Protective measure: Automatic Disconnection of Supply (ADS)',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_4',
    itemNumber: '4',
    description: 'Basic protection',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_5',
    itemNumber: '5',
    description: 'Protective measures other than ADS',
    outcome: 'not-applicable',
    notes: '',
  },
  {
    id: 'eic_6',
    itemNumber: '6',
    description: 'Additional protection',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_7',
    itemNumber: '7',
    description: 'Distribution equipment',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_8',
    itemNumber: '8',
    description: 'Circuits (Distribution and Final)',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_9',
    itemNumber: '9',
    description: 'Isolation and switching',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_10',
    itemNumber: '10',
    description: 'Current-using equipment (permanently connected)',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_11',
    itemNumber: '11',
    description: 'Identification and notices',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_12',
    itemNumber: '12',
    description: 'Location(s) containing a bath or shower',
    outcome: 'not-applicable',
    notes: '',
  },
  {
    id: 'eic_13',
    itemNumber: '13',
    description: 'Other special installations or locations',
    outcome: 'satisfactory',
    notes: '',
  },
  {
    id: 'eic_14',
    itemNumber: '14',
    description: "Prosumer's low voltage electrical installation(s)",
    outcome: 'not-applicable',
    notes: '',
  },
];

// ---------------------------------------------------------------------------
// Schedule of tests (8 domestic circuits — all fields the PDF reads)
// ---------------------------------------------------------------------------

const makeCircuit = (overrides: Record<string, any>) => ({
  // Defaults for every field generateTestJSON reads
  circuitType: 'radial',
  typeOfWiring: 'T+E',
  referenceMethod: 'C',
  protectiveDeviceType: 'RCBO',
  protectiveDeviceCurve: 'B',
  bsStandard: 'BS EN 61009',
  protectiveDeviceKaRating: '6',
  protectiveDeviceLocation: 'DB1',
  insulationTestVoltage: '500',
  insulationResistance: '>999',
  insulationLiveNeutral: '>999',
  insulationLiveEarth: '>999',
  insulationNeutralEarth: '>999',
  polarity: 'correct',
  rcdType: 'A',
  rcdRating: '30',
  rcdBsStandard: 'BS EN 61009',
  rcdRatingA: '30',
  rcdTestButton: 'pass',
  afddTest: '',
  pfc: '',
  pfcLiveNeutral: '',
  pfcLiveEarth: '',
  functionalTesting: 'pass',
  dbReference: 'DB1',
  boardId: 'dev-db-1',
  notes: '',
  pointsServed: '',
  phaseType: 'single',
  // Ring fields default empty (overridden for ring circuits)
  ringR1: '',
  ringRn: '',
  ringR2: '',
  ringContinuityLive: '',
  ringContinuityNeutral: '',
  // Apply overrides last
  ...overrides,
});

const DEV_SCHEDULE_OF_TESTS = [
  makeCircuit({
    id: 'dev-cct-1',
    circuitNumber: '1',
    circuitDescription: 'Lighting GF',
    liveSize: '1.0',
    cpcSize: '1.0',
    protectiveDeviceRating: '6',
    r1r2: '0.92',
    zs: '1.10',
    maxZs: '7.67',
    rcdOneX: '18',
    rcdFiveX: '8',
    rcdHalfX: 'pass',
    pointsServed: '8',
  }),
  makeCircuit({
    id: 'dev-cct-2',
    circuitNumber: '2',
    circuitDescription: 'Lighting FF',
    liveSize: '1.0',
    cpcSize: '1.0',
    protectiveDeviceRating: '6',
    r1r2: '1.24',
    zs: '1.42',
    maxZs: '7.67',
    rcdOneX: '19',
    rcdFiveX: '9',
    rcdHalfX: 'pass',
    pointsServed: '7',
  }),
  makeCircuit({
    id: 'dev-cct-3',
    circuitNumber: '3',
    circuitDescription: 'Ring Final GF',
    circuitType: 'ring',
    liveSize: '2.5',
    cpcSize: '1.5',
    protectiveDeviceRating: '32',
    r1r2: '0.56',
    zs: '0.74',
    maxZs: '1.37',
    rcdOneX: '16',
    rcdFiveX: '7',
    rcdHalfX: 'pass',
    pointsServed: '12',
    ringR1: '0.48',
    ringRn: '0.49',
    ringR2: '0.81',
    ringContinuityLive: '0.48',
    ringContinuityNeutral: '0.49',
  }),
  makeCircuit({
    id: 'dev-cct-4',
    circuitNumber: '4',
    circuitDescription: 'Ring Final FF',
    circuitType: 'ring',
    liveSize: '2.5',
    cpcSize: '1.5',
    protectiveDeviceRating: '32',
    r1r2: '0.68',
    zs: '0.86',
    maxZs: '1.37',
    rcdOneX: '17',
    rcdFiveX: '8',
    rcdHalfX: 'pass',
    pointsServed: '10',
    ringR1: '0.52',
    ringRn: '0.53',
    ringR2: '0.88',
    ringContinuityLive: '0.52',
    ringContinuityNeutral: '0.53',
  }),
  makeCircuit({
    id: 'dev-cct-5',
    circuitNumber: '5',
    circuitDescription: 'Cooker',
    liveSize: '6.0',
    cpcSize: '2.5',
    protectiveDeviceRating: '32',
    r1r2: '0.28',
    zs: '0.46',
    maxZs: '1.37',
    rcdOneX: '15',
    rcdFiveX: '7',
    rcdHalfX: 'pass',
    pointsServed: '1',
  }),
  makeCircuit({
    id: 'dev-cct-6',
    circuitNumber: '6',
    circuitDescription: 'Shower',
    liveSize: '10.0',
    cpcSize: '4.0',
    protectiveDeviceRating: '40',
    r1r2: '0.18',
    zs: '0.36',
    maxZs: '1.09',
    rcdOneX: '14',
    rcdFiveX: '6',
    rcdHalfX: 'pass',
    pointsServed: '1',
  }),
  makeCircuit({
    id: 'dev-cct-7',
    circuitNumber: '7',
    circuitDescription: 'Immersion',
    liveSize: '2.5',
    cpcSize: '1.5',
    protectiveDeviceRating: '16',
    r1r2: '0.44',
    zs: '0.62',
    maxZs: '2.73',
    rcdOneX: '17',
    rcdFiveX: '8',
    rcdHalfX: 'pass',
    pointsServed: '1',
  }),
  makeCircuit({
    id: 'dev-cct-8',
    circuitNumber: '8',
    circuitDescription: 'Smoke/Heat Det',
    liveSize: '1.5',
    cpcSize: '1.0',
    protectiveDeviceRating: '6',
    r1r2: '0.78',
    zs: '0.96',
    maxZs: '7.67',
    rcdOneX: '18',
    rcdFiveX: '8',
    rcdHalfX: 'pass',
    pointsServed: '6',
  }),
];

// ---------------------------------------------------------------------------
// Apply / Clear
// ---------------------------------------------------------------------------

/**
 * Applies dev fill data to the EIC form.
 * Populates EVERY field that generateTestJSON reads so the PDF is fully populated.
 * Does NOT touch certificateNumber (blocked by updateFormData anyway).
 */
export function applyEICDevFill(onUpdate: (field: string, value: any) => void): void {
  // Scalar fields
  Object.entries(EIC_DEV_FILL_SCALARS).forEach(([field, value]) => {
    if (value !== undefined && value !== null) {
      onUpdate(field, value);
    }
  });

  // Array fields
  onUpdate('distributionBoards', DEV_DISTRIBUTION_BOARDS);
  onUpdate('inspectionItems', DEV_INSPECTION_ITEMS);
  onUpdate('scheduleOfTests', DEV_SCHEDULE_OF_TESTS);
  onUpdate('observations', []);
}

/**
 * Clears all EIC form fields (reset).
 * Does NOT touch certificateNumber.
 */
export function clearEICForm(onUpdate: (field: string, value: any) => void): void {
  const emptyScalars: Record<string, any> = {
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    installationAddress: '',
    sameAsClientAddress: '',
    installationDate: '',
    installationType: 'domestic',
    constructionDate: '',
    description: '',
    extentOfInstallation: '',
    testDate: '',
    designStandard: 'BS7671',
    partPCompliance: '',
    supplyVoltage: '230',
    supplyFrequency: '50',
    phases: 'single',
    earthingArrangement: 'tncs',
    supplyType: '',
    supplyPME: '',
    liveConductorType: '',
    prospectiveFaultCurrent: '',
    externalEarthFaultLoopImpedance: '',
    supplyPolarityConfirmed: false,
    otherSourcesOfSupply: false,
    otherSourcesDetails: '',
    supplyDeviceBsEn: '',
    supplyDeviceType: '',
    supplyDeviceRating: '',
    mainProtectiveDevice: '',
    mainSwitchRating: '',
    mainSwitchLocation: '',
    breakingCapacity: '',
    mainSwitchBsEn: '',
    mainSwitchPoles: '',
    rcdMainSwitch: '',
    rcdRating: '',
    rcdType: '',
    boardSize: '',
    boardType: '',
    boardLocation: '',
    intakeCableSize: '',
    intakeCableType: '',
    tailsSize: '',
    tailsLength: '',
    earthElectrodeType: '',
    earthElectrodeResistance: '',
    earthElectrodeLocation: '',
    meansOfEarthing: '',
    earthingConductorMaterial: '',
    earthingConductorCsa: '',
    earthingConductorVerified: false,
    mainBondingMaterial: '',
    mainBondingVerified: false,
    mainBondingConductor: '',
    mainBondingSize: '',
    supplementaryBonding: '',
    supplementaryBondingSize: '',
    equipotentialBonding: '',
    bondingCompliance: '',
    mainBondingLocations: '',
    bondingToWater: false,
    bondingToGas: false,
    bondingToOil: false,
    bondingToStructuralSteel: false,
    bondingToLightningProtection: false,
    bondingToOther: false,
    bondingOtherSpecify: '',
    maximumDemand: '',
    maximumDemandUnit: 'amps',
    continuationSheetNo: '',
    testInstrumentMake: '',
    testInstrumentSerial: '',
    calibrationDate: '',
    testTemperature: '20',
    testInstruments: '',
    testMethod: '',
    testVoltage: '',
    testNotes: '',
    designerName: '',
    designerQualifications: '',
    designerCompany: '',
    designerAddress: '',
    designerPostcode: '',
    designerPhone: '',
    designerDate: '',
    designerSignature: '',
    designerBs7671Date: '',
    designerDepartures: '',
    permittedExceptions: '',
    riskAssessmentAttached: false,
    constructorName: '',
    constructorQualifications: '',
    constructorCompany: '',
    constructorAddress: '',
    constructorPostcode: '',
    constructorPhone: '',
    constructorDate: '',
    constructorSignature: '',
    constructorBs7671Date: '',
    constructorDepartures: '',
    sameAsDesigner: false,
    inspectorName: '',
    inspectorQualifications: '',
    inspectorCompany: '',
    inspectorAddress: '',
    inspectorPostcode: '',
    inspectorPhone: '',
    inspectorDate: '',
    inspectorSignature: '',
    inspectorBs7671Date: '',
    inspectorDepartures: '',
    sameAsConstructor: false,
    nextInspectionInterval: '',
    nextInspectionDate: '',
    existingInstallationComments: '',
    inspectedByName: '',
    inspectedByForOnBehalfOf: '',
    inspectedByPosition: '',
    inspectedByAddress: '',
    inspectedByCpScheme: '',
    inspectedByCpSchemeNA: false,
    inspectedBySignature: '',
    reportAuthorisedByName: '',
    reportAuthorisedByDate: '',
    reportAuthorisedByForOnBehalfOf: '',
    reportAuthorisedByPosition: '',
    reportAuthorisedByAddress: '',
    reportAuthorisedByPostcode: '',
    reportAuthorisedByPhone: '',
    reportAuthorisedByMembershipNo: '',
    reportAuthorisedBySignature: '',
    additionalNotes: '',
    bs7671Compliance: false,
    buildingRegsCompliance: false,
    competentPersonScheme: false,
  };

  Object.entries(emptyScalars).forEach(([field, value]) => {
    onUpdate(field, value);
  });

  onUpdate('distributionBoards', []);
  onUpdate('inspectionItems', []);
  onUpdate('scheduleOfTests', []);
  onUpdate('observations', []);
}

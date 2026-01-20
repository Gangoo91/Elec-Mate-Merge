/**
 * Minor Works Certificate - Dev Fill Data
 *
 * Provides realistic test data for all form fields to test PDF generation
 * and form functionality. Based on BS 7671:2018+A3:2024 MEIWC requirements.
 */

export interface MinorWorksDevFillData {
  // Part 1: Description of the minor works
  clientName: string;
  personOrderingWork: string;
  propertyAddress: string;
  postcode: string;
  workDate: string;
  dateOfCompletion: string;
  nextInspectionDue: string;
  contractorName: string;
  contractorAddress: string;
  workType: string;
  workLocation: string;
  workDescription: string;
  departuresFromBS7671: string;
  permittedExceptions: string;
  riskAssessmentAttached: boolean;
  commentsOnExistingInstallation: string;

  // Supply characteristics
  supplyVoltage: string;
  frequency: string;
  supplyPhases: string;

  // Part 2: Earthing and bonding
  earthingArrangement: string;
  zdb: string;
  earthingConductorPresent: boolean;
  mainEarthingConductorSize: string;
  mainBondingConductorSize: string;
  bondingWater: boolean;
  bondingGas: boolean;
  bondingOil: boolean;
  bondingStructural: boolean;
  bondingOther: boolean;
  bondingOtherSpecify: string;

  // Part 3: Circuit details
  distributionBoard: string;
  dbLocationType: string;
  circuitDesignation: string;
  circuitDescription: string;
  circuitType: string;
  referenceMethod: string;
  liveConductorSize: string;
  cpcSize: string;
  cableType: string;
  installationMethod: string;
  overcurrentDeviceBsEn: string;
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  protectiveDeviceKaRating: string;
  protectionRcd: boolean;
  protectionRcbo: boolean;
  protectionAfdd: boolean;
  protectionSpd: boolean;
  rcdBsEn: string;
  rcdType: string;
  rcdRatingAmps: string;
  rcdIdn: string;
  afddBsEn: string;
  afddRating: string;
  spdBsEn: string;
  spdType: string;

  // Part 4: Test results
  continuityR1R2: string;
  r2Continuity: string;
  ringR1: string;
  ringRn: string;
  ringR2: string;
  insulationTestVoltage: string;
  insulationLiveLive: string;
  insulationLiveNeutral: string;
  insulationLiveEarth: string;
  insulationNeutralEarth: string;
  polarity: string;
  earthFaultLoopImpedance: string;
  maxPermittedZs: string;
  prospectiveFaultCurrent: string;
  functionalTesting: string;
  rcdRating: string;
  rcdOneX: string;
  rcdFiveX: string;
  rcdHalfX: string;
  rcdTestButton: string;
  afddTestButton: string;
  spdIndicatorStatus: string;
  spdVisualInspection: string;
  spdTestButton: boolean;
  testEquipmentModel: string;
  testEquipmentSerial: string;
  testEquipmentCalDate: string;
  testTemperature: string;

  // Part 5: Declaration
  electricianName: string;
  forAndOnBehalfOf: string;
  position: string;
  contractorAddress: string;
  electricianPhone: string;
  electricianEmail: string;
  qualificationLevel: string;
  schemeProvider: string;
  registrationNumber: string;
  ietDeclaration: boolean;
  bs7671Compliance: boolean;
  testResultsAccurate: boolean;
  workSafety: boolean;
  partPNotification: boolean;
  copyProvided: boolean;
  additionalNotes: string;
  signatureDate: string;
  signature: string;

  // Metadata
  certificateNumber: string;
}

/**
 * Complete dev fill data for testing all Minor Works Certificate fields
 * Based on a realistic kitchen socket addition scenario
 */
export const MINOR_WORKS_DEV_FILL: MinorWorksDevFillData = {
  // ==========================================
  // PART 1: Description of the minor works
  // ==========================================
  clientName: 'Mr James Wilson',
  personOrderingWork: '',
  propertyAddress: '42 Oak Tree Avenue, Solihull',
  postcode: 'B91 3PQ',
  workDate: new Date().toISOString().split('T')[0], // Today's date
  dateOfCompletion: new Date().toISOString().split('T')[0], // Today's date
  nextInspectionDue: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0], // 5 years
  contractorName: 'Sparks Electrical Ltd',
  contractorAddress: 'Unit 5, Industrial Estate, Birmingham, B12 9QR',
  workType: 'socket-addition',
  workLocation: 'Kitchen',
  workDescription: 'Installation of additional double socket outlet in kitchen to existing ring final circuit. Socket located above worktop for additional appliances. Cable routed in existing surface-mounted mini-trunking.',
  departuresFromBS7671: 'None',
  permittedExceptions: 'None',
  riskAssessmentAttached: false,
  commentsOnExistingInstallation: 'Existing installation inspected and found to be in satisfactory condition. Main earthing and bonding arrangements adequate. Consumer unit is 18th Edition compliant split-load type with RCBO protection on all circuits. No defects observed that would affect the safety of the new work.',

  // ==========================================
  // Supply characteristics
  // ==========================================
  supplyVoltage: '230',
  frequency: '50',
  supplyPhases: '1',

  // ==========================================
  // PART 2: Earthing and bonding arrangements
  // ==========================================
  earthingArrangement: 'TN-C-S',
  zdb: '0.28',
  earthingConductorPresent: true,
  mainEarthingConductorSize: '16',
  mainBondingConductorSize: '10',
  bondingWater: true,
  bondingGas: true,
  bondingOil: false,
  bondingStructural: false,
  bondingOther: false,
  bondingOtherSpecify: '',

  // ==========================================
  // PART 3: Circuit details
  // ==========================================
  distributionBoard: 'Main CU',
  dbLocationType: 'Under stairs cupboard, Hager 18-way split-load',
  circuitDesignation: '3',
  circuitDescription: 'Kitchen Ring Final Circuit (Sockets)',
  circuitType: 'ring',
  referenceMethod: 'C',
  liveConductorSize: '2.5',
  cpcSize: '1.5',
  cableType: 'twin-earth',
  installationMethod: 'surface-trunking',
  overcurrentDeviceBsEn: 'BS EN 60898-1',
  protectiveDeviceType: 'B',
  protectiveDeviceRating: '32',
  protectiveDeviceKaRating: '6',
  protectionRcd: false,
  protectionRcbo: true,
  protectionAfdd: false,
  protectionSpd: true,
  rcdBsEn: 'BS EN 61009',
  rcdType: 'A',
  rcdRatingAmps: '40',
  rcdIdn: '30',
  afddBsEn: '',
  afddRating: '',
  spdBsEn: 'BS EN 61643-11',
  spdType: '2',

  // ==========================================
  // PART 4: Test results
  // ==========================================
  continuityR1R2: '0.42',
  r2Continuity: '',
  ringR1: '0.48',
  ringRn: '0.49',
  ringR2: '0.81',
  insulationTestVoltage: '500',
  insulationLiveLive: '200',
  insulationLiveNeutral: '200',
  insulationLiveEarth: '200',
  insulationNeutralEarth: '200',
  polarity: 'correct',
  earthFaultLoopImpedance: '0.72',
  maxPermittedZs: '1.37',
  prospectiveFaultCurrent: '2.8',
  functionalTesting: 'pass',
  rcdRating: '30',
  rcdOneX: '18',
  rcdFiveX: '12',
  rcdHalfX: 'pass',
  rcdTestButton: 'pass',
  afddTestButton: '',
  spdIndicatorStatus: 'green',
  spdVisualInspection: 'satisfactory',
  spdTestButton: true,
  testEquipmentModel: 'Megger MFT1741',
  testEquipmentSerial: '241056789',
  testEquipmentCalDate: '2025-06-15',
  testTemperature: '20',

  // ==========================================
  // PART 5: Declaration
  // ==========================================
  electricianName: 'John Smith',
  forAndOnBehalfOf: 'Sparks Electrical Ltd',
  position: 'Qualified Supervisor',
  contractorAddress: 'Unit 5, Industrial Estate, Birmingham, B12 9QR',
  electricianPhone: '0121 456 7890',
  electricianEmail: 'john@sparkselectrical.co.uk',
  qualificationLevel: 'level3',
  schemeProvider: 'niceic',
  registrationNumber: '123456',
  ietDeclaration: true,
  bs7671Compliance: true,
  testResultsAccurate: true,
  workSafety: true,
  partPNotification: true,
  copyProvided: true,
  additionalNotes: 'Customer advised to test RCD quarterly using test button. Socket circuit now has 7 double sockets.',
  signatureDate: new Date().toISOString().split('T')[0],
  signature: '', // Leave empty - user will draw

  // ==========================================
  // Metadata
  // ==========================================
  certificateNumber: `MW-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(6, '0')}`,
};

/**
 * Alternative dev fill for TT system (earth electrode)
 */
export const MINOR_WORKS_DEV_FILL_TT: Partial<MinorWorksDevFillData> = {
  earthingArrangement: 'TT',
  zdb: '21.5',
  commentsOnExistingInstallation: 'TT earthing system with earth electrode. Electrode resistance measured at 21Ω. RCD protection essential for all circuits. Installation in satisfactory condition.',
};

/**
 * Alternative dev fill for lighting circuit (radial)
 */
export const MINOR_WORKS_DEV_FILL_LIGHTING: Partial<MinorWorksDevFillData> = {
  workType: 'lighting-addition',
  workLocation: 'Bathroom',
  workDescription: 'Installation of LED downlights in bathroom. IP65 rated fittings used. Connected to existing lighting circuit with new switch.',
  circuitDesignation: '1',
  circuitDescription: 'Downstairs Lighting',
  circuitType: 'radial',
  liveConductorSize: '1.5',
  cpcSize: '1.0',
  protectiveDeviceType: 'B',
  protectiveDeviceRating: '6',
  continuityR1R2: '0.85',
  ringR1: '',
  ringRn: '',
  ringR2: '',
  partPNotification: true, // Bathroom work
};

/**
 * Applies dev fill data to the form
 * @param onUpdate - Form update function
 * @param variant - Which dev fill variant to use
 */
export function applyMinorWorksDevFill(
  onUpdate: (field: string, value: any) => void,
  variant: 'default' | 'tt' | 'lighting' = 'default'
): void {
  // Start with default data
  let data = { ...MINOR_WORKS_DEV_FILL };

  // Apply variant overrides
  if (variant === 'tt') {
    data = { ...data, ...MINOR_WORKS_DEV_FILL_TT };
  } else if (variant === 'lighting') {
    data = { ...data, ...MINOR_WORKS_DEV_FILL_LIGHTING };
  }

  // Apply each field
  Object.entries(data).forEach(([field, value]) => {
    if (value !== undefined && value !== null) {
      onUpdate(field, value);
    }
  });
}

/**
 * Clears all form fields (reset)
 * @param onUpdate - Form update function
 */
export function clearMinorWorksForm(
  onUpdate: (field: string, value: any) => void
): void {
  const emptyData: Partial<MinorWorksDevFillData> = {
    clientName: '',
    personOrderingWork: '',
    propertyAddress: '',
    postcode: '',
    workDate: '',
    dateOfCompletion: '',
    nextInspectionDue: '',
    contractorName: '',
    contractorAddress: '',
    supplyVoltage: '',
    frequency: '',
    supplyPhases: '',
    workType: '',
    workLocation: '',
    workDescription: '',
    departuresFromBS7671: '',
    permittedExceptions: '',
    riskAssessmentAttached: false,
    commentsOnExistingInstallation: '',
    earthingArrangement: '',
    zdb: '',
    earthingConductorPresent: false,
    mainEarthingConductorSize: '',
    mainBondingConductorSize: '',
    bondingWater: false,
    bondingGas: false,
    bondingOil: false,
    bondingStructural: false,
    bondingOther: false,
    bondingOtherSpecify: '',
    distributionBoard: '',
    dbLocationType: '',
    circuitDesignation: '',
    circuitDescription: '',
    circuitType: 'radial',
    referenceMethod: '',
    liveConductorSize: '',
    cpcSize: '',
    cableType: '',
    installationMethod: '',
    overcurrentDeviceBsEn: '',
    protectiveDeviceType: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',
    protectionRcd: false,
    protectionRcbo: false,
    protectionAfdd: false,
    protectionSpd: false,
    rcdBsEn: '',
    rcdType: '',
    rcdRatingAmps: '',
    rcdIdn: '',
    afddBsEn: '',
    afddRating: '',
    spdBsEn: '',
    spdType: '',
    continuityR1R2: '',
    r2Continuity: '',
    ringR1: '',
    ringRn: '',
    ringR2: '',
    insulationTestVoltage: '500',
    insulationLiveLive: '',
    insulationLiveNeutral: '',
    insulationLiveEarth: '',
    insulationNeutralEarth: '',
    polarity: '',
    earthFaultLoopImpedance: '',
    maxPermittedZs: '',
    prospectiveFaultCurrent: '',
    functionalTesting: '',
    rcdRating: '',
    rcdOneX: '',
    rcdFiveX: '',
    rcdHalfX: '',
    rcdTestButton: '',
    afddTestButton: '',
    spdIndicatorStatus: '',
    spdVisualInspection: '',
    spdTestButton: false,
    testEquipmentModel: '',
    testEquipmentSerial: '',
    testEquipmentCalDate: '',
    testTemperature: '20',
    electricianName: '',
    forAndOnBehalfOf: '',
    position: '',
    contractorAddress: '',
    electricianPhone: '',
    electricianEmail: '',
    qualificationLevel: '',
    schemeProvider: '',
    registrationNumber: '',
    ietDeclaration: false,
    bs7671Compliance: false,
    testResultsAccurate: false,
    workSafety: false,
    partPNotification: false,
    copyProvided: false,
    additionalNotes: '',
    signatureDate: '',
    signature: '',
  };

  Object.entries(emptyData).forEach(([field, value]) => {
    onUpdate(field, value);
  });
}

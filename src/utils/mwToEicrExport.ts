/**
 * Minor Works → EICR Export Utility
 *
 * A Minor Electrical Installation Works cert documents ONE circuit's addition/
 * alteration. Converting to an EICR carries the shared installation, supply,
 * earthing/bonding and signatory details across, and folds that single circuit
 * into the EICR's Schedule of Test Results as row 1 — so the electrician doesn't
 * re-key anything they already recorded.
 *
 * NOT transferred (each is fresh on the EICR): the 66-item inspection schedule,
 * observations, overall assessment, and the fresh inspector signature/date.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestResult } from '@/types/testResult';
import { EICRFormData, ExportValidation } from './eicToEicrExport';

// MW writes earthing like "TN-C-S-PME"; the EICR dropdown uses lowercase tokens
// ("tn-c-s", "tn-s", "tt"…). Map so it lands in the right option, not blank.
function normaliseEarthingForEicr(raw: unknown): string {
  const v = String(raw || '')
    .trim()
    .toLowerCase();
  if (!v) return '';
  if (v.includes('pnb')) return 'tn-c-s-pnb';
  if (v.includes('tn-c-s') || v.includes('tncs') || v.includes('pme')) return 'tn-c-s';
  if (v === 'tns' || v.includes('tn-s')) return 'tn-s';
  if (v === 'tnc' || v.includes('tn-c')) return 'tn-c';
  if (v.includes('tt')) return 'tt';
  if (v.includes('it')) return 'it';
  return v;
}

// MW stores its single circuit as flat top-level fields (no array). Fold those
// into one EICR circuit row.
function mwCircuitToEICR(mw: Record<string, any>): TestResult {
  const threePhase = String(mw.supplyPhases || '').includes('3');
  return {
    id: crypto.randomUUID(),
    circuitNumber: mw.circuitDesignation || '1',
    circuitDescription: mw.circuitDescription || '',
    circuitDesignation: mw.circuitDesignation || mw.circuitDescription || '',
    phaseType: threePhase ? '3P' : '1P',
    referenceMethod: mw.referenceMethod || '',
    typeOfWiring: mw.cableType || '',
    cableType: mw.cableType || '',
    liveSize: mw.liveConductorSize || '',
    cableSize: mw.liveConductorSize || '',
    cpcSize: mw.cpcSize || '',
    protectiveDeviceType: mw.protectiveDeviceType || '',
    protectiveDeviceCurve: mw.protectiveDeviceType || '',
    protectiveDeviceRating: mw.protectiveDeviceRating || '',
    protectiveDeviceKaRating: mw.protectiveDeviceKaRating || '',
    bsStandard: mw.overcurrentDeviceBsEn || '',
    maxZs: mw.maxPermittedZs || '',

    // Continuity
    r1r2: mw.continuityR1R2 || '',
    r2: mw.r2Continuity || '',
    ringR1: mw.ringR1 || '',
    ringRn: mw.ringRn || '',
    ringR2: mw.ringR2 || '',

    // Insulation resistance
    insulationTestVoltage: mw.insulationTestVoltage || '500',
    insulationLiveNeutral: mw.insulationLiveNeutral || '',
    insulationLiveEarth: mw.insulationLiveEarth || '',
    insulationResistance: mw.insulationLiveEarth || mw.insulationLiveNeutral || '',

    polarity: mw.polarity || '',
    zs: mw.earthFaultLoopImpedance || '',

    // RCD
    rcdBsStandard: mw.rcdBsEn || '',
    rcdType: mw.rcdType || '',
    rcdRating: mw.rcdIdn || mw.rcdRating || '',
    rcdOneX: mw.rcdOneX || '',
    rcdFiveX: mw.rcdFiveX || '',
    rcdHalfX: mw.rcdHalfX || '',
    rcdTestButton: mw.rcdTestButton || '',

    // AFDD + functional
    afddTest: mw.afddTestButton || '',
    functionalTesting: mw.functionalTesting || '',
    pfc: mw.prospectiveFaultCurrent || '',
  } as TestResult;
}

/**
 * Validates whether a Minor Works cert can be exported to EICR.
 */
export function validateMWForExport(mw: Record<string, any>): ExportValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!mw.clientName) warnings.push('Client name is missing — add it on the EICR');
  if (!mw.propertyAddress && !mw.installationAddress)
    errors.push('Installation address is required');
  if (!mw.circuitDescription)
    warnings.push('No circuit description — the transferred circuit will be blank');

  return { isValid: errors.length === 0, errors, warnings };
}

/**
 * Transforms Minor Works data into EICR format.
 */
export function transformMWToEICR(mw: Record<string, any>): EICRFormData {
  const circuit = mwCircuitToEICR(mw);

  // Bonding: MW holds per-service booleans; the EICR reads a comma list.
  const bondingLocations = [
    mw.bondingWater && 'water',
    mw.bondingGas && 'gas',
    mw.bondingOil && 'oil',
    mw.bondingStructural && 'structural',
    mw.bondingOther && 'other',
  ]
    .filter(Boolean)
    .join(',');

  const out = {
    // Certificate — generated fresh on save
    certificateNumber: '',

    // Client
    clientName: mw.clientName || '',
    clientPhone: mw.clientPhone || '',
    clientEmail: mw.clientEmail || '',
    clientAddress: '',
    sameAsClientAddress: 'false',
    installationAddress: mw.propertyAddress || mw.installationAddress || '',

    // Installation
    description: mw.workDescription || mw.description || '',
    installationType: '',
    estimatedAge: '',

    // Supply characteristics
    supplyVoltage: mw.supplyVoltage || '',
    supplyFrequency: mw.frequency || '50',
    phases: mw.supplyPhases || '',
    earthingArrangement: normaliseEarthingForEicr(mw.earthingArrangement),
    supplyType: normaliseEarthingForEicr(mw.earthingArrangement),
    supplyPME: '',
    mainProtectiveDevice: '',
    mainSwitchRating: '',
    rcdMainSwitch: '',
    rcdRating: '',
    prospectiveFaultCurrent: mw.prospectiveFaultCurrent || '',
    externalZe: mw.externalImpedance || '',
    externalEarthFaultLoopImpedance: mw.externalImpedance || '',

    // DNO — not on MW, fresh
    dnoName: '',
    mpan: '',
    cutoutLocation: '',
    serviceEntry: '',

    // Earthing & bonding
    earthElectrodeType: '',
    earthElectrodeResistance: mw.earthElectrodeResistance || '',
    earthingConductorCsa: mw.mainEarthingConductorSize || '',
    earthingConductorMaterial: mw.mainEarthingConductorMaterial || '',
    mainBondingSize: mw.mainBondingConductorSize || '',
    mainBondingSizeCustom: mw.mainBondingConductorSizeCustom || '',
    mainBondingLocations: bondingLocations,
    bondingCompliance: '',
    supplementaryBondingSize: '',
    supplementaryBondingSizeCustom: '',
    equipotentialBonding: '',

    // Consumer unit / DB
    cuLocation: mw.dbLocationType || mw.distributionBoard || '',
    cuManufacturer: '',
    cuType: '',
    boardSize: '',
    intakeCableSize: '',
    intakeCableType: '',
    tailsSize: '',
    tailsLength: '',

    // Schedule of tests — the single MW circuit becomes row 1
    scheduleOfTests: [circuit],

    // Comments carry over — MW's existing-installation comment maps to the EICR's
    commentsOnExistingInstallation: mw.commentsOnExistingInstallation || '',
    existingInstallationComments: mw.commentsOnExistingInstallation || '',

    // Signatory — from the MW electrician / contractor
    inspectorName: mw.electricianName || '',
    inspectorQualifications: mw.qualificationLevel || '',
    inspectorSignature: '', // fresh for the EICR
    inspectorDate: '',
    companyName: mw.contractorName || '',
    companyAddress: mw.contractorAddress || '',
    companyPhone: mw.contractorPhone || mw.electricianPhone || '',
    companyEmail: mw.contractorEmail || mw.electricianEmail || '',
    registrationScheme: mw.schemeProvider || '',
    registrationNumber: mw.registrationNumber || '',

    // Fresh for the EICR
    inspectionItems: [],
    defectObservations: [],
    generalObservations: [],
    overallAssessment: '',
    satisfactoryForContinuedUse: '',

    // Provenance
    sourceMWReportId: mw.__sourceReportId || '',
    convertedFromMinorWorks: true,
  };

  return out as unknown as EICRFormData;
}

/**
 * Summary of what will transfer vs what needs fresh input.
 */
export function getMWExportSummary(mw: Record<string, any>): {
  transferredFields: string[];
  requiredFields: string[];
  circuitCount: number;
} {
  const transferredFields: string[] = [];
  if (mw.clientName) transferredFields.push('Client details');
  if (mw.propertyAddress || mw.installationAddress)
    transferredFields.push('Installation address');
  if (mw.supplyVoltage) transferredFields.push('Supply voltage');
  if (mw.earthingArrangement) transferredFields.push('Earthing arrangement');
  if (mw.mainBondingConductorSize) transferredFields.push('Main bonding');
  if (mw.circuitDescription) transferredFields.push('Circuit + test results (1 circuit)');
  if (mw.electricianName) transferredFields.push('Signatory details');

  const requiredFields = [
    '66 inspection checklist items',
    'Overall assessment',
    'Satisfactory for continued use declaration',
    'Fresh inspector signature',
    'Next inspection date recommendation',
    'Any further circuits + observations',
  ];

  return { transferredFields, requiredFields, circuitCount: mw.circuitDescription ? 1 : 0 };
}

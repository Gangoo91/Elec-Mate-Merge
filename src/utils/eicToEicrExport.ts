/**
 * EIC to EICR Export Utility
 *
 * Transforms completed EIC certificate data into EICR format.
 * Uses installation details and test data from EIC as baseline for EICR pre-fill.
 *
 * IMPORTANT: Inspection items are NOT transferred between certificate types.
 * - EIC has its own inspection checklist stored in `inspections`
 * - EICR has 66 inspection checklist items stored in `inspectionItems`
 * - Each certificate type has its own native inspection requirements
 * - Only client details, installation info, supply characteristics, and
 *   circuit test data (scheduleOfTests) are transferred
 */

import { TestResult } from '@/types/testResult';

export interface EICFormData {
  // Certificate Details
  certificateNumber?: string;

  // Client Details
  clientName?: string;
  clientAddress?: string;
  clientPhone?: string;
  clientEmail?: string;

  // Installation Details
  installationAddress?: string;
  sameAsClientAddress?: string;
  installationDate?: string;
  installationType?: string;
  description?: string;
  designStandard?: string;

  // Supply & Earthing
  supplyVoltage?: string;
  supplyFrequency?: string;
  phases?: string;
  earthingArrangement?: string;
  supplyType?: string;
  supplyPME?: string;
  mainProtectiveDevice?: string;
  mainSwitchRating?: string;
  rcdMainSwitch?: string;
  rcdRating?: string;

  // Distribution Board
  boardSize?: string;
  boardType?: string;
  boardLocation?: string;

  // Cables
  intakeCableSize?: string;
  intakeCableType?: string;
  tailsSize?: string;
  tailsLength?: string;

  // Earthing & Bonding
  earthElectrodeType?: string;
  earthElectrodeResistance?: string;
  mainBondingConductor?: string;
  mainBondingSize?: string;
  mainBondingSizeCustom?: string;
  bondingCompliance?: string;
  supplementaryBonding?: string;
  supplementaryBondingSize?: string;
  supplementaryBondingSizeCustom?: string;
  equipotentialBonding?: string;

  // Test Data - EIC stores these differently
  scheduleOfTests?: any[];

  // Inspections - NOT transferred
  inspections?: Record<string, any>;

  // Declarations (EIC-specific, not transferred)
  designerName?: string;
  designerQualifications?: string;
  designerSignature?: string;
  designerDate?: string;
  constructorName?: string;
  constructorQualifications?: string;
  constructorSignature?: string;
  constructorDate?: string;
  inspectorName?: string;
  inspectorQualifications?: string;
  inspectorSignature?: string;
  inspectorDate?: string;
  inspectorCompany?: string;

  // Company Details
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
}

export interface EICRFormData {
  // Certificate Details
  certificateNumber?: string;

  // Client Details
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  sameAsClientAddress?: string;
  installationAddress?: string;
  description?: string;
  installationType?: string;
  estimatedAge?: string;

  // Supply Characteristics
  supplyVoltage?: string;
  supplyFrequency?: string;
  phases?: string;
  earthingArrangement?: string;
  supplyType?: string;
  supplyPME?: string;
  mainProtectiveDevice?: string;
  mainSwitchRating?: string;
  rcdMainSwitch?: string;
  rcdRating?: string;

  // DNO / Supply Authority Details
  dnoName?: string;
  mpan?: string;
  cutoutLocation?: string;
  serviceEntry?: string;

  // Earthing & Bonding
  earthElectrodeType?: string;
  earthElectrodeResistance?: string;
  mainBondingSize?: string;
  mainBondingSizeCustom?: string;
  mainBondingLocations?: string;
  bondingCompliance?: string;
  supplementaryBondingSize?: string;
  supplementaryBondingSizeCustom?: string;
  equipotentialBonding?: string;

  // Consumer Unit
  cuLocation?: string;
  cuManufacturer?: string;
  cuType?: string;

  // Electrical Installation
  boardSize?: string;
  intakeCableSize?: string;
  intakeCableType?: string;
  tailsSize?: string;
  tailsLength?: string;

  // Test Data
  scheduleOfTests?: TestResult[];

  // Inspector Details
  inspectorName?: string;
  inspectorQualifications?: string;
  inspectorSignature?: string;
  inspectorDate?: string;
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  registrationScheme?: string;
  registrationNumber?: string;

  // Inspection Items - NOT transferred, will be filled fresh
  inspectionItems?: any[];

  // Observations - NOT transferred
  defectObservations?: any[];
  generalObservations?: any[];

  // Assessment - NOT transferred, must be completed fresh
  overallAssessment?: string;
  satisfactoryForContinuedUse?: string;
}

export interface ExportValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates if an EIC report can be exported to EICR
 */
export function validateEICForExport(eicData: EICFormData): ExportValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!eicData.installationAddress) {
    errors.push('Installation address is required');
  }

  if (!eicData.clientName) {
    warnings.push('Client name is missing - will need to be added to EICR');
  }

  // Check if there are circuits to export
  if (!eicData.scheduleOfTests || eicData.scheduleOfTests.length === 0) {
    warnings.push('No circuit test data available - you will need to complete testing for EICR');
  }

  // Check for incomplete circuit data
  const incompleteCircuits = eicData.scheduleOfTests?.filter(circuit =>
    !circuit.circuitDescription || !circuit.protectiveDeviceRating
  ) || [];

  if (incompleteCircuits.length > 0) {
    warnings.push(`${incompleteCircuits.length} circuit(s) have incomplete data`);
  }

  // Note about inspection requirements
  warnings.push('EICR requires completion of 66 inspection checklist items');

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Maps EIC circuit data to EICR TestResult format
 */
function mapCircuitToEICR(circuit: any): TestResult {
  return {
    id: circuit.id || crypto.randomUUID(),
    circuitNumber: circuit.circuitNumber || '',
    circuitDescription: circuit.circuitDescription || '',
    circuitDesignation: circuit.circuitDesignation || circuit.circuitDescription || '',
    phaseType: circuit.phaseType === 'three' ? '3P' : '1P',
    referenceMethod: circuit.referenceMethod || '',
    pointsServed: circuit.pointsServed || '',
    liveSize: circuit.liveSize || '',
    cableSize: circuit.liveSize || circuit.cableSize || '',
    cpcSize: circuit.cpcSize || '',
    protectiveDeviceType: circuit.protectiveDeviceType || '',
    protectiveDeviceCurve: circuit.protectiveDeviceCurve || '',
    protectiveDeviceRating: circuit.protectiveDeviceRating || '',
    protectiveDeviceKaRating: circuit.protectiveDeviceKaRating || '',
    bsStandard: circuit.bsStandard || '',

    // Test results
    r1r2: circuit.r1r2 || '',
    ringR1: circuit.ringR1 || '',
    ringRn: circuit.ringRn || '',
    ringR2: circuit.ringR2 || '',
    ringContinuityLive: circuit.ringContinuityLive || '',
    ringContinuityNeutral: circuit.ringContinuityNeutral || '',
    insulationTestVoltage: circuit.insulationTestVoltage || '500',
    insulationResistance: circuit.insulationResistance || '',
    insulationLiveNeutral: circuit.insulationLiveNeutral || circuit.insulationResistance || '',
    polarity: circuit.polarity || '',
    zs: circuit.zs || '',
    maxZs: circuit.maxZs || '',

    // RCD fields
    rcdRating: circuit.rcdRating || '',
    rcdOneX: circuit.rcdOneX || '',
    rcdTestButton: circuit.rcdTestButton || '',

    // AFDD
    afddTest: circuit.afddTest || '',

    // PFC and functional
    pfc: circuit.pfc || '',
    functionalTesting: circuit.functionalTesting || '',
  };
}

/**
 * Transforms EIC data to EICR format
 *
 * NOTE: This function deliberately DOES NOT transfer inspection items.
 * - EIC's `inspections` are NOT copied to EICR
 * - EICR has its own `inspectionItems` array that must be filled in fresh (66 items)
 * - Only transferable data (client, installation, supply, circuits) is mapped
 */
export function transformEICToEICR(eicData: EICFormData): EICRFormData {
  // Map circuits - only schedule of tests transfers, NOT inspection items
  // Note: EIC inspections are NOT copied - each certificate type has its own inspection checklist
  const circuits = (eicData.scheduleOfTests || []).map(mapCircuitToEICR);

  return {
    // Certificate - will be generated on save
    certificateNumber: '',

    // Client details - direct transfer
    clientName: eicData.clientName || '',
    clientPhone: eicData.clientPhone || '',
    clientEmail: eicData.clientEmail || '',
    clientAddress: eicData.clientAddress || '',
    sameAsClientAddress: eicData.sameAsClientAddress || 'false',
    installationAddress: eicData.installationAddress || '',

    // Installation details
    description: eicData.description || '',
    installationType: eicData.installationType || '',
    estimatedAge: '', // EIC doesn't have this, leave blank

    // Supply characteristics - direct transfer
    supplyVoltage: eicData.supplyVoltage || '',
    supplyFrequency: eicData.supplyFrequency || '50',
    phases: eicData.phases || '',
    earthingArrangement: eicData.earthingArrangement || eicData.supplyType || '',
    supplyType: eicData.supplyType || '',
    supplyPME: eicData.supplyPME || '',
    mainProtectiveDevice: eicData.mainProtectiveDevice || '',
    mainSwitchRating: eicData.mainSwitchRating || '',
    rcdMainSwitch: eicData.rcdMainSwitch || '',
    rcdRating: eicData.rcdRating || '',

    // DNO details - EIC doesn't have these, leave blank
    dnoName: '',
    mpan: '',
    cutoutLocation: '',
    serviceEntry: '',

    // Earthing & Bonding - direct transfer
    earthElectrodeType: eicData.earthElectrodeType || '',
    earthElectrodeResistance: eicData.earthElectrodeResistance || '',
    mainBondingSize: eicData.mainBondingSize || eicData.mainBondingConductor || '',
    mainBondingSizeCustom: eicData.mainBondingSizeCustom || '',
    mainBondingLocations: '', // EIC doesn't have this
    bondingCompliance: eicData.bondingCompliance || '',
    supplementaryBondingSize: eicData.supplementaryBondingSize || eicData.supplementaryBonding || '',
    supplementaryBondingSizeCustom: eicData.supplementaryBondingSizeCustom || '',
    equipotentialBonding: eicData.equipotentialBonding || '',

    // Consumer Unit - map from EIC board details
    cuLocation: eicData.boardLocation || '',
    cuManufacturer: '', // EIC doesn't have this
    cuType: eicData.boardType || '',

    // Electrical Installation
    boardSize: eicData.boardSize || '',
    intakeCableSize: eicData.intakeCableSize || '',
    intakeCableType: eicData.intakeCableType || '',
    tailsSize: eicData.tailsSize || '',
    tailsLength: eicData.tailsLength || '',

    // Schedule of Tests - transfer circuits
    scheduleOfTests: circuits,

    // Inspector details - transfer from EIC inspector
    inspectorName: eicData.inspectorName || '',
    inspectorQualifications: eicData.inspectorQualifications || '',
    inspectorSignature: '', // Needs fresh signature for EICR
    inspectorDate: '', // Needs fresh date
    companyName: eicData.companyName || eicData.inspectorCompany || '',
    companyAddress: eicData.companyAddress || '',
    companyPhone: eicData.companyPhone || '',
    companyEmail: eicData.companyEmail || '',
    registrationScheme: '', // Would need to be entered fresh
    registrationNumber: '',

    // IMPORTANT: Inspection items NOT transferred - EICR has its own 66-item checklist
    inspectionItems: [], // Will be populated fresh in EICR form

    // Observations NOT transferred - must be completed fresh for EICR
    defectObservations: [],
    generalObservations: [],

    // Assessment NOT transferred - must be completed fresh for EICR
    overallAssessment: '',
    satisfactoryForContinuedUse: '',
  };
}

/**
 * Gets a summary of what will be transferred vs what needs user input
 */
export function getExportToEICRSummary(eicData: EICFormData): {
  transferredFields: string[];
  requiredFields: string[];
  circuitCount: number;
} {
  const transferredFields: string[] = [];
  const requiredFields: string[] = [];

  // Check what will transfer
  if (eicData.clientName) transferredFields.push('Client name');
  if (eicData.installationAddress) transferredFields.push('Installation address');
  if (eicData.supplyVoltage) transferredFields.push('Supply voltage');
  if (eicData.phases) transferredFields.push('Number of phases');
  if (eicData.earthingArrangement || eicData.supplyType) transferredFields.push('Earthing arrangement');
  if (eicData.mainProtectiveDevice) transferredFields.push('Main protective device');
  if (eicData.mainBondingSize || eicData.mainBondingConductor) transferredFields.push('Main bonding');
  if (eicData.inspectorName) transferredFields.push('Inspector details');
  if (eicData.scheduleOfTests?.length) transferredFields.push('Circuit test data');

  // What's always required for EICR
  requiredFields.push('66 inspection checklist items');
  requiredFields.push('Overall assessment');
  requiredFields.push('Satisfactory for continued use declaration');
  requiredFields.push('Fresh inspector signature');
  requiredFields.push('Next inspection date recommendation');
  requiredFields.push('Defect observations (if any)');

  return {
    transferredFields,
    requiredFields,
    circuitCount: eicData.scheduleOfTests?.length || 0,
  };
}

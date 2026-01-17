/**
 * EICR to EIC Export Utility
 *
 * Transforms completed EICR inspection data into EIC certificate format.
 * Uses measured values from EICR as baseline for EIC pre-fill.
 *
 * IMPORTANT: Inspection items are NOT transferred between certificate types.
 * - EICR has 66 inspection checklist items stored in `inspectionItems`
 * - EIC has its own inspection checklist stored in `inspections`
 * - Each certificate type has its own native inspection requirements
 * - Only client details, installation info, supply characteristics, and
 *   circuit test data (scheduleOfTests) are transferred
 */

import { TestResult } from '@/types/testResult';
import { EICCircuitData } from '@/types/eic-integration';

export interface EICRFormData {
  // Client & Installation Details
  certificateNumber?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  installationAddress?: string;
  description?: string;
  installationType?: string;
  estimatedAge?: string;

  // Supply Characteristics
  supplyVoltage?: string;
  supplyFrequency?: string;
  phases?: string;
  earthingArrangement?: string;
  mainProtectiveDevice?: string;
  mainSwitchRating?: string;
  rcdMainSwitch?: string;
  supplyType?: string;

  // Earthing & Bonding
  earthElectrodeType?: string;
  earthElectrodeResistance?: string;
  mainBondingSize?: string;
  supplementaryBondingSize?: string;

  // Consumer Unit
  cuLocation?: string;
  cuManufacturer?: string;
  cuType?: string;

  // Inspector Details
  inspectorName?: string;
  inspectorSignature?: string;
  inspectionDate?: string;
  companyName?: string;
  registrationScheme?: string;
  registrationNumber?: string;

  // Assessment
  satisfactoryForContinuedUse?: string;
  overallAssessment?: string;

  // Test Data
  scheduleOfTests?: TestResult[];
}

export interface EICFormData {
  // Certificate Details
  certificateNumber?: string;

  // Installation Details
  clientName?: string;
  clientAddress?: string;
  clientPhone?: string;
  clientEmail?: string;
  installationAddress?: string;
  installationDate?: string;
  installationType?: string;
  description?: string;
  designStandard?: string;

  // Supply & Earthing
  supplyVoltage?: string;
  supplyFrequency?: string;
  phases?: string;
  earthingArrangement?: string;
  mainProtectiveDevice?: string;
  mainSwitchRating?: string;
  mainBondingConductor?: string;
  supplementaryBonding?: string;

  // Schedule of Tests (Pre-filled from EICR measurements)
  scheduleOfTests?: EICCircuitData[];

  // Declarations (need to be filled by user)
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

  // Compliance
  bs7671Compliance?: boolean;
  buildingRegsCompliance?: boolean;
  competentPersonScheme?: boolean;
}

export interface ExportValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates if an EICR report can be exported to EIC
 */
export function validateEICRForExport(eicrData: EICRFormData): ExportValidation {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if EICR is satisfactory
  if (eicrData.satisfactoryForContinuedUse?.toLowerCase() !== 'yes') {
    errors.push('EICR must be marked as "Satisfactory for Continued Use" to export to EIC');
  }

  // Check required fields
  if (!eicrData.installationAddress) {
    errors.push('Installation address is required');
  }

  if (!eicrData.clientName) {
    warnings.push('Client name is missing - will need to be added to EIC');
  }

  // Check if there are circuits to export
  if (!eicrData.scheduleOfTests || eicrData.scheduleOfTests.length === 0) {
    errors.push('No circuit test data available to export');
  }

  // Check for incomplete circuit data
  const incompleteCircuits = eicrData.scheduleOfTests?.filter(circuit =>
    !circuit.circuitDescription || !circuit.protectiveDeviceRating
  ) || [];

  if (incompleteCircuits.length > 0) {
    warnings.push(`${incompleteCircuits.length} circuit(s) have incomplete data`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Maps a single EICR TestResult to EIC EICCircuitData
 */
function mapCircuitToEIC(testResult: TestResult): EICCircuitData {
  // Determine phase type
  const phaseType: 'single' | 'three' =
    testResult.phaseType === '3P' ? 'three' : 'single';

  return {
    circuitNumber: testResult.circuitNumber || '',
    phaseType,
    circuitDescription: testResult.circuitDescription || testResult.circuitDesignation || '',
    referenceMethod: testResult.referenceMethod || '',
    pointsServed: testResult.pointsServed || '',
    liveSize: testResult.liveSize || testResult.cableSize || '',
    cpcSize: testResult.cpcSize || '',
    protectiveDeviceType: testResult.protectiveDeviceType || '',
    protectiveDeviceCurve: testResult.protectiveDeviceCurve || '',
    protectiveDeviceRating: testResult.protectiveDeviceRating || '',
    protectiveDeviceKaRating: testResult.protectiveDeviceKaRating || '',
    bsStandard: testResult.bsStandard || '',

    // Use measured values from EICR as baseline
    r1r2: testResult.r1r2 || '',
    ringR1: testResult.ringR1,
    ringRn: testResult.ringRn,
    ringR2: testResult.ringR2,
    ringContinuityLive: testResult.ringContinuityLive,
    ringContinuityNeutral: testResult.ringContinuityNeutral,
    insulationTestVoltage: testResult.insulationTestVoltage || '500',
    insulationResistance: testResult.insulationLiveNeutral || testResult.insulationResistance || '',
    polarity: testResult.polarity || '',
    zs: testResult.zs || '',
    maxZs: testResult.maxZs || '',

    // RCD fields
    rcdRating: testResult.rcdRating,
    rcdOneX: testResult.rcdOneX,
    rcdTestButton: testResult.rcdTestButton,

    // AFDD
    afddTest: testResult.afddTest,

    // PFC and functional
    pfc: testResult.pfc || '',
    functionalTesting: testResult.functionalTesting || '',
  };
}

/**
 * Transforms EICR data to EIC format
 *
 * NOTE: This function deliberately DOES NOT transfer inspection items.
 * - EICR's `inspectionItems` are NOT copied to EIC
 * - EIC has its own `inspections` object that must be filled in fresh
 * - Only transferable data (client, installation, supply, circuits) is mapped
 */
export function transformEICRToEIC(eicrData: EICRFormData): EICFormData {
  // Map circuits - only schedule of tests transfers, NOT inspection items
  // Note: EICR inspectionItems are NOT copied - each certificate type has its own inspection checklist
  const circuits = (eicrData.scheduleOfTests || []).map(mapCircuitToEIC);

  return {
    // Certificate - generate new number
    certificateNumber: '', // Will be generated on save

    // Client details - direct transfer
    clientName: eicrData.clientName || '',
    clientAddress: eicrData.clientAddress || '',
    clientPhone: eicrData.clientPhone || '',
    clientEmail: eicrData.clientEmail || '',
    installationAddress: eicrData.installationAddress || '',

    // Use inspection date as installation date baseline
    installationDate: eicrData.inspectionDate || '',
    installationType: eicrData.installationType || '',
    description: eicrData.description || '',
    designStandard: 'BS 7671:2018+A2:2022',

    // Supply & Earthing - direct transfer
    supplyVoltage: eicrData.supplyVoltage || '',
    supplyFrequency: eicrData.supplyFrequency || '50',
    phases: eicrData.phases || '',
    earthingArrangement: eicrData.earthingArrangement || eicrData.supplyType || '',
    mainProtectiveDevice: eicrData.mainProtectiveDevice || '',
    mainSwitchRating: eicrData.mainSwitchRating || '',
    mainBondingConductor: eicrData.mainBondingSize || '',
    supplementaryBonding: eicrData.supplementaryBondingSize || '',

    // Circuits
    scheduleOfTests: circuits,

    // Inspector from EICR maps to inspector role in EIC
    inspectorName: eicrData.inspectorName || '',
    inspectorQualifications: eicrData.registrationScheme
      ? `${eicrData.registrationScheme} (${eicrData.registrationNumber || ''})`
      : '',
    inspectorSignature: '', // Needs fresh signature
    inspectorDate: '', // Needs fresh date

    // Designer & Constructor - need to be filled by user
    designerName: '',
    designerQualifications: '',
    designerSignature: '',
    designerDate: '',

    constructorName: '',
    constructorQualifications: '',
    constructorSignature: '',
    constructorDate: '',

    // Compliance - default to checked since EICR was satisfactory
    bs7671Compliance: true,
    buildingRegsCompliance: false, // User must confirm
    competentPersonScheme: false, // User must confirm
  };
}

/**
 * Gets a summary of what will be transferred vs what needs user input
 */
export function getExportSummary(eicrData: EICRFormData): {
  transferredFields: string[];
  requiredFields: string[];
  circuitCount: number;
} {
  const transferredFields: string[] = [];
  const requiredFields: string[] = [];

  // Check what will transfer
  if (eicrData.clientName) transferredFields.push('Client name');
  if (eicrData.installationAddress) transferredFields.push('Installation address');
  if (eicrData.supplyVoltage) transferredFields.push('Supply voltage');
  if (eicrData.phases) transferredFields.push('Number of phases');
  if (eicrData.earthingArrangement || eicrData.supplyType) transferredFields.push('Earthing arrangement');
  if (eicrData.mainProtectiveDevice) transferredFields.push('Main protective device');
  if (eicrData.mainBondingSize) transferredFields.push('Main bonding');
  if (eicrData.inspectorName) transferredFields.push('Inspector details');

  // What's always required for EIC
  requiredFields.push('Designer name & signature');
  requiredFields.push('Constructor name & signature');
  requiredFields.push('Fresh inspector signature');
  requiredFields.push('Part P compliance declaration');
  requiredFields.push('Building regulations declaration');

  return {
    transferredFields,
    requiredFields,
    circuitCount: eicrData.scheduleOfTests?.length || 0,
  };
}

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

  // Test Data — three parallel circuit stores the forms/PDF read from.
  // scheduleOfTests = flat rows (PDF schedule), circuits = editor UI list,
  // distributionBoards = boards with nested circuits + board metadata
  // (drives the EIC schedule UI AND the PDF's board grouping / boardRefMap).
  scheduleOfTests?: TestResult[];
  circuits?: unknown[];
  distributionBoards?: unknown[];

  // Earthing / consumer unit / supply extras carried to the EIC
  earthElectrodeResistance?: string;
  earthElectrodeType?: string;
  // (index signature so any other measured field passes through untyped)
  [key: string]: unknown;
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

  // Schedule of Tests (Pre-filled from EICR measurements) — populate ALL
  // three stores so the circuit editor, the schedule UI and the PDF all show
  // the full data (Craig, 2026-07-17).
  scheduleOfTests?: EICCircuitData[];
  circuits?: unknown[];
  distributionBoards?: unknown[];
  [key: string]: unknown;

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

  // Check if EICR is satisfactory. ELE-1342 — accept 'yes' AND
  // 'yes-with-recommendations' (C3-only pass, still fit for continued use);
  // still blocks 'no', empty, and undefined.
  if (!eicrData.satisfactoryForContinuedUse?.toLowerCase().startsWith('yes')) {
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
  const incompleteCircuits =
    eicrData.scheduleOfTests?.filter(
      (circuit) => !circuit.circuitDescription || !circuit.protectiveDeviceRating
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

// The EIC has TWO separate fields — a "Property Type" dropdown (installationType:
// domestic/commercial/industrial/other) and a free-text "Description of
// Installation". The EICR form instead stores the property type in its
// `description` field (a picker), so ~93% of EICR `description` values are the
// bare tokens "domestic"/"commercial"/etc. Copying description→description
// therefore printed "domestic" in the EIC's prose Description box AND left the
// Property Type dropdown blank (Craig, images 11/12, 2026-07-17). Classify the
// value: a known property-type token routes to installationType; anything else
// is genuine prose and stays in description.
const PROPERTY_TYPE_TOKENS = new Set(['domestic', 'commercial', 'industrial', 'other']);

function splitEicrDescription(eicrData: EICRFormData): {
  installationType: string;
  description: string;
} {
  const rawDesc = (eicrData.description || '').trim();
  const descToken = rawDesc.toLowerCase();
  const typeToken = (eicrData.installationType || '').trim().toLowerCase();

  // Property type: prefer a valid token from either field.
  const installationType = PROPERTY_TYPE_TOKENS.has(descToken)
    ? descToken
    : PROPERTY_TYPE_TOKENS.has(typeToken)
      ? typeToken
      : '';

  // Prose description: only keep description if it ISN'T just a property token.
  const description = PROPERTY_TYPE_TOKENS.has(descToken) ? '' : rawDesc;

  return { installationType, description };
}

/**
 * Maps a single EICR TestResult to EIC EICCircuitData
 */
function mapCircuitToEIC(testResult: TestResult): EICCircuitData {
  const phaseType: 'single' | 'three' = testResult.phaseType === '3P' ? 'three' : 'single';

  // FULL passthrough — the EIC PDF reads ~50 per-circuit fields (r2,
  // insulationLiveEarth/Neutral, rcdHalfX/FiveX/BsStandard, pfcLiveNeutral/
  // Earth, notes, phase balance, typeOfWiring, circuitType, boardId,
  // dbReference…). Hand-picking a subset silently dropped most of the
  // schedule on the converted EIC (Craig, 2026-07-17). Spread everything,
  // then apply the few EIC-specific normalisations.
  return {
    ...(testResult as Record<string, unknown>),
    phaseType,
    circuitDescription: testResult.circuitDescription || testResult.circuitDesignation || '',
    liveSize: testResult.liveSize || testResult.cableSize || '',
    insulationTestVoltage: testResult.insulationTestVoltage || '500',
    insulationResistance: testResult.insulationResistance || testResult.insulationLiveNeutral || '',
  } as EICCircuitData;
}

/**
 * Copy EICR distribution boards → EIC (same schema). Preserves every board
 * field (reference, location, main switch, RCD, SPD, Zdb, Ipf, ways) and maps
 * any nested circuits through the full-passthrough circuit mapper so the EIC
 * schedule UI and PDF board section show the complete data.
 */
function mapEicrBoardsToEic(boards: unknown[] | undefined): unknown[] {
  if (!Array.isArray(boards)) return [];
  return boards.map((b) => {
    const board = (b ?? {}) as Record<string, unknown>;
    const nested = board.circuits;
    return {
      ...board,
      ...(Array.isArray(nested)
        ? { circuits: nested.map((c) => mapCircuitToEIC(c as TestResult)) }
        : {}),
    };
  });
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

  // Property Type vs prose Description live in the same EICR field — split them.
  const { installationType, description } = splitEicrDescription(eicrData);

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
    // Property Type ← EICR property token; prose Description only if not a token.
    installationType,
    description,
    occupier: eicrData.occupier || '',
    estimatedAge: eicrData.estimatedAge || '',
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

    // Circuits — populate all three stores. distributionBoards is copied
    // wholesale (EICR + EIC share the board schema): this preserves board
    // grouping, board metadata (main switch, RCD, SPD, Zdb, Ipf) AND the
    // nested circuits, which is what the EIC schedule UI and the PDF's
    // board section + boardRefMap read. scheduleOfTests/circuits carry the
    // flat rows for the PDF schedule and the circuit editor list.
    scheduleOfTests: circuits,
    circuits: circuits,
    distributionBoards: mapEicrBoardsToEic(eicrData.distributionBoards),

    // Earthing / consumer unit extras
    earthElectrodeType: eicrData.earthElectrodeType || '',
    earthElectrodeResistance: eicrData.earthElectrodeResistance || '',
    cuLocation: eicrData.cuLocation || '',
    cuManufacturer: eicrData.cuManufacturer || '',
    cuType: eicrData.cuType || '',

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
  if (eicrData.earthingArrangement || eicrData.supplyType)
    transferredFields.push('Earthing arrangement');
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

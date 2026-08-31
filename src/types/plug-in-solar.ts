/**
 * Plug-in Solar Suitability & Commissioning Certificate — data model (ELE-1660)
 *
 * Standards and sources:
 * - SI 2026/848 — Plugs and Sockets etc. (Safety) Regulations 1994 and ESQCR 2002
 *   (Amendment) Regulations 2026, in force 27 August 2026
 * - Plug-in Solar Device Interim Product Specification v2.0 (DESNZ, July 2026)
 * - DESNZ Government Response (July 2026), Annex B Technical Annex
 * - BS 7671:2018+A4:2026
 * - ER G98 Issue 2 Amendment 1 2026 (Great Britain only)
 *
 * The assessment logic lives in `src/lib/plugInSolarAssessment.ts`. This file is
 * the form shape; `toAssessmentInput` below is the only bridge between the two,
 * so the rules engine stays pure and testable.
 */

import type {
  CircuitProtection,
  ConnectionMethod,
  MountingLocation,
  MountingSurface,
  PlugInSolarAssessmentInput,
  PlugInSolarDeviceType,
  RcdType,
  TargetCircuitKind,
  UkRegion,
} from '@/lib/plugInSolarAssessment';

export type EarthingArrangement = 'TN-S' | 'TN-C-S' | 'TT' | 'unknown';

/** Tri-state answers. The form must distinguish "no" from "not checked yet". */
export type TriState = 'yes' | 'no' | 'unknown';

const triToBool = (v: TriState): boolean | 'unknown' =>
  v === 'yes' ? true : v === 'no' ? false : 'unknown';

/** A remedial item, derived from the assessment then tracked through the job. */
export type RemedialStatus = 'required' | 'quoted' | 'declined' | 'complete';

export interface RemedialItem {
  /** Matches the originating finding id so re-running the assessment can merge. */
  findingId: string;
  description: string;
  status: RemedialStatus;
  /** Certificate raised for this work, where it needs one (Minor Works / EIC). */
  linkedReportId?: string;
  linkedReportType?: 'minor-works' | 'eic';
  notes?: string;
}

export interface PlugInSolarData {
  // --- Certificate identity ---
  certificateNumber: string;
  assessmentDate: string;
  commissioningDate: string;

  // --- Client & property ---
  /** Set when picked from the CRM, so the job links to a customer record. */
  customerId: string;
  clientName: string;
  clientEmail: string;
  clientTelephone: string;
  clientAddress: string;
  installationAddress: string;
  installationPostcode: string;
  region: UkRegion;
  /** Drives the landlord/agent wording on the report. */
  tenure: 'owner-occupied' | 'rented' | 'leasehold-flat' | 'social-housing' | 'unknown';
  propertyType: string;
  installationApproxYear: string;

  // --- Supply & consumer unit ---
  earthingArrangement: EarthingArrangement;
  ze: string;
  consumerUnitMake: string;
  consumerUnitLabelled: TriState;
  consumerUnitCondition: string;

  // --- Target circuit ---
  targetCircuitRef: string;
  targetCircuitKind: TargetCircuitKind;
  circuitProtection: CircuitProtection;
  protectiveDeviceRating: string;
  /** Type B/C/D — decides which BS 7671 Zs column the reading is judged against. */
  mcbCurve: 'typeB' | 'typeC' | 'typeD';
  rcdType: RcdType;
  rcdRatingMa: string;
  /**
   * Whether the device was confirmed suitable for bidirectional energy flow.
   *
   * A separate question from the type marking, and the one that gets skipped.
   * ESF: most RCD/RCBOs are unidirectional and "few can be easily identified as
   * being bidirectionally capable by the consumer" — some carry a BD or Bi-dir
   * suffix, many do not. BS 7671 551.7.1(c) is the requirement.
   */
  rcdBidirectionalConfirmed: TriState;
  socketConditionSatisfactory: TriState;
  connectionMethod: ConnectionMethod;
  /** Spec §4.2.3 — inside or outside the premises. */
  inverterLocation: MountingLocation;
  socketLocation: MountingLocation;
  /** IP rating marked on the socket, e.g. "IP55". Only matters outdoors. */
  socketIpRating: string;
  existingPlugInSolarInDwelling: boolean;

  // --- Device ---
  deviceMake: string;
  deviceModel: string;
  deviceSerial: string;
  /** Spec §4.2.2 — how much of the DC side the consumer assembles. */
  deviceType: PlugInSolarDeviceType;
  /** ENA register system reference, when picked from the snapshot list. */
  registerSystemReference: string;
  enaRegisterReference: string;
  onEnaTypeTestRegister: TriState;
  /** IPS §8.2.3.1 / Gov Response Annex B — the product's own declaration. */
  ipsDeclarationPresent: TriState;
  inverterApparentPowerVa: string;
  pvModuleCount: string;
  /** Per-module Pmax, W. Total is derived — never stored, so it cannot drift. */
  pvModulePmaxW: string;
  /** Greatest number of modules in any one series string (max 2). */
  pvModulesInSeries: string;
  /** Open circuit voltage at the inverter inputs, V DC (max 120). */
  arrayVocV: string;
  protectionClass: 'I' | 'II' | 'III' | 'unknown';
  plugFuseRatingA: string;
  hasBatteryStorage: boolean;

  // --- Siting ---
  mountingSurface: MountingSurface;
  mountingType: string;
  heightAboveGroundM: string;
  subjectToExternalWallRemediation: TriState;
  onPartyBoundaryWall: boolean;
  hasLightningProtection: boolean;
  fixingsReversible: TriState;

  // --- Remedial works ---
  remedialItems: RemedialItem[];

  // --- Verification (tab 4) ---
  polarityConfirmed: TriState;
  zsAtSocket: string;
  rcdTripTimeMs: string;
  rcdTestButtonOperated: TriState;
  cpcContinuity: string;
  functionalCheckPassed: TriState;
  /** Protective device switched off; inverter confirmed to cease export. */
  lossOfMainsProven: TriState;
  verificationNotes: string;

  // --- Notification & handover (tab 5) ---
  dnoName: string;
  dnoNotified: TriState;
  dnoNotificationReference: string;
  dnoNotificationDate: string;
  consumerUnitLabelAffixed: TriState;
  deregistrationExplained: TriState;
  /**
   * Spec §8.3.4 — the customer must be told to press the RCD/RCBO test button
   * periodically *while the device is generating*, and to call an electrician if
   * it does not trip immediately. A handover instruction, not a site test.
   */
  testButtonRoutineExplained: TriState;
  ownerPermissionObtained: TriState | 'not-required';
  insuranceAdvised: TriState;
  handoutIssued: TriState;

  // --- Declaration ---
  assessorName: string;
  assessorSignature: string;
  commissioningEngineerName: string;
  commissioningSignature: string;
  notes: string;

  photos: string[];
  pdfUrl?: string;
}

/** Sum of PV module DC power. Derived so the 960 W and 2,000 W checks can't drift. */
export const totalPvModuleDcW = (data: PlugInSolarData): number | undefined => {
  const count = Number(data.pvModuleCount);
  const each = Number(data.pvModulePmaxW);
  if (!Number.isFinite(count) || !Number.isFinite(each) || count <= 0 || each <= 0) {
    return undefined;
  }
  return count * each;
};

const numberOrUndefined = (v: string): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) && v.trim() !== '' ? n : undefined;
};

/**
 * The single bridge from form state to the rules engine. Keeping this in one
 * place means the engine never has to know about form strings or tri-states.
 */
export const toAssessmentInput = (data: PlugInSolarData): PlugInSolarAssessmentInput => ({
  region: data.region,

  onEnaTypeTestRegister: triToBool(data.onEnaTypeTestRegister),
  inverterApparentPowerVa: numberOrUndefined(data.inverterApparentPowerVa),
  totalPvModuleDcW: totalPvModuleDcW(data),
  hasBatteryStorage: data.hasBatteryStorage,
  deviceType: data.deviceType,
  pvModuleCount: numberOrUndefined(data.pvModuleCount),
  pvModulesInSeries: numberOrUndefined(data.pvModulesInSeries),
  arrayVocV: numberOrUndefined(data.arrayVocV),

  connectionMethod: data.connectionMethod,
  targetCircuitKind: data.targetCircuitKind,
  socketConditionSatisfactory: triToBool(data.socketConditionSatisfactory),
  existingPlugInSolarInDwelling: data.existingPlugInSolarInDwelling,
  inverterLocation: data.inverterLocation,
  socketLocation: data.socketLocation,
  socketIpRating: data.socketIpRating,

  circuitProtection: data.circuitProtection,
  rcdType: data.rcdType,
  rcdBidirectionalConfirmed: triToBool(data.rcdBidirectionalConfirmed),
  consumerUnitLabelled: triToBool(data.consumerUnitLabelled),
  installationApproxYear: numberOrUndefined(data.installationApproxYear),

  mountingSurface: data.mountingSurface,
  subjectToExternalWallRemediation: triToBool(data.subjectToExternalWallRemediation),
  onPartyBoundaryWall: data.onPartyBoundaryWall,
  hasLightningProtection: data.hasLightningProtection,

  dnoNotified: triToBool(data.dnoNotified),
  testButtonRoutineExplained: triToBool(data.testButtonRoutineExplained),
  ownerPermissionObtained:
    data.ownerPermissionObtained === 'not-required'
      ? 'not-required'
      : triToBool(data.ownerPermissionObtained),
});

export const createEmptyPlugInSolarData = (): PlugInSolarData => ({
  certificateNumber: '',
  assessmentDate: new Date().toISOString().split('T')[0],
  commissioningDate: '',

  customerId: '',
  clientName: '',
  clientEmail: '',
  clientTelephone: '',
  clientAddress: '',
  installationAddress: '',
  installationPostcode: '',
  region: 'england',
  tenure: 'unknown',
  propertyType: '',
  installationApproxYear: '',

  earthingArrangement: 'unknown',
  ze: '',
  consumerUnitMake: '',
  consumerUnitLabelled: 'unknown',
  consumerUnitCondition: '',

  targetCircuitRef: '',
  targetCircuitKind: 'unknown',
  circuitProtection: 'unknown',
  protectiveDeviceRating: '',
  mcbCurve: 'typeB',
  rcdType: 'unknown',
  rcdRatingMa: '',
  rcdBidirectionalConfirmed: 'unknown',
  socketConditionSatisfactory: 'unknown',
  connectionMethod: 'direct-to-fixed-socket',
  inverterLocation: 'unknown',
  socketLocation: 'unknown',
  socketIpRating: '',
  existingPlugInSolarInDwelling: false,

  deviceMake: '',
  deviceModel: '',
  deviceSerial: '',
  deviceType: 'unknown',
  registerSystemReference: '',
  enaRegisterReference: '',
  onEnaTypeTestRegister: 'unknown',
  ipsDeclarationPresent: 'unknown',
  inverterApparentPowerVa: '',
  pvModuleCount: '',
  pvModulePmaxW: '',
  pvModulesInSeries: '',
  arrayVocV: '',
  protectionClass: 'unknown',
  plugFuseRatingA: '',
  hasBatteryStorage: false,

  mountingSurface: 'unknown',
  mountingType: '',
  heightAboveGroundM: '',
  subjectToExternalWallRemediation: 'unknown',
  onPartyBoundaryWall: false,
  hasLightningProtection: false,
  fixingsReversible: 'unknown',

  remedialItems: [],

  polarityConfirmed: 'unknown',
  zsAtSocket: '',
  rcdTripTimeMs: '',
  rcdTestButtonOperated: 'unknown',
  cpcContinuity: '',
  functionalCheckPassed: 'unknown',
  lossOfMainsProven: 'unknown',
  verificationNotes: '',

  dnoName: '',
  dnoNotified: 'unknown',
  dnoNotificationReference: '',
  dnoNotificationDate: '',
  consumerUnitLabelAffixed: 'unknown',
  deregistrationExplained: 'unknown',
  testButtonRoutineExplained: 'unknown',
  ownerPermissionObtained: 'unknown',
  insuranceAdvised: 'unknown',
  handoutIssued: 'unknown',

  assessorName: '',
  assessorSignature: '',
  commissioningEngineerName: '',
  commissioningSignature: '',
  notes: '',

  photos: [],
});

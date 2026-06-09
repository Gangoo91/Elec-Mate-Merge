/**
 * bess-payload-schema.ts
 * Zod schema for the BESS (Battery Energy Storage System) Certificate PDF payload.
 * Validates the output of formatBESSJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * If the template changes, update this schema — Deno tests will catch drift.
 *
 * BESS uses camelCase field names (not snake_case like PAT/EICR).
 * IET Code of Practice for EESS (3rd Ed) + MCS MIS 3012:2025
 * BS 7671:2018+A4:2026 + PAS 63100:2024
 *
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Root Schema (flat camelCase) ────────────────────────────────────────────

export const bessPayloadSchema = z.object({
  // ── Certificate metadata ──────────────────────────────────────────────────
  certificateNumber: z.string().default(''),
  installationDate: z.string().default(''),
  commissioningDate: z.string().default(''),

  // ── Client ────────────────────────────────────────────────────────────────
  clientName: z.string().default(''),
  clientTelephone: z.string().default(''),
  clientEmail: z.string().default(''),

  // ── Installation ──────────────────────────────────────────────────────────
  installationType: z.string().default('domestic'),
  installationAddress: z.string().default(''),
  installationLocation: z.string().default(''),
  associatedPV: z.boolean().default(false),
  associatedPVRef: z.string().default(''),
  associatedPVCapacity: z.string().default(''),

  // ── Installer ─────────────────────────────────────────────────────────────
  installerName: z.string().default(''),
  installerCompany: z.string().default(''),
  installerPhone: z.string().default(''),
  installerEmail: z.string().default(''),
  installerScheme: z.string().default(''),
  installerSchemeNumber: z.string().default(''),
  mcsInstallerNumber: z.string().default(''),
  installerSignature: z.string().default(''),
  installerDate: z.string().default(''),

  // ── Commissioner ──────────────────────────────────────────────────────────
  commissionerName: z.string().default(''),
  commissionerSignature: z.string().default(''),

  // ── Battery system ────────────────────────────────────────────────────────
  batteryManufacturer: z.string().default(''),
  batteryModel: z.string().default(''),
  batterySerials: z.string().default(''),
  batteryChemistry: z.string().default(''),
  usableCapacity: z.string().default(''),
  nominalVoltage: z.string().default(''),
  numberOfModules: z.string().default('1'),
  configuration: z.string().default(''),
  maxChargeRate: z.string().default(''),
  maxDischargeRate: z.string().default(''),
  depthOfDischarge: z.string().default('100'),
  roundTripEfficiency: z.string().default(''),
  mcsBatteryProductCert: z.string().default(''),
  iec62619Compliant: z.boolean().default(true),

  // ── Inverter ──────────────────────────────────────────────────────────────
  inverterManufacturer: z.string().default(''),
  inverterModel: z.string().default(''),
  inverterSerial: z.string().default(''),
  inverterRatedPower: z.string().default(''),
  inverterType: z.string().default(''),
  inverterPhases: z.string().default('single'),
  mcsInverterProductCert: z.string().default(''),

  // ── System configuration ──────────────────────────────────────────────────
  couplingType: z.string().default(''),
  operatingMode: z.string().default(''),
  chargeRateLimit: z.string().default(''),
  dischargeRateLimit: z.string().default(''),
  dodLimit: z.string().default('100'),
  backupReserve: z.string().default('20'),
  epsEnabled: z.boolean().default(false),
  exportLimited: z.boolean().default(false),
  exportLimit: z.string().default(''),
  totalSiteGeneration: z.string().default(''),

  // ── DC circuit ────────────────────────────────────────────────────────────
  dcCableType: z.string().default(''),
  dcCableCSA: z.string().default(''),
  dcCableLength: z.string().default(''),
  dcProtectionType: z.string().default(''),
  dcProtectionRating: z.string().default(''),
  dcIsolatorLocation: z.string().default(''),
  dcIsolatorRating: z.string().default(''),
  dcSPDType: z.string().default(''),
  dcSPDManufacturer: z.string().default(''),
  dcEarthFaultMethod: z.string().default(''),

  // ── Earthing ──────────────────────────────────────────────────────────────
  earthingArrangement: z.string().default(''),
  pmeRiskAssessment: z.boolean().default(false),
  dcEarthingMethod: z.string().default(''),
  earthElectrodeResistance: z.string().default(''),

  // ── AC circuit ────────────────────────────────────────────────────────────
  acCableType: z.string().default(''),
  acCableCSA: z.string().default(''),
  acCableLength: z.string().default(''),
  acProtectionType: z.string().default(''),
  acProtectionRating: z.string().default(''),
  acProtectionCurve: z.string().default(''),
  rcdType: z.string().default(''),
  rcdRating: z.string().default('30'),
  acIsolatorLocation: z.string().default(''),
  acSPDType: z.string().default(''),
  acSPDManufacturer: z.string().default(''),

  // ── Battery safety ────────────────────────────────────────────────────────
  locationSuitable: z.boolean().default(true),
  distanceFromCombustibles: z.string().default(''),
  ventilation: z.string().default(''),
  fireDetection: z.string().default(''),
  thermalManagement: z.string().default(''),
  warningSignageInstalled: z.boolean().default(false),
  warningSignageLocations: z.string().default(''),
  emergencyShutdownProvided: z.boolean().default(false),
  fireServiceInfoProvided: z.boolean().default(false),

  // ── PAS 63100 ─────────────────────────────────────────────────────────────
  notInSleepingRoom: z.boolean().default(false),
  notInEscapeRoute: z.boolean().default(false),
  notInLoftOrVoid: z.boolean().default(false),
  notInBasementNoAccess: z.boolean().default(false),
  enclosureNonCombustible: z.boolean().default(false),
  enclosureToolAccessOnly: z.boolean().default(false),
  dcFusesToolAccessOnly: z.boolean().default(false),
  energyPerEnclosure: z.string().default(''),
  totalEnergyAtPremises: z.string().default(''),
  distanceFromOpenings: z.string().default(''),
  distanceFromFlammables: z.string().default(''),
  ik10Protection: z.boolean().default(false),
  fireDetectionGrade: z.string().default('D2'),
  fireDetectionCategory: z.string().default('LD2'),
  audibleBatteryWarning: z.boolean().default(false),
  ventilationToOutdoors: z.boolean().default(false),
  ventPortMinDistance: z.boolean().default(false),

  // ── EESS class ────────────────────────────────────────────────────────────
  eessClass: z.string().default(''),

  // ── Labelling ─────────────────────────────────────────────────────────────
  allLabelsFitted: z.boolean().default(false),
  labelExceptions: z.string().default(''),

  // ── AFDD ──────────────────────────────────────────────────────────────────
  afddInstalled: z.boolean().default(false),

  // ── Compliance ────────────────────────────────────────────────────────────
  pas63100Compliant: z.boolean().default(false),
  nextInspectionDate: z.string().default(''),
  nextInspectionInterval: z.string().default('12'),
  buildingControlRef: z.string().default(''),
  eicReference: z.string().default(''),

  // ── Functional tests ──────────────────────────────────────────────────────
  antiIslandingTest: z.string().default(''),
  antiIslandingMethod: z.string().default(''),
  chargeTest: z.string().default(''),
  dischargeTest: z.string().default(''),
  epsTest: z.string().default(''),
  epsSwitchoverTime: z.string().default(''),
  monitoringConfirmed: z.boolean().default(false),
  emergencyShutdownTest: z.string().default(''),
  bmsOperationalTest: z.string().default(''),
  thermalMonitoringTest: z.string().default(''),

  // ── AC test results ───────────────────────────────────────────────────────
  ze: z.string().default(''),
  zs: z.string().default(''),
  r1r2: z.string().default(''),
  acInsulationResistance: z.string().default(''),
  acPolarity: z.string().default(''),
  rcdTripTimeIdn: z.string().default(''),
  rcdTripTime5xIdn: z.string().default(''),

  // ── DC test results ───────────────────────────────────────────────────────
  dcInsulationResistance: z.string().default(''),
  dcTestVoltage: z.string().default(''),
  dcStringVoltage: z.string().default(''),
  dcStringVoltageExpected: z.string().default(''),
  dcPolarityVerified: z.boolean().default(false),
  batterySoCAtCommissioning: z.string().default(''),

  // ── Grid protection (G98/G99 defaults) ────────────────────────────────────
  gridProtectionVerified: z.boolean().default(false),

  // ── DNO ───────────────────────────────────────────────────────────────────
  gridConnectionType: z.string().default(''),
  dnoName: z.string().default(''),
  dnoReference: z.string().default(''),
  dnoNotificationDate: z.string().default(''),
  mpan: z.string().default(''),
  exportMeterFitted: z.boolean().default(false),
  exportMeterSerial: z.string().default(''),
  smartMeterFitted: z.boolean().default(false),
  smartMeterSerial: z.string().default(''),
  segRegistered: z.boolean().default(false),

  // ── Manufacturer commissioning ────────────────────────────────────────────
  portalRegistered: z.boolean().default(false),
  commModuleType: z.string().default(''),
  commModuleSerial: z.string().default(''),
  cloudMonitoringWorking: z.boolean().default(false),
  manufacturerCommRef: z.string().default(''),
  firmwaresCurrent: z.boolean().default(false),

  // Commercial / large-system tests (MIS 3012 Part 3/4 — conditionally shown)
  capacityTestResult: z.string().default(''),
  measuredCapacityKwh: z.string().default(''),
  ancillaryServicesTest: z.string().default(''),
  ancillaryServicesDetail: z.string().default(''),
  revenueMeteringVerified: z.string().default(''),
  ancillaryEquipmentTest: z.string().default(''),
  arcFlashAssessmentRef: z.string().default(''),
  g100ExportTestResult: z.string().default(''),
  wetChemicalCheckResult: z.string().default(''),

  // ── Test instrument ───────────────────────────────────────────────────────
  testInstrumentMake: z.string().default(''),
  testInstrumentModel: z.string().default(''),
  testInstrumentSerial: z.string().default(''),
  testInstrumentCalDate: z.string().default(''),

  // ── Warranty ──────────────────────────────────────────────────────────────

  // ── Customer handover ─────────────────────────────────────────────────────
  operatingInstructionsProvided: z.boolean().default(false),
  emergencyShutdownExplained: z.boolean().default(false),
  maintenanceScheduleProvided: z.boolean().default(false),
  customerAppSetup: z.boolean().default(false),
  dnoNotificationCopyProvided: z.boolean().default(false),
  mcsCertificateProvided: z.boolean().default(false),
  warrantyRegistered: z.boolean().default(false),
  buildingControlNotified: z.boolean().default(false),

  // ── Client acknowledgement ────────────────────────────────────────────────
  clientSignature: z.string().default(''),
  clientDate: z.string().default(''),

  // ── Photos & notes ────────────────────────────────────────────────────────
  photos: z.array(z.string()).default([]),
  additionalNotes: z.string().default(''),
  defectsObservations: z.string().default(''),

  // ── Company branding ──────────────────────────────────────────────────────
  companyLogo: z.string().default(''),
  companyName: z.string().default(''),
  companyAddress: z.string().default(''),
  companyPhone: z.string().default(''),
  companyEmail: z.string().default(''),
  companyTagline: z.string().default(''),
  companyAccentColor: z.string().default('#059669'),
  companyWebsite: z.string().default(''),
  registrationScheme: z.string().default(''),
  registrationNumber: z.string().default(''),
  registrationSchemeLogo: z.string().default(''),
}).passthrough();

export type BESSPayload = z.infer<typeof bessPayloadSchema>;

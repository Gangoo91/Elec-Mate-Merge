/**
 * G99 Commissioning Certificate — Zod payload schema
 * EREC G99 Issue 5 — Generators >16A per phase
 *
 * Validates and defaults the JSON payload before PDF generation.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

export const g99PayloadSchema = z.object({
  // Reference
  referenceNumber: z.string().default(''),

  // Stage 1: Application
  applicationDate: z.string().default(''),
  proposedCommissioningDate: z.string().default(''),
  dnoName: z.string().default(''),
  dnoApplicationRef: z.string().default(''),
  dnoApprovalReceived: z.boolean().default(false),
  dnoApprovalDate: z.string().default(''),
  dnoApprovalRef: z.string().default(''),
  dnoSpecialConditions: z.string().default(''),
  networkStudyRequired: z.boolean().default(false),
  interTripRequired: z.boolean().default(false),
  connectionVoltage: z.string().default(''),

  // Installer
  installerName: z.string().default(''),
  installerCompany: z.string().default(''),
  installerPhone: z.string().default(''),
  installerEmail: z.string().default(''),
  mcsNumber: z.string().default(''),
  registrationScheme: z.string().default(''),
  registrationNumber: z.string().default(''),

  // Site
  installationAddress: z.string().default(''),
  mpan: z.string().default(''),
  supplyType: z.string().default(''),
  earthingArrangement: z.string().default(''),

  // Equipment
  equipmentType: z.string().default(''),
  equipmentManufacturer: z.string().default(''),
  equipmentModel: z.string().default(''),
  equipmentSerial: z.string().default(''),
  ratedOutput: z.string().default(''),
  numberOfPhases: z.string().default(''),
  numberOfGeneratingUnits: z.string().default(''),
  typeTestCertRef: z.string().default(''),
  inverterManufacturer: z.string().default(''),
  inverterModel: z.string().default(''),
  proposedExportCapacity: z.string().default(''),
  associatedCertRef: z.string().default(''),

  // Export
  exportCapable: z.boolean().default(false),
  exportLimited: z.boolean().default(false),
  exportLimit: z.string().default(''),
  exportMeterFitted: z.boolean().default(false),
  exportMeterSerial: z.string().default(''),
  segSupplier: z.string().default(''),

  // Stage 2: Commissioning
  commissioningDate: z.string().default(''),
  settingsSource: z.string().default(''),

  // Protection settings — G99 defaults
  ovStage1Voltage: z.string().default('264.0'),
  ovStage1Time: z.string().default('1.0'),
  ovStage2Voltage: z.string().default('276.0'),
  ovStage2Time: z.string().default('0.5'),
  uvStage1Voltage: z.string().default('207.0'),
  uvStage1Time: z.string().default('1.5'),
  uvStage2Voltage: z.string().default('195.5'),
  uvStage2Time: z.string().default('0.5'),
  ofStage1Freq: z.string().default('50.4'),
  ofStage1Time: z.string().default('0.5'),
  ofStage2Freq: z.string().default('52.0'),
  ofStage2Time: z.string().default('0.5'),
  ufStage1Freq: z.string().default('47.5'),
  ufStage1Time: z.string().default('0.5'),
  ufStage2Freq: z.string().default('47.0'),
  ufStage2Time: z.string().default('0.5'),
  rocoFRate: z.string().default('1.0'),
  rocoFTime: z.string().default('0.5'),
  reconnectionDelay: z.string().default('60'),

  // Additional G99 tests
  powerQualityTHD: z.string().default(''),
  reactivePowerVerified: z.boolean().default(false),
  activePowerControlVerified: z.boolean().default(false),
  frequencyResponseVerified: z.boolean().default(false),
  interTripTested: z.string().default(''),
  measuredExportKW: z.string().default(''),
  gridVoltageAtConnection: z.string().default(''),

  // DNO witness
  dnoWitnessRequired: z.boolean().default(false),
  dnoWitnessName: z.string().default(''),
  dnoWitnessDate: z.string().default(''),

  // Commissioning confirmation
  antiIslandingConfirmed: z.boolean().default(false),
  protectionSettingsVerified: z.boolean().default(false),
  systemOperating: z.boolean().default(false),
  labelsApplied: z.boolean().default(false),
  customerInformed: z.boolean().default(false),

  // Overall
  overallResult: z.string().default(''),

  // Signatures
  installerSignature: z.string().default(''),
  installerDate: z.string().default(''),
  dnoWitnessSignature: z.string().default(''),
  customerSignature: z.string().default(''),
  customerDate: z.string().default(''),
  notes: z.string().default(''),

  // Form state
  completedSections: z.record(z.boolean()).default({}),
  status: z.string().default('draft'),

  // Branding
  companyLogo: z.string().default(''),
  companyName: z.string().default(''),
  companyAddress: z.string().default(''),
  companyPhone: z.string().default(''),
  companyEmail: z.string().default(''),
}).passthrough();

export type G99Payload = z.infer<typeof g99PayloadSchema>;

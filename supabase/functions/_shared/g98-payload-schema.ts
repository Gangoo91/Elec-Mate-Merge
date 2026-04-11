/**
 * G98 Commissioning Certificate — Zod payload schema
 * EREC G98 Issue 5 — Generators ≤16A per phase
 *
 * Validates and defaults the JSON payload before PDF generation.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

export const g98PayloadSchema = z.object({
  // Reference
  referenceNumber: z.string().default(''),
  commissioningDate: z.string().default(''),
  notificationDate: z.string().default(''),
  dnoName: z.string().default(''),

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
  supplyType: z.string().default('single-phase'),
  earthingArrangement: z.string().default(''),

  // Equipment
  equipmentType: z.string().default(''),
  equipmentManufacturer: z.string().default(''),
  equipmentModel: z.string().default(''),
  equipmentSerial: z.string().default(''),
  ratedOutput: z.string().default(''),
  numberOfPhases: z.string().default('1'),
  typeTestCertRef: z.string().default(''),
  inverterManufacturer: z.string().default(''),
  inverterModel: z.string().default(''),
  associatedCertRef: z.string().default(''),

  // Export
  exportCapable: z.boolean().default(true),
  exportLimited: z.boolean().default(false),
  exportLimit: z.string().default(''),
  exportMeterFitted: z.boolean().default(false),
  exportMeterSerial: z.string().default(''),
  segSupplier: z.string().default(''),

  // Protection settings — G98 defaults (EREC G98 Issue 5)
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

  // Commissioning confirmation
  antiIslandingConfirmed: z.boolean().default(false),
  protectionSettingsVerified: z.boolean().default(false),
  systemOperating: z.boolean().default(false),
  labelsApplied: z.boolean().default(false),
  customerInformed: z.boolean().default(false),

  // Signatures
  installerSignature: z.string().default(''),
  installerDate: z.string().default(''),
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

export type G98Payload = z.infer<typeof g98PayloadSchema>;

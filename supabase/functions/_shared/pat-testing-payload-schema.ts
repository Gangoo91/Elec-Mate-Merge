/**
 * pat-testing-payload-schema.ts
 * Zod schema for the PAT Testing Certificate PDF payload.
 * Validates the output of formatPATTestingJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Array Item Schemas ──────────────────────────────────────────────────────

const visualInspectionSchema = z.object({
  flex: z.string().default(''),
  plug: z.string().default(''),
  fuse: z.string().default(''),
  case: z.string().default(''),
  switch: z.string().default(''),
  env: z.string().default(''),
}).default({});

const electricalTestsSchema = z.object({
  earth: z.string().default(''),
  earth_result: z.string().default(''),
  insulation: z.string().default(''),
  insulation_result: z.string().default(''),
  load: z.string().default(''),
  load_result: z.string().default(''),
  leakage: z.string().default(''),
  leakage_result: z.string().default(''),
  polarity: z.string().default(''),
  functional: z.string().default(''),
}).default({});

const applianceSchema = z.object({
  asset_number: z.string().default(''),
  description: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  location: z.string().default(''),
  appliance_class: z.string().default('I'),
  category: z.string().default('portable'),
  visual: visualInspectionSchema,
  electrical: electricalTestsSchema,
  visual_notes: z.string().default(''),
  overall_result: z.string().default(''),
  repair_code: z.string().default(''),
  next_test_due: z.string().default(''),
  notes: z.string().default(''),
  test_date: z.string().default(''),
  tested_by: z.string().default(''),
  has_photos: z.boolean().default(false),
  photo_count: z.number().default(0),
  first_photo: z.string().default(''),
});

const failedApplianceSchema = z.object({
  asset_number: z.string().default(''),
  description: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  location: z.string().default(''),
  repair_code: z.string().default(''),
  repair_code_label: z.string().default(''),
  failure_reasons: z.string().default(''),
  notes: z.string().default(''),
  visual_notes: z.string().default(''),
  photos: z.array(z.string()).default([]),
  has_photos: z.boolean().default(false),
});

const appliancePhotoGroupSchema = z.object({
  asset_number: z.string().default(''),
  description: z.string().default(''),
  result: z.string().default(''),
  photos: z.array(z.string()).default([]),
});

// ── Nested Object Schemas ───────────────────────────────────────────────────

const metadataSchema = z.object({
  certificate_number: z.string().default(''),
  test_date: z.string().default(''),
  report_reference: z.string().default(''),
  standard: z.string().default(''),
}).default({});

const clientDetailsSchema = z.object({
  client_name: z.string().default(''),
  client_address: z.string().default(''),
  client_phone: z.string().default(''),
  client_email: z.string().default(''),
  contact_person: z.string().default(''),
}).default({});

const siteDetailsSchema = z.object({
  site_name: z.string().default(''),
  site_address: z.string().default(''),
  site_contact_name: z.string().default(''),
  site_contact_phone: z.string().default(''),
}).default({});

const testEquipmentSchema = z.object({
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  last_calibration: z.string().default(''),
  next_calibration: z.string().default(''),
}).default({});

const summarySchema = z.object({
  total_tested: z.number().default(0),
  total_passed: z.number().default(0),
  total_failed: z.number().default(0),
  pass_rate: z.number().default(0),
}).default({});

const testerSchema = z.object({
  name: z.string().default(''),
  company: z.string().default(''),
  qualifications: z.string().default(''),
  signature: z.string().default(''),
  date: z.string().default(''),
}).default({});

const declarationsSchema = z.object({
  tester: testerSchema,
}).default({});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const patTestingPayloadSchema = z.object({
  // Test environment
  test_temperature: z.string().default(''),

  // Nested objects
  metadata: metadataSchema,
  client_details: clientDetailsSchema,
  site_details: siteDetailsSchema,
  test_equipment: testEquipmentSchema,
  summary: summarySchema,
  declarations: declarationsSchema,

  // Appliance arrays
  appliances: z.array(applianceSchema).default([]),
  failed_appliances: z.array(failedApplianceSchema).default([]),

  // Recommendations & retest
  recommendations: z.string().default(''),
  retest_interval: z.union([z.string(), z.number()]).default('12'),
  next_test_due: z.string().default(''),
  additional_notes: z.string().default(''),

  // Photos
  has_photos: z.boolean().default(false),
  appliance_photos: z.array(appliancePhotoGroupSchema).default([]),

  // Company branding
  company_logo: z.string().default(''),
  company_name: z.string().default(''),
  company_address: z.string().default(''),
  company_phone: z.string().default(''),
  company_email: z.string().default(''),
  company_tagline: z.string().default(''),
  company_accent_color: z.string().default('#22c55e'),
  company_website: z.string().default(''),
  registration_scheme: z.string().default(''),
  registration_number: z.string().default(''),
  registration_scheme_logo: z.string().default(''),
}).passthrough();

export type PATTestingPayload = z.infer<typeof patTestingPayloadSchema>;

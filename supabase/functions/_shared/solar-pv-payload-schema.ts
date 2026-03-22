/**
 * solar-pv-payload-schema.ts
 * Zod schema for the Solar PV Installation Certificate PDF payload.
 * Validates the output of formatSolarPVJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Array Item Schemas ──────────────────────────────────────────────────────

const pvArraySchema = z.object({
  array_number: z.number().default(0),
  panel_make: z.string().default(''),
  panel_model: z.string().default(''),
  panel_wattage: z.number().default(0),
  panel_count: z.number().default(0),
  array_capacity: z.string().default('0.00'),
  mcs_certified: z.boolean().default(false),
  orientation: z.string().default(''),
  tilt_angle: z.number().default(0),
  shading_factor: z.number().default(1),
  shading_percentage: z.string().default('0'),
  string_voc: z.string().default(''),
  string_isc: z.string().default(''),
  mounting_type: z.string().default(''),
  mounting_type_display: z.string().default(''),
});

const inverterSchema = z.object({
  inverter_number: z.number().default(0),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  rated_power: z.number().default(0),
  mcs_certified: z.boolean().default(false),
  type: z.string().default(''),
  type_display: z.string().default(''),
  mppt_count: z.number().default(1),
  phases: z.string().default('single'),
  phases_display: z.string().default(''),
  location: z.string().default(''),
});

const arrayTestSchema = z.object({
  array_number: z.number().default(0),
  array_name: z.string().default(''),
  voc_measured: z.string().default(''),
  isc_measured: z.string().default(''),
  insulation_resistance: z.string().default(''),
  polarity_result: z.string().default(''),
  polarity_class: z.string().default(''),
  continuity_result: z.string().default(''),
  continuity_class: z.string().default(''),
});

const inverterTestSchema = z.object({
  inverter_number: z.number().default(0),
  inverter_name: z.string().default(''),
  dc_isolator_result: z.string().default(''),
  dc_isolator_class: z.string().default(''),
  ac_isolator_result: z.string().default(''),
  ac_isolator_class: z.string().default(''),
  anti_islanding_result: z.string().default(''),
  anti_islanding_class: z.string().default(''),
  protection_result: z.string().default(''),
  protection_class: z.string().default(''),
});

const defectSchema = z.object({
  number: z.number().default(0),
  description: z.string().default(''),
  severity: z.string().default(''),
  severity_class: z.string().default(''),
  rectified: z.boolean().default(false),
  rectification_date: z.string().default(''),
});

const photoSchema = z.object({
  url: z.string().default(''),
  caption: z.string().default(''),
  category: z.string().default('general'),
});

// ── Nested Object Schemas ───────────────────────────────────────────────────

const mcsDetailsSchema = z.object({
  installer_number: z.string().default(''),
  installation_number: z.string().default(''),
  consumer_code: z.string().default(''),
  consumer_code_display: z.string().default(''),
}).default({});

const batterySchema = z.object({
  installed: z.boolean().default(false),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  capacity: z.number().default(0),
  chemistry: z.string().default(''),
  chemistry_display: z.string().default(''),
}).default({});

const gridConnectionSchema = z.object({
  dno_name: z.string().default(''),
  mpan: z.string().default(''),
  application_reference: z.string().default(''),
  application_type: z.string().default(''),
  application_type_display: z.string().default(''),
  application_date: z.string().default(''),
  approval_date: z.string().default(''),
  approval_reference: z.string().default(''),
  export_limited: z.boolean().default(false),
  export_limit_kw: z.string().default(''),
}).default({});

const meteringSchema = z.object({
  meter_type: z.string().default(''),
  meter_type_display: z.string().default(''),
  meter_make: z.string().default(''),
  meter_model: z.string().default(''),
  meter_serial: z.string().default(''),
  ct_ratio: z.string().default(''),
}).default({});

const acTestsSchema = z.object({
  earthing_arrangement: z.string().default(''),
  earthing_arrangement_display: z.string().default(''),
  ze_value: z.string().default(''),
  zs_value: z.string().default(''),
  rcd_type: z.string().default(''),
  rcd_rating: z.string().default(''),
  rcd_trip_time: z.string().default(''),
  insulation_resistance: z.string().default(''),
  polarity_result: z.string().default(''),
  polarity_class: z.string().default(''),
  bidirectional_device_installed: z.boolean().default(false),
  bidirectional_device_type: z.string().default(''),
  bidirectional_device_make: z.string().default(''),
  bidirectional_device_model: z.string().default(''),
  bidirectional_device_result: z.string().default(''),
  bidirectional_device_class: z.string().default(''),
}).default({});

const commissioningSchema = z.object({
  system_operational: z.boolean().default(false),
  export_verified: z.boolean().default(false),
  generation_meter_reading: z.string().default(''),
  customer_briefed: z.boolean().default(false),
  documentation_provided: z.boolean().default(false),
}).default({});

const handoverSchema = z.object({
  user_manual_provided: z.boolean().default(false),
  warranty_docs_provided: z.boolean().default(false),
  mcs_document_provided: z.boolean().default(false),
  maintenance_schedule_provided: z.boolean().default(false),
  emergency_shutdown_explained: z.boolean().default(false),
}).default({});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const solarPVPayloadSchema = z.object({
  // Metadata
  certificate_number: z.string().default(''),
  certificate_type: z.string().default('installation'),
  certificate_type_display: z.string().default(''),
  work_type: z.string().default('new-installation'),
  work_type_display: z.string().default(''),
  installation_date: z.string().default(''),
  commissioning_date: z.string().default(''),
  design_reference: z.string().default(''),
  previous_installation_ref: z.string().default(''),
  status: z.string().default(''),

  // Client details
  client_name: z.string().default(''),
  client_address: z.string().default(''),
  client_postcode: z.string().default(''),
  client_email: z.string().default(''),
  client_phone: z.string().default(''),

  // Installation address
  installation_address: z.string().default(''),
  installation_postcode: z.string().default(''),

  // Property & ownership
  property_type: z.string().default('domestic'),
  property_type_display: z.string().default(''),
  ownership_type: z.string().default(''),
  property_age: z.string().default(''),
  roof_age: z.string().default(''),

  // Site access & safety
  site_access_notes: z.string().default(''),
  safe_isolation_verified: z.boolean().default(false),
  asbestos_check_required: z.boolean().default(false),
  asbestos_check_completed: z.boolean().default(false),
  structural_assessment_required: z.boolean().default(false),
  structural_assessment_completed: z.boolean().default(false),

  // MCS compliance
  mcs_details: mcsDetailsSchema,

  // System overview
  system_type: z.string().default(''),
  system_type_display: z.string().default(''),
  total_capacity: z.string().default('0.00'),
  total_panels: z.number().default(0),
  estimated_annual_yield: z.string().default('0'),
  estimated_co2_savings: z.string().default('0'),
  yield_calculation_method: z.string().default('mcs-estimator'),
  yield_calculation_method_display: z.string().default(''),
  yield_calculation_notes: z.string().default(''),

  // PV arrays
  arrays: z.array(pvArraySchema).default([]),
  has_arrays: z.boolean().default(false),
  array_count: z.number().default(0),

  // Inverters
  inverters: z.array(inverterSchema).default([]),
  has_inverters: z.boolean().default(false),
  inverter_count: z.number().default(0),

  // Battery storage
  battery: batterySchema,
  has_battery: z.boolean().default(false),

  // Grid connection
  grid_connection: gridConnectionSchema,

  // Metering
  metering: meteringSchema,

  // Test results
  array_tests: z.array(arrayTestSchema).default([]),
  has_array_tests: z.boolean().default(false),
  inverter_tests: z.array(inverterTestSchema).default([]),
  has_inverter_tests: z.boolean().default(false),
  ac_tests: acTestsSchema,
  commissioning: commissioningSchema,

  // Defects
  defects: z.array(defectSchema).default([]),
  has_defects: z.boolean().default(false),
  no_defects: z.boolean().default(true),
  defect_count: z.number().default(0),

  // Handover
  handover: handoverSchema,

  // Declarations — Installer
  installer_name: z.string().default(''),
  installer_company: z.string().default(''),
  installer_mcs_number: z.string().default(''),
  installer_address: z.string().default(''),
  installer_phone: z.string().default(''),
  installer_email: z.string().default(''),
  installer_signature: z.string().default(''),
  installer_date: z.string().default(''),

  // Declarations — Electrician (optional)
  electrician_required: z.boolean().default(false),
  electrician_name: z.string().default(''),
  electrician_company: z.string().default(''),
  electrician_registration: z.string().default(''),
  electrician_scheme: z.string().default(''),
  electrician_signature: z.string().default(''),
  electrician_date: z.string().default(''),
  has_electrician: z.boolean().default(false),

  // Photos
  photos: z.array(photoSchema).default([]),
  has_photos: z.boolean().default(false),
  photo_count: z.number().default(0),

  // Overall assessment
  overall_satisfactory: z.boolean().default(false),
  overall_assessment_display: z.string().default(''),
  overall_assessment_class: z.string().default(''),

  // Additional notes
  additional_notes: z.string().default(''),
  has_additional_notes: z.boolean().default(false),

  // Company branding
  company_name: z.string().default(''),
  company_address: z.string().default(''),
  company_phone: z.string().default(''),
  company_email: z.string().default(''),
  company_website: z.string().default(''),
  company_logo: z.string().default(''),
  company_accent_color: z.string().default('#f59e0b'),
  registration_scheme_logo: z.string().default(''),
  registration_scheme: z.string().default(''),
  registration_number: z.string().default(''),
}).passthrough();

export type SolarPVPayload = z.infer<typeof solarPVPayloadSchema>;

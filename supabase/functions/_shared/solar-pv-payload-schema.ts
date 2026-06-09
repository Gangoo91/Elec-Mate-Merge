/**
 * solar-pv-payload-schema.ts
 * Zod schema for the Solar PV Installation Certificate PDF payload.
 * Validates the output of formatSolarPVJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// Numeric inputs (measured Ze/Zs, RCD ratings/trip times, insulation MΩ, etc.)
// can arrive as JS numbers, but text fields here are strings. PDF Monkey renders
// numbers fine, so a number is not a real error — coerce defensively so
// validation doesn't raise false "schema drift" noise (the recurring drift was
// numbers in ac_tests where strings were expected).
const stringish = z.preprocess((v) => {
  if (v === null || v === undefined) return v; // let .default() apply
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return v;
}, z.string());

// ── Array Item Schemas ──────────────────────────────────────────────────────

const pvArraySchema = z.object({
  array_number: z.number().default(0),
  panel_make: stringish.default(''),
  panel_model: stringish.default(''),
  panel_wattage: z.number().default(0),
  panel_count: z.number().default(0),
  array_capacity: stringish.default('0.00'),
  mcs_certified: z.boolean().default(false),
  orientation: stringish.default(''),
  tilt_angle: z.number().default(0),
  shading_factor: z.number().default(1),
  shading_percentage: stringish.default('0'),
  string_voc: stringish.default(''),
  string_isc: stringish.default(''),
  mounting_type: stringish.default(''),
  mounting_type_display: stringish.default(''),
  dc_cable_type: stringish.default(''),
  dc_cable_size: stringish.default(''),
  dc_cable_length: stringish.default(''),
  dc_earth_cable_size: stringish.default(''),
  string_ocpd_type: stringish.default(''),
  string_ocpd_rating_a: stringish.default(''),
  string_ocpd_dc_rating_v: stringish.default(''),
  string_ocpd_breaking_capacity_ka: stringish.default(''),
});

const inverterSchema = z.object({
  inverter_number: z.number().default(0),
  make: stringish.default(''),
  model: stringish.default(''),
  serial_number: stringish.default(''),
  rated_power: z.number().default(0),
  mcs_certified: z.boolean().default(false),
  type: stringish.default(''),
  type_display: stringish.default(''),
  mppt_count: z.number().default(1),
  phases: stringish.default('single'),
  phases_display: stringish.default(''),
  location: stringish.default(''),
});

const arrayTestSchema = z.object({
  array_number: z.number().default(0),
  array_name: stringish.default(''),
  voc_measured: stringish.default(''),
  isc_measured: stringish.default(''),
  insulation_resistance: stringish.default(''),
  polarity_result: stringish.default(''),
  polarity_class: stringish.default(''),
  continuity_result: stringish.default(''),
  continuity_class: stringish.default(''),
});

const inverterTestSchema = z.object({
  inverter_number: z.number().default(0),
  inverter_name: stringish.default(''),
  dc_isolator_result: stringish.default(''),
  dc_isolator_class: stringish.default(''),
  dc_isolator_location: stringish.default(''),
  dc_isolator_rating_a: stringish.default(''),
  dc_isolator_rating_v: stringish.default(''),
  ac_isolator_result: stringish.default(''),
  ac_isolator_class: stringish.default(''),
  anti_islanding_result: stringish.default(''),
  anti_islanding_class: stringish.default(''),
  protection_result: stringish.default(''),
  protection_class: stringish.default(''),
});

const defectSchema = z.object({
  number: z.number().default(0),
  description: stringish.default(''),
  severity: stringish.default(''),
  severity_class: stringish.default(''),
  rectified: z.boolean().default(false),
  rectification_date: stringish.default(''),
});

const photoSchema = z.object({
  url: stringish.default(''),
  caption: stringish.default(''),
  category: stringish.default('general'),
});

// ── Nested Object Schemas ───────────────────────────────────────────────────

const mcsDetailsSchema = z.object({
  installer_number: stringish.default(''),
  installation_number: stringish.default(''),
  consumer_code: stringish.default(''),
  consumer_code_display: stringish.default(''),
}).default({});

const batterySchema = z.object({
  installed: z.boolean().default(false),
  make: stringish.default(''),
  model: stringish.default(''),
  serial_number: stringish.default(''),
  capacity: z.number().default(0),
  chemistry: stringish.default(''),
  chemistry_display: stringish.default(''),
  location: stringish.default(''),
  max_charge_power: stringish.default(''),
  max_discharge_power: stringish.default(''),
  depth_of_discharge: stringish.default(''),
  cycles: stringish.default(''),
}).default({});

const gridConnectionSchema = z.object({
  dno_name: stringish.default(''),
  dno_region: stringish.default(''),
  mpan: stringish.default(''),
  supply_phases: stringish.default(''),
  supply_phases_display: stringish.default(''),
  supply_voltage: stringish.default(''),
  max_supply_fuse: stringish.default(''),
  cut_out_location: stringish.default(''),
  application_reference: stringish.default(''),
  application_type: stringish.default(''),
  application_type_display: stringish.default(''),
  application_date: stringish.default(''),
  approval_status: stringish.default(''),
  approval_date: stringish.default(''),
  approval_reference: stringish.default(''),
  export_limited: z.boolean().default(false),
  export_limit_kw: stringish.default(''),
  export_limiting_method: stringish.default(''),
}).default({});

const meteringSchema = z.object({
  meter_type: stringish.default(''),
  meter_type_display: stringish.default(''),
  meter_make: stringish.default(''),
  meter_model: stringish.default(''),
  meter_serial: stringish.default(''),
  meter_location: stringish.default(''),
  ct_ratio: stringish.default(''),
  generation_meter_required: z.boolean().default(false),
  export_meter_required: z.boolean().default(false),
  smart_meter_compatible: z.boolean().default(false),
  seg_registered: z.boolean().default(false),
  seg_supplier: stringish.default(''),
  notes: stringish.default(''),
}).default({});

const acTestsSchema = z.object({
  earthing_arrangement: stringish.default(''),
  earthing_arrangement_display: stringish.default(''),
  ze_value: stringish.default(''),
  zs_value: stringish.default(''),
  rcd_type: stringish.default(''),
  rcd_rating: stringish.default(''),
  rcd_trip_time: stringish.default(''),
  insulation_resistance: stringish.default(''),
  polarity_result: stringish.default(''),
  polarity_class: stringish.default(''),
  bidirectional_device_installed: z.boolean().default(false),
  bidirectional_device_type: stringish.default(''),
  bidirectional_device_make: stringish.default(''),
  bidirectional_device_model: stringish.default(''),
  bidirectional_device_result: stringish.default(''),
  bidirectional_device_class: stringish.default(''),
}).default({});

const commissioningSchema = z.object({
  system_operational: z.boolean().default(false),
  export_verified: z.boolean().default(false),
  generation_meter_reading: stringish.default(''),
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
  certificate_number: stringish.default(''),
  certificate_type: stringish.default('installation'),
  certificate_type_display: stringish.default(''),
  work_type: stringish.default('new-installation'),
  work_type_display: stringish.default(''),
  installation_date: stringish.default(''),
  commissioning_date: stringish.default(''),
  design_reference: stringish.default(''),
  linked_eic_reference: stringish.default(''),
  recommended_retest_interval_years: stringish.default(''),
  previous_installation_ref: stringish.default(''),
  status: stringish.default(''),

  // Client details
  client_name: stringish.default(''),
  client_address: stringish.default(''),
  client_postcode: stringish.default(''),
  client_email: stringish.default(''),
  client_phone: stringish.default(''),

  // Installation address
  installation_address: stringish.default(''),
  installation_postcode: stringish.default(''),

  // Property & ownership
  property_type: stringish.default('domestic'),
  property_type_display: stringish.default(''),
  ownership_type: stringish.default(''),
  property_age: stringish.default(''),
  roof_age: stringish.default(''),

  // Site access & safety
  site_access_notes: stringish.default(''),
  safe_isolation_verified: z.boolean().default(false),
  asbestos_check_required: z.boolean().default(false),
  asbestos_check_completed: z.boolean().default(false),
  structural_assessment_required: z.boolean().default(false),
  structural_assessment_completed: z.boolean().default(false),

  // MCS compliance
  mcs_details: mcsDetailsSchema,

  // System overview
  system_type: stringish.default(''),
  system_type_display: stringish.default(''),
  total_capacity: stringish.default('0.00'),
  total_panels: z.number().default(0),
  estimated_annual_yield: stringish.default('0'),
  estimated_co2_savings: stringish.default('0'),
  yield_calculation_method: stringish.default('mcs-estimator'),
  yield_calculation_method_display: stringish.default(''),
  yield_calculation_notes: stringish.default(''),

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
  installer_name: stringish.default(''),
  installer_company: stringish.default(''),
  installer_mcs_number: stringish.default(''),
  installer_address: stringish.default(''),
  installer_phone: stringish.default(''),
  installer_email: stringish.default(''),
  installer_signature: stringish.default(''),
  installer_date: stringish.default(''),

  // Declarations — Electrician (optional)
  electrician_required: z.boolean().default(false),
  electrician_name: stringish.default(''),
  electrician_company: stringish.default(''),
  electrician_registration: stringish.default(''),
  electrician_scheme: stringish.default(''),
  electrician_signature: stringish.default(''),
  electrician_date: stringish.default(''),
  has_electrician: z.boolean().default(false),

  // Photos
  photos: z.array(photoSchema).default([]),
  has_photos: z.boolean().default(false),
  photo_count: z.number().default(0),

  // Overall assessment
  overall_satisfactory: z.boolean().default(false),
  overall_assessment_display: stringish.default(''),
  overall_assessment_class: stringish.default(''),

  // Additional notes
  additional_notes: stringish.default(''),
  has_additional_notes: z.boolean().default(false),

  // Company branding
  company_name: stringish.default(''),
  company_address: stringish.default(''),
  company_phone: stringish.default(''),
  company_email: stringish.default(''),
  company_website: stringish.default(''),
  company_logo: stringish.default(''),
  company_accent_color: stringish.default('#f59e0b'),
  registration_scheme_logo: stringish.default(''),
  registration_scheme: stringish.default(''),
  registration_number: stringish.default(''),
}).passthrough();

export type SolarPVPayload = z.infer<typeof solarPVPayloadSchema>;

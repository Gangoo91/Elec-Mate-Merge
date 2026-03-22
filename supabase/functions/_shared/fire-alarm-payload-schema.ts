/**
 * fire-alarm-payload-schema.ts
 * Zod schema for the Fire Alarm Certificate PDF payload.
 * Validates the output of formatFireAlarmJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Array Item Schemas ──────────────────────────────────────────────────────

const zoneSchema = z.object({
  zone_number: z.union([z.number(), z.string()]).default(''),
  zone_name: z.string().default(''),
  location: z.string().default(''),
  detector_count: z.number().default(0),
  call_point_count: z.number().default(0),
  sounder_count: z.number().default(0),
});

const detectorSchema = z.object({
  number: z.number().default(0),
  zone_id: z.string().default(''),
  location: z.string().default(''),
  type: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  install_date: z.string().default(''),
  test_result: z.string().default(''),
  test_result_class: z.string().default(''),
  notes: z.string().default(''),
});

const sounderSchema = z.object({
  number: z.number().default(0),
  zone_id: z.string().default(''),
  location: z.string().default(''),
  type: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  db_reading: z.string().default(''),
  test_result: z.string().default(''),
  test_result_class: z.string().default(''),
});

const callPointSchema = z.object({
  number: z.number().default(0),
  zone_id: z.string().default(''),
  location: z.string().default(''),
  type: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  test_result: z.string().default(''),
  test_result_class: z.string().default(''),
});

const soundReadingSchema = z.object({
  zone: z.string().default(''),
  location: z.string().default(''),
  area_type: z.string().default(''),
  db_reading: z.string().default(''),
  min_required: z.string().default('65'),
  result: z.string().default(''),
  result_class: z.string().default(''),
});

const defectSchema = z.object({
  number: z.number().default(0),
  description: z.string().default(''),
  severity: z.string().default(''),
  severity_class: z.string().default(''),
  rectified: z.boolean().default(false),
  rectification_date: z.string().default(''),
  photo_url: z.string().default(''),
});

const previousDefectSchema = z.object({
  number: z.number().default(0),
  description: z.string().default(''),
  original_date: z.string().default(''),
  status: z.string().default(''),
  status_display: z.string().default(''),
  status_class: z.string().default(''),
  notes: z.string().default(''),
});

const interfaceEquipmentSchema = z.object({
  type: z.string().default(''),
  location: z.string().default(''),
  interface_method: z.string().default(''),
  details: z.string().default(''),
  tested: z.boolean().default(false),
});

const aspiratingUnitSchema = z.object({
  make: z.string().default(''),
  model: z.string().default(''),
  sampling_points: z.number().default(0),
  pipe_length: z.string().default(''),
  transport_time: z.string().default(''),
  sensitivity_level: z.string().default(''),
});

const testEquipmentItemSchema = z.object({
  type: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  serial_number: z.string().default(''),
  calibration_date: z.string().default(''),
  calibration_due: z.string().default(''),
});

const photoSchema = z.object({
  url: z.string().default(''),
  caption: z.string().default(''),
});

// ── Nested Object Schemas ───────────────────────────────────────────────────

const detectorCountSchema = z.object({
  optical_smoke: z.number().default(0),
  ionisation_smoke: z.number().default(0),
  multi_sensor: z.number().default(0),
  heat_fixed: z.number().default(0),
  heat_ror: z.number().default(0),
  beam: z.number().default(0),
  aspirating: z.number().default(0),
  flame: z.number().default(0),
  co: z.number().default(0),
}).default({});

const panelTestsSchema = z.object({
  power_on_result: z.string().default(''),
  power_on_display: z.string().default(''),
  zone_indicators_result: z.string().default(''),
  zone_indicators_display: z.string().default(''),
  fault_indicators_result: z.string().default(''),
  fault_indicators_display: z.string().default(''),
  silence_result: z.string().default(''),
  silence_display: z.string().default(''),
  reset_result: z.string().default(''),
  reset_display: z.string().default(''),
  event_log_result: z.string().default(''),
  event_log_display: z.string().default(''),
  remote_signalling_result: z.string().default(''),
  remote_signalling_display: z.string().default(''),
}).default({});

const powerTestsSchema = z.object({
  mains_result: z.string().default(''),
  mains_display: z.string().default(''),
  battery_voltage: z.string().default(''),
  battery_condition_result: z.string().default(''),
  battery_condition_display: z.string().default(''),
  charger_result: z.string().default(''),
  charger_display: z.string().default(''),
  standby_result: z.string().default(''),
  standby_display: z.string().default(''),
}).default({});

const faultTestsSchema = z.object({
  open_circuit_result: z.string().default(''),
  open_circuit_display: z.string().default(''),
  short_circuit_result: z.string().default(''),
  short_circuit_display: z.string().default(''),
  earth_fault_result: z.string().default(''),
  earth_fault_display: z.string().default(''),
  power_fail_result: z.string().default(''),
  power_fail_display: z.string().default(''),
}).default({});

const monitoringSchema = z.object({
  is_monitored: z.boolean().default(false),
  arc_name: z.string().default(''),
  arc_contact_number: z.string().default(''),
  arc_account_number: z.string().default(''),
  signalling_route: z.string().default(''),
  signalling_route_display: z.string().default(''),
}).default({});

const handoverSchema = z.object({
  as_built_drawings: z.boolean().default(false),
  as_fitted_drawings: z.boolean().default(false),
  operation_manual: z.boolean().default(false),
  maintenance_log: z.boolean().default(false),
  zone_chart: z.boolean().default(false),
  cause_effect: z.boolean().default(false),
  training: z.boolean().default(false),
  operating_instructions: z.boolean().default(false),
  log_book: z.boolean().default(false),
  spares: z.boolean().default(false),
}).default({});

const responsiblePersonSchema = z.object({
  name: z.string().default(''),
  position: z.string().default(''),
  signature: z.string().default(''),
  date: z.string().default(''),
  acknowledgement: z.boolean().default(false),
}).default({});

const designSchema = z.object({
  basis: z.string().default(''),
  coverage_category: z.string().default(''),
  deviations: z.string().default(''),
  doc_ref: z.string().default(''),
}).default({});

const acceptanceSchema = z.object({
  criteria: z.string().default(''),
  training_provided: z.boolean().default(false),
  log_book_provided: z.boolean().default(false),
}).default({});

const verificationSchema = z.object({
  organisation: z.string().default(''),
  scope: z.string().default(''),
  findings: z.string().default(''),
  compliant: z.boolean().default(false),
}).default({});

const modificationSchema = z.object({
  description: z.string().default(''),
  reason: z.string().default(''),
  extent: z.string().default(''),
  original_cert_ref: z.string().default(''),
}).default({});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const fireAlarmPayloadSchema = z.object({
  // Metadata
  certificate_number: z.string().default(''),
  certificate_type: z.string().default(''),
  certificate_type_display: z.string().default(''),
  inspection_date: z.string().default(''),
  previous_certificate_ref: z.string().default(''),
  standard_edition: z.string().default(''),
  is_periodic: z.boolean().default(false),
  is_design: z.boolean().default(false),
  is_installation: z.boolean().default(false),
  is_commissioning: z.boolean().default(false),
  is_acceptance: z.boolean().default(false),
  is_verification: z.boolean().default(false),
  is_modification: z.boolean().default(false),

  // Third-party certification (flat, spread from formatThirdPartyCertification)
  bafe_registration: z.string().default(''),
  fia_membership: z.string().default(''),
  nsi_ssaib_certification: z.string().default(''),
  other_accreditation: z.string().default(''),
  has_certification: z.boolean().default(false),

  // Fire risk assessment (flat, spread from formatFireRiskAssessment)
  fra_reference: z.string().default(''),
  fra_date: z.string().default(''),
  fra_author: z.string().default(''),
  fra_company: z.string().default(''),
  has_fra: z.boolean().default(false),

  // Client details
  client_name: z.string().default(''),
  client_address: z.string().default(''),
  client_telephone: z.string().default(''),
  client_email: z.string().default(''),

  // Premises details
  premises_name: z.string().default(''),
  premises_address: z.string().default(''),
  premises_type: z.string().default(''),
  premises_type_display: z.string().default(''),
  occupancy_type: z.string().default(''),
  occupancy_type_display: z.string().default(''),
  floors_count: z.number().default(1),
  estimated_occupancy: z.number().default(0),
  occupancy_basis: z.string().default(''),

  // System details
  system_category: z.string().default(''),
  system_category_description: z.string().default(''),
  network_type: z.string().default(''),
  network_type_display: z.string().default(''),
  zones_count: z.number().default(1),
  repeaters_installed: z.boolean().default(false),
  panel_make: z.string().default(''),
  panel_model: z.string().default(''),
  panel_location: z.string().default(''),
  panel_serial: z.string().default(''),
  panel_serial_photo: z.string().default(''),
  panel_firmware_version: z.string().default(''),

  // Loop/addressable details
  loop_count: z.number().default(0),
  devices_per_loop: z.string().default(''),
  total_addressable_devices: z.number().default(0),
  max_loop_capacity: z.number().default(0),

  // Detector spacing
  detector_spacing_compliant: z.boolean().default(false),
  spacing_notes: z.string().default(''),

  // Power supply
  mains_power_supply: z.boolean().default(true),
  battery_type: z.string().default(''),
  battery_type_display: z.string().default(''),
  battery_backup_hours: z.number().default(24),
  battery_test_result: z.string().default(''),
  battery_test_result_display: z.string().default(''),
  battery_test_result_class: z.string().default(''),

  // Equipment counts
  detector_count: detectorCountSchema,
  total_detectors: z.number().default(0),
  call_point_count: z.number().default(0),
  sounder_count: z.number().default(0),
  visual_alarm_count: z.number().default(0),
  total_alarm_devices: z.number().default(0),
  total_devices: z.number().default(0),

  // Cable & wiring
  cable_type: z.string().default(''),
  cable_fire_rating: z.string().default(''),
  circuit_integrity: z.string().default(''),
  wiring_notes: z.string().default(''),

  // Cause & effect
  cause_effect_ref: z.string().default(''),
  cause_effect_verified: z.boolean().default(false),
  cause_effect_date: z.string().default(''),

  // False alarm management
  false_alarm_management: z.boolean().default(false),
  false_alarm_strategy: z.string().default(''),
  investigation_delay: z.number().default(0),
  false_alarm_notes: z.string().default(''),

  // Commissioning
  commissioning_date: z.string().default(''),
  handover_date: z.string().default(''),

  // Nested objects
  monitoring: monitoringSchema,
  handover: handoverSchema,
  responsible_person: responsiblePersonSchema,
  panel_tests: panelTestsSchema,
  power_tests: powerTestsSchema,
  fault_tests: faultTestsSchema,
  design: designSchema,
  acceptance: acceptanceSchema,
  verification: verificationSchema,
  modification: modificationSchema,

  // Arrays
  zones: z.array(zoneSchema).default([]),
  has_zones: z.boolean().default(false),
  detectors: z.array(detectorSchema).default([]),
  has_detectors: z.boolean().default(false),
  sounders: z.array(sounderSchema).default([]),
  has_sounders: z.boolean().default(false),
  call_points: z.array(callPointSchema).default([]),
  has_call_points: z.boolean().default(false),
  sound_readings: z.array(soundReadingSchema).default([]),
  has_sound_readings: z.boolean().default(false),
  defects: z.array(defectSchema).default([]),
  has_defects: z.boolean().default(false),
  no_defects: z.boolean().default(true),
  previous_defects: z.array(previousDefectSchema).default([]),
  has_previous_defects: z.boolean().default(false),
  interface_equipment: z.array(interfaceEquipmentSchema).default([]),
  has_interface_equipment: z.boolean().default(false),
  aspirating_units: z.array(aspiratingUnitSchema).default([]),
  has_aspirating_units: z.boolean().default(false),
  test_equipment: z.array(testEquipmentItemSchema).default([]),
  has_test_equipment: z.boolean().default(false),
  photos: z.array(photoSchema).default([]),
  has_photos: z.boolean().default(false),
  related_standards: z.array(z.string()).default([]),
  has_related_standards: z.boolean().default(false),

  // Declarations — Designer
  designer_name: z.string().default(''),
  designer_company: z.string().default(''),
  designer_qualifications: z.string().default(''),
  designer_date: z.string().default(''),
  designer_signature: z.string().default(''),

  // Declarations — Installer
  installer_name: z.string().default(''),
  installer_company: z.string().default(''),
  installer_company_address: z.string().default(''),
  installer_company_phone: z.string().default(''),
  installer_qualifications: z.string().default(''),
  installer_date: z.string().default(''),
  installer_signature: z.string().default(''),

  // Declarations — Commissioner/Tester
  commissioner_name: z.string().default(''),
  commissioner_company: z.string().default(''),
  commissioner_company_address: z.string().default(''),
  commissioner_company_phone: z.string().default(''),
  commissioner_qualifications: z.string().default(''),
  commissioner_date: z.string().default(''),
  commissioner_signature: z.string().default(''),

  // Declarations — Verifier (verification cert only)
  verifier_name: z.string().default(''),
  verifier_company: z.string().default(''),
  verifier_qualifications: z.string().default(''),
  verifier_date: z.string().default(''),
  verifier_signature: z.string().default(''),

  // Overall result
  overall_result: z.string().default(''),
  overall_result_display: z.string().default(''),
  overall_result_class: z.string().default(''),

  // Service schedule
  next_service_due: z.string().default(''),
  next_inspection_due: z.string().default(''),

  // Additional notes
  additional_notes: z.string().default(''),
  has_additional_notes: z.boolean().default(false),

  // Devices tested (periodic)
  devices_tested_count: z.number().default(0),
  devices_total_count: z.number().default(0),
  devices_tested_percentage: z.number().default(0),
  device_testing_complete: z.boolean().default(false),

  // Extent & limitations (periodic/verification)
  extent_of_inspection: z.string().default(''),
  inspection_limitations: z.string().default(''),
  agreed_scope: z.string().default(''),

  // Previous certificate (periodic)
  previous_certificate_date: z.string().default(''),
  previous_inspector: z.string().default(''),
  previous_inspector_company: z.string().default(''),

  // Plan references
  zone_plan_ref: z.string().default(''),
  zone_plan_date: z.string().default(''),
  building_plan_ref: z.string().default(''),
  building_plan_date: z.string().default(''),

  // Environmental conditions
  ambient_temperature: z.string().default(''),
  ambient_noise_level: z.string().default(''),
  weather_conditions: z.string().default(''),

  // Company branding
  company_name: z.string().default(''),
  company_address: z.string().default(''),
  company_phone: z.string().default(''),
  company_email: z.string().default(''),
  company_website: z.string().default(''),
  company_logo: z.string().default(''),
  company_accent_color: z.string().default('#dc2626'),
  registration_scheme_logo: z.string().default(''),
  registration_scheme: z.string().default(''),
}).passthrough();

export type FireAlarmPayload = z.infer<typeof fireAlarmPayloadSchema>;

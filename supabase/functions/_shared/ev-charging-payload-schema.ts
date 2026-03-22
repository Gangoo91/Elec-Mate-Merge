/**
 * ev-charging-payload-schema.ts
 * Zod schema for the EV Charging Installation Certificate PDF payload.
 * Validates the output of formatEVChargingJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * If the template changes, update this schema — Deno tests will catch drift.
 *
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Nested Objects ──────────────────────────────────────────────────────────

const metadataSchema = z.object({
  certificate_number: z.string().default(''),
  installation_date: z.string().default(''),
  standard: z.string().default(''),
  code_of_practice: z.string().default(''),
  section_reference: z.string().default(''),
}).default({});

const clientDetailsSchema = z.object({
  name: z.string().default(''),
  address: z.string().default(''),
  telephone: z.string().default(''),
  email: z.string().default(''),
}).default({});

const vehicleDetailsSchema = z.object({
  make: z.string().default(''),
  model: z.string().default(''),
  registration: z.string().default(''),
}).default({});

const installationDetailsSchema = z.object({
  address: z.string().default(''),
  type: z.string().default(''),
  type_display: z.string().default(''),
}).default({});

const chargerDetailsSchema = z.object({
  make: z.string().default(''),
  model: z.string().default(''),
  serial: z.string().default(''),
  mode: z.string().default(''),
  connection_type: z.string().default(''),
  connection_display: z.string().default(''),
  power_rating_kw: z.string().default(''),
  rated_current_a: z.string().default(''),
  phases: z.string().default(''),
  socket_type: z.string().default(''),
}).default({});

const supplyDetailsSchema = z.object({
  voltage: z.string().default(''),
  phases: z.string().default(''),
  phases_display: z.string().default(''),
  earthing_arrangement: z.string().default(''),
  ze: z.string().default(''),
  pfc: z.string().default(''),
  external_loop_impedance: z.string().default(''),
}).default({});

const pmeDetailsSchema = z.object({
  is_pme: z.boolean().default(false),
  is_pme_display: z.string().default(''),
  earthing_measures: z.string().default(''),
  earth_electrode_installed: z.boolean().default(false),
  earth_electrode_installed_display: z.string().default(''),
  earth_electrode_resistance: z.string().default(''),
}).default({});

const circuitDetailsSchema = z.object({
  designation: z.string().default(''),
  cable_type: z.string().default(''),
  cable_size_mm2: z.string().default(''),
  cable_length_m: z.string().default(''),
  installation_method: z.string().default(''),
}).default({});

const protectionDetailsSchema = z.object({
  device_type: z.string().default(''),
  rating_a: z.string().default(''),
  curve: z.string().default(''),
  rcd_type: z.string().default(''),
  rcd_rating_ma: z.string().default(''),
  rcd_integral: z.boolean().default(false),
  rcd_integral_display: z.string().default(''),
}).default({});

const testResultsSchema = z.object({
  r1r2: z.string().default(''),
  r2: z.string().default(''),
  zs: z.string().default(''),
  max_zs: z.string().default(''),
  zs_satisfactory: z.string().default(''),
  insulation_resistance: z.string().default(''),
  insulation_satisfactory: z.string().default(''),
  polarity: z.string().default(''),
  polarity_display: z.string().default(''),
  rcd_trip_time: z.string().default(''),
  rcd_trip_time_satisfactory: z.string().default(''),
  rcd_trip_time_x5: z.string().default(''),
  rcd_trip_time_x5_satisfactory: z.string().default(''),
  earth_electrode_ra: z.string().default(''),
  functional_test: z.string().default(''),
  functional_test_display: z.string().default(''),
  load_test: z.string().default(''),
  load_test_display: z.string().default(''),
  load_test_current: z.string().default(''),
  voltage_drop: z.string().default(''),
  voltage_drop_satisfactory: z.string().default(''),
  phase_rotation: z.string().default(''),
  continuity_pe: z.string().default(''),
  rcd_test_button: z.string().default(''),
  rcd_test_button_display: z.string().default(''),
}).default({});

const dnoNotificationSchema = z.object({
  required: z.boolean().default(false),
  submitted: z.boolean().default(false),
  submitted_display: z.string().default(''),
  date: z.string().default(''),
  reference: z.string().default(''),
  g98_notification: z.boolean().default(false),
  g98_display: z.string().default(''),
  g99_application: z.boolean().default(false),
  g99_display: z.string().default(''),
}).default({});

const ozevDetailsSchema = z.object({
  applicable: z.boolean().default(false),
  applicable_display: z.string().default(''),
  scheme: z.string().default(''),
  scheme_display: z.string().default(''),
  reference: z.string().default(''),
}).default({});

const smartFeaturesSchema = z.object({
  smart_charging_enabled: z.boolean().default(false),
  smart_charging_display: z.string().default(''),
  load_management: z.boolean().default(false),
  load_management_display: z.string().default(''),
  load_management_type: z.string().default(''),
}).default({});

const handoverSchema = z.object({
  user_instructions_provided: z.boolean().default(false),
  user_instructions_display: z.string().default(''),
  operating_manual_provided: z.boolean().default(false),
  operating_manual_display: z.string().default(''),
  special_conditions: z.string().default(''),
}).default({});

const installerSchema = z.object({
  name: z.string().default(''),
  company: z.string().default(''),
  qualifications: z.string().default(''),
  scheme: z.string().default(''),
  scheme_number: z.string().default(''),
  signature: z.string().default(''),
  date: z.string().default(''),
}).default({});

const complianceSchema = z.object({
  bs7671: z.boolean().default(false),
  bs7671_display: z.string().default(''),
  iet_cop: z.boolean().default(false),
  iet_cop_display: z.string().default(''),
  building_regs: z.boolean().default(false),
  building_regs_display: z.string().default(''),
}).default({});

const companyDetailsSchema = z.object({
  company_name: z.string().default(''),
  company_address: z.string().default(''),
  company_phone: z.string().default(''),
  company_email: z.string().default(''),
  company_website: z.string().default(''),
  company_logo: z.string().default(''),
  company_tagline: z.string().default(''),
  company_accent_color: z.string().default('#22c55e'),
  registration_scheme: z.string().default(''),
  registration_number: z.string().default(''),
  registration_scheme_logo: z.string().default(''),
}).default({});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const evChargingPayloadSchema = z.object({
  // Nested objects
  metadata: metadataSchema,
  client_details: clientDetailsSchema,
  vehicle_details: vehicleDetailsSchema,
  installation_details: installationDetailsSchema,
  charger_details: chargerDetailsSchema,
  supply_details: supplyDetailsSchema,
  pme_details: pmeDetailsSchema,
  circuit_details: circuitDetailsSchema,
  protection_details: protectionDetailsSchema,
  test_results: testResultsSchema,
  dno_notification: dnoNotificationSchema,
  ozev_details: ozevDetailsSchema,
  smart_features: smartFeaturesSchema,
  handover: handoverSchema,
  installer: installerSchema,
  compliance: complianceSchema,
  company_details: companyDetailsSchema,

  // Root-level text fields
  additional_notes: z.string().default(''),
  special_conditions: z.string().default(''),
  declaration_text: z.string().default(''),

  // ── Flat copies for direct template access ──────────────────────────────
  // Client (flat)
  client_name: z.string().default(''),
  client_address: z.string().default(''),
  client_telephone: z.string().default(''),
  client_email: z.string().default(''),

  // Vehicle (flat)
  vehicle_make: z.string().default(''),
  vehicle_model: z.string().default(''),
  vehicle_registration: z.string().default(''),

  // Installation (flat)
  installation_address: z.string().default(''),
  installation_date: z.string().default(''),
  installation_type: z.string().default(''),

  // Charger (flat)
  charger_make: z.string().default(''),
  charger_model: z.string().default(''),
  charger_serial: z.string().default(''),
  charger_mode: z.string().default(''),
  charger_connection: z.string().default(''),
  power_rating_kw: z.string().default(''),
  rated_current_a: z.string().default(''),
  phases: z.string().default(''),
  socket_type: z.string().default(''),

  // Supply (flat)
  supply_voltage: z.string().default(''),
  supply_phases: z.string().default(''),
  earthing_arrangement: z.string().default(''),
  ze: z.string().default(''),
  prospective_fault_current: z.string().default(''),
  external_loop_impedance: z.string().default(''),

  // PME (flat)
  is_pme: z.boolean().default(false),
  pme_earthing_measures: z.string().default(''),
  earth_electrode_installed: z.boolean().default(false),
  earth_electrode_resistance: z.string().default(''),

  // Circuit (flat)
  circuit_designation: z.string().default(''),
  cable_type: z.string().default(''),
  cable_size_mm2: z.string().default(''),
  cable_length_m: z.string().default(''),
  installation_method: z.string().default(''),

  // Protection (flat)
  protection_device_type: z.string().default(''),
  protection_device_rating_a: z.string().default(''),
  protection_device_curve: z.string().default(''),
  rcd_type: z.string().default(''),
  rcd_rating_ma: z.string().default(''),
  rcd_integral: z.boolean().default(false),

  // Additional test results (flat)
  voltage_drop: z.string().default(''),
  phase_rotation: z.string().default(''),
  continuity_pe: z.string().default(''),
  rcd_test_button: z.string().default(''),

  // OZEV (flat)
  ozev_grant_applicable: z.boolean().default(false),
  ozev_scheme: z.string().default(''),
  ozev_grant_ref: z.string().default(''),

  // DNO (flat)
  dno_notified: z.boolean().default(false),
  dno_notification_date: z.string().default(''),
  dno_reference: z.string().default(''),
  g98_notification: z.boolean().default(false),
  g99_application: z.boolean().default(false),

  // Smart (flat)
  smart_charging_enabled: z.boolean().default(false),
  load_management: z.boolean().default(false),
  load_management_type: z.string().default(''),

  // Handover (flat)
  user_instructions_provided: z.boolean().default(false),
  operating_manual_provided: z.boolean().default(false),

  // Installer (flat)
  installer_name: z.string().default(''),
  installer_company: z.string().default(''),
  installer_qualifications: z.string().default(''),
  installer_scheme: z.string().default(''),
  installer_scheme_number: z.string().default(''),
  installer_signature: z.string().default(''),
  installer_date: z.string().default(''),

  // Compliance (flat)
  bs7671_compliance: z.boolean().default(false),
  iet_cop_compliance: z.boolean().default(false),
  building_regs_compliance: z.boolean().default(false),

  // Certificate
  certificate_number: z.string().default(''),

  // Company branding (flat)
  company_name: z.string().default(''),
  company_address: z.string().default(''),
  company_phone: z.string().default(''),
  company_email: z.string().default(''),
  company_website: z.string().default(''),
  company_logo: z.string().default(''),
  company_tagline: z.string().default(''),
  company_accent_color: z.string().default('#22c55e'),
  registration_scheme: z.string().default(''),
  registration_number: z.string().default(''),
  registration_scheme_logo: z.string().default(''),
}).passthrough();

export type EVChargingPayload = z.infer<typeof evChargingPayloadSchema>;

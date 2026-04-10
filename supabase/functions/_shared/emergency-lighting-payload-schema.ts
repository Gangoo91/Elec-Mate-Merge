/**
 * emergency-lighting-payload-schema.ts
 * Zod schema for the Emergency Lighting Certificate PDF payload.
 * Validates the output of formatEmergencyLightingJson() before sending to PDF Monkey.
 *
 * Every field here maps to a {{ variable }} in the PDF Monkey Liquid template.
 * Deno-compatible — uses esm.sh for Zod import.
 */

import { z } from 'https://esm.sh/zod@3.23.8';

// ── Array Item Schemas ──────────────────────────────────────────────────────

const luminaireSchema = z.object({
  number: z.number().default(0),
  location: z.string().default(''),
  make: z.string().default(''),
  model: z.string().default(''),
  type: z.string().default(''),
  type_raw: z.string().default(''),
  category: z.string().default(''),
  category_raw: z.string().default(''),
  rated_duration: z.union([z.number(), z.string()]).default(180),
  rated_duration_display: z.string().default(''),
  functional_result: z.string().default(''),
  functional_result_raw: z.string().default(''),
  duration_result: z.string().default(''),
  duration_result_raw: z.string().default(''),
  battery_type: z.string().default(''),
  battery_type_raw: z.string().default(''),
  wattage: z.union([z.number(), z.string()]).default(0),
  notes: z.string().default(''),
  install_date: z.string().default(''),
  photo_url: z.string().default(''),
});

const luxReadingSchema = z.object({
  number: z.number().default(0),
  location: z.string().default(''),
  category: z.string().default(''),
  category_display: z.string().default(''),
  reading: z.string().default(''),
  min_required: z.string().default(''),
  result: z.string().default(''),
  result_raw: z.string().default(''),
});

const defectSchema = z.object({
  number: z.number().default(0),
  description: z.string().default(''),
  priority: z.string().default(''),
  priority_raw: z.string().default(''),
  luminaire_id: z.string().default(''),
  luminaire_location: z.string().default(''),
  rectified: z.boolean().default(false),
  rectified_display: z.string().default(''),
  rectification_date: z.string().default(''),
  photo_url: z.string().default(''),
});

const photoSchema = z.object({
  number: z.number().default(0),
  url: z.string().default(''),
  caption: z.string().default(''),
  category: z.string().default(''),
  category_display: z.string().default(''),
  linked_item: z.string().default(''),
  uploaded_at: z.string().optional().default(''),
});

const categoryPhotoSchema = z.object({
  number: z.number().default(0),
  url: z.string().default(''),
  caption: z.string().default(''),
  linked_item: z.string().default(''),
  uploaded_at: z.string().optional().default(''),
});

// ── Nested Object Schemas ───────────────────────────────────────────────────

const metadataSchema = z
  .object({
    certificate_number: z.string().default(''),
    test_type: z.string().default(''),
    test_type_display: z.string().default(''),
    test_date: z.string().default(''),
    standards: z.string().default(''),
  })
  .default({});

const clientSchema = z
  .object({
    name: z.string().default(''),
    address: z.string().default(''),
    telephone: z.string().default(''),
    email: z.string().default(''),
  })
  .default({});

const premisesSchema = z
  .object({
    name: z.string().default(''),
    address: z.string().default(''),
    type: z.string().default(''),
    type_display: z.string().default(''),
    occupancy_type: z.string().default(''),
    occupancy_display: z.string().default(''),
  })
  .default({});

const systemSchema = z
  .object({
    type: z.string().default(''),
    type_display: z.string().default(''),
    rated_duration: z.union([z.number(), z.string()]).default(180),
    rated_duration_display: z.string().default(''),
    total_luminaires: z.number().default(0),
    central_battery_system: z.boolean().default(false),
    central_battery_system_display: z.string().default(''),
    central_battery_location: z.string().default(''),
    self_contained_units: z.boolean().default(true),
    self_contained_units_display: z.string().default(''),
    purpose_escape_route: z.boolean().default(false),
    purpose_open_area: z.boolean().default(false),
    purpose_high_risk: z.boolean().default(false),
    purpose_standby: z.boolean().default(false),
    has_purpose: z.boolean().default(false),
  })
  .default({});

const equipmentSchema = z
  .object({
    luminaire_count: z.number().default(0),
    exit_sign_count: z.number().default(0),
    central_battery_count: z.number().default(0),
    total_count: z.number().default(0),
  })
  .default({});

const testEquipmentSchema = z
  .object({
    lux_meter_make: z.string().default(''),
    lux_meter_model: z.string().default(''),
    lux_meter_serial: z.string().default(''),
    lux_meter_calibration_date: z.string().default(''),
    has_equipment: z.boolean().default(false),
  })
  .default({});

const luminaireSummarySchema = z
  .object({
    total: z.number().default(0),
    escape_route: z.number().default(0),
    open_area: z.number().default(0),
    high_risk: z.number().default(0),
    standby: z.number().default(0),
    exit_signs: z.number().default(0),
    all_pass: z.boolean().default(false),
    all_pass_display: z.string().default(''),
    pass_count: z.number().default(0),
    fail_count: z.number().default(0),
    tested_count: z.number().default(0),
  })
  .default({});

const monthlyTestSchema = z
  .object({
    date: z.string().default(''),
    all_luminaires_operational: z.boolean().default(false),
    all_luminaires_operational_display: z.string().default(''),
    charging_indicators_normal: z.boolean().default(false),
    charging_indicators_normal_display: z.string().default(''),
    faults_found: z.string().default(''),
    action_taken: z.string().default(''),
    has_faults: z.boolean().default(false),
  })
  .default({});

const annualTestSchema = z
  .object({
    date: z.string().default(''),
    duration_tested: z.union([z.number(), z.string()]).default(0),
    all_luminaires_operational: z.boolean().default(false),
    all_luminaires_operational_display: z.string().default(''),
    battery_condition: z.string().default(''),
    battery_condition_display: z.string().default(''),
    faults_found: z.string().default(''),
    action_taken: z.string().default(''),
    has_faults: z.boolean().default(false),
  })
  .default({});

const serviceScheduleSchema = z
  .object({
    next_monthly_test: z.string().default(''),
    next_annual_test: z.string().default(''),
  })
  .default({});

const testerSchema = z
  .object({
    name: z.string().default(''),
    company: z.string().default(''),
    qualifications: z.string().default(''),
    signature: z.string().default(''),
    date: z.string().default(''),
  })
  .default({});

const responsiblePersonSchema = z
  .object({
    name: z.string().default(''),
    position: z.string().default(''),
    signature: z.string().default(''),
    date: z.string().default(''),
    has_responsible_person: z.boolean().default(false),
  })
  .default({});

const companySchema = z
  .object({
    name: z.string().default(''),
    address: z.string().default(''),
    phone: z.string().default(''),
    email: z.string().default(''),
    website: z.string().default(''),
    logo: z.string().default(''),
    tagline: z.string().default(''),
    accent_color: z.string().default('#f59e0b'),
    registration_scheme_logo: z.string().default(''),
    registration_scheme: z.string().default(''),
    registration_number: z.string().default(''),
  })
  .default({});

// ── Root Schema ─────────────────────────────────────────────────────────────

export const emergencyLightingPayloadSchema = z
  .object({
    // Nested objects
    metadata: metadataSchema,
    client: clientSchema,
    premises: premisesSchema,
    system: systemSchema,
    equipment: equipmentSchema,
    test_equipment: testEquipmentSchema,
    luminaire_summary: luminaireSummarySchema,
    monthly_test: monthlyTestSchema,
    annual_test: annualTestSchema,
    service_schedule: serviceScheduleSchema,
    tester: testerSchema,
    responsible_person: responsiblePersonSchema,
    company: companySchema,

    // Certificate type
    certificate_type: z.string().default(''),
    certificate_type_display: z.string().default(''),

    // Extent
    extent_of_installation: z.string().default(''),
    has_extent: z.boolean().default(false),

    // Arrays
    luminaires: z.array(luminaireSchema).default([]),
    lux_readings: z.array(luxReadingSchema).default([]),
    defects: z.array(defectSchema).default([]),
    photos: z.array(photoSchema).default([]),

    // Photo arrays by category
    installation_photos: z.array(categoryPhotoSchema).default([]),
    luminaire_photos: z.array(categoryPhotoSchema).default([]),
    defect_photos: z.array(categoryPhotoSchema).default([]),
    central_battery_photos: z.array(categoryPhotoSchema).default([]),
    exit_sign_photos: z.array(categoryPhotoSchema).default([]),

    // Boolean flags
    has_lux_readings: z.boolean().default(false),
    has_defects: z.boolean().default(false),
    no_defects: z.boolean().default(true),
    has_photos: z.boolean().default(false),
    has_installation_photos: z.boolean().default(false),
    has_luminaire_photos: z.boolean().default(false),
    has_defect_photos: z.boolean().default(false),
    has_recommendations: z.boolean().default(false),
    has_additional_notes: z.boolean().default(false),
    is_satisfactory: z.boolean().default(false),
    defect_count: z.number().default(0),
    photo_count: z.number().default(0),

    // Result
    overall_result: z.string().default(''),
    overall_result_display: z.string().default(''),

    // Text fields
    recommendations: z.string().default(''),
    additional_notes: z.string().default(''),
    declaration_text: z.string().default(''),

    // ── Flat copies for direct template access ──────────────────────────────

    // Certificate
    certificate_number: z.string().default(''),
    test_date: z.string().default(''),
    test_type: z.string().default(''),

    // Client (flat)
    client_name: z.string().default(''),
    client_address: z.string().default(''),
    client_telephone: z.string().default(''),
    client_email: z.string().default(''),

    // Premises (flat)
    premises_name: z.string().default(''),
    premises_address: z.string().default(''),
    premises_type: z.string().default(''),
    occupancy_type: z.string().default(''),

    // System (flat)
    system_type: z.string().default(''),
    rated_duration: z.union([z.number(), z.string()]).default(180),
    central_battery_system: z.boolean().default(false),
    central_battery_location: z.string().default(''),
    self_contained_units: z.boolean().default(false),

    // Equipment (flat)
    luminaire_count: z.number().default(0),
    exit_sign_count: z.number().default(0),
    central_battery_count: z.number().default(0),

    // Service schedule (flat)
    next_monthly_test_due: z.string().default(''),
    next_annual_test_due: z.string().default(''),
    next_three_yearly_inspection_due: z.string().default(''),
    previous_certificate_number: z.string().default(''),
    risk_assessment_reference: z.string().default(''),
    drawing_reference: z.string().default(''),
    wiring_system: z.string().default(''),
    automatic_test_system: z.boolean().default(false),
    ats_details: z.string().default(''),
    design_standard: z.string().default('BS 5266-1:2016'),

    // Tester (flat)
    tester_name: z.string().default(''),
    tester_company: z.string().default(''),
    tester_qualifications: z.string().default(''),
    tester_signature: z.string().default(''),
    tester_date: z.string().default(''),

    // Responsible person (flat)
    responsible_person_name: z.string().default(''),
    responsible_person_position: z.string().default(''),
    responsible_person_signature: z.string().default(''),
    responsible_person_date: z.string().default(''),

    // Test equipment (flat)
    lux_meter_make: z.string().default(''),
    lux_meter_model: z.string().default(''),
    lux_meter_serial: z.string().default(''),
    lux_meter_calibration_date: z.string().default(''),

    // Company (flat)
    company_name: z.string().default(''),
    company_address: z.string().default(''),
    company_phone: z.string().default(''),
    company_email: z.string().default(''),
    company_website: z.string().default(''),
    company_logo: z.string().default(''),
    company_tagline: z.string().default(''),
    company_accent_color: z.string().default('#f59e0b'),
    registration_scheme_logo: z.string().default(''),
    registration_scheme: z.string().default(''),
    registration_number: z.string().default(''),
  })
  .passthrough();

export type EmergencyLightingPayload = z.infer<typeof emergencyLightingPayloadSchema>;

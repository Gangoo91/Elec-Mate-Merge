/**
 * fire-alarm-payload-schema.test.ts
 * Deno tests for the Fire Alarm Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/fire-alarm-payload-schema.test.ts --allow-net
 */

import { assertEquals, assertExists } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { fireAlarmPayloadSchema } from './fire-alarm-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    certificate_number: 'FA-001',
    certificate_type: 'periodic',
    certificate_type_display: 'Periodic Inspection & Test',
    inspection_date: '22/03/2026',
    previous_certificate_ref: '',
    standard_edition: 'BS 5839-1:2017',
    is_periodic: true,
    is_design: false,
    is_installation: false,
    is_commissioning: false,
    is_acceptance: false,
    is_verification: false,
    is_modification: false,
    bafe_registration: 'BAFE SP203',
    fia_membership: '',
    nsi_ssaib_certification: '',
    other_accreditation: '',
    has_certification: true,
    fra_reference: 'FRA-2025-001',
    fra_date: '01/01/2025',
    fra_author: 'Risk Assessor',
    fra_company: 'FRA Ltd',
    has_fra: true,
    client_name: 'Test Client',
    client_address: '123 Test St',
    client_telephone: '07700900000',
    client_email: 'test@test.com',
    premises_name: 'Test Building',
    premises_address: '123 Test St',
    premises_type: 'office',
    premises_type_display: 'Office',
    occupancy_type: 'day',
    occupancy_type_display: 'Day Use',
    floors_count: 3,
    estimated_occupancy: 50,
    occupancy_basis: 'Workplace assessment',
    system_category: 'L2',
    system_category_description: 'Category L2',
    network_type: 'addressable',
    network_type_display: 'Addressable',
    zones_count: 4,
    repeaters_installed: false,
    panel_make: 'Advanced',
    panel_model: 'MxPro 5',
    panel_location: 'Reception',
    panel_serial: 'ADV-12345',
    panel_serial_photo: '',
    panel_firmware_version: '3.2.1',
    loop_count: 2,
    devices_per_loop: '64',
    total_addressable_devices: 128,
    max_loop_capacity: 256,
    detector_spacing_compliant: true,
    spacing_notes: '',
    mains_power_supply: true,
    battery_type: 'sealed-lead-acid',
    battery_type_display: 'Sealed Lead Acid',
    battery_backup_hours: 24,
    battery_test_result: 'pass',
    battery_test_result_display: 'Pass',
    battery_test_result_class: 'pass',
    detector_count: {
      optical_smoke: 10,
      ionisation_smoke: 0,
      multi_sensor: 5,
      heat_fixed: 3,
      heat_ror: 2,
      beam: 0,
      aspirating: 0,
      flame: 0,
      co: 0,
    },
    total_detectors: 20,
    call_point_count: 8,
    sounder_count: 12,
    visual_alarm_count: 4,
    total_alarm_devices: 24,
    total_devices: 44,
    cable_type: 'MICC',
    cable_fire_rating: 'PH120',
    circuit_integrity: 'Enhanced',
    wiring_notes: '',
    cause_effect_ref: 'CE-001',
    cause_effect_verified: true,
    cause_effect_date: '22/03/2026',
    false_alarm_management: true,
    false_alarm_strategy: 'Investigation delay',
    investigation_delay: 60,
    false_alarm_notes: '',
    commissioning_date: '',
    handover_date: '',
    monitoring: {
      is_monitored: true,
      arc_name: 'Monitoring Co',
      arc_contact_number: '0800 123 456',
      arc_account_number: 'ACC-001',
      signalling_route: 'dual-path',
      signalling_route_display: 'Dual Path',
    },
    handover: {
      as_built_drawings: false,
      as_fitted_drawings: false,
      operation_manual: false,
      maintenance_log: false,
      zone_chart: false,
      cause_effect: false,
      training: false,
      operating_instructions: false,
      log_book: false,
      spares: false,
    },
    responsible_person: {
      name: 'Building Manager',
      position: 'Facilities Manager',
      signature: '',
      date: '22/03/2026',
      acknowledgement: true,
    },
    panel_tests: {
      power_on_result: 'pass',
      power_on_display: 'Pass',
      zone_indicators_result: 'pass',
      zone_indicators_display: 'Pass',
      fault_indicators_result: 'pass',
      fault_indicators_display: 'Pass',
      silence_result: 'pass',
      silence_display: 'Pass',
      reset_result: 'pass',
      reset_display: 'Pass',
      event_log_result: 'pass',
      event_log_display: 'Pass',
      remote_signalling_result: 'pass',
      remote_signalling_display: 'Pass',
    },
    power_tests: {
      mains_result: 'pass',
      mains_display: 'Pass',
      battery_voltage: '26.4V',
      battery_condition_result: 'pass',
      battery_condition_display: 'Pass',
      charger_result: 'pass',
      charger_display: 'Pass',
      standby_result: 'pass',
      standby_display: 'Pass',
    },
    fault_tests: {
      open_circuit_result: 'pass',
      open_circuit_display: 'Pass',
      short_circuit_result: 'pass',
      short_circuit_display: 'Pass',
      earth_fault_result: 'pass',
      earth_fault_display: 'Pass',
      power_fail_result: 'pass',
      power_fail_display: 'Pass',
    },
    design: { basis: '', coverage_category: '', deviations: '', doc_ref: '' },
    acceptance: { criteria: '', training_provided: false, log_book_provided: false },
    verification: { organisation: '', scope: '', findings: '', compliant: false },
    modification: { description: '', reason: '', extent: '', original_cert_ref: '' },
    zones: [],
    has_zones: false,
    detectors: [],
    has_detectors: false,
    sounders: [],
    has_sounders: false,
    call_points: [],
    has_call_points: false,
    sound_readings: [],
    has_sound_readings: false,
    defects: [],
    has_defects: false,
    no_defects: true,
    previous_defects: [],
    has_previous_defects: false,
    interface_equipment: [],
    has_interface_equipment: false,
    aspirating_units: [],
    has_aspirating_units: false,
    test_equipment: [],
    has_test_equipment: false,
    photos: [],
    has_photos: false,
    related_standards: [],
    has_related_standards: false,
    designer_name: '',
    designer_company: '',
    designer_qualifications: '',
    designer_date: '',
    designer_signature: '',
    installer_name: '',
    installer_company: '',
    installer_company_address: '',
    installer_company_phone: '',
    installer_qualifications: '',
    installer_date: '',
    installer_signature: '',
    commissioner_name: 'Tester Bob',
    commissioner_company: 'Test Co',
    commissioner_company_address: '456 Test Ave',
    commissioner_company_phone: '07700900001',
    commissioner_qualifications: 'FIA Competent',
    commissioner_date: '22/03/2026',
    commissioner_signature: 'data:image/png;base64,...',
    verifier_name: '',
    verifier_company: '',
    verifier_qualifications: '',
    verifier_date: '',
    verifier_signature: '',
    overall_result: 'satisfactory',
    overall_result_display: 'Satisfactory',
    overall_result_class: 'pass',
    next_service_due: '22/06/2026',
    next_inspection_due: '22/03/2027',
    additional_notes: '',
    has_additional_notes: false,
    devices_tested_count: 44,
    devices_total_count: 44,
    devices_tested_percentage: 100,
    device_testing_complete: true,
    extent_of_inspection: '',
    inspection_limitations: '',
    agreed_scope: '',
    previous_certificate_date: '',
    previous_inspector: '',
    previous_inspector_company: '',
    zone_plan_ref: '',
    zone_plan_date: '',
    building_plan_ref: '',
    building_plan_date: '',
    ambient_temperature: '',
    ambient_noise_level: '',
    weather_conditions: '',
    company_name: 'Test Co',
    company_address: '456 Test Ave',
    company_phone: '07700900001',
    company_email: 'info@testco.com',
    company_website: '',
    company_logo: '',
    company_accent_color: '#dc2626',
    registration_scheme_logo: '',
    registration_scheme: '',
  };
}

function makeZone(overrides: Record<string, unknown> = {}) {
  return {
    zone_number: 1,
    zone_name: 'Zone 1 - Ground Floor',
    location: 'Ground Floor',
    detector_count: 5,
    call_point_count: 2,
    sounder_count: 3,
    ...overrides,
  };
}

function makeDetector(overrides: Record<string, unknown> = {}) {
  return {
    number: 1,
    zone_id: 'zone-1',
    location: 'Corridor',
    type: 'Optical Smoke',
    make: 'Apollo',
    model: 'Discovery',
    serial_number: 'APO-001',
    install_date: '01/01/2024',
    test_result: 'Pass',
    test_result_class: 'pass',
    notes: '',
    ...overrides,
  };
}

function makeDefect(overrides: Record<string, unknown> = {}) {
  return {
    number: 1,
    description: 'Detector head contaminated',
    severity: 'Non-Critical',
    severity_class: 'non-critical',
    rectified: false,
    rectification_date: '',
    photo_url: '',
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when detector_count is wrong type', () => {
  const payload = { ...makeMinimalPayload(), detector_count: 'not an object' };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = fireAlarmPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.certificate_number, '');
    assertEquals(result.data.is_periodic, false);
    assertEquals(result.data.zones.length, 0);
    assertEquals(result.data.detectors.length, 0);
    assertEquals(result.data.defects.length, 0);
    assertEquals(result.data.no_defects, true);
  }
});

Deno.test('Zone array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    zones: [makeZone(), makeZone({ zone_number: 2, zone_name: 'Zone 2' })],
    has_zones: true,
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.zones.length, 2);
    assertEquals(result.data.zones[0].zone_name, 'Zone 1 - Ground Floor');
  }
});

Deno.test('Detector array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    detectors: [makeDetector(), makeDetector({ number: 2, serial_number: 'APO-002' })],
    has_detectors: true,
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.detectors.length, 2);
  }
});

Deno.test('Defect array validates with photo_url', () => {
  const payload = {
    ...makeMinimalPayload(),
    defects: [makeDefect(), makeDefect({ number: 2, rectified: true, photo_url: 'https://example.com/photo.jpg' })],
    has_defects: true,
    no_defects: false,
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.defects.length, 2);
    assertEquals(result.data.defects[1].rectified, true);
  }
});

Deno.test('All nested test objects validate', () => {
  const payload = makeMinimalPayload();
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.panel_tests.power_on_result, 'pass');
    assertEquals(result.data.power_tests.battery_voltage, '26.4V');
    assertEquals(result.data.fault_tests.open_circuit_result, 'pass');
    assertEquals(result.data.monitoring.is_monitored, true);
  }
});

Deno.test('Empty arrays accepted for all array fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    zones: [],
    detectors: [],
    sounders: [],
    call_points: [],
    sound_readings: [],
    defects: [],
    previous_defects: [],
    interface_equipment: [],
    aspirating_units: [],
    test_equipment: [],
    photos: [],
    related_standards: [],
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = {
    ...makeMinimalPayload(),
    some_custom_field: 'hello',
    another_extra: 42,
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).some_custom_field, 'hello');
  }
});

Deno.test('7 certificate type booleans are independent', () => {
  const payload = {
    ...makeMinimalPayload(),
    is_periodic: false,
    is_installation: true,
    is_commissioning: true,
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.is_periodic, false);
    assertEquals(result.data.is_installation, true);
    assertEquals(result.data.is_commissioning, true);
    assertEquals(result.data.is_design, false);
  }
});

Deno.test('Periodic-specific fields validate', () => {
  const payload = {
    ...makeMinimalPayload(),
    devices_tested_count: 40,
    devices_total_count: 44,
    devices_tested_percentage: 91,
    device_testing_complete: false,
    extent_of_inspection: 'All accessible areas',
    inspection_limitations: 'Locked plant room',
    previous_certificate_date: '22/03/2025',
    previous_inspector: 'Previous Tester',
    previous_inspector_company: 'Old Co',
  };
  const result = fireAlarmPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.devices_tested_percentage, 91);
    assertEquals(result.data.previous_inspector, 'Previous Tester');
  }
});

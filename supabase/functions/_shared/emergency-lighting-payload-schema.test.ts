/**
 * emergency-lighting-payload-schema.test.ts
 * Deno tests for the Emergency Lighting Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/emergency-lighting-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { emergencyLightingPayloadSchema } from './emergency-lighting-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    metadata: {
      certificate_number: 'EL-001', test_type: 'annual',
      test_type_display: 'Annual Full Duration Test', test_date: '22/03/2026',
      standards: 'BS 5266-1:2016',
    },
    client: { name: 'Test Client', address: '123 Test St', telephone: '07700900000', email: 'test@test.com' },
    premises: {
      name: 'Test Building', address: '123 Test St',
      type: 'office', type_display: 'Office',
      occupancy_type: 'day', occupancy_display: 'Day Use',
    },
    system: {
      type: 'maintained', type_display: 'Maintained',
      rated_duration: 180, rated_duration_display: '3 hours',
      total_luminaires: 24, central_battery_system: false,
      central_battery_system_display: 'No', central_battery_location: '',
      self_contained_units: true, self_contained_units_display: 'Yes',
      purpose_escape_route: true, purpose_open_area: true,
      purpose_high_risk: false, purpose_standby: false, has_purpose: true,
    },
    equipment: { luminaire_count: 20, exit_sign_count: 4, central_battery_count: 0, total_count: 24 },
    test_equipment: {
      lux_meter_make: 'Testo', lux_meter_serial: 'TES-001',
      lux_meter_calibration_date: '01/01/2026', has_equipment: true,
    },
    luminaire_summary: {
      total: 24, escape_route: 12, open_area: 8, high_risk: 0, standby: 0, exit_signs: 4,
      all_pass: true, all_pass_display: 'All Pass', pass_count: 24, fail_count: 0, tested_count: 24,
    },
    monthly_test: {
      date: '01/03/2026', all_luminaires_operational: true, all_luminaires_operational_display: 'Yes',
      charging_indicators_normal: true, charging_indicators_normal_display: 'Yes',
      faults_found: '', action_taken: '', has_faults: false,
    },
    annual_test: {
      date: '22/03/2026', duration_tested: 180,
      all_luminaires_operational: true, all_luminaires_operational_display: 'Yes',
      battery_condition: 'good', battery_condition_display: 'Good',
      faults_found: '', action_taken: '', has_faults: false,
    },
    service_schedule: { next_monthly_test: '01/04/2026', next_annual_test: '22/03/2027' },
    tester: {
      name: 'Tester Bob', company: 'Test Co', qualifications: 'C&G 2919',
      signature: 'data:image/png;base64,...', date: '22/03/2026',
    },
    responsible_person: {
      name: 'Building Manager', position: 'Facilities', signature: '',
      date: '22/03/2026', has_responsible_person: true,
    },
    company: {
      name: 'Test Co', address: '456 Test Ave', phone: '07700900001',
      email: 'info@testco.com', website: '', logo: '', tagline: '',
      accent_color: '#f59e0b', registration_scheme_logo: '',
      registration_scheme: '', registration_number: '',
    },
    certificate_type: 'annual',
    certificate_type_display: 'Annual Full Duration Test',
    extent_of_installation: 'All areas',
    has_extent: true,
    luminaires: [],
    lux_readings: [],
    defects: [],
    photos: [],
    installation_photos: [],
    luminaire_photos: [],
    defect_photos: [],
    central_battery_photos: [],
    exit_sign_photos: [],
    has_lux_readings: false,
    has_defects: false,
    no_defects: true,
    has_photos: false,
    has_installation_photos: false,
    has_luminaire_photos: false,
    has_defect_photos: false,
    has_recommendations: false,
    has_additional_notes: false,
    is_satisfactory: true,
    defect_count: 0,
    photo_count: 0,
    overall_result: 'satisfactory',
    overall_result_display: 'Satisfactory',
    recommendations: '',
    additional_notes: '',
    declaration_text: '',
    // Flat copies
    certificate_number: 'EL-001',
    test_date: '22/03/2026',
    test_type: 'annual',
    client_name: 'Test Client',
    client_address: '123 Test St',
    client_telephone: '07700900000',
    client_email: 'test@test.com',
    premises_name: 'Test Building',
    premises_address: '123 Test St',
    premises_type: 'office',
    occupancy_type: 'day',
    system_type: 'maintained',
    rated_duration: 180,
    central_battery_system: false,
    central_battery_location: '',
    self_contained_units: true,
    luminaire_count: 20,
    exit_sign_count: 4,
    central_battery_count: 0,
    next_monthly_test_due: '01/04/2026',
    next_annual_test_due: '22/03/2027',
    tester_name: 'Tester Bob',
    tester_company: 'Test Co',
    tester_qualifications: 'C&G 2919',
    tester_signature: 'data:image/png;base64,...',
    tester_date: '22/03/2026',
    responsible_person_name: 'Building Manager',
    responsible_person_position: 'Facilities',
    responsible_person_signature: '',
    responsible_person_date: '22/03/2026',
    lux_meter_make: 'Testo',
    lux_meter_serial: 'TES-001',
    lux_meter_calibration_date: '01/01/2026',
    company_name: 'Test Co',
    company_address: '456 Test Ave',
    company_phone: '07700900001',
    company_email: 'info@testco.com',
    company_website: '',
    company_logo: '',
    company_tagline: '',
    company_accent_color: '#f59e0b',
    registration_scheme_logo: '',
    registration_scheme: '',
    registration_number: '',
  };
}

function makeLuminaire(overrides: Record<string, unknown> = {}) {
  return {
    number: 1, location: 'Corridor', make: 'Mackwell', model: 'Xylux',
    type: 'Escape Route', type_raw: 'escape', category: 'Self-contained', category_raw: 'self-contained',
    rated_duration: 180, rated_duration_display: '3 hours',
    functional_result: 'Pass', functional_result_raw: 'pass',
    duration_result: 'Pass', duration_result_raw: 'pass',
    battery_type: 'NiMH', battery_type_raw: 'nimh',
    wattage: 8, notes: '', install_date: '01/01/2024', photo_url: '',
    ...overrides,
  };
}

function makeDefect(overrides: Record<string, unknown> = {}) {
  return {
    number: 1, description: 'Luminaire not illuminating on test',
    priority: 'High', priority_raw: 'high',
    luminaire_id: 'lum-5', luminaire_location: 'Stairwell B',
    rectified: false, rectified_display: 'No', rectification_date: '', photo_url: '',
    ...overrides,
  };
}

function makeLuxReading(overrides: Record<string, unknown> = {}) {
  return {
    number: 1, location: 'Corridor', category: 'Escape Route',
    category_display: 'Escape Route', reading: '1.5',
    min_required: '1.0', result: 'Pass', result_raw: 'pass',
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when nested object is wrong type', () => {
  const payload = { ...makeMinimalPayload(), system: 'not an object' };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = emergencyLightingPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.metadata.certificate_number, '');
    assertEquals(result.data.luminaires.length, 0);
    assertEquals(result.data.defects.length, 0);
    assertEquals(result.data.no_defects, true);
  }
});

Deno.test('Luminaire array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    luminaires: [makeLuminaire(), makeLuminaire({ number: 2, location: 'Stairwell' })],
  };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.luminaires.length, 2);
    assertEquals(result.data.luminaires[0].make, 'Mackwell');
  }
});

Deno.test('Lux readings array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    lux_readings: [makeLuxReading(), makeLuxReading({ number: 2, location: 'Lobby', reading: '2.5' })],
    has_lux_readings: true,
  };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.lux_readings.length, 2);
    assertEquals(result.data.lux_readings[1].reading, '2.5');
  }
});

Deno.test('Defect array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    defects: [makeDefect()],
    has_defects: true,
    no_defects: false,
    defect_count: 1,
  };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.defects.length, 1);
    assertEquals(result.data.defects[0].luminaire_location, 'Stairwell B');
  }
});

Deno.test('Photo category arrays validate', () => {
  const photo = { number: 1, url: 'https://example.com/photo.jpg', caption: 'Test photo', linked_item: 'lum-1' };
  const payload = {
    ...makeMinimalPayload(),
    installation_photos: [photo],
    luminaire_photos: [photo],
    has_installation_photos: true,
    has_luminaire_photos: true,
  };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.installation_photos.length, 1);
    assertEquals(result.data.luminaire_photos.length, 1);
  }
});

Deno.test('Rated duration accepts both number and string', () => {
  const payloadNum = { ...makeMinimalPayload() };
  payloadNum.system.rated_duration = 180;
  const resultNum = emergencyLightingPayloadSchema.safeParse(payloadNum);
  assertEquals(resultNum.success, true);

  const payloadStr = { ...makeMinimalPayload() };
  (payloadStr.system as any).rated_duration = '180';
  const resultStr = emergencyLightingPayloadSchema.safeParse(payloadStr);
  assertEquals(resultStr.success, true);
});

Deno.test('Flat copies match nested values', () => {
  const payload = makeMinimalPayload();
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.client_name, result.data.client.name);
    assertEquals(result.data.tester_name, result.data.tester.name);
    assertEquals(result.data.company_name, result.data.company.name);
  }
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = { ...makeMinimalPayload(), custom_field: 'test' };
  const result = emergencyLightingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).custom_field, 'test');
  }
});

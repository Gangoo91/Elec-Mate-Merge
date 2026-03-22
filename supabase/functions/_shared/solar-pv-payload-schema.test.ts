/**
 * solar-pv-payload-schema.test.ts
 * Deno tests for the Solar PV Installation Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/solar-pv-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { solarPVPayloadSchema } from './solar-pv-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    certificate_number: 'SPV-001',
    certificate_type: 'installation',
    certificate_type_display: 'Installation Certificate',
    work_type: 'new-installation',
    work_type_display: 'New Installation',
    installation_date: '22/03/2026',
    commissioning_date: '22/03/2026',
    design_reference: '',
    previous_installation_ref: '',
    status: 'complete',
    client_name: 'Test Client',
    client_address: '123 Test St',
    client_postcode: 'TE1 1ST',
    client_email: 'test@test.com',
    client_phone: '07700900000',
    installation_address: '123 Test St',
    installation_postcode: 'TE1 1ST',
    property_type: 'domestic',
    property_type_display: 'Domestic / Residential',
    ownership_type: 'owner-occupied',
    property_age: '20',
    roof_age: '20',
    site_access_notes: '',
    safe_isolation_verified: true,
    asbestos_check_required: false,
    asbestos_check_completed: false,
    structural_assessment_required: false,
    structural_assessment_completed: false,
    mcs_details: {
      installer_number: 'MCS-12345',
      installation_number: 'INS-001',
      consumer_code: 'RECC',
      consumer_code_display: 'RECC',
    },
    system_type: 'grid-tied',
    system_type_display: 'Grid-Tied',
    total_capacity: '4.20',
    total_panels: 12,
    estimated_annual_yield: '3570',
    estimated_co2_savings: '832',
    yield_calculation_method: 'mcs-estimator',
    yield_calculation_method_display: 'MCS Yield Estimator',
    yield_calculation_notes: '',
    arrays: [],
    has_arrays: false,
    array_count: 0,
    inverters: [],
    has_inverters: false,
    inverter_count: 0,
    battery: {
      installed: false, make: '', model: '', serial_number: '',
      capacity: 0, chemistry: '', chemistry_display: '',
    },
    has_battery: false,
    grid_connection: {
      dno_name: 'UK Power Networks', mpan: '1234567890123',
      application_reference: 'G98-001', application_type: 'G98',
      application_type_display: 'G98 (≤16A per phase)',
      application_date: '01/03/2026', approval_date: '15/03/2026',
      approval_reference: 'APR-001', export_limited: false, export_limit_kw: '',
    },
    metering: {
      meter_type: 'smart', meter_type_display: 'Smart Meter',
      meter_make: 'Landis+Gyr', meter_model: 'E470',
      meter_serial: 'LG-001', ct_ratio: '',
    },
    array_tests: [],
    has_array_tests: false,
    inverter_tests: [],
    has_inverter_tests: false,
    ac_tests: {
      earthing_arrangement: 'TN-C-S', earthing_arrangement_display: 'TN-C-S (PME)',
      ze_value: '0.20', zs_value: '0.65',
      rcd_type: 'Type A', rcd_rating: '30mA', rcd_trip_time: '18ms',
      insulation_resistance: '>200', polarity_result: 'PASS', polarity_class: 'pass',
      bidirectional_device_installed: false, bidirectional_device_type: '',
      bidirectional_device_make: '', bidirectional_device_model: '',
      bidirectional_device_result: 'N/A', bidirectional_device_class: 'na',
    },
    commissioning: {
      system_operational: true, export_verified: true,
      generation_meter_reading: '0.000', customer_briefed: true,
      documentation_provided: true,
    },
    defects: [],
    has_defects: false,
    no_defects: true,
    defect_count: 0,
    handover: {
      user_manual_provided: true, warranty_docs_provided: true,
      mcs_document_provided: true, maintenance_schedule_provided: true,
      emergency_shutdown_explained: true,
    },
    installer_name: 'Installer Bob',
    installer_company: 'Solar Co',
    installer_mcs_number: 'MCS-12345',
    installer_address: '456 Test Ave',
    installer_phone: '07700900001',
    installer_email: 'bob@solarco.com',
    installer_signature: 'data:image/png;base64,...',
    installer_date: '22/03/2026',
    electrician_required: false,
    electrician_name: '',
    electrician_company: '',
    electrician_registration: '',
    electrician_scheme: '',
    electrician_signature: '',
    electrician_date: '',
    has_electrician: false,
    photos: [],
    has_photos: false,
    photo_count: 0,
    overall_satisfactory: true,
    overall_assessment_display: 'SATISFACTORY',
    overall_assessment_class: 'pass',
    additional_notes: '',
    has_additional_notes: false,
    company_name: 'Solar Co',
    company_address: '456 Test Ave',
    company_phone: '07700900001',
    company_email: 'info@solarco.com',
    company_website: '',
    company_logo: '',
    company_accent_color: '#f59e0b',
    registration_scheme_logo: '',
    registration_scheme: '',
  };
}

function makeArray(overrides: Record<string, unknown> = {}) {
  return {
    array_number: 1, panel_make: 'JA Solar', panel_model: 'JAM60S20-350',
    panel_wattage: 350, panel_count: 12, array_capacity: '4.20',
    mcs_certified: true, orientation: 'South', tilt_angle: 35,
    shading_factor: 0.95, shading_percentage: '5',
    string_voc: '42.8V', string_isc: '9.5A',
    mounting_type: 'roof-mounted', mounting_type_display: 'Roof Mounted (On-Roof)',
    ...overrides,
  };
}

function makeInverter(overrides: Record<string, unknown> = {}) {
  return {
    inverter_number: 1, make: 'SolarEdge', model: 'SE4000H',
    serial_number: 'SE-001', rated_power: 4000, mcs_certified: true,
    type: 'string', type_display: 'String Inverter',
    mppt_count: 2, phases: 'single', phases_display: 'Single Phase',
    location: 'Garage',
    ...overrides,
  };
}

function makeArrayTest(overrides: Record<string, unknown> = {}) {
  return {
    array_number: 1, array_name: 'JA Solar JAM60S20-350',
    voc_measured: '42.5V', isc_measured: '9.3A', insulation_resistance: '>200MΩ',
    polarity_result: 'PASS', polarity_class: 'pass',
    continuity_result: 'PASS', continuity_class: 'pass',
    ...overrides,
  };
}

function makeDefect(overrides: Record<string, unknown> = {}) {
  return {
    number: 1, description: 'Minor cable routing improvement needed',
    severity: 'Recommendation', severity_class: 'recommendation',
    rectified: false, rectification_date: '',
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when nested object is wrong type', () => {
  const payload = { ...makeMinimalPayload(), mcs_details: 'not an object' };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = solarPVPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.certificate_number, '');
    assertEquals(result.data.arrays.length, 0);
    assertEquals(result.data.inverters.length, 0);
    assertEquals(result.data.defects.length, 0);
    assertEquals(result.data.no_defects, true);
    assertEquals(result.data.has_battery, false);
  }
});

Deno.test('PV array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    arrays: [makeArray(), makeArray({ array_number: 2, orientation: 'West', tilt_angle: 30 })],
    has_arrays: true,
    array_count: 2,
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.arrays.length, 2);
    assertEquals(result.data.arrays[0].panel_make, 'JA Solar');
    assertEquals(result.data.arrays[1].orientation, 'West');
  }
});

Deno.test('Inverter array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    inverters: [makeInverter()],
    has_inverters: true,
    inverter_count: 1,
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.inverters.length, 1);
    assertEquals(result.data.inverters[0].make, 'SolarEdge');
  }
});

Deno.test('Array test results validate', () => {
  const payload = {
    ...makeMinimalPayload(),
    array_tests: [makeArrayTest()],
    has_array_tests: true,
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.array_tests.length, 1);
    assertEquals(result.data.array_tests[0].polarity_result, 'PASS');
  }
});

Deno.test('Defect array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    defects: [makeDefect(), makeDefect({ number: 2, severity: 'Critical', severity_class: 'critical' })],
    has_defects: true,
    no_defects: false,
    defect_count: 2,
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.defects.length, 2);
  }
});

Deno.test('Battery storage with hybrid system validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    battery: {
      installed: true, make: 'Tesla', model: 'Powerwall 2',
      serial_number: 'TES-001', capacity: 13.5,
      chemistry: 'lithium-ion', chemistry_display: 'Lithium-Ion',
    },
    has_battery: true,
    system_type: 'hybrid',
    system_type_display: 'Hybrid (Grid + Battery)',
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.battery.installed, true);
    assertEquals(result.data.battery.capacity, 13.5);
    assertEquals(result.data.has_battery, true);
  }
});

Deno.test('AC tests with bidirectional device validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    ac_tests: {
      ...makeMinimalPayload().ac_tests,
      bidirectional_device_installed: true,
      bidirectional_device_type: 'Type B RCD',
      bidirectional_device_make: 'Hager',
      bidirectional_device_model: 'CDB240D',
      bidirectional_device_result: 'PASS',
      bidirectional_device_class: 'pass',
    },
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.ac_tests.bidirectional_device_installed, true);
    assertEquals(result.data.ac_tests.bidirectional_device_make, 'Hager');
  }
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = { ...makeMinimalPayload(), custom_field: 'test' };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).custom_field, 'test');
  }
});

Deno.test('Electrician declaration optional fields validate', () => {
  const payload = {
    ...makeMinimalPayload(),
    electrician_required: true,
    electrician_name: 'Sparky Dave',
    electrician_company: 'Wiring Co',
    electrician_registration: 'NAPIT-001',
    electrician_scheme: 'NAPIT',
    has_electrician: true,
  };
  const result = solarPVPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.electrician_required, true);
    assertEquals(result.data.electrician_name, 'Sparky Dave');
  }
});

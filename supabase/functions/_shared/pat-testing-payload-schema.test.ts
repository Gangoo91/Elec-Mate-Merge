/**
 * pat-testing-payload-schema.test.ts
 * Deno tests for the PAT Testing Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/pat-testing-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { patTestingPayloadSchema } from './pat-testing-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    metadata: {
      certificate_number: 'PAT-001',
      test_date: '22/03/2026',
      report_reference: 'REF-001',
      standard: 'IET Code of Practice (5th Edition)',
    },
    client_details: {
      client_name: 'Test Client', client_address: '123 Test St',
      client_phone: '07700900000', client_email: 'test@test.com', contact_person: 'John',
    },
    site_details: {
      site_name: 'Test Office', site_address: '123 Test St',
      site_contact_name: 'Jane', site_contact_phone: '07700900001',
    },
    test_equipment: {
      make: 'Megger', model: 'PAT420', serial_number: 'MEG-001',
      last_calibration: '01/01/2026', next_calibration: '01/01/2027',
    },
    summary: { total_tested: 10, total_passed: 9, total_failed: 1, pass_rate: 90 },
    declarations: {
      tester: {
        name: 'Tester Bob', company: 'Test Co', qualifications: 'C&G 2377',
        signature: 'data:image/png;base64,...', date: '22/03/2026',
      },
    },
    appliances: [],
    failed_appliances: [],
    recommendations: 'Replace damaged kettle flex',
    retest_interval: '12',
    next_test_due: '22/03/2027',
    additional_notes: '',
    has_photos: false,
    appliance_photos: [],
    company_logo: '',
    company_name: 'Test Co',
    company_address: '456 Test Ave',
    company_phone: '07700900001',
    company_email: 'info@testco.com',
    company_tagline: 'Safe Testing',
    company_accent_color: '#22c55e',
    company_website: '',
    registration_scheme: 'NAPIT',
    registration_number: 'NAP-001',
    registration_scheme_logo: '',
  };
}

function makeAppliance(overrides: Record<string, unknown> = {}) {
  return {
    asset_number: 'A001',
    description: 'Kettle',
    make: 'Russell Hobbs',
    model: 'Classic',
    serial_number: 'RH-001',
    location: 'Kitchen',
    appliance_class: 'I',
    category: 'portable',
    visual: { flex: 'P', plug: 'P', fuse: '13A', case: 'P', switch: 'P', env: 'P' },
    electrical: {
      earth: '0.05', earth_result: 'P', insulation: '>200', insulation_result: 'P',
      load: '', load_result: '', leakage: '', leakage_result: '',
      polarity: 'P', functional: 'P',
    },
    visual_notes: '',
    overall_result: 'pass',
    repair_code: '',
    next_test_due: '22/03/2027',
    notes: '',
    test_date: '22/03/2026',
    tested_by: 'Tester Bob',
    has_photos: false,
    photo_count: 0,
    first_photo: '',
    ...overrides,
  };
}

function makeFailedAppliance(overrides: Record<string, unknown> = {}) {
  return {
    asset_number: 'A005',
    description: 'Old Heater',
    make: 'Generic',
    model: 'Fan Heater',
    serial_number: 'GEN-005',
    location: 'Store Room',
    repair_code: 'SCRAP',
    repair_code_label: 'Scrapped — beyond repair',
    failure_reasons: 'Earth continuity failed (>1.0 Ω), Enclosure damaged',
    notes: 'Case cracked, exposed live parts',
    visual_notes: 'Case damaged',
    photos: [],
    has_photos: false,
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when nested object is wrong type', () => {
  const payload = { ...makeMinimalPayload(), metadata: 'not an object' };
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = patTestingPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.metadata.certificate_number, '');
    assertEquals(result.data.appliances.length, 0);
    assertEquals(result.data.failed_appliances.length, 0);
    assertEquals(result.data.has_photos, false);
  }
});

Deno.test('Appliance array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    appliances: [makeAppliance(), makeAppliance({ asset_number: 'A002', description: 'Toaster' })],
  };
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.appliances.length, 2);
    assertEquals(result.data.appliances[0].asset_number, 'A001');
    assertEquals(result.data.appliances[0].visual.flex, 'P');
    assertEquals(result.data.appliances[0].electrical.earth_result, 'P');
  }
});

Deno.test('Failed appliance array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    failed_appliances: [makeFailedAppliance()],
  };
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.failed_appliances.length, 1);
    assertEquals(result.data.failed_appliances[0].repair_code, 'SCRAP');
  }
});

Deno.test('Appliance photos array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    has_photos: true,
    appliance_photos: [
      { asset_number: 'A001', description: 'Kettle', result: 'pass', photos: ['https://example.com/photo1.jpg'] },
    ],
  };
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.appliance_photos.length, 1);
    assertEquals(result.data.appliance_photos[0].photos.length, 1);
  }
});

Deno.test('Retest interval accepts both string and number', () => {
  const payloadStr = { ...makeMinimalPayload(), retest_interval: '24' };
  const resultStr = patTestingPayloadSchema.safeParse(payloadStr);
  assertEquals(resultStr.success, true);

  const payloadNum = { ...makeMinimalPayload(), retest_interval: 12 };
  const resultNum = patTestingPayloadSchema.safeParse(payloadNum);
  assertEquals(resultNum.success, true);
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = { ...makeMinimalPayload(), custom_field: 'test' };
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).custom_field, 'test');
  }
});

Deno.test('Summary statistics validate', () => {
  const payload = makeMinimalPayload();
  const result = patTestingPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.summary.total_tested, 10);
    assertEquals(result.data.summary.pass_rate, 90);
  }
});

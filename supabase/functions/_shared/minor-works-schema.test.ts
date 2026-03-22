/**
 * minor-works-schema.test.ts
 * Deno tests for the Minor Works Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/minor-works-schema.test.ts --allow-net
 */

import { assertEquals, assertExists, assertThrows } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { minorWorksSchema, validateMinorWorksPayload } from './minor-works-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    certificate_number: 'MW-001',
    generated_at: '2026-03-22T12:00:00Z',
    bs7671_amendment_date: 'A3:2024',
    work_date: '22/03/2026',
    date_of_completion: '22/03/2026',
    next_inspection_due: '22/03/2036',
    contractor: { name: 'Contractor Co', address: '123 Contractor St' },
    supply: { voltage: '230', frequency: '50', phases: '1' },
    company: {
      name: 'Test Co', logo_url: '', phone: '07700900001', email: 'info@testco.com',
      address: '456 Test Ave', registration_no: 'REG-001', tagline: 'Quality Work',
      accent_color: '#d69e2e', website: '', scheme_logo: '',
    },
    client: { name: 'John Smith', phone: '07700900000', email: 'john@test.com' },
    person_ordering_work: 'John Smith',
    installation: { address: '123 Test St', postcode: 'TE1 1ST' },
    work_type: 'Addition',
    work_location: 'Kitchen',
    work_description: 'Install new socket outlet',
    departures: 'None',
    permitted_exceptions: 'None',
    risk_assessment_attached: false,
    existing_installation_comments: 'Installation in satisfactory condition',
    earthing: {
      type: 'TN-C-S', zdb: '0.15', conductor_present: true,
      conductor_size: '10', conductor_material: 'Copper',
    },
    bonding: {
      size: '10', water: true, water_size: '10mm²',
      gas: true, gas_size: '10mm²', oil: false, oil_size: '',
      structural: false, structural_size: '', other: false, other_specify: '',
    },
    circuit: {
      db_ref: 'Main CU', db_location_type: 'Under stairs', number: '12',
      description: 'Socket outlet', type: 'Radial', reference_method: 'C',
      number_of_conductors: '3', live_size: '2.5', cpc_size: '1.5',
      cable_type: 'T&E', installation_method: 'Clipped direct',
      ocpd: { bs_en: 'BS EN 60898', type: 'MCB', rating: '20', breaking_capacity: '6kA' },
      protection: { rcd: true, rcbo: false, afdd: false, spd: false },
      rcd: { bs_en: 'BS EN 61008', type: 'Type A', rating: '40', idn: '30' },
      afdd: { bs_en: '', rating: '' },
      spd: { bs_en: '', type: '' },
    },
    tests: {
      r1_r2: '0.45', r2: '0.72', ring_ll: 'N/A', ring_nn: 'N/A', ring_cpc: 'N/A',
      ring_r1_end: 'N/A', ring_rn_end: 'N/A', ring_r2_end: 'N/A',
      ring_r1_cross: 'N/A', ring_rn_cross: 'N/A', ring_r2_cross: 'N/A', ring_final: 'N/A',
      insulation_voltage: '500', ir_live_live: 'N/A', ir_live_neutral: '>200',
      ir_live_earth: '>200', ir_neutral_earth: '>200',
      polarity: 'Correct', zs: '0.85', max_zs: '1.37', pfc: '4.5',
      rcd_time: '18', rcd_5x_time: '12', rcd_half_x: 'N/A', rcd_test_button: 'Y',
      rcd_rating: '30', functional_test: 'Satisfactory',
      afdd_test_button: 'N/A', afdd_trip_time: 'N/A', rcbo_trip_time: 'N/A',
      earth_electrode: 'N/A', phase_rotation: 'N/A',
      spd_visual: 'N/A', spd_indicator: 'N/A', spd_test_button: 'N/A', temperature: '20',
    },
    test_equipment: { model: 'Megger MFT1895', serial: 'SN123', calibration_date: '01/01/2026', custom: '' },
    declaration: {
      name: 'Sparky Dave', company: 'Test Co', address: '456 Test Ave',
      phone: '07700900001', email: 'dave@testco.com', position: 'Qualified Supervisor',
      date: '22/03/2026', qualification: 'C&G 2391', scheme_provider: 'NAPIT',
      registration_number: 'NAP-001', signature: 'data:image/png;base64,...',
      iet_declaration: true, bs7671_compliance: true, test_results_accurate: true,
      work_safety: true, part_p_notification: true, copy_provided: true,
      additional_notes: '',
    },
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when nested object is wrong type', () => {
  const payload = { ...makeMinimalPayload(), earthing: 'not an object' };
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = minorWorksSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.certificate_number, '');
    assertEquals(result.data.bs7671_amendment_date, 'A3:2024');
    assertEquals(result.data.earthing.conductor_material, 'Copper');
    assertEquals(result.data.supply.voltage, '230');
    assertEquals(result.data.tests.insulation_voltage, '500');
  }
});

Deno.test('Circuit details with protection flags validate', () => {
  const payload = makeMinimalPayload();
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.circuit.protection.rcd, true);
    assertEquals(result.data.circuit.protection.rcbo, false);
    assertEquals(result.data.circuit.rcd.idn, '30');
    assertEquals(result.data.circuit.ocpd.type, 'MCB');
  }
});

Deno.test('Test results with all fields validate', () => {
  const payload = makeMinimalPayload();
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.tests.r1_r2, '0.45');
    assertEquals(result.data.tests.zs, '0.85');
    assertEquals(result.data.tests.rcd_time, '18');
    assertEquals(result.data.tests.rcd_test_button, 'Y');
    assertEquals(result.data.tests.functional_test, 'Satisfactory');
  }
});

Deno.test('Declaration checkboxes validate', () => {
  const payload = makeMinimalPayload();
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.declaration.bs7671_compliance, true);
    assertEquals(result.data.declaration.part_p_notification, true);
    assertEquals(result.data.declaration.copy_provided, true);
  }
});

Deno.test('validateMinorWorksPayload returns parsed data on valid input', () => {
  const payload = makeMinimalPayload();
  const result = validateMinorWorksPayload(payload);
  assertEquals(result.certificate_number, 'MW-001');
  assertEquals(result.client.name, 'John Smith');
});

Deno.test('validateMinorWorksPayload throws on invalid input', () => {
  assertThrows(
    () => validateMinorWorksPayload({ earthing: 'invalid' }),
    Error,
  );
});

Deno.test('SPD test button accepts both string and boolean', () => {
  const payloadStr = makeMinimalPayload();
  payloadStr.tests.spd_test_button = 'Y' as any;
  const resultStr = minorWorksSchema.safeParse(payloadStr);
  assertEquals(resultStr.success, true);

  const payloadBool = makeMinimalPayload();
  (payloadBool.tests as any).spd_test_button = true;
  const resultBool = minorWorksSchema.safeParse(payloadBool);
  assertEquals(resultBool.success, true);
});

Deno.test('Bonding services validate', () => {
  const payload = makeMinimalPayload();
  const result = minorWorksSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.bonding.water, true);
    assertEquals(result.data.bonding.gas, true);
    assertEquals(result.data.bonding.oil, false);
  }
});

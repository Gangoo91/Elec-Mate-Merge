/**
 * eic-payload-schema.test.ts
 * Deno tests for the EIC payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/eic-payload-schema.test.ts --allow-net
 */

import { assertEquals, assertExists } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { eicPayloadSchema, validateEICPayload } from './eic-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    insp_1: 'Acceptable',
    insp_2: 'Acceptable',
    insp_3: '',
    metadata: { certificate_number: 'EIC-001' },
    client_details: { client_name: 'Jane Doe', client_address: '456 High St', client_phone: '07700900001', client_email: 'jane@test.com' },
    installation_details: { address: '456 High St', same_as_client_address: true, installation_type: 'New', work_type: 'New', description: 'New installation', extent_of_installation: 'Full', installation_date: '2026-03-22', test_date: '2026-03-22', construction_date: '' },
    standards_compliance: { design_standard: 'BS7671', part_p_compliance: '' },
    supply_characteristics: { supply_voltage: '230', supply_frequency: '50', phases: '1-phase-2-wire', earthing_arrangement: 'TN-S', supply_type: '', supply_pme: '', live_conductor_type: 'ac-1ph-2w', dc_supply_type: '', prospective_fault_current: '4.5', external_ze: '0.35', supply_polarity_confirmed: true, other_sources_of_supply: false, other_sources_details: '' },
    supply_protective_device: { bs_en: 'BS 88-3', type: 'Fuse', rated_current: '100' },
    main_protective_device: { device_type: 'MCB', main_switch_rating: '100', main_switch_location: 'Under stairs', breaking_capacity: '6kA', bs_en: 'BS EN 60898', poles: '2', fuse_setting: 'N/A', voltage_rating: '230V' },
    rcd_details: { rcd_main_switch: '', rcd_rating: 'N/A', rcd_type: 'N/A', rcd_operating_time: 'N/A', rcd_rated_time_delay: 'N/A', rcd_measured_operating_time: 'N/A' },
    distribution_board: { board_size: '', board_type: '', board_location: '' },
    distribution_boards: [],
    cables: { intake_cable_size: '25', intake_cable_type: 'T&E', tails_size: '25', tails_length: '3m' },
    earthing_bonding: { means_of_earthing: 'DNO', earth_electrode_type: '', earth_electrode_location: '', earth_electrode_resistance: '', earth_electrode_na: true, earthing_conductor_material: 'Copper', earthing_conductor_csa: '10', earthing_conductor_verified: true, earthing_conductor_na: false, main_bonding_conductor: '', main_bonding_material: 'Copper', main_bonding_size: '10', main_bonding_size_custom: '', main_bonding_verified: true, main_bonding_na: false, maximum_demand: '100', maximum_demand_unit: 'A', bonding_water: true, bonding_gas: true, bonding_oil: false, bonding_structural_steel: false, bonding_lightning_protection: false, bonding_other: false, bonding_other_specify: '', bonding_compliance: '', supplementary_bonding: '', supplementary_bonding_size: '', supplementary_bonding_size_custom: '', equipotential_bonding: '' },
    inspection_checklist: [],
    schedule_of_tests: [],
    test_instrument_details: { make_model: 'MFT1895', serial_number: 'SN456', calibration_date: '2026-01-01', test_temperature: '20' },
    test_information: { test_method: '', test_voltage: '', test_notes: '' },
    distribution_board_verification: { db_reference: 'DB1', zdb: '0.15', ipf: '4.5', confirmed_correct_polarity: true, confirmed_phase_sequence: false, spd_operational_status: false, spd_na: true },
    designer: { name: 'Designer Dan', qualifications: 'C&G 2382', company: 'Test Co', address: '456 High St', postcode: 'AB1 2CD', phone: '07700900002', date: '2026-03-22', signature: '', bs7671_amendment_date: 'A3:2024', departures: '', permitted_exceptions: '', risk_assessment_attached: false },
    designer_2: { name: '', company: '', address: '', postcode: '', phone: '', date: '', signature: '' },
    constructor: { name: 'Constructor Carl', qualifications: 'C&G 2357', company: 'Test Co', address: '456 High St', postcode: 'AB1 2CD', phone: '07700900003', date: '2026-03-22', signature: '', bs7671_amendment_date: 'A3:2024', departures: '', same_as_designer: false },
    inspector: { name: 'Inspector Bob', qualifications: 'C&G 2391', company: 'Test Co', address: '456 High St', postcode: 'AB1 2CD', phone: '07700900004', date: '2026-03-22', signature: '', bs7671_amendment_date: 'A3:2024', departures: '', same_as_constructor: false },
    next_inspection: { interval_months: '120', recommended_date: '2036-03-22' },
    existing_installation_comments: '',
    declarations: { additional_notes: '', inspected_by: { name: 'Inspector Bob', signature: '', for_on_behalf_of: 'Test Co', position: 'QS', address: '456 High St', cp_scheme: '', cp_scheme_na: false, same_as_inspector: true }, report_authorised_by: { name: '', date: '', signature: '', for_on_behalf_of: '', position: '', address: '', postcode: '', phone: '', membership_no: '' }, bs7671_compliance: true, building_regs_compliance: false, competent_person_scheme: false },
    observations: [],
    company_details: { company_name: 'Test Co', company_address: '456 High St', company_postcode: 'AB1 2CD', company_phone: '07700900000', company_email: 'test@test.com', company_website: '', company_logo: '', registration_scheme: '', registration_number: '' },
    company_logo: '',
    registration_scheme_logo: '',
    company_accent_color: '',
  };
}

function makeCircuit(overrides: Record<string, unknown> = {}) {
  return {
    id: 'c1',
    circuit_number: '1',
    circuit_description: 'Ring Final - Sockets',
    circuit_type: 'Ring',
    type_of_wiring: 'T&E',
    reference_method: 'C',
    live_size: '2.5',
    cpc_size: '1.5',
    protective_device_type: 'MCB',
    protective_device_curve: 'B',
    protective_device_rating: '32',
    protective_device_ka_rating: '6',
    protective_device_location: 'DB1',
    bs_standard: 'BS EN 60898',
    r1r2: '0.55',
    r2: '0.72',
    ring_continuity_live: 'N/A',
    ring_continuity_neutral: 'N/A',
    ring_r1: '0.45',
    ring_rn: '0.46',
    ring_r2: '0.72',
    insulation_test_voltage: '500',
    insulation_resistance: '>200',
    insulation_live_neutral: '>200',
    insulation_live_earth: '>200',
    insulation_neutral_earth: '>200',
    polarity: 'Y',
    zs: '0.85',
    max_zs: '1.37',
    points_served: '10',
    rcd_rating: 'N/A',
    rcd_bs_standard: 'N/A',
    rcd_type: 'N/A',
    rcd_rating_a: 'N/A',
    rcd_one_x: 'N/A',
    rcd_half_x: 'N/A',
    rcd_five_x: 'N/A',
    rcd_test_button: 'N/A',
    afdd_test: 'N/A',
    pfc: '4.5',
    pfc_live_neutral: 'N/A',
    pfc_live_earth: 'N/A',
    functional_testing: 'Y',
    notes: '',
    phase_type: 'N/A',
    phase_rotation: 'N/A',
    phase_balance_l1: 'N/A',
    phase_balance_l2: 'N/A',
    phase_balance_l3: 'N/A',
    line_to_line_voltage: 'N/A',
    db_reference: 'DB1',
    source_circuit_id: null,
    auto_filled: false,
    ...overrides,
  };
}

function makeBoard(overrides: Record<string, unknown> = {}) {
  return {
    db_reference: 'DB1',
    location: 'Under stairs',
    board_type: 'Consumer unit',
    board_make: 'Hager',
    board_model: 'VML',
    total_ways: '12',
    used_ways: '10',
    spare_ways: '2',
    zdb: '0.15',
    ipf: '4.5',
    main_switch_bs_en: 'BS EN 60947',
    main_switch_type: 'Isolator',
    main_switch_rating: '100',
    main_switch_poles: '2',
    rcd_type: '',
    rcd_rating: '',
    rcd_measured_time: '',
    spd_fitted: false,
    spd_operational: false,
    spd_na: true,
    polarity_confirmed: true,
    phase_sequence_confirmed: false,
    supply_from: 'Main',
    supply_cable_size: '',
    supply_cable_type: '',
    ...overrides,
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when client_details is wrong type', () => {
  const payload = { ...makeMinimalPayload(), client_details: 'not an object' };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = eicPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.metadata.certificate_number, '');
    assertEquals(result.data.client_details.client_name, '');
    assertEquals(result.data.inspection_checklist.length, 0);
    assertEquals(result.data.schedule_of_tests.length, 0);
    assertEquals(result.data.observations.length, 0);
    assertEquals(result.data.distribution_boards.length, 0);
  }
});

Deno.test('All 14 flat inspection keys accepted', () => {
  const flatKeys: Record<string, string> = {};
  for (let i = 1; i <= 14; i++) {
    flatKeys[`insp_${i}`] = 'Acceptable';
  }
  const payload = { ...makeMinimalPayload(), ...flatKeys };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.insp_1, 'Acceptable');
    assertEquals(result.data.insp_14, 'Acceptable');
  }
});

Deno.test('Circuit array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    schedule_of_tests: [makeCircuit(), makeCircuit({ id: 'c2', circuit_number: '2' })],
  };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.schedule_of_tests.length, 2);
  }
});

Deno.test('Distribution boards array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    distribution_boards: [makeBoard(), makeBoard({ db_reference: 'DB2', location: 'Garage' })],
  };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.distribution_boards.length, 2);
    assertEquals(result.data.distribution_boards[0].db_reference, 'DB1');
    assertEquals(result.data.distribution_boards[1].db_reference, 'DB2');
  }
});

Deno.test('Observation array validates with photo_evidence', () => {
  const payload = {
    ...makeMinimalPayload(),
    observations: [
      { id: 'obs-1', description: 'Missing bond', defect_code: 'C2', recommendation: 'Install bond', item: '4.1', rectified: false, photo_evidence: ['https://example.com/p1.jpg'], photo_count: 1 },
      { id: 'obs-2', description: 'Label missing', defect_code: 'C3', recommendation: 'Add label', item: '3.2', rectified: true, photo_evidence: [], photo_count: 0 },
    ],
  };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.observations.length, 2);
    assertEquals(result.data.observations[0].photo_evidence.length, 1);
  }
});

Deno.test('Empty arrays accepted for all array fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    inspection_checklist: [],
    schedule_of_tests: [],
    distribution_boards: [],
    observations: [],
  };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
});

Deno.test('validateEICPayload returns success/error without throwing', () => {
  const good = validateEICPayload(makeMinimalPayload());
  assertEquals(good.success, true);

  const bad = validateEICPayload({ client_details: 123 });
  assertEquals(bad.success, false);
  assertExists(bad.error);
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = { ...makeMinimalPayload(), my_custom_field: 'hello' };
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).my_custom_field, 'hello');
  }
});

Deno.test('Designer and constructor have EIC-specific fields', () => {
  const payload = makeMinimalPayload();
  const result = eicPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertExists(result.data.designer.bs7671_amendment_date);
    assertExists(result.data.designer.risk_assessment_attached);
    assertExists((result.data.constructor as any).bs7671_amendment_date);
    assertExists((result.data.constructor as any).same_as_designer);
    assertExists(result.data.inspector.same_as_constructor);
  }
});

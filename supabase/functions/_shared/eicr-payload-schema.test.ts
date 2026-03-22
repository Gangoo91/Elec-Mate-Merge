/**
 * eicr-payload-schema.test.ts
 * Deno tests for the EICR payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/eicr-payload-schema.test.ts --allow-net
 */

import { assertEquals, assertExists } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import {
  eicrPayloadSchema,
  validateEICRPayload,
  INSPECTION_ITEM_NUMBERS,
  INSPECTION_COLUMNS,
} from './eicr-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    metadata: { certificate_number: 'EICR-001', form_version: '1.0', export_timestamp: '2026-03-22T00:00:00Z' },
    client_details: { client_name: 'John Smith', client_address: '123 Main St', client_phone: '07700900000', client_email: 'john@test.com' },
    installation_details: { address: '123 Main St', same_as_client_address: true, occupier: '', installation_type: 'Domestic', description: 'House', premises_type: 'House', other_premises_description: '', installation_date: '', test_date: '2026-03-22', construction_date: '', estimated_age: '10', age_unit: 'years', last_inspection_type: '', date_of_last_inspection: '', evidence_of_alterations: '', alterations_details: '', alterations_age: '', installation_records_available: '', purpose_of_inspection: 'Periodic', other_purpose: '', agreed_with: '', extent_of_inspection: '', limitations_of_inspection: '', operational_limitations: '', bs_amendment: '', next_inspection_date: '', inspection_interval: '', interval_reasons: '' },
    standards_compliance: { design_standard: 'BS7671', part_p_compliance: '' },
    supply_characteristics: { supply_voltage: '230', supply_frequency: '50', supply_ac_dc: 'ac', conductor_configuration: '', phases: '1', earthing_arrangement: 'TN-S', supply_type: '', supply_pme: '', dno_name: '', mpan: '', cutout_location: '', service_entry: '', external_ze: '', prospective_fault_current: '', supply_polarity_confirmed: true, other_sources_of_supply: '' },
    main_protective_device: { bs_en: '', device_type: '', main_switch_rating: '100', main_switch_location: '', main_switch_poles: '', main_switch_voltage_rating: '', fuse_device_rating: '', breaking_capacity: '' },
    rcd_details: { rcd_main_switch: '', rcd_rating: '', rcd_type: '', rcd_time_delay: '', rcd_measured_time: '' },
    distribution_board: { board_designation: 'Main DB', board_size: '', board_type: '', board_location: '', board_manufacturer: '', board_ways: '' },
    cables: { intake_cable_size: '', intake_cable_type: '', tails_size: '', tails_length: '' },
    earthing_bonding: { means_of_earthing_distributor: true, means_of_earthing_electrode: false, earth_electrode_type: '', earth_electrode_location: '', earth_electrode_resistance: '', main_earthing_conductor_type: 'Copper', main_earthing_conductor_size: '10', main_earthing_conductor: '10mm² Copper', main_bonding_conductor_type: 'Copper', main_bonding_conductor: '10mm² Copper', main_bonding_size: '10', main_bonding_size_custom: '', main_bonding_locations: 'Water, Gas', bonding_water: true, bonding_gas: true, bonding_oil: false, bonding_structural_steel: false, bonding_lightning_protection: false, bonding_other: false, bonding_other_specify: '', bonding_compliance: '', earthing_conductor_continuity_verified: true, bonding_conductor_continuity_verified: true, supplementary_bonding: '', supplementary_bonding_size: '', supplementary_bonding_size_custom: '', equipotential_bonding: '' },
    test_instrument_details: { make_model: 'MFT1895', serial_number: 'SN123', calibration_date: '2026-01-01', test_temperature: '20' },
    test_information: { test_method: '', test_voltage: '', test_notes: '' },
    distribution_board_verification: { db_reference: 'Main DB', zdb: '0.15', ipf: '4.5', confirmed_correct_polarity: true, confirmed_phase_sequence: false, spd_operational_status: false, spd_na: true },
    designer: { name: '', qualifications: '', company: '', address: '', postcode: '', phone: '', date: '', signature: '', departures: '', permitted_exceptions: '' },
    constructor: { name: '', qualifications: '', company: '', date: '', signature: '' },
    inspector: { name: 'Inspector Bob', qualifications: 'C&G 2391', company: 'Test Co', date: '2026-03-22', signature: 'data:image/png;base64,...' },
    declarations: { same_as_designer: false, same_as_constructor: false, additional_notes: '', inspected_by: { name: 'Inspector Bob', signature: '', for_on_behalf_of: 'Test Co', position: 'Qualified Supervisor', address: '123 Main St', cp_scheme: '', cp_scheme_na: false }, report_authorised_by: { name: '', date: '', signature: '', for_on_behalf_of: '', position: '', address: '', membership_no: '' }, bs7671_compliance: true, building_regs_compliance: false, competent_person_scheme: false, overall_assessment: 'satisfactory', satisfactory_for_continued_use: 'yes' },
    company_details: { company_name: 'Test Co', company_address: '123 Main St', company_phone: '07700900000', company_email: 'test@test.com', company_website: '', company_logo: '', company_tagline: '', company_accent_color: '', company_registration_number: '', vat_number: '', registration_scheme: '', registration_number: '', registration_expiry: '', insurance_provider: '', insurance_policy_number: '', insurance_coverage: '', insurance_expiry: '', registration_scheme_logo: '' },
    inspection_checklist: [],
    inspection_items: [],
    additional_boards: [],
    schedule_of_tests: [],
    boards_with_schedules: [],
    observations: [],
    // A few flat copies
    client_name: 'John Smith',
    clientName: 'John Smith',
    inspector_name: 'Inspector Bob',
    inspectorName: 'Inspector Bob',
    inspection_schedule_count: 1,
    test_schedule_count: 1,
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
    points_served: '10',
    live_size: '2.5',
    cpc_size: '1.5',
    bs_standard: 'BS EN 60898',
    protective_device_type: 'MCB',
    protective_device_curve: 'B',
    protective_device_rating: '32',
    protective_device_ka_rating: '6',
    max_zs: '1.37',
    protective_device_location: 'Main DB',
    rcd_bs_standard: 'N/A',
    rcd_type: 'N/A',
    rcd_rating: 'N/A',
    rcd_rating_a: 'N/A',
    ring_r1: '0.45',
    ring_rn: '0.46',
    ring_r2: '0.72',
    r1r2: '0.55',
    r2: '0.72',
    ring_continuity_live: 'N/A',
    ring_continuity_neutral: 'N/A',
    insulation_test_voltage: '500',
    insulation_live_neutral: '>200',
    insulation_live_earth: '>200',
    insulation_resistance: '>200',
    insulation_neutral_earth: '>200',
    polarity: 'Y',
    zs: '0.85',
    rcd_one_x: 'N/A',
    rcd_test_button: 'N/A',
    afdd_test: 'N/A',
    rcd_half_x: 'N/A',
    rcd_five_x: 'N/A',
    pfc: '4.5',
    pfc_live_neutral: 'N/A',
    pfc_live_earth: 'N/A',
    functional_testing: 'Y',
    notes: '',
    source_circuit_id: 'N/A',
    auto_filled: false,
    phase_type: 'N/A',
    phase_rotation: 'N/A',
    phase_balance_l1: 'N/A',
    phase_balance_l2: 'N/A',
    phase_balance_l3: 'N/A',
    line_to_line_voltage: 'N/A',
    circuit_designation: '1',
    type: 'Ring',
    cable_size: '2.5',
    protective_device: 'MCB',
    ...overrides,
  };
}

function makeBoard(circuitCount = 2) {
  const circuits = Array.from({ length: circuitCount }, (_, i) =>
    makeCircuit({ id: `c${i + 1}`, circuit_number: String(i + 1) })
  );
  return {
    db_reference: 'Main DB',
    db_location: 'Under stairs',
    db_manufacturer: 'Hager',
    db_type: 'Consumer unit',
    db_ways: '12',
    db_zdb: '0.15',
    db_ipf: '4.5',
    zdb: '0.15',
    ipf: '4.5',
    supplied_from: 'DNO cutout',
    incoming_device_bs_en: 'BS EN 60898',
    incoming_device_type: 'MCB',
    incoming_device_rating: '100',
    polarity_confirmed: true,
    phase_sequence_confirmed: false,
    spd_operational: false,
    spd_na: true,
    main_switch_bs_en: 'BS EN 60947',
    main_switch_type: 'Isolator',
    main_switch_rating: '100',
    main_switch_poles: '2',
    circuit_count: circuitCount,
    circuits,
  };
}

function makeObservation(overrides: Record<string, unknown> = {}) {
  return {
    id: 'obs-1',
    item: '4.1',
    defect_code: 'C2',
    description: 'Missing earth bond to gas meter',
    recommendation: 'Install main bonding conductor to gas meter',
    regulation: '411.3.1.2',
    rectified: false,
    photo_evidence: ['https://storage.example.com/photo1.jpg', 'https://storage.example.com/photo2.jpg'],
    photo_count: 2,
    ...overrides,
  };
}

function buildFlatInspectionKeys(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const item of INSPECTION_ITEM_NUMBERS) {
    result[`insp_${item}_acc`] = 'Y';
    result[`insp_${item}_na`] = '';
    result[`insp_${item}_c1c2`] = '';
    result[`insp_${item}_c3`] = '';
    result[`insp_${item}_fi`] = '';
    result[`insp_${item}_nv`] = '';
    result[`insp_${item}_lim`] = '';
  }
  return result;
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Schema parses a complete minimal payload', () => {
  const payload = makeMinimalPayload();
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
});

Deno.test('Schema rejects when client_details is wrong type', () => {
  const payload = { ...makeMinimalPayload(), client_details: 'not an object' };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, false);
});

Deno.test('Schema accepts empty object and fills defaults', () => {
  const result = eicrPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(result.data.metadata.form_version, '1.0');
    assertEquals(result.data.client_details.client_name, '');
    assertEquals(result.data.inspection_checklist.length, 0);
    assertEquals(result.data.schedule_of_tests.length, 0);
    assertEquals(result.data.boards_with_schedules.length, 0);
    assertEquals(result.data.observations.length, 0);
  }
});

Deno.test('All 85 inspection items x 7 columns accepted as flat keys', () => {
  const flatKeys = buildFlatInspectionKeys();
  const payload = { ...makeMinimalPayload(), ...flatKeys };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);

  // Verify count: 85 items * 7 columns = 595 keys
  const inspKeyCount = Object.keys(flatKeys).length;
  assertEquals(inspKeyCount, INSPECTION_ITEM_NUMBERS.length * INSPECTION_COLUMNS.length);
});

Deno.test('Circuit array validates with all fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    schedule_of_tests: [makeCircuit(), makeCircuit({ id: 'c2', circuit_number: '2' })],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.schedule_of_tests.length, 2);
    assertEquals(result.data.schedule_of_tests[0].circuit_number, '1');
  }
});

Deno.test('Board schedule array validates with circuits', () => {
  const payload = {
    ...makeMinimalPayload(),
    boards_with_schedules: [makeBoard(3), makeBoard(2)],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.boards_with_schedules.length, 2);
    assertEquals(result.data.boards_with_schedules[0].circuits.length, 3);
    assertEquals(result.data.boards_with_schedules[1].circuits.length, 2);
    assertEquals(result.data.boards_with_schedules[0].db_reference, 'Main DB');
  }
});

Deno.test('Observation array validates with photo_evidence', () => {
  const payload = {
    ...makeMinimalPayload(),
    observations: [makeObservation(), makeObservation({ id: 'obs-2', defect_code: 'C3', photo_evidence: [], photo_count: 0 })],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.observations.length, 2);
    assertEquals(result.data.observations[0].photo_evidence.length, 2);
    assertEquals(result.data.observations[1].photo_evidence.length, 0);
  }
});

Deno.test('Empty arrays accepted for all array fields', () => {
  const payload = {
    ...makeMinimalPayload(),
    inspection_checklist: [],
    inspection_items: [],
    additional_boards: [],
    schedule_of_tests: [],
    boards_with_schedules: [],
    observations: [],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
});

Deno.test('validateEICRPayload returns success/error without throwing', () => {
  const good = validateEICRPayload(makeMinimalPayload());
  assertEquals(good.success, true);

  const bad = validateEICRPayload({ client_details: 123 });
  assertEquals(bad.success, false);
  assertExists(bad.error);
});

Deno.test('Passthrough allows extra keys without rejection', () => {
  const payload = {
    ...makeMinimalPayload(),
    some_custom_field: 'hello',
    another_extra: 42,
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).some_custom_field, 'hello');
  }
});

Deno.test('Additional boards array validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    additional_boards: [
      {
        designation: 'Sub DB 1',
        location: 'Kitchen',
        manufacturer: 'Schneider',
        board_type: 'Consumer unit',
        ways: '6',
        zdb: '0.25',
        ipf: '3.8',
        polarity_confirmed: true,
        phase_sequence_confirmed: false,
        spd_operational: false,
        spd_na: true,
      },
    ],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.additional_boards.length, 1);
    assertEquals(result.data.additional_boards[0].designation, 'Sub DB 1');
  }
});

Deno.test('Inspection items by section validates', () => {
  const payload = {
    ...makeMinimalPayload(),
    inspection_items: [
      {
        section_name: 'Section 3 - Consumer Unit',
        clause: '411.3',
        items: [
          { id: 'item_3_1', item_number: '3.1', item: 'Consumer unit condition', clause: '411.3.1', outcome: 'satisfactory', notes: '' },
          { id: 'item_3_2', item_number: '3.2', item: 'Correct labelling', clause: '411.3.2', outcome: 'C3', notes: 'Missing labels' },
        ],
      },
    ],
  };
  const result = eicrPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.inspection_items.length, 1);
    assertEquals(result.data.inspection_items[0].items.length, 2);
  }
});

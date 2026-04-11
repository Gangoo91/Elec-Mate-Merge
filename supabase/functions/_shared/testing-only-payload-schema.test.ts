/**
 * testing-only-payload-schema.test.ts
 * Deno tests for the Testing Only Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/testing-only-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { testingOnlyPayloadSchema } from './testing-only-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    referenceNumber: 'TOC-001',
    testDate: '10/04/2026',
    testerName: 'Bob Sparks',
    installationAddress: '123 Test St, London, SW1A 1AA',
  };
}

function makeFullPayload() {
  return {
    // Certificate header
    referenceNumber: 'TOC-042',
    testDate: '10/04/2026',

    // Tester details
    testerName: 'Bob Sparks',
    testerQualifications: 'C&G 2391-52, 18th Edition',

    // MFT instrument
    mftMake: 'Megger',
    mftModel: 'MFT1741',
    mftSerial: 'MEG-2026-001',
    mftCalDate: '15/01/2026',

    // Loop tester
    loopMake: 'Megger',
    loopSerial: 'LOOP-001',

    // RCD tester
    rcdTesterMake: 'Megger',
    rcdTesterSerial: 'RCD-001',

    // Installation
    installationAddress: '456 Circuit Lane, Manchester, M1 2AB',
    installationDescription: 'Domestic rewire — first-fix testing',
    numberOfCircuits: '8',

    // Circuits (full TestResult format, snake_case)
    circuits: [
      {
        id: 'c1',
        circuit_number: '1',
        circuit_description: 'Ring Final — Kitchen',
        type_of_wiring: 'T&E',
        reference_method: 'C',
        points_served: '6',
        live_size: '2.5',
        cpc_size: '1.5',
        bs_standard: 'BS EN 60898',
        protective_device_type: 'MCB',
        protective_device_rating: '32',
        protective_device_ka_rating: '6',
        max_zs: '1.37',
        rcd_type: 'Type A',
        rcd_rating: '30',
        ring_r1: '0.34',
        ring_rn: '0.35',
        ring_r2: '0.68',
        r1r2: '0.34',
        insulation_test_voltage: '500',
        insulation_live_neutral: '>200',
        insulation_live_earth: '>200',
        polarity: 'Y',
        zs: '0.52',
        rcd_one_x: '18',
        rcd_test_button: 'Y',
        afdd_test: '',
        notes: '',
      },
      {
        id: 'c2',
        circuit_number: '2',
        circuit_description: 'Lighting — Ground Floor',
        type_of_wiring: 'T&E',
        live_size: '1.5',
        cpc_size: '1.0',
        protective_device_type: 'MCB',
        protective_device_rating: '6',
        r1r2: '0.77',
        insulation_test_voltage: '500',
        insulation_live_neutral: '>200',
        insulation_live_earth: '>200',
        polarity: 'Y',
        zs: '0.95',
        notes: '',
      },
    ],

    // Signature & notes
    testerSignature: 'data:image/png;base64,iVBOR...',
    testerDate: '10/04/2026',
    notes: 'All circuits tested satisfactorily.',
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Empty object parses with all defaults', () => {
  const result = testingOnlyPayloadSchema.safeParse({});
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.referenceNumber, '');
    assertEquals(result.data.testerName, '');
    assertEquals(result.data.mftMake, '');
    assertEquals(result.data.installationAddress, '');
    assertEquals(result.data.notes, '');
    assertEquals(Array.isArray(result.data.circuits), true);
    assertEquals(result.data.circuits.length, 0);
  }
});

Deno.test('Minimal valid payload parses', () => {
  const payload = makeMinimalPayload();
  const result = testingOnlyPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.referenceNumber, 'TOC-001');
    assertEquals(result.data.testerName, 'Bob Sparks');
    assertEquals(result.data.installationAddress, '123 Test St, London, SW1A 1AA');
    assertEquals(result.data.testerQualifications, '');
    assertEquals(result.data.mftMake, '');
    assertEquals(result.data.loopMake, '');
    assertEquals(result.data.rcdTesterMake, '');
    assertEquals(result.data.testerSignature, '');
    assertEquals(result.data.circuits.length, 0);
  }
});

Deno.test('Full payload with circuits parses', () => {
  const payload = makeFullPayload();
  const result = testingOnlyPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.referenceNumber, 'TOC-042');
    assertEquals(result.data.testerQualifications, 'C&G 2391-52, 18th Edition');
    assertEquals(result.data.mftMake, 'Megger');
    assertEquals(result.data.mftModel, 'MFT1741');
    assertEquals(result.data.numberOfCircuits, '8');
    assertEquals(result.data.circuits.length, 2);
    assertEquals(result.data.circuits[0].circuit_number, '1');
    assertEquals(result.data.circuits[0].circuit_description, 'Ring Final — Kitchen');
    assertEquals(result.data.circuits[0].polarity, 'Y');
    assertEquals(result.data.circuits[0].zs, '0.52');
    assertEquals(result.data.circuits[0].rcd_one_x, '18');
    assertEquals(result.data.circuits[1].circuit_number, '2');
    assertEquals(result.data.circuits[1].protective_device_rating, '6');
    assertEquals(result.data.notes, 'All circuits tested satisfactorily.');
    assertEquals(result.data.testerSignature, 'data:image/png;base64,iVBOR...');
  }
});

Deno.test('Circuit array validates with defaults', () => {
  const payload = {
    circuits: [
      { id: 'c1', circuit_number: '1' },
      { circuit_number: '2', circuit_description: 'Lighting' },
    ],
  };
  const result = testingOnlyPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.circuits.length, 2);
    assertEquals(result.data.circuits[0].id, 'c1');
    assertEquals(result.data.circuits[0].circuit_number, '1');
    assertEquals(result.data.circuits[0].circuit_description, '');
    assertEquals(result.data.circuits[0].zs, '');
    assertEquals(result.data.circuits[0].polarity, '');
    assertEquals(result.data.circuits[1].id, '');
    assertEquals(result.data.circuits[1].circuit_description, 'Lighting');
    assertEquals(result.data.circuits[1].r1r2, '');
  }
});

Deno.test('String fields default to empty string', () => {
  const result = testingOnlyPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    const stringFields = [
      'referenceNumber', 'testDate', 'testerName', 'testerQualifications',
      'mftMake', 'mftModel', 'mftSerial', 'mftCalDate',
      'loopMake', 'loopSerial', 'rcdTesterMake', 'rcdTesterSerial',
      'installationAddress', 'installationDescription', 'numberOfCircuits',
      'testerSignature', 'testerDate', 'notes',
    ] as const;
    for (const field of stringFields) {
      assertEquals(result.data[field], '', `Expected "${field}" to default to empty string`);
    }
  }
});

Deno.test('Extra fields pass through (passthrough)', () => {
  const payload = { ...makeMinimalPayload(), customField: 'test-value', anotherExtra: 42 };
  const result = testingOnlyPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).customField, 'test-value');
    assertEquals((result.data as any).anotherExtra, 42);
  }
});

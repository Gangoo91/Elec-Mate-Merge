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

    // Circuits
    circuits: [
      {
        id: 'c1',
        circuitRef: '1',
        description: 'Ring Final — Kitchen',
        cableType: 'T&E',
        cableSize: '2.5',
        protectionType: 'MCB',
        protectionRating: '32',
        ze: '0.18',
        zs: '0.52',
        r1r2: '0.34',
        r2: '0.68',
        ir: '>200',
        polarity: 'Correct',
        rcdType: 'Type A',
        rcdRating: '30',
        rcdTripTime: '18',
        result: 'pass',
      },
      {
        id: 'c2',
        circuitRef: '2',
        description: 'Lighting — Ground Floor',
        cableType: 'T&E',
        cableSize: '1.5',
        protectionType: 'MCB',
        protectionRating: '6',
        ze: '0.18',
        zs: '0.95',
        r1r2: '0.77',
        r2: '1.54',
        ir: '>200',
        polarity: 'Correct',
        rcdType: '',
        rcdRating: '',
        rcdTripTime: '',
        result: 'pass',
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
    // Unset fields should have defaults
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
    assertEquals(result.data.circuits[0].circuitRef, '1');
    assertEquals(result.data.circuits[0].description, 'Ring Final — Kitchen');
    assertEquals(result.data.circuits[0].result, 'pass');
    assertEquals(result.data.circuits[1].circuitRef, '2');
    assertEquals(result.data.circuits[1].protectionRating, '6');
    assertEquals(result.data.notes, 'All circuits tested satisfactorily.');
    assertEquals(result.data.testerSignature, 'data:image/png;base64,iVBOR...');
  }
});

Deno.test('Circuit array validates with defaults', () => {
  const payload = {
    circuits: [
      { id: 'c1', circuitRef: '1' },
      { circuitRef: '2', description: 'Lighting' },
    ],
  };
  const result = testingOnlyPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.circuits.length, 2);
    // First circuit — explicit id, defaults for the rest
    assertEquals(result.data.circuits[0].id, 'c1');
    assertEquals(result.data.circuits[0].circuitRef, '1');
    assertEquals(result.data.circuits[0].description, '');
    assertEquals(result.data.circuits[0].ze, '');
    assertEquals(result.data.circuits[0].result, '');
    // Second circuit — missing id gets default
    assertEquals(result.data.circuits[1].id, '');
    assertEquals(result.data.circuits[1].description, 'Lighting');
    assertEquals(result.data.circuits[1].polarity, '');
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

/**
 * smoke-co-payload-schema.test.ts
 * Deno tests for the Smoke & CO Alarm Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/smoke-co-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { smokeCOPayloadSchema } from './smoke-co-payload-schema.ts';

// ─── 1. Empty object parses with defaults ───────────────────────────────────

Deno.test('empty object parses with all defaults', () => {
  const result = smokeCOPayloadSchema.parse({});

  assertEquals(result.referenceNumber, '');
  assertEquals(result.installationDate, '');
  assertEquals(result.certificateType, '');
  assertEquals(result.propertyAddress, '');
  assertEquals(result.alarms, []);
  assertEquals(result.combustionAppliances, []);
  assertEquals(result.selectedRecommendations, []);
  assertEquals(result.companyName, '');
  assertEquals(result.companyLogo, '');
  assertEquals(result.notes, '');
});

// ─── 2. Minimal payload parses ──────────────────────────────────────────────

Deno.test('minimal payload parses correctly', () => {
  const payload = {
    referenceNumber: 'SCA-TEST001',
    propertyAddress: '42 Baker Street, London',
    installerName: 'John Smith',
  };

  const result = smokeCOPayloadSchema.parse(payload);

  assertEquals(result.referenceNumber, 'SCA-TEST001');
  assertEquals(result.propertyAddress, '42 Baker Street, London');
  assertEquals(result.installerName, 'John Smith');
  // Defaults still applied
  assertEquals(result.certificateType, '');
  assertEquals(result.competentPersonScheme, false);
  assertEquals(result.alarms, []);
});

// ─── 3. Full payload with alarms array ──────────────────────────────────────

Deno.test('full payload with alarms array parses correctly', () => {
  const payload = {
    referenceNumber: 'SCA-FULL001',
    installationDate: '2026-04-10',
    certificateType: 'new-installation',
    propertyAddress: '10 Downing Street, London',
    propertyType: 'Terraced House',
    numberOfStoreys: '2',
    numberOfRooms: '6',
    tenure: 'private-rental',
    landlordName: 'Jane Doe',
    installerName: 'Bob Builder',
    installerCompany: 'Safe Alarms Ltd',
    gradeAchieved: 'D1',
    categoryAchieved: 'LD2',
    compliesSmokeCORegs2022: true,
    compliesBS5839_6: true,
    alarms: [
      {
        id: 'alarm-1',
        floor: 'Ground',
        room: 'Hallway',
        alarmType: 'Optical Smoke',
        manufacturer: 'Aico',
        model: 'Ei3016',
        serialNumber: 'SN123456',
        powerSource: 'Mains with lithium backup',
        interconnect: 'RadioLINK+',
        wirelessModule: 'Ei3000MRF',
        dateOfManufacture: '2025-01',
        replacementDue: '2035-01',
        mounting: 'ceiling',
        functionalTest: 'pass',
        mainsIndicator: 'pass',
      },
      {
        id: 'alarm-2',
        floor: 'First',
        room: 'Landing',
        alarmType: 'Heat',
        manufacturer: 'Aico',
        model: 'Ei3014',
      },
    ],
    combustionAppliances: ['Gas Boiler', 'Gas Hob'],
    combustionApplianceLocations: 'Kitchen, Utility Room',
    selectedRecommendations: [
      'Recommend upgrade from LD3 to LD2 for enhanced protection',
    ],
    companyName: 'Safe Alarms Ltd',
    companyPhone: '07700 900000',
  };

  const result = smokeCOPayloadSchema.parse(payload);

  assertEquals(result.alarms.length, 2);
  assertEquals(result.alarms[0].manufacturer, 'Aico');
  assertEquals(result.alarms[0].functionalTest, 'pass');
  assertEquals(result.alarms[1].room, 'Landing');
  // Second alarm should get defaults for missing fields
  assertEquals(result.alarms[1].serialNumber, '');
  assertEquals(result.alarms[1].mounting, 'ceiling');
  assertEquals(result.combustionAppliances.length, 2);
  assertEquals(result.selectedRecommendations.length, 1);
  assertEquals(result.compliesSmokeCORegs2022, true);
  assertEquals(result.companyName, 'Safe Alarms Ltd');
});

// ─── 4. Boolean defaults are correct ────────────────────────────────────────

Deno.test('boolean fields default to false', () => {
  const result = smokeCOPayloadSchema.parse({});

  assertEquals(result.competentPersonScheme, false);
  assertEquals(result.rcdProtected, false);
  assertEquals(result.compliesSmokeCORegs2022, false);
  assertEquals(result.compliesBS5839_6, false);
  assertEquals(result.compliesBSEN14604, false);
  assertEquals(result.compliesBSEN50291, false);
  assertEquals(result.compliesBS7671, false);
});

// ─── 5. Passthrough allows extra keys ───────────────────────────────────────

Deno.test('passthrough preserves unknown keys', () => {
  const payload = {
    referenceNumber: 'SCA-PT001',
    customField: 'extra-value',
    anotherExtra: 42,
  };

  const result = smokeCOPayloadSchema.parse(payload);

  assertEquals(result.referenceNumber, 'SCA-PT001');
  assertEquals((result as Record<string, unknown>).customField, 'extra-value');
  assertEquals((result as Record<string, unknown>).anotherExtra, 42);
});

// ─── 6. Alarms array validates entries ──────────────────────────────────────

Deno.test('alarms array validates and defaults individual entries', () => {
  const payload = {
    alarms: [
      { floor: 'Ground', room: 'Kitchen' },
      { alarmType: 'CO', manufacturer: 'Kidde / BRK', functionalTest: 'pass' },
      {},
    ],
  };

  const result = smokeCOPayloadSchema.parse(payload);

  assertEquals(result.alarms.length, 3);

  // First alarm — partial fields + defaults
  assertEquals(result.alarms[0].floor, 'Ground');
  assertEquals(result.alarms[0].room, 'Kitchen');
  assertEquals(result.alarms[0].alarmType, '');
  assertEquals(result.alarms[0].mounting, 'ceiling');

  // Second alarm
  assertEquals(result.alarms[1].alarmType, 'CO');
  assertEquals(result.alarms[1].manufacturer, 'Kidde / BRK');
  assertEquals(result.alarms[1].functionalTest, 'pass');
  assertEquals(result.alarms[1].floor, '');

  // Third alarm — fully defaulted
  assertEquals(result.alarms[2].id, '');
  assertEquals(result.alarms[2].floor, '');
  assertEquals(result.alarms[2].mounting, 'ceiling');
  assertEquals(result.alarms[2].functionalTest, '');
});

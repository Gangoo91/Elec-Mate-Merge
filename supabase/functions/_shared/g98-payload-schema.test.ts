/**
 * Tests for G98 Commissioning payload schema
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { g98PayloadSchema } from './g98-payload-schema.ts';

Deno.test('Empty object parses with defaults', () => {
  const result = g98PayloadSchema.parse({});
  assertEquals(typeof result.referenceNumber, 'string');
  assertEquals(result.referenceNumber, '');
  assertEquals(result.status, 'draft');
  assertEquals(result.dnoName, '');
  assertEquals(result.installationAddress, '');
  assertEquals(result.companyName, '');
  assertEquals(result.supplyType, 'single-phase');
  assertEquals(result.numberOfPhases, '1');
});

Deno.test('Minimal payload parses', () => {
  const result = g98PayloadSchema.parse({
    referenceNumber: 'G98-TEST001',
    dnoName: 'UK Power Networks',
    installationAddress: '10 Downing Street, London',
  });
  assertEquals(result.referenceNumber, 'G98-TEST001');
  assertEquals(result.dnoName, 'UK Power Networks');
  assertEquals(result.installationAddress, '10 Downing Street, London');
  // Other fields should be defaults
  assertEquals(result.ratedOutput, '');
  assertEquals(result.exportCapable, true);
});

Deno.test('Full payload parses', () => {
  const full = {
    referenceNumber: 'G98-FULL',
    commissioningDate: '2026-04-10',
    notificationDate: '2026-04-08',
    dnoName: 'Western Power Distribution',
    installerName: 'John Smith',
    installerCompany: 'Smith Electrics',
    installerPhone: '07700900000',
    installerEmail: 'john@smith.co.uk',
    mcsNumber: 'MCS-001',
    registrationScheme: 'NAPIT',
    registrationNumber: 'NAP-123',
    installationAddress: '1 Test Lane',
    mpan: '1234567890123',
    supplyType: 'single-phase',
    earthingArrangement: 'TN-C-S',
    equipmentType: 'Solar PV',
    equipmentManufacturer: 'SolarEdge',
    equipmentModel: 'SE3000H',
    equipmentSerial: 'SN-123',
    ratedOutput: '3.0',
    numberOfPhases: '1',
    typeTestCertRef: 'TT-456',
    inverterManufacturer: 'SolarEdge',
    inverterModel: 'SE3000H',
    associatedCertRef: 'EIC-REF',
    exportCapable: true,
    exportLimited: true,
    exportLimit: '3.68',
    exportMeterFitted: true,
    exportMeterSerial: 'EM-789',
    segSupplier: 'Octopus',
    ovStage1Voltage: '264.0',
    ovStage1Time: '1.0',
    ovStage2Voltage: '276.0',
    ovStage2Time: '0.5',
    uvStage1Voltage: '207.0',
    uvStage1Time: '1.5',
    uvStage2Voltage: '195.5',
    uvStage2Time: '0.5',
    ofStage1Freq: '50.4',
    ofStage1Time: '0.5',
    ofStage2Freq: '52.0',
    ofStage2Time: '0.5',
    ufStage1Freq: '47.5',
    ufStage1Time: '0.5',
    ufStage2Freq: '47.0',
    ufStage2Time: '0.5',
    rocoFRate: '1.0',
    rocoFTime: '0.5',
    reconnectionDelay: '60',
    antiIslandingConfirmed: true,
    protectionSettingsVerified: true,
    systemOperating: true,
    labelsApplied: true,
    customerInformed: true,
    installerSignature: 'data:image/png;base64,...',
    installerDate: '2026-04-10',
    customerSignature: 'data:image/png;base64,...',
    customerDate: '2026-04-10',
    notes: 'All tests passed',
    completedSections: { installer: true, equipment: true, commissioning: true },
    status: 'completed',
  };

  const result = g98PayloadSchema.parse(full);
  assertEquals(result.referenceNumber, 'G98-FULL');
  assertEquals(result.dnoName, 'Western Power Distribution');
  assertEquals(result.exportLimited, true);
  assertEquals(result.exportLimit, '3.68');
  assertEquals(result.status, 'completed');
  assertEquals(result.completedSections.installer, true);
});

Deno.test('Boolean defaults correct', () => {
  const result = g98PayloadSchema.parse({});
  assertEquals(result.exportCapable, true);
  assertEquals(result.exportLimited, false);
  assertEquals(result.exportMeterFitted, false);
  assertEquals(result.antiIslandingConfirmed, false);
  assertEquals(result.protectionSettingsVerified, false);
  assertEquals(result.systemOperating, false);
  assertEquals(result.labelsApplied, false);
  assertEquals(result.customerInformed, false);
});

Deno.test('G98 protection settings have correct defaults', () => {
  const result = g98PayloadSchema.parse({});
  // Over-voltage
  assertEquals(result.ovStage1Voltage, '264.0');
  assertEquals(result.ovStage1Time, '1.0');
  assertEquals(result.ovStage2Voltage, '276.0');
  assertEquals(result.ovStage2Time, '0.5');
  // Under-voltage
  assertEquals(result.uvStage1Voltage, '207.0');
  assertEquals(result.uvStage1Time, '1.5');
  assertEquals(result.uvStage2Voltage, '195.5');
  assertEquals(result.uvStage2Time, '0.5');
  // Over-frequency
  assertEquals(result.ofStage1Freq, '50.4');
  assertEquals(result.ofStage1Time, '0.5');
  assertEquals(result.ofStage2Freq, '52.0');
  assertEquals(result.ofStage2Time, '0.5');
  // Under-frequency
  assertEquals(result.ufStage1Freq, '47.5');
  assertEquals(result.ufStage1Time, '0.5');
  assertEquals(result.ufStage2Freq, '47.0');
  assertEquals(result.ufStage2Time, '0.5');
  // RoCoF
  assertEquals(result.rocoFRate, '1.0');
  assertEquals(result.rocoFTime, '0.5');
  // Reconnection
  assertEquals(result.reconnectionDelay, '60');
});

Deno.test('Passthrough preserves extra keys', () => {
  const result = g98PayloadSchema.parse({
    referenceNumber: 'G98-EXTRA',
    customField: 'hello',
    anotherExtra: 42,
  });
  assertEquals(result.referenceNumber, 'G98-EXTRA');
  assertEquals((result as any).customField, 'hello');
  assertEquals((result as any).anotherExtra, 42);
});

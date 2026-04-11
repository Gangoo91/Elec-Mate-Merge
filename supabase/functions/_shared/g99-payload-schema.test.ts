/**
 * Tests for G99 Commissioning payload schema
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { g99PayloadSchema } from './g99-payload-schema.ts';

Deno.test('Empty object parses with defaults', () => {
  const result = g99PayloadSchema.parse({});
  assertEquals(typeof result.referenceNumber, 'string');
  assertEquals(result.referenceNumber, '');
  assertEquals(result.status, 'draft');
  assertEquals(result.dnoName, '');
  assertEquals(result.installationAddress, '');
  assertEquals(result.companyName, '');
});

Deno.test('Minimal payload parses', () => {
  const result = g99PayloadSchema.parse({
    referenceNumber: 'G99-TEST001',
    dnoName: 'UK Power Networks',
    installationAddress: '10 Downing Street, London',
  });
  assertEquals(result.referenceNumber, 'G99-TEST001');
  assertEquals(result.dnoName, 'UK Power Networks');
  assertEquals(result.installationAddress, '10 Downing Street, London');
  // Other fields should be defaults
  assertEquals(result.ratedOutput, '');
  assertEquals(result.exportCapable, false);
});

Deno.test('Full payload parses', () => {
  const full = {
    referenceNumber: 'G99-FULL',
    applicationDate: '2026-04-10',
    proposedCommissioningDate: '2026-05-01',
    dnoName: 'Western Power Distribution',
    dnoApplicationRef: 'WPD-12345',
    dnoApprovalReceived: true,
    dnoApprovalDate: '2026-04-15',
    dnoApprovalRef: 'APP-789',
    dnoSpecialConditions: 'None',
    networkStudyRequired: true,
    interTripRequired: false,
    connectionVoltage: 'LV',
    installerName: 'John Smith',
    installerCompany: 'Smith Electrics',
    installerPhone: '07700900000',
    installerEmail: 'john@smith.co.uk',
    mcsNumber: 'MCS-001',
    registrationScheme: 'NAPIT',
    registrationNumber: 'NAP-123',
    installationAddress: '1 Test Lane',
    mpan: '1234567890123',
    supplyType: 'three-phase',
    earthingArrangement: 'TN-C-S',
    equipmentType: 'Solar PV',
    equipmentManufacturer: 'SMA',
    equipmentModel: 'Sunny Tripower',
    equipmentSerial: 'SN-123',
    ratedOutput: '50',
    numberOfPhases: '3',
    numberOfGeneratingUnits: '2',
    typeTestCertRef: 'TT-456',
    inverterManufacturer: 'SMA',
    inverterModel: 'STP 50-40',
    proposedExportCapacity: '45',
    associatedCertRef: 'G98-REF',
    exportCapable: true,
    exportLimited: true,
    exportLimit: '45',
    exportMeterFitted: true,
    exportMeterSerial: 'EM-789',
    segSupplier: 'Octopus',
    commissioningDate: '2026-05-01',
    settingsSource: 'G99 default',
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
    powerQualityTHD: '3.5',
    reactivePowerVerified: true,
    activePowerControlVerified: true,
    frequencyResponseVerified: true,
    interTripTested: 'pass',
    measuredExportKW: '44.2',
    gridVoltageAtConnection: '240.1',
    dnoWitnessRequired: true,
    dnoWitnessName: 'DNO Inspector',
    dnoWitnessDate: '2026-05-01',
    antiIslandingConfirmed: true,
    protectionSettingsVerified: true,
    systemOperating: true,
    labelsApplied: true,
    customerInformed: true,
    overallResult: 'satisfactory',
    installerSignature: 'data:image/png;base64,...',
    installerDate: '2026-05-01',
    dnoWitnessSignature: 'data:image/png;base64,...',
    customerSignature: 'data:image/png;base64,...',
    customerDate: '2026-05-01',
    notes: 'All tests passed',
    completedSections: { application: true, commissioning: true },
    status: 'completed',
  };

  const result = g99PayloadSchema.parse(full);
  assertEquals(result.referenceNumber, 'G99-FULL');
  assertEquals(result.dnoApprovalReceived, true);
  assertEquals(result.networkStudyRequired, true);
  assertEquals(result.overallResult, 'satisfactory');
  assertEquals(result.status, 'completed');
  assertEquals(result.completedSections.application, true);
});

Deno.test('Boolean defaults correct', () => {
  const result = g99PayloadSchema.parse({});
  assertEquals(result.dnoApprovalReceived, false);
  assertEquals(result.networkStudyRequired, false);
  assertEquals(result.interTripRequired, false);
  assertEquals(result.exportCapable, false);
  assertEquals(result.exportLimited, false);
  assertEquals(result.exportMeterFitted, false);
  assertEquals(result.reactivePowerVerified, false);
  assertEquals(result.activePowerControlVerified, false);
  assertEquals(result.frequencyResponseVerified, false);
  assertEquals(result.dnoWitnessRequired, false);
  assertEquals(result.antiIslandingConfirmed, false);
  assertEquals(result.protectionSettingsVerified, false);
  assertEquals(result.systemOperating, false);
  assertEquals(result.labelsApplied, false);
  assertEquals(result.customerInformed, false);
});

Deno.test('G99 protection settings have correct defaults', () => {
  const result = g99PayloadSchema.parse({});
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
  const result = g99PayloadSchema.parse({
    referenceNumber: 'G99-EXTRA',
    customField: 'hello',
    anotherExtra: 42,
  });
  assertEquals(result.referenceNumber, 'G99-EXTRA');
  assertEquals((result as any).customField, 'hello');
  assertEquals((result as any).anotherExtra, 42);
});

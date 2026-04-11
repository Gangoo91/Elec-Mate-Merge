/**
 * Tests for Lightning Protection payload schema
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { lightningProtectionPayloadSchema } from './lightning-protection-payload-schema.ts';

Deno.test('Empty object parses with defaults', () => {
  const result = lightningProtectionPayloadSchema.parse({});
  assertEquals(typeof result.certificateNumber, 'string');
  assertEquals(result.certificateNumber, '');
  assertEquals(result.status, 'draft');
  assertEquals(result.clientName, '');
  assertEquals(result.siteAddress, '');
  assertEquals(result.companyName, '');
  assertEquals(result.lpsClass, '');
  assertEquals(result.overallResult, '');
  assertEquals(result.inspectionType, '');
});

Deno.test('Minimal payload parses', () => {
  const result = lightningProtectionPayloadSchema.parse({
    certificateNumber: 'LP-TEST001',
    clientName: 'Test Client',
    siteAddress: '10 Downing Street, London',
  });
  assertEquals(result.certificateNumber, 'LP-TEST001');
  assertEquals(result.clientName, 'Test Client');
  assertEquals(result.siteAddress, '10 Downing Street, London');
  // Other fields should be defaults
  assertEquals(result.lpsClass, '');
  assertEquals(result.strikeCounterFitted, false);
});

Deno.test('Full payload parses', () => {
  const full = {
    certificateNumber: 'LP-FULL',
    inspectionDate: '2026-04-10',
    inspectionType: 'periodic',
    previousCertRef: 'LP-PREV',
    previousCertDate: '2024-04-10',
    nextInspectionDue: '2028-04-10',
    nextVisualInspectionDue: '2027-04-10',
    designStandard: 'BS EN 62305',
    clientName: 'ACME Corp',
    clientAddress: '1 Lightning Lane',
    clientPhone: '07700900000',
    clientEmail: 'client@acme.co.uk',
    siteName: 'ACME HQ',
    siteAddress: '1 Lightning Lane, London',
    buildingType: 'Commercial',
    buildingUse: 'Office',
    numberOfFloors: '5',
    buildingHeight: '20',
    constructionType: 'Steel frame',
    contractorCompany: 'LP Specialists Ltd',
    atlasNumber: 'ATLAS-001',
    testerName: 'John Smith',
    testerQualifications: 'C&G 2391',
    reviewerName: 'Jane Doe',
    lpsClass: 'II',
    lpsType: 'non-isolated',
    originalInstallDate: '2015-06-01',
    systemAge: '11',
    airTerminationType: 'mesh',
    airTerminationMaterial: 'copper-tape',
    meshSize: '10x10',
    numberOfAirRods: '4',
    downConductorMaterial: 'copper-tape',
    downConductorSize: '50',
    numberOfDownConductors: '8',
    downConductorSpacing: '10',
    numberOfElectrodes: '8',
    electrodeType: 'rod',
    electrodeMaterial: 'copper-clad-steel',
    electrodeDepth: '2.4',
    strikeCounterFitted: true,
    strikeCounterReading: '12',
    strikeCounterPreviousReading: '10',
    bondingBarLocation: 'Main switch room',
    servicesBonded: {
      electrical: true,
      gas: true,
      water: true,
      telecoms: true,
      structuralSteel: false,
      hvac: false,
      other: 'Fire suppression',
    },
    spd1Fitted: true,
    spd1Location: 'Main DB',
    spd1Make: 'Dehn',
    spd1Model: 'DEHNguard M',
    spd2Fitted: true,
    spd2Location: 'Sub DB',
    spd2Make: 'Dehn',
    spd2Model: 'DEHNguard S',
    spd3Fitted: false,
    spd3Location: '',
    spd3Make: '',
    spd3Model: '',
    weatherCondition: 'dry',
    soilCondition: 'moist',
    ambientTemp: '18',
    lpsDrawingRef: 'DRG-001',
    lpsDrawingAttached: true,
    hasTestLimitations: false,
    testLimitations: '',
    soilResistivity: '100',
    instrumentMake: 'Megger',
    instrumentModel: 'DET4TC2',
    instrumentSerial: 'SER-456',
    instrumentCalDate: '2026-01-15',
    riskAssessmentRef: 'RA-001',
    riskAssessmentDate: '2026-03-01',
    requiredLPSClass: 'II',
    actualLPSClass: 'II',
    riskAssessmentCompliant: true,
    overallResult: 'satisfactory',
    inspectorSignature: 'data:image/png;base64,...',
    inspectorDate: '2026-04-10',
    reviewerSignature: 'data:image/png;base64,...',
    reviewerDate: '2026-04-10',
    clientSignature: 'data:image/png;base64,...',
    clientDate: '2026-04-10',
    additionalNotes: 'All tests satisfactory',
    completedSections: { details: true, installation: true, observations: true },
    status: 'completed',
  };

  const result = lightningProtectionPayloadSchema.parse(full);
  assertEquals(result.certificateNumber, 'LP-FULL');
  assertEquals(result.clientName, 'ACME Corp');
  assertEquals(result.lpsClass, 'II');
  assertEquals(result.strikeCounterFitted, true);
  assertEquals(result.servicesBonded.electrical, true);
  assertEquals(result.servicesBonded.other, 'Fire suppression');
  assertEquals(result.overallResult, 'satisfactory');
  assertEquals(result.status, 'completed');
  assertEquals(result.completedSections.details, true);
});

Deno.test('Boolean defaults correct', () => {
  const result = lightningProtectionPayloadSchema.parse({});
  assertEquals(result.strikeCounterFitted, false);
  assertEquals(result.riskAssessmentCompliant, false);
  assertEquals(result.lpsDrawingAttached, false);
  assertEquals(result.hasTestLimitations, false);
  assertEquals(result.spd1Fitted, false);
  assertEquals(result.spd2Fitted, false);
  assertEquals(result.spd3Fitted, false);
  assertEquals(result.servicesBonded.electrical, false);
  assertEquals(result.servicesBonded.gas, false);
  assertEquals(result.servicesBonded.water, false);
  assertEquals(result.servicesBonded.telecoms, false);
  assertEquals(result.servicesBonded.structuralSteel, false);
  assertEquals(result.servicesBonded.hvac, false);
});

Deno.test('Array defaults correct', () => {
  const result = lightningProtectionPayloadSchema.parse({});
  assertEquals(Array.isArray(result.visualInspection), true);
  assertEquals(result.visualInspection.length, 0);
  assertEquals(Array.isArray(result.earthElectrodeTests), true);
  assertEquals(result.earthElectrodeTests.length, 0);
  assertEquals(Array.isArray(result.downConductorTests), true);
  assertEquals(result.downConductorTests.length, 0);
  assertEquals(Array.isArray(result.bondingTests), true);
  assertEquals(result.bondingTests.length, 0);
  assertEquals(Array.isArray(result.spdChecks), true);
  assertEquals(result.spdChecks.length, 0);
  assertEquals(Array.isArray(result.separationChecks), true);
  assertEquals(result.separationChecks.length, 0);
  assertEquals(Array.isArray(result.observations), true);
  assertEquals(result.observations.length, 0);
  assertEquals(Array.isArray(result.photos), true);
  assertEquals(result.photos.length, 0);
});

Deno.test('Passthrough preserves extra keys', () => {
  const result = lightningProtectionPayloadSchema.parse({
    certificateNumber: 'LP-EXTRA',
    customField: 'hello',
    anotherExtra: 42,
  });
  assertEquals(result.certificateNumber, 'LP-EXTRA');
  assertEquals((result as any).customField, 'hello');
  assertEquals((result as any).anotherExtra, 42);
});

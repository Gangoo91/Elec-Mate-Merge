/**
 * bess-payload-schema.test.ts
 * Deno tests for the BESS (Battery Energy Storage System) Certificate payload Zod schema.
 *
 * Run: deno test supabase/functions/_shared/bess-payload-schema.test.ts --allow-net
 */

import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { bessPayloadSchema } from './bess-payload-schema.ts';

// ─── Fixtures ────────────────────────────────────────────────────────

function makeMinimalPayload() {
  return {
    certificateNumber: 'BESS-001',
    installationDate: '10/04/2026',
    commissioningDate: '10/04/2026',
    clientName: 'John Smith',
    clientAddress: '123 Test St, London, SW1A 1AA',
    installerName: 'Bob Sparks',
    installerCompany: 'Sparks BESS Ltd',
    batteryManufacturer: 'Tesla',
    batteryModel: 'Powerwall 3',
    usableCapacity: '13.5',
    inverterManufacturer: 'Tesla',
    inverterModel: 'Integrated',
    inverterRatedPower: '11.5',
  };
}

function makeFullPayload() {
  return {
    // Certificate metadata
    certificateNumber: 'BESS-042',
    installationDate: '08/04/2026',
    commissioningDate: '10/04/2026',

    // Client
    clientName: 'Jane Doe',
    clientAddress: '456 Battery Lane, Manchester, M1 2AB',
    clientTelephone: '07700900123',
    clientEmail: 'jane@test.com',

    // Installation
    installationType: 'domestic',
    installationAddress: '456 Battery Lane, Manchester, M1 2AB',
    installationLocation: 'Garage',
    associatedPV: true,
    associatedPVRef: 'PV-2026-001',
    associatedPVCapacity: '4.2',

    // Installer
    installerName: 'Bob Sparks',
    installerCompany: 'Sparks BESS Ltd',
    installerPhone: '07700900456',
    installerEmail: 'bob@sparksbess.com',
    installerScheme: 'NAPIT',
    installerSchemeNumber: 'NAP-BESS-001',
    mcsInstallerNumber: 'MCS-12345',
    installerSignature: 'data:image/png;base64,iVBOR...',
    installerDate: '10/04/2026',

    // Commissioner
    commissionerName: 'Bob Sparks',
    commissionerSignature: 'data:image/png;base64,iVBOR...',

    // Battery system
    batteryManufacturer: 'Tesla',
    batteryModel: 'Powerwall 3',
    batterySerials: 'PW3-2026-A001',
    batteryChemistry: 'LFP',
    usableCapacity: '13.5',
    nominalVoltage: '51.2',
    numberOfModules: '1',
    configuration: 'Single unit',
    maxChargeRate: '5',
    maxDischargeRate: '11.5',
    depthOfDischarge: '100',
    roundTripEfficiency: '97.5',
    mcsBatteryProductCert: 'MCS-BATT-001',
    iec62619Compliant: true,
    bmsFirmware: 'v2.1.4',

    // Inverter
    inverterManufacturer: 'Tesla',
    inverterModel: 'Integrated',
    inverterSerial: 'INV-2026-001',
    inverterRatedPower: '11.5',
    inverterType: 'Hybrid',
    inverterPhases: 'single',
    inverterFirmware: 'v3.0.1',
    mcsInverterProductCert: 'MCS-INV-001',

    // System config
    couplingType: 'AC coupled',
    operatingMode: 'Self-consumption',
    chargeRateLimit: '5',
    dischargeRateLimit: '11.5',
    dodLimit: '100',
    backupReserve: '20',
    epsEnabled: true,
    exportLimited: true,
    exportLimit: '3.68',
    totalSiteGeneration: '4.2',

    // DC circuit
    dcCableType: 'DC Solar',
    dcCableCSA: '6',
    dcCableLength: '3',
    dcProtectionType: 'DC MCB',
    dcProtectionRating: '25',
    dcIsolatorLocation: 'Adjacent to battery',
    dcIsolatorRating: '32',
    dcSPDType: 'Type 2',
    dcSPDManufacturer: 'Weidmuller',
    dcEarthFaultMethod: 'IMD',

    // Earthing
    earthingArrangement: 'TN-C-S',
    pmeRiskAssessment: true,
    dcEarthingMethod: 'Functional earth',
    earthElectrodeResistance: '45',

    // AC circuit
    acCableType: 'T&E',
    acCableCSA: '10',
    acCableLength: '8',
    acProtectionType: 'RCBO',
    acProtectionRating: '50',
    acProtectionCurve: 'B',
    rcdType: 'Type A',
    rcdRating: '30',
    acIsolatorLocation: 'Main CU',
    acSPDType: 'Type 2',
    acSPDManufacturer: 'Hager',

    // Battery safety
    locationSuitable: true,
    distanceFromCombustibles: '500',
    ventilation: 'Natural ventilation',
    fireDetection: 'Smoke detector within 3m',
    thermalManagement: 'Integrated liquid cooling',
    warningSignageInstalled: true,
    warningSignageLocations: 'Garage door, main CU',
    emergencyShutdownProvided: true,
    fireServiceInfoProvided: true,

    // PAS 63100
    pas63100Applicable: true,
    notInSleepingRoom: true,
    notInEscapeRoute: true,
    notInLoftOrVoid: true,
    notInBasementNoAccess: true,
    enclosureNonCombustible: true,
    enclosureToolAccessOnly: true,
    dcFusesToolAccessOnly: true,
    energyPerEnclosure: '13.5',
    totalEnergyAtPremises: '13.5',
    distanceFromOpenings: '1000',
    distanceFromFlammables: '500',
    ik10Protection: true,
    fireDetectionGrade: 'D2',
    fireDetectionCategory: 'LD2',
    audibleBatteryWarning: true,
    ventilationToOutdoors: true,
    ventPortMinDistance: true,

    // EESS class
    eessClass: 'Class 1',

    // Labelling
    labelAtOrigin: true,
    labelAtMeteringPoint: true,
    labelAtMainCU: true,
    labelAtIsolationPoints: true,
    batteryEnclosureLabel: true,
    dcIsolationLabelled: true,
    emergencyProcedureDisplayed: true,

    // AFDD
    afddInstalled: false,

    // Compliance
    pas63100Compliant: true,
    nextInspectionDate: '10/04/2027',
    nextInspectionInterval: '12',
    buildingControlRef: 'BC-2026-001',
    eicReference: 'EIC-2026-042',

    // Functional tests
    antiIslandingTest: 'Pass',
    antiIslandingMethod: 'Impedance shift',
    chargeTest: 'Pass',
    dischargeTest: 'Pass',
    epsTest: 'Pass',
    epsSwitchoverTime: '< 20ms',
    monitoringConfirmed: true,
    emergencyShutdownTest: 'Pass',
    bmsOperationalTest: 'Pass',
    thermalMonitoringTest: 'Pass',

    // AC test results
    ze: '0.18',
    zs: '0.52',
    r1r2: '0.34',
    r2: '0.68',
    acInsulationResistance: '>200',
    acPolarity: 'Correct',
    pscc: '4.8',
    rcdTripTimeIdn: '18',
    rcdTripTime5xIdn: '12',

    // DC test results
    dcInsulationResistance: '>2',
    dcTestVoltage: '500',
    dcStringVoltage: '51.4',
    dcStringVoltageExpected: '51.2',
    dcPolarityVerified: true,
    batterySoCAtCommissioning: '85',

    // Grid protection
    ovStage1Voltage: '264',
    ovStage1Time: '1.0',
    ovStage2Voltage: '276',
    ovStage2Time: '0.5',
    uvStage1Voltage: '207',
    uvStage1Time: '1.5',
    uvStage2Voltage: '196',
    uvStage2Time: '0.5',
    ofStage1Freq: '50.4',
    ofStage1Time: '0.5',
    ofStage2Freq: '52',
    ofStage2Time: '0.5',
    ufStage1Freq: '47.5',
    ufStage1Time: '0.5',
    ufStage2Freq: '47',
    ufStage2Time: '0.5',
    rocoFRate: '1',
    rocoFTime: '0.5',
    reconnectionDelay: '60',

    // DNO
    gridConnectionType: 'G98',
    dnoName: 'Electricity North West',
    dnoReference: 'DNO-2026-042',
    dnoNotificationDate: '05/04/2026',
    mpan: '2000012345678',
    exportMeterFitted: true,
    exportMeterSerial: 'EXP-001',
    smartMeterFitted: true,
    smartMeterSerial: 'SM-001',
    segRegistered: true,

    // Manufacturer commissioning
    portalRegistered: true,
    commModuleType: 'Wi-Fi',
    commModuleSerial: 'CM-001',
    cloudMonitoringWorking: true,
    manufacturerCommRef: 'TESLA-COMM-042',
    firmwaresCurrent: true,

    // Test instrument
    testInstrumentMake: 'Megger',
    testInstrumentModel: 'MFT1741',
    testInstrumentSerial: 'MEG-2026-001',
    testInstrumentCalDate: '15/01/2026',

    // Warranty
    batteryWarrantyYears: '10',
    inverterWarrantyYears: '10',

    // Customer handover
    operatingInstructionsProvided: true,
    emergencyShutdownExplained: true,
    maintenanceScheduleProvided: true,
    customerAppSetup: true,
    dnoNotificationCopyProvided: true,
    mcsCertificateProvided: true,
    warrantyRegistered: true,
    buildingControlNotified: true,

    // Client acknowledgement
    clientSignature: 'data:image/png;base64,iVBOR...',
    clientDate: '10/04/2026',

    // Photos & notes
    photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
    additionalNotes: 'Battery installed in garage as per client request.',
    defectsObservations: 'None',

    // Company branding
    companyLogo: 'https://example.com/logo.png',
    companyName: 'Sparks BESS Ltd',
    companyAddress: '789 Installer Way, London, EC1A 1BB',
    companyPhone: '07700900456',
    companyEmail: 'info@sparksbess.com',
    companyTagline: 'Battery Storage Specialists',
    companyAccentColor: '#059669',
    companyWebsite: 'https://sparksbess.com',
    registrationScheme: 'NAPIT',
    registrationNumber: 'NAP-BESS-001',
    registrationSchemeLogo: 'https://example.com/napit.png',
  };
}

// ─── Tests ───────────────────────────────────────────────────────────

Deno.test('Empty object parses with all defaults', () => {
  const result = bessPayloadSchema.safeParse({});
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.certificateNumber, '');
    assertEquals(result.data.clientName, '');
    assertEquals(result.data.batteryManufacturer, '');
    assertEquals(result.data.ze, '');
    assertEquals(result.data.additionalNotes, '');
    assertEquals(result.data.companyAccentColor, '#059669');
  }
});

Deno.test('Minimal valid payload parses', () => {
  const payload = makeMinimalPayload();
  const result = bessPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.certificateNumber, 'BESS-001');
    assertEquals(result.data.clientName, 'John Smith');
    assertEquals(result.data.batteryManufacturer, 'Tesla');
    assertEquals(result.data.batteryModel, 'Powerwall 3');
    assertEquals(result.data.usableCapacity, '13.5');
    // Unset fields should have defaults
    assertEquals(result.data.clientTelephone, '');
    assertEquals(result.data.associatedPV, false);
    assertEquals(result.data.epsEnabled, false);
  }
});

Deno.test('Full payload parses', () => {
  const payload = makeFullPayload();
  const result = bessPayloadSchema.safeParse(payload);
  assertEquals(result.success, true, `Schema errors: ${JSON.stringify((result as any).error?.issues?.slice(0, 5))}`);
  if (result.success) {
    assertEquals(result.data.certificateNumber, 'BESS-042');
    assertEquals(result.data.batteryChemistry, 'LFP');
    assertEquals(result.data.associatedPV, true);
    assertEquals(result.data.epsEnabled, true);
    assertEquals(result.data.exportLimited, true);
    assertEquals(result.data.exportLimit, '3.68');
    assertEquals(result.data.pas63100Compliant, true);
    assertEquals(result.data.antiIslandingTest, 'Pass');
    assertEquals(result.data.dcPolarityVerified, true);
    assertEquals(result.data.batterySoCAtCommissioning, '85');
    assertEquals(result.data.dnoName, 'Electricity North West');
    assertEquals(result.data.batteryWarrantyYears, '10');
    assertEquals(result.data.photos.length, 2);
  }
});

Deno.test('Boolean coercion works — missing booleans get defaults', () => {
  const payload = makeMinimalPayload();
  const result = bessPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    // Booleans that default to false
    assertEquals(result.data.associatedPV, false);
    assertEquals(result.data.epsEnabled, false);
    assertEquals(result.data.exportLimited, false);
    assertEquals(result.data.pmeRiskAssessment, false);
    assertEquals(result.data.warningSignageInstalled, false);
    assertEquals(result.data.emergencyShutdownProvided, false);
    assertEquals(result.data.afddInstalled, false);
    assertEquals(result.data.pas63100Compliant, false);
    assertEquals(result.data.dcPolarityVerified, false);
    assertEquals(result.data.monitoringConfirmed, false);
    assertEquals(result.data.exportMeterFitted, false);
    assertEquals(result.data.smartMeterFitted, false);
    assertEquals(result.data.segRegistered, false);
    assertEquals(result.data.operatingInstructionsProvided, false);
    assertEquals(result.data.buildingControlNotified, false);

    // Booleans that default to true
    assertEquals(result.data.iec62619Compliant, true);
    assertEquals(result.data.locationSuitable, true);
    assertEquals(result.data.pas63100Applicable, true);
  }
});

Deno.test('Extra fields pass through (passthrough)', () => {
  const payload = { ...makeMinimalPayload(), customField: 'test-value', anotherExtra: 42 };
  const result = bessPayloadSchema.safeParse(payload);
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals((result.data as any).customField, 'test-value');
    assertEquals((result.data as any).anotherExtra, 42);
  }
});

Deno.test('PAS 63100 fields have correct defaults', () => {
  const result = bessPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    // PAS 63100 is applicable by default (domestic BESS)
    assertEquals(result.data.pas63100Applicable, true);
    // Location exclusions default to false (not yet confirmed)
    assertEquals(result.data.notInSleepingRoom, false);
    assertEquals(result.data.notInEscapeRoute, false);
    assertEquals(result.data.notInLoftOrVoid, false);
    assertEquals(result.data.notInBasementNoAccess, false);
    // Enclosure checks default to false
    assertEquals(result.data.enclosureNonCombustible, false);
    assertEquals(result.data.enclosureToolAccessOnly, false);
    assertEquals(result.data.dcFusesToolAccessOnly, false);
    assertEquals(result.data.ik10Protection, false);
    // Fire detection defaults per PAS 63100
    assertEquals(result.data.fireDetectionGrade, 'D2');
    assertEquals(result.data.fireDetectionCategory, 'LD2');
    // Ventilation and warning defaults
    assertEquals(result.data.audibleBatteryWarning, false);
    assertEquals(result.data.ventilationToOutdoors, false);
    assertEquals(result.data.ventPortMinDistance, false);
    // Energy fields default to empty
    assertEquals(result.data.energyPerEnclosure, '');
    assertEquals(result.data.totalEnergyAtPremises, '');
  }
});

Deno.test('Grid protection settings have G98 defaults', () => {
  const result = bessPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    // Over-voltage
    assertEquals(result.data.ovStage1Voltage, '264');
    assertEquals(result.data.ovStage1Time, '1.0');
    assertEquals(result.data.ovStage2Voltage, '276');
    assertEquals(result.data.ovStage2Time, '0.5');
    // Under-voltage
    assertEquals(result.data.uvStage1Voltage, '207');
    assertEquals(result.data.uvStage1Time, '1.5');
    assertEquals(result.data.uvStage2Voltage, '196');
    assertEquals(result.data.uvStage2Time, '0.5');
    // Over-frequency
    assertEquals(result.data.ofStage1Freq, '50.4');
    assertEquals(result.data.ofStage1Time, '0.5');
    assertEquals(result.data.ofStage2Freq, '52');
    assertEquals(result.data.ofStage2Time, '0.5');
    // Under-frequency
    assertEquals(result.data.ufStage1Freq, '47.5');
    assertEquals(result.data.ufStage1Time, '0.5');
    assertEquals(result.data.ufStage2Freq, '47');
    assertEquals(result.data.ufStage2Time, '0.5');
    // RoCoF
    assertEquals(result.data.rocoFRate, '1');
    assertEquals(result.data.rocoFTime, '0.5');
    // Reconnection
    assertEquals(result.data.reconnectionDelay, '60');
  }
});

Deno.test('Photos default to empty array', () => {
  const result = bessPayloadSchema.safeParse({});
  assertEquals(result.success, true);
  if (result.success) {
    assertEquals(Array.isArray(result.data.photos), true);
    assertEquals(result.data.photos.length, 0);
  }
});

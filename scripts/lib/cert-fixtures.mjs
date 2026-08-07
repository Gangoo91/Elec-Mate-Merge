/**
 * Sample inputs for the payload probe, one per certificate.
 *
 * A fixture is the price of a real answer. Without one, `check-cert-mapping`
 * can only guess at the payload by reading the formatter's source, and that
 * guess reported 117 dropped fields on an EICR that drops none.
 *
 * Fixtures do not need to be exhaustive. They need to reach every branch that
 * puts a field into the payload — so include at least one circuit, one
 * observation and one board, because the interesting fields live inside loops.
 *
 * Adding a certificate here upgrades it from "static (unverified)" to "probed"
 * in the report. That is the whole contribution: no other wiring.
 */

const CIRCUIT = {
  id: 'c1',
  boardId: 'main',
  circuitNumber: '1',
  circuitDesignation: '1',
  circuitDescription: 'Kitchen ring',
  typeOfWiring: 'A',
  referenceMethod: 'C',
  pointsServed: '8',
  liveSize: '2.5',
  cpcSize: '1.5',
  bsStandard: 'RCBO (BS EN 61009)',
  protectiveDeviceCurve: 'B',
  protectiveDeviceRating: '32',
  protectiveDeviceKaRating: '6',
  maxZs: '1.37',
  rcdBsStandard: 'BS EN 61009',
  rcdType: 'A',
  rcdRating: '30',
  rcdRatingA: '32',
  ringR1: '0.40',
  ringRn: '0.41',
  ringR2: '0.66',
  r1r2: '0.27',
  r2: '0.66',
  insulationTestVoltage: '500',
  insulationLiveNeutral: '299',
  insulationLiveEarth: '299',
  polarity: '✓',
  zs: '0.42',
  rcdOneX: '28',
  rcdTestButton: '✓',
  afddTest: 'N/A',
  functionalTesting: '✓',
  notes: 'Sample circuit',
};

const COMMON = {
  clientName: 'Sample Client',
  clientAddress: '1 Sample Street, Sampletown, SA1 1AA',
  clientEmail: 'client@example.com',
  clientPhone: '01234 567890',
  installationAddress: '1 Sample Street, Sampletown, SA1 1AA',
  inspectionDate: '2026-08-07',
  testDate: '2026-08-07',
  inspectorName: 'Sample Inspector',
  inspectorQualifications: 'C&G 2391-52',
  inspectorSignature: 'data:image/png;base64,iVBORw0KGgo=',
  registrationNumber: 'NAPIT-12345',
  supplyVoltage: '230',
  phases: '1',
  earthingArrangement: 'TN-C-S',
  mainProtectiveDevice: '100A BS 88-3',
  testInstrumentMake: 'Megger MFT1741',
  testInstrumentSerial: 'SN-000123',
};

export const FIXTURES = {
  eicr: {
    exportName: 'formatEICRJson',
    reportId: 'EICR-PROBE',
    data: {
      ...COMMON,
      overallAssessment: 'unsatisfactory',
      nextInspectionDate: '2031-08-07',
      extentOfInspection: 'Full periodic inspection',
      limitationsOfInspection: 'Sampling 10%',
      purposeOfInspection: 'Change of occupancy',
      bondingCompliance: 'satisfactory',
      scheduleOfTests: [CIRCUIT, { ...CIRCUIT, id: 'c2', boardId: 'db2', circuitNumber: '2', circuitDesignation: '2', circuitDescription: 'Garage sockets' }],
      distributionBoards: [
        { id: 'main', name: 'DB1', reference: 'DB1', location: 'Hallway', zdb: '0.18', ipf: '1.2' },
        { id: 'db2', name: 'DB2', reference: 'DB2', location: 'Garage', zdb: '0.22', ipf: '0.9' },
      ],
      inspectionItems: [
        { id: 'i1', item: 'Condition of consumer unit', outcome: 'satisfactory', notes: '' },
        { id: 'i2', item: 'Absence of RCD on lighting', outcome: 'C3', notes: 'No RCD fitted' },
      ],
      defectObservations: [
        {
          id: 'o1',
          item: 'No RCD protection to lighting circuit',
          defectCode: 'C3',
          description: 'Lighting circuit has no additional protection',
          recommendation: 'Upgrade to RCBO at next opportunity',
          rectified: false,
        },
      ],
    },
  },


  'emergency-lighting': {
    exportName: 'formatEmergencyLightingJson',
    reportId: 'EL-PROBE',
    data: {
      ...COMMON,
      defectsFound: [{ id: 'defectsFound1' }],
      luminaires: [
        { id: 'l1', ref: 'L1', location: 'Corridor', type: 'Maintained', mode: 'M', duration: '3h' },
      ],
      luxReadings: [{ id: 'r1', location: 'Corridor', reading: '1.2', required: '1.0' }],
    },
  },
  'pat-testing': {
    exportName: 'formatPATTestingJson',
    reportId: 'PAT-PROBE',
    data: {
      ...COMMON,
      // The formatter walks these nested objects unguarded
      // (app.visualInspection.flexCondition, app.electricalTests.earthContinuity
      // .result), so a bare {} throws before the payload is built.
      appliances: [
        {
          id: 'a2',
          description: 'Extension lead',
          assetNumber: 'A-002',
          make: 'Sample',
          model: 'EL-4G',
          // `failedAppliances` filters on overallResult — the individual test
          // results below are not what selects it.
          overallResult: 'fail',
          visualInspection: { flexCondition: 'fail', plugCondition: 'pass', bodyCondition: 'pass' },
          electricalTests: {
            earthContinuity: { result: 'fail', reading: '2.4' },
            insulationResistance: { result: 'pass', reading: '299' },
            loadTest: { result: 'pass', reading: '1.8' },
          },
        },
        {
          id: 'a1',
          description: 'Kettle',
          visualInspection: { flexCondition: 'pass', plugCondition: 'pass', bodyCondition: 'pass' },
          electricalTests: {
            earthContinuity: { result: 'pass', reading: '0.05' },
            insulationResistance: { result: 'pass', reading: '299' },
            loadTest: { result: 'pass', reading: '2.1' },
          },
        },
      ],
    },
  },
  'solar-pv': {
    exportName: 'formatSolarPVJson',
    reportId: 'PV-PROBE',
    data: {
      ...COMMON,
      // Nested under testResults, not top level — `(formData.testResults || {}).arrayTests`
      testResults: {
        arrayTests: [{ id: 't1', arrayRef: 'Array 1', voc: '420', isc: '9.8', insulation: '299' }],
        inverterTests: [{ id: 'it1', inverterRef: 'INV1', acVoltage: '230', frequency: '50' }],
        testEquipment: [{ id: 'te1', make: 'Seaward', model: 'PV200', serial: 'SN1' }],
      },
      defects: [{ id: 'defects1' }],
      arrays: [
        { id: 'a1', ref: 'Array 1', orientation: 'South', tilt: '35', moduleMake: 'Sample',
          moduleModel: 'SP-400', moduleCount: '12', stringCount: '1' },
      ],
      inverters: [
        { id: 'i1', ref: 'INV1', make: 'Sample', model: 'INV-5000', ratedPower: '5000' },
      ],
    },
  },
  'bess': {
    exportName: 'formatBESSJson',
    reportId: 'BESS-PROBE',
    data: {
      ...COMMON,
    },
  },
  'lightning-protection': {
    exportName: 'formatLightningProtectionJson',
    reportId: 'LP-PROBE',
    data: {
      ...COMMON,
      spdChecks: [{ id: 's1', location: 'Main panel', type: 'Type 1', condition: 'Satisfactory' }],
      separationChecks: [{ id: 'sep1', location: 'Downconductor 1', distance: '0.5', compliant: true }],
      observations: [{ id: 'o1', item: 'Sample observation', description: 'Sample description' }],
    },
  },
  'smoke-co-alarm': {
    exportName: 'formatSmokeCOJson',
    reportId: 'SCA-PROBE',
    data: {
      ...COMMON,
      alarms: [{ id: 'al1', type: 'Smoke', location: 'Hallway', make: 'Aico', model: 'Ei3016', power: 'Mains + battery' }],
      combustionAppliances: [{ id: 'ca1', type: 'Gas boiler', location: 'Kitchen', fuel: 'Natural gas' }],
      selectedRecommendations: ['Sample recommendation'],
    },
  },
  'fire-alarm-log-book': {
    exportName: 'formatFireAlarmLogBookJson',
    reportId: 'FALB-PROBE',
    // Unlike every other formatter this takes a destructured object
    // ({ book, entries, from, to, branding, signatures }) rather than
    // (formData, reportId) — so ...COMMON is not what it reads.
    data: {
      book: {
        id: 'lb1',
        premises_name: 'Sample Premises',
        premises_address: '1 Sample Street',
        responsible_person: 'Sample Person',
        system_category: 'L1',
      },
      entries: [
        {
          id: 'e1',
          entry_date: '2026-08-01',
          entry_type: 'test',
          resolved: true,
          data: { zone: '1', location: 'Reception', description: 'Weekly test', device: 'MCP1' },
        },
        {
          id: 'e2',
          entry_date: '2026-08-02',
          entry_type: 'fault',
          resolved: false,
          data: { zone: '2', location: 'Corridor', description: 'Detector fault', device: 'SD4' },
        },
      ],
      from: '2026-01-01',
      to: '2026-12-31',
      branding: {},
      signatures: {},
    },
  },
  'g98-commissioning': {
    exportName: 'formatG98Json',
    reportId: 'G98-PROBE',
    data: {
      ...COMMON,
    },
  },
  'g99-commissioning': {
    exportName: 'formatG99Json',
    reportId: 'G99-PROBE',
    data: {
      ...COMMON,
    },
  },
  'testing-only': {
    exportName: 'formatTestingOnlyJson',
    reportId: 'TO-PROBE',
    data: {
      ...COMMON,
      distributionBoards: [{ id: 'main', name: 'DB1', reference: 'DB1', location: 'Hallway' }],
      scheduleOfTests: [CIRCUIT],
    },
  },
  'ev-charging': {
    exportName: 'formatEVChargingJson',
    reportId: 'EV-PROBE',
    data: {
      ...COMMON,
    },
  },
  'fire-alarm-g1': {
    exportName: 'formatFireAlarmG1Json',
    reportId: 'FAG1-PROBE',
    data: {
      ...COMMON,
      zones: [{}],
      drawings: [{}],
      interfaceEquipment: [{}],
    },
  },
  'fire-alarm-g2': {
    exportName: 'formatFireAlarmJson',
    reportId: 'FAG2-PROBE',
    data: {
      ...COMMON,
      zones: [{ id: 'z1', zoneNumber: '1', zoneName: 'Ground floor', location: 'Reception' }],
      soundLevelReadings: [{ id: 'soundLevelReadings1' }],
      defectsFound: [{ id: 'defectsFound1' }],
      previousDefects: [{ id: 'previousDefects1' }],
      interfaceEquipment: [{ id: 'interfaceEquipment1' }],
      aspiratingUnits: [{ id: 'aspiratingUnits1' }],
      testEquipment: [{ id: 'testEquipment1' }],
      relatedStandards: [{ id: 'relatedStandards1' }],
      detectors: [{}],
      callPoints: [{}],
      sounders: [{}],
      repeaterPanels: [{}],
    },
  },
  'fire-alarm-g3': {
    exportName: 'formatFireAlarmG3Json',
    reportId: 'FAG3-PROBE',
    data: {
      ...COMMON,
      defectsFound: [{}],
      soundLevelReadings: [{}],
      testEquipment: [{}],
    },
  },
  'fire-alarm-g6': {
    exportName: 'formatFireAlarmG6Json',
    reportId: 'FAG6-PROBE',
    data: {
      ...COMMON,
      defectsFound: [{}],
      previousDefects: [{}],
      sampledDevices: [{ ref: 'D-001', zone: '1', result: 'Pass' }],
      soundLevelReadings: [{}],
      testEquipment: [{}],
      photos: [{}],
    },
  },
  'eic': {
    exportName: 'formatEicJson',
    reportId: 'EIC-PROBE',
    data: {
      ...COMMON,
      defects: [{ id: 'defects1' }],
      inspectionItems: [{ id: 'i1', item: 'Condition of consumer unit', outcome: 'satisfactory' }],
      observations: [
        { id: 'o1', item: 'Sample observation', defectCode: 'C3',
          description: 'Sample description', recommendation: 'Sample recommendation' },
      ],
      scheduleOfTests: [CIRCUIT],
      distributionBoards: [{ id: 'main', name: 'DB1', reference: 'DB1', location: 'Hallway' }],
    },
  },
  'fire-alarm-g7': {
    exportName: 'formatFireAlarmG7Json',
    reportId: 'FAG7-PROBE',
    data: {
      ...COMMON,
      modificationDefects: [{}],
    },
  },

  // Named `formatDisconnectionCertificatePayload`, not `format*Json` — which is
  // why the export sweep missed it and this cert sat on static analysis.
  disconnection: {
    exportName: 'formatDisconnectionCertificatePayload',
    reportId: 'DISC-PROBE',
    data: {
      ...COMMON,
      disconnectionReason: 'Unsafe installation — immediate danger',
      disconnectionDate: '2026-08-07',
      equipmentDisconnected: 'Consumer unit and all final circuits',
      locationOfDisconnection: 'Meter position, hallway',
      reconnectionRequirements: 'Full rewire and EIC before reconnection',
    },
  },
};

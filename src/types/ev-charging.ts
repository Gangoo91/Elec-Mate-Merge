/**
 * EV Charging Certificate Types (IET Code of Practice)
 * EVCP installation certificate with OZEV compliance
 */

// Charger types as per IET CoP
export type ChargerMode = 'Mode2' | 'Mode3' | 'Mode4';
export type ChargerConnection = 'tethered' | 'socketed';
export type PhaseType = 1 | 3;

// Protection device types
export type ProtectionDeviceType = 'MCB' | 'RCBO' | 'MCCB' | 'BS88' | 'BS3036';
export type ProtectionDeviceCurve = 'B' | 'C' | 'D';

// Earthing arrangements
export type EarthingArrangement = 'TN-C-S' | 'TN-S' | 'TT';

export interface EVChargingFormData {
  // Certificate metadata
  certificateNumber: string;
  installationDate: string;

  // Client details
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;

  // Vehicle details (optional)
  vehicleMake: string;
  vehicleMakeCustom: string;
  vehicleModel: string;
  vehicleRegistration: string;

  // Installation address
  installationAddress: string;
  sameAsClientAddress: boolean;
  installationType: 'domestic' | 'commercial' | 'public';

  // Charger details
  chargerMake: string;
  chargerModel: string;
  chargerSerial: string;
  chargerType: ChargerMode | '';
  chargerConnection: ChargerConnection | '';
  powerRating: number; // kW
  phases: PhaseType;
  ratedCurrent: number; // A
  socketType: string; // Type 1, Type 2, CCS, CHAdeMO

  // Electrical supply details
  supplyVoltage: number;
  supplyPhases: 'single' | 'three';
  earthingArrangement: EarthingArrangement | '';
  ze: string;
  prospectiveFaultCurrent: string;
  externalLoopImpedance: string;

  // PME considerations — Reg 722.411.4.1
  isPME: boolean;
  /** One of the methods (b)-(e) of Reg 722.411.4.1. Indent (a) was deleted by
   *  A2:2022. Nothing else is a permitted method. */
  pmeEarthingMeasures: string;
  earthElectrodeInstalled: boolean;
  earthElectrodeResistance: string;
  /**
   * 722.411.4.1 only bites on a charge point "located outdoors or that might
   * reasonably be expected to be used to charge a vehicle located outdoors".
   * Without this the certificate cannot record the condition that triggers the
   * whole requirement.
   */
  vehicleChargedOutdoors: boolean | null;
  /**
   * 722.411.4.1: protective conductors and exposed-conductive-parts downstream
   * of a device provided for (c), (d) or (e) shall have NO connection to the
   * protective conductors of any circuit not on the same device, nor to ANY
   * extraneous-conductive-part. Routinely got wrong on open-PEN installs and
   * there was nowhere to record it.
   */
  openPENSegregationConfirmed: boolean;

  // O-PEN device. NOT mandatory: it is method (c)/(d)/(e) of Reg 722.411.4.1,
  // and an earth electrode under (b) is an equally valid alternative.
  openPENDeviceFitted: boolean;
  /**
   * Separate device, or built into the charge point?
   *
   * Reg 722.411.4.1 says of methods (c), (d) and (e): "Equivalent means of
   * functionality could be included within the charging equipment." Most modern
   * units — Zappi, Ohme, Easee — do exactly that, and the form only allowed a
   * separate device with its own make, model and serial. There was no way to
   * record the commonest real installation.
   */
  openPENDeviceLocation: 'separate' | 'integral' | '';
  openPENManufacturer: string;
  openPENModel: string;
  openPENSerial: string;
  openPENTestVerified: boolean;

  /**
   * Main protective bonding — Reg 411.3.1.2 / 544.1.1.
   *
   * Absent from this certificate entirely, so an EV EIC could be issued with
   * nothing said about the bonding at all. Same shape as the EIC's own fields.
   */
  mainBondingVerified: boolean;
  mainBondingNA: boolean;
  mainBondingSize: string; // csa in mm²
  mainBondingLocations: string; // comma-separated: water, gas, oil, structural-steel, other
  earthingConductorCsa: string; // mm² — Reg 542.3 / Table 54.1

  /**
   * Reg 722.312.2.1 — "A circuit supplying charging equipment for electric
   * vehicles shall not include a PEN conductor." A design decision with no
   * field to record it until now.
   */
  noPenInFinalCircuit: boolean;

  /**
   * Regs 722.410.3.5 and 722.410.3.6 — obstacles, placing out of reach,
   * non-conducting location and earth-free local equipotential bonding shall
   * not be used. One confirmation covers all four; they are prohibitions, not
   * choices.
   */
  prohibitedMeasuresNotUsed: boolean;

  /**
   * Reg 722.413.1.2 — where electrical separation is the protective measure it
   * is limited to ONE vehicle from ONE unearthed source, through a fixed
   * isolating transformer to BS EN 61558-2-4. Only meaningful when the
   * separation route is selected.
   */
  separationSingleVehicle: boolean;
  separationTransformerStandard: string;

  /** ENA Connect Direct reference, for the DNO submission. */
  connectDirectReference: string;

  /**
   * Next inspection — the certificate had none at all.
   *
   * Practice (Sean Mulcahy, 9 Aug 2026): the first certificate is issued with a
   * 1-year next inspection, and an annual EICR after that. An EIC without a
   * next-inspection date is incomplete, and this one had nowhere to put it.
   */
  nextInspectionInterval: string; // months
  nextInspectionDate: string; // ISO date

  // Distribution board details
  dbLocation: string;
  dbManufacturer: string;
  dbMainSwitchRating: string;

  // Circuit details
  dedicatedCircuit: boolean;
  cableRoute: string; // buried, external, internal, duct
  circuitDesignation: string;
  cableType: string;
  cableSize: number; // mm²
  cableLength: number; // m
  installationMethod: string;

  // Protection device
  protectionDeviceType: ProtectionDeviceType | '';
  protectionDeviceRating: number; // A
  protectionDeviceCurve: ProtectionDeviceCurve | '';

  // RCD protection
  rcdType: 'Type A' | 'Type B' | 'Type A + 6mA DC' | '';
  rcdRating: number; // mA
  rcdIntegral: boolean; // Built into charger

  // SPD — surge protective device (A4:2026 Appendix 6 recording requirement)
  spdFitted: 'yes' | 'no' | 'na' | '';
  spdType: string; // e.g. Type 2, Type 1+2, Type 2+3
  spdLocation: string; // e.g. at consumer unit / at charge point
  spdStatusOk: boolean; // status indicator showing healthy

  // AFDD — arc fault detection device (A4:2026 recording; per 722.421.1.7.201
  // not required for EV equipment conforming to BS EN 61851 series)
  afddFitted: 'yes' | 'no' | 'not-required' | '';
  afddType: string; // BS EN standard / rating

  // External influences (722.512.2) — enclosure protection ratings
  ipRating: string; // e.g. IP54, IP65
  ikRating: string; // e.g. IK08, IK10 (mechanical impact, optional)

  // Maximum demand assessment (722.311.201) — A4:2026 permits load curtailment
  // to be taken into account when determining maximum demand.
  maxDemandExisting: string; // existing installation demand (A)
  maxDemandEv: string; // EV charger continuous load (A, no diversity)
  maxDemandTotal: string; // total assessed demand (A)
  supplyCapacity: string; // main fuse / supply rating (A)

  // Test results
  testResults: {
    r1r2: string;
    r2: string;
    zs: string;
    maxZs: string;
    insulationResistance: string;
    polarity: 'correct' | 'incorrect' | '';
    rcdTripTime: string; // ms
    rcdTripTimeX5: string; // ms
    earthElectrodeRa: string;
    functionalTest: 'pass' | 'fail' | '';
    loadTest: 'pass' | 'fail' | '';
    loadTestCurrent: string;
    voltageDrop?: string;
    phaseRotation?: 'L1-L2-L3' | 'L1-L3-L2' | 'N/A' | '';
    continuityPE?: string;
    rcdTestButton?: 'pass' | 'fail' | '';
    ambientTemperature?: string;
  };

  // Test equipment
  testInstrumentModel: string;
  testInstrumentSerial: string;
  testInstrumentCalDate: string;

  // OZEV Grant details
  ozevGrantApplicable: boolean;
  ozevGrantRef: string;
  ozevScheme: 'EVHS' | 'WCS' | 'OZEV-flat' | ''; // Electric Vehicle Homecharge Scheme, Workplace Charging Scheme

  // DNO notification
  dnoNotified: boolean;
  dnoNotificationDate: string;
  dnoReference: string;
  g98Notification: boolean;
  g99Application: boolean;

  // Smart functionality
  smartChargingEnabled: boolean;
  loadManagement: boolean;
  loadManagementType: string;

  // User instructions
  userInstructionsProvided: boolean;
  operatingManualProvided: boolean;

  // Installer declaration
  installerName: string;
  installerCompany: string;
  installerQualifications: string;
  installerScheme: string; // NAPIT, NICEIC, ELECSA, etc.
  installerSchemeNumber: string;
  installerSignature: string;
  installerDate: string;

  // Compliance
  bs7671Compliance: boolean;
  ietCopCompliance: boolean;
  buildingRegsCompliance: boolean;

  // Building regulations
  buildingRegsRequired: boolean;
  buildingRegsViaScheme: boolean;
  buildingRegsSubmitted: boolean;

  // Verification checklist
  chargerPowerUpVerified: boolean;
  ledIndicatorsVerified: boolean;
  cableSecureVerified: boolean;
  earthContinuityVerified: boolean;

  // Additional notes
  additionalNotes: string;
  specialConditions: string;

  // Form state
  completedSections: { [key: string]: boolean };
  status: 'draft' | 'in-progress' | 'completed';
}

// Default form data factory
export const getDefaultEVChargingFormData = (): EVChargingFormData => ({
  certificateNumber: '',
  installationDate: new Date().toISOString().split('T')[0],

  clientName: '',
  clientAddress: '',
  clientTelephone: '',
  clientEmail: '',

  vehicleMake: '',
  vehicleMakeCustom: '',
  vehicleModel: '',
  vehicleRegistration: '',

  installationAddress: '',
  sameAsClientAddress: false,
  installationType: 'domestic',

  chargerMake: '',
  chargerModel: '',
  chargerSerial: '',
  chargerType: '',
  chargerConnection: '',
  powerRating: 7.4,
  phases: 1,
  ratedCurrent: 32,
  socketType: 'Type 2',

  supplyVoltage: 230,
  supplyPhases: 'single',
  earthingArrangement: '',
  ze: '',
  prospectiveFaultCurrent: '',
  externalLoopImpedance: '',

  isPME: true,
  pmeEarthingMeasures: '',
  earthElectrodeInstalled: false,
  earthElectrodeResistance: '',
  vehicleChargedOutdoors: null,
  openPENSegregationConfirmed: false,
  openPENDeviceLocation: '',
  mainBondingVerified: false,
  mainBondingNA: false,
  mainBondingSize: '',
  mainBondingLocations: '',
  earthingConductorCsa: '',
  noPenInFinalCircuit: false,
  prohibitedMeasuresNotUsed: false,
  separationSingleVehicle: false,
  separationTransformerStandard: '',
  connectDirectReference: '',
  nextInspectionInterval: '12',
  nextInspectionDate: '',

  openPENDeviceFitted: false,
  openPENManufacturer: '',
  openPENModel: '',
  openPENSerial: '',
  openPENTestVerified: false,

  dbLocation: '',
  dbManufacturer: '',
  dbMainSwitchRating: '',

  dedicatedCircuit: true,
  cableRoute: '',
  circuitDesignation: 'EV Charger',
  cableType: '',
  cableSize: 6,
  cableLength: 0,
  installationMethod: '',

  protectionDeviceType: '',
  protectionDeviceRating: 32,
  protectionDeviceCurve: 'B',

  rcdType: '',
  rcdRating: 30,
  rcdIntegral: false,

  spdFitted: '',
  spdType: '',
  spdLocation: '',
  spdStatusOk: false,

  afddFitted: '',
  afddType: '',

  ipRating: '',
  ikRating: '',

  maxDemandExisting: '',
  maxDemandEv: '',
  maxDemandTotal: '',
  supplyCapacity: '',

  testResults: {
    r1r2: '',
    r2: '',
    zs: '',
    maxZs: '',
    insulationResistance: '',
    polarity: '',
    rcdTripTime: '',
    rcdTripTimeX5: '',
    earthElectrodeRa: '',
    functionalTest: '',
    loadTest: '',
    loadTestCurrent: '',
    voltageDrop: '',
    phaseRotation: '',
    continuityPE: '',
    rcdTestButton: '',
    ambientTemperature: '',
  },

  testInstrumentModel: '',
  testInstrumentSerial: '',
  testInstrumentCalDate: '',

  ozevGrantApplicable: false,
  ozevGrantRef: '',
  ozevScheme: '',

  dnoNotified: false,
  dnoNotificationDate: '',
  dnoReference: '',
  g98Notification: false,
  g99Application: false,

  smartChargingEnabled: false,
  loadManagement: false,
  loadManagementType: '',

  userInstructionsProvided: false,
  operatingManualProvided: false,

  installerName: '',
  installerCompany: '',
  installerQualifications: '',
  installerScheme: '',
  installerSchemeNumber: '',
  installerSignature: '',
  installerDate: new Date().toISOString().split('T')[0],

  bs7671Compliance: false,
  ietCopCompliance: false,
  buildingRegsCompliance: false,

  chargerPowerUpVerified: false,
  ledIndicatorsVerified: false,
  cableSecureVerified: false,
  earthContinuityVerified: false,

  buildingRegsRequired: false,
  buildingRegsViaScheme: false,
  buildingRegsSubmitted: false,

  additionalNotes: '',
  specialConditions: '',

  completedSections: {},
  status: 'draft',
});

/**
 * Heat Pump Commissioning Certificate Types
 * MCS MIS 3005-I:2025 (heat pump installation) + BS 7671:2018+A4:2026
 *
 * Field model transcribed from MIS 3005 Appendix A (Example Commissioning
 * Checklist). Sits in the Renewables cert group alongside Solar PV / BESS.
 */

export type HeatPumpType = 'ASHP' | 'GSHP' | 'WSHP' | 'exhaust-air' | 'hybrid' | '';
export type Phase = 'single' | 'three' | '';
export type RunningMode = 'Auto' | 'Manual' | 'Eco' | '';
export type YesNo = 'yes' | 'no' | '';
export type YesNoNa = 'yes' | 'no' | 'n/a' | '';

/** Insulation / continuity electrical readings taken pre-commissioning */
export interface HeatPumpElectricalChecks {
  supplyPhase: Phase;
  incomingVoltage: string; // V
  // Resistance to earth (L-E), Ω + per-line volt readings
  resistanceToEarth: string; // Ω
  l1n: string;
  l1e: string;
  ne: string;
  // Short circuit test (L-N), Ω
  shortCircuit: string; // Ω
  l2n: string;
  l2e: string;
  l1l2: string;
  visualCondition: YesNo;
  l3n: string;
  l3e: string;
  l1l3: string;
  sensorsChecked: YesNo;
  l2l3: string;
}

/** Heat pump control parameter settings */
export interface HeatPumpControlParameters {
  runningMode: RunningMode;
  heatCurveSetting: string;
  maxFlowTemp: string; // °C
  maxAtOutdoorTemp: string; // °C
  minFlowTemp: string; // °C
  minAtOutdoorTemp: string; // °C
  heatStopTemp: string; // °C
  compStart: string; // min
  collectorPumpSetting: string;
  chPumpSetting: string;
  dhwStart: string; // °C
  dhwStop: string; // °C
  legionellaCycleTemp: string; // °C
  legionellaFreqDays: string;
  legionellaHeatSource: string;
  auxiliaryHeatingType: string;
  maxAuxiliaryPower: string; // kW
  auxiliaryBivalentPoint: string; // °C
  auxHeatMeterReading: string; // kWh
}

/** Live running data captured at commissioning */
export interface HeatPumpRunningData {
  outdoorTemp: string; // °C
  indoorTemp: string; // °C
  flowTemp: string; // °C
  returnTemp: string; // °C
  sourceInTemp: string; // °C
  sourceOutTemp: string; // °C
  dischargeTemp: string; // °C
  suctionTemp: string; // °C
  superheat: string; // K
  subcooling: string; // K
  tevInletTemp: string; // °C
  dhwTemp: string; // °C
  hpRunningHours: string;
  dhwRunningHours: string;
  auxHeaterRunningHours: string;
  kwhMeter1: string;
  kwhMeter2: string;
  heatMeterReadingMwh: string;
}

/** ASHP-specific absorber checks */
export interface HeatPumpASHP {
  antifreezeMakeType: string;
  freezeProtectionTemp: string; // °C
  clearanceAroundUnit: YesNo;
  installedOnSuitableBase: YesNo;
  antiVibrationFeet: YesNoNa;
  condensateDrainageSuitable: YesNo;
  evaporatorClearOfDebris: YesNo;
  insulatedVapourSealed: YesNo;
  // Split systems only
  splitSystemFGasCharged: YesNoNa;
  refrigerantType: string;
  refrigerantChargeKg: string;
  // Clearances (mm)
  clearanceBack: string;
  clearanceFront: string;
  clearanceRight: string;
  clearanceLeft: string;
  clearanceBelow: string;
}

/** GSHP-specific ground collector checks */
export interface HeatPumpGSHP {
  collectorType: string;
  totalLoopsBoreholes: string;
  totalCollectorLength: string; // m
  collectorPipeDiameter: string; // mm
  headerPipeDiameter: string; // mm
  pressureTestedBsEn805: YesNo;
  systemFlushedPurged: YesNo;
  biocideUsed: YesNoNa;
  totalHeaderLength: string; // m
  transferFluidMakeType: string;
  freezeProtectionTemp: string; // °C
  expansionVesselPrecharge: string; // bar
  collectorSystemPressure: string; // bar
  insulationVapourSealed: YesNo;
  collectorInstalledToDesign: YesNo;
}

/** Central heating / distribution system checks */
export interface HeatPumpCentralHeating {
  emitterTypes: string;
  systemPressure: string; // bar
  expansionVesselPrecharge: string; // bar
  safetyReliefValveSetting: string; // bar
  bufferStoreVolume: string; // litres
  circulationPumpSetting: string;
  heatingDeltaT: string; // K
  inhibitorAntifreezeUsed: YesNo;
  strainersFiltersClear: YesNo;
  htgSystemPurgedOfAir: YesNo;
  htgSystemFlushedCleaned: YesNo;
  dhwCylinderVolume: string; // litres
  htgSystemCleanerUsed: YesNo;
  htgSystemWaterTreated: YesNo;
  g3CommissioningCertCompleted: YesNoNa;
  systemInstalledAsPerDesign: YesNo;
  emittersHeatEvenly: YesNo;
}

/**
 * Design & performance headline figures for the MCS certificate.
 * Sourced from the MCS 031 Performance Estimate — these are what the MID
 * certificate and the customer's Boiler Upgrade Scheme grant need.
 */
export interface HeatPumpDesign {
  designHeatLossKw: string; // property design heat loss (kW)
  designFlowTemp: string; // °C
  designOutdoorTemp: string; // °C (e.g. -2.2)
  ratedHeatOutputKw: string; // heat pump rated output at design condition (kW)
  scop: string; // seasonal coefficient of performance
  spaceHeatingDemandKwh: string; // annual (kWh)
  dhwDemandKwh: string; // annual (kWh)
  estimatedAnnualGenerationKwh: string; // total estimated generation (kWh/yr)
  mcsProductReference: string; // MCS Product Database reference for the unit
  heatEmitterGuideCompliant: 'yes' | 'no' | ''; // MCS 021 Heat Emitter Guide
}

/** Heating system controls */
export interface HeatPumpControls {
  htgControlsType: string;
  controlsSetupPerDesign: YesNo;
  controlsDemonstratedToCustomer: YesNo;
  hpControlType: string; // demand or degree minutes
  htgControlType: string; // HP or 3rd party
  dhwControlType: string; // HP or 3rd party
  customerDocumentationProvided: YesNo; // MIS 3005 D&I docs handed over
}

export interface HeatPumpFormData {
  // Certificate metadata
  certificateNumber: string;
  installationDate: string;
  commissioningDate: string;

  // Customer details
  customerName: string;
  installationAddress: string;
  installationPostcode: string;
  customerEmail: string;

  // Company / technician
  companyName: string;
  jobReference: string;
  technicianName: string;
  contactNumber: string;
  companyEmail: string;

  // Product information
  heatPumpType: HeatPumpType;
  manufacturer: string;
  hpModelNo: string;
  hpSerialNo: string;
  indoorModelNo: string;
  indoorSerialNo: string;
  interfaceModelNo: string;
  interfaceSerialNo: string;
  installedPerManufacturer: YesNo;

  design: HeatPumpDesign;
  electrical: HeatPumpElectricalChecks;
  controlParameters: HeatPumpControlParameters;
  runningData: HeatPumpRunningData;
  ashp: HeatPumpASHP;
  gshp: HeatPumpGSHP;
  centralHeating: HeatPumpCentralHeating;
  controls: HeatPumpControls;

  technicianComments: string;

  // MCS declaration + linked certs (cross-references to other docs)
  installerMcsNumber: string; // installer's MCS certification number (on every MCS cert)
  linkedEicRef: string; // BS 7671 electrical installation cert reference
  linkedG3CertRef: string; // unvented cylinder G3 cert
  mcsCertificateNumber: string; // populated on MID registration
  recommendedNextInspectionYears: string;

  // Sign-off
  engineerName: string;
  engineerSignature: string;
  signatureDate: string;
}

const emptyElectrical = (): HeatPumpElectricalChecks => ({
  supplyPhase: '',
  incomingVoltage: '',
  resistanceToEarth: '',
  l1n: '',
  l1e: '',
  ne: '',
  shortCircuit: '',
  l2n: '',
  l2e: '',
  l1l2: '',
  visualCondition: '',
  l3n: '',
  l3e: '',
  l1l3: '',
  sensorsChecked: '',
  l2l3: '',
});

const emptyControlParameters = (): HeatPumpControlParameters => ({
  runningMode: '',
  heatCurveSetting: '',
  maxFlowTemp: '',
  maxAtOutdoorTemp: '',
  minFlowTemp: '',
  minAtOutdoorTemp: '',
  heatStopTemp: '',
  compStart: '',
  collectorPumpSetting: '',
  chPumpSetting: '',
  dhwStart: '',
  dhwStop: '',
  legionellaCycleTemp: '',
  legionellaFreqDays: '',
  legionellaHeatSource: '',
  auxiliaryHeatingType: '',
  maxAuxiliaryPower: '',
  auxiliaryBivalentPoint: '',
  auxHeatMeterReading: '',
});

const emptyRunningData = (): HeatPumpRunningData => ({
  outdoorTemp: '',
  indoorTemp: '',
  flowTemp: '',
  returnTemp: '',
  sourceInTemp: '',
  sourceOutTemp: '',
  dischargeTemp: '',
  suctionTemp: '',
  superheat: '',
  subcooling: '',
  tevInletTemp: '',
  dhwTemp: '',
  hpRunningHours: '',
  dhwRunningHours: '',
  auxHeaterRunningHours: '',
  kwhMeter1: '',
  kwhMeter2: '',
  heatMeterReadingMwh: '',
});

const emptyASHP = (): HeatPumpASHP => ({
  antifreezeMakeType: '',
  freezeProtectionTemp: '',
  clearanceAroundUnit: '',
  installedOnSuitableBase: '',
  antiVibrationFeet: '',
  condensateDrainageSuitable: '',
  evaporatorClearOfDebris: '',
  insulatedVapourSealed: '',
  splitSystemFGasCharged: '',
  refrigerantType: '',
  refrigerantChargeKg: '',
  clearanceBack: '',
  clearanceFront: '',
  clearanceRight: '',
  clearanceLeft: '',
  clearanceBelow: '',
});

const emptyGSHP = (): HeatPumpGSHP => ({
  collectorType: '',
  totalLoopsBoreholes: '',
  totalCollectorLength: '',
  collectorPipeDiameter: '',
  headerPipeDiameter: '',
  pressureTestedBsEn805: '',
  systemFlushedPurged: '',
  biocideUsed: '',
  totalHeaderLength: '',
  transferFluidMakeType: '',
  freezeProtectionTemp: '',
  expansionVesselPrecharge: '',
  collectorSystemPressure: '',
  insulationVapourSealed: '',
  collectorInstalledToDesign: '',
});

const emptyCentralHeating = (): HeatPumpCentralHeating => ({
  emitterTypes: '',
  systemPressure: '',
  expansionVesselPrecharge: '',
  safetyReliefValveSetting: '',
  bufferStoreVolume: '',
  circulationPumpSetting: '',
  heatingDeltaT: '',
  inhibitorAntifreezeUsed: '',
  strainersFiltersClear: '',
  htgSystemPurgedOfAir: '',
  htgSystemFlushedCleaned: '',
  dhwCylinderVolume: '',
  htgSystemCleanerUsed: '',
  htgSystemWaterTreated: '',
  g3CommissioningCertCompleted: '',
  systemInstalledAsPerDesign: '',
  emittersHeatEvenly: '',
});

const emptyDesign = (): HeatPumpDesign => ({
  designHeatLossKw: '',
  designFlowTemp: '',
  designOutdoorTemp: '',
  ratedHeatOutputKw: '',
  scop: '',
  spaceHeatingDemandKwh: '',
  dhwDemandKwh: '',
  estimatedAnnualGenerationKwh: '',
  mcsProductReference: '',
  heatEmitterGuideCompliant: '',
});

const emptyControls = (): HeatPumpControls => ({
  htgControlsType: '',
  controlsSetupPerDesign: '',
  controlsDemonstratedToCustomer: '',
  hpControlType: '',
  htgControlType: '',
  dhwControlType: '',
  customerDocumentationProvided: '',
});

export const getDefaultHeatPumpFormData = (): HeatPumpFormData => ({
  certificateNumber: '',
  installationDate: '',
  commissioningDate: '',
  customerName: '',
  installationAddress: '',
  installationPostcode: '',
  customerEmail: '',
  companyName: '',
  jobReference: '',
  technicianName: '',
  contactNumber: '',
  companyEmail: '',
  heatPumpType: '',
  manufacturer: '',
  hpModelNo: '',
  hpSerialNo: '',
  indoorModelNo: '',
  indoorSerialNo: '',
  interfaceModelNo: '',
  interfaceSerialNo: '',
  installedPerManufacturer: '',
  design: emptyDesign(),
  electrical: emptyElectrical(),
  controlParameters: emptyControlParameters(),
  runningData: emptyRunningData(),
  ashp: emptyASHP(),
  gshp: emptyGSHP(),
  centralHeating: emptyCentralHeating(),
  controls: emptyControls(),
  technicianComments: '',
  installerMcsNumber: '',
  linkedEicRef: '',
  linkedG3CertRef: '',
  mcsCertificateNumber: '',
  recommendedNextInspectionYears: '',
  engineerName: '',
  engineerSignature: '',
  signatureDate: '',
});

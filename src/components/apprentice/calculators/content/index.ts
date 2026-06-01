/**
 * Registry of grounded editorial content, keyed by calculator slug.
 *
 * Keys MUST match the `value` of the corresponding entry in
 * `CalculatorSelector.tsx`. A missing entry degrades gracefully — the
 * calculator simply renders without the editorial layer (see
 * `getCalculatorContent`), so partial rollout never breaks a page.
 *
 * Content files are added one per calculator as they are grounded. Import
 * them below and add to the map.
 */
import type { CalculatorContent } from './types';

import { voltageDropContent } from './voltage-drop';
import { adiabaticContent } from './adiabatic';
import { zsValuesContent } from './zs-values';
import { earthFaultLoopContent } from './earth-fault-loop';
import { rcdTripTimeContent } from './rcd-trip-time';
import { pfcContent } from './pfc';
import { solarPvContent } from './solar-pv';
import { heatPumpContent } from './heat-pump';
import { evChargingContent } from './ev-charging';
import { evseLoadContent } from './evse-load';
import { batteryStorageContent } from './battery-storage';
import { windPowerContent } from './wind-power';
import { offGridSystemContent } from './off-grid-system';
import { gridTieInverterContent } from './grid-tie-inverter';
import { feedInTariffContent } from './feed-in-tariff';
import { microHydroContent } from './micro-hydro';
import { solarArrayContent } from './solar-array';
import { cableSizeContent } from './cable-size';
import { cableDeratingContent } from './cable-derating';
import { diversityFactorContent } from './diversity-factor';
import { maximumDemandContent } from './maximum-demand';
import { conduitFillContent } from './conduit-fill';
import { trunkingSizeContent } from './trunking-size';
import { ohmsLawContent } from './ohms-law';
import { acPowerContent } from './ac-power';
import { basicAcCircuitContent } from './basic-ac-circuit';
import { powerFactorContent } from './power-factor';
import { threePhasePowerContent } from './three-phase-power';
import { starDeltaContent } from './star-delta';
import { r1r2Content } from './r1r2';
import { ringCircuitContent } from './ring-circuit';
import { phaseRotationContent } from './phase-rotation';
import { bs7671ZsLookupContent } from './bs7671-zs-lookup';
import { earthElectrodeContent } from './earth-electrode';
import { faultLevelContent } from './fault-level';
import { selectivityContent } from './selectivity';
import { cableCurrentCapacityContent } from './cable-current-capacity';
import { ipRatingContent } from './ip-rating';
import { energyCostContent } from './energy-cost';
import { unitConverterContent } from './unit-converter';
import { timeMaterialsContent } from './time-materials';
import { resistorColourCodeContent } from './resistor-colour-code';
import { wireGaugeContent } from './wire-gauge';
import { instrumentationContent } from './instrumentation';
import { lumenContent } from './lumen';
import { emergencyLightingContent } from './emergency-lighting';
import { transformerContent } from './transformer-calculator';
import { motorStartingCurrentContent } from './motor-starting-current';
import { ledDriverContent } from './led-driver';
import { batteryBackupContent } from './battery-backup';
import { powerFactorCorrectionContent } from './power-factor-correction';
import { loadContent } from './load';
import { conduitBendingContent } from './conduit-bending';
import { rcdDiscriminationContent } from './rcd-discrimination';
import { circuitBreakerSelectorContent } from './circuit-breaker-selector';
import { arcFlashContent } from './arc-flash';
import { powerQualityContent } from './power-quality';
import { touchStepVoltageContent } from './touch-step-voltage';
import { lightningProtectionContent } from './lightning-protection';
import { dataCentreContent } from './data-centre';
import { generatorSizingContent } from './generator-sizing';
import { marineElectricalContent } from './marine-electrical';
import { swimmingPoolContent } from './swimming-pool';

export const CALCULATOR_CONTENT: Record<string, CalculatorContent> = {
  [voltageDropContent.slug]: voltageDropContent,
  [adiabaticContent.slug]: adiabaticContent,
  [zsValuesContent.slug]: zsValuesContent,
  [earthFaultLoopContent.slug]: earthFaultLoopContent,
  [rcdTripTimeContent.slug]: rcdTripTimeContent,
  [pfcContent.slug]: pfcContent,
  [solarPvContent.slug]: solarPvContent,
  [heatPumpContent.slug]: heatPumpContent,
  [evChargingContent.slug]: evChargingContent,
  [evseLoadContent.slug]: evseLoadContent,
  [batteryStorageContent.slug]: batteryStorageContent,
  [windPowerContent.slug]: windPowerContent,
  [offGridSystemContent.slug]: offGridSystemContent,
  [gridTieInverterContent.slug]: gridTieInverterContent,
  [feedInTariffContent.slug]: feedInTariffContent,
  [microHydroContent.slug]: microHydroContent,
  [solarArrayContent.slug]: solarArrayContent,
  [cableSizeContent.slug]: cableSizeContent,
  [cableDeratingContent.slug]: cableDeratingContent,
  [diversityFactorContent.slug]: diversityFactorContent,
  [maximumDemandContent.slug]: maximumDemandContent,
  [conduitFillContent.slug]: conduitFillContent,
  [trunkingSizeContent.slug]: trunkingSizeContent,
  [ohmsLawContent.slug]: ohmsLawContent,
  [acPowerContent.slug]: acPowerContent,
  [basicAcCircuitContent.slug]: basicAcCircuitContent,
  [powerFactorContent.slug]: powerFactorContent,
  [threePhasePowerContent.slug]: threePhasePowerContent,
  [starDeltaContent.slug]: starDeltaContent,
  [r1r2Content.slug]: r1r2Content,
  [ringCircuitContent.slug]: ringCircuitContent,
  [phaseRotationContent.slug]: phaseRotationContent,
  [bs7671ZsLookupContent.slug]: bs7671ZsLookupContent,
  [earthElectrodeContent.slug]: earthElectrodeContent,
  [faultLevelContent.slug]: faultLevelContent,
  [selectivityContent.slug]: selectivityContent,
  [cableCurrentCapacityContent.slug]: cableCurrentCapacityContent,
  [ipRatingContent.slug]: ipRatingContent,
  [energyCostContent.slug]: energyCostContent,
  [unitConverterContent.slug]: unitConverterContent,
  [timeMaterialsContent.slug]: timeMaterialsContent,
  [resistorColourCodeContent.slug]: resistorColourCodeContent,
  [wireGaugeContent.slug]: wireGaugeContent,
  [instrumentationContent.slug]: instrumentationContent,
  [lumenContent.slug]: lumenContent,
  [emergencyLightingContent.slug]: emergencyLightingContent,
  [transformerContent.slug]: transformerContent,
  [motorStartingCurrentContent.slug]: motorStartingCurrentContent,
  [ledDriverContent.slug]: ledDriverContent,
  [batteryBackupContent.slug]: batteryBackupContent,
  [powerFactorCorrectionContent.slug]: powerFactorCorrectionContent,
  [loadContent.slug]: loadContent,
  [conduitBendingContent.slug]: conduitBendingContent,
  [rcdDiscriminationContent.slug]: rcdDiscriminationContent,
  [circuitBreakerSelectorContent.slug]: circuitBreakerSelectorContent,
  [arcFlashContent.slug]: arcFlashContent,
  [powerQualityContent.slug]: powerQualityContent,
  [touchStepVoltageContent.slug]: touchStepVoltageContent,
  [lightningProtectionContent.slug]: lightningProtectionContent,
  [dataCentreContent.slug]: dataCentreContent,
  [generatorSizingContent.slug]: generatorSizingContent,
  [marineElectricalContent.slug]: marineElectricalContent,
  [swimmingPoolContent.slug]: swimmingPoolContent,
};

/** Returns grounded content for a slug, or undefined if none exists yet. */
export const getCalculatorContent = (slug: string): CalculatorContent | undefined =>
  CALCULATOR_CONTENT[slug];

export type { CalculatorContent } from './types';

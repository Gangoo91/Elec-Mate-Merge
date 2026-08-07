/**
 * Slug → lazily-loaded calculator component.
 *
 * The electrician page imported all 64 EAGERLY — every electrician downloaded
 * sixty-four calculators to open one. (The apprentice page already lazy-loaded
 * them, so the two routes to the same calculators had different bundle costs.)
 *
 * Generated from the switch that used to live in Calculations.tsx, keyed on the
 * same slugs as `src/data/calculators.ts` — a check script asserts the registry
 * and this map stay in step, so adding a calculator to one and forgetting the
 * other fails loudly instead of silently falling back to Ohm's Law.
 */
import { lazy, type ComponentType } from 'react';

export const CALCULATOR_COMPONENTS: Record<string, ComponentType> = {
  'ohms-law': lazy(() => import('@/components/apprentice/calculators/OhmsLawCalculator')),
  'ac-power': lazy(() => import('@/components/apprentice/calculators/ACPowerCalculator')),
  'basic-ac-circuit': lazy(() => import('@/components/apprentice/calculators/BasicACCircuitCalculator')),
  'power-factor': lazy(() => import('@/components/apprentice/calculators/PowerFactorCalculator')),
  'three-phase-power': lazy(() => import('@/components/apprentice/calculators/ThreePhasePowerCalculator')),
  'star-delta': lazy(() => import('@/components/apprentice/calculators/StarDeltaCalculator')),
  'voltage-drop': lazy(() => import('@/components/apprentice/calculators/VoltageDropCalculator')),
  'cable-size': lazy(() => import('@/components/apprentice/calculators/CableSizingCalculator')),
  'load': lazy(() => import('@/components/apprentice/calculators/LoadCalculator')),
  'cable-current-capacity': lazy(() => import('@/components/apprentice/calculators/CableCurrentCapacityCalculator')),
  'cable-derating': lazy(() => import('@/components/apprentice/calculators/CableDeratingCalculator')),
  'conduit-fill': lazy(() => import('@/components/apprentice/calculators/ConduitFillCalculator')),
  'conduit-bending': lazy(() => import('@/components/apprentice/calculators/ConduitBendingCalculator')),
  'diversity-factor': lazy(() => import('@/components/apprentice/calculators/DiversityFactorCalculator')),
  'maximum-demand': lazy(() => import('@/components/apprentice/calculators/MaximumDemandCalculator')),
  'power-factor-correction': lazy(() => import('@/components/apprentice/calculators/PowerFactorCorrectionCalculator')),
  'zs-values': lazy(() => import('@/components/apprentice/calculators/ZsValuesCalculator')),
  'bs7671-zs-lookup': lazy(() => import('@/components/apprentice/calculators/BS7671ZsLookupCalculator')),
  'r1r2': lazy(() => import('@/components/apprentice/calculators/R1R2Calculator')),
  'ring-circuit': lazy(() => import('@/components/apprentice/calculators/RingCircuitCalculator')),
  'earth-fault-loop': lazy(() => import('@/components/apprentice/calculators/EarthFaultLoopCalculator')),
  'phase-rotation': lazy(() => import('@/components/apprentice/calculators/PhaseRotationCalculator')),
  'adiabatic': lazy(() => import('@/components/apprentice/calculators/AdiabaticCalculator')),
  'pfc': lazy(() => import('@/components/apprentice/calculators/PFCCalculator')),
  'rcd-trip-time': lazy(() => import('@/components/apprentice/calculators/RCDTripTimeCalculator')),
  'rcd-discrimination': lazy(() => import('@/components/apprentice/calculators/RCDDiscriminationCalculator')),
  'earth-electrode': lazy(() => import('@/components/apprentice/calculators/EarthElectrodeCalculator')),
  'lumen': lazy(() => import('@/components/apprentice/calculators/LumenCalculator')),
  'led-driver': lazy(() => import('@/components/apprentice/calculators/LEDDriverCalculator')),
  'motor-starting-current': lazy(() => import('@/components/apprentice/calculators/MotorStartingCurrentCalculator')),
  'transformer-calculator': lazy(() => import('@/components/apprentice/calculators/TransformerCalculator')),
  'battery-backup': lazy(() => import('@/components/apprentice/calculators/BatteryBackupCalculator')),
  'solar-pv': lazy(() => import('@/components/apprentice/calculators/SolarPVCalculator')),
  'solar-array': lazy(() => import('@/components/apprentice/calculators/SolarArrayCalculator')),
  'battery-storage': lazy(() => import('@/components/apprentice/calculators/BatteryStorageCalculator')),
  'wind-power': lazy(() => import('@/components/apprentice/calculators/WindPowerCalculator')),
  'grid-tie-inverter': lazy(() => import('@/components/apprentice/calculators/GridTieInverterCalculator')),
  'micro-hydro': lazy(() => import('@/components/apprentice/calculators/MicroHydroCalculator')),
  'off-grid-system': lazy(() => import('@/components/apprentice/calculators/OffGridSystemCalculator')),
  'feed-in-tariff': lazy(() => import('@/components/apprentice/calculators/FeedInTariffCalculator')),
  'heat-pump': lazy(() => import('@/components/apprentice/calculators/HeatPumpCalculator')),
  'ev-charging': lazy(() => import('@/components/apprentice/calculators/EVChargingCalculator')),
  'evse-load': lazy(() => import('@/components/apprentice/calculators/EVSELoadCalculator')),
  'resistor-colour-code': lazy(() => import('@/components/apprentice/calculators/ResistorColourCodeCalculator')),
  'wire-gauge': lazy(() => import('@/components/apprentice/calculators/WireGaugeCalculator')),
  'instrumentation': lazy(() => import('@/components/apprentice/calculators/InstrumentationCalculator')),
  'ip-rating': lazy(() => import('@/components/apprentice/calculators/IPRatingCalculator')),
  'energy-cost': lazy(() => import('@/components/apprentice/calculators/EnergyCostCalculator')),
  'unit-converter': lazy(() => import('@/components/apprentice/calculators/UnitConverterCalculator')),
  'arc-flash': lazy(() => import('@/components/apprentice/calculators/ArcFlashCalculator')),
  'power-quality': lazy(() => import('@/components/apprentice/calculators/PowerQualityCalculator')),
  'emergency-lighting': lazy(() => import('@/components/apprentice/calculators/EmergencyLightingCalculator')),
  'selectivity': lazy(() => import('@/components/apprentice/calculators/SelectivityCalculator')),
  'fault-level': lazy(() => import('@/components/apprentice/calculators/FaultLevelCalculator')),
  'touch-step-voltage': lazy(() => import('@/components/apprentice/calculators/TouchStepVoltageCalculator')),
  'lightning-protection': lazy(() => import('@/components/apprentice/calculators/LightningProtectionCalculator')),
  'data-centre': lazy(() => import('@/components/apprentice/calculators/DataCentreCalculator')),
  'generator-sizing': lazy(() => import('@/components/apprentice/calculators/GeneratorSizingCalculator')),
  'marine-electrical': lazy(() => import('@/components/apprentice/calculators/MarineElectricalCalculator')),
  'swimming-pool': lazy(() => import('@/components/apprentice/calculators/SwimmingPoolCalculator')),
  'time-materials': lazy(() => import('@/components/apprentice/calculators/TimeMaterialsCalculator')),
  'circuit-breaker-selector': lazy(() => import('@/components/apprentice/calculators/CircuitBreakerSelectorCalculator')),
  'trunking-size': lazy(() => import('@/components/apprentice/calculators/TrunkingSizeCalculator')),
};

import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { useState, lazy, Suspense } from "react";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";

// Lazy load all calculators for better performance
const CableSizingCalculator = lazy(() => import("@/components/apprentice/calculators/CableSizingCalculator"));
const OhmsLawCalculator = lazy(() => import("@/components/apprentice/calculators/OhmsLawCalculator"));
const VoltageDropCalculator = lazy(() => import("@/components/apprentice/calculators/VoltageDropCalculator"));
const PowerFactorCalculator = lazy(() => import("@/components/apprentice/calculators/PowerFactorCalculator"));
const LumenCalculator = lazy(() => import("@/components/apprentice/calculators/LumenCalculator"));
const InstrumentationCalculator = lazy(() => import("@/components/apprentice/calculators/InstrumentationCalculator"));
const ZsValuesCalculator = lazy(() => import("@/components/apprentice/calculators/ZsValuesCalculator"));
const AdiabaticCalculator = lazy(() => import("@/components/apprentice/calculators/AdiabaticCalculator"));
const ConduitFillCalculator = lazy(() => import("@/components/apprentice/calculators/ConduitFillCalculator"));
const ResistorColourCodeCalculator = lazy(() => import("@/components/apprentice/calculators/ResistorColourCodeCalculator"));
const RingCircuitCalculator = lazy(() => import("@/components/apprentice/calculators/RingCircuitCalculator"));
const DiversityFactorCalculator = lazy(() => import("@/components/apprentice/calculators/DiversityFactorCalculator"));
const EarthFaultLoopCalculator = lazy(() => import("@/components/apprentice/calculators/EarthFaultLoopCalculator"));
const MaximumDemandCalculator = lazy(() => import("@/components/apprentice/calculators/MaximumDemandCalculator"));
const RCDTripTimeCalculator = lazy(() => import("@/components/apprentice/calculators/RCDTripTimeCalculator"));
const SolarPVCalculator = lazy(() => import("@/components/apprentice/calculators/SolarPVCalculator"));
const BatteryBackupCalculator = lazy(() => import("@/components/apprentice/calculators/BatteryBackupCalculator"));
const BS7671ZsLookupCalculator = lazy(() => import("@/components/apprentice/calculators/BS7671ZsLookupCalculator"));
const R1R2Calculator = lazy(() => import("@/components/apprentice/calculators/R1R2Calculator"));
const PFCCalculator = lazy(() => import("@/components/apprentice/calculators/PFCCalculator"));
const RCDDiscriminationCalculator = lazy(() => import("@/components/apprentice/calculators/RCDDiscriminationCalculator"));
const CableDeratingCalculator = lazy(() => import("@/components/apprentice/calculators/CableDeratingCalculator"));
const LoadCalculator = lazy(() => import("@/components/apprentice/calculators/LoadCalculator"));
// Phase 1 New Calculators
const EnergyCostCalculator = lazy(() => import("@/components/apprentice/calculators/EnergyCostCalculator"));
const UnitConverterCalculator = lazy(() => import("@/components/apprentice/calculators/UnitConverterCalculator"));
const WireGaugeCalculator = lazy(() => import("@/components/apprentice/calculators/WireGaugeCalculator"));
// Phase 2 New Calculators
const ThreePhasePowerCalculator = lazy(() => import("@/components/apprentice/calculators/ThreePhasePowerCalculator"));
const MotorStartingCurrentCalculator = lazy(() => import("@/components/apprentice/calculators/MotorStartingCurrentCalculator"));
const CableCurrentCapacityCalculator = lazy(() => import("@/components/apprentice/calculators/CableCurrentCapacityCalculator"));
const TransformerCalculator = lazy(() => import("@/components/apprentice/calculators/TransformerCalculator"));
const LEDDriverCalculator = lazy(() => import("@/components/apprentice/calculators/LEDDriverCalculator"));
// New Fundamental Calculators
const ACPowerCalculator = lazy(() => import("@/components/apprentice/calculators/ACPowerCalculator"));
const BasicACCircuitCalculator = lazy(() => import("@/components/apprentice/calculators/BasicACCircuitCalculator"));
// Phase Rotation Calculator
const PhaseRotationCalculator = lazy(() => import("@/components/apprentice/calculators/PhaseRotationCalculator"));
// New Renewable Energy Calculators
const BatteryStorageCalculator = lazy(() => import("@/components/apprentice/calculators/BatteryStorageCalculator"));
const HeatPumpCalculator = lazy(() => import("@/components/apprentice/calculators/HeatPumpCalculator"));
const EVChargingCalculator = lazy(() => import("@/components/apprentice/calculators/EVChargingCalculator"));
const ArcFlashCalculator = lazy(() => import("@/components/apprentice/calculators/ArcFlashCalculator"));
const EVSELoadCalculator = lazy(() => import("@/components/apprentice/calculators/EVSELoadCalculator"));
const PowerQualityCalculator = lazy(() => import("@/components/apprentice/calculators/PowerQualityCalculator"));
const EmergencyLightingCalculator = lazy(() => import("@/components/apprentice/calculators/EmergencyLightingCalculator"));
const SwimmingPoolCalculator = lazy(() => import("@/components/apprentice/calculators/SwimmingPoolCalculator"));
const SelectivityCalculator = lazy(() => import("@/components/apprentice/calculators/SelectivityCalculator"));
// Working Renewable Energy Calculators
const DataCentreCalculator = lazy(() => import("@/components/apprentice/calculators/DataCentreCalculator"));
const SolarArrayCalculator = lazy(() => import("@/components/apprentice/calculators/SolarArrayCalculator"));
const WindPowerCalculator = lazy(() => import("@/components/apprentice/calculators/WindPowerCalculator"));
const MicroHydroCalculator = lazy(() => import("@/components/apprentice/calculators/MicroHydroCalculator"));
const GridTieInverterCalculator = lazy(() => import("@/components/apprentice/calculators/GridTieInverterCalculator"));
const OffGridSystemCalculator = lazy(() => import("@/components/apprentice/calculators/OffGridSystemCalculator"));
const FeedInTariffCalculator = lazy(() => import("@/components/apprentice/calculators/FeedInTariffCalculator"));
const MarineElectricalCalculator = lazy(() => import("@/components/apprentice/calculators/MarineElectricalCalculator"));

// Loading fallback component
const CalculatorLoader = () => (
  <div className="flex items-center justify-center p-12 bg-white/5 border border-white/10 rounded-lg border border-elec-yellow/20">
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
      <p className="text-sm text-white/70">Loading calculator...</p>
    </div>
  </div>
);

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");
  const location = useLocation();

  // Determine context based on current path
  const isFromApprenticeHub = location.pathname === "/apprentice/calculators";
  const pageTitle = isFromApprenticeHub ? "Electrical Calculators" : "On-the-Job Calculations";
  const pageDescription = isFromApprenticeHub
    ? "Professional electrical calculations for your studies and work"
    : "Essential calculators for electrical installations and troubleshooting";

  const renderCalculator = () => {
    switch (calculatorType) {
      case "ohms-law":
        return <OhmsLawCalculator />;
      case "ac-power":
        return <ACPowerCalculator />;
      case "basic-ac-circuit":
        return <BasicACCircuitCalculator />;
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "cable-size":
        return <CableSizingCalculator />;
      case "lumen":
        return <LumenCalculator />;
      case "instrumentation":
        return <InstrumentationCalculator />;
      case "zs-values":
        return <ZsValuesCalculator />;
      case "adiabatic":
        return <AdiabaticCalculator />;
      case "conduit-fill":
        return <ConduitFillCalculator />;
      case "resistor-colour-code":
        return <ResistorColourCodeCalculator />;
      case "ring-circuit":
        return <RingCircuitCalculator />;
      case "diversity-factor":
        return <DiversityFactorCalculator />;
      case "earth-fault-loop":
        return <EarthFaultLoopCalculator />;
      case "maximum-demand":
        return <MaximumDemandCalculator />;
      case "rcd-trip-time":
        return <RCDTripTimeCalculator />;
      case "solar-pv":
        return <SolarPVCalculator />;
      case "battery-backup":
        return <BatteryBackupCalculator />;
      case "bs7671-zs-lookup":
        return <BS7671ZsLookupCalculator />;
      case "r1r2":
        return <R1R2Calculator />;
      case "pfc":
        return <PFCCalculator />;
      case "rcd-discrimination":
        return <RCDDiscriminationCalculator />;
      case "cable-derating":
        return <CableDeratingCalculator />;
      case "load":
        return <LoadCalculator />;
      case "phase-rotation":
        return <PhaseRotationCalculator />;
      // Phase 1 New Calculators
      case "energy-cost":
        return <EnergyCostCalculator />;
      case "unit-converter":
        return <UnitConverterCalculator />;
      case "wire-gauge":
        return <WireGaugeCalculator />;
      // Phase 2 New Calculators
      case "three-phase-power":
        return <ThreePhasePowerCalculator />;
      case "motor-starting-current":
        return <MotorStartingCurrentCalculator />;
      case "cable-current-capacity":
        return <CableCurrentCapacityCalculator />;
      case "transformer-calculator":
        return <TransformerCalculator />;
      case "led-driver":
        return <LEDDriverCalculator />;
      // New Renewable Energy Calculators
      case "battery-storage":
        return <BatteryStorageCalculator />;
      case "heat-pump":
        return <HeatPumpCalculator />;
      case "ev-charging":
        return <EVChargingCalculator />;
      case "evse-load":
        return <EVSELoadCalculator />;
      case "arc-flash":
        return <ArcFlashCalculator />;
      case "power-quality":
        return <PowerQualityCalculator />;
      case "emergency-lighting":
        return <EmergencyLightingCalculator />;
      case "swimming-pool":
        return <SwimmingPoolCalculator />;
      case "selectivity":
        return <SelectivityCalculator />;
      // Working Renewable Energy Calculators
      case "solar-array":
        return <SolarArrayCalculator />;
      case "wind-power":
        return <WindPowerCalculator />;
      case "grid-tie-inverter":
        return <GridTieInverterCalculator />;
      case "micro-hydro":
        return <MicroHydroCalculator />;
      case "off-grid-system":
        return <OffGridSystemCalculator />;
      case "feed-in-tariff":
        return <FeedInTariffCalculator />;
      // Working Specialised Applications
      case "data-centre":
        return <DataCentreCalculator />;
      // Working Specialist Locations
      case "marine-electrical":
        return <MarineElectricalCalculator />;
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-sm sm:text-base text-white/70">{pageDescription}</p>
        </div>
        <SmartBackButton />
      </div>

      {/* Calculator Selector */}
      <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />

      {/* Dynamic Calculator with Suspense */}
      <Suspense fallback={<CalculatorLoader />}>
        {renderCalculator()}
      </Suspense>
    </div>
  );
};

export default OnJobCalculations;

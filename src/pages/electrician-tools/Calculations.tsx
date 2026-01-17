
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import OhmsLawCalculator from "@/components/apprentice/calculators/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/apprentice/calculators/VoltageDropCalculator";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import LoadCalculator from "@/components/apprentice/calculators/LoadCalculator";
import AdiabaticCalculator from "@/components/apprentice/calculators/AdiabaticCalculator";
import ZsValuesCalculator from "@/components/apprentice/calculators/ZsValuesCalculator";
import ThreePhasePowerCalculator from "@/components/apprentice/calculators/ThreePhasePowerCalculator";
import ConduitFillCalculator from "@/components/apprentice/calculators/ConduitFillCalculator";
import ConduitBendingCalculator from "@/components/apprentice/calculators/ConduitBendingCalculator";
import StarDeltaCalculator from "@/components/apprentice/calculators/StarDeltaCalculator";
import PowerFactorCorrectionCalculator from "@/components/apprentice/calculators/PowerFactorCorrectionCalculator";
import EarthElectrodeCalculator from "@/components/apprentice/calculators/EarthElectrodeCalculator";
import GeneratorSizingCalculator from "@/components/apprentice/calculators/GeneratorSizingCalculator";
import EnergyCostCalculator from "@/components/apprentice/calculators/EnergyCostCalculator";

// Import all other calculator components
import ACPowerCalculator from "@/components/apprentice/calculators/ACPowerCalculator";
import BasicACCircuitCalculator from "@/components/apprentice/calculators/BasicACCircuitCalculator";
import CableCurrentCapacityCalculator from "@/components/apprentice/calculators/CableCurrentCapacityCalculator";
import CableDeratingCalculator from "@/components/apprentice/calculators/CableDeratingCalculator";
import DiversityFactorCalculator from "@/components/apprentice/calculators/DiversityFactorCalculator";
import MaximumDemandCalculator from "@/components/apprentice/calculators/MaximumDemandCalculator";
import BS7671ZsLookupCalculator from "@/components/apprentice/calculators/BS7671ZsLookupCalculator";
import R1R2Calculator from "@/components/apprentice/calculators/R1R2Calculator";
import RingCircuitCalculator from "@/components/apprentice/calculators/RingCircuitCalculator";
import EarthFaultLoopCalculator from "@/components/apprentice/calculators/EarthFaultLoopCalculator";
import PhaseRotationCalculator from "@/components/apprentice/calculators/PhaseRotationCalculator";
import PFCCalculator from "@/components/apprentice/calculators/PFCCalculator";
import RCDTripTimeCalculator from "@/components/apprentice/calculators/RCDTripTimeCalculator";
import RCDDiscriminationCalculator from "@/components/apprentice/calculators/RCDDiscriminationCalculator";
import LumenCalculator from "@/components/apprentice/calculators/LumenCalculator";
import LEDDriverCalculator from "@/components/apprentice/calculators/LEDDriverCalculator";
import MotorStartingCurrentCalculator from "@/components/apprentice/calculators/MotorStartingCurrentCalculator";
import TransformerCalculator from "@/components/apprentice/calculators/TransformerCalculator";
import BatteryBackupCalculator from "@/components/apprentice/calculators/BatteryBackupCalculator";
import SolarPVCalculator from "@/components/apprentice/calculators/SolarPVCalculator";
import BatteryStorageCalculator from "@/components/apprentice/calculators/BatteryStorageCalculator";
import HeatPumpCalculator from "@/components/apprentice/calculators/HeatPumpCalculator";
import EVChargingCalculator from "@/components/apprentice/calculators/EVChargingCalculator";
// New Renewable Energy Calculators
import SolarArrayCalculator from "@/components/apprentice/calculators/SolarArrayCalculator";
import WindPowerCalculator from "@/components/apprentice/calculators/WindPowerCalculator";
import GridTieInverterCalculator from "@/components/apprentice/calculators/GridTieInverterCalculator";
import MicroHydroCalculator from "@/components/apprentice/calculators/MicroHydroCalculator";
import OffGridSystemCalculator from "@/components/apprentice/calculators/OffGridSystemCalculator";
import FeedInTariffCalculator from "@/components/apprentice/calculators/FeedInTariffCalculator";
import DataCentreCalculator from "@/components/apprentice/calculators/DataCentreCalculator";
import ResistorColourCodeCalculator from "@/components/apprentice/calculators/ResistorColourCodeCalculator";
import WireGaugeCalculator from "@/components/apprentice/calculators/WireGaugeCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import UnitConverterCalculator from "@/components/apprentice/calculators/UnitConverterCalculator";
import MarineElectricalCalculator from "@/components/apprentice/calculators/MarineElectricalCalculator";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import ArcFlashCalculator from "@/components/apprentice/calculators/ArcFlashCalculator";
import EVSELoadCalculator from "@/components/apprentice/calculators/EVSELoadCalculator";
import PowerQualityCalculator from "@/components/apprentice/calculators/PowerQualityCalculator";
import EmergencyLightingCalculator from "@/components/apprentice/calculators/EmergencyLightingCalculator";
import SwimmingPoolCalculator from "@/components/apprentice/calculators/SwimmingPoolCalculator";
import SelectivityCalculator from "@/components/apprentice/calculators/SelectivityCalculator";

const Calculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");

  const renderCalculator = () => {
    switch (calculatorType) {
      // Fundamental Electrical Calculations
      case "ohms-law":
        return <OhmsLawCalculator />;
      case "ac-power":
        return <ACPowerCalculator />;
      case "basic-ac-circuit":
        return <BasicACCircuitCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "three-phase-power":
        return <ThreePhasePowerCalculator />;
      case "star-delta":
        return <StarDeltaCalculator />;
      
      // Design & Installation
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "cable-size":
        return <CableSizingCalculator />;
      case "load":
        return <LoadCalculator />;
      case "cable-current-capacity":
        return <CableCurrentCapacityCalculator />;
      case "cable-derating":
        return <CableDeratingCalculator />;
      case "conduit-fill":
        return <ConduitFillCalculator />;
      case "conduit-bending":
        return <ConduitBendingCalculator />;
      case "diversity-factor":
        return <DiversityFactorCalculator />;
      case "maximum-demand":
        return <MaximumDemandCalculator />;
      case "power-factor-correction":
        return <PowerFactorCorrectionCalculator />;
      
      // Testing & Inspection
      case "zs-values":
        return <ZsValuesCalculator />;
      case "bs7671-zs-lookup":
        return <BS7671ZsLookupCalculator />;
      case "r1r2":
        return <R1R2Calculator />;
      case "ring-circuit":
        return <RingCircuitCalculator />;
      case "earth-fault-loop":
        return <EarthFaultLoopCalculator />;
      case "phase-rotation":
        return <PhaseRotationCalculator />;
      
      // Protection & Safety
      case "adiabatic":
        return <AdiabaticCalculator />;
      case "pfc":
        return <PFCCalculator />;
      case "rcd-trip-time":
        return <RCDTripTimeCalculator />;
      case "rcd-discrimination":
        return <RCDDiscriminationCalculator />;
      case "earth-electrode":
        return <EarthElectrodeCalculator />;

      // Lighting & Power Systems
      case "lumen":
        return <LumenCalculator />;
      case "led-driver":
        return <LEDDriverCalculator />;
      case "motor-starting-current":
        return <MotorStartingCurrentCalculator />;
      case "transformer-calculator":
        return <TransformerCalculator />;
      case "battery-backup":
        return <BatteryBackupCalculator />;
      
      // Renewable Energy
      case "solar-pv":
        return <SolarPVCalculator />;
      case "solar-array":
        return <SolarArrayCalculator />;
      case "battery-storage":
        return <BatteryStorageCalculator />;
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
      case "heat-pump":
        return <HeatPumpCalculator />;
      case "ev-charging":
        return <EVChargingCalculator />;
      case "evse-load":
        return <EVSELoadCalculator />;
      
      // Tools & Components
      case "resistor-colour-code":
        return <ResistorColourCodeCalculator />;
      case "wire-gauge":
        return <WireGaugeCalculator />;
      case "instrumentation":
        return <InstrumentationCalculator />;
      
      // Utilities & Cost Analysis
      case "energy-cost":
        return <EnergyCostCalculator />;
      case "unit-converter":
        return <UnitConverterCalculator />;
      case "arc-flash":
        return <ArcFlashCalculator />;
      case "power-quality":
        return <PowerQualityCalculator />;
      case "emergency-lighting":
        return <EmergencyLightingCalculator />;
      case "selectivity":
        return <SelectivityCalculator />;
      
      // Specialized Applications
      case "data-centre":
        return <DataCentreCalculator />;
      case "generator-sizing":
        return <GeneratorSizingCalculator />;

      // Specialist Locations
      case "marine-electrical":
        return <MarineElectricalCalculator />;
      case "swimming-pool":
        return <SwimmingPoolCalculator />;
      
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elec-dark via-elec-grey to-elec-dark pt-safe">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-safe">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Calculator className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Electrical Calculations
              </h1>
              <p className="text-sm text-white/60">BS 7671 compliant professional tools</p>
            </div>
          </div>
          <Link to="/electrician">
            <Button
              variant="outline"
              className="h-11 px-4 border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Hub
            </Button>
          </Link>
        </header>

        {/* Calculator Selector */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 sm:p-6">
          <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
        </div>

        {/* Dynamic Calculator */}
        <div className="w-full">
          {renderCalculator()}
        </div>
      </main>
    </div>
  );
};

export default Calculations;

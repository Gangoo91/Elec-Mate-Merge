import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import LumenCalculator from "@/components/apprentice/calculators/LumenCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import ZsValuesCalculator from "@/components/apprentice/calculators/ZsValuesCalculator";
import AdiabaticCalculator from "@/components/apprentice/calculators/AdiabaticCalculator";
import ConduitFillCalculator from "@/components/apprentice/calculators/ConduitFillCalculator";
import ResistorColourCodeCalculator from "@/components/apprentice/calculators/ResistorColourCodeCalculator";
import RingCircuitCalculator from "@/components/apprentice/calculators/RingCircuitCalculator";
import DiversityFactorCalculator from "@/components/apprentice/calculators/DiversityFactorCalculator";
import EarthFaultLoopCalculator from "@/components/apprentice/calculators/EarthFaultLoopCalculator";
import MaximumDemandCalculator from "@/components/apprentice/calculators/MaximumDemandCalculator";
import RCDTripTimeCalculator from "@/components/apprentice/calculators/RCDTripTimeCalculator";
import SolarPVCalculator from "@/components/apprentice/calculators/SolarPVCalculator";
import BatteryBackupCalculator from "@/components/apprentice/calculators/BatteryBackupCalculator";
import BS7671ZsLookupCalculator from "@/components/apprentice/calculators/BS7671ZsLookupCalculator";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import R1R2Calculator from "@/components/apprentice/calculators/R1R2Calculator";
import PFCCalculator from "@/components/apprentice/calculators/PFCCalculator";
import RCDDiscriminationCalculator from "@/components/apprentice/calculators/RCDDiscriminationCalculator";
import CableDeratingCalculator from "@/components/apprentice/calculators/CableDeratingCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
// Phase 1 New Calculators
import EnergyCostCalculator from "@/components/apprentice/calculators/EnergyCostCalculator";
import UnitConverterCalculator from "@/components/apprentice/calculators/UnitConverterCalculator";
import WireGaugeCalculator from "@/components/apprentice/calculators/WireGaugeCalculator";
// Phase 2 New Calculators
import ThreePhasePowerCalculator from "@/components/apprentice/calculators/ThreePhasePowerCalculator";
import MotorStartingCurrentCalculator from "@/components/apprentice/calculators/MotorStartingCurrentCalculator";
import CableCurrentCapacityCalculator from "@/components/apprentice/calculators/CableCurrentCapacityCalculator";
import TransformerCalculator from "@/components/apprentice/calculators/TransformerCalculator";
import LEDDriverCalculator from "@/components/apprentice/calculators/LEDDriverCalculator";
// New Fundamental Calculators
import ACPowerCalculator from "@/components/apprentice/calculators/ACPowerCalculator";
import BasicACCircuitCalculator from "@/components/apprentice/calculators/BasicACCircuitCalculator";
// Phase Rotation Calculator
import PhaseRotationCalculator from "@/components/apprentice/calculators/PhaseRotationCalculator";
// New Renewable Energy Calculators
import BatteryStorageCalculator from "@/components/apprentice/calculators/BatteryStorageCalculator";
import HeatPumpCalculator from "@/components/apprentice/calculators/HeatPumpCalculator";
import EVChargingCalculator from "@/components/apprentice/calculators/EVChargingCalculator";
import EnhancedCableSizingCalculator from "@/components/apprentice/calculators/EnhancedCableSizingCalculator";
import ArcFlashCalculator from "@/components/apprentice/calculators/ArcFlashCalculator";
import EVSELoadCalculator from "@/components/apprentice/calculators/EVSELoadCalculator";
import PowerQualityCalculator from "@/components/apprentice/calculators/PowerQualityCalculator";

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");
  const location = useLocation();
  
  // Determine context based on current path
  const isFromApprenticeHub = location.pathname === "/apprentice/calculators";
  const backUrl = isFromApprenticeHub ? "/apprentice" : "/apprentice/on-job-tools";
  const backLabel = isFromApprenticeHub ? "Back to Apprentice Hub" : "Back to Tools";
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
        return <EnhancedCableSizingCalculator />;
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
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
        <Link to={backUrl}>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </Button>
        </Link>
      </div>

      {/* Calculator Selector */}
      <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
      
      {/* Dynamic Calculator */}
      {renderCalculator()}
    </div>
  );
};

export default OnJobCalculations;

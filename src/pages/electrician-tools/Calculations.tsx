
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import CalculatorCards from "@/components/electrician-tools/CalculatorCards";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
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
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import { RotateCw } from "lucide-react";

const Calculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");

  const renderCalculator = () => {
    switch (calculatorType) {
      case "ohms-law":
        return <OhmsLawCalculator />;
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "load":
        return <LoadCalculator />;
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
      case "phase-rotation":
        return <ComingSoonCalculator 
          title="Phase Rotation" 
          icon={RotateCw} 
          description="Determine correct phase sequence for 3-phase motor connections and installations." 
        />;
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electrical Calculations</h1>
          <p className="text-muted-foreground">
            Precise calculations for your electrical installation and maintenance work.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Button>
        </Link>
      </div>

      {/* Calculator Selector - Similar to the apprentice page */}
      <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
      
      {/* Dynamic Calculator Content */}
      {renderCalculator()}

      {/* Additional Calculator Cards */}
      <div className="mt-8">
        <CalculatorCards />
      </div>
    </div>
  );
};

export default Calculations;

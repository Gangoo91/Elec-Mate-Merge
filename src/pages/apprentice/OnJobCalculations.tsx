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
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import R1R2Calculator from "@/components/apprentice/calculators/R1R2Calculator";
import PFCCalculator from "@/components/apprentice/calculators/PFCCalculator";
import RCDDiscriminationCalculator from "@/components/apprentice/calculators/RCDDiscriminationCalculator";
import CableDeratingCalculator from "@/components/apprentice/calculators/CableDeratingCalculator";
import LoadCalculator from "@/components/electrician-tools/LoadCalculator";
import { Calculator, RotateCw, Zap, AlertTriangle } from "lucide-react";
import Badge from "@/components/ui/badge";

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
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "three-phase-load":
        const { ThreePhaseLoadCalculator } = require("@/components/apprentice/calculators/three-phase/ThreePhaseLoadCalculator");
        return <ThreePhaseLoadCalculator />;
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
        return <ComingSoonCalculator 
          title="Phase Rotation" 
          icon={RotateCw} 
          description="Determine correct phase sequence for 3-phase motor connections and installations." 
        />;
      // New calculators - show coming soon for now
      case "motor-starting":
        return <ComingSoonCalculator 
          title="Motor Starting Current" 
          icon={Zap} 
          description="Calculate starting current, inrush effects, and protection requirements for motor installations." 
        />;
      case "transformer-sizing":
        return <ComingSoonCalculator 
          title="Transformer Sizing" 
          icon={Zap} 
          description="Size transformers for load requirements, efficiency, and regulatory compliance." 
        />;
      case "fault-current":
        return <ComingSoonCalculator 
          title="Fault Current Analysis" 
          icon={AlertTriangle} 
          description="Calculate prospective fault currents and short-circuit analysis for protection design." 
        />;
      case "arc-flash":
        return <ComingSoonCalculator 
          title="Arc Flash Analysis" 
          icon={AlertTriangle} 
          description="Assess arc flash hazards and determine PPE requirements for electrical safety." 
        />;
      case "ev-charging":
        return <ComingSoonCalculator 
          title="EV Charging Calculator" 
          icon={Zap} 
          description="Design and size EV charging installations with load management and grid integration." 
        />;
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
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">50 Calculators Available</Badge>
            <Badge variant="outline" className="text-xs">BS 7671 Compliant</Badge>
          </div>
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

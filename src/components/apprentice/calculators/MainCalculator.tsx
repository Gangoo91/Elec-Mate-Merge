
import { lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

// Lazy load all calculator components
const BasicWattageCalculator = lazy(() => import("./BasicWattageCalculator"));
const PowerTriangleCalculator = lazy(() => import("./PowerTriangleCalculator"));
const SinglePhasePowerCalculator = lazy(() => import("./SinglePhasePowerCalculator"));
const PowerConsumptionCalculator = lazy(() => import("./PowerConsumptionCalculator"));
const AppliancePowerCalculator = lazy(() => import("./AppliancePowerCalculator"));
const PowerLossCalculator = lazy(() => import("./PowerLossCalculator"));
const CableTemperatureDeratingCalculator = lazy(() => import("./CableTemperatureDeratingCalculator"));
const PowerQualityCalculator = lazy(() => import("./PowerQualityCalculator"));
const FireAlarmCalculator = lazy(() => import("./FireAlarmCalculator"));
const EmergencyLightingCalculator = lazy(() => import("./EmergencyLightingCalculator"));
const PowerFactorCalculator = lazy(() => import("./PowerFactorCalculator"));
const ThreePhasePowerCalculator = lazy(() => import("./ThreePhasePowerCalculator"));
const CableSizingCalculator = lazy(() => import("./CableSizingCalculator"));
const ZsValuesCalculator = lazy(() => import("./ZsValuesCalculator"));
const AdiabaticCalculator = lazy(() => import("./AdiabaticCalculator"));
const LumenCalculator = lazy(() => import("./LumenCalculator"));
const UnitConverterCalculator = lazy(() => import("./UnitConverterCalculator"));
const EnergyCostCalculator = lazy(() => import("./EnergyCostCalculator"));
const ConduitFillCalculator = lazy(() => import("./ConduitFillCalculator"));
const DiversityFactorCalculator = lazy(() => import("./DiversityFactorCalculator"));
const EarthingSystemCalculator = lazy(() => import("./EarthingSystemCalculator"));
const RCDTripTimeCalculator = lazy(() => import("./RCDTripTimeCalculator"));
const OhmsLawCalculator = lazy(() => import("./OhmsLawCalculator"));
const ComingSoonCalculator = lazy(() => import("./ComingSoonCalculator"));

interface MainCalculatorProps {
  calculatorType: string;
}

const MainCalculator = ({ calculatorType }: MainCalculatorProps) => {
  console.log("MainCalculator rendering type:", calculatorType);

  const LoadingSpinner = () => (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-elec-yellow">Loading calculator...</span>
      </CardContent>
    </Card>
  );

  const ErrorFallback = ({ calculatorName }: { calculatorName: string }) => (
    <Card className="border-red-500/30 bg-red-500/5">
      <CardContent className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-red-400 mb-2">Failed to load calculator</div>
          <div className="text-sm text-muted-foreground">{calculatorName}</div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCalculator = () => {
    try {
      switch (calculatorType) {
        // Fundamental Electrical Calculations
        case "ohms-law":
          return <OhmsLawCalculator />;
        case "ac-power":
          return <ComingSoonCalculator calculatorName="AC Power Calculator" />;
        case "basic-ac-circuit":
          return <ComingSoonCalculator calculatorName="Basic AC Circuit Calculator" />;
        case "power-factor":
          return <PowerFactorCalculator />;
        case "three-phase-power":
          return <ThreePhasePowerCalculator />;
        
        // Power & Wattage Calculators
        case "basic-wattage":
          return <BasicWattageCalculator />;
        case "power-triangle":
          return <PowerTriangleCalculator />;
        case "single-phase-power":
          return <SinglePhasePowerCalculator />;
        case "power-consumption":
          return <PowerConsumptionCalculator />;
        case "appliance-power":
          return <AppliancePowerCalculator />;
        case "power-loss":
          return <PowerLossCalculator />;
        
        // Design & Installation
        case "voltage-drop":
          return <ComingSoonCalculator calculatorName="Voltage Drop Calculator" />;
        case "cable-size":
          return <CableSizingCalculator />;
        case "load":
          return <ComingSoonCalculator calculatorName="Load Assessment Calculator" />;
        case "cable-current-capacity":
          return <ComingSoonCalculator calculatorName="Cable Current Capacity Calculator" />;
        case "cable-derating":
          return <ComingSoonCalculator calculatorName="Cable Derating Calculator" />;
        case "cable-temperature-derating":
          return <CableTemperatureDeratingCalculator />;
        case "conduit-fill":
          return <ConduitFillCalculator />;
        case "diversity-factor":
          return <DiversityFactorCalculator />;
        case "maximum-demand":
          return <ComingSoonCalculator calculatorName="Maximum Demand Calculator" />;
        
        // Testing & Inspection
        case "zs-values":
          return <ZsValuesCalculator />;
        case "bs7671-zs-lookup":
          return <ComingSoonCalculator calculatorName="BS 7671 Zs Lookup Calculator" />;
        case "r1r2":
          return <ComingSoonCalculator calculatorName="R1+R2 Calculation Calculator" />;
        case "ring-circuit":
          return <ComingSoonCalculator calculatorName="Ring Circuit Calculator" />;
        case "earth-fault-loop":
          return <ComingSoonCalculator calculatorName="Earth Fault Loop Calculator" />;
        
        // Protection & Safety
        case "adiabatic":
          return <AdiabaticCalculator />;
        case "pfc":
          return <ComingSoonCalculator calculatorName="Prospective Fault Current Calculator" />;
        case "fault-current":
          return <ComingSoonCalculator calculatorName="Fault Current Calculator" />;
        case "discrimination":
          return <ComingSoonCalculator calculatorName="Protection Discrimination Calculator" />;
        case "rcd-trip-time":
          return <RCDTripTimeCalculator />;
        case "rcd-discrimination":
          return <ComingSoonCalculator calculatorName="RCD Discrimination Calculator" />;
        case "earthing-system":
          return <EarthingSystemCalculator />;
        
        // Lighting & Power Systems
        case "lumen":
          return <LumenCalculator />;
        case "led-driver":
          return <ComingSoonCalculator calculatorName="LED Driver Calculator" />;
        case "emergency-lighting":
          return <EmergencyLightingCalculator />;
        case "motor-starting-current":
          return <ComingSoonCalculator calculatorName="Motor Starting Current Calculator" />;
        case "transformer-calculator":
          return <ComingSoonCalculator calculatorName="Transformer Calculator" />;
        case "battery-backup":
          return <ComingSoonCalculator calculatorName="Battery Backup Calculator" />;
        
        // Power Quality & Harmonics
        case "harmonics":
          return <ComingSoonCalculator calculatorName="Harmonics Calculator" />;
        case "power-quality":
          return <PowerQualityCalculator />;
        
        // Fire & Safety Systems
        case "fire-alarm":
          return <FireAlarmCalculator />;
        
        // Renewable Energy
        case "solar-pv":
          return <ComingSoonCalculator calculatorName="Solar PV Calculator" />;
        
        // Tools & Components
        case "resistor-colour-code":
          return <ComingSoonCalculator calculatorName="Resistor Colour Code Calculator" />;
        case "wire-gauge":
          return <ComingSoonCalculator calculatorName="Wire Gauge (AWG/SWG) Calculator" />;
        case "instrumentation":
          return <ComingSoonCalculator calculatorName="Instrumentation Calculator" />;
        case "phase-rotation":
          return <ComingSoonCalculator calculatorName="Phase Rotation Calculator" />;
        
        // Utilities & Cost Analysis
        case "energy-cost":
          return <EnergyCostCalculator />;
        case "unit-converter":
          return <UnitConverterCalculator />;
        
        default:
          console.warn("Unknown calculator type:", calculatorType);
          return <ComingSoonCalculator calculatorName={`${calculatorType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Calculator`} />;
      }
    } catch (error) {
      console.error("Error rendering calculator:", error);
      return <ErrorFallback calculatorName={calculatorType} />;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {renderCalculator()}
    </Suspense>
  );
};

export default MainCalculator;

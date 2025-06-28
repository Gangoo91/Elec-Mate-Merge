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
const ComingSoonCalculator = lazy(() => import("./ComingSoonCalculator"));

interface MainCalculatorProps {
  calculatorType: string;
}

const MainCalculator = ({ calculatorType }: MainCalculatorProps) => {
  const LoadingSpinner = () => (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <span className="ml-2 text-elec-yellow">Loading calculator...</span>
      </CardContent>
    </Card>
  );

  const renderCalculator = () => {
    switch (calculatorType) {
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
      
      // Existing calculators
      case "cable-temperature-derating":
        return <CableTemperatureDeratingCalculator />;
      case "power-quality":
        return <PowerQualityCalculator />;
      case "fire-alarm":
        return <FireAlarmCalculator />;
      case "emergency-lighting":
        return <EmergencyLightingCalculator />;
      
      default:
        return <ComingSoonCalculator calculatorName={calculatorType} />;
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {renderCalculator()}
    </Suspense>
  );
};

export default MainCalculator;

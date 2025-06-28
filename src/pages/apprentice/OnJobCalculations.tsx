import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap } from "lucide-react";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";

// Import all calculator components
import BasicWattageCalculator from "@/components/apprentice/calculators/BasicWattageCalculator";
import PowerTriangleCalculator from "@/components/apprentice/calculators/PowerTriangleCalculator";
import SinglePhasePowerCalculator from "@/components/apprentice/calculators/SinglePhasePowerCalculator";
import PowerConsumptionCalculator from "@/components/apprentice/calculators/PowerConsumptionCalculator";
import AppliancePowerCalculator from "@/components/apprentice/calculators/AppliancePowerCalculator";
import PowerLossCalculator from "@/components/apprentice/calculators/PowerLossCalculator";
import CableTemperatureDeratingCalculator from "@/components/apprentice/calculators/CableTemperatureDeratingCalculator";
import PowerQualityCalculator from "@/components/apprentice/calculators/PowerQualityCalculator";
import FireAlarmCalculator from "@/components/apprentice/calculators/FireAlarmCalculator";
import EmergencyLightingCalculator from "@/components/apprentice/calculators/EmergencyLightingCalculator";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";

const OnJobCalculations = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string>("");

  const renderCalculator = () => {
    switch (selectedCalculator) {
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
        return selectedCalculator ? (
          <ComingSoonCalculator 
            title={selectedCalculator.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            description="This calculator is coming soon to help with your electrical calculations."
            icon={Calculator}
          />
        ) : null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-elec-yellow p-3 rounded-full">
            <Calculator className="h-8 w-8 text-elec-dark" />
          </div>
          <h1 className="text-3xl font-bold text-white">On-Job Calculations</h1>
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Essential electrical calculations for your day-to-day work on site. Choose from our comprehensive range of calculators.
        </p>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Select Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CalculatorSelector 
            selectedCalculator={selectedCalculator}
            onCalculatorChange={setSelectedCalculator}
          />
        </CardContent>
      </Card>

      {selectedCalculator && (
        <div className="space-y-6">
          {renderCalculator()}
        </div>
      )}
    </div>
  );
};

export default OnJobCalculations;

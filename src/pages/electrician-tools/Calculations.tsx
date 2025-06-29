
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap, Activity, PlugZap, Cable } from "lucide-react";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import OhmsLawCalculator from "@/components/apprentice/calculators/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/apprentice/calculators/VoltageDropCalculator";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import EnhancedCableSizingCalculator from "@/components/apprentice/calculators/EnhancedCableSizingCalculator";
import LoadCalculator from "@/components/apprentice/calculators/LoadCalculator";
import AdiabaticCalculator from "@/components/apprentice/calculators/AdiabaticCalculator";
import ZsValuesCalculator from "@/components/apprentice/calculators/ZsValuesCalculator";
import ThreePhasePowerCalculator from "@/components/apprentice/calculators/ThreePhasePowerCalculator";
import ConduitFillCalculator from "@/components/apprentice/calculators/ConduitFillCalculator";
import EnergyCostCalculator from "@/components/apprentice/calculators/EnergyCostCalculator";

const Calculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("");

  const renderCalculator = () => {
    switch (calculatorType) {
      case "ohms-law":
        return <OhmsLawCalculator />;
      case "voltage-drop":
        return <VoltageDropCalculator />;
      case "power-factor":
        return <PowerFactorCalculator />;
      case "cable-size":
        return <CableSizingCalculator />;
      case "enhanced-cable-size":
        return <EnhancedCableSizingCalculator />;
      case "load":
        return <LoadCalculator />;
      case "adiabatic":
        return <AdiabaticCalculator />;
      case "zs-values":
        return <ZsValuesCalculator />;
      case "three-phase-power":
        return <ThreePhasePowerCalculator />;
      case "conduit-fill":
        return <ConduitFillCalculator />;
      case "energy-cost":
        return <EnergyCostCalculator />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-elec-yellow" />
          Professional Electrical Calculations
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive electrical calculations for professional work. Industry-standard tools following BS 7671 and UK electrical regulations.
        </p>
      </div>

      {/* Calculator Selection */}
      <CalculatorSelector 
        calculatorType={calculatorType} 
        setCalculatorType={setCalculatorType} 
      />

      {/* Calculator Display */}
      {calculatorType && (
        <div className="space-y-6">
          {renderCalculator()}
        </div>
      )}

      {/* Quick Access Cards - Only show when no calculator selected */}
      {!calculatorType && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-elec-yellow/20 bg-elec-gray/50"
              onClick={() => setCalculatorType("ohms-law")}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-elec-yellow/10">
                    <Zap className="h-6 w-6 text-elec-yellow" />
                  </div>
                </div>
                <CardTitle className="text-lg">Ohm's Law</CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-elec-yellow/20 bg-elec-gray/50"
              onClick={() => setCalculatorType("voltage-drop")}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-elec-yellow/10">
                    <Activity className="h-6 w-6 text-elec-yellow" />
                  </div>
                </div>
                <CardTitle className="text-lg">Voltage Drop</CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-elec-yellow/20 bg-elec-gray/50"
              onClick={() => setCalculatorType("cable-size")}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-elec-yellow/10">
                    <Cable className="h-6 w-6 text-elec-yellow" />
                  </div>
                </div>
                <CardTitle className="text-lg">Cable Sizing</CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-elec-yellow/20 bg-elec-gray/50"
              onClick={() => setCalculatorType("power-factor")}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-elec-yellow/10">
                    <PlugZap className="h-6 w-6 text-elec-yellow" />
                  </div>
                </div>
                <CardTitle className="text-lg">Power Factor</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Professional Info */}
          <Card className="bg-elec-gray/30 border-elec-yellow/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Professional Electrical Calculations</h3>
                <p className="text-sm text-muted-foreground">
                  These calculators follow BS 7671:2018+A2:2022 and industry standards. All calculations include 
                  validation, safety factors, and compliance checking for professional electrical work.
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Calculations;

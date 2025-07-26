
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
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
  const [calculatorType, setCalculatorType] = useState<string>("ohms-law");

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
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professional Electrical Calculations</h1>
          <p className="text-muted-foreground">
            Comprehensive electrical calculations for professional work. Industry-standard tools following BS 7671 and UK electrical regulations.
          </p>
        </div>
        <Link to="/electrician-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Electrical Tools
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

export default Calculations;

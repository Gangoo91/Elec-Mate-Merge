
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
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

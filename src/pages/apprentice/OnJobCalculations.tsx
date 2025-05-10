
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import LumenCalculator from "@/components/apprentice/calculators/LumenCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import { Calculator, Sigma, Gauge, Variable } from "lucide-react";

const OnJobCalculations = () => {
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
      case "lumen":
        return <LumenCalculator />;
      case "instrumentation":
        return <InstrumentationCalculator />;
      case "conduit-fill":
        return <ComingSoonCalculator 
          title="Conduit Fill" 
          icon={Calculator} 
          description="Calculate the appropriate conduit size based on cable diameter and quantity." 
        />;
      case "resistor-colour-code":
        return <ComingSoonCalculator 
          title="Resistor Colour Code" 
          icon={Sigma} 
          description="Translate resistor colour bands to resistance values and tolerance." 
        />;
      default:
        return <OhmsLawCalculator />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">On-the-Job Calculations</h1>
          <p className="text-muted-foreground">
            Essential calculators for electrical installations and troubleshooting
          </p>
        </div>
        <Link to="/apprentice/on-job-tools">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
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

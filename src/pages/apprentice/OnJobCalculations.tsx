
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";
import OhmsLawCalculator from "@/components/electrician-tools/OhmsLawCalculator";
import VoltageDropCalculator from "@/components/electrician-tools/VoltageDropCalculator";
import { PowerFactorCalculator } from "@/components/electrician-tools/PowerFactorCalculator";
import LumenCalculator from "@/components/apprentice/calculators/LumenCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";
import { Calculator, Sigma } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import BackButton from "@/components/common/BackButton";
import { useTrainingActivityMonitor } from "@/hooks/useTrainingActivityMonitor";

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState<string>("cable-size");
  const { toast } = useToast();
  
  // Monitor training activity
  useTrainingActivityMonitor();

  // Show welcome toast on first load
  useEffect(() => {
    toast({
      title: "Calculation Tools Loaded",
      description: "Select a calculator from the options below.",
    });
  }, [toast]);

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
        return <CableSizingCalculator />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <BackButton customUrl="/apprentice/on-job-tools" label="Back to Tools" />
          <h1 className="text-3xl font-bold tracking-tight mt-4">Cable Calculations</h1>
          <p className="text-muted-foreground">
            Essential calculators for electrical installations and troubleshooting
          </p>
        </div>
      </div>

      {/* Calculator Selector */}
      <CalculatorSelector calculatorType={calculatorType} setCalculatorType={setCalculatorType} />
      
      {/* Dynamic Calculator */}
      {renderCalculator()}
    </div>
  );
};

export default OnJobCalculations;

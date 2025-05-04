
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import OhmsLawCalculator from "@/components/apprentice/calculators/OhmsLawCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import VoltageDropCalculator from "@/components/apprentice/calculators/VoltageDropCalculator";
import PowerFactorCalculator from "@/components/apprentice/calculators/PowerFactorCalculator";
import CableSizingCalculator from "@/components/apprentice/calculators/CableSizingCalculator";

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState("ohms-law");
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">On the Job Calculations</h1>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to On-Job Tools
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <CalculatorSelector 
          calculatorType={calculatorType} 
          setCalculatorType={setCalculatorType} 
        />

        <div className="transition-all duration-300">
          {calculatorType === "ohms-law" && <OhmsLawCalculator />}
          
          {calculatorType === "voltage-drop" && <VoltageDropCalculator />}

          {calculatorType === "instrumentation" && <InstrumentationCalculator />}

          {calculatorType === "power-factor" && <PowerFactorCalculator />}

          {calculatorType === "cable-size" && <CableSizingCalculator />}
        </div>
      </div>
    </div>
  );
};

export default OnJobCalculations;

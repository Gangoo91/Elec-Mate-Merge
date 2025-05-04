
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Activity, PlugZap, Sigma } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import OhmsLawCalculator from "@/components/apprentice/calculators/OhmsLawCalculator";
import InstrumentationCalculator from "@/components/apprentice/calculators/InstrumentationCalculator";
import ComingSoonCalculator from "@/components/apprentice/calculators/ComingSoonCalculator";

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

        {calculatorType === "ohms-law" && <OhmsLawCalculator />}

        {calculatorType === "instrumentation" && <InstrumentationCalculator />}

        {calculatorType === "voltage-drop" && (
          <ComingSoonCalculator 
            title="Voltage Drop" 
            icon={Activity} 
            description="This calculator will help you determine voltage drop in electrical circuits." 
          />
        )}

        {calculatorType === "power-factor" && (
          <ComingSoonCalculator 
            title="Power Factor" 
            icon={PlugZap} 
            description="This calculator will help you with power factor calculations." 
          />
        )}

        {calculatorType === "cable-size" && (
          <ComingSoonCalculator 
            title="Cable Sizing" 
            icon={Sigma} 
            description="This calculator will help you determine appropriate cable sizes based on load requirements." 
          />
        )}
      </div>
    </div>
  );
};

export default OnJobCalculations;

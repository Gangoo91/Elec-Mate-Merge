
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import CalculatorSelector from "@/components/apprentice/calculators/CalculatorSelector";
import MainCalculator from "@/components/apprentice/calculators/MainCalculator";

const OnJobCalculations = () => {
  const [calculatorType, setCalculatorType] = useState("");

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-elec-yellow" />
            <CardTitle>Electrical Calculators</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Essential electrical calculation tools for apprentices and professionals
          </p>
        </CardHeader>
        <CardContent>
          <CalculatorSelector 
            calculatorType={calculatorType}
            setCalculatorType={setCalculatorType}
          />
        </CardContent>
      </Card>

      {calculatorType && (
        <MainCalculator calculatorType={calculatorType} />
      )}
    </div>
  );
};

export default OnJobCalculations;

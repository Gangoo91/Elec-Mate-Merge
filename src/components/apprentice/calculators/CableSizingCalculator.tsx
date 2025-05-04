
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const CableSizingCalculator = () => {
  const { toast } = useToast();
  
  const {
    inputs,
    result,
    updateInput,
    setInstallationType,
    calculateCableSize,
    resetCalculator,
  } = useCableSizing();

  // Show success toast when we get a valid calculation result
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      toast({
        title: "Cable Size Calculated",
        description: `Recommended ${result.recommendedCable.size} cable`,
        variant: "default",
      });
    }
  }, [result.recommendedCable, result.errors, toast]);

  // Show error toast when validation fails
  useEffect(() => {
    if (result.errors && Object.keys(result.errors).length > 0) {
      const errorMessages = Object.values(result.errors).join(', ');
      toast({
        title: "Calculation Error",
        description: errorMessages,
        variant: "destructive",
      });
    }
  }, [result.errors, toast]);

  const handleCalculate = () => {
    calculateCableSize();
    
    if (!inputs.current || !inputs.length) {
      toast({
        title: "Input Required",
        description: "Please fill in all required fields to calculate cable size.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sigma className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Sizing Calculator</CardTitle>
        </div>
        <CardDescription>
          Determine appropriate cable size based on current capacity and voltage drop.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CableSizingForm
            inputs={inputs}
            errors={result.errors}
            updateInput={updateInput}
            setInstallationType={setInstallationType}
            calculateCableSize={handleCalculate}
            resetCalculator={resetCalculator}
          />
          
          <div className="flex flex-col space-y-4">
            <div className="rounded-md bg-elec-dark p-6 flex-grow flex flex-col">
              <CableSizingResult
                recommendedCable={result.recommendedCable}
                alternativeCables={result.alternativeCables}
                errors={result.errors}
                inputs={inputs}
              />
            </div>
            
            <CableSizingInfo />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableSizingCalculator;

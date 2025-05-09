
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Sigma } from "lucide-react";
import { Link } from "react-router-dom";
import { useCableSizing } from "@/components/apprentice/calculators/cable-sizing/useCableSizing";
import CableSizingForm from "@/components/apprentice/calculators/cable-sizing/CableSizingInputs";
import CableSizingResult from "@/components/apprentice/calculators/cable-sizing/CableSizingResult";
import CableSizingInfo from "@/components/apprentice/calculators/cable-sizing/CableSizingInfo";
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
    if (result.recommendedCable && !result.errors.general) {
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cable Sizing Calculator</h1>
          <p className="text-muted-foreground">
            Determine appropriate cable sizes based on current capacity and voltage drop.
          </p>
        </div>
        <Link to="/electrician-tools/calculations">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Calculations
          </Button>
        </Link>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sigma className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Cable Sizing Assistant</CardTitle>
          </div>
          <CardDescription>
            Enter your requirements to find the appropriate cable size
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
    </div>
  );
};

export default CableSizingCalculator;

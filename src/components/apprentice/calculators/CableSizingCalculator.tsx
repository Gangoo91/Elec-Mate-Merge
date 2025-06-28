
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import EnhancedValidationIndicator from "./EnhancedValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { CalculatorValidator } from "@/services/calculatorValidation";

const CableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<any>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});
  
  const {
    inputs,
    result,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator,
  } = useCableSizing();

  // Enhanced validation when results are available
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      // Perform comprehensive validation
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      const voltageDropPercent = parseFloat(inputs.voltageDrop);
      const voltage = parseFloat(inputs.voltage);
      
      // Calculate actual voltage drop
      const actualVoltageDrop = result.recommendedCable.voltageDropPerAmpereMeter * current * length;
      
      // Validate cable sizing
      const cableSizingValidation = CalculatorValidator.validateCableSizing(
        current,
        result.recommendedCable.size,
        inputs.installationType,
        actualVoltageDrop,
        length
      );

      // Input validations
      const currentValidation = CalculatorValidator.validateInputRange(current, 'current');
      const voltageValidation = CalculatorValidator.validateInputRange(voltage, 'voltage');

      // Combine validations
      const combinedValidation = {
        isValid: cableSizingValidation.isValid && currentValidation.isValid && voltageValidation.isValid,
        errors: [
          ...cableSizingValidation.errors,
          ...currentValidation.errors,
          ...voltageValidation.errors
        ],
        warnings: [
          ...cableSizingValidation.warnings,
          ...currentValidation.warnings,
          ...voltageValidation.warnings
        ],
        standardsCompliance: {
          bs7671: cableSizingValidation.standardsCompliance.bs7671 && 
                  currentValidation.standardsCompliance.bs7671 && 
                  voltageValidation.standardsCompliance.bs7671,
          iet: cableSizingValidation.standardsCompliance.iet,
          safety: cableSizingValidation.standardsCompliance.safety && 
                  currentValidation.standardsCompliance.safety && 
                  voltageValidation.standardsCompliance.safety
        }
      };

      setValidation(combinedValidation);
      setCalculationInputs({
        current,
        length,
        voltage,
        voltageDrop: voltageDropPercent,
        installationType: inputs.installationType,
        cableType: inputs.cableType
      });
      setCalculationResults({
        recommendedCable: result.recommendedCable.size,
        currentRating: result.recommendedCable.currentRating[inputs.installationType],
        actualVoltageDrop: actualVoltageDrop,
        voltageDropPercentage: (actualVoltageDrop / voltage) * 100
      });

      if (combinedValidation.isValid && combinedValidation.warnings.length === 0) {
        toast({
          title: "Cable Size Calculated",
          description: `Recommended ${result.recommendedCable.size} cable - BS 7671 compliant`,
          variant: "default",
        });
      } else if (combinedValidation.warnings.length > 0) {
        toast({
          title: "Cable Size Calculated with Warnings",
          description: "Please review validation warnings below",
          variant: "default",
        });
      }
    } else if (result.errors && Object.keys(result.errors).length > 0) {
      setValidation({
        isValid: false,
        errors: Object.values(result.errors),
        warnings: [],
        standardsCompliance: {
          bs7671: false,
          iet: false,
          safety: false
        }
      });
    }
  }, [result, inputs, toast]);

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

  const handleReset = () => {
    resetCalculator();
    setValidation(null);
    setCalculationInputs({});
    setCalculationResults({});
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sigma className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Cable Sizing Calculator</CardTitle>
          </div>
          <CardDescription>
            Determine appropriate cable size based on current capacity and voltage drop with BS 7671 validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CableSizingForm
              inputs={inputs}
              errors={result.errors}
              updateInput={updateInput}
              setInstallationType={setInstallationType}
              setCableType={setCableType}
              calculateCableSize={handleCalculate}
              resetCalculator={handleReset}
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

      {/* Enhanced Validation Results */}
      <EnhancedValidationIndicator validation={validation} calculationType="Cable Sizing" />

      {/* Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Cable Sizing"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default CableSizingCalculator;

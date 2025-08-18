
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Calculator, RefreshCw, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import ValidationIndicator from "./ValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { CalculatorValidator } from "@/services/calculatorValidation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    // Basic input validation before calculation
    if (!inputs.current || !inputs.length) {
      toast({
        title: "Missing Required Inputs",
        description: "Please enter both current and cable length to calculate.",
        variant: "destructive",
      });
      return;
    }

    const currentValue = parseFloat(inputs.current);
    const lengthValue = parseFloat(inputs.length);

    if (currentValue <= 0 || lengthValue <= 0) {
      toast({
        title: "Invalid Input Values",
        description: "Current and length must be positive numbers.",
        variant: "destructive",
      });
      return;
    }

    if (currentValue > 1000) {
      toast({
        title: "High Current Warning",
        description: "Very high current detected. Please verify your calculations.",
        variant: "default",
      });
    }

    calculateCableSize();
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sigma className="h-5 w-5 text-elec-yellow" />
              <div>
                <CardTitle>Professional Cable Sizing Calculator</CardTitle>
                <CardDescription className="mt-1">
                  Calculate appropriate cable sizes based on current capacity and voltage drop with BS 7671 compliance validation.
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCalculate} className="bg-elec-yellow text-black hover:bg-elec-yellow/90" disabled={!inputs.current || !inputs.length}>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={handleReset} className="border-elec-yellow/20 hover:bg-elec-yellow/10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Show calculation status */}
          {result.errors && Object.keys(result.errors).length > 0 && (
            <Alert variant="destructive" className="mb-6 border-red-500/20 bg-red-950/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">Calculation Issues:</div>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {Object.values(result.errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {result.recommendedCable && !result.errors && (
            <Alert className="mb-6 border-green-500/20 bg-green-950/20">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-100">
                <div className="font-medium">Cable Size Calculated Successfully</div>
                <div className="text-sm text-green-200 mt-1">
                  Recommended: <span className="font-medium">{result.recommendedCable.size}</span> cable for {inputs.current}A load
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
              <div className="rounded-md bg-elec-dark/50 border border-elec-yellow/10 p-6 flex-grow flex flex-col min-h-[400px]">
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

      {/* Professional Validation Results */}
      {validation && (
        <ValidationIndicator validation={validation} calculationType="Cable Sizing" />
      )}

      {/* Comprehensive Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Professional Cable Sizing"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default CableSizingCalculator;

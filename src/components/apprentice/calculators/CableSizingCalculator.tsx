
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Calculator, RefreshCw, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import SimpleValidationIndicator from "./SimpleValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { SimpleValidator, SimpleValidationResult } from "@/services/simplifiedValidation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<SimpleValidationResult | null>(null);
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

  // Enhanced validation with safety factors
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      // Safely access potentially undefined properties with defaults
      const ambientTemp = parseFloat((inputs as any).ambientTemp || '30');
      const cableGrouping = parseInt((inputs as any).cableGrouping || '1');
      
      // Perform comprehensive safety validation
      const safetyValidation = SimpleValidator.validateCableSizing(
        current,
        result.recommendedCable.size,
        inputs.installationType,
        ambientTemp,
        cableGrouping,
        length
      );

      setValidation(safetyValidation);
      setCalculationInputs({
        current,
        length,
        ambientTemp,
        cableGrouping,
        installationType: inputs.installationType,
        cableType: inputs.cableType,
        loadType: (inputs as any).loadType || 'resistive',
        diversityFactor: parseFloat((inputs as any).diversityFactor || '1.0')
      });
      
      setCalculationResults({
        recommendedCable: result.recommendedCable.size,
        currentRating: result.recommendedCable.currentRating[inputs.installationType],
        deratedCurrentRating: result.recommendedCable.currentRating[inputs.installationType] * 
                             safetyValidation.safetyFactors.temperatureDerating * 
                             safetyValidation.safetyFactors.groupingFactor,
        safetyMargin: safetyValidation.safetyFactors.safetyMargin
      });

      // Enhanced toast notifications
      if (safetyValidation.criticalAlerts.length > 0) {
        toast({
          title: "⚠️ CRITICAL SAFETY ALERT",
          description: "Serious safety issues detected. Do not proceed with installation.",
          variant: "destructive",
        });
      } else if (safetyValidation.warnings.length > 0) {
        toast({
          title: "Cable Size Calculated with Warnings",
          description: "Please review safety warnings below",
          variant: "default",
        });
      } else {
        toast({
          title: "Cable Size Calculated Safely",
          description: `Recommended ${result.recommendedCable.size} cable with safety margin ${safetyValidation.safetyFactors.safetyMargin.toFixed(2)}`,
          variant: "default",
        });
      }
    } else if (result.errors && Object.keys(result.errors).length > 0) {
      setValidation({
        isValid: false,
        errors: Object.values(result.errors),
        warnings: [],
        criticalAlerts: [],
        safetyFactors: {
          temperatureDerating: 1.0,
          groupingFactor: 1.0,
          diversityFactor: 1.0,
          safetyMargin: 0
        },
        complianceChecks: {
          bs7671: false,
          iet: false,
          buildingRegs: false,
          cdm: false
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
                  <CardTitle>Cable Sizing Calculator</CardTitle>
                  <CardDescription className="mt-1">
                    Professional cable sizing with real-world safety factors, environmental conditions, and BS 7671 compliance validation.
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
              setInstallationType={(type: string) => setInstallationType(type as any)}
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

      {/* Enhanced Safety Validation Results */}
      <SimpleValidationIndicator validation={validation} calculationType="Cable Sizing" />

      {/* Detailed Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Enhanced Cable Sizing"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default CableSizingCalculator;

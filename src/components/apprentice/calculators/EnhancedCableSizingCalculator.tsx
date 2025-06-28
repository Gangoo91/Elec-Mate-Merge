
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import EnhancedCableSizingInputs from "./cable-sizing/EnhancedCableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import EnhancedValidationIndicator from "./EnhancedValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { SafetyValidator, SafetyValidationResult } from "@/services/safetyValidation";

const EnhancedCableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<SafetyValidationResult | null>(null);
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
      const safetyValidation = SafetyValidator.validateCableSizing(
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
            <CardTitle>Enhanced Cable Sizing Calculator</CardTitle>
          </div>
          <CardDescription>
            Professional cable sizing with real-world safety factors, environmental conditions, and BS 7671 compliance validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedCableSizingInputs
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

      {/* Enhanced Safety Validation Results */}
      <EnhancedValidationIndicator validation={validation} calculationType="Cable Sizing" />

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

export default EnhancedCableSizingCalculator;

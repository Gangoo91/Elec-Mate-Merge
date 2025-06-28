import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import EnhancedCableSizingInputs from "./cable-sizing/EnhancedCableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import EnhancedValidationIndicator from "./EnhancedValidationIndicator";
import CalculationReport from "./CalculationReport";
import RealWorldValidationPanel from "./RealWorldValidationPanel";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { SafetyValidator, SafetyValidationResult } from "@/services/safetyValidation";
import { RealWorldValidator, RealWorldValidationResult } from "@/services/realWorldValidation";

const EnhancedCableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<SafetyValidationResult | null>(null);
  const [realWorldValidation, setRealWorldValidation] = useState<RealWorldValidationResult | null>(null);
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

  // Enhanced validation with safety factors and real-world conditions
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      const ambientTemp = parseFloat(inputs.ambientTemp || '30');
      const cableGrouping = parseInt(inputs.cableGrouping || '1');
      
      // Perform comprehensive safety validation
      const safetyValidation = SafetyValidator.validateCableSizing(
        current,
        result.recommendedCable.size,
        inputs.installationType,
        ambientTemp,
        cableGrouping,
        length
      );

      // Perform real-world validation
      const groupingFactor = cableGrouping > 1 ? 0.8 : 1.0;
      const realWorldVal = RealWorldValidator.validateRealWorldConditions(
        'cable-sizing',
        ambientTemp,
        groupingFactor,
        inputs.loadType || 'resistive',
        inputs.installationType
      );

      setValidation(safetyValidation);
      setRealWorldValidation(realWorldVal);
      
      setCalculationInputs({
        current,
        length,
        ambientTemp,
        cableGrouping,
        installationType: inputs.installationType,
        cableType: inputs.cableType,
        loadType: inputs.loadType || 'resistive',
        diversityFactor: parseFloat(inputs.diversityFactor || '1.0')
      });
      
      setCalculationResults({
        recommendedCable: result.recommendedCable.size,
        currentRating: result.recommendedCable.currentRating[inputs.installationType],
        deratedCurrentRating: result.recommendedCable.currentRating[inputs.installationType] * 
                             safetyValidation.safetyFactors.temperatureDerating * 
                             safetyValidation.safetyFactors.groupingFactor,
        safetyMargin: safetyValidation.safetyFactors.safetyMargin,
        realWorldRisk: realWorldVal.overallRisk,
        conditionsCount: realWorldVal.conditions.length
      });

      // Enhanced toast notifications with real-world considerations
      if (safetyValidation.criticalAlerts.length > 0 || realWorldVal.overallRisk === 'critical') {
        toast({
          title: "🚨 CRITICAL SAFETY ALERT",
          description: "Critical safety issues and/or real-world conditions detected. Professional consultation required.",
          variant: "destructive",
        });
      } else if (safetyValidation.warnings.length > 0 || realWorldVal.overallRisk === 'high') {
        toast({
          title: "⚠️ Enhanced Calculation with Warnings",
          description: `Safety warnings and ${realWorldVal.conditions.length} real-world conditions identified`,
          variant: "default",
        });
      } else if (realWorldVal.overallRisk === 'medium') {
        toast({
          title: "✅ Cable Size Calculated with Real-World Factors",
          description: `Recommended ${result.recommendedCable.size} with ${realWorldVal.conditions.length} conditions considered`,
          variant: "default",
        });
      } else {
        toast({
          title: "✅ Optimal Cable Size Calculated",
          description: `Recommended ${result.recommendedCable.size} cable - optimal for standard conditions`,
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
      setRealWorldValidation(null);
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
    setRealWorldValidation(null);
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

      {/* Real-World Validation Panel - Phase 2 Enhancement */}
      {realWorldValidation && (
        <RealWorldValidationPanel 
          validation={realWorldValidation} 
          calculationType="cable sizing" 
        />
      )}

      {/* Detailed Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Enhanced Cable Sizing with Real-World Validation"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export default EnhancedCableSizingCalculator;

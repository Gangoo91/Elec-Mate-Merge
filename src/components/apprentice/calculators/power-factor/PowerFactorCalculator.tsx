
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { useCalculator } from "./useCalculator";
import PowerFactorInputs from "./PowerFactorInputs";
import PowerFactorResult from "./PowerFactorResult";
import PowerFactorInfo from "./PowerFactorInfo";
import ValidationIndicator from "../ValidationIndicator";
import CalculationReport from "../CalculationReport";
import CalculationHistory, { type CalculationEntry } from "../calculation-history/CalculationHistory";
import QuickCalculationPresets, { type PresetScenario } from "../smart-features/QuickCalculationPresets";
import SmartInputSuggestions from "../smart-features/SmartInputSuggestions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState, useRef } from "react";

const PowerFactorCalculator = () => {
  const { toast } = useToast();
  const historyRef = useRef<any>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});
  
  const {
    activePower,
    setActivePower,
    apparentPower,
    setApparentPower,
    current,
    setCurrent,
    voltage,
    setVoltage,
    calculationMethod,
    setCalculationMethod,
    powerFactor,
    setPowerFactor,
    validation,
    errors,
    validateInputs,
    calculatePowerFactor,
    clearError,
    resetCalculator
  } = useCalculator();

  // Enhanced calculation with history saving
  const handleCalculate = () => {
    calculatePowerFactor();
    
    if (!activePower) {
      toast({
        title: "Input Required",
        description: "Please fill in the required fields to calculate power factor.",
        variant: "destructive",
      });
      return;
    }

    // Save to history when calculation is successful
    const inputs = {
      activePower,
      apparentPower,
      current,
      voltage,
      calculationMethod
    };
    
    setCalculationInputs(inputs);
    
    if (powerFactor) {
      const results = { powerFactor };
      setCalculationResults(results);
      
      // Save to history
      if (historyRef.current) {
        historyRef.current.saveCalculation(inputs, results, validation?.isValid || false);
      }
    }
  };

  const handlePresetSelect = (preset: PresetScenario) => {
    const inputs = preset.inputs;
    
    if (inputs.activePower) setActivePower(inputs.activePower);
    if (inputs.apparentPower) setApparentPower(inputs.apparentPower);
    if (inputs.voltage) setVoltage(inputs.voltage);
    if (inputs.current) setCurrent(inputs.current);
    
    // Set calculation method based on preset inputs
    if (inputs.voltage && inputs.current) {
      setCalculationMethod('currentVoltage');
    } else {
      setCalculationMethod('power');
    }
    
    toast({
      title: "Preset Applied",
      description: `${preset.name} scenario loaded successfully.`,
      variant: "default",
    });
  };

  const handleHistoryRestore = (entry: CalculationEntry) => {
    const inputs = entry.inputs;
    
    if (inputs.activePower) setActivePower(inputs.activePower);
    if (inputs.apparentPower) setApparentPower(inputs.apparentPower);
    if (inputs.voltage) setVoltage(inputs.voltage);
    if (inputs.current) setCurrent(inputs.current);
    if (inputs.calculationMethod) setCalculationMethod(inputs.calculationMethod);
    
    toast({
      title: "Calculation Restored",
      description: "Previous calculation has been loaded.",
      variant: "default",
    });
  };

  const handleReset = () => {
    resetCalculator();
    setCalculationInputs({});
    setCalculationResults({});
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Power Factor Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate power factor using active/apparent power or current/voltage measurements with BS 7671 validation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <PowerFactorInputs
                calculationMethod={calculationMethod}
                setCalculationMethod={setCalculationMethod}
                activePower={activePower}
                setActivePower={setActivePower}
                apparentPower={apparentPower}
                setApparentPower={setApparentPower}
                current={current}
                setCurrent={setCurrent}
                voltage={voltage}
                setVoltage={setVoltage}
                errors={errors}
                clearError={clearError}
                calculatePowerFactor={handleCalculate}
                resetCalculator={handleReset}
              />
              
              {/* Smart Input Suggestions */}
              {calculationMethod === 'power' && (
                <>
                  <SmartInputSuggestions
                    fieldType="power"
                    currentValue={activePower}
                    onSuggestionSelect={setActivePower}
                    calculatorType="power-factor"
                  />
                  <SmartInputSuggestions
                    fieldType="power"
                    currentValue={apparentPower}
                    onSuggestionSelect={setApparentPower}
                    calculatorType="power-factor"
                  />
                </>
              )}
              
              {calculationMethod === 'currentVoltage' && (
                <>
                  <SmartInputSuggestions
                    fieldType="voltage"
                    currentValue={voltage}
                    onSuggestionSelect={setVoltage}
                    calculatorType="power-factor"
                  />
                  <SmartInputSuggestions
                    fieldType="current"
                    currentValue={current}
                    onSuggestionSelect={setCurrent}
                    calculatorType="power-factor"
                  />
                </>
              )}
            </div>
            
            {/* Result Section */}
            <div className="space-y-4">
              <div className="rounded-md bg-elec-dark p-6 min-h-[200px] flex items-center justify-center">
                <PowerFactorResult powerFactor={powerFactor} />
              </div>
              <PowerFactorInfo />
            </div>
            
            {/* Quick Presets */}
            <div className="space-y-4">
              <QuickCalculationPresets
                calculatorType="power-factor"
                onPresetSelect={handlePresetSelect}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <ValidationIndicator validation={validation} calculationType="Power Factor" />

      {/* Calculation History */}
      <CalculationHistory
        ref={historyRef}
        calculatorType="power-factor"
        onRestoreCalculation={handleHistoryRestore}
      />

      {/* Calculation Report */}
      {validation && Object.keys(calculationResults).length > 0 && (
        <CalculationReport
          calculationType="Power Factor"
          inputs={calculationInputs}
          results={calculationResults}
          validation={validation}
        />
      )}
    </div>
  );
};

export { PowerFactorCalculator };

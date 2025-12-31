import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Zap, Info } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import SimpleValidationIndicator from "./SimpleValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useMemo } from "react";
import { SimpleValidator, SimpleValidationResult } from "@/services/simplifiedValidation";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const voltageOptions = [
  { value: "230", label: "230V Single Phase" },
  { value: "400", label: "400V Three Phase" },
  { value: "110", label: "110V Site Supply" },
];

const phaseOptions = [
  { value: "single", label: "Single Phase" },
  { value: "three", label: "Three Phase" },
];

const CableSizingCalculator = () => {
  const { toast } = useToast();
  const [validation, setValidation] = useState<SimpleValidationResult | null>(null);
  const [calculationInputs, setCalculationInputs] = useState<any>({});
  const [calculationResults, setCalculationResults] = useState<any>({});
  
  // Load/Current input mode
  const [inputMode, setInputMode] = useState<'current' | 'load'>('current');
  const [loadPower, setLoadPower] = useState<string>("");
  const [loadVoltage, setLoadVoltage] = useState<string>("230");
  const [powerFactor, setPowerFactor] = useState<string>("1.0");
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  
  const {
    inputs,
    result,
    uiSelections,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator,
  } = useCableSizing();

  // Auto-calculate current from load
  const calculatedCurrent = useMemo(() => {
    if (inputMode === 'load' && loadPower && loadVoltage && powerFactor) {
      const P = parseFloat(loadPower);
      const V = parseFloat(loadVoltage);
      const PF = parseFloat(powerFactor);
      
      if (P > 0 && V > 0 && PF > 0) {
        if (phases === 'single') {
          return (P / (V * PF)).toFixed(2);
        } else {
          return (P / (Math.sqrt(3) * V * PF)).toFixed(2);
        }
      }
    }
    return "";
  }, [inputMode, loadPower, loadVoltage, powerFactor, phases]);

  // Update inputs.current when calculatedCurrent changes
  useEffect(() => {
    if (inputMode === 'load' && calculatedCurrent) {
      updateInput('current', calculatedCurrent);
    }
  }, [calculatedCurrent, inputMode, updateInput]);

  // Sync load voltage to main inputs for voltage drop calculation
  useEffect(() => {
    if (inputMode === 'load' && loadVoltage) {
      updateInput('voltage', loadVoltage);
    }
  }, [loadVoltage, inputMode, updateInput]);

  // Enhanced validation with safety factors
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      const ambientTemp = parseFloat((inputs as any).ambientTemp || '30');
      const cableGrouping = parseInt((inputs as any).cableGrouping || '1');
      
      const safetyValidation = SimpleValidator.validateCableSizing(
        current,
        result.recommendedCable.sizeLabel,
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
        diversityFactor: parseFloat((inputs as any).diversityFactor || '1.0'),
      });
      
      setCalculationResults({
        recommendedCable: result.recommendedCable.sizeLabel,
        currentRating: result.recommendedCable.tabulatedCapacity,
        deratedCurrentRating: result.recommendedCable.deratedCapacity,
        safetyMargin: safetyValidation.safetyFactors.safetyMargin,
      });

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
    }
  }, [result, inputs, toast]);

  const handleCalculate = () => {
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

    calculateCableSize();
  };

  const handleReset = () => {
    resetCalculator();
    setValidation(null);
    setCalculationInputs({});
    setCalculationResults({});
    setLoadPower("");
    setLoadVoltage("230");
    setPowerFactor("1.0");
    setPhases("single");
    setInputMode("current");
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sigma className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Cable Sizing Calculator</CardTitle>
              <CardDescription className="mt-1">
                Professional cable sizing with BS 7671 compliance validation and protective device integration.
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-auto">
              BS 7671
            </Badge>
          </div>
        </CardHeader>
        <CardContent>

          <div className="space-y-8">
            {/* Input Mode Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Current Specification
              </h3>
              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'current' | 'load')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger value="current" className="text-sm font-semibold data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
                    Current
                  </TabsTrigger>
                  <TabsTrigger value="load" className="text-sm font-semibold data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
                    Load
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Load Specification Section - Conditional */}
            {inputMode === 'load' && (
              <div className="space-y-6 p-6 border border-blue-500/40 rounded-lg bg-blue-500/5">
                <h4 className="font-medium text-white flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-400" />
                  Load Specification
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <MobileInput
                    label="Load Power (W)"
                    type="text"
                    inputMode="decimal"
                    value={loadPower}
                    onChange={(e) => setLoadPower(e.target.value)}
                    placeholder="e.g., 7200"
                  />

                  <MobileSelectWrapper
                    label="System Voltage (V)"
                    value={loadVoltage}
                    onValueChange={setLoadVoltage}
                    options={voltageOptions}
                  />

                  <MobileInput
                    label="Power Factor"
                    type="text"
                    inputMode="decimal"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(e.target.value)}
                    placeholder="0.8 - 1.0"
                    hint="Resistive: 1.0, Inductive: 0.8-0.9"
                  />

                  <MobileSelectWrapper
                    label="Phase Type"
                    value={phases}
                    onValueChange={(v) => setPhases(v as 'single' | 'three')}
                    options={phaseOptions}
                  />
                </div>

                {/* Calculated Current Display */}
                {calculatedCurrent && (
                  <Alert className="bg-blue-500/10 border-blue-500/40">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">Calculated Design Current:</span>
                        <span className="text-2xl font-bold text-blue-400">
                          {calculatedCurrent}A
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {phases === 'single' ? 'I = P / (V × PF)' : 'I = P / (√3 × V × PF)'}
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <Separator className="bg-elec-yellow/20" />

            <CableSizingForm
              inputs={inputs}
              errors={result.errors}
              uiSelections={uiSelections}
              updateInput={updateInput}
              setInstallationType={(type: string) => setInstallationType(type as any)}
              setCableType={setCableType}
              calculateCableSize={handleCalculate}
              resetCalculator={handleReset}
              inputMode={inputMode}
            />
          </div>
          
          <div className="flex flex-col space-y-4 mt-6 xl:mt-0">
              {/* Validation Results */}
              {validation && (
                <SimpleValidationIndicator validation={validation} calculationType="cableSizing" />
              )}

              {/* Cable Sizing Result */}
              {result.recommendedCable && (
              <CableSizingResult 
                recommendedCable={result.recommendedCable}
                alternativeCables={result.alternativeCables || []}
                errors={result.errors || {}}
                inputs={inputs}
                deratingFactors={result.deratingFactors}
                nextCableSizeUp={result.nextCableSizeUp}
              />
              )}

              {/* Calculation Report */}
              {Object.keys(calculationInputs).length > 0 && Object.keys(calculationResults).length > 0 && validation && (
                <CalculationReport
                  calculationType="cableSizing"
                  inputs={calculationInputs}
                  results={calculationResults}
                  validation={validation}
                />
              )}
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <CableSizingInfo />
    </div>
  );
};

export default CableSizingCalculator;

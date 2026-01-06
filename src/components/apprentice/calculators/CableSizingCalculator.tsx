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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

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
  const config = CALCULATOR_CONFIG['cable'];

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
          title: "CRITICAL SAFETY ALERT",
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
    <div className="space-y-4">
      <CalculatorCard
        category="cable"
        title="Cable Sizing Calculator"
        description="Professional cable sizing with BS 7671 compliance validation"
      >
        <div className="flex items-center justify-end">
          <Badge
            variant="outline"
            className="text-xs"
            style={{ borderColor: `${config.gradientFrom}40`, color: config.gradientFrom }}
          >
            BS 7671
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Input Mode Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: config.gradientFrom }}>
              <Zap className="h-4 w-4" />
              Current Specification
            </h3>
            <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as 'current' | 'load')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 bg-white/5 rounded-xl p-1">
                <TabsTrigger
                  value="current"
                  className="text-sm font-semibold rounded-lg data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Current
                </TabsTrigger>
                <TabsTrigger
                  value="load"
                  className="text-sm font-semibold rounded-lg data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  Load
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Load Specification Section - Conditional */}
          {inputMode === 'load' && (
            <div
              className="space-y-4 p-4 rounded-xl border"
              style={{
                borderColor: `${config.gradientFrom}30`,
                background: `${config.gradientFrom}08`
              }}
            >
              <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
                Load Specification
              </h4>

              <CalculatorInputGrid columns={2}>
                <CalculatorInput
                  label="Load Power"
                  unit="W"
                  type="text"
                  inputMode="decimal"
                  value={loadPower}
                  onChange={setLoadPower}
                  placeholder="e.g., 7200"
                />

                <CalculatorSelect
                  label="System Voltage"
                  value={loadVoltage}
                  onChange={setLoadVoltage}
                  options={voltageOptions}
                />

                <CalculatorInput
                  label="Power Factor"
                  type="text"
                  inputMode="decimal"
                  value={powerFactor}
                  onChange={setPowerFactor}
                  placeholder="0.8 - 1.0"
                  hint="Resistive: 1.0, Inductive: 0.8-0.9"
                />

                <CalculatorSelect
                  label="Phase Type"
                  value={phases}
                  onChange={(v) => setPhases(v as 'single' | 'three')}
                  options={phaseOptions}
                />
              </CalculatorInputGrid>

              {/* Calculated Current Display */}
              {calculatedCurrent && (
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    borderColor: `${config.gradientFrom}40`,
                    background: `${config.gradientFrom}10`
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
                    <span className="text-sm font-medium text-white">Calculated Design Current</span>
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: config.gradientFrom }}
                  >
                    {calculatedCurrent}A
                  </div>
                  <p className="text-xs text-white/80 mt-1">
                    {phases === 'single' ? 'I = P / (V × PF)' : 'I = P / (√3 × V × PF)'}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-white/10 pt-4">
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
        </div>
      </CalculatorCard>

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

      {/* Info Section */}
      <CableSizingInfo />
    </div>
  );
};

export default CableSizingCalculator;

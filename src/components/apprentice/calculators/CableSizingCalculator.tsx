import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sigma, Calculator, RefreshCw, Zap, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useCableSizing } from "./cable-sizing/useCableSizing";
import CableSizingForm from "./cable-sizing/CableSizingInputs";
import CableSizingResult from "./cable-sizing/CableSizingResult";
import CableSizingInfo from "./cable-sizing/CableSizingInfo";
import SimpleValidationIndicator from "./SimpleValidationIndicator";
import CalculationReport from "./CalculationReport";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useMemo } from "react";
import { SimpleValidator, SimpleValidationResult } from "@/services/simplifiedValidation";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const protectiveDeviceOptions = [
  { value: "mcb", label: "MCB" },
  { value: "rcbo", label: "RCBO" },
  { value: "fuse", label: "Fuse" },
];

const deviceRatingOptions = [
  { value: "6", label: "6A" },
  { value: "10", label: "10A" },
  { value: "16", label: "16A" },
  { value: "20", label: "20A" },
  { value: "25", label: "25A" },
  { value: "32", label: "32A" },
  { value: "40", label: "40A" },
  { value: "50", label: "50A" },
  { value: "63", label: "63A" },
  { value: "80", label: "80A" },
  { value: "100", label: "100A" },
  { value: "125", label: "125A" },
  { value: "160", label: "160A" },
  { value: "200", label: "200A" },
  { value: "250", label: "250A" },
  { value: "315", label: "315A" },
  { value: "400", label: "400A" },
];

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
  
  // Enhanced inputs for protective device integration
  const [protectiveDevice, setProtectiveDevice] = useState<string>("mcb");
  const [deviceRating, setDeviceRating] = useState<string>("32");
  const [designCurrent, setDesignCurrent] = useState<string>("");
  
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

  // Calculate Ib ≤ In ≤ Iz compliance
  const calculateCompliance = () => {
    if (!result.recommendedCable) return null;
    
    // Use design current if provided, otherwise fall back to main current input
    const currentToUse = designCurrent || inputs.current;
    if (!currentToUse || !deviceRating) return null;
    
    const Ib = parseFloat(currentToUse); // Design current (or main current as fallback)
    const In = parseFloat(deviceRating);  // Device rating  
    const Iz = result.recommendedCable.currentRating[inputs.installationType] || 0; // Cable capacity
    
    const ibInCompliant = Ib <= In;
    const inIzCompliant = In <= Iz;
    const overallCompliant = ibInCompliant && inIzCompliant;
    
    return {
      Ib,
      In, 
      Iz,
      ibInCompliant,
      inIzCompliant,
      overallCompliant,
      safetyMargin: Iz > 0 ? ((Iz - In) / Iz * 100) : 0,
      usingFallbackCurrent: !designCurrent && inputs.current
    };
  };

  // Enhanced validation with safety factors
  useEffect(() => {
    if (result.recommendedCable && !result.errors) {
      const current = parseFloat(inputs.current);
      const length = parseFloat(inputs.length);
      const ambientTemp = parseFloat((inputs as any).ambientTemp || '30');
      const cableGrouping = parseInt((inputs as any).cableGrouping || '1');
      
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
        diversityFactor: parseFloat((inputs as any).diversityFactor || '1.0'),
        protectiveDevice,
        deviceRating: parseFloat(deviceRating)
      });
      
      setCalculationResults({
        recommendedCable: result.recommendedCable.size,
        currentRating: result.recommendedCable.currentRating[inputs.installationType],
        deratedCurrentRating: result.recommendedCable.currentRating[inputs.installationType] * 
                             safetyValidation.safetyFactors.temperatureDerating * 
                             safetyValidation.safetyFactors.groupingFactor,
        safetyMargin: safetyValidation.safetyFactors.safetyMargin,
        compliance: calculateCompliance()
      });

      const compliance = calculateCompliance();
      if (compliance && !compliance.overallCompliant) {
        toast({
          title: "⚠️ Ib ≤ In ≤ Iz Compliance Issue",
          description: "Circuit does not meet BS 7671 design requirements",
          variant: "destructive",
        });
      } else if (safetyValidation.criticalAlerts.length > 0) {
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
  }, [result, inputs, protectiveDevice, deviceRating, designCurrent, toast]);

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
    setProtectiveDevice("mcb");
    setDeviceRating("32");
    setDesignCurrent("");
    setLoadPower("");
    setLoadVoltage("230");
    setPowerFactor("1.0");
    setPhases("single");
    setInputMode("current");
  };

  const compliance = calculateCompliance();

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

            {/* Protective Device Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Protective Device
              </h3>
              <div className="space-y-6 p-6 border border-elec-yellow/40 rounded-lg bg-elec-dark/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <MobileSelectWrapper
                    label="Device Type"
                    value={protectiveDevice}
                    onValueChange={setProtectiveDevice}
                    options={protectiveDeviceOptions}
                  />
                  <MobileSelectWrapper
                    label="Device Rating (A)"
                    value={deviceRating}
                    onValueChange={setDeviceRating}
                    options={deviceRatingOptions}
                  />
                </div>
              </div>
            </div>

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
              {/* Compliance Status - Appears with results */}
              {compliance && result.recommendedCable && (
                <div className={`p-4 rounded-lg ${
                  compliance.overallCompliant 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {compliance.overallCompliant ? (
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-400" />
                    )}
                    <span className={`font-semibold ${
                      compliance.overallCompliant ? 'text-green-400' : 'text-red-400'
                    }`}>
                      BS 7671 Compliance: Ib ≤ In ≤ Iz
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-2 rounded bg-card/50">
                      <div className="text-muted-foreground text-xs">Ib (Design)</div>
                      <div className="font-mono font-bold text-white">{compliance.Ib.toFixed(1)}A</div>
                    </div>
                    <div className="text-center p-2 rounded bg-card/50">
                      <div className="text-muted-foreground text-xs">In (Device)</div>
                      <div className="font-mono font-bold text-white">{compliance.In}A</div>
                    </div>
                    <div className="text-center p-2 rounded bg-card/50">
                      <div className="text-muted-foreground text-xs">Iz (Cable)</div>
                      <div className="font-mono font-bold text-white">{compliance.Iz.toFixed(1)}A</div>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${compliance.ibInCompliant ? 'text-green-400' : 'text-red-400'}`}>
                      {compliance.ibInCompliant ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      Ib ≤ In: {compliance.ibInCompliant ? 'PASS' : 'FAIL'}
                    </div>
                    <div className={`flex items-center gap-2 ${compliance.inIzCompliant ? 'text-green-400' : 'text-red-400'}`}>
                      {compliance.inIzCompliant ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      In ≤ Iz: {compliance.inIzCompliant ? 'PASS' : 'FAIL'}
                    </div>
                  </div>

                  {compliance.usingFallbackCurrent && (
                    <div className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Using main current input as design current
                    </div>
                  )}
                </div>
              )}

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

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
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">Load Power (W)</Label>
                    <input
                      type="number"
                      step="0.1"
                      value={loadPower}
                      onChange={(e) => setLoadPower(e.target.value)}
                      placeholder="e.g., 7200"
                      className="w-full h-14 px-4 py-2 bg-elec-dark border border-blue-500/40 rounded-md text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">System Voltage (V)</Label>
                    <Select value={loadVoltage} onValueChange={setLoadVoltage}>
                      <SelectTrigger className="bg-elec-dark border-blue-500/40 text-white h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-blue-500/40 text-white">
                        <SelectItem value="230">230V Single Phase</SelectItem>
                        <SelectItem value="400">400V Three Phase</SelectItem>
                        <SelectItem value="110">110V Site Supply</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">Power Factor</Label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.1"
                      max="1.0"
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(e.target.value)}
                      placeholder="0.8 - 1.0"
                      className="w-full h-14 px-4 py-2 bg-elec-dark border border-blue-500/40 rounded-md text-white placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-base"
                    />
                    <p className="text-xs text-muted-foreground">Resistive: 1.0, Inductive: 0.8-0.9</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">Phase Type</Label>
                    <Select value={phases} onValueChange={(v) => setPhases(v as 'single' | 'three')}>
                      <SelectTrigger className="bg-elec-dark border-blue-500/40 text-white h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-blue-500/40 text-white">
                        <SelectItem value="single">Single Phase</SelectItem>
                        <SelectItem value="three">Three Phase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-white">Device Type</Label>
                    <Select value={protectiveDevice} onValueChange={setProtectiveDevice}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/40 text-white h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/40 z-50 text-white">
                        <SelectItem value="mcb">MCB</SelectItem>
                        <SelectItem value="rcbo">RCBO</SelectItem>
                        <SelectItem value="fuse">Fuse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-white">Device Rating (A)</Label>
                    <Select value={deviceRating} onValueChange={setDeviceRating}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/40 text-white h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/40 z-50 text-white">
                        <SelectItem value="6">6A</SelectItem>
                        <SelectItem value="10">10A</SelectItem>
                        <SelectItem value="16">16A</SelectItem>
                        <SelectItem value="20">20A</SelectItem>
                        <SelectItem value="25">25A</SelectItem>
                        <SelectItem value="32">32A</SelectItem>
                        <SelectItem value="40">40A</SelectItem>
                        <SelectItem value="50">50A</SelectItem>
                        <SelectItem value="63">63A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    <span className="text-lg font-bold text-white">
                      BS 7671 Compliance: {compliance.overallCompliant ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                  
                  {compliance.usingFallbackCurrent && (
                    <div className="text-xs text-yellow-400 mb-2">
                      ⚠️ Using main current input ({compliance.Ib}A) - consider setting design current for proper validation
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Ib:</span>
                      <span className="font-bold text-white">{compliance.Ib}A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">In:</span>
                      <span className="font-bold text-white">{compliance.In}A</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Iz:</span>
                      <span className="font-bold text-white">{compliance.Iz}A</span>
                    </div>
                  </div>
                  
                  <div className="text-xs mt-2 text-muted-foreground">
                    Ib ≤ In: {compliance.ibInCompliant ? "✓" : "✗"} | In ≤ Iz: {compliance.inIzCompliant ? "✓" : "✗"} | 
                    Safety margin: {compliance.safetyMargin.toFixed(1)}%
                  </div>
                </div>
              )}
              
              <div className="rounded-md bg-elec-dark border border-elec-yellow/40 p-6 flex-grow flex flex-col min-h-[400px]">
                <CableSizingResult
                  recommendedCable={result.recommendedCable}
                  alternativeCables={result.alternativeCables}
                  errors={result.errors}
                  inputs={inputs}
                />
              </div>
              
              <CableSizingInfo />
            </div>
        </CardContent>
      </Card>

      {/* Enhanced Safety Validation Results */}
      <SimpleValidationIndicator validation={validation} calculationType="Cable Sizing" />

      {/* What This Means Panel */}
      <Alert className="border-blue-500/20 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-blue-200">
          <div className="space-y-2">
            <p className="font-medium">What This Means:</p>
            <ul className="text-sm space-y-1">
              <li>• Ib ≤ In ≤ Iz ensures safe circuit operation per BS 7671</li>
              <li>• Design current (Ib) must not exceed device rating (In)</li>
              <li>• Device rating (In) must not exceed cable capacity (Iz)</li>
              <li>• Safety margin provides protection against overload conditions</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* BS 7671 Guidance */}
      <Alert className="border-green-500/20 bg-green-500/10">
        <Info className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-200">
          <div className="space-y-2">
            <p className="font-medium">BS 7671 Regulations:</p>
            <ul className="text-sm space-y-1">
              <li>• Section 433: Overcurrent protection requirements</li>
              <li>• Appendix 4: Voltage drop limitations</li>
              <li>• Table 4D5: Current-carrying capacity and correction factors</li>
              <li>• Consider ambient temperature, grouping, and thermal insulation</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

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
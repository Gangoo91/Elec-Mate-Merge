
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Activity, Info, Calculator, RotateCcw, Copy, Share2 } from "lucide-react";
import { useState, useRef } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CalculationHistory from "./calculation-history/CalculationHistory";
import QuickCalculationPresets from "./smart-features/QuickCalculationPresets";
import SmartInputSuggestions from "./smart-features/SmartInputSuggestions";
import { copyToClipboard } from "@/lib/calc-utils";
import { useToast } from "@/hooks/use-toast";

const VoltageDropCalculator = () => {
  const { toast } = useToast();
  const historyRef = useRef<any>(null);
  const [current, setCurrent] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [cableSize, setCableSize] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("230");
  const [phase, setPhase] = useState<"single" | "three">("single");
  const [circuitType, setCircuitType] = useState<"lighting" | "other">("lighting");
  const [result, setResult] = useState<{
    voltageDrop: number;
    percentageDrop: number;
    acceptable: boolean;
    limitPercent: number;
  } | null>(null);

  // Cable resistance values (mΩ/m for copper T&E at 70°C)
  const cableResistance = {
    "1.0": 19.5,
    "1.5": 13.3,
    "2.5": 7.98,
    "4.0": 4.95,
    "6.0": 3.30,
    "10.0": 1.95,
    "16.0": 1.21,
    "25.0": 0.795,
    "35.0": 0.565
  };

const calculateVoltageDrop = () => {
    const I = parseFloat(current);
    const L = parseFloat(length);
    const V = parseFloat(voltage);
    const R = cableResistance[cableSize as keyof typeof cableResistance];

    if (I > 0 && L > 0 && R && V > 0) {
      const limit = circuitType === "lighting" ? 3 : 5; // BS 7671 design limits
      const vdVolts =
        phase === "single"
          ? (2 * I * L * R) / 1000 // line and neutral return path
          : (Math.sqrt(3) * I * L * R) / 1000; // three-phase
      const percentageDrop = (vdVolts / V) * 100;
      const acceptable = percentageDrop <= limit;

      const newResult = {
        voltageDrop: vdVolts,
        percentageDrop,
        acceptable,
        limitPercent: limit
      };
      setResult(newResult);
      
      // Save to history
      const inputs = { current, length, cableSize, voltage, phase, circuitType };
      historyRef.current?.saveCalculation(inputs, newResult, acceptable);
      
      toast({
        title: acceptable ? "Calculation Complete" : "Warning: Exceeds Limits",
        description: `${vdVolts.toFixed(2)}V drop (${percentageDrop.toFixed(2)}%)`,
        variant: acceptable ? "default" : "destructive",
      });
    }
  };

const reset = () => {
    setCurrent("");
    setLength("");
    setCableSize("");
    setVoltage("230");
    setPhase("single");
    setCircuitType("lighting");
    setResult(null);
  };

  const handlePresetSelect = (preset: any) => {
    setCurrent(preset.inputs.current || "");
    setLength(preset.inputs.length || "");
    setCableSize(preset.inputs.cableSize || "");
    setVoltage(preset.inputs.voltage || "230");
    setPhase(preset.inputs.phase || "single");
    setCircuitType(preset.inputs.circuitType || "lighting");
    toast({
      title: "Preset Applied", 
      description: preset.name,
    });
  };

  const handleRestoreCalculation = (entry: any) => {
    setCurrent(entry.inputs.current || "");
    setLength(entry.inputs.length || "");
    setCableSize(entry.inputs.cableSize || "");
    setVoltage(entry.inputs.voltage || "230");
    setPhase(entry.inputs.phase || "single");
    setCircuitType(entry.inputs.circuitType || "lighting");
    setResult(entry.results);
  };

  const copyResults = async () => {
    if (!result) return;
    
    const text = `Voltage Drop Calculation:
Voltage Drop: ${result.voltageDrop.toFixed(2)} V
Percentage Drop: ${result.percentageDrop.toFixed(2)}%
Limit: ${result.limitPercent}%
Status: ${result.acceptable ? 'ACCEPTABLE' : 'EXCEEDS LIMIT'}
Terminal Voltage: ${(parseFloat(voltage) - result.voltageDrop).toFixed(2)} V`;
    
    const success = await copyToClipboard(text);
    toast({
      title: success ? "Copied!" : "Copy Failed",
      description: success ? "Results copied to clipboard" : "Please try again",
      variant: success ? "default" : "destructive",
    });
  };

  const shareResults = async () => {
    if (!result) return;
    
    const text = `Voltage Drop: ${result.voltageDrop.toFixed(2)}V (${result.percentageDrop.toFixed(2)}%) - ${result.acceptable ? 'OK' : 'FAIL'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "Voltage Drop Calculation", text });
      } catch (error) {
        copyResults();
      }
    } else {
      copyResults();
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <QuickCalculationPresets 
        calculatorType="voltage-drop"
        onPresetSelect={handlePresetSelect}
      />

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Voltage Drop Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate voltage drop across cable runs according to BS 7671 requirements.
          </CardDescription>
        </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Supply Voltage (V)"
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              placeholder="e.g., 230"
              unit="V"
            />

            <div className="space-y-4">
              <MobileInput
                label="Load Current (A)"
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g., 20"
                unit="A"
              />
              <SmartInputSuggestions
                fieldType="current"
                currentValue={current}
                onSuggestionSelect={setCurrent}
                calculatorType="voltage-drop"
              />
            </div>

            <div className="space-y-4">
              <MobileInput
                label="Cable Length (m)"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g., 50"
                unit="m"
              />
              <SmartInputSuggestions
                fieldType="length"
                currentValue={length}
                onSuggestionSelect={setLength}
                calculatorType="voltage-drop"
              />
            </div>

            <MobileSelect value={cableSize} onValueChange={setCableSize}>
              <MobileSelectTrigger label="Cable Size (mm²)">
                <MobileSelectValue placeholder="Select cable size" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="1.0">1.0mm²</MobileSelectItem>
                <MobileSelectItem value="1.5">1.5mm²</MobileSelectItem>
                <MobileSelectItem value="2.5">2.5mm²</MobileSelectItem>
                <MobileSelectItem value="4.0">4.0mm²</MobileSelectItem>
                <MobileSelectItem value="6.0">6.0mm²</MobileSelectItem>
                <MobileSelectItem value="10.0">10.0mm²</MobileSelectItem>
                <MobileSelectItem value="16.0">16.0mm²</MobileSelectItem>
                <MobileSelectItem value="25.0">25.0mm²</MobileSelectItem>
                <MobileSelectItem value="35.0">35.0mm²</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={phase} onValueChange={(v: "single" | "three") => setPhase(v)}>
              <MobileSelectTrigger label="System Phase">
                <MobileSelectValue placeholder="Select phase" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="single">Single-phase (1φ)</MobileSelectItem>
                <MobileSelectItem value="three">Three-phase (3φ)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={circuitType} onValueChange={(v: "lighting" | "other") => setCircuitType(v)}>
              <MobileSelectTrigger label="Circuit Type (BS 7671 limit)">
                <MobileSelectValue placeholder="Select circuit type" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="lighting">Lighting (3%)</MobileSelectItem>
                <MobileSelectItem value="other">Other final circuits (5%)</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            <div className="flex gap-2">
              <MobileButton onClick={calculateVoltageDrop} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Voltage Drop Analysis</h3>
                    <Badge 
                      variant={result.acceptable ? "default" : "destructive"}
                      className="mb-4"
                    >
                      {result.acceptable ? "✓ Acceptable" : "✗ Exceeds limits"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Voltage Drop:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.voltageDrop.toFixed(2)} V</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Percentage Drop:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.percentageDrop.toFixed(2)}%</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Design Limit ({circuitType === "lighting" ? "Lighting" : "Other"}):</span>
                      <div className="font-mono text-elec-yellow">{result.limitPercent.toFixed(0)}%</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">System Phase:</span>
                      <div className="font-mono text-elec-yellow">{phase === "single" ? "Single-phase (1φ)" : "Three-phase (3φ)"}</div>
                    </div>
                    
                     <div>
                       <span className="text-muted-foreground">Terminal Voltage:</span>
                       <div className="font-mono text-elec-yellow">{(parseFloat(voltage) - result.voltageDrop).toFixed(2)} V</div>
                     </div>
                   </div>
                   
                   <div className="flex gap-2 mt-4">
                     <MobileButton onClick={copyResults} variant="elec-outline" size="sm" className="flex-1">
                       <Copy className="h-4 w-4 mr-2" />
                       Copy
                     </MobileButton>
                     <MobileButton onClick={shareResults} variant="elec-outline" size="sm" className="flex-1">
                       <Share2 className="h-4 w-4 mr-2" />
                       Share
                     </MobileButton>
                   </div>
                 </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter all values to calculate voltage drop
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                BS 7671 limits: 3% for lighting circuits, 5% for other circuits from origin to furthest point.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Calculation History */}
    <CalculationHistory
      ref={historyRef}
      calculatorType="voltage-drop"
      onRestoreCalculation={handleRestoreCalculation}
    />
  </div>
  );
};

export default VoltageDropCalculator;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, Info, Calculator, RotateCcw, Settings } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { calculateTransformer, transformerPresets, type TransformerInputs, type TransformerResults } from "@/lib/transformer-calcs";

const TransformerCalculator = () => {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [primaryVoltage, setPrimaryVoltage] = useState<string>("");
  const [secondaryVoltage, setSecondaryVoltage] = useState<string>("");
  const [kvaRating, setKvaRating] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [phase, setPhase] = useState<string>("three");
  const [frequency, setFrequency] = useState<string>("50");
  const [percentImpedance, setPercentImpedance] = useState<string>("6");
  const [connectionType, setConnectionType] = useState<string>("Dyn11");
  const [sourceFaultLevel, setSourceFaultLevel] = useState<string>("");
  const [ambientTemp, setAmbientTemp] = useState<string>("40");
  const [altitude, setAltitude] = useState<string>("0");
  const [harmonics, setHarmonics] = useState(false);
  const [result, setResult] = useState<TransformerResults | null>(null);

  const handleCalculate = () => {
    const inputs: TransformerInputs = {
      primaryVoltage: parseFloat(primaryVoltage),
      secondaryVoltage: parseFloat(secondaryVoltage),
      kvaRating: parseFloat(kvaRating),
      powerFactor: parseFloat(powerFactor),
      phase: phase as 'single' | 'three',
      frequency: parseFloat(frequency),
      percentImpedance: parseFloat(percentImpedance),
      sourceFaultLevel: sourceFaultLevel ? parseFloat(sourceFaultLevel) : undefined,
      ambientTemp: parseFloat(ambientTemp),
      altitude: parseFloat(altitude),
      harmonics,
      connectionType
    };

    if (inputs.primaryVoltage > 0 && inputs.secondaryVoltage > 0 && inputs.kvaRating > 0) {
      const transformerResults = calculateTransformer(inputs);
      setResult(transformerResults);
    }
  };

  const reset = () => {
    setPrimaryVoltage("");
    setSecondaryVoltage("");
    setKvaRating("");
    setPowerFactor("0.85");
    setPhase("three");
    setFrequency("50");
    setPercentImpedance("6");
    setConnectionType("Dyn11");
    setSourceFaultLevel("");
    setAmbientTemp("40");
    setAltitude("0");
    setHarmonics(false);
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Transformer Calculator</CardTitle>
        </div>
        <CardDescription>
          Comprehensive transformer calculations with BS 7671 18th Edition compliance. Enter primary and secondary parameters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Primary Voltage (V)"
              type="number"
              value={primaryVoltage}
              onChange={(e) => setPrimaryVoltage(e.target.value)}
              placeholder="e.g., 11000"
              unit="V"
            />

            <MobileInput
              label="Secondary Voltage (V)"
              type="number"
              value={secondaryVoltage}
              onChange={(e) => setSecondaryVoltage(e.target.value)}
              placeholder="e.g., 400"
              unit="V"
            />

            <MobileInput
              label="kVA Rating"
              type="number"
              value={kvaRating}
              onChange={(e) => setKvaRating(e.target.value)}
              placeholder="e.g., 500"
              unit="kVA"
            />

            <div className="grid grid-cols-2 gap-3">
              <MobileInput
                label="Power Factor"
                type="number"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                placeholder="0.85"
                step="0.01"
                min="0.1"
                max="1"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Phase</label>
                <div className="flex gap-2">
                  <Badge
                    variant={phase === 'single' ? 'default' : 'outline'}
                    className={`cursor-pointer ${phase === 'single' ? 'bg-elec-yellow text-black' : ''}`}
                    onClick={() => setPhase('single')}
                  >
                    Single
                  </Badge>
                  <Badge
                    variant={phase === 'three' ? 'default' : 'outline'}
                    className={`cursor-pointer ${phase === 'three' ? 'bg-elec-yellow text-black' : ''}`}
                    onClick={() => setPhase('three')}
                  >
                    Three
                  </Badge>
                </div>
              </div>
            </div>

            <MobileInput
              label="% Impedance"
              type="number"
              value={percentImpedance}
              onChange={(e) => setPercentImpedance(e.target.value)}
              placeholder="6"
              unit="%"
            />

            {/* Advanced Settings Toggle */}
            <MobileButton
              variant="elec-outline"
              onClick={() => setAdvancedMode(!advancedMode)}
              className="w-full"
              icon={<Settings className="h-4 w-4" />}
            >
              {advancedMode ? 'Hide' : 'Show'} Advanced
            </MobileButton>

            {advancedMode && (
              <div className="space-y-3 border border-elec-yellow/10 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Frequency (Hz)"
                    type="number"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    placeholder="50"
                    unit="Hz"
                  />
                  
                  <MobileInput
                    label="Ambient Temp (°C)"
                    type="number"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                    placeholder="40"
                    unit="°C"
                  />
                </div>

                <MobileInput
                  label="Connection Type"
                  value={connectionType}
                  onChange={(e) => setConnectionType(e.target.value)}
                  placeholder="Dyn11"
                />

                <MobileInput
                  label="Source Fault Level (MVA)"
                  type="number"
                  value={sourceFaultLevel}
                  onChange={(e) => setSourceFaultLevel(e.target.value)}
                  placeholder="100"
                  unit="MVA"
                />

                <div className="flex items-center gap-2">
                  <Switch
                    id="harmonics"
                    checked={harmonics}
                    onCheckedChange={setHarmonics}
                  />
                  <Label htmlFor="harmonics" className="text-sm">
                    Harmonic loads present
                  </Label>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <MobileButton 
                onClick={handleCalculate} 
                className="flex-1" 
                variant="elec" 
                icon={<Calculator className="h-4 w-4" />}
                disabled={!primaryVoltage || !secondaryVoltage || !kvaRating}
              >
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Transformer Analysis</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.transformerType.toUpperCase()} • {result.voltageRatio.toFixed(2)}:1
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Primary Current:</span>
                      <div className="font-mono text-elec-yellow">{result.primaryRatedCurrent.toFixed(1)} A</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Secondary Current:</span>
                      <div className="font-mono text-elec-yellow">{result.secondaryRatedCurrent.toFixed(1)} A</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Power (kW):</span>
                      <div className="font-mono text-elec-yellow">{result.kw.toFixed(1)} kW</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Efficiency:</span>
                      <div className="font-mono text-elec-yellow">{(result.efficiency * 100).toFixed(1)}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fault Current:</span>
                      <div className="font-mono text-elec-yellow">{(result.transformerFaultCurrent / 1000).toFixed(1)} kA</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Regulation:</span>
                      <div className="font-mono text-elec-yellow">{(result.voltageRegulation * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter primary voltage, secondary voltage and kVA rating to analyse transformer
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                BS 7671: Transformers must comply with fault current ratings and protection coordination requirements.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformerCalculator;
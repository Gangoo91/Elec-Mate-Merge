
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap, Info, Calculator, RotateCcw, Settings, AlertTriangle, TrendingUp, Activity, Gauge } from "lucide-react";
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
    <Card className="w-full max-w-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Enhanced Transformer Analysis</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="advanced-mode" className="text-sm">Advanced</Label>
            <Switch
              id="advanced-mode"
              checked={advancedMode}
              onCheckedChange={setAdvancedMode}
            />
          </div>
        </div>
        <CardDescription>
          Comprehensive transformer calculations with BS 7671 18th Edition compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Basic Inputs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Primary Parameters
              </h3>
              
              <MobileSelectWrapper
                label="Primary Voltage"
                value={primaryVoltage}
                onValueChange={setPrimaryVoltage}
                options={transformerPresets.voltages.primary}
                placeholder="Select or enter voltage"
              />
              
              <MobileSelectWrapper
                label="Secondary Voltage"
                value={secondaryVoltage}
                onValueChange={setSecondaryVoltage}
                options={transformerPresets.voltages.secondary}
                placeholder="Select or enter voltage"
              />
              
              <MobileSelectWrapper
                label="kVA Rating"
                value={kvaRating}
                onValueChange={setKvaRating}
                options={transformerPresets.kvaRatings}
                placeholder="Select rating"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <MobileSelectWrapper
                  label="Phase"
                  value={phase}
                  onValueChange={setPhase}
                  options={[
                    { value: 'single', label: 'Single Phase' },
                    { value: 'three', label: 'Three Phase' }
                  ]}
                />
                
                <MobileInputWrapper
                  label="Power Factor"
                  value={powerFactor}
                  onChange={setPowerFactor}
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="1"
                />
              </div>
            </div>

            {/* Advanced Inputs */}
            {advancedMode && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Advanced Parameters
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  <MobileInputWrapper
                    label="Frequency (Hz)"
                    value={frequency}
                    onChange={setFrequency}
                    type="number"
                  />
                  
                  <MobileSelectWrapper
                    label="% Impedance"
                    value={percentImpedance}
                    onValueChange={setPercentImpedance}
                    options={transformerPresets.impedances}
                  />
                </div>
                
                <MobileSelectWrapper
                  label="Connection Type"
                  value={connectionType}
                  onValueChange={setConnectionType}
                  options={transformerPresets.connections}
                />
                
                <MobileInputWrapper
                  label="Source Fault Level (MVA)"
                  value={sourceFaultLevel}
                  onChange={setSourceFaultLevel}
                  type="number"
                  hint="Optional - for combined fault calculation"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <MobileInputWrapper
                    label="Ambient Temp (°C)"
                    value={ambientTemp}
                    onChange={setAmbientTemp}
                    type="number"
                  />
                  
                  <MobileInputWrapper
                    label="Altitude (m)"
                    value={altitude}
                    onChange={setAltitude}
                    type="number"
                  />
                </div>
                
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <MobileButton 
              onClick={handleCalculate} 
              variant="elec" 
              size="wide"
              icon={<Calculator className="h-4 w-4" />}
            >
              Analyse Transformer
            </MobileButton>
            <MobileButton variant="elec-outline" onClick={reset} size="icon">
              <RotateCcw className="h-4 w-4" />
            </MobileButton>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Transformer Analysis Results
              </h3>
              
              {/* Mobile-optimized results display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Basic Info */}
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        {result.transformerType.toUpperCase().replace('-', ' ')}
                      </Badge>
                      <div className="text-2xl font-bold text-elec-yellow">
                        {result.voltageRatio.toFixed(2)}:1
                      </div>
                      <div className="text-sm text-muted-foreground">Voltage Ratio</div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Currents */}
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Primary I:</span>
                        <span className="font-mono text-elec-yellow">{result.primaryRatedCurrent.toFixed(1)}A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Secondary I:</span>
                        <span className="font-mono text-elec-yellow">{result.secondaryRatedCurrent.toFixed(1)}A</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Full Load I₂:</span>
                        <span className="font-mono text-elec-yellow">{result.secondaryFullLoadCurrent.toFixed(1)}A</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Power */}
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">kW:</span>
                        <span className="font-mono text-elec-yellow">{result.kw.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">kVA:</span>
                        <span className="font-mono text-elec-yellow">{result.kva.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">kVAr:</span>
                        <span className="font-mono text-elec-yellow">{result.kvar.toFixed(1)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Fault Current */}
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fault I (TX):</span>
                        <span className="font-mono text-elec-yellow">{(result.transformerFaultCurrent/1000).toFixed(1)}kA</span>
                      </div>
                      {result.combinedFaultCurrent && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Combined:</span>
                          <span className="font-mono text-elec-yellow">{(result.combinedFaultCurrent/1000).toFixed(1)}kA</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Inrush:</span>
                        <span className="font-mono text-elec-yellow">{(result.inrushCurrent/1000).toFixed(1)}kA</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Performance */}
                <Card className="bg-elec-card border-elec-yellow/20">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Efficiency:</span>
                        <span className="font-mono text-elec-yellow">{(result.efficiency*100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Regulation:</span>
                        <span className="font-mono text-elec-yellow">{(result.voltageRegulation*100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Loss:</span>
                        <span className="font-mono text-elec-yellow">{result.totalLoss.toFixed(1)}kW</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Derating */}
                {(result.temperatureDerating || result.altitudeDerating || result.harmonicDerating) && (
                  <Card className="bg-elec-card border-elec-yellow/20">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {result.temperatureDerating && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Temp Derating:</span>
                            <span className="font-mono text-orange-400">{(result.temperatureDerating*100).toFixed(0)}%</span>
                          </div>
                        )}
                        {result.altitudeDerating && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Alt Derating:</span>
                            <span className="font-mono text-orange-400">{(result.altitudeDerating*100).toFixed(0)}%</span>
                          </div>
                        )}
                        {result.harmonicDerating && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Harmonic:</span>
                            <span className="font-mono text-orange-400">{(result.harmonicDerating*100).toFixed(0)}%</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Practical Analysis & Feedback */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  What This Analysis Means
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Key Results Explanation */}
                  <Card className="bg-elec-card border-elec-yellow/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-elec-yellow mb-3">Key Parameters Explained</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className="text-elec-yellow">Voltage Ratio ({result.voltageRatio.toFixed(2)}:1):</strong>
                          <p className="text-muted-foreground mt-1">
                            {result.transformerType === 'step-down' ? 'Reduces' : result.transformerType === 'step-up' ? 'Increases' : 'Maintains'} voltage by this factor. 
                            {result.transformerType === 'step-down' && ' Typical for distribution transformers.'}
                            {result.transformerType === 'step-up' && ' Used for transmission or inverter applications.'}
                          </p>
                        </div>
                        
                        <div>
                          <strong className="text-elec-yellow">Full Load Current ({result.secondaryFullLoadCurrent.toFixed(1)}A):</strong>
                          <p className="text-muted-foreground mt-1">
                            Actual current drawn at {(parseFloat(powerFactor)*100).toFixed(0)}% power factor. Use this for cable sizing and protection settings.
                          </p>
                        </div>
                        
                        <div>
                          <strong className="text-elec-yellow">Fault Current ({(result.transformerFaultCurrent/1000).toFixed(1)}kA):</strong>
                          <p className="text-muted-foreground mt-1">
                            Maximum fault current available from transformer. Critical for switchgear selection and protection coordination.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Performance Analysis */}
                  <Card className="bg-elec-card border-elec-yellow/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-elec-yellow mb-3">Performance Assessment</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong className="text-elec-yellow">Efficiency ({(result.efficiency*100).toFixed(1)}%):</strong>
                          <p className="text-muted-foreground mt-1">
                            {result.efficiency > 0.95 ? 'Excellent' : result.efficiency > 0.90 ? 'Good' : 'Acceptable'} efficiency. 
                            Higher efficiency reduces running costs and heat generation.
                          </p>
                        </div>
                        
                        <div>
                          <strong className="text-elec-yellow">Voltage Regulation ({(result.voltageRegulation*100).toFixed(1)}%):</strong>
                          <p className="text-muted-foreground mt-1">
                            {result.voltageRegulation < 0.03 ? 'Excellent' : result.voltageRegulation < 0.05 ? 'Good' : 'High'} regulation. 
                            {result.voltageRegulation > 0.05 && 'Consider tap changer or larger transformer.'}
                          </p>
                        </div>
                        
                        <div>
                          <strong className="text-elec-yellow">Inrush Current ({(result.inrushCurrent/1000).toFixed(1)}kA):</strong>
                          <p className="text-muted-foreground mt-1">
                            {result.inrushCurrent > result.primaryRatedCurrent * 15 ? 'High' : 'Normal'} inrush current. 
                            Ensure upstream protection can handle this without nuisance tripping.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* BS 7671 Compliance */}
                <Card className="bg-elec-card border-blue-500/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-400 mb-3">BS 7671 18th Edition Compliance Notes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div>
                          <strong>Protection Requirements:</strong>
                          <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                            <li>Primary protection: {result.primaryRatedCurrent > 16 ? 'HRC fuses or MCCB' : 'MCB suitable'}</li>
                            <li>Secondary protection: Size for {result.secondaryFullLoadCurrent.toFixed(1)}A full load current</li>
                            <li>Earth fault protection required (411.3.2)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <strong>Cable Sizing:</strong>
                          <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                            <li>Primary cable: Min {(result.primaryFullLoadCurrent * 1.25).toFixed(1)}A capacity</li>
                            <li>Secondary cable: Min {(result.secondaryFullLoadCurrent * 1.25).toFixed(1)}A capacity</li>
                            <li>Consider voltage drop (525.1)</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <strong>Installation Requirements:</strong>
                          <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                            <li>{parseFloat(kvaRating) >= 500 ? 'Separate transformer room required' : 'Adequate ventilation needed'}</li>
                            <li>Fire barriers if oil-filled (422.3)</li>
                            <li>Access for maintenance (132.12)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <strong>Testing:</strong>
                          <ul className="list-disc list-inside text-muted-foreground mt-1 space-y-1">
                            <li>Insulation resistance test</li>
                            <li>Polarity check (61.1.5)</li>
                            <li>Earth fault loop impedance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Warnings */}
              {result.warnings.length > 0 && (
                <Alert className="border-orange-500/20 bg-orange-500/10">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <AlertDescription className="text-orange-200">
                    <div className="space-y-1">
                      {result.warnings.map((warning, index) => (
                        <div key={index}>⚠️ {warning}</div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <Alert className="border-blue-500/20 bg-blue-500/10">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-200">
                    <div className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <div key={index}>💡 {rec}</div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformerCalculator;

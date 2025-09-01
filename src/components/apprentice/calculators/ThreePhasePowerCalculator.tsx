
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Zap, Info, Calculator, RotateCcw, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ThreePhasePowerCalculator = () => {
  const [voltage, setVoltage] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [powerFactor, setPowerFactor] = useState<string>("0.85");
  const [connection, setConnection] = useState<string>("star");
  const [voltageType, setVoltageType] = useState<string>("line-line");
  const [currentType, setCurrentType] = useState<string>("line");
  const [pfType, setPfType] = useState<string>("lagging");
  const [frequency, setFrequency] = useState<string>("50");
  const [mode, setMode] = useState<string>("power");
  const [solveFor, setSolveFor] = useState<string>("power");
  const [mechanicalPower, setMechanicalPower] = useState<string>("");
  const [mechanicalPowerUnit, setMechanicalPowerUnit] = useState<string>("kW");
  const [efficiency, setEfficiency] = useState<string>("85");
  const [targetPf, setTargetPf] = useState<string>("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentA, setCurrentA] = useState<string>("");
  const [currentB, setCurrentB] = useState<string>("");
  const [currentC, setCurrentC] = useState<string>("");
  
  const [result, setResult] = useState<{
    apparentPower: number;
    activePower: number;
    reactivePower: number;
    phaseVoltage: number;
    phaseCurrent: number;
    lineVoltage: number;
    lineCurrent: number;
    phaseAngle: number;
    pfQuality: "Good" | "Acceptable" | "Poor";
    protectiveDevice: string;
    unbalance?: number;
    correctionCapacitor?: number;
    perPhase: {
      voltage: number;
      current: number;
      power: number;
    };
  } | null>(null);

  const calculateThreePhasePower = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);
    const freq = parseFloat(frequency);
    const eff = parseFloat(efficiency) / 100;
    const mechPower = parseFloat(mechanicalPower);

    if (V <= 0 || I <= 0 || pf <= 0 || pf > 1) return;

    // Normalize inputs to line-to-line voltage and line current
    let VLL = V;
    let IL = I;

    // Convert voltage based on type and connection
    if (voltageType === "line-neutral" && connection === "star") {
      VLL = V * Math.sqrt(3);
    } else if (voltageType === "line-neutral" && connection === "delta") {
      VLL = V; // In delta, line-neutral doesn't apply
    }

    // Convert current based on type and connection
    if (currentType === "phase" && connection === "star") {
      IL = I; // In star, line current = phase current
    } else if (currentType === "phase" && connection === "delta") {
      IL = I * Math.sqrt(3); // In delta, line current = √3 × phase current
    }

    // Calculate power values
    const apparentPower = Math.sqrt(3) * VLL * IL / 1000; // kVA
    const activePower = apparentPower * pf; // kW
    const phaseAngle = Math.acos(pf) * (180 / Math.PI);
    const reactivePower = apparentPower * Math.sin(Math.acos(pf)) * (pfType === "lagging" ? 1 : -1); // kVAR

    // Calculate per-phase values
    const phaseVoltage = connection === "star" ? VLL / Math.sqrt(3) : VLL;
    const phaseCurrent = connection === "star" ? IL : IL / Math.sqrt(3);
    const phasePower = activePower / 3;

    // Power factor quality assessment
    let pfQuality: "Good" | "Acceptable" | "Poor";
    if (pf >= 0.95) pfQuality = "Good";
    else if (pf >= 0.85) pfQuality = "Acceptable";
    else pfQuality = "Poor";

    // Protective device sizing (indicative only)
    const ratedCurrent = IL;
    let protectiveDevice = "";
    if (ratedCurrent <= 6) protectiveDevice = "6A MCB/RCBO";
    else if (ratedCurrent <= 10) protectiveDevice = "10A MCB/RCBO";
    else if (ratedCurrent <= 16) protectiveDevice = "16A MCB/RCBO";
    else if (ratedCurrent <= 20) protectiveDevice = "20A MCB/RCBO";
    else if (ratedCurrent <= 25) protectiveDevice = "25A MCB/RCBO";
    else if (ratedCurrent <= 32) protectiveDevice = "32A MCB/RCBO";
    else if (ratedCurrent <= 40) protectiveDevice = "40A MCB/RCBO";
    else if (ratedCurrent <= 50) protectiveDevice = "50A MCB/RCBO";
    else if (ratedCurrent <= 63) protectiveDevice = "63A MCB/RCBO";
    else if (ratedCurrent <= 80) protectiveDevice = "80A MCCB";
    else if (ratedCurrent <= 100) protectiveDevice = "100A MCCB";
    else protectiveDevice = `${Math.ceil(ratedCurrent / 50) * 50}A MCCB`;

    // Calculate unbalance if all phase currents provided
    let unbalance = undefined;
    if (currentA && currentB && currentC) {
      const IA = parseFloat(currentA);
      const IB = parseFloat(currentB);
      const IC = parseFloat(currentC);
      const avgCurrent = (IA + IB + IC) / 3;
      const maxDeviation = Math.max(
        Math.abs(IA - avgCurrent),
        Math.abs(IB - avgCurrent),
        Math.abs(IC - avgCurrent)
      );
      unbalance = (maxDeviation / avgCurrent) * 100;
    }

    // Calculate power factor correction capacitor if target PF provided
    let correctionCapacitor = undefined;
    if (targetPf && parseFloat(targetPf) > pf) {
      const targetPfValue = parseFloat(targetPf);
      const targetAngle = Math.acos(targetPfValue);
      const currentAngle = Math.acos(pf);
      const Qc = activePower * (Math.tan(currentAngle) - Math.tan(targetAngle));
      correctionCapacitor = Qc; // kVAR
    }

    setResult({
      apparentPower,
      activePower,
      reactivePower,
      phaseVoltage,
      phaseCurrent,
      lineVoltage: VLL,
      lineCurrent: IL,
      phaseAngle,
      pfQuality,
      protectiveDevice,
      unbalance,
      correctionCapacitor,
      perPhase: {
        voltage: phaseVoltage,
        current: phaseCurrent,
        power: phasePower
      }
    });
  };

  const reset = () => {
    setVoltage("");
    setCurrent("");
    setPowerFactor("0.85");
    setConnection("star");
    setVoltageType("line-line");
    setCurrentType("line");
    setPfType("lagging");
    setFrequency("50");
    setMode("power");
    setSolveFor("power");
    setMechanicalPower("");
    setMechanicalPowerUnit("kW");
    setEfficiency("85");
    setTargetPf("");
    setCurrentA("");
    setCurrentB("");
    setCurrentC("");
    setAdvancedOpen(false);
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Three Phase Power Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate power values for three-phase electrical systems including apparent, active, and reactive power.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileSelect value={mode} onValueChange={setMode}>
              <MobileSelectTrigger label="Calculation Mode">
                <MobileSelectValue />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="power">Power Calculation</MobileSelectItem>
                <MobileSelectItem value="motor">Motor Sizing</MobileSelectItem>
              </MobileSelectContent>
            </MobileSelect>

            {mode === "power" && (
              <MobileSelect value={solveFor} onValueChange={setSolveFor}>
                <MobileSelectTrigger label="Solve For">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="power">Power (from V & I)</MobileSelectItem>
                  <MobileSelectItem value="current">Current (from V & P)</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            )}

            <div className="grid grid-cols-2 gap-3">
              <MobileSelect value={connection} onValueChange={setConnection}>
                <MobileSelectTrigger label="Connection">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="star">Star (Y)</MobileSelectItem>
                  <MobileSelectItem value="delta">Delta (Δ)</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <MobileSelect value={voltageType} onValueChange={setVoltageType}>
                <MobileSelectTrigger label="Voltage Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="line-line">Line-to-Line</MobileSelectItem>
                  <MobileSelectItem value="line-neutral" disabled={connection === "delta"}>
                    Line-to-Neutral
                  </MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MobileInput
                label={voltageType === "line-line" ? "Line Voltage (V)" : "Phase Voltage (V)"}
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                placeholder={voltageType === "line-line" ? "e.g., 400" : "e.g., 230"}
                unit="V"
              />

              <MobileInput
                label={currentType === "line" ? "Line Current (A)" : "Phase Current (A)"}
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                placeholder="e.g., 25"
                unit="A"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MobileSelect value={currentType} onValueChange={setCurrentType}>
                <MobileSelectTrigger label="Current Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="line">Line Current</MobileSelectItem>
                  <MobileSelectItem value="phase">Phase Current</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <MobileInput
                label="Frequency (Hz)"
                type="number"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="50"
                unit="Hz"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MobileInput
                label="Power Factor"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                placeholder="e.g., 0.85"
              />

              <MobileSelect value={pfType} onValueChange={setPfType}>
                <MobileSelectTrigger label="PF Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="lagging">Lagging</MobileSelectItem>
                  <MobileSelectItem value="leading">Leading</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>
            </div>

            {mode === "motor" && (
              <div className="space-y-3 p-4 bg-elec-card/50 rounded-lg border border-elec-yellow/20">
                <h4 className="font-medium text-elec-yellow">Motor Sizing Parameters</h4>
                <div className="grid grid-cols-2 gap-3">
                  <MobileInput
                    label="Mechanical Power"
                    type="number"
                    value={mechanicalPower}
                    onChange={(e) => setMechanicalPower(e.target.value)}
                    placeholder="e.g., 15"
                    unit={mechanicalPowerUnit}
                  />
                  <MobileSelect value={mechanicalPowerUnit} onValueChange={setMechanicalPowerUnit}>
                    <MobileSelectTrigger label="Unit">
                      <MobileSelectValue />
                    </MobileSelectTrigger>
                    <MobileSelectContent>
                      <MobileSelectItem value="kW">kW</MobileSelectItem>
                      <MobileSelectItem value="HP">HP</MobileSelectItem>
                    </MobileSelectContent>
                  </MobileSelect>
                </div>
                <MobileInput
                  label="Efficiency (%)"
                  type="number"
                  min="1"
                  max="100"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  placeholder="85"
                  unit="%"
                />
              </div>
            )}

            <MobileInput
              label="Target Power Factor (optional)"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={targetPf}
              onChange={(e) => setTargetPf(e.target.value)}
              placeholder="e.g., 0.95"
            />

            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <MobileButton variant="outline" className="w-full justify-between">
                  Advanced Options
                  {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </MobileButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-3 mt-3">
                <div className="p-4 bg-elec-card/30 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium mb-3 text-sm text-elec-yellow">Current Unbalance Analysis</h5>
                  <div className="grid grid-cols-3 gap-2">
                    <MobileInput
                      label="IA (A)"
                      type="number"
                      value={currentA}
                      onChange={(e) => setCurrentA(e.target.value)}
                      placeholder="25"
                      unit="A"
                    />
                    <MobileInput
                      label="IB (A)"
                      type="number"
                      value={currentB}
                      onChange={(e) => setCurrentB(e.target.value)}
                      placeholder="24"
                      unit="A"
                    />
                    <MobileInput
                      label="IC (A)"
                      type="number"
                      value={currentC}
                      onChange={(e) => setCurrentC(e.target.value)}
                      placeholder="26"
                      unit="A"
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex gap-2">
              <MobileButton onClick={calculateThreePhasePower} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            {/* Power Factor Quality Badge */}
            {result && (
              <div className="flex justify-center">
                <Badge 
                  variant={result.pfQuality === "Good" ? "default" : result.pfQuality === "Acceptable" ? "secondary" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {result.pfQuality === "Good" && <CheckCircle className="h-3 w-3" />}
                  {result.pfQuality === "Acceptable" && <Info className="h-3 w-3" />}
                  {result.pfQuality === "Poor" && <XCircle className="h-3 w-3" />}
                  Power Factor: {result.pfQuality}
                </Badge>
              </div>
            )}

            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Three Phase Power Results</h3>
                    <div className="flex gap-2 justify-center">
                      <Badge variant="secondary">√3 = 1.732</Badge>
                      <Badge variant="outline">φ = {result.phaseAngle.toFixed(1)}°</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Main Power Values */}
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold text-elec-yellow">Power Triangle</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Apparent Power (S):</span>
                        <div className="font-mono text-elec-yellow">{result.apparentPower.toFixed(2)} kVA</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active Power (P):</span>
                        <div className="font-mono text-elec-yellow">{result.activePower.toFixed(2)} kW</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Reactive Power (Q):</span>
                        <div className="font-mono text-elec-yellow">
                          {result.reactivePower.toFixed(2)} kVAR {pfType === "lagging" ? "(Inductive)" : "(Capacitive)"}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Power Factor:</span>
                        <div className="font-mono text-elec-yellow">{powerFactor} {pfType}</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Voltage and Current Values */}
                  <div className="space-y-3 text-sm">
                    <h4 className="font-semibold text-elec-yellow">Voltage & Current</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Line Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.lineVoltage.toFixed(1)} V</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Line Current:</span>
                        <div className="font-mono text-elec-yellow">{result.lineCurrent.toFixed(2)} A</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Phase Voltage:</span>
                        <div className="font-mono text-elec-yellow">{result.phaseVoltage.toFixed(1)} V</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phase Current:</span>
                        <div className="font-mono text-elec-yellow">{result.phaseCurrent.toFixed(2)} A</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <span className="text-muted-foreground">Power per Phase:</span>
                        <div className="font-mono text-elec-yellow">{result.perPhase.power.toFixed(2)} kW</div>
                      </div>
                    </div>
                  </div>

                  {/* Unbalance Analysis */}
                  {result.unbalance !== undefined && (
                    <>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <h4 className="font-semibold text-elec-yellow">Current Unbalance</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Unbalance:</span>
                          <div className="font-mono text-elec-yellow">{result.unbalance.toFixed(1)}%</div>
                          {result.unbalance > 5 && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              High
                            </Badge>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Power Factor Correction */}
                  {result.correctionCapacitor !== undefined && (
                    <>
                      <Separator />
                      <div className="space-y-2 text-sm">
                        <h4 className="font-semibold text-elec-yellow">Power Factor Correction</h4>
                        <div>
                          <span className="text-muted-foreground">Capacitor Required:</span>
                          <div className="font-mono text-elec-yellow">{result.correctionCapacitor.toFixed(2)} kVAR</div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  {/* Protective Device */}
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold text-elec-yellow">Indicative Protection</h4>
                    <div>
                      <span className="text-muted-foreground">Suggested Device:</span>
                      <div className="font-mono text-elec-yellow">{result.protectiveDevice}</div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      *Indicative only - proper circuit design required per BS 7671
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Formulae: S = √3 × VLL × IL</div>
                    <div>P = S × cos(φ), Q = S × sin(φ)</div>
                    <div>Connection: {connection.toUpperCase()}, {voltageType === "line-line" ? "Line-Line" : "Line-Neutral"} measurement</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter values to calculate three-phase power
                </div>
              )}
            </div>

            {/* BS 7671 Guidance */}
            <div className="space-y-4">
              <Alert className="border-blue-500/20 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-200">
                  <strong>UK Standard:</strong> Three-phase supply is 400V line-to-line, 230V line-to-neutral, 50Hz (BS 7671:2018+A2:2022)
                </AlertDescription>
              </Alert>

              <div className="bg-elec-card/30 p-4 rounded-lg border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  What This Means - BS 7671 Context
                </h4>
                <div className="space-y-2 text-sm text-elec-light">
                  <p><strong>Power Factor:</strong> Values below 0.85 may require correction per supply authority requirements. Poor power factor increases current draw and cable sizing.</p>
                  <p><strong>Star vs Delta:</strong> Star connection provides neutral for single-phase loads. Delta connection is common for motors and balanced loads.</p>
                  <p><strong>Current Unbalance:</strong> {">"}5% unbalance causes neutral current in star systems and reduces motor efficiency. {">"}10% requires investigation.</p>
                  <p><strong>Protection:</strong> Final circuit protection must account for motor starting currents (typically 6-8× full load). Use BS EN 60947-4-1 rated devices.</p>
                  <p><strong>Cable Sizing:</strong> Consider voltage drop (BS 7671 Section 525), current-carrying capacity with grouping/temperature factors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreePhasePowerCalculator;

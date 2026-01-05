
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Info, Calculator, RotateCcw, CheckCircle, AlertTriangle, XCircle, Zap, BookOpen } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InfoBox from "@/components/common/InfoBox";

const LEDDriverCalculator = () => {
  const [calculationType, setCalculationType] = useState<string>("driver-sizing");
  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connectionType, setConnectionType] = useState<string>("series");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("12");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [result, setResult] = useState<{
    totalVoltage: number;
    totalCurrent: number;
    totalPower: number;
    driverPower: number;
    driverCurrent: number;
    connectionConfig: string;
    powerLoss: number;
    recommendations: {
      status: 'good' | 'caution' | 'issue';
      messages: string[];
      complianceVoltage: number;
      recommendedDriverPower: number;
      nearestStandardDriver: string;
      connectionGuidance: string;
    };
  } | null>(null);

  const calculateLEDDriver = () => {
    const vLed = parseFloat(ledVoltage);
    const iLed = parseFloat(ledCurrent) / 1000; // Convert mA to A
    const count = parseInt(numLeds);
    const vSupply = parseFloat(supplyVoltage);
    const eff = parseFloat(efficiency);

    if (vLed > 0 && iLed > 0 && count > 0 && vSupply > 0 && eff > 0) {
      let totalVoltage, totalCurrent, totalPower;
      
      if (connectionType === "series") {
        totalVoltage = vLed * count;
        totalCurrent = iLed;
        totalPower = totalVoltage * totalCurrent;
      } else { // parallel
        totalVoltage = vLed;
        totalCurrent = iLed * count;
        totalPower = totalVoltage * totalCurrent;
      }

      const driverPower = totalPower / eff;
      const driverCurrent = driverPower / vSupply;
      const powerLoss = driverPower - totalPower;

      // Enhanced recommendations and compliance
      const complianceVoltage = connectionType === "series" ? totalVoltage + (totalVoltage * 0.1) : vSupply;
      const recommendedDriverPower = driverPower * 1.2; // 20% safety margin
      
      // Determine nearest standard driver ratings
      const standardPowers = [1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200];
      const nearestPower = standardPowers.find(p => p >= recommendedDriverPower) || Math.ceil(recommendedDriverPower);
      
      // Status and guidance assessment
      let status: 'good' | 'caution' | 'issue' = 'good';
      const messages: string[] = [];
      
      // Voltage compliance checks
      if (connectionType === "series" && totalVoltage > vSupply * 0.9) {
        status = 'issue';
        messages.push("Insufficient voltage headroom for constant current operation");
      } else if (connectionType === "series" && totalVoltage > vSupply * 0.8) {
        status = 'caution';
        messages.push("Limited voltage headroom - consider higher supply voltage");
      }
      
      // Current checks
      if (iLed > 1 && status === 'good') {
        status = 'caution';
        messages.push("High current LEDs require careful thermal management");
      }
      
      // Power efficiency
      const efficiencyPercent = eff * 100;
      if (efficiencyPercent < 80 && status === 'good') {
        status = 'caution';
        messages.push("Low efficiency driver - consider higher grade driver");
      }
      
      // Connection guidance
      let connectionGuidance = "";
      if (connectionType === "series") {
        connectionGuidance = count > 10 ? 
          "Series connection suitable but consider parallel strings for >10 LEDs" :
          "Series connection recommended for consistent current";
      } else {
        connectionGuidance = count > 5 ? 
          "Parallel connection requires current balancing for >5 LEDs" :
          "Parallel connection suitable with proper current limiting";
      }
      
      if (status === 'good') {
        messages.push("Configuration meets BS 7671 safety requirements");
      }

      setResult({
        totalVoltage,
        totalCurrent: totalCurrent * 1000, // Convert back to mA for display
        totalPower,
        driverPower,
        driverCurrent,
        connectionConfig: connectionType,
        powerLoss,
        recommendations: {
          status,
          messages,
          complianceVoltage,
          recommendedDriverPower,
          nearestStandardDriver: `${nearestPower}W`,
          connectionGuidance
        }
      });
    }
  };

  const reset = () => {
    setLedVoltage("");
    setLedCurrent("");
    setNumLeds("1");
    setConnectionType("series");
    setSupplyVoltage("12");
    setEfficiency("0.85");
    setCalculationType("driver-sizing");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <CardTitle>LED Driver Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate LED driver requirements for single LEDs or LED arrays in series/parallel configurations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <MobileSelect value={calculationType} onValueChange={setCalculationType}>
                <MobileSelectTrigger label="Calculation Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
                  <MobileSelectItem value="driver-sizing">Driver Sizing</MobileSelectItem>
                  <MobileSelectItem value="array-design">Array Design</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <div>
                <MobileInput
                  id="led-voltage"
                  label="LED Forward Voltage (V)"
                  type="text"
                  inputMode="decimal"
                  value={ledVoltage}
                  onChange={(e) => setLedVoltage(e.target.value)}
                  placeholder="e.g., 3.2"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <MobileInput
                  id="led-current"
                  label="LED Forward Current (mA)"
                  type="text"
                  inputMode="numeric"
                  value={ledCurrent}
                  onChange={(e) => setLedCurrent(e.target.value)}
                  placeholder="e.g., 350"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <MobileInput
                  id="num-leds"
                  label="Number of LEDs"
                  type="text"
                  inputMode="numeric"
                  value={numLeds}
                  onChange={(e) => setNumLeds(e.target.value)}
                  placeholder="e.g., 10"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <MobileSelect value={connectionType} onValueChange={setConnectionType}>
                <MobileSelectTrigger label="Connection Type">
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent className="bg-elec-dark border-elec-yellow/20">
                  <MobileSelectItem value="series">Series</MobileSelectItem>
                  <MobileSelectItem value="parallel">Parallel</MobileSelectItem>
                </MobileSelectContent>
              </MobileSelect>

              <div>
                <MobileInput
                  id="supply-voltage"
                  label="Supply Voltage (V)"
                  type="text"
                  inputMode="numeric"
                  value={supplyVoltage}
                  onChange={(e) => setSupplyVoltage(e.target.value)}
                  placeholder="e.g., 12"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div>
                <MobileInput
                  id="efficiency"
                  label="Driver Efficiency"
                  type="text"
                  inputMode="decimal"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  placeholder="e.g., 0.85"
                  hint="Value between 0 and 1"
                  className="bg-elec-dark border-elec-yellow/20"
                />
              </div>

              <div className="flex gap-2">
                <MobileButton onClick={calculateLEDDriver} variant="elec" className="flex-1 min-h-[48px]">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </MobileButton>
                <MobileButton variant="elec-outline" onClick={reset} className="min-h-[48px]">
                  <RotateCcw className="h-4 w-4" />
                </MobileButton>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-elec-grey border border-elec-yellow/20 p-4 sm:p-6 min-h-[400px]">
                {result ? (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-3 sm:mb-4">LED Driver Results</h3>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                        <Badge variant="secondary" className="bg-elec-dark border-elec-yellow/30 text-elec-light">
                          {result.connectionConfig.toUpperCase()} Connection
                        </Badge>
                        <Badge variant={
                          result.recommendations.status === 'good' ? 'default' : 
                          result.recommendations.status === 'caution' ? 'secondary' : 'destructive'
                        } className="flex items-center gap-1 bg-elec-yellow text-elec-dark">
                          {result.recommendations.status === 'good' && <CheckCircle className="h-3 w-3" />}
                          {result.recommendations.status === 'caution' && <AlertTriangle className="h-3 w-3" />}
                          {result.recommendations.status === 'issue' && <XCircle className="h-3 w-3" />}
                          {result.recommendations.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <Separator className="bg-elec-yellow/20" />
                    
                    <div className="space-y-4">
                      {/* Primary Results Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-elec-dark/50 rounded-lg p-3 sm:p-4 text-center">
                          <div className="text-sm text-elec-light/70 mb-1">Total Voltage</div>
                          <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.totalVoltage.toFixed(1)} V</div>
                        </div>
                        <div className="bg-elec-dark/50 rounded-lg p-3 sm:p-4 text-center">
                          <div className="text-sm text-elec-light/70 mb-1">Total Current</div>
                          <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.totalCurrent.toFixed(0)} mA</div>
                        </div>
                      </div>
                      
                      <div className="bg-elec-dark/50 rounded-lg p-3 sm:p-4 text-center">
                        <div className="text-sm text-elec-light/70 mb-1">LED Array Power</div>
                        <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{result.totalPower.toFixed(2)} W</div>
                      </div>
                      
                      <Separator className="bg-elec-yellow/20" />
                      
                      {/* Recommended Driver Spec */}
                      <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                        <h4 className="font-semibold text-elec-yellow mb-3 text-center text-base sm:text-lg">Recommended Driver Specification</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div className="text-center">
                            <div className="text-elec-light/70">Compliance Voltage:</div>
                            <div className="font-bold text-elec-yellow">{result.recommendations.complianceVoltage.toFixed(1)} V</div>
                          </div>
                          <div className="text-center">
                            <div className="text-elec-light/70">Recommended Power:</div>
                            <div className="font-bold text-elec-yellow">{result.recommendations.recommendedDriverPower.toFixed(1)} W</div>
                          </div>
                          <div className="text-center">
                            <div className="text-elec-light/70">Nearest Standard:</div>
                            <div className="font-bold text-elec-yellow">{result.recommendations.nearestStandardDriver}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Secondary Results Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-elec-dark/50 rounded-lg p-3 sm:p-4 text-center">
                          <div className="text-sm text-elec-light/70 mb-1">Driver Power</div>
                          <div className="text-lg sm:text-xl font-bold text-elec-yellow">{result.driverPower.toFixed(2)} W</div>
                        </div>
                        <div className="bg-elec-dark/50 rounded-lg p-3 sm:p-4 text-center">
                          <div className="text-sm text-elec-light/70 mb-1">Power Loss</div>
                          <div className="text-lg sm:text-xl font-bold text-elec-yellow">{result.powerLoss.toFixed(2)} W</div>
                        </div>
                      </div>

                      {result.recommendations.messages.length > 0 && (
                        <>
                          <Separator className="bg-elec-yellow/20" />
                          <div className="bg-elec-dark/30 rounded-lg p-4">
                            <h4 className="font-semibold text-elec-yellow mb-3 text-center">Connection Guidance:</h4>
                            <p className="text-sm text-elec-light/90 text-center mb-3 leading-relaxed">{result.recommendations.connectionGuidance}</p>
                            <div className="space-y-2">
                              {result.recommendations.messages.map((msg, idx) => (
                                <div key={idx} className="text-sm text-elec-light/80 flex items-start gap-2">
                                  <span className="text-elec-yellow mt-1 flex-shrink-0">•</span>
                                  <span className="leading-relaxed">{msg}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Enter LED specifications to calculate driver requirements
                  </div>
                )}
              </div>
            </div>
          </div>

          {result && (
            <>
              {/* How It Worked Out - Step-by-step calculation breakdown */}
              <Card className="border-purple-500/30 bg-purple-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-purple-300 text-base flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    How It Worked Out
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {/* Step 1: Input values */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 1: Your LED Specifications</p>
                    <div className="bg-purple-500/10 rounded p-3 space-y-1 text-purple-100 font-mono text-xs">
                      <p>LED Forward Voltage (Vf): {ledVoltage}V</p>
                      <p>LED Forward Current (If): {ledCurrent}mA = {(parseFloat(ledCurrent) / 1000).toFixed(3)}A</p>
                      <p>Number of LEDs: {numLeds}</p>
                      <p>Connection: {connectionType === "series" ? "Series" : "Parallel"}</p>
                      <p>Supply Voltage: {supplyVoltage}V</p>
                      <p>Driver Efficiency: {(parseFloat(efficiency) * 100).toFixed(0)}%</p>
                    </div>
                  </div>

                  {/* Step 2: Total voltage and current */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 2: Array Voltage & Current</p>
                    <div className="bg-purple-500/10 rounded p-3 text-purple-100 font-mono text-xs space-y-1">
                      {connectionType === "series" ? (
                        <>
                          <p className="text-purple-300 mb-1">Series Connection:</p>
                          <p>V_total = Vf × n = {ledVoltage} × {numLeds} = {result.totalVoltage.toFixed(1)}V</p>
                          <p>I_total = If = {ledCurrent}mA (same through all LEDs)</p>
                        </>
                      ) : (
                        <>
                          <p className="text-purple-300 mb-1">Parallel Connection:</p>
                          <p>V_total = Vf = {ledVoltage}V (same across all LEDs)</p>
                          <p>I_total = If × n = {ledCurrent} × {numLeds} = {result.totalCurrent.toFixed(0)}mA</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Step 3: LED array power */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 3: LED Array Power</p>
                    <div className="bg-purple-500/10 rounded p-3 text-purple-100 font-mono text-xs">
                      <p>P_LED = V × I = {result.totalVoltage.toFixed(1)} × {(result.totalCurrent / 1000).toFixed(3)}</p>
                      <p className="text-purple-300">P_LED = {result.totalPower.toFixed(2)}W</p>
                    </div>
                  </div>

                  {/* Step 4: Driver power calculation */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 4: Driver Power (accounting for efficiency)</p>
                    <div className="bg-purple-500/10 rounded p-3 text-purple-100 font-mono text-xs space-y-1">
                      <p>P_driver = P_LED / η = {result.totalPower.toFixed(2)} / {efficiency}</p>
                      <p className="text-purple-300">P_driver = {result.driverPower.toFixed(2)}W</p>
                      <p className="mt-2">Power Loss = P_driver - P_LED = {result.driverPower.toFixed(2)} - {result.totalPower.toFixed(2)}</p>
                      <p className="text-amber-400">Power Loss = {result.powerLoss.toFixed(2)}W (dissipated as heat)</p>
                    </div>
                  </div>

                  {/* Step 5: Driver sizing with safety margin */}
                  <div className="space-y-2">
                    <p className="text-purple-200 font-medium">Step 5: Recommended Driver (with 20% safety margin)</p>
                    <div className="bg-purple-500/10 rounded p-3 text-purple-100 font-mono text-xs space-y-1">
                      <p>Recommended = P_driver × 1.2 = {result.driverPower.toFixed(2)} × 1.2</p>
                      <p className="text-purple-300">Recommended = {result.recommendations.recommendedDriverPower.toFixed(1)}W</p>
                      <p className="text-green-400 mt-1">→ Select {result.recommendations.nearestStandardDriver} driver (next standard size up)</p>
                    </div>
                  </div>

                  {/* Voltage headroom check */}
                  {connectionType === "series" && (
                    <div className="bg-purple-500/10 rounded p-3 border border-purple-500/30">
                      <p className="text-purple-200 font-medium mb-2">Voltage Headroom Check:</p>
                      <p className="text-purple-100 font-mono text-xs">
                        Headroom = V_supply - V_total = {supplyVoltage} - {result.totalVoltage.toFixed(1)} = {(parseFloat(supplyVoltage) - result.totalVoltage).toFixed(1)}V
                      </p>
                      <p className="text-purple-100 font-mono text-xs">
                        Headroom % = {(((parseFloat(supplyVoltage) - result.totalVoltage) / parseFloat(supplyVoltage)) * 100).toFixed(1)}%
                      </p>
                      <p className={`text-xs mt-1 ${parseFloat(supplyVoltage) - result.totalVoltage > parseFloat(supplyVoltage) * 0.1 ? "text-green-400" : "text-amber-400"}`}>
                        {parseFloat(supplyVoltage) - result.totalVoltage > parseFloat(supplyVoltage) * 0.1 ? "✓ Sufficient headroom for constant current operation" : "⚠ Limited headroom - consider higher supply voltage"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InfoBox
                  title="Why This Matters"
                  icon={<Zap className="h-5 w-5 text-elec-yellow" />}
                  as="section"
                  points={[
                    "Proper driver sizing prevents LED thermal runaway and premature failure",
                    "Voltage headroom ensures stable constant current operation across temperature variations",
                    "Efficiency affects running costs - low efficiency drivers waste energy as heat",
                    "Connection type impacts reliability - series provides consistent current, parallel needs balancing",
                    "Safety margins account for component tolerances and ensure long-term reliability"
                  ]}
                />
              
              <InfoBox
                title="Regulations & Good Practice"
                icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
                as="section"
                points={[
                  "BS 7671:2018 Section 559 - Luminaires and lighting installations requirements",
                  "IET Guidance Note 1 - Selection and erection of equipment",
                  "BS EN 61347 series - LED driver safety and performance standards",
                  "Consider IP ratings for environmental protection requirements",
                  "Ensure thermal management meets manufacturer specifications",
                  "Use drivers with appropriate dimming compatibility if required"
                ]}
              />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LEDDriverCalculator;

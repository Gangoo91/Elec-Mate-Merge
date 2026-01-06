import { useState, useMemo } from "react";
import {
  Lightbulb,
  Calculator,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Zap,
  BookOpen,
  Info,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const LEDDriverCalculator = () => {
  const config = CALCULATOR_CONFIG["lighting"];

  const [ledVoltage, setLedVoltage] = useState<string>("");
  const [ledCurrent, setLedCurrent] = useState<string>("");
  const [numLeds, setNumLeds] = useState<string>("1");
  const [connectionType, setConnectionType] = useState<string>("series");
  const [supplyVoltage, setSupplyVoltage] = useState<string>("12");
  const [efficiency, setEfficiency] = useState<string>("0.85");
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const result = useMemo(() => {
    const vLed = parseFloat(ledVoltage);
    const iLed = parseFloat(ledCurrent) / 1000; // Convert mA to A
    const count = parseInt(numLeds);
    const vSupply = parseFloat(supplyVoltage);
    const eff = parseFloat(efficiency);

    if (!(vLed > 0 && iLed > 0 && count > 0 && vSupply > 0 && eff > 0)) {
      return null;
    }

    let totalVoltage: number;
    let totalCurrent: number;
    let totalPower: number;

    if (connectionType === "series") {
      totalVoltage = vLed * count;
      totalCurrent = iLed;
      totalPower = totalVoltage * totalCurrent;
    } else {
      // parallel
      totalVoltage = vLed;
      totalCurrent = iLed * count;
      totalPower = totalVoltage * totalCurrent;
    }

    const driverPower = totalPower / eff;
    const driverCurrent = driverPower / vSupply;
    const powerLoss = driverPower - totalPower;

    // Enhanced recommendations and compliance
    const complianceVoltage =
      connectionType === "series" ? totalVoltage + totalVoltage * 0.1 : vSupply;
    const recommendedDriverPower = driverPower * 1.2; // 20% safety margin

    // Determine nearest standard driver ratings
    const standardPowers = [
      1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200,
    ];
    const nearestPower =
      standardPowers.find((p) => p >= recommendedDriverPower) ||
      Math.ceil(recommendedDriverPower);

    // Status and guidance assessment
    let status: "good" | "caution" | "issue" = "good";
    const messages: string[] = [];

    // Voltage compliance checks
    if (connectionType === "series" && totalVoltage > vSupply * 0.9) {
      status = "issue";
      messages.push("Insufficient voltage headroom for constant current operation");
    } else if (connectionType === "series" && totalVoltage > vSupply * 0.8) {
      status = "caution";
      messages.push("Limited voltage headroom - consider higher supply voltage");
    }

    // Current checks
    if (iLed > 1 && status === "good") {
      status = "caution";
      messages.push("High current LEDs require careful thermal management");
    }

    // Power efficiency
    const efficiencyPercent = eff * 100;
    if (efficiencyPercent < 80 && status === "good") {
      status = "caution";
      messages.push("Low efficiency driver - consider higher grade driver");
    }

    // Connection guidance
    let connectionGuidance = "";
    if (connectionType === "series") {
      connectionGuidance =
        count > 10
          ? "Series connection suitable but consider parallel strings for >10 LEDs"
          : "Series connection recommended for consistent current";
    } else {
      connectionGuidance =
        count > 5
          ? "Parallel connection requires current balancing for >5 LEDs"
          : "Parallel connection suitable with proper current limiting";
    }

    if (status === "good") {
      messages.push("Configuration meets BS 7671 safety requirements");
    }

    return {
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
        connectionGuidance,
      },
    };
  }, [ledVoltage, ledCurrent, numLeds, connectionType, supplyVoltage, efficiency]);

  const reset = () => {
    setLedVoltage("");
    setLedCurrent("");
    setNumLeds("1");
    setConnectionType("series");
    setSupplyVoltage("12");
    setEfficiency("0.85");
  };

  const connectionOptions = [
    { value: "series", label: "Series" },
    { value: "parallel", label: "Parallel" },
  ];

  const supplyOptions = [
    { value: "12", label: "12V" },
    { value: "24", label: "24V" },
    { value: "48", label: "48V" },
  ];

  const isValid =
    parseFloat(ledVoltage) > 0 &&
    parseFloat(ledCurrent) > 0 &&
    parseInt(numLeds) > 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400";
      case "caution":
        return "text-amber-400";
      case "issue":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "caution":
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      case "issue":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="lighting"
        title="LED Driver Calculator"
        description="Calculate LED driver requirements for single LEDs or arrays in series/parallel"
        badge="LED"
      >
        {/* Connection Type Selection */}
        <div className="space-y-2">
          <p className="text-sm text-white/60">Connection Type</p>
          <div className="flex gap-2">
            {connectionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setConnectionType(opt.value)}
                className={cn(
                  "flex-1 h-12 rounded-xl font-medium text-sm transition-all touch-manipulation",
                  connectionType === opt.value
                    ? "text-black"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                )}
                style={
                  connectionType === opt.value
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* LED Specifications */}
        <CalculatorInput
          label="LED Forward Voltage"
          unit="V"
          type="text"
          inputMode="decimal"
          value={ledVoltage}
          onChange={setLedVoltage}
          placeholder="e.g., 3.2"
          hint="Typical: White 3.0-3.4V, Red 1.8-2.2V"
        />

        <CalculatorInput
          label="LED Forward Current"
          unit="mA"
          type="text"
          inputMode="decimal"
          value={ledCurrent}
          onChange={setLedCurrent}
          placeholder="e.g., 350"
          hint="Common: 20mA, 350mA, 700mA, 1A"
        />

        <CalculatorInput
          label="Number of LEDs"
          unit="pcs"
          type="text"
          inputMode="numeric"
          value={numLeds}
          onChange={setNumLeds}
          placeholder="e.g., 10"
        />

        {/* Supply Configuration */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Supply Voltage"
            value={supplyVoltage}
            onChange={setSupplyVoltage}
            options={supplyOptions}
          />
          <CalculatorInput
            label="Driver Efficiency"
            type="text"
            inputMode="decimal"
            value={efficiency}
            onChange={setEfficiency}
            placeholder="0.85"
            hint="0.80-0.95 typical"
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
        >
          <RotateCcw className="h-4 w-4 inline mr-2" />
          Reset
        </button>
      </CalculatorCard>

      {/* Live Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="lighting">
            {/* Status Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                {getStatusIcon(result.recommendations.status)}
                <span
                  className={cn("font-medium", getStatusColor(result.recommendations.status))}
                >
                  {result.recommendations.status.toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-white/60 bg-white/5 px-2 py-1 rounded">
                {connectionType.toUpperCase()}
              </span>
            </div>

            {/* Primary Results */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Total Voltage"
                value={result.totalVoltage.toFixed(1)}
                unit="V"
                category="lighting"
                size="sm"
              />
              <ResultValue
                label="Total Current"
                value={result.totalCurrent.toFixed(0)}
                unit="mA"
                category="lighting"
                size="sm"
              />
              <ResultValue
                label="LED Array Power"
                value={result.totalPower.toFixed(2)}
                unit="W"
                category="lighting"
                size="lg"
              />
              <ResultValue
                label="Driver Power"
                value={result.driverPower.toFixed(2)}
                unit="W"
                category="lighting"
                size="lg"
              />
            </ResultsGrid>

            {/* Recommended Driver */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h4 className="text-sm font-semibold text-cyan-300 mb-3">
                Recommended Driver Specification
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-xs text-white/80 mb-1">Compliance V</p>
                  <p className="text-lg font-semibold text-cyan-400">
                    {result.recommendations.complianceVoltage.toFixed(1)}V
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/80 mb-1">Recommended</p>
                  <p className="text-lg font-semibold text-cyan-400">
                    {result.recommendations.recommendedDriverPower.toFixed(1)}W
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/80 mb-1">Nearest Std</p>
                  <p className="text-lg font-semibold text-cyan-400">
                    {result.recommendations.nearestStandardDriver}
                  </p>
                </div>
              </div>
            </div>

            {/* Power Loss */}
            <div className="mt-3 flex justify-between items-center p-3 rounded-lg bg-white/5">
              <span className="text-sm text-white/60">Power Loss (heat)</span>
              <span className="text-sm font-medium text-amber-400">
                {result.powerLoss.toFixed(2)}W
              </span>
            </div>

            {/* Messages */}
            {result.recommendations.messages.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-white/5 space-y-2">
                <p className="text-xs text-white/80 mb-2">
                  {result.recommendations.connectionGuidance}
                </p>
                {result.recommendations.messages.map((msg, idx) => (
                  <p key={idx} className="text-sm text-white/70 flex items-start gap-2">
                    <span className={getStatusColor(result.recommendations.status)}>•</span>
                    {msg}
                  </p>
                ))}
              </div>
            )}
          </CalculatorResult>

          {/* How It Worked Out */}
          <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#a78bfa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">
                    How It Worked Out
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showCalculation && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-3 text-sm font-mono">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="text-purple-300 mb-2">Step 1: Array Voltage & Current</p>
                    {connectionType === "series" ? (
                      <>
                        <p className="text-purple-200/80">
                          V_total = Vf × n = {ledVoltage} × {numLeds} = {result.totalVoltage.toFixed(1)}V
                        </p>
                        <p className="text-purple-200/80">
                          I_total = If = {ledCurrent}mA (same through all)
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-purple-200/80">
                          V_total = Vf = {ledVoltage}V (same across all)
                        </p>
                        <p className="text-purple-200/80">
                          I_total = If × n = {ledCurrent} × {numLeds} = {result.totalCurrent.toFixed(0)}mA
                        </p>
                      </>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="text-purple-300 mb-2">Step 2: LED Array Power</p>
                    <p className="text-purple-200/80">
                      P_LED = V × I = {result.totalVoltage.toFixed(1)} × {(result.totalCurrent / 1000).toFixed(3)} = {result.totalPower.toFixed(2)}W
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="text-purple-300 mb-2">Step 3: Driver Power</p>
                    <p className="text-purple-200/80">
                      P_driver = P_LED / η = {result.totalPower.toFixed(2)} / {efficiency} = {result.driverPower.toFixed(2)}W
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <p className="text-purple-300 mb-2">Step 4: Recommended (20% margin)</p>
                    <p className="text-purple-200/80">
                      {result.driverPower.toFixed(2)} × 1.2 = {result.recommendations.recommendedDriverPower.toFixed(1)}W → {result.recommendations.nearestStandardDriver}
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Why This Matters */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Why This Matters
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-blue-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Proper driver sizing prevents LED thermal runaway and premature failure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Voltage headroom ensures stable constant current across temperature variations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Low efficiency drivers waste energy as heat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Series provides consistent current; parallel needs balancing
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                LED Driver Reference
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/70 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Forward Voltage</p>
                <p className="text-amber-200/70">White: 3.0-3.4V</p>
                <p className="text-amber-200/70">Red: 1.8-2.2V</p>
                <p className="text-amber-200/70">Blue/Green: 3.0-3.5V</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Common Currents</p>
                <p className="text-amber-200/70">Indicator: 20mA</p>
                <p className="text-amber-200/70">Mid-power: 350mA</p>
                <p className="text-amber-200/70">High-power: 700mA-1A</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Driver Types</p>
                <p className="text-amber-200/70">Constant current (CC)</p>
                <p className="text-amber-200/70">Constant voltage (CV)</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Standards</p>
                <p className="text-amber-200/70">BS 7671 Section 559</p>
                <p className="text-amber-200/70">BS EN 61347 drivers</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default LEDDriverCalculator;

import { useState, useMemo } from "react";
import { Shield, Calculator, CheckCircle, XCircle, AlertTriangle, Info, BookOpen, ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { zsValues, curveTypes, fuseTypes, fuseRatings } from "./zs-values/ZsValuesData";
import { Button } from "@/components/ui/button";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type EarthingSystem = "tn" | "tt";
type MeasurementMode = "calculated" | "measured";
type DeviceType = "mcb" | "rcbo" | "fuse";

const EarthFaultLoopCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  // Earthing system and measurement mode
  const [earthingSystem, setEarthingSystem] = useState<EarthingSystem>("tn");
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>("calculated");
  const [showResults, setShowResults] = useState(false);

  // Input values
  const [ze, setZe] = useState("");
  const [r1PlusR2, setR1PlusR2] = useState("");
  const [measuredZs, setMeasuredZs] = useState("");

  // TT system inputs
  const [ra, setRa] = useState("");
  const [iDeltaN, setIDeltaN] = useState("");

  // Protection device inputs (TN only)
  const [deviceType, setDeviceType] = useState<DeviceType>("mcb");
  const [curveType, setCurveType] = useState("");
  const [rating, setRating] = useState("");
  const [fuseType, setFuseType] = useState("");

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showTesting, setShowTesting] = useState(false);
  const [showExample, setShowExample] = useState(false);

  // Get maximum Zs value from data
  const getMaxZs = (device: DeviceType, curve: string, ratingNum: number, fuse: string): number | null => {
    try {
      if (device === "mcb" || device === "rcbo") {
        const deviceData = zsValues[device];
        if (deviceData && deviceData[curve as keyof typeof deviceData]) {
          const curveData = deviceData[curve as keyof typeof deviceData];
          return curveData[ratingNum as keyof typeof curveData] || null;
        }
      } else if (device === "fuse" && fuse) {
        const fuseData = zsValues[fuse as keyof typeof zsValues];
        if (fuseData && typeof fuseData === "object") {
          return fuseData[ratingNum as keyof typeof fuseData] || null;
        }
      }
    } catch (e) {
      console.error("Error getting max Zs:", e);
    }
    return null;
  };

  // Calculate results
  const results = useMemo(() => {
    if (earthingSystem === "tn") {
      let zsValue: number | null = null;

      if (measurementMode === "calculated") {
        const zeVal = parseFloat(ze);
        const r1R2Val = parseFloat(r1PlusR2);
        if (!isNaN(zeVal) && !isNaN(r1R2Val)) {
          zsValue = zeVal + r1R2Val;
        }
      } else {
        const measuredVal = parseFloat(measuredZs);
        if (!isNaN(measuredVal)) {
          zsValue = measuredVal;
        }
      }

      if (zsValue === null) return null;

      let maxZsValue: number | null = null;
      let deviceValid = false;

      if (rating) {
        const ratingNum = parseInt(rating);
        if (deviceType === "mcb" || deviceType === "rcbo") {
          if (curveType) {
            maxZsValue = getMaxZs(deviceType, curveType, ratingNum, "");
            deviceValid = maxZsValue !== null;
          }
        } else if (deviceType === "fuse" && fuseType) {
          maxZsValue = getMaxZs(deviceType, "", ratingNum, fuseType);
          deviceValid = maxZsValue !== null;
        }
      }

      const testLimit80 = maxZsValue ? maxZsValue * 0.8 : null;
      const compliance80 = testLimit80 ? zsValue <= testLimit80 : null;
      const compliance100 = maxZsValue ? zsValue <= maxZsValue : null;

      const headroom80 = testLimit80 && compliance80 ? ((testLimit80 - zsValue) / testLimit80 * 100) : null;
      const headroom100 = maxZsValue && compliance100 ? ((maxZsValue - zsValue) / maxZsValue * 100) : null;

      return {
        type: "tn" as const,
        zsValue,
        maxZsValue,
        testLimit80,
        compliance80,
        compliance100,
        headroom80,
        headroom100,
        deviceValid,
        deviceInfo: deviceType === "fuse" ? fuseTypes[fuseType as keyof typeof fuseTypes] :
                   curveType ? curveTypes[curveType as keyof typeof curveTypes] : null
      };
    } else {
      const raVal = parseFloat(ra);
      const iDeltaNVal = parseFloat(iDeltaN);

      if (isNaN(raVal) || isNaN(iDeltaNVal)) return null;

      const product = raVal * iDeltaNVal;
      const compliant = product <= 50;

      return {
        type: "tt" as const,
        raValue: raVal,
        iDeltaNValue: iDeltaNVal,
        product,
        compliant
      };
    }
  }, [earthingSystem, measurementMode, ze, r1PlusR2, measuredZs, ra, iDeltaN, deviceType, curveType, rating, fuseType]);

  // Get available ratings for selected device/fuse type
  const availableRatings = useMemo(() => {
    if (deviceType === "mcb" || deviceType === "rcbo") {
      if (!curveType) return [];
      const deviceData = zsValues[deviceType];
      const curveData = deviceData?.[curveType as keyof typeof deviceData];
      return curveData ? Object.keys(curveData).map(r => parseInt(r)).sort((a, b) => a - b) : [];
    } else if (deviceType === "fuse" && fuseType) {
      return fuseRatings[fuseType as keyof typeof fuseRatings] || [];
    }
    return [];
  }, [deviceType, curveType, fuseType]);

  const ratingOptions = availableRatings.map(r => ({
    value: r.toString(),
    label: `${r}A`
  }));

  // Check if calculation is possible
  const canCalculate = useMemo(() => {
    if (earthingSystem === "tn") {
      if (measurementMode === "calculated") {
        return ze.trim() !== "" && r1PlusR2.trim() !== "";
      } else {
        return measuredZs.trim() !== "";
      }
    } else {
      return ra.trim() !== "" && iDeltaN.trim() !== "";
    }
  }, [earthingSystem, measurementMode, ze, r1PlusR2, measuredZs, ra, iDeltaN]);

  const handleReset = () => {
    setZe("");
    setR1PlusR2("");
    setMeasuredZs("");
    setRa("");
    setIDeltaN("");
    setRating("");
    setCurveType("");
    setFuseType("");
    setShowResults(false);
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="Earth Fault Loop Impedance (Zs) Calculator"
        description="Verify TN/TT system compliance with BS 7671 requirements"
      >
        {/* Earthing System Selection */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-white">Earthing System</span>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEarthingSystem("tn")}
              className={cn(
                "h-12 rounded-xl font-medium transition-all",
                earthingSystem === "tn"
                  ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              TN System
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEarthingSystem("tt")}
              className={cn(
                "h-12 rounded-xl font-medium transition-all",
                earthingSystem === "tt"
                  ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              )}
            >
              TT System
            </Button>
          </div>
        </div>

        {earthingSystem === "tn" ? (
          <>
            {/* Measurement Mode Selection */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-white">Measurement Method</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMeasurementMode("calculated")}
                  className={cn(
                    "h-12 rounded-xl font-medium text-sm transition-all",
                    measurementMode === "calculated"
                      ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  Calculate: Ze + (R1 + R2)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMeasurementMode("measured")}
                  className={cn(
                    "h-12 rounded-xl font-medium text-sm transition-all",
                    measurementMode === "measured"
                      ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                      : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  Direct Zs Measurement
                </Button>
              </div>
            </div>

            {/* Measurement Inputs */}
            {measurementMode === "calculated" ? (
              <CalculatorInputGrid columns={2}>
                <CalculatorInput
                  label="Ze (External Loop Impedance)"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={ze}
                  onChange={setZe}
                  placeholder="0.35"
                  hint="Measured at origin"
                />
                <CalculatorInput
                  label="R1 + R2 (Circuit Resistance)"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={r1PlusR2}
                  onChange={setR1PlusR2}
                  placeholder="0.25"
                  hint="To furthest point"
                />
              </CalculatorInputGrid>
            ) : (
              <CalculatorInput
                label="Measured Zs (Earth Fault Loop Impedance)"
                unit="Ω"
                type="text"
                inputMode="decimal"
                value={measuredZs}
                onChange={setMeasuredZs}
                placeholder="0.60"
                hint="Direct measurement at furthest point"
              />
            )}

            {/* Protection Device Selection */}
            <div
              className="space-y-4 p-4 rounded-xl border"
              style={{ borderColor: `${config.gradientFrom}30`, background: `${config.gradientFrom}08` }}
            >
              <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
                Protection Device (for compliance check)
              </h4>

              <CalculatorInputGrid columns={3}>
                <CalculatorSelect
                  label="Device Type"
                  value={deviceType}
                  onChange={(value) => {
                    setDeviceType(value as DeviceType);
                    setCurveType("");
                    setFuseType("");
                    setRating("");
                  }}
                  options={[
                    { value: "mcb", label: "MCB" },
                    { value: "rcbo", label: "RCBO" },
                    { value: "fuse", label: "Fuse" },
                  ]}
                />

                {(deviceType === "mcb" || deviceType === "rcbo") && (
                  <CalculatorSelect
                    label="Curve Type"
                    value={curveType}
                    onChange={(value) => {
                      setCurveType(value);
                      setRating("");
                    }}
                    options={[
                      { value: "type-b", label: "Type B (3-5×In)" },
                      { value: "type-c", label: "Type C (5-10×In)" },
                      { value: "type-d", label: "Type D (10-20×In)" },
                    ]}
                    placeholder="Select curve"
                  />
                )}

                {deviceType === "fuse" && (
                  <CalculatorSelect
                    label="Fuse Type"
                    value={fuseType}
                    onChange={(value) => {
                      setFuseType(value);
                      setRating("");
                    }}
                    options={Object.entries(fuseTypes).map(([key, label]) => ({
                      value: key,
                      label
                    }))}
                    placeholder="Select fuse type"
                  />
                )}

                {(((deviceType === "mcb" || deviceType === "rcbo") && curveType) || (deviceType === "fuse" && fuseType)) && ratingOptions.length > 0 && (
                  <CalculatorSelect
                    label="Rating"
                    value={rating}
                    onChange={setRating}
                    options={ratingOptions}
                    placeholder="Select rating"
                  />
                )}
              </CalculatorInputGrid>
            </div>
          </>
        ) : (
          <>
            {/* TT System Inputs */}
            <div className="space-y-4">
              <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
                TT System Verification: RA × IΔn ≤ 50V
              </h4>
              <CalculatorInputGrid columns={2}>
                <CalculatorInput
                  label="RA (Earth Electrode Resistance)"
                  unit="Ω"
                  type="text"
                  inputMode="decimal"
                  value={ra}
                  onChange={setRa}
                  placeholder="100"
                  hint="Measured earth electrode resistance"
                />
                <div className="space-y-2">
                  <CalculatorInput
                    label="IΔn (RCD Rated Current)"
                    unit="A"
                    type="text"
                    inputMode="decimal"
                    value={iDeltaN}
                    onChange={setIDeltaN}
                    placeholder="0.03"
                    hint="RCD sensitivity"
                  />
                  <div className="flex gap-2">
                    {["0.03", "0.1", "0.3"].map((val) => (
                      <Button
                        key={val}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIDeltaN(val)}
                        className={cn(
                          "text-xs h-8 rounded-lg",
                          iDeltaN === val
                            ? "border-orange-500/50 bg-orange-500/20 text-orange-300"
                            : "border-white/10 bg-white/5 text-white/60"
                        )}
                      >
                        {val === "0.03" ? "30mA" : val === "0.1" ? "100mA" : "300mA"}
                      </Button>
                    ))}
                  </div>
                </div>
              </CalculatorInputGrid>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <CalculatorActions
          category="protection"
          onCalculate={() => setShowResults(true)}
          onReset={handleReset}
          isDisabled={!canCalculate}
          calculateLabel={`Calculate ${earthingSystem === "tn" ? "Zs" : "RA × IΔn"}`}
        />
      </CalculatorCard>

      {/* Results */}
      {results && showResults && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            {results.type === "tn" ? (
              <>
                <div className="text-center pb-3 border-b border-white/10">
                  <p className="text-sm text-white/60 mb-1">Earth Fault Loop Impedance (Zs)</p>
                  <div
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
                  >
                    {results.zsValue.toFixed(3)}Ω
                  </div>
                </div>

                {results.maxZsValue !== null && (
                  <ResultsGrid columns={2}>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-white/60 mb-1">Max Zs (Tabulated)</p>
                      <p className="text-xl font-bold text-white">{results.maxZsValue}Ω</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-2 text-sm font-medium",
                        results.compliance100 ? "text-green-400" : "text-red-400"
                      )}>
                        {results.compliance100 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {results.compliance100 ? "COMPLIANT" : "NON-COMPLIANT"}
                      </div>
                      {results.compliance100 && results.headroom100 !== null && (
                        <p className="text-xs text-green-400 mt-1">{results.headroom100.toFixed(1)}% headroom</p>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-white/60 mb-1">Test Limit (80%)</p>
                      <p className="text-xl font-bold text-white">{results.testLimit80?.toFixed(3)}Ω</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-2 text-sm font-medium",
                        results.compliance80 ? "text-green-400" : "text-red-400"
                      )}>
                        {results.compliance80 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        {results.compliance80 ? "PASSES TEST" : "FAILS TEST"}
                      </div>
                      {results.compliance80 && results.headroom80 !== null && (
                        <p className="text-xs text-green-400 mt-1">{results.headroom80.toFixed(1)}% headroom</p>
                      )}
                    </div>
                  </ResultsGrid>
                )}

                {!results.deviceValid && rating && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-400 font-medium text-sm">Device Rating Not Found</p>
                      <p className="text-xs text-amber-300 mt-1">
                        {rating}A rating not available for {deviceType.toUpperCase()}
                        {deviceType === "fuse" ? ` ${fuseType}` : ` ${curveType}`}.
                        Please check available ratings or select a different device.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-center pb-3 border-b border-white/10">
                  <p className="text-sm text-white/60 mb-1">RA × IΔn Product</p>
                  <div
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
                  >
                    {results.product.toFixed(1)}V
                  </div>
                  <div className={cn(
                    "flex items-center justify-center gap-2 mt-2 text-sm font-medium",
                    results.compliant ? "text-green-400" : "text-red-400"
                  )}>
                    {results.compliant ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    {results.compliant ? "COMPLIANT (≤ 50V)" : "NON-COMPLIANT (> 50V)"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm">
                  <p className="text-white">
                    <strong>Calculation:</strong> {results.raValue}Ω × {results.iDeltaNValue}A = {results.product.toFixed(1)}V
                  </p>
                  <p className="text-white/60 mt-2">
                    For TT systems, the product of earth electrode resistance and RCD operating current must not exceed 50V.
                  </p>
                </div>
              </>
            )}
          </CalculatorResult>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">Why This Matters</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-blue-200/80">
                <p>• Earth fault loop impedance determines how quickly protective devices operate during earth faults</p>
                <p>• Ensures adequate protection against electric shock by guaranteeing disconnection within required times</p>
                <p>• Critical for fire prevention - prevents dangerous heating of conductors during fault conditions</p>
                <p>• Legal requirement under BS 7671 - must be verified during initial verification and periodic inspection</p>
                <p>• Values change with temperature - cables get hotter in service, increasing resistance and Zs values</p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 Regs */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 Requirements</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-amber-300 mb-2">Key Regulations</h4>
                  <div className="space-y-1 text-amber-200/80">
                    <p>• <strong className="text-amber-300">411.3.2:</strong> TN systems - protective devices must disconnect in fault conditions</p>
                    <p>• <strong className="text-amber-300">411.4.4:</strong> TT systems - RCD protection required with RA × IΔn ≤ 50V</p>
                    <p>• <strong className="text-amber-300">Table 41.3:</strong> Maximum Zs values for different protective devices</p>
                    <p>• <strong className="text-amber-300">Section 612:</strong> Initial verification requirements for earth fault loop impedance</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-amber-300 mb-2">Disconnection Times</h4>
                  <div className="space-y-1 text-amber-200/80">
                    <p>• <strong className="text-amber-300">Socket outlets:</strong> ≤ 0.4 seconds</p>
                    <p>• <strong className="text-amber-300">Fixed equipment:</strong> ≤ 5 seconds (or ≤ 0.4s if accessible to ordinary persons)</p>
                    <p>• <strong className="text-amber-300">Distribution circuits:</strong> ≤ 5 seconds</p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Testing Procedures */}
          <Collapsible open={showTesting} onOpenChange={setShowTesting}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#22c55e15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-green-400" />
                  <span className="text-sm sm:text-base font-medium text-green-300">Testing Procedures</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showTesting && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-green-300 mb-2">Before Testing</h4>
                  <div className="space-y-1 text-green-200/80">
                    <p>• Ensure all circuits are complete and protective conductors properly connected</p>
                    <p>• Check RCD/RCBO is in OFF position or use "no-trip" test setting</p>
                    <p>• Verify test equipment is calibrated and set to appropriate range</p>
                    <p>• Identify the furthest point from the origin for each circuit</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-300 mb-2">During Testing</h4>
                  <div className="space-y-1 text-green-200/80">
                    <p>• Connect test leads between line and earth at test point</p>
                    <p>• Select appropriate test current (typically 200mA for loop testing)</p>
                    <p>• Record measured value and compare with maximum permissible Zs</p>
                    <p>• Test at ambient temperature or apply correction factors</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-green-300 mb-2">If Values Are Too High</h4>
                  <div className="space-y-1 text-green-200/80">
                    <p>• Check all connections are tight and properly made</p>
                    <p>• Verify protective conductor continuity</p>
                    <p>• Consider cable size upgrades or parallel earth conductors</p>
                    <p>• Check external earth fault loop impedance (Ze) at origin</p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Worked Example */}
          <Collapsible open={showExample} onOpenChange={setShowExample}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">Worked Example</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showExample && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm">
                  <h4 className="font-medium text-purple-300 mb-2">Ring Final Circuit - 32A Type B MCB</h4>
                  <div className="space-y-2 text-purple-200/80">
                    <p><strong className="text-purple-300">Given:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>Ze (external impedance) = 0.35Ω</li>
                      <li>R1 + R2 (to furthest socket) = 0.72Ω</li>
                      <li>Protection: 32A Type B MCB</li>
                    </ul>

                    <p className="mt-3"><strong className="text-purple-300">Calculation:</strong></p>
                    <p className="ml-4 font-mono">Zs = Ze + (R1 + R2) = 0.35 + 0.72 = 1.07Ω</p>

                    <p className="mt-3"><strong className="text-purple-300">Compliance:</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>Maximum Zs for 32A Type B MCB = 1.44Ω ✓</li>
                      <li>80% test limit = 1.44 × 0.8 = 1.15Ω ✓</li>
                      <li>Measured 1.07Ω is within both limits</li>
                    </ul>

                    <p className="mt-3 text-green-400 font-medium">Result: COMPLIANT</p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-200">
            <p><strong>TN Systems:</strong> Zs = Ze + (R1 + R2), verify against Table 41.3</p>
            <p className="mt-1"><strong>TT Systems:</strong> RA × IΔn ≤ 50V</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthFaultLoopCalculator;

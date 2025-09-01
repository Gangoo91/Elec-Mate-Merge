import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Calculator, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zsValues, curveTypes, fuseTypes, fuseRatings } from "./zs-values/ZsValuesData";
import { MobileInput } from "@/components/ui/mobile-input";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";

type EarthingSystem = "tn" | "tt";
type MeasurementMode = "calculated" | "measured";
type DeviceType = "mcb" | "rcbo" | "fuse";

const EarthFaultLoopCalculator = () => {
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
      // TN system calculations
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

      // Get max Zs if protection device is specified
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
      // TT system calculations
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />
            <CardTitle className="text-elec-light text-lg sm:text-xl">Earth Fault Loop Impedance (Zs) Calculator</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Earthing System Selection */}
          <div className="space-y-3">
            <Label className="text-elec-light font-medium">Earthing System</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={earthingSystem === "tn" ? "default" : "outline"}
                onClick={() => setEarthingSystem("tn")}
                className="justify-start"
              >
                TN System
              </Button>
              <Button
                type="button"
                variant={earthingSystem === "tt" ? "default" : "outline"}
                onClick={() => setEarthingSystem("tt")}
                className="justify-start"
              >
                TT System
              </Button>
            </div>
          </div>

          {earthingSystem === "tn" ? (
            <>
              {/* Measurement Mode Selection */}
              <div className="space-y-3">
                <Label className="text-elec-light font-medium">Measurement Method</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={measurementMode === "calculated" ? "default" : "outline"}
                    onClick={() => setMeasurementMode("calculated")}
                    className="justify-start text-sm"
                  >
                    Calculate: Ze + (R1 + R2)
                  </Button>
                  <Button
                    type="button"
                    variant={measurementMode === "measured" ? "default" : "outline"}
                    onClick={() => setMeasurementMode("measured")}
                    className="justify-start text-sm"
                  >
                    Direct Zs Measurement
                  </Button>
                </div>
              </div>

              {/* Measurement Inputs */}
              {measurementMode === "calculated" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MobileInput
                    label="Ze (External Earth Fault Loop Impedance)"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    value={ze}
                    onChange={(e) => setZe(e.target.value)}
                    placeholder="0.35"
                    unit="Ω"
                    hint="Measured at origin of installation"
                  />
                  <MobileInput
                    label="R1 + R2 (Line + Earth Conductor Resistance)"
                    type="number"
                    inputMode="decimal"
                    step="0.001"
                    value={r1PlusR2}
                    onChange={(e) => setR1PlusR2(e.target.value)}
                    placeholder="0.25"
                    unit="Ω"
                    hint="Combined resistance to furthest point"
                  />
                </div>
              ) : (
                <MobileInput
                  label="Measured Zs (Earth Fault Loop Impedance)"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={measuredZs}
                  onChange={(e) => setMeasuredZs(e.target.value)}
                  placeholder="0.60"
                  unit="Ω"
                  hint="Direct measurement at furthest point"
                />
              )}

              {/* Protection Device Selection */}
              <div className="space-y-4 border-t border-elec-yellow/20 pt-4">
                <h4 className="text-elec-light font-medium">Protection Device (for compliance check)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-elec-light text-sm">Device Type</Label>
                    <Select value={deviceType} onValueChange={(value: DeviceType) => {
                      setDeviceType(value);
                      setCurveType("");
                      setFuseType("");
                      setRating("");
                    }}>
                      <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-elec-dark border-elec-yellow/20">
                        <SelectItem value="mcb">MCB</SelectItem>
                        <SelectItem value="rcbo">RCBO</SelectItem>
                        <SelectItem value="fuse">Fuse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(deviceType === "mcb" || deviceType === "rcbo") && (
                    <div>
                      <Label className="text-elec-light text-sm">Curve Type</Label>
                      <Select value={curveType} onValueChange={(value) => {
                        setCurveType(value);
                        setRating("");
                      }}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                          <SelectValue placeholder="Select curve" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          <SelectItem value="type-a">Type A (2-3×In)</SelectItem>
                          <SelectItem value="type-b">Type B (3-5×In)</SelectItem>
                          <SelectItem value="type-c">Type C (5-10×In)</SelectItem>
                          <SelectItem value="type-d">Type D (10-20×In)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {deviceType === "fuse" && (
                    <div>
                      <Label className="text-elec-light text-sm">Fuse Type</Label>
                      <Select value={fuseType} onValueChange={(value) => {
                        setFuseType(value);
                        setRating("");
                      }}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                          <SelectValue placeholder="Select fuse type" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          {Object.entries(fuseTypes).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {((deviceType === "mcb" || deviceType === "rcbo") && curveType) || (deviceType === "fuse" && fuseType) ? (
                    <div>
                      <Label className="text-elec-light text-sm">Rating</Label>
                      <Select value={rating} onValueChange={setRating}>
                        <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-elec-light">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-dark border-elec-yellow/20">
                          {availableRatings.map((r) => (
                            <SelectItem key={r} value={r.toString()}>{r}A</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : null}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* TT System Inputs */}
              <div className="space-y-4">
                <h4 className="text-elec-light font-medium">TT System Verification: RA × IΔn ≤ 50V</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MobileInput
                    label="RA (Earth Electrode Resistance)"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={ra}
                    onChange={(e) => setRa(e.target.value)}
                    placeholder="100"
                    unit="Ω"
                    hint="Measured earth electrode resistance"
                  />
                  <div>
                    <MobileInput
                      label="IΔn (RCD Rated Residual Operating Current)"
                      type="number"
                      inputMode="decimal"
                      step="0.001"
                      value={iDeltaN}
                      onChange={(e) => setIDeltaN(e.target.value)}
                      placeholder="0.03"
                      unit="A"
                      hint="RCD sensitivity"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIDeltaN("0.03")}
                        className="text-xs"
                      >
                        30mA
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIDeltaN("0.1")}
                        className="text-xs"
                      >
                        100mA
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIDeltaN("0.3")}
                        className="text-xs"
                      >
                        300mA
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Calculate Button */}
          <div className="pt-4 border-t border-elec-yellow/20">
            <Button
              onClick={() => setShowResults(true)}
              disabled={!canCalculate}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate {earthingSystem === "tn" ? "Zs" : "RA × IΔn"}
            </Button>
            {!canCalculate && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {earthingSystem === "tn" 
                  ? (measurementMode === "calculated" ? "Enter Ze and R1+R2 values" : "Enter measured Zs value")
                  : "Enter RA and IΔn values"
                }
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && showResults && (
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-elec-light flex items-center gap-3 text-lg">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.type === "tn" ? (
              <>
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Earth Fault Loop Impedance (Zs)</p>
                    <p className="text-2xl sm:text-3xl font-bold text-elec-light">{results.zsValue.toFixed(3)}Ω</p>
                  </div>
                </div>

                {results.maxZsValue !== null && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-elec-dark/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Max Zs (Tabulated)</p>
                      <p className="text-xl font-bold text-elec-light">{results.maxZsValue}Ω</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-2",
                        results.compliance100 ? "text-green-400" : "text-red-400"
                      )}>
                        {results.compliance100 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span className="text-sm font-medium">
                          {results.compliance100 ? "COMPLIANT" : "NON-COMPLIANT"}
                        </span>
                      </div>
                      {results.compliance100 && results.headroom100 !== null && (
                        <p className="text-xs text-green-400 mt-1">
                          {results.headroom100.toFixed(1)}% headroom
                        </p>
                      )}
                    </div>

                    <div className="bg-elec-dark/30 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Test Limit (80%)</p>
                      <p className="text-xl font-bold text-elec-light">{results.testLimit80?.toFixed(3)}Ω</p>
                      <div className={cn(
                        "flex items-center gap-2 mt-2",
                        results.compliance80 ? "text-green-400" : "text-red-400"
                      )}>
                        {results.compliance80 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span className="text-sm font-medium">
                          {results.compliance80 ? "PASSES TEST" : "FAILS TEST"}
                        </span>
                      </div>
                      {results.compliance80 && results.headroom80 !== null && (
                        <p className="text-xs text-green-400 mt-1">
                          {results.headroom80.toFixed(1)}% headroom
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {!results.deviceValid && rating && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-amber-400 font-medium">Device Rating Not Found</p>
                      <p className="text-sm text-amber-300 mt-1">
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
                <div className="bg-elec-dark/50 rounded-lg p-4">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">RA × IΔn Product</p>
                    <p className="text-2xl sm:text-3xl font-bold text-elec-light">
                      {results.product.toFixed(1)}V
                    </p>
                    <div className={cn(
                      "flex items-center justify-center gap-2",
                      results.compliant ? "text-green-400" : "text-red-400"
                    )}>
                      {results.compliant ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                      <span className="font-medium">
                        {results.compliant ? "COMPLIANT (≤ 50V)" : "NON-COMPLIANT (> 50V)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-elec-dark/30 rounded-lg p-4 text-sm">
                  <p className="text-elec-light">
                    <strong>Calculation:</strong> {results.raValue}Ω × {results.iDeltaNValue}A = {results.product.toFixed(1)}V
                  </p>
                  <p className="text-muted-foreground mt-2">
                    For TT systems, the product of earth electrode resistance and RCD operating current must not exceed 50V.
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Why This Matters */}
      <WhyThisMatters
        points={[
          "Earth fault loop impedance determines how quickly protective devices operate during earth faults",
          "Ensures adequate protection against electric shock by guaranteeing disconnection within required times",
          "Critical for fire prevention - prevents dangerous heating of conductors during fault conditions",
          "Legal requirement under BS 7671 - must be verified during initial verification and periodic inspection",
          "Values change with temperature - cables get hotter in service, increasing resistance and Zs values"
        ]}
      />

      {/* Regulations & Standards */}
      <InfoBox
        title="Regulations & Standards"
        icon={<Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-blue" />}
        as="section"
      >
        <div className="space-y-4 text-sm text-elec-light">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">BS 7671 Requirements</h4>
            <ul className="space-y-2 text-elec-light/90">
              <li><strong>Regulation 411.3.2:</strong> TN systems - protective devices must disconnect in fault conditions</li>
              <li><strong>Regulation 411.4.4:</strong> TT systems - RCD protection required with RA × IΔn ≤ 50V</li>
              <li><strong>Table 41.3:</strong> Maximum Zs values for different protective devices</li>
              <li><strong>Section 612:</strong> Initial verification requirements for earth fault loop impedance</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Disconnection Times</h4>
            <ul className="space-y-1 text-elec-light/90">
              <li><strong>Socket outlets:</strong> ≤ 0.4 seconds (automatic disconnection required)</li>
              <li><strong>Fixed equipment:</strong> ≤ 5 seconds (or ≤ 0.4s if accessible to ordinary persons)</li>
              <li><strong>Distribution circuits:</strong> ≤ 5 seconds</li>
            </ul>
          </div>
        </div>
      </InfoBox>

      {/* Testing Guidance */}
      <InfoBox
        title="Testing Procedures"
        icon={<Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-elec-green" />}
        as="section"
      >
        <div className="space-y-4 text-sm text-elec-light">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Before Testing</h4>
            <ul className="space-y-1 text-elec-light/90">
              <li>Ensure all circuits are complete and protective conductors properly connected</li>
              <li>Check RCD/RCBO is in OFF position or use "no-trip" test setting</li>
              <li>Verify test equipment is calibrated and set to appropriate range</li>
              <li>Identify the furthest point from the origin for each circuit</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">During Testing</h4>
            <ul className="space-y-1 text-elec-light/90">
              <li>Connect test leads between line and earth at test point</li>
              <li>Select appropriate test current (typically 200mA for loop testing)</li>
              <li>Record measured value and compare with maximum permissible Zs</li>
              <li>Test at ambient temperature or apply correction factors</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">If Values Are Too High</h4>
            <ul className="space-y-1 text-elec-light/90">
              <li>Check all connections are tight and properly made</li>
              <li>Verify protective conductor continuity</li>
              <li>Consider cable size upgrades or parallel earth conductors</li>
              <li>Check external earth fault loop impedance (Ze) at origin</li>
              <li>Consider different protective device with higher Zs limit</li>
            </ul>
          </div>
        </div>
      </InfoBox>

      {/* Worked Example */}
      <InfoBox
        title="Worked Example"
        icon={<Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-elec-purple" />}
        as="section"
      >
        <div className="space-y-4 text-sm text-elec-light">
          <div className="bg-elec-dark/30 rounded-lg p-4">
            <h4 className="font-medium text-elec-yellow mb-3">Ring Final Circuit - 32A Type B MCB</h4>
            <div className="space-y-2 text-elec-light/90">
              <p><strong>Given:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>Ze (external impedance) = 0.35Ω</li>
                <li>R1 + R2 (to furthest socket) = 0.72Ω</li>
                <li>Protection: 32A Type B MCB</li>
              </ul>
              
              <p className="mt-3"><strong>Calculation:</strong></p>
              <p className="ml-4">Zs = Ze + (R1 + R2) = 0.35 + 0.72 = 1.07Ω</p>
              
              <p className="mt-3"><strong>Compliance:</strong></p>
              <ul className="ml-4 space-y-1">
                <li>Maximum Zs for 32A Type B MCB = 1.44Ω ✓</li>
                <li>80% test limit = 1.44 × 0.8 = 1.15Ω ✓</li>
                <li>Measured 1.07Ω is within both limits</li>
                <li>Headroom: 7.0% above test limit, 25.7% below maximum</li>
              </ul>
              
              <p className="mt-3 text-green-400"><strong>Result: COMPLIANT</strong></p>
            </div>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default EarthFaultLoopCalculator;
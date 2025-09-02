import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Calculator, RotateCcw, ArrowDownUp, Settings } from "lucide-react";
import { calculateSelectivity, SelectivityInputs, SelectivityResult } from "@/lib/selectivity";
import SelectivityInfo from "./selectivity/SelectivityInfo";
import SelectivityGuidance from "./selectivity/SelectivityGuidance";

const SelectivityCalculator = () => {
  // Basic inputs
  const [upstreamDevice, setUpstreamDevice] = useState<string>("mccb");
  const [upstreamRating, setUpstreamRating] = useState<string>("");
  const [upstreamCurve, setUpstreamCurve] = useState<string>("");
  const [downstreamDevice, setDownstreamDevice] = useState<string>("mcb");
  const [downstreamRating, setDownstreamRating] = useState<string>("");
  const [downstreamCurve, setDownstreamCurve] = useState<string>("B");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  
  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [upstreamMagneticSetting, setUpstreamMagneticSetting] = useState<string>("");
  const [upstreamTimeDelay, setUpstreamTimeDelay] = useState<string>("");
  const [upstreamBreakingCapacity, setUpstreamBreakingCapacity] = useState<string>("");
  const [downstreamMagneticSetting, setDownstreamMagneticSetting] = useState<string>("");
  const [downstreamBreakingCapacity, setDownstreamBreakingCapacity] = useState<string>("");
  const [shortCircuitCurrent, setShortCircuitCurrent] = useState<string>("");
  const [loadCurrent, setLoadCurrent] = useState<string>("");
  const [cableLength, setCableLength] = useState<string>("");
  const [ambientTemperature, setAmbientTemperature] = useState<string>("");
  const [installationMethod, setInstallationMethod] = useState<string>("reference-method-c");
  
  const [result, setResult] = useState<SelectivityResult | null>(null);

  const deviceTypes = {
    mcb: "MCB (Miniature Circuit Breaker)",
    mccb: "MCCB (Moulded Case Circuit Breaker)", 
    fuse: "Fuse (BS 88/1361)",
    rcbo: "RCBO (Residual Current Breaker)"
  };

  const mcbCurves = {
    B: "B Curve (3-5 x In)",
    C: "C Curve (5-10 x In)",
    D: "D Curve (10-20 x In)"
  };

  const installationMethods = {
    "reference-method-c": "Reference Method C (Clipped Direct)",
    "reference-method-a": "Reference Method A (Enclosed)",
    "reference-method-b": "Reference Method B (Trunking)",
    "reference-method-e": "Reference Method E (Free Air)",
    "underground": "Underground (Direct Buried)"
  };

  const calculateSelectivityResult = () => {
    const upRating = parseFloat(upstreamRating);
    const downRating = parseFloat(downstreamRating);
    const faultI = parseFloat(faultCurrent);

    if (upRating > 0 && downRating > 0 && faultI > 0) {
      const inputs: SelectivityInputs = {
        upstreamDevice,
        upstreamRating: upRating,
        upstreamCurve,
        upstreamMagneticSetting: upstreamMagneticSetting ? parseFloat(upstreamMagneticSetting) : undefined,
        upstreamTimeDelay: upstreamTimeDelay ? parseFloat(upstreamTimeDelay) : undefined,
        upstreamBreakingCapacity: upstreamBreakingCapacity ? parseFloat(upstreamBreakingCapacity) : undefined,
        downstreamDevice,
        downstreamRating: downRating,
        downstreamCurve,
        downstreamMagneticSetting: downstreamMagneticSetting ? parseFloat(downstreamMagneticSetting) : undefined,
        downstreamBreakingCapacity: downstreamBreakingCapacity ? parseFloat(downstreamBreakingCapacity) : undefined,
        faultCurrent: faultI,
        shortCircuitCurrent: shortCircuitCurrent ? parseFloat(shortCircuitCurrent) : faultI,
        loadCurrent: loadCurrent ? parseFloat(loadCurrent) : upRating * 0.8,
        cableLength: cableLength ? parseFloat(cableLength) : undefined,
        ambientTemperature: ambientTemperature ? parseFloat(ambientTemperature) : undefined,
        installationMethod
      };

      const calculationResult = calculateSelectivity(inputs);
      setResult(calculationResult);
    }
  };

  const reset = () => {
    setUpstreamDevice("mccb");
    setUpstreamRating("");
    setUpstreamCurve("");
    setDownstreamDevice("mcb");
    setDownstreamRating("");
    setDownstreamCurve("B");
    setFaultCurrent("");
    setUpstreamMagneticSetting("");
    setUpstreamTimeDelay("");
    setUpstreamBreakingCapacity("");
    setDownstreamMagneticSetting("");
    setDownstreamBreakingCapacity("");
    setShortCircuitCurrent("");
    setLoadCurrent("");
    setCableLength("");
    setAmbientTemperature("");
    setInstallationMethod("reference-method-c");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Selectivity/Discrimination Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate protection device selectivity and discrimination for proper fault current coordination.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-elec-yellow">Upstream Protection</h3>
            
            <MobileSelect
              label="Upstream Device Type"
              placeholder="Select upstream device"
              value={upstreamDevice}
              onValueChange={setUpstreamDevice}
              options={Object.entries(deviceTypes).map(([key, type]) => ({ value: key, label: type }))}
            />

            <MobileInput
              label="Upstream Rating (A)"
              type="number"
              value={upstreamRating}
              onChange={(e) => setUpstreamRating(e.target.value)}
              placeholder="e.g., 100"
              unit="A"
            />

            {upstreamDevice === "mcb" && (
              <MobileSelect
                label="Upstream Curve"
                placeholder="Select curve type"
                value={upstreamCurve}
                onValueChange={setUpstreamCurve}
                options={Object.entries(mcbCurves).map(([key, curve]) => ({ value: key, label: curve }))}
              />
            )}

            <Separator />

            <h3 className="text-lg font-medium text-elec-yellow">Downstream Protection</h3>

            <MobileSelect
              label="Downstream Device Type"
              placeholder="Select downstream device"
              value={downstreamDevice}
              onValueChange={setDownstreamDevice}
              options={Object.entries(deviceTypes).map(([key, type]) => ({ value: key, label: type }))}
            />

            <MobileInput
              label="Downstream Rating (A)"
              type="number"
              value={downstreamRating}
              onChange={(e) => setDownstreamRating(e.target.value)}
              placeholder="e.g., 32"
              unit="A"
            />

            {downstreamDevice === "mcb" && (
              <MobileSelect
                label="Downstream Curve"
                placeholder="Select curve type"
                value={downstreamCurve}
                onValueChange={setDownstreamCurve}
                options={Object.entries(mcbCurves).map(([key, curve]) => ({ value: key, label: curve }))}
              />
            )}

            <MobileInput
              label="Fault Current (A)"
              type="number"
              value={faultCurrent}
              onChange={(e) => setFaultCurrent(e.target.value)}
              placeholder="e.g., 1000"
              unit="A"
            />

            {/* Advanced Settings */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <MobileButton 
                  variant="outline" 
                  className="w-full justify-between"
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Advanced Settings
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </MobileButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-elec-yellow">Upstream Settings</h4>
                    <MobileInput
                      label="Custom Magnetic Setting (A)"
                      type="number"
                      value={upstreamMagneticSetting}
                      onChange={(e) => setUpstreamMagneticSetting(e.target.value)}
                      placeholder="Auto-calculated if blank"
                      unit="A"
                    />
                    <MobileInput
                      label="Time Delay (s)"
                      type="number"
                      value={upstreamTimeDelay}
                      onChange={(e) => setUpstreamTimeDelay(e.target.value)}
                      placeholder="0.0"
                      unit="s"
                      step="0.1"
                    />
                    <MobileInput
                      label="Breaking Capacity (kA)"
                      type="number"
                      value={upstreamBreakingCapacity}
                      onChange={(e) => setUpstreamBreakingCapacity(e.target.value)}
                      placeholder="e.g., 25"
                      unit="kA"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-elec-yellow">Downstream Settings</h4>
                    <MobileInput
                      label="Custom Magnetic Setting (A)"
                      type="number"
                      value={downstreamMagneticSetting}
                      onChange={(e) => setDownstreamMagneticSetting(e.target.value)}
                      placeholder="Auto-calculated if blank"
                      unit="A"
                    />
                    <MobileInput
                      label="Breaking Capacity (kA)"
                      type="number"
                      value={downstreamBreakingCapacity}
                      onChange={(e) => setDownstreamBreakingCapacity(e.target.value)}
                      placeholder="e.g., 10"
                      unit="kA"
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-elec-yellow">Circuit Parameters</h4>
                    <MobileInput
                      label="Short Circuit Current (A)"
                      type="number"
                      value={shortCircuitCurrent}
                      onChange={(e) => setShortCircuitCurrent(e.target.value)}
                      placeholder="Same as fault current if blank"
                      unit="A"
                    />
                    <MobileInput
                      label="Load Current (A)"
                      type="number"
                      value={loadCurrent}
                      onChange={(e) => setLoadCurrent(e.target.value)}
                      placeholder="80% of upstream rating if blank"
                      unit="A"
                    />
                    <MobileInput
                      label="Cable Length (m)"
                      type="number"
                      value={cableLength}
                      onChange={(e) => setCableLength(e.target.value)}
                      placeholder="e.g., 50"
                      unit="m"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-elec-yellow">Environmental</h4>
                    <MobileInput
                      label="Ambient Temperature (°C)"
                      type="number"
                      value={ambientTemperature}
                      onChange={(e) => setAmbientTemperature(e.target.value)}
                      placeholder="e.g., 30"
                      unit="°C"
                    />
                    <MobileSelect
                      label="Installation Method"
                      placeholder="Select installation method"
                      value={installationMethod}
                      onValueChange={setInstallationMethod}
                      options={Object.entries(installationMethods).map(([key, method]) => ({ 
                        value: key, 
                        label: method 
                      }))}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex flex-col sm:flex-row gap-2">
              <MobileButton 
                onClick={calculateSelectivityResult}
                variant="elec"
                size="wide"
                disabled={!upstreamRating || !downstreamRating || !faultCurrent}
                className="sm:flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Selectivity
              </MobileButton>
              <MobileButton 
                onClick={reset} 
                variant="outline" 
                size="default"
                className="sm:w-auto"
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information Section */}
      <SelectivityInfo />

      {/* Results Section */}
      {result && <SelectivityGuidance result={result} />}
    </div>
  );
};

export default SelectivityCalculator;
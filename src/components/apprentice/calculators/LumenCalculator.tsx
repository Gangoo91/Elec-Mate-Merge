import { useState } from "react";
import {
  Lightbulb,
  Calculator,
  Copy,
  ChevronDown,
  Info,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Settings,
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
import { copyToClipboard } from "@/lib/calc-utils";

// Room type presets with recommended lux levels
const ROOM_PRESETS = {
  office: { name: "Office/Workspace", lux: 500, description: "General office work" },
  meeting: { name: "Meeting Room", lux: 300, description: "Conference and meetings" },
  corridor: { name: "Corridor/Hallway", lux: 100, description: "Navigation areas" },
  warehouse: { name: "Warehouse", lux: 200, description: "General storage areas" },
  workshop: { name: "Workshop", lux: 750, description: "Detailed manual work" },
  classroom: { name: "Classroom", lux: 500, description: "Educational spaces" },
  retail: { name: "Retail Shop", lux: 750, description: "Customer areas" },
  kitchen: { name: "Kitchen", lux: 500, description: "Food preparation" },
  bathroom: { name: "Bathroom", lux: 200, description: "General use" },
  stairwell: { name: "Stairwell", lux: 150, description: "Safety lighting" },
};

const LumenCalculator = () => {
  const config = CALCULATOR_CONFIG["lighting"];

  const [calculationType, setCalculationType] = useState<
    "lux-to-lumens" | "lumens-to-lux" | "fixtures-needed"
  >("lux-to-lumens");
  const [inputMode, setInputMode] = useState<"area" | "dimensions">("area");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [lux, setLux] = useState("");
  const [lumens, setLumens] = useState("");
  const [fixtureOutput, setFixtureOutput] = useState("");
  const [mountingHeight, setMountingHeight] = useState("");
  const [workingHeight, setWorkingHeight] = useState("0.85");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Advanced calculation factors
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [utilizationFactor, setUtilizationFactor] = useState("0.6");
  const [maintenanceFactor, setMaintenanceFactor] = useState("0.8");
  const [fixtureEfficacy, setFixtureEfficacy] = useState("100");
  const [daylightContribution, setDaylightContribution] = useState("0");

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (inputMode === "area") {
      if (!area || parseFloat(area) <= 0) {
        newErrors.area = "Valid area is required";
      }
    } else {
      if (!length || parseFloat(length) <= 0) {
        newErrors.length = "Valid length is required";
      }
      if (!width || parseFloat(width) <= 0) {
        newErrors.width = "Valid width is required";
      }
    }

    if (calculationType === "lux-to-lumens") {
      if (!lux || parseFloat(lux) <= 0) {
        newErrors.lux = "Valid lux value is required";
      }
    } else if (calculationType === "lumens-to-lux") {
      if (!lumens || parseFloat(lumens) <= 0) {
        newErrors.lumens = "Valid lumens value is required";
      }
    } else if (calculationType === "fixtures-needed") {
      if (!lux || parseFloat(lux) <= 0) {
        newErrors.lux = "Valid lux value is required";
      }
      if (!fixtureOutput || parseFloat(fixtureOutput) <= 0) {
        newErrors.fixtureOutput = "Valid fixture output is required";
      }
    }

    if (showAdvanced) {
      const uf = parseFloat(utilizationFactor);
      const mf = parseFloat(maintenanceFactor);
      const efficacy = parseFloat(fixtureEfficacy);
      const daylight = parseFloat(daylightContribution);

      if (uf < 0.2 || uf > 1.0) {
        newErrors.utilizationFactor = "UF should be 0.2-1.0";
      }
      if (mf < 0.5 || mf > 1.0) {
        newErrors.maintenanceFactor = "MF should be 0.5-1.0";
      }
      if (efficacy < 20 || efficacy > 200) {
        newErrors.fixtureEfficacy = "20-200 lm/W";
      }
      if (daylight < 0 || daylight > 80) {
        newErrors.daylightContribution = "0-80%";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    const areaVal =
      inputMode === "area" ? parseFloat(area) : parseFloat(length) * parseFloat(width);
    const uf = parseFloat(utilizationFactor);
    const mf = parseFloat(maintenanceFactor);
    const efficacy = parseFloat(fixtureEfficacy);
    const daylightReduction = parseFloat(daylightContribution) / 100;

    if (calculationType === "lux-to-lumens") {
      const luxVal = parseFloat(lux);
      let calculatedLumens = luxVal * areaVal;

      if (showAdvanced) {
        calculatedLumens = calculatedLumens / (uf * mf);
        calculatedLumens = calculatedLumens * (1 - daylightReduction);
      }

      setResult(`${calculatedLumens.toFixed(0)} lumens`);

      const mountHeight = parseFloat(mountingHeight) || 3;
      const workHeight = parseFloat(workingHeight);
      const mountingToWork = mountHeight - workHeight;
      const spacingRatio = mountingToWork * 1.2;
      const totalFixtures = Math.ceil(calculatedLumens / efficacy / 40);

      let efficacyInfo = `Power: ${(calculatedLumens / efficacy).toFixed(1)}W`;
      if (mountingHeight) {
        efficacyInfo += ` | Spacing: ${spacingRatio.toFixed(1)}m`;
      }
      efficacyInfo += ` | Est. ${totalFixtures} fixtures`;

      if (showAdvanced) {
        efficacyInfo += ` | UF: ${uf} | MF: ${mf}`;
        if (daylightReduction > 0) {
          efficacyInfo += ` | Daylight: -${(daylightReduction * 100).toFixed(0)}%`;
        }
      }
      setAdditionalInfo(efficacyInfo);
    } else if (calculationType === "lumens-to-lux") {
      const lumensVal = parseFloat(lumens);
      let calculatedLux = lumensVal / areaVal;

      if (showAdvanced) {
        calculatedLux = calculatedLux * uf * mf;
        calculatedLux = calculatedLux / (1 - daylightReduction);
      }

      setResult(`${calculatedLux.toFixed(1)} lux`);

      let complianceInfo = "Level: ";
      if (calculatedLux < 100) complianceInfo += "Below minimum for most tasks";
      else if (calculatedLux < 300) complianceInfo += "Suitable for basic navigation";
      else if (calculatedLux < 500) complianceInfo += "Adequate for general work";
      else if (calculatedLux < 750) complianceInfo += "Good for detailed tasks";
      else complianceInfo += "Excellent for precision work";

      if (showAdvanced) {
        complianceInfo += ` | UF ${uf}, MF ${mf}`;
      }
      setAdditionalInfo(complianceInfo);
    } else if (calculationType === "fixtures-needed") {
      const luxVal = parseFloat(lux);
      const fixtureVal = parseFloat(fixtureOutput);
      let totalLumensNeeded = luxVal * areaVal;

      if (showAdvanced) {
        totalLumensNeeded = totalLumensNeeded / (uf * mf);
        totalLumensNeeded = totalLumensNeeded * (1 - daylightReduction);
      }

      const fixturesNeeded = Math.ceil(totalLumensNeeded / fixtureVal);

      setResult(`${fixturesNeeded} fixtures`);

      const mountHeight = parseFloat(mountingHeight) || 3;
      const workHeight = parseFloat(workingHeight);
      const mountingToWork = mountHeight - workHeight;
      const spacingDistance = mountingToWork * 1.2;
      const totalPower = totalLumensNeeded / efficacy;
      const annualCost = (totalPower * 0.25 * 2500 * 8760) / 1000;

      let additionalInfoText = `Total: ${totalLumensNeeded.toFixed(0)}lm | Power: ${totalPower.toFixed(1)}W | Annual: £${annualCost.toFixed(0)}`;
      if (mountingHeight) {
        additionalInfoText += ` | Spacing: ${spacingDistance.toFixed(1)}m`;
      }
      setAdditionalInfo(additionalInfoText);
    }
  };

  const resetCalculator = () => {
    setArea("");
    setLength("");
    setWidth("");
    setLux("");
    setLumens("");
    setFixtureOutput("");
    setMountingHeight("");
    setWorkingHeight("0.85");
    setSelectedRoom("");
    setResult(null);
    setAdditionalInfo(null);
    setErrors({});
    setUtilizationFactor("0.6");
    setMaintenanceFactor("0.8");
    setFixtureEfficacy("100");
    setDaylightContribution("0");
    setShowAdvanced(false);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleRoomPreset = (roomKey: string) => {
    const preset = ROOM_PRESETS[roomKey as keyof typeof ROOM_PRESETS];
    if (preset) {
      setLux(preset.lux.toString());
      setSelectedRoom(roomKey);
      clearError("lux");
    }
  };

  const copyResult = async () => {
    if (result) {
      const copyText = `Lighting Calculation Result: ${result}${additionalInfo ? " | " + additionalInfo : ""}`;
      await copyToClipboard(copyText);
    }
  };

  const calculationTypeOptions = [
    { value: "lux-to-lumens", label: "Lux to Lumens" },
    { value: "lumens-to-lux", label: "Lumens to Lux" },
    { value: "fixtures-needed", label: "Fixtures Required" },
  ];

  const roomPresetOptions = Object.entries(ROOM_PRESETS).map(([key, preset]) => ({
    value: key,
    label: `${preset.name} (${preset.lux} lx)`,
  }));

  const isValid =
    (inputMode === "area" ? parseFloat(area) > 0 : parseFloat(length) > 0 && parseFloat(width) > 0) &&
    ((calculationType === "lux-to-lumens" && parseFloat(lux) > 0) ||
      (calculationType === "lumens-to-lux" && parseFloat(lumens) > 0) ||
      (calculationType === "fixtures-needed" && parseFloat(lux) > 0 && parseFloat(fixtureOutput) > 0));

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="lighting"
        title="Professional Lighting Calculator"
        description="Calculate lighting requirements with room presets and fixture planning"
        badge="BS EN 12464"
      >
        {/* Calculation Type */}
        <CalculatorSelect
          label="Calculation Type"
          value={calculationType}
          onChange={(value) => setCalculationType(value as typeof calculationType)}
          options={calculationTypeOptions}
        />

        {/* Room Presets */}
        {(calculationType === "lux-to-lumens" || calculationType === "fixtures-needed") && (
          <div className="space-y-1">
            <CalculatorSelect
              label="Room Type (Optional)"
              value={selectedRoom}
              onChange={handleRoomPreset}
              options={[{ value: "", label: "Select room type..." }, ...roomPresetOptions]}
            />
            {selectedRoom && (
              <p className="text-xs text-white/80 pl-1">
                {ROOM_PRESETS[selectedRoom as keyof typeof ROOM_PRESETS].description}
              </p>
            )}
          </div>
        )}

        {/* Area Input Mode Toggle */}
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-white/80">Area Input</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setInputMode("area")}
            className={cn(
              "flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation",
              inputMode === "area"
                ? "text-black"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            )}
            style={
              inputMode === "area"
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            Direct Area
          </button>
          <button
            onClick={() => setInputMode("dimensions")}
            className={cn(
              "flex-1 h-11 rounded-xl text-sm font-medium transition-all touch-manipulation",
              inputMode === "dimensions"
                ? "text-black"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            )}
            style={
              inputMode === "dimensions"
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            Length × Width
          </button>
        </div>

        {/* Area/Dimension Inputs */}
        {inputMode === "area" ? (
          <CalculatorInput
            label="Area"
            unit="m²"
            type="text"
            inputMode="decimal"
            value={area}
            onChange={(val) => {
              setArea(val);
              clearError("area");
            }}
            placeholder="e.g., 50"
            error={errors.area}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <CalculatorInput
              label="Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={length}
              onChange={(val) => {
                setLength(val);
                clearError("length");
              }}
              placeholder="e.g., 10"
              error={errors.length}
            />
            <CalculatorInput
              label="Width"
              unit="m"
              type="text"
              inputMode="decimal"
              value={width}
              onChange={(val) => {
                setWidth(val);
                clearError("width");
              }}
              placeholder="e.g., 5"
              error={errors.width}
            />
          </div>
        )}

        {/* Main Calculation Inputs */}
        {calculationType === "lux-to-lumens" && (
          <CalculatorInput
            label="Required Illuminance"
            unit="lx"
            type="text"
            inputMode="decimal"
            value={lux}
            onChange={(val) => {
              setLux(val);
              clearError("lux");
            }}
            placeholder="e.g., 500"
            hint="Target lux level for the space"
            error={errors.lux}
          />
        )}

        {calculationType === "lumens-to-lux" && (
          <CalculatorInput
            label="Total Light Output"
            unit="lm"
            type="text"
            inputMode="decimal"
            value={lumens}
            onChange={(val) => {
              setLumens(val);
              clearError("lumens");
            }}
            placeholder="e.g., 25000"
            hint="Total fixture lumens installed"
            error={errors.lumens}
          />
        )}

        {calculationType === "fixtures-needed" && (
          <>
            <CalculatorInput
              label="Required Illuminance"
              unit="lx"
              type="text"
              inputMode="decimal"
              value={lux}
              onChange={(val) => {
                setLux(val);
                clearError("lux");
              }}
              placeholder="e.g., 500"
              error={errors.lux}
            />
            <CalculatorInput
              label="Fixture Output"
              unit="lm"
              type="text"
              inputMode="decimal"
              value={fixtureOutput}
              onChange={(val) => {
                setFixtureOutput(val);
                clearError("fixtureOutput");
              }}
              placeholder="e.g., 3000"
              hint="Lumens per fixture"
              error={errors.fixtureOutput}
            />
          </>
        )}

        {/* Height Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Mounting Height"
            unit="m"
            type="text"
            inputMode="decimal"
            value={mountingHeight}
            onChange={setMountingHeight}
            placeholder="e.g., 3.0"
            hint="For spacing calculations"
          />
          <CalculatorInput
            label="Working Height"
            unit="m"
            type="text"
            inputMode="decimal"
            value={workingHeight}
            onChange={setWorkingHeight}
            placeholder="0.85"
            hint="Work plane level"
          />
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/80">Advanced Options</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/70 transition-transform duration-200",
                showAdvanced && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4 space-y-3">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
              <CalculatorInput
                label="Utilization Factor (UF)"
                type="text"
                inputMode="decimal"
                value={utilizationFactor}
                onChange={(val) => {
                  setUtilizationFactor(val);
                  clearError("utilizationFactor");
                }}
                placeholder="0.6"
                hint="Light reaching work plane (0.2-1.0)"
                error={errors.utilizationFactor}
              />

              <CalculatorInput
                label="Maintenance Factor (MF)"
                type="text"
                inputMode="decimal"
                value={maintenanceFactor}
                onChange={(val) => {
                  setMaintenanceFactor(val);
                  clearError("maintenanceFactor");
                }}
                placeholder="0.8"
                hint="Depreciation over time (0.5-1.0)"
                error={errors.maintenanceFactor}
              />

              <CalculatorInput
                label="Fixture Efficacy"
                unit="lm/W"
                type="text"
                inputMode="decimal"
                value={fixtureEfficacy}
                onChange={(val) => {
                  setFixtureEfficacy(val);
                  clearError("fixtureEfficacy");
                }}
                placeholder="100"
                hint="LED: 80-150, Fluorescent: 60-100"
                error={errors.fixtureEfficacy}
              />

              <CalculatorInput
                label="Daylight Contribution"
                unit="%"
                type="text"
                inputMode="decimal"
                value={daylightContribution}
                onChange={(val) => {
                  setDaylightContribution(val);
                  clearError("daylightContribution");
                }}
                placeholder="0"
                hint="Natural light reduction (0-80%)"
                error={errors.daylightContribution}
              />

              <div className="p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/20">
                <p className="text-xs text-cyan-200/70">
                  <strong className="text-cyan-300">Pro Tip:</strong> Use UF 0.4-0.6 for most rooms,
                  MF 0.8 for clean environments.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculate}
            disabled={!isValid}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid ? "text-black" : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={
              isValid
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="lighting">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">
                {calculationType === "lux-to-lumens" && "Lumens Required"}
                {calculationType === "lumens-to-lux" && "Illuminance Level"}
                {calculationType === "fixtures-needed" && "Fixtures Needed"}
              </p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result}
              </div>
            </div>

            {additionalInfo && (
              <div className="py-3 border-b border-white/10">
                <p className="text-sm text-white/70 text-center">{additionalInfo}</p>
              </div>
            )}

            {/* Compliance Badge for lumens-to-lux */}
            {calculationType === "lumens-to-lux" && (
              <div className="flex justify-center pt-3">
                {(() => {
                  const luxValue = parseFloat(result.replace(" lux", ""));
                  if (luxValue >= 500)
                    return (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">Excellent</span>
                      </div>
                    );
                  if (luxValue >= 300)
                    return (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                        <CheckCircle className="h-3 w-3 text-cyan-400" />
                        <span className="text-xs text-cyan-400">Good</span>
                      </div>
                    );
                  if (luxValue >= 100)
                    return (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                        <AlertTriangle className="h-3 w-3 text-amber-400" />
                        <span className="text-xs text-amber-400">Basic</span>
                      </div>
                    );
                  return (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30">
                      <AlertTriangle className="h-3 w-3 text-red-400" />
                      <span className="text-xs text-red-400">Poor</span>
                    </div>
                  );
                })()}
              </div>
            )}

            <button
              onClick={copyResult}
              className="w-full mt-4 h-11 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Copy className="h-4 w-4" />
              Copy Result
            </button>
          </CalculatorResult>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: "#60a5fa15" }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    What This Means
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
                    Lux (lx): Light intensity per square metre - what you actually see
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Lumens (lm): Total light output from source - what the fixture produces
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Utilisation Factor (UF): How much light reaches the work surface
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Maintenance Factor (MF): Light reduction over time due to dirt and ageing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Efficacy (lm/W): How efficient the light source is - higher is better
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
                Lighting Reference
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Common Levels</p>
                <p className="text-amber-200/70">Corridors: 100 lx</p>
                <p className="text-amber-200/70">Meetings: 300 lx</p>
                <p className="text-amber-200/70">Offices: 500 lx</p>
                <p className="text-amber-200/70">Workshops: 750 lx</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Energy Costs</p>
                <p className="text-amber-200/70">LED: £2-4/yr per 100W</p>
                <p className="text-amber-200/70">Fluorescent: £6-8/yr</p>
                <p className="text-amber-200/70">Halogen: £15-20/yr</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Regulations</p>
                <p className="text-amber-200/70">BS EN 12464-1: Workplace</p>
                <p className="text-amber-200/70">Part L: Energy</p>
                <p className="text-amber-200/70">CDM 2015: Construction</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-amber-400/5 border border-amber-400/20">
              <p className="text-xs text-amber-200/70">
                <strong className="text-amber-300">Practical Tips:</strong> LED fixtures are typically
                80-150 lm/W. Mount at 2.4-4m height, space at 1.2× mounting height. Consider daylight
                sensors to reduce artificial lighting during day.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default LumenCalculator;

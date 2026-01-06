import { useState, useMemo } from "react";
import {
  Lightbulb,
  Calculator,
  RotateCcw,
  Zap,
  Building,
  Route,
  ChevronDown,
  BookOpen,
  Info,
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
import {
  calculateEmergencyLighting,
  occupancyProfiles,
  fixtureProfiles,
  EmergencyLightingInputs,
} from "@/lib/emergency-lighting";
import EmergencyLightingGuidance from "./emergency/EmergencyLightingGuidance";

const EmergencyLightingCalculator = () => {
  const config = CALCULATOR_CONFIG["lighting"];

  // Core inputs
  const [floorArea, setFloorArea] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("3");
  const [occupancyType, setOccupancyType] = useState<string>("office");
  const [exitRoutes, setExitRoutes] = useState<string>("2");
  const [emergencyDuration, setEmergencyDuration] = useState<string>("3");
  const [fixtureType, setFixtureType] = useState<string>("led-standard");

  // Advanced inputs
  const [corridorLength, setCorridorLength] = useState<string>("");
  const [corridorWidth, setCorridorWidth] = useState<string>("");
  const [staircaseFlights, setStaircaseFlights] = useState<string>("");
  const [hasHighRiskTasks, setHasHighRiskTasks] = useState<boolean>(false);
  const [hasDisabledAccess, setHasDisabledAccess] = useState<boolean>(false);
  const [buildingHeight, setBuildingHeight] = useState<string>("");
  const [complexLayout, setComplexLayout] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const [result, setResult] = useState<ReturnType<typeof calculateEmergencyLighting> | null>(null);

  const handleCalculate = () => {
    const area = parseFloat(floorArea);

    if (area > 0) {
      const inputs: EmergencyLightingInputs = {
        floorArea: area,
        ceilingHeight: parseFloat(ceilingHeight),
        occupancyType,
        corridorLength: corridorLength ? parseFloat(corridorLength) : undefined,
        corridorWidth: corridorWidth ? parseFloat(corridorWidth) : undefined,
        staircaseFlights: staircaseFlights ? parseInt(staircaseFlights) : undefined,
        hasHighRiskTasks,
        emergencyDuration: parseFloat(emergencyDuration),
        fixtureType,
        exitRoutes: parseInt(exitRoutes),
        hasDisabledAccess,
        buildingHeight: buildingHeight ? parseFloat(buildingHeight) : undefined,
        complexLayout,
      };

      const calculationResult = calculateEmergencyLighting(inputs);
      setResult(calculationResult);
    }
  };

  const reset = () => {
    setFloorArea("");
    setCeilingHeight("3");
    setOccupancyType("office");
    setExitRoutes("2");
    setEmergencyDuration("3");
    setFixtureType("led-standard");
    setCorridorLength("");
    setCorridorWidth("");
    setStaircaseFlights("");
    setHasHighRiskTasks(false);
    setHasDisabledAccess(false);
    setBuildingHeight("");
    setComplexLayout(false);
    setResult(null);
  };

  const isValid = parseFloat(floorArea) > 0;

  const occupancyOptions = Object.entries(occupancyProfiles).map(([key, profile]) => ({
    value: key,
    label: profile.description,
  }));

  const fixtureOptions = Object.entries(fixtureProfiles).map(([key, fixture]) => ({
    value: key,
    label: fixture.description,
  }));

  const durationOptions = [
    { value: "1", label: "1 Hour (Occupied premises)" },
    { value: "3", label: "3 Hours (Unoccupied premises)" },
    { value: "24", label: "24 Hours (High risk areas)" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="lighting"
        title="Emergency Lighting Calculator"
        description="Calculate emergency lighting requirements per BS 5266-1"
        badge="BS 5266"
      >
        {/* Core Parameters */}
        <div className="flex items-center gap-2 mb-3">
          <Building className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-white/80">Core Parameters</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorInput
            label="Floor Area"
            unit="m²"
            type="text"
            inputMode="decimal"
            value={floorArea}
            onChange={setFloorArea}
            placeholder="e.g., 500"
            hint="Total floor area requiring emergency lighting"
          />

          <CalculatorInput
            label="Ceiling Height"
            unit="m"
            type="text"
            inputMode="decimal"
            value={ceilingHeight}
            onChange={setCeilingHeight}
            placeholder="e.g., 3.0"
            hint="Average ceiling height"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Occupancy Type"
            value={occupancyType}
            onChange={setOccupancyType}
            options={occupancyOptions}
          />

          <CalculatorInput
            label="Exit Routes"
            type="text"
            inputMode="numeric"
            value={exitRoutes}
            onChange={setExitRoutes}
            placeholder="e.g., 2"
            hint="Primary escape routes"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Emergency Duration"
            value={emergencyDuration}
            onChange={setEmergencyDuration}
            options={durationOptions}
          />

          <CalculatorSelect
            label="Fixture Type"
            value={fixtureType}
            onChange={setFixtureType}
            options={fixtureOptions}
          />
        </div>

        {/* Advanced Options Toggle */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white/80">Advanced Parameters</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showAdvanced && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="pt-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <CalculatorInput
                label="Corridor Length"
                unit="m"
                type="text"
                inputMode="decimal"
                value={corridorLength}
                onChange={setCorridorLength}
                placeholder="Auto"
              />

              <CalculatorInput
                label="Corridor Width"
                unit="m"
                type="text"
                inputMode="decimal"
                value={corridorWidth}
                onChange={setCorridorWidth}
                placeholder="Standard"
              />

              <CalculatorInput
                label="Staircase Flights"
                type="text"
                inputMode="numeric"
                value={staircaseFlights}
                onChange={setStaircaseFlights}
                placeholder="0"
              />
            </div>

            <CalculatorInput
              label="Building Height"
              unit="m"
              type="text"
              inputMode="decimal"
              value={buildingHeight}
              onChange={setBuildingHeight}
              placeholder="Single storey"
              hint="Total building height (affects regulations)"
            />

            {/* Boolean Options */}
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasHighRiskTasks}
                  onChange={(e) => setHasHighRiskTasks(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/50"
                />
                <span className="text-sm text-white/80">High Risk Tasks</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasDisabledAccess}
                  onChange={(e) => setHasDisabledAccess(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/50"
                />
                <span className="text-sm text-white/80">Disabled Access</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors col-span-2">
                <input
                  type="checkbox"
                  checked={complexLayout}
                  onChange={(e) => setComplexLayout(e.target.checked)}
                  className="rounded border-white/20 bg-white/10 text-cyan-400 focus:ring-cyan-400/50"
                />
                <span className="text-sm text-white/80">Complex Layout</span>
              </label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCalculate}
            disabled={!isValid}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              isValid
                ? "text-black"
                : "bg-white/10 text-white/30 cursor-not-allowed"
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
            Calculate Requirements
          </button>
          <button
            onClick={reset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </CalculatorCard>

      {/* Results Section */}
      {result && (
        <EmergencyLightingGuidance
          result={result}
          inputs={{
            floorArea: parseFloat(floorArea),
            occupancyType,
            emergencyDuration: parseFloat(emergencyDuration),
            fixtureType,
          }}
        />
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: "#fbbf2415" }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                BS 5266 Reference
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/40 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Illuminance Levels</p>
                <p className="text-amber-200/70">Escape routes: 1 lux min</p>
                <p className="text-amber-200/70">Anti-panic: 0.5 lux min</p>
                <p className="text-amber-200/70">High risk: 10% normal</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Duration</p>
                <p className="text-amber-200/70">Sleeping risk: 3 hours</p>
                <p className="text-amber-200/70">Non-sleeping: 1 hour</p>
                <p className="text-amber-200/70">High risk: 24 hours</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Spacing</p>
                <p className="text-amber-200/70">Max 2× mounting height</p>
                <p className="text-amber-200/70">Exit signs visible</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Testing</p>
                <p className="text-amber-200/70">Monthly: brief test</p>
                <p className="text-amber-200/70">Annual: full duration</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default EmergencyLightingCalculator;

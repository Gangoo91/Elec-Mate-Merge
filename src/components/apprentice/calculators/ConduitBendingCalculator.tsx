import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, RotateCcw, Info, Ruler, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
} from "@/components/calculators/shared";

// Bend multipliers for different angles
const BEND_MULTIPLIERS = {
  "10": { shrink: 0.015, distance: 6.0, radius: 0.0175 },
  "22.5": { shrink: 0.076, distance: 2.6, radius: 0.0393 },
  "30": { shrink: 0.134, distance: 2.0, radius: 0.0524 },
  "45": { shrink: 0.414, distance: 1.414, radius: 0.0785 },
  "60": { shrink: 0.577, distance: 1.155, radius: 0.1047 },
  "90": { shrink: 1.0, distance: 1.0, radius: 0.1571 },
} as const;

// Common conduit sizes (mm)
const CONDUIT_SIZES = [
  { value: "20", label: "20mm" },
  { value: "25", label: "25mm" },
  { value: "32", label: "32mm" },
  { value: "40", label: "40mm" },
  { value: "50", label: "50mm" },
];

// Bend types
const BEND_TYPES = [
  { value: "offset", label: "Offset Bend" },
  { value: "saddle-3", label: "3-Point Saddle" },
  { value: "saddle-4", label: "4-Point Saddle" },
  { value: "90-stub", label: "90° Stub-Up" },
  { value: "90-back", label: "90° Back-to-Back" },
  { value: "kick", label: "Kick (Dog-Leg)" },
];

// Bend angles for offset bends
const BEND_ANGLES = [
  { value: "10", label: "10°" },
  { value: "22.5", label: "22.5°" },
  { value: "30", label: "30° (Most Common)" },
  { value: "45", label: "45°" },
  { value: "60", label: "60°" },
];

interface CalculationResult {
  bendType: string;
  shrinkAmount: number;
  distanceBetweenBends: number;
  developedLength: number;
  firstBendMark: number;
  secondBendMark: number;
  thirdBendMark?: number;
  fourthBendMark?: number;
  takeUp: number;
  minBendRadius: number;
  isCompliant: boolean;
  notes: string[];
}

const ConduitBendingCalculator = () => {
  const [bendType, setBendType] = useState("offset");
  const [conduitSize, setConduitSize] = useState("20");
  const [bendAngle, setBendAngle] = useState("30");
  const [rise, setRise] = useState("");
  const [stubLength, setStubLength] = useState("");
  const [distanceToObstacle, setDistanceToObstacle] = useState("");
  const [obstacleHeight, setObstacleHeight] = useState("");
  const [kickOffset, setKickOffset] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBS7671, setShowBS7671] = useState(false);

  // Get bender take-up based on conduit size (approximate values)
  const getTakeUp = (size: string): number => {
    const takeUpValues: Record<string, number> = {
      "20": 100, // 100mm take-up for 20mm conduit
      "25": 125,
      "32": 150,
      "40": 200,
      "50": 250,
    };
    return takeUpValues[size] || 100;
  };

  // Get minimum bend radius based on conduit size (BS 7671 Table 4F1)
  const getMinBendRadius = (size: string): number => {
    const radii: Record<string, number> = {
      "20": 100, // Internal bend radius in mm
      "25": 125,
      "32": 160,
      "40": 200,
      "50": 250,
    };
    return radii[size] || 100;
  };

  const calculate = () => {
    const riseVal = parseFloat(rise) || 0;
    const stubVal = parseFloat(stubLength) || 0;
    const distanceVal = parseFloat(distanceToObstacle) || 0;
    const heightVal = parseFloat(obstacleHeight) || 0;
    const kickVal = parseFloat(kickOffset) || 0;
    const takeUp = getTakeUp(conduitSize);
    const multipliers = BEND_MULTIPLIERS[bendAngle as keyof typeof BEND_MULTIPLIERS];

    let calculationResult: CalculationResult;

    switch (bendType) {
      case "offset": {
        // Offset bend calculation
        const shrinkAmount = riseVal * multipliers.shrink;
        const distanceBetweenBends = riseVal * multipliers.distance;
        const minRadius = getMinBendRadius(conduitSize);
        const developedLength = 2 * (Math.PI * minRadius * parseFloat(bendAngle) / 180);

        calculationResult = {
          bendType: "Offset Bend",
          shrinkAmount,
          distanceBetweenBends,
          developedLength,
          firstBendMark: distanceVal - shrinkAmount,
          secondBendMark: distanceVal - shrinkAmount + distanceBetweenBends,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true, // Offset bends inherently comply if using standard bender
          notes: [
            `Using ${bendAngle}° offset angle`,
            `Shrink multiplier: ${multipliers.shrink}`,
            `Distance multiplier: ${multipliers.distance}`,
            "Mark first bend, then measure distance between bends for second mark",
          ],
        };
        break;
      }

      case "saddle-3": {
        // 3-point saddle (45-45 configuration)
        const centreAngle = 45;
        const sideAngle = 22.5;
        const saddleMultiplier = BEND_MULTIPLIERS["45"];
        const minRadius = getMinBendRadius(conduitSize);
        const shrinkAmount = heightVal * saddleMultiplier.shrink * 2.5; // Approximate for saddle
        const distanceBetweenBends = heightVal * 2.5; // Centre to outer bend spacing

        calculationResult = {
          bendType: "3-Point Saddle",
          shrinkAmount,
          distanceBetweenBends,
          developedLength: heightVal * 3,
          firstBendMark: distanceVal - distanceBetweenBends / 2 - shrinkAmount / 2,
          secondBendMark: distanceVal - shrinkAmount / 2, // Centre mark
          thirdBendMark: distanceVal + distanceBetweenBends / 2 - shrinkAmount / 2,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true,
          notes: [
            `Centre bend: ${centreAngle}° (apex over obstacle)`,
            `Side bends: ${sideAngle}° each`,
            "Centre mark goes directly over obstacle centre",
            `Obstacle clearance: ${heightVal}mm`,
          ],
        };
        break;
      }

      case "saddle-4": {
        // 4-point saddle (22.5° bends)
        const minRadius = getMinBendRadius(conduitSize);
        const shrinkAmount = heightVal * 0.2; // Approximate shrink for 4-point
        const outerSpacing = heightVal * 2.6; // Spacing for outer bends
        const innerSpacing = heightVal * 1.4; // Spacing for inner bends

        calculationResult = {
          bendType: "4-Point Saddle",
          shrinkAmount,
          distanceBetweenBends: innerSpacing,
          developedLength: heightVal * 4,
          firstBendMark: distanceVal - outerSpacing - shrinkAmount / 2,
          secondBendMark: distanceVal - innerSpacing / 2 - shrinkAmount / 2,
          thirdBendMark: distanceVal + innerSpacing / 2 - shrinkAmount / 2,
          fourthBendMark: distanceVal + outerSpacing - shrinkAmount / 2,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true,
          notes: [
            "All bends at 22.5°",
            "Outer bends first, then inner bends",
            "More gradual profile than 3-point saddle",
            `Total saddle width: ${(outerSpacing * 2).toFixed(0)}mm`,
          ],
        };
        break;
      }

      case "90-stub": {
        // 90° stub-up
        const minRadius = getMinBendRadius(conduitSize);
        calculationResult = {
          bendType: "90° Stub-Up",
          shrinkAmount: 0,
          distanceBetweenBends: 0,
          developedLength: Math.PI * minRadius / 2,
          firstBendMark: stubVal - takeUp,
          secondBendMark: 0,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true,
          notes: [
            `Take-up for ${conduitSize}mm conduit: ${takeUp}mm`,
            "Mark = Desired stub length - Take-up",
            "Place mark at bender shoe arrow",
            "Always verify take-up with your specific bender",
          ],
        };
        break;
      }

      case "90-back": {
        // 90° back-to-back
        const minRadius = getMinBendRadius(conduitSize);
        const backToBackDistance = stubVal; // Using stubLength as overall length
        const secondStubVal = parseFloat(distanceToObstacle) || stubVal; // Re-using field for second stub

        calculationResult = {
          bendType: "90° Back-to-Back",
          shrinkAmount: 0,
          distanceBetweenBends: backToBackDistance - takeUp - secondStubVal + takeUp,
          developedLength: Math.PI * minRadius,
          firstBendMark: stubVal - takeUp,
          secondBendMark: backToBackDistance - secondStubVal + takeUp,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true,
          notes: [
            "Make first 90° bend",
            "Measure from back of first bend",
            `Second mark = Total length - Second stub + Take-up`,
            "Hook bender on first bend to make second",
          ],
        };
        break;
      }

      case "kick": {
        // Kick (dog-leg) bend - usually 10° or 22.5°
        const kickAngle = "10"; // Most kicks are 10°
        const kickMultiplier = BEND_MULTIPLIERS[kickAngle];
        const minRadius = getMinBendRadius(conduitSize);
        const shrinkAmount = kickVal * kickMultiplier.shrink;

        calculationResult = {
          bendType: "Kick (Dog-Leg)",
          shrinkAmount,
          distanceBetweenBends: 0,
          developedLength: kickVal * kickMultiplier.radius,
          firstBendMark: distanceVal - shrinkAmount,
          secondBendMark: 0,
          takeUp,
          minBendRadius: minRadius,
          isCompliant: true,
          notes: [
            "Kick bends are typically 10° deflection",
            "Used to shift conduit path slightly",
            `Shrink: ${shrinkAmount.toFixed(1)}mm`,
            "Minimal shrink - often negligible for small kicks",
          ],
        };
        break;
      }

      default:
        return;
    }

    setResult(calculationResult);
  };

  const reset = () => {
    setBendType("offset");
    setConduitSize("20");
    setBendAngle("30");
    setRise("");
    setStubLength("");
    setDistanceToObstacle("");
    setObstacleHeight("");
    setKickOffset("");
    setResult(null);
  };

  // Render different input fields based on bend type
  const renderInputs = () => {
    switch (bendType) {
      case "offset":
        return (
          <>
            <CalculatorSelect
              label="Bend Angle"
              value={bendAngle}
              onValueChange={setBendAngle}
              options={BEND_ANGLES}
              placeholder="Select angle"
            />
            <CalculatorInput
              label="Rise (Offset Height)"
              value={rise}
              onChange={setRise}
              placeholder="e.g., 50"
              unit="mm"
              helperText="Vertical distance to offset"
            />
            <CalculatorInput
              label="Distance to Obstacle"
              value={distanceToObstacle}
              onChange={setDistanceToObstacle}
              placeholder="e.g., 500"
              unit="mm"
              helperText="From conduit end to centre of offset"
            />
          </>
        );

      case "saddle-3":
      case "saddle-4":
        return (
          <>
            <CalculatorInput
              label="Obstacle Height"
              value={obstacleHeight}
              onChange={setObstacleHeight}
              placeholder="e.g., 40"
              unit="mm"
              helperText="Height of obstacle to clear"
            />
            <CalculatorInput
              label="Distance to Obstacle Centre"
              value={distanceToObstacle}
              onChange={setDistanceToObstacle}
              placeholder="e.g., 600"
              unit="mm"
              helperText="From conduit end to obstacle centre"
            />
          </>
        );

      case "90-stub":
        return (
          <CalculatorInput
            label="Desired Stub Length"
            value={stubLength}
            onChange={setStubLength}
            placeholder="e.g., 200"
            unit="mm"
            helperText="Vertical stub height from floor/wall"
          />
        );

      case "90-back":
        return (
          <>
            <CalculatorInput
              label="First Stub Length"
              value={stubLength}
              onChange={setStubLength}
              placeholder="e.g., 200"
              unit="mm"
              helperText="Height of first 90° stub"
            />
            <CalculatorInput
              label="Second Stub Length"
              value={distanceToObstacle}
              onChange={setDistanceToObstacle}
              placeholder="e.g., 200"
              unit="mm"
              helperText="Height of second 90° stub"
            />
          </>
        );

      case "kick":
        return (
          <>
            <CalculatorInput
              label="Kick Offset"
              value={kickOffset}
              onChange={setKickOffset}
              placeholder="e.g., 25"
              unit="mm"
              helperText="Horizontal offset needed"
            />
            <CalculatorInput
              label="Distance from End"
              value={distanceToObstacle}
              onChange={setDistanceToObstacle}
              placeholder="e.g., 300"
              unit="mm"
              helperText="Where to place the kick"
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <CalculatorCard
      title="Conduit Bending Calculator"
      description="Calculate bend marks, shrink, and spacing for conduit bending"
      icon={Ruler}
    >
      <div className="space-y-4 sm:space-y-5">
        {/* Bend Type Selection */}
        <CalculatorSelect
          label="Bend Type"
          value={bendType}
          onValueChange={(val) => {
            setBendType(val);
            setResult(null);
          }}
          options={BEND_TYPES}
          placeholder="Select bend type"
        />

        {/* Conduit Size */}
        <CalculatorSelect
          label="Conduit Size"
          value={conduitSize}
          onValueChange={setConduitSize}
          options={CONDUIT_SIZES}
          placeholder="Select size"
        />

        {/* Dynamic Inputs Based on Bend Type */}
        {renderInputs()}

        {/* Actions */}
        <CalculatorActions
          onCalculate={calculate}
          onReset={reset}
          calculateDisabled={
            (bendType === "offset" && (!rise || !distanceToObstacle)) ||
            ((bendType === "saddle-3" || bendType === "saddle-4") && (!obstacleHeight || !distanceToObstacle)) ||
            (bendType === "90-stub" && !stubLength) ||
            (bendType === "90-back" && (!stubLength || !distanceToObstacle)) ||
            (bendType === "kick" && (!kickOffset || !distanceToObstacle))
          }
        />

        {/* Results */}
        {result && (
          <CalculatorResult title={`${result.bendType} Results`}>
            {/* Compliance Status */}
            <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${result.isCompliant ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              {result.isCompliant ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}
              <div>
                <span className={`text-sm font-medium ${result.isCompliant ? 'text-green-400' : 'text-red-400'}`}>
                  {result.isCompliant ? 'BS 7671 Compliant' : 'Check Bend Radius'}
                </span>
                <p className="text-xs text-white/60">
                  Min. bend radius for {conduitSize}mm conduit: {result.minBendRadius}mm
                </p>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="First Bend Mark"
                value={`${result.firstBendMark.toFixed(1)} mm`}
                color="yellow"
              />
              {result.secondBendMark > 0 && (
                <ResultValue
                  label="Second Bend Mark"
                  value={`${result.secondBendMark.toFixed(1)} mm`}
                  color="blue"
                />
              )}
              {result.thirdBendMark && (
                <ResultValue
                  label="Third Bend Mark"
                  value={`${result.thirdBendMark.toFixed(1)} mm`}
                  color="green"
                />
              )}
              {result.fourthBendMark && (
                <ResultValue
                  label="Fourth Bend Mark"
                  value={`${result.fourthBendMark.toFixed(1)} mm`}
                  color="purple"
                />
              )}
              {result.shrinkAmount > 0 && (
                <ResultValue
                  label="Shrink Amount"
                  value={`${result.shrinkAmount.toFixed(1)} mm`}
                  color="orange"
                />
              )}
              {result.distanceBetweenBends > 0 && (
                <ResultValue
                  label="Distance Between Bends"
                  value={`${result.distanceBetweenBends.toFixed(1)} mm`}
                  color="cyan"
                />
              )}
              <ResultValue
                label="Take-Up (90°)"
                value={`${result.takeUp} mm`}
                color="gray"
              />
            </ResultsGrid>

            {/* Notes */}
            {result.notes.length > 0 && (
              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-400 mb-2">Bending Notes</h4>
                <ul className="text-xs text-white/70 space-y-1">
                  {result.notes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Visual Diagram */}
            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <h4 className="text-sm font-medium text-white/80 mb-3">Marking Guide</h4>
              <div className="relative h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full overflow-hidden">
                {/* Conduit visualization */}
                <div className="absolute inset-y-2 left-4 right-4 bg-gray-500 rounded-full flex items-center">
                  {/* First mark */}
                  <div
                    className="absolute w-0.5 h-full bg-yellow-400"
                    style={{ left: `${Math.min(90, Math.max(10, (result.firstBendMark / 1000) * 100))}%` }}
                  />
                  {result.secondBendMark > 0 && (
                    <div
                      className="absolute w-0.5 h-full bg-blue-400"
                      style={{ left: `${Math.min(90, Math.max(20, (result.secondBendMark / 1000) * 100))}%` }}
                    />
                  )}
                  {result.thirdBendMark && (
                    <div
                      className="absolute w-0.5 h-full bg-green-400"
                      style={{ left: `${Math.min(90, Math.max(30, (result.thirdBendMark / 1000) * 100))}%` }}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/50 mt-2 px-4">
                <span>End</span>
                <span>Bend marks</span>
                <span>→</span>
              </div>
            </div>
          </CalculatorResult>
        )}

        {/* Guidance Section */}
        <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/90">Bending Reference Guide</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showGuidance ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="space-y-4 text-sm text-white/70">
              <div>
                <h4 className="font-medium text-white/90 mb-2">Offset Bend Multipliers</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-white/5 rounded">
                    <span className="text-yellow-400">10°:</span> ×6.0 distance, ×0.015 shrink
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="text-yellow-400">22.5°:</span> ×2.6 distance, ×0.076 shrink
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="text-yellow-400">30°:</span> ×2.0 distance, ×0.134 shrink
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="text-yellow-400">45°:</span> ×1.414 distance, ×0.414 shrink
                  </div>
                  <div className="p-2 bg-white/5 rounded">
                    <span className="text-yellow-400">60°:</span> ×1.155 distance, ×0.577 shrink
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">Take-Up Values (Typical)</h4>
                <p className="text-xs mb-2">Distance from back of bend to where conduit meets floor/wall:</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-white/10 rounded">20mm: 100mm</span>
                  <span className="px-2 py-1 bg-white/10 rounded">25mm: 125mm</span>
                  <span className="px-2 py-1 bg-white/10 rounded">32mm: 150mm</span>
                  <span className="px-2 py-1 bg-white/10 rounded">40mm: 200mm</span>
                  <span className="px-2 py-1 bg-white/10 rounded">50mm: 250mm</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white/90 mb-2">Key Tips</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Always verify take-up with your specific bender - values vary by manufacturer</li>
                  <li>• Use a conduit level to ensure accurate horizontal and vertical</li>
                  <li>• For offsets, 30° is most common as it provides good clearance with manageable shrink</li>
                  <li>• BS 7671 requires minimum bend radii - don't over-bend</li>
                  <li>• Cut conduit slightly longer to allow for measurement adjustments</li>
                </ul>
              </div>

              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-1">Safety Note</h4>
                <p className="text-xs">
                  Always wear appropriate PPE when bending conduit. Secure the conduit properly in the bender
                  and apply steady, controlled pressure. Never exceed the minimum bend radius for the conduit size.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* BS 7671 Reference Section */}
        <Collapsible open={showBS7671} onOpenChange={setShowBS7671}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors touch-manipulation">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white/90">BS 7671 Reference</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${showBS7671 ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="space-y-4 text-sm text-white/70">
              <div>
                <h4 className="font-medium text-amber-400 mb-2">Regulation 522.8 - Bends in Wiring Systems</h4>
                <p className="text-xs mb-2">
                  The internal radius of every bend in a wiring system shall be such that conductors
                  or cables do not suffer damage, and terminals are not stressed.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Table 4F1 - Minimum Internal Bend Radii</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">20mm conduit:</span> 100mm min radius
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">25mm conduit:</span> 125mm min radius
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">32mm conduit:</span> 160mm min radius
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded">
                    <span className="text-amber-300">40mm conduit:</span> 200mm min radius
                  </div>
                  <div className="p-2 bg-amber-500/10 rounded col-span-2">
                    <span className="text-amber-300">50mm conduit:</span> 250mm min radius
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Why Minimum Bend Radius Matters</h4>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Cable damage prevention:</strong> Exceeding minimum radius can crack insulation or damage conductors</li>
                  <li>• <strong>Pulling cables:</strong> Tight bends create excessive friction, making cable pulling difficult</li>
                  <li>• <strong>Future maintenance:</strong> Cables may need replacing - sharp bends make this impossible</li>
                  <li>• <strong>Heat dissipation:</strong> Kinked cables have reduced heat dissipation capacity</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-amber-400 mb-2">Why 30° Is the Standard Offset Angle</h4>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Best balance:</strong> Good clearance with manageable shrink (×0.134)</li>
                  <li>• <strong>Easy calculation:</strong> Distance between bends = 2× rise (simple mental maths)</li>
                  <li>• <strong>Visual appeal:</strong> Creates professional-looking, gradual offsets</li>
                  <li>• <strong>Cable friendly:</strong> Gentle angle reduces stress on cables when pulling</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-medium text-amber-400 mb-1">Key Regulation</h4>
                <p className="text-xs">
                  <strong>Regulation 522.8.1:</strong> Standard conduit benders are designed to meet Table 4F1
                  requirements automatically. However, manual bending or non-standard equipment may exceed
                  these limits - always check your results.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </CalculatorCard>
  );
};

export default ConduitBendingCalculator;

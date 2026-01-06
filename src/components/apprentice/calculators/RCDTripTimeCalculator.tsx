import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calculator, Shield, Info, AlertTriangle, CheckCircle, XCircle, Zap, BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const RCDTripTimeCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  const [rcdType, setRcdType] = useState("");
  const [rcdRating, setRcdRating] = useState("");
  const [testCurrent, setTestCurrent] = useState("");
  const [maxTripTime, setMaxTripTime] = useState<number | null>(null);
  const [actualTripTime, setActualTripTime] = useState("");
  const [isCompliant, setIsCompliant] = useState<boolean | null>(null);
  const [testDescription, setTestDescription] = useState("");

  // Collapsible states
  const [showMeaning, setShowMeaning] = useState(false);
  const [showTesting, setShowTesting] = useState(false);
  const [showProcedures, setShowProcedures] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const tripTimeRequirements = {
    "30mA": { "1x": 300, "5x": 40 },
    "100mA": { "1x": 300, "5x": 40 },
    "300mA": { "1x": 300, "5x": 150 }
  };

  const rcdTypeOptions = [
    { value: "general", label: "General Purpose RCD" },
    { value: "socket", label: "Socket Outlet RCD" },
    { value: "rcbo", label: "RCBO" },
    { value: "main", label: "Main Switch RCD" }
  ];

  const rcdRatingOptions = [
    { value: "30mA", label: "30mA - Personal Protection" },
    { value: "100mA", label: "100mA - Fire Protection" },
    { value: "300mA", label: "300mA - Fire Protection (Industrial)" }
  ];

  const testCurrentOptions = [
    { value: "1x", label: "1× Rated Current - Sensitivity Test" },
    { value: "5x", label: "5× Rated Current - Fast Trip Test" }
  ];

  const getTestDescription = (rating: string, current: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      "30mA": {
        "1x": "Testing at 30mA - Verifies RCD operates at rated sensitivity",
        "5x": "Testing at 150mA - Verifies rapid disconnection for faults"
      },
      "100mA": {
        "1x": "Testing at 100mA - Verifies RCD operates at rated sensitivity",
        "5x": "Testing at 500mA - Verifies rapid disconnection for faults"
      },
      "300mA": {
        "1x": "Testing at 300mA - Verifies RCD operates at rated sensitivity",
        "5x": "Testing at 1500mA - Verifies rapid disconnection for faults"
      }
    };
    return descriptions[rating]?.[current] || "";
  };

  const calculateTripTime = () => {
    if (!rcdRating || !testCurrent) return;

    const rating = rcdRating as keyof typeof tripTimeRequirements;
    const current = testCurrent as keyof typeof tripTimeRequirements[typeof rating];

    const maxTime = tripTimeRequirements[rating]?.[current];
    setMaxTripTime(maxTime || null);
    setTestDescription(getTestDescription(rcdRating, testCurrent));

    if (actualTripTime && maxTime) {
      const actualTime = parseFloat(actualTripTime);
      setIsCompliant(actualTime <= maxTime);
    } else {
      setIsCompliant(null);
    }
  };

  const resetCalculator = () => {
    setRcdType("");
    setRcdRating("");
    setTestCurrent("");
    setMaxTripTime(null);
    setActualTripTime("");
    setIsCompliant(null);
    setTestDescription("");
  };

  const getRiskLevel = () => {
    if (!actualTripTime || !maxTripTime) return null;
    const actual = parseFloat(actualTripTime);
    const max = maxTripTime;

    if (actual <= max * 0.5) return "low";
    if (actual <= max * 0.8) return "medium";
    if (actual <= max) return "high";
    return "critical";
  };

  const riskLevel = getRiskLevel();
  const canCalculate = rcdRating && testCurrent;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="RCD Trip Time Chart Helper"
        description="Calculate RCD trip time requirements and verify BS 7671 compliance"
      >
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white/5 rounded-xl p-1">
            <TabsTrigger
              value="calculator"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              Calculator
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="text-sm font-semibold rounded-lg data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
            >
              Guidance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4 mt-4">
            <CalculatorSelect
              label="RCD Type"
              value={rcdType}
              onChange={setRcdType}
              options={rcdTypeOptions}
              placeholder="Select RCD type"
            />

            <CalculatorSelect
              label="RCD Rating (IΔn)"
              value={rcdRating}
              onChange={setRcdRating}
              options={rcdRatingOptions}
              placeholder="Select RCD sensitivity rating"
            />

            <div className="space-y-2">
              <CalculatorSelect
                label="Test Current"
                value={testCurrent}
                onChange={setTestCurrent}
                options={testCurrentOptions}
                placeholder="Select test current multiplier"
              />
              {testCurrent && rcdRating && (
                <p className="text-xs" style={{ color: config.gradientFrom }}>
                  {getTestDescription(rcdRating, testCurrent)}
                </p>
              )}
            </div>

            <CalculatorInput
              label="Actual Trip Time (Optional)"
              unit="ms"
              type="text"
              inputMode="decimal"
              value={actualTripTime}
              onChange={setActualTripTime}
              placeholder="Enter measured trip time (e.g., 25)"
              hint="Enter the measured trip time for compliance verification"
            />

            <CalculatorActions
              category="protection"
              onCalculate={calculateTripTime}
              onReset={resetCalculator}
              isDisabled={!canCalculate}
              calculateLabel="Get Requirements"
            />
          </TabsContent>

          <TabsContent value="guidance" className="space-y-4 mt-4">
            {/* What Results Mean */}
            <Collapsible open={showMeaning} onOpenChange={setShowMeaning}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-sm sm:text-base font-medium text-blue-300">What Do The Results Mean?</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showMeaning && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                  <p className="text-blue-200/80">
                    RCD trip times are marked on the device. This calculator helps you understand what your
                    <strong className="text-blue-300"> actual measured readings</strong> mean for safety and compliance.
                  </p>
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h5 className="text-blue-300 font-medium mb-2">Real-World Example</h5>
                    <p className="text-blue-200/80 mb-2">A 30mA RCD might trip at 25mA in 150ms, or 35mA in 400ms:</p>
                    <ul className="space-y-1 text-blue-200/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                        <span><strong className="text-green-400">25mA in 150ms:</strong> Excellent - trips early with good safety margin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                        <span><strong className="text-red-400">35mA in 400ms:</strong> Dangerous - exceeds time limits</span>
                      </li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Understanding RCD Testing */}
            <Collapsible open={showTesting} onOpenChange={setShowTesting}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#22c55e15' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm sm:text-base font-medium text-green-300">Understanding RCD Testing</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showTesting && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <h5 className="text-blue-300 font-medium mb-2">1× Rated Current Test</h5>
                      <ul className="space-y-1 text-blue-200/80">
                        <li>• Tests sensitivity at rated current</li>
                        <li>• Maximum 300ms for all RCD ratings</li>
                        <li>• Ensures protection operates reliably</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <h5 className="text-green-300 font-medium mb-2">5× Rated Current Test</h5>
                      <ul className="space-y-1 text-green-200/80">
                        <li>• Tests fast disconnection capability</li>
                        <li>• 40ms for 30mA/100mA, 150ms for 300mA</li>
                        <li>• Critical for shock protection</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <h5 className="text-amber-300 font-medium mb-2">0.5× Rated Current Test</h5>
                    <p className="text-amber-200/80">
                      RCD must NOT trip at half rated current. This ensures no nuisance tripping.
                    </p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Testing Procedures */}
            <Collapsible open={showProcedures} onOpenChange={setShowProcedures}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-sm sm:text-base font-medium text-amber-300">Testing Procedures</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showProcedures && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                  <div className="space-y-2 text-amber-200/80">
                    <p><strong className="text-amber-300">Testing Sequence:</strong></p>
                    <ol className="space-y-1 ml-4">
                      <li>1. Verify RCD is energised and functional</li>
                      <li>2. Test at 0.5× rated current (should NOT trip)</li>
                      <li>3. Test at 1× rated current (record trip time)</li>
                      <li>4. Test at 5× rated current (record trip time)</li>
                      <li>5. Test mechanical operation using test button</li>
                      <li>6. Record all results on test certificate</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <h6 className="text-green-300 font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Good Practice
                      </h6>
                      <ul className="space-y-1 text-green-200/80">
                        <li>• Use calibrated test equipment</li>
                        <li>• Test both Line-Earth and Neutral-Earth</li>
                        <li>• Record environmental conditions</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <h6 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Common Errors
                      </h6>
                      <ul className="space-y-1 text-red-200/80">
                        <li>• Using test button for formal testing</li>
                        <li>• Not testing at all required currents</li>
                        <li>• Testing with uncalibrated equipment</li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

            {/* Troubleshooting */}
            <Collapsible open={showTroubleshooting} onOpenChange={setShowTroubleshooting}>
              <div className="calculator-card overflow-hidden" style={{ borderColor: '#ef444415' }}>
                <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm sm:text-base font-medium text-red-300">Troubleshooting Failures</span>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showTroubleshooting && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 space-y-3 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <h5 className="text-red-300 font-medium mb-2">Trip Time Too Slow</h5>
                      <ul className="space-y-1 text-red-200/80">
                        <li>• Internal contacts deteriorating</li>
                        <li>• Magnetic core contaminated</li>
                        <li>• RCD approaching end of life</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                      <h5 className="text-orange-300 font-medium mb-2">RCD Won't Trip</h5>
                      <ul className="space-y-1 text-orange-200/80">
                        <li>• Check supply voltage is present</li>
                        <li>• Verify correct test current selection</li>
                        <li>• Internal mechanism may have failed</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                    <h6 className="text-red-300 font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Action Required for Failed Tests
                    </h6>
                    <ul className="space-y-1 text-red-200/80">
                      <li>• <strong>Do not energise</strong> circuits protected by failed RCD</li>
                      <li>• <strong>Replace RCD immediately</strong> if it fails to trip</li>
                      <li>• <strong>Investigate root cause</strong> before re-energising</li>
                      <li>• <strong>Issue danger notice</strong> if installation cannot be made safe</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </TabsContent>
        </Tabs>
      </CalculatorCard>

      {/* Results Section */}
      {maxTripTime !== null && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            <div className="text-center pb-3 border-b border-white/10">
              <Badge variant="outline" className="mb-2" style={{ borderColor: `${config.gradientFrom}50`, color: config.gradientFrom }}>
                {rcdRating} RCD - {testCurrent} Test
              </Badge>
              <p className="text-sm text-white/60 mb-1">Maximum Trip Time</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {maxTripTime}ms
              </div>
            </div>

            {testDescription && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-white/80">{testDescription}</p>
              </div>
            )}

            {actualTripTime && isCompliant !== null && (
              <>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-sm text-white/60">Your Measured Time:</span>
                  <span className="text-xl font-bold text-white font-mono">{actualTripTime}ms</span>
                </div>

                <div className={cn(
                  "p-4 rounded-xl border",
                  isCompliant
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {isCompliant ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    <p className={cn("font-bold", isCompliant ? "text-green-400" : "text-red-400")}>
                      {isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                    </p>
                  </div>
                  <p className="text-sm text-white/70">
                    {isCompliant
                      ? 'RCD trip time meets BS 7671 requirements'
                      : 'RCD trip time exceeds maximum allowed time - investigation required'
                    }
                  </p>

                  {riskLevel && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className={cn(
                          "h-4 w-4",
                          riskLevel === 'low' ? 'text-green-400' :
                          riskLevel === 'medium' ? 'text-yellow-400' :
                          riskLevel === 'high' ? 'text-orange-400' :
                          'text-red-400'
                        )} />
                        <span className="text-sm font-medium text-white">
                          Safety Margin: {
                            riskLevel === 'low' ? 'Excellent' :
                            riskLevel === 'medium' ? 'Good' :
                            riskLevel === 'high' ? 'Minimal' :
                            'Critical'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CalculatorResult>

          {/* BS 7671 Reference */}
          <div className="calculator-card p-4" style={{ borderColor: '#60a5fa15' }}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-blue-400" />
              <h4 className="font-semibold text-blue-300 text-sm">BS 7671 Testing Standards</h4>
            </div>
            <div className="grid gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-blue-300 font-medium">30mA RCD:</span>
                <span className="text-white ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-blue-300 font-medium">100mA RCD:</span>
                <span className="text-white ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <span className="text-blue-300 font-medium">300mA RCD:</span>
                <span className="text-white ml-2">1×IΔn ≤ 300ms, 5×IΔn ≤ 150ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-200">
            <p><strong>RCD should NOT trip</strong> at 0.5×IΔn</p>
            <p><strong>RCD must trip</strong> within specified time at 1×IΔn and 5×IΔn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCDTripTimeCalculator;

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, CheckCircle, Calculator, Info, Clock, Shield, Zap, BookOpen, XCircle, AlertCircle, ChevronDown, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface RCDConfig {
  rating: string;
  type: string;
  installationLocation: string;
  circuitType: string;
  loadCurrent: string;
  cableLength: string;
  earthingSystem: string;
  hasTimeDelay: boolean;
  customTripTime: string;
  manufacturer: string;
}

interface DiscriminationResult {
  discriminates: boolean;
  timeDifference: number;
  currentRatio: number;
  recommendation: string;
  complianceStatus: 'compliant' | 'non-compliant' | 'marginal';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  practicalGuidance: string[];
  regulatoryReference: string;
  improvements: string[];
}

const rcdTypes = [
  { value: "type-ac", label: "Type AC (Standard)", trippingTime: 300 },
  { value: "type-a", label: "Type A (Enhanced)", trippingTime: 300 },
  { value: "type-f", label: "Type F (Frequency)", trippingTime: 300 },
  { value: "type-b", label: "Type B (Universal)", trippingTime: 300 },
  { value: "s-type", label: "S-Type (Selective)", trippingTime: 500 },
  { value: "type-ac-time-delayed", label: "Type AC Time-Delayed", trippingTime: 150 }
];

const rcdRatings = [
  { value: "10", label: "10mA - Medical/Special" },
  { value: "30", label: "30mA - Personal protection" },
  { value: "100", label: "100mA - Fire protection (small)" },
  { value: "300", label: "300mA - Fire protection (large)" },
  { value: "500", label: "500mA - Fire protection (industrial)" },
  { value: "1000", label: "1000mA - Very large loads" }
];

const installationLocations = [
  { value: "consumer-unit", label: "Consumer Unit (Main)" },
  { value: "distribution-board", label: "Distribution Board" },
  { value: "local-db", label: "Local Distribution Board" },
  { value: "socket-outlet", label: "Socket Outlet RCD" },
  { value: "rcbo", label: "RCBO in Board" },
  { value: "external", label: "External Installation" }
];

const circuitTypes = [
  { value: "lighting", label: "Lighting Circuit" },
  { value: "power-sockets", label: "Power & Socket Outlets" },
  { value: "immersion", label: "Immersion Heater" },
  { value: "shower", label: "Electric Shower" },
  { value: "cooker", label: "Electric Cooker" },
  { value: "heating", label: "Electric Heating" },
  { value: "motor", label: "Motor Circuit" },
  { value: "outdoor", label: "Outdoor/Garden Circuit" },
  { value: "ev-charging", label: "EV Charging Point" },
  { value: "special-location", label: "Special Location (Bathroom/Pool)" }
];

const earthingSystems = [
  { value: "tn-s", label: "TN-S (Separate earth)" },
  { value: "tn-c-s", label: "TN-C-S (PME)" },
  { value: "tt", label: "TT (Earth electrode)" },
  { value: "it", label: "IT (Isolated/impedance)" }
];

const RCDDiscriminationCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  const [upstreamRCD, setUpstreamRCD] = useState<RCDConfig>({
    rating: "",
    type: "",
    installationLocation: "",
    circuitType: "",
    loadCurrent: "",
    cableLength: "",
    earthingSystem: "",
    hasTimeDelay: false,
    customTripTime: "",
    manufacturer: ""
  });

  const [downstreamRCD, setDownstreamRCD] = useState<RCDConfig>({
    rating: "",
    type: "",
    installationLocation: "",
    circuitType: "",
    loadCurrent: "",
    cableLength: "",
    earthingSystem: "",
    hasTimeDelay: false,
    customTripTime: "",
    manufacturer: ""
  });

  const [result, setResult] = useState<DiscriminationResult | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);

  const calculateDiscrimination = () => {
    if (!upstreamRCD.rating || !downstreamRCD.rating || !upstreamRCD.type || !downstreamRCD.type) {
      return;
    }

    const upstreamType = rcdTypes.find(type => type.value === upstreamRCD.type);
    const downstreamType = rcdTypes.find(type => type.value === downstreamRCD.type);

    if (!upstreamType || !downstreamType) return;

    const upstreamTime = upstreamRCD.hasTimeDelay && upstreamRCD.customTripTime
      ? parseInt(upstreamRCD.customTripTime)
      : upstreamType.trippingTime;

    const downstreamTime = downstreamRCD.hasTimeDelay && downstreamRCD.customTripTime
      ? parseInt(downstreamRCD.customTripTime)
      : downstreamType.trippingTime;

    const timeDifference = upstreamTime - downstreamTime;

    const upstreamRating = parseInt(upstreamRCD.rating);
    const downstreamRating = parseInt(downstreamRCD.rating);
    const currentRatio = upstreamRating / downstreamRating;

    let discriminates = false;
    let complianceStatus: 'compliant' | 'non-compliant' | 'marginal' = 'non-compliant';
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'critical';
    let recommendation = "";
    let practicalGuidance: string[] = [];
    let regulatoryReference = "";
    let improvements: string[] = [];

    if (upstreamRCD.type === "s-type" && downstreamRCD.type !== "s-type") {
      discriminates = timeDifference >= 200 && currentRatio >= 3;

      if (discriminates) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = "Excellent discrimination achieved. S-type upstream provides reliable selective operation per BS 7671 requirements.";
        regulatoryReference = "BS 7671:2018 Regulation 531.2.9 - Coordination of protective devices";
      } else if (timeDifference >= 150 && currentRatio >= 2) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = "Marginal discrimination. Consider increasing upstream rating or using longer time delay.";
        improvements.push("Increase upstream RCD rating to achieve minimum 3:1 ratio");
        improvements.push("Consider S-type RCD with longer time delay (minimum 200ms)");
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'high';
        recommendation = "Poor discrimination. Risk of simultaneous tripping during earth faults.";
        improvements.push("Replace upstream with higher rated S-type RCD");
        improvements.push("Ensure minimum 200ms time delay difference");
        improvements.push("Achieve minimum 3:1 current rating ratio");
      }
    } else if (upstreamRCD.type === "type-ac-time-delayed") {
      discriminates = timeDifference >= 100 && currentRatio >= 3;
      if (discriminates) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = "Time-delayed Type AC provides adequate discrimination margin for standard installations.";
        regulatoryReference = "BS 7671:2018 Section 531 - Protective devices";
      } else {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = "Time delay provides some discrimination but may not be sufficient for all fault conditions.";
        improvements.push("Consider using S-type RCD upstream for better discrimination");
      }
    } else {
      discriminates = timeDifference > 0 && currentRatio >= 3;

      if (discriminates && currentRatio >= 5) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = "Good discrimination achieved with adequate current ratio separation.";
      } else if (discriminates && currentRatio >= 3) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = "Basic discrimination achieved but current ratio could be improved.";
        improvements.push("Consider increasing upstream RCD rating for better discrimination");
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'critical';
        recommendation = "No effective discrimination. High risk of nuisance tripping and loss of selectivity.";
        improvements.push("Use S-type RCD upstream for time delay");
        improvements.push("Increase upstream current rating (minimum 3:1 ratio)");
        improvements.push("Consider alternative protection scheme");
      }
    }

    if (upstreamRating <= downstreamRating) {
      discriminates = false;
      complianceStatus = 'non-compliant';
      riskLevel = 'critical';
      recommendation += " | CRITICAL: Upstream RCD rating must be higher than downstream for any discrimination.";
      improvements.unshift("IMMEDIATE: Increase upstream RCD rating above downstream rating");
    }

    if (downstreamRCD.circuitType === "special-location" && parseInt(downstreamRCD.rating) > 30) {
      practicalGuidance.push("Special locations (bathrooms, pools) require 30mA RCD protection maximum");
      riskLevel = 'high';
    }

    if (downstreamRCD.circuitType === "ev-charging" && downstreamRCD.rating !== "30") {
      practicalGuidance.push("EV charging points require 30mA RCD protection per BS 7671");
      improvements.push("Install 30mA Type A RCD for EV charging circuit");
    }

    if (upstreamRCD.earthingSystem === "tt" && parseInt(upstreamRCD.rating) > 100) {
      practicalGuidance.push("TT earthing systems typically require 100mA maximum RCD for fire protection");
    }

    if (downstreamRCD.loadCurrent) {
      const loadCurrent = parseFloat(downstreamRCD.loadCurrent);
      const leakageCurrent = loadCurrent * 0.001;

      if (leakageCurrent > parseInt(downstreamRCD.rating) * 0.5) {
        practicalGuidance.push(`High leakage current risk (≈${leakageCurrent.toFixed(1)}mA) may cause nuisance tripping`);
        improvements.push("Consider higher rated RCD or reduce circuit loading");
      }
    }

    practicalGuidance.push(
      "Test both RCDs at commissioning with appropriate test equipment",
      "Document actual trip times on electrical installation certificate",
      "Ensure proper labelling of RCD functions and circuits protected",
      "Regular testing required: monthly for critical circuits, quarterly for others"
    );

    if (upstreamRCD.type === "s-type") {
      practicalGuidance.push("S-type RCDs require specific test procedures - do not use standard RCD testers");
    }

    setResult({
      discriminates,
      timeDifference,
      currentRatio,
      recommendation,
      complianceStatus,
      riskLevel,
      practicalGuidance,
      regulatoryReference,
      improvements
    });
  };

  const resetCalculator = () => {
    setUpstreamRCD({
      rating: "",
      type: "",
      installationLocation: "",
      circuitType: "",
      loadCurrent: "",
      cableLength: "",
      earthingSystem: "",
      hasTimeDelay: false,
      customTripTime: "",
      manufacturer: ""
    });
    setDownstreamRCD({
      rating: "",
      type: "",
      installationLocation: "",
      circuitType: "",
      loadCurrent: "",
      cableLength: "",
      earthingSystem: "",
      hasTimeDelay: false,
      customTripTime: "",
      manufacturer: ""
    });
    setResult(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const canCalculate = upstreamRCD.rating && downstreamRCD.rating && upstreamRCD.type && downstreamRCD.type;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="RCD Discrimination Calculator"
        description="Analyse RCD discrimination for selective operation per BS 7671"
      >
        {/* Upstream RCD Configuration */}
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ borderColor: '#60a5fa30', background: '#60a5fa08' }}
        >
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-blue-300">Upstream RCD (Main Protection)</h3>
          </div>
          <p className="text-xs text-blue-200/70">Main incomer or distribution board RCD</p>

          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Rating (IΔn)"
              value={upstreamRCD.rating}
              onChange={(value) => setUpstreamRCD(prev => ({ ...prev, rating: value }))}
              options={rcdRatings}
              placeholder="Select rating"
            />
            <CalculatorSelect
              label="RCD Type"
              value={upstreamRCD.type}
              onChange={(value) => setUpstreamRCD(prev => ({ ...prev, type: value }))}
              options={rcdTypes}
              placeholder="Select type"
            />
            <CalculatorSelect
              label="Installation Location"
              value={upstreamRCD.installationLocation}
              onChange={(value) => setUpstreamRCD(prev => ({ ...prev, installationLocation: value }))}
              options={installationLocations}
              placeholder="Select location"
            />
            <CalculatorSelect
              label="Earthing System"
              value={upstreamRCD.earthingSystem}
              onChange={(value) => setUpstreamRCD(prev => ({ ...prev, earthingSystem: value }))}
              options={earthingSystems}
              placeholder="Select system"
            />
          </CalculatorInputGrid>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="upstream-delay"
              checked={upstreamRCD.hasTimeDelay}
              onCheckedChange={(checked) =>
                setUpstreamRCD(prev => ({ ...prev, hasTimeDelay: !!checked }))
              }
            />
            <label htmlFor="upstream-delay" className="text-sm text-white">
              Custom time delay
            </label>
          </div>

          {upstreamRCD.hasTimeDelay && (
            <CalculatorInput
              label="Trip Time"
              unit="ms"
              type="text"
              inputMode="decimal"
              value={upstreamRCD.customTripTime}
              onChange={(value) => setUpstreamRCD(prev => ({ ...prev, customTripTime: value }))}
              placeholder="Enter trip time in milliseconds"
            />
          )}
        </div>

        {/* Downstream RCD Configuration */}
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{ borderColor: '#22c55e30', background: '#22c55e08' }}
        >
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-400" />
            <h3 className="font-semibold text-green-300">Downstream RCD (Circuit Protection)</h3>
          </div>
          <p className="text-xs text-green-200/70">Final circuit or local RCD protection</p>

          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Rating (IΔn)"
              value={downstreamRCD.rating}
              onChange={(value) => setDownstreamRCD(prev => ({ ...prev, rating: value }))}
              options={rcdRatings}
              placeholder="Select rating"
            />
            <CalculatorSelect
              label="RCD Type"
              value={downstreamRCD.type}
              onChange={(value) => setDownstreamRCD(prev => ({ ...prev, type: value }))}
              options={rcdTypes}
              placeholder="Select type"
            />
          </CalculatorInputGrid>

          <CalculatorSelect
            label="Circuit Type"
            value={downstreamRCD.circuitType}
            onChange={(value) => setDownstreamRCD(prev => ({ ...prev, circuitType: value }))}
            options={circuitTypes}
            placeholder="Select circuit type"
          />

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Load Current"
              unit="A"
              type="text"
              inputMode="decimal"
              value={downstreamRCD.loadCurrent}
              onChange={(value) => setDownstreamRCD(prev => ({ ...prev, loadCurrent: value }))}
              placeholder="Enter load current"
            />
            <CalculatorInput
              label="Cable Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={downstreamRCD.cableLength}
              onChange={(value) => setDownstreamRCD(prev => ({ ...prev, cableLength: value }))}
              placeholder="Enter cable length"
            />
          </CalculatorInputGrid>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="downstream-delay"
              checked={downstreamRCD.hasTimeDelay}
              onCheckedChange={(checked) =>
                setDownstreamRCD(prev => ({ ...prev, hasTimeDelay: !!checked }))
              }
            />
            <label htmlFor="downstream-delay" className="text-sm text-white">
              Custom time delay
            </label>
          </div>

          {downstreamRCD.hasTimeDelay && (
            <CalculatorInput
              label="Trip Time"
              unit="ms"
              type="text"
              inputMode="decimal"
              value={downstreamRCD.customTripTime}
              onChange={(value) => setDownstreamRCD(prev => ({ ...prev, customTripTime: value }))}
              placeholder="Enter trip time in milliseconds"
            />
          )}
        </div>

        {/* Action Buttons */}
        <CalculatorActions
          category="protection"
          onCalculate={calculateDiscrimination}
          onReset={resetCalculator}
          isDisabled={!canCalculate}
          calculateLabel="Analyse Discrimination"
        />
      </CalculatorCard>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            <div className="text-center pb-3 border-b border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                {result.discriminates ? (
                  <CheckCircle className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-400" />
                )}
                <span className={cn(
                  "text-xl font-bold",
                  result.discriminates ? "text-green-400" : "text-red-400"
                )}>
                  {result.discriminates ? 'DISCRIMINATES' : 'NO DISCRIMINATION'}
                </span>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "mt-2",
                  result.complianceStatus === 'compliant' ? "border-green-500/50 text-green-400" :
                  result.complianceStatus === 'marginal' ? "border-yellow-500/50 text-yellow-400" :
                  "border-red-500/50 text-red-400"
                )}
              >
                {result.complianceStatus.toUpperCase()}
              </Badge>
            </div>

            <ResultsGrid columns={3}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Risk Level</p>
                <p className={cn("text-lg font-bold", getRiskColor(result.riskLevel))}>
                  {result.riskLevel.toUpperCase()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Current Ratio</p>
                <p className="text-lg font-bold text-white font-mono">{result.currentRatio.toFixed(1)}:1</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Time Difference</p>
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" style={{ color: config.gradientFrom }} />
                  <p className="text-lg font-bold text-white font-mono">{result.timeDifference}ms</p>
                </div>
              </div>
            </ResultsGrid>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/80">{result.recommendation}</p>
            </div>

            {result.regulatoryReference && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-2">
                <BookOpen className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-blue-300 font-medium">Regulatory Reference</p>
                  <p className="text-sm text-blue-200">{result.regulatoryReference}</p>
                </div>
              </div>
            )}
          </CalculatorResult>

          {/* Improvements Required */}
          {result.improvements.length > 0 && (
            <div className="calculator-card p-4" style={{ borderColor: '#fb923c30', background: '#fb923c08' }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-orange-400" />
                <h3 className="font-semibold text-orange-300">Required Improvements</h3>
              </div>
              <ul className="space-y-2">
                {result.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-orange-200">
                    <span className="text-orange-400 font-bold">•</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#22c55e15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-green-400" />
                  <span className="text-sm sm:text-base font-medium text-green-300">Practical Installation Guidance</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2">
                  {result.practicalGuidance.map((guidance, index) => (
                    <li key={index} className="text-sm text-green-200/80 flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      {guidance}
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Why Discrimination Matters */}
      <Collapsible open={showRegs} onOpenChange={setShowRegs}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">Understanding RCD Discrimination</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showRegs && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-amber-300 text-sm">Why Discrimination Matters</h4>
                <ul className="space-y-1 text-sm text-amber-200/80">
                  <li>• <strong className="text-amber-300">Selective Operation:</strong> Only faulty circuit trips</li>
                  <li>• <strong className="text-amber-300">Reduced Downtime:</strong> Minimises service disruption</li>
                  <li>• <strong className="text-amber-300">Easier Fault Finding:</strong> Identifies faulty circuit</li>
                  <li>• <strong className="text-amber-300">Safety Compliance:</strong> Meets BS 7671 requirements</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-amber-300 text-sm">BS 7671 Requirements</h4>
                <ul className="space-y-1 text-sm text-amber-200/80">
                  <li>• <strong className="text-amber-300">531.2.9:</strong> Coordination between devices</li>
                  <li>• <strong className="text-amber-300">Time-Current:</strong> Upstream must be higher</li>
                  <li>• <strong className="text-amber-300">S-Type RCDs:</strong> Time delay for selectivity</li>
                  <li>• <strong className="text-amber-300">Testing:</strong> Verify at commissioning</li>
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Common Installation Scenarios */}
      <Collapsible open={showScenarios} onOpenChange={setShowScenarios}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span className="text-sm sm:text-base font-medium text-purple-300">Common Installation Scenarios</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showScenarios && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <h5 className="text-blue-300 font-medium text-sm mb-2">Domestic</h5>
                <p className="text-xs text-blue-200/80">Main: 100mA S-Type<br/>Circuits: 30mA Type AC/A</p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <h5 className="text-green-300 font-medium text-sm mb-2">Commercial</h5>
                <p className="text-xs text-green-200/80">Main: 300mA S-Type<br/>Sub: 100mA, Final: 30mA</p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h5 className="text-purple-300 font-medium text-sm mb-2">Industrial</h5>
                <p className="text-xs text-purple-200/80">Main: 500mA S-Type<br/>Motors: 100mA, Sockets: 30mA</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-200">
            <p><strong>For discrimination:</strong> Upstream time ≥ Downstream time + 200ms, Current ratio ≥ 3:1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RCDDiscriminationCalculator;

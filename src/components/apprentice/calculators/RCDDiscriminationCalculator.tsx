import { useState, useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Copy,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Shield,
  Zap,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

interface RCDConfig {
  rating: string;
  type: string;
  installationLocation: string;
  circuitType: string;
  loadCurrent: string;
  earthingSystem: string;
  hasTimeDelay: boolean;
  customTripTime: string;
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
  upstreamRating: number;
  downstreamRating: number;
  upstreamTime: number;
  downstreamTime: number;
}

const rcdTypes = [
  { value: 'type-ac', label: 'Type AC (Standard)', trippingTime: 300 },
  { value: 'type-a', label: 'Type A (Enhanced)', trippingTime: 300 },
  { value: 'type-f', label: 'Type F (Frequency)', trippingTime: 300 },
  { value: 'type-b', label: 'Type B (Universal)', trippingTime: 300 },
  { value: 's-type', label: 'S-Type (Selective)', trippingTime: 500 },
  { value: 'type-ac-time-delayed', label: 'Type AC Time-Delayed', trippingTime: 150 },
];

const rcdRatings = [
  { value: '10', label: '10mA — Medical/Special' },
  { value: '30', label: '30mA — Personal protection' },
  { value: '100', label: '100mA — Fire protection (small)' },
  { value: '300', label: '300mA — Fire protection (large)' },
  { value: '500', label: '500mA — Fire protection (industrial)' },
  { value: '1000', label: '1000mA — Very large loads' },
];

const installationLocations = [
  { value: 'consumer-unit', label: 'Consumer Unit (Main)' },
  { value: 'distribution-board', label: 'Distribution Board' },
  { value: 'local-db', label: 'Local Distribution Board' },
  { value: 'socket-outlet', label: 'Socket Outlet RCD' },
  { value: 'rcbo', label: 'RCBO in Board' },
  { value: 'external', label: 'External Installation' },
];

const circuitTypes = [
  { value: 'lighting', label: 'Lighting Circuit' },
  { value: 'power-sockets', label: 'Power & Socket Outlets' },
  { value: 'immersion', label: 'Immersion Heater' },
  { value: 'shower', label: 'Electric Shower' },
  { value: 'cooker', label: 'Electric Cooker' },
  { value: 'heating', label: 'Electric Heating' },
  { value: 'motor', label: 'Motor Circuit' },
  { value: 'outdoor', label: 'Outdoor/Garden Circuit' },
  { value: 'ev-charging', label: 'EV Charging Point' },
  { value: 'special-location', label: 'Special Location (Bathroom/Pool)' },
];

const earthingSystems = [
  { value: 'tn-s', label: 'TN-S (Separate earth)' },
  { value: 'tn-c-s', label: 'TN-C-S (PME)' },
  { value: 'tt', label: 'TT (Earth electrode)' },
  { value: 'it', label: 'IT (Isolated/impedance)' },
];

const emptyRCD: RCDConfig = {
  rating: '',
  type: '',
  installationLocation: '',
  circuitType: '',
  loadCurrent: '',
  earthingSystem: '',
  hasTimeDelay: false,
  customTripTime: '',
};

const RCDDiscriminationCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [upstreamRCD, setUpstreamRCD] = useState<RCDConfig>({ ...emptyRCD });
  const [downstreamRCD, setDownstreamRCD] = useState<RCDConfig>({ ...emptyRCD });
  const [result, setResult] = useState<DiscriminationResult | null>(null);

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const calculateDiscrimination = useCallback(() => {
    if (!upstreamRCD.rating || !downstreamRCD.rating || !upstreamRCD.type || !downstreamRCD.type) {
      return;
    }

    const upstreamType = rcdTypes.find((t) => t.value === upstreamRCD.type);
    const downstreamType = rcdTypes.find((t) => t.value === downstreamRCD.type);
    if (!upstreamType || !downstreamType) return;

    const upstreamTime =
      upstreamRCD.hasTimeDelay && upstreamRCD.customTripTime
        ? parseInt(upstreamRCD.customTripTime)
        : upstreamType.trippingTime;

    const downstreamTime =
      downstreamRCD.hasTimeDelay && downstreamRCD.customTripTime
        ? parseInt(downstreamRCD.customTripTime)
        : downstreamType.trippingTime;

    const timeDifference = upstreamTime - downstreamTime;
    const upstreamRating = parseInt(upstreamRCD.rating);
    const downstreamRating = parseInt(downstreamRCD.rating);
    const currentRatio = upstreamRating / downstreamRating;

    let discriminates = false;
    let complianceStatus: 'compliant' | 'non-compliant' | 'marginal' = 'non-compliant';
    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'critical';
    let recommendation = '';
    const practicalGuidance: string[] = [];
    let regulatoryReference = '';
    const improvements: string[] = [];

    if (upstreamRCD.type === 's-type' && downstreamRCD.type !== 's-type') {
      discriminates = timeDifference >= 200 && currentRatio >= 3;
      if (discriminates) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation =
          'Excellent discrimination achieved. S-type upstream provides reliable selective operation per BS 7671 requirements.';
        regulatoryReference =
          'BS 7671:2018 Regulation 531.2.9 — Coordination of protective devices';
      } else if (timeDifference >= 150 && currentRatio >= 2) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation =
          'Marginal discrimination. Consider increasing upstream rating or using longer time delay.';
        improvements.push('Increase upstream RCD rating to achieve minimum 3:1 ratio');
        improvements.push('Consider S-type RCD with longer time delay (minimum 200ms)');
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'high';
        recommendation = 'Poor discrimination. Risk of simultaneous tripping during earth faults.';
        improvements.push('Replace upstream with higher rated S-type RCD');
        improvements.push('Ensure minimum 200ms time delay difference');
        improvements.push('Achieve minimum 3:1 current rating ratio');
      }
    } else if (upstreamRCD.type === 'type-ac-time-delayed') {
      discriminates = timeDifference >= 100 && currentRatio >= 3;
      if (discriminates) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation =
          'Time-delayed Type AC provides adequate discrimination margin for standard installations.';
        regulatoryReference = 'BS 7671:2018 Section 531 — Protective devices';
      } else {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation =
          'Time delay provides some discrimination but may not be sufficient for all fault conditions.';
        improvements.push('Consider using S-type RCD upstream for better discrimination');
      }
    } else {
      discriminates = timeDifference > 0 && currentRatio >= 3;
      if (discriminates && currentRatio >= 5) {
        complianceStatus = 'compliant';
        riskLevel = 'low';
        recommendation = 'Good discrimination achieved with adequate current ratio separation.';
      } else if (discriminates && currentRatio >= 3) {
        complianceStatus = 'marginal';
        riskLevel = 'medium';
        recommendation = 'Basic discrimination achieved but current ratio could be improved.';
        improvements.push('Consider increasing upstream RCD rating for better discrimination');
      } else {
        complianceStatus = 'non-compliant';
        riskLevel = 'critical';
        recommendation =
          'No effective discrimination. High risk of nuisance tripping and loss of selectivity.';
        improvements.push('Use S-type RCD upstream for time delay');
        improvements.push('Increase upstream current rating (minimum 3:1 ratio)');
        improvements.push('Consider alternative protection scheme');
      }
    }

    if (upstreamRating <= downstreamRating) {
      discriminates = false;
      complianceStatus = 'non-compliant';
      riskLevel = 'critical';
      recommendation +=
        ' | CRITICAL: Upstream RCD rating must be higher than downstream for any discrimination.';
      improvements.unshift('IMMEDIATE: Increase upstream RCD rating above downstream rating');
    }

    if (downstreamRCD.circuitType === 'special-location' && parseInt(downstreamRCD.rating) > 30) {
      practicalGuidance.push(
        'Special locations (bathrooms, pools) require 30mA RCD protection maximum'
      );
      riskLevel = 'high';
    }

    if (downstreamRCD.circuitType === 'ev-charging' && downstreamRCD.rating !== '30') {
      practicalGuidance.push('EV charging points require 30mA RCD protection per BS 7671');
      improvements.push('Install 30mA Type A RCD for EV charging circuit');
    }

    if (upstreamRCD.earthingSystem === 'tt' && parseInt(upstreamRCD.rating) > 100) {
      practicalGuidance.push(
        'TT earthing systems typically require 100mA maximum RCD for fire protection'
      );
    }

    if (downstreamRCD.loadCurrent) {
      const loadCurrent = parseFloat(downstreamRCD.loadCurrent);
      const leakageCurrent = loadCurrent * 0.001;
      if (leakageCurrent > parseInt(downstreamRCD.rating) * 0.5) {
        practicalGuidance.push(
          `High leakage current risk (≈${leakageCurrent.toFixed(1)}mA) may cause nuisance tripping`
        );
        improvements.push('Consider higher rated RCD or reduce circuit loading');
      }
    }

    practicalGuidance.push(
      'Test both RCDs at commissioning with appropriate test equipment',
      'Document actual trip times on electrical installation certificate',
      'Ensure proper labelling of RCD functions and circuits protected',
      'Regular testing required: monthly for critical circuits, quarterly for others'
    );

    if (upstreamRCD.type === 's-type') {
      practicalGuidance.push(
        'S-type RCDs require specific test procedures — do not use standard RCD testers'
      );
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
      improvements,
      upstreamRating,
      downstreamRating,
      upstreamTime,
      downstreamTime,
    });
  }, [upstreamRCD, downstreamRCD]);

  const handleReset = useCallback(() => {
    setUpstreamRCD({ ...emptyRCD });
    setDownstreamRCD({ ...emptyRCD });
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = `RCD Discrimination Analysis\nResult: ${result.discriminates ? 'DISCRIMINATES' : 'NO DISCRIMINATION'}`;
    text += `\nCompliance: ${result.complianceStatus.toUpperCase()}`;
    text += `\nCurrent Ratio: ${result.currentRatio.toFixed(1)}:1 (upstream ${result.upstreamRating}mA / downstream ${result.downstreamRating}mA)`;
    text += `\nTime Difference: ${result.timeDifference}ms`;
    text += `\nRisk Level: ${result.riskLevel.toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'high':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const canCalculate =
    upstreamRCD.rating && downstreamRCD.rating && upstreamRCD.type && downstreamRCD.type;

  return (
    <CalculatorCard
      category={CAT}
      title="RCD Discrimination Calculator"
      description="Analyse RCD discrimination for selective operation per BS 7671"
    >
      {/* ── Upstream RCD ── */}
      <CalculatorSection title="Upstream RCD (Main Protection)">
        <div className="flex items-center gap-2 mb-1">
          <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
          <span className="text-xs text-white">Main incomer or distribution board RCD</span>
        </div>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Rating (IΔn)"
            value={upstreamRCD.rating}
            onChange={(value) => setUpstreamRCD((prev) => ({ ...prev, rating: value }))}
            options={rcdRatings}
            placeholder="Select rating"
          />
          <CalculatorSelect
            label="RCD Type"
            value={upstreamRCD.type}
            onChange={(value) => setUpstreamRCD((prev) => ({ ...prev, type: value }))}
            options={rcdTypes}
            placeholder="Select type"
          />
          <CalculatorSelect
            label="Installation Location"
            value={upstreamRCD.installationLocation}
            onChange={(value) =>
              setUpstreamRCD((prev) => ({ ...prev, installationLocation: value }))
            }
            options={installationLocations}
            placeholder="Select location"
          />
          <CalculatorSelect
            label="Earthing System"
            value={upstreamRCD.earthingSystem}
            onChange={(value) => setUpstreamRCD((prev) => ({ ...prev, earthingSystem: value }))}
            options={earthingSystems}
            placeholder="Select system"
          />
        </CalculatorInputGrid>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="upstream-delay"
            checked={upstreamRCD.hasTimeDelay}
            onCheckedChange={(checked) =>
              setUpstreamRCD((prev) => ({ ...prev, hasTimeDelay: !!checked }))
            }
          />
          <label
            htmlFor="upstream-delay"
            className="text-sm text-white touch-manipulation cursor-pointer"
          >
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
            onChange={(value) => setUpstreamRCD((prev) => ({ ...prev, customTripTime: value }))}
            placeholder="Enter trip time in milliseconds"
          />
        )}
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* ── Downstream RCD ── */}
      <CalculatorSection title="Downstream RCD (Circuit Protection)">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
          <span className="text-xs text-white">Final circuit or local RCD protection</span>
        </div>

        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Rating (IΔn)"
            value={downstreamRCD.rating}
            onChange={(value) => setDownstreamRCD((prev) => ({ ...prev, rating: value }))}
            options={rcdRatings}
            placeholder="Select rating"
          />
          <CalculatorSelect
            label="RCD Type"
            value={downstreamRCD.type}
            onChange={(value) => setDownstreamRCD((prev) => ({ ...prev, type: value }))}
            options={rcdTypes}
            placeholder="Select type"
          />
        </CalculatorInputGrid>

        <CalculatorSelect
          label="Circuit Type"
          value={downstreamRCD.circuitType}
          onChange={(value) => setDownstreamRCD((prev) => ({ ...prev, circuitType: value }))}
          options={circuitTypes}
          placeholder="Select circuit type"
        />

        <CalculatorInput
          label="Load Current (Optional)"
          unit="A"
          type="text"
          inputMode="decimal"
          value={downstreamRCD.loadCurrent}
          onChange={(value) => setDownstreamRCD((prev) => ({ ...prev, loadCurrent: value }))}
          placeholder="Enter load current"
          hint="For leakage current assessment"
        />

        <div className="flex items-center space-x-2">
          <Checkbox
            id="downstream-delay"
            checked={downstreamRCD.hasTimeDelay}
            onCheckedChange={(checked) =>
              setDownstreamRCD((prev) => ({ ...prev, hasTimeDelay: !!checked }))
            }
          />
          <label
            htmlFor="downstream-delay"
            className="text-sm text-white touch-manipulation cursor-pointer"
          >
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
            onChange={(value) => setDownstreamRCD((prev) => ({ ...prev, customTripTime: value }))}
            placeholder="Enter trip time in milliseconds"
          />
        )}
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={calculateDiscrimination}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Analyse Discrimination"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={
                result.complianceStatus === 'compliant'
                  ? 'pass'
                  : result.complianceStatus === 'marginal'
                    ? 'warning'
                    : 'fail'
              }
              label={result.discriminates ? 'DISCRIMINATES' : 'NO DISCRIMINATION'}
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Current Ratio</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.currentRatio.toFixed(1)}:1
            </p>
            <p className="text-sm text-white mt-2">
              {result.discriminates ? 'DISCRIMINATES' : 'NO DISCRIMINATION'} —{' '}
              {result.timeDifference}ms time difference
            </p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={3}>
            <ResultValue
              label="Risk Level"
              value={result.riskLevel.toUpperCase()}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Current Ratio"
              value={`${result.currentRatio.toFixed(1)}:1`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Time Difference"
              value={`${result.timeDifference}ms`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Pass/fail checks */}
          <div className="space-y-2">
            <div
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border text-sm',
                result.currentRatio >= 3
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <div className="flex items-center gap-2">
                {result.currentRatio >= 3 ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <span className="text-white font-medium">Current Ratio ≥ 3:1</span>
              </div>
              <span className="text-white shrink-0 ml-2">{result.currentRatio.toFixed(1)}:1</span>
            </div>

            <div
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border text-sm',
                result.timeDifference >= 200
                  ? 'bg-green-500/5 border-green-500/20'
                  : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <div className="flex items-center gap-2">
                {result.timeDifference >= 200 ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <span className="text-white font-medium">Time Delay ≥ 200ms</span>
              </div>
              <span className="text-white shrink-0 ml-2">{result.timeDifference}ms</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/5 text-sm text-white">
            {result.recommendation}
          </div>

          {/* Improvements Required */}
          {result.improvements.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-white">Required Improvements</p>
              {result.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-white">
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400 mt-0.5 shrink-0" />
                  {improvement}
                </div>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Upstream RCD (main protection)',
                formula: `${result.upstreamRating}mA | ${upstreamRCD.type} | Trip time: ${result.upstreamTime}ms`,
                description: `The upstream device at ${result.upstreamRating}mA must trip SLOWER than the downstream device — allowing the closer device to clear the fault first.`,
              },
              {
                label: 'Downstream RCD (circuit protection)',
                formula: `${result.downstreamRating}mA | ${downstreamRCD.type} | Trip time: ${result.downstreamTime}ms`,
                description: `The downstream device at ${result.downstreamRating}mA should trip FIRST during a fault on its protected circuit, isolating only the faulty circuit.`,
              },
              {
                label: 'Current ratio check',
                formula: `Upstream / Downstream = ${result.upstreamRating} / ${result.downstreamRating}`,
                value: `${result.currentRatio.toFixed(1)}:1 ${result.currentRatio >= 3 ? '(meets minimum 3:1)' : '(BELOW minimum 3:1)'}`,
                description:
                  result.currentRatio >= 3
                    ? 'The upstream RCD has a sufficiently higher rating — it will not respond to fault currents that only affect the downstream device.'
                    : 'The current ratings are too close together. The upstream device may trip simultaneously with the downstream device during a fault, causing total loss of supply.',
              },
              {
                label: 'Time delay check',
                formula: `Upstream − Downstream = ${result.upstreamTime} − ${result.downstreamTime}`,
                value: `${result.timeDifference}ms ${result.timeDifference >= 200 ? '(meets 200ms minimum)' : '(BELOW 200ms minimum for S-type)'}`,
                description:
                  result.timeDifference >= 200
                    ? 'Adequate time separation — the downstream device has enough time to clear the fault before the upstream device responds.'
                    : 'Insufficient time delay. Without adequate separation, both devices may trip together. Use an S-type (selective) RCD upstream for a built-in time delay.',
              },
              {
                label: 'Overall assessment',
                value: result.discriminates
                  ? `DISCRIMINATES — ${result.complianceStatus} with BS 7671`
                  : `NO DISCRIMINATION — ${result.complianceStatus}`,
                description: result.discriminates
                  ? 'The RCD arrangement provides selective operation. Only the faulty circuit will trip, keeping healthy circuits live.'
                  : 'Both RCDs are likely to trip simultaneously during a fault, causing total loss of supply. Review the recommendations above to achieve discrimination.',
              },
            ]}
          />

          {/* ── What This Means ── */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Why Discrimination Matters</p>
                  <p className="text-sm text-white">
                    Without discrimination, a fault on one circuit trips the main RCD — killing
                    power to the entire installation. With proper discrimination, only the faulty
                    circuit trips while everything else stays live. This is especially important in
                    commercial premises, care homes, and any installation where total loss of supply
                    creates a safety risk.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">How to Achieve Discrimination</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Current grading: Upstream RCD must be at least 3× the downstream rating (e.g.,
                      100mA upstream, 30mA downstream)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Time grading: Use an S-type (selective) RCD upstream — it has a built-in delay
                      of at least 200ms, giving the downstream device time to trip first
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Both conditions must be met — current grading alone is not enough if both
                      devices have the same trip speed
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Common Setups That Work</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Domestic: 100mA S-Type upstream + 30mA Type A downstream (3.3:1 ratio, 200ms+
                      delay)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Commercial: 300mA S-Type main + 30mA RCBOs on final circuits (10:1 ratio)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Industrial: 500mA S-Type incomer + 100mA sub-mains + 30mA final circuits
                      (cascaded)
                    </li>
                  </ul>
                </div>
                {result.practicalGuidance.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-white font-medium">For This Installation</p>
                    <ul className="space-y-1">
                      {result.practicalGuidance.map((guidance, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          {guidance}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Regulation 531.2.9',
                      desc: 'Coordination between RCDs — discrimination requirements',
                    },
                    {
                      reg: 'Regulation 536.4.1',
                      desc: 'Selectivity of RCDs — time and current grading',
                    },
                    {
                      reg: 'Regulation 411.3.3',
                      desc: 'Additional protection — 30mA RCD for socket outlets and mobile equipment',
                    },
                    {
                      reg: 'GN3 Chapter 13',
                      desc: 'RCD testing — procedures for selectivity verification',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="RCD Discrimination Rules"
        formula="Time delay ≥ 200ms AND Current ratio ≥ 3:1"
        variables={[
          { symbol: 'Time delay', description: 'Upstream trip time − downstream trip time (ms)' },
          { symbol: 'Current ratio', description: 'Upstream IΔn ÷ downstream IΔn' },
          { symbol: 'S-type', description: 'Time-delayed RCD for selectivity' },
        ]}
      />
    </CalculatorCard>
  );
};

export default RCDDiscriminationCalculator;

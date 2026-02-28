import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { calculateSelectivity, SelectivityResult } from '@/lib/selectivity';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const DEVICE_TYPES = [
  { value: 'mcb', label: 'MCB (Miniature Circuit Breaker)' },
  { value: 'mccb', label: 'MCCB (Moulded Case Circuit Breaker)' },
  { value: 'fuse', label: 'Fuse (BS 88 / 1361)' },
  { value: 'rcbo', label: 'RCBO (Residual Current Breaker)' },
];

const MCB_CURVES = [
  { value: 'B', label: 'B Curve (3-5 x In)' },
  { value: 'C', label: 'C Curve (5-10 x In)' },
  { value: 'D', label: 'D Curve (10-20 x In)' },
];

const SelectivityCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Upstream
  const [upstreamDevice, setUpstreamDevice] = useState('mccb');
  const [upstreamRating, setUpstreamRating] = useState('');
  const [upstreamCurve, setUpstreamCurve] = useState('');
  const [upstreamMagneticSetting, setUpstreamMagneticSetting] = useState('');
  const [upstreamTimeDelay, setUpstreamTimeDelay] = useState('');
  const [upstreamBreakingCapacity, setUpstreamBreakingCapacity] = useState('');

  // Downstream
  const [downstreamDevice, setDownstreamDevice] = useState('mcb');
  const [downstreamRating, setDownstreamRating] = useState('');
  const [downstreamCurve, setDownstreamCurve] = useState('B');
  const [downstreamMagneticSetting, setDownstreamMagneticSetting] = useState('');
  const [downstreamBreakingCapacity, setDownstreamBreakingCapacity] = useState('');

  // Fault
  const [faultCurrent, setFaultCurrent] = useState('');

  const [result, setResult] = useState<SelectivityResult | null>(null);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const timeMargin = (
      (result.operatingTimes.upstream - result.operatingTimes.downstream) *
      1000
    ).toFixed(0);
    const text = [
      '=== Selectivity / Discrimination Analysis ===',
      `Status: ${result.isSelective ? 'SELECTIVE' : 'NOT SELECTIVE'}`,
      `Compliance: ${result.complianceStatus.replace('-', ' ')}`,
      `Risk Level: ${result.riskLevel}`,
      '',
      `Selectivity Ratio: ${result.selectivityRatio.toFixed(2)}:1`,
      `Selectivity Limit: ${result.selectivityLimit.toFixed(0)} A`,
      `Selectivity Limit Current Is: ${result.selectivityLimitCurrent} A`,
      '',
      `Downstream Operating Time: ${(result.operatingTimes.downstream * 1000).toFixed(0)} ms`,
      `Upstream Operating Time: ${(result.operatingTimes.upstream * 1000).toFixed(0)} ms`,
      `Time Margin: ${timeMargin} ms`,
      '',
      `Downstream Magnetic Trip: ${result.magneticTrips.downstream.toFixed(0)} A`,
      `Upstream Magnetic Trip: ${result.magneticTrips.upstream.toFixed(0)} A`,
      '',
      `Downstream I²t: ${result.energyLetThrough.downstreamI2t.toFixed(0)} A²s`,
      `Upstream I²t: ${result.energyLetThrough.upstreamI2t.toFixed(0)} A²s`,
      `Energy Selectivity: ${result.energyLetThrough.energySelective ? 'Yes' : 'No'}`,
      '',
      `Cascade Protection: ${result.cascadeProtection.eligible ? result.cascadeProtection.cascadeRating : 'Not applicable'}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Results copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  }, [result, toast]);

  const calculate = useCallback(() => {
    const upRating = parseFloat(upstreamRating);
    const downRating = parseFloat(downstreamRating);
    const faultI = parseFloat(faultCurrent);
    if (!(upRating > 0 && downRating > 0 && faultI > 0)) return;

    const calculationResult = calculateSelectivity({
      upstreamDevice,
      upstreamRating: upRating,
      upstreamCurve:
        upstreamDevice === 'mcb' || upstreamDevice === 'rcbo' ? upstreamCurve : undefined,
      upstreamMagneticSetting: upstreamMagneticSetting
        ? parseFloat(upstreamMagneticSetting)
        : undefined,
      upstreamTimeDelay: upstreamTimeDelay ? parseFloat(upstreamTimeDelay) : undefined,
      upstreamBreakingCapacity: upstreamBreakingCapacity
        ? parseFloat(upstreamBreakingCapacity)
        : undefined,
      downstreamDevice,
      downstreamRating: downRating,
      downstreamCurve:
        downstreamDevice === 'mcb' || downstreamDevice === 'rcbo' ? downstreamCurve : undefined,
      downstreamMagneticSetting: downstreamMagneticSetting
        ? parseFloat(downstreamMagneticSetting)
        : undefined,
      downstreamBreakingCapacity: downstreamBreakingCapacity
        ? parseFloat(downstreamBreakingCapacity)
        : undefined,
      faultCurrent: faultI,
    });
    setResult(calculationResult);
  }, [
    upstreamDevice,
    upstreamRating,
    upstreamCurve,
    upstreamMagneticSetting,
    upstreamTimeDelay,
    upstreamBreakingCapacity,
    downstreamDevice,
    downstreamRating,
    downstreamCurve,
    downstreamMagneticSetting,
    downstreamBreakingCapacity,
    faultCurrent,
  ]);

  const reset = useCallback(() => {
    setUpstreamDevice('mccb');
    setUpstreamRating('');
    setUpstreamCurve('');
    setUpstreamMagneticSetting('');
    setUpstreamTimeDelay('');
    setUpstreamBreakingCapacity('');
    setDownstreamDevice('mcb');
    setDownstreamRating('');
    setDownstreamCurve('B');
    setDownstreamMagneticSetting('');
    setDownstreamBreakingCapacity('');
    setFaultCurrent('');
    setResult(null);
  }, []);

  const canCalculate = !!upstreamRating && !!downstreamRating && !!faultCurrent;

  return (
    <CalculatorCard
      category={CAT}
      title="Selectivity / Discrimination Calculator"
      description="Calculate protection device selectivity with I²t energy let-through and back-up protection analysis per BS 7671."
    >
      {/* Upstream Protection */}
      <CalculatorSection title="Upstream Protection" defaultOpen>
        <CalculatorInputGrid>
          <CalculatorSelect
            label="Device Type"
            value={upstreamDevice}
            onValueChange={setUpstreamDevice}
            options={DEVICE_TYPES}
            category={CAT}
          />
          <CalculatorInput
            label="Rating (A)"
            value={upstreamRating}
            onChange={setUpstreamRating}
            type="number"
            placeholder="e.g. 100"
            unit="A"
            category={CAT}
          />
          {(upstreamDevice === 'mcb' || upstreamDevice === 'rcbo') && (
            <CalculatorSelect
              label="Trip Curve"
              value={upstreamCurve}
              onValueChange={setUpstreamCurve}
              options={MCB_CURVES}
              category={CAT}
            />
          )}
          <CalculatorInput
            label="Custom Magnetic (A)"
            value={upstreamMagneticSetting}
            onChange={setUpstreamMagneticSetting}
            type="number"
            placeholder="Auto if blank"
            unit="A"
            category={CAT}
          />
          <CalculatorInput
            label="Time Delay (s)"
            value={upstreamTimeDelay}
            onChange={setUpstreamTimeDelay}
            type="number"
            placeholder="0.0"
            unit="s"
            category={CAT}
          />
          <CalculatorInput
            label="Breaking Capacity (kA)"
            value={upstreamBreakingCapacity}
            onChange={setUpstreamBreakingCapacity}
            type="number"
            placeholder="e.g. 25"
            unit="kA"
            category={CAT}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Downstream Protection */}
      <CalculatorSection title="Downstream Protection" defaultOpen>
        <CalculatorInputGrid>
          <CalculatorSelect
            label="Device Type"
            value={downstreamDevice}
            onValueChange={setDownstreamDevice}
            options={DEVICE_TYPES}
            category={CAT}
          />
          <CalculatorInput
            label="Rating (A)"
            value={downstreamRating}
            onChange={setDownstreamRating}
            type="number"
            placeholder="e.g. 32"
            unit="A"
            category={CAT}
          />
          {(downstreamDevice === 'mcb' || downstreamDevice === 'rcbo') && (
            <CalculatorSelect
              label="Trip Curve"
              value={downstreamCurve}
              onValueChange={setDownstreamCurve}
              options={MCB_CURVES}
              category={CAT}
            />
          )}
          <CalculatorInput
            label="Custom Magnetic (A)"
            value={downstreamMagneticSetting}
            onChange={setDownstreamMagneticSetting}
            type="number"
            placeholder="Auto if blank"
            unit="A"
            category={CAT}
          />
          <CalculatorInput
            label="Breaking Capacity (kA)"
            value={downstreamBreakingCapacity}
            onChange={setDownstreamBreakingCapacity}
            type="number"
            placeholder="e.g. 10"
            unit="kA"
            category={CAT}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Fault Parameters */}
      <CalculatorSection title="Fault Parameters" defaultOpen>
        <CalculatorInputGrid>
          <CalculatorInput
            label="Prospective Fault Current (A)"
            value={faultCurrent}
            onChange={setFaultCurrent}
            type="number"
            placeholder="e.g. 3000"
            unit="A"
            category={CAT}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Actions */}
      <CalculatorActions
        onCalculate={calculate}
        onReset={reset}
        canCalculate={canCalculate}
        category={CAT}
      />

      {/* Results */}
      {result && (
        <>
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <ResultBadge
              label="Selectivity"
              value={result.isSelective ? 'Selective' : 'Not Selective'}
              variant={result.isSelective ? 'success' : 'danger'}
              category={CAT}
            />
            <ResultBadge
              label="Risk"
              value={result.riskLevel.toUpperCase()}
              variant={
                result.riskLevel === 'low'
                  ? 'success'
                  : result.riskLevel === 'medium'
                    ? 'warning'
                    : 'danger'
              }
              category={CAT}
            />
            <ResultBadge
              label="Compliance"
              value={result.complianceStatus.replace(/-/g, ' ')}
              variant={
                result.complianceStatus === 'compliant'
                  ? 'success'
                  : result.complianceStatus === 'requires-verification'
                    ? 'warning'
                    : 'danger'
              }
              category={CAT}
            />
          </div>

          {/* Key Metrics */}
          <CalculatorSection title="Key Metrics" defaultOpen>
            <ResultsGrid>
              <ResultValue
                label="Selectivity Ratio"
                value={`${result.selectivityRatio.toFixed(2)}:1`}
                category={CAT}
              />
              <ResultValue
                label="Selectivity Limit"
                value={`${result.selectivityLimit.toFixed(0)} A`}
                category={CAT}
              />
              <ResultValue
                label="Limit Current Is"
                value={`${result.selectivityLimitCurrent} A`}
                category={CAT}
              />
              <ResultValue
                label="Time Margin"
                value={`${((result.operatingTimes.upstream - result.operatingTimes.downstream) * 1000).toFixed(0)} ms`}
                category={CAT}
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* Operating Times */}
          <CalculatorSection title="Operating Times" defaultOpen>
            <ResultsGrid>
              <ResultValue
                label="Downstream"
                value={`${(result.operatingTimes.downstream * 1000).toFixed(0)} ms`}
                category={CAT}
              />
              <ResultValue
                label="Upstream"
                value={`${(result.operatingTimes.upstream * 1000).toFixed(0)} ms`}
                category={CAT}
              />
              <ResultValue
                label="Downstream Magnetic"
                value={`${result.magneticTrips.downstream.toFixed(0)} A`}
                category={CAT}
              />
              <ResultValue
                label="Upstream Magnetic"
                value={`${result.magneticTrips.upstream.toFixed(0)} A`}
                category={CAT}
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* Selectivity Breakdown */}
          <CalculatorSection title="Selectivity Breakdown" defaultOpen>
            <div className="space-y-2">
              {[
                { label: 'Overload Selectivity', pass: result.overloadSelectivity },
                { label: 'Short-Circuit Selectivity', pass: result.shortCircuitSelectivity },
                { label: 'Breaking Capacity', pass: result.breakingCapacityCheck },
                {
                  label: 'Energy Selectivity (I²t)',
                  pass: result.energyLetThrough.energySelective,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1.5">
                  <span className="text-white text-sm">{item.label}</span>
                  {item.pass ? (
                    <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <CheckCircle className="h-4 w-4" /> Pass
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 text-sm font-medium">
                      <XCircle className="h-4 w-4" /> Fail
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CalculatorSection>

          {/* Energy Let-Through (I²t) */}
          <CalculatorSection title="Energy Let-Through (I²t)" defaultOpen={false}>
            <ResultsGrid>
              <ResultValue
                label="Downstream I²t"
                value={`${result.energyLetThrough.downstreamI2t.toFixed(0)} A²s`}
                category={CAT}
              />
              <ResultValue
                label="Upstream I²t"
                value={`${result.energyLetThrough.upstreamI2t.toFixed(0)} A²s`}
                category={CAT}
              />
              <ResultValue
                label="I²t Ratio"
                value={`${result.energyLetThrough.ratio}`}
                category={CAT}
              />
            </ResultsGrid>
            <p className="text-white text-sm mt-3">
              {result.energyLetThrough.energySelective
                ? 'Downstream device clears the fault before upstream device lets through equivalent energy. Energy selectivity is achieved.'
                : 'Downstream I²t exceeds upstream — both devices may experience simultaneous stress. Review device coordination.'}
            </p>
          </CalculatorSection>

          {/* Back-up (Cascade) Protection */}
          <CalculatorSection title="Back-up (Cascade) Protection" defaultOpen={false}>
            <ResultBadge
              label="Cascade"
              value={result.cascadeProtection.eligible ? 'Eligible' : 'Not Applicable'}
              variant={result.cascadeProtection.eligible ? 'success' : 'neutral'}
              category={CAT}
            />
            {result.cascadeProtection.eligible && (
              <div className="mt-3 space-y-2">
                <ResultValue
                  label="Combined Breaking Capacity"
                  value={`${result.cascadeProtection.combinedBreakingCapacity} kA`}
                  category={CAT}
                />
                <p className="text-white text-sm">{result.cascadeProtection.cascadeRating}</p>
                <p className="text-white text-sm">
                  Per BS 7671 Regulation 536.4.3, back-up protection allows a downstream device with
                  lower breaking capacity to be protected by an upstream device, provided the
                  combination is verified by the manufacturer.
                </p>
              </div>
            )}
            {!result.cascadeProtection.eligible && (
              <p className="text-white text-sm mt-3">
                Cascade protection is not applicable for this device combination. Both devices must
                independently meet the prospective fault current.
              </p>
            )}
          </CalculatorSection>

          {/* Concerns & Actions */}
          {result.immediateActions.length > 0 && (
            <CalculatorSection title="Immediate Actions Required" defaultOpen>
              <div className="space-y-2">
                {result.immediateActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </CalculatorSection>
          )}

          {result.concerns.length > 0 && (
            <CalculatorSection title="Concerns" defaultOpen>
              <div className="space-y-2">
                {result.concerns.map((concern, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">!</span>
                    <span className="text-white text-sm">{concern}</span>
                  </div>
                ))}
              </div>
            </CalculatorSection>
          )}

          {result.recommendations.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 text-white font-medium touch-manipulation">
                <span>Recommendations ({result.recommendations.length})</span>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-2 pt-2">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Copy Results */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-white text-sm py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors h-11 touch-manipulation"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy Results'}
          </button>

          {/* Formulas */}
          <CalculatorFormula
            title="Selectivity Formulas"
            steps={[
              {
                label: 'Selectivity Ratio',
                formula: 'Ratio = In(upstream) / In(downstream)',
                result: `${result.selectivityRatio.toFixed(2)}:1`,
              },
              {
                label: 'Inverse-Time Thermal',
                formula: 't = k / ((I/In)² - 1)',
                result: 'Thermal trip time',
              },
              {
                label: 'Energy Let-Through',
                formula: 'I²t = I_fault² x t_operating',
                result: `Down: ${result.energyLetThrough.downstreamI2t.toFixed(0)} / Up: ${result.energyLetThrough.upstreamI2t.toFixed(0)} A²s`,
              },
              {
                label: 'Time Discrimination',
                formula: 't_upstream > t_downstream + 100ms',
                result: `${((result.operatingTimes.upstream - result.operatingTimes.downstream) * 1000).toFixed(0)} ms margin`,
              },
            ]}
            category={CAT}
            defaultOpen
          />

          <FormulaReference
            category={CAT}
            name="Selectivity & Discrimination"
            formula="Ratio = In(upstream) / In(downstream) ≥ 1.6:1"
            variables={[
              { symbol: 'In', description: 'Rated current of protective device (A)' },
              { symbol: 'I²t', description: 'Energy let-through: I_fault² × t_operating (A²s)' },
              {
                symbol: 'Is',
                description: 'Selectivity limit current — intersection of time-current curves (A)',
              },
              {
                symbol: 'Ref',
                description:
                  'BS 7671 Reg 536.4.1 (selectivity), Reg 536.4.3 (cascade), BS EN 60898',
              },
            ]}
          />
        </>
      )}
    </CalculatorCard>
  );
};

export default SelectivityCalculator;

import { useState, useMemo } from 'react';
import {
  Zap,
  Info,
  BookOpen,
  ChevronDown,
  Calculator,
  CheckCircle2,
  XCircle,
  Copy,
} from 'lucide-react';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/calc-utils';
import { useToast } from '@/hooks/use-toast';
import {
  zsValues,
  zsValues5s,
  rcdZsValues,
  get80PercentZs,
  curveTypes,
  fuseTypes,
  fuseRatings,
  mcbRatings,
  rcdRatings,
  getTableReference,
} from './zs-values/ZsValuesData';

// Build CalculatorSelect options from data
const PROTECTION_TYPE_OPTIONS = [
  { value: 'mcb', label: 'MCB (BS EN 60898)' },
  { value: 'rcbo', label: 'RCBO (BS EN 61009)' },
  { value: 'fuse', label: 'Fuse' },
  { value: 'rcd', label: 'RCD Only (Table 41.5)' },
];

const DISCONNECTION_TIME_OPTIONS = [
  { value: '0.4', label: '0.4s (Final circuits ≤32A)' },
  { value: '5', label: '5s (Distribution circuits)' },
];

const CURVE_TYPE_OPTIONS = Object.entries(curveTypes).map(([value, label]) => ({
  value,
  label,
}));

const FUSE_TYPE_OPTIONS = Object.entries(fuseTypes).map(([value, label]) => ({
  value,
  label,
}));

const RCD_RATING_OPTIONS = rcdRatings.map((r) => ({
  value: r.toString(),
  label: `${r}mA`,
}));

const MCB_RATING_OPTIONS = mcbRatings.map((r) => ({
  value: r.toString(),
  label: `${r}A`,
}));

interface ZsResult {
  maxZs: number;
  testLimit: number;
  calculatedZs: number | null;
  passesTest: boolean | null;
  passesTabulated: boolean | null;
  headroom: number | null;
  deviceDescription: string;
  tableRef: string;
}

const ZsValuesCalculator = () => {
  const config = CALCULATOR_CONFIG['testing'];
  const { toast } = useToast();

  // Device selection
  const [protectionType, setProtectionType] = useState('');
  const [disconnectionTime, setDisconnectionTime] = useState('0.4');
  const [curveType, setCurveType] = useState('');
  const [deviceRating, setDeviceRating] = useState('');
  const [fuseType, setFuseType] = useState('');
  const [rcdRating, setRcdRating] = useState('30');

  // Circuit values
  const [ze, setZe] = useState('');
  const [r1r2, setR1R2] = useState('');

  // UI state
  const [showWorkings, setShowWorkings] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Get available ratings for current fuse type
  const fuseRatingOptions = useMemo(() => {
    if (!fuseType || !fuseRatings[fuseType]) return [];
    return fuseRatings[fuseType].map((r) => ({
      value: r.toString(),
      label: `${r}A`,
    }));
  }, [fuseType]);

  // Look up the max Zs from BS 7671 tables
  const result = useMemo((): ZsResult | null => {
    if (!protectionType) return null;

    const data = disconnectionTime === '0.4' ? zsValues : zsValues5s;
    let maxZs: number | undefined;
    let deviceDescription = '';

    if (protectionType === 'rcd') {
      const rating = parseInt(rcdRating);
      maxZs = rcdZsValues[rating as keyof typeof rcdZsValues];
      deviceDescription = `${rating}mA RCD`;
    } else if (protectionType === 'mcb' || protectionType === 'rcbo') {
      if (!curveType || !deviceRating) return null;
      const rating = parseInt(deviceRating);
      const deviceData = data[protectionType as keyof typeof data] as Record<
        string,
        Record<number, number>
      >;
      maxZs = deviceData?.[curveType]?.[rating];
      const curveLabel = curveType.replace('type-', '').toUpperCase();
      deviceDescription = `${rating}A Type ${curveLabel} ${protectionType.toUpperCase()}`;
    } else if (protectionType === 'fuse') {
      if (!fuseType || !deviceRating) return null;
      const rating = parseInt(deviceRating);
      const fuseData = data[fuseType as keyof typeof data] as Record<number, number>;
      maxZs = fuseData?.[rating];
      const fuseLabel = fuseTypes[fuseType] || fuseType;
      deviceDescription = `${rating}A ${fuseLabel}`;
    }

    if (!maxZs) return null;

    const testLimit = get80PercentZs(maxZs);
    const tableRef = getTableReference(
      protectionType === 'fuse' ? fuseType : protectionType,
      disconnectionTime as '0.4' | '5'
    );

    // Calculate circuit Zs if Ze and R1+R2 provided
    const zeVal = parseFloat(ze);
    const r1r2Val = parseFloat(r1r2);
    const calculatedZs = !isNaN(zeVal) && !isNaN(r1r2Val) ? zeVal + r1r2Val : null;

    const passesTest = calculatedZs !== null ? calculatedZs <= testLimit : null;
    const passesTabulated = calculatedZs !== null ? calculatedZs <= maxZs : null;
    const headroom = calculatedZs !== null ? ((testLimit - calculatedZs) / testLimit) * 100 : null;

    return {
      maxZs,
      testLimit,
      calculatedZs,
      passesTest,
      passesTabulated,
      headroom,
      deviceDescription,
      tableRef,
    };
  }, [protectionType, disconnectionTime, curveType, deviceRating, fuseType, rcdRating, ze, r1r2]);

  const reset = () => {
    setProtectionType('');
    setDisconnectionTime('0.4');
    setCurveType('');
    setDeviceRating('');
    setFuseType('');
    setRcdRating('30');
    setZe('');
    setR1R2('');
  };

  const copyResults = async () => {
    if (!result) return;
    let text = `Zs Calculator Results\n`;
    text += `Device: ${result.deviceDescription}\n`;
    text += `Disconnection time: ${disconnectionTime}s\n`;
    text += `Max Zs (BS 7671 ${result.tableRef}): ${result.maxZs.toFixed(2)} Ohm\n`;
    text += `80% Test Limit: ${result.testLimit.toFixed(2)} Ohm\n`;
    if (result.calculatedZs !== null) {
      text += `\nCalculated Zs: Ze (${ze}) + R1+R2 (${r1r2}) = ${result.calculatedZs.toFixed(2)} Ohm\n`;
      text += `Status: ${result.passesTest ? 'PASS' : 'FAIL'}\n`;
    }
    const success = await copyToClipboard(text);
    toast({
      title: success ? 'Copied' : 'Copy failed',
      description: success ? 'Zs results copied to clipboard' : 'Please try again',
      variant: success ? 'success' : 'destructive',
    });
  };

  return (
    <CalculatorCard
      category="testing"
      title="Maximum Zs Values Calculator"
      description="Look up maximum earth fault loop impedance per BS 7671"
    >
      {/* Protection device type */}
      <CalculatorSelect
        label="Protection Device Type"
        value={protectionType}
        onChange={(v) => {
          setProtectionType(v);
          setDeviceRating('');
          setCurveType('');
          setFuseType('');
        }}
        options={PROTECTION_TYPE_OPTIONS}
        placeholder="Select device type"
      />

      {/* Disconnection time — for MCB, RCBO, Fuse */}
      {(protectionType === 'mcb' || protectionType === 'rcbo' || protectionType === 'fuse') && (
        <CalculatorSelect
          label="Disconnection Time"
          value={disconnectionTime}
          onChange={setDisconnectionTime}
          options={DISCONNECTION_TIME_OPTIONS}
        />
      )}

      {/* MCB / RCBO: curve type + rating */}
      {(protectionType === 'mcb' || protectionType === 'rcbo') && (
        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="Curve Type"
            value={curveType}
            onChange={setCurveType}
            options={CURVE_TYPE_OPTIONS}
            placeholder="Select curve"
          />
          <CalculatorSelect
            label="Rating"
            value={deviceRating}
            onChange={setDeviceRating}
            options={MCB_RATING_OPTIONS}
            placeholder="Select rating"
          />
        </div>
      )}

      {/* Fuse: fuse type + rating */}
      {protectionType === 'fuse' && (
        <>
          <CalculatorSelect
            label="Fuse Type"
            value={fuseType}
            onChange={(v) => {
              setFuseType(v);
              setDeviceRating('');
            }}
            options={FUSE_TYPE_OPTIONS}
            placeholder="Select fuse type"
          />
          {fuseType && (
            <CalculatorSelect
              label="Fuse Rating"
              value={deviceRating}
              onChange={setDeviceRating}
              options={fuseRatingOptions}
              placeholder="Select rating"
            />
          )}
        </>
      )}

      {/* RCD: rating */}
      {protectionType === 'rcd' && (
        <CalculatorSelect
          label="RCD Rated Residual Current"
          value={rcdRating}
          onChange={setRcdRating}
          options={RCD_RATING_OPTIONS}
        />
      )}

      <CalculatorDivider category="testing" />

      {/* Circuit impedance inputs (optional) */}
      <div className="grid grid-cols-2 gap-3">
        <CalculatorInput
          label="Ze (External)"
          unit="Ω"
          type="text"
          inputMode="decimal"
          value={ze}
          onChange={setZe}
          placeholder="e.g. 0.35"
          hint="External earth loop impedance"
        />
        <CalculatorInput
          label="R1+R2"
          unit="Ω"
          type="text"
          inputMode="decimal"
          value={r1r2}
          onChange={setR1R2}
          placeholder="e.g. 0.23"
          hint="From continuity test or calculation"
        />
      </div>

      <CalculatorActions
        category="testing"
        onCalculate={() => {}}
        onReset={reset}
        isDisabled={!protectionType}
        calculateLabel="Live Results Below"
      />

      {/* Results */}
      {result && (
        <>
          <CalculatorDivider category="testing" />

          <div className="space-y-4 animate-fade-in">
            {/* Device chip */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${config.gradientFrom}15`,
                  border: `1px solid ${config.gradientFrom}30`,
                  color: config.gradientFrom,
                }}
              >
                {result.deviceDescription}
              </span>
              <span className="text-xs text-white">
                BS 7671 {result.tableRef} — {disconnectionTime}s
              </span>
            </div>

            {/* Hero: max Zs */}
            <div className="rounded-xl p-4 bg-white/[0.04] text-center">
              <p className="text-sm text-white mb-1">Maximum Zs (BS 7671)</p>
              <div
                className="text-4xl font-bold font-mono bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.maxZs.toFixed(2)} Ω
              </div>
              <p className="text-sm text-white mt-2">
                80% test limit:{' '}
                <span className="font-semibold font-mono">{result.testLimit.toFixed(2)} Ω</span>
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Tabulated (100%)"
                value={result.maxZs.toFixed(2)}
                unit="Ω"
                category="testing"
                size="sm"
              />
              <ResultValue
                label="Test Limit (80%)"
                value={result.testLimit.toFixed(2)}
                unit="Ω"
                category="testing"
                size="sm"
              />
            </ResultsGrid>

            {/* Circuit Zs comparison */}
            {result.calculatedZs !== null && (
              <div
                className={cn(
                  'p-4 rounded-xl border',
                  result.passesTest
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-red-500/10 border-red-500/20'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passesTest ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <span
                    className={cn(
                      'font-semibold text-sm',
                      result.passesTest ? 'text-emerald-300' : 'text-red-300'
                    )}
                  >
                    {result.passesTest
                      ? 'PASS — Within 80% Test Limit'
                      : 'FAIL — Exceeds 80% Test Limit'}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white">Your circuit Zs:</span>
                    <span className="text-white font-mono font-medium">
                      {result.calculatedZs.toFixed(2)} Ω
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Ze + (R1+R2):</span>
                    <span className="text-white font-mono">
                      {ze} + {r1r2} = {result.calculatedZs.toFixed(2)} Ω
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">80% test limit:</span>
                    <span className="text-white font-mono font-medium">
                      {result.testLimit.toFixed(2)} Ω
                    </span>
                  </div>
                  {result.headroom !== null && (
                    <div className="flex justify-between">
                      <span className="text-white">Headroom:</span>
                      <span
                        className={cn(
                          'font-mono font-medium',
                          result.passesTest ? 'text-emerald-400' : 'text-red-400'
                        )}
                      >
                        {result.headroom >= 0
                          ? `${result.headroom.toFixed(1)}% below limit`
                          : `${Math.abs(result.headroom).toFixed(1)}% over limit`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tabulated check if different from test check */}
                {result.passesTest === false && result.passesTabulated === true && (
                  <div className="mt-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-xs text-white">
                      <strong>Note:</strong> Circuit passes the 100% tabulated value (
                      {result.maxZs.toFixed(2)} Ω) but fails the 80% test limit. The 80% rule
                      accounts for temperature rise — this circuit may fail testing at ambient
                      temperature.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Copy button */}
            <button
              onClick={copyResults}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors touch-manipulation"
            >
              <Copy className="h-4 w-4" />
              Copy Results
            </button>
          </div>

          <CalculatorDivider category="testing" />

          {/* How It Worked Out */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showWorkings && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="text-sm font-mono text-white space-y-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                {/* Step 1 */}
                <div>
                  <p className="text-xs text-purple-400 mb-1">
                    Step 1: Look up maximum Zs from BS 7671
                  </p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>Device: {result.deviceDescription}</p>
                    <p>Disconnection time: {disconnectionTime}s</p>
                    <p>
                      {result.tableRef}: Max Zs ={' '}
                      <span className="font-bold">{result.maxZs.toFixed(2)} Ω</span>
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 2: Calculate 80% test limit</p>
                  <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                    <p>
                      Test limit = {result.maxZs.toFixed(2)} × 0.8 ={' '}
                      <span className="font-bold">{result.testLimit.toFixed(2)} Ω</span>
                    </p>
                    <p className="text-xs text-white mt-1">
                      80% accounts for temperature rise from ~20°C test to 70°C operating
                    </p>
                  </div>
                </div>

                {/* Step 3 — if calculated */}
                {result.calculatedZs !== null && (
                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 3: Calculate circuit Zs</p>
                    <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                      <p>Zs = Ze + (R1+R2)</p>
                      <p>
                        Zs = {ze} + {r1r2} ={' '}
                        <span className="font-bold">{result.calculatedZs.toFixed(2)} Ω</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4 — compliance check */}
                {result.calculatedZs !== null && (
                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 4: Compliance check</p>
                    <div className="pl-3 border-l-2 border-purple-500/30 space-y-0.5">
                      <p>
                        {result.calculatedZs.toFixed(2)} {result.passesTest ? '≤' : '>'}{' '}
                        {result.testLimit.toFixed(2)} (80% limit)
                      </p>
                      <p>
                        Result:{' '}
                        <span
                          className={cn(
                            'font-bold',
                            result.passesTest ? 'text-emerald-400' : 'text-red-400'
                          )}
                        >
                          {result.passesTest ? 'PASS' : 'FAIL'}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Zs (Earth Fault Loop Impedance):</strong> The total impedance of the
                    fault current path — from supply transformer, through line conductor, fault,
                    protective conductor, and back to the transformer.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Why it matters:</strong> If Zs is too high, the fault current is too low
                    to trip the protective device fast enough, risking electric shock or fire.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>80% vs 100%:</strong> BS 7671 tabulated values are at operating
                    temperature (70°C). When testing at ambient (~20°C), use 80% of the tabulated
                    value because conductor resistance will rise when the circuit is loaded.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>0.4s vs 5s:</strong> Final circuits ≤32A must disconnect within 0.4s
                    (Reg 411.3.2.2). Distribution circuits can have up to 5s (Reg 411.3.2.3).
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Curve types:</strong> Type B (3-5×In) — most sensitive, highest Zs
                    allowed. Type C (5-10×In) — general purpose. Type D (10-20×In) — least
                    sensitive, lowest Zs allowed.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Reference */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  BS 7671 Reference
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showReference && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Reg 411.4.5:</strong> Earth fault loop impedance (Zs) at every point of
                    utilisation shall not exceed the values in Tables 41.2, 41.3 and 41.4
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 41.2:</strong> Maximum Zs for fuses (BS 88-2, BS 88-3, BS 3036, BS
                    1362) at 0.4s
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 41.3:</strong> Maximum Zs for MCBs and RCBOs (BS EN 60898 / BS EN
                    61009) at 0.4s and 5s
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 41.4:</strong> Maximum Zs for fuses at 5s disconnection
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 41.5:</strong> Maximum Zs for RCDs — based on RA × IΔn ≤ 50V
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>GN3 (9th Ed):</strong> IET Guidance Note 3 — test procedures for earth
                    fault loop impedance measurement
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>TT systems (Reg 411.5.3):</strong> For TT earthing, the condition RA ×
                    IΔn ≤ 50V must be satisfied. RCD protection is mandatory.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Formula reference — always visible */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Zs</strong> = Ze + (R1+R2). Must be ≤ tabulated maximum for disconnection within{' '}
            {disconnectionTime || '0.4'}s. Use 80% for testing at ambient temperature.
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default ZsValuesCalculator;

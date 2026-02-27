import { useState, useMemo, useCallback } from 'react';
import {
  Copy,
  Check,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Shield,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { zsValues, curveTypes, fuseTypes, fuseRatings } from './zs-values/ZsValuesData';
import { Button } from '@/components/ui/button';
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

type EarthingSystem = 'tn' | 'tt';
type MeasurementMode = 'calculated' | 'measured';
type DeviceType = 'mcb' | 'rcbo' | 'fuse';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

interface TNResult {
  type: 'tn';
  zsValue: number;
  zeValue?: number;
  r1r2Value?: number;
  maxZsValue: number | null;
  testLimit80: number | null;
  compliance80: boolean | null;
  compliance100: boolean | null;
  headroom80: number | null;
  headroom100: number | null;
  faultCurrent: number;
  deviceValid: boolean;
  deviceLabel: string;
}

interface TTResult {
  type: 'tt';
  raValue: number;
  iDeltaNValue: number;
  product: number;
  compliant: boolean;
  maxRa: number;
}

type CalcResult = TNResult | TTResult;

const EarthFaultLoopCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);

  // Earthing system and measurement mode
  const [earthingSystem, setEarthingSystem] = useState<EarthingSystem>('tn');
  const [measurementMode, setMeasurementMode] = useState<MeasurementMode>('calculated');

  // TN inputs
  const [ze, setZe] = useState('');
  const [r1PlusR2, setR1PlusR2] = useState('');
  const [measuredZs, setMeasuredZs] = useState('');

  // TT inputs
  const [ra, setRa] = useState('');
  const [iDeltaN, setIDeltaN] = useState('');

  // Protection device (TN only)
  const [deviceType, setDeviceType] = useState<DeviceType>('mcb');
  const [curveType, setCurveType] = useState('');
  const [rating, setRating] = useState('');
  const [fuseType, setFuseType] = useState('');

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Get max Zs from ZsValuesData
  const getMaxZs = (
    device: DeviceType,
    curve: string,
    ratingNum: number,
    fuse: string
  ): number | null => {
    try {
      if (device === 'mcb' || device === 'rcbo') {
        const deviceData = zsValues[device];
        if (deviceData && deviceData[curve as keyof typeof deviceData]) {
          const curveData = deviceData[curve as keyof typeof deviceData];
          return curveData[ratingNum as keyof typeof curveData] || null;
        }
      } else if (device === 'fuse' && fuse) {
        const fuseData = zsValues[fuse as keyof typeof zsValues];
        if (fuseData && typeof fuseData === 'object') {
          return fuseData[ratingNum as keyof typeof fuseData] || null;
        }
      }
    } catch {
      return null;
    }
    return null;
  };

  // Available ratings based on device/curve/fuse selection
  const availableRatings = useMemo(() => {
    if (deviceType === 'mcb' || deviceType === 'rcbo') {
      if (!curveType) return [];
      const deviceData = zsValues[deviceType];
      const curveData = deviceData?.[curveType as keyof typeof deviceData];
      return curveData
        ? Object.keys(curveData)
            .map((r) => parseInt(r))
            .sort((a, b) => a - b)
        : [];
    } else if (deviceType === 'fuse' && fuseType) {
      return fuseRatings[fuseType as keyof typeof fuseRatings] || [];
    }
    return [];
  }, [deviceType, curveType, fuseType]);

  const ratingOptions = availableRatings.map((r) => ({ value: r.toString(), label: `${r}A` }));

  // Can calculate?
  const canCalculate = useMemo(() => {
    if (earthingSystem === 'tn') {
      if (measurementMode === 'calculated') {
        return ze.trim() !== '' && r1PlusR2.trim() !== '';
      }
      return measuredZs.trim() !== '';
    }
    return ra.trim() !== '' && iDeltaN.trim() !== '';
  }, [earthingSystem, measurementMode, ze, r1PlusR2, measuredZs, ra, iDeltaN]);

  const handleReset = useCallback(() => {
    setZe('');
    setR1PlusR2('');
    setMeasuredZs('');
    setRa('');
    setIDeltaN('');
    setRating('');
    setCurveType('');
    setFuseType('');
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    if (earthingSystem === 'tn') {
      let zsValue: number | null = null;
      let zeVal: number | undefined;
      let r1r2Val: number | undefined;

      if (measurementMode === 'calculated') {
        zeVal = parseFloat(ze);
        r1r2Val = parseFloat(r1PlusR2);
        if (!isNaN(zeVal) && !isNaN(r1r2Val)) {
          zsValue = zeVal + r1r2Val;
        }
      } else {
        const mv = parseFloat(measuredZs);
        if (!isNaN(mv)) zsValue = mv;
      }

      if (zsValue === null) return;

      let maxZsValue: number | null = null;
      let deviceValid = false;
      let deviceLabel = '';

      if (rating) {
        const ratingNum = parseInt(rating);
        if (deviceType === 'mcb' || deviceType === 'rcbo') {
          if (curveType) {
            maxZsValue = getMaxZs(deviceType, curveType, ratingNum, '');
            deviceValid = maxZsValue !== null;
            const curveLabel = curveTypes[curveType as keyof typeof curveTypes] || curveType;
            deviceLabel = `${ratingNum}A ${deviceType.toUpperCase()} ${curveLabel}`;
          }
        } else if (deviceType === 'fuse' && fuseType) {
          maxZsValue = getMaxZs(deviceType, '', ratingNum, fuseType);
          deviceValid = maxZsValue !== null;
          const fuseLabel = fuseTypes[fuseType as keyof typeof fuseTypes] || fuseType;
          deviceLabel = `${ratingNum}A ${fuseLabel}`;
        }
      }

      const testLimit80 = maxZsValue ? maxZsValue * 0.8 : null;
      const compliance80 = testLimit80 ? zsValue <= testLimit80 : null;
      const compliance100 = maxZsValue ? zsValue <= maxZsValue : null;
      const headroom80 =
        testLimit80 && compliance80 ? ((testLimit80 - zsValue) / testLimit80) * 100 : null;
      const headroom100 =
        maxZsValue && compliance100 ? ((maxZsValue - zsValue) / maxZsValue) * 100 : null;
      const faultCurrent = 230 / zsValue;

      setResult({
        type: 'tn',
        zsValue,
        zeValue: zeVal,
        r1r2Value: r1r2Val,
        maxZsValue,
        testLimit80,
        compliance80,
        compliance100,
        headroom80,
        headroom100,
        faultCurrent,
        deviceValid,
        deviceLabel,
      });
    } else {
      const raVal = parseFloat(ra);
      const iDeltaNVal = parseFloat(iDeltaN);
      if (isNaN(raVal) || isNaN(iDeltaNVal) || iDeltaNVal <= 0) return;

      const product = raVal * iDeltaNVal;
      const maxRa = 50 / iDeltaNVal;

      setResult({
        type: 'tt',
        raValue: raVal,
        iDeltaNValue: iDeltaNVal,
        product,
        compliant: product <= 50,
        maxRa,
      });
    }
  }, [
    earthingSystem,
    measurementMode,
    ze,
    r1PlusR2,
    measuredZs,
    ra,
    iDeltaN,
    deviceType,
    curveType,
    rating,
    fuseType,
  ]);

  const handleCopy = () => {
    if (!result) return;
    let text = '';
    if (result.type === 'tn') {
      text = `Earth Fault Loop Impedance\nZs: ${result.zsValue.toFixed(3)} Ω`;
      if (result.maxZsValue) text += `\nMax Zs: ${result.maxZsValue} Ω`;
      if (result.testLimit80) text += `\n80% Test Limit: ${result.testLimit80.toFixed(3)} Ω`;
      text += `\nFault Current: ${result.faultCurrent.toFixed(0)} A`;
      text += `\nStatus: ${result.compliance80 ? 'PASS' : result.compliance100 ? 'MARGINAL' : 'FAIL'}`;
    } else {
      text = `TT System Verification\nRA: ${result.raValue} Ω\nIΔn: ${result.iDeltaNValue} A\nRA × IΔn: ${result.product.toFixed(1)} V\nStatus: ${result.compliant ? 'COMPLIANT (≤ 50V)' : 'NON-COMPLIANT (> 50V)'}`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Earth Fault Loop Impedance Calculator"
      description="Verify TN/TT system compliance with BS 7671"
    >
      {/* ── Earthing System ── */}
      <CalculatorSection title="Earthing System">
        <div className="grid grid-cols-2 gap-3">
          {(['tn', 'tt'] as const).map((sys) => (
            <Button
              key={sys}
              type="button"
              variant="outline"
              onClick={() => {
                setEarthingSystem(sys);
                setResult(null);
              }}
              className={cn(
                'h-12 rounded-xl font-medium transition-all touch-manipulation',
                earthingSystem === sys
                  ? 'border-orange-500/50 bg-orange-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              )}
            >
              {sys === 'tn' ? 'TN System' : 'TT System'}
            </Button>
          ))}
        </div>
      </CalculatorSection>

      {earthingSystem === 'tn' ? (
        <>
          {/* ── Measurement Method ── */}
          <CalculatorSection title="Measurement Method">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { value: 'calculated' as const, label: 'Calculate: Ze + (R1+R2)' },
                { value: 'measured' as const, label: 'Direct Zs Measurement' },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setMeasurementMode(opt.value);
                    setResult(null);
                  }}
                  className={cn(
                    'h-12 rounded-xl font-medium text-sm transition-all touch-manipulation',
                    measurementMode === opt.value
                      ? 'border-orange-500/50 bg-orange-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                  )}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* ── Impedance Inputs ── */}
          {measurementMode === 'calculated' ? (
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Ze (External Impedance)"
                unit="Ω"
                inputMode="decimal"
                value={ze}
                onChange={setZe}
                placeholder="0.35"
                hint="Measured at origin"
              />
              <CalculatorInput
                label="R1+R2 (Circuit Resistance)"
                unit="Ω"
                inputMode="decimal"
                value={r1PlusR2}
                onChange={setR1PlusR2}
                placeholder="0.25"
                hint="To furthest point"
              />
            </CalculatorInputGrid>
          ) : (
            <CalculatorInput
              label="Measured Zs"
              unit="Ω"
              inputMode="decimal"
              value={measuredZs}
              onChange={setMeasuredZs}
              placeholder="0.60"
              hint="Direct measurement at furthest point"
            />
          )}

          <CalculatorDivider category={CAT} />

          {/* ── Protection Device ── */}
          <CalculatorSection title="Protection Device (for compliance check)">
            <CalculatorInputGrid columns={2}>
              <CalculatorSelect
                label="Device Type"
                value={deviceType}
                onChange={(value) => {
                  setDeviceType(value as DeviceType);
                  setCurveType('');
                  setFuseType('');
                  setRating('');
                }}
                options={[
                  { value: 'mcb', label: 'MCB' },
                  { value: 'rcbo', label: 'RCBO' },
                  { value: 'fuse', label: 'Fuse' },
                ]}
              />

              {(deviceType === 'mcb' || deviceType === 'rcbo') && (
                <CalculatorSelect
                  label="Curve Type"
                  value={curveType}
                  onChange={(value) => {
                    setCurveType(value);
                    setRating('');
                  }}
                  options={[
                    { value: 'type-b', label: 'Type B (3–5×In)' },
                    { value: 'type-c', label: 'Type C (5–10×In)' },
                    { value: 'type-d', label: 'Type D (10–20×In)' },
                  ]}
                  placeholder="Select curve"
                />
              )}

              {deviceType === 'fuse' && (
                <CalculatorSelect
                  label="Fuse Type"
                  value={fuseType}
                  onChange={(value) => {
                    setFuseType(value);
                    setRating('');
                  }}
                  options={Object.entries(fuseTypes).map(([key, label]) => ({ value: key, label }))}
                  placeholder="Select fuse type"
                />
              )}
            </CalculatorInputGrid>

            {(((deviceType === 'mcb' || deviceType === 'rcbo') && curveType) ||
              (deviceType === 'fuse' && fuseType)) &&
              ratingOptions.length > 0 && (
                <CalculatorSelect
                  label="Rating"
                  value={rating}
                  onChange={setRating}
                  options={ratingOptions}
                  placeholder="Select rating"
                />
              )}
          </CalculatorSection>
        </>
      ) : (
        <>
          {/* ── TT System Inputs ── */}
          <CalculatorSection title="TT System: RA × IΔn ≤ 50V">
            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="RA (Earth Electrode Resistance)"
                unit="Ω"
                inputMode="decimal"
                value={ra}
                onChange={setRa}
                placeholder="100"
                hint="Measured earth electrode resistance"
              />
              <CalculatorInput
                label="IΔn (RCD Rated Current)"
                unit="A"
                inputMode="decimal"
                value={iDeltaN}
                onChange={setIDeltaN}
                placeholder="0.03"
                hint="RCD sensitivity"
              />
            </CalculatorInputGrid>
            <div className="flex gap-2">
              {[
                { value: '0.03', label: '30mA' },
                { value: '0.1', label: '100mA' },
                { value: '0.3', label: '300mA' },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIDeltaN(opt.value)}
                  className={cn(
                    'text-xs h-11 rounded-lg touch-manipulation',
                    iDeltaN === opt.value
                      ? 'border-orange-500/50 bg-orange-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                  )}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </CalculatorSection>
        </>
      )}

      {/* ── Calculate / Reset ── */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel={earthingSystem === 'tn' ? 'Calculate Zs' : 'Calculate RA × IΔn'}
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            {result.type === 'tn' ? (
              <ResultBadge
                status={
                  result.compliance80
                    ? 'pass'
                    : result.compliance100
                      ? 'warning'
                      : result.maxZsValue
                        ? 'fail'
                        : 'info'
                }
                label={
                  result.compliance80
                    ? 'Passes 80% Test'
                    : result.compliance100
                      ? 'Marginal — Within Table Value'
                      : result.maxZsValue
                        ? 'Non-Compliant'
                        : 'Zs Calculated'
                }
              />
            ) : (
              <ResultBadge
                status={result.compliant ? 'pass' : 'fail'}
                label={result.compliant ? 'Compliant (≤ 50V)' : 'Non-Compliant (> 50V)'}
              />
            )}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {result.type === 'tn' ? (
            <>
              {/* Hero Zs value */}
              <div className="text-center py-3">
                <p className="text-sm font-medium text-white mb-1">
                  Earth Fault Loop Impedance (Zs)
                </p>
                <p
                  className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {result.zsValue.toFixed(3)} Ω
                </p>
                <p className="text-sm text-white mt-2">
                  Prospective fault current: {result.faultCurrent.toFixed(0)} A
                </p>
              </div>

              {/* Max Zs and 80% test limit */}
              {result.maxZsValue !== null && result.testLimit80 !== null && (
                <ResultsGrid columns={2}>
                  <ResultValue
                    category={CAT}
                    label="Max Zs (Table 41.3)"
                    value={result.maxZsValue.toFixed(2)}
                    unit="Ω"
                    size="sm"
                  />
                  <ResultValue
                    category={CAT}
                    label="80% Test Limit"
                    value={result.testLimit80.toFixed(3)}
                    unit="Ω"
                    size="sm"
                  />
                </ResultsGrid>
              )}

              {/* Compliance details */}
              {result.maxZsValue !== null && (
                <div className="space-y-2">
                  {/* Tabulated (100%) check */}
                  <div
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border text-sm',
                      result.compliance100
                        ? 'bg-green-500/5 border-green-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {result.compliance100 ? (
                        <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                      <span className="text-white font-medium">Tabulated Max Zs</span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-white">{result.zsValue.toFixed(3)}</span>
                      <span className="text-white text-xs ml-1">/ {result.maxZsValue} Ω</span>
                      {result.headroom100 !== null && (
                        <span className="text-white text-xs ml-2">
                          ({result.headroom100.toFixed(0)}% headroom)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 80% test limit check */}
                  <div
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border text-sm',
                      result.compliance80
                        ? 'bg-green-500/5 border-green-500/20'
                        : 'bg-red-500/5 border-red-500/20'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {result.compliance80 ? (
                        <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      )}
                      <span className="text-white font-medium">80% Test Limit</span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <span className="text-white">{result.zsValue.toFixed(3)}</span>
                      <span className="text-white text-xs ml-1">
                        / {result.testLimit80?.toFixed(3)} Ω
                      </span>
                      {result.headroom80 !== null && (
                        <span className="text-white text-xs ml-2">
                          ({result.headroom80.toFixed(0)}% headroom)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* No device selected info */}
              {!result.maxZsValue && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    Select a protection device above to check compliance against BS 7671 Table 41.3
                    maximum Zs values.
                  </p>
                </div>
              )}

              {/* Device not found warning */}
              {!result.deviceValid && rating && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    {rating}A rating not available for the selected device. Check available ratings
                    or select a different device.
                  </p>
                </div>
              )}

              {/* Marginal warning */}
              {result.compliance100 && !result.compliance80 && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    Zs is within the tabulated maximum but exceeds the 80% rule. Cable resistance
                    increases with temperature in service — this circuit may fail under load
                    conditions. Consider cable upgrade or additional RCD protection.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Hero RA × IΔn value */}
              <div className="text-center py-3">
                <p className="text-sm font-medium text-white mb-1">RA × IΔn Product</p>
                <p
                  className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {result.product.toFixed(1)} V
                </p>
                <p className="text-sm text-white mt-2">Must not exceed 50V</p>
              </div>

              <ResultsGrid columns={2}>
                <ResultValue
                  category={CAT}
                  label="RA"
                  value={result.raValue.toFixed(1)}
                  unit="Ω"
                  size="sm"
                />
                <ResultValue
                  category={CAT}
                  label="Max RA for this RCD"
                  value={result.maxRa.toFixed(0)}
                  unit="Ω"
                  size="sm"
                />
              </ResultsGrid>

              {/* Pass/Fail check */}
              <div
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border text-sm',
                  result.compliant
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <div className="flex items-center gap-2">
                  {result.compliant ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <span className="text-white font-medium">RA × IΔn ≤ 50V</span>
                </div>
                <span className="text-white shrink-0 ml-2">
                  {result.raValue} × {result.iDeltaNValue} = {result.product.toFixed(1)} V
                </span>
              </div>
            </>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            steps={
              result.type === 'tn'
                ? [
                    ...(result.zeValue !== undefined && result.r1r2Value !== undefined
                      ? [
                          {
                            label: 'Input values',
                            formula: `Ze = ${result.zeValue.toFixed(3)} Ω | R1+R2 = ${result.r1r2Value.toFixed(3)} Ω`,
                          },
                          {
                            label: 'Calculate Zs',
                            formula: `Zs = Ze + (R1+R2) = ${result.zeValue.toFixed(3)} + ${result.r1r2Value.toFixed(3)}`,
                            value: `${result.zsValue.toFixed(3)} Ω`,
                          },
                        ]
                      : [
                          {
                            label: 'Measured Zs',
                            value: `${result.zsValue.toFixed(3)} Ω (direct measurement)`,
                          },
                        ]),
                    {
                      label: 'Prospective fault current',
                      formula: `If = Uo / Zs = 230 / ${result.zsValue.toFixed(3)}`,
                      value: `${result.faultCurrent.toFixed(0)} A`,
                      description: 'Based on nominal voltage Uo = 230V',
                    },
                    ...(result.maxZsValue !== null
                      ? [
                          {
                            label: `Compliance check (${result.deviceLabel})`,
                            formula: `Max Zs = ${result.maxZsValue} Ω | 80% limit = ${result.testLimit80?.toFixed(3)} Ω`,
                            value: result.compliance80
                              ? 'PASSES 80% test limit'
                              : result.compliance100
                                ? 'Marginal — within table value but exceeds 80% rule'
                                : 'FAILS — Zs exceeds maximum permitted value',
                          },
                        ]
                      : []),
                  ]
                : [
                    {
                      label: 'Input values',
                      formula: `RA = ${result.raValue} Ω | IΔn = ${result.iDeltaNValue} A`,
                    },
                    {
                      label: 'Touch voltage calculation',
                      formula: `RA × IΔn = ${result.raValue} × ${result.iDeltaNValue}`,
                      value: `${result.product.toFixed(1)} V`,
                      description: 'Must not exceed 50V for safety',
                    },
                    {
                      label: 'Maximum RA for this RCD',
                      formula: `Max RA = 50 / IΔn = 50 / ${result.iDeltaNValue}`,
                      value: `${result.maxRa.toFixed(0)} Ω`,
                    },
                    {
                      label: 'Result',
                      value: result.compliant
                        ? 'COMPLIANT — touch voltage ≤ 50V'
                        : 'NON-COMPLIANT — touch voltage exceeds 50V, reduce RA or increase RCD sensitivity',
                    },
                  ]
            }
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
                {earthingSystem === 'tn' ? (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">Earth Fault Loop Impedance</p>
                      <p className="text-sm text-white">
                        Zs is the total impedance of the earth fault current path — from the
                        transformer, through the line conductor, through the fault, and back via the
                        CPC and external earth. A low Zs means high fault current, which trips the
                        protective device quickly.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">Why the 80% Rule?</p>
                      <p className="text-sm text-white">
                        BS 7671 Table 41.3 values are for conductors at their maximum operating
                        temperature. When you test with a low-resistance ohmmeter, cables are cold.
                        The 80% rule accounts for resistance increasing when cables are loaded and
                        hot. If your measured Zs exceeds 80% of the table value, it may fail under
                        load.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">Disconnection Times</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Socket outlets: ≤ 0.4 seconds
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Fixed equipment (not accessible): ≤ 5 seconds
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Distribution circuits: ≤ 5 seconds
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">TT System Protection</p>
                      <p className="text-sm text-white">
                        In a TT system, the earth fault return path goes through the general mass of
                        earth — which has high impedance. Overcurrent devices alone cannot guarantee
                        fast disconnection, so RCD protection is essential.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">RA × IΔn ≤ 50V Rule</p>
                      <p className="text-sm text-white">
                        This ensures the touch voltage on exposed metalwork during an earth fault
                        does not exceed 50V — the maximum safe touch voltage. RA is the earth
                        electrode resistance, and IΔn is the RCD rated residual operating current.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">Typical RA Values</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Good earth electrode: 10–50 Ω
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Moderate: 50–200 Ω
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Poor (sandy/rocky soil): 200–500 Ω+
                        </li>
                      </ul>
                    </div>
                  </>
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
                      reg: 'Regulation 411.3.2',
                      desc: 'TN systems — protective devices must disconnect under fault conditions',
                    },
                    {
                      reg: 'Regulation 411.4.4',
                      desc: 'TT systems — RCD protection required, RA × IΔn ≤ 50V',
                    },
                    {
                      reg: 'Table 41.2',
                      desc: 'Maximum disconnection times for final and distribution circuits',
                    },
                    { reg: 'Table 41.3', desc: 'Maximum Zs values for MCBs (0.4s disconnection)' },
                    {
                      reg: 'Table 41.4',
                      desc: 'Maximum Zs values for fuses to BS 88-2 and BS 88-3',
                    },
                    {
                      reg: 'Regulation 612.9',
                      desc: 'Earth fault loop impedance measurement requirements',
                    },
                    {
                      reg: 'GN3 Chapter 10',
                      desc: 'Earth fault loop impedance testing — methods and instruments',
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
        name="Earth Fault Loop Formulas"
        formula={earthingSystem === 'tn' ? 'Zs = Ze + (R1 + R2)' : 'RA × IΔn ≤ 50V'}
        variables={
          earthingSystem === 'tn'
            ? [
                { symbol: 'Zs', description: 'Earth fault loop impedance (Ω)' },
                { symbol: 'Ze', description: 'External earth fault loop impedance (Ω)' },
                { symbol: 'R1+R2', description: 'Line + CPC resistance to furthest point (Ω)' },
              ]
            : [
                { symbol: 'RA', description: 'Earth electrode resistance (Ω)' },
                { symbol: 'IΔn', description: 'RCD rated residual operating current (A)' },
                { symbol: '50V', description: 'Maximum permitted touch voltage' },
              ]
        }
      />
    </CalculatorCard>
  );
};

export default EarthFaultLoopCalculator;

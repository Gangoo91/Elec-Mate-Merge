import { copyToClipboard } from '@/utils/clipboard';
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
import {
  curveTypes,
  fuseTypes,
  getZsValue,
  getMcbRatings,
  getFuseRatings,
  getTableReference,
  EARTH_ELECTRODE_STABILITY_LIMIT_OHMS,
} from './zs-values/ZsValuesData';
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
  CalculatorEditorial,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { earthFaultLoopContent } from './content/earth-fault-loop';

type EarthingSystem = 'tn' | 'tt';
type MeasurementMode = 'calculated' | 'measured';
type DeviceType = 'mcb' | 'rcbo' | 'fuse';
type DisconnectionTime = '0.4' | '5';

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
  /** Table the max-Zs figure was read from — 41.2 / 41.3 / 41.4 depending on device + time. */
  tableRef: string;
  disconnectionTime: DisconnectionTime;
}

interface TTResult {
  type: 'tt';
  raValue: number;
  iDeltaNValue: number;
  product: number;
  touchVoltageOk: boolean;
  maxRa: number;
  /** True where the RA needed to satisfy 50 V exceeds the Table 41.5 NOTE 2 stability caveat. */
  electrodeAboveStabilityLimit: boolean;
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

  /**
   * Required disconnection time.
   *
   * WAS MISSING: the calculator only ever read the 0.4 s dataset, so Table 41.4
   * (fuses, 5 s — Reg 411.4.203) was unreachable and every fuse on a
   * distribution circuit was judged against the wrong column.
   *   0.4 s — Table 41.1 via Reg 411.3.2.2 (TN at 230 V): final circuits ≤ 63 A
   *           with one or more socket-outlets, and ≤ 32 A supplying only fixed
   *           connected current-using equipment.
   *   5 s   — Reg 411.3.2.3: a TN distribution circuit, and any circuit not
   *           covered by 411.3.2.2.
   * Table 41.3(a)/(b) print one circuit-breaker row valid for both times; only
   * Type D has a separate 5 s row.
   */
  const [disconnectionTime, setDisconnectionTime] = useState<DisconnectionTime>('0.4');

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);

  // Available ratings — derived from the table actually in use, so a rating that
  // has no tabulated Zs can never be offered.
  const availableRatings = useMemo(() => {
    if (deviceType === 'mcb' || deviceType === 'rcbo') {
      return curveType ? getMcbRatings(curveType, disconnectionTime) : [];
    }
    if (deviceType === 'fuse' && fuseType) {
      return getFuseRatings(fuseType, disconnectionTime);
    }
    return [];
  }, [deviceType, curveType, fuseType, disconnectionTime]);

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
      let tableRef = '';

      if (rating) {
        const ratingNum = parseInt(rating);
        if (deviceType === 'mcb' || deviceType === 'rcbo') {
          if (curveType) {
            maxZsValue = getZsValue(deviceType, ratingNum, curveType, disconnectionTime);
            deviceValid = maxZsValue !== null;
            const curveLabel = curveTypes[curveType as keyof typeof curveTypes] || curveType;
            deviceLabel = `${ratingNum}A ${deviceType.toUpperCase()} ${curveLabel}`;
            tableRef = getTableReference(deviceType, disconnectionTime);
          }
        } else if (deviceType === 'fuse' && fuseType) {
          maxZsValue = getZsValue(fuseType, ratingNum, undefined, disconnectionTime);
          deviceValid = maxZsValue !== null;
          const fuseLabel = fuseTypes[fuseType as keyof typeof fuseTypes] || fuseType;
          deviceLabel = `${ratingNum}A ${fuseLabel}`;
          // WAS WRONG: "Table 41.3" was hard-coded for every device. Table 41.3
          // (Reg 411.4.202) covers circuit-breakers only. Fuse limits are
          // Table 41.2 at 0.4 s (Reg 411.4.201) and Table 41.4 at 5 s
          // (Reg 411.4.203).
          tableRef = getTableReference(fuseType, disconnectionTime);
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
        tableRef,
        disconnectionTime,
      });
    } else {
      const raVal = parseFloat(ra);
      const iDeltaNVal = parseFloat(iDeltaN);
      if (isNaN(raVal) || isNaN(iDeltaNVal) || iDeltaNVal <= 0) return;

      const product = raVal * iDeltaNVal;
      // Reg 411.5.3(b): RA × IΔn ≤ 50 V. The arithmetic maximum is 50 / IΔn, but
      // for a 30 mA device that is 1667 Ω — and Table 41.5 NOTE 2 (asterisked
      // against the 30 mA and 100 mA rows) says the installation earth electrode
      // resistance "should be as low as practicable. A value exceeding 200 ohms
      // may not be stable. Refer to Regulation 542.2.4." So the arithmetic
      // ceiling is not a design target; flag anything above 200 Ω.
      const maxRa = 50 / iDeltaNVal;

      setResult({
        type: 'tt',
        raValue: raVal,
        iDeltaNValue: iDeltaNVal,
        product,
        touchVoltageOk: product <= 50,
        maxRa,
        electrodeAboveStabilityLimit: raVal > EARTH_ELECTRODE_STABILITY_LIMIT_OHMS,
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
    disconnectionTime,
  ]);

  const handleCopy = () => {
    if (!result) return;
    let text = '';
    if (result.type === 'tn') {
      text = `Earth Fault Loop Impedance\nZs: ${result.zsValue.toFixed(3)} Ω`;
      if (result.maxZsValue)
        text += `\nMax Zs (${result.tableRef}, ${result.disconnectionTime} s): ${result.maxZsValue} Ω`;
      if (result.testLimit80) text += `\n80% Test Limit: ${result.testLimit80.toFixed(3)} Ω`;
      text += `\nFault Current: ${result.faultCurrent.toFixed(0)} A`;
      text += `\nStatus: ${result.compliance80 ? 'PASS' : result.compliance100 ? 'MARGINAL' : 'FAIL'}`;
    } else {
      text = `TT System Verification\nRA: ${result.raValue} Ω\nIΔn: ${result.iDeltaNValue} A\nRA × IΔn: ${result.product.toFixed(1)} V\nReg 411.5.3(b): ${result.touchVoltageOk ? 'MET (≤ 50V)' : 'NOT MET (> 50V)'}\nReg 411.5.3(a) disconnection time: verify separately`;
      if (result.electrodeAboveStabilityLimit)
        text += `\nWarning: RA exceeds 200 Ω — Table 41.5 NOTE 2 / Reg 542.2.4`;
    }
    copyToClipboard(text).then((ok) => {
      if (ok) {
        setCopied(true);
        toast({ title: 'Copied to clipboard' });
        setTimeout(() => setCopied(false), 2000);
      }
    });
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

          {/* ── Required disconnection time (Reg 411.3.2.2 / 411.3.2.3) ── */}
          <CalculatorSection title="Required Disconnection Time">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  value: '0.4' as const,
                  label: '0.4 s — final circuit',
                  sub: 'Reg 411.3.2.2 / Table 41.1',
                },
                {
                  value: '5' as const,
                  label: '5 s — distribution circuit',
                  sub: 'Reg 411.3.2.3',
                },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setDisconnectionTime(opt.value);
                    setRating('');
                    setResult(null);
                  }}
                  className={cn(
                    'h-12 rounded-xl font-medium text-sm transition-all touch-manipulation flex-col gap-0.5',
                    disconnectionTime === opt.value
                      ? 'border-orange-500/50 bg-orange-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                  )}
                >
                  <span>{opt.label}</span>
                  <span className="text-[10px] font-normal text-white">{opt.sub}</span>
                </Button>
              ))}
            </div>
            <p className="text-xs text-white">
              0.4 s applies to a TN final circuit at 230 V rated up to 63 A with one or more
              socket-outlets, and up to 32 A supplying only fixed connected current-using equipment
              (Reg 411.3.2.2, Table 41.1). 5 s is permitted for a TN distribution circuit and any
              circuit not covered by 411.3.2.2 (Reg 411.3.2.3). In a TT system the corresponding
              allowance is 1 s (Reg 411.3.2.4).
            </p>
          </CalculatorSection>

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

            {/* Reg 411.4.204 — the residual path an RCBO also has. This tool
                checks the OVERCURRENT characteristic (Table 41.3) only. */}
            {deviceType === 'rcbo' && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                <Shield className="h-4 w-4 text-white mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  These figures are the <span className="font-medium">overcurrent</span>{' '}
                  characteristic of the RCBO (Table 41.3). Where the residual-current function is
                  what satisfies the disconnection time, Reg 411.4.204 permits the much higher
                  Table 41.5 values instead (30 mA → 1667 Ω, 100 mA → 500 Ω, 300 mA → 167 Ω,
                  500 mA → 100 Ω), provided an overcurrent device gives overload and fault-current
                  protection to Chapter 43.
                </p>
              </div>
            )}
          </CalculatorSection>
        </>
      ) : (
        <>
          {/* ── TT System Inputs ── */}
          <CalculatorSection title="TT System: RA × IΔn ≤ 50V">
            <CalculatorInputGrid columns={2}>
              {/* WAS WRONG: labelled "Earth Electrode Resistance". Reg 411.5.3(b)
                  defines RA as "the sum of the resistances of the earth electrode
                  AND the protective conductor connecting it to the
                  exposed-conductive-parts" — omitting the conductor under-states
                  RA and so over-states compliance. NOTE 2 to 411.5.3: where RA is
                  not known it may be replaced by Zs. */}
              <CalculatorInput
                label="RA (Electrode + Protective Conductor)"
                unit="Ω"
                inputMode="decimal"
                value={ra}
                onChange={setRa}
                placeholder="100"
                hint="Earth electrode + the protective conductor connecting it to the exposed-conductive-parts (Reg 411.5.3). Where RA is not known, Zs may be used."
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
              /* WAS WRONG: a green "Compliant" badge off RA × IΔn alone.
                 Reg 411.5.3 has TWO conditions — (a) the disconnection time
                 required by Reg 411.3.2.2 or 411.3.2.4, AND (b) RA × IΔn ≤ 50 V.
                 This tool only evaluates (b), so it must not declare compliance. */
              <ResultBadge
                status={
                  result.touchVoltageOk
                    ? result.electrodeAboveStabilityLimit
                      ? 'warning'
                      : 'pass'
                    : 'fail'
                }
                label={
                  result.touchVoltageOk
                    ? 'Reg 411.5.3(b) met (≤ 50V)'
                    : 'Reg 411.5.3(b) not met (> 50V)'
                }
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
                    label={`Max Zs (${result.tableRef}, ${result.disconnectionTime} s)`}
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
                    Select a protection device above to check compliance against the BS 7671 maximum
                    Zs tables — Table 41.2 (fuses, 0.4 s), Table 41.3 (circuit-breakers) or
                    Table 41.4 (fuses, 5 s).
                  </p>
                </div>
              )}

              {/* Device not found warning */}
              {!result.deviceValid && rating && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    {rating}A is not tabulated for the selected device at{' '}
                    {result.disconnectionTime} s. Table 41.2 (0.4 s) stops at 63 A for BS 88-2 and
                    BS 88-3, and 60 A for BS 3036 — the higher ratings appear only in Table 41.4
                    (5 s). Change the disconnection time or the device.
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
                {/* WAS WRONG: this was captioned "Max RA for this RCD", which for a
                    30 mA device reads as a permitted 1667 Ω electrode. That is the
                    arithmetic ceiling of Reg 411.5.3(b) only — Table 41.5 NOTE 2
                    caveats the 30 mA and 100 mA rows. */}
                <ResultValue
                  category={CAT}
                  label="RA at the 50 V limit (arithmetic)"
                  value={result.maxRa.toFixed(0)}
                  unit="Ω"
                  size="sm"
                />
              </ResultsGrid>

              {/* Reg 411.5.3(b) check */}
              <div
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border text-sm',
                  result.touchVoltageOk
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}
              >
                <div className="flex items-center gap-2">
                  {result.touchVoltageOk ? (
                    <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <span className="text-white font-medium">
                    Condition (b): RA × IΔn ≤ 50V
                  </span>
                </div>
                <span className="text-white shrink-0 ml-2">
                  {result.raValue} × {result.iDeltaNValue} = {result.product.toFixed(1)} V
                </span>
              </div>

              {/* Reg 411.5.3(a) — the condition this tool does NOT evaluate */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  <span className="font-medium">Condition (a) still to verify.</span> Reg 411.5.3
                  requires both: (a) disconnection within the time required by Reg 411.3.2.2 (Table
                  41.1 — 0.2 s for TT at 230 V) or Reg 411.3.2.4 (1 s for a distribution circuit),
                  and (b) RA × IΔn ≤ 50 V. Meeting (b) alone is not compliance. Table 41.5 satisfies
                  both where the loop impedance is within its values.
                </p>
              </div>

              {/* Table 41.5 NOTE 2 / Reg 542.2.4 — electrode stability */}
              {result.electrodeAboveStabilityLimit && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    RA is above 200 Ω. Table 41.5 NOTE 2 states the resistance of the installation
                    earth electrode should be as low as practicable and that a value exceeding
                    200 Ω may not be stable — see Reg 542.2.4, which requires the electrode type and
                    depth to be such that soil drying and freezing will not raise its resistance
                    above the required value. Passing the 50 V arithmetic on a 30 mA device does not
                    make a 200 Ω+ electrode a sound design.
                  </p>
                </div>
              )}
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
                            label: `Compliance check (${result.deviceLabel}, ${result.disconnectionTime} s)`,
                            formula: `Max Zs = ${result.maxZsValue} Ω (${result.tableRef}) | 80% limit = ${result.testLimit80?.toFixed(3)} Ω`,
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
                      description:
                        'RA = earth electrode + the protective conductor connecting it to the exposed-conductive-parts (Reg 411.5.3)',
                    },
                    {
                      label: 'Condition (b): touch voltage',
                      formula: `RA × IΔn = ${result.raValue} × ${result.iDeltaNValue}`,
                      value: `${result.product.toFixed(1)} V`,
                      description: 'Reg 411.5.3(b) — must not exceed 50 V',
                    },
                    {
                      label: 'RA at the 50 V limit',
                      formula: `RA = 50 / IΔn = 50 / ${result.iDeltaNValue}`,
                      value: `${result.maxRa.toFixed(0)} Ω`,
                      description:
                        result.maxRa > EARTH_ELECTRODE_STABILITY_LIMIT_OHMS
                          ? 'Arithmetic ceiling only — Table 41.5 NOTE 2: an electrode above 200 Ω may not be stable (Reg 542.2.4)'
                          : 'Arithmetic ceiling from Reg 411.5.3(b)',
                    },
                    {
                      label: 'Condition (a): disconnection time',
                      value:
                        'Not evaluated here — verify against Reg 411.3.2.2 (Table 41.1) or Reg 411.3.2.4',
                    },
                    {
                      label: 'Result',
                      value: result.touchVoltageOk
                        ? 'Reg 411.5.3(b) MET — touch voltage ≤ 50 V. Condition (a) must also be satisfied.'
                        : 'Reg 411.5.3(b) NOT MET — touch voltage exceeds 50 V; reduce RA or increase RCD sensitivity',
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
                    {/* WAS WRONG: this list said "Fixed equipment (not accessible):
                        ≤ 5 seconds". Reg 411.3.2.2(b) applies the Table 41.1 times
                        — 0.4 s for TN at 230 V — to final circuits rated up to 32 A
                        supplying ONLY fixed connected current-using equipment.
                        5 s comes from Reg 411.3.2.3 and is only for a TN
                        distribution circuit and a circuit not covered by 411.3.2.2
                        (e.g. a fixed-equipment final circuit above 32 A). "Not
                        accessible" is not a criterion anywhere in 411.3.2. */}
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">
                        Disconnection Times — TN at 230 V
                      </p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Final circuit up to 63 A with one or more socket-outlets: ≤ 0.4 s (Reg
                          411.3.2.2(a), Table 41.1)
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Final circuit up to 32 A supplying only fixed connected current-using
                          equipment: ≤ 0.4 s (Reg 411.3.2.2(b)) — not 5 s
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Distribution circuit, and any circuit not covered by 411.3.2.2: ≤ 5 s (Reg
                          411.3.2.3)
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          TT equivalents: 0.2 s from Table 41.1, and 1 s for the same cases under
                          Reg 411.3.2.4
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
                      <p className="text-sm text-white font-medium">Reg 411.5.3 — Both Conditions</p>
                      <p className="text-sm text-white">
                        Where an RCD provides fault protection in a TT system, Reg 411.5.3 requires
                        (a) disconnection within the time required by Reg 411.3.2.2 or 411.3.2.4,
                        and (b) RA × IΔn ≤ 50 V. RA is the sum of the resistances of the earth
                        electrode and the protective conductor connecting it to the
                        exposed-conductive-parts; IΔn is the RCD rated residual operating current.
                        Where RA is not known it may be replaced by Zs. Both conditions are met if
                        the loop impedance is within the Table 41.5 values.
                      </p>
                    </div>
                    {/* WAS MISLEADING: this list ranked 200–500 Ω+ as merely "Poor",
                        with no compliance consequence, next to a "Max RA" of 1667 Ω.
                        Table 41.5 NOTE 2 (asterisked on the 30 mA and 100 mA rows)
                        is explicit that above 200 Ω the electrode may not be stable. */}
                    <div className="space-y-2">
                      <p className="text-sm text-white font-medium">Earth Electrode Resistance</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Good: 10–50 Ω
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Acceptable: 50–200 Ω
                        </li>
                        <li className="flex items-start gap-2 text-sm text-white">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                            style={{ backgroundColor: config.gradientFrom }}
                          />
                          Above 200 Ω: Table 41.5 NOTE 2 — the resistance should be as low as
                          practicable, and a value exceeding 200 Ω may not be stable. See Reg
                          542.2.4 (soil drying and freezing must not raise it above the required
                          value). Improve the electrode rather than rely on the RA × IΔn arithmetic.
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Grounded standards + worked example */}
          <CalculatorEditorial content={earthFaultLoopContent} category={CAT} />
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
                {
                  symbol: 'RA',
                  // Reg 411.5.3(b) definition — not the electrode alone.
                  description:
                    'Earth electrode resistance + the protective conductor connecting it to the exposed-conductive-parts (Ω)',
                },
                { symbol: 'IΔn', description: 'RCD rated residual operating current (A)' },
                { symbol: '50V', description: 'Maximum permitted touch voltage — Reg 411.5.3(b)' },
              ]
        }
      />
    </CalculatorCard>
  );
};

export default EarthFaultLoopCalculator;

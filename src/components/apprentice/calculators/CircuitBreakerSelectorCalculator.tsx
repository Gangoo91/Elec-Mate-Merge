import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorFormula,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  FormulaReference,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { circuitBreakerSelectorContent } from './content/circuit-breaker-selector';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  getSuitableDevices,
  getMaxZs,
  getDeviceInfo,
  getRecommendedDeviceType,
  protectiveDevices,
} from '@/lib/calculators/bs7671-data/protectiveDevices';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const circuitTypes = [
  { value: 'lighting', label: 'Lighting' },
  { value: 'socket', label: 'Socket Outlet' },
  { value: 'cooker', label: 'Cooker' },
  { value: 'shower', label: 'Electric Shower' },
  { value: 'motor', label: 'Motor' },
  { value: 'ev', label: 'EV Charger' },
  { value: 'other', label: 'Other' },
];

const systemTypes = [
  { value: 'TN-S', label: 'TN-S' },
  { value: 'TN-C-S', label: 'TN-C-S (PME)' },
  { value: 'TT', label: 'TT' },
];

// Reg 411.3.4 applies only within domestic (household) premises, so the premises
// type has to be an input — it decides whether a lighting circuit must have RCD
// additional protection.
const premisesTypes = [
  { value: 'domestic', label: 'Domestic (household)' },
  { value: 'other', label: 'Commercial / industrial' },
];

const rcdRatings = [
  { value: '30', label: '30 mA' },
  { value: '100', label: '100 mA' },
  { value: '300', label: '300 mA' },
  { value: '500', label: '500 mA' },
];

/**
 * BS 7671:2018+A4:2026 Table 41.5 — maximum earth fault loop impedance (Zs) for
 * non-delayed and time-delayed 'S' type RCDs to BS EN 61008-1 and BS EN 61009-1
 * for U0 of 230 V (see Reg 411.5.3). Verified against the printed table.
 *
 * WAS WRONG: a TT circuit was given the overcurrent device's Table 41.3 value.
 * In a TT system fault protection is provided by the RCD, so Reg 411.5.3 applies
 * — Ra x IΔn ≤ 50 V, deemed satisfied when Zs is within Table 41.5.
 */
const RCD_MAX_ZS: Record<number, number> = {
  30: 1667,
  100: 500,
  300: 167,
  500: 100,
};

/**
 * Reg 411.4.4: Zs x Ia ≤ U0 x Cmin. NOTE to that regulation gives Cmin = 0.95 for
 * a supply under the ESQCR. Table 41.3's final column publishes exactly this for
 * ratings it does not tabulate — 230 x 0.95/(5 In) for Type B, /(10 In) for Type C
 * and /(20 In) for Type D, Ia being the upper instantaneous threshold of the
 * BS EN 60898 curve.
 *
 * WAS WRONG: getMaxZs() returns 0 for any rating with no Table 41.3 row (1, 2, 4,
 * 8 and 13 A are all standard MCB ratings), the Zs check was then skipped and the
 * result still reported PASS. There is no "no limit" case in BS 7671.
 */
const U0 = 230;
const CMIN = 0.95;
const CURVE_IA_MULTIPLE: Record<string, number> = { B: 5, C: 10, D: 20 };

/**
 * BS 7671 Appendix 3: where the loop impedance is measured at ambient temperature,
 * the requirements of Reg 411.4.4 or 411.5.4 "are considered to be met" when
 * Zs(m) ≤ 0.8 x U0 x Cmin / Ia, the 0.8 being a factor for the rise in conductor
 * resistance with load current. Appendix 3 also says "other methods [of correcting
 * for temperature] are not precluded".
 *
 * WAS WRONG: anything above 0.8 x Zs was reported as "NON-COMPLIANT", and the
 * warning branch below it was unreachable dead code. Exceeding 0.8 x Zs only means
 * the Appendix 3 shortcut is not satisfied — the actual limit is the tabulated Zs
 * with the conductors at operating temperature (Table 41.3 NOTE 2). That band is a
 * warning, not a fail.
 */
const AMBIENT_TEMP_FACTOR = 0.8;

type CheckStatus = 'pass' | 'warning' | 'fail' | 'info';

interface ComplianceCheck {
  label: string;
  status: CheckStatus;
  detail: string;
}

interface SelectorResult {
  recommendedKey: string;
  recommendedLabel: string;
  rating: number;
  curveType: string;
  breakingCapacity: number;
  maxZs: number;
  zsBasis: string;
  rcdTypeGuidance: string;
  rcdReason: string;
  applications: string[];
  advantages: string[];
  considerations: string[];
  alternatives: Array<{
    key: string;
    label: string;
    rating: number;
    maxZs: number;
    maxZsBasis: string;
    breakingCapacity: number;
  }>;
  needsRcd: boolean;
  checks: ComplianceCheck[];
  status: 'pass' | 'warning' | 'fail';
  statusLabel: string;
}

const formatDeviceLabel = (key: string, rating: number): string => {
  const device = protectiveDevices[key];
  if (!device) return `${rating}A`;
  const typeLabel = device.type.toUpperCase();
  const curveLabel = device.curve ? ` Type ${device.curve}` : '';
  return `${rating}A${curveLabel} ${typeLabel}`;
};

/**
 * Resolve the maximum Zs and say where the number comes from.
 *
 * Table 41.3's printed title covers BOTH the 0.4 s disconnection time of
 * Reg 411.3.2.2 and the 5 s time of Reg 411.3.2.3, and it covers only
 * circuit-breakers to BS EN 60898 and the overcurrent characteristics of RCBOs to
 * BS EN 61009-1. Table 41.2 is fuses at 0.4 s; the 5 s fuse values are Table 41.4.
 * An MCCB is a BS EN 60947-2 device and has no BS 7671 Zs table at all.
 */
const resolveMaxZs = (
  deviceKey: string,
  rating: number,
  useRcdLimit: boolean,
  iDeltaN: number
): { limit: number; basis: string; rcdBased: boolean } => {
  const device = protectiveDevices[deviceKey];

  if (useRcdLimit) {
    return {
      limit: RCD_MAX_ZS[iDeltaN] ?? 0,
      basis: `Table 41.5 — ${iDeltaN} mA RCD (Reg 411.5.3, Ra × IΔn ≤ 50 V)`,
      rcdBased: true,
    };
  }

  const isMccb = device?.type === 'mccb';
  const tabulated = isMccb ? 0 : getMaxZs(deviceKey, rating);

  if (tabulated > 0) {
    return {
      limit: tabulated,
      basis:
        device?.type === 'bs88'
          ? 'Table 41.2 — fuses, 0.4 s (Table 41.4 gives the 5 s values)'
          : 'Table 41.3 — 0.4 s (Reg 411.3.2.2) and 5 s (Reg 411.3.2.3)',
      rcdBased: false,
    };
  }

  const multiple = device?.curve ? CURVE_IA_MULTIPLE[device.curve] : undefined;
  if (multiple) {
    return {
      limit: (U0 * CMIN) / (multiple * rating),
      basis: `Reg 411.4.4 — Zs ≤ U0 × Cmin / Ia with Ia = ${multiple} × In (this rating is not tabulated in Table 41.3)`,
      rcdBased: false,
    };
  }

  return {
    limit: 0,
    basis: isMccb
      ? 'No BS 7671 table — Table 41.3 covers BS EN 60898 circuit-breakers and BS EN 61009-1 RCBOs only. For a BS EN 60947-2 MCCB take Ia from the manufacturer and apply Reg 411.4.4.'
      : 'This rating is not tabulated — take Ia from the manufacturer and apply Reg 411.4.4.',
    rcdBased: false,
  };
};

const CircuitBreakerSelectorCalculator = () => {
  const [circuitType, setCircuitType] = useState('socket');
  const [premises, setPremises] = useState('domestic');
  const [designCurrent, setDesignCurrent] = useState('');
  const [cableIz, setCableIz] = useState('');
  const [systemType, setSystemType] = useState('TN-C-S');
  const [prospectiveFault, setProspectiveFault] = useState('');
  const [measuredZs, setMeasuredZs] = useState('');
  const [rcdRating, setRcdRating] = useState('30');
  const [needsRcd, setNeedsRcd] = useState(false);
  const [result, setResult] = useState<SelectorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = () => {
    const ib = parseFloat(designCurrent);
    if (!ib || ib <= 0) return;

    setError(null);

    const izVal = parseFloat(cableIz);
    const ipfVal = parseFloat(prospectiveFault);
    const measuredZsVal = parseFloat(measuredZs);
    const iDeltaN = parseInt(rcdRating, 10);
    const isDomestic = premises === 'domestic';

    // Which regulation forces RCD additional protection on this circuit.
    // WAS WRONG: 'shower' and domestic 'lighting' were both missing.
    const rcdReasons: string[] = [];
    if (circuitType === 'socket') rcdReasons.push('socket-outlets (Reg 411.3.3)');
    if (circuitType === 'ev') rcdReasons.push('EV charging point (Reg 722.531.3.101)');
    // Reg 701.411.3.3 — additional protection by RCD for ALL low voltage circuits
    // in a location containing a bath or shower.
    if (circuitType === 'shower')
      rcdReasons.push('location containing a bath or shower (Reg 701.411.3.3)');
    // Reg 411.3.4 — within domestic (household) premises, AC final circuits
    // supplying luminaires.
    if (circuitType === 'lighting' && isDomestic)
      rcdReasons.push('domestic luminaire final circuit (Reg 411.3.4)');
    // In a TT system fault protection is generally by RCD (Reg 411.5.2/411.5.3).
    if (systemType === 'TT') rcdReasons.push('TT system fault protection (Reg 411.5.3)');
    if (needsRcd && rcdReasons.length === 0) rcdReasons.push('selected by the designer');

    const rcdRequired = rcdReasons.length > 0 || needsRcd;

    // Get recommended device type
    const recommendedKey = getRecommendedDeviceType(ib, circuitType, 230, rcdRequired);
    const recommendedDevice = getDeviceInfo(recommendedKey);

    // Get all suitable devices
    const suitableDevices = getSuitableDevices(ib);

    // Find recommended rating
    const recommendedEntry = suitableDevices.find((d) => d.deviceType === recommendedKey);

    // WAS WRONG: `rating = recommendedEntry?.recommended ?? Math.ceil(ib)` invented a
    // non-standard rating when Ib exceeded every catalogued device. In is the device's
    // rated current from its product standard's preferred values — a calculator must
    // not synthesise one.
    if (!recommendedEntry || !recommendedDevice) {
      setResult(null);
      setError(
        `No standard device rating in this tool covers a design current of ${ib} A. Select a device from the manufacturer's range and verify Reg 433.1.1 by hand.`
      );
      return;
    }

    const rating = recommendedEntry.recommended;
    const zsInfo = resolveMaxZs(
      recommendedKey,
      rating,
      systemType === 'TT' && rcdRequired,
      iDeltaN
    );
    const maxZs = zsInfo.limit;

    const checks: ComplianceCheck[] = [];

    // Reg 433.1.1(a) — In ≥ Ib
    checks.push({
      label: 'Overload (a) — In ≥ Ib',
      status: 'pass',
      detail: `In ${rating} A ≥ Ib ${ib} A (Reg 433.1.1(a))`,
    });

    // Reg 433.1.1(b) — In ≤ Iz.
    // WAS MISSING ENTIRELY: the calculator sized on Ib alone and always reported
    // "Suitable Device Found". Iz is a required half of Ib ≤ In ≤ Iz.
    if (izVal > 0) {
      const overloadOk = rating <= izVal;
      checks.push({
        label: 'Overload (b) — In ≤ Iz',
        status: overloadOk ? 'pass' : 'fail',
        detail: overloadOk
          ? `In ${rating} A ≤ Iz ${izVal} A (Reg 433.1.1(b))`
          : `In ${rating} A exceeds the cable Iz of ${izVal} A — Reg 433.1.1(b) is not satisfied. Increase the cable size or reduce In.`,
      });
      // Reg 433.1.201: for a gG fuse to BS 88-2/BS 88-3, a circuit-breaker to
      // BS EN 60898 or BS EN 60947-2, or an RCBO to BS EN 61009-1, compliance with
      // (a) and (b) also results in compliance with (c).
      checks.push({
        label: 'Overload (c) — I2 ≤ 1.45 Iz',
        status: overloadOk ? 'pass' : 'info',
        detail: overloadOk
          ? 'Satisfied via Reg 433.1.201 — for this device type, meeting (a) and (b) also meets (c).'
          : 'Reg 433.1.201 gives (c) only once (a) and (b) are both met.',
      });
    } else {
      checks.push({
        label: 'Overload (b) — In ≤ Iz',
        status: 'warning',
        detail:
          'Not verified — enter the derated cable capacity Iz. Reg 433.1.1 requires In ≤ Iz as well as In ≥ Ib.',
      });
    }

    // Earth fault loop impedance
    if (maxZs <= 0) {
      checks.push({
        label: 'Earth fault loop impedance',
        status: 'warning',
        detail: `No maximum Zs could be established. ${zsInfo.basis}`,
      });
    } else if (measuredZsVal > 0) {
      // The Appendix 3 0.8 factor corrects a cold measurement for conductor
      // temperature rise. It does not apply to a Table 41.5 RCD limit, which is
      // dominated by the earth electrode, so compare directly in that case.
      const screeningLimit = zsInfo.rcdBased ? maxZs : maxZs * AMBIENT_TEMP_FACTOR;
      if (measuredZsVal <= screeningLimit) {
        checks.push({
          label: 'Earth fault loop impedance',
          status: 'pass',
          detail: zsInfo.rcdBased
            ? `Measured Zs ${measuredZsVal} Ω ≤ ${maxZs} Ω (${zsInfo.basis}).`
            : `Measured Zs ${measuredZsVal} Ω ≤ ${screeningLimit.toFixed(2)} Ω, the 0.8 × Zs ambient-temperature value of Appendix 3. Limit ${maxZs.toFixed(2)} Ω from ${zsInfo.basis}.`,
        });
      } else if (measuredZsVal <= maxZs) {
        checks.push({
          label: 'Earth fault loop impedance',
          status: 'warning',
          detail: `Measured Zs ${measuredZsVal} Ω is within the ${maxZs.toFixed(2)} Ω limit but above the 0.8 × Zs value of ${screeningLimit.toFixed(2)} Ω. Appendix 3's shortcut is not met — correct the reading to conductor operating temperature (Table 41.3 NOTE 2) before deciding. Not proven non-compliant.`,
        });
      } else {
        checks.push({
          label: 'Earth fault loop impedance',
          status: 'fail',
          detail: `Measured Zs ${measuredZsVal} Ω exceeds the maximum of ${maxZs.toFixed(2)} Ω (${zsInfo.basis}). Disconnection within the required time is not achieved.`,
        });
      }
    } else {
      checks.push({
        label: 'Earth fault loop impedance',
        status: 'warning',
        detail: `Not verified — no measured Zs entered. Maximum is ${maxZs.toFixed(2)} Ω (${zsInfo.basis}).`,
      });
    }

    // Breaking capacity vs prospective fault current.
    // Reg 434.1 requires the prospective fault current to be determined at every
    // relevant point; Reg 432.1 requires the device to break any overcurrent up to
    // and including it, except where Reg 434.5.1 back-up protection is used.
    // WAS MISSING: breaking capacity was displayed but never compared with anything.
    const breakingCapacity = recommendedDevice.characteristics.breakingCapacity ?? 0;
    if (ipfVal > 0) {
      const bcOk = breakingCapacity >= ipfVal;
      checks.push({
        label: 'Breaking capacity',
        status: bcOk ? 'pass' : 'fail',
        detail: bcOk
          ? `${breakingCapacity} kA ≥ prospective fault current ${ipfVal} kA (Reg 432.1). Confirm the figure against the manufacturer's Icn/Icu.`
          : `${breakingCapacity} kA is below the prospective fault current of ${ipfVal} kA. Reg 432.1 is not met unless back-up protection to Reg 434.5.1 is provided.`,
      });
    } else {
      checks.push({
        label: 'Breaking capacity',
        status: 'warning',
        detail: `Not verified — enter the prospective fault current (Reg 434.1). ${breakingCapacity} kA is a typical figure for this device family, not a manufacturer's rating.`,
      });
    }

    // RCD additional protection
    checks.push({
      label: 'RCD additional protection',
      status: rcdRequired ? 'pass' : 'info',
      detail: rcdRequired
        ? `Required: ${rcdReasons.join('; ')}. IΔn ${iDeltaN} mA.`
        : 'No RCD forced by circuit type, premises or earthing system. Check Part 7 for the location.',
    });

    // RCD type — Reg 531.3.3 selects between Type AC, A, F and B by the DC content of
    // the load current. Reg 722.531.3.101(b)/(c) additionally requires DC fault
    // detection for EV charging.
    const rcdTypeGuidance =
      circuitType === 'ev'
        ? 'Type A minimum, plus DC residual detection — either an RCD Type B or a Type A with an RDC-DD to BS IEC 62955 (Reg 722.531.3.101(b)/(c)).'
        : 'Reg 531.3.3: Type AC only where the load current is known to contain no DC components. Choose Type A, F or B where pulsating or smooth DC is present (electronics, inverters, LED drivers, VSDs).';

    // Build alternatives (other suitable devices, excluding the recommended one)
    const alternatives = suitableDevices
      .filter((d) => d.deviceType !== recommendedKey)
      .slice(0, 4)
      .map((d) => {
        const info = getDeviceInfo(d.deviceType);
        const altZs = resolveMaxZs(
          d.deviceType,
          d.recommended,
          systemType === 'TT' && rcdRequired,
          iDeltaN
        );
        return {
          key: d.deviceType,
          label: formatDeviceLabel(d.deviceType, d.recommended),
          rating: d.recommended,
          maxZs: altZs.limit,
          maxZsBasis: altZs.basis,
          breakingCapacity: info?.characteristics.breakingCapacity ?? 0,
        };
      });

    const hasFail = checks.some((c) => c.status === 'fail');
    const hasWarning = checks.some((c) => c.status === 'warning');
    const status: 'pass' | 'warning' | 'fail' = hasFail ? 'fail' : hasWarning ? 'warning' : 'pass';
    const statusLabel = hasFail
      ? 'Not Compliant — See Checks Below'
      : hasWarning
        ? 'Checks Incomplete — Verify Before Use'
        : 'Device Meets Every Check Entered';

    setResult({
      recommendedKey,
      recommendedLabel: formatDeviceLabel(recommendedKey, rating),
      rating,
      curveType: recommendedDevice.curve ?? 'N/A',
      breakingCapacity,
      maxZs,
      zsBasis: zsInfo.basis,
      rcdTypeGuidance,
      rcdReason: rcdReasons.join('; '),
      applications: recommendedDevice.characteristics.applications ?? [],
      advantages: recommendedDevice.characteristics.advantages ?? [],
      considerations: recommendedDevice.characteristics.considerations ?? [],
      alternatives,
      needsRcd: rcdRequired,
      checks,
      status,
      statusLabel,
    });
  };

  const reset = () => {
    setCircuitType('socket');
    setPremises('domestic');
    setDesignCurrent('');
    setCableIz('');
    setSystemType('TN-C-S');
    setProspectiveFault('');
    setMeasuredZs('');
    setRcdRating('30');
    setNeedsRcd(false);
    setResult(null);
    setError(null);
  };

  const checkDotClass = (status: CheckStatus) =>
    status === 'pass'
      ? 'bg-green-400'
      : status === 'fail'
        ? 'bg-red-400'
        : status === 'warning'
          ? 'bg-amber-400'
          : 'bg-white/40';

  return (
    <CalculatorCard
      category={CAT}
      title="Circuit Breaker Selector"
      description="Find the right protective device for your circuit — BS 7671 compliant"
    >
      <CalculatorPanes
        form={
          <>
            <CalculatorSelect
              label="Circuit Type"
              value={circuitType}
              onChange={setCircuitType}
              options={circuitTypes}
            />

            <CalculatorSelect
              label="Premises"
              value={premises}
              onChange={setPremises}
              options={premisesTypes}
              hint="Reg 411.3.4 applies to luminaire circuits in domestic premises only"
            />

            <CalculatorInput
              label="Design Current (Ib)"
              unit="A"
              type="text"
              inputMode="decimal"
              value={designCurrent}
              onChange={setDesignCurrent}
              placeholder="e.g. 26"
            />

            <CalculatorInput
              label="Cable Capacity (Iz)"
              unit="A"
              type="text"
              inputMode="decimal"
              value={cableIz}
              onChange={setCableIz}
              placeholder="Derated Iz of the cable"
              hint="Reg 433.1.1(b) needs In ≤ Iz — leave blank and the overload check is incomplete"
            />

            <CalculatorSelect
              label="System Type"
              value={systemType}
              onChange={setSystemType}
              options={systemTypes}
            />

            <CalculatorInput
              label="Prospective Fault Current"
              unit="kA"
              type="text"
              inputMode="decimal"
              value={prospectiveFault}
              onChange={setProspectiveFault}
              placeholder="Optional — Ipf at the device"
              hint="Reg 434.1 / 432.1 — breaking capacity must not be less than Ipf"
            />

            <CalculatorInput
              label="Measured Zs"
              unit="Ω"
              type="text"
              inputMode="decimal"
              value={measuredZs}
              onChange={setMeasuredZs}
              placeholder="Optional — for compliance check"
              hint="Leave blank to skip Zs check"
            />

            <CalculatorSelect
              label="RCD Rated Residual Current (IΔn)"
              value={rcdRating}
              onChange={setRcdRating}
              options={rcdRatings}
              hint="Sets the Table 41.5 limit on a TT system"
            />

            {/* RCD toggle */}
            <button
              onClick={() => setNeedsRcd(!needsRcd)}
              className="flex items-center gap-3 w-full h-11 touch-manipulation"
            >
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0',
                  needsRcd ? 'border-transparent' : 'border-white/30 bg-transparent'
                )}
                style={
                  needsRcd
                    ? { background: config.gradientFrom, borderColor: config.gradientFrom }
                    : {}
                }
              >
                {needsRcd && (
                  <svg className="w-3 h-3 text-black" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-white">Circuit requires RCD protection</span>
            </button>

            <CalculatorActions
              category={CAT}
              onCalculate={calculate}
              onReset={reset}
              calculateLabel="Find Device"
              showReset
            />
          </>
        }
        result={
          <>
            {error && (
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5">
                <p className="text-sm text-white">{error}</p>
              </div>
            )}

            {result && (
              <div className="space-y-4 animate-fade-in">
                <ResultBadge status={result.status} label={result.statusLabel} />

                <ResultHeadline
                  label="Recommended device"
                  value={result.recommendedLabel}
                  caption={result.zsBasis}
                />

                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Rating"
                    value={`${result.rating}A`}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Trip Curve"
                    value={result.curveType === 'N/A' ? '—' : `Type ${result.curveType}`}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Breaking Capacity"
                    value={`${result.breakingCapacity}`}
                    unit="kA"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Max Zs"
                    value={result.maxZs > 0 ? result.maxZs.toFixed(2) : '—'}
                    unit={result.maxZs > 0 ? 'Ω' : ''}
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                <p className="text-xs text-white">{result.zsBasis}</p>

                {/* Compliance checks — every condition of Reg 433.1.1 plus 411 and 432.1 */}
                <CalculatorSection title="Compliance Checks">
                  <div className="space-y-2">
                    {result.checks.map((check) => (
                      <div key={check.label} className="flex items-start gap-2">
                        <span
                          className={cn(
                            'mt-1.5 w-1.5 h-1.5 rounded-full shrink-0',
                            checkDotClass(check.status)
                          )}
                        />
                        <div>
                          <p className="text-sm text-white font-medium">{check.label}</p>
                          <p className="text-sm text-white">{check.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CalculatorSection>

                {/* RCD selection — curve type is not the same thing as RCD type */}
                <CalculatorSection title="RCD Selection">
                  <p className="text-sm text-white">{result.rcdTypeGuidance}</p>
                  <p className="text-sm text-white mt-2">
                    The Type B / C / D above is the circuit-breaker's magnetic trip curve to BS EN
                    60898. It is a different thing from an RCD Type AC / A / F / B, which describes
                    the residual current waveform the RCD responds to.
                  </p>
                </CalculatorSection>

                <CalculatorDivider category={CAT} />

                {/* Recommended Device Detail */}
                <CalculatorSection title="Recommended Device">
                  <div className="space-y-3">
                    {result.applications.length > 0 && (
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Applications</p>
                        <ul className="space-y-1">
                          {result.applications.map((app, i) => (
                            <li key={i} className="text-sm text-white flex items-start gap-2">
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: config.gradientFrom }}
                              />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.advantages.length > 0 && (
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Advantages</p>
                        <ul className="space-y-1">
                          {result.advantages.map((adv, i) => (
                            <li key={i} className="text-sm text-white flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.considerations.length > 0 && (
                      <div>
                        <p className="text-sm text-white font-medium mb-1">Considerations</p>
                        <ul className="space-y-1">
                          {result.considerations.map((con, i) => (
                            <li key={i} className="text-sm text-white flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CalculatorSection>

                {/* Alternative Options */}
                {result.alternatives.length > 0 && (
                  <CalculatorSection title="Alternative Options">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.alternatives.map((alt) => (
                        <div
                          key={alt.key}
                          className="p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <p className="text-sm text-white font-medium">{alt.label}</p>
                          <div className="flex gap-3 mt-1 text-xs text-white">
                            <span>{alt.breakingCapacity}kA</span>
                            <span>
                              {alt.maxZs > 0
                                ? `Max Zs: ${alt.maxZs.toFixed(2)}Ω`
                                : 'Max Zs: manufacturer Ia'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CalculatorSection>
                )}

                <CalculatorDivider category={CAT} />

                <CalculatorFormula
                  category={CAT}
                  title="Selection Logic"
                  steps={[
                    {
                      label: 'Design current',
                      formula: `Ib = ${designCurrent}A`,
                      result: `${designCurrent}A`,
                    },
                    {
                      label: 'Overload (a) In ≥ Ib',
                      formula: `In ≥ ${designCurrent}A`,
                      result: `${result.rating}A selected`,
                    },
                    ...(cableIz
                      ? [
                          {
                            label: 'Overload (b) In ≤ Iz',
                            formula: `${result.rating}A ≤ ${cableIz}A`,
                            result:
                              result.rating <= parseFloat(cableIz) ? 'Satisfied' : 'Not satisfied',
                          },
                        ]
                      : []),
                    {
                      label: 'Device type',
                      formula: `${circuitType} circuit${result.needsRcd ? ' + RCD required' : ''}`,
                      result: result.recommendedLabel,
                    },
                    ...(result.maxZs > 0
                      ? [
                          {
                            label: 'Maximum Zs',
                            formula: result.zsBasis,
                            result: `${result.maxZs.toFixed(2)}Ω`,
                          },
                        ]
                      : []),
                    ...(prospectiveFault
                      ? [
                          {
                            label: 'Breaking capacity ≥ Ipf',
                            formula: `${result.breakingCapacity}kA ≥ ${prospectiveFault}kA`,
                            result:
                              result.breakingCapacity >= parseFloat(prospectiveFault)
                                ? 'Satisfied'
                                : 'Not satisfied',
                          },
                        ]
                      : []),
                  ]}
                />

                {/* BS 7671 References */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
                    <span>BS 7671 References</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 433.1.1</span> — Overload: (a) In ≥
                        Ib, (b) In ≤ Iz, (c) I2 ≤ 1.45 × Iz. Reg 433.1.201 gives (c) automatically
                        once (a) and (b) are met for BS 88 fuses, BS EN 60898 / BS EN 60947-2
                        circuit-breakers and BS EN 61009-1 RCBOs.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Table 41.2 / Table 41.4</span> — Maximum Zs
                        for fuses, 0.4 s and 5 s respectively.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Table 41.3</span> — Maximum Zs for
                        circuit-breakers to BS EN 60898 and the overcurrent characteristics of RCBOs
                        to BS EN 61009-1, covering both the 0.4 s time of Reg 411.3.2.2 and the 5 s
                        time of Reg 411.3.2.3.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Table 41.5 / Reg 411.5.3</span> — Maximum Zs
                        on a TT system where the RCD provides fault protection (Ra × IΔn ≤ 50 V).
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 411.4.4</span> — Zs × Ia ≤ U0 ×
                        Cmin, with Cmin = 0.95 for an ESQCR supply. Use it wherever the rating or
                        device is not tabulated, including any BS EN 60947-2 MCCB.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Appendix 3</span> — a loop impedance measured
                        at ambient temperature satisfies Reg 411.4.4 when Zs(m) ≤ 0.8 × U0 × Cmin /
                        Ia. Other temperature-correction methods are not precluded.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 434.1 / 432.1</span> — Determine
                        the prospective fault current; the device must break any overcurrent up to
                        it, except where back-up protection to Reg 434.5.1 is provided.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">
                          Regulations 411.3.3, 411.3.4, 701.411.3.3
                        </span>{' '}
                        — 30 mA RCD additional protection for socket-outlets, domestic luminaire
                        circuits and every low voltage circuit in a location containing a bath or
                        shower.
                      </p>
                      <p className="text-sm text-white">
                        <span className="font-medium">Regulation 531.3.3 / 722.531.3.101</span> —
                        RCD type selection, and DC fault detection for EV charging points.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* What the Curves Mean */}
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2 text-sm font-medium text-white hover:text-white transition-colors touch-manipulation">
                    <span>What the Curves Mean</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <p className="text-sm text-white">
                        Circuit-breaker trip curves to BS EN 60898 — not to be confused with RCD
                        Types AC, A, F and B.
                      </p>
                      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                        <p className="text-white font-medium">Curve B</p>
                        <p className="text-white">Trips at 3–5 × In — domestic, resistive loads</p>
                        <p className="text-white font-medium">Curve C</p>
                        <p className="text-white">
                          Trips at 5–10 × In — motors, fluorescent lighting
                        </p>
                        <p className="text-white font-medium">Curve D</p>
                        <p className="text-white">
                          Trips at 10–20 × In — transformers, welding, high inrush
                        </p>
                      </div>
                      <p className="text-sm text-white">
                        Table 41.3 and Reg 411.4.4 use the upper end of each band (5, 10 and 20 ×
                        In) as Ia.
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            <FormulaReference
              category={CAT}
              name="Overload coordination (Reg 433.1.1)"
              formula="Ib ≤ In ≤ Iz"
            />
          </>
        }
        footer={<CalculatorEditorial content={circuitBreakerSelectorContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default CircuitBreakerSelectorCalculator;

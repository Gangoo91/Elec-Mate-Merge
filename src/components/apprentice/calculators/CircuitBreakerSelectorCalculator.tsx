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
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
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

interface SelectorResult {
  recommendedKey: string;
  recommendedLabel: string;
  rating: number;
  curveType: string;
  breakingCapacity: number;
  maxZs: number;
  zsCompliant: boolean | null;
  applications: string[];
  advantages: string[];
  considerations: string[];
  alternatives: Array<{
    key: string;
    label: string;
    rating: number;
    maxZs: number;
    breakingCapacity: number;
  }>;
  needsRcd: boolean;
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

const CircuitBreakerSelectorCalculator = () => {
  const [circuitType, setCircuitType] = useState('socket');
  const [designCurrent, setDesignCurrent] = useState('');
  const [systemType, setSystemType] = useState('TN-C-S');
  const [measuredZs, setMeasuredZs] = useState('');
  const [needsRcd, setNeedsRcd] = useState(false);
  const [result, setResult] = useState<SelectorResult | null>(null);

  const calculate = () => {
    const ib = parseFloat(designCurrent);
    if (!ib || ib <= 0) return;

    // Determine if RCD is needed based on circuit type or user toggle
    const rcdRequired =
      needsRcd || circuitType === 'socket' || circuitType === 'ev' || systemType === 'TT';

    // Get recommended device type
    const recommendedKey = getRecommendedDeviceType(ib, circuitType, 230, rcdRequired);
    const recommendedDevice = getDeviceInfo(recommendedKey);

    // Get all suitable devices
    const suitableDevices = getSuitableDevices(ib);

    // Find recommended rating
    const recommendedEntry = suitableDevices.find((d) => d.deviceType === recommendedKey);
    const rating = recommendedEntry?.recommended ?? Math.ceil(ib);

    // Max Zs for recommended device
    const maxZs = getMaxZs(recommendedKey, rating);

    // Zs compliance check
    const measuredZsVal = parseFloat(measuredZs);
    let zsCompliant: boolean | null = null;
    if (measuredZsVal && maxZs > 0) {
      zsCompliant = measuredZsVal <= maxZs * 0.8; // 80% rule for temperature correction
    }

    // Determine status
    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let statusLabel = 'Suitable Device Found';
    if (zsCompliant === false) {
      status = 'fail';
      statusLabel = 'Zs Exceeds Maximum — Choose Different Device';
    } else if (
      measuredZsVal &&
      maxZs > 0 &&
      measuredZsVal <= maxZs &&
      measuredZsVal > maxZs * 0.8
    ) {
      status = 'warning';
      statusLabel = 'Zs Close to Maximum — Verify on Site';
    }

    // Build alternatives (other suitable devices, excluding the recommended one)
    const alternatives = suitableDevices
      .filter((d) => d.deviceType !== recommendedKey)
      .slice(0, 4)
      .map((d) => {
        const info = getDeviceInfo(d.deviceType);
        return {
          key: d.deviceType,
          label: formatDeviceLabel(d.deviceType, d.recommended),
          rating: d.recommended,
          maxZs: getMaxZs(d.deviceType, d.recommended),
          breakingCapacity: info?.characteristics.breakingCapacity ?? 0,
        };
      });

    setResult({
      recommendedKey,
      recommendedLabel: formatDeviceLabel(recommendedKey, rating),
      rating,
      curveType: recommendedDevice?.curve ?? 'N/A',
      breakingCapacity: recommendedDevice?.characteristics.breakingCapacity ?? 0,
      maxZs,
      zsCompliant,
      applications: recommendedDevice?.characteristics.applications ?? [],
      advantages: recommendedDevice?.characteristics.advantages ?? [],
      considerations: recommendedDevice?.characteristics.considerations ?? [],
      alternatives,
      needsRcd: rcdRequired,
      status,
      statusLabel,
    });
  };

  const reset = () => {
    setCircuitType('socket');
    setDesignCurrent('');
    setSystemType('TN-C-S');
    setMeasuredZs('');
    setNeedsRcd(false);
    setResult(null);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Circuit Breaker Selector"
      description="Find the right protective device for your circuit — BS 7671 compliant"
    >
      <CalculatorSelect
        label="Circuit Type"
        value={circuitType}
        onChange={setCircuitType}
        options={circuitTypes}
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

      <CalculatorSelect
        label="System Type"
        value={systemType}
        onChange={setSystemType}
        options={systemTypes}
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
            needsRcd ? { background: config.gradientFrom, borderColor: config.gradientFrom } : {}
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

      {result && (
        <div className="space-y-4 animate-fade-in">
          <ResultBadge status={result.status} label={result.statusLabel} />

          {/* Hero device */}
          <p
            className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            }}
          >
            {result.recommendedLabel}
          </p>

          <ResultsGrid columns={2}>
            <ResultValue label="Rating" value={`${result.rating}A`} category={CAT} size="sm" />
            <ResultValue
              label="Curve Type"
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

          {/* Zs compliance */}
          {result.zsCompliant !== null && (
            <div
              className={cn(
                'p-3 rounded-xl border text-sm',
                result.zsCompliant
                  ? 'border-green-500/20 bg-green-500/5'
                  : 'border-red-500/20 bg-red-500/5'
              )}
            >
              <p className="text-white font-medium">
                {result.zsCompliant
                  ? `Measured Zs (${measuredZs}Ω) is within the 80% maximum (${(result.maxZs * 0.8).toFixed(2)}Ω) — COMPLIANT`
                  : `Measured Zs (${measuredZs}Ω) exceeds 80% of maximum Zs (${(result.maxZs * 0.8).toFixed(2)}Ω) — NON-COMPLIANT`}
              </p>
            </div>
          )}

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
                  <div key={alt.key} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-sm text-white font-medium">{alt.label}</p>
                    <div className="flex gap-3 mt-1 text-xs text-white">
                      <span>{alt.breakingCapacity}kA</span>
                      {alt.maxZs > 0 && <span>Max Zs: {alt.maxZs.toFixed(2)}Ω</span>}
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
                label: 'Minimum rating (In ≥ Ib)',
                formula: `In ≥ ${designCurrent}A`,
                result: `${result.rating}A selected`,
              },
              {
                label: 'Device type',
                formula: `${circuitType} circuit${result.needsRcd ? ' + RCD required' : ''}`,
                result: result.recommendedLabel,
              },
              ...(result.maxZs > 0
                ? [
                    {
                      label: 'Max Zs (Table 41.2/41.3)',
                      formula: `Max Zs at ${result.rating}A`,
                      result: `${result.maxZs.toFixed(2)}Ω`,
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
                  <span className="font-medium">Table 41.2/41.3</span> — Maximum earth fault loop
                  impedance (Zs) for 0.4s disconnection
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium">Regulation 433.1</span> — Overload protection: In ≥
                  Ib and In ≤ Iz
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium">Regulation 411.3.3</span> — RCD protection
                  requirements for socket outlets
                </p>
                <p className="text-sm text-white">
                  <span className="font-medium">Regulation 722.531.3</span> — EV charging point
                  protection
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
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
                  <p className="text-white font-medium">Type B</p>
                  <p className="text-white">Trips at 3–5 × In — domestic, resistive loads</p>
                  <p className="text-white font-medium">Type C</p>
                  <p className="text-white">Trips at 5–10 × In — motors, fluorescent lighting</p>
                  <p className="text-white font-medium">Type D</p>
                  <p className="text-white">
                    Trips at 10–20 × In — transformers, welding, high inrush
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      <FormulaReference category={CAT} formula="Ib ≤ In ≤ Iz" />
    </CalculatorCard>
  );
};

export default CircuitBreakerSelectorCalculator;

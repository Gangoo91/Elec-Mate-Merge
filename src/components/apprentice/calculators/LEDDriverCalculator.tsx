import { useState, useMemo, useCallback } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  CalculatorInputGrid,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';

const CAT = 'lighting' as const;
const config = CALCULATOR_CONFIG[CAT];

interface LEDResult {
  totalVoltage: number;
  totalCurrentmA: number;
  totalPower: number;
  driverPower: number;
  driverCurrent: number;
  powerLoss: number;
  complianceVoltage: number;
  recommendedDriverPower: number;
  nearestStandardDriver: string;
  status: 'pass' | 'warning' | 'fail';
  statusLabel: string;
  connectionGuidance: string;
  messages: string[];
}

const LEDDriverCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [ledVoltage, setLedVoltage] = useState('');
  const [ledCurrent, setLedCurrent] = useState('');
  const [numLeds, setNumLeds] = useState('1');
  const [connectionType, setConnectionType] = useState('series');
  const [supplyVoltage, setSupplyVoltage] = useState('12');
  const [efficiency, setEfficiency] = useState('0.85');
  const [result, setResult] = useState<LEDResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const canCalculate = useMemo(() => {
    return parseFloat(ledVoltage) > 0 && parseFloat(ledCurrent) > 0 && parseInt(numLeds) > 0;
  }, [ledVoltage, ledCurrent, numLeds]);

  const handleCalculate = useCallback(() => {
    const vLed = parseFloat(ledVoltage);
    const iLed = parseFloat(ledCurrent) / 1000;
    const count = parseInt(numLeds);
    const vSupply = parseFloat(supplyVoltage);
    const eff = parseFloat(efficiency);

    if (!(vLed > 0 && iLed > 0 && count > 0 && vSupply > 0 && eff > 0)) return;

    let totalVoltage: number;
    let totalCurrent: number;

    if (connectionType === 'series') {
      totalVoltage = vLed * count;
      totalCurrent = iLed;
    } else {
      totalVoltage = vLed;
      totalCurrent = iLed * count;
    }

    const totalPower = totalVoltage * totalCurrent;
    const driverPower = totalPower / eff;
    const driverCurrent = driverPower / vSupply;
    const powerLoss = driverPower - totalPower;
    const complianceVoltage =
      connectionType === 'series' ? totalVoltage + totalVoltage * 0.1 : vSupply;
    const recommendedDriverPower = driverPower * 1.2;

    const standardPowers = [1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200];
    const nearestPower =
      standardPowers.find((p) => p >= recommendedDriverPower) || Math.ceil(recommendedDriverPower);

    let status: 'pass' | 'warning' | 'fail' = 'pass';
    let statusLabel = 'Configuration OK';
    const messages: string[] = [];

    if (connectionType === 'series' && totalVoltage > vSupply * 0.9) {
      status = 'fail';
      statusLabel = 'Insufficient Voltage Headroom';
      messages.push('Insufficient voltage headroom for constant current operation');
    } else if (connectionType === 'series' && totalVoltage > vSupply * 0.8) {
      status = 'warning';
      statusLabel = 'Limited Headroom';
      messages.push('Limited voltage headroom — consider higher supply voltage');
    }

    if (iLed > 1 && status === 'pass') {
      status = 'warning';
      statusLabel = 'High Current LEDs';
      messages.push('High current LEDs require careful thermal management');
    }

    if (eff * 100 < 80 && status === 'pass') {
      status = 'warning';
      statusLabel = 'Low Efficiency';
      messages.push('Low efficiency driver — consider higher grade driver');
    }

    if (status === 'pass') {
      messages.push('Configuration meets BS 7671 safety requirements');
    }

    const connectionGuidance =
      connectionType === 'series'
        ? count > 10
          ? 'Series connection suitable but consider parallel strings for >10 LEDs'
          : 'Series connection recommended for consistent current'
        : count > 5
          ? 'Parallel connection requires current balancing for >5 LEDs'
          : 'Parallel connection suitable with proper current limiting';

    setResult({
      totalVoltage,
      totalCurrentmA: totalCurrent * 1000,
      totalPower,
      driverPower,
      driverCurrent,
      powerLoss,
      complianceVoltage,
      recommendedDriverPower,
      nearestStandardDriver: `${nearestPower}W`,
      status,
      statusLabel,
      connectionGuidance,
      messages,
    });
  }, [ledVoltage, ledCurrent, numLeds, connectionType, supplyVoltage, efficiency]);

  const handleReset = useCallback(() => {
    setLedVoltage('');
    setLedCurrent('');
    setNumLeds('1');
    setConnectionType('series');
    setSupplyVoltage('12');
    setEfficiency('0.85');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'LED Driver Calculator Results',
      `Connection: ${connectionType}`,
      `Total Voltage: ${result.totalVoltage.toFixed(1)} V`,
      `Total Current: ${result.totalCurrentmA.toFixed(0)} mA`,
      `LED Power: ${result.totalPower.toFixed(2)} W`,
      `Driver Power: ${result.driverPower.toFixed(2)} W`,
      `Recommended: ${result.nearestStandardDriver}`,
      `Status: ${result.statusLabel}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const connectionOptions = [
    { value: 'series', label: 'Series' },
    { value: 'parallel', label: 'Parallel' },
  ];

  const supplyOptions = [
    { value: '12', label: '12V' },
    { value: '24', label: '24V' },
    { value: '48', label: '48V' },
  ];

  return (
    <CalculatorCard
      category={CAT}
      title="LED Driver Calculator"
      description="Calculate LED driver requirements for single LEDs or arrays in series/parallel"
    >
      {/* Connection Type */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-white">Connection Type</p>
        <div className="flex gap-2">
          {connectionOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setConnectionType(opt.value)}
              className={cn(
                'flex-1 h-11 rounded-xl font-medium text-sm transition-all touch-manipulation',
                connectionType === opt.value
                  ? 'text-black'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              )}
              style={
                connectionType === opt.value
                  ? {
                      background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                    }
                  : undefined
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* LED Specifications */}
      <CalculatorInput
        label="LED Forward Voltage"
        unit="V"
        type="text"
        inputMode="decimal"
        value={ledVoltage}
        onChange={setLedVoltage}
        placeholder="e.g., 3.2"
        hint="Typical: White 3.0-3.4V, Red 1.8-2.2V"
      />

      <CalculatorInput
        label="LED Forward Current"
        unit="mA"
        type="text"
        inputMode="decimal"
        value={ledCurrent}
        onChange={setLedCurrent}
        placeholder="e.g., 350"
        hint="Common: 20mA, 350mA, 700mA, 1A"
      />

      <CalculatorInput
        label="Number of LEDs"
        unit="pcs"
        type="text"
        inputMode="numeric"
        value={numLeds}
        onChange={setNumLeds}
        placeholder="e.g., 10"
      />

      {/* Supply Configuration */}
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Supply Voltage"
          value={supplyVoltage}
          onChange={setSupplyVoltage}
          options={supplyOptions}
        />
        <CalculatorInput
          label="Driver Efficiency"
          type="text"
          inputMode="decimal"
          value={efficiency}
          onChange={setEfficiency}
          placeholder="0.85"
          hint="0.80-0.95 typical"
        />
      </CalculatorInputGrid>

      {/* Actions */}
      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate Driver"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge status={result.status} label={result.statusLabel} />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero Value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Recommended Driver</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.nearestStandardDriver}
            </p>
            <p className="text-sm text-white mt-2">
              {connectionType} · {numLeds} LED{parseInt(numLeds) > 1 ? 's' : ''} ·{' '}
              {result.totalPower.toFixed(2)}W array
            </p>
          </div>

          {/* Result Values */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Total Voltage"
              value={result.totalVoltage.toFixed(1)}
              unit="V"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Total Current"
              value={result.totalCurrentmA.toFixed(0)}
              unit="mA"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="LED Array Power"
              value={result.totalPower.toFixed(2)}
              unit="W"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Driver Power"
              value={result.driverPower.toFixed(2)}
              unit="W"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Power Loss + Connection Guidance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
              <span className="text-sm text-white">Power Loss (heat)</span>
              <span className="text-sm font-medium text-amber-400">
                {result.powerLoss.toFixed(2)}W
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white">{result.connectionGuidance}</p>
            </div>
            {result.messages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-white/5">
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: config.gradientFrom }}
                />
                <p className="text-sm text-white">{msg}</p>
              </div>
            ))}
          </div>

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Input values',
                formula: `Vf = ${ledVoltage}V | If = ${ledCurrent}mA | Count = ${numLeds} | ${connectionType} | Supply = ${supplyVoltage}V | η = ${efficiency}`,
              },
              {
                label:
                  connectionType === 'series'
                    ? 'Series voltage & current'
                    : 'Parallel voltage & current',
                formula:
                  connectionType === 'series'
                    ? `V = Vf × n = ${ledVoltage} × ${numLeds} = ${result.totalVoltage.toFixed(1)}V | I = ${ledCurrent}mA (same through all)`
                    : `V = Vf = ${ledVoltage}V (same across all) | I = If × n = ${ledCurrent} × ${numLeds} = ${result.totalCurrentmA.toFixed(0)}mA`,
                value:
                  connectionType === 'series'
                    ? `${result.totalVoltage.toFixed(1)} V, ${result.totalCurrentmA.toFixed(0)} mA`
                    : `${result.totalVoltage.toFixed(1)} V, ${result.totalCurrentmA.toFixed(0)} mA`,
              },
              {
                label: 'LED power',
                formula: `P = V × I = ${result.totalVoltage.toFixed(1)} × ${(result.totalCurrentmA / 1000).toFixed(3)}`,
                value: `${result.totalPower.toFixed(2)} W`,
              },
              {
                label: 'Driver power',
                formula: `P_driver = P_LED ÷ η = ${result.totalPower.toFixed(2)} ÷ ${efficiency}`,
                value: `${result.driverPower.toFixed(2)} W`,
              },
              {
                label: 'Driver current from supply',
                formula: `I_supply = P_driver ÷ V_supply = ${result.driverPower.toFixed(2)} ÷ ${supplyVoltage}`,
                value: `${result.driverCurrent.toFixed(3)} A`,
              },
              {
                label: 'Recommended driver (20% headroom)',
                formula: `${result.driverPower.toFixed(2)} × 1.2 = ${result.recommendedDriverPower.toFixed(1)}W → nearest standard`,
                value: result.nearestStandardDriver,
                description: '20% safety margin prevents driver from running at maximum capacity',
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <ul className="space-y-2">
                  {[
                    'Proper driver sizing prevents LED thermal runaway and premature failure',
                    'Voltage headroom ensures stable constant current across temperature variations',
                    'Low efficiency drivers waste energy as heat — aim for >85%',
                    'Series provides consistent current; parallel needs balancing resistors',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
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
                    { reg: 'Regulation 559.5', desc: 'SELV/PELV lighting circuits' },
                    { reg: 'Regulation 411.7', desc: 'Extra-low voltage systems' },
                    { reg: 'BS EN 61347-2-13', desc: 'LED driver safety requirements' },
                    { reg: 'IEC 62384', desc: 'LED driver performance standard' },
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

      {/* Formula Reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="LED Driver Sizing"
        formula="P_driver = (V_LED × I_LED × N) / η"
        variables={[
          { symbol: 'P_driver', description: 'Driver power (W)' },
          { symbol: 'V_LED', description: 'LED forward voltage (V)' },
          { symbol: 'I_LED', description: 'LED forward current (mA)' },
          { symbol: 'N', description: 'Number of LEDs' },
          { symbol: 'η', description: 'Driver efficiency (0.80-0.95)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default LEDDriverCalculator;

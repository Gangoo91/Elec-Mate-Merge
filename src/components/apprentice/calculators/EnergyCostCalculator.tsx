import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Home,
  Building,
  Factory,
  ChevronDown,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInput,
  CalculatorInputGrid,
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
import { formatCurrency } from '@/lib/format';
import {
  environmentPresets,
  getCategoriesForEnvironment,
  getAppliancesForCategory,
  type AppliancePreset,
} from '@/data/presets';
import { useToast } from '@/hooks/use-toast';

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

interface Appliance {
  id: string;
  name: string;
  quantity: number;
  powerW: number;
  standbyW: number;
  usageMode: 'hoursPerDay' | 'cyclesPerWeek';
  hoursPerDay?: number;
  cycleHours?: number;
  cyclesPerWeek?: number;
}

type Environment = 'domestic' | 'commercial' | 'industrial';

interface CalculationResult {
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  yearlyCost: number;
  dailyKWh: number;
  weeklyKWh: number;
  monthlyKWh: number;
  yearlyKWh: number;
  dailyCO2: number;
  weeklyCO2: number;
  monthlyCO2: number;
  yearlyCO2: number;
  costBreakdown: {
    energyCost: number;
    standingCharge: number;
    vat: number;
    total: number;
  };
  applianceBreakdown: Array<{
    id: string;
    name: string;
    dailyKWh: number;
    monthlyCost: number;
    shareOfTotal: number;
  }>;
}

/* ─── Appliance Card Sub-component ─── */
const ApplianceCard = ({
  appliance,
  onUpdate,
  onRemove,
}: {
  appliance: Appliance;
  onUpdate: (id: string, updates: Partial<Appliance>) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
      {/* Name and Remove */}
      <div className="flex items-center gap-2">
        <CalculatorInput
          label="Name"
          type="text"
          value={appliance.name}
          onChange={(v) => onUpdate(appliance.id, { name: v })}
          placeholder="Appliance name"
        />
        <button
          onClick={() => onRemove(appliance.id)}
          className="h-11 w-11 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors touch-manipulation shrink-0 mt-5"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Power, Standby, Quantity */}
      <CalculatorInputGrid columns={3}>
        <CalculatorInput
          label="Power"
          unit="W"
          type="text"
          inputMode="decimal"
          value={appliance.powerW?.toString() ?? ''}
          onChange={(v) => onUpdate(appliance.id, { powerW: parseFloat(v) || 0 })}
          placeholder="0"
        />
        <CalculatorInput
          label="Standby"
          unit="W"
          type="text"
          inputMode="decimal"
          value={appliance.standbyW?.toString() ?? ''}
          onChange={(v) => onUpdate(appliance.id, { standbyW: parseFloat(v) || 0 })}
          placeholder="0"
        />
        <CalculatorInput
          label="Qty"
          type="text"
          inputMode="numeric"
          value={appliance.quantity?.toString() ?? ''}
          onChange={(v) => onUpdate(appliance.id, { quantity: parseInt(v) || 1 })}
          placeholder="1"
        />
      </CalculatorInputGrid>

      {/* Usage Mode Toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onUpdate(appliance.id, { usageMode: 'hoursPerDay' })}
          className={cn(
            'h-11 rounded-lg text-xs font-medium transition-all touch-manipulation border',
            appliance.usageMode === 'hoursPerDay'
              ? 'bg-white/10 text-white'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/[0.07]'
          )}
          style={
            appliance.usageMode === 'hoursPerDay'
              ? { borderColor: config.gradientFrom }
              : undefined
          }
        >
          Hours/day
        </button>
        <button
          onClick={() => onUpdate(appliance.id, { usageMode: 'cyclesPerWeek' })}
          className={cn(
            'h-11 rounded-lg text-xs font-medium transition-all touch-manipulation border',
            appliance.usageMode === 'cyclesPerWeek'
              ? 'bg-white/10 text-white'
              : 'bg-white/5 border-white/10 text-white hover:bg-white/[0.07]'
          )}
          style={
            appliance.usageMode === 'cyclesPerWeek'
              ? { borderColor: config.gradientFrom }
              : undefined
          }
        >
          Cycles/week
        </button>
      </div>

      {/* Usage Input */}
      {appliance.usageMode === 'hoursPerDay' ? (
        <CalculatorInput
          label="Hours per day"
          unit="hrs"
          type="text"
          inputMode="decimal"
          value={appliance.hoursPerDay?.toString() ?? ''}
          onChange={(v) => onUpdate(appliance.id, { hoursPerDay: parseFloat(v) || 0 })}
          placeholder="e.g., 4"
        />
      ) : (
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Cycle duration"
            unit="hrs"
            type="text"
            inputMode="decimal"
            value={appliance.cycleHours?.toString() ?? ''}
            onChange={(v) => onUpdate(appliance.id, { cycleHours: parseFloat(v) || 0 })}
            placeholder="1.5"
          />
          <CalculatorInput
            label="Cycles/week"
            type="text"
            inputMode="numeric"
            value={appliance.cyclesPerWeek?.toString() ?? ''}
            onChange={(v) => onUpdate(appliance.id, { cyclesPerWeek: parseInt(v) || 0 })}
            placeholder="7"
          />
        </CalculatorInputGrid>
      )}
    </div>
  );
};

/* ─── Main Component ─── */
const EnergyCostCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [environment, setEnvironment] = useState<Environment>('domestic');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [dayRate, setDayRate] = useState<string>('0.30');
  const [nightRate, setNightRate] = useState<string>('0.15');
  const [nightHours, setNightHours] = useState<string>('7');
  const [standingCharge, setStandingCharge] = useState<string>('0.60');
  const [vatRate, setVatRate] = useState<string>('5');
  const [useDualRate, setUseDualRate] = useState<boolean>(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // ── localStorage persistence ──
  useEffect(() => {
    const savedAppliances = localStorage.getItem('energyCost.appliances');
    const savedEnvironment = localStorage.getItem('energyCost.environment');
    const savedCategory = localStorage.getItem('energyCost.category');

    if (savedAppliances) {
      try {
        setAppliances(JSON.parse(savedAppliances));
      } catch (error) {
        console.error('Failed to load saved appliances:', error);
      }
    }

    if (
      savedEnvironment &&
      (savedEnvironment === 'domestic' ||
        savedEnvironment === 'commercial' ||
        savedEnvironment === 'industrial')
    ) {
      setEnvironment(savedEnvironment as Environment);
    }

    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('energyCost.appliances', JSON.stringify(appliances));
  }, [appliances]);

  useEffect(() => {
    localStorage.setItem('energyCost.environment', environment);
  }, [environment]);

  useEffect(() => {
    localStorage.setItem('energyCost.category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory('');
  }, [environment]);

  // ── Calculation Logic ──
  const calculateApplianceCosts = useMemo((): CalculationResult | null => {
    const dayRatePerKWh = parseFloat(dayRate);
    const nightRatePerKWh = parseFloat(nightRate);
    const nightHoursPerDay = parseFloat(nightHours);
    const dailyStandingCharge = parseFloat(standingCharge);
    const vatPercentage = parseFloat(vatRate);

    if (!dayRatePerKWh || appliances.length === 0) return null;

    const co2Factor = 0.233;
    let totalDailyKWh = 0;
    let totalDailyEnergyCost = 0;
    const applianceBreakdown: CalculationResult['applianceBreakdown'] = [];

    appliances.forEach((appliance) => {
      let hoursPerDay = 0;
      if (appliance.usageMode === 'hoursPerDay') {
        hoursPerDay = appliance.hoursPerDay || 0;
      } else if (appliance.usageMode === 'cyclesPerWeek') {
        hoursPerDay = ((appliance.cycleHours || 0) * (appliance.cyclesPerWeek || 0)) / 7;
      }

      const activeKWhPerDay = (appliance.powerW * appliance.quantity * hoursPerDay) / 1000;
      const standbyKWhPerDay =
        (appliance.standbyW * appliance.quantity * (24 - hoursPerDay)) / 1000;
      const totalApplianceKWh = activeKWhPerDay + standbyKWhPerDay;

      let applianceEnergyCost;
      if (useDualRate && nightHoursPerDay > 0) {
        const dayHours = Math.max(0, hoursPerDay - nightHoursPerDay);
        const nightHrs = Math.min(hoursPerDay, nightHoursPerDay);

        const dayKWh = (appliance.powerW * appliance.quantity * dayHours) / 1000;
        const nightKWh = (appliance.powerW * appliance.quantity * nightHrs) / 1000;

        applianceEnergyCost =
          dayKWh * dayRatePerKWh + nightKWh * nightRatePerKWh + standbyKWhPerDay * dayRatePerKWh;
      } else {
        applianceEnergyCost = totalApplianceKWh * dayRatePerKWh;
      }

      totalDailyKWh += totalApplianceKWh;
      totalDailyEnergyCost += applianceEnergyCost;

      applianceBreakdown.push({
        id: appliance.id,
        name: `${appliance.name}${appliance.quantity > 1 ? ` (×${appliance.quantity})` : ''}`,
        dailyKWh: totalApplianceKWh,
        monthlyCost: applianceEnergyCost * 30.44,
        shareOfTotal: 0,
      });
    });

    applianceBreakdown.forEach((item) => {
      item.shareOfTotal =
        totalDailyEnergyCost > 0 ? (item.monthlyCost / (totalDailyEnergyCost * 30.44)) * 100 : 0;
    });

    applianceBreakdown.sort((a, b) => b.monthlyCost - a.monthlyCost);

    const dailyTotal = totalDailyEnergyCost + dailyStandingCharge;
    const vatAmount = (dailyTotal * vatPercentage) / 100;
    const dailyCostWithVat = dailyTotal + vatAmount;
    const dailyCO2 = totalDailyKWh * co2Factor;

    return {
      dailyCost: dailyCostWithVat,
      weeklyCost: dailyCostWithVat * 7,
      monthlyCost: dailyCostWithVat * 30.44,
      yearlyCost: dailyCostWithVat * 365,
      dailyKWh: totalDailyKWh,
      weeklyKWh: totalDailyKWh * 7,
      monthlyKWh: totalDailyKWh * 30.44,
      yearlyKWh: totalDailyKWh * 365,
      dailyCO2,
      weeklyCO2: dailyCO2 * 7,
      monthlyCO2: dailyCO2 * 30.44,
      yearlyCO2: dailyCO2 * 365,
      costBreakdown: {
        energyCost: totalDailyEnergyCost,
        standingCharge: dailyStandingCharge,
        vat: vatAmount,
        total: dailyCostWithVat,
      },
      applianceBreakdown,
    };
  }, [appliances, dayRate, nightRate, nightHours, standingCharge, vatRate, useDualRate]);

  const calculateResults = () => {
    setResult(calculateApplianceCosts);
  };

  const addAppliance = useCallback(
    (presetKey?: string) => {
      let preset: AppliancePreset | null = null;

      if (presetKey) {
        const categoryAppliances = selectedCategory
          ? getAppliancesForCategory(environment, selectedCategory)
          : {};
        preset = categoryAppliances[presetKey] || null;
      }

      const newAppliance: Appliance = {
        id: Date.now().toString(),
        name: preset?.name || 'Custom Appliance',
        quantity: 1,
        powerW: preset?.powerW || 0,
        standbyW: preset?.standbyW || 0,
        usageMode: preset?.usageMode || 'hoursPerDay',
        hoursPerDay: preset?.hoursPerDay,
        cycleHours: preset?.cycleHours,
        cyclesPerWeek: preset?.cyclesPerWeek,
      };
      setAppliances((prev) => [...prev, newAppliance]);
    },
    [environment, selectedCategory]
  );

  const updateAppliance = useCallback((id: string, updates: Partial<Appliance>) => {
    setAppliances((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }, []);

  const removeAppliance = useCallback((id: string) => {
    setAppliances((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const reset = () => {
    setEnvironment('domestic');
    setSelectedCategory('');
    setAppliances([]);
    setDayRate('0.30');
    setNightRate('0.15');
    setNightHours('7');
    setStandingCharge('0.60');
    setVatRate('5');
    setUseDualRate(false);
    setResult(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = [
      `Annual Energy Cost: ${formatCurrency(result.yearlyCost)}`,
      `Monthly: ${formatCurrency(result.monthlyCost)}`,
      `Daily: ${formatCurrency(result.dailyCost)}`,
      `Annual kWh: ${result.yearlyKWh.toFixed(0)}`,
      `Annual CO₂: ${result.yearlyCO2.toFixed(0)} kg`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Derived data ──
  const availableCategories = useMemo(() => {
    return getCategoriesForEnvironment(environment);
  }, [environment]);

  const availableAppliances = useMemo(() => {
    if (!selectedCategory) return {};
    return getAppliancesForCategory(environment, selectedCategory);
  }, [environment, selectedCategory]);

  const environmentOptions = [
    { key: 'domestic' as const, label: 'Domestic', icon: Home },
    { key: 'commercial' as const, label: 'Commercial', icon: Building },
    { key: 'industrial' as const, label: 'Industrial', icon: Factory },
  ];

  const categoryOptions = availableCategories.map((cat) => ({
    value: cat.key,
    label: cat.name,
  }));

  const applianceOptions = Object.entries(availableAppliances).map(([key, preset]) => ({
    value: key,
    label: preset.name,
  }));

  // Result status badge
  const getResultStatus = (): { status: 'pass' | 'warning' | 'fail'; label: string } => {
    if (!result) return { status: 'pass', label: '' };
    if (result.yearlyCost > 5000) return { status: 'fail', label: 'High Cost' };
    if (result.yearlyCost > 2000) return { status: 'warning', label: 'Moderate Cost' };
    return { status: 'pass', label: 'Low Cost' };
  };

  // Formula steps for display
  const formulaSteps = useMemo(() => {
    if (!result) return [];
    return [
      {
        label: 'Energy per appliance',
        formula: 'kWh = (Power × Hours × Quantity) ÷ 1000',
        value: `Total: ${result.dailyKWh.toFixed(2)} kWh/day`,
      },
      {
        label: 'Apply tariff rate',
        formula: `${result.dailyKWh.toFixed(2)} kWh × £${dayRate}/kWh`,
        value: `Energy cost: ${formatCurrency(result.costBreakdown.energyCost)}/day`,
      },
      {
        label: 'Add standing charge',
        formula: `${formatCurrency(result.costBreakdown.energyCost)} + £${standingCharge}`,
        value: `Subtotal: ${formatCurrency(result.costBreakdown.energyCost + result.costBreakdown.standingCharge)}/day`,
      },
      {
        label: 'Apply VAT',
        formula: `Subtotal × ${vatRate}%`,
        value: `Total: ${formatCurrency(result.costBreakdown.total)}/day`,
      },
    ];
  }, [result, dayRate, standingCharge, vatRate]);

  return (
    <CalculatorCard
      category={CAT}
      title="Energy Cost Calculator"
      description="Calculate electricity costs for appliances based on UK rates"
    >
      {/* ── Environment Selection ── */}
      <CalculatorSection title="Environment">
        <div className="grid grid-cols-3 gap-2">
          {environmentOptions.map((env) => {
            const Icon = env.icon;
            const selected = environment === env.key;
            return (
              <button
                key={env.key}
                onClick={() => setEnvironment(env.key)}
                className={cn(
                  'flex flex-col items-center gap-1.5 p-3 rounded-xl font-medium text-sm transition-all touch-manipulation min-h-[44px]',
                  selected
                    ? 'text-black'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/[0.07]'
                )}
                style={
                  selected
                    ? {
                        background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                      }
                    : undefined
                }
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{env.label}</span>
              </button>
            );
          })}
        </div>
      </CalculatorSection>

      {/* ── Appliance Category ── */}
      {categoryOptions.length > 0 && (
        <CalculatorSelect
          label="Appliance Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categoryOptions}
          placeholder="Select category..."
        />
      )}

      <CalculatorDivider category={CAT} />

      {/* ── Your Appliances ── */}
      <CalculatorSection title="Your Appliances">
        {appliances.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-white">Add appliances to calculate costs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appliances.map((appliance) => (
              <ApplianceCard
                key={appliance.id}
                appliance={appliance}
                onUpdate={updateAppliance}
                onRemove={removeAppliance}
              />
            ))}
          </div>
        )}

        {/* Add Appliance Row */}
        <div className="flex gap-2">
          {selectedCategory && applianceOptions.length > 0 && (
            <div className="flex-1">
              <CalculatorSelect
                label="Add preset"
                value=""
                onChange={(v) => {
                  if (v) addAppliance(v);
                }}
                options={applianceOptions}
                placeholder="Add preset appliance..."
              />
            </div>
          )}
          <button
            onClick={() => addAppliance()}
            className="h-11 px-4 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation mt-5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Custom</span>
          </button>
        </div>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* ── Tariff & Charges ── */}
      <CalculatorSection title="Tariff & Charges">
        {/* Dual Rate Toggle */}
        <label
          className={cn(
            'flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all touch-manipulation min-h-[44px] border',
            useDualRate
              ? 'bg-white/10'
              : 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
          )}
          style={useDualRate ? { borderColor: config.gradientFrom } : undefined}
        >
          <div
            className={cn(
              'flex items-center justify-center h-5 w-5 rounded border-2 shrink-0 transition-all',
              useDualRate ? 'border-transparent' : 'border-white/20 bg-white/10'
            )}
            style={useDualRate ? { backgroundColor: config.gradientFrom } : undefined}
          >
            {useDualRate && <Check className="h-3.5 w-3.5 text-black" />}
          </div>
          <span className="text-sm text-white">Use dual rate tariff (Economy 7/10)</span>
        </label>

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label={useDualRate ? 'Day Rate' : 'Rate'}
            unit="£/kWh"
            type="text"
            inputMode="decimal"
            value={dayRate}
            onChange={setDayRate}
            placeholder="e.g., 0.30"
          />
          {useDualRate && (
            <CalculatorInput
              label="Night Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={nightRate}
              onChange={setNightRate}
              placeholder="e.g., 0.15"
            />
          )}
        </CalculatorInputGrid>

        {useDualRate && (
          <CalculatorInput
            label="Night Hours"
            unit="hrs/day"
            type="text"
            inputMode="decimal"
            value={nightHours}
            onChange={setNightHours}
            placeholder="e.g., 7"
            hint="Hours per day on cheaper night rate"
          />
        )}

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Standing Charge"
            unit="£/day"
            type="text"
            inputMode="decimal"
            value={standingCharge}
            onChange={setStandingCharge}
            placeholder="e.g., 0.60"
          />
          <CalculatorInput
            label="VAT Rate"
            unit="%"
            type="text"
            inputMode="decimal"
            value={vatRate}
            onChange={setVatRate}
            placeholder="5"
            hint="Usually 5% for domestic energy"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* ── Actions ── */}
      <CalculatorActions
        category={CAT}
        onCalculate={calculateResults}
        onReset={reset}
        isDisabled={appliances.length === 0}
        calculateLabel="Calculate Costs"
        showReset={appliances.length > 0}
      />

      {/* ── Results ── */}
      {result && (
        <>
          <CalculatorDivider category={CAT} />

          <div className="space-y-4 animate-fade-in">
            {/* Status + Copy */}
            <div className="flex items-center justify-between">
              <ResultBadge status={getResultStatus().status} label={getResultStatus().label} />
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
              <p className="text-sm font-medium text-white mb-1">Annual Energy Cost</p>
              <p
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {formatCurrency(result.yearlyCost)}
              </p>
              <p className="text-sm text-white mt-2">
                {result.yearlyKWh.toFixed(0)} kWh/year
              </p>
            </div>

            {/* Cost breakdown */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Daily Cost"
                value={formatCurrency(result.dailyCost)}
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Weekly Cost"
                value={formatCurrency(result.weeklyCost)}
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Monthly Cost"
                value={formatCurrency(result.monthlyCost)}
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Annual Cost"
                value={formatCurrency(result.yearlyCost)}
                category={CAT}
                size="sm"
              />
            </ResultsGrid>

            <CalculatorDivider category={CAT} />

            {/* Energy Usage */}
            <ResultsGrid columns={2}>
              <ResultValue label="Daily" value={`${result.dailyKWh.toFixed(2)} kWh`} category={CAT} size="sm" />
              <ResultValue label="Weekly" value={`${result.weeklyKWh.toFixed(1)} kWh`} category={CAT} size="sm" />
              <ResultValue label="Monthly" value={`${result.monthlyKWh.toFixed(0)} kWh`} category={CAT} size="sm" />
              <ResultValue label="Yearly" value={`${result.yearlyKWh.toFixed(0)} kWh`} category={CAT} size="sm" />
            </ResultsGrid>

            <CalculatorDivider category={CAT} />

            {/* Carbon Footprint */}
            <CalculatorSection title="Carbon Footprint">
              <ResultsGrid columns={2}>
                <ResultValue label="Daily" value={`${result.dailyCO2.toFixed(2)} kg CO₂`} category={CAT} size="sm" />
                <ResultValue label="Weekly" value={`${result.weeklyCO2.toFixed(1)} kg CO₂`} category={CAT} size="sm" />
                <ResultValue label="Monthly" value={`${result.monthlyCO2.toFixed(0)} kg CO₂`} category={CAT} size="sm" />
                <ResultValue label="Yearly" value={`${result.yearlyCO2.toFixed(0)} kg CO₂`} category={CAT} size="sm" />
              </ResultsGrid>
            </CalculatorSection>

            <CalculatorDivider category={CAT} />

            {/* Per-appliance Breakdown */}
            {result.applianceBreakdown.length > 0 && (
              <CalculatorSection title="Cost by Appliance">
                <div className="space-y-2">
                  {result.applianceBreakdown.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-white">{item.dailyKWh.toFixed(2)} kWh/day</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-sm font-semibold text-white">
                          {formatCurrency(item.monthlyCost)}
                          <span className="text-xs text-white">/mo</span>
                        </p>
                        <p className="text-xs text-white">{item.shareOfTotal.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CalculatorSection>
            )}

            {/* How It Worked Out */}
            <CalculatorFormula
              category={CAT}
              steps={formulaSteps}
              title="How It Worked Out"
              defaultOpen
            />

            {/* Energy Saving Tips */}
            <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <span>Energy Saving Tips</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showGuidance && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div
                  className="p-3 rounded-xl border space-y-2"
                  style={{
                    borderColor: `${config.gradientFrom}15`,
                    background: `${config.gradientFrom}05`,
                  }}
                >
                  <ul className="space-y-2">
                    {[
                      'Check your energy bill for exact rates — prices vary by supplier',
                      'Economy 7/10 tariffs offer cheaper night rates for storage heaters',
                      'Include standby power — TVs, routers, and chargers add up',
                      'Focus on high-cost appliances first for biggest savings',
                    ].map((tip, idx) => (
                      <li key={idx} className="text-sm text-white flex items-start gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Typical Power Ratings */}
            <Collapsible open={showReference} onOpenChange={setShowReference}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <span>Typical Power Ratings</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    showReference && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div
                  className="p-3 rounded-xl border"
                  style={{
                    borderColor: `${config.gradientFrom}15`,
                    background: `${config.gradientFrom}05`,
                  }}
                >
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <p className="text-white font-medium">Kitchen</p>
                      <p className="text-white">Kettle: 2-3 kW</p>
                      <p className="text-white">Microwave: 800-1200 W</p>
                      <p className="text-white">Fridge: 100-150 W</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Heating</p>
                      <p className="text-white">Fan heater: 2-3 kW</p>
                      <p className="text-white">Oil radiator: 1.5-2.5 kW</p>
                      <p className="text-white">Immersion: 3 kW</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Electronics</p>
                      <p className="text-white">TV (LED): 50-100 W</p>
                      <p className="text-white">Laptop: 30-65 W</p>
                      <p className="text-white">Router: 5-20 W</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Laundry</p>
                      <p className="text-white">Washing: 500-2000 W</p>
                      <p className="text-white">Dryer: 2-3 kW</p>
                      <p className="text-white">Dishwasher: 1.8-2.4 kW</p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Energy Cost"
        formula="Cost = (kWh × Rate) + Standing Charge + VAT"
        variables={[
          { symbol: 'kWh', description: 'Kilowatt-hours consumed per day' },
          { symbol: 'Rate', description: 'Price per kWh (pence or pounds)' },
          { symbol: 'Standing', description: 'Daily fixed charge from supplier' },
          { symbol: 'VAT', description: 'Value Added Tax (usually 5% domestic)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default EnergyCostCalculator;

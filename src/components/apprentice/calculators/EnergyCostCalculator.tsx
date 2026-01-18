import { useState, useEffect, useMemo } from "react";
import {
  PoundSterling,
  Info,
  Calculator,
  RotateCcw,
  Zap,
  Leaf,
  Clock,
  Plus,
  Trash2,
  Home,
  Building,
  Factory,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import { formatCurrency } from "@/lib/format";
import {
  environmentPresets,
  getCategoriesForEnvironment,
  getAppliancesForCategory,
  type AppliancePreset,
} from "@/data/presets";

interface Appliance {
  id: string;
  name: string;
  quantity: number;
  powerW: number;
  standbyW: number;
  usageMode: "hoursPerDay" | "cyclesPerWeek";
  hoursPerDay?: number;
  cycleHours?: number;
  cyclesPerWeek?: number;
}

type Environment = "domestic" | "commercial" | "industrial";

const EnergyCostCalculator = () => {
  const config = CALCULATOR_CONFIG["power"];

  const [environment, setEnvironment] = useState<Environment>("domestic");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [dayRate, setDayRate] = useState<string>("0.30");
  const [nightRate, setNightRate] = useState<string>("0.15");
  const [nightHours, setNightHours] = useState<string>("7");
  const [standingCharge, setStandingCharge] = useState<string>("0.60");
  const [vatRate, setVatRate] = useState<string>("5");
  const [useDualRate, setUseDualRate] = useState<boolean>(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<{
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
  } | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedAppliances = localStorage.getItem("energyCost.appliances");
    const savedEnvironment = localStorage.getItem("energyCost.environment");
    const savedCategory = localStorage.getItem("energyCost.category");

    if (savedAppliances) {
      try {
        setAppliances(JSON.parse(savedAppliances));
      } catch (error) {
        console.error("Failed to load saved appliances:", error);
      }
    }

    if (
      savedEnvironment &&
      (savedEnvironment === "domestic" ||
        savedEnvironment === "commercial" ||
        savedEnvironment === "industrial")
    ) {
      setEnvironment(savedEnvironment as Environment);
    }

    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  // Save state to localStorage when they change
  useEffect(() => {
    localStorage.setItem("energyCost.appliances", JSON.stringify(appliances));
  }, [appliances]);

  useEffect(() => {
    localStorage.setItem("energyCost.environment", environment);
  }, [environment]);

  useEffect(() => {
    localStorage.setItem("energyCost.category", selectedCategory);
  }, [selectedCategory]);

  // Reset category when environment changes
  useEffect(() => {
    setSelectedCategory("");
  }, [environment]);

  const calculateApplianceCosts = useMemo(() => {
    const dayRatePerKWh = parseFloat(dayRate);
    const nightRatePerKWh = parseFloat(nightRate);
    const nightHoursPerDay = parseFloat(nightHours);
    const dailyStandingCharge = parseFloat(standingCharge);
    const vatPercentage = parseFloat(vatRate);

    if (!dayRatePerKWh || appliances.length === 0) return null;

    const co2Factor = 0.233;
    let totalDailyKWh = 0;
    let totalDailyEnergyCost = 0;
    const applianceBreakdown: Array<{
      id: string;
      name: string;
      dailyKWh: number;
      monthlyCost: number;
      shareOfTotal: number;
    }> = [];

    appliances.forEach((appliance) => {
      // Calculate hours per day
      let hoursPerDay = 0;
      if (appliance.usageMode === "hoursPerDay") {
        hoursPerDay = appliance.hoursPerDay || 0;
      } else if (appliance.usageMode === "cyclesPerWeek") {
        hoursPerDay =
          ((appliance.cycleHours || 0) * (appliance.cyclesPerWeek || 0)) / 7;
      }

      // Calculate energy consumption
      const activeKWhPerDay =
        (appliance.powerW * appliance.quantity * hoursPerDay) / 1000;
      const standbyKWhPerDay =
        (appliance.standbyW * appliance.quantity * (24 - hoursPerDay)) / 1000;
      const totalApplianceKWh = activeKWhPerDay + standbyKWhPerDay;

      // Calculate energy cost
      let applianceEnergyCost;
      if (useDualRate && nightHoursPerDay > 0) {
        const dayHours = Math.max(0, hoursPerDay - nightHoursPerDay);
        const nightHrs = Math.min(hoursPerDay, nightHoursPerDay);

        const dayKWh = (appliance.powerW * appliance.quantity * dayHours) / 1000;
        const nightKWh = (appliance.powerW * appliance.quantity * nightHrs) / 1000;

        applianceEnergyCost =
          dayKWh * dayRatePerKWh +
          nightKWh * nightRatePerKWh +
          standbyKWhPerDay * dayRatePerKWh;
      } else {
        applianceEnergyCost = totalApplianceKWh * dayRatePerKWh;
      }

      totalDailyKWh += totalApplianceKWh;
      totalDailyEnergyCost += applianceEnergyCost;

      applianceBreakdown.push({
        id: appliance.id,
        name: `${appliance.name}${appliance.quantity > 1 ? ` (×${appliance.quantity})` : ""}`,
        dailyKWh: totalApplianceKWh,
        monthlyCost: applianceEnergyCost * 30.44,
        shareOfTotal: 0,
      });
    });

    // Calculate shares
    applianceBreakdown.forEach((item) => {
      item.shareOfTotal =
        totalDailyEnergyCost > 0
          ? (item.monthlyCost / (totalDailyEnergyCost * 30.44)) * 100
          : 0;
    });

    // Sort by monthly cost descending
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

  const addAppliance = (presetKey?: string) => {
    let preset: AppliancePreset | null = null;

    if (presetKey) {
      const categoryAppliances = selectedCategory
        ? getAppliancesForCategory(environment, selectedCategory)
        : {};
      preset = categoryAppliances[presetKey] || null;
    }

    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: preset?.name || "Custom Appliance",
      quantity: 1,
      powerW: preset?.powerW || 0,
      standbyW: preset?.standbyW || 0,
      usageMode: preset?.usageMode || "hoursPerDay",
      hoursPerDay: preset?.hoursPerDay,
      cycleHours: preset?.cycleHours,
      cyclesPerWeek: preset?.cyclesPerWeek,
    };
    setAppliances([...appliances, newAppliance]);
  };

  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    setAppliances(appliances.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const reset = () => {
    setEnvironment("domestic");
    setSelectedCategory("");
    setAppliances([]);
    setDayRate("0.30");
    setNightRate("0.15");
    setNightHours("7");
    setStandingCharge("0.60");
    setVatRate("5");
    setUseDualRate(false);
    setResult(null);
  };

  // Get available categories for current environment
  const availableCategories = useMemo(() => {
    return getCategoriesForEnvironment(environment);
  }, [environment]);

  // Get available appliances for current environment and category
  const availableAppliances = useMemo(() => {
    if (!selectedCategory) return {};
    return getAppliancesForCategory(environment, selectedCategory);
  }, [environment, selectedCategory]);

  // Environment options
  const environmentOptions = [
    { key: "domestic" as const, label: "Domestic", icon: Home },
    { key: "commercial" as const, label: "Commercial", icon: Building },
    { key: "industrial" as const, label: "Industrial", icon: Factory },
  ];

  const categoryOptions = availableCategories.map((cat) => ({
    value: cat.key,
    label: cat.name,
  }));

  const applianceOptions = Object.entries(availableAppliances).map(
    ([key, preset]) => ({
      value: key,
      label: preset.name,
    })
  );

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Energy Cost Calculator"
        description="Calculate electricity costs for appliances based on UK rates"
        badge="£/kWh"
      >
        {/* Environment Selection */}
        <div className="space-y-3">
          <p className="text-sm text-white/60">Choose your environment</p>
          <div className="grid grid-cols-3 gap-2">
            {environmentOptions.map((env) => {
              const Icon = env.icon;
              return (
                <button
                  key={env.key}
                  onClick={() => setEnvironment(env.key)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl font-medium text-sm transition-all touch-manipulation",
                    environment === env.key
                      ? "text-black"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  )}
                  style={
                    environment === env.key
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
        </div>

        {/* Category Selection */}
        {categoryOptions.length > 0 && (
          <CalculatorSelect
            label="Appliance Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categoryOptions}
            placeholder="Select category..."
          />
        )}
      </CalculatorCard>

      {/* Appliances Section */}
      <div className="calculator-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">Your Appliances</h3>
        </div>

        {appliances.length === 0 ? (
          <div className="text-center py-8 text-white/80">
            <Clock className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Add appliances to calculate costs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appliances.map((appliance) => (
              <div
                key={appliance.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
              >
                {/* Name and Remove */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={appliance.name}
                    onChange={(e) =>
                      updateAppliance(appliance.id, { name: e.target.value })
                    }
                    className="flex-1 h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-base placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
                    placeholder="Appliance name"
                  />
                  <button
                    onClick={() => removeAppliance(appliance.id)}
                    className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Power, Standby, Quantity */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-white/80 mb-1 block">Power</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={appliance.powerW?.toString() ?? ""}
                        onChange={(e) =>
                          updateAppliance(appliance.id, {
                            powerW: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                        placeholder="0"
                      />
                      <span className="text-xs text-white/80 ml-1">W</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/80 mb-1 block">Standby</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={appliance.standbyW?.toString() ?? ""}
                        onChange={(e) =>
                          updateAppliance(appliance.id, {
                            standbyW: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                        placeholder="0"
                      />
                      <span className="text-xs text-white/80 ml-1">W</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white/80 mb-1 block">Qty</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={appliance.quantity?.toString() ?? ""}
                      onChange={(e) =>
                        updateAppliance(appliance.id, {
                          quantity: parseInt(e.target.value) || 1,
                        })
                      }
                      className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Usage Mode */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      updateAppliance(appliance.id, { usageMode: "hoursPerDay" })
                    }
                    className={cn(
                      "h-9 rounded-lg text-xs font-medium transition-all touch-manipulation",
                      appliance.usageMode === "hoursPerDay"
                        ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                        : "bg-white/5 border border-white/10 text-white/60"
                    )}
                  >
                    Hours/day
                  </button>
                  <button
                    onClick={() =>
                      updateAppliance(appliance.id, { usageMode: "cyclesPerWeek" })
                    }
                    className={cn(
                      "h-9 rounded-lg text-xs font-medium transition-all touch-manipulation",
                      appliance.usageMode === "cyclesPerWeek"
                        ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                        : "bg-white/5 border border-white/10 text-white/60"
                    )}
                  >
                    Cycles/week
                  </button>
                </div>

                {/* Usage Input */}
                {appliance.usageMode === "hoursPerDay" ? (
                  <div>
                    <label className="text-xs text-white/80 mb-1 block">
                      Hours per day
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={appliance.hoursPerDay?.toString() ?? ""}
                        onChange={(e) =>
                          updateAppliance(appliance.id, {
                            hoursPerDay: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                        placeholder="e.g., 4"
                      />
                      <span className="text-xs text-white/80 ml-2">hrs</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-white/80 mb-1 block">
                        Cycle duration
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={appliance.cycleHours?.toString() ?? ""}
                          onChange={(e) =>
                            updateAppliance(appliance.id, {
                              cycleHours: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                          placeholder="1.5"
                        />
                        <span className="text-xs text-white/80 ml-1">hrs</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-white/80 mb-1 block">
                        Cycles/week
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={appliance.cyclesPerWeek?.toString() ?? ""}
                        onChange={(e) =>
                          updateAppliance(appliance.id, {
                            cyclesPerWeek: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                        placeholder="7"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add Appliance */}
        <div className="flex gap-2">
          {selectedCategory && applianceOptions.length > 0 && (
            <div className="flex-1">
              <select
                onChange={(e) => {
                  if (e.target.value) addAppliance(e.target.value);
                  e.target.value = "";
                }}
                className="w-full h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                defaultValue=""
              >
                <option value="" disabled>
                  Add preset appliance...
                </option>
                {applianceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button
            onClick={() => addAppliance()}
            className="h-12 px-4 flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Custom</span>
          </button>
        </div>
      </div>

      {/* Tariff Section */}
      <div className="calculator-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <PoundSterling className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">Tariff & Charges</h3>
        </div>

        {/* Dual Rate Toggle */}
        <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation">
          <input
            type="checkbox"
            checked={useDualRate}
            onChange={(e) => setUseDualRate(e.target.checked)}
            className="rounded border-white/20 bg-white/10 text-amber-400 focus:ring-amber-400/50"
          />
          <span className="text-sm text-white/80">
            Use dual rate tariff (Economy 7/10)
          </span>
        </label>

        <CalculatorInput
          label={useDualRate ? "Day Rate" : "Rate"}
          unit="£/kWh"
          type="text"
          inputMode="decimal"
          value={dayRate}
          onChange={setDayRate}
          placeholder="e.g., 0.30"
        />

        {useDualRate && (
          <>
            <CalculatorInput
              label="Night Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={nightRate}
              onChange={setNightRate}
              placeholder="e.g., 0.15"
            />
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
          </>
        )}

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

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={calculateResults}
            disabled={appliances.length === 0}
            className={cn(
              "flex-1 h-14 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all touch-manipulation",
              appliances.length > 0
                ? "text-black"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            )}
            style={
              appliances.length > 0
                ? {
                    background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }
                : undefined
            }
          >
            <Calculator className="h-5 w-5" />
            Calculate Costs
          </button>
          <button
            onClick={reset}
            className="h-14 px-4 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Summary Header */}
          <CalculatorResult category="power">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Annual Energy Cost</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {formatCurrency(result.yearlyCost)}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="px-2 py-1 rounded-lg bg-white/5 text-xs text-white/60">
                  {result.yearlyKWh.toFixed(0)} kWh/year
                </span>
                <span className="px-2 py-1 rounded-lg bg-green-500/10 text-xs text-green-400">
                  {result.yearlyCO2.toFixed(0)} kg CO₂/year
                </span>
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Daily Cost"
                value={formatCurrency(result.dailyCost)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Weekly Cost"
                value={formatCurrency(result.weeklyCost)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Monthly Cost"
                value={formatCurrency(result.monthlyCost)}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Annual Cost"
                value={formatCurrency(result.yearlyCost)}
                category="power"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* Energy Consumption */}
          <div className="calculator-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-white/80">Energy Usage</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-xs text-white/80">Daily</p>
                <p className="text-lg font-semibold text-white">
                  {result.dailyKWh.toFixed(2)} <span className="text-sm text-white/80">kWh</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-xs text-white/80">Weekly</p>
                <p className="text-lg font-semibold text-white">
                  {result.weeklyKWh.toFixed(1)} <span className="text-sm text-white/80">kWh</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-xs text-white/80">Monthly</p>
                <p className="text-lg font-semibold text-white">
                  {result.monthlyKWh.toFixed(0)} <span className="text-sm text-white/80">kWh</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="text-xs text-white/80">Yearly</p>
                <p className="text-lg font-semibold text-white">
                  {result.yearlyKWh.toFixed(0)} <span className="text-sm text-white/80">kWh</span>
                </p>
              </div>
            </div>
          </div>

          {/* Carbon Footprint */}
          <div className="calculator-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white/80">Carbon Footprint</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <p className="text-xs text-green-400/70">Daily</p>
                <p className="text-lg font-semibold text-green-400">
                  {result.dailyCO2.toFixed(2)} <span className="text-sm opacity-70">kg</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <p className="text-xs text-green-400/70">Weekly</p>
                <p className="text-lg font-semibold text-green-400">
                  {result.weeklyCO2.toFixed(1)} <span className="text-sm opacity-70">kg</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <p className="text-xs text-green-400/70">Monthly</p>
                <p className="text-lg font-semibold text-green-400">
                  {result.monthlyCO2.toFixed(0)} <span className="text-sm opacity-70">kg</span>
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <p className="text-xs text-green-400/70">Yearly</p>
                <p className="text-lg font-semibold text-green-400">
                  {result.yearlyCO2.toFixed(0)} <span className="text-sm opacity-70">kg</span>
                </p>
              </div>
            </div>
          </div>

          {/* Appliance Breakdown */}
          {result.applianceBreakdown.length > 0 && (
            <div className="calculator-card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-white/80">Cost by Appliance</span>
              </div>
              <div className="space-y-2">
                {result.applianceBreakdown.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-white/80">
                        {item.dailyKWh.toFixed(2)} kWh/day
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-semibold text-amber-400">
                        {formatCurrency(item.monthlyCost)}
                        <span className="text-xs text-white/80">/mo</span>
                      </p>
                      <p className="text-xs text-white/80">{item.shareOfTotal.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guidance */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div
              className="calculator-card overflow-hidden"
              style={{ borderColor: "#60a5fa15" }}
            >
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">
                    Energy Saving Tips
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-white/70 transition-transform duration-200",
                    showGuidance && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-blue-200/80">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Check your energy bill for exact rates - prices vary by supplier
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Economy 7/10 tariffs offer cheaper night rates for storage heaters
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Include standby power - TVs, routers, and chargers add up
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    Focus on high-cost appliances first for biggest savings
                  </li>
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Quick Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div
          className="calculator-card overflow-hidden"
          style={{ borderColor: "#fbbf2415" }}
        >
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">
                Typical Power Ratings
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-white/70 transition-transform duration-200",
                showReference && "rotate-180"
              )}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Kitchen</p>
                <p className="text-amber-200/70">Kettle: 2-3 kW</p>
                <p className="text-amber-200/70">Microwave: 800-1200 W</p>
                <p className="text-amber-200/70">Fridge: 100-150 W</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Heating</p>
                <p className="text-amber-200/70">Fan heater: 2-3 kW</p>
                <p className="text-amber-200/70">Oil radiator: 1.5-2.5 kW</p>
                <p className="text-amber-200/70">Immersion: 3 kW</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Electronics</p>
                <p className="text-amber-200/70">TV (LED): 50-100 W</p>
                <p className="text-amber-200/70">Laptop: 30-65 W</p>
                <p className="text-amber-200/70">Router: 5-20 W</p>
              </div>
              <div className="space-y-1">
                <p className="text-amber-300 font-medium">Laundry</p>
                <p className="text-amber-200/70">Washing: 500-2000 W</p>
                <p className="text-amber-200/70">Dryer: 2-3 kW</p>
                <p className="text-amber-200/70">Dishwasher: 1.8-2.4 kW</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default EnergyCostCalculator;

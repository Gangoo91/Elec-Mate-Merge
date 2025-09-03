
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResultCard } from "@/components/ui/result-card";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { formatCurrency } from "@/lib/format";
import { PoundSterling, Info, Calculator, RotateCcw, Zap, Leaf, Clock, Plus, Trash2, Home, Building, Factory } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  environmentPresets, 
  getCategoriesForEnvironment, 
  getAppliancesForCategory,
  type AppliancePreset 
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

// Environment and category state
type Environment = "domestic" | "commercial" | "industrial";

const EnergyCostCalculator = () => {
  const [environment, setEnvironment] = useState<Environment>("domestic");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [dayRate, setDayRate] = useState<string>("0.30");
  const [nightRate, setNightRate] = useState<string>("0.15");
  const [nightHours, setNightHours] = useState<string>("7");
  const [standingCharge, setStandingCharge] = useState<string>("0.60");
  const [vatRate, setVatRate] = useState<string>("5");
  const [useDualRate, setUseDualRate] = useState<boolean>(false);
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
    
    if (savedEnvironment && (savedEnvironment === "domestic" || savedEnvironment === "commercial" || savedEnvironment === "industrial")) {
      setEnvironment(savedEnvironment as Environment);
    }
    
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  // Save state to localStorage when they change
  useEffect(() => {
    localStorage.setItem('energyCost.appliances', JSON.stringify(appliances));
  }, [appliances]);

  useEffect(() => {
    localStorage.setItem('energyCost.environment', environment);
  }, [environment]);

  useEffect(() => {
    localStorage.setItem('energyCost.category', selectedCategory);
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

    appliances.forEach(appliance => {
      // Calculate hours per day
      let hoursPerDay = 0;
      if (appliance.usageMode === "hoursPerDay") {
        hoursPerDay = appliance.hoursPerDay || 0;
      } else if (appliance.usageMode === "cyclesPerWeek") {
        hoursPerDay = ((appliance.cycleHours || 0) * (appliance.cyclesPerWeek || 0)) / 7;
      }

      // Calculate energy consumption
      const activeKWhPerDay = (appliance.powerW * appliance.quantity * hoursPerDay) / 1000;
      const standbyKWhPerDay = (appliance.standbyW * appliance.quantity * (24 - hoursPerDay)) / 1000;
      const totalApplianceKWh = activeKWhPerDay + standbyKWhPerDay;

      // Calculate energy cost
      let applianceEnergyCost;
      if (useDualRate && nightHoursPerDay > 0) {
        const dayHours = Math.max(0, hoursPerDay - nightHoursPerDay);
        const nightHours = Math.min(hoursPerDay, nightHoursPerDay);
        
        const dayKWh = (appliance.powerW * appliance.quantity * dayHours) / 1000;
        const nightKWh = (appliance.powerW * appliance.quantity * nightHours) / 1000;
        
        applianceEnergyCost = (dayKWh * dayRatePerKWh) + (nightKWh * nightRatePerKWh) + (standbyKWhPerDay * dayRatePerKWh);
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
        shareOfTotal: 0 // Will calculate after total is known
      });
    });

    // Calculate shares
    applianceBreakdown.forEach(item => {
      item.shareOfTotal = totalDailyEnergyCost > 0 ? (item.monthlyCost / (totalDailyEnergyCost * 30.44)) * 100 : 0;
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
        total: dailyCostWithVat
      },
      applianceBreakdown
    };
  }, [appliances, dayRate, nightRate, nightHours, standingCharge, vatRate, useDualRate]);

  useEffect(() => {
    // Remove automatic calculation - now manual only
  }, []);

  const calculateResults = () => {
    setResult(calculateApplianceCosts);
  };

  const addAppliance = (presetKey?: string) => {
    let preset: AppliancePreset | null = null;
    
    if (presetKey) {
      // Get the appliances for the selected category
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
    setAppliances(appliances.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
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

  // Get environment icon
  const getEnvironmentIcon = (env: Environment) => {
    switch (env) {
      case "domestic":
        return <Home className="h-4 w-4" />;
      case "commercial":
        return <Building className="h-4 w-4" />;
      case "industrial":
        return <Factory className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PoundSterling className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Energy Cost Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate electricity costs for appliances and equipment based on UK rates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Environment Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              {getEnvironmentIcon(environment)}
              Environment & Appliances
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your environment to see relevant appliance categories and presets.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {(Object.keys(environmentPresets) as Environment[]).map((env) => (
                <MobileButton
                  key={env}
                  variant={environment === env ? "elec" : "outline"}
                  onClick={() => setEnvironment(env)}
                  className="flex items-center gap-2 h-12"
                >
                  {getEnvironmentIcon(env)}
                  {environmentPresets[env].name}
                </MobileButton>
              ))}
            </div>

            {/* Category Selection */}
            {availableCategories.length > 0 && (
              <div className="mb-4">
                <MobileSelectWrapper
                  label="Choose appliance category"
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  options={[
                    { value: "", label: "Select a category..." },
                    ...availableCategories.map(cat => ({
                      value: cat.key,
                      label: cat.name
                    }))
                  ]}
                  placeholder="Select category..."
                />
              </div>
            )}
          </div>

          {/* Appliances Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Your Appliances
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add appliances to calculate their running costs. Edit quantities and usage patterns.
            </p>
            
            <div className="space-y-4">
              {appliances.map((appliance) => (
                <div key={appliance.id} className="border border-elec-yellow/20 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <MobileInput
                        label="Name"
                        value={appliance.name}
                        onChange={(e) => updateAppliance(appliance.id, { name: e.target.value })}
                        placeholder="Appliance name"
                      />
                    </div>
                    <MobileInput
                      label="Quantity"
                      type="number"
                      min="1"
                      value={appliance.quantity.toString()}
                      onChange={(e) => updateAppliance(appliance.id, { quantity: parseInt(e.target.value) || 1 })}
                    />
                    <MobileButton
                      variant="destructive"
                      size="icon"
                      onClick={() => removeAppliance(appliance.id)}
                      className="h-11"
                    >
                      <Trash2 className="h-4 w-4" />
                    </MobileButton>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MobileInput
                      label="Power"
                      type="number"
                      value={appliance.powerW.toString()}
                      onChange={(e) => updateAppliance(appliance.id, { powerW: parseFloat(e.target.value) || 0 })}
                      unit="W"
                    />
                    <MobileInput
                      label="Standby"
                      type="number"
                      value={appliance.standbyW.toString()}
                      onChange={(e) => updateAppliance(appliance.id, { standbyW: parseFloat(e.target.value) || 0 })}
                      unit="W"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 p-3 border border-elec-yellow/20 rounded-lg cursor-pointer hover:bg-elec-yellow/5">
                        <input
                          type="radio"
                          checked={appliance.usageMode === "hoursPerDay"}
                          onChange={() => updateAppliance(appliance.id, { usageMode: "hoursPerDay" })}
                          className="text-elec-yellow"
                        />
                        <span className="text-sm">Hours per day</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-elec-yellow/20 rounded-lg cursor-pointer hover:bg-elec-yellow/5">
                        <input
                          type="radio"
                          checked={appliance.usageMode === "cyclesPerWeek"}
                          onChange={() => updateAppliance(appliance.id, { usageMode: "cyclesPerWeek" })}
                          className="text-elec-yellow"
                        />
                        <span className="text-sm">Cycles per week</span>
                      </label>
                    </div>

                    {appliance.usageMode === "hoursPerDay" ? (
                      <MobileInput
                        label="Hours per day"
                        type="number"
                        step="0.1"
                        value={appliance.hoursPerDay?.toString() || ""}
                        onChange={(e) => updateAppliance(appliance.id, { hoursPerDay: parseFloat(e.target.value) || 0 })}
                        unit="hours"
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <MobileInput
                          label="Cycle duration"
                          type="number"
                          step="0.1"
                          value={appliance.cycleHours?.toString() || ""}
                          onChange={(e) => updateAppliance(appliance.id, { cycleHours: parseFloat(e.target.value) || 0 })}
                          unit="hours"
                        />
                        <MobileInput
                          label="Cycles per week"
                          type="number"
                          value={appliance.cyclesPerWeek?.toString() || ""}
                          onChange={(e) => updateAppliance(appliance.id, { cyclesPerWeek: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MobileSelectWrapper
                  label="Add preset appliance"
                  value=""
                  onValueChange={(value) => {
                    if (value) addAppliance(value);
                  }}
                  options={
                    selectedCategory 
                      ? Object.entries(availableAppliances).map(([key, preset]) => ({
                          value: key,
                          label: preset.name,
                        }))
                      : []
                  }
                  placeholder={selectedCategory ? "Choose appliance..." : "Select category first..."}
                  disabled={!selectedCategory}
                />
                <MobileButton
                  variant="outline"
                  onClick={() => addAppliance()}
                  className="flex items-center gap-2 h-11"
                >
                  <Plus className="h-4 w-4" />
                  Custom Appliance
                </MobileButton>
              </div>
            </div>
          </div>

          {/* Tariff Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tariff & Charges</h3>
              
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id="dualRate"
                  checked={useDualRate}
                  onChange={(e) => setUseDualRate(e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="dualRate" className="text-sm">Use dual rate tariff (Economy 7/10)</label>
              </div>

              <MobileInput
                label={useDualRate ? "Day Rate per kWh" : "Rate per kWh"}
                type="number"
                step="0.01"
                value={dayRate}
                onChange={(e) => setDayRate(e.target.value)}
                placeholder="e.g., 0.30"
                unit="£/kWh"
              />

              {useDualRate && (
                <>
                  <MobileInput
                    label="Night Rate per kWh"
                    type="number"
                    step="0.01"
                    value={nightRate}
                    onChange={(e) => setNightRate(e.target.value)}
                    placeholder="e.g., 0.15"
                    unit="£/kWh"
                  />
                  <MobileInput
                    label="Night Rate Hours"
                    type="number"
                    value={nightHours}
                    onChange={(e) => setNightHours(e.target.value)}
                    placeholder="e.g., 7"
                    unit="hours"
                    hint="Hours per day on cheaper night rate"
                  />
                </>
              )}

              <MobileInput
                label="Daily Standing Charge"
                type="number"
                step="0.01"
                value={standingCharge}
                onChange={(e) => setStandingCharge(e.target.value)}
                placeholder="e.g., 0.60"
                unit="£/day"
              />

            <MobileInput
              label="VAT Rate"
              type="number"
              step="0.1"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              placeholder="5"
              unit="%"
              hint="Usually 5% for domestic energy"
            />
          </div>

          <div className="flex gap-2">
            <MobileButton 
              onClick={calculateResults} 
              className="flex-1" 
              variant="elec" 
              icon={<Calculator className="h-4 w-4" />}
              disabled={appliances.length === 0}
            >
              Calculate Energy Costs
            </MobileButton>
            <MobileButton variant="elec-outline" onClick={reset} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset All
            </MobileButton>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 mt-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-elec-yellow mb-2">Energy Cost Analysis</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary">
                    {result.dailyKWh.toFixed(2)} kWh/day
                  </Badge>
                  <Badge variant="secondary">
                    {result.dailyCO2.toFixed(1)} kg CO₂/day
                  </Badge>
                </div>
              </div>

              {/* Cost Results */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PoundSterling className="h-5 w-5 text-elec-yellow" />
                  Cost Breakdown
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ResultCard
                    title="Daily Cost"
                    value={formatCurrency(result.dailyCost)}
                    subtitle={`Energy: ${formatCurrency(result.costBreakdown.energyCost)} + Standing: ${formatCurrency(result.costBreakdown.standingCharge)}`}
                  />
                  <ResultCard
                    title="Weekly Cost"
                    value={formatCurrency(result.weeklyCost)}
                    subtitle="7 days"
                  />
                  <ResultCard
                    title="Monthly Cost"
                    value={formatCurrency(result.monthlyCost)}
                    subtitle="30.44 days avg"
                  />
                  <ResultCard
                    title="Annual Cost"
                    value={formatCurrency(result.yearlyCost)}
                    subtitle="365 days"
                  />
                </div>
              </div>

              {/* Energy Consumption */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-elec-yellow" />
                  Energy Consumption
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ResultCard
                    title="Daily Usage"
                    value={result.dailyKWh}
                    unit="kWh"
                    subtitle="Per day"
                  />
                  <ResultCard
                    title="Weekly Usage"
                    value={result.weeklyKWh}
                    unit="kWh"
                    subtitle="Per week"
                  />
                  <ResultCard
                    title="Monthly Usage"
                    value={result.monthlyKWh}
                    unit="kWh"
                    subtitle="Per month"
                  />
                  <ResultCard
                    title="Annual Usage"
                    value={result.yearlyKWh}
                    unit="kWh"
                    subtitle="Per year"
                  />
                </div>
              </div>

              {/* CO2 Emissions */}
              <div>
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-elec-yellow" />
                  Carbon Footprint
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ResultCard
                    title="Daily Emissions"
                    value={result.dailyCO2}
                    unit="kg CO₂"
                    subtitle="Per day"
                  />
                  <ResultCard
                    title="Weekly Emissions"
                    value={result.weeklyCO2}
                    unit="kg CO₂"
                    subtitle="Per week"
                  />
                  <ResultCard
                    title="Monthly Emissions"
                    value={result.monthlyCO2}
                    unit="kg CO₂"
                    subtitle="Per month"
                  />
                  <ResultCard
                    title="Annual Emissions"
                    value={result.yearlyCO2}
                    unit="kg CO₂"
                    subtitle="Per year"
                  />
                </div>
              </div>

              {/* Appliance Breakdown */}
              {result.applianceBreakdown && result.applianceBreakdown.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Home className="h-5 w-5 text-elec-yellow" />
                    Cost by Appliance
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-elec-yellow/20 rounded-lg">
                      <thead>
                        <tr className="bg-elec-yellow/10">
                          <th className="border border-elec-yellow/20 p-3 text-left">Appliance</th>
                          <th className="border border-elec-yellow/20 p-3 text-right">Daily kWh</th>
                          <th className="border border-elec-yellow/20 p-3 text-right">Monthly Cost</th>
                          <th className="border border-elec-yellow/20 p-3 text-right">Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.applianceBreakdown.map((item) => (
                          <tr key={item.id} className="hover:bg-elec-yellow/5">
                            <td className="border border-elec-yellow/20 p-3 font-medium">{item.name}</td>
                            <td className="border border-elec-yellow/20 p-3 text-right">{item.dailyKWh.toFixed(2)}</td>
                            <td className="border border-elec-yellow/20 p-3 text-right">{formatCurrency(item.monthlyCost)}</td>
                            <td className="border border-elec-yellow/20 p-3 text-right">{item.shareOfTotal.toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {!result && appliances.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Add appliances to calculate energy costs and environmental impact</p>
            </div>
          )}

          {/* Quick Tips */}
          <Alert className="border-blue-500/20 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-200">
              <strong>Quick Tips:</strong> Check your energy bill for exact rates. Economy 7/10 tariffs offer cheaper night rates. Include standby power for accurate costs.
            </AlertDescription>
          </Alert>

          {/* Why This Matters */}
          <WhyThisMatters
            title="Why Energy Cost Calculation Matters"
            points={[
              "Identifies high-cost appliances to prioritise for replacement or reduced usage",
              "Helps budget accurately for electricity bills and plan energy expenses",
              "Reveals potential savings from energy-efficient alternatives or usage patterns",
              "Spots top energy spenders in your home for targeted cost reduction",
              "Plans appliance replacements with best payback for energy efficiency",
              "Adjusts usage patterns to hit monthly energy budget targets",
              "Supports compliance with energy efficiency regulations and building standards"
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyCostCalculator;

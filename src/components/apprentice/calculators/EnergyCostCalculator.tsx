
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResultCard } from "@/components/ui/result-card";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { PoundSterling, Info, Calculator, RotateCcw, Zap, Leaf, Clock } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnergyCostCalculator = () => {
  const [power, setPower] = useState<string>("");
  const [standbyPower, setStandbyPower] = useState<string>("");
  const [hours, setHours] = useState<string>("");
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
  } | null>(null);

  const calculateCost = () => {
    const powerWatts = parseFloat(power);
    const standbyWatts = parseFloat(standbyPower) || 0;
    const hoursPerDay = parseFloat(hours);
    const dayRatePerKWh = parseFloat(dayRate);
    const nightRatePerKWh = parseFloat(nightRate);
    const nightHoursPerDay = parseFloat(nightHours);
    const dailyStandingCharge = parseFloat(standingCharge);
    const vatPercentage = parseFloat(vatRate);

    if (powerWatts > 0 && hoursPerDay > 0 && dayRatePerKWh > 0) {
      // Active power consumption
      const activeKWhPerDay = (powerWatts * hoursPerDay) / 1000;
      
      // Standby power consumption (24 hours minus active hours)
      const standbyKWhPerDay = (standbyWatts * (24 - hoursPerDay)) / 1000;
      
      const totalKWhPerDay = activeKWhPerDay + standbyKWhPerDay;

      let dailyEnergyCost;
      
      if (useDualRate && nightHoursPerDay > 0) {
        // Split consumption between day and night rates
        const dayHours = Math.max(0, hoursPerDay - nightHoursPerDay);
        const nightHours = Math.min(hoursPerDay, nightHoursPerDay);
        
        const dayKWh = (powerWatts * dayHours) / 1000;
        const nightKWh = (powerWatts * nightHours) / 1000;
        
        dailyEnergyCost = (dayKWh * dayRatePerKWh) + (nightKWh * nightRatePerKWh) + (standbyKWhPerDay * dayRatePerKWh);
      } else {
        dailyEnergyCost = totalKWhPerDay * dayRatePerKWh;
      }

      const dailyTotal = dailyEnergyCost + dailyStandingCharge;
      const vatAmount = (dailyTotal * vatPercentage) / 100;
      const dailyCostWithVat = dailyTotal + vatAmount;

      // CO2 emissions (UK grid average: 0.233 kg CO2/kWh as of 2024)
      const co2Factor = 0.233;
      const dailyCO2 = totalKWhPerDay * co2Factor;
      
      setResult({
        dailyCost: dailyCostWithVat,
        weeklyCost: dailyCostWithVat * 7,
        monthlyCost: dailyCostWithVat * 30.44,
        yearlyCost: dailyCostWithVat * 365,
        dailyKWh: totalKWhPerDay,
        weeklyKWh: totalKWhPerDay * 7,
        monthlyKWh: totalKWhPerDay * 30.44,
        yearlyKWh: totalKWhPerDay * 365,
        dailyCO2,
        weeklyCO2: dailyCO2 * 7,
        monthlyCO2: dailyCO2 * 30.44,
        yearlyCO2: dailyCO2 * 365,
        costBreakdown: {
          energyCost: dailyEnergyCost,
          standingCharge: dailyStandingCharge,
          vat: vatAmount,
          total: dailyCostWithVat
        }
      });
    }
  };

  const reset = () => {
    setPower("");
    setStandbyPower("");
    setHours("");
    setDayRate("0.30");
    setNightRate("0.15");
    setNightHours("7");
    setStandingCharge("0.60");
    setVatRate("5");
    setUseDualRate(false);
    setResult(null);
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
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Basic Settings</h3>
              
              <MobileInput
                label="Active Power Consumption"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 1500"
                unit="W"
                hint="Power when the appliance is actively running"
              />

              <MobileInput
                label="Standby Power (Optional)"
                type="number"
                value={standbyPower}
                onChange={(e) => setStandbyPower(e.target.value)}
                placeholder="e.g., 10"
                unit="W"
                hint="Power consumed when not in active use"
              />

              <MobileInput
                label="Active Hours per Day"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g., 8"
                unit="hours"
                hint="How many hours per day is it actively running"
              />
            </div>

            <div className="space-y-4">
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
          </div>

          <div className="flex gap-2">
            <MobileButton onClick={calculateCost} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
              Calculate Energy Costs
            </MobileButton>
            <MobileButton variant="elec-outline" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
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
                    value={result.dailyCost}
                    unit="£"
                    subtitle={`Energy: £${result.costBreakdown.energyCost.toFixed(2)} + Standing: £${result.costBreakdown.standingCharge.toFixed(2)}`}
                  />
                  <ResultCard
                    title="Weekly Cost"
                    value={result.weeklyCost}
                    unit="£"
                    subtitle="7 days"
                  />
                  <ResultCard
                    title="Monthly Cost"
                    value={result.monthlyCost}
                    unit="£"
                    subtitle="30.44 days avg"
                  />
                  <ResultCard
                    title="Annual Cost"
                    value={result.yearlyCost}
                    unit="£"
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
            </div>
          )}

          {!result && (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Enter appliance details to calculate energy costs and environmental impact</p>
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
              "Supports compliance with energy efficiency regulations and building standards",
              "Enables comparison of running costs between different appliances and technologies",
              "Assists in calculating payback periods for energy-efficient upgrades"
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyCostCalculator;

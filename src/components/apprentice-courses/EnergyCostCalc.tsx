import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Zap, Clock, PoundSterling, Settings, BarChart3, Hash } from "lucide-react";

export const EnergyCostCalc: React.FC = () => {
  const [power, setPower] = useState<number>(1000); // numeric value
  const [unit, setUnit] = useState<"W" | "kW">("W");
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [days, setDays] = useState<number>(30);
  const [tariffPence, setTariffPence] = useState<number>(28); // p/kWh
  const [quantity, setQuantity] = useState<number>(1);
  const [dutyPercent, setDutyPercent] = useState<number>(100);

  const powerKW = useMemo(() => (unit === "W" ? power / 1000 : power), [power, unit]);
  const duty = Math.max(0, Math.min(100, dutyPercent)) / 100;

  const dailyKWh = useMemo(() => powerKW * hoursPerDay * duty * quantity, [powerKW, hoursPerDay, duty, quantity]);
  const periodKWh = useMemo(() => dailyKWh * days, [dailyKWh, days]);
  const dailyCost = useMemo(() => (dailyKWh * tariffPence) / 100, [dailyKWh, tariffPence]);
  const periodCost = useMemo(() => (periodKWh * tariffPence) / 100, [periodKWh, tariffPence]);

  const quickDays = [
    { l: "Day", v: 1 },
    { l: "Week", v: 7 },
    { l: "Month", v: 30 },
    { l: "Year", v: 365 },
  ];

  const commonAppliances = [
    { name: "LED Bulb", power: 10, unit: "W" },
    { name: "Laptop", power: 65, unit: "W" },
    { name: "Kettle", power: 3, unit: "kW" },
    { name: "Washing Machine", power: 2.5, unit: "kW" },
    { name: "Fridge", power: 150, unit: "W" },
    { name: "Electric Heater", power: 2, unit: "kW" },
  ];

  return (
    <section aria-labelledby="energy-calc-heading" className="rounded-xl bg-gradient-to-br from-card/80 to-card shadow-lg border border-border/40 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-elec-primary/20 to-elec-accent/20 border border-elec-primary/30">
          <BarChart3 className="w-5 h-5 text-elec-primary" />
        </div>
        <h4 id="energy-calc-heading" className="text-lg font-semibold text-foreground">Energy Cost Calculator</h4>
      </div>

      {/* Appliance Power Section */}
      <div className="rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <h5 className="font-medium text-foreground">Appliance Power</h5>
        </div>
        
        {/* Quick preset appliances */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Common appliances:</Label>
          <div className="flex flex-wrap gap-2">
            {commonAppliances.map((appliance) => (
              <Button
                key={appliance.name}
                type="button"
                size="sm"
                variant="outline"
                className="h-8 px-3 text-xs hover:bg-primary/10"
                onClick={() => {
                  setPower(appliance.power);
                  setUnit(appliance.unit as "W" | "kW");
                }}
              >
                {appliance.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <Label htmlFor="power" className="flex items-center gap-1 text-sm">
              <Zap className="w-3 h-3" />
              Power rating
            </Label>
            <Input
              id="power"
              type="number"
              inputMode="decimal"
              className="bg-background border-border h-10"
              value={Number.isFinite(power) ? power : 0}
              min={0}
              onChange={(e) => setPower(parseFloat(e.target.value || "0"))}
            />
          </div>
          <div>
            <Label htmlFor="unit" className="text-sm">Unit</Label>
            <Select value={unit} onValueChange={(v) => setUnit(v as any)}>
              <SelectTrigger id="unit" className="bg-background border-border h-10">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="W">Watts (W)</SelectItem>
                <SelectItem value="kW">Kilowatts (kW)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="qty" className="flex items-center gap-1 text-sm">
              <Hash className="w-3 h-3" />
              Quantity
            </Label>
            <Input
              id="qty"
              type="number"
              inputMode="numeric"
              min={1}
              className="bg-background border-border h-10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value || "1", 10) || 1)}
            />
          </div>
        </div>
        
        {powerKW > 0 && (
          <div className="text-xs text-primary bg-primary/10 rounded-md p-2 border border-primary/20">
            Total power: {(powerKW * quantity).toFixed(2)} kW
          </div>
        )}
      </div>

      {/* Usage Pattern Section */}
      <div className="rounded-lg bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-foreground" />
          <h5 className="font-medium text-foreground">Usage Pattern</h5>
        </div>
        
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="hours" className="flex items-center gap-1 text-sm">
              <Clock className="w-3 h-3" />
              Hours per day
            </Label>
            <Input
              id="hours"
              type="number"
              inputMode="decimal"
              min={0}
              max={24}
              className="bg-background border-border h-10"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value || "0"))}
            />
          </div>
          <div>
            <Label htmlFor="days" className="text-sm">Time period (days)</Label>
            <Input
              id="days"
              type="number"
              inputMode="numeric"
              min={0}
              className="bg-background border-border h-10"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value || "0", 10))}
            />
          </div>
          <div>
            <Label htmlFor="duty" className="flex items-center gap-1 text-sm">
              <Settings className="w-3 h-3" />
              Duty cycle (%)
            </Label>
            <Input
              id="duty"
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              className="bg-background border-border h-10"
              value={dutyPercent}
              onChange={(e) => setDutyPercent(parseInt(e.target.value || "0", 10))}
            />
          </div>
        </div>

        {/* Quick-set days */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick set period:</Label>
          <div className="flex flex-wrap gap-2">
            {quickDays.map((period) => (
              <Button
                key={period.v}
                type="button"
                size="sm"
                variant="outline"
                className={cn(
                  "h-8 px-3 text-xs hover:bg-accent/10",
                  days === period.v && "bg-accent/20 border-accent text-accent-foreground"
                )}
                onClick={() => setDays(period.v)}
                aria-pressed={days === period.v}
              >
                {period.l}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Settings Section */}
      <div className="rounded-lg bg-gradient-to-r from-secondary/5 to-secondary/10 border border-secondary/20 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <PoundSterling className="w-4 h-4 text-secondary-foreground" />
          <h5 className="font-medium text-foreground">Cost Settings</h5>
        </div>
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="tariff" className="flex items-center gap-1 text-sm">
              <PoundSterling className="w-3 h-3" />
              Energy tariff (p/kWh)
            </Label>
            <Input
              id="tariff"
              type="number"
              inputMode="decimal"
              min={0}
              className="bg-background border-border h-10"
              value={tariffPence}
              onChange={(e) => setTariffPence(parseFloat(e.target.value || "0"))}
            />
          </div>
          <div className="flex items-end">
            <div className="text-xs text-secondary-foreground bg-secondary/10 rounded-md p-2 border border-secondary/20 w-full">
              UK average: ~28p/kWh (varies by supplier and tariff type)
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="rounded-lg bg-card border border-border p-4 space-y-4" aria-live="polite">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-foreground" />
          <h5 className="font-medium text-foreground">Energy & Cost Results</h5>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <p className="text-sm font-medium text-foreground">Daily Usage</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{dailyKWh.toFixed(2)} kWh</p>
            <p className="text-sm text-muted-foreground">≈ £{dailyCost.toFixed(2)} per day</p>
          </div>
          
          <div className="rounded-lg bg-accent/10 border border-accent/20 p-4 space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <p className="text-sm font-medium text-foreground">Period Total ({days} days)</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{periodKWh.toFixed(2)} kWh</p>
            <p className="text-sm text-muted-foreground">≈ £{periodCost.toFixed(2)} total</p>
          </div>
        </div>
        
        {periodCost > 0 && (
          <div className="rounded-md bg-secondary/10 border border-secondary/20 p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Cost Breakdown</span>
            </div>
            <div className="grid gap-2 text-sm text-foreground">
              <div className="flex justify-between">
                <span>Average daily cost:</span>
                <span className="font-mono text-primary font-semibold">£{dailyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Average monthly cost:</span>
                <span className="font-mono text-primary font-semibold">£{(dailyCost * 30).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual estimate:</span>
                <span className="font-mono text-primary font-semibold">£{(dailyCost * 365).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2 border">
          <strong>Disclaimer:</strong> These are estimates only. Actual bills depend on supplier rates, standing charges, time-of-use tariffs, and seasonal variations.
        </p>
      </div>
    </section>
  );
};

export default EnergyCostCalc;

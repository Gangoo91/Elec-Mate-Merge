
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PoundSterling, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EnergyCostCalculator = () => {
  const [power, setPower] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [rate, setRate] = useState<string>("0.30"); // Average UK rate
  const [result, setResult] = useState<{
    dailyCost: number;
    weeklyCost: number;
    monthlyCost: number;
    yearlyCost: number;
    kWhPerDay: number;
  } | null>(null);

  const calculateCost = () => {
    const powerWatts = parseFloat(power);
    const hoursPerDay = parseFloat(hours);
    const ratePerKWh = parseFloat(rate);

    if (powerWatts > 0 && hoursPerDay > 0 && ratePerKWh > 0) {
      const kWhPerDay = (powerWatts * hoursPerDay) / 1000;
      const dailyCost = kWhPerDay * ratePerKWh;
      
      setResult({
        dailyCost,
        weeklyCost: dailyCost * 7,
        monthlyCost: dailyCost * 30.44, // Average days per month
        yearlyCost: dailyCost * 365,
        kWhPerDay
      });
    }
  };

  const reset = () => {
    setPower("");
    setHours("");
    setRate("0.30");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="power">Power Consumption (Watts)</Label>
              <Input
                id="power"
                type="number"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g., 1500"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="hours">Hours per Day</Label>
              <Input
                id="hours"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="e.g., 8"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="rate">Rate per kWh (£)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g., 0.30"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateCost} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Energy Cost Breakdown</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.kWhPerDay.toFixed(2)} kWh per day
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Daily:</span>
                      <div className="font-mono text-elec-yellow">£{result.dailyCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weekly:</span>
                      <div className="font-mono text-elec-yellow">£{result.weeklyCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly:</span>
                      <div className="font-mono text-elec-yellow">£{result.monthlyCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Yearly:</span>
                      <div className="font-mono text-elec-yellow">£{result.yearlyCost.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter values to calculate energy costs
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                UK average electricity rate is approximately £0.30 per kWh. Check your supplier for exact rates.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyCostCalculator;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, PoundSterling } from "lucide-react";
import { useState } from "react";

const PayCalculator = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("37.5");
  const [hourlyRate, setHourlyRate] = useState<string>("6.40");
  const [apprenticeYear, setApprenticeYear] = useState<string>("first");
  const [region, setRegion] = useState<string>("standard");
  const [results, setResults] = useState<any>(null);

  const calculatePay = () => {
    const hours = parseFloat(hoursPerWeek);
    let rate = parseFloat(hourlyRate);
    
    // Apply regional multiplier
    const regionalMultipliers: { [key: string]: number } = {
      london: 1.2,
      southeast: 1.1,
      standard: 1.0,
      wales: 0.95,
      ni: 0.95
    };
    
    rate *= regionalMultipliers[region] || 1.0;
    
    const weeklyPay = hours * rate;
    const monthlyPay = weeklyPay * 4.33;
    const annualPay = weeklyPay * 52;
    
    // Calculate overtime potential (assuming 5 hours overtime per week at 1.5x rate)
    const overtimeHours = 5;
    const overtimeRate = rate * 1.5;
    const weeklyOvertime = overtimeHours * overtimeRate;
    const monthlyWithOvertime = (weeklyPay + weeklyOvertime) * 4.33;
    
    setResults({
      hourlyRate: rate.toFixed(2),
      weeklyPay: weeklyPay.toFixed(2),
      monthlyPay: monthlyPay.toFixed(2),
      annualPay: annualPay.toFixed(2),
      monthlyWithOvertime: monthlyWithOvertime.toFixed(2)
    });
  };

  const getMinimumWageForYear = (year: string) => {
    switch (year) {
      case "first": return "6.40";
      case "second": return "10.42";
      case "qualified": return "12.00";
      default: return "6.40";
    }
  };

  const handleYearChange = (year: string) => {
    setApprenticeYear(year);
    setHourlyRate(getMinimumWageForYear(year));
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle className="text-elec-yellow">Interactive Pay Calculator</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="apprentice-year">Apprenticeship Stage</Label>
              <Select value={apprenticeYear} onValueChange={handleYearChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Year (Under 19)</SelectItem>
                  <SelectItem value="second">Year 2+ (Over 19)</SelectItem>
                  <SelectItem value="qualified">Newly Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="london">London (+20%)</SelectItem>
                  <SelectItem value="southeast">South East (+10%)</SelectItem>
                  <SelectItem value="standard">Standard Rate</SelectItem>
                  <SelectItem value="wales">Wales (-5%)</SelectItem>
                  <SelectItem value="ni">Northern Ireland (-5%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="hourly-rate">Hourly Rate (£)</Label>
              <Input
                id="hourly-rate"
                type="number"
                step="0.01"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="hours-per-week">Hours per Week</Label>
              <Input
                id="hours-per-week"
                type="number"
                step="0.5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
              />
            </div>
            
            <Button onClick={calculatePay} className="w-full">
              Calculate Pay
            </Button>
          </div>
          
          {results && (
            <div className="space-y-4">
              <h4 className="font-semibold text-white mb-3">Your Estimated Pay</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-elec-yellow/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                  <span className="font-bold text-elec-yellow">£{results.hourlyRate}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Weekly Pay:</span>
                  <span className="font-bold text-blue-400">£{results.weeklyPay}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Monthly Pay:</span>
                  <span className="font-bold text-green-400">£{results.monthlyPay}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Annual Pay:</span>
                  <span className="font-bold text-purple-400">£{results.annualPay}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <span className="text-sm text-orange-400">With Overtime:</span>
                  <span className="font-bold text-orange-400">£{results.monthlyWithOvertime}/month</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-3">
                * Overtime calculation assumes 5 hours/week at time-and-a-half rate
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayCalculator;

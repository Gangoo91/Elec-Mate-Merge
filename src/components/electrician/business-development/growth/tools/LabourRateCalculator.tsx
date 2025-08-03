import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, PoundSterling } from "lucide-react";

export const LabourRateCalculator = () => {
  const [desiredSalary, setDesiredSalary] = useState("");
  const [workingHours, setWorkingHours] = useState("40");
  const [workingWeeks, setWorkingWeeks] = useState("48");
  const [overheadPercent, setOverheadPercent] = useState("30");
  const [profitPercent, setProfitPercent] = useState("20");
  const [billablePercent, setBillablePercent] = useState("75");
  const [result, setResult] = useState<{
    totalWorkingHours: number;
    billableHours: number;
    baseSalaryRate: number;
    withOverhead: number;
    finalRate: number;
    annualRevenue: number;
  } | null>(null);

  const calculateLabourRate = () => {
    const salary = parseFloat(desiredSalary) || 0;
    const hoursPerWeek = parseFloat(workingHours) || 40;
    const weeksPerYear = parseFloat(workingWeeks) || 48;
    const overhead = parseFloat(overheadPercent) || 30;
    const profit = parseFloat(profitPercent) || 20;
    const billable = parseFloat(billablePercent) || 75;

    const totalHours = hoursPerWeek * weeksPerYear;
    const billableHours = totalHours * (billable / 100);
    const baseSalaryRate = billableHours > 0 ? salary / billableHours : 0;
    const withOverhead = baseSalaryRate * (1 + overhead / 100);
    const finalRate = withOverhead * (1 + profit / 100);
    const annualRevenue = finalRate * billableHours;

    setResult({
      totalWorkingHours: totalHours,
      billableHours,
      baseSalaryRate,
      withOverhead,
      finalRate,
      annualRevenue
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Labour Rate Calculator
        </CardTitle>
        <CardDescription>
          Calculate your hourly rate based on desired salary, overheads, and profit margins
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="desiredSalary">Desired Annual Salary (£)</Label>
              <Input
                id="desiredSalary"
                type="number"
                placeholder="e.g. 35000"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="workingHours">Working Hours per Week</Label>
              <Input
                id="workingHours"
                type="number"
                placeholder="40"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="workingWeeks">Working Weeks per Year</Label>
              <Input
                id="workingWeeks"
                type="number"
                placeholder="48"
                value={workingWeeks}
                onChange={(e) => setWorkingWeeks(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Account for holidays and sick leave
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="billablePercent">Billable Time (%)</Label>
              <Input
                id="billablePercent"
                type="number"
                placeholder="75"
                value={billablePercent}
                onChange={(e) => setBillablePercent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Time spent on paying customer work
              </p>
            </div>

            <div>
              <Label htmlFor="overheadPercent">Overhead (%)</Label>
              <Input
                id="overheadPercent"
                type="number"
                placeholder="30"
                value={overheadPercent}
                onChange={(e) => setOverheadPercent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Van, tools, insurance, admin costs
              </p>
            </div>

            <div>
              <Label htmlFor="profitPercent">Profit Margin (%)</Label>
              <Input
                id="profitPercent"
                type="number"
                placeholder="20"
                value={profitPercent}
                onChange={(e) => setProfitPercent(e.target.value)}
              />
            </div>

            <Button onClick={calculateLabourRate} className="w-full">
              Calculate Labour Rate
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <PoundSterling className="h-4 w-4" />
              Labour Rate Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Total Hours/Year</div>
                <div className="font-medium">{result.totalWorkingHours.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Billable Hours/Year</div>
                <div className="font-medium">{result.billableHours.toFixed(0)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Base Salary Rate</div>
                <div className="font-medium">£{result.baseSalaryRate.toFixed(2)}/hr</div>
              </div>
              <div>
                <div className="text-muted-foreground">With Overheads</div>
                <div className="font-medium">£{result.withOverhead.toFixed(2)}/hr</div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">Final Rate</div>
                <div className="font-bold text-lg text-elec-yellow">£{result.finalRate.toFixed(2)}/hr</div>
              </div>
              <div>
                <div className="text-muted-foreground">Annual Revenue</div>
                <div className="font-medium">£{result.annualRevenue.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-background/50 rounded border border-elec-yellow/10">
                <h4 className="font-medium text-sm mb-1">Industry Comparison</h4>
                <p className="text-xs text-muted-foreground">
                  UK electricians typically charge £35-65/hour depending on location and specialisation.
                </p>
              </div>
              <div className="p-3 bg-background/50 rounded border border-elec-yellow/10">
                <h4 className="font-medium text-sm mb-1">Rate Adjustment Tips</h4>
                <p className="text-xs text-muted-foreground">
                  Review rates quarterly. Factor in travel time, complexity, and customer value.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
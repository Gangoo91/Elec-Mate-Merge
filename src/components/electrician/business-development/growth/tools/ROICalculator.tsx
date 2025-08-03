import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Calculator } from "lucide-react";

export const ROICalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [monthlyBenefit, setMonthlyBenefit] = useState("");
  const [monthlyCost, setMonthlyCost] = useState("");
  const [timeframe, setTimeframe] = useState("12");
  const [result, setResult] = useState<{
    totalBenefit: number;
    totalCost: number;
    netBenefit: number;
    roi: number;
    paybackMonths: number;
    monthlyROI: number;
  } | null>(null);

  const calculateROI = () => {
    const investment = parseFloat(initialInvestment) || 0;
    const benefit = parseFloat(monthlyBenefit) || 0;
    const cost = parseFloat(monthlyCost) || 0;
    const months = parseInt(timeframe) || 12;

    const netMonthlyBenefit = benefit - cost;
    const totalBenefit = benefit * months;
    const totalCost = investment + (cost * months);
    const netBenefit = totalBenefit - totalCost;
    const roi = totalCost > 0 ? (netBenefit / totalCost) * 100 : 0;
    const paybackMonths = netMonthlyBenefit > 0 ? investment / netMonthlyBenefit : 0;
    const monthlyROI = roi / months;

    setResult({
      totalBenefit,
      totalCost,
      netBenefit,
      roi,
      paybackMonths,
      monthlyROI
    });
  };

  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          ROI Calculator
        </CardTitle>
        <CardDescription>
          Calculate return on investment for equipment, tools, or business improvements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="investmentType">Investment Type</Label>
              <Select value={investmentType} onValueChange={setInvestmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="tools">Tools & Equipment</SelectItem>
                  <SelectItem value="van">Van/Vehicle</SelectItem>
                  <SelectItem value="software">Software/Technology</SelectItem>
                  <SelectItem value="training">Training/Certification</SelectItem>
                  <SelectItem value="marketing">Marketing Campaign</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="initialInvestment">Initial Investment (£)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="e.g. 5000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="monthlyBenefit">Monthly Benefit/Revenue (£)</Label>
              <Input
                id="monthlyBenefit"
                type="number"
                placeholder="e.g. 800"
                value={monthlyBenefit}
                onChange={(e) => setMonthlyBenefit(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Additional revenue or cost savings per month
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyCost">Monthly Operating Cost (£)</Label>
              <Input
                id="monthlyCost"
                type="number"
                placeholder="e.g. 150"
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Ongoing costs (maintenance, fuel, subscriptions)
              </p>
            </div>

            <div>
              <Label htmlFor="timeframe">Analysis Timeframe (months)</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                  <SelectItem value="36">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateROI} className="w-full">
              Calculate ROI
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
            <h3 className="font-semibold text-elec-yellow mb-4 flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              ROI Analysis Results
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Total Benefits</div>
                <div className="font-medium">£{result.totalBenefit.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Total Costs</div>
                <div className="font-medium">£{result.totalCost.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Net Benefit</div>
                <div className={`font-medium ${result.netBenefit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  £{result.netBenefit.toFixed(2)}
                </div>
              </div>
              <div className="bg-elec-yellow/10 p-2 rounded">
                <div className="text-muted-foreground">ROI</div>
                <div className={`font-bold text-lg ${result.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.roi.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Payback Period</div>
                <div className="font-medium">
                  {result.paybackMonths > 0 ? `${result.paybackMonths.toFixed(1)} months` : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Monthly ROI</div>
                <div className="font-medium">{result.monthlyROI.toFixed(2)}%</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-background/50 rounded border border-elec-yellow/10">
              <p className="text-sm text-muted-foreground">
                <strong>ROI Interpretation:</strong> {' '}
                {result.roi >= 20 ? (
                  <span className="text-green-600">Excellent investment - strong returns expected</span>
                ) : result.roi >= 10 ? (
                  <span className="text-yellow-600">Good investment - positive returns</span>
                ) : result.roi >= 0 ? (
                  <span className="text-yellow-600">Break-even investment - consider alternatives</span>
                ) : (
                  <span className="text-red-600">Poor investment - negative returns expected</span>
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};